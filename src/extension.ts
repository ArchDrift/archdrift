import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { analyzeDocument, isSupportedFile, AnalysisResult, LayerViolation, countCodeLines, calculateDrift, isProductionCode, RawIssue, VIOLATION_WEIGHTS } from './analyzer';
import { generateWorkspaceReport, writeReportToOutputChannel, generateMarkdownReport } from './reportGenerator';

let diagnosticCollection: vscode.DiagnosticCollection;
let statusBarItem: vscode.StatusBarItem;
let outputChannel: vscode.OutputChannel;

export function activate(context: vscode.ExtensionContext) {
    // Create output channel for debugging
    outputChannel = vscode.window.createOutputChannel('ArchDrift');
    context.subscriptions.push(outputChannel);
    outputChannel.appendLine('ArchDrift extension activated!');
    
    // Create diagnostic collection
    diagnosticCollection = vscode.languages.createDiagnosticCollection('archdrift');
    context.subscriptions.push(diagnosticCollection);

    // Create status bar item
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    context.subscriptions.push(statusBarItem);

    // Register commands
    const scanCommand = vscode.commands.registerCommand('archdrift.scanActiveFile', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            scanDocument(editor.document);
        } else {
            vscode.window.showInformationMessage('No active editor to scan.');
        }
    });
    context.subscriptions.push(scanCommand);

    const generateReportCommand = vscode.commands.registerCommand('archdrift.generateReport', async () => {
        try {
            outputChannel.appendLine(`[ArchDrift Report] Starting report generation...`);
            
            // Scan ALL files in workspace, not just open ones
            const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
            if (!workspaceFolder) {
                vscode.window.showErrorMessage('No workspace folder open');
                return;
            }
            
            // Find all supported files in workspace
            const excludePatterns = [
                '**/node_modules/**',
                '**/dist/**',
                '**/build/**',
                '**/out/**',
                '**/.git/**',
                '**/coverage/**',
                '**/.archdrift/**'
            ];
            
            outputChannel.appendLine(`[ArchDrift Report] Discovering files in workspace...`);
            const files = await vscode.workspace.findFiles(
                '**/*.{js,ts,jsx,tsx}',
                `{${excludePatterns.join(',')}}`,
                10000
            );
            
            outputChannel.appendLine(`[ArchDrift Report] Found ${files.length} files to scan`);
            
            // Debug: Count test files
            const testFiles = files.filter(uri => {
                const filePath = uri.fsPath.toLowerCase();
                return filePath.includes('/test') || 
                       filePath.includes('/tests/') ||
                       filePath.includes('/__tests__/') ||
                       filePath.endsWith('.test.ts') ||
                       filePath.endsWith('.test.js') ||
                       filePath.endsWith('.spec.ts') ||
                       filePath.endsWith('.spec.js');
            });
            outputChannel.appendLine(`[ArchDrift Report] Test files found: ${testFiles.length} (will be scanned but excluded from score)`);
            
            // Use exported isProductionCode function (checks .gitignore and test patterns, no hardcoding)
            
            // Scan all files and collect diagnostics + LOC
            const allDiagnostics: Array<{ uri: vscode.Uri; diagnostic: vscode.Diagnostic }> = [];
            const allRawIssues: RawIssue[] = [];
            const workspaceRoot = workspaceFolder.uri.fsPath;
            let totalProductionLOC = 0;
            let totalProductionFiles = 0;
            
            // Use progress indicator for large scans
            await vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: 'ArchDrift: Scanning workspace...',
                cancellable: true
            }, async (progress, token) => {
                const totalFiles = files.length;
                let scanned = 0;
                const updateInterval = 50;
                
                for (const fileUri of files) {
                    if (token.isCancellationRequested) {
                        outputChannel.appendLine(`[ArchDrift Report] Scan cancelled by user`);
                        break;
                    }
                    
                    scanned++;
                    if (scanned % updateInterval === 0 || scanned === totalFiles) {
                        const percentage = Math.round((scanned / totalFiles) * 100);
                        progress.report({
                            message: `Scanning... ${scanned}/${totalFiles} files (${percentage}%)`,
                            increment: (updateInterval / totalFiles) * 100
                        });
                    }
                    
                    try {
                        if (!isSupportedFile(fileUri)) {
                            continue;
                        }
                        
                        // Open and analyze document
                        const document = await vscode.workspace.openTextDocument(fileUri);
                        const result = analyzeDocument(document, workspaceRoot, outputChannel);
                        
                        // Count LOC and files for production code only
                        const filePath = fileUri.fsPath;
                        const isProd = isProductionCode(filePath);
                        if (isProd) {
                            const loc = countCodeLines(document.getText(), document.languageId);
                            totalProductionLOC += loc;
                            totalProductionFiles++;
                        }
                        
                        // Collect raw issues for drift calculation (tag with file path for filtering)
                        result.rawIssues.forEach(issue => {
                            // Add file path to issue for filtering
                            (issue as any).filePath = filePath;
                            allRawIssues.push(issue);
                        });
                        
                        // Build diagnostics from raw issues (include all for report, but filter for score)
                        // Tag each issue with filePath for filtering and include code snippets for CI/CD evidence
                        result.rawIssues.forEach(issue => {
                            // Tag issue with filePath for production code filtering
                            (issue as any).filePath = fileUri.fsPath;
                            try {
                                let range: vscode.Range;
                                if (issue.range) {
                                    range = issue.range;
                                } else {
                                    const lineIndex = Math.max(0, Math.min(issue.line - 1, document.lineCount - 1));
                                    const line = document.lineAt(lineIndex);
                                    range = line.range;
                                }
                                
                                const formattedMessage = `[${issue.pattern}] ${issue.message}`;
                                const vscodeSeverity = issue.severity === 0 ? vscode.DiagnosticSeverity.Error :
                                                      issue.severity === 1 ? vscode.DiagnosticSeverity.Warning :
                                                      issue.severity === 2 ? vscode.DiagnosticSeverity.Information :
                                                      vscode.DiagnosticSeverity.Hint;
                                
                                const diagnostic = new vscode.Diagnostic(range, formattedMessage, vscodeSeverity);
                                diagnostic.source = 'ArchDrift';
                                allDiagnostics.push({ uri: fileUri, diagnostic });
                            } catch (error) {
                                // Skip invalid line numbers
                            }
                        });
                    } catch (error) {
                        outputChannel.appendLine(`[ArchDrift Report] Error scanning ${fileUri.fsPath}: ${error instanceof Error ? error.message : String(error)}`);
                    }
                }
                
                outputChannel.appendLine(`[ArchDrift Report] Scanned ${scanned} files`);
            });

            // Debug: Log what we found
            outputChannel.appendLine(`[ArchDrift Report] Found ${allDiagnostics.length} total diagnostics`);
            
            // Count diagnostics per file for debugging
            const diagnosticsByFile = new Map<string, number>();
            const testFileDiagnostics = new Map<string, number>();
            allDiagnostics.forEach(({ uri }) => {
                const count = diagnosticsByFile.get(uri.fsPath) || 0;
                diagnosticsByFile.set(uri.fsPath, count + 1);
                
                // Track test files separately
                const filePath = uri.fsPath;
                if (!isProductionCode(filePath)) {
                    const testCount = testFileDiagnostics.get(filePath) || 0;
                    testFileDiagnostics.set(filePath, testCount + 1);
                }
            });
            outputChannel.appendLine(`[ArchDrift Report] Diagnostics across ${diagnosticsByFile.size} files`);
            outputChannel.appendLine(`[ArchDrift Report] Test file violations: ${testFileDiagnostics.size} files with ${Array.from(testFileDiagnostics.values()).reduce((a, b) => a + b, 0)} total issues`);
            if (diagnosticsByFile.size > 0 && diagnosticsByFile.size <= 20) {
                // Show details for small numbers of files
                diagnosticsByFile.forEach((count, path) => {
                    const isTest = !isProductionCode(path);
                    const marker = isTest ? '[TEST]' : '[PROD]';
                    outputChannel.appendLine(`  ${marker} ${path}: ${count} issue(s)`);
                });
            }
            
            if (allDiagnostics.length === 0) {
                outputChannel.appendLine(`[ArchDrift Report] No issues detected in workspace`);
            }
            
            // Always show output channel for debugging
            outputChannel.show(true);

            // Always generate report, even if no issues (will show perfect score)

            // Group by pattern and count (matching rawIssues structure)
            const patternCounts = new Map<string, { count: number; severity: vscode.DiagnosticSeverity }>();
            const fileIssueCounts = new Map<string, { count: number; uri: vscode.Uri; firstLine: number }>();
            
            allDiagnostics.forEach(({ uri, diagnostic }) => {
                // Extract pattern from message (format: [Pattern] details...)
                const patternMatch = diagnostic.message.match(/^\[([^\]]+)\]/);
                const pattern = patternMatch ? patternMatch[1] : 'Unknown';
                
                // Count by pattern and track severity
                const existing = patternCounts.get(pattern);
                if (existing) {
                    existing.count++;
                    // Keep the highest severity (Error > Warning > Info > Hint)
                    if (diagnostic.severity < existing.severity) {
                        existing.severity = diagnostic.severity;
                    }
                } else {
                    patternCounts.set(pattern, {
                        count: 1,
                        severity: diagnostic.severity
                    });
                }
                
                // Count by file
                const fileKey = uri.fsPath;
                const existingFile = fileIssueCounts.get(fileKey);
                if (existingFile) {
                    existingFile.count++;
                } else {
                    fileIssueCounts.set(fileKey, {
                        count: 1,
                        uri: uri,
                        firstLine: diagnostic.range.start.line + 1 // 1-indexed for display
                    });
                }
            });

            // Filter raw issues to production code only for drift calculation
            const productionRawIssues = allRawIssues.filter((issue) => {
                const filePath = (issue as any).filePath;
                return filePath ? isProductionCode(filePath, workspaceRoot) : false;
            });
            
            // Use calculateDrift with strict mode (density-based with logarithmic ceiling)
            // CI/CD Gatekeeper: 0% = perfect (no drift), 100% = total drift
            const driftResult = calculateDrift(productionRawIssues, totalProductionLOC, totalProductionFiles, true, workspaceRoot);
            const driftScoreRounded = driftResult.driftScore;
            const weightedDebt = driftResult.weightedDebt;
            const weightedDebtDensity = driftResult.weightedDebtDensity;
            const productionIssues = driftResult.productionIssues;
            
            // Debug drift calculation
            outputChannel.appendLine(`[ArchDrift Report] Production code: ${productionIssues} issues (${weightedDebt} weighted debt) in ${totalProductionLOC.toLocaleString()} LOC across ${totalProductionFiles} files`);
            outputChannel.appendLine(`[ArchDrift Report] Weighted Debt Density: ${weightedDebtDensity.toFixed(2)} debt points/KLoC → Architectural Drift: ${driftScoreRounded}%`);

            // Get top 5 offenders (production code only - no test files)
            const topOffenders = Array.from(fileIssueCounts.entries())
                .filter(([filePath]) => isProductionCode(filePath, workspaceRoot))
                .sort((a, b) => b[1].count - a[1].count)
                .slice(0, 5);

            // Get top pattern (most issues)
            const sortedPatterns = Array.from(patternCounts.entries())
                .sort((a, b) => b[1].count - a[1].count);
            const topPattern = sortedPatterns.length > 0 ? sortedPatterns[0][0] : null;

            // Map pattern names to emoji icons
            const getPatternEmoji = (pattern: string): string => {
                if (pattern === 'God Class') return '📦';
                if (pattern === 'N+1 Query') return '⚡';
                if (pattern === 'Layer Violation') return '🚫';
                return '📋';
            };

            // Map Pattern to Severity Indicator (for Pattern Breakdown table)
            const getPatternSeverityEmoji = (pattern: string, message?: string): string => {
                if (pattern === 'Layer Violation') return '🔴 Critical';
                if (pattern === 'N+1 Query') return '🟠 High';
                if (pattern === 'God Class') {
                    // Check for tier in message
                    if (message && message.includes('Monolith')) return '🔴 Critical (Monolith)';
                    if (message && message.includes('Large Class')) return '🟡 Medium (Large Class)';
                    return '🟡 Medium';
                }
                return '🟢 Low';
            };

            // Calculate Drift Bar (10 slots) - CI/CD Gatekeeper: 0% = perfect, 100% = total drift
            const filledSlots = Math.round((driftScoreRounded / 100) * 10);
            const emptySlots = 10 - filledSlots;
            const driftBar = '█'.repeat(filledSlots) + '░'.repeat(emptySlots);

            // Generate markdown report - CI/CD Gatekeeper format
            const workspaceName = workspaceFolder.name;
            let markdown = `# 🛡️ ArchDrift Architectural Drift Analysis\n\n`;
            markdown += `**Workspace:** ${workspaceName}\n\n`;
            markdown += `---\n\n`;
            
            // CI/CD Gatekeeper Header - Architectural Drift (0% = perfect, 100% = total drift)
            markdown += `## Architectural Drift: **${driftScoreRounded}%**\n\n`;
            markdown += `[${driftBar}]\n\n`;
            
            // Expert Diagnosis Section
            let hotspot = 'Unknown';
            let threatPattern = 'Unknown';
            let riskFactor = 'Unknown';
            
            // Handle perfect score (0% drift) - show "Perfect Architecture" message
            if (driftScoreRounded <= 0 && allDiagnostics.length === 0) {
                hotspot = 'N/A';
                threatPattern = 'Perfect Architecture';
                riskFactor = 'No violations detected';
            } else if (topOffenders.length > 0) {
                // Find most frequent directory in Top 5 Offenders
                const directoryCounts = new Map<string, number>();
                topOffenders.forEach(([filePath, data]) => {
                    let relativePath: string;
                    try {
                        relativePath = vscode.workspace.asRelativePath(data.uri, false);
                    } catch {
                        relativePath = path.basename(data.uri.fsPath);
                    }
                    const dirPath = path.dirname(relativePath).replace(/\\/g, '/');
                    const count = directoryCounts.get(dirPath) || 0;
                    directoryCounts.set(dirPath, count + data.count);
                });
                
                const sortedDirs = Array.from(directoryCounts.entries())
                    .sort((a, b) => b[1] - a[1]);
                hotspot = sortedDirs.length > 0 ? sortedDirs[0][0] : 'Unknown';
            }
            
            // Find violation pattern with highest weighted impact
            if (sortedPatterns.length > 0) {
                const patternWeights = new Map<string, number>();
                sortedPatterns.forEach(([pattern, data]) => {
                    let weight = 0;
                    if (pattern === 'Layer Violation') {
                        weight = data.count * VIOLATION_WEIGHTS.layerViolation;
                    } else if (pattern === 'N+1 Query') {
                        weight = data.count * VIOLATION_WEIGHTS.nPlusOneQuery;
                    } else if (pattern === 'God Class') {
                        weight = data.count * VIOLATION_WEIGHTS.godClassMonolith;
                    }
                    patternWeights.set(pattern, weight);
                });
                
                const sortedByWeight = Array.from(patternWeights.entries())
                    .sort((a, b) => b[1] - a[1]);
                threatPattern = sortedByWeight.length > 0 ? sortedByWeight[0][0] : 'Unknown';
                
                // Map pattern to risk factor
                if (threatPattern === 'Layer Violation') {
                    riskFactor = 'Logic Boundaries';
                } else if (threatPattern === 'N+1 Query') {
                    riskFactor = 'Performance Scalability';
                } else if (threatPattern === 'God Class') {
                    riskFactor = 'Maintenance Velocity';
                }
            }
            
            markdown += `### 🧠 Expert Diagnosis\n\n`;
            if (driftScoreRounded <= 0 && allDiagnostics.length === 0) {
                markdown += `✅ **Perfect Architecture** - No violations detected. The codebase maintains structural integrity with zero architectural drift.\n\n`;
            } else {
                markdown += `The primary source of architectural drift is located in the **${hotspot}**. `;
                markdown += `Systemic **${threatPattern}** violations indicate that the system's **${riskFactor}** is beginning to compromise its structural integrity.\n\n`;
            }
            markdown += `---\n\n`;

            // Top Offenders
            markdown += `## Top Offenders\n\n`;
            if (topOffenders.length > 0) {
                topOffenders.forEach(([filePath, data], index) => {
                    // Get relative path from project root (relative to workspace root)
                    let relativePath: string;
                    try {
                        relativePath = vscode.workspace.asRelativePath(data.uri, false);
                    } catch {
                        // Fallback: use path.relative from workspace root
                        relativePath = path.relative(workspaceRoot, data.uri.fsPath);
                    }
                    
                    // Normalize to forward slashes for all links (Markdown/Cursor compatibility)
                    const normalizedPath = relativePath.split(path.sep).join('/');
                    
                    // Create clickable link with relative path from project root
                    markdown += `${index + 1}. [${normalizedPath}](${normalizedPath}) - ${data.count} issue${data.count > 1 ? 's' : ''}\n`;
                });
            } else {
                markdown += `No offenders found.\n`;
            }

            markdown += `\n---\n\n`;

            // Pattern Breakdown Table
            markdown += `## Pattern Breakdown\n\n`;
            markdown += `| Pattern | Count | Severity |\n`;
            markdown += `|---------|-------|----------|\n`;
            
            if (sortedPatterns.length > 0) {
                sortedPatterns.forEach(([pattern, data]) => {
                    const patternEmoji = getPatternEmoji(pattern);
                    const severityIndicator = getPatternSeverityEmoji(pattern);
                    markdown += `| ${patternEmoji} ${pattern} | ${data.count} | ${severityIndicator} |\n`;
                });
            } else {
                markdown += `| *No issues detected* | 0 | 🟢 Low |\n`;
            }

            markdown += `\n---\n\n`;
            markdown += `Generated by ArchDrift v0.4\n`;

            // Generate FULL_DETAILS.md with line-by-line breakdown
            let fullDetailsMarkdown = `# 📋 ArchDrift Full Details\n\n`;
            fullDetailsMarkdown += `**Generated:** ${new Date().toLocaleString()}\n\n`;
            fullDetailsMarkdown += `This document contains a line-by-line breakdown of every violation detected.\n\n`;
            fullDetailsMarkdown += `---\n\n`;
            
            // Add Weighted Debt math explanation to full details only
            fullDetailsMarkdown += `## Weighted Debt Calculation\n\n`;
            fullDetailsMarkdown += `**Weighted Debt Density:** ${weightedDebtDensity.toFixed(2)} debt points per 1,000 lines of production code\n\n`;
            fullDetailsMarkdown += `**Severity Multipliers:**\n`;
            fullDetailsMarkdown += `- Layer Violations: ×${VIOLATION_WEIGHTS.layerViolation} (Fatal structural drift)\n`;
            fullDetailsMarkdown += `- N+1 Queries: ×${VIOLATION_WEIGHTS.nPlusOneQuery} (Core efficiency drift)\n`;
            fullDetailsMarkdown += `- God Class Monoliths: ×${VIOLATION_WEIGHTS.godClassMonolith} (Complexity drift)\n\n`;
            fullDetailsMarkdown += `**Production Code:** ${productionIssues} violations (${weightedDebt} weighted debt) in ${totalProductionLOC.toLocaleString()} LOC\n\n`;
            fullDetailsMarkdown += `**Total Violations (including tests):** ${allDiagnostics.length}\n\n`;
            
            // Show test file violations count
            const testFileViolations = allDiagnostics.filter(({ uri }) => !isProductionCode(uri.fsPath, workspaceRoot)).length;
            if (testFileViolations > 0) {
                fullDetailsMarkdown += `**Test File Violations:** ${testFileViolations} (excluded from score calculation)\n\n`;
            }
            
            fullDetailsMarkdown += `---\n\n`;

            // Group diagnostics by pattern, then by file, and separate production from test
            const violationsByPattern = new Map<string, Map<string, Array<{ uri: vscode.Uri; diagnostic: vscode.Diagnostic; line: number; isProduction: boolean }>>>();
            
            allDiagnostics.forEach(({ uri, diagnostic }) => {
                const patternMatch = diagnostic.message.match(/^\[([^\]]+)\]/);
                const pattern = patternMatch ? patternMatch[1] : 'Unknown';
                const line = diagnostic.range.start.line + 1; // 1-indexed
                const isProduction = isProductionCode(uri.fsPath, workspaceRoot);
                
                if (!violationsByPattern.has(pattern)) {
                    violationsByPattern.set(pattern, new Map());
                }
                const patternMap = violationsByPattern.get(pattern)!;
                
                const fileKey = uri.fsPath;
                if (!patternMap.has(fileKey)) {
                    patternMap.set(fileKey, []);
                }
                patternMap.get(fileKey)!.push({ uri, diagnostic, line, isProduction });
            });

            // Separate production and test violations
            const productionViolationsByPattern = new Map<string, Map<string, Array<{ uri: vscode.Uri; diagnostic: vscode.Diagnostic; line: number; isProduction: boolean }>>>();
            const testViolationsByPattern = new Map<string, Map<string, Array<{ uri: vscode.Uri; diagnostic: vscode.Diagnostic; line: number; isProduction: boolean }>>>();
            
            violationsByPattern.forEach((fileMap, pattern) => {
                const prodMap = new Map<string, Array<{ uri: vscode.Uri; diagnostic: vscode.Diagnostic; line: number; isProduction: boolean }>>();
                const testMap = new Map<string, Array<{ uri: vscode.Uri; diagnostic: vscode.Diagnostic; line: number; isProduction: boolean }>>();
                
                fileMap.forEach((violations, filePath) => {
                    if (violations.length > 0 && violations[0].isProduction) {
                        prodMap.set(filePath, violations);
                    } else {
                        testMap.set(filePath, violations);
                    }
                });
                
                if (prodMap.size > 0) {
                    productionViolationsByPattern.set(pattern, prodMap);
                }
                if (testMap.size > 0) {
                    testViolationsByPattern.set(pattern, testMap);
                }
            });

            // Generate full details content: FIRST show all production violations
            const patternOrder = ['God Class', 'N+1 Query', 'Layer Violation'];
            
            // Show production violations grouped by pattern
            let hasProductionViolations = false;
            patternOrder.forEach(pattern => {
                if (productionViolationsByPattern.has(pattern)) {
                    hasProductionViolations = true;
                    const patternEmoji = getPatternEmoji(pattern);
                    fullDetailsMarkdown += `## ${patternEmoji} ${pattern}\n\n`;
                    
                    const fileMap = productionViolationsByPattern.get(pattern)!;
                    const sortedFiles = Array.from(fileMap.entries()).sort((a, b) => a[0].localeCompare(b[0]));
                    
                    sortedFiles.forEach(([filePath, violations]) => {
                        // Get relative path for display (normalized to forward slashes)
                        let relativePath: string;
                        try {
                            relativePath = vscode.workspace.asRelativePath(violations[0].uri, false);
                        } catch {
                            relativePath = path.relative(workspaceRoot, filePath);
                        }
                        // Normalize to forward slashes for consistency
                        relativePath = relativePath.split(path.sep).join('/');
                        
                        fullDetailsMarkdown += `### \`${relativePath}\`\n\n`;
                        
                        // Sort violations by line number
                        violations.sort((a, b) => a.line - b.line);
                        
                        violations.forEach(({ diagnostic, line }) => {
                            // Extract message without [Pattern] prefix
                            const message = diagnostic.message.replace(/^\[[^\]]+\]\s*/, '');
                            
                            // Find corresponding raw issue for code snippet (CI/CD evidence)
                            const rawIssue = allRawIssues.find(issue => {
                                const issueFilePath = (issue as any).filePath;
                                return issueFilePath === filePath && issue.line === line;
                            });
                            
                            const codeSnippet = rawIssue?.codeSnippet ? `\n  \`\`\`\n${rawIssue.codeSnippet}\n  \`\`\`` : '';
                            fullDetailsMarkdown += `- **Line ${line}:** ${message}${codeSnippet}\n`;
                        });
                        
                        fullDetailsMarkdown += `\n`;
                    });
                }
            });

            // Handle any other production patterns not in the standard order
            productionViolationsByPattern.forEach((fileMap, pattern) => {
                if (!patternOrder.includes(pattern)) {
                    hasProductionViolations = true;
                    const patternEmoji = getPatternEmoji(pattern);
                    fullDetailsMarkdown += `## ${patternEmoji} ${pattern}\n\n`;
                    
                    const sortedFiles = Array.from(fileMap.entries()).sort((a, b) => a[0].localeCompare(b[0]));
                    
                    sortedFiles.forEach(([filePath, violations]) => {
                        let relativePath: string;
                        try {
                            relativePath = vscode.workspace.asRelativePath(violations[0].uri, false);
                        } catch {
                            relativePath = path.relative(workspaceRoot, filePath);
                        }
                        relativePath = relativePath.split(path.sep).join('/');
                        
                        fullDetailsMarkdown += `### \`${relativePath}\`\n\n`;
                        violations.sort((a, b) => a.line - b.line);
                        violations.forEach(({ diagnostic, line }) => {
                            const message = diagnostic.message.replace(/^\[[^\]]+\]\s*/, '');
                            
                            // Find corresponding raw issue for code snippet (CI/CD evidence)
                            const rawIssue = allRawIssues.find(issue => {
                                const issueFilePath = (issue as any).filePath;
                                return issueFilePath === filePath && issue.line === line;
                            });
                            
                            const codeSnippet = rawIssue?.codeSnippet ? `\n  \`\`\`\n${rawIssue.codeSnippet}\n  \`\`\`` : '';
                            fullDetailsMarkdown += `- **Line ${line}:** ${message}${codeSnippet}\n`;
                        });
                        fullDetailsMarkdown += `\n`;
                    });
                }
            });

            // THEN show all test violations with a single heading
            let hasTestViolations = false;
            testViolationsByPattern.forEach(() => { hasTestViolations = true; });
            
            if (hasTestViolations) {
                fullDetailsMarkdown += `---\n\n`;
                fullDetailsMarkdown += `## 🧪 Test File Violations (excluded from score calculation)\n\n`;
                
                patternOrder.forEach(pattern => {
                    if (testViolationsByPattern.has(pattern)) {
                        const patternEmoji = getPatternEmoji(pattern);
                        fullDetailsMarkdown += `### ${patternEmoji} ${pattern}\n\n`;
                        
                        const fileMap = testViolationsByPattern.get(pattern)!;
                        const sortedFiles = Array.from(fileMap.entries()).sort((a, b) => a[0].localeCompare(b[0]));
                        
                        sortedFiles.forEach(([filePath, violations]) => {
                            // Get relative path for display (normalized to forward slashes)
                            let relativePath: string;
                            try {
                                relativePath = vscode.workspace.asRelativePath(violations[0].uri, false);
                            } catch {
                                relativePath = path.relative(workspaceRoot, filePath);
                            }
                            // Normalize to forward slashes for consistency
                            relativePath = relativePath.split(path.sep).join('/');
                            
                            fullDetailsMarkdown += `#### \`${relativePath}\` *(test file)*\n\n`;
                            
                            // Sort violations by line number
                            violations.sort((a, b) => a.line - b.line);
                            
                            violations.forEach(({ diagnostic, line }) => {
                                // Extract message without [Pattern] prefix
                                const message = diagnostic.message.replace(/^\[[^\]]+\]\s*/, '');
                                
                                // Find corresponding raw issue for code snippet (CI/CD evidence)
                                const rawIssue = allRawIssues.find(issue => {
                                    const issueFilePath = (issue as any).filePath;
                                    return issueFilePath === filePath && issue.line === line;
                                });
                                
                                const codeSnippet = rawIssue?.codeSnippet ? `\n  \`\`\`\n${rawIssue.codeSnippet}\n  \`\`\`` : '';
                                fullDetailsMarkdown += `- **Line ${line}:** ${message}${codeSnippet}\n`;
                            });
                            
                            fullDetailsMarkdown += `\n`;
                        });
                    }
                });

                // Handle any other test patterns not in the standard order
                testViolationsByPattern.forEach((fileMap, pattern) => {
                    if (!patternOrder.includes(pattern)) {
                        const patternEmoji = getPatternEmoji(pattern);
                        fullDetailsMarkdown += `### ${patternEmoji} ${pattern}\n\n`;
                        
                        const sortedFiles = Array.from(fileMap.entries()).sort((a, b) => a[0].localeCompare(b[0]));
                        
                        sortedFiles.forEach(([filePath, violations]) => {
                            let relativePath: string;
                            try {
                                relativePath = vscode.workspace.asRelativePath(violations[0].uri, false);
                            } catch {
                                relativePath = path.relative(workspaceRoot, filePath);
                            }
                            relativePath = relativePath.split(path.sep).join('/');
                            
                            fullDetailsMarkdown += `#### \`${relativePath}\` *(test file)*\n\n`;
                            violations.sort((a, b) => a.line - b.line);
                            violations.forEach(({ diagnostic, line }) => {
                                const message = diagnostic.message.replace(/^\[[^\]]+\]\s*/, '');
                                fullDetailsMarkdown += `- **Line ${line}:** ${message}\n`;
                            });
                            fullDetailsMarkdown += `\n`;
                        });
                    }
                });
            }

            if (!hasProductionViolations && !hasTestViolations) {
                fullDetailsMarkdown += `No violations detected.\n\n`;
            }

            fullDetailsMarkdown += `---\n\n`;
            fullDetailsMarkdown += `Generated by ArchDrift v0.4\n`;

            // Save reports to .archdrift/audits/ folder
            if (workspaceFolder) {
                const auditsDir = path.join(workspaceFolder.uri.fsPath, '.archdrift', 'audits');
                const auditsDirUri = vscode.Uri.file(auditsDir);
                
                // Create directory if it doesn't exist
                try {
                    await vscode.workspace.fs.createDirectory(auditsDirUri);
                } catch (error) {
                    // Directory might already exist, ignore
                }
                
                // Add clickable link to full details (same folder, simple relative path)
                // Since SUMMARY.md and FULL_DETAILS.md are in the same folder, use simple filename
                const linkText = `\n📋 [View Full Details →](FULL_DETAILS.md)\n\n`;
                const lastSeparatorIndex = markdown.lastIndexOf('---\n\n');
                if (lastSeparatorIndex > 0) {
                    markdown = markdown.slice(0, lastSeparatorIndex) + linkText + markdown.slice(lastSeparatorIndex);
                } else {
                    // Fallback: add before footer
                    markdown = markdown.replace('\n---\n\nGenerated by ArchDrift v0.4', linkText + '---\n\nGenerated by ArchDrift v0.4');
                }
                
                const encoder = new TextEncoder();
                
                // Save SUMMARY.md
                const summaryPath = path.join(auditsDir, 'SUMMARY.md');
                const summaryUri = vscode.Uri.file(summaryPath);
                await vscode.workspace.fs.writeFile(summaryUri, encoder.encode(markdown));
                
                // Save FULL_DETAILS.md
                const detailsPath = path.join(auditsDir, 'FULL_DETAILS.md');
                const detailsUri = vscode.Uri.file(detailsPath);
                await vscode.workspace.fs.writeFile(detailsUri, encoder.encode(fullDetailsMarkdown));
                
                // Open the summary file
                const summaryDoc = await vscode.workspace.openTextDocument(summaryUri);
                await vscode.window.showTextDocument(summaryDoc);
                
                outputChannel.appendLine(`[ArchDrift Report] Saved SUMMARY.md to: ${summaryPath}`);
                outputChannel.appendLine(`[ArchDrift Report] Saved FULL_DETAILS.md to: ${detailsPath}`);
                vscode.window.showInformationMessage(`ArchDrift Architecture Audit saved: .archdrift/audits/`);
            } else {
                // Fallback: open as unsaved documents if no workspace
                const summaryDoc = await vscode.workspace.openTextDocument({
                    language: 'markdown',
                    content: markdown
                });
                await vscode.window.showTextDocument(summaryDoc);
                
                const detailsDoc = await vscode.workspace.openTextDocument({
                    language: 'markdown',
                    content: fullDetailsMarkdown
                });
                await vscode.window.showTextDocument(detailsDoc, vscode.ViewColumn.Beside);
                
                outputChannel.appendLine(`[ArchDrift Report] No workspace found, opened as unsaved documents`);
            }

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            outputChannel.appendLine(`Error generating architecture audit: ${errorMessage}`);
            outputChannel.show(true);
            vscode.window.showErrorMessage(`Failed to generate architecture audit: ${errorMessage}`);
        }
    });
    context.subscriptions.push(generateReportCommand);

    // Scan on document open
    context.subscriptions.push(
        vscode.workspace.onDidOpenTextDocument((document) => {
            if (isSupportedFile(document.uri)) {
                scanDocument(document);
            }
        })
    );

    // Scan on document save
    context.subscriptions.push(
        vscode.workspace.onDidSaveTextDocument((document) => {
            if (isSupportedFile(document.uri)) {
                scanDocument(document);
            }
        })
    );

    // Update status bar when active editor changes
    context.subscriptions.push(
        vscode.window.onDidChangeActiveTextEditor((editor) => {
            if (editor && isSupportedFile(editor.document.uri)) {
                scanDocument(editor.document);
            } else {
                statusBarItem.hide();
            }
        })
    );

    // Scan active document on activation
    const activeEditor = vscode.window.activeTextEditor;
    if (activeEditor && isSupportedFile(activeEditor.document.uri)) {
        scanDocument(activeEditor.document);
    }
}

function scanDocument(document: vscode.TextDocument) {
    try {
        // Debug: Log to output channel (visible in Output panel)
        outputChannel.appendLine(`[ArchDrift] scanDocument called for: ${document.uri.fsPath}`);
        
        if (!isSupportedFile(document.uri)) {
            outputChannel.appendLine(`[ArchDrift] File not supported: ${document.uri.fsPath}`);
            diagnosticCollection.delete(document.uri);
            statusBarItem.hide();
            return;
        }

        // Get workspace root for path normalization
        // VS Code provides workspace folders; use the first one that contains this file
        const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
        const workspaceRoot = workspaceFolder ? workspaceFolder.uri.fsPath : null;
        
        outputChannel.appendLine(`[ArchDrift] Workspace root: ${workspaceRoot || 'null'}`);

        const result = analyzeDocument(document, workspaceRoot, outputChannel);
        
        // Log summary
        outputChannel.appendLine(`[ArchDrift] Analysis result: ${result.summary.totalIssues} total issues, ${result.summary.totalPatterns} patterns`);
        result.summary.patternCounts.forEach((count, pattern) => {
            if (count > 0) {
                outputChannel.appendLine(`  → ${pattern}: ${count}`);
            }
        });
        
        // Build diagnostics from raw issues array
        // Keep emitting individual diagnostics for click-to-code
        const diagnostics: vscode.Diagnostic[] = [];
        
        result.rawIssues.forEach(issue => {
            try {
                let range: vscode.Range;
                
                // Use provided range for file-level issues (God Class), otherwise get line range
                if (issue.range) {
                    range = issue.range;
                } else {
                    const lineIndex = Math.max(0, Math.min(issue.line - 1, document.lineCount - 1));
                    const line = document.lineAt(lineIndex);
                    range = line.range;
                }
                
                // Format message with [Pattern] prefix for grouping in Problems panel
                const formattedMessage = `[${issue.pattern}] ${issue.message}`;
                
                // Convert numeric severity to vscode.DiagnosticSeverity enum
                const vscodeSeverity = issue.severity === 0 ? vscode.DiagnosticSeverity.Error :
                                      issue.severity === 1 ? vscode.DiagnosticSeverity.Warning :
                                      issue.severity === 2 ? vscode.DiagnosticSeverity.Information :
                                      vscode.DiagnosticSeverity.Hint;
                
                const diagnostic = new vscode.Diagnostic(
                    range,
                    formattedMessage,
                    vscodeSeverity
                );
                diagnostic.source = 'ArchDrift';
                diagnostics.push(diagnostic);
            } catch (error) {
                // Skip invalid line numbers silently
            }
        });

        // Update status bar using summary (prioritize: Layer Violations > God Class > N+1 > Clean)
        const layerViolationCount = result.summary.patternCounts.get('Layer Violation') || 0;
        const godClassCount = result.summary.patternCounts.get('God Class') || 0;
        const nPlusOneCount = result.summary.patternCounts.get('N+1 Query') || 0;
        
        if (layerViolationCount > 0) {
            statusBarItem.text = `🚫 ArchDrift: Layer violations (${layerViolationCount})`;
            statusBarItem.tooltip = `Layer integrity violations detected: ${layerViolationCount} forbidden dependency(ies)`;
            statusBarItem.show();
        } else if (godClassCount > 0) {
            statusBarItem.text = `🚨 ArchDrift: Oversized (${result.godClass.codeLineCount} lines)`;
            statusBarItem.tooltip = `God Class: ${result.godClass.codeLineCount} code lines (threshold: 500)`;
            statusBarItem.show();
        } else if (nPlusOneCount > 0) {
            statusBarItem.text = `⚠ ArchDrift: N+1 hotspots (${nPlusOneCount})`;
            statusBarItem.tooltip = `N+1 Query violations detected at ${nPlusOneCount} location(s)`;
            statusBarItem.show();
        } else {
            // No issues found
            statusBarItem.text = `✅ ArchDrift: Clean`;
            statusBarItem.tooltip = `No issues detected. Code lines: ${result.godClass.codeLineCount}`;
            statusBarItem.show();
        }

        // Set diagnostics
        diagnosticCollection.set(document.uri, diagnostics);
    } catch (error) {
        // Silently handle any errors during document scanning
        // This prevents unhandled promise rejections
    }
}

export function deactivate() {
    if (diagnosticCollection) {
        diagnosticCollection.dispose();
    }
    if (statusBarItem) {
        statusBarItem.dispose();
    }
}


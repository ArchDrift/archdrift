import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { analyzeDocument, isSupportedFile, AnalysisResult, LayerViolation, countCodeLines, calculateDrift, isProductionCode, RawIssue, VIOLATION_WEIGHTS } from './analyzer';
import { detectProjectDomain, ProjectDomain } from './config/constants';

let diagnosticCollection: vscode.DiagnosticCollection;
let statusBarItem: vscode.StatusBarItem;
let outputChannel: vscode.OutputChannel;

/**
 * Gets a workspace-relative path for use in markdown links.
 * Ensures the path is portable (no absolute paths, drive letters, or user directories).
 * 
 * @param uri - VS Code URI of the file
 * @param workspaceRoot - Workspace root path (for fallback calculation)
 * @returns Workspace-relative path with forward slashes (e.g., "src/analyzer.ts")
 */
function getWorkspaceRelativePath(uri: vscode.Uri, workspaceRoot: string): string {
    let relativePath: string;
    
    try {
        // First try VS Code's built-in method (most reliable)
        relativePath = vscode.workspace.asRelativePath(uri, false);
    } catch {
        // Fallback: use path.relative
        relativePath = path.relative(workspaceRoot, uri.fsPath);
    }
    
    // Check for absolute path BEFORE normalization (path.isAbsolute works with native separators)
    const isAbsoluteBeforeNormalization = path.isAbsolute(relativePath);
    
    // Normalize to forward slashes for cross-platform compatibility
    relativePath = relativePath.split(path.sep).join('/');
    
    // CRITICAL: Ensure we never return an absolute path
    // If path.relative returns an absolute path (e.g., different drives on Windows),
    // or if the path contains drive letters, we need to handle it
    if (isAbsoluteBeforeNormalization || relativePath.match(/^[A-Za-z]:/)) {
        // If we got an absolute path, try to extract just the workspace-relative portion
        // This handles edge cases like files on different drives
        const workspaceRelative = path.relative(workspaceRoot, uri.fsPath);
        if (!path.isAbsolute(workspaceRelative) && !workspaceRelative.match(/^[A-Za-z]:/)) {
            relativePath = workspaceRelative.split(path.sep).join('/');
        } else {
            // Last resort: use just the filename
            relativePath = path.basename(uri.fsPath);
        }
    }
    
    // Remove any leading "./" or "../" that might indicate relative navigation
    // We want clean paths like "src/file.ts", not "./src/file.ts" or "../src/file.ts"
    relativePath = relativePath.replace(/^\.\//, '').replace(/^\.\.\//, '');
    
    // Final safety check: ensure no drive letters, absolute path markers, or user directories remain
    // Check for patterns that indicate absolute paths (Windows drive letters, Unix root paths)
    // Note: Leading "/" without "./" prefix indicates Unix absolute path
    if (relativePath.match(/^[A-Za-z]:/) || (relativePath.startsWith('/') && !relativePath.startsWith('./'))) {
        // Still has absolute path markers - use basename as last resort
        relativePath = path.basename(uri.fsPath);
    }
    
    // Remove leading slash if present (for better portability in markdown)
    // Workspace-relative paths should not start with "/"
    if (relativePath.startsWith('/')) {
        relativePath = relativePath.substring(1);
    }
    
    return relativePath;
}

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

            // Get production-only pattern counts for breakdown table and expert diagnosis
            const productionPatternCounts = new Map<string, { count: number; severity: vscode.DiagnosticSeverity }>();
            allDiagnostics.forEach(({ uri, diagnostic }) => {
                if (isProductionCode(uri.fsPath, workspaceRoot)) {
                    const patternMatch = diagnostic.message.match(/^\[([^\]]+)\]/);
                    const pattern = patternMatch ? patternMatch[1] : 'Unknown';
                    const existing = productionPatternCounts.get(pattern);
                    if (existing) {
                        existing.count++;
                        if (diagnostic.severity < existing.severity) {
                            existing.severity = diagnostic.severity;
                        }
                    } else {
                        productionPatternCounts.set(pattern, {
                            count: 1,
                            severity: diagnostic.severity
                        });
                    }
                }
            });

            // Get top pattern (most issues) - use production only
            const sortedPatterns = Array.from(productionPatternCounts.entries())
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

            // Generate markdown report - Launch-aligned format
            const workspaceName = workspaceFolder.name;
            
            // Detect project domain
            const detectedDomain: ProjectDomain = detectProjectDomain(workspaceName, {
                layer: Array.from(productionPatternCounts.entries()).find(([p]) => p === 'Layer Violation')?.[1]?.count || 0,
                nPlusOne: Array.from(productionPatternCounts.entries()).find(([p]) => p === 'N+1 Query')?.[1]?.count || 0,
                godClass: Array.from(productionPatternCounts.entries()).find(([p]) => p === 'God Class')?.[1]?.count || 0
            });
            let markdown = `# ArchDrift Architectural Drift Analysis\n\n`;
            markdown += `**Workspace:** ${workspaceName}\n\n`;
            markdown += `---\n\n`;
            
            // Architectural Drift (Snapshot) - Launch-aligned header
            markdown += `## Architectural Drift (Snapshot): **${driftScoreRounded}%**\n\n`;
            markdown += `[${driftBar}]\n\n`;
            markdown += `Point-in-time estimate of architectural risk based on structural signals in production code.\nMost useful when evaluated across multiple scans.\n\n`;
            markdown += `Architectural drift becomes meaningful when tracked over time.\n\n`;
            markdown += `---\n\n`;
            
            // Detected Domain Section
            markdown += `**Detected Domain:** ${detectedDomain}\n\n`;
            markdown += `Scoring emphasizes architectural risks most relevant to this type of project.\n\n`;
            markdown += `---\n\n`;
            
            // Check if there are any production violations
            const hasProductionViolations = productionIssues > 0;
            const productionDiagnosticsCount = allDiagnostics.filter(({ uri }) => isProductionCode(uri.fsPath, workspaceRoot)).length;
            const hasTestViolations = allDiagnostics.length > productionDiagnosticsCount;
            
            // Primary Drift Contributors Section (replaces Expert Diagnosis)
            markdown += `### Primary Drift Contributors\n\n`;
            
            if (driftScoreRounded <= 0 && !hasProductionViolations) {
                // Zero-violation messaging (Snapshot, Not "Perfect")
                markdown += `**No Architectural Risk Signals Detected (Snapshot)**\n\n`;
                markdown += `No architectural violations were found in production code at this point in time.\n\n`;
                if (hasTestViolations) {
                    markdown += `*Note: ${allDiagnostics.length - productionDiagnosticsCount} violation${allDiagnostics.length - productionDiagnosticsCount > 1 ? 's' : ''} found in test files (excluded from drift calculation)*\n\n`;
                }
            } else {
                // List the three dimensions without presenting them as exact sub-scores
                markdown += `**Structural Drift**\n`;
                markdown += `Risk signals from layer violations and architectural coupling patterns\n\n`;
                markdown += `**Performance Drift**\n`;
                markdown += `Risk signals from N+1 queries and data-access patterns\n\n`;
                markdown += `**Complexity Drift**\n`;
                markdown += `Risk signals from large files and monolithic structures\n\n`;
            }
            markdown += `---\n\n`;
            
            // Baseline & Pro Prompt Section (before Top Offenders)
            markdown += `### Track Changes Over Time\n\n`;
            // TODO: Implement Pro user check and baseline logic
            // For now, show placeholder message
            markdown += `No baseline has been set for this workspace.\n\n`;
            markdown += `Set a baseline to begin monitoring whether architectural risk\n`;
            markdown += `is increasing or decreasing as the codebase evolves.\n\n`;
            markdown += `---\n\n`;

            // Top Offenders
            markdown += `## Top Offenders\n\n`;
            if (topOffenders.length > 0) {
                topOffenders.forEach(([filePath, data], index) => {
                    // Get workspace-relative path (portable, no absolute paths)
                    const relativePath = getWorkspaceRelativePath(data.uri, workspaceRoot);
                    
                    // Use workspace-relative path for VS Code-compatible links (works across machines/OS)
                    const lineNumber = data.firstLine > 0 ? `#L${data.firstLine}` : '';
                    const linkPath = `${relativePath}${lineNumber}`;
                    
                    markdown += `${index + 1}. [${relativePath}${lineNumber ? `:${data.firstLine}` : ''}](${linkPath}) - ${data.count} issue${data.count > 1 ? 's' : ''}\n`;
                });
            } else {
                markdown += `No offenders found.\n`;
            }

            markdown += `\n---\n\n`;

            // Pattern Breakdown Table (qualitative contribution, not severity)
            markdown += `## Pattern Breakdown\n\n`;
            markdown += `| Pattern | Count | Contribution |\n`;
            markdown += `|---------|-------|--------------|\n`;
            
            if (sortedPatterns.length > 0) {
                // Determine contribution level based on count relative to total
                const totalViolations = sortedPatterns.reduce((sum, [, data]) => sum + data.count, 0);
                sortedPatterns.forEach(([pattern, data]) => {
                    // Determine contribution: Primary (>50%), Significant (20-50%), Minor (<20%)
                    const contributionPercent = totalViolations > 0 ? (data.count / totalViolations) * 100 : 0;
                    let contribution: string;
                    if (contributionPercent > 50) {
                        contribution = 'Primary';
                    } else if (contributionPercent >= 20) {
                        contribution = 'Significant';
                    } else {
                        contribution = 'Minor';
                    }
                    markdown += `| ${pattern} | ${data.count} | ${contribution} |\n`;
                });
            } else {
                markdown += `| *No issues detected* | 0 | None |\n`;
            }
            
            // Show test violations count if any exist
            if (hasTestViolations) {
                const testPatternCounts = new Map<string, number>();
                allDiagnostics.forEach(({ uri, diagnostic }) => {
                    if (!isProductionCode(uri.fsPath, workspaceRoot)) {
                        const patternMatch = diagnostic.message.match(/^\[([^\]]+)\]/);
                        const pattern = patternMatch ? patternMatch[1] : 'Unknown';
                        testPatternCounts.set(pattern, (testPatternCounts.get(pattern) || 0) + 1);
                    }
                });
                if (testPatternCounts.size > 0) {
                    markdown += `\n*Note: ${Array.from(testPatternCounts.values()).reduce((a, b) => a + b, 0)} violation${Array.from(testPatternCounts.values()).reduce((a, b) => a + b, 0) > 1 ? 's' : ''} found in test files (excluded from drift calculation)*\n`;
                }
            }

            markdown += `\n---\n\n`;
            markdown += `**About this score:**\n`;
            markdown += `Drift highlights architectural risk signals that affect long-term maintainability and velocity.\n\n`;
            markdown += `Generated by ArchDrift v1.0\n`;

            // Generate FULL_DETAILS.md with line-by-line breakdown
            let fullDetailsMarkdown = `# 📋 ArchDrift Full Details\n\n`;
            fullDetailsMarkdown += `**Generated:** ${new Date().toLocaleString()}\n\n`;
            fullDetailsMarkdown += `## Detected Architectural Risk Signals\n\n`;
            fullDetailsMarkdown += `The following findings list architectural risk signals detected\n`;
            fullDetailsMarkdown += `in production code during this scan.\n\n`;
            fullDetailsMarkdown += `Each signal is anchored to a specific file and line number.\n`;
            fullDetailsMarkdown += `These signals contribute to the overall architectural drift snapshot\n`;
            fullDetailsMarkdown += `shown in the workspace summary.\n\n`;
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
            let hasProductionViolationsInDetails = false;
            patternOrder.forEach(pattern => {
                if (productionViolationsByPattern.has(pattern)) {
                    hasProductionViolationsInDetails = true;
                    const patternEmoji = getPatternEmoji(pattern);
                    fullDetailsMarkdown += `---\n\n## ${patternEmoji} ${pattern}\n\n`;
                    
                    const fileMap = productionViolationsByPattern.get(pattern)!;
                    const sortedFiles = Array.from(fileMap.entries()).sort((a, b) => a[0].localeCompare(b[0]));
                    
                    sortedFiles.forEach(([filePath, violations]) => {
                        // Get workspace-relative path (portable, no absolute paths)
                        const relativePath = getWorkspaceRelativePath(violations[0].uri, workspaceRoot);
                        
                        // Use workspace-relative path for VS Code-compatible links (works across machines/OS)
                        const linkPath = relativePath;
                        fullDetailsMarkdown += `### [\`${relativePath}\`](${linkPath})\n\n`;
                        
                        // Sort violations by line number
                        violations.sort((a, b) => a.line - b.line);
                        
                        violations.forEach(({ diagnostic, line }) => {
                            // Extract message without [Pattern] prefix
                            const message = diagnostic.message.replace(/^\[[^\]]+\]\s*/, '');
                            
                            // Detect file-level violations (God Class spans entire file)
                            const isFileLevel = diagnostic.range.end.line - diagnostic.range.start.line > 10 || 
                                               pattern === 'God Class';
                            const lineLabel = isFileLevel ? 'File-level' : `Line ${line}`;
                            
                            // Find corresponding raw issue for code snippet (CI/CD evidence)
                            const rawIssue = allRawIssues.find(issue => {
                                const issueFilePath = (issue as any).filePath;
                                return issueFilePath === filePath && issue.line === line;
                            });
                            
                            const codeSnippet = rawIssue?.codeSnippet ? `\n  \`\`\`\n${rawIssue.codeSnippet}\n  \`\`\`` : '';
                            fullDetailsMarkdown += `- **${lineLabel}:** ${message}${codeSnippet}\n`;
                        });
                        
                        fullDetailsMarkdown += `\n`;
                    });
                }
            });

            // Handle any other production patterns not in the standard order
            productionViolationsByPattern.forEach((fileMap, pattern) => {
                if (!patternOrder.includes(pattern)) {
                    hasProductionViolationsInDetails = true;
                    const patternEmoji = getPatternEmoji(pattern);
                    fullDetailsMarkdown += `---\n\n## ${patternEmoji} ${pattern}\n\n`;
                    
                    const sortedFiles = Array.from(fileMap.entries()).sort((a, b) => a[0].localeCompare(b[0]));
                    
                    sortedFiles.forEach(([filePath, violations]) => {
                        // Get workspace-relative path (portable, no absolute paths)
                        const relativePath = getWorkspaceRelativePath(violations[0].uri, workspaceRoot);
                        
                        // Use workspace-relative path for VS Code-compatible links (works across machines/OS)
                        const linkPathOther = relativePath;
                        fullDetailsMarkdown += `### [\`${relativePath}\`](${linkPathOther})\n\n`;
                        violations.sort((a, b) => a.line - b.line);
                        violations.forEach(({ diagnostic, line }) => {
                            const message = diagnostic.message.replace(/^\[[^\]]+\]\s*/, '');
                            
                            // Detect file-level violations (God Class spans entire file)
                            const isFileLevel = diagnostic.range.end.line - diagnostic.range.start.line > 10 || 
                                               pattern === 'God Class';
                            const lineLabel = isFileLevel ? 'File-level' : `Line ${line}`;
                            
                            // Find corresponding raw issue for code snippet (CI/CD evidence)
                            const rawIssue = allRawIssues.find(issue => {
                                const issueFilePath = (issue as any).filePath;
                                return issueFilePath === filePath && issue.line === line;
                            });
                            
                            const codeSnippet = rawIssue?.codeSnippet ? `\n  \`\`\`\n${rawIssue.codeSnippet}\n  \`\`\`` : '';
                            fullDetailsMarkdown += `- **${lineLabel}:** ${message}${codeSnippet}\n`;
                        });
                        fullDetailsMarkdown += `\n`;
                    });
                }
            });

            // THEN show all test violations with a single heading
            const hasTestViolationsInDetails = testViolationsByPattern.size > 0;
            
            if (hasTestViolationsInDetails) {
                fullDetailsMarkdown += `---\n\n`;
                fullDetailsMarkdown += `## 🧪 Test File Violations\n\n`;
                fullDetailsMarkdown += `The following signals were detected in test files.\n`;
                fullDetailsMarkdown += `Test file signals are excluded from the architectural drift snapshot.\n\n`;
                
                patternOrder.forEach(pattern => {
                    if (testViolationsByPattern.has(pattern)) {
                        const patternEmoji = getPatternEmoji(pattern);
                        fullDetailsMarkdown += `---\n\n### ${patternEmoji} ${pattern}\n\n`;
                        
                        const fileMap = testViolationsByPattern.get(pattern)!;
                        const sortedFiles = Array.from(fileMap.entries()).sort((a, b) => a[0].localeCompare(b[0]));
                        
                        sortedFiles.forEach(([filePath, violations]) => {
                            // Get workspace-relative path (portable, no absolute paths)
                            const relativePath = getWorkspaceRelativePath(violations[0].uri, workspaceRoot);
                            
                            // Use workspace-relative path for VS Code-compatible links (works across machines/OS)
                            const linkPathTest = relativePath;
                            fullDetailsMarkdown += `#### [\`${relativePath}\`](${linkPathTest}) *(test file)*\n\n`;
                            
                            // Sort violations by line number
                            violations.sort((a, b) => a.line - b.line);
                            
                            violations.forEach(({ diagnostic, line }) => {
                                // Extract message without [Pattern] prefix
                                const message = diagnostic.message.replace(/^\[[^\]]+\]\s*/, '');
                                
                                // Detect file-level violations (God Class spans entire file)
                                const isFileLevel = diagnostic.range.end.line - diagnostic.range.start.line > 10 || 
                                                   pattern === 'God Class';
                                const lineLabel = isFileLevel ? 'File-level' : `Line ${line}`;
                                
                                // Find corresponding raw issue for code snippet (CI/CD evidence)
                                const rawIssue = allRawIssues.find(issue => {
                                    const issueFilePath = (issue as any).filePath;
                                    return issueFilePath === filePath && issue.line === line;
                                });
                                
                                const codeSnippet = rawIssue?.codeSnippet ? `\n  \`\`\`\n${rawIssue.codeSnippet}\n  \`\`\`` : '';
                                fullDetailsMarkdown += `- **${lineLabel}:** ${message}${codeSnippet}\n`;
                            });
                            
                            fullDetailsMarkdown += `\n`;
                        });
                    }
                });

                // Handle any other test patterns not in the standard order
                testViolationsByPattern.forEach((fileMap, pattern) => {
                    if (!patternOrder.includes(pattern)) {
                        const patternEmoji = getPatternEmoji(pattern);
                        fullDetailsMarkdown += `---\n\n### ${patternEmoji} ${pattern}\n\n`;
                        
                        const sortedFiles = Array.from(fileMap.entries()).sort((a, b) => a[0].localeCompare(b[0]));
                        
                        sortedFiles.forEach(([filePath, violations]) => {
                            // Get workspace-relative path (portable, no absolute paths)
                            const relativePath = getWorkspaceRelativePath(violations[0].uri, workspaceRoot);
                            
                            // Use workspace-relative path for VS Code-compatible links (works across machines/OS)
                            const linkPathTestOther = relativePath;
                            fullDetailsMarkdown += `#### [\`${relativePath}\`](${linkPathTestOther}) *(test file)*\n\n`;
                            violations.sort((a, b) => a.line - b.line);
                            violations.forEach(({ diagnostic, line }) => {
                                const message = diagnostic.message.replace(/^\[[^\]]+\]\s*/, '');
                                
                                // Detect file-level violations (God Class spans entire file)
                                const isFileLevel = diagnostic.range.end.line - diagnostic.range.start.line > 10 || 
                                                   pattern === 'God Class';
                                const lineLabel = isFileLevel ? 'File-level' : `Line ${line}`;
                                
                                fullDetailsMarkdown += `- **${lineLabel}:** ${message}\n`;
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
            fullDetailsMarkdown += `Generated by ArchDrift v1.0\n`;

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


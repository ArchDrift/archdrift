import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { analyzeDocument, isSupportedFile, getNormalizedRelativePath, AnalysisResult } from './analyzer';

export interface WorkspaceReport {
    timestamp: string;
    workspaceName: string;
    filesScanned: number;
    errors: Array<{ filePath: string; error: string }>;
    godClasses: Array<{ filePath: string; relativePath: string; lineCount: number }>;
    nPlusOnePatterns: Array<{ filePath: string; relativePath: string; lineNumber: number; snippet: string }>;
    layerViolations: Array<{ filePath: string; relativePath: string; lineNumber: number; violation: string; sourceLayer: string; targetLayer: string }>;
    unmappedFiles: Array<{ filePath: string; relativePath: string; reason: string }>;
}

export async function generateWorkspaceReport(
    progress: vscode.Progress<{ message?: string; increment?: number }>,
    token: vscode.CancellationToken,
    outputChannel: vscode.OutputChannel
): Promise<WorkspaceReport> {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders || workspaceFolders.length === 0) {
        throw new Error('No workspace folder open');
    }

    const workspaceFolder = workspaceFolders[0];
    const workspaceRoot = workspaceFolder.uri.fsPath;
    const workspaceName = workspaceFolder.name;

    outputChannel.appendLine('=== ArchDrift Workspace Report Generation ===');
    outputChannel.appendLine(`Workspace: ${workspaceName}`);
    outputChannel.appendLine(`Root: ${workspaceRoot}`);

    // File discovery
    progress.report({ message: 'Discovering files...' });
    const excludePatterns = [
        '**/node_modules/**',
        '**/dist/**',
        '**/build/**',
        '**/out/**',
        '**/.git/**',
        '**/coverage/**'
    ];

    const files = await vscode.workspace.findFiles(
        '**/*.{js,ts,jsx,tsx}',
        `{${excludePatterns.join(',')}}`,
        10000
    );

    if (files.length === 0) {
        outputChannel.appendLine('No source files found in workspace');
        return {
            timestamp: new Date().toISOString(),
            workspaceName,
            filesScanned: 0,
            errors: [],
            godClasses: [],
            nPlusOnePatterns: [],
            layerViolations: [],
            unmappedFiles: []
        };
    }

    outputChannel.appendLine(`Found ${files.length} files to scan`);

    const report: WorkspaceReport = {
        timestamp: new Date().toISOString(),
        workspaceName,
        filesScanned: 0,
        errors: [],
        godClasses: [],
        nPlusOnePatterns: [],
        layerViolations: [],
        unmappedFiles: []
    };

    // Scan files with progress
    const totalFiles = files.length;
    let scanned = 0;
    const updateInterval = 50; // Update progress every 50 files

    for (const fileUri of files) {
        if (token.isCancellationRequested) {
            outputChannel.appendLine('Scan cancelled by user');
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

            // Read file content
            let document: vscode.TextDocument;
            try {
                document = await vscode.workspace.openTextDocument(fileUri);
            } catch (error) {
                report.errors.push({
                    filePath: fileUri.fsPath,
                    error: `Could not open file: ${error instanceof Error ? error.message : String(error)}`
                });
                continue;
            }

            // Get workspace-relative path
            const relativePath = getNormalizedRelativePath(fileUri.fsPath, workspaceRoot);

            // Analyze document
            let result: AnalysisResult;
            try {
                result = analyzeDocument(document, workspaceRoot);
                report.filesScanned++;
            } catch (error) {
                report.errors.push({
                    filePath: fileUri.fsPath,
                    error: `Analysis failed: ${error instanceof Error ? error.message : String(error)}`
                });
                continue;
            }

            // Collect God Classes
            if (result.godClass.isGodClass) {
                report.godClasses.push({
                    filePath: fileUri.fsPath,
                    relativePath: relativePath,
                    lineCount: result.godClass.codeLineCount
                });
            }

            // Collect N+1 patterns
            for (const lineNumber of result.nPlusOne.violations) {
                try {
                    const line = document.lineAt(lineNumber - 1);
                    report.nPlusOnePatterns.push({
                        filePath: fileUri.fsPath,
                        relativePath: relativePath,
                        lineNumber: lineNumber,
                        snippet: line.text.trim().substring(0, 100) // First 100 chars
                    });
                } catch (error) {
                    // Skip invalid line numbers
                }
            }

            // Collect layer violations
            for (const violation of result.layerViolations) {
                report.layerViolations.push({
                    filePath: fileUri.fsPath,
                    relativePath: relativePath,
                    lineNumber: violation.line,
                    violation: violation.importText,
                    sourceLayer: violation.sourceLayer,
                    targetLayer: violation.targetLayer
                });
            }

        } catch (error) {
            report.errors.push({
                filePath: fileUri.fsPath,
                error: `Unexpected error: ${error instanceof Error ? error.message : String(error)}`
            });
        }
    }

    if (token.isCancellationRequested) {
        outputChannel.appendLine(`Scan incomplete (cancelled by user). Scanned ${report.filesScanned} files.`);
    } else {
        outputChannel.appendLine(`Scan complete. Scanned ${report.filesScanned} files.`);
    }

    return report;
}

export function writeReportToOutputChannel(report: WorkspaceReport, outputChannel: vscode.OutputChannel): void {
    outputChannel.clear();
    outputChannel.appendLine('ArchDrift Workspace Report');
    outputChannel.appendLine(`Generated: ${new Date(report.timestamp).toLocaleString()}`);
    outputChannel.appendLine('');
    outputChannel.appendLine(`Scanned: ${report.filesScanned} files`);
    outputChannel.appendLine(`Errors: ${report.errors.length} files${report.errors.length > 0 ? ' (see below)' : ''}`);
    outputChannel.appendLine('');
    outputChannel.appendLine('Summary:');
    outputChannel.appendLine(`- God Classes: ${report.godClasses.length}`);
    outputChannel.appendLine(`- N+1 Patterns: ${report.nPlusOnePatterns.length}`);
    outputChannel.appendLine(`- Layer Violations: ${report.layerViolations.length}`);
    outputChannel.appendLine('');

    if (report.errors.length > 0) {
        outputChannel.appendLine('Errors:');
        report.errors.forEach(err => {
            outputChannel.appendLine(`  ${err.filePath}: ${err.error}`);
        });
        outputChannel.appendLine('');
    }

    if (report.godClasses.length > 0) {
        outputChannel.appendLine('God Classes:');
        report.godClasses.forEach(gc => {
            outputChannel.appendLine(`  ${gc.relativePath} - ${gc.lineCount} lines`);
        });
        outputChannel.appendLine('');
    }

    if (report.nPlusOnePatterns.length > 0) {
        outputChannel.appendLine('N+1 Patterns:');
        report.nPlusOnePatterns.forEach(n1 => {
            outputChannel.appendLine(`  ${n1.relativePath}:${n1.lineNumber} - ${n1.snippet}`);
        });
        outputChannel.appendLine('');
    }

    if (report.layerViolations.length > 0) {
        outputChannel.appendLine('Layer Violations:');
        report.layerViolations.forEach(lv => {
            outputChannel.appendLine(`  ${lv.relativePath}:${lv.lineNumber} - ${lv.sourceLayer} → ${lv.targetLayer} (${lv.violation})`);
        });
        outputChannel.appendLine('');
    }

    if (report.unmappedFiles.length > 0) {
        outputChannel.appendLine('Unmapped Files:');
        report.unmappedFiles.forEach(uf => {
            outputChannel.appendLine(`  ${uf.relativePath} - ${uf.reason}`);
        });
    }
}

export function generateMarkdownReport(report: WorkspaceReport, workspaceRoot: string): string {
    const timestamp = new Date(report.timestamp).toLocaleString();
    
    let markdown = `# ArchDrift Workspace Report\n`;
    markdown += `**Generated:** ${timestamp}  \n`;
    markdown += `**Workspace:** ${report.workspaceName}\n\n`;
    markdown += `---\n\n`;

    // Executive Summary
    markdown += `## Executive Summary\n\n`;
    markdown += `| Metric | Count |\n`;
    markdown += `|--------|-------|\n`;
    markdown += `| Files Scanned | ${report.filesScanned} |\n`;
    markdown += `| God Classes | ${report.godClasses.length} |\n`;
    markdown += `| N+1 Patterns | ${report.nPlusOnePatterns.length} |\n`;
    markdown += `| Layer Violations | ${report.layerViolations.length} |\n`;
    markdown += `| Errors | ${report.errors.length} |\n\n`;
    markdown += `---\n\n`;

    // Top Offenders
    markdown += `## Top Offenders\n\n`;

    // Largest Files (Top 10)
    const sortedGodClasses = [...report.godClasses].sort((a, b) => b.lineCount - a.lineCount).slice(0, 10);
    if (sortedGodClasses.length > 0) {
        markdown += `### Largest Files (Top ${Math.min(10, sortedGodClasses.length)})\n\n`;
        sortedGodClasses.forEach((gc, index) => {
            // Use file:/// URI format for VS Code links
            const fileUri = vscode.Uri.file(gc.filePath);
            const uriString = fileUri.toString();
            markdown += `${index + 1}. [${gc.relativePath}:1](${uriString}#L1) - ${gc.lineCount.toLocaleString()} lines\n`;
        });
        markdown += `\n`;
    }

    // Most Critical N+1 Patterns (Top 10)
    const topNPlusOne = report.nPlusOnePatterns.slice(0, 10);
    if (topNPlusOne.length > 0) {
        markdown += `### Most Critical N+1 Patterns\n\n`;
        topNPlusOne.forEach((n1, index) => {
            // Use file:/// URI format for VS Code links
            const fileUri = vscode.Uri.file(n1.filePath);
            const uriString = fileUri.toString();
            // Escape backticks in snippet for markdown
            const escapedSnippet = n1.snippet.replace(/`/g, '\\`');
            markdown += `${index + 1}. [${n1.relativePath}:${n1.lineNumber}](${uriString}#L${n1.lineNumber}) - \`${escapedSnippet}\`\n`;
        });
        markdown += `\n`;
    }

    // Layer Violations by Source
    if (report.layerViolations.length > 0) {
        markdown += `### Layer Violations by Source\n\n`;
        
        // Group by sourceLayer → targetLayer
        const violationsByPattern = new Map<string, typeof report.layerViolations>();
        report.layerViolations.forEach(v => {
            const key = `${v.sourceLayer} → ${v.targetLayer}`;
            if (!violationsByPattern.has(key)) {
                violationsByPattern.set(key, []);
            }
            violationsByPattern.get(key)!.push(v);
        });

        violationsByPattern.forEach((violations, pattern) => {
            markdown += `**${pattern}:**\n`;
            violations.forEach(v => {
                // Use file:/// URI format for VS Code links
                const fileUri = vscode.Uri.file(v.filePath);
                const uriString = fileUri.toString();
                // Escape special characters in violation text
                const escapedViolation = v.violation.replace(/[`*_]/g, '\\$&');
                markdown += `- [${v.relativePath}:${v.lineNumber}](${uriString}#L${v.lineNumber}) - importing from \`${escapedViolation}\`\n`;
            });
            markdown += `\n`;
        });
    }

    markdown += `---\n\n`;

    // Detailed Findings
    markdown += `## Detailed Findings\n\n`;

    // God Classes
    if (report.godClasses.length > 0) {
        markdown += `### God Classes (${report.godClasses.length})\n\n`;
        const sortedGC = [...report.godClasses].sort((a, b) => b.lineCount - a.lineCount);
        sortedGC.forEach(gc => {
            const fileUri = vscode.Uri.file(gc.filePath);
            const uriString = fileUri.toString();
            markdown += `- [${gc.relativePath}:1](${uriString}#L1) - ${gc.lineCount.toLocaleString()} lines\n`;
        });
        markdown += `\n`;
    }

    // N+1 Patterns
    if (report.nPlusOnePatterns.length > 0) {
        markdown += `### N+1 Patterns (${report.nPlusOnePatterns.length})\n\n`;
        report.nPlusOnePatterns.forEach(n1 => {
            const fileUri = vscode.Uri.file(n1.filePath);
            const uriString = fileUri.toString();
            // Escape backticks in snippet
            const escapedSnippet = n1.snippet.replace(/`/g, '\\`');
            markdown += `- [${n1.relativePath}:${n1.lineNumber}](${uriString}#L${n1.lineNumber}) - \`${escapedSnippet}\`\n`;
        });
        markdown += `\n`;
    }

    // Layer Violations
    if (report.layerViolations.length > 0) {
        markdown += `### Layer Violations (${report.layerViolations.length})\n\n`;
        report.layerViolations.forEach(lv => {
            const fileUri = vscode.Uri.file(lv.filePath);
            const uriString = fileUri.toString();
            // Escape special characters in violation text
            const escapedViolation = lv.violation.replace(/[`*_]/g, '\\$&');
            markdown += `- [${lv.relativePath}:${lv.lineNumber}](${uriString}#L${lv.lineNumber}) - ${lv.sourceLayer} importing from ${lv.targetLayer} (\`${escapedViolation}\`)\n`;
        });
        markdown += `\n`;
    }

    // Unmapped Files
    if (report.unmappedFiles.length > 0) {
        markdown += `### Unmapped Files\n\n`;
        markdown += `These files could not be classified into a known layer:\n\n`;
        report.unmappedFiles.forEach(uf => {
            markdown += `- ${uf.relativePath} - ${uf.reason}\n`;
        });
        markdown += `\n`;
    }

    // Errors
    if (report.errors.length > 0) {
        markdown += `### Errors (${report.errors.length})\n\n`;
        markdown += `Files that could not be analyzed:\n\n`;
        report.errors.forEach(err => {
            const relativePath = getNormalizedRelativePath(err.filePath, workspaceRoot);
            markdown += `- ${relativePath} - ${err.error}\n`;
        });
        markdown += `\n`;
    }

    // Clean bill of health
    if (report.godClasses.length === 0 && 
        report.nPlusOnePatterns.length === 0 && 
        report.layerViolations.length === 0) {
        markdown += `## ✅ Clean Bill of Health\n\n`;
        markdown += `Congratulations! Your workspace shows no architectural issues detected by ArchDrift.\n\n`;
    }

    markdown += `---\n\n`;
    markdown += `*Report generated by ArchDrift v0.3*\n`;

    return markdown;
}


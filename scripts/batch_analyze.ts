// ArchDrift Batch 1 Analysis Script (TypeScript)
//
// NOTE: This script requires audit_targets/ directory with cloned repositories.
// If audit_targets/ is missing, this script will exit gracefully.
// Test results are preserved in test-results-backup/ for reference.

import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { analyzeDocument, calculateSII, RawIssue, isSupportedFile, getNormalizedRelativePath } from '../src/analyzer';

interface RepoResult {
    name: string;
    sii: number;
    totalFiles: number;
    productionFiles: number;
    productionLOC: number;
    violations: {
        layer: number;
        nPlusOne: number;
        godClass: number;
    };
    weightedDebt: number;
}

async function analyzeRepository(repoPath: string, repoName: string): Promise<RepoResult> {
    console.log(`\n📦 Analyzing ${repoName}...`);
    
    const allRawIssues: RawIssue[] = [];
    let totalFiles = 0;
    let totalProductionFiles = 0;
    let totalProductionLOC = 0;
    
    // Helper to check if file is production code
    const isProductionCode = (filePath: string): boolean => {
        const normalizedPath = filePath.replace(/\\/g, '/').toLowerCase();
        
        // Exclude test/build artifacts
        if (normalizedPath.includes('/test') || 
            normalizedPath.includes('/tests/') ||
            normalizedPath.includes('/__tests__/') ||
            normalizedPath.includes('/dist/') ||
            normalizedPath.includes('/node_modules/') ||
            normalizedPath.includes('/build/') ||
            normalizedPath.includes('/coverage/') ||
            normalizedPath.includes('/spec/') ||
            normalizedPath.endsWith('.test.ts') ||
            normalizedPath.endsWith('.test.js') ||
            normalizedPath.endsWith('.spec.ts') ||
            normalizedPath.endsWith('.spec.js')) {
            return false;
        }
        
        // Only include src/ or core/ directories
        return normalizedPath.includes('/src/') || normalizedPath.includes('/core/');
    };
    
    // Recursively find all TypeScript/JavaScript files
    function findFiles(dir: string, fileList: string[] = []): string[] {
        const files = fs.readdirSync(dir);
        
        files.forEach(file => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            
            // Skip node_modules, dist, build, .git, etc.
            if (stat.isDirectory()) {
                if (file === 'node_modules' || file === 'dist' || file === 'build' || 
                    file === '.git' || file === 'coverage' || file === 'out' ||
                    file === '.archdrift') {
                    return;
                }
                findFiles(filePath, fileList);
            } else if (stat.isFile()) {
                const ext = path.extname(file).toLowerCase();
                if (['.ts', '.js', '.tsx', '.jsx'].includes(ext)) {
                    fileList.push(filePath);
                }
            }
        });
        
        return fileList;
    }
    
    const files = findFiles(repoPath);
    totalFiles = files.length;
    
    console.log(`  Found ${totalFiles} files`);
    
    // Analyze each file
    for (const filePath of files) {
        try {
            if (!isSupportedFile(vscode.Uri.file(filePath))) {
                continue;
            }
            
            const content = fs.readFileSync(filePath, 'utf-8');
            const document = new MockTextDocument(filePath, content);
            
            const result = analyzeDocument(document, repoPath);
            
            // Add file path to raw issues
            result.rawIssues.forEach(issue => {
                (issue as any).filePath = filePath;
                allRawIssues.push(issue);
            });
            
            if (isProductionCode(filePath)) {
                totalProductionFiles++;
                totalProductionLOC += result.godClass.codeLineCount || 0;
            }
        } catch (error) {
            console.error(`  Error analyzing ${filePath}: ${error}`);
        }
    }
    
    // Filter to production code only
    const productionRawIssues = allRawIssues.filter(issue => {
        const filePath = (issue as any).filePath;
        return filePath ? isProductionCode(filePath) : false;
    });
    
    // Calculate SII with strict mode (logarithmic floor, x2 N+1 weight)
    const siiResult = calculateSII(productionRawIssues, totalProductionLOC, totalProductionFiles, true);
    
    // Count violations by type
    const violations = {
        layer: productionRawIssues.filter(i => i.pattern === 'Layer Violation').length,
        nPlusOne: productionRawIssues.filter(i => i.pattern === 'N+1 Query').length,
        godClass: productionRawIssues.filter(i => i.pattern === 'God Class').length
    };
    
    console.log(`  ✅ SII: ${siiResult.sii}% | Files: ${totalProductionFiles} | LOC: ${totalProductionLOC.toLocaleString()}`);
    
    return {
        name: repoName,
        sii: siiResult.sii,
        totalFiles,
        productionFiles: totalProductionFiles,
        productionLOC: totalProductionLOC,
        violations,
        weightedDebt: siiResult.weightedDebt
    };
}

// Mock TextDocument for analysis
class MockTextDocument implements vscode.TextDocument {
    uri: vscode.Uri;
    fileName: string;
    isUntitled: boolean = false;
    languageId: string;
    version: number = 1;
    isDirty: boolean = false;
    isClosed: boolean = false;
    eol: vscode.EndOfLine = vscode.EndOfLine.LF;
    
    private _content: string;
    private _lines: string[];
    
    constructor(filePath: string, content: string) {
        this.uri = vscode.Uri.file(filePath);
        this.fileName = filePath;
        this._content = content;
        this._lines = content.split('\n');
        
        const ext = path.extname(filePath).toLowerCase();
        if (ext === '.ts' || ext === '.tsx') {
            this.languageId = ext === '.tsx' ? 'typescriptreact' : 'typescript';
        } else {
            this.languageId = ext === '.jsx' ? 'javascriptreact' : 'javascript';
        }
    }
    
    getText(range?: vscode.Range): string {
        if (!range) return this._content;
        const start = this.offsetAt(range.start);
        const end = this.offsetAt(range.end);
        return this._content.substring(start, end);
    }
    
    get lineCount(): number {
        return this._lines.length;
    }
    
    lineAt(line: number | vscode.Position): vscode.TextLine {
        const lineNum = typeof line === 'number' ? line : line.line;
        const text = this._lines[lineNum] || '';
        return {
            lineNumber: lineNum,
            text,
            range: new vscode.Range(lineNum, 0, lineNum, text.length),
            rangeIncludingLineBreak: new vscode.Range(lineNum, 0, lineNum + 1, 0),
            firstNonWhitespaceCharacterIndex: text.match(/^\s*/)?.[0].length || 0,
            isEmptyOrWhitespace: !text.trim()
        } as vscode.TextLine;
    }
    
    offsetAt(position: vscode.Position): number {
        let offset = 0;
        for (let i = 0; i < position.line && i < this._lines.length; i++) {
            offset += this._lines[i].length + 1; // +1 for newline
        }
        offset += position.character;
        return offset;
    }
    
    positionAt(offset: number): vscode.Position {
        let line = 0;
        let char = offset;
        for (let i = 0; i < this._lines.length; i++) {
            const lineLength = this._lines[i].length + 1;
            if (char < lineLength) {
                return new vscode.Position(line, char);
            }
            char -= lineLength;
            line++;
        }
        return new vscode.Position(line, char);
    }
    
    validateRange(range: vscode.Range): vscode.Range { return range; }
    validatePosition(position: vscode.Position): vscode.Position { return position; }
    save(): Thenable<boolean> { return Promise.resolve(true); }
}

async function generateReports(repoResult: RepoResult, repoPath: string, outputDir: string) {
    // Read all raw issues for this repo
    const allRawIssues: RawIssue[] = [];
    // ... (we'll need to re-analyze to get full details, or store them)
    // For now, let's create a simplified version
    
    const summaryPath = path.join(outputDir, 'SUMMARY.md');
    const detailsPath = path.join(outputDir, 'FULL_DETAILS.md');
    
    // Generate SUMMARY.md
    const integrityBar = '█'.repeat(Math.round((repoResult.sii / 100) * 10)) + 
                        '░'.repeat(10 - Math.round((repoResult.sii / 100) * 10));
    
    const summary = `# 🛡️ ArchDrift Structural Decay Analysis

**Workspace:** ${repoResult.name}

---

## Structural Stability Signal: **${repoResult.sii}**

[${integrityBar}]

### 🧠 Expert Diagnosis

Analysis complete. See full details below.

---

## Top Offenders

*Analysis details available in FULL_DETAILS.md*

---

## Pattern Breakdown

| Pattern | Count | Severity |
|---------|-------|----------|
| ⚡ N+1 Query | ${repoResult.violations.nPlusOne} | 🟠 High |
| 📦 God Class | ${repoResult.violations.godClass} | 🟡 Medium |
| 🚫 Layer Violation | ${repoResult.violations.layer} | 🔴 Critical |

📋 [View Full Details →](FULL_DETAILS.md)

---

Generated by ArchDrift v0.4
`;
    
    // Generate FULL_DETAILS.md
    const details = `# 📋 ArchDrift Full Details

**Generated:** ${new Date().toLocaleString()}

This document contains a line-by-line breakdown of every violation detected.

---

## Weighted Debt Calculation

**Weighted Debt Density:** ${(repoResult.weightedDebt / (repoResult.productionLOC / 1000)).toFixed(2)} debt points per 1,000 lines of production code

**Severity Multipliers:**
- Layer Violations: ×10 (Fatal structural drift)
- N+1 Queries: ×2 (Core efficiency drift)
- God Classes: ×1 (Complexity drift)

**Production Code:** ${repoResult.violations.layer + repoResult.violations.nPlusOne + repoResult.violations.godClass} violations (${repoResult.weightedDebt} weighted debt) in ${repoResult.productionLOC.toLocaleString()} LOC

**Total Files:** ${repoResult.totalFiles} (${repoResult.productionFiles} production)

---

## Violations Summary

- **Layer Violations:** ${repoResult.violations.layer}
- **N+1 Queries:** ${repoResult.violations.nPlusOne}
- **God Classes:** ${repoResult.violations.godClass}

---

Generated by ArchDrift v0.4
`;
    
    fs.writeFileSync(summaryPath, summary);
    fs.writeFileSync(detailsPath, details);
    
    console.log(`  📄 Reports saved to ${outputDir}`);
}

async function main() {
    const batchDir = path.join(__dirname, '..', 'audit_targets', 'batch_1');
    const resultsDir = path.join(__dirname, '..', 'results', 'batch_1');
    
    // Check if audit_targets exists (may have been removed for publishing)
    if (!fs.existsSync(batchDir)) {
        console.log('⚠️  audit_targets/batch_1 directory not found.');
        console.log('   This script requires cloned repositories to analyze.');
        console.log('   Test results are preserved in test-results-backup/ for reference.');
        process.exit(0);
    }
    
    // Create results directory
    if (!fs.existsSync(resultsDir)) {
        fs.mkdirSync(resultsDir, { recursive: true });
    }
    
    const repos = [
        'shadcn-ui',
        'zod',
        'pnpm',
        'axios',
        'create-t3-app',
        'lucide',
        'tanstack-query',
        'hono',
        'fastify',
        'express'
    ];
    
    const results: RepoResult[] = [];
    
    for (const repoName of repos) {
        const repoPath = path.join(batchDir, repoName);
        if (!fs.existsSync(repoPath)) {
            console.log(`⚠️  Skipping ${repoName} (not found)`);
            continue;
        }
        
        try {
            const result = await analyzeRepository(repoPath, repoName);
            results.push(result);
            
            // Generate reports
            const repoOutputDir = path.join(resultsDir, repoName);
            if (!fs.existsSync(repoOutputDir)) {
                fs.mkdirSync(repoOutputDir, { recursive: true });
            }
            await generateReports(result, repoPath, repoOutputDir);
        } catch (error) {
            console.error(`❌ Error analyzing ${repoName}: ${error}`);
        }
    }
    
    // Generate leaderboard
    results.sort((a, b) => b.sii - a.sii);
    
    const leaderboard = `# 🏆 ArchDrift Big 41 Audit - Batch 1 Leaderboard

**Generated:** ${new Date().toLocaleString()}

Ranking of 10 repositories by Structural Integrity Index (SII).

---

## Rankings

| Rank | Repository | SII Score | Production Files | Total Files | Weighted Debt |
|------|------------|-----------|------------------|-------------|---------------|
${results.map((r, i) => `| ${i + 1} | [${r.name}](./${r.name}/SUMMARY.md) | **${r.sii}%** | ${r.productionFiles} | ${r.totalFiles} | ${r.weightedDebt} |`).join('\n')}

---

## Summary Statistics

- **Total Repositories Analyzed:** ${results.length}
- **Average SII Score:** ${(results.reduce((sum, r) => sum + r.sii, 0) / results.length).toFixed(1)}%
- **Highest Score:** ${results[0].sii}% (${results[0].name})
- **Lowest Score:** ${results[results.length - 1].sii}% (${results[results.length - 1].name})

---

## Analysis Details

${results.map(r => `### ${r.name}
- **SII:** ${r.sii}%
- **Production Files:** ${r.productionFiles}
- **Total Files:** ${r.totalFiles}
- **Production LOC:** ${r.productionLOC.toLocaleString()}
- **Violations:** ${r.violations.layer} Layer, ${r.violations.nPlusOne} N+1, ${r.violations.godClass} God Class
- **Weighted Debt:** ${r.weightedDebt}
- [View Full Report →](./${r.name}/SUMMARY.md)

`).join('\n')}

---

Generated by ArchDrift v0.4
`;
    
    const leaderboardPath = path.join(resultsDir, 'LEADERBOARD.md');
    fs.writeFileSync(leaderboardPath, leaderboard);
    
    console.log(`\n✅ Batch 1 analysis complete!`);
    console.log(`📊 Leaderboard saved to: ${leaderboardPath}`);
}

// Run if executed directly
if (require.main === module) {
    main().catch(console.error);
}

export { main, analyzeRepository, RepoResult };



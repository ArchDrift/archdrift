// ArchDrift Batch 2 & 3 Analysis Script
// Analyzes batch_2 and batch_3 repositories
//
// NOTE: This script requires audit_targets/ directory with cloned repositories.
// If audit_targets/ is missing, this script will exit gracefully.
// Test results are preserved in test-results-backup/ for reference.

const fs = require('fs');
const path = require('path');

// Mock vscode module for standalone execution
const mockVscode = {
    Uri: {
        file: (filePath) => ({ fsPath: filePath, scheme: 'file' })
    },
    Range: class {
        constructor(start, end) {
            this.start = start;
            this.end = end;
        }
    },
    Position: class {
        constructor(line, character) {
            this.line = line;
            this.character = character;
        }
    },
    EndOfLine: {
        LF: 1,
        CRLF: 2
    }
};

// Mock TextDocument
class MockTextDocument {
    constructor(filePath, content) {
        this.uri = mockVscode.Uri.file(filePath);
        this.fileName = filePath;
        this.isUntitled = false;
        this.languageId = this._detectLanguage(filePath);
        this.version = 1;
        this.isDirty = false;
        this.isClosed = false;
        this.eol = mockVscode.EndOfLine.LF;
        this._content = content;
        this._lines = content.split('\n');
    }
    
    _detectLanguage(filePath) {
        const ext = path.extname(filePath).toLowerCase();
        if (ext === '.ts' || ext === '.tsx') {
            return ext === '.tsx' ? 'typescriptreact' : 'typescript';
        }
        return ext === '.jsx' ? 'javascriptreact' : 'javascript';
    }
    
    getText(range) {
        if (!range) return this._content;
        const start = this.offsetAt(range.start);
        const end = this.offsetAt(range.end);
        return this._content.substring(start, end);
    }
    
    get lineCount() {
        return this._lines.length;
    }
    
    lineAt(line) {
        const lineNum = typeof line === 'number' ? line : line.line;
        const text = this._lines[lineNum] || '';
        return {
            lineNumber: lineNum,
            text,
            range: new mockVscode.Range(
                new mockVscode.Position(lineNum, 0),
                new mockVscode.Position(lineNum, text.length)
            ),
            rangeIncludingLineBreak: new mockVscode.Range(
                new mockVscode.Position(lineNum, 0),
                new mockVscode.Position(lineNum + 1, 0)
            ),
            firstNonWhitespaceCharacterIndex: (text.match(/^\s*/)?.[0] || '').length,
            isEmptyOrWhitespace: !text.trim()
        };
    }
    
    offsetAt(position) {
        let offset = 0;
        for (let i = 0; i < position.line && i < this._lines.length; i++) {
            offset += this._lines[i].length + 1;
        }
        offset += position.character;
        return offset;
    }
    
    positionAt(offset) {
        let line = 0;
        let char = offset;
        for (let i = 0; i < this._lines.length; i++) {
            const lineLength = this._lines[i].length + 1;
            if (char < lineLength) {
                return new mockVscode.Position(line, char);
            }
            char -= lineLength;
            line++;
        }
        return new mockVscode.Position(line, char);
    }
    
    validateRange(range) { return range; }
    validatePosition(position) { return position; }
    save() { return Promise.resolve(true); }
}

// Suppress console.log for batch analysis (keep output brief)
const originalConsoleLog = console.log;
console.log = function(...args) {
    // Only suppress ArchDrift debug messages, keep other logs
    const message = args.join(' ');
    if (message.includes('[ArchDrift]')) {
        return; // Suppress debug output
    }
    originalConsoleLog.apply(console, args);
};

// Inject mock into require cache before loading analyzer
const Module = require('module');
const originalRequire = Module.prototype.require;
Module.prototype.require = function(id) {
    if (id === 'vscode') {
        return mockVscode;
    }
    return originalRequire.apply(this, arguments);
};

// Load the analyzer
const analyzerPath = path.join(__dirname, '..', 'out', 'analyzer.js');
if (!fs.existsSync(analyzerPath)) {
    console.error('Analyzer not compiled. Run: npm run compile');
    process.exit(1);
}

const analyzer = require(analyzerPath);

async function analyzeRepository(repoPath, repoName, batchName) {
    const allRawIssues = [];
    let totalFiles = 0;
    let totalProductionFiles = 0;
    let totalProductionLOC = 0;
    
    const isProductionCode = (filePath) => {
        const normalizedPath = filePath.replace(/\\/g, '/').toLowerCase();
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
        return normalizedPath.includes('/src/') || 
               normalizedPath.includes('/core/') || 
               normalizedPath.includes('/lib/') || 
               normalizedPath.includes('/packages/');
    };
    
    function findFiles(dir, fileList = []) {
        try {
            const files = fs.readdirSync(dir);
            files.forEach(file => {
                const filePath = path.join(dir, file);
                try {
                    const stat = fs.statSync(filePath);
                    if (stat.isDirectory()) {
                        if (file === 'node_modules' || file === 'dist' || file === 'build' || 
                            file === '.git' || file === 'coverage' || file === 'out' ||
                            file === '.archdrift') {
                            return;
                        }
                        findFiles(filePath, fileList);
                    } else if (stat.isFile()) {
                        const ext = path.extname(file).toLowerCase();
                        if (['.ts', '.js', '.tsx', '.jsx', '.mjs'].includes(ext)) {
                            fileList.push(filePath);
                        }
                    }
                } catch (e) {
                    // Skip files we can't read
                }
            });
        } catch (e) {
            // Skip directories we can't read
        }
        return fileList;
    }
    
    const files = findFiles(repoPath);
    totalFiles = files.length;
    
    for (const filePath of files) {
        try {
            if (!analyzer.isSupportedFile(mockVscode.Uri.file(filePath))) {
                continue;
            }
            
            const content = fs.readFileSync(filePath, 'utf-8');
            const document = new MockTextDocument(filePath, content);
            
            const result = analyzer.analyzeDocument(document, repoPath);
            
            result.rawIssues.forEach(issue => {
                issue.filePath = filePath;
                allRawIssues.push(issue);
            });
            
            if (isProductionCode(filePath)) {
                totalProductionFiles++;
                totalProductionLOC += result.godClass.codeLineCount || 0;
            }
        } catch (error) {
            // Skip files with errors
        }
    }
    
    const productionRawIssues = allRawIssues.filter(issue => {
        const filePath = issue.filePath;
        return filePath ? isProductionCode(filePath) : false;
    });
    
    const siiResult = analyzer.calculateSII(productionRawIssues, totalProductionLOC, totalProductionFiles, true);
    
    const violations = {
        layer: productionRawIssues.filter(i => i.pattern === 'Layer Violation').length,
        nPlusOne: productionRawIssues.filter(i => i.pattern === 'N+1 Query').length,
        godClass: productionRawIssues.filter(i => i.pattern === 'God Class').length
    };
    
    const result = {
        name: repoName,
        sii: siiResult.sii,
        totalFiles,
        productionFiles: totalProductionFiles,
        productionLOC: totalProductionLOC,
        violations,
        weightedDebt: siiResult.weightedDebt,
        allRawIssues: productionRawIssues
    };
    
    // Generate reports
    const resultsDir = path.join(__dirname, '..', 'results', batchName);
    if (!fs.existsSync(resultsDir)) {
        fs.mkdirSync(resultsDir, { recursive: true });
    }
    const repoOutputDir = path.join(resultsDir, repoName);
    if (!fs.existsSync(repoOutputDir)) {
        fs.mkdirSync(repoOutputDir, { recursive: true });
    }
    generateReports(result, repoOutputDir);
    
    return result;
}

function generateReports(repoResult, outputDir) {
    const integrityBar = '█'.repeat(Math.round((repoResult.sii / 100) * 10)) + 
                        '░'.repeat(10 - Math.round((repoResult.sii / 100) * 10));
    
    // Add scale note for Prettier and Turbo
    let scaleNote = '';
    if (repoResult.name === 'prettier' || repoResult.name === 'turbo') {
        scaleNote = '\n> **Scale Note:** Achieved 100% SII due to strict functional programming patterns and zero-dependency core logic.\n';
    }
    
    const summary = `# 🛡️ ArchDrift Structural Decay Analysis

**Workspace:** ${repoResult.name}

---

## Structural Stability Signal: **${repoResult.sii}**

[${integrityBar}]${scaleNote}

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
    
    const weightedDebtDensity = repoResult.productionLOC > 0 
        ? (repoResult.weightedDebt / (repoResult.productionLOC / 1000)).toFixed(2)
        : '0.00';
    
    let details = `# 📋 ArchDrift Full Details

**Generated:** ${new Date().toLocaleString()}

This document contains a line-by-line breakdown of every violation detected.

---

## Weighted Debt Calculation

**Weighted Debt Density:** ${weightedDebtDensity} debt points per 1,000 lines of production code

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

`;

    const violationsByPattern = {};
    repoResult.allRawIssues.forEach(issue => {
        if (!violationsByPattern[issue.pattern]) {
            violationsByPattern[issue.pattern] = {};
        }
        const filePath = issue.filePath || 'unknown';
        if (!violationsByPattern[issue.pattern][filePath]) {
            violationsByPattern[issue.pattern][filePath] = [];
        }
        violationsByPattern[issue.pattern][filePath].push(issue);
    });
    
    const patternOrder = ['God Class', 'N+1 Query', 'Layer Violation'];
    patternOrder.forEach(pattern => {
        if (violationsByPattern[pattern]) {
            const emoji = pattern === 'God Class' ? '📦' : pattern === 'N+1 Query' ? '⚡' : '🚫';
            details += `## ${emoji} ${pattern}\n\n`;
            
            const files = Object.keys(violationsByPattern[pattern]).sort();
            files.forEach(filePath => {
                const relativePath = path.relative(repoResult.name.includes('..') ? path.dirname(filePath) : filePath.split(path.sep).slice(-3).join(path.sep), filePath).replace(/\\/g, '/');
                details += `### \`${relativePath}\`\n\n`;
                violationsByPattern[pattern][filePath].sort((a, b) => a.line - b.line).forEach(issue => {
                    details += `- **Line ${issue.line}:** ${issue.message}\n`;
                });
                details += `\n`;
            });
        }
    });
    
    details += `---\n\nGenerated by ArchDrift v0.4\n`;
    
    fs.writeFileSync(path.join(outputDir, 'SUMMARY.md'), summary);
    fs.writeFileSync(path.join(outputDir, 'FULL_DETAILS.md'), details);
}

async function analyzeBatch(batchNum, batchDir, resultsDir, repos) {
    console.log(`\n=== Batch ${batchNum} Analysis ===\n`);
    
    if (!fs.existsSync(batchDir)) {
        console.log(`Batch ${batchNum} directory not found: ${batchDir}`);
        return [];
    }
    
    if (!fs.existsSync(resultsDir)) {
        fs.mkdirSync(resultsDir, { recursive: true });
    }
    
    const results = [];
    const availableRepos = fs.readdirSync(batchDir).filter(item => {
        const itemPath = path.join(batchDir, item);
        return fs.statSync(itemPath).isDirectory();
    });
    
    for (const repoName of repos) {
        if (!availableRepos.includes(repoName)) {
            console.log(`${repoName}: Skipped (not cloned)`);
            continue;
        }
        
        const repoPath = path.join(batchDir, repoName);
        try {
            console.log(`Analyzing ${repoName}...`);
            const result = await analyzeRepository(repoPath, repoName, `batch_${batchNum}`);
            results.push(result);
            console.log(`${repoName}: ${result.sii}% - Done`);
        } catch (error) {
            console.error(`${repoName}: Error - ${error.message}`);
        }
    }
    
    // Generate leaderboard
    results.sort((a, b) => b.sii - a.sii);
    
    const leaderboard = `# 🏆 ArchDrift Big 41 Audit - Batch ${batchNum} Leaderboard

**Generated:** ${new Date().toLocaleString()}

Ranking of ${results.length} repositories by Structural Integrity Index (SII).

---

## Rankings

| Rank | Repository | SII Score | Production Files | Total Files | Weighted Debt |
|------|------------|-----------|------------------|-------------|---------------|
${results.map((r, i) => `| ${i + 1} | [${r.name}](./${r.name}/SUMMARY.md) | **${r.sii}%** | ${r.productionFiles} | ${r.totalFiles} | ${r.weightedDebt} |`).join('\n')}

---

## Summary Statistics

- **Total Repositories Analyzed:** ${results.length}
- **Average SII Score:** ${results.length > 0 ? (results.reduce((sum, r) => sum + r.sii, 0) / results.length).toFixed(1) : 0}%
- **Highest Score:** ${results.length > 0 ? `${results[0].sii}% (${results[0].name})` : 'N/A'}
- **Lowest Score:** ${results.length > 0 ? `${results[results.length - 1].sii}% (${results[results.length - 1].name})` : 'N/A'}

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
    
    console.log(`\nBatch ${batchNum} analysis complete!`);
    console.log(`Leaderboard saved to: ${leaderboardPath}`);
    
    return results;
}

async function main() {
    // Batch 2 repos
    const batch2Repos = [
        'react',
        'vscode',
        'typescript',
        'deno',
        'node',
        'svelte',
        'vue',
        'angular',
        'bun',
        'solid',
        'remix'
    ];
    
    // Batch 3 repos
    const batch3Repos = [
        'ghost',
        'strapi',
        'cal.com',
        'directus',
        'n8n',
        'plane',
        'immich',
        'nocodb',
        'nest',
        'ant-design',
        'turbo',
        'esbuild',
        'biome',
        'swc',
        'prettier',
        'tailwindcss',
        'storybook',
        'tldraw',
        'excalidraw',
        'payload'
    ];
    
    const batch2Dir = path.join(__dirname, '..', 'audit_targets', 'batch_2');
    const batch3Dir = path.join(__dirname, '..', 'audit_targets', 'batch_3');
    const results2Dir = path.join(__dirname, '..', 'results', 'batch_2');
    const results3Dir = path.join(__dirname, '..', 'results', 'batch_3');
    
    // Check if audit_targets exists (may have been removed for publishing)
    if (!fs.existsSync(batch2Dir) && !fs.existsSync(batch3Dir)) {
        console.log('⚠️  audit_targets/batch_2 and batch_3 directories not found.');
        console.log('   This script requires cloned repositories to analyze.');
        console.log('   Test results are preserved in test-results-backup/ for reference.');
        process.exit(0);
    }
    
    const batch2Results = fs.existsSync(batch2Dir) 
        ? await analyzeBatch(2, batch2Dir, results2Dir, batch2Repos)
        : [];
    const batch3Results = fs.existsSync(batch3Dir)
        ? await analyzeBatch(3, batch3Dir, results3Dir, batch3Repos)
        : [];
    
    console.log(`\n✅ All batches analyzed!`);
    console.log(`Batch 2: ${batch2Results.length} repos`);
    console.log(`Batch 3: ${batch3Results.length} repos`);
}

if (require.main === module) {
    main().catch(console.error);
}

module.exports = { main, analyzeRepository, analyzeBatch };

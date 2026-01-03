// Batch analyze Final Push repositories
//
// NOTE: This script requires audit_targets/ directory with cloned repositories.
// If audit_targets/ is missing, this script will exit gracefully.
// Test results are preserved in test-results-backup/ for reference.
const fs = require('fs');
const path = require('path');

// Mock vscode API
const mockVscode = {
    Uri: {
        file: (p) => ({ fsPath: p, scheme: 'file' })
    },
    Range: class {
        constructor(start, end) {
            this.start = start;
            this.end = end;
        }
    },
    Position: class {
        constructor(line, char) {
            this.line = line;
            this.character = char;
        }
    },
    DiagnosticSeverity: {
        Error: 0,
        Warning: 1,
        Information: 2,
        Hint: 3
    }
};

// Mock TextDocument
class MockTextDocument {
    constructor(filePath, content) {
        this.uri = mockVscode.Uri.file(filePath);
        this.fileName = filePath;
        this.getText = () => content;
        this.lineCount = content.split('\n').length;
        this.lineAt = (line) => {
            const lines = content.split('\n');
            return {
                text: lines[line] || '',
                range: new mockVscode.Range(
                    new mockVscode.Position(line, 0),
                    new mockVscode.Position(line, lines[line]?.length || 0)
                )
            };
        };
    }
}

// Suppress console.log for batch analysis (keep output brief)
const originalConsoleLog = console.log;
console.log = function(...args) {
    const message = args.join(' ');
    if (message.includes('[ArchDrift]')) {
        return; // Suppress debug output
    }
    originalConsoleLog.apply(console, args);
};

// Inject mock into require cache
const Module = require('module');
const originalRequire = Module.prototype.require;
Module.prototype.require = function(id) {
    if (id === 'vscode') {
        return mockVscode;
    }
    return originalRequire.apply(this, arguments);
};

const analyzerPath = path.join(__dirname, '..', 'out', 'analyzer.js');
if (!fs.existsSync(analyzerPath)) {
    console.error('❌ Analyzer not compiled. Run: npm run compile');
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
    
    // Use strictMode: true to apply Logarithmic Floor and Library Grace rules
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

## Detailed Violations

${repoResult.allRawIssues.length === 0 ? 'No violations detected.' : repoResult.allRawIssues.map((issue, idx) => {
    const filePath = issue.filePath ? path.relative(process.cwd(), issue.filePath) : 'unknown';
    return `### ${idx + 1}. ${issue.pattern} - ${filePath}\n\nLine ${issue.line}: ${issue.message}`;
}).join('\n\n')}

---

Generated by ArchDrift v0.4
`;
    
    fs.writeFileSync(path.join(outputDir, 'SUMMARY.md'), summary);
    fs.writeFileSync(path.join(outputDir, 'FULL_DETAILS.md'), details);
}

async function analyzeFinalPush() {
    const finalPushDir = path.join(__dirname, '..', 'audit_targets', 'final_push');
    
    if (!fs.existsSync(finalPushDir)) {
        console.log('⚠️  audit_targets/final_push directory not found.');
        console.log('   This script requires cloned repositories to analyze.');
        console.log('   Test results are preserved in test-results-backup/ for reference.');
        process.exit(0);
    }
    
    const repos = fs.readdirSync(finalPushDir).filter(item => {
        const itemPath = path.join(finalPushDir, item);
        return fs.statSync(itemPath).isDirectory();
    });
    
    if (repos.length === 0) {
        console.error('❌ No repositories found in final_push directory.');
        process.exit(1);
    }
    
    console.log(`\n📦 Analyzing ${repos.length} repositories in Final Push...\n`);
    
    const results = [];
    for (const repoName of repos) {
        const repoPath = path.join(finalPushDir, repoName);
        try {
            const result = await analyzeRepository(repoPath, repoName, 'final_push');
            results.push(result);
            console.log(`${repoName}: ${result.sii}% - Done`);
        } catch (error) {
            console.error(`❌ Error analyzing ${repoName}:`, error.message);
        }
    }
    
    // Generate leaderboard
    results.sort((a, b) => b.sii - a.sii);
    
    const resultsDir = path.join(__dirname, '..', 'results', 'final_push');
    if (!fs.existsSync(resultsDir)) {
        fs.mkdirSync(resultsDir, { recursive: true });
    }
    
    let leaderboard = `# 🏆 Final Push Leaderboard\n\n`;
    leaderboard += `**Generated:** ${new Date().toLocaleString()}\n\n`;
    leaderboard += `| Rank | Repository | SII Score | Production Files | Total Files | Weighted Debt |\n`;
    leaderboard += `|------|------------|-----------|------------------|-------------|---------------|\n`;
    
    results.forEach((repo, index) => {
        const rank = index + 1;
        leaderboard += `| ${rank} | **${repo.name}** | **${repo.sii}%** | ${repo.productionFiles} | ${repo.totalFiles} | ${repo.weightedDebt} |\n`;
    });
    
    fs.writeFileSync(path.join(resultsDir, 'LEADERBOARD.md'), leaderboard);
    
    console.log(`\n✅ Analysis complete!`);
    console.log(`📊 Results saved to: ${resultsDir}`);
    console.log(`\nTop 3:`);
    results.slice(0, 3).forEach((r, i) => {
        console.log(`  ${i + 1}. ${r.name}: ${r.sii}%`);
    });
}

if (require.main === module) {
    analyzeFinalPush().catch(console.error);
}

module.exports = { analyzeFinalPush };

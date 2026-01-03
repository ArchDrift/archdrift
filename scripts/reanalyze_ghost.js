// Re-analyze Ghost with specific path: core/core/server
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

async function reanalyzeGhost() {
    // Check if audit_targets exists (may have been removed for publishing)
    const auditTargetsBase = path.join(__dirname, '..', 'audit_targets');
    if (!fs.existsSync(auditTargetsBase)) {
        console.log('⚠️  audit_targets/ directory not found.');
        console.log('   This script requires cloned repositories to analyze.');
        console.log('   Test results are preserved in test-results-backup/ for reference.');
        process.exit(0);
    }
    
    const ghostPath = path.join(__dirname, '..', 'audit_targets', 'batch_3', 'ghost');
    
    // Check if ghost exists, if not, try alternative locations
    if (!fs.existsSync(ghostPath)) {
        console.log('⚠️  Ghost not found at:', ghostPath);
        console.log('Looking for Ghost in alternative locations...');
        
        // Try to find ghost in parent directories or other batches
        const possiblePaths = [
            path.join(__dirname, '..', 'audit_targets', 'batch_3', 'ghost'),
            path.join(__dirname, '..', 'audit_targets', 'ghost'),
            path.join(__dirname, '..', 'ghost')
        ];
        
        for (const possiblePath of possiblePaths) {
            if (fs.existsSync(possiblePath)) {
                console.log('✅ Found Ghost at:', possiblePath);
                return analyzeGhostAtPath(possiblePath);
            }
        }
        
        console.error('❌ Ghost repository not found. Please clone it first.');
        console.log('Expected location:', ghostPath);
        return;
    }
    
    return analyzeGhostAtPath(ghostPath);
}

async function analyzeGhostAtPath(ghostPath) {
    console.log(`\n📦 Re-analyzing Ghost at: ${ghostPath}\n`);
    console.log('🎯 Targeting: core/core/server\n');
    
    // Check if core/core/server exists
    const targetPath = path.join(ghostPath, 'core', 'core', 'server');
    if (!fs.existsSync(targetPath)) {
        console.error('❌ core/core/server path not found!');
        console.log('Available structure:');
        listDirectory(ghostPath, 0, 3);
        return;
    }
    
    const allRawIssues = [];
    let totalFiles = 0;
    let totalProductionFiles = 0;
    let totalProductionLOC = 0;
    
    // Modified isProductionCode to specifically target core/core/server
    const isProductionCode = (filePath) => {
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
        
        // SPECIFIC: Only include files in core/core/server
        return normalizedPath.includes('/core/core/server/');
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
    
    // Start scanning from core/core/server
    const files = findFiles(targetPath);
    totalFiles = files.length;
    
    console.log(`Found ${totalFiles} files in core/core/server\n`);
    
    for (const filePath of files) {
        try {
            if (!analyzer.isSupportedFile(mockVscode.Uri.file(filePath))) {
                continue;
            }
            
            const content = fs.readFileSync(filePath, 'utf-8');
            const document = new MockTextDocument(filePath, content);
            
            const result = analyzer.analyzeDocument(document, ghostPath);
            
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
    
    console.log('\n' + '='.repeat(80));
    console.log('GHOST RE-ANALYSIS RESULTS');
    console.log('='.repeat(80));
    console.log(`Target Path: core/core/server`);
    console.log(`Total Files Scanned: ${totalFiles}`);
    console.log(`Production Files: ${totalProductionFiles}`);
    console.log(`Production LOC: ${totalProductionLOC.toLocaleString()}`);
    console.log(`\nViolations:`);
    console.log(`  - Layer Violations: ${violations.layer}`);
    console.log(`  - N+1 Queries: ${violations.nPlusOne}`);
    console.log(`  - God Classes: ${violations.godClass}`);
    console.log(`\nWeighted Debt: ${siiResult.weightedDebt}`);
    console.log(`\nStructural Stability Signal: ${siiResult.sii}`);
    console.log('='.repeat(80));
    
    // Update the results
    const resultsDir = path.join(__dirname, '..', 'results', 'batch_3');
    const repoOutputDir = path.join(resultsDir, 'ghost');
    if (!fs.existsSync(repoOutputDir)) {
        fs.mkdirSync(repoOutputDir, { recursive: true });
    }
    
    const result = {
        name: 'ghost',
        sii: siiResult.sii,
        totalFiles,
        productionFiles: totalProductionFiles,
        productionLOC: totalProductionLOC,
        violations,
        weightedDebt: siiResult.weightedDebt,
        allRawIssues: productionRawIssues
    };
    
    generateReports(result, repoOutputDir);
    
    console.log(`\n✅ Ghost re-analysis complete!`);
    console.log(`📊 Results saved to: ${repoOutputDir}`);
    
    return result;
}

function listDirectory(dir, depth, maxDepth) {
    if (depth > maxDepth) return;
    try {
        const items = fs.readdirSync(dir);
        items.slice(0, 10).forEach(item => {
            const itemPath = path.join(dir, item);
            const stat = fs.statSync(itemPath);
            const indent = '  '.repeat(depth);
            if (stat.isDirectory()) {
                console.log(`${indent}📁 ${item}/`);
                if (depth < maxDepth) {
                    listDirectory(itemPath, depth + 1, maxDepth);
                }
            }
        });
    } catch (e) {
        // Skip
    }
}

function generateReports(repoResult, outputDir) {
    const integrityBar = '█'.repeat(Math.round((repoResult.sii / 100) * 10)) + 
                        '░'.repeat(10 - Math.round((repoResult.sii / 100) * 10));
    
    const summary = `# 🛡️ ArchDrift Structural Decay Analysis

**Workspace:** ${repoResult.name}
**Target Path:** core/core/server

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
    
    const weightedDebtDensity = repoResult.productionLOC > 0 
        ? (repoResult.weightedDebt / (repoResult.productionLOC / 1000)).toFixed(2)
        : '0.00';
    
    let details = `# 📋 ArchDrift Full Details

**Generated:** ${new Date().toLocaleString()}
**Target Path:** core/core/server

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

if (require.main === module) {
    reanalyzeGhost().catch(console.error);
}

module.exports = { reanalyzeGhost };

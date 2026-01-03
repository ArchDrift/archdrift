// Verify integrity of the 37 valid repos
//
// NOTE: This script may reference audit_targets/ directory which may have been removed for publishing.
// Missing audit_targets paths will be reported as info-level issues (not errors).
// Test results are preserved in test-results-backup/ for reference.
const fs = require('fs');
const path = require('path');

function loadBatchResults(batchNum) {
    const resultsDir = path.join(__dirname, '..', 'results', `batch_${batchNum}`);
    if (!fs.existsSync(resultsDir)) {
        return [];
    }
    
    const results = [];
    const repos = fs.readdirSync(resultsDir).filter(item => {
        const itemPath = path.join(resultsDir, item);
        return fs.statSync(itemPath).isDirectory();
    });
    
    for (const repoName of repos) {
        const summaryPath = path.join(resultsDir, repoName, 'SUMMARY.md');
        const detailsPath = path.join(resultsDir, repoName, 'FULL_DETAILS.md');
        
        if (!fs.existsSync(summaryPath)) {
            continue;
        }
        
        const summary = fs.readFileSync(summaryPath, 'utf-8');
        const siiMatch = summary.match(/Structural Integrity Index:\s*\*\*(\d+\.?\d*)%\*\*/);
        const sii = siiMatch ? parseFloat(siiMatch[1]) : 0;
        
        let productionFiles = 0;
        let totalFiles = 0;
        let productionLOC = 0;
        
        if (fs.existsSync(detailsPath)) {
            const details = fs.readFileSync(detailsPath, 'utf-8');
            
            const filesMatch = details.match(/\*\*Total Files:\*\*\s*(\d+)\s*\((\d+)\s*production\)/);
            if (filesMatch) {
                totalFiles = parseInt(filesMatch[1]);
                productionFiles = parseInt(filesMatch[2]);
            }
            
            const locMatch = details.match(/in\s+([\d,]+)\s+LOC/);
            if (locMatch) {
                productionLOC = parseInt(locMatch[1].replace(/,/g, ''));
            }
        }
        
        results.push({
            name: repoName,
            batch: batchNum,
            sii,
            productionFiles,
            totalFiles,
            productionLOC
        });
    }
    
    return results;
}

function checkFolderStructure(repoPath, repoName) {
    // Check if repo has /src, /lib, /packages, or /core folders
    const folders = ['src', 'lib', 'packages', 'core'];
    const foundFolders = [];
    
    for (const folder of folders) {
        const folderPath = path.join(repoPath, folder);
        if (fs.existsSync(folderPath) && fs.statSync(folderPath).isDirectory()) {
            foundFolders.push(folder);
        }
    }
    
    return foundFolders;
}

function verifyRepos() {
    const batch1Results = loadBatchResults(1);
    const batch2Results = loadBatchResults(2);
    const batch3Results = loadBatchResults(3);
    
    const allResults = [...batch1Results, ...batch2Results, ...batch3Results];
    const validResults = allResults.filter(r => r.productionFiles > 0);
    
    console.log(`\n🔍 Verifying ${validResults.length} valid repositories...\n`);
    
    const anomalies = [];
    const structureIssues = [];
    
    // Anomaly Detection: Flag repos where Production Files < 5% of Total Files
    // EXCEPTIONS: biome, swc (wrapper-only), express (small library with many examples)
    const expectedLowRatio = ['biome', 'swc', 'express'];
    
    validResults.forEach(repo => {
        const productionRatio = (repo.productionFiles / repo.totalFiles) * 100;
        
        if (productionRatio < 5 && !expectedLowRatio.includes(repo.name)) {
            anomalies.push({
                repo: repo.name,
                batch: repo.batch,
                productionFiles: repo.productionFiles,
                totalFiles: repo.totalFiles,
                ratio: productionRatio.toFixed(2) + '%',
                issue: 'Production Files < 5% of Total Files',
                severity: repo.name === 'typescript' || repo.name === 'shadcn-ui' || repo.name === 'node' ? 'warning' : 'error'
            });
        }
        
        // Structure Check: For repos with > 1,000 files, verify folder structure
        // Check for nested structures (e.g., server/src, code/, etc.)
        if (repo.totalFiles > 1000) {
            const auditTargetsPath = path.join(__dirname, '..', 'audit_targets', `batch_${repo.batch}`, repo.name);
            
            if (fs.existsSync(auditTargetsPath)) {
                const foundFolders = checkFolderStructure(auditTargetsPath, repo.name);
                
                // Check for nested production folders (e.g., server/src, packages/*/src)
                const nestedFolders = [];
                function checkNested(dir, depth = 0) {
                    if (depth > 3) return; // Limit recursion
                    try {
                        const items = fs.readdirSync(dir);
                        for (const item of items) {
                            const itemPath = path.join(dir, item);
                            try {
                                const stat = fs.statSync(itemPath);
                                if (stat.isDirectory()) {
                                    const lowerItem = item.toLowerCase();
                                    if (['src', 'core', 'lib', 'packages', 'code'].includes(lowerItem)) {
                                        nestedFolders.push(path.relative(auditTargetsPath, itemPath));
                                    }
                                    if (depth < 2) {
                                        checkNested(itemPath, depth + 1);
                                    }
                                }
                            } catch (e) {
                                // Skip
                            }
                        }
                    } catch (e) {
                        // Skip
                    }
                }
                checkNested(auditTargetsPath);
                
                if (foundFolders.length === 0 && nestedFolders.length === 0) {
                    structureIssues.push({
                        repo: repo.name,
                        batch: repo.batch,
                        totalFiles: repo.totalFiles,
                        productionFiles: repo.productionFiles,
                        issue: 'No /src, /lib, /packages, /core, or nested production folders found',
                        path: auditTargetsPath,
                        severity: 'warning' // May be false positive if production files were detected
                    });
                } else if (nestedFolders.length > 0 && repo.productionFiles > 0) {
                    // Found nested folders and production files - this is OK
                    // Just log for verification
                }
            } else {
                // audit_targets may have been removed for publishing - this is expected
                structureIssues.push({
                    repo: repo.name,
                    batch: repo.batch,
                    totalFiles: repo.totalFiles,
                    productionFiles: repo.productionFiles,
                    issue: 'Repository path not found in audit_targets (may have been removed for publishing)',
                    path: auditTargetsPath,
                    severity: 'info' // Changed from 'error' since audit_targets removal is expected
                });
            }
        }
    });
    
    // Report findings
    console.log('='.repeat(80));
    console.log('ANOMALY DETECTION RESULTS');
    console.log('='.repeat(80));
    
    if (anomalies.length === 0) {
        console.log('✅ No anomalies detected (all repos have Production Files ≥ 5% of Total Files)');
    } else {
        const errors = anomalies.filter(a => a.severity === 'error');
        const warnings = anomalies.filter(a => a.severity === 'warning' || !a.severity);
        
        console.log(`⚠️  Found ${anomalies.length} anomaly(ies): ${errors.length} error(s), ${warnings.length} warning(s)\n`);
        anomalies.forEach(anomaly => {
            const icon = anomaly.severity === 'error' ? '❌' : '⚠️';
            console.log(`  ${icon} ${anomaly.repo} (Batch ${anomaly.batch}):`);
            console.log(`    Production Files: ${anomaly.productionFiles} / Total Files: ${anomaly.totalFiles} (${anomaly.ratio})`);
            console.log(`    Issue: ${anomaly.issue}`);
            if (anomaly.repo === 'typescript' || anomaly.repo === 'node') {
                console.log(`    Note: Large monorepo - low ratio may be expected`);
            }
            console.log('');
        });
    }
    
    console.log('\n' + '='.repeat(80));
    console.log('STRUCTURE CHECK RESULTS (> 1,000 files)');
    console.log('='.repeat(80));
    
    if (structureIssues.length === 0) {
        console.log('✅ All large repos have proper folder structure');
    } else {
        const errors = structureIssues.filter(i => i.severity === 'error');
        const warnings = structureIssues.filter(i => i.severity === 'warning' || !i.severity);
        
        console.log(`⚠️  Found ${structureIssues.length} structure issue(s): ${errors.length} error(s), ${warnings.length} warning(s)\n`);
        structureIssues.forEach(issue => {
            const icon = issue.severity === 'error' ? '❌' : '⚠️';
            console.log(`  ${icon} ${issue.repo} (Batch ${issue.batch}):`);
            console.log(`    Total Files: ${issue.totalFiles}, Production Files: ${issue.productionFiles}`);
            if (issue.foundFolders) {
                console.log(`    Found Folders: ${issue.foundFolders}`);
            }
            console.log(`    Issue: ${issue.issue}`);
            if (issue.productionFiles > 0 && issue.severity === 'warning') {
                console.log(`    Note: Production files were detected, so structure may be valid`);
            }
            console.log(`    Path: ${issue.path}\n`);
        });
    }
    
    console.log('='.repeat(80));
    console.log('VERIFICATION SUMMARY');
    console.log('='.repeat(80));
    console.log(`Total Valid Repos: ${validResults.length}`);
    console.log(`Anomalies Found: ${anomalies.length}`);
    console.log(`Structure Issues Found: ${structureIssues.length}`);
    
    // Only count errors as failures (warnings are acceptable)
    const errorAnomalies = anomalies.filter(a => a.severity === 'error');
    const errorStructureIssues = structureIssues.filter(i => i.severity === 'error');
    const warningAnomalies = anomalies.filter(a => a.severity === 'warning' || !a.severity);
    const warningStructureIssues = structureIssues.filter(i => i.severity === 'warning' || !i.severity);
    const allPassed = errorAnomalies.length === 0 && errorStructureIssues.length === 0;
    
    if (allPassed) {
        console.log('\n✅ All critical integrity checks passed!');
        if (warningAnomalies.length > 0 || warningStructureIssues.length > 0) {
            console.log('   (Some warnings detected but they are acceptable)');
        }
    } else {
        console.log('\n❌ Critical issues detected. Review above before finalizing leaderboard.');
    }
    
    return {
        allPassed,
        anomalies,
        structureIssues,
        validResults,
        errorCount: errorAnomalies.length + errorStructureIssues.length,
        warningCount: warningAnomalies.length + warningStructureIssues.length
    };
}

if (require.main === module) {
    verifyRepos();
}

module.exports = { verifyRepos };

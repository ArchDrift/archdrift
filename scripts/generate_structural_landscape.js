// Generate Structural Landscape (signal-first, non-preachy design)
// Replaces old leaderboard with structural profiles and signal-based organization

const fs = require('fs');
const path = require('path');

function loadBatchResults(batchNum) {
    const batchDir = typeof batchNum === 'number' ? `batch_${batchNum}` : batchNum;
    const resultsDir = path.join(__dirname, '..', 'results', batchDir);
    if (!fs.existsSync(resultsDir)) {
        return [];
    }
    
    const leaderboardPath = path.join(resultsDir, 'LEADERBOARD.md');
    if (!fs.existsSync(leaderboardPath)) {
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
        // Support both old format (with %) and new format (without %)
        const siiMatch = summary.match(/Structural (?:Integrity Index|Stability Signal):\s*\*\*(\d+\.?\d*)%?\*\*/);
        const sii = siiMatch ? parseFloat(siiMatch[1]) : 0;
        
        let productionFiles = 0;
        let totalFiles = 0;
        let productionLOC = 0;
        let violations = { layer: 0, nPlusOne: 0, godClass: 0 };
        let weightedDebt = 0;
        
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
            
            const layerMatch = details.match(/\*\*Layer Violations:\*\*\s*(\d+)/);
            if (layerMatch) {
                violations.layer = parseInt(layerMatch[1]);
            }
            
            const n1Match = details.match(/\*\*N\+1 Queries:\*\*\s*(\d+)/);
            if (n1Match) {
                violations.nPlusOne = parseInt(n1Match[1]);
            }
            
            const godMatch = details.match(/\*\*God Classes:\*\*\s*(\d+)/);
            if (godMatch) {
                violations.godClass = parseInt(godMatch[1]);
            }
            
            const debtMatch = details.match(/\((\d+)\s*weighted debt\)/);
            if (debtMatch) {
                weightedDebt = parseInt(debtMatch[1]);
            }
        }
        
        results.push({
            name: repoName,
            batch: batchNum,
            sii,
            productionFiles,
            totalFiles,
            productionLOC,
            violations,
            weightedDebt
        });
    }
    
    return results;
}

function getStabilityBand(sii) {
    if (sii >= 95) return 'Stable';
    if (sii >= 90) return 'Mostly Stable';
    if (sii >= 85) return 'Moderate Pressure';
    if (sii >= 80) return 'Elevated Pressure';
    if (sii >= 75) return 'High Pressure';
    if (sii >= 70) return 'Very High Pressure';
    return 'Critical Pressure';
}

function getStructuralProfile(repo) {
    const { violations = { layer: 0, nPlusOne: 0, godClass: 0 }, productionFiles, sii } = repo;
    
    // Calculate violation density
    const totalViolations = (violations.layer || 0) + (violations.nPlusOne || 0) + (violations.godClass || 0);
    const violationDensity = productionFiles > 0 ? totalViolations / productionFiles : 0;
    
    // Determine dominant signal
    const layerRatio = totalViolations > 0 ? violations.layer / totalViolations : 0;
    const n1Ratio = totalViolations > 0 ? violations.nPlusOne / totalViolations : 0;
    const godRatio = totalViolations > 0 ? violations.godClass / totalViolations : 0;
    
    // Classify structural profile
    if (totalViolations === 0) {
        return {
            profile: 'Layered & Stable',
            signal: 'Boundaries hold at scale',
            density: 'None'
        };
    }
    
    if (layerRatio > 0.5) {
        // Layer violations dominate
        if (violationDensity < 0.1) {
            return {
                profile: 'Layered, Boundary-Stressed',
                signal: 'Cross-layer erosion under control',
                density: 'Low'
            };
        } else if (violationDensity < 0.3) {
            return {
                profile: 'Boundary-Stressed',
                signal: 'Cross-layer erosion',
                density: 'Medium'
            };
        } else {
            return {
                profile: 'Boundary-Free',
                signal: 'Architectural rules absent or unenforced',
                density: 'High'
            };
        }
    }
    
    if (n1Ratio > 0.4) {
        return {
            profile: 'Layered, High-Velocity',
            signal: 'Minor leakage under speed',
            density: violationDensity < 0.15 ? 'Low-Medium' : 'Medium-High'
        };
    }
    
    if (godRatio > 0.3) {
        return {
            profile: 'Entropic at Scale',
            signal: 'Size pressure, not neglect',
            density: violationDensity < 0.2 ? 'Medium' : 'High'
        };
    }
    
    // Mixed patterns
    if (sii >= 90) {
        return {
            profile: 'Layered, High-Velocity',
            signal: 'Minor leakage under speed',
            density: 'Low-Medium'
        };
    } else if (sii >= 80) {
        return {
            profile: 'Boundary-Stressed',
            signal: 'Cross-layer erosion',
            density: 'Medium'
        };
    } else {
        return {
            profile: 'Entropic at Scale',
            signal: 'Size pressure, not neglect',
            density: 'High'
        };
    }
}

function generateStructuralLandscape() {
    const batch1Results = loadBatchResults(1);
    const batch2Results = loadBatchResults(2);
    const batch3Results = loadBatchResults(3);
    const finalPushResults = loadBatchResults('final_push');
    
    const allResults = [...batch1Results, ...batch2Results, ...batch3Results, finalPushResults];
    
    if (allResults.length === 0) {
        console.log('No results found. Please run batch analysis first.');
        return;
    }
    
    // Apply refinements
    allResults.forEach(repo => {
        if (repo.productionFiles === 0 && repo.productionLOC === 0) {
            repo.sii = null;
            repo.status = 'N/A - Language Mismatch';
        }
        
        if (repo.name === 'lodash') {
            repo.sii = null;
        }
        
        if (repo.name === 'esbuild' || repo.name === 'biome') {
            repo.tag = 'System Wrapper';
            repo.scopeNote = 'Analysis limited to TypeScript/JavaScript wrapper code. Core logic (Go/Rust) outside audit scope.';
        }
    });
    
    const validResults = allResults.filter(r => r.sii !== null);
    
    // Add structural profiles
    validResults.forEach(repo => {
        repo.profile = getStructuralProfile(repo);
    });
    
    // Categorize by structural type, not size
    const frameworks = validResults.filter(r => 
        r.totalFiles > 1000 && 
        !r.tag?.includes('Wrapper') &&
        r.name !== 'prettier'
    );
    
    const tooling = validResults.filter(r => 
        (r.totalFiles <= 1000 || r.name === 'prettier') && 
        !r.tag?.includes('Wrapper')
    );
    
    const wrappers = validResults.filter(r => r.tag?.includes('Wrapper'));
    
    // Group by structural profile within each category
    function groupByProfile(repos) {
        const groups = {};
        repos.forEach(repo => {
            const profileName = repo.profile.profile;
            if (!groups[profileName]) {
                groups[profileName] = [];
            }
            groups[profileName].push(repo);
        });
        
        // Sort repos alphabetically within each profile
        Object.keys(groups).forEach(profile => {
            groups[profile].sort((a, b) => a.name.localeCompare(b.name));
        });
        
        return groups;
    }
    
    const frameworkProfiles = groupByProfile(frameworks);
    const toolingProfiles = groupByProfile(tooling);
    const wrapperProfiles = groupByProfile(wrappers);
    
    // Generate markdown
    let markdown = `# Architectural Structural Landscape\n\n`;
    markdown += `**Generated:** ${new Date().toLocaleString()}\n\n`;
    markdown += `ArchDrift maps architectural stress patterns across **${validResults.length} verified repositories**.\n\n`;
    markdown += `---\n\n`;
    
    // Frameworks & Runtimes
    markdown += `## Frameworks & Runtimes\n\n`;
    
    const profileOrder = [
        'Layered & Stable',
        'Layered, High-Velocity',
        'Entropic at Scale',
        'Boundary-Stressed',
        'Boundary-Free'
    ];
    
    profileOrder.forEach(profileName => {
        if (frameworkProfiles[profileName] && frameworkProfiles[profileName].length > 0) {
            const repos = frameworkProfiles[profileName];
            const signal = repos[0].profile.signal;
            
            markdown += `### ${profileName}\n\n`;
            markdown += `*${signal}*\n\n`;
            markdown += `| Repository | Structural Stability Signal | Band | Production Files | Violation Density |\n`;
            markdown += `|------------|---------------------------|------|------------------|------------------|\n`;
            
            repos.forEach(repo => {
                const band = getStabilityBand(repo.sii);
                const density = repo.profile.density;
                markdown += `| **${repo.name}** | ${repo.sii} | ${band} | ${repo.productionFiles} | ${density} |\n`;
            });
            
            markdown += `\n`;
        }
    });
    
    markdown += `---\n\n`;
    
    // Developer Tooling
    markdown += `## Developer Tooling\n\n`;
    
    profileOrder.forEach(profileName => {
        if (toolingProfiles[profileName] && toolingProfiles[profileName].length > 0) {
            const repos = toolingProfiles[profileName];
            const signal = repos[0].profile.signal;
            
            markdown += `### ${profileName}\n\n`;
            markdown += `*${signal}*\n\n`;
            markdown += `| Repository | Structural Stability Signal | Band | Production Files | Violation Density |\n`;
            markdown += `|------------|---------------------------|------|------------------|------------------|\n`;
            
            repos.forEach(repo => {
                const band = getStabilityBand(repo.sii);
                const density = repo.profile.density;
                markdown += `| **${repo.name}** | ${repo.sii} | ${band} | ${repo.productionFiles} | ${density} |\n`;
            });
            
            markdown += `\n`;
        }
    });
    
    if (wrappers.length > 0) {
        markdown += `---\n\n`;
        markdown += `## System Wrappers\n\n`;
        markdown += `*Multi-language projects: core logic in Go/Rust, wrapper code analyzed.*\n\n`;
        markdown += `| Repository | Structural Stability Signal | Band | Production Files | Notes |\n`;
        markdown += `|------------|---------------------------|------|------------------|-------|\n`;
        
        wrappers.sort((a, b) => a.name.localeCompare(b.name));
        wrappers.forEach(repo => {
            const band = getStabilityBand(repo.sii);
            markdown += `| **${repo.name}** | ${repo.sii} | ${band} | ${repo.productionFiles} | ${repo.scopeNote || 'Wrapper-only analysis'} |\n`;
        });
    }
    
    markdown += `\n---\n\n`;
    
    // Reference Architectures (not "Top Performers")
    markdown += `## Reference Architectures\n\n`;
    markdown += `*Exemplars that demonstrate specific architectural patterns.*\n\n`;
    
    const referenceCases = [
        { name: 'storybook', reason: 'Large surface area with strong modular isolation' },
        { name: 'angular', reason: 'Strict layering sustained over time' },
        { name: 'typescript', reason: 'Demonstrates entropy effects at extreme scale' },
        { name: 'directus', reason: 'Illustrates unchecked cross-layer coupling' }
    ];
    
    referenceCases.forEach(ref => {
        const repo = validResults.find(r => r.name === ref.name);
        if (repo) {
            const batchLabel = repo.batch === 'final_push' ? 'Batch 4' : `Batch ${repo.batch}`;
            const resultsPath = repo.batch === 'final_push' ? 'final_push' : `batch_${repo.batch}`;
            const band = getStabilityBand(repo.sii);
            markdown += `### ${repo.name} (${batchLabel})\n\n`;
            markdown += `**Why referenced:** ${ref.reason}\n\n`;
            markdown += `- Structural Stability Signal: ${repo.sii} (Band: ${band})\n`;
            markdown += `- Production Files: ${repo.productionFiles} | Total Files: ${repo.totalFiles}\n`;
            markdown += `- Violations: ${repo.violations.layer} layer, ${repo.violations.nPlusOne} N+1, ${repo.violations.godClass} god classes\n`;
            markdown += `- [View Full Report →](./results/${resultsPath}/${repo.name}/SUMMARY.md)\n\n`;
        }
    });
    
    markdown += `---\n\n`;
    markdown += `## Summary Statistics\n\n`;
    
    const validForAverage = validResults.filter(r => r.productionFiles > 0);
    const avgSii = validForAverage.length > 0 
        ? validForAverage.reduce((sum, r) => sum + r.sii, 0) / validForAverage.length 
        : 0;
    
    const totalFiles = allResults.reduce((sum, r) => sum + r.totalFiles, 0);
    const totalProductionFiles = allResults.reduce((sum, r) => sum + r.productionFiles, 0);
    const totalProductionLOC = allResults.reduce((sum, r) => sum + r.productionLOC, 0);
    const totalWeightedDebt = allResults.reduce((sum, r) => sum + (r.weightedDebt || 0), 0);
    
    markdown += `- **Total Verified Repositories:** ${validResults.length}\n`;
    markdown += `- **Average Structural Stability Signal:** ${avgSii.toFixed(2)}\n`;
    markdown += `- **Total Files Analyzed:** ${totalFiles.toLocaleString()}\n`;
    markdown += `- **Total Production Files:** ${totalProductionFiles.toLocaleString()}\n`;
    markdown += `- **Total Production LOC:** ${totalProductionLOC.toLocaleString()}\n`;
    markdown += `- **Total Weighted Debt:** ${totalWeightedDebt}\n`;
    
    markdown += `\n---\n\n`;
    markdown += `Generated by ArchDrift v0.1.0\n`;
    
    const outputPath = path.join(__dirname, '..', 'STRUCTURAL_LANDSCAPE.md');
    fs.writeFileSync(outputPath, markdown);
    
    console.log(`\n✅ Structural Landscape generated!`);
    console.log(`📊 Saved to: ${outputPath}`);
    console.log(`\nTotal verified repositories: ${validResults.length}`);
    console.log(`Average Structural Stability Signal: ${avgSii.toFixed(2)}`);
    console.log(`\nFrameworks & Runtimes: ${frameworks.length} repos`);
    console.log(`Developer Tooling: ${tooling.length} repos`);
    console.log(`System Wrappers: ${wrappers.length} repos`);
}

if (require.main === module) {
    generateStructuralLandscape();
}

module.exports = { generateStructuralLandscape };

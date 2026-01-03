// Generate FINAL_LEADERBOARD.md consolidating all batches
const fs = require('fs');
const path = require('path');

function loadBatchResults(batchNum) {
    // Handle both numeric batches (1, 2, 3) and string batches (final_push)
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
        const siiMatch = summary.match(/Structural Integrity Index:\s*\*\*(\d+\.?\d*)%\*\*/);
        const sii = siiMatch ? parseFloat(siiMatch[1]) : 0;
        
        let productionFiles = 0;
        let totalFiles = 0;
        let productionLOC = 0;
        let violations = { layer: 0, nPlusOne: 0, godClass: 0 };
        let weightedDebt = 0;
        
        if (fs.existsSync(detailsPath)) {
            const details = fs.readFileSync(detailsPath, 'utf-8');
            
            // Match "**Total Files:** 172 (9 production)" or "**Total Files:** 172 (0 production)"
            const filesMatch = details.match(/\*\*Total Files:\*\*\s*(\d+)\s*\((\d+)\s*production\)/);
            if (filesMatch) {
                totalFiles = parseInt(filesMatch[1]);
                productionFiles = parseInt(filesMatch[2]);
            }
            
            // Match "in 2,01,716 LOC" or "in 661 LOC" - handle comma-separated numbers
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
            
            // Match "(305 weighted debt)" or "(0 weighted debt)"
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

function getGrade(sii) {
    if (sii >= 95) return 'A+';
    if (sii >= 90) return 'A';
    if (sii >= 85) return 'B+';
    if (sii >= 80) return 'B';
    if (sii >= 75) return 'C+';
    if (sii >= 70) return 'C';
    if (sii >= 65) return 'D+';
    if (sii >= 60) return 'D';
    return 'F';
}

function generateFinalLeaderboard() {
    // Load results from all batches
    const batch1Results = loadBatchResults(1);
    const batch2Results = loadBatchResults(2);
    const batch3Results = loadBatchResults(3);
    const finalPushResults = loadBatchResults('final_push');
    
    const allResults = [...batch1Results, ...batch2Results, ...batch3Results, ...finalPushResults];
    
    if (allResults.length === 0) {
        console.log('No results found. Please run batch analysis first.');
        return;
    }
    
    // Apply refinements
    allResults.forEach(repo => {
        // Zero-File Filter: Mark repos with 0 Production Files and 0 Production LOC
        if (repo.productionFiles === 0 && repo.productionLOC === 0) {
            repo.sii = null; // Mark as N/A - will be filtered out completely
            repo.status = 'N/A - Language Mismatch';
        }
        
        // DELETE lodash - small repo with misleading score
        if (repo.name === 'lodash') {
            repo.sii = null; // Filter out
        }
        
        // Systems Tools with TS Wrapper Only: esbuild and biome
        if (repo.name === 'esbuild') {
            repo.tag = 'Systems Tool - TS Wrapper Only';
            repo.scopeNote = 'Analysis limited to TypeScript/JavaScript glue code. Core logic (Go) is outside current audit scope. Score sensitive to debt-per-file ratio in small wrappers.';
        }
        if (repo.name === 'biome') {
            repo.tag = 'Systems Tool - TS Wrapper Only';
            repo.scopeNote = 'Analysis limited to TypeScript/JavaScript glue code. Core logic (Rust) is outside current audit scope. Score sensitive to debt-per-file ratio in small wrappers.';
        }
    });
    
    // Separate valid results from N/A results (N/A will be completely excluded)
    const validResults = allResults.filter(r => r.sii !== null);
    // naResults removed - not shown in leaderboard
    
    // Sort valid results by SII (descending)
    validResults.sort((a, b) => b.sii - a.sii);
    
    // Generate markdown
    let markdown = `# 🏆 ArchDrift Architecture Audit 2026\n\n`;
    markdown += `**Generated:** ${new Date().toLocaleString()}\n\n`;
    markdown += `Complete analysis of **${validResults.length} verified repositories**.\n\n`;
    markdown += `---\n\n`;
    
    // Organize into Leagues
    // Prettier is a CLI tool (468 prod files) despite having 5372 total files - move to Foundations
    const heavyweights = validResults.filter(r => 
        r.totalFiles > 1000 && 
        !r.tag?.includes('Wrapper Only') &&
        r.name !== 'prettier' // Prettier is a tool, not an app/framework
    );
    const foundations = validResults.filter(r => 
        (r.totalFiles <= 1000 || r.name === 'prettier') && 
        !r.tag?.includes('Wrapper Only')
    );
    const wrappers = validResults.filter(r => r.tag?.includes('Wrapper Only'));
    
    // Sort each league by SII
    heavyweights.sort((a, b) => b.sii - a.sii);
    foundations.sort((a, b) => b.sii - a.sii);
    wrappers.sort((a, b) => b.sii - a.sii);
    
    markdown += `## 🏛️ The Heavyweights (Apps & Frameworks > 1,000 files)\n\n`;
    markdown += `*The real test of architectural endurance at scale.*\n\n`;
    markdown += `| Rank | Repository | Batch | SII Score | Production Files | Total Files | Weighted Debt | Grade |\n`;
    markdown += `|------|------------|-------|-----------|------------------|-------------|---------------|-------|\n`;
    
    heavyweights.forEach((repo, index) => {
        const rank = index + 1;
        const grade = getGrade(repo.sii);
        const batchLabel = repo.batch === 'final_push' ? 'Batch 4' : `Batch ${repo.batch}`;
        markdown += `| ${rank} | **${repo.name}** | ${batchLabel} | **${repo.sii}%** | ${repo.productionFiles} | ${repo.totalFiles} | ${repo.weightedDebt} | ${grade} |\n`;
    });
    
    markdown += `\n---\n\n`;
    markdown += `## 🧱 The Foundations (Libraries & Tools)\n\n`;
    markdown += `*Core infrastructure that must remain pure. Typically ≤ 1,000 total files, with exceptions for tools with large test/documentation suites but small production codebases (e.g., Prettier: 5,372 total files, 468 production files).*\n\n`;
    markdown += `| Rank | Repository | Batch | SII Score | Production Files | Total Files | Weighted Debt | Grade |\n`;
    markdown += `|------|------------|-------|-----------|------------------|-------------|---------------|-------|\n`;
    
    foundations.forEach((repo, index) => {
        const rank = index + 1;
        const grade = getGrade(repo.sii);
        const batchLabel = repo.batch === 'final_push' ? 'Batch 4' : `Batch ${repo.batch}`;
        markdown += `| ${rank} | **${repo.name}** | ${batchLabel} | **${repo.sii}%** | ${repo.productionFiles} | ${repo.totalFiles} | ${repo.weightedDebt} | ${grade} |\n`;
    });
    
    if (wrappers.length > 0) {
        markdown += `\n---\n\n`;
        markdown += `## 🔧 The Wrappers (System Tools - TS/JS Glue Code Only)\n\n`;
        markdown += `*Multi-language projects: core logic in Go/Rust, wrapper code analyzed.*\n\n`;
        markdown += `| Repository | Batch | SII Score | Production Files | Total Files | Weighted Debt | Grade | Notes |\n`;
        markdown += `|------------|-------|-----------|------------------|-------------|---------------|-------|-------|\n`;
        
        wrappers.forEach((repo) => {
            const grade = getGrade(repo.sii);
            const batchLabel = repo.batch === 'final_push' ? 'Batch 4' : `Batch ${repo.batch}`;
            markdown += `| **${repo.name}** | ${batchLabel} | **${repo.sii}%** | ${repo.productionFiles} | ${repo.totalFiles} | ${repo.weightedDebt} | ${grade} | Score sensitive to debt-per-file ratio |\n`;
        });
    }
    
    markdown += `\n---\n\n`;
    markdown += `## Summary Statistics\n\n`;
    
    // Recalculate averages: Only include repos with Production Files > 0
    const validForAverage = validResults.filter(r => r.productionFiles > 0);
    const avgSii = validForAverage.length > 0 
        ? validForAverage.reduce((sum, r) => sum + r.sii, 0) / validForAverage.length 
        : 0;
    
    const totalFiles = allResults.reduce((sum, r) => sum + r.totalFiles, 0);
    const totalProductionFiles = allResults.reduce((sum, r) => sum + r.productionFiles, 0);
    const totalProductionLOC = allResults.reduce((sum, r) => sum + r.productionLOC, 0);
    const totalWeightedDebt = allResults.reduce((sum, r) => sum + (r.weightedDebt || 0), 0);
    
    const batchCounts = {};
    validResults.forEach(r => {
        const batchKey = r.batch === 'final_push' ? 'Batch 4' : `Batch ${r.batch}`;
        batchCounts[batchKey] = (batchCounts[batchKey] || 0) + 1;
    });
    
    markdown += `- **Total Verified Repositories:** ${validResults.length}\n`;
    markdown += `- **Average SII Score:** ${avgSii.toFixed(2)}% (calculated from ${validForAverage.length} repos with Production Files > 0)\n`;
    markdown += `- **Total Files Analyzed:** ${totalFiles.toLocaleString()}\n`;
    markdown += `- **Total Production Files:** ${totalProductionFiles.toLocaleString()}\n`;
    markdown += `- **Total Production LOC:** ${totalProductionLOC.toLocaleString()}\n`;
    markdown += `- **Total Weighted Debt:** ${totalWeightedDebt}\n`;
    markdown += `\n### By Batch:\n\n`;
    
    Object.entries(batchCounts).forEach(([batch, count]) => {
        const batchResults = validResults.filter(r => {
            const rBatch = r.batch === 'final_push' ? 'Batch 4' : `Batch ${r.batch}`;
            return rBatch === batch && r.productionFiles > 0;
        });
        const batchAvg = batchResults.length > 0 
            ? batchResults.reduce((sum, r) => sum + r.sii, 0) / batchResults.length 
            : 0;
        markdown += `- **${batch}:** ${count} repos - Avg: ${batchAvg.toFixed(2)}%\n`;
    });
    
    markdown += `\n---\n\n`;
    
    // Top performers from each league
    const topHeavyweights = heavyweights.slice(0, 5);
    const topFoundations = foundations.slice(0, 5);
    
    markdown += `## Top Performers\n\n`;
    
    if (topHeavyweights.length > 0) {
        markdown += `### Heavyweights\n\n`;
        topHeavyweights.forEach((repo, index) => {
            const rank = index + 1;
            const batchLabel = repo.batch === 'final_push' ? 'Batch 4' : `Batch ${repo.batch}`;
            const resultsPath = repo.batch === 'final_push' ? 'final_push' : `batch_${repo.batch}`;
            markdown += `**${rank}. ${repo.name}** (${batchLabel}) - ${repo.sii}%\n`;
            markdown += `- Production Files: ${repo.productionFiles} | Total Files: ${repo.totalFiles} | Weighted Debt: ${repo.weightedDebt}\n`;
            markdown += `- [View Full Report →](./results/${resultsPath}/${repo.name}/SUMMARY.md)\n\n`;
        });
    }
    
    if (topFoundations.length > 0) {
        markdown += `### Foundations\n\n`;
        topFoundations.forEach((repo, index) => {
            const rank = index + 1;
            const batchLabel = repo.batch === 'final_push' ? 'Batch 4' : `Batch ${repo.batch}`;
            const resultsPath = repo.batch === 'final_push' ? 'final_push' : `batch_${repo.batch}`;
            markdown += `**${rank}. ${repo.name}** (${batchLabel}) - ${repo.sii}%\n`;
            markdown += `- Production Files: ${repo.productionFiles} | Total Files: ${repo.totalFiles} | Weighted Debt: ${repo.weightedDebt}\n`;
            markdown += `- [View Full Report →](./results/${resultsPath}/${repo.name}/SUMMARY.md)\n\n`;
        });
    }
    
    // Add Application Debt section highlighting Strapi and Directus
    markdown += `---\n\n`;
    markdown += `## Application Debt Benchmark\n\n`;
    markdown += `The following applications show real-world architectural debt patterns:\n\n`;
    
    const appRepos = validResults.filter(r => 
        (r.name === 'strapi' || r.name === 'directus') && r.productionFiles > 0
    );
    
    appRepos.forEach(repo => {
        const batchLabel = repo.batch === 'final_push' ? 'Batch 4' : `Batch ${repo.batch}`;
        const resultsPath = repo.batch === 'final_push' ? 'final_push' : `batch_${repo.batch}`;
        markdown += `### ${repo.name} (${batchLabel}) - ${repo.sii}%\n\n`;
        markdown += `- **Production Files:** ${repo.productionFiles}\n`;
        markdown += `- **Production LOC:** ${repo.productionLOC.toLocaleString()}\n`;
        markdown += `- **Application Debt:**\n`;
        markdown += `  - Layer Violations: ${repo.violations.layer} (×10 weight = ${repo.violations.layer * 10} points)\n`;
        markdown += `  - N+1 Queries: ${repo.violations.nPlusOne} (×2 weight = ${repo.violations.nPlusOne * 2} points)\n`;
        markdown += `  - God Classes: ${repo.violations.godClass} (×1 weight = ${repo.violations.godClass} points)\n`;
        markdown += `- **Total Weighted Debt:** ${repo.weightedDebt}\n`;
        if (repo.name === 'directus') {
            markdown += `- **Analysis Note:** Directus exhibits 309 layer violations in production code (api/src/), representing architectural dependencies that violate the lib → api separation pattern.\n`;
        }
        markdown += `- [View Full Report →](./results/${resultsPath}/${repo.name}/SUMMARY.md)\n\n`;
    });
    
    // Add note about clean frameworks
    const cleanFrameworks = validResults.filter(r => 
        (r.name === 'axios' || r.name === 'express' || r.name === 'fastify') && 
        r.productionFiles > 0 && r.weightedDebt === 0
    );
    
    if (cleanFrameworks.length > 0) {
        markdown += `### Clean Framework Comparison\n\n`;
        markdown += `These frameworks demonstrate minimal architectural debt:\n\n`;
        cleanFrameworks.forEach(repo => {
            markdown += `- **${repo.name}** (Batch ${repo.batch}): ${repo.sii}% - ${repo.productionLOC.toLocaleString()} LOC, 0 violations\n`;
        });
        markdown += `\n`;
    }
    
    
    // Add Special Notes section
    markdown += `---\n\n`;
    markdown += `## Special Notes\n\n`;
    markdown += `### Multi-Language Projects\n\n`;
    markdown += `**esbuild** and **biome** are tagged as [Systems Tool - TS Wrapper Only]. These are multi-language projects where:\n\n`;
    markdown += `- **esbuild**: Core logic is written in Go, TypeScript/JavaScript code serves as wrapper/bindings\n`;
    markdown += `- **biome**: Core logic is written in Rust, TypeScript/JavaScript code serves as wrapper/bindings\n`;
    markdown += `- Analysis is limited to the TS/JS layer only\n`;
    markdown += `- Low file counts reflect wrapper code, not the full codebase\n`;
    markdown += `- These repos are included in averages but their scores should be interpreted in the context of wrapper-only analysis\n\n`;
    
    markdown += `---\n\n`;
    markdown += `Generated by ArchDrift v0.4\n`;
    
    const outputPath = path.join(__dirname, '..', 'FINAL_LEADERBOARD.md');
    fs.writeFileSync(outputPath, markdown);
    
    console.log(`\n✅ Final leaderboard generated!`);
    console.log(`📊 Saved to: ${outputPath}`);
    console.log(`\nTotal verified repositories: ${validResults.length}`);
    console.log(`Average SII: ${avgSii.toFixed(2)}% (from ${validForAverage.length} repos with Production Files > 0)`);
    console.log(`\nHeavyweights: ${heavyweights.length} repos`);
    console.log(`Foundations: ${foundations.length} repos`);
    console.log(`Wrappers: ${wrappers.length} repos`);
    console.log(`\nTop Heavyweights:`);
    heavyweights.slice(0, 3).forEach((r, i) => {
        const batchLabel = r.batch === 'final_push' ? 'Batch 4' : `Batch ${r.batch}`;
        console.log(`  ${i + 1}. ${r.name} (${batchLabel}): ${r.sii}%`);
    });
    console.log(`\nTop Foundations:`);
    foundations.slice(0, 3).forEach((r, i) => {
        const batchLabel = r.batch === 'final_push' ? 'Batch 4' : `Batch ${r.batch}`;
        console.log(`  ${i + 1}. ${r.name} (${batchLabel}): ${r.sii}%`);
    });
}

if (require.main === module) {
    generateFinalLeaderboard();
}

module.exports = { generateFinalLeaderboard };

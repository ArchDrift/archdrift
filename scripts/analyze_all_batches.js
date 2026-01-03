// ArchDrift Complete Analysis - All Batches
// Analyzes batch_2 and batch_3, then creates final leaderboard with all 50 repos
//
// NOTE: This script requires audit_targets/ directory with cloned repositories.
// If audit_targets/ is missing, this script will skip missing batches gracefully.
// Test results are preserved in test-results-backup/ for reference.

const fs = require('fs');
const path = require('path');

// Import the batch analysis logic
const { analyzeRepository } = require('./batch_analyze_standalone.js');

const BATCHES = [
    { dir: 'audit_targets/batch_1', name: 'Batch 1', category: 'Pilot' },
    { dir: 'audit_targets/batch_2', name: 'Batch 2', category: 'Infrastructure Giants' },
    { dir: 'audit_targets/batch_3', name: 'Batch 3', category: 'Apps & Ecosystem Stars' }
];

// Known repos from batch_1 (Pilot 9 + Batch 1 = 19 repos total)
// We'll read batch_1 results and combine with new batches
const BATCH_1_REPOS = [
    { name: 'shadcn-ui', category: 'Pilot' },
    { name: 'zod', category: 'Pilot' },
    { name: 'pnpm', category: 'Pilot' },
    { name: 'axios', category: 'Pilot' },
    { name: 'create-t3-app', category: 'Pilot' },
    { name: 'lucide', category: 'Pilot' },
    { name: 'tanstack-query', category: 'Pilot' },
    { name: 'hono', category: 'Pilot' },
    { name: 'fastify', category: 'Pilot' },
    { name: 'express', category: 'Pilot' }
];

async function analyzeAllBatches() {
    const allResults = [];
    
    // First, load existing batch_1 results
    console.log('📊 Loading Batch 1 results...\n');
    for (const repo of BATCH_1_REPOS) {
        const resultPath = path.join(__dirname, '..', 'results', 'batch_1', repo.name, 'SUMMARY.md');
        if (fs.existsSync(resultPath)) {
            const summary = fs.readFileSync(resultPath, 'utf-8');
            const siiMatch = summary.match(/Structural Integrity Index:\s*\*\*(\d+\.?\d*)%\*\*/);
            const sii = siiMatch ? parseFloat(siiMatch[1]) : 0;
            
            // Get file count from FULL_DETAILS
            const detailsPath = path.join(__dirname, '..', 'results', 'batch_1', repo.name, 'FULL_DETAILS.md');
            let fileCount = 0;
            if (fs.existsSync(detailsPath)) {
                const details = fs.readFileSync(detailsPath, 'utf-8');
                const fileMatch = details.match(/Total Files:\s*(\d+)/);
                if (fileMatch) {
                    fileCount = parseInt(fileMatch[1]);
                }
            }
            
            allResults.push({
                name: repo.name,
                category: repo.category,
                sii: sii,
                fileCount: fileCount
            });
        }
    }
    
    // Analyze batch_2
    console.log('🚀 Starting Batch 2 analysis...\n');
    const batch2Dir = path.join(__dirname, '..', 'audit_targets', 'batch_2');
    if (fs.existsSync(batch2Dir)) {
        const repos = fs.readdirSync(batch2Dir).filter(item => {
            const itemPath = path.join(batch2Dir, item);
            return fs.statSync(itemPath).isDirectory();
        });
        
        for (const repoName of repos) {
            const repoPath = path.join(batch2Dir, repoName);
            console.log(`📦 Analyzing ${repoName}...`);
            try {
                const result = await analyzeRepository(repoPath, repoName, 'batch_2');
                allResults.push({
                    name: repoName,
                    category: 'Infrastructure Giants',
                    sii: result.sii,
                    fileCount: result.totalFiles
                });
                console.log(`  ✅ ${repoName}: SII ${result.sii}% | Files: ${result.totalFiles}\n`);
            } catch (error) {
                console.error(`  ❌ Error analyzing ${repoName}:`, error.message);
            }
        }
    }
    
    // Analyze batch_3
    console.log('🚀 Starting Batch 3 analysis...\n');
    const batch3Dir = path.join(__dirname, '..', 'audit_targets', 'batch_3');
    if (fs.existsSync(batch3Dir)) {
        const repos = fs.readdirSync(batch3Dir).filter(item => {
            const itemPath = path.join(batch3Dir, item);
            return fs.statSync(itemPath).isDirectory();
        });
        
        for (const repoName of repos) {
            const repoPath = path.join(batch3Dir, repoName);
            console.log(`📦 Analyzing ${repoName}...`);
            try {
                const result = await analyzeRepository(repoPath, repoName, 'batch_3');
                allResults.push({
                    name: repoName,
                    category: 'Apps & Ecosystem Stars',
                    sii: result.sii,
                    fileCount: result.totalFiles
                });
                console.log(`  ✅ ${repoName}: SII ${result.sii}% | Files: ${result.totalFiles}\n`);
            } catch (error) {
                console.error(`  ❌ Error analyzing ${repoName}:`, error.message);
            }
        }
    }
    
    // Sort by SII (descending)
    allResults.sort((a, b) => b.sii - a.sii);
    
    // Generate final leaderboard
    generateFinalLeaderboard(allResults);
    
    console.log(`\n✨ Complete! Analyzed ${allResults.length} repositories`);
    console.log(`📊 Final leaderboard saved to FINAL_LEADERBOARD.md`);
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

function generateFinalLeaderboard(results) {
    let markdown = `# 🏆 ArchDrift Big 41 Audit - Final Leaderboard\n\n`;
    markdown += `**Generated:** ${new Date().toLocaleString()}\n\n`;
    markdown += `Complete analysis of **${results.length} repositories** across all batches.\n\n`;
    markdown += `---\n\n`;
    markdown += `## Rankings\n\n`;
    markdown += `| Rank | Repository | Category | File Count | SII Score | Grade |\n`;
    markdown += `|------|------------|----------|------------|-----------|-------|\n`;
    
    results.forEach((repo, index) => {
        const rank = index + 1;
        const grade = getGrade(repo.sii);
        const siiBar = '█'.repeat(Math.round((repo.sii / 100) * 10)) + 
                      '░'.repeat(10 - Math.round((repo.sii / 100) * 10));
        markdown += `| ${rank} | **${repo.name}** | ${repo.category} | ${repo.fileCount.toLocaleString()} | **${repo.sii}%** ${siiBar} | ${grade} |\n`;
    });
    
    markdown += `\n---\n\n`;
    markdown += `## Statistics\n\n`;
    
    const avgSii = results.reduce((sum, r) => sum + r.sii, 0) / results.length;
    const totalFiles = results.reduce((sum, r) => sum + r.fileCount, 0);
    const categoryCounts = {};
    results.forEach(r => {
        categoryCounts[r.category] = (categoryCounts[r.category] || 0) + 1;
    });
    
    markdown += `- **Total Repositories:** ${results.length}\n`;
    markdown += `- **Average SII Score:** ${avgSii.toFixed(2)}%\n`;
    markdown += `- **Total Files Analyzed:** ${totalFiles.toLocaleString()}\n`;
    markdown += `\n### By Category:\n\n`;
    Object.entries(categoryCounts).forEach(([cat, count]) => {
        const catAvg = results.filter(r => r.category === cat).reduce((sum, r) => sum + r.sii, 0) / count;
        markdown += `- **${cat}:** ${count} repos (Avg: ${catAvg.toFixed(2)}%)\n`;
    });
    
    markdown += `\n---\n\n`;
    markdown += `Generated by ArchDrift v0.4\n`;
    
    const outputPath = path.join(__dirname, '..', 'FINAL_LEADERBOARD.md');
    fs.writeFileSync(outputPath, markdown);
}

if (require.main === module) {
    analyzeAllBatches().catch(console.error);
}

module.exports = { analyzeAllBatches };

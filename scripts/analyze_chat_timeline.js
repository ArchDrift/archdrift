// Analyze chat files to reconstruct chronological timeline
// Extract phases, milestones, and key decisions

const fs = require('fs');
const path = require('path');

function analyzeChatTimeline() {
    const chatDir = path.join(__dirname, '..', 'all-cursor-chats');
    const files = fs.readdirSync(chatDir)
        .filter(f => f.endsWith('.md') && !f.match(/^(INDEX|SEARCH_RESULTS|README)/))
        .map(f => {
            const filePath = path.join(chatDir, f);
            const stats = fs.statSync(filePath);
            const content = fs.readFileSync(filePath, 'utf-8');
            return {
                filename: f,
                path: filePath,
                size: stats.size,
                modified: stats.mtime,
                content: content.substring(0, 5000) // First 5KB for analysis
            };
        })
        .sort((a, b) => a.modified.getTime() - b.modified.getTime()); // Chronological
    
    // Phase detection keywords
    const phases = {
        P0_Ideation: ['driftguard', 'domain', 'archdrift.com', 'naming', 'ideation', 'concept'],
        P1_Engine: ['analyzer.ts', 'godclass', 'n+1', 'layer violation', 'ghost', 'tuning', 'false positive'],
        P2_VSCode: ['extension.ts', 'vscode', 'diagnostics', 'status bar', 'command', 'package.json'],
        P3_Cloud: ['next.js', 'vercel', 'stripe', 'webhook', 'pdf', 'resend', 'clone', '$2', '$5'],
        P4_Validation: ['42', '52', 'repo', 'test', 'sii', 'methodology', 'critique', 'reproducible'],
        P5_Ship: ['mit', 'license', 'marketplace', 'dmarc', 'leaderboard', 'hn', 'post'],
        P5_5_Chaos: ['copy', 'paste', 'new drive', 'deleted', 'clones', 'broken', 'scattered']
    };
    
    const timeline = [];
    
    files.forEach((file, index) => {
        const contentLower = file.content.toLowerCase();
        const detectedPhases = [];
        
        Object.keys(phases).forEach(phase => {
            const keywords = phases[phase];
            const matches = keywords.filter(kw => contentLower.includes(kw));
            if (matches.length > 0) {
                detectedPhases.push({
                    phase: phase,
                    matches: matches.length,
                    keywords: matches
                });
            }
        });
        
        // Extract key snippets
        const snippets = [];
        if (contentLower.includes('driftguard') && !contentLower.includes('archdrift')) {
            snippets.push('DriftGuard naming');
        }
        if (contentLower.includes('archdrift') && !contentLower.includes('driftguard')) {
            snippets.push('ArchDrift rename');
        }
        if (contentLower.includes('analyzer.ts')) {
            snippets.push('analyzer.ts work');
        }
        if (contentLower.includes('extension.ts')) {
            snippets.push('extension.ts work');
        }
        if (contentLower.includes('next.js') || contentLower.includes('vercel')) {
            snippets.push('Cloud backend');
        }
        if (contentLower.includes('42') || contentLower.includes('52')) {
            snippets.push('Repo testing');
        }
        
        timeline.push({
            index: index + 1,
            filename: file.filename,
            date: file.modified.toISOString(),
            size: file.size,
            phases: detectedPhases,
            snippets: snippets
        });
    });
    
    // Generate report
    let report = `# Chat Timeline Analysis\n\n`;
    report += `**Total Files:** ${files.length}\n`;
    report += `**Analysis Date:** ${new Date().toISOString()}\n\n`;
    report += `---\n\n`;
    
    // Phase distribution
    report += `## Phase Distribution\n\n`;
    const phaseCounts = {};
    timeline.forEach(item => {
        item.phases.forEach(p => {
            phaseCounts[p.phase] = (phaseCounts[p.phase] || 0) + 1;
        });
    });
    
    Object.keys(phaseCounts).sort().forEach(phase => {
        report += `- **${phase}**: ${phaseCounts[phase]} files\n`;
    });
    
    report += `\n---\n\n`;
    report += `## Chronological Timeline (First 50)\n\n`;
    
    timeline.slice(0, 50).forEach(item => {
        report += `### ${item.index}. ${item.filename}\n\n`;
        report += `**Date:** ${item.date}\n`;
        report += `**Size:** ${item.size} bytes\n`;
        if (item.phases.length > 0) {
            report += `**Phases:** ${item.phases.map(p => p.phase).join(', ')}\n`;
        }
        if (item.snippets.length > 0) {
            report += `**Snippets:** ${item.snippets.join(', ')}\n`;
        }
        report += `\n`;
    });
    
    const reportPath = path.join(__dirname, '..', 'CHAT_TIMELINE_ANALYSIS.md');
    fs.writeFileSync(reportPath, report, 'utf-8');
    
    console.log(`✅ Timeline analysis complete!`);
    console.log(`📄 Report saved to: ${reportPath}`);
    console.log(`\nPhase distribution:`);
    Object.keys(phaseCounts).sort().forEach(phase => {
        console.log(`  ${phase}: ${phaseCounts[phase]} files`);
    });
    
    return timeline;
}

if (require.main === module) {
    analyzeChatTimeline();
}

module.exports = { analyzeChatTimeline };

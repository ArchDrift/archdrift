// Search recovered chat files for specific keywords
// Especially useful for finding DriftGuard/ArchDrift related conversations

const fs = require('fs');
const path = require('path');

function searchChats(keywords, chatDir) {
    const results = [];
    const files = fs.readdirSync(chatDir).filter(f => f.endsWith('.md'));
    
    console.log(`🔍 Searching ${files.length} chat files for: ${keywords.join(', ')}\n`);
    
    keywords.forEach(keyword => {
        const lowerKeyword = keyword.toLowerCase();
        const matches = [];
        
        files.forEach(file => {
            const filePath = path.join(chatDir, file);
            const content = fs.readFileSync(filePath, 'utf-8').toLowerCase();
            
            if (content.includes(lowerKeyword)) {
                // Count occurrences
                const count = (content.match(new RegExp(lowerKeyword, 'g')) || []).length;
                
                // Extract context (first 200 chars around first match)
                const index = content.indexOf(lowerKeyword);
                const start = Math.max(0, index - 100);
                const end = Math.min(content.length, index + keyword.length + 100);
                const context = content.substring(start, end).replace(/\n/g, ' ').trim();
                
                matches.push({
                    file: file,
                    count: count,
                    context: context
                });
            }
        });
        
        if (matches.length > 0) {
            results.push({
                keyword: keyword,
                matches: matches.sort((a, b) => b.count - a.count) // Sort by relevance
            });
        }
    });
    
    return results;
}

function generateSearchReport(results, outputDir) {
    let markdown = `# Chat Search Results\n\n`;
    markdown += `**Generated:** ${new Date().toISOString()}\n\n`;
    markdown += `---\n\n`;
    
    results.forEach(result => {
        markdown += `## Keyword: "${result.keyword}"\n\n`;
        markdown += `Found in **${result.matches.length}** chat file(s)\n\n`;
        
        result.matches.forEach((match, index) => {
            markdown += `### ${index + 1}. ${match.file}\n\n`;
            markdown += `**Occurrences:** ${match.count}\n\n`;
            markdown += `**Context:**\n> ${match.context}...\n\n`;
            markdown += `[View Full Chat →](./${match.file})\n\n`;
            markdown += `---\n\n`;
        });
    });
    
    const outputPath = path.join(outputDir, 'SEARCH_RESULTS.md');
    fs.writeFileSync(outputPath, markdown, 'utf-8');
    
    return outputPath;
}

function generateIndex(chatDir) {
    const files = fs.readdirSync(chatDir).filter(f => f.endsWith('.md') && f !== 'INDEX.md' && f !== 'SEARCH_RESULTS.md');
    
    let markdown = `# Recovered Chat History Index\n\n`;
    markdown += `**Total Chats:** ${files.length}\n`;
    markdown += `**Recovered:** ${new Date().toISOString()}\n\n`;
    markdown += `---\n\n`;
    
    // Group by workspace (hash prefix)
    const byWorkspace = {};
    files.forEach(file => {
        const workspace = file.split('_')[0];
        if (!byWorkspace[workspace]) {
            byWorkspace[workspace] = [];
        }
        byWorkspace[workspace].push(file);
    });
    
    markdown += `## By Workspace\n\n`;
    Object.keys(byWorkspace).sort().forEach(workspace => {
        markdown += `### ${workspace}\n\n`;
        markdown += `**Chats:** ${byWorkspace[workspace].length}\n\n`;
        
        byWorkspace[workspace].forEach(file => {
            const title = file.replace(/^[^_]+_/, '').replace(/_\d+\.md$/, '');
            markdown += `- [${title}](./${file})\n`;
        });
        
        markdown += `\n`;
    });
    
    markdown += `---\n\n`;
    markdown += `## All Chats (Alphabetical)\n\n`;
    
    files.sort().forEach(file => {
        const title = file.replace(/^[^_]+_/, '').replace(/_\d+\.md$/, '');
        markdown += `- [${title}](./${file})\n`;
    });
    
    const indexPath = path.join(chatDir, 'INDEX.md');
    fs.writeFileSync(indexPath, markdown, 'utf-8');
    
    return indexPath;
}

// Main search function
function searchRecoveredChats() {
    const chatDir = path.join(__dirname, '..', 'all-cursor-chats');
    
    if (!fs.existsSync(chatDir)) {
        console.error('❌ all-cursor-chats directory not found. Run recover_chat_history.js first.');
        process.exit(1);
    }
    
    // Priority keywords
    const keywords = [
        'DriftGuard',
        'ArchDrift',
        'archdrift',
        'driftguard',
        'SII',
        'Structural Integrity',
        'architectural drift',
        'methodology',
        'leaderboard',
        'structural landscape'
    ];
    
    console.log('🔍 Searching recovered chats...\n');
    
    const results = searchChats(keywords, chatDir);
    
    if (results.length === 0) {
        console.log('❌ No matches found for any keywords.');
        return;
    }
    
    // Print summary
    results.forEach(result => {
        console.log(`\n📌 "${result.keyword}": Found in ${result.matches.length} file(s)`);
        result.matches.slice(0, 5).forEach(match => {
            console.log(`   - ${match.file} (${match.count} occurrences)`);
        });
        if (result.matches.length > 5) {
            console.log(`   ... and ${result.matches.length - 5} more`);
        }
    });
    
    // Generate search report
    const reportPath = generateSearchReport(results, chatDir);
    console.log(`\n📄 Search report saved to: ${reportPath}`);
    
    // Generate index
    const indexPath = generateIndex(chatDir);
    console.log(`📑 Index saved to: ${indexPath}`);
    
    console.log(`\n✅ Search complete!`);
}

if (require.main === module) {
    searchRecoveredChats();
}

module.exports = { searchRecoveredChats, generateIndex };

const fs = require('fs');
const path = require('path');

// 1. Clean LANDSCAPE_MOAT.json - remove 0 LOC repos and note
const jsonPath = path.join(__dirname, '..', 'LANDSCAPE_MOAT.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

const cleanRepos = data.repos.filter(r => r.loc > 0);
const clean = {
    generated: new Date().toISOString(),
    totalRepos: cleanRepos.length,
    repos: cleanRepos.sort((a, b) => a.drift - b.drift)
};

fs.writeFileSync(jsonPath, JSON.stringify(clean, null, 2));
console.log(`✅ Removed ${data.repos.length - cleanRepos.length} repos with 0 LOC`);
console.log(`✅ New total: ${cleanRepos.length} repos`);

// 2. Generate dist/LANDSCAPE_MOAT.json
const distDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}
const distPath = path.join(distDir, 'LANDSCAPE_MOAT.json');
fs.writeFileSync(distPath, JSON.stringify(clean, null, 2));
console.log(`✅ Generated dist/LANDSCAPE_MOAT.json`);

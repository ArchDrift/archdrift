const fs = require('fs');
const path = require('path');

// Clean LANDSCAPE_MOAT.json by removing 0 LOC repos
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

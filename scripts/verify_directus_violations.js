// Verify Directus layer violations are not from dist/ or node_modules/
const fs = require('fs');
const path = require('path');

const directusDetailsPath = path.join(__dirname, '..', 'results', 'batch_3', 'directus', 'FULL_DETAILS.md');

if (!fs.existsSync(directusDetailsPath)) {
    console.error('Directus FULL_DETAILS.md not found');
    process.exit(1);
}

const details = fs.readFileSync(directusDetailsPath, 'utf-8');

// Extract all layer violation file paths
const layerViolationSection = details.match(/## 🚫 Layer Violation\n\n([\s\S]*?)(?=\n---|\n##|$)/);
if (!layerViolationSection) {
    console.log('No layer violations found in Directus report');
    process.exit(0);
}

const violations = layerViolationSection[1];
// Match file paths in markdown code blocks
const filePathMatches = violations.match(/### `([^`\n]+)`/g) || [];
const filePaths = filePathMatches.map(m => m.replace(/### `|`/g, '').trim());

console.log(`\n🔍 Verifying ${filePaths.length} Directus Layer Violations...\n`);

let distCount = 0;
let nodeModulesCount = 0;
let productionCount = 0;

filePaths.forEach(filePathLine => {
    const filePath = filePathLine.replace(/### `|`/g, '').trim();
    const normalizedPath = filePath.toLowerCase();
    
    if (normalizedPath.includes('dist/') || normalizedPath.includes('\\dist\\')) {
        distCount++;
        console.log(`❌ DIST: ${filePath}`);
    } else if (normalizedPath.includes('node_modules')) {
        nodeModulesCount++;
        console.log(`❌ NODE_MODULES: ${filePath}`);
    } else {
        productionCount++;
        // Verify it's in production code structure
        if (normalizedPath.includes('/api/src/') || normalizedPath.includes('/src/') || normalizedPath.includes('/core/')) {
            // Valid production code
        } else {
            console.log(`⚠️  UNUSUAL PATH: ${filePath}`);
        }
    }
});

console.log(`\n${'='.repeat(80)}`);
console.log('VERIFICATION RESULTS');
console.log('='.repeat(80));
console.log(`Total Layer Violations: ${filePaths.length}`);
console.log(`From dist/: ${distCount}`);
console.log(`From node_modules/: ${nodeModulesCount}`);
console.log(`From production code: ${productionCount}`);

if (distCount === 0 && nodeModulesCount === 0) {
    console.log(`\n✅ VERIFIED: All ${productionCount} violations are from production code (api/src/)`);
    console.log(`   Directus has legitimate architectural debt in core modules.`);
} else {
    console.log(`\n❌ WARNING: Found ${distCount + nodeModulesCount} violations from dist/node_modules`);
    console.log(`   These should be excluded from the analysis.`);
}

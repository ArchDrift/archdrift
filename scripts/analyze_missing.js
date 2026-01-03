// Analyze missing repos (TypeScript and calcom)
//
// NOTE: This script requires audit_targets/ directory with cloned repositories.
// If audit_targets/ is missing, this script will exit gracefully.
// Test results are preserved in test-results-backup/ for reference.

const { analyzeRepository } = require('./batch_analyze_2_3.js');
const path = require('path');
const fs = require('fs');

async function main() {
    // Check if audit_targets exists
    const auditTargetsBase = path.join(__dirname, '..', 'audit_targets');
    if (!fs.existsSync(auditTargetsBase)) {
        console.log('⚠️  audit_targets/ directory not found.');
        console.log('   This script requires cloned repositories to analyze.');
        console.log('   Test results are preserved in test-results-backup/ for reference.');
        process.exit(0);
    }
    
    // Analyze TypeScript (capital T folder name)
    const tsPath = path.join(__dirname, '..', 'audit_targets', 'batch_2', 'TypeScript');
    try {
        console.log('Analyzing TypeScript...');
        const tsResult = await analyzeRepository(tsPath, 'typescript', 'batch_2');
        console.log(`typescript: ${tsResult.sii}% - Done`);
    } catch (e) {
        console.error('TypeScript error:', e.message);
    }
    
    // Analyze calcom
    const calcomPath = path.join(__dirname, '..', 'audit_targets', 'batch_3', 'calcom');
    try {
        console.log('Analyzing calcom...');
        const calcomResult = await analyzeRepository(calcomPath, 'calcom', 'batch_3');
        console.log(`calcom: ${calcomResult.sii}% - Done`);
    } catch (e) {
        console.error('calcom error:', e.message);
    }
}

main().catch(console.error);

// ArchDrift Batch 1 Analysis Script
// Standalone Node.js script to analyze all repositories
//
// NOTE: This script requires audit_targets/ directory with cloned repositories.
// If audit_targets/ is missing, the generated PowerShell script will show "NOT FOUND" for repos.
// Test results are preserved in test-results-backup/ for reference.

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

    const batchDir = path.join(__dirname, '..', 'audit_targets', 'batch_1');
    const resultsDir = path.join(__dirname, '..', 'results', 'batch_1');

    // Create results directory
    if (!fs.existsSync(resultsDir)) {
        fs.mkdirSync(resultsDir, { recursive: true });
    }

    const repos = [
        'shadcn-ui',
        'zod',
        'pnpm',
        'axios',
        'create-t3-app',
        'lucide',
        'tanstack-query',
        'hono',
        'fastify',
        'express'
    ];

console.log('🚀 Starting Big 41 Audit - Batch 1\n');
console.log('This will analyze each repository using ArchDrift.\n');
console.log('Note: Each repository needs to be analyzed individually via VS Code.\n');
console.log('For automated analysis, we need to use the compiled extension.\n');

// For now, create a script that can be run via VS Code extension
// We'll create a PowerShell script that opens each repo and runs the analysis

const script = `# ArchDrift Batch 1 Analysis Script
# Run this script to analyze all repositories

$repos = @(
    'shadcn-ui',
    'zod',
    'pnpm',
    'axios',
    'create-t3-app',
    'lucide',
    'tanstack-query',
    'hono',
    'fastify',
    'express'
)

$batchDir = Join-Path $PSScriptRoot '..' 'audit_targets' 'batch_1'
$resultsDir = Join-Path $PSScriptRoot '..' 'results' 'batch_1'

if (-not (Test-Path $resultsDir)) {
    New-Item -ItemType Directory -Path $resultsDir -Force | Out-Null
}

Write-Host "ArchDrift Batch 1 Analysis" -ForegroundColor Cyan
Write-Host "============================" -ForegroundColor Cyan
Write-Host ""
Write-Host "To analyze each repository:" -ForegroundColor Yellow
Write-Host "1. Open each repository folder in VS Code" -ForegroundColor Yellow
Write-Host "2. Run command: ArchDrift: Generate Workspace Report" -ForegroundColor Yellow
Write-Host "3. Copy the generated SUMMARY.md and FULL_DETAILS.md to results/batch_1/[repo-name]/" -ForegroundColor Yellow
Write-Host ""
Write-Host "Repositories to analyze:" -ForegroundColor Green
$i = 1
foreach ($repo in $repos) {
    $repoPath = Join-Path $batchDir $repo
    if (Test-Path $repoPath) {
        Write-Host "$i. $repo - $repoPath" -ForegroundColor White
    } else {
        Write-Host "$i. $repo - NOT FOUND" -ForegroundColor Red
    }
    $i++
}
`;

fs.writeFileSync(path.join(__dirname, 'run_batch_analysis.ps1'), script);

console.log('✅ Created run_batch_analysis.ps1');
console.log('\nSince ArchDrift requires VS Code extension context,');
console.log('we need a different approach. Let me create a Node.js script');
console.log('that uses the analyzer directly...\n');

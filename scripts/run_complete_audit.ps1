# ArchDrift Complete Audit Runner
# Clones all batches and runs analysis

Write-Host "🚀 ArchDrift Big 41 Complete Audit" -ForegroundColor Cyan
Write-Host ""

# Step 1: Clone Batch 2
Write-Host "📦 Step 1: Cloning Batch 2 (Infrastructure Giants)..." -ForegroundColor Yellow
& powershell -ExecutionPolicy Bypass -File "scripts\clone_batch_2.ps1"

# Step 2: Clone Batch 3
Write-Host ""
Write-Host "📦 Step 2: Cloning Batch 3 (Apps & Ecosystem Stars)..." -ForegroundColor Yellow
& powershell -ExecutionPolicy Bypass -File "scripts\clone_batch_3.ps1"

# Step 3: Run Analysis
Write-Host ""
Write-Host "🔍 Step 3: Running analysis on all repositories..." -ForegroundColor Yellow
node scripts\analyze_all_batches.js

Write-Host ""
Write-Host "✨ Complete! Check FINAL_LEADERBOARD.md for results" -ForegroundColor Green

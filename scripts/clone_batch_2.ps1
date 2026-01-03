# ArchDrift Batch 2 Audit - Clone Script (PowerShell)
# Clones the Infrastructure Giants repositories

$BATCH_DIR = "audit_targets\batch_2"

# Create batch directory if it doesn't exist
if (-not (Test-Path $BATCH_DIR)) {
    New-Item -ItemType Directory -Path $BATCH_DIR -Force | Out-Null
}

# Change to batch directory
Set-Location $BATCH_DIR

Write-Host "Starting Batch 2 repository cloning..." -ForegroundColor Cyan
Write-Host ""

# Repository list with their GitHub URLs and folder names
$repos = @(
    @{Path="facebook/react"; Folder="react"},
    @{Path="microsoft/vscode"; Folder="vscode"},
    @{Path="microsoft/TypeScript"; Folder="typescript"},
    @{Path="denoland/deno"; Folder="deno"},
    @{Path="nodejs/node"; Folder="node"},
    @{Path="sveltejs/svelte"; Folder="svelte"},
    @{Path="vuejs/core"; Folder="vue"},
    @{Path="angular/angular"; Folder="angular"},
    @{Path="oven-sh/bun"; Folder="bun"},
    @{Path="solidjs/solid"; Folder="solid"},
    @{Path="remix-run/remix"; Folder="remix"}
)

# Clone each repository
foreach ($repo in $repos) {
    $repoUrl = "https://github.com/$($repo.Path).git"
    $folderName = $repo.Folder

    if (Test-Path $folderName) {
        Write-Host "Skipping $folderName (already exists)" -ForegroundColor Yellow
    } else {
        Write-Host "Cloning $($repo.Path) -> $folderName..." -ForegroundColor Green
        git clone --depth 1 $repoUrl $folderName 2>&1 | Out-Null
        if ($LASTEXITCODE -eq 0) {
            Write-Host "$folderName cloned successfully" -ForegroundColor Green
        } else {
            Write-Host "Failed to clone $folderName" -ForegroundColor Red
        }
    }
    Write-Host ""
}

Write-Host "Batch 2 cloning complete!" -ForegroundColor Cyan
Write-Host ""
Write-Host "Cloned repositories:" -ForegroundColor Cyan
Get-ChildItem -Directory | ForEach-Object { Write-Host $_.Name }

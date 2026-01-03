# ArchDrift Batch 1 Audit - Clone Script (PowerShell)
# Clones the first 10 repositories for architectural analysis

$BATCH_DIR = "audit_targets\batch_1"

# Create batch directory if it doesn't exist
if (-not (Test-Path $BATCH_DIR)) {
    New-Item -ItemType Directory -Path $BATCH_DIR -Force | Out-Null
}

# Change to batch directory
Set-Location $BATCH_DIR

Write-Host "Starting Batch 1 repository cloning..." -ForegroundColor Cyan
Write-Host ""

# Repository list with their GitHub URLs and folder names
$repos = @(
    @{Path="shadcn-ui/ui"; Folder="shadcn-ui"},
    @{Path="colinhacks/zod"; Folder="zod"},
    @{Path="pnpm/pnpm"; Folder="pnpm"},
    @{Path="axios/axios"; Folder="axios"},
    @{Path="t3-oss/create-t3-app"; Folder="create-t3-app"},
    @{Path="lucide-icons/lucide"; Folder="lucide"},
    @{Path="TanStack/query"; Folder="tanstack-query"},
    @{Path="honojs/hono"; Folder="hono"},
    @{Path="fastify/fastify"; Folder="fastify"},
    @{Path="expressjs/express"; Folder="express"}
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

Write-Host "Batch 1 cloning complete!" -ForegroundColor Cyan
Write-Host ""
Write-Host "Cloned repositories:" -ForegroundColor Cyan
$i = 1
Get-ChildItem -Directory | Select-Object -ExpandProperty Name | ForEach-Object { 
    $name = $_
    Write-Host "$i. $name"
    $i = $i + 1
}

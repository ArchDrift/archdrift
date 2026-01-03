# ArchDrift Batch 3 Audit - Clone Script (PowerShell)
# Clones the Apps & Ecosystem Stars repositories

$BATCH_DIR = "audit_targets\batch_3"

# Create batch directory if it doesn't exist
if (-not (Test-Path $BATCH_DIR)) {
    New-Item -ItemType Directory -Path $BATCH_DIR -Force | Out-Null
}

# Change to batch directory
Set-Location $BATCH_DIR

Write-Host "🚀 Starting Batch 3 repository cloning..." -ForegroundColor Cyan
Write-Host ""

# Repository list with their GitHub URLs and folder names
$repos = @(
    @{Path="ghost/ghost"; Folder="ghost"},
    @{Path="strapi/strapi"; Folder="strapi"},
    @{Path="calcom/cal.com"; Folder="calcom"},
    @{Path="directus/directus"; Folder="directus"},
    @{Path="n8n-io/n8n"; Folder="n8n"},
    @{Path="makeplane/plane"; Folder="plane"},
    @{Path="immich-app/immich"; Folder="immich"},
    @{Path="nocodb/nocodb"; Folder="nocodb"},
    @{Path="nestjs/nest"; Folder="nest"},
    @{Path="ant-design/ant-design"; Folder="ant-design"},
    @{Path="vercel/turbo"; Folder="turbo"},
    @{Path="evanw/esbuild"; Folder="esbuild"},
    @{Path="biomejs/biome"; Folder="biome"},
    @{Path="swc-project/swc"; Folder="swc"},
    @{Path="prettier/prettier"; Folder="prettier"},
    @{Path="tailwindlabs/tailwindcss"; Folder="tailwindcss"},
    @{Path="storybookjs/storybook"; Folder="storybook"},
    @{Path="tldraw/tldraw"; Folder="tldraw"},
    @{Path="excalidraw/excalidraw"; Folder="excalidraw"},
    @{Path="payloadcms/payload"; Folder="payload"}
)

# Clone each repository
foreach ($repo in $repos) {
    $repoUrl = "https://github.com/$($repo.Path).git"
    $folderName = $repo.Folder

    if (Test-Path $folderName) {
        Write-Host "⏭️  Skipping $folderName (already exists)" -ForegroundColor Yellow
    } else {
        Write-Host "📦 Cloning $($repo.Path) -> $folderName..." -ForegroundColor Green
        git clone --depth 1 $repoUrl $folderName 2>&1 | Out-Null
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ $folderName cloned successfully" -ForegroundColor Green
        } else {
            Write-Host "❌ Failed to clone $folderName" -ForegroundColor Red
        }
    }
    Write-Host ""
}

Write-Host "✨ Batch 3 cloning complete!" -ForegroundColor Cyan
Write-Host ""
Write-Host "Cloned repositories:" -ForegroundColor Cyan
Get-ChildItem -Directory | ForEach-Object { Write-Host $_.Name }

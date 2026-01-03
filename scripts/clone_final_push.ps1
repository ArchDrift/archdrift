# Clone Final Push repositories for Big 50 Audit
$targetDir = "audit_targets\final_push"

if (-not (Test-Path $targetDir)) {
    New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
    Write-Host "Created directory: $targetDir"
}

$repos = @(
    "trpc/trpc",
    "appwrite/appwrite",
    "cypress-io/cypress",
    "vitejs/vite",
    "prisma/prisma",
    "microsoft/playwright",
    "elastic/kibana",
    "grafana/grafana",
    "lodash/lodash"
)

Write-Host "`nCloning 9 repositories for Final Push...`n"

foreach ($repo in $repos) {
    $repoName = $repo.Split('/')[-1]
    $repoPath = Join-Path $targetDir $repoName
    
    if (Test-Path $repoPath) {
        Write-Host "$repoName - Already exists, skipping"
        continue
    }
    
    Write-Host "Cloning $repoName..."
    $repoUrl = "https://github.com/$repo.git"
    
    try {
        git clone --depth 1 $repoUrl $repoPath 2>&1 | Out-Null
        if ($LASTEXITCODE -eq 0) {
            Write-Host "$repoName - Done"
        } else {
            Write-Host "$repoName - Failed (exit code: $LASTEXITCODE)"
        }
    } catch {
        Write-Host "$repoName - Error: $_"
    }
}

Write-Host "`nCloning complete!`n"

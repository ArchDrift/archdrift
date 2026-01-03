# Check clone status for batches 2 and 3

Write-Host "=== Batch 2 Status ===" -ForegroundColor Cyan
$batch2Dir = "audit_targets\batch_2"
$batch2Expected = @('react', 'vscode', 'typescript', 'deno', 'node', 'svelte', 'vue', 'angular', 'bun', 'solid', 'remix')
$batch2Cloned = if (Test-Path $batch2Dir) { Get-ChildItem -Directory -Path $batch2Dir | Select-Object -ExpandProperty Name } else { @() }

# Handle case sensitivity (TypeScript vs typescript)
$batch2ClonedNormalized = $batch2Cloned | ForEach-Object { if ($_ -eq 'TypeScript') { 'typescript' } else { $_ } }

$batch2Missing = $batch2Expected | Where-Object { $batch2ClonedNormalized -notcontains $_ }
$batch2Complete = $batch2Expected | Where-Object { $batch2ClonedNormalized -contains $_ }

Write-Host "Cloned: $($batch2Complete.Count)/$($batch2Expected.Count)" -ForegroundColor $(if ($batch2Missing.Count -eq 0) { 'Green' } else { 'Yellow' })
if ($batch2Complete.Count -gt 0) {
    Write-Host "  Complete: $($batch2Complete -join ', ')" -ForegroundColor Green
}
if ($batch2Missing.Count -gt 0) {
    Write-Host "  Missing: $($batch2Missing -join ', ')" -ForegroundColor Yellow
}

Write-Host "`n=== Batch 3 Status ===" -ForegroundColor Cyan
$batch3Dir = "audit_targets\batch_3"
$batch3Expected = @('ghost', 'strapi', 'calcom', 'directus', 'n8n', 'plane', 'immich', 'nocodb', 'nest', 'ant-design', 'turbo', 'esbuild', 'biome', 'swc', 'prettier', 'tailwindcss', 'storybook', 'tldraw', 'excalidraw', 'payload')
$batch3Cloned = if (Test-Path $batch3Dir) { Get-ChildItem -Directory -Path $batch3Dir | Select-Object -ExpandProperty Name } else { @() }
$batch3Missing = $batch3Expected | Where-Object { $batch3Cloned -notcontains $_ }
$batch3Complete = $batch3Expected | Where-Object { $batch3Cloned -contains $_ }

Write-Host "Cloned: $($batch3Complete.Count)/$($batch3Expected.Count)" -ForegroundColor $(if ($batch3Missing.Count -eq 0) { 'Green' } else { 'Yellow' })
if ($batch3Complete.Count -gt 0) {
    Write-Host "  Complete: $($batch3Complete -join ', ')" -ForegroundColor Green
}
if ($batch3Missing.Count -gt 0) {
    Write-Host "  Missing: $($batch3Missing.Count) repos" -ForegroundColor Yellow
    Write-Host "  Missing: $($batch3Missing -join ', ')" -ForegroundColor Yellow
}

Write-Host "`nTotal: $($batch2Complete.Count + $batch3Complete.Count)/$($batch2Expected.Count + $batch3Expected.Count) repos cloned" -ForegroundColor Cyan

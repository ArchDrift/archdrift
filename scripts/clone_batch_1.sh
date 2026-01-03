#!/bin/bash

# ArchDrift Batch 1 Audit - Clone Script
# Clones the first 10 repositories for architectural analysis

BATCH_DIR="audit_targets/batch_1"

# Create batch directory if it doesn't exist
mkdir -p "$BATCH_DIR"

# Change to batch directory
cd "$BATCH_DIR" || exit 1

echo "🚀 Starting Batch 1 repository cloning..."
echo ""

# Repository list with their GitHub URLs
repos=(
    "shadcn-ui/ui:shadcn-ui"
    "colinhacks/zod:zod"
    "pnpm/pnpm:pnpm"
    "axios/axios:axios"
    "t3-oss/create-t3-app:create-t3-app"
    "lucide-icons/lucide:lucide"
    "TanStack/query:tanstack-query"
    "honojs/hono:hono"
    "fastify/fastify:fastify"
    "expressjs/express:express"
)

# Clone each repository
for repo in "${repos[@]}"; do
    IFS=':' read -r github_path folder_name <<< "$repo"
    repo_url="https://github.com/${github_path}.git"
    
    if [ -d "$folder_name" ]; then
        echo "⏭️  Skipping $folder_name (already exists)"
    else
        echo "📦 Cloning $github_path -> $folder_name..."
        git clone --depth 1 "$repo_url" "$folder_name" 2>&1 | grep -E "(Cloning|done|error)" || echo "✅ $folder_name cloned"
    fi
    echo ""
done

echo "✨ Batch 1 cloning complete!"
echo ""
echo "Cloned repositories:"
ls -d */ | sed 's|/$||' | nl



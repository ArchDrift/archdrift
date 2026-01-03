# DriftGuard Workspace Index

## Overview

This workspace contains:
- **DriftGuard Engine**: The VS Code extension for architectural analysis
- **Batch 1 Audit Targets**: 10 popular open-source repositories for analysis

## Directory Structure

```
Drifted/
├── src/                          # DriftGuard extension source code
│   ├── analyzer.ts               # Core analysis engine
│   ├── extension.ts              # VS Code extension entry point
│   └── reportGenerator.ts        # Report generation logic
├── audit_targets/
│   └── batch_1/                  # Batch 1 audit targets (10 repos)
│       ├── shadcn-ui/
│       ├── zod/
│       ├── pnpm/
│       ├── axios/
│       ├── create-t3-app/
│       ├── lucide/
│       ├── tanstack-query/
│       ├── hono/
│       ├── fastify/
│       └── express/
├── scripts/
│   ├── clone_batch_1.sh          # Bash clone script (Linux/Mac)
│   └── clone_batch_1.ps1         # PowerShell clone script (Windows)
└── .driftguard/
    └── audits/                   # Generated audit reports
```

## DriftGuard Engine

**Location**: `src/`

### Key Components

1. **analyzer.ts** - Core analysis engine
   - `analyzeDocument()` - Main analysis function
   - `detectNPlusOneQueries()` - N+1 query detection
   - `detectLayerViolations()` - Layer architecture violations
   - `detectGodClass()` - God class detection
   - `calculateSII()` - Structural Integrity Index calculation

2. **extension.ts** - VS Code extension
   - `driftguard.scan` - Scan current file
   - `driftguard.generateReport` - Generate workspace report
   - Diagnostic collection and status bar integration

3. **reportGenerator.ts** - Report generation
   - `generateWorkspaceReport()` - Full workspace analysis
   - `generateMarkdownReport()` - Markdown report generation

### Analysis Capabilities

- **Layer Violations**: Detects architectural layer violations (e.g., domain → api)
- **N+1 Queries**: Identifies database/API calls inside loops
- **God Classes**: Detects files exceeding complexity thresholds
- **Structural Integrity Index (SII)**: Calculates overall codebase health (0-100%)

## Batch 1 Audit Targets

**Location**: `audit_targets/batch_1/`

### Repository Details

| # | Repository | Size | Language | Description |
|---|-----------|------|-----------|-------------|
| 1 | shadcn-ui | ~91 MB | TypeScript/React | UI component library |
| 2 | zod | ~18 MB | TypeScript | Schema validation |
| 3 | pnpm | ~12 MB | TypeScript | Package manager |
| 4 | axios | ~2.8 MB | JavaScript/TS | HTTP client |
| 5 | create-t3-app | ~3.2 MB | TypeScript | T3 Stack scaffolding |
| 6 | lucide | ~6.4 MB | TypeScript | Icon toolkit |
| 7 | tanstack-query | ~24 MB | TypeScript | Data synchronization |
| 8 | hono | ~4.3 MB | TypeScript | Web framework |
| 9 | fastify | ~2.8 MB | JavaScript/TS | Web framework |
| 10 | express | ~731 KB | JavaScript | Web framework |

### Audit Status

- ✅ All repositories cloned (shallow clone, depth=1)
- ⏳ Ready for DriftGuard analysis

## Running Audits

### Single Repository Audit

1. Open the repository folder in VS Code
2. Run command: `DriftGuard: Generate Workspace Report`
3. Report will be generated in `.driftguard/audits/`

### Batch Audit Script

To audit all Batch 1 repositories:

```powershell
# PowerShell (Windows)
cd audit_targets/batch_1
Get-ChildItem -Directory | ForEach-Object {
    Write-Host "Auditing $($_.Name)..."
    # Open in VS Code and run DriftGuard report
}
```

## Analysis Metrics

### Structural Integrity Index (SII)

- **Formula**: Density-based with logarithmic floor
- **Range**: 0-100%
- **Weights**:
  - Layer Violations: ×10 (Fatal)
  - N+1 Queries: ×2 (High)
  - God Class Monoliths (>1500 LOC): ×5 (Critical)

### Detection Patterns

1. **Layer Violations**: Detects imports violating architectural layers
2. **N+1 Queries**: Database/API calls inside loops (excludes Map/Set methods)
3. **God Classes**: Files >800 LOC (Large Class) or >1500 LOC (Monolith)

## Next Steps

1. Run DriftGuard analysis on each Batch 1 repository
2. Collect SII scores and violation patterns
3. Generate comparative analysis report
4. Identify common architectural patterns across repositories



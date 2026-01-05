# ArchDrift

Architectural smoke detector for TypeScript codebases.
Detects structural erosion while you're coding, not months later in refactors.

## What You'll See After Installing

- Open a TypeScript or JavaScript file
- Architectural risk signals appear inline as diagnostics
- Hover to see why a pattern is risky
- Generate a workspace report to see:
  - Drift snapshot
  - Top offending files
  - Pattern breakdown
  - Line-by-line findings with file and location references

## What It Detects

### Layer Violations
Forbidden dependencies between architectural layers. Flags when domain logic imports from API layers, or infrastructure depends on domain code.

### N+1 Queries
Database or API calls executed inside loops, indicating potential performance bottlenecks.

### God Classes
Files exceeding maintainability thresholds (1,501+ lines for regular files, 2,501+ for type definitions).

## Calibration

Detection thresholds are calibrated against an audit of 43 high-velocity TypeScript repositories, including React, Prisma, Supabase, Storybook, and Angular. This ensures signals are grounded in real-world patterns rather than arbitrary rules.

## Domain Awareness

ArchDrift applies domain-aware heuristics to adjust analysis sensitivity based on project characteristics:
- **Framework**: Stricter layer enforcement
- **Database Tool**: Higher N+1 query sensitivity
- **Utility Library**: More tolerant of large files
- **Application**: Balanced enforcement across all patterns

This prevents false positives in utility libraries (where large files are expected) while maintaining strict standards for frameworks.

## Installation

### VS Code Extension

1. Install from VSIX file via Extensions view → "Install from VSIX..."
2. Open any TypeScript/JavaScript workspace
3. ArchDrift analyzes files automatically on open and save

### Development

```bash
npm install
npm run compile
```

Press `F5` in VS Code to launch Extension Development Host.

## Usage

ArchDrift runs automatically. Diagnostics appear in the Problems panel with severity levels:
- **Error**: Layer violations (architectural breakdown)
- **Warning**: God Classes and N+1 Queries (maintainability and performance risks)

Use Command Palette → "ArchDrift: Generate Workspace Report" for a comprehensive drift analysis.

## How It Works

Static analysis of import statements, loop constructs, and file structure. Production code is identified by excluding test files, build artifacts, and files ignored by `.gitignore`. Test files are scanned but excluded from drift calculations.

## Structural Integrity Index

ArchDrift summarizes detected signals into a drift snapshot designed to be compared across scans and repositories analyzed with the same methodology.

## Real-World Results

From the 43-repository audit:
- **Storybook**: 0.4% drift (1,879 files, 166K LOC)
- **Angular**: 2.1% drift (2,720 files, 255K LOC)
- **Prisma**: 13.4% drift (881 files, 58K LOC)
- **Lodash**: 13.8% drift (13 files, 26K LOC) — utility library, domain-adjusted

Repository size doesn't determine drift. Architecture discipline does.

## License

MIT

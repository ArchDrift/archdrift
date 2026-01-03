# 🏆 ArchDrift Architecture Audit 2026

**Generated:** 3/1/2026, 5:51:40 pm

Complete analysis of **42 verified repositories**.

---

## 🏛️ The Heavyweights (Apps & Frameworks > 1,000 files)

*The real test of architectural endurance at scale.*

| Rank | Repository | Batch | SII Score | Production Files | Total Files | Weighted Debt | Grade |
|------|------------|-------|-----------|------------------|-------------|---------------|-------|
| 1 | **storybook** | Batch 3 | **99.6%** | 1879 | 3117 | 7 | A+ |
| 2 | **shadcn-ui** | Batch 1 | **99%** | 192 | 6023 | 2 | A+ |
| 3 | **pnpm** | Batch 1 | **98.7%** | 1259 | 2236 | 16 | A+ |
| 4 | **angular** | Batch 2 | **97.7%** | 2720 | 6196 | 63 | A+ |
| 5 | **svelte** | Batch 2 | **97.6%** | 414 | 3177 | 10 | A+ |
| 6 | **swc** | Batch 3 | **96.5%** | 254 | 41643 | 9 | A+ |
| 7 | **tldraw** | Batch 3 | **96.5%** | 1408 | 2423 | 49 | A+ |
| 8 | **plane** | Batch 3 | **96.2%** | 2993 | 3668 | 113 | A+ |
| 9 | **cypress** | Batch 4 | **96.1%** | 1972 | 4235 | 76 | A+ |
| 10 | **nest** | Batch 3 | **95.9%** | 1223 | 1707 | 50 | A+ |
| 11 | **immich** | Batch 3 | **95.4%** | 724 | 1005 | 33 | A+ |
| 12 | **payload** | Batch 3 | **95.2%** | 3624 | 5779 | 174 | A+ |
| 13 | **n8n** | Batch 3 | **94.3%** | 6402 | 9100 | 368 | A |
| 14 | **tanstack-query** | Batch 1 | **93.9%** | 491 | 1598 | 30 | A |
| 15 | **react** | Batch 2 | **93.7%** | 1659 | 4413 | 104 | A |
| 16 | **node** | Batch 2 | **93.2%** | 648 | 19553 | 44 | A |
| 17 | **vscode** | Batch 2 | **91.6%** | 4746 | 6175 | 400 | A |
| 18 | **vite** | Batch 4 | **91%** | 300 | 1365 | 27 | A |
| 19 | **strapi** | Batch 3 | **89.3%** | 2861 | 4167 | 305 | B+ |
| 20 | **playwright** | Batch 4 | **89.2%** | 659 | 1467 | 71 | B+ |
| 21 | **prisma** | Batch 4 | **86.6%** | 881 | 2785 | 118 | B+ |
| 22 | **calcom** | Batch 3 | **84.6%** | 4906 | 6906 | 757 | B |
| 23 | **bun** | Batch 2 | **83.3%** | 431 | 6329 | 72 | B |
| 24 | **typescript** | Batch 2 | **75.6%** | 422 | 38069 | 110 | C+ |
| 25 | **nocodb** | Batch 3 | **73.7%** | 1420 | 1906 | 409 | C |
| 26 | **directus** | Batch 3 | **46.6%** | 1705 | 2406 | 3137 | F |

---

## 🧱 The Foundations (Libraries & Tools ≤ 1,000 files)

*Core infrastructure that must remain pure.*

| Rank | Repository | Batch | SII Score | Production Files | Total Files | Weighted Debt | Grade |
|------|------------|-------|-----------|------------------|-------------|---------------|-------|
| 1 | **axios** | Batch 1 | **100%** | 9 | 172 | 0 | A+ |
| 2 | **express** | Batch 1 | **100%** | 6 | 142 | 0 | A+ |
| 3 | **lucide** | Batch 1 | **100%** | 198 | 450 | 0 | A+ |
| 4 | **solid** | Batch 2 | **100%** | 42 | 91 | 0 | A+ |
| 5 | **prettier** | Batch 3 | **100%** | 468 | 5372 | 0 | A+ |
| 6 | **turbo** | Batch 3 | **100%** | 248 | 976 | 0 | A+ |
| 7 | **create-t3-app** | Batch 1 | **98.7%** | 304 | 329 | 4 | A+ |
| 8 | **vue** | Batch 2 | **98.2%** | 277 | 522 | 5 | A+ |
| 9 | **trpc** | Batch 4 | **96.9%** | 226 | 769 | 7 | A+ |
| 10 | **hono** | Batch 1 | **96.6%** | 417 | 701 | 14 | A+ |
| 11 | **zod** | Batch 1 | **95.8%** | 360 | 778 | 15 | A+ |
| 12 | **tailwindcss** | Batch 3 | **94.1%** | 170 | 308 | 10 | A |
| 13 | **remix** | Batch 2 | **92.1%** | 191 | 379 | 15 | A |
| 14 | **excalidraw** | Batch 3 | **90.2%** | 408 | 568 | 40 | A |

---

## 🔧 The Wrappers (System Tools - TS/JS Glue Code Only)

*Multi-language projects: core logic in Go/Rust, wrapper code analyzed.*

| Repository | Batch | SII Score | Production Files | Total Files | Weighted Debt | Grade | Notes |
|------------|-------|-----------|------------------|-------------|---------------|-------|-------|
| **biome** | Batch 3 | **81.5%** | 27 | 3980 | 5 | B | Score sensitive to debt-per-file ratio |
| **esbuild** | Batch 3 | **75.4%** | 19 | 43 | 5 | C+ | Score sensitive to debt-per-file ratio |

---

## Summary Statistics

- **Total Verified Repositories:** 42
- **Average SII Score:** 92.15% (calculated from 42 repos with Production Files > 0)
- **Total Files Analyzed:** 2,09,912
- **Total Production Files:** 49,576
- **Total Production LOC:** 60,47,549
- **Total Weighted Debt:** 6679

### By Batch:

- **Batch 1:** 9 repos - Avg: 98.08%
- **Batch 2:** 10 repos - Avg: 92.30%
- **Batch 3:** 18 repos - Avg: 89.17%
- **Batch 4:** 5 repos - Avg: 91.96%

---

## Top Performers

### Heavyweights

**1. storybook** (Batch 3) - 99.6%
- Production Files: 1879 | Total Files: 3117 | Weighted Debt: 7
- [View Full Report →](./results/batch_3/storybook/SUMMARY.md)

**2. shadcn-ui** (Batch 1) - 99%
- Production Files: 192 | Total Files: 6023 | Weighted Debt: 2
- [View Full Report →](./results/batch_1/shadcn-ui/SUMMARY.md)

**3. pnpm** (Batch 1) - 98.7%
- Production Files: 1259 | Total Files: 2236 | Weighted Debt: 16
- [View Full Report →](./results/batch_1/pnpm/SUMMARY.md)

**4. angular** (Batch 2) - 97.7%
- Production Files: 2720 | Total Files: 6196 | Weighted Debt: 63
- [View Full Report →](./results/batch_2/angular/SUMMARY.md)

**5. svelte** (Batch 2) - 97.6%
- Production Files: 414 | Total Files: 3177 | Weighted Debt: 10
- [View Full Report →](./results/batch_2/svelte/SUMMARY.md)

### Foundations

**1. axios** (Batch 1) - 100%
- Production Files: 9 | Total Files: 172 | Weighted Debt: 0
- [View Full Report →](./results/batch_1/axios/SUMMARY.md)

**2. express** (Batch 1) - 100%
- Production Files: 6 | Total Files: 142 | Weighted Debt: 0
- [View Full Report →](./results/batch_1/express/SUMMARY.md)

**3. lucide** (Batch 1) - 100%
- Production Files: 198 | Total Files: 450 | Weighted Debt: 0
- [View Full Report →](./results/batch_1/lucide/SUMMARY.md)

**4. solid** (Batch 2) - 100%
- Production Files: 42 | Total Files: 91 | Weighted Debt: 0
- [View Full Report →](./results/batch_2/solid/SUMMARY.md)

**5. prettier** (Batch 3) - 100%
- Production Files: 468 | Total Files: 5372 | Weighted Debt: 0
- [View Full Report →](./results/batch_3/prettier/SUMMARY.md)

---

## Application Debt Benchmark

The following applications show real-world architectural debt patterns:

### strapi (Batch 3) - 89.3%

- **Production Files:** 2861
- **Production LOC:** 2,01,716
- **Application Debt:**
  - Layer Violations: 7 (×10 weight = 70 points)
  - N+1 Queries: 115 (×2 weight = 230 points)
  - God Classes: 6 (×1 weight = 6 points)
- **Total Weighted Debt:** 305
- [View Full Report →](./results/batch_3/strapi/SUMMARY.md)

### directus (Batch 3) - 46.6%

- **Production Files:** 1705
- **Production LOC:** 1,02,937
- **Application Debt:**
  - Layer Violations: 309 (×10 weight = 3090 points)
  - N+1 Queries: 21 (×2 weight = 42 points)
  - God Classes: 5 (×1 weight = 5 points)
- **Total Weighted Debt:** 3137
- **Analysis Note:** Directus exhibits 309 layer violations in production code (api/src/), representing architectural dependencies that violate the lib → api separation pattern.
- [View Full Report →](./results/batch_3/directus/SUMMARY.md)

### Clean Framework Comparison

These frameworks demonstrate minimal architectural debt:

- **axios** (Batch 1): 100% - 661 LOC, 0 violations
- **express** (Batch 1): 100% - 1,139 LOC, 0 violations

---

## Special Notes

### Multi-Language Projects

**esbuild** and **biome** are tagged as [Systems Tool - TS Wrapper Only]. These are multi-language projects where:

- **esbuild**: Core logic is written in Go, TypeScript/JavaScript code serves as wrapper/bindings
- **biome**: Core logic is written in Rust, TypeScript/JavaScript code serves as wrapper/bindings
- Analysis is limited to the TS/JS layer only
- Low file counts reflect wrapper code, not the full codebase
- These repos are included in averages but their scores should be interpreted in the context of wrapper-only analysis

---

Generated by ArchDrift v0.4

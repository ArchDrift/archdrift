# ArchDrift Methodology Document

**Version:** 1.0  
**Last Updated:** January 2026  
**Tool:** ArchDrift v0.1.0

---

## Executive Summary

This document provides a complete technical methodology for the ArchDrift architectural analysis tool. ArchDrift scans codebases for three specific anti-patterns: God Classes, N+1 Query patterns, and Layer Integrity violations. The tool calculates a Structural Integrity Index (SII) score from 0-100% based on the density of these violations in production code.

**Important:** This methodology is designed for **comparative analysis** across repositories, not absolute quality assessment. Scores should be interpreted relative to other projects analyzed with the same tool, not as absolute measures of code quality.

---

## 1. Detection Methodology

### 1.1 Production Code Filtering

**What Counts as Production Code:**
- Files located in directories matching: `/src/`, `/core/`, `/lib/`, or `/packages/`
- Files must be supported file types (see Section 1.4)

**What is Excluded:**
- Test files: `/test/`, `/tests/`, `/__tests__/`, `/spec/`, files ending in `.test.ts`, `.test.js`, `.spec.ts`, `.spec.js`
- Build artifacts: `/dist/`, `/build/`, `/node_modules/`, `/coverage/`
- All other directories not matching production patterns

**Rationale:** This filter ensures we analyze the actual application/library code, not test suites, build outputs, or dependencies. However, this means projects with different directory structures may have varying amounts of code analyzed.

**Limitation:** Projects that don't use standard `/src/` or `/core/` patterns may have less code analyzed, potentially affecting scores.

---

### 1.2 God Class Detection

**Definition:** A file containing more than a threshold number of non-empty, non-comment code lines.

**Thresholds:**
- **Regular Files:** 1,501+ lines of code = "Monolith" (5 weighted debt points)
- **Type/Schema Definition Files:** 2,501+ lines of code = "Monolith" (5 weighted debt points)
  - Detected by filename patterns: `schema`, `type`, `.d.ts`, `definition`
  - Or content analysis: >30% type/interface/enum keywords OR >2x type keywords vs function keywords

**Detection Method:**
1. Parse file content line by line
2. Count lines that:
   - Are not empty (after trimming whitespace)
   - Are not single-line comments (`//`, `#`)
   - Are not part of block comments (`/* ... */`)
3. If count exceeds threshold, flag as God Class

**Code Example:**
```typescript
// Counts actual code, excluding:
// - Empty lines
// - // Single line comments
// - /* Block comments */
// - # Python comments
```

**Weighting:**
- Monolith (≥1,501 LOC for regular, ≥2,501 for type files): **5 points**
- Large Class (801-1,500 LOC): **Not counted in strict mode** (only Monoliths contribute to SII)

**Limitations:**
- Does not account for generated code (may flag large generated files)
- Does not distinguish between "good" large files (e.g., comprehensive test utilities) vs "bad" ones
- Type definition files get higher threshold, but detection may have false positives/negatives

---

### 1.3 N+1 Query Detection

**Definition:** Database or API calls made inside loops, causing repeated queries instead of batch operations.

**Detection Patterns:**

**Loops Detected:**
- `for` loops (all variants: `for (let i = 0; i < n; i++)`, `for (const item of items)`, etc.)
- `while` loops
- Array methods: `.map()`, `.filter()`, `.forEach()`, `.reduce()`, `.some()`, `.every()`

**Database/API Calls Detected:**
- `await` statements followed by:
  - `.query()`, `.find()`, `.findOne()`, `.save()`, `.update()`, `.delete()`
  - `prisma.*` method calls
  - `db.*` method calls
- `fetch()` calls
- `axios.get()`, `axios.post()`, `axios.put()`, `axios.delete()`

**Detection Method:**
1. Parse AST (Abstract Syntax Tree) for supported languages
2. Identify loop constructs
3. Within loop body, search for database/API call patterns
4. Flag as N+1 Query violation

**Weighting:** **2 points** per violation (reduced from higher weight due to false positive rate)

**Limitations:**
- **High False Positive Rate:** Many legitimate patterns are flagged:
  - DataLoader patterns (batching queries)
  - Conditional queries that may not execute in loop
  - Cached queries
  - Queries that are actually batched but not detected
- **Language Support:** Works best for TypeScript/JavaScript. Python, Java, Go support is more limited.
- **Static Analysis Only:** Cannot detect runtime batching or caching strategies

**Recommendation:** N+1 Query counts should be manually reviewed. The tool is better at identifying potential issues than confirming actual problems.

---

### 1.4 Layer Integrity Detection

**Definition:** Violations of architectural layer boundaries, where code in one layer improperly depends on code in another layer.

**Layer Model (Default):**

| Layer | Directory Patterns | Description |
|-------|-------------------|-------------|
| **API** (Outermost) | `/api/`, `/presentation/`, `/controllers/` | HTTP handlers, UI components |
| **Domain** (Core) | `/domain/`, `/core/`, `/usecases/` | Business logic |
| **Infrastructure** (Innermost) | `/infra/`, `/infrastructure/`, `/persistence/`, `/adapters/` | Databases, external services |

**Dependency Rules:**
- ✅ **Allowed:** API → Domain, API → Infra, Domain → Infra
- ❌ **Forbidden:** Domain → API, Infra → API, Infra → Domain

**Detection Method:**
1. Determine file's layer from directory path
2. Parse import/require statements
3. Resolve imported paths to determine target layer
4. Check if import violates dependency rules
5. Flag as Layer Violation if forbidden dependency detected

**Supported Import Patterns:**
- ES6 imports: `import { X } from './path'`
- CommonJS: `require('./path')`
- TypeScript path aliases: `@app/domain/X`
- Relative paths: `../domain/file`

**Weighting:** **10 points** per violation (highest weight - considered "Fatal")

**Limitations:**
- **Convention-Based:** Only works if projects follow standard directory naming
- **False Positives:** May flag legitimate cross-layer dependencies (e.g., domain events, shared utilities)
- **No Configuration:** Cannot customize layer patterns or rules per project
- **Unclassified Files:** Files not matching layer patterns are not checked (may miss violations)

**Recommendation:** Layer violation counts should be reviewed in context. Some violations may be intentional architectural decisions.

---

### 1.5 Supported File Types

**Fully Supported:**
- TypeScript (`.ts`, `.tsx`)
- JavaScript (`.js`, `.jsx`)

**Partially Supported (limited pattern detection):**
- Python (`.py`)
- Java (`.java`)
- Go (`.go`)

**Note:** Full AST parsing and pattern detection works best for TypeScript/JavaScript. Other languages have basic support but may miss some patterns.

---

## 2. Structural Integrity Index (SII) Calculation

### 2.1 Formula (Strict Mode - Default)

The SII uses a **density-based model** with a **logarithmic floor** to prevent scores from collapsing too quickly for large codebases.

**Step 1: Count Weighted Violations**
```
WeightedViolations = (GodClassMonoliths × 5) + (N1Queries × 2) + (LayerViolations × 10)
```

**Step 2: Calculate Violation Density**
```
ViolationDensity = WeightedViolations / TotalProductionFiles
```

**Step 3: Calculate Base Score**
```
BaseScore = 100 - (ViolationDensity × 100)
```

**Step 4: Apply Logarithmic Floor**
```
If ViolationDensity ≤ 1:
    LogarithmicFloor = 40 + (60 × e^(-ViolationDensity × 2))
    Score = max(BaseScore, LogarithmicFloor)

If ViolationDensity > 1:
    LogarithmicFloor = 40 + (10 × e^(-(ViolationDensity - 1) × 0.5))
    DecayScore = 100 - (sqrt(ViolationDensity) × 50)
    Score = max(LogarithmicFloor, DecayScore)
```

**Step 5: Clamp Result**
```
FinalSII = clamp(Score, 0, 100)  // Rounded to 1 decimal place
```

### 2.2 Interpretation

**SII Score Ranges:**
- **95-100% (A+):** Very low violation density (<0.05 violations per file on average)
- **90-94% (A):** Low violation density (0.05-0.10 violations per file)
- **85-89% (B+):** Moderate violation density (0.10-0.15 violations per file)
- **80-84% (B):** Higher violation density (0.15-0.20 violations per file)
- **75-79% (C+):** Significant violation density (0.20-0.25 violations per file)
- **70-74% (C):** High violation density (0.25-0.30 violations per file)
- **<70% (D/F):** Very high violation density (>0.30 violations per file)

**Important Notes:**
- **Weighted Debt vs Production Files:** Weighted debt is measured in "points" (not files), so it can exceed the number of production files. For example, 100 files with 1 layer violation each = 1,000 weighted debt points.
- **Density-Based:** The score normalizes by file count, so larger codebases aren't penalized just for size.
- **Logarithmic Floor:** Prevents scores from going below ~40% even for extremely problematic codebases, acknowledging that some structure exists.

### 2.3 Edge Cases and Validation

**Known Issues:**
1. **Directus Case:** If weighted debt exceeds production files significantly, it indicates either:
   - Very high violation density (many violations per file)
   - Calculation error (should be investigated)
   - Misclassification of production vs non-production code

2. **Zero Production Files:** If no production files are detected, SII is undefined. The tool should report this as an error.

3. **Very Small Codebases:** Codebases with <10 production files may have volatile scores due to small sample size.

**Validation Rules:**
- Weighted debt should be: `0 ≤ weightedDebt ≤ (productionFiles × maxWeight)`
  - Where `maxWeight = 10` (layer violations)
  - In practice, weighted debt can exceed this if multiple violations per file exist
- SII should always be: `0 ≤ SII ≤ 100`
- If violation density > 10, investigate for calculation errors

---

## 3. Categorization System

### 3.1 League Categories

Repositories are categorized into three leagues:

**🏛️ The Heavyweights (Apps & Frameworks > 1,000 total files)**
- Large-scale applications and frameworks
- Must have >1,000 total files (not just production files)
- Excludes "Wrapper Only" projects
- **Exception:** Prettier (5,372 files) is moved to Foundations due to being a CLI tool with only 468 production files

**🧱 The Foundations (Libraries & Tools ≤ 1,000 total files OR special cases)**
- Core libraries, utilities, and tools
- Must have ≤1,000 total files OR be explicitly categorized as a tool (e.g., Prettier)
- Excludes "Wrapper Only" projects

**🔧 The Wrappers (System Tools - TS/JS Glue Code Only)**
- Projects tagged as "Wrapper Only"
- Multi-language projects where core logic is in Go/Rust, and only TypeScript/JavaScript wrapper code is analyzed

### 3.2 Known Categorization Issues

**Prettier Exception:**
- **Total Files:** 5,372
- **Production Files:** 468
- **Category:** Foundations (despite >1,000 files)
- **Rationale:** CLI tool with large test/documentation suite, but small production codebase
- **Header Issue:** The Foundations header says "≤ 1,000 files" but should note exceptions or use production file count

**Recommendation:** Update categorization to either:
1. Use production file count instead of total file count
2. Add explicit exceptions list with rationale
3. Change header to reflect actual criteria

---

## 4. Limitations and Caveats

### 4.1 Methodology Limitations

1. **Static Analysis Only:** Cannot detect runtime patterns, caching, or dynamic batching
2. **Convention-Based:** Requires projects to follow standard directory structures
3. **Language Bias:** Works best for TypeScript/JavaScript; other languages have limited support
4. **False Positives:** Especially high for N+1 Query detection
5. **No Context:** Cannot distinguish between "bad" violations and intentional architectural decisions
6. **Production Code Filter:** May miss code in non-standard directories

### 4.2 Score Interpretation Limitations

1. **Comparative, Not Absolute:** Scores are meaningful when comparing projects analyzed with the same tool, not as absolute quality measures
2. **Size Bias:** Very small codebases may have volatile scores
3. **Architecture Agnostic:** Does not account for different architectural patterns (microservices, monoliths, etc.)
4. **No Business Context:** Cannot assess whether violations impact actual business goals

### 4.3 Data Quality Limitations

1. **No Independent Verification:** Results have not been validated by external parties
2. **Single Snapshot:** Analysis represents codebase state at a single point in time
3. **No Historical Context:** Cannot assess whether violations are improving or worsening
4. **Limited Transparency:** Raw violation data not always published with reports

---

## 5. Reproducibility

### 5.1 Running the Analysis

**Prerequisites:**
- Node.js 16.x or higher
- TypeScript 4.9.4 or higher
- VS Code (for extension) OR Node.js scripts (for batch analysis)

**Steps:**
1. Clone repository: `git clone <repo-url>`
2. Install dependencies: `npm install`
3. Compile TypeScript: `npm run compile`
4. Run analysis:
   - **VS Code Extension:** Open workspace, run "ArchDrift: Generate Workspace Report"
   - **Batch Script:** Use scripts in `/scripts/` directory

**Configuration:**
- Production code filter: Hardcoded in `src/analyzer.ts` (lines 1170-1194)
- Layer patterns: Hardcoded in `src/analyzer.ts` (layer detection logic)
- SII formula: Implemented in `src/analyzer.ts` (lines 1168-1346)

### 5.2 Reproducing Specific Results

To reproduce results for a specific repository:
1. Ensure repository is cloned to `audit_targets/batch_X/<repo-name>/`
2. Run appropriate batch analysis script
3. Results will be generated in `results/batch_X/<repo-name>/`

**Note:** As of v0.1.0, `audit_targets/` directory has been removed from the published package. Test results are preserved in `test-results-backup/` for reference.

---

## 6. Validation and Quality Assurance

### 6.1 Internal Validation

**Checks Performed:**
- SII scores clamped to 0-100 range
- Production file count validation
- Weighted debt calculation verification
- Edge case handling (zero files, zero violations, etc.)

**Known Issues:**
- Categorization inconsistencies (Prettier case)
- Potential SII calculation edge cases (very high violation density)
- No automated validation of violation detection accuracy

### 6.2 Recommendations for External Validation

1. **Manual Review:** Sample violations should be manually reviewed for accuracy
2. **Comparative Analysis:** Compare results with other static analysis tools
3. **Expert Review:** Have software architects review layer violation classifications
4. **Reproducibility Testing:** Independent parties should reproduce results
5. **False Positive Analysis:** Review N+1 Query detections for actual performance issues

---

## 7. Future Improvements

### 7.1 Methodology Enhancements

1. **Configurable Layer Patterns:** Allow projects to define custom layer structures
2. **Improved N+1 Detection:** Better handling of DataLoader patterns and caching
3. **Context-Aware Analysis:** Distinguish between intentional and problematic violations
4. **Multi-Language Support:** Full AST parsing for Python, Java, Go
5. **Historical Tracking:** Track violation trends over time

### 7.2 Transparency Improvements

1. **Raw Data Export:** Publish complete violation lists with file paths and line numbers
2. **Interactive Reports:** Allow users to drill down into specific violations
3. **Methodology Configuration:** Document all configurable parameters
4. **Validation Reports:** Include false positive/negative analysis

---

## 8. References and Further Reading

### 8.1 Anti-Pattern Literature

- **God Classes:** Martin, R. C. (2003). "Agile Software Development: Principles, Patterns, and Practices"
- **N+1 Query Problem:** Fowler, M. (2002). "Patterns of Enterprise Application Architecture"
- **Layer Violations:** Evans, E. (2003). "Domain-Driven Design: Tackling Complexity in the Heart of Software"

### 8.2 Architectural Drift

- vFunction/Intellyx: "Architectural Drift: The Silent Productivity Killer"
- Various software engineering literature on technical debt and code smells

### 8.3 Tool Documentation

- ArchDrift Source Code: `src/analyzer.ts`
- Scoring Logic Rules: `.cursor/rules/scoring-logic.mdc`
- Extension Implementation: `src/extension.ts`

---

## Appendix A: Formula Derivation

### A.1 Why Density-Based Scoring?

Traditional approaches normalize by lines of code, but this penalizes large codebases. Density-based scoring (violations per file) treats all files equally, regardless of size.

### A.2 Why Logarithmic Floor?

Without a floor, a single violation in a small codebase could drop the score to near zero. The logarithmic floor ensures that:
- Small codebases aren't overly penalized
- Very problematic codebases still maintain some structure (≥40%)
- The floor decays gracefully as violation density increases

### A.3 Weight Selection Rationale

- **Layer Violations (10 points):** Highest weight because they represent fundamental architectural breakdown
- **God Class Monoliths (5 points):** High weight due to maintenance burden
- **N+1 Queries (2 points):** Lower weight due to high false positive rate and potential for legitimate patterns

---

## Appendix B: Example Calculations

### Example 1: Small Clean Codebase
- **Production Files:** 50
- **God Class Monoliths:** 0
- **N+1 Queries:** 2
- **Layer Violations:** 0

**Calculation:**
- WeightedViolations = (0 × 5) + (2 × 2) + (0 × 10) = 4
- ViolationDensity = 4 / 50 = 0.08
- BaseScore = 100 - (0.08 × 100) = 92
- LogarithmicFloor = 40 + (60 × e^(-0.08 × 2)) = 40 + (60 × 0.852) = 91.1
- FinalSII = max(92, 91.1) = **92.0%**

### Example 2: Large Codebase with Violations
- **Production Files:** 1,000
- **God Class Monoliths:** 10
- **N+1 Queries:** 50
- **Layer Violations:** 5

**Calculation:**
- WeightedViolations = (10 × 5) + (50 × 2) + (5 × 10) = 50 + 100 + 50 = 200
- ViolationDensity = 200 / 1,000 = 0.20
- BaseScore = 100 - (0.20 × 100) = 80
- LogarithmicFloor = 40 + (60 × e^(-0.20 × 2)) = 40 + (60 × 0.670) = 80.2
- FinalSII = max(80, 80.2) = **80.2%**

### Example 3: High Violation Density (Directus-like)
- **Production Files:** 500
- **God Class Monoliths:** 5
- **N+1 Queries:** 21
- **Layer Violations:** 309

**Calculation:**
- WeightedViolations = (5 × 5) + (21 × 2) + (309 × 10) = 25 + 42 + 3,090 = 3,157
- ViolationDensity = 3,157 / 500 = 6.314
- BaseScore = 100 - (6.314 × 100) = -531.4 (negative, will be clamped)
- LogarithmicFloor = 40 + (10 × e^(-(6.314 - 1) × 0.5)) = 40 + (10 × 0.044) = 40.44
- DecayScore = 100 - (sqrt(6.314) × 50) = 100 - (2.513 × 50) = 100 - 125.65 = -25.65
- FinalSII = max(40.44, -25.65) = **40.4%** (clamped, but shows the issue)

**Note:** This example shows why the critique noted issues - with 309 layer violations in 500 files, the violation density is extremely high (6.3 violations per file on average), leading to a low score. The weighted debt (3,157) exceeds production files (500) because each layer violation counts as 10 points.

---

**End of Methodology Document**

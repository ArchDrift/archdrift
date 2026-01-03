# ArchDrift - Architectural Intelligence Roadmap

**Vision**: Transform architectural drift detection from reactive monitoring to proactive prevention, enabling teams to maintain clean architecture at scale.

---

## Phase 1: Weighted Drift Analysis (Now)

**Status**: ✅ Complete

### Domain-Aware Drift Scoring
- **Implementation**: Project domains (FRAMEWORK, UTILITY, DATABASE, APPLICATION) with tailored violation weights
- **Impact**: Lodash dropped from 38.5% (Critical) to 13.8% (Eroding) by recognizing utility libraries have different complexity tolerances
- **Result**: More accurate drift assessment across 43+ open-source repositories

### Expert Remediation
- **Feature**: Automated remediation messages based on top violation type
- **Coverage**: 39 out of 43 repos receive specific, actionable remediation guidance
- **Examples**:
  - Layer Violations: "Refactor imports to respect layer boundaries—move shared logic to appropriate layers"
  - God Classes: "Split large files into focused modules—extract related functionality into separate files"
  - N+1 Queries: "Batch database queries outside loops—use Promise.all() or bulk operations to reduce round trips"

### Public Benchmarking
- **Dataset**: `LANDSCAPE_MOAT.json` with 43 repositories analyzed
- **Insights**: Storybook (0.1% drift) vs Directus (61.5% drift) demonstrates architectural discipline impact
- **Transparency**: Open-source drift scores enable community learning and comparison

---

## Phase 2: CI/CD Gatekeeping & Relative Baselines (Q1 2026)

### GitHub Action 'Gatekeeper'
- **Functionality**: Auto-block Pull Requests when drift increases beyond threshold
- **Configuration**: Configurable thresholds per domain (e.g., UTILITY: 5%, FRAMEWORK: 2%)
- **Integration**: Seamless CI/CD integration with detailed PR comments showing drift changes
- **Workflow**: 
  ```
  PR opened → Calculate base vs head drift → Compare → 
  If drift increase > threshold → Block merge with remediation guide
  ```

### Contextual Domain Baselines
- **Goal**: Relative drift scoring within domain categories
- **Approach**: Compare repository drift against domain-specific baselines (e.g., "Your utility library is 2x more complex than average")
- **Value**: Context-aware feedback that accounts for project type and industry standards
- **Implementation**: Statistical analysis of drift distribution within each domain category

### Circular Dependency Detection
- **Feature**: Identify circular import chains that create architectural deadlocks
- **Detection**: Graph-based analysis of import/require statements
- **Impact**: Prevent "spaghetti architecture" before it becomes technical debt

---

## Phase 3: Automatic Refactoring Suggestions (Q2 2026)

### ML-driven Refactoring Prioritization
- **Goal**: AI-powered recommendations for which violations to fix first
- **Factors**:
  - Impact on developer velocity
  - Risk of introducing bugs
  - Effort vs benefit ratio
  - Team capacity and priorities
- **Output**: Prioritized refactoring roadmap with ROI estimates

### Team-wide Dashboards
- **Feature**: Organization-level drift visualization and trend analysis
- **Metrics**: 
  - Team velocity vs drift correlation
  - Drift hotspots by team/feature area
  - Historical drift trends (drift velocity)
- **Integration**: VS Code extension + web dashboard for non-technical stakeholders

### Automated Code Suggestions
- **Feature**: AI-generated refactoring code snippets based on violation patterns
- **Scope**: 
  - Layer violation fixes (move imports, extract shared logic)
  - God class splits (identify extraction points, suggest module boundaries)
  - N+1 query batching (suggest Promise.all patterns, bulk operations)
- **Safety**: Suggestions are opt-in, with preview and validation before application

---

## Success Metrics

### Phase 1 (Current)
- ✅ 43 repositories analyzed with domain-aware scoring
- ✅ Lodash outlier fixed (38.5% → 13.8%)
- ✅ 90% remediation message coverage

### Phase 2 (Target)
- 🎯 GitHub Action adoption by 10+ teams
- 🎯 Circular dependency detection accuracy > 95%
- 🎯 100+ repositories in public benchmark

### Phase 3 (Target)
- 🎯 1,000+ repositories tracked
- 🎯 ML model accuracy > 80% for refactoring prioritization
- 🎯 Average drift reduction of 30% for active users

---

**Last Updated**: January 2026

**Contributing**: See [README.md](README.md) for contribution guidelines.

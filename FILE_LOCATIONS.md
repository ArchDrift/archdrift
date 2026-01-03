# ArchDrift File Locations Reference

**Workspace Root:** `C:\Users\Prajeesh\Downloads\ArchiDrift Git Version`

---

## 📁 Core Source Files

### Engine & Extension
- **`src/analyzer.ts`** - Main analysis engine (God Class, N+1, Layer Violations)
- **`src/extension.ts`** - VS Code extension entry point
- **`src/reportGenerator.ts`** - Report generation logic

### Tests
- **`src/test/`** - Test suite
  - `analyzer.test.ts`
  - `layer-debug.test.ts`
  - `windows-edge-cases.test.ts`
  - `runTests.ts`

### Compiled Output
- **`out/`** - Compiled JavaScript (from TypeScript)
  - `analyzer.js` + `.map`
  - `extension.js` + `.map`
  - `reportGenerator.js` + `.map`
  - `test/` - Compiled tests

---

## 📁 Configuration Files

### Root Level
- **`package.json`** - Extension manifest (v0.1.0, publisher: archdrift)
- **`tsconfig.json`** - TypeScript configuration
- **`README.md`** - User documentation
- **`LICENSE`** - MIT License
- **`.vscodeignore`** - Files excluded from VSIX package
- **`.gitignore`** - Git ignore rules

---

## 📁 Documentation

### Project Narrative
- **`ROADMAP.md`** - Complete project journey (23.5 KB)
- **`ai-feed.json`** - Structured data for AI continuation (11.3 KB)
- **`METHODOLOGY.md`** - Technical methodology specification (475 lines)
- **`FILE_LOCATIONS.md`** - This file

### Chat History
- **`all-cursor-chats/`** - Recovered chat history (383 files)
  - `INDEX.md` - Index of all chats
  - `SEARCH_RESULTS.md` - Keyword search results
  - `README.md` - Chat recovery documentation
  - `*.md` - Individual chat files

### Analysis Reports
- **`CHAT_TIMELINE_ANALYSIS.md`** - Timeline analysis of chat files

---

## 📁 Scripts Directory (`scripts/`)

### Batch Analysis
- **`batch_analyze.js`** - Batch 1 analysis (legacy)
- **`batch_analyze.ts`** - Batch 1 analysis (TypeScript)
- **`batch_analyze_standalone.js`** - Standalone batch analysis
- **`batch_analyze_2_3.js`** - Batches 2 & 3 analysis
- **`batch_analyze_final_push.js`** - Batch 4 (final_push) analysis
- **`analyze_all_batches.js`** - Combined batch analysis

### Leaderboard Generation
- **`generate_final_leaderboard.js`** - Old leaderboard (ranks, grades)
- **`generate_structural_landscape.js`** - New landscape (signal-first)

### Validation & Verification
- **`verify_repo_integrity.js`** - Repository integrity checks
- **`verify_directus_violations.js`** - Directus-specific validation
- **`final_integrity_report.js`** - Final integrity report
- **`analyze_missing.js`** - Analyze missing repos

### Repo Management
- **`clone_batch_1.ps1`** / **`.sh`** - Clone batch 1 repos
- **`clone_batch_2.ps1`** - Clone batch 2 repos
- **`clone_batch_3.ps1`** - Clone batch 3 repos
- **`clone_final_push.ps1`** - Clone final_push repos
- **`check_clone_status.ps1`** - Check clone status
- **`run_complete_audit.ps1`** - Run complete audit

### Specialized Analysis
- **`reanalyze_ghost.js`** - Re-analyze Ghost repo
- **`rerun_zod_express.js`** - Re-run zod/express analysis
- **`check_express_files.js`** - Check Express files

### Recovery Tools
- **`recover_chat_history.js`** - Recover Cursor chat history
- **`search_recovered_chats.js`** - Search recovered chats
- **`analyze_chat_timeline.js`** - Analyze chat timeline

---

## 📁 Test Results (`test-results-backup/`)

### Main Results
- **`results/batch_1/`** - Batch 1 results (10 repos)
  - `LEADERBOARD.md`
  - `[repo-name]/SUMMARY.md`
  - `[repo-name]/FULL_DETAILS.md`
- **`results/batch_2/`** - Batch 2 results (11 repos)
- **`results/batch_3/`** - Batch 3 results (19 repos)
- **`results/final_push/`** - Batch 4 results (10 repos)

### Documentation
- **`FINAL_LEADERBOARD.md`** - Final combined leaderboard
- **`WORKSPACE_INDEX.md`** - Workspace index
- **`CRITICAL_FIXES_PHASE1.md`** - Critical fixes documentation
- **`PHASE1_HARDENING.md`** - Phase 1 hardening notes

**Note:** Source repos (`audit_targets/`) were moved/deleted. Only results preserved.

---

## 📁 Special Directories

### Chat History
- **`all-cursor-chats/`** - 383 recovered chat files
  - Organized by workspace hash
  - Searchable via `SEARCH_RESULTS.md`
  - Indexed in `INDEX.md`

### VS Code Configuration
- **`.vscode/`** - VS Code workspace settings
- **`.driftguard/`** - DriftGuard configuration (if exists)

---

## 📁 Generated Files

### Reports (Generated)
- **`.driftguard/audits/SUMMARY.md`** - Current workspace summary
- **`.driftguard/audits/FULL_DETAILS.md`** - Current workspace details

### Build Artifacts
- **`out/`** - Compiled JavaScript
- **`node_modules/`** - Dependencies (should be excluded from VSIX)

---

## 🔍 Quick Reference

### Most Important Files
1. **`ROADMAP.md`** - Complete project narrative
2. **`ai-feed.json`** - AI continuation data
3. **`src/analyzer.ts`** - Core engine
4. **`src/extension.ts`** - Extension entry
5. **`METHODOLOGY.md`** - Technical spec

### Current Working Files
- **`scripts/analyze_all_batches.js`** - Currently open
- **`scripts/generate_structural_landscape.js`** - New leaderboard generator

### Backup Locations
- **`test-results-backup/`** - All test results
- **`all-cursor-chats/`** - All chat history

---

## 📊 File Counts

- **Source Files:** 3 core + 6 tests = 9 TypeScript files
- **Scripts:** 25+ analysis/utility scripts
- **Test Results:** 104 markdown files (52 repos × 2 files each)
- **Chat History:** 383 recovered chat files
- **Documentation:** 5+ markdown files

---

## 🚨 Missing Files (Deleted/Moved)

- **`audit_targets/`** - Test repository clones (moved to new drive)
- **`node_modules/`** - Should be excluded from VSIX
- **`.git/`** - Removed for fresh publish

---

## 📝 File Naming Conventions

### Test Results
- `results/batch_X/[repo-name]/SUMMARY.md`
- `results/batch_X/[repo-name]/FULL_DETAILS.md`

### Chat Files
- `[workspace-hash]_[chat-title]_[timestamp].md`

### Scripts
- `batch_analyze*.js` - Batch analysis scripts
- `generate_*.js` - Report generation
- `verify_*.js` - Validation scripts
- `clone_*.ps1` / `.sh` - Repository cloning

---

**Last Updated:** 2026-01-03

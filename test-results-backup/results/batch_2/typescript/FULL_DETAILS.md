# 📋 DriftGuard Full Details

**Generated:** 3/1/2026, 4:44:39 pm

This document contains a line-by-line breakdown of every violation detected.

---

## Weighted Debt Calculation

**Weighted Debt Density:** 0.43 debt points per 1,000 lines of production code

**Severity Multipliers:**
- Layer Violations: ×10 (Fatal structural drift)
- N+1 Queries: ×2 (Core efficiency drift)
- God Classes: ×1 (Complexity drift)

**Production Code:** 68 violations (110 weighted debt) in 2,58,489 LOC

**Total Files:** 38069 (422 production)

---

## Violations Summary

- **Layer Violations:** 0
- **N+1 Queries:** 0
- **God Classes:** 68

---

## 📦 God Class

### `../../../audit_targets/batch_2/TypeScript/src/compiler/binder.ts`

- **Line 1:** Monolith detected (3182 code lines in type/schema definition file). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/TypeScript/src/compiler/builder.ts`

- **Line 1:** Large Class detected (1961 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/TypeScript/src/compiler/checker.ts`

- **Line 1:** Monolith detected (44054 code lines in type/schema definition file). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/TypeScript/src/compiler/commandLineParser.ts`

- **Line 1:** Monolith detected (3603 code lines in type/schema definition file). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/TypeScript/src/compiler/core.ts`

- **Line 1:** Large Class detected (1626 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/TypeScript/src/compiler/debug.ts`

- **Line 1:** Large Class detected (1089 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/TypeScript/src/compiler/emitter.ts`

- **Line 1:** Monolith detected (5235 code lines in type/schema definition file). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/TypeScript/src/compiler/executeCommandLine.ts`

- **Line 1:** Large Class detected (1146 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/TypeScript/src/compiler/expressionToTypeNode.ts`

- **Line 1:** Large Class detected (1253 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/TypeScript/src/compiler/factory/emitHelpers.ts`

- **Line 1:** Large Class detected (1112 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/TypeScript/src/compiler/factory/nodeFactory.ts`

- **Line 1:** Monolith detected (6087 code lines in type/schema definition file). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/TypeScript/src/compiler/factory/nodeTests.ts`

- **Line 1:** Large Class detected (912 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/TypeScript/src/compiler/factory/utilities.ts`

- **Line 1:** Large Class detected (1249 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/TypeScript/src/compiler/moduleNameResolver.ts`

- **Line 1:** Monolith detected (2714 code lines in type/schema definition file). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/TypeScript/src/compiler/moduleSpecifiers.ts`

- **Line 1:** Large Class detected (1141 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/TypeScript/src/compiler/parser.ts`

- **Line 1:** Monolith detected (8246 code lines in type/schema definition file). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/TypeScript/src/compiler/program.ts`

- **Line 1:** Monolith detected (4217 code lines in type/schema definition file). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/TypeScript/src/compiler/resolutionCache.ts`

- **Line 1:** Large Class detected (1453 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/TypeScript/src/compiler/scanner.ts`

- **Line 1:** Monolith detected (3368 code lines in type/schema definition file). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/TypeScript/src/compiler/sys.ts`

- **Line 1:** Large Class detected (1627 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/TypeScript/src/compiler/transformers/classFields.ts`

- **Line 1:** Monolith detected (2583 code lines in type/schema definition file). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/TypeScript/src/compiler/transformers/declarations.ts`

- **Line 1:** Large Class detected (1770 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/TypeScript/src/compiler/transformers/es2015.ts`

- **Line 1:** Monolith detected (3382 code lines in type/schema definition file). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/TypeScript/src/compiler/transformers/es2017.ts`

- **Line 1:** Large Class detected (950 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/TypeScript/src/compiler/transformers/es2018.ts`

- **Line 1:** Large Class detected (1265 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/TypeScript/src/compiler/transformers/esDecorators.ts`

- **Line 1:** Large Class detected (1883 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/TypeScript/src/compiler/transformers/generators.ts`

- **Line 1:** Large Class detected (2089 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/TypeScript/src/compiler/transformers/jsx.ts`

- **Line 1:** Large Class detected (803 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/TypeScript/src/compiler/transformers/module/module.ts`

- **Line 1:** Large Class detected (1857 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/TypeScript/src/compiler/transformers/module/system.ts`

- **Line 1:** Large Class detected (1331 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/TypeScript/src/compiler/transformers/ts.ts`

- **Line 1:** Large Class detected (1874 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/TypeScript/src/compiler/tsbuildPublic.ts`

- **Line 1:** Large Class detected (2119 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/TypeScript/src/compiler/types.ts`

- **Line 1:** Monolith detected (7309 code lines in type/schema definition file). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/TypeScript/src/compiler/utilities.ts`

- **Line 1:** Monolith detected (9259 code lines in type/schema definition file). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/TypeScript/src/compiler/utilitiesPublic.ts`

- **Line 1:** Large Class detected (1951 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/TypeScript/src/compiler/visitorPublic.ts`

- **Line 1:** Large Class detected (1474 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/TypeScript/src/compiler/watch.ts`

- **Line 1:** Large Class detected (830 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/TypeScript/src/compiler/watchPublic.ts`

- **Line 1:** Large Class detected (979 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/TypeScript/src/harness/client.ts`

- **Line 1:** Large Class detected (919 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/TypeScript/src/harness/fourslashImpl.ts`

- **Line 1:** Monolith detected (4450 code lines in type/schema definition file). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/TypeScript/src/harness/fourslashInterfaceImpl.ts`

- **Line 1:** Large Class detected (1731 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/TypeScript/src/harness/harnessIO.ts`

- **Line 1:** Large Class detected (1322 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/TypeScript/src/harness/vfsUtil.ts`

- **Line 1:** Large Class detected (1222 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/TypeScript/src/lib/dom.generated.d.ts`

- **Line 1:** Monolith detected (16255 code lines in type/schema definition file). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/TypeScript/src/lib/es5.d.ts`

- **Line 1:** Large Class detected (1105 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/TypeScript/src/lib/webworker.generated.d.ts`

- **Line 1:** Monolith detected (6318 code lines in type/schema definition file). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/TypeScript/src/server/editorServices.ts`

- **Line 1:** Monolith detected (4403 code lines in type/schema definition file). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/TypeScript/src/server/project.ts`

- **Line 1:** Monolith detected (2501 code lines in type/schema definition file). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/TypeScript/src/server/protocol.ts`

- **Line 1:** Large Class detected (1478 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/TypeScript/src/server/session.ts`

- **Line 1:** Monolith detected (3503 code lines in type/schema definition file). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/TypeScript/src/services/classifier.ts`

- **Line 1:** Large Class detected (855 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/TypeScript/src/services/codefixes/fixMissingTypeAnnotationOnExports.ts`

- **Line 1:** Large Class detected (1047 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/TypeScript/src/services/codefixes/helpers.ts`

- **Line 1:** Large Class detected (828 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/TypeScript/src/services/codefixes/importFixes.ts`

- **Line 1:** Large Class detected (1842 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/TypeScript/src/services/codefixes/inferFromUsage.ts`

- **Line 1:** Large Class detected (1081 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/TypeScript/src/services/completions.ts`

- **Line 1:** Monolith detected (5037 code lines in type/schema definition file). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/TypeScript/src/services/findAllReferences.ts`

- **Line 1:** Large Class detected (2177 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/TypeScript/src/services/formatting/formatting.ts`

- **Line 1:** Large Class detected (1095 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/TypeScript/src/services/inlayHints.ts`

- **Line 1:** Large Class detected (894 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/TypeScript/src/services/navigationBar.ts`

- **Line 1:** Large Class detected (918 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/TypeScript/src/services/refactors/extractSymbol.ts`

- **Line 1:** Large Class detected (1770 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/TypeScript/src/services/refactors/moveToFile.ts`

- **Line 1:** Large Class detected (1004 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/TypeScript/src/services/services.ts`

- **Line 1:** Monolith detected (2830 code lines in type/schema definition file). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/TypeScript/src/services/stringCompletions.ts`

- **Line 1:** Large Class detected (1105 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/TypeScript/src/services/symbolDisplay.ts`

- **Line 1:** Large Class detected (947 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/TypeScript/src/services/textChanges.ts`

- **Line 1:** Large Class detected (1471 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/TypeScript/src/services/types.ts`

- **Line 1:** Large Class detected (1164 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/TypeScript/src/services/utilities.ts`

- **Line 1:** Monolith detected (3293 code lines in type/schema definition file). Critical complexity - urgent refactoring required.

---

Generated by DriftGuard v0.4

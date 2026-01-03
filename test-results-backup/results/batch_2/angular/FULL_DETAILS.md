# 📋 DriftGuard Full Details

**Generated:** 3/1/2026, 4:41:31 pm

This document contains a line-by-line breakdown of every violation detected.

---

## Weighted Debt Calculation

**Weighted Debt Density:** 0.25 debt points per 1,000 lines of production code

**Severity Multipliers:**
- Layer Violations: ×10 (Fatal structural drift)
- N+1 Queries: ×2 (Core efficiency drift)
- God Classes: ×1 (Complexity drift)

**Production Code:** 36 violations (63 weighted debt) in 2,55,652 LOC

**Total Files:** 6196 (2720 production)

---

## Violations Summary

- **Layer Violations:** 1
- **N+1 Queries:** 4
- **God Classes:** 31

---

## 📦 God Class

### `../../../audit_targets/batch_2/angular/adev/src/app/features/update/recommendations.ts`

- **Line 1:** Monolith detected (2894 code lines in type/schema definition file). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/angular/adev/src/app/routing/sub-navigation-data.ts`

- **Line 1:** Monolith detected (1609 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/angular/packages/animations/browser/src/dsl/animation_timeline_builder.ts`

- **Line 1:** Large Class detected (805 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/angular/packages/animations/browser/src/render/transition_animation_engine.ts`

- **Line 1:** Monolith detected (1510 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/angular/packages/common/http/src/client.ts`

- **Line 1:** Monolith detected (3440 code lines in type/schema definition file). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/angular/packages/common/locales/closure-locale.ts`

- **Line 1:** Large Class detected (1455 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/angular/packages/common/src/directives/ng_optimized_image/ng_optimized_image.ts`

- **Line 1:** Large Class detected (900 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/angular/packages/compiler-cli/src/ngtsc/annotations/component/src/handler.ts`

- **Line 1:** Monolith detected (2149 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/angular/packages/compiler-cli/src/ngtsc/annotations/directive/src/shared.ts`

- **Line 1:** Monolith detected (1715 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/angular/packages/compiler-cli/src/ngtsc/annotations/ng_module/src/handler.ts`

- **Line 1:** Large Class detected (1003 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/angular/packages/compiler-cli/src/ngtsc/core/src/compiler.ts`

- **Line 1:** Large Class detected (1444 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/angular/packages/compiler-cli/src/ngtsc/typecheck/src/checker.ts`

- **Line 1:** Large Class detected (1440 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/angular/packages/compiler/src/expression_parser/parser.ts`

- **Line 1:** Large Class detected (1373 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/angular/packages/compiler/src/jit_compiler_facade.ts`

- **Line 1:** Large Class detected (897 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/angular/packages/compiler/src/ml_parser/entities.ts`

- **Line 1:** Monolith detected (2129 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/angular/packages/compiler/src/ml_parser/lexer.ts`

- **Line 1:** Large Class detected (1373 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/angular/packages/compiler/src/ml_parser/parser.ts`

- **Line 1:** Large Class detected (829 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/angular/packages/compiler/src/output/output_ast.ts`

- **Line 1:** Large Class detected (1658 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/angular/packages/compiler/src/render3/r3_template_transform.ts`

- **Line 1:** Large Class detected (1056 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/angular/packages/compiler/src/render3/view/t2_binder.ts`

- **Line 1:** Large Class detected (893 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/angular/packages/compiler/src/template/pipeline/ir/src/expression.ts`

- **Line 1:** Large Class detected (1058 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/angular/packages/compiler/src/template/pipeline/ir/src/ops/create.ts`

- **Line 1:** Large Class detected (1054 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/angular/packages/compiler/src/template/pipeline/src/ingest.ts`

- **Line 1:** Monolith detected (1536 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/angular/packages/compiler/src/template/pipeline/src/instruction.ts`

- **Line 1:** Large Class detected (1007 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/angular/packages/core/schematics/migrations/bootstrap-options-migration/migration.ts`

- **Line 1:** Large Class detected (834 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/angular/packages/language-service/src/completions.ts`

- **Line 1:** Large Class detected (1274 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/angular/packages/language-service/src/language_service.ts`

- **Line 1:** Large Class detected (818 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/angular/packages/service-worker/worker/src/driver.ts`

- **Line 1:** Large Class detected (847 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/angular/packages/zone.js/lib/zone-impl.ts`

- **Line 1:** Large Class detected (965 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/angular/packages/zone.js/lib/zone-spec/fake-async-test.ts`

- **Line 1:** Large Class detected (880 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/angular/vscode-ng-language-service/server/src/session.ts`

- **Line 1:** Large Class detected (1282 code lines). Consider splitting into smaller modules.

## ⚡ N+1 Query

### `../../../audit_targets/batch_2/angular/packages/common/http/src/xhr.ts`

- **Line 93:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_2/angular/packages/service-worker/worker/src/driver.ts`

- **Line 468:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 952:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1157:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

## 🚫 Layer Violation

### `../../../audit_targets/batch_2/angular/packages/compiler-cli/src/ngtsc/core/src/compiler.ts`

- **Line 120:** domain module importing from api ("import {TemplateSemanticsChecker} from '../../typecheck/template_semantics/api/api';"). According to DriftGuard's default rules, domain must not depend on api.

---

Generated by DriftGuard v0.4

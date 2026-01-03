# 📋 DriftGuard Full Details

**Generated:** 3/1/2026, 4:42:12 pm

This document contains a line-by-line breakdown of every violation detected.

---

## Weighted Debt Calculation

**Weighted Debt Density:** 0.43 debt points per 1,000 lines of production code

**Severity Multipliers:**
- Layer Violations: ×10 (Fatal structural drift)
- N+1 Queries: ×2 (Core efficiency drift)
- God Classes: ×1 (Complexity drift)

**Production Code:** 32 violations (113 weighted debt) in 2,61,361 LOC

**Total Files:** 3668 (2993 production)

---

## Violations Summary

- **Layer Violations:** 0
- **N+1 Queries:** 9
- **God Classes:** 23

---

## 📦 God Class

### `../../../audit_targets/batch_3/plane/apps/web/core/constants/plans.tsx`

- **Line 1:** Large Class detected (1224 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/plane/apps/web/core/store/issue/helpers/base-issues.store.ts`

- **Line 1:** Large Class detected (1244 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/plane/packages/i18n/src/locales/cs/translations.ts`

- **Line 1:** Monolith detected (2616 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/plane/packages/i18n/src/locales/de/translations.ts`

- **Line 1:** Monolith detected (2644 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/plane/packages/i18n/src/locales/en/translations.ts`

- **Line 1:** Monolith detected (2713 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/plane/packages/i18n/src/locales/es/translations.ts`

- **Line 1:** Monolith detected (2675 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/plane/packages/i18n/src/locales/fr/translations.ts`

- **Line 1:** Monolith detected (2670 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/plane/packages/i18n/src/locales/id/translations.ts`

- **Line 1:** Monolith detected (2652 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/plane/packages/i18n/src/locales/it/translations.ts`

- **Line 1:** Monolith detected (2660 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/plane/packages/i18n/src/locales/ja/translations.ts`

- **Line 1:** Monolith detected (2641 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/plane/packages/i18n/src/locales/ko/translations.ts`

- **Line 1:** Monolith detected (2627 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/plane/packages/i18n/src/locales/pl/translations.ts`

- **Line 1:** Monolith detected (2618 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/plane/packages/i18n/src/locales/pt-BR/translations.ts`

- **Line 1:** Monolith detected (2664 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/plane/packages/i18n/src/locales/ro/translations.ts`

- **Line 1:** Monolith detected (2656 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/plane/packages/i18n/src/locales/ru/translations.ts`

- **Line 1:** Monolith detected (2633 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/plane/packages/i18n/src/locales/sk/translations.ts`

- **Line 1:** Monolith detected (2617 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/plane/packages/i18n/src/locales/tr-TR/translations.ts`

- **Line 1:** Monolith detected (2628 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/plane/packages/i18n/src/locales/ua/translations.ts`

- **Line 1:** Monolith detected (2623 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/plane/packages/i18n/src/locales/vi-VN/translations.ts`

- **Line 1:** Monolith detected (2650 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/plane/packages/i18n/src/locales/zh-CN/translations.ts`

- **Line 1:** Monolith detected (2583 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/plane/packages/i18n/src/locales/zh-TW/translations.ts`

- **Line 1:** Monolith detected (2604 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/plane/packages/ui/src/constants/icons.ts`

- **Line 1:** Large Class detected (920 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/plane/packages/utils/src/tlds.ts`

- **Line 1:** Large Class detected (1441 code lines). Consider splitting into smaller modules.

## ⚡ N+1 Query

### `../../../audit_targets/batch_3/plane/apps/web/core/components/issues/issue-detail/reactions/issue-comment.tsx`

- **Line 73:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/plane/apps/web/core/components/issues/issue-detail/reactions/issue.tsx`

- **Line 78:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/plane/apps/web/core/services/module.service.ts`

- **Line 128:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 147:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/plane/packages/propel/src/scrollarea/scrollarea.stories.tsx`

- **Line 226:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/plane/packages/services/src/module/module.service.ts`

- **Line 122:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 141:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/plane/packages/services/src/module/operations.service.ts`

- **Line 73:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 100:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

---

Generated by DriftGuard v0.4

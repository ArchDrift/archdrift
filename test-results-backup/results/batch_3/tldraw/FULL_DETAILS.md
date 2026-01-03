# 📋 DriftGuard Full Details

**Generated:** 3/1/2026, 4:43:23 pm

This document contains a line-by-line breakdown of every violation detected.

---

## Weighted Debt Calculation

**Weighted Debt Density:** 0.34 debt points per 1,000 lines of production code

**Severity Multipliers:**
- Layer Violations: ×10 (Fatal structural drift)
- N+1 Queries: ×2 (Core efficiency drift)
- God Classes: ×1 (Complexity drift)

**Production Code:** 30 violations (49 weighted debt) in 1,44,412 LOC

**Total Files:** 2423 (1408 production)

---

## Violations Summary

- **Layer Violations:** 0
- **N+1 Queries:** 17
- **God Classes:** 13

---

## 📦 God Class

### `../../../audit_targets/batch_3/tldraw/apps/dotcom/client/src/pages/admin.tsx`

- **Line 1:** Large Class detected (1324 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/tldraw/apps/dotcom/client/src/tla/app/TldrawApp.ts`

- **Line 1:** Large Class detected (946 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/tldraw/apps/dotcom/sync-worker/src/TLDrawDurableObject.ts`

- **Line 1:** Large Class detected (1098 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/tldraw/packages/dotcom-shared/src/mutators.ts`

- **Line 1:** Large Class detected (815 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/tldraw/packages/editor/src/lib/editor/Editor.ts`

- **Line 1:** Monolith detected (6307 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/tldraw/packages/editor/src/lib/editor/managers/SnapManager/BoundsSnaps.ts`

- **Line 1:** Large Class detected (965 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/tldraw/packages/sync-core/src/lib/TLSyncRoom.ts`

- **Line 1:** Large Class detected (814 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/tldraw/packages/tldraw/src/lib/shapes/arrow/ArrowShapeUtil.tsx`

- **Line 1:** Large Class detected (1069 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/tldraw/packages/tldraw/src/lib/shapes/shared/PathBuilder.tsx`

- **Line 1:** Large Class detected (904 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/tldraw/packages/tldraw/src/lib/ui/context/actions.tsx`

- **Line 1:** Monolith detected (1681 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/tldraw/packages/tldraw/src/lib/utils/tldr/buildFromV1Document.ts`

- **Line 1:** Large Class detected (990 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/tldraw/packages/validate/src/lib/validation.ts`

- **Line 1:** Large Class detected (959 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/tldraw/templates/shader/src/fluid/fluid.ts`

- **Line 1:** Monolith detected (1582 code lines). Critical complexity - urgent refactoring required.

## ⚡ N+1 Query

### `../../../audit_targets/batch_3/tldraw/apps/dotcom/sync-worker/src/TLLoggerDurableObject.ts`

- **Line 31:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/tldraw/apps/dotcom/sync-worker/src/adminRoutes.ts`

- **Line 525:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 537:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/tldraw/internal/scripts/lib/publishing.ts`

- **Line 197:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/tldraw/packages/dotcom-shared/src/mutators.ts`

- **Line 815:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 821:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/tldraw/packages/editor/src/lib/editor/Editor.ts`

- **Line 9149:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/tldraw/packages/editor/src/lib/utils/sync/LocalIndexedDb.ts`

- **Line 48:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 72:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 220:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 288:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 311:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/tldraw/packages/editor/src/lib/utils/sync/TLLocalSyncClient.ts`

- **Line 361:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/tldraw/packages/editor/src/lib/utils/sync/hardReset.ts`

- **Line 12:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/tldraw/packages/tldraw/src/lib/utils/tldr/file.ts`

- **Line 200:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 339:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/tldraw/templates/chat/src/utils/uploadMessageContents.ts`

- **Line 45:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

---

Generated by DriftGuard v0.4

# 📋 DriftGuard Full Details

**Generated:** 3/1/2026, 4:40:35 pm

This document contains a line-by-line breakdown of every violation detected.

---

## Weighted Debt Calculation

**Weighted Debt Density:** 0.41 debt points per 1,000 lines of production code

**Severity Multipliers:**
- Layer Violations: ×10 (Fatal structural drift)
- N+1 Queries: ×2 (Core efficiency drift)
- God Classes: ×1 (Complexity drift)

**Production Code:** 51 violations (104 weighted debt) in 2,53,532 LOC

**Total Files:** 4413 (1659 production)

---

## Violations Summary

- **Layer Violations:** 0
- **N+1 Queries:** 2
- **God Classes:** 49

---

## 📦 God Class

### `../../../audit_targets/batch_2/react/compiler/packages/babel-plugin-react-compiler/scripts/eslint-plugin-react-hooks-test-cases.js`

- **Line 1:** Large Class detected (835 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/react/compiler/packages/babel-plugin-react-compiler/src/CompilerError.ts`

- **Line 1:** Large Class detected (860 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/react/compiler/packages/babel-plugin-react-compiler/src/Entrypoint/Program.ts`

- **Line 1:** Large Class detected (1176 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/react/compiler/packages/babel-plugin-react-compiler/src/Flood/Types.ts`

- **Line 1:** Large Class detected (903 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/react/compiler/packages/babel-plugin-react-compiler/src/HIR/BuildHIR.ts`

- **Line 1:** Monolith detected (4103 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/react/compiler/packages/babel-plugin-react-compiler/src/HIR/Globals.ts`

- **Line 1:** Large Class detected (1069 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/react/compiler/packages/babel-plugin-react-compiler/src/HIR/HIR.ts`

- **Line 1:** Large Class detected (1493 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/react/compiler/packages/babel-plugin-react-compiler/src/HIR/ObjectShape.ts`

- **Line 1:** Large Class detected (1251 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/react/compiler/packages/babel-plugin-react-compiler/src/HIR/PrintHIR.ts`

- **Line 1:** Large Class detected (1008 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/react/compiler/packages/babel-plugin-react-compiler/src/HIR/visitors.ts`

- **Line 1:** Large Class detected (1266 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/react/compiler/packages/babel-plugin-react-compiler/src/Inference/InferMutationAliasingEffects.ts`

- **Line 1:** Monolith detected (2620 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/react/compiler/packages/babel-plugin-react-compiler/src/ReactiveScopes/BuildReactiveFunction.ts`

- **Line 1:** Large Class detected (1448 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/react/compiler/packages/babel-plugin-react-compiler/src/ReactiveScopes/CodegenReactiveFunction.ts`

- **Line 1:** Monolith detected (2768 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/react/compiler/packages/babel-plugin-react-compiler/src/ReactiveScopes/PruneNonEscapingScopes.ts`

- **Line 1:** Large Class detected (856 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/react/compiler/packages/babel-plugin-react-compiler/src/Validation/ValidateExhaustiveDependencies.ts`

- **Line 1:** Large Class detected (961 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/react/compiler/packages/babel-plugin-react-compiler/src/Validation/ValidateNoRefAccessInRender.ts`

- **Line 1:** Large Class detected (829 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/react/fixtures/attribute-behavior/src/App.js`

- **Line 1:** Large Class detected (958 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/react/fixtures/attribute-behavior/src/attributes.js`

- **Line 1:** Monolith detected (2389 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/react/fixtures/flight/src/LargeContent.js`

- **Line 1:** Large Class detected (1114 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/react/packages/eslint-plugin-react-hooks/src/rules/ExhaustiveDeps.ts`

- **Line 1:** Monolith detected (1732 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/react/packages/react-client/src/ReactFlightClient.js`

- **Line 1:** Monolith detected (4334 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/react/packages/react-client/src/ReactFlightReplyClient.js`

- **Line 1:** Large Class detected (1106 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/react/packages/react-debug-tools/src/ReactDebugHooks.js`

- **Line 1:** Large Class detected (1131 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/react/packages/react-devtools-shared/src/backend/agent.js`

- **Line 1:** Large Class detected (1005 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/react/packages/react-devtools-shared/src/backend/fiber/renderer.js`

- **Line 1:** Monolith detected (7131 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/react/packages/react-devtools-shared/src/backend/legacy/renderer.js`

- **Line 1:** Large Class detected (1069 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/react/packages/react-devtools-shared/src/devtools/store.js`

- **Line 1:** Monolith detected (1916 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/react/packages/react-devtools-shared/src/devtools/views/Components/TreeContext.js`

- **Line 1:** Large Class detected (882 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/react/packages/react-devtools-shared/src/utils.js`

- **Line 1:** Large Class detected (1109 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/react/packages/react-devtools-timeline/src/import-worker/preprocessData.js`

- **Line 1:** Large Class detected (944 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/react/packages/react-dom-bindings/src/client/ReactDOMComponent.js`

- **Line 1:** Monolith detected (3000 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/react/packages/react-dom-bindings/src/client/ReactFiberConfigDOM.js`

- **Line 1:** Monolith detected (5270 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/react/packages/react-dom-bindings/src/events/DOMPluginEventSystem.js`

- **Line 1:** Large Class detected (815 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/react/packages/react-dom-bindings/src/server/ReactFizzConfigDOM.js`

- **Line 1:** Monolith detected (5855 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/react/packages/react-noop-renderer/src/createReactNoop.js`

- **Line 1:** Large Class detected (1318 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/react/packages/react-reconciler/src/ReactChildFiber.js`

- **Line 1:** Monolith detected (1830 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/react/packages/react-reconciler/src/ReactFiberApplyGesture.js`

- **Line 1:** Large Class detected (987 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/react/packages/react-reconciler/src/ReactFiberBeginWork.js`

- **Line 1:** Monolith detected (3338 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/react/packages/react-reconciler/src/ReactFiberClassComponent.js`

- **Line 1:** Large Class detected (1051 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/react/packages/react-reconciler/src/ReactFiberCommitEffects.js`

- **Line 1:** Large Class detected (951 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/react/packages/react-reconciler/src/ReactFiberCommitWork.js`

- **Line 1:** Monolith detected (4361 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/react/packages/react-reconciler/src/ReactFiberCompleteWork.js`

- **Line 1:** Monolith detected (1525 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/react/packages/react-reconciler/src/ReactFiberHooks.js`

- **Line 1:** Monolith detected (4188 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/react/packages/react-reconciler/src/ReactFiberLane.js`

- **Line 1:** Large Class detected (912 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/react/packages/react-reconciler/src/ReactFiberPerformanceTrack.js`

- **Line 1:** Monolith detected (1530 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/react/packages/react-reconciler/src/ReactFiberWorkLoop.js`

- **Line 1:** Monolith detected (3927 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/react/packages/react-server/src/ReactFizzServer.js`

- **Line 1:** Monolith detected (4970 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/react/packages/react-server/src/ReactFlightReplyServer.js`

- **Line 1:** Large Class detected (1310 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/react/packages/react-server/src/ReactFlightServer.js`

- **Line 1:** Monolith detected (5072 code lines). Critical complexity - urgent refactoring required.

## ⚡ N+1 Query

### `../../../audit_targets/batch_2/react/compiler/packages/react-mcp-server/src/utils/algolia.ts`

- **Line 101:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_2/react/fixtures/attribute-behavior/src/App.js`

- **Line 813:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

---

Generated by DriftGuard v0.4

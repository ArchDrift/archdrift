# 📋 DriftGuard Full Details

**Generated:** 3/1/2026, 5:23:04 pm

This document contains a line-by-line breakdown of every violation detected.

---

## Weighted Debt Calculation

**Weighted Debt Density:** 0.33 debt points per 1,000 lines of production code

**Severity Multipliers:**
- Layer Violations: ×10 (Fatal structural drift)
- N+1 Queries: ×2 (Core efficiency drift)
- God Classes: ×1 (Complexity drift)

**Production Code:** 29 violations (71 weighted debt) in 2,15,035 LOC

**Total Files:** 1467 (659 production)

---

## Violations Summary

- **Layer Violations:** 0
- **N+1 Queries:** 8
- **God Classes:** 21

---

## Detailed Violations

### 1. God Class - audit_targets\final_push\playwright\packages\injected\src\injectedScript.ts

Line 1: Monolith detected (1627 code lines). Critical complexity - urgent refactoring required.

### 2. God Class - audit_targets\final_push\playwright\packages\injected\src\recorder\recorder.ts

Line 1: Monolith detected (1728 code lines). Critical complexity - urgent refactoring required.

### 3. God Class - audit_targets\final_push\playwright\packages\injected\src\roleUtils.ts

Line 1: Large Class detected (1124 code lines). Consider splitting into smaller modules.

### 4. N+1 Query - audit_targets\final_push\playwright\packages\injected\src\storageScript.ts

Line 83: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 5. N+1 Query - audit_targets\final_push\playwright\packages\injected\src\storageScript.ts

Line 154: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 6. N+1 Query - audit_targets\final_push\playwright\packages\injected\src\storageScript.ts

Line 195: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 7. N+1 Query - audit_targets\final_push\playwright\packages\injected\src\storageScript.ts

Line 197: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 8. N+1 Query - audit_targets\final_push\playwright\packages\injected\src\storageScript.ts

Line 198: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 9. God Class - audit_targets\final_push\playwright\packages\playwright-client\types\types.d.ts

Line 1: Monolith detected (21125 code lines in type/schema definition file). Critical complexity - urgent refactoring required.

### 10. N+1 Query - audit_targets\final_push\playwright\packages\playwright-core\src\client\browserContext.ts

Line 527: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 11. God Class - audit_targets\final_push\playwright\packages\playwright-core\src\client\network.ts

Line 1: Large Class detected (804 code lines). Consider splitting into smaller modules.

### 12. God Class - audit_targets\final_push\playwright\packages\playwright-core\src\protocol\validator.ts

Line 1: Monolith detected (2957 code lines). Critical complexity - urgent refactoring required.

### 13. N+1 Query - audit_targets\final_push\playwright\packages\playwright-core\src\server\android\android.ts

Line 82: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 14. God Class - audit_targets\final_push\playwright\packages\playwright-core\src\server\bidi\third_party\bidiProtocolCore.ts

Line 1: Monolith detected (2976 code lines). Critical complexity - urgent refactoring required.

### 15. God Class - audit_targets\final_push\playwright\packages\playwright-core\src\server\chromium\crPage.ts

Line 1: Large Class detected (1079 code lines). Consider splitting into smaller modules.

### 16. God Class - audit_targets\final_push\playwright\packages\playwright-core\src\server\chromium\protocol.d.ts

Line 1: Monolith detected (23342 code lines in type/schema definition file). Critical complexity - urgent refactoring required.

### 17. God Class - audit_targets\final_push\playwright\packages\playwright-core\src\server\dom.ts

Line 1: Large Class detected (824 code lines). Consider splitting into smaller modules.

### 18. God Class - audit_targets\final_push\playwright\packages\playwright-core\src\server\firefox\protocol.d.ts

Line 1: Large Class detected (1184 code lines). Consider splitting into smaller modules.

### 19. God Class - audit_targets\final_push\playwright\packages\playwright-core\src\server\frames.ts

Line 1: Monolith detected (1555 code lines). Critical complexity - urgent refactoring required.

### 20. God Class - audit_targets\final_push\playwright\packages\playwright-core\src\server\page.ts

Line 1: Large Class detected (940 code lines). Consider splitting into smaller modules.

### 21. God Class - audit_targets\final_push\playwright\packages\playwright-core\src\server\registry\index.ts

Line 1: Large Class detected (1449 code lines). Consider splitting into smaller modules.

### 22. God Class - audit_targets\final_push\playwright\packages\playwright-core\src\server\registry\nativeDeps.ts

Line 1: Large Class detected (1271 code lines). Consider splitting into smaller modules.

### 23. God Class - audit_targets\final_push\playwright\packages\playwright-core\src\server\webkit\protocol.d.ts

Line 1: Monolith detected (9672 code lines in type/schema definition file). Critical complexity - urgent refactoring required.

### 24. God Class - audit_targets\final_push\playwright\packages\playwright-core\src\server\webkit\wkPage.ts

Line 1: Large Class detected (1153 code lines). Consider splitting into smaller modules.

### 25. N+1 Query - audit_targets\final_push\playwright\packages\playwright-core\src\server\webkit\wkPage.ts

Line 1015: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 26. God Class - audit_targets\final_push\playwright\packages\playwright-core\src\utils\isomorphic\cssTokenizer.ts

Line 1: Large Class detected (873 code lines). Consider splitting into smaller modules.

### 27. God Class - audit_targets\final_push\playwright\packages\playwright-core\types\protocol.d.ts

Line 1: Monolith detected (23342 code lines in type/schema definition file). Critical complexity - urgent refactoring required.

### 28. God Class - audit_targets\final_push\playwright\packages\playwright-core\types\types.d.ts

Line 1: Monolith detected (21125 code lines in type/schema definition file). Critical complexity - urgent refactoring required.

### 29. God Class - audit_targets\final_push\playwright\packages\protocol\src\channels.d.ts

Line 1: Monolith detected (5018 code lines in type/schema definition file). Critical complexity - urgent refactoring required.

---

Generated by DriftGuard v0.4

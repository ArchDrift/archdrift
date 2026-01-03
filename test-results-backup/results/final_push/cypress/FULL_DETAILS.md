# 📋 DriftGuard Full Details

**Generated:** 3/1/2026, 5:23:02 pm

This document contains a line-by-line breakdown of every violation detected.

---

## Weighted Debt Calculation

**Weighted Debt Density:** 0.31 debt points per 1,000 lines of production code

**Severity Multipliers:**
- Layer Violations: ×10 (Fatal structural drift)
- N+1 Queries: ×2 (Core efficiency drift)
- God Classes: ×1 (Complexity drift)

**Production Code:** 41 violations (76 weighted debt) in 2,47,564 LOC

**Total Files:** 4235 (1972 production)

---

## Violations Summary

- **Layer Violations:** 0
- **N+1 Queries:** 8
- **God Classes:** 33

---

## Detailed Violations

### 1. N+1 Query - audit_targets\final_push\cypress\packages\app\src\composables\useCloudSpecData.ts

Line 75: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 2. God Class - audit_targets\final_push\cypress\packages\app\src\runner\event-manager.ts

Line 1: Large Class detected (856 code lines). Consider splitting into smaller modules.

### 3. N+1 Query - audit_targets\final_push\cypress\packages\data-context\src\sources\RemoteRequestDataSource.ts

Line 284: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 4. God Class - audit_targets\final_push\cypress\packages\driver\cypress\e2e\commands\actions\check.cy.ts

Line 1: Large Class detected (1162 code lines). Consider splitting into smaller modules.

### 5. God Class - audit_targets\final_push\cypress\packages\driver\cypress\e2e\commands\actions\click.cy.ts

Line 1: Monolith detected (3302 code lines). Critical complexity - urgent refactoring required.

### 6. God Class - audit_targets\final_push\cypress\packages\driver\cypress\e2e\commands\actions\scroll.cy.ts

Line 1: Large Class detected (852 code lines). Consider splitting into smaller modules.

### 7. God Class - audit_targets\final_push\cypress\packages\driver\cypress\e2e\commands\actions\trigger.cy.ts

Line 1: Large Class detected (1006 code lines). Consider splitting into smaller modules.

### 8. God Class - audit_targets\final_push\cypress\packages\driver\cypress\e2e\commands\actions\type.cy.ts

Line 1: Monolith detected (2866 code lines in type/schema definition file). Critical complexity - urgent refactoring required.

### 9. God Class - audit_targets\final_push\cypress\packages\driver\cypress\e2e\commands\actions\type_special_chars.cy.ts

Line 1: Large Class detected (1548 code lines). Consider splitting into smaller modules.

### 10. God Class - audit_targets\final_push\cypress\packages\driver\cypress\e2e\commands\assertions.cy.js

Line 1: Monolith detected (2436 code lines). Critical complexity - urgent refactoring required.

### 11. God Class - audit_targets\final_push\cypress\packages\driver\cypress\e2e\commands\connectors.cy.js

Line 1: Monolith detected (1576 code lines). Critical complexity - urgent refactoring required.

### 12. God Class - audit_targets\final_push\cypress\packages\driver\cypress\e2e\commands\cookies.cy.js

Line 1: Monolith detected (1994 code lines). Critical complexity - urgent refactoring required.

### 13. God Class - audit_targets\final_push\cypress\packages\driver\cypress\e2e\commands\navigation.cy.js

Line 1: Monolith detected (2240 code lines). Critical complexity - urgent refactoring required.

### 14. God Class - audit_targets\final_push\cypress\packages\driver\cypress\e2e\commands\net_stubbing.cy.ts

Line 1: Monolith detected (3586 code lines). Critical complexity - urgent refactoring required.

### 15. N+1 Query - audit_targets\final_push\cypress\packages\driver\cypress\e2e\commands\net_stubbing.cy.ts

Line 3088: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 16. God Class - audit_targets\final_push\cypress\packages\driver\cypress\e2e\commands\querying\querying.cy.ts

Line 1: Monolith detected (1532 code lines). Critical complexity - urgent refactoring required.

### 17. God Class - audit_targets\final_push\cypress\packages\driver\cypress\e2e\commands\request.cy.js

Line 1: Large Class detected (1262 code lines). Consider splitting into smaller modules.

### 18. God Class - audit_targets\final_push\cypress\packages\driver\cypress\e2e\commands\screenshot.cy.js

Line 1: Large Class detected (962 code lines). Consider splitting into smaller modules.

### 19. God Class - audit_targets\final_push\cypress\packages\driver\cypress\e2e\commands\sessions\sessions.cy.ts

Line 1: Monolith detected (1560 code lines). Critical complexity - urgent refactoring required.

### 20. God Class - audit_targets\final_push\cypress\packages\driver\cypress\e2e\commands\waiting.cy.js

Line 1: Large Class detected (1159 code lines). Consider splitting into smaller modules.

### 21. God Class - audit_targets\final_push\cypress\packages\driver\cypress\e2e\commands\window.cy.js

Line 1: Large Class detected (874 code lines). Consider splitting into smaller modules.

### 22. God Class - audit_targets\final_push\cypress\packages\driver\cypress\e2e\e2e\origin\cookie_behavior.cy.ts

Line 1: Large Class detected (1123 code lines). Consider splitting into smaller modules.

### 23. N+1 Query - audit_targets\final_push\cypress\packages\driver\cypress\e2e\e2e\origin\patches.cy.ts

Line 209: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 24. N+1 Query - audit_targets\final_push\cypress\packages\driver\cypress\e2e\e2e\origin\patches.cy.ts

Line 214: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 25. N+1 Query - audit_targets\final_push\cypress\packages\driver\cypress\e2e\e2e\origin\patches.cy.ts

Line 244: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 26. N+1 Query - audit_targets\final_push\cypress\packages\driver\cypress\e2e\e2e\origin\patches.cy.ts

Line 267: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 27. N+1 Query - audit_targets\final_push\cypress\packages\driver\cypress\e2e\e2e\origin\patches.cy.ts

Line 272: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 28. God Class - audit_targets\final_push\cypress\packages\driver\cypress\fixtures\jquery-3.2.1.js

Line 1: Monolith detected (8322 code lines). Critical complexity - urgent refactoring required.

### 29. God Class - audit_targets\final_push\cypress\packages\driver\src\cy\commands\navigation.ts

Line 1: Large Class detected (953 code lines). Consider splitting into smaller modules.

### 30. God Class - audit_targets\final_push\cypress\packages\driver\src\cy\keyboard.ts

Line 1: Large Class detected (1160 code lines). Consider splitting into smaller modules.

### 31. God Class - audit_targets\final_push\cypress\packages\driver\src\cypress\cy.ts

Line 1: Large Class detected (1098 code lines). Consider splitting into smaller modules.

### 32. God Class - audit_targets\final_push\cypress\packages\driver\src\cypress\error_messages.ts

Line 1: Monolith detected (2114 code lines). Critical complexity - urgent refactoring required.

### 33. God Class - audit_targets\final_push\cypress\packages\driver\src\cypress\runner.ts

Line 1: Monolith detected (1644 code lines). Critical complexity - urgent refactoring required.

### 34. God Class - audit_targets\final_push\cypress\packages\errors\src\errors.ts

Line 1: Large Class detected (1278 code lines). Consider splitting into smaller modules.

### 35. God Class - audit_targets\final_push\cypress\packages\packherd-require\src\loader.ts

Line 1: Large Class detected (975 code lines). Consider splitting into smaller modules.

### 36. God Class - audit_targets\final_push\cypress\packages\proxy\lib\http\response-middleware.ts

Line 1: Large Class detected (802 code lines). Consider splitting into smaller modules.

### 37. God Class - audit_targets\final_push\cypress\packages\reporter\cypress\e2e\commands.cy.ts

Line 1: Large Class detected (1088 code lines). Consider splitting into smaller modules.

### 38. God Class - audit_targets\final_push\cypress\packages\server\lib\modes\run.ts

Line 1: Large Class detected (977 code lines). Consider splitting into smaller modules.

### 39. God Class - audit_targets\final_push\cypress\packages\server\lib\server-base.ts

Line 1: Large Class detected (824 code lines). Consider splitting into smaller modules.

### 40. God Class - audit_targets\final_push\cypress\system-tests\lib\system-tests.ts

Line 1: Large Class detected (859 code lines). Consider splitting into smaller modules.

### 41. God Class - audit_targets\final_push\cypress\tooling\v8-snapshot\src\blueprint\globals.js

Line 1: Large Class detected (874 code lines). Consider splitting into smaller modules.

---

Generated by DriftGuard v0.4

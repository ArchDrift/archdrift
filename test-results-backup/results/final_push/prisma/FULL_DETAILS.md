# 📋 DriftGuard Full Details

**Generated:** 3/1/2026, 5:23:07 pm

This document contains a line-by-line breakdown of every violation detected.

---

## Weighted Debt Calculation

**Weighted Debt Density:** 2.02 debt points per 1,000 lines of production code

**Severity Multipliers:**
- Layer Violations: ×10 (Fatal structural drift)
- N+1 Queries: ×2 (Core efficiency drift)
- God Classes: ×1 (Complexity drift)

**Production Code:** 62 violations (118 weighted debt) in 58,301 LOC

**Total Files:** 2785 (881 production)

---

## Violations Summary

- **Layer Violations:** 0
- **N+1 Queries:** 59
- **God Classes:** 3

---

## Detailed Violations

### 1. N+1 Query - audit_targets\final_push\prisma\packages\adapter-mariadb\src\mariadb.ts

Line 66: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 2. N+1 Query - audit_targets\final_push\prisma\packages\adapter-mariadb\src\mariadb.ts

Line 230: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 3. N+1 Query - audit_targets\final_push\prisma\packages\adapter-pg\src\pg.ts

Line 106: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 4. N+1 Query - audit_targets\final_push\prisma\packages\adapter-pg\src\pg.ts

Line 239: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 5. N+1 Query - audit_targets\final_push\prisma\packages\client\src\runtime\core\jsonProtocol\serializeJsonQuery.ts

Line 387: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 6. God Class - audit_targets\final_push\prisma\packages\client\src\runtime\getPrismaClient.ts

Line 1: Large Class detected (826 code lines). Consider splitting into smaller modules.

### 7. God Class - audit_targets\final_push\prisma\packages\client-generator-js\src\TSClient\Model.ts

Line 1: Large Class detected (857 code lines). Consider splitting into smaller modules.

### 8. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-js\src\TSClient\Model.ts

Line 510: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 9. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-js\src\TSClient\Model.ts

Line 523: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 10. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-js\src\TSClient\Model.ts

Line 538: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 11. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-js\src\TSClient\Model.ts

Line 604: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 12. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-js\src\TSClient\Model.ts

Line 742: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 13. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-js\src\TSClient\PrismaClient.ts

Line 51: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 14. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-js\src\TSClient\PrismaClient.ts

Line 57: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 15. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-js\src\TSClient\PrismaClient.ts

Line 463: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 16. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-js\src\TSClient\PrismaClient.ts

Line 467: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 17. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-js\src\TSClient\PrismaClient.ts

Line 470: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 18. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-ts\src\TSClient\file-generators\ClientFile.ts

Line 42: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 19. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-ts\src\TSClient\file-generators\ClientFile.ts

Line 47: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 20. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-ts\src\TSClient\file-generators\ClientFile.ts

Line 48: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 21. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-ts\src\TSClient\globalOmit.ts

Line 10: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 22. God Class - audit_targets\final_push\prisma\packages\client-generator-ts\src\TSClient\Model.ts

Line 1: Large Class detected (871 code lines). Consider splitting into smaller modules.

### 23. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-ts\src\TSClient\Model.ts

Line 533: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 24. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-ts\src\TSClient\Model.ts

Line 545: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 25. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-ts\src\TSClient\Model.ts

Line 546: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 26. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-ts\src\TSClient\Model.ts

Line 550: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 27. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-ts\src\TSClient\Model.ts

Line 559: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 28. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-ts\src\TSClient\Model.ts

Line 561: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 29. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-ts\src\TSClient\Model.ts

Line 570: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 30. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-ts\src\TSClient\Model.ts

Line 571: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 31. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-ts\src\TSClient\Model.ts

Line 572: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 32. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-ts\src\TSClient\Model.ts

Line 574: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 33. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-ts\src\TSClient\Model.ts

Line 577: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 34. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-ts\src\TSClient\Model.ts

Line 578: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 35. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-ts\src\TSClient\Model.ts

Line 579: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 36. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-ts\src\TSClient\Model.ts

Line 580: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 37. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-ts\src\TSClient\Model.ts

Line 581: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 38. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-ts\src\TSClient\Model.ts

Line 582: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 39. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-ts\src\TSClient\Model.ts

Line 583: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 40. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-ts\src\TSClient\Model.ts

Line 585: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 41. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-ts\src\TSClient\Model.ts

Line 598: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 42. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-ts\src\TSClient\Model.ts

Line 599: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 43. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-ts\src\TSClient\Model.ts

Line 600: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 44. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-ts\src\TSClient\Model.ts

Line 608: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 45. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-ts\src\TSClient\Model.ts

Line 609: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 46. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-ts\src\TSClient\Model.ts

Line 610: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 47. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-ts\src\TSClient\Model.ts

Line 618: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 48. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-ts\src\TSClient\Model.ts

Line 625: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 49. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-ts\src\TSClient\Model.ts

Line 627: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 50. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-ts\src\TSClient\Model.ts

Line 765: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 51. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-ts\src\TSClient\Model.ts

Line 881: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 52. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-ts\src\TSClient\ModelExports.ts

Line 19: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 53. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-ts\src\TSClient\ModelExports.ts

Line 20: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 54. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-ts\src\TSClient\ModelFieldRefs.ts

Line 27: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 55. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-ts\src\TSClient\PrismaClient.ts

Line 314: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 56. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-ts\src\TSClient\PrismaClient.ts

Line 318: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 57. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-ts\src\TSClient\PrismaClient.ts

Line 321: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 58. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-ts\src\TSClient\SelectIncludeOmit.ts

Line 98: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 59. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-ts\src\TSClient\TypeMap.ts

Line 54: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 60. N+1 Query - audit_targets\final_push\prisma\packages\client-generator-ts\src\TSClient\TypeMap.ts

Line 60: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 61. N+1 Query - audit_targets\final_push\prisma\packages\internals\src\get-generators\getGenerators.ts

Line 236: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### 62. N+1 Query - audit_targets\final_push\prisma\packages\internals\src\get-generators\getGenerators.ts

Line 405: Database/API call inside loop. Consider batching queries or moving the call outside the loop.

---

Generated by DriftGuard v0.4

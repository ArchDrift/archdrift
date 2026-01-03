# 📋 DriftGuard Full Details

**Generated:** 3/1/2026, 4:42:17 pm

This document contains a line-by-line breakdown of every violation detected.

---

## Weighted Debt Calculation

**Weighted Debt Density:** 1.59 debt points per 1,000 lines of production code

**Severity Multipliers:**
- Layer Violations: ×10 (Fatal structural drift)
- N+1 Queries: ×2 (Core efficiency drift)
- God Classes: ×1 (Complexity drift)

**Production Code:** 213 violations (409 weighted debt) in 2,56,827 LOC

**Total Files:** 1906 (1420 production)

---

## Violations Summary

- **Layer Violations:** 0
- **N+1 Queries:** 157
- **God Classes:** 56

---

## 📦 God Class

### `../../../audit_targets/batch_3/nocodb/packages/nc-gui/components/monaco/formula-type-validation.ts`

- **Line 1:** Large Class detected (1015 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/nocodb/packages/nc-gui/components/smartsheet/grid/canvas/composables/useCanvasRender.ts`

- **Line 1:** Monolith detected (2866 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/nocodb/packages/nc-gui/components/smartsheet/grid/canvas/composables/useCanvasTable.ts`

- **Line 1:** Large Class detected (1300 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/nocodb/packages/nc-gui/components/smartsheet/grid/canvas/composables/useCopyPaste.ts`

- **Line 1:** Large Class detected (1018 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/nocodb/packages/nc-gui/components/smartsheet/grid/canvas/utils/canvas.ts`

- **Line 1:** Large Class detected (1300 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/nocodb/packages/nc-gui/composables/useCalendarViewStore.ts`

- **Line 1:** Large Class detected (1091 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/nocodb/packages/nc-gui/composables/useGridViewData.ts`

- **Line 1:** Large Class detected (859 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/nocodb/packages/nc-gui/composables/useInfiniteData.ts`

- **Line 1:** Monolith detected (1989 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/nocodb/packages/nc-gui/composables/useMultiSelect/index.ts`

- **Line 1:** Monolith detected (1564 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/nocodb/packages/nc-gui/composables/useOnboardingFlow.ts`

- **Line 1:** Large Class detected (844 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/nocodb/packages/nc-gui/store/views.ts`

- **Line 1:** Large Class detected (900 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/nocodb/packages/nc-gui/utils/iconUtils.ts`

- **Line 1:** Monolith detected (4400 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb-sdk-v2/src/lib/Api.ts`

- **Line 1:** Large Class detected (1989 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb-sdk/src/lib/Api.ts`

- **Line 1:** Monolith detected (7605 code lines in type/schema definition file). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb-sdk/src/lib/audit/v1.ts`

- **Line 1:** Large Class detected (1048 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb-sdk/src/lib/filter/filterUtils.ts`

- **Line 1:** Large Class detected (897 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb-sdk/src/lib/formula/formulas.ts`

- **Line 1:** Large Class detected (1101 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb-sdk/src/lib/formula/validate-extract-tree.ts`

- **Line 1:** Large Class detected (902 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb-sdk/src/lib/sqlUi/MysqlUi.ts`

- **Line 1:** Large Class detected (1164 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb-sdk/src/lib/sqlUi/OracleUi.ts`

- **Line 1:** Large Class detected (876 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb-sdk/src/lib/sqlUi/PgUi.ts`

- **Line 1:** Monolith detected (1615 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb-sdk/src/lib/sqlUi/SnowflakeUi.ts`

- **Line 1:** Large Class detected (925 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb-sdk/src/lib/sqlUi/SqliteUi.ts`

- **Line 1:** Large Class detected (850 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/db/BaseModelSqlv2.ts`

- **Line 1:** Monolith detected (6058 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/db/BaseModelSqlv2/add-remove-links.ts`

- **Line 1:** Large Class detected (828 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/db/BaseModelSqlv2/group-by.ts`

- **Line 1:** Large Class detected (1334 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/db/BaseModelSqlv2/relation-data-fetcher.ts`

- **Line 1:** Large Class detected (1369 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/db/CustomKnex.ts`

- **Line 1:** Large Class detected (1313 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/db/conditionV2.ts`

- **Line 1:** Large Class detected (1235 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/db/relation-manager.ts`

- **Line 1:** Large Class detected (801 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/db/sql-client/lib/KnexClient.ts`

- **Line 1:** Monolith detected (1951 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/db/sql-client/lib/mysql/MysqlClient.ts`

- **Line 1:** Monolith detected (1727 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/db/sql-client/lib/mysql/fakerFunctionList.ts`

- **Line 1:** Large Class detected (842 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/db/sql-client/lib/oracle/OracleClient.ts`

- **Line 1:** Monolith detected (1525 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/db/sql-client/lib/pg/PgClient.ts`

- **Line 1:** Monolith detected (2355 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/db/sql-client/lib/sqlite/SqliteClient.ts`

- **Line 1:** Large Class detected (1438 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/db/sql-data-mapper/lib/BaseModel.ts`

- **Line 1:** Large Class detected (812 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/db/sql-mgr/SqlMgr.ts`

- **Line 1:** Large Class detected (1188 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/db/sql-mgr/code/models/xc/ModelXcMetaSnowflake.ts`

- **Line 1:** Large Class detected (802 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/helpers/isDisposableEmail.ts`

- **Line 1:** Monolith detected (4023 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/models/Column.ts`

- **Line 1:** Monolith detected (2162 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/models/Filter.ts`

- **Line 1:** Large Class detected (1056 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/models/Model.ts`

- **Line 1:** Large Class detected (1100 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/models/View.ts`

- **Line 1:** Monolith detected (2421 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/modules/jobs/jobs/at-import/at-import.processor.ts`

- **Line 1:** Monolith detected (2211 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/modules/jobs/jobs/export-import/duplicate.processor.ts`

- **Line 1:** Large Class detected (841 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/modules/jobs/jobs/export-import/export.service.ts`

- **Line 1:** Large Class detected (1218 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/modules/jobs/jobs/export-import/import.service.ts`

- **Line 1:** Monolith detected (2130 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/public/js/vue.global.js`

- **Line 1:** Monolith detected (14040 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/services/columns.service.ts`

- **Line 1:** Monolith detected (4372 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/services/data-table.service.ts`

- **Line 1:** Large Class detected (818 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/services/datas.service.ts`

- **Line 1:** Large Class detected (941 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/services/meta-diffs.service.ts`

- **Line 1:** Large Class detected (1044 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/services/public-datas.service.ts`

- **Line 1:** Large Class detected (872 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/services/v3/data-v3.service.ts`

- **Line 1:** Large Class detected (846 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/utils/audit.ts`

- **Line 1:** Large Class detected (857 code lines). Consider splitting into smaller modules.

## ⚡ N+1 Query

### `../../../audit_targets/batch_3/nocodb/packages/nc-gui/components/cell/attachment/utils.ts`

- **Line 419:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 421:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/nocodb/packages/nc-gui/composables/useAttachment.ts`

- **Line 35:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/nocodb/packages/nc-gui/composables/useData.ts`

- **Line 179:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/nocodb/packages/nc-gui/composables/useExtensionHelper.ts`

- **Line 109:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 131:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 159:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 170:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/nocodb/packages/nc-gui/composables/useGridViewData.ts`

- **Line 414:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/nocodb/packages/nc-gui/composables/useKanbanViewStore.ts`

- **Line 574:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/nocodb/packages/nc-gui/composables/useViewFilters.ts`

- **Line 346:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 353:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 361:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 367:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 373:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 379:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 671:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/nocodb/packages/nc-gui/composables/useViewGroupBy.ts`

- **Line 629:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/nocodb/packages/nc-gui/composables/useViewSorts.ts`

- **Line 142:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 155:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/nocodb/packages/nc-gui/store/bases.ts`

- **Line 375:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/nocodb/packages/nc-gui/store/notification.ts`

- **Line 159:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/nocodb/packages/nc-gui/store/webhooks.ts`

- **Line 69:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/nocodb/packages/nc-gui/utils/filterUtils.ts`

- **Line 185:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/nocodb/packages/nc-secret-mgr/src/nocodb/cli.js`

- **Line 2:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/db/BaseModelSqlv2.ts`

- **Line 2676:** Database/API call inside loop (DataLoader detected - penalty reduced). Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/db/BaseModelSqlv2/delete.ts`

- **Line 212:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/db/field-handler/handlers/attachment/attachment.general.handler.ts`

- **Line 84:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/db/sql-client/lib/KnexClient.ts`

- **Line 966:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 967:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 983:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 984:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 985:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 986:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 987:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 988:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 989:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 997:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1035:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1059:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1062:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1090:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1092:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1104:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1126:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/db/sql-data-mapper/lib/BaseModel.ts`

- **Line 874:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/db/sql-mgr/SqlMgr.ts`

- **Line 190:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 248:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 249:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 250:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 297:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 305:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 361:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 391:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 668:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1473:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/db/sql-migrator/lib/KnexMigratorv2.ts`

- **Line 111:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/helpers/initAdminFromEnv.ts`

- **Line 138:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 160:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 183:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 196:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 217:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/helpers/populateMeta.ts`

- **Line 601:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/meta/migrations/v2/nc_054_id_length.ts`

- **Line 109:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 112:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/meta/migrations/v2/nc_056_integration.ts`

- **Line 91:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/models/Base.ts`

- **Line 462:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 471:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/models/Column.ts`

- **Line 865:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 883:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 899:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 921:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 943:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 983:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1009:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1059:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1109:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1149:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1179:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1201:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1225:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1250:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1381:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1632:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1635:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1706:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1715:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/models/Filter.ts`

- **Line 1124:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/models/Hook.ts`

- **Line 465:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/models/Integration.ts`

- **Line 431:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/models/Model.ts`

- **Line 615:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1025:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/models/Source.ts`

- **Line 485:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 495:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/models/View.ts`

- **Line 1547:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/modules/jobs/jobs/at-import/at-import.processor.ts`

- **Line 540:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 572:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 631:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 730:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 733:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 770:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 783:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 851:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 880:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 932:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 940:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1016:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1106:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1189:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1192:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1356:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1423:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1769:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1839:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1872:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1878:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 2315:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 2544:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 2660:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 2665:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 2740:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/modules/jobs/jobs/at-import/helpers/EntityMap.ts`

- **Line 22:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 59:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 102:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 153:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/modules/jobs/jobs/at-import/helpers/readAndProcessData.ts`

- **Line 413:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/modules/jobs/migration-jobs/nc_job_003_recover_links.ts`

- **Line 303:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/plugins/discord/Discord.ts`

- **Line 13:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/plugins/mattermost/Mattermost.ts`

- **Line 13:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/plugins/slack/Slack.ts`

- **Line 13:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/plugins/teams/Teams.ts`

- **Line 13:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/plugins/twilioWhatsapp/TwilioWhatsapp.ts`

- **Line 19:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/plugins/twilio/Twilio.ts`

- **Line 19:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/public/js/swagger-ui-bundle.js`

- **Line 2:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/services/columns.service.ts`

- **Line 280:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1478:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1511:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1574:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1580:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1591:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1947:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1999:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/services/hooks.service.ts`

- **Line 125:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 181:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/services/integrations.service.ts`

- **Line 411:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/services/meta-diffs.service.ts`

- **Line 805:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 855:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 866:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 877:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 881:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 918:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/services/model-visibilities.service.ts`

- **Line 48:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 49:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 54:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/services/org-users.service.ts`

- **Line 92:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/nocodb/packages/nocodb/src/version-upgrader/upgraders/0111005_ncXcdbCreatedAndUpdatedSystemFieldsUpgrader.ts`

- **Line 129:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 152:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

---

Generated by DriftGuard v0.4

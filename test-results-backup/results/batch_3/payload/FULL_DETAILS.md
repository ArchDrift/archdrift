# 📋 DriftGuard Full Details

**Generated:** 3/1/2026, 4:43:31 pm

This document contains a line-by-line breakdown of every violation detected.

---

## Weighted Debt Calculation

**Weighted Debt Density:** 0.62 debt points per 1,000 lines of production code

**Severity Multipliers:**
- Layer Violations: ×10 (Fatal structural drift)
- N+1 Queries: ×2 (Core efficiency drift)
- God Classes: ×1 (Complexity drift)

**Production Code:** 107 violations (174 weighted debt) in 2,79,427 LOC

**Total Files:** 5779 (3624 production)

---

## Violations Summary

- **Layer Violations:** 0
- **N+1 Queries:** 87
- **God Classes:** 20

---

## 📦 God Class

### `../../../audit_targets/batch_3/payload/packages/db-mongodb/src/models/buildSchema.ts`

- **Line 1:** Large Class detected (825 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/payload/packages/drizzle/src/queries/getTableColumnFromPath.ts`

- **Line 1:** Large Class detected (848 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/payload/packages/drizzle/src/schema/traverseFields.ts`

- **Line 1:** Large Class detected (927 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/payload/packages/graphql/src/schema/fieldToSchemaMap.ts`

- **Line 1:** Large Class detected (1068 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/payload/packages/payload/src/fields/config/types.ts`

- **Line 1:** Large Class detected (1461 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/payload/packages/payload/src/fields/hooks/afterRead/promise.ts`

- **Line 1:** Large Class detected (905 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/payload/packages/payload/src/fields/validations.ts`

- **Line 1:** Large Class detected (864 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/payload/packages/payload/src/index.ts`

- **Line 1:** Large Class detected (1422 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/payload/packages/payload/src/utilities/configToJSONSchema.ts`

- **Line 1:** Large Class detected (1140 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/payload/packages/richtext-lexical/src/index.ts`

- **Line 1:** Large Class detected (912 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/payload/packages/ui/src/fields/Relationship/Input.tsx`

- **Line 1:** Large Class detected (831 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/payload/packages/ui/src/forms/fieldSchemasToFormState/addFieldStatePromise.ts`

- **Line 1:** Large Class detected (824 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/payload/templates/ecommerce/src/blocks/Form/Country/options.ts`

- **Line 1:** Large Class detected (982 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/payload/templates/ecommerce/src/endpoints/seed/product-tshirt.ts`

- **Line 1:** Large Class detected (1197 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/payload/templates/ecommerce/src/payload-types.ts`

- **Line 1:** Large Class detected (1593 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/payload/templates/website/src/blocks/Form/Country/options.ts`

- **Line 1:** Large Class detected (982 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/payload/templates/website/src/payload-types.ts`

- **Line 1:** Large Class detected (1546 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/payload/templates/with-vercel-website/src/blocks/Form/Country/options.ts`

- **Line 1:** Large Class detected (982 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/payload/templates/with-vercel-website/src/migrations/20251219_215102_initial.ts`

- **Line 1:** Large Class detected (1175 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/payload/templates/with-vercel-website/src/payload-types.ts`

- **Line 1:** Large Class detected (1546 code lines). Consider splitting into smaller modules.

## ⚡ N+1 Query

### `../../../audit_targets/batch_3/payload/packages/create-payload-app/src/lib/ast/payload-config.ts`

- **Line 760:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/packages/db-mongodb/src/migrateFresh.ts`

- **Line 55:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/packages/db-mongodb/src/predefinedMigrations/migrateRelationshipsV2_V3.ts`

- **Line 31:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/packages/db-mongodb/src/queries/buildSearchParams.ts`

- **Line 187:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 237:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/packages/drizzle/src/find/traverseFields.ts`

- **Line 571:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/packages/drizzle/src/migrate.ts`

- **Line 67:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 79:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/packages/drizzle/src/migrateDown.ts`

- **Line 56:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/packages/drizzle/src/migrateFresh.ts`

- **Line 69:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/packages/drizzle/src/migrateRefresh.ts`

- **Line 59:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 87:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/packages/drizzle/src/migrateReset.ts`

- **Line 52:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/packages/drizzle/src/postgres/predefinedMigrations/v2-v3/fetchAndResave/index.ts`

- **Line 91:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/packages/drizzle/src/postgres/predefinedMigrations/v2-v3/migrateRelationships.ts`

- **Line 59:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 75:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/packages/drizzle/src/sqlite/insert.ts`

- **Line 22:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 23:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/packages/graphql/src/schema/initCollections.ts`

- **Line 95:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 105:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 152:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 159:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 329:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 334:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/packages/graphql/src/schema/initGlobals.ts`

- **Line 115:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 121:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/packages/next/src/views/List/handleGroupBy.ts`

- **Line 117:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/packages/payload/src/collections/dataloader.ts`

- **Line 83:** Database/API call inside loop (DataLoader detected - penalty reduced). Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/packages/payload/src/collections/operations/delete.ts`

- **Line 209:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/packages/payload/src/config/client.ts`

- **Line 216:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 238:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 259:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/packages/payload/src/config/orderable/index.ts`

- **Line 122:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 236:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 313:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/packages/payload/src/database/getLocalizedPaths.ts`

- **Line 126:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/packages/payload/src/database/migrations/migrate.ts`

- **Line 38:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 41:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/packages/payload/src/database/migrations/migrateDown.ts`

- **Line 41:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 47:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/packages/payload/src/database/migrations/migrateRefresh.ts`

- **Line 40:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 45:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 78:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/packages/payload/src/database/migrations/migrateReset.ts`

- **Line 36:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 38:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/packages/payload/src/database/migrations/readMigrationFiles.ts`

- **Line 35:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/packages/payload/src/fields/validations.ts`

- **Line 695:** Database/API call inside loop (DataLoader detected - penalty reduced). Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/packages/payload/src/folders/hooks/dissasociateAfterDelete.ts`

- **Line 13:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/packages/payload/src/folders/hooks/ensureSafeCollectionsChange.ts`

- **Line 35:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 65:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/packages/plugin-ecommerce/src/collections/carts/beforeChange.ts`

- **Line 34:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 47:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/packages/plugin-ecommerce/src/collections/variants/createVariantsCollection/hooks/beforeChange.ts`

- **Line 29:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/packages/plugin-ecommerce/src/endpoints/confirmOrder.ts`

- **Line 179:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 191:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/packages/plugin-ecommerce/src/endpoints/initiatePayment.ts`

- **Line 197:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 249:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/packages/plugin-ecommerce/src/ui/VariantOptionsSelector/index.tsx`

- **Line 38:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/packages/plugin-import-export/src/export/createExport.ts`

- **Line 208:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 352:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/packages/plugin-nested-docs/src/hooks/resaveChildren.ts`

- **Line 35:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 71:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/packages/plugin-search/src/utilities/generateReindexHandler.ts`

- **Line 140:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/packages/richtext-lexical/src/features/blocks/premade/CodeBlock/Component/Code.tsx`

- **Line 163:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/packages/richtext-lexical/src/utilities/migrateSlateToLexical/index.ts`

- **Line 133:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 168:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/packages/richtext-lexical/src/utilities/upgradeLexicalData/index.ts`

- **Line 104:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 137:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/packages/richtext-slate/src/field/rscEntry.tsx`

- **Line 142:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 170:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/packages/ui/src/elements/BulkUpload/FormsManager/index.tsx`

- **Line 369:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/packages/ui/src/elements/DeleteMany/index.tsx`

- **Line 249:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 255:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/packages/ui/src/elements/Table/RelationshipProvider/index.tsx`

- **Line 91:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/packages/ui/src/fields/Upload/Input.tsx`

- **Line 281:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/packages/ui/src/providers/Folders/index.tsx`

- **Line 730:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/packages/ui/src/utilities/buildClientFieldSchemaMap/traverseFields.ts`

- **Line 151:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/templates/ecommerce/src/endpoints/seed/index.ts`

- **Line 107:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 109:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 206:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/templates/website/src/collections/Posts/hooks/populateAuthors.ts`

- **Line 14:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/templates/website/src/search/beforeSync.ts`

- **Line 34:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/templates/with-vercel-website/src/collections/Posts/hooks/populateAuthors.ts`

- **Line 14:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/templates/with-vercel-website/src/search/beforeSync.ts`

- **Line 34:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/tools/releaser/src/lib/getPackageRegistryVersions.ts`

- **Line 16:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/payload/tools/releaser/src/utils/generateReleaseNotes.ts`

- **Line 212:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 259:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

---

Generated by DriftGuard v0.4

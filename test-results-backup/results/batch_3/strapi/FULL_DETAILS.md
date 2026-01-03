# 📋 DriftGuard Full Details

**Generated:** 3/1/2026, 4:41:43 pm

This document contains a line-by-line breakdown of every violation detected.

---

## Weighted Debt Calculation

**Weighted Debt Density:** 1.51 debt points per 1,000 lines of production code

**Severity Multipliers:**
- Layer Violations: ×10 (Fatal structural drift)
- N+1 Queries: ×2 (Core efficiency drift)
- God Classes: ×1 (Complexity drift)

**Production Code:** 128 violations (305 weighted debt) in 2,01,716 LOC

**Total Files:** 4167 (2861 production)

---

## Violations Summary

- **Layer Violations:** 7
- **N+1 Queries:** 115
- **God Classes:** 6

---

## 📦 God Class

### `../../../audit_targets/batch_3/strapi/packages/admin-test-utils/src/fixtures/permissions/admin-permissions.ts`

- **Line 1:** Monolith detected (1906 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/strapi/packages/core/content-manager/admin/src/pages/EditView/components/DocumentActions.tsx`

- **Line 1:** Large Class detected (1271 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/strapi/packages/core/content-manager/admin/src/pages/EditView/components/FormInputs/Relations/Relations.tsx`

- **Line 1:** Large Class detected (1017 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/strapi/packages/core/content-type-builder/admin/src/components/FormModal/FormModal.tsx`

- **Line 1:** Large Class detected (1043 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/strapi/packages/core/database/src/entity-manager/index.ts`

- **Line 1:** Large Class detected (1177 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/strapi/packages/plugins/i18n/admin/src/components/CMHeaderActions.tsx`

- **Line 1:** Large Class detected (940 code lines). Consider splitting into smaller modules.

## ⚡ N+1 Query

### `../../../audit_targets/batch_3/strapi/packages/cli/cloud/src/login/action.ts`

- **Line 126:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/cli/create-strapi-app/templates/example-js/scripts/seed.js`

- **Line 119:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/core/admin/ee/server/src/services/user.ts`

- **Line 186:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/core/admin/server/src/bootstrap.ts`

- **Line 100:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/core/admin/server/src/services/api-token.ts`

- **Line 212:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 365:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 375:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 395:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/core/admin/server/src/services/permission/queries.ts`

- **Line 33:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 46:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/core/admin/server/src/services/role.ts`

- **Line 206:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/core/admin/server/src/services/transfer/token.ts`

- **Line 158:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 168:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 182:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/core/admin/server/src/services/user.ts`

- **Line 337:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 391:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/core/admin/server/src/validation/common-functions/check-fields-are-correctly-nested.ts`

- **Line 18:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/core/content-manager/server/src/history/services/utils.ts`

- **Line 104:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/core/content-manager/server/src/homepage/services/homepage.ts`

- **Line 258:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/core/content-releases/server/src/bootstrap.ts`

- **Line 37:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/core/content-releases/server/src/controllers/release-action.ts`

- **Line 50:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/core/content-releases/server/src/migrations/database/5.0.0-document-id-in-actions.ts`

- **Line 45:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/core/content-releases/server/src/migrations/index.ts`

- **Line 92:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 116:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 141:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 164:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/core/content-releases/server/src/services/release-action.ts`

- **Line 397:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/core/core/src/migrations/database/5.0.0-discard-drafts.ts`

- **Line 162:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/core/core/src/migrations/draft-publish.ts`

- **Line 75:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/core/core/src/migrations/i18n.ts`

- **Line 23:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 53:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 57:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/core/core/src/services/document-service/components.ts`

- **Line 346:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 470:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 482:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/core/core/src/services/document-service/repository.ts`

- **Line 329:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 372:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 425:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/core/core/src/services/document-service/transform/id-map.ts`

- **Line 104:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/core/core/src/services/document-service/utils/bidirectional-relations.ts`

- **Line 64:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/core/core/src/services/document-service/utils/unidirectional-relations.ts`

- **Line 48:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 134:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/core/core/src/services/entity-validator/index.ts`

- **Line 572:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/core/data-transfer/src/strapi/providers/local-destination/index.ts`

- **Line 161:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/core/data-transfer/src/strapi/providers/local-destination/strategies/restore/index.ts`

- **Line 102:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 133:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/core/data-transfer/src/strapi/queries/entity.ts`

- **Line 74:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 75:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/core/data-transfer/src/utils/components.ts`

- **Line 378:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/core/database/src/dialects/postgresql/schema-inspector.ts`

- **Line 284:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 290:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/core/database/src/dialects/sqlite/schema-inspector.ts`

- **Line 161:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/core/database/src/entity-manager/index.ts`

- **Line 520:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 775:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1401:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1465:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/core/database/src/entity-manager/morph-relations.ts`

- **Line 29:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/core/database/src/migrations/internal-migrations/5.0.0-02-document-id.ts`

- **Line 161:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/core/database/src/migrations/internal-migrations/5.0.0-03-locale.ts`

- **Line 21:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/core/database/src/migrations/internal-migrations/5.0.0-04-published-at.ts`

- **Line 24:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/core/database/src/migrations/internal-migrations/5.0.0-05-drop-slug-unique-index.ts`

- **Line 27:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/core/database/src/query/helpers/populate/apply.ts`

- **Line 505:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 546:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 552:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 570:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 620:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 625:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 648:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 718:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 724:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 730:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 737:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/core/database/src/repairs/operations/remove-orphan-morph-types.ts`

- **Line 57:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 63:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 65:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 73:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 77:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 80:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/core/database/src/schema/builder.ts`

- **Line 83:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 84:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 88:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 286:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 377:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 535:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 556:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 568:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/core/database/src/validations/relations/bidirectional.ts`

- **Line 14:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 24:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 62:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 63:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/core/review-workflows/server/src/migrations/handle-deleted-ct-in-workflows.ts`

- **Line 14:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 22:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/core/review-workflows/server/src/migrations/set-stages-roles.ts`

- **Line 59:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/core/review-workflows/server/src/migrations/shorten-stage-attribute.ts`

- **Line 32:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 36:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 38:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 43:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/core/review-workflows/server/src/services/stages.ts`

- **Line 37:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/core/upload/admin/src/utils/urlsToAssets.ts`

- **Line 11:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/core/upload/server/src/controllers/admin-folder-file.ts`

- **Line 152:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 171:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 186:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/core/upload/server/src/services/ai-metadata.ts`

- **Line 57:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/core/upload/server/src/services/folder.ts`

- **Line 91:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/core/utils/src/provider-factory.ts`

- **Line 114:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/plugins/i18n/server/src/register.ts`

- **Line 72:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/plugins/i18n/server/src/services/ai-localizations.ts`

- **Line 245:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 262:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/plugins/i18n/server/src/services/locales.ts`

- **Line 82:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/plugins/i18n/server/src/services/localizations.ts`

- **Line 53:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/plugins/users-permissions/server/services/role.js`

- **Line 159:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 170:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/plugins/users-permissions/server/services/users-permissions.js`

- **Line 201:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/strapi/packages/utils/api-tests/models.js`

- **Line 153:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 181:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

## 🚫 Layer Violation

### `../../../audit_targets/batch_3/strapi/packages/core/admin/ee/server/src/index.ts`

- **Line 9:** domain module importing from api ("import auditLogsController from './audit-logs/controllers/audit-logs';"). According to DriftGuard's default rules, domain must not depend on api.
- **Line 14:** domain module importing from api ("import aiController from './ai/controllers/ai';"). According to DriftGuard's default rules, domain must not depend on api.

### `../../../audit_targets/batch_3/strapi/packages/core/content-manager/server/src/services/utils/configuration/index.ts`

- **Line 1:** service module importing from api ("import { createModelConfigurationSchema } from '../../../controllers/validation';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/strapi/packages/core/content-type-builder/server/src/services/schema-builder/content-type-builder.ts`

- **Line 9:** service module importing from api ("import { CreateContentTypeInput } from '../../controllers/validation/content-type';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/strapi/packages/core/strapi/src/cli/commands/index.ts`

- **Line 9:** domain module importing from api ("import { command as listControllers } from './controllers/list';"). According to DriftGuard's default rules, domain must not depend on api.

### `../../../audit_targets/batch_3/strapi/packages/core/upload/server/src/services/ai-metadata.ts`

- **Line 4:** service module importing from api ("import { Settings } from '../controllers/validation/admin/settings';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/strapi/packages/core/upload/server/src/services/metrics.ts`

- **Line 2:** service module importing from api ("import { Settings } from '../controllers/validation/admin/settings';"). According to DriftGuard's default rules, service must not depend on api.

---

Generated by DriftGuard v0.4

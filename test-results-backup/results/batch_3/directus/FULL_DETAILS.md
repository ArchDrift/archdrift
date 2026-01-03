# 📋 DriftGuard Full Details

**Generated:** 3/1/2026, 4:41:47 pm

This document contains a line-by-line breakdown of every violation detected.

---

## Weighted Debt Calculation

**Weighted Debt Density:** 30.47 debt points per 1,000 lines of production code

**Severity Multipliers:**
- Layer Violations: ×10 (Fatal structural drift)
- N+1 Queries: ×2 (Core efficiency drift)
- God Classes: ×1 (Complexity drift)

**Production Code:** 335 violations (3137 weighted debt) in 1,02,937 LOC

**Total Files:** 2406 (1705 production)

---

## Violations Summary

- **Layer Violations:** 309
- **N+1 Queries:** 21
- **God Classes:** 5

---

## 📦 God Class

### `../../../audit_targets/batch_3/directus/api/src/__utils__/snapshots.ts`

- **Line 1:** Large Class detected (917 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/directus/api/src/database/migrations/20201029C-remove-system-fields.ts`

- **Line 1:** Monolith detected (1644 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/directus/api/src/services/fields.ts`

- **Line 1:** Large Class detected (855 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/directus/api/src/services/items.ts`

- **Line 1:** Large Class detected (921 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/directus/api/src/services/payload.ts`

- **Line 1:** Large Class detected (821 code lines). Consider splitting into smaller modules.

## ⚡ N+1 Query

### `../../../audit_targets/batch_3/directus/api/src/database/migrations/20201029C-remove-system-fields.ts`

- **Line 1645:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/directus/api/src/database/migrations/20210506A-rename-interfaces.ts`

- **Line 73:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 80:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/directus/api/src/database/migrations/20210805A-update-groups.ts`

- **Line 21:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 25:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/directus/api/src/database/migrations/20220325A-fix-typecast-flags.ts`

- **Line 42:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/directus/api/src/database/migrations/20220429A-add-flows.ts`

- **Line 80:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/directus/api/src/database/migrations/20240204A-marketplace.ts`

- **Line 26:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 41:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 107:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 119:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/directus/api/src/database/migrations/20240311A-deprecate-webhooks.ts`

- **Line 119:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 123:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 132:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 147:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/directus/api/src/database/migrations/20240806A-permissions-policies.ts`

- **Line 254:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/directus/api/src/database/migrations/20240909A-separate-comments.ts`

- **Line 68:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/directus/api/src/services/collections.ts`

- **Line 691:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 726:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/directus/api/src/services/fields.ts`

- **Line 810:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/directus/api/src/services/files.ts`

- **Line 299:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

## 🚫 Layer Violation

### `../../../audit_targets/batch_3/directus/api/src/ai/chat/lib/create-ui-stream.ts`

- **Line 13:** lib module importing from api ("import { SYSTEM_PROMPT } from '../constants/system-prompt.js';"). According to DriftGuard's default rules, lib must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/bus/lib/use-bus.ts`

- **Line 2:** lib module importing from api ("import { redisConfigAvailable, useRedis } from '../../redis/index.js';"). According to DriftGuard's default rules, lib must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/database/get-ast-from-query/lib/convert-wildcards.ts`

- **Line 5:** lib module importing from api ("import { fetchAllowedFields } from '../../../permissions/modules/fetch-allowed-fields/fetch-allowed-fields.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 6:** lib module importing from api ("import { parseFilterKey } from '../../../utils/parse-filter-key.js';"). According to DriftGuard's default rules, lib must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/database/get-ast-from-query/lib/parse-fields.ts`

- **Line 9:** lib module importing from api ("import { getRelationType } from '../../../utils/get-relation-type.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 10:** lib module importing from api ("import { getAllowedSort } from '../utils/get-allowed-sort.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 11:** lib module importing from api ("import { getDeepQuery } from '../utils/get-deep-query.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 12:** lib module importing from api ("import { getRelatedCollection } from '../utils/get-related-collection.js';"). According to DriftGuard's default rules, lib must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/database/run-ast/lib/apply-query/add-join.ts`

- **Line 6:** lib module importing from api ("import { getRelationInfo } from '../../../../utils/get-relation-info.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 7:** lib module importing from api ("import { getHelpers } from '../../../helpers/index.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 8:** lib module importing from api ("import { generateJoinAlias } from '../../utils/generate-alias.js';"). According to DriftGuard's default rules, lib must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/database/run-ast/lib/apply-query/filter/get-filter-type.ts`

- **Line 2:** lib module importing from api ("import { parseFilterKey } from '../../../../../utils/parse-filter-key.js';"). According to DriftGuard's default rules, lib must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/database/run-ast/lib/apply-query/filter/index.ts`

- **Line 6:** lib module importing from api ("import { getColumnPath } from '../../../../../utils/get-column-path.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 7:** lib module importing from api ("import { getRelationInfo } from '../../../../../utils/get-relation-info.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 8:** lib module importing from api ("import { getHelpers } from '../../../../helpers/index.js';"). According to DriftGuard's default rules, lib must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/database/run-ast/lib/apply-query/filter/operator.ts`

- **Line 2:** lib module importing from api ("import { getColumn } from '../../../utils/get-column.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 5:** lib module importing from api ("import { getHelpers } from '../../../../helpers/index.js';"). According to DriftGuard's default rules, lib must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/database/run-ast/lib/apply-query/index.ts`

- **Line 4:** lib module importing from api ("import { getHelpers } from '../../../helpers/index.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 5:** lib module importing from api ("import { applyCaseWhen } from '../../utils/apply-case-when.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 6:** lib module importing from api ("import { getColumn } from '../../utils/get-column.js';"). According to DriftGuard's default rules, lib must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/database/run-ast/lib/apply-query/pagination.ts`

- **Line 2:** lib module importing from api ("import { getHelpers } from '../../../helpers/index.js';"). According to DriftGuard's default rules, lib must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/database/run-ast/lib/apply-query/search.ts`

- **Line 7:** lib module importing from api ("import { isValidUuid } from '../../../../utils/is-valid-uuid.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 8:** lib module importing from api ("import { parseNumericString } from '../../../../utils/parse-numeric-string.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 9:** lib module importing from api ("import { getHelpers } from '../../../helpers/index.js';"). According to DriftGuard's default rules, lib must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/database/run-ast/lib/apply-query/sort.ts`

- **Line 4:** lib module importing from api ("import { getColumnPath } from '../../../../utils/get-column-path.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 5:** lib module importing from api ("import { getColumn } from '../../utils/get-column.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 6:** lib module importing from api ("import { getRelationInfo } from '../../../../utils/get-relation-info.js';"). According to DriftGuard's default rules, lib must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/database/run-ast/lib/get-db-query.ts`

- **Line 7:** lib module importing from api ("import { getCollectionFromAlias } from '../../../utils/get-collection-from-alias.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 9:** lib module importing from api ("import { getHelpers } from '../../helpers/index.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 10:** lib module importing from api ("import { applyCaseWhen } from '../utils/apply-case-when.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 11:** lib module importing from api ("import { generateQueryAlias } from '../utils/generate-alias.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 12:** lib module importing from api ("import { getColumnPreprocessor } from '../utils/get-column-pre-processor.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 13:** lib module importing from api ("import { getColumn } from '../utils/get-column.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 14:** lib module importing from api ("import { getNodeAlias } from '../utils/get-field-alias.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 15:** lib module importing from api ("import { getInnerQueryColumnPreProcessor } from '../utils/get-inner-query-column-pre-processor.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 16:** lib module importing from api ("import { withPreprocessBindings } from '../utils/with-preprocess-bindings.js';"). According to DriftGuard's default rules, lib must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/database/run-ast/lib/parse-current-level.ts`

- **Line 3:** lib module importing from api ("import { parseFilterKey } from '../../../utils/parse-filter-key.js';"). According to DriftGuard's default rules, lib must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/extensions/lib/get-extensions-settings.ts`

- **Line 3:** lib module importing from api ("import getDatabase from '../../database/index.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 5:** lib module importing from api ("import { getSchema } from '../../utils/get-schema.js';"). According to DriftGuard's default rules, lib must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/extensions/lib/get-shared-deps-mapping.ts`

- **Line 8:** lib module importing from api ("import { useLogger } from '../../logger/index.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 9:** lib module importing from api ("import { Url } from '../../utils/url.js';"). According to DriftGuard's default rules, lib must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/extensions/lib/installation/manager.ts`

- **Line 13:** lib module importing from api ("import { useLogger } from '../../../logger/index.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 14:** lib module importing from api ("import { getStorage } from '../../../storage/index.js';"). According to DriftGuard's default rules, lib must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/extensions/lib/sandbox/register/action.ts`

- **Line 3:** lib module importing from api ("import emitter from '../../../../emitter.js';"). According to DriftGuard's default rules, lib must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/extensions/lib/sandbox/register/call-reference.ts`

- **Line 3:** lib module importing from api ("import { useLogger } from '../../../../logger/index.js';"). According to DriftGuard's default rules, lib must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/extensions/lib/sandbox/register/filter.ts`

- **Line 3:** lib module importing from api ("import emitter from '../../../../emitter.js';"). According to DriftGuard's default rules, lib must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/extensions/lib/sandbox/register/operation.ts`

- **Line 3:** lib module importing from api ("import { getFlowManager } from '../../../../flows.js';"). According to DriftGuard's default rules, lib must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/extensions/lib/sandbox/register/route.ts`

- **Line 5:** lib module importing from api ("import asyncHandler from '../../../../utils/async-handler.js';"). According to DriftGuard's default rules, lib must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/extensions/lib/sandbox/sdk/generators/log.ts`

- **Line 3:** lib module importing from api ("import { useLogger } from '../../../../../logger/index.js';"). According to DriftGuard's default rules, lib must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/extensions/lib/sandbox/sdk/generators/request.ts`

- **Line 5:** lib module importing from api ("import { getAxios } from '../../../../../request/index.js';"). According to DriftGuard's default rules, lib must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/extensions/lib/sync/sync.ts`

- **Line 9:** lib module importing from api ("import { useBus } from '../../../bus/index.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 11:** lib module importing from api ("import { useLock } from '../../../lock/index.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 12:** lib module importing from api ("import { useLogger } from '../../../logger/index.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 13:** lib module importing from api ("import { getStorage } from '../../../storage/index.js';"). According to DriftGuard's default rules, lib must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/lock/lib/use-lock.ts`

- **Line 2:** lib module importing from api ("import { redisConfigAvailable, useRedis } from '../../redis/index.js';"). According to DriftGuard's default rules, lib must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/metrics/lib/create-metrics.ts`

- **Line 9:** lib module importing from api ("import { getCache } from '../../cache.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 10:** lib module importing from api ("import { hasDatabaseConnection } from '../../database/index.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 11:** lib module importing from api ("import { useLogger } from '../../logger/index.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 12:** lib module importing from api ("import { redisConfigAvailable, useRedis } from '../../redis/index.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 13:** lib module importing from api ("import { getStorage } from '../../storage/index.js';"). According to DriftGuard's default rules, lib must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/permissions/lib/fetch-permissions.ts`

- **Line 3:** lib module importing from api ("import { extractRequiredDynamicVariableContextForPermissions } from '../utils/extract-required-dynamic-variable-context.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 4:** lib module importing from api ("import { fetchDynamicVariableData } from '../utils/fetch-dynamic-variable-data.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 5:** lib module importing from api ("import { fetchRawPermissions } from '../utils/fetch-raw-permissions.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 6:** lib module importing from api ("import { getPermissionsForShare } from '../utils/get-permissions-for-share.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 7:** lib module importing from api ("import { processPermissions } from '../utils/process-permissions.js';"). According to DriftGuard's default rules, lib must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/permissions/lib/fetch-policies.ts`

- **Line 3:** lib module importing from api ("import { filterPoliciesByIp } from '../utils/filter-policies-by-ip.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 4:** lib module importing from api ("import { withCache } from '../utils/with-cache.js';"). According to DriftGuard's default rules, lib must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/permissions/lib/fetch-roles-tree.ts`

- **Line 2:** lib module importing from api ("import { withCache } from '../utils/with-cache.js';"). According to DriftGuard's default rules, lib must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/permissions/lib/with-app-minimal-permissions.ts`

- **Line 4:** lib module importing from api ("import { filterItems } from '../../utils/filter-items.js';"). According to DriftGuard's default rules, lib must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/permissions/modules/process-ast/lib/extract-fields-from-children.ts`

- **Line 3:** lib module importing from api ("import { getUnaliasedFieldKey } from '../../../utils/get-unaliased-field-key.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 5:** lib module importing from api ("import { formatA2oKey } from '../utils/format-a2o-key.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 6:** lib module importing from api ("import { getInfoForPath } from '../utils/get-info-for-path.js';"). According to DriftGuard's default rules, lib must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/permissions/modules/process-ast/lib/extract-fields-from-query.ts`

- **Line 2:** lib module importing from api ("import { parseFilterKey } from '../../../../utils/parse-filter-key.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 4:** lib module importing from api ("import { extractPathsFromQuery } from '../utils/extract-paths-from-query.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 5:** lib module importing from api ("import { findRelatedCollection } from '../utils/find-related-collection.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 6:** lib module importing from api ("import { getInfoForPath } from '../utils/get-info-for-path.js';"). According to DriftGuard's default rules, lib must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/permissions/modules/process-ast/lib/get-cases.ts`

- **Line 3:** lib module importing from api ("import { dedupeAccess } from '../utils/dedupe-access.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 4:** lib module importing from api ("import { hasItemPermissions } from '../utils/has-item-permissions.js';"). According to DriftGuard's default rules, lib must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/permissions/modules/process-ast/lib/inject-cases.ts`

- **Line 3:** lib module importing from api ("import { getUnaliasedFieldKey } from '../../../utils/get-unaliased-field-key.js';"). According to DriftGuard's default rules, lib must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/permissions/modules/process-payload/lib/is-field-nullable.ts`

- **Line 2:** lib module importing from api ("import { GENERATE_SPECIAL } from '../../../../constants.js';"). According to DriftGuard's default rules, lib must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/permissions/modules/validate-access/lib/validate-item-access.ts`

- **Line 3:** lib module importing from api ("import { fetchPermittedAstRootFields } from '../../../../database/run-ast/modules/fetch-permitted-ast-root-fields.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 6:** lib module importing from api ("import { processAst } from '../../process-ast/process-ast.js';"). According to DriftGuard's default rules, lib must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/redis/lib/create-redis.ts`

- **Line 3:** lib module importing from api ("import { getConfigFromEnv } from '../../utils/get-config-from-env.js';"). According to DriftGuard's default rules, lib must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/access.ts`

- **Line 3:** service module importing from api ("import { clearSystemCache } from '../cache.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/assets.ts`

- **Line 28:** service module importing from api ("import { SUPPORTED_IMAGE_TRANSFORM_FORMATS } from '../constants.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 29:** service module importing from api ("import getDatabase from '../database/index.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 30:** service module importing from api ("import { useLogger } from '../logger/index.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 31:** service module importing from api ("import { validateAccess } from '../permissions/modules/validate-access/validate-access.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 32:** service module importing from api ("import { getStorage } from '../storage/index.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 33:** service module importing from api ("import { getMilliseconds } from '../utils/get-milliseconds.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 34:** service module importing from api ("import { isValidUuid } from '../utils/is-valid-uuid.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 35:** service module importing from api ("import * as TransformationUtils from '../utils/transformations.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/authentication.ts`

- **Line 15:** service module importing from api ("import { getAuthProvider } from '../auth.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 16:** service module importing from api ("import { DEFAULT_AUTH_PROVIDER } from '../constants.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 17:** service module importing from api ("import getDatabase from '../database/index.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 18:** service module importing from api ("import emitter from '../emitter.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 20:** service module importing from api ("import { fetchGlobalAccess } from '../permissions/modules/fetch-global-access/fetch-global-access.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 21:** service module importing from api ("import { RateLimiterRes, createRateLimiter } from '../rate-limiter.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 23:** service module importing from api ("import { getMilliseconds } from '../utils/get-milliseconds.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 24:** service module importing from api ("import { getSecret } from '../utils/get-secret.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 25:** service module importing from api ("import { stall } from '../utils/stall.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/collections.ts`

- **Line 21:** service module importing from api ("import { clearSystemCache, getCache } from '../cache.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 22:** service module importing from api ("import { ALIAS_TYPES } from '../constants.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 24:** service module importing from api ("import { getHelpers } from '../database/helpers/index.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 26:** service module importing from api ("import emitter from '../emitter.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 27:** service module importing from api ("import { fetchAllowedCollections } from '../permissions/modules/fetch-allowed-collections/fetch-allowed-collections.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 28:** service module importing from api ("import { validateAccess } from '../permissions/modules/validate-access/validate-access.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 30:** service module importing from api ("import { getSchema } from '../utils/get-schema.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 31:** service module importing from api ("import { shouldClearCache } from '../utils/should-clear-cache.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 32:** service module importing from api ("import { transaction } from '../utils/transaction.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/comments.ts`

- **Line 5:** service module importing from api ("import { useLogger } from '../logger/index.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 7:** service module importing from api ("import { fetchGlobalAccess } from '../permissions/modules/fetch-global-access/fetch-global-access.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 8:** service module importing from api ("import { validateAccess } from '../permissions/modules/validate-access/validate-access.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 9:** service module importing from api ("import { isValidUuid } from '../utils/is-valid-uuid.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 10:** service module importing from api ("import { Url } from '../utils/url.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 11:** service module importing from api ("import { userName } from '../utils/user-name.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/extensions.ts`

- **Line 8:** service module importing from api ("import getDatabase from '../database/index.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 9:** service module importing from api ("import { getExtensionManager } from '../extensions/index.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 10:** service module importing from api ("import { transaction } from '../utils/transaction.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/fields.ts`

- **Line 29:** service module importing from api ("import { clearSystemCache, getCache, getCacheValue, setCacheValue } from '../cache.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 30:** service module importing from api ("import { ALIAS_TYPES, ALLOWED_DB_DEFAULT_FUNCTIONS } from '../constants.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 31:** service module importing from api ("import { translateDatabaseError } from '../database/errors/translate.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 33:** service module importing from api ("import { getHelpers } from '../database/helpers/index.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 35:** service module importing from api ("import emitter from '../emitter.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 38:** service module importing from api ("import { validateAccess } from '../permissions/modules/validate-access/validate-access.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 39:** service module importing from api ("import getDefaultValue from '../utils/get-default-value.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 40:** service module importing from api ("import { getSystemFieldRowsWithAuthProviders } from '../utils/get-field-system-rows.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 41:** service module importing from api ("import getLocalType from '../utils/get-local-type.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 42:** service module importing from api ("import { getSchema } from '../utils/get-schema.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 43:** service module importing from api ("import { sanitizeColumn } from '../utils/sanitize-schema.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 44:** service module importing from api ("import { shouldClearCache } from '../utils/should-clear-cache.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 45:** service module importing from api ("import { transaction } from '../utils/transaction.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/files.ts`

- **Line 23:** service module importing from api ("import { RESUMABLE_UPLOADS } from '../constants.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 24:** service module importing from api ("import emitter from '../emitter.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 25:** service module importing from api ("import { useLogger } from '../logger/index.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 26:** service module importing from api ("import { validateAccess } from '../permissions/modules/validate-access/validate-access.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 27:** service module importing from api ("import { getAxios } from '../request/index.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 28:** service module importing from api ("import { getStorage } from '../storage/index.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/files/lib/extract-metadata.ts`

- **Line 2:** service module importing from api ("import { SUPPORTED_IMAGE_METADATA_FORMATS } from '../../../constants.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 3:** service module importing from api ("import { getStorage } from '../../../storage/index.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/files/utils/get-metadata.ts`

- **Line 8:** service module importing from api ("import { useLogger } from '../../../logger/index.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/flows.ts`

- **Line 2:** service module importing from api ("import { getFlowManager } from '../flows.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/folders.ts`

- **Line 2:** service module importing from api ("import { validateAccess } from '../permissions/modules/validate-access/validate-access.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/graphql/index.ts`

- **Line 15:** service module importing from api ("import getDatabase from '../../database/index.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 16:** service module importing from api ("import { getService } from '../../utils/get-service.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/graphql/resolvers/get-collection-type.ts`

- **Line 7:** service module importing from api ("import { getGraphQLType } from '../../../utils/get-graphql-type.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/graphql/resolvers/get-field-type.ts`

- **Line 7:** service module importing from api ("import { getGraphQLType } from '../../../utils/get-graphql-type.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/graphql/resolvers/get-relation-type.ts`

- **Line 7:** service module importing from api ("import { getGraphQLType } from '../../../utils/get-graphql-type.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/graphql/resolvers/mutation.ts`

- **Line 3:** service module importing from api ("import { getService } from '../../../utils/get-service.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/graphql/resolvers/system-global.ts`

- **Line 15:** service module importing from api ("import { clearSystemCache, getCache } from '../../../cache.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 16:** service module importing from api ("import { DEFAULT_AUTH_PROVIDER, REFRESH_COOKIE_OPTIONS, SESSION_COOKIE_OPTIONS } from '../../../constants.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 17:** service module importing from api ("import { rateLimiter } from '../../../middleware/rate-limiter-registration.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 18:** service module importing from api ("import { createDefaultAccountability } from '../../../permissions/utils/create-default-accountability.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 20:** service module importing from api ("import { generateHash } from '../../../utils/generate-hash.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 21:** service module importing from api ("import { getIPFromReq } from '../../../utils/get-ip-from-req.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 22:** service module importing from api ("import { getSecret } from '../../../utils/get-secret.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 23:** service module importing from api ("import isDirectusJWT from '../../../utils/is-directus-jwt.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 24:** service module importing from api ("import { verifyAccessJWT } from '../../../utils/jwt.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/graphql/resolvers/system.ts`

- **Line 14:** service module importing from api ("import getDatabase from '../../../database/index.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 15:** service module importing from api ("import { fetchAccountabilityCollectionAccess } from '../../../permissions/modules/fetch-accountability-collection-access/fetch-accountability-collection-access.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 16:** service module importing from api ("import { fetchAccountabilityPolicyGlobals } from '../../../permissions/modules/fetch-accountability-policy-globals/fetch-accountability-policy-globals.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/graphql/schema-cache.ts`

- **Line 4:** service module importing from api ("import { useBus } from '../../bus/index.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/graphql/schema/get-types.ts`

- **Line 10:** service module importing from api ("import { GENERATE_SPECIAL } from '../../../constants.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 11:** service module importing from api ("import { getGraphQLType } from '../../../utils/get-graphql-type.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/graphql/schema/index.ts`

- **Line 12:** service module importing from api ("import { fetchInconsistentFieldMap } from '../../../permissions/modules/fetch-inconsistent-field-map/fetch-inconsistent-field-map.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 13:** service module importing from api ("import { reduceSchema } from '../../../utils/reduce-schema.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/graphql/schema/parse-query.ts`

- **Line 4:** service module importing from api ("import { sanitizeQuery } from '../../../utils/sanitize-query.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 5:** service module importing from api ("import { validateQuery } from '../../../utils/validate-query.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/graphql/schema/read.ts`

- **Line 19:** service module importing from api ("import { getGraphQLType } from '../../../utils/get-graphql-type.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/graphql/subscription.ts`

- **Line 2:** service module importing from api ("import { useBus } from '../../bus/index.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 4:** service module importing from api ("import { getSchema } from '../../utils/get-schema.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 6:** service module importing from api ("import { getPayload } from '../../websocket/utils/items.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/graphql/utils/aggregate-query.ts`

- **Line 3:** service module importing from api ("import { sanitizeQuery } from '../../../utils/sanitize-query.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 4:** service module importing from api ("import { validateQuery } from '../../../utils/validate-query.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/graphql/utils/filter-replace-m2a.ts`

- **Line 3:** service module importing from api ("import { getRelationType } from '../../../utils/get-relation-type.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/graphql/utils/process-error.ts`

- **Line 4:** service module importing from api ("import { useLogger } from '../../../logger/index.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/graphql/utils/sanitize-gql-schema.ts`

- **Line 2:** service module importing from api ("import { useLogger } from '../../../logger/index.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/import-export.ts`

- **Line 37:** service module importing from api ("import getDatabase from '../database/index.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 38:** service module importing from api ("import emitter from '../emitter.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 39:** service module importing from api ("import { useLogger } from '../logger/index.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 40:** service module importing from api ("import { validateAccess } from '../permissions/modules/validate-access/validate-access.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 42:** service module importing from api ("import { getService } from '../utils/get-service.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 43:** service module importing from api ("import { transaction } from '../utils/transaction.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 44:** service module importing from api ("import { Url } from '../utils/url.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 45:** service module importing from api ("import { userName } from '../utils/user-name.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/items.ts`

- **Line 22:** service module importing from api ("import { getCache } from '../cache.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 23:** service module importing from api ("import { translateDatabaseError } from '../database/errors/translate.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 24:** service module importing from api ("import { getAstFromQuery } from '../database/get-ast-from-query/get-ast-from-query.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 25:** service module importing from api ("import { getHelpers } from '../database/helpers/index.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 27:** service module importing from api ("import { runAst } from '../database/run-ast/run-ast.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 28:** service module importing from api ("import emitter from '../emitter.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 29:** service module importing from api ("import { processAst } from '../permissions/modules/process-ast/process-ast.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 30:** service module importing from api ("import { processPayload } from '../permissions/modules/process-payload/process-payload.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 31:** service module importing from api ("import { validateAccess } from '../permissions/modules/validate-access/validate-access.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 32:** service module importing from api ("import { shouldClearCache } from '../utils/should-clear-cache.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 33:** service module importing from api ("import { transaction } from '../utils/transaction.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 34:** service module importing from api ("import { validateKeys } from '../utils/validate-keys.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 35:** service module importing from api ("import { validateUserCountIntegrity } from '../utils/validate-user-count-integrity.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 36:** service module importing from api ("import { handleVersion } from '../utils/versioning/handle-version.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/mail/index.ts`

- **Line 11:** service module importing from api ("import getDatabase from '../../database/index.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 12:** service module importing from api ("import emitter from '../../emitter.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 13:** service module importing from api ("import { useLogger } from '../../logger/index.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 14:** service module importing from api ("import getMailer from '../../mailer.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 15:** service module importing from api ("import { Url } from '../../utils/url.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/mail/rate-limiter.ts`

- **Line 3:** service module importing from api ("import { createRateLimiter } from '../../rate-limiter.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/meta.ts`

- **Line 4:** service module importing from api ("import getDatabase from '../database/index.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 9:** service module importing from api ("import { validateAccess } from '../permissions/modules/validate-access/validate-access.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/notifications.ts`

- **Line 3:** service module importing from api ("import { useLogger } from '../logger/index.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 5:** service module importing from api ("import { fetchGlobalAccess } from '../permissions/modules/fetch-global-access/fetch-global-access.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 6:** service module importing from api ("import { md } from '../utils/md.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 7:** service module importing from api ("import { Url } from '../utils/url.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/operations.ts`

- **Line 2:** service module importing from api ("import { getFlowManager } from '../flows.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/payload.ts`

- **Line 28:** service module importing from api ("import { getHelpers } from '../database/helpers/index.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 29:** service module importing from api ("import getDatabase from '../database/index.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 30:** service module importing from api ("import { generateHash } from '../utils/generate-hash.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 31:** service module importing from api ("import { decrypt, encrypt } from '../utils/encrypt.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 32:** service module importing from api ("import { getSecret } from '../utils/get-secret.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/permissions.ts`

- **Line 13:** service module importing from api ("import { clearSystemCache } from '../cache.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 18:** service module importing from api ("import { validateAccess } from '../permissions/modules/validate-access/validate-access.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/policies.ts`

- **Line 5:** service module importing from api ("import { clearSystemCache } from '../cache.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 6:** service module importing from api ("import { clearCache as clearPermissionsCache } from '../permissions/cache.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/relations.ts`

- **Line 20:** service module importing from api ("import { clearSystemCache, getCache, getCacheValue, setCacheValue } from '../cache.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 22:** service module importing from api ("import { getHelpers } from '../database/helpers/index.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 24:** service module importing from api ("import emitter from '../emitter.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 25:** service module importing from api ("import { fetchAllowedFieldMap } from '../permissions/modules/fetch-allowed-field-map/fetch-allowed-field-map.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 26:** service module importing from api ("import { fetchAllowedFields } from '../permissions/modules/fetch-allowed-fields/fetch-allowed-fields.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 27:** service module importing from api ("import { validateAccess } from '../permissions/modules/validate-access/validate-access.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 28:** service module importing from api ("import { getDefaultIndexName } from '../utils/get-default-index-name.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 29:** service module importing from api ("import { getSchema } from '../utils/get-schema.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 30:** service module importing from api ("import { transaction } from '../utils/transaction.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/roles.ts`

- **Line 4:** service module importing from api ("import { clearSystemCache } from '../cache.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 6:** service module importing from api ("import { transaction } from '../utils/transaction.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/schema.ts`

- **Line 10:** service module importing from api ("import getDatabase from '../database/index.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 12:** service module importing from api ("import { applyDiff } from '../utils/apply-diff.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 13:** service module importing from api ("import { getSnapshotDiff } from '../utils/get-snapshot-diff.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 14:** service module importing from api ("import { getSnapshot } from '../utils/get-snapshot.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 15:** service module importing from api ("import { getVersionedHash } from '../utils/get-versioned-hash.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 16:** service module importing from api ("import { validateApplyDiff } from '../utils/validate-diff.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 17:** service module importing from api ("import { validateSnapshot } from '../utils/validate-snapshot.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/server.ts`

- **Line 9:** service module importing from api ("import { getCache } from '../cache.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 10:** service module importing from api ("import { RESUMABLE_UPLOADS } from '../constants.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 12:** service module importing from api ("import { useLogger } from '../logger/index.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 13:** service module importing from api ("import getMailer from '../mailer.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 14:** service module importing from api ("import { rateLimiterGlobal } from '../middleware/rate-limiter-global.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 15:** service module importing from api ("import { rateLimiter } from '../middleware/rate-limiter-ip.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 16:** service module importing from api ("import { SERVER_ONLINE } from '../server.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 17:** service module importing from api ("import { getStorage } from '../storage/index.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 18:** service module importing from api ("import { getAllowedLogLevels } from '../utils/get-allowed-log-levels.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/settings.ts`

- **Line 3:** service module importing from api ("import { sendReport } from '../telemetry/index.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/shares.ts`

- **Line 8:** service module importing from api ("import { useLogger } from '../logger/index.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 9:** service module importing from api ("import { clearCache as clearPermissionsCache } from '../permissions/cache.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 10:** service module importing from api ("import { validateAccess } from '../permissions/modules/validate-access/validate-access.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 12:** service module importing from api ("import { getMilliseconds } from '../utils/get-milliseconds.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 13:** service module importing from api ("import { getSecret } from '../utils/get-secret.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 14:** service module importing from api ("import { md } from '../utils/md.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 15:** service module importing from api ("import { Url } from '../utils/url.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 16:** service module importing from api ("import { userName } from '../utils/user-name.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/specifications.ts`

- **Line 25:** service module importing from api ("import { OAS_REQUIRED_SCHEMAS } from '../constants.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 26:** service module importing from api ("import getDatabase from '../database/index.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 29:** service module importing from api ("import { fetchAllowedFieldMap } from '../permissions/modules/fetch-allowed-field-map/fetch-allowed-field-map.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 30:** service module importing from api ("import { getRelationType } from '../utils/get-relation-type.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 31:** service module importing from api ("import { reduceSchema } from '../utils/reduce-schema.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/tfa.ts`

- **Line 5:** service module importing from api ("import getDatabase from '../database/index.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 7:** service module importing from api ("import { DEFAULT_AUTH_PROVIDER } from '../constants.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/translations.ts`

- **Line 2:** service module importing from api ("import getDatabase from '../database/index.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/tus/data-store.ts`

- **Line 9:** service module importing from api ("import getDatabase from '../../database/index.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 10:** service module importing from api ("import { useLogger } from '../../logger/index.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/tus/lockers.ts`

- **Line 2:** service module importing from api ("import { useLock } from '../../lock/index.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/tus/server.ts`

- **Line 12:** service module importing from api ("import { RESUMABLE_UPLOADS } from '../../constants.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 13:** service module importing from api ("import { getStorage } from '../../storage/index.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 19:** service module importing from api ("import emitter from '../../emitter.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 20:** service module importing from api ("import getDatabase from '../../database/index.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 21:** service module importing from api ("import { getSchema } from '../../utils/get-schema.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/users.ts`

- **Line 19:** service module importing from api ("import { clearSystemCache } from '../cache.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 20:** service module importing from api ("import getDatabase from '../database/index.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 21:** service module importing from api ("import { useLogger } from '../logger/index.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 22:** service module importing from api ("import { validateRemainingAdminUsers } from '../permissions/modules/validate-remaining-admin/validate-remaining-admin-users.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 23:** service module importing from api ("import { createDefaultAccountability } from '../permissions/utils/create-default-accountability.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 24:** service module importing from api ("import { getSecret } from '../utils/get-secret.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 25:** service module importing from api ("import isUrlAllowed from '../utils/is-url-allowed.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 26:** service module importing from api ("import { verifyJWT } from '../utils/jwt.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 27:** service module importing from api ("import { stall } from '../utils/stall.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 28:** service module importing from api ("import { Url } from '../utils/url.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/utils.ts`

- **Line 5:** service module importing from api ("import { clearSystemCache, getCache } from '../cache.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 6:** service module importing from api ("import getDatabase from '../database/index.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 7:** service module importing from api ("import emitter from '../emitter.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 8:** service module importing from api ("import { fetchAllowedFields } from '../permissions/modules/fetch-allowed-fields/fetch-allowed-fields.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 9:** service module importing from api ("import { validateAccess } from '../permissions/modules/validate-access/validate-access.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 10:** service module importing from api ("import { shouldClearCache } from '../utils/should-clear-cache.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/versions.ts`

- **Line 15:** service module importing from api ("import { getCache } from '../cache.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 16:** service module importing from api ("import { getHelpers } from '../database/helpers/index.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 17:** service module importing from api ("import emitter from '../emitter.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 18:** service module importing from api ("import { validateAccess } from '../permissions/modules/validate-access/validate-access.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 19:** service module importing from api ("import { shouldClearCache } from '../utils/should-clear-cache.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 20:** service module importing from api ("import { splitRecursive } from '../utils/versioning/split-recursive.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 25:** service module importing from api ("import { deepMapWithSchema } from '../utils/versioning/deep-map-with-schema.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/services/websocket.ts`

- **Line 5:** service module importing from api ("import emitter from '../emitter.js';"). According to DriftGuard's default rules, service must not depend on api.
- **Line 6:** service module importing from api ("import { getWebSocketController } from '../websocket/controllers/index.js';"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/telemetry/lib/get-report.ts`

- **Line 3:** lib module importing from api ("import { getHelpers } from '../../database/helpers/index.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 4:** lib module importing from api ("import { getDatabase, getDatabaseClient } from '../../database/index.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 5:** lib module importing from api ("import { fetchUserCount } from '../../utils/fetch-user-count/fetch-user-count.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 7:** lib module importing from api ("import { getExtensionCount } from '../utils/get-extension-count.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 8:** lib module importing from api ("import { getFieldCount } from '../utils/get-field-count.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 9:** lib module importing from api ("import { getFilesizeSum } from '../utils/get-filesize-sum.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 10:** lib module importing from api ("import { getItemCount } from '../utils/get-item-count.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 11:** lib module importing from api ("import { getSettings } from '../utils/get-settings.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 12:** lib module importing from api ("import { getUserItemCount } from '../utils/get-user-item-count.js';"). According to DriftGuard's default rules, lib must not depend on api.

### `../../../audit_targets/batch_3/directus/api/src/telemetry/lib/track.ts`

- **Line 3:** lib module importing from api ("import { useLogger } from '../../logger/index.js';"). According to DriftGuard's default rules, lib must not depend on api.
- **Line 4:** lib module importing from api ("import { getRandomWaitTime } from '../utils/get-random-wait-time.js';"). According to DriftGuard's default rules, lib must not depend on api.

---

Generated by DriftGuard v0.4

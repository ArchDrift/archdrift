# 📋 DriftGuard Full Details

**Generated:** 3/1/2026, 4:42:05 pm

This document contains a line-by-line breakdown of every violation detected.

---

## Weighted Debt Calculation

**Weighted Debt Density:** 0.42 debt points per 1,000 lines of production code

**Severity Multipliers:**
- Layer Violations: ×10 (Fatal structural drift)
- N+1 Queries: ×2 (Core efficiency drift)
- God Classes: ×1 (Complexity drift)

**Production Code:** 229 violations (368 weighted debt) in 8,76,244 LOC

**Total Files:** 9100 (6402 production)

---

## Violations Summary

- **Layer Violations:** 2
- **N+1 Queries:** 104
- **God Classes:** 123

---

## 📦 God Class

### `../../../audit_targets/batch_3/n8n/packages/@n8n/db/src/repositories/execution.repository.ts`

- **Line 1:** Large Class detected (976 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/@n8n/db/src/repositories/workflow.repository.ts`

- **Line 1:** Large Class detected (833 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/cli/src/environments.ee/source-control/source-control-import.service.ee.ts`

- **Line 1:** Large Class detected (1173 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/cli/src/events/relays/telemetry.event-relay.ts`

- **Line 1:** Large Class detected (1019 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/cli/src/modules/chat-hub/chat-hub-workflow.service.ts`

- **Line 1:** Large Class detected (802 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/cli/src/modules/chat-hub/chat-hub.service.ts`

- **Line 1:** Large Class detected (1306 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/cli/src/sso.ee/saml/schema/ws-securitypolicy-1.2.xsd.ts`

- **Line 1:** Large Class detected (1154 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/core/src/execution-engine/node-execution-context/utils/request-helper-functions.ts`

- **Line 1:** Monolith detected (1505 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/n8n/packages/core/src/execution-engine/routing-node.ts`

- **Line 1:** Large Class detected (946 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/core/src/execution-engine/workflow-execute.ts`

- **Line 1:** Monolith detected (1935 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/n8n/packages/frontend/@n8n/design-system/src/components/AskAssistantChat/AskAssistantChat.stories.ts`

- **Line 1:** Large Class detected (1211 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/frontend/@n8n/design-system/src/v2/components/DropdownMenu/DropdownMenu.stories.ts`

- **Line 1:** Large Class detected (843 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/frontend/editor-ui/src/Interface.ts`

- **Line 1:** Large Class detected (829 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/frontend/editor-ui/src/app/composables/useCanvasOperations.ts`

- **Line 1:** Monolith detected (2350 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/n8n/packages/frontend/editor-ui/src/app/composables/useNodeHelpers.ts`

- **Line 1:** Large Class detected (890 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/frontend/editor-ui/src/app/composables/useWorkflowHelpers.ts`

- **Line 1:** Large Class detected (892 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/frontend/editor-ui/src/app/router.ts`

- **Line 1:** Large Class detected (1006 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/frontend/editor-ui/src/app/stores/workflows.store.ts`

- **Line 1:** Monolith detected (1736 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/n8n/packages/frontend/editor-ui/src/features/shared/editors/plugins/codemirror/completions/datatype.completions.ts`

- **Line 1:** Large Class detected (1325 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/frontend/editor-ui/src/features/shared/editors/plugins/codemirror/completions/nativesAutocompleteDocs/luxon.instance.docs.ts`

- **Line 1:** Large Class detected (1006 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/AgileCrm/CompanyDescription.ts`

- **Line 1:** Large Class detected (901 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/AgileCrm/ContactDescription.ts`

- **Line 1:** Large Class detected (1157 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Airtop/countries.ts`

- **Line 1:** Large Class detected (998 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Asana/Asana.node.ts`

- **Line 1:** Monolith detected (2134 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Aws/DynamoDB/ItemDescription.ts`

- **Line 1:** Large Class detected (865 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Aws/S3/V1/FileDescription.ts`

- **Line 1:** Large Class detected (823 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Aws/S3/V2/AwsS3V2.node.ts`

- **Line 1:** Large Class detected (953 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Aws/S3/V2/FileDescription.ts`

- **Line 1:** Large Class detected (823 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Aws/SES/AwsSes.node.ts`

- **Line 1:** Large Class detected (1194 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Beeminder/Beeminder.node.ts`

- **Line 1:** Large Class detected (1487 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Cisco/Webex/descriptions/MeetingDescription.ts`

- **Line 1:** Large Class detected (933 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/ClickUp/ClickUp.node.ts`

- **Line 1:** Monolith detected (1553 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/ClickUp/TaskDescription.ts`

- **Line 1:** Large Class detected (948 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Coda/Coda.node.ts`

- **Line 1:** Large Class detected (874 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Dropbox/Dropbox.node.ts`

- **Line 1:** Large Class detected (884 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/EditImage/EditImage.node.ts`

- **Line 1:** Large Class detected (1223 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Elastic/Elasticsearch/descriptions/DocumentDescription.ts`

- **Line 1:** Large Class detected (844 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Freshdesk/Freshdesk.node.ts`

- **Line 1:** Large Class detected (1269 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Freshservice/Freshservice.node.ts`

- **Line 1:** Large Class detected (885 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Ftp/Ftp.node.ts`

- **Line 1:** Large Class detected (866 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Ghost/PostDescription.ts`

- **Line 1:** Large Class detected (839 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Github/Github.node.ts`

- **Line 1:** Monolith detected (2622 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Gitlab/Gitlab.node.ts`

- **Line 1:** Monolith detected (1544 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Google/BusinessProfile/PostDescription.ts`

- **Line 1:** Large Class detected (978 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Google/Calendar/EventDescription.ts`

- **Line 1:** Large Class detected (1289 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Google/CloudStorage/ObjectDescription.ts`

- **Line 1:** Large Class detected (861 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Google/Contacts/ContactDescription.ts`

- **Line 1:** Large Class detected (1532 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Google/Docs/DocumentDescription.ts`

- **Line 1:** Large Class detected (973 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Google/Drive/v1/GoogleDriveV1.node.ts`

- **Line 1:** Monolith detected (2508 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Google/GSuiteAdmin/UserDescription.ts`

- **Line 1:** Large Class detected (1207 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Google/Sheet/v1/versionDescription.ts`

- **Line 1:** Large Class detected (859 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Google/YouTube/VideoDescription.ts`

- **Line 1:** Large Class detected (803 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Google/YouTube/YouTube.node.ts`

- **Line 1:** Large Class detected (886 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Harvest/Harvest.node.ts`

- **Line 1:** Large Class detected (940 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/HighLevel/v1/description/ContactDescription.ts`

- **Line 1:** Large Class detected (844 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/HighLevel/v2/description/ContactDescription.ts`

- **Line 1:** Large Class detected (860 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/HttpRequest/V1/HttpRequestV1.node.ts`

- **Line 1:** Large Class detected (1071 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/HttpRequest/V2/HttpRequestV2.node.ts`

- **Line 1:** Large Class detected (1149 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/HttpRequest/V3/Description.ts`

- **Line 1:** Large Class detected (1190 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/HttpRequest/V3/HttpRequestV3.node.ts`

- **Line 1:** Large Class detected (994 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Hubspot/V1/CompanyDescription.ts`

- **Line 1:** Large Class detected (1026 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Hubspot/V1/ContactDescription.ts`

- **Line 1:** Large Class detected (1027 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Hubspot/V1/GenericFunctions.ts`

- **Line 1:** Monolith detected (1977 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Hubspot/V1/HubspotV1.node.ts`

- **Line 1:** Monolith detected (2519 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Hubspot/V2/CompanyDescription.ts`

- **Line 1:** Large Class detected (1175 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Hubspot/V2/ContactDescription.ts`

- **Line 1:** Monolith detected (4919 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Hubspot/V2/DealDescription.ts`

- **Line 1:** Large Class detected (1010 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Hubspot/V2/GenericFunctions.ts`

- **Line 1:** Monolith detected (1973 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Hubspot/V2/HubspotV2.node.ts`

- **Line 1:** Monolith detected (2980 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/InvoiceNinja/InvoiceNinja.node.ts`

- **Line 1:** Large Class detected (1272 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/ItemLists/V1/ItemListsV1.node.ts`

- **Line 1:** Large Class detected (1273 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/ItemLists/V2/ItemListsV2.node.ts`

- **Line 1:** Large Class detected (1308 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Jira/IssueDescription.ts`

- **Line 1:** Large Class detected (1256 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Jira/Jira.node.ts`

- **Line 1:** Large Class detected (1353 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Magento/GenericFunctions.ts`

- **Line 1:** Large Class detected (944 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Mailchimp/Mailchimp.node.ts`

- **Line 1:** Monolith detected (2092 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Mandrill/Mandrill.node.ts`

- **Line 1:** Large Class detected (869 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Mautic/ContactDescription.ts`

- **Line 1:** Large Class detected (1269 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Mautic/Mautic.node.ts`

- **Line 1:** Large Class detected (934 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Microsoft/Entra/descriptions/GroupDescription.ts`

- **Line 1:** Large Class detected (1160 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Microsoft/Entra/descriptions/UserDescription.ts`

- **Line 1:** Monolith detected (2087 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Microsoft/Outlook/v1/MicrosoftOutlookV1.node.ts`

- **Line 1:** Large Class detected (973 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Microsoft/Storage/descriptions/BlobDescription.ts`

- **Line 1:** Large Class detected (1364 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Nasa/Nasa.node.ts`

- **Line 1:** Large Class detected (1057 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/NextCloud/NextCloud.node.ts`

- **Line 1:** Large Class detected (1118 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Notion/shared/GenericFunctions.ts`

- **Line 1:** Large Class detected (1114 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Notion/shared/descriptions/DatabasePageDescription.ts`

- **Line 1:** Large Class detected (1401 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/OneSimpleApi/OneSimpleApi.node.ts`

- **Line 1:** Large Class detected (832 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Onfleet/Onfleet.ts`

- **Line 1:** Large Class detected (1057 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Oracle/Sql/helpers/utils.ts`

- **Line 1:** Large Class detected (937 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Pipedrive/Pipedrive.node.ts`

- **Line 1:** Monolith detected (4329 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/QuickBooks/QuickBooks.node.ts`

- **Line 1:** Large Class detected (821 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Salesforce/AccountDescription.ts`

- **Line 1:** Large Class detected (864 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Salesforce/ContactDescription.ts`

- **Line 1:** Large Class detected (975 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Salesforce/LeadDescription.ts`

- **Line 1:** Large Class detected (949 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Salesforce/Salesforce.node.ts`

- **Line 1:** Monolith detected (2885 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Salesforce/TaskDescription.ts`

- **Line 1:** Large Class detected (891 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/ServiceNow/ServiceNow.node.ts`

- **Line 1:** Large Class detected (1075 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Shopify/OrderDescription.ts`

- **Line 1:** Large Class detected (897 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Slack/V1/ChannelDescription.ts`

- **Line 1:** Large Class detected (822 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Slack/V1/MessageDescription.ts`

- **Line 1:** Large Class detected (1577 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Slack/V1/SlackV1.node.ts`

- **Line 1:** Large Class detected (1239 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Slack/V2/MessageDescription.ts`

- **Line 1:** Large Class detected (1115 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Slack/V2/SlackV2.node.ts`

- **Line 1:** Large Class detected (1317 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Spotify/Spotify.node.ts`

- **Line 1:** Large Class detected (1116 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Stripe/StripeTrigger.node.ts`

- **Line 1:** Large Class detected (934 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Telegram/Telegram.node.ts`

- **Line 1:** Monolith detected (1933 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/TheHive/TheHive.node.ts`

- **Line 1:** Monolith detected (1528 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/TheHive/descriptions/AlertDescription.ts`

- **Line 1:** Large Class detected (902 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/TheHive/descriptions/CaseDescription.ts`

- **Line 1:** Large Class detected (832 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Todoist/v2/OperationHandler.ts`

- **Line 1:** Large Class detected (825 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Todoist/v2/TodoistV2.node.ts`

- **Line 1:** Monolith detected (1971 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/UProc/Json/Tools.ts`

- **Line 1:** Monolith detected (7966 code lines in type/schema definition file). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/WhatsApp/MessagesDescription.ts`

- **Line 1:** Monolith detected (1529 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/WooCommerce/OrderDescription.ts`

- **Line 1:** Monolith detected (1574 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/WooCommerce/ProductDescription.ts`

- **Line 1:** Large Class detected (1347 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Wordpress/PostDescription.ts`

- **Line 1:** Large Class detected (941 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Xero/InvoiceDescription.ts`

- **Line 1:** Large Class detected (833 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Zoho/ZohoCrm.node.ts`

- **Line 1:** Large Class detected (819 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/utils/ISOCountryCodes.ts`

- **Line 1:** Monolith detected (1587 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/n8n/packages/workflow/src/interfaces.ts`

- **Line 1:** Monolith detected (2644 code lines in type/schema definition file). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/n8n/packages/workflow/src/node-helpers.ts`

- **Line 1:** Large Class detected (1426 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/n8n/packages/workflow/src/workflow-data-proxy.ts`

- **Line 1:** Large Class detected (1242 code lines). Consider splitting into smaller modules.

## ⚡ N+1 Query

### `../../../audit_targets/batch_3/n8n/packages/@n8n/db/src/migrations/common/1742918400000-AddScopesColumnToApiKeys.ts`

- **Line 34:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/n8n/packages/@n8n/db/src/migrations/migration-helpers.ts`

- **Line 172:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/n8n/packages/@n8n/db/src/migrations/mysqldb/1623936588000-CertifyCorrectCollation.ts`

- **Line 30:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/n8n/packages/@n8n/db/src/migrations/mysqldb/1681134145996-AddUserActivatedProperty.ts`

- **Line 27:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/n8n/packages/@n8n/db/src/migrations/mysqldb/1761830340990-AddToolsColumnToChatHubTables.ts`

- **Line 23:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/n8n/packages/@n8n/db/src/migrations/postgresdb/1681134145996-AddUserActivatedProperty.ts`

- **Line 22:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/n8n/packages/@n8n/db/src/migrations/sqlite/1681134145996-AddUserActivatedProperty.ts`

- **Line 22:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/n8n/packages/@n8n/db/src/migrations/sqlite/1690000000020-FixMissingIndicesFromStringIdMigration.ts`

- **Line 10:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 18:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 22:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/n8n/packages/@n8n/db/src/repositories/execution.repository.ts`

- **Line 401:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/n8n/packages/@n8n/db/src/services/auth.roles.service.ts`

- **Line 76:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 88:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 158:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/n8n/packages/@n8n/db/src/subscribers/user-subscriber.ts`

- **Line 57:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/n8n/packages/@n8n/nodes-langchain/nodes/agents/OpenAiAssistant/OpenAiAssistant.node.ts`

- **Line 362:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/n8n/packages/@n8n/nodes-langchain/nodes/vendors/OpenAi/v1/actions/assistant/message.operation.ts`

- **Line 267:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/n8n/packages/@n8n/task-runner/src/task-runner.ts`

- **Line 602:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 609:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/n8n/packages/cli/src/commands/ldap/reset.ts`

- **Line 120:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 124:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/n8n/packages/cli/src/controllers/e2e.controller.ts`

- **Line 295:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 297:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 299:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/n8n/packages/cli/src/controllers/users.controller.ts`

- **Line 286:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 290:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/n8n/packages/cli/src/credentials/credentials.controller.ts`

- **Line 356:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/n8n/packages/cli/src/credentials/credentials.service.ts`

- **Line 783:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 927:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/n8n/packages/cli/src/environments.ee/source-control/source-control-export.service.ee.ts`

- **Line 140:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 495:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/n8n/packages/cli/src/environments.ee/source-control/source-control-import.service.ee.ts`

- **Line 805:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 896:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 972:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1017:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1036:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1115:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1123:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1128:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1165:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1171:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1177:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1183:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1193:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1204:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/n8n/packages/cli/src/executions/execution-recovery.service.ts`

- **Line 62:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 87:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/n8n/packages/cli/src/ldap.ee/helpers.ee.ts`

- **Line 199:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 206:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 222:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 225:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/n8n/packages/cli/src/mfa/mfa.service.ts`

- **Line 117:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/n8n/packages/cli/src/modules/breaking-changes/breaking-changes.service.ts`

- **Line 190:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/n8n/packages/cli/src/modules/community-packages/installed-packages.repository.ts`

- **Line 45:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/n8n/packages/cli/src/modules/data-table/data-table.repository.ts`

- **Line 136:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 164:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/n8n/packages/cli/src/modules/provisioning.ee/provisioning.service.ee.ts`

- **Line 247:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/n8n/packages/cli/src/services/export.service.ts`

- **Line 171:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/n8n/packages/cli/src/services/import.service.ts`

- **Line 465:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/n8n/packages/cli/src/services/project.service.ee.ts`

- **Line 154:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 171:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/n8n/packages/cli/src/services/public-api-key.service.ts`

- **Line 234:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/n8n/packages/cli/src/services/user.service.ts`

- **Line 319:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/n8n/packages/cli/src/workflows/workflow.service.ee.ts`

- **Line 527:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/n8n/packages/cli/src/workflows/workflows.controller.ts`

- **Line 653:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/n8n/packages/frontend/@n8n/rest-api-client/src/api/nodeTypes.ts`

- **Line 25:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/n8n/packages/frontend/editor-ui/src/features/execution/executions/executions.utils.ts`

- **Line 162:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Ftp/Ftp.node.ts`

- **Line 700:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 826:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Git/Git.node.ts`

- **Line 436:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Merge/v3/actions/mode/combineBySql.ts`

- **Line 156:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 157:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 273:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 274:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Microsoft/Sql/GenericFunctions.ts`

- **Line 170:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 197:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 226:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/MongoDb/MongoDb.node.ts`

- **Line 84:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 438:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 439:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 466:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 496:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 528:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/MySql/v1/MySqlV1.node.ts`

- **Line 317:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 401:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/MySql/v2/helpers/utils.ts`

- **Line 395:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 440:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Oracle/Sql/helpers/utils.ts`

- **Line 509:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 561:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 565:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 837:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 880:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 882:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 883:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1049:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1051:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1052:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1054:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/n8n/packages/nodes-base/nodes/Postgres/v1/genericFunctions.ts`

- **Line 538:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 547:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 573:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 667:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 677:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 705:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

## 🚫 Layer Violation

### `../../../audit_targets/batch_3/n8n/packages/frontend/editor-ui/src/features/core/folders/folders.store.ts`

- **Line 13:** domain module importing from api ("import * as workflowsApi from '@/app/api/workflows';"). According to DriftGuard's default rules, domain must not depend on api.
- **Line 14:** domain module importing from api ("import * as workflowsEEApi from '@/app/api/workflows.ee';"). According to DriftGuard's default rules, domain must not depend on api.

---

Generated by DriftGuard v0.4

# 📋 DriftGuard Full Details

**Generated:** 3/1/2026, 4:44:49 pm

This document contains a line-by-line breakdown of every violation detected.

---

## Weighted Debt Calculation

**Weighted Debt Density:** 1.99 debt points per 1,000 lines of production code

**Severity Multipliers:**
- Layer Violations: ×10 (Fatal structural drift)
- N+1 Queries: ×2 (Core efficiency drift)
- God Classes: ×1 (Complexity drift)

**Production Code:** 328 violations (757 weighted debt) in 3,80,542 LOC

**Total Files:** 6906 (4906 production)

---

## Violations Summary

- **Layer Violations:** 19
- **N+1 Queries:** 271
- **God Classes:** 38

---

## 📦 God Class

### `../../../audit_targets/batch_3/calcom/apps/api/v2/src/ee/bookings/2024-08-13/controllers/e2e/booking-fields.e2e-spec.ts`

- **Line 1:** Large Class detected (1141 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/calcom/apps/api/v2/src/ee/bookings/2024-08-13/controllers/e2e/managed-user-bookings.e2e-spec.ts`

- **Line 1:** Large Class detected (820 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/calcom/apps/api/v2/src/ee/bookings/2024-08-13/controllers/e2e/team-bookings.e2e-spec.ts`

- **Line 1:** Large Class detected (977 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/calcom/apps/api/v2/src/ee/bookings/2024-08-13/controllers/e2e/user-bookings.e2e-spec.ts`

- **Line 1:** Monolith detected (2925 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/calcom/apps/api/v2/src/ee/bookings/2024-08-13/services/bookings.service.ts`

- **Line 1:** Large Class detected (1061 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/calcom/apps/api/v2/src/ee/event-types/event-types_2024_06_14/controllers/event-types.controller.e2e-spec.ts`

- **Line 1:** Monolith detected (2779 code lines in type/schema definition file). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/calcom/apps/api/v2/src/modules/oauth-clients/controllers/oauth-client-users/oauth-client-users.controller.e2e-spec.ts`

- **Line 1:** Large Class detected (889 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/calcom/apps/api/v2/src/modules/organizations/event-types/organizations-admin-not-team-member-event-types.e2e-spec.ts`

- **Line 1:** Large Class detected (1113 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/calcom/apps/api/v2/src/modules/organizations/event-types/organizations-member-team-admin-event-types.e2e-spec.ts`

- **Line 1:** Large Class detected (1259 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/calcom/apps/api/v2/src/modules/organizations/routing-forms/controllers/organizations-routing-forms-responses.controller.e2e-spec.ts`

- **Line 1:** Large Class detected (849 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/calcom/apps/api/v2/src/modules/organizations/teams/workflows/controllers/org-team-workflows.controller.e2e-spec.ts`

- **Line 1:** Large Class detected (873 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/calcom/apps/api/v2/src/modules/slots/slots-2024-09-04/controllers/e2e/user-event-type-slots.controller.e2e-spec.ts`

- **Line 1:** Large Class detected (1715 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/calcom/apps/api/v2/src/modules/teams/event-types/controllers/teams-event-types.controller.e2e-spec.ts`

- **Line 1:** Large Class detected (1178 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/calcom/companion/extension/lib/google-calendar.ts`

- **Line 1:** Large Class detected (1061 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/calcom/companion/extension/lib/linkedin.ts`

- **Line 1:** Large Class detected (812 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/calcom/packages/app-store/salesforce/lib/CrmService.ts`

- **Line 1:** Large Class detected (1410 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/calcom/packages/embeds/embed-core/src/embed.ts`

- **Line 1:** Large Class detected (1281 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/calcom/packages/features/auth/lib/next-auth-options.ts`

- **Line 1:** Large Class detected (1037 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/calcom/packages/features/bookings/lib/EventManager.ts`

- **Line 1:** Large Class detected (1059 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/calcom/packages/features/bookings/lib/getLuckyUser.ts`

- **Line 1:** Large Class detected (1008 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/calcom/packages/features/bookings/lib/service/RegularBookingService.ts`

- **Line 1:** Monolith detected (2465 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/calcom/packages/features/bookings/repositories/BookingRepository.ts`

- **Line 1:** Monolith detected (1776 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/calcom/packages/features/ee/teams/services/teamService.integration-test.ts`

- **Line 1:** Large Class detected (838 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/calcom/packages/features/ee/workflows/repositories/WorkflowRepository.ts`

- **Line 1:** Large Class detected (855 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/calcom/packages/features/embed/Embed.tsx`

- **Line 1:** Large Class detected (1372 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/calcom/packages/features/eventtypes/repositories/eventTypeRepository.ts`

- **Line 1:** Large Class detected (1748 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/calcom/packages/features/form-builder/FormBuilder.tsx`

- **Line 1:** Large Class detected (959 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/calcom/packages/features/insights/services/InsightsBookingBaseService.ts`

- **Line 1:** Large Class detected (1116 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/calcom/packages/features/insights/services/InsightsRoutingBaseService.ts`

- **Line 1:** Large Class detected (907 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/calcom/packages/features/insights/services/InsightsRoutingService.integration-test.ts`

- **Line 1:** Large Class detected (1450 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/calcom/packages/features/profile/repositories/ProfileRepository.ts`

- **Line 1:** Large Class detected (929 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/calcom/packages/features/users/repositories/UserRepository.ts`

- **Line 1:** Large Class detected (1189 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/calcom/packages/features/watchlist/lib/freeEmailDomainCheck/freeEmailDomains.ts`

- **Line 1:** Monolith detected (4767 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_3/calcom/packages/platform/types/event-types/event-types_2024_06_14/inputs/booking-fields.input.ts`

- **Line 1:** Large Class detected (869 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/calcom/packages/prisma/zod-utils.ts`

- **Line 1:** Large Class detected (904 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/calcom/packages/trpc/server/routers/viewer/bookings/get.handler.ts`

- **Line 1:** Large Class detected (1032 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/calcom/packages/trpc/server/routers/viewer/slots/util.ts`

- **Line 1:** Large Class detected (1319 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_3/calcom/packages/trpc/server/routers/viewer/teams/inviteMember/utils.ts`

- **Line 1:** Large Class detected (904 code lines). Consider splitting into smaller modules.

## ⚡ N+1 Query

### `../../../audit_targets/batch_3/calcom/apps/api/v2/src/app.e2e-spec.ts`

- **Line 146:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 189:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 237:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 255:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 355:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/apps/api/v2/src/ee/event-types/event-types_2024_06_14/controllers/event-types.controller.e2e-spec.ts`

- **Line 2936:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 2939:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 2954:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/apps/api/v2/src/modules/organizations/event-types/services/output.service.ts`

- **Line 171:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/apps/api/v2/src/modules/organizations/users/index/controllers/organizations-users.e2e-spec.ts`

- **Line 502:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/apps/api/v2/src/modules/teams/event-types/controllers/teams-event-types.controller.e2e-spec.ts`

- **Line 1040:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1090:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1140:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1191:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1242:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/apps/web/playwright/lib/orgMigration.ts`

- **Line 359:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 486:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 514:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 567:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 633:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 661:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/app-store/dailyvideo/lib/scripts/deleteRecordings.ts`

- **Line 83:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 250:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/app-store/ics-feedcalendar/lib/CalendarService.ts`

- **Line 84:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/app-store/office365calendar/api/callback.ts`

- **Line 88:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/app-store/office365video/api/callback.ts`

- **Line 100:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/app-store/pipedrive-crm/lib/CrmService.ts`

- **Line 69:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 99:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/app-store/routing-forms/api/responses/[formId].ts`

- **Line 25:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/app-store/routing-forms/lib/getSerializableForm.ts`

- **Line 70:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 115:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/app-store/salesforce/lib/CrmService.ts`

- **Line 704:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 763:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 769:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 772:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 797:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1486:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/app-store/tandemvideo/api/callback.ts`

- **Line 59:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/app-store/webex/api/callback.ts`

- **Line 83:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/app-store/zoomvideo/api/callback.ts`

- **Line 75:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/emails/templates/attendee-daily-video-download-transcript-email.ts`

- **Line 27:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/emails/templates/organizer-daily-video-download-transcript-email.ts`

- **Line 26:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/features/bookingReference/repositories/BookingReferenceRepository.ts`

- **Line 42:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/features/bookings/lib/EventManager.ts`

- **Line 741:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 912:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 914:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 915:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 916:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 917:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 918:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 919:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 920:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 921:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 922:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 923:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 924:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1128:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1130:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1131:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1132:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1133:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1134:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1135:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1136:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1137:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1138:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1139:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1140:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/features/bookings/lib/getBookingFields.ts`

- **Line 326:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 389:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/features/bookings/lib/handleConfirmation.ts`

- **Line 203:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/features/bookings/lib/handleSeats/reschedule/owner/combineTwoSeatedBookings.ts`

- **Line 63:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/features/bookings/repositories/BookingRepository.ts`

- **Line 1194:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/features/conferencing/lib/videoClient.ts`

- **Line 70:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/features/credentials/handleDeleteCredential.ts`

- **Line 128:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 143:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 150:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 167:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 168:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 196:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 197:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 215:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 290:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 304:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 311:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 318:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 395:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 464:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/features/data-table/repositories/filterSegment.ts`

- **Line 64:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/features/ee/billing/api/webhook/_checkout.session.completed.ts`

- **Line 35:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/features/ee/dsync/lib/assignValueToUser.ts`

- **Line 51:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/features/ee/dsync/lib/handleGroupEvents.ts`

- **Line 127:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 161:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/features/ee/managed-event-types/lib/handleChildrenEventTypes.ts`

- **Line 72:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 216:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 218:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 219:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 220:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 221:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 222:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 241:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 309:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 323:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 346:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/features/ee/managed-event-types/reassignment/managedEventManualReassignment.integration-test.ts`

- **Line 70:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 144:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 147:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 150:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 153:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/features/ee/managed-event-types/reassignment/managedEventReassignment.integration-test.ts`

- **Line 83:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 162:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 165:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 168:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 171:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/features/ee/organizations/lib/service/AdminOrganizationUpdateService.ts`

- **Line 85:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/features/ee/teams/lib/queries.ts`

- **Line 450:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 451:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 452:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 453:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 454:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 455:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 495:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 502:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 523:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 628:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/features/ee/workflows/api/scheduleEmailReminders.ts`

- **Line 90:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 203:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 295:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 399:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 487:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/features/ee/workflows/api/scheduleSMSReminders.ts`

- **Line 111:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 211:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 221:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 228:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 239:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/features/ee/workflows/api/scheduleWhatsappReminders.ts`

- **Line 146:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 156:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 163:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/features/ee/workflows/lib/deleteRemindersOfActiveOnIds.ts`

- **Line 14:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/features/ee/workflows/lib/getWorkflowReminders.ts`

- **Line 66:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 79:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/features/ee/workflows/lib/service/EmailWorkflowService.ts`

- **Line 193:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/features/ee/workflows/repositories/WorkflowRepository.ts`

- **Line 183:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 355:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/features/eventTypeTranslation/repositories/EventTypeTranslationRepository.ts`

- **Line 22:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 47:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/features/eventtypes/lib/bookingFieldsManager.ts`

- **Line 141:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/features/handleMarkNoShow.ts`

- **Line 126:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 377:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/features/insights/server/buildBaseWhereCondition.ts`

- **Line 64:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/features/insights/services/InsightsBookingBaseService.ts`

- **Line 465:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 875:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 938:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/features/insights/services/InsightsBookingService.integration-test.ts`

- **Line 108:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 123:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 133:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 160:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 167:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 174:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/features/insights/services/InsightsRoutingBaseService.ts`

- **Line 178:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 404:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 405:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 798:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 804:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/features/insights/services/InsightsRoutingService.integration-test.ts`

- **Line 154:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 166:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 175:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 191:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 196:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 201:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 971:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/features/profile/repositories/ProfileRepository.ts`

- **Line 343:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/features/tasker/tasks/scanWorkflowBody.ts`

- **Line 67:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 97:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 121:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/features/tasker/tasks/triggerNoShow/triggerGuestNoShow.ts`

- **Line 19:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 28:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/features/tasker/tasks/triggerNoShow/triggerHostNoShow.ts`

- **Line 15:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 26:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/features/webhooks/lib/handleWebhookScheduledTriggers.ts`

- **Line 48:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 67:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 79:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/features/webhooks/lib/scheduleTrigger.ts`

- **Line 626:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/lib/CloseComeUtils.ts`

- **Line 37:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 117:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 128:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 177:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 209:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/prisma/cleanup-pbac.ts`

- **Line 52:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 60:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 68:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/trpc/server/routers/apps/routing-forms/formMutation.handler.ts`

- **Line 203:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 230:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 268:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 276:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 299:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/trpc/server/routers/loggedInViewer/eventTypeOrder.handler.ts`

- **Line 57:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/trpc/server/routers/loggedInViewer/routingFormOrder.handler.ts`

- **Line 62:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/trpc/server/routers/viewer/apps/queryForDependencies.handler.ts`

- **Line 23:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/trpc/server/routers/viewer/apps/toggle.handler.ts`

- **Line 125:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/trpc/server/routers/viewer/attributes/assignUserToAttribute.handler.ts`

- **Line 57:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 111:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 132:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 144:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 167:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 186:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 208:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/trpc/server/routers/viewer/attributes/bulkAssignAttributes.handler.ts`

- **Line 58:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/trpc/server/routers/viewer/attributes/edit.handler.ts`

- **Line 168:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/trpc/server/routers/viewer/availability/calendarOverlay.handler.ts`

- **Line 33:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/trpc/server/routers/viewer/availability/team/listTeamAvailability.handler.ts`

- **Line 258:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/trpc/server/routers/viewer/bookings/get.handler.ts`

- **Line 471:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 661:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 763:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 881:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 946:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 992:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/trpc/server/routers/viewer/eventTypes/getEventTypesFromGroup.handler.ts`

- **Line 155:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/trpc/server/routers/viewer/eventTypes/getEventTypesFromGroup.integration-test.ts`

- **Line 158:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/trpc/server/routers/viewer/eventTypes/heavy/update.handler.ts`

- **Line 441:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 455:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 675:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/trpc/server/routers/viewer/me/updateProfile.handler.ts`

- **Line 201:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 343:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 355:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 374:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 386:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/trpc/server/routers/viewer/ooo/outOfOffice.utils.ts`

- **Line 20:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/trpc/server/routers/viewer/ooo/outOfOfficeEntriesList.handler.ts`

- **Line 50:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/trpc/server/routers/viewer/organizations/adminDelete.handler.ts`

- **Line 51:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 74:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 97:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/trpc/server/routers/viewer/organizations/adminVerify.handler.ts`

- **Line 78:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 79:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/trpc/server/routers/viewer/organizations/listMembers.handler.ts`

- **Line 288:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/trpc/server/routers/viewer/organizations/utils.ts`

- **Line 101:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/trpc/server/routers/viewer/slots/reserveSlot.handler.ts`

- **Line 84:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/trpc/server/routers/viewer/teams/getUserConnectedApps.handler.ts`

- **Line 125:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/trpc/server/routers/viewer/teams/hasActiveTeamPlan.handler.ts`

- **Line 35:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/trpc/server/routers/viewer/teams/inviteMember/inviteMember.handler.integration-test.ts`

- **Line 148:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 150:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 154:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 160:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 166:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 170:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/trpc/server/routers/viewer/teams/inviteMember/utils.ts`

- **Line 206:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 237:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 238:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 322:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 345:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 402:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 730:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 899:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 911:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/trpc/server/routers/viewer/teams/removeHostsFromEventTypes.handler.ts`

- **Line 40:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/trpc/server/routers/viewer/teams/updateInternalNotesPresets.handler.ts`

- **Line 55:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 70:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 82:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/trpc/server/routers/viewer/workflows/activateEventType.handler.ts`

- **Line 178:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 201:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 209:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 222:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 231:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 250:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 276:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 490:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/trpc/server/routers/viewer/workflows/update.handler.ts`

- **Line 478:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/trpc/server/routers/viewer/workflows/util.ts`

- **Line 233:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 248:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 280:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_3/calcom/packages/trpc/server/routers/viewer/workflows/workflowOrder.handler.ts`

- **Line 91:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

## 🚫 Layer Violation

### `../../../audit_targets/batch_3/calcom/apps/api/v2/src/ee/calendars/services/outlook.service.ts`

- **Line 2:** service module importing from api ("import { CalendarState } from "@/ee/calendars/controllers/calendars.controller";"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/calcom/apps/api/v2/src/lib/extract-user-context.ts`

- **Line 5:** lib module importing from api ("import { ApiAuthGuardUser } from "../modules/auth/strategies/api-auth/api-auth.strategy";"). According to DriftGuard's default rules, lib must not depend on api.

### `../../../audit_targets/batch_3/calcom/apps/api/v2/src/modules/atoms/services/attributes-atom.service.ts`

- **Line 7:** service module importing from api ("import { FindTeamMembersMatchingAttributeQueryDto } from "../inputs/find-team-members-matching-attribute.input";"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/calcom/apps/api/v2/src/modules/cal-unified-calendars/services/google-calendar.service.ts`

- **Line 13:** service module importing from api ("import { UpdateUnifiedCalendarEventInput } from "../inputs/update-unified-calendar-event.input";"). According to DriftGuard's default rules, service must not depend on api.
- **Line 14:** service module importing from api ("import { GoogleCalendarEventInputPipe } from "../pipes/google-calendar-event-input-pipe";"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/calcom/apps/api/v2/src/modules/conferencing/services/conferencing.service.ts`

- **Line 1:** service module importing from api ("import { OAuthCallbackState } from "@/modules/conferencing/controllers/conferencing.controller";"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/calcom/apps/api/v2/src/modules/conferencing/services/office365-video.service.ts`

- **Line 2:** service module importing from api ("import { OAuthCallbackState } from "@/modules/conferencing/controllers/conferencing.controller";"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/calcom/apps/api/v2/src/modules/conferencing/services/zoom-video.service.ts`

- **Line 2:** service module importing from api ("import { OAuthCallbackState } from "@/modules/conferencing/controllers/conferencing.controller";"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/calcom/apps/api/v2/src/modules/oauth-clients/services/oauth-clients-users-output.service.ts`

- **Line 1:** service module importing from api ("import { ManagedUserOutput } from "@/modules/oauth-clients/controllers/oauth-client-users/outputs/managed-user.output";"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/calcom/apps/api/v2/src/modules/oauth-clients/services/oauth-clients-users.service.ts`

- **Line 5:** service module importing from api ("import { GetManagedUsersInput } from "@/modules/oauth-clients/controllers/oauth-client-users/inputs/get-managed-users.input";"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/calcom/apps/api/v2/src/modules/oauth-clients/services/oauth-clients/oauth-clients.service.ts`

- **Line 5:** service module importing from api ("import { OAuthClientRepository } from "../../oauth-client.repository";"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/calcom/apps/api/v2/src/modules/organizations/conferencing/services/organizations-conferencing.service.ts`

- **Line 1:** service module importing from api ("import { OAuthCallbackState } from "@/modules/conferencing/controllers/conferencing.controller";"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/calcom/apps/api/v2/src/modules/organizations/memberships/services/organizations-membership.service.ts`

- **Line 8:** service module importing from api ("import { UpdateOrgMembershipDto } from "../inputs/update-organization-membership.input";"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/calcom/apps/api/v2/src/modules/organizations/teams/routing-forms/services/organizations-teams-routing-forms-responses.service.ts`

- **Line 8:** service module importing from api ("import { OrganizationsTeamsRoutingFormsResponsesRepository } from "../repositories/organizations-teams-routing-forms-responses.repository";"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/calcom/apps/api/v2/src/modules/organizations/teams/routing-forms/services/organizations-teams-routing-forms.service.ts`

- **Line 3:** service module importing from api ("import { OrganizationsTeamsRoutingFormsRepository } from "../repositories/organizations-teams-routing-forms.repository";"). According to DriftGuard's default rules, service must not depend on api.

### `../../../audit_targets/batch_3/calcom/packages/app-store/office365video/lib/VideoApiAdapter.ts`

- **Line 18:** lib module importing from api ("import { OFFICE365_VIDEO_SCOPES } from "../api/add";"). According to DriftGuard's default rules, lib must not depend on api.

### `../../../audit_targets/batch_3/calcom/packages/features/pbac/infrastructure/repositories/PermissionRepository.ts`

- **Line 6:** infra module importing from domain ("import { PermissionMapper } from "../../domain/mappers/PermissionMapper";"). According to DriftGuard's default rules, infra must not depend on domain.

### `../../../audit_targets/batch_3/calcom/packages/features/pbac/infrastructure/repositories/RoleRepository.ts`

- **Line 8:** infra module importing from domain ("import { parsePermissionString } from "../../domain/types/permission-registry";"). According to DriftGuard's default rules, infra must not depend on domain.

### `../../../audit_targets/batch_3/calcom/packages/features/webhooks/lib/scheduleTrigger.ts`

- **Line 4:** lib module importing from api ("import { selectOOOEntries } from "@calcom/app-store/zapier/api/subscriptions/listOOOEntries";"). According to DriftGuard's default rules, lib must not depend on api.

---

Generated by DriftGuard v0.4

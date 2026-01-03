# 📋 DriftGuard Full Details

**Generated:** 3/1/2026, 4:41:34 pm

This document contains a line-by-line breakdown of every violation detected.

---

## Weighted Debt Calculation

**Weighted Debt Density:** 0.65 debt points per 1,000 lines of production code

**Severity Multipliers:**
- Layer Violations: ×10 (Fatal structural drift)
- N+1 Queries: ×2 (Core efficiency drift)
- God Classes: ×1 (Complexity drift)

**Production Code:** 39 violations (72 weighted debt) in 1,10,780 LOC

**Total Files:** 6329 (431 production)

---

## Violations Summary

- **Layer Violations:** 0
- **N+1 Queries:** 6
- **God Classes:** 33

---

## 📦 God Class

### `../../../audit_targets/batch_2/bun/packages/bun-debug-adapter-protocol/src/debugger/adapter.ts`

- **Line 1:** Monolith detected (2254 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/bun/packages/bun-debug-adapter-protocol/src/protocol/index.d.ts`

- **Line 1:** Large Class detected (834 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/bun/packages/bun-error/index.tsx`

- **Line 1:** Large Class detected (1103 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/bun/packages/bun-inspector-protocol/src/protocol/jsc/index.d.ts`

- **Line 1:** Large Class detected (1027 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/bun/packages/bun-inspector-protocol/src/protocol/v8/index.d.ts`

- **Line 1:** Monolith detected (6675 code lines in type/schema definition file). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/bun/packages/bun-types/bun.d.ts`

- **Line 1:** Large Class detected (1687 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/bun/packages/bun-types/globals.d.ts`

- **Line 1:** Large Class detected (936 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/bun/src/api/schema.d.ts`

- **Line 1:** Large Class detected (837 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/bun/src/api/schema.js`

- **Line 1:** Monolith detected (3148 code lines in type/schema definition file). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/bun/src/codegen/bindgen-lib-internal.ts`

- **Line 1:** Large Class detected (964 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/bun/src/codegen/bindgen.ts`

- **Line 1:** Large Class detected (1393 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/bun/src/codegen/generate-classes.ts`

- **Line 1:** Monolith detected (2098 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/bun/src/codegen/generate-jssink.ts`

- **Line 1:** Large Class detected (830 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/bun/src/css/properties/generate_properties.ts`

- **Line 1:** Monolith detected (1588 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/bun/src/js/builtins/ReadableStreamInternals.ts`

- **Line 1:** Monolith detected (1939 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/bun/src/js/bun/sql.ts`

- **Line 1:** Large Class detected (876 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/bun/src/js/internal/sql/mysql.ts`

- **Line 1:** Large Class detected (993 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/bun/src/js/internal/sql/postgres.ts`

- **Line 1:** Large Class detected (1165 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/bun/src/js/internal/streams/readable.ts`

- **Line 1:** Large Class detected (1196 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/bun/src/js/internal/streams/writable.ts`

- **Line 1:** Large Class detected (843 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/bun/src/js/internal/util/inspect.js`

- **Line 1:** Monolith detected (2278 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/bun/src/js/node/_http_client.ts`

- **Line 1:** Large Class detected (804 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/bun/src/js/node/_http_server.ts`

- **Line 1:** Large Class detected (1491 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/bun/src/js/node/child_process.ts`

- **Line 1:** Large Class detected (1300 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/bun/src/js/node/dns.ts`

- **Line 1:** Large Class detected (846 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/bun/src/js/node/fs.ts`

- **Line 1:** Large Class detected (1150 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/bun/src/js/node/http2.ts`

- **Line 1:** Monolith detected (3457 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/bun/src/js/node/net.ts`

- **Line 1:** Monolith detected (2222 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/bun/src/js/node/readline.ts`

- **Line 1:** Monolith detected (1984 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/bun/src/js/node/tls.ts`

- **Line 1:** Large Class detected (805 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/bun/src/js/node/wasi.ts`

- **Line 1:** Monolith detected (1903 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/bun/src/js/thirdparty/ws.js`

- **Line 1:** Large Class detected (1118 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/bun/src/node-fallbacks/buffer.js`

- **Line 1:** Monolith detected (1593 code lines). Critical complexity - urgent refactoring required.

## ⚡ N+1 Query

### `../../../audit_targets/batch_2/bun/packages/bun-release/scripts/upload-assets.ts`

- **Line 25:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_2/bun/packages/bun-release/scripts/upload-s3.ts`

- **Line 117:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_2/bun/packages/bun-usockets/generate-root-certs.mjs`

- **Line 107:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_2/bun/packages/bun-vscode/src/global-state.ts`

- **Line 22:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_2/bun/src/js/internal/html.ts`

- **Line 238:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 263:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

---

Generated by DriftGuard v0.4

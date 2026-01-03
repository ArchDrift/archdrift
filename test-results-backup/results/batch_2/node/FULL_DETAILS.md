# 📋 DriftGuard Full Details

**Generated:** 3/1/2026, 4:41:16 pm

This document contains a line-by-line breakdown of every violation detected.

---

## Weighted Debt Calculation

**Weighted Debt Density:** 0.30 debt points per 1,000 lines of production code

**Severity Multipliers:**
- Layer Violations: ×10 (Fatal structural drift)
- N+1 Queries: ×2 (Core efficiency drift)
- God Classes: ×1 (Complexity drift)

**Production Code:** 41 violations (44 weighted debt) in 1,45,609 LOC

**Total Files:** 19553 (648 production)

---

## Violations Summary

- **Layer Violations:** 0
- **N+1 Queries:** 2
- **God Classes:** 39

---

## 📦 God Class

### `../../../audit_targets/batch_2/node/deps/cjs-module-lexer/src/lexer.js`

- **Line 1:** Large Class detected (1274 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/node/deps/undici/src/lib/dispatcher/client-h1.js`

- **Line 1:** Large Class detected (1047 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/node/deps/undici/src/lib/web/fetch/index.js`

- **Line 1:** Large Class detected (1124 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/node/deps/undici/src/lib/web/fetch/util.js`

- **Line 1:** Large Class detected (802 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/node/deps/v8/tools/turbolizer/src/views/range-view.ts`

- **Line 1:** Monolith detected (1704 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/node/lib/_http_client.js`

- **Line 1:** Large Class detected (805 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/node/lib/_http_outgoing.js`

- **Line 1:** Large Class detected (909 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/node/lib/_http_server.js`

- **Line 1:** Large Class detected (1033 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/node/lib/buffer.js`

- **Line 1:** Large Class detected (1069 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/node/lib/dgram.js`

- **Line 1:** Large Class detected (802 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/node/lib/events.js`

- **Line 1:** Large Class detected (806 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/node/lib/fs.js`

- **Line 1:** Monolith detected (2043 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/node/lib/internal/buffer.js`

- **Line 1:** Large Class detected (952 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/node/lib/internal/child_process.js`

- **Line 1:** Large Class detected (813 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/node/lib/internal/crypto/keys.js`

- **Line 1:** Large Class detected (855 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/node/lib/internal/crypto/webcrypto.js`

- **Line 1:** Monolith detected (1616 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/node/lib/internal/debugger/inspect_repl.js`

- **Line 1:** Large Class detected (1034 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/node/lib/internal/errors.js`

- **Line 1:** Monolith detected (1569 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/node/lib/internal/event_target.js`

- **Line 1:** Large Class detected (860 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/node/lib/internal/fs/promises.js`

- **Line 1:** Large Class detected (1116 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/node/lib/internal/fs/utils.js`

- **Line 1:** Large Class detected (803 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/node/lib/internal/http2/core.js`

- **Line 1:** Monolith detected (2764 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/node/lib/internal/http2/util.js`

- **Line 1:** Large Class detected (840 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/node/lib/internal/modules/cjs/loader.js`

- **Line 1:** Large Class detected (1381 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/node/lib/internal/quic/quic.js`

- **Line 1:** Large Class detected (1455 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/node/lib/internal/readline/interface.js`

- **Line 1:** Large Class detected (1233 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/node/lib/internal/streams/readable.js`

- **Line 1:** Large Class detected (1300 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/node/lib/internal/streams/writable.js`

- **Line 1:** Large Class detected (855 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/node/lib/internal/tls/wrap.js`

- **Line 1:** Large Class detected (1259 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/node/lib/internal/url.js`

- **Line 1:** Large Class detected (1260 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/node/lib/internal/util.js`

- **Line 1:** Large Class detected (808 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/node/lib/internal/util/comparisons.js`

- **Line 1:** Large Class detected (914 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/node/lib/internal/util/inspect.js`

- **Line 1:** Monolith detected (2537 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/node/lib/internal/webstreams/readablestream.js`

- **Line 1:** Monolith detected (2795 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/node/lib/internal/webstreams/writablestream.js`

- **Line 1:** Large Class detected (1158 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/node/lib/net.js`

- **Line 1:** Monolith detected (1892 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/node/lib/path.js`

- **Line 1:** Large Class detected (1186 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/node/lib/repl.js`

- **Line 1:** Large Class detected (1159 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/node/lib/zlib.js`

- **Line 1:** Large Class detected (803 code lines). Consider splitting into smaller modules.

## ⚡ N+1 Query

### `../../../audit_targets/batch_2/node/deps/npm/lib/commands/config.js`

- **Line 325:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_2/node/deps/npm/lib/commands/token.js`

- **Line 136:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

---

Generated by DriftGuard v0.4

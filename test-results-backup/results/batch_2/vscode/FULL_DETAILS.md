# 📋 DriftGuard Full Details

**Generated:** 3/1/2026, 4:40:51 pm

This document contains a line-by-line breakdown of every violation detected.

---

## Weighted Debt Calculation

**Weighted Debt Density:** 0.39 debt points per 1,000 lines of production code

**Severity Multipliers:**
- Layer Violations: ×10 (Fatal structural drift)
- N+1 Queries: ×2 (Core efficiency drift)
- God Classes: ×1 (Complexity drift)

**Production Code:** 270 violations (400 weighted debt) in 10,37,500 LOC

**Total Files:** 6175 (4746 production)

---

## Violations Summary

- **Layer Violations:** 0
- **N+1 Queries:** 40
- **God Classes:** 230

---

## 📦 God Class

### `../../../audit_targets/batch_2/vscode/extensions/git/src/commands.ts`

- **Line 1:** Monolith detected (4348 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/extensions/git/src/git.ts`

- **Line 1:** Monolith detected (2566 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/extensions/git/src/model.ts`

- **Line 1:** Large Class detected (883 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/extensions/git/src/repository.ts`

- **Line 1:** Monolith detected (2472 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/extensions/php-language-features/src/features/phpGlobalFunctions.ts`

- **Line 1:** Monolith detected (6031 code lines in type/schema definition file). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/extensions/terminal-suggest/src/completions/azd.ts`

- **Line 1:** Monolith detected (1847 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/extensions/terminal-suggest/src/completions/code.ts`

- **Line 1:** Large Class detected (1027 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/extensions/terminal-suggest/src/completions/gh.ts`

- **Line 1:** Monolith detected (3313 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/extensions/terminal-suggest/src/completions/git.ts`

- **Line 1:** Monolith detected (6827 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/extensions/terminal-suggest/src/completions/npm.ts`

- **Line 1:** Monolith detected (1559 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/extensions/terminal-suggest/src/completions/pnpm.ts`

- **Line 1:** Large Class detected (968 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/extensions/terminal-suggest/src/completions/upstream/brew.ts`

- **Line 1:** Monolith detected (1661 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/extensions/terminal-suggest/src/completions/upstream/curl.ts`

- **Line 1:** Large Class detected (913 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/extensions/terminal-suggest/src/completions/upstream/docker-compose.ts`

- **Line 1:** Large Class detected (1054 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/extensions/terminal-suggest/src/completions/upstream/docker.ts`

- **Line 1:** Monolith detected (6831 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/extensions/terminal-suggest/src/completions/upstream/go.ts`

- **Line 1:** Large Class detected (916 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/extensions/terminal-suggest/src/completions/upstream/rsync.ts`

- **Line 1:** Large Class detected (840 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/extensions/terminal-suggest/src/completions/upstream/ruff.ts`

- **Line 1:** Monolith detected (3043 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/extensions/terminal-suggest/src/completions/upstream/tar.ts`

- **Line 1:** Large Class detected (1402 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/extensions/terminal-suggest/src/completions/yarn.ts`

- **Line 1:** Monolith detected (1636 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/extensions/typescript-language-features/src/typescriptServiceClient.ts`

- **Line 1:** Large Class detected (1023 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/base/browser/dom.ts`

- **Line 1:** Monolith detected (1918 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/base/browser/dompurify/dompurify.js`

- **Line 1:** Large Class detected (963 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/base/browser/markdownRenderer.ts`

- **Line 1:** Large Class detected (828 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/base/browser/ui/grid/gridview.ts`

- **Line 1:** Large Class detected (1149 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/base/browser/ui/list/listView.ts`

- **Line 1:** Large Class detected (1311 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/base/browser/ui/list/listWidget.ts`

- **Line 1:** Monolith detected (1557 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/base/browser/ui/menu/menu.ts`

- **Line 1:** Large Class detected (1106 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/base/browser/ui/menu/menubar.ts`

- **Line 1:** Large Class detected (828 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/base/browser/ui/splitview/splitview.ts`

- **Line 1:** Large Class detected (915 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/base/browser/ui/tree/abstractTree.ts`

- **Line 1:** Monolith detected (2551 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/base/browser/ui/tree/asyncDataTree.ts`

- **Line 1:** Large Class detected (1323 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/base/common/async.ts`

- **Line 1:** Monolith detected (1803 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/base/common/diff/diff.ts`

- **Line 1:** Large Class detected (833 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/base/common/event.ts`

- **Line 1:** Large Class detected (1119 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/base/common/json.ts`

- **Line 1:** Large Class detected (1099 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/base/common/marked/marked.js`

- **Line 1:** Monolith detected (2223 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/base/common/path.ts`

- **Line 1:** Large Class detected (1156 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/base/common/strings.ts`

- **Line 1:** Large Class detected (909 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/base/parts/ipc/common/ipc.net.ts`

- **Line 1:** Large Class detected (875 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/base/parts/ipc/common/ipc.ts`

- **Line 1:** Large Class detected (961 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/code/electron-main/app.ts`

- **Line 1:** Large Class detected (971 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/editor/browser/controller/mouseTarget.ts`

- **Line 1:** Large Class detected (943 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/editor/browser/coreCommands.ts`

- **Line 1:** Monolith detected (1870 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/editor/browser/viewParts/minimap/minimap.ts`

- **Line 1:** Monolith detected (1780 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/editor/browser/widget/codeEditor/codeEditorWidget.ts`

- **Line 1:** Monolith detected (2092 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/editor/common/config/editorOptions.ts`

- **Line 1:** Monolith detected (4619 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/editor/common/cursor/cursor.ts`

- **Line 1:** Large Class detected (876 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/editor/common/cursor/cursorTypeEditOperations.ts`

- **Line 1:** Large Class detected (883 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/editor/common/languages.ts`

- **Line 1:** Large Class detected (1334 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/editor/common/model/intervalTree.ts`

- **Line 1:** Large Class detected (957 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/editor/common/model/pieceTreeTextBuffer/pieceTreeBase.ts`

- **Line 1:** Monolith detected (1501 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/editor/common/model/textModel.ts`

- **Line 1:** Monolith detected (2162 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/editor/common/viewLayout/viewLineRenderer.ts`

- **Line 1:** Large Class detected (965 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/editor/common/viewModel/viewModelImpl.ts`

- **Line 1:** Large Class detected (1180 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/editor/common/viewModel/viewModelLines.ts`

- **Line 1:** Large Class detected (970 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/editor/contrib/find/browser/findController.ts`

- **Line 1:** Large Class detected (991 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/editor/contrib/find/browser/findWidget.ts`

- **Line 1:** Large Class detected (1161 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/editor/contrib/folding/browser/folding.ts`

- **Line 1:** Large Class detected (1158 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/editor/contrib/inlineCompletions/browser/model/inlineCompletionsModel.ts`

- **Line 1:** Large Class detected (1086 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/editor/contrib/linesOperations/browser/linesOperations.ts`

- **Line 1:** Large Class detected (1161 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/editor/contrib/multicursor/browser/multicursor.ts`

- **Line 1:** Large Class detected (985 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/editor/contrib/snippet/browser/snippetParser.ts`

- **Line 1:** Large Class detected (915 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/editor/contrib/suggest/browser/suggestController.ts`

- **Line 1:** Large Class detected (944 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/editor/contrib/suggest/browser/suggestWidget.ts`

- **Line 1:** Large Class detected (859 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/editor/standalone/browser/standaloneServices.ts`

- **Line 1:** Large Class detected (1028 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/loader.js`

- **Line 1:** Monolith detected (1658 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/monaco.d.ts`

- **Line 1:** Monolith detected (3250 code lines in type/schema definition file). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/platform/configuration/common/configurationModels.ts`

- **Line 1:** Large Class detected (1118 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/platform/contextkey/common/contextkey.ts`

- **Line 1:** Monolith detected (1669 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/platform/extensionManagement/common/abstractExtensionManagementService.ts`

- **Line 1:** Large Class detected (922 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/platform/extensionManagement/common/extensionGalleryService.ts`

- **Line 1:** Monolith detected (1620 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/platform/extensionManagement/common/extensionsScannerService.ts`

- **Line 1:** Large Class detected (956 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/platform/extensionManagement/node/extensionManagementService.ts`

- **Line 1:** Large Class detected (1015 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/platform/files/common/fileService.ts`

- **Line 1:** Large Class detected (962 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/platform/list/browser/listService.ts`

- **Line 1:** Large Class detected (1225 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/platform/mcp/common/mcpGalleryService.ts`

- **Line 1:** Large Class detected (901 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/platform/native/electron-main/nativeHostMainService.ts`

- **Line 1:** Large Class detected (887 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/platform/quickinput/browser/quickInput.ts`

- **Line 1:** Large Class detected (1168 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/platform/quickinput/browser/quickInputController.ts`

- **Line 1:** Large Class detected (976 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/platform/quickinput/browser/quickInputList.ts`

- **Line 1:** Large Class detected (1334 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/platform/terminal/common/capabilities/commandDetectionCapability.ts`

- **Line 1:** Large Class detected (804 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/platform/terminal/node/ptyService.ts`

- **Line 1:** Large Class detected (991 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/platform/undoRedo/common/undoRedoService.ts`

- **Line 1:** Large Class detected (1188 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/platform/userDataSync/common/userDataSyncService.ts`

- **Line 1:** Large Class detected (830 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/platform/windows/electron-main/windowImpl.ts`

- **Line 1:** Large Class detected (1056 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/platform/windows/electron-main/windowsMainService.ts`

- **Line 1:** Large Class detected (1210 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/api/browser/mainThreadLanguageFeatures.ts`

- **Line 1:** Large Class detected (1267 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/api/common/extHost.api.impl.ts`

- **Line 1:** Monolith detected (1840 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/api/common/extHost.protocol.ts`

- **Line 1:** Monolith detected (2876 code lines in type/schema definition file). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/api/common/extHostChatAgents2.ts`

- **Line 1:** Large Class detected (957 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/api/common/extHostDebugService.ts`

- **Line 1:** Large Class detected (1047 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/api/common/extHostExtensionService.ts`

- **Line 1:** Large Class detected (1021 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/api/common/extHostLanguageFeatures.ts`

- **Line 1:** Monolith detected (2411 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/api/common/extHostMcp.ts`

- **Line 1:** Large Class detected (814 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/api/common/extHostSCM.ts`

- **Line 1:** Large Class detected (963 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/api/common/extHostTerminalService.ts`

- **Line 1:** Large Class detected (1062 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/api/common/extHostTesting.ts`

- **Line 1:** Large Class detected (1013 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/api/common/extHostTreeViews.ts`

- **Line 1:** Large Class detected (961 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/api/common/extHostTypeConverters.ts`

- **Line 1:** Monolith detected (3408 code lines in type/schema definition file). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/api/common/extHostTypes.ts`

- **Line 1:** Monolith detected (3048 code lines in type/schema definition file). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/api/common/extHostWorkspace.ts`

- **Line 1:** Large Class detected (816 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/browser/actions/developerActions.ts`

- **Line 1:** Large Class detected (829 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/browser/actions/layoutActions.ts`

- **Line 1:** Large Class detected (1320 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/browser/layout.ts`

- **Line 1:** Monolith detected (2289 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/browser/parts/editor/breadcrumbsControl.ts`

- **Line 1:** Large Class detected (849 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/browser/parts/editor/editor.contribution.ts`

- **Line 1:** Large Class detected (958 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/browser/parts/editor/editorActions.ts`

- **Line 1:** Monolith detected (2206 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/browser/parts/editor/editorCommands.ts`

- **Line 1:** Large Class detected (1181 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/browser/parts/editor/editorGroupView.ts`

- **Line 1:** Large Class detected (1412 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/browser/parts/editor/editorPart.ts`

- **Line 1:** Large Class detected (1057 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/browser/parts/editor/editorStatus.ts`

- **Line 1:** Large Class detected (1277 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/browser/parts/editor/multiEditorTabsControl.ts`

- **Line 1:** Monolith detected (1768 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/browser/parts/views/treeView.ts`

- **Line 1:** Monolith detected (1841 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/browser/parts/views/viewPaneContainer.ts`

- **Line 1:** Large Class detected (1039 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/browser/workbench.contribution.ts`

- **Line 1:** Large Class detected (952 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/common/editor/editorGroupModel.ts`

- **Line 1:** Large Class detected (868 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/accessibility/browser/accessibilityConfiguration.ts`

- **Line 1:** Large Class detected (1047 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/accessibility/browser/accessibleView.ts`

- **Line 1:** Large Class detected (928 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/chat/browser/actions/chatActions.ts`

- **Line 1:** Large Class detected (1020 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/chat/browser/attachments/chatAttachmentWidgets.ts`

- **Line 1:** Large Class detected (943 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/chat/browser/chatEditing/chatEditingModifiedNotebookEntry.ts`

- **Line 1:** Large Class detected (947 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/chat/browser/chatManagement/chatModelsWidget.ts`

- **Line 1:** Large Class detected (1008 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/chat/browser/chatSessions/chatSessions.contribution.ts`

- **Line 1:** Large Class detected (905 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/chat/browser/tools/languageModelToolsService.ts`

- **Line 1:** Large Class detected (834 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/chat/browser/widget/chatContentParts/codeBlockPart.ts`

- **Line 1:** Large Class detected (834 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/chat/browser/widget/chatContentParts/toolInvocationParts/chatTerminalToolProgressPart.ts`

- **Line 1:** Large Class detected (1010 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/chat/browser/widget/chatListRenderer.ts`

- **Line 1:** Monolith detected (1544 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/chat/browser/widget/chatWidget.ts`

- **Line 1:** Monolith detected (2069 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/chat/browser/widget/input/chatInputPart.ts`

- **Line 1:** Monolith detected (2054 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/chat/browser/widget/input/editor/chatInputCompletions.ts`

- **Line 1:** Large Class detected (1038 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/chat/common/chatService/chatService.ts`

- **Line 1:** Large Class detected (886 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/chat/common/chatService/chatServiceImpl.ts`

- **Line 1:** Large Class detected (1026 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/chat/common/model/chatModel.ts`

- **Line 1:** Monolith detected (1844 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/chat/electron-browser/actions/voiceChatActions.ts`

- **Line 1:** Large Class detected (1054 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/codeEditor/common/languageConfigurationExtensionPoint.ts`

- **Line 1:** Large Class detected (805 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/comments/browser/commentsController.ts`

- **Line 1:** Large Class detected (1233 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/debug/browser/breakpointsView.ts`

- **Line 1:** Monolith detected (2083 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/debug/browser/callStackView.ts`

- **Line 1:** Large Class detected (947 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/debug/browser/debugCommands.ts`

- **Line 1:** Large Class detected (1043 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/debug/browser/debugEditorContribution.ts`

- **Line 1:** Large Class detected (823 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/debug/browser/debugService.ts`

- **Line 1:** Large Class detected (1237 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/debug/browser/debugSession.ts`

- **Line 1:** Large Class detected (1314 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/debug/browser/disassemblyView.ts`

- **Line 1:** Large Class detected (843 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/debug/browser/repl.ts`

- **Line 1:** Large Class detected (1060 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/debug/common/debug.ts`

- **Line 1:** Large Class detected (904 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/debug/common/debugModel.ts`

- **Line 1:** Monolith detected (1762 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/debug/common/debugProtocol.d.ts`

- **Line 1:** Large Class detected (977 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/editSessions/browser/editSessions.contribution.ts`

- **Line 1:** Large Class detected (999 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/extensions/browser/extensionEditor.ts`

- **Line 1:** Large Class detected (1165 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/extensions/browser/extensions.contribution.ts`

- **Line 1:** Monolith detected (1949 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/extensions/browser/extensionsActions.ts`

- **Line 1:** Monolith detected (2764 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/extensions/browser/extensionsViewlet.ts`

- **Line 1:** Large Class detected (932 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/extensions/browser/extensionsViews.ts`

- **Line 1:** Large Class detected (1392 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/extensions/browser/extensionsWidgets.ts`

- **Line 1:** Large Class detected (945 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/extensions/browser/extensionsWorkbenchService.ts`

- **Line 1:** Monolith detected (2842 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/files/browser/fileActions.ts`

- **Line 1:** Large Class detected (1146 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/files/browser/views/explorerView.ts`

- **Line 1:** Large Class detected (879 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/files/browser/views/explorerViewer.ts`

- **Line 1:** Monolith detected (1653 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/inlineChat/browser/inlineChatController.ts`

- **Line 1:** Large Class detected (1416 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/issue/browser/baseIssueReporterService.ts`

- **Line 1:** Large Class detected (1293 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/markers/browser/markersView.ts`

- **Line 1:** Large Class detected (944 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/mcp/browser/mcpCommands.ts`

- **Line 1:** Large Class detected (975 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/mcp/browser/mcpServerActions.ts`

- **Line 1:** Large Class detected (1047 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/mcp/browser/mcpServerEditor.ts`

- **Line 1:** Large Class detected (844 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/mcp/common/mcpServer.ts`

- **Line 1:** Large Class detected (969 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/notebook/browser/contrib/multicursor/notebookMulticursor.ts`

- **Line 1:** Large Class detected (1063 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/notebook/browser/diff/diffComponents.ts`

- **Line 1:** Monolith detected (1869 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/notebook/browser/diff/diffElementViewModel.ts`

- **Line 1:** Large Class detected (905 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/notebook/browser/diff/notebookDiffEditor.ts`

- **Line 1:** Large Class detected (813 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/notebook/browser/notebook.contribution.ts`

- **Line 1:** Large Class detected (1143 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/notebook/browser/notebookEditorWidget.ts`

- **Line 1:** Monolith detected (2693 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/notebook/browser/services/notebookServiceImpl.ts`

- **Line 1:** Large Class detected (805 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/notebook/browser/viewModel/notebookViewModelImpl.ts`

- **Line 1:** Large Class detected (842 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/notebook/browser/view/notebookCellList.ts`

- **Line 1:** Large Class detected (1206 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/notebook/browser/view/renderers/backLayerWebView.ts`

- **Line 1:** Monolith detected (1701 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/notebook/browser/view/renderers/webviewPreloads.ts`

- **Line 1:** Monolith detected (2548 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/notebook/common/model/notebookTextModel.ts`

- **Line 1:** Large Class detected (1170 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/notebook/common/notebookCommon.ts`

- **Line 1:** Large Class detected (937 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/output/browser/output.contribution.ts`

- **Line 1:** Large Class detected (823 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/preferences/browser/keybindingsEditor.ts`

- **Line 1:** Large Class detected (1117 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/preferences/browser/preferences.contribution.ts`

- **Line 1:** Large Class detected (1312 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/preferences/browser/preferencesRenderers.ts`

- **Line 1:** Large Class detected (843 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/preferences/browser/settingsEditor2.ts`

- **Line 1:** Monolith detected (1806 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/preferences/browser/settingsTree.ts`

- **Line 1:** Monolith detected (2267 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/preferences/browser/settingsTreeModels.ts`

- **Line 1:** Large Class detected (949 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/preferences/browser/settingsWidgets.ts`

- **Line 1:** Large Class detected (1200 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/remote/browser/remote.ts`

- **Line 1:** Large Class detected (912 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/remote/browser/tunnelView.ts`

- **Line 1:** Monolith detected (1641 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/scm/browser/quickDiffWidget.ts`

- **Line 1:** Large Class detected (823 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/scm/browser/scmHistoryViewPane.ts`

- **Line 1:** Monolith detected (1797 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/scm/browser/scmViewPane.ts`

- **Line 1:** Monolith detected (2567 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/search/browser/anythingQuickAccess.ts`

- **Line 1:** Large Class detected (802 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/search/browser/searchView.ts`

- **Line 1:** Monolith detected (2239 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/tasks/browser/abstractTaskService.ts`

- **Line 1:** Monolith detected (3651 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/tasks/browser/terminalTaskSystem.ts`

- **Line 1:** Monolith detected (1777 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/tasks/common/problemMatcher.ts`

- **Line 1:** Monolith detected (1616 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/tasks/common/taskConfiguration.ts`

- **Line 1:** Monolith detected (1666 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/tasks/common/tasks.ts`

- **Line 1:** Large Class detected (956 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/terminalContrib/chatAgentTools/browser/tools/runInTerminalTool.ts`

- **Line 1:** Large Class detected (893 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/terminalContrib/suggest/browser/terminalSuggestAddon.ts`

- **Line 1:** Large Class detected (865 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/terminalContrib/typeAhead/browser/terminalTypeAheadAddon.ts`

- **Line 1:** Large Class detected (1082 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/terminal/browser/terminalActions.ts`

- **Line 1:** Monolith detected (1551 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/terminal/browser/terminalInstance.ts`

- **Line 1:** Monolith detected (2362 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/terminal/browser/terminalMenus.ts`

- **Line 1:** Large Class detected (824 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/terminal/browser/terminalService.ts`

- **Line 1:** Large Class detected (1127 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/terminal/browser/xterm/xtermTerminal.ts`

- **Line 1:** Large Class detected (885 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/timeline/browser/timelinePane.ts`

- **Line 1:** Large Class detected (1106 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/userDataProfile/browser/userDataProfilesEditor.ts`

- **Line 1:** Monolith detected (1997 code lines). Critical complexity - urgent refactoring required.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/userDataProfile/browser/userDataProfilesEditorModel.ts`

- **Line 1:** Large Class detected (1199 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/userDataSync/browser/userDataSync.ts`

- **Line 1:** Large Class detected (1157 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/welcomeGettingStarted/browser/gettingStarted.ts`

- **Line 1:** Large Class detected (1466 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/workspace/browser/workspaceTrustEditor.ts`

- **Line 1:** Large Class detected (936 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/electron-browser/window.ts`

- **Line 1:** Large Class detected (948 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/services/actions/common/menusExtensionPoint.ts`

- **Line 1:** Large Class detected (1104 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/services/chat/common/chatEntitlementService.ts`

- **Line 1:** Large Class detected (980 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/services/configuration/browser/configuration.ts`

- **Line 1:** Large Class detected (895 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/services/configuration/browser/configurationService.ts`

- **Line 1:** Large Class detected (1198 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/services/dialogs/browser/simpleFileDialog.ts`

- **Line 1:** Large Class detected (958 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/services/extensionManagement/browser/webExtensionsScannerService.ts`

- **Line 1:** Large Class detected (894 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/services/extensionManagement/common/extensionManagementService.ts`

- **Line 1:** Large Class detected (1229 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/services/extensions/common/abstractExtensionService.ts`

- **Line 1:** Large Class detected (1232 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/services/extensions/common/rpcProtocol.ts`

- **Line 1:** Large Class detected (819 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/services/history/browser/historyService.ts`

- **Line 1:** Large Class detected (1481 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/services/keybinding/browser/keybindingService.ts`

- **Line 1:** Large Class detected (843 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/services/keybinding/common/macLinuxKeyboardMapper.ts`

- **Line 1:** Large Class detected (890 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/services/preferences/common/preferencesModels.ts`

- **Line 1:** Large Class detected (1020 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/services/remote/common/tunnelModel.ts`

- **Line 1:** Large Class detected (928 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/services/themes/common/colorThemeData.ts`

- **Line 1:** Large Class detected (934 code lines). Consider splitting into smaller modules.

### `../../../audit_targets/batch_2/vscode/src/vscode-dts/vscode.d.ts`

- **Line 1:** Monolith detected (3424 code lines in type/schema definition file). Critical complexity - urgent refactoring required.

## ⚡ N+1 Query

### `../../../audit_targets/batch_2/vscode/extensions/git/src/commands.ts`

- **Line 2297:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 4441:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_2/vscode/extensions/github-authentication/src/node/fetch.ts`

- **Line 93:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 106:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_2/vscode/extensions/html-language-features/server/src/modes/formatting.ts`

- **Line 42:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_2/vscode/extensions/typescript-language-features/src/languageFeatures/fileReferences.ts`

- **Line 67:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 71:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_2/vscode/extensions/typescript-language-features/src/tsServer/versionManager.ts`

- **Line 133:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 135:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_2/vscode/src/vs/base/browser/indexedDB.ts`

- **Line 62:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 63:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 73:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 74:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_2/vscode/src/vs/code/browser/workbench/workbench.ts`

- **Line 159:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_2/vscode/src/vs/editor/contrib/inlineCompletions/browser/model/inlineCompletionsModel.ts`

- **Line 452:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_2/vscode/src/vs/editor/contrib/inlineCompletions/browser/model/inlineCompletionsSource.ts`

- **Line 151:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_2/vscode/src/vs/platform/extensionManagement/node/extensionManagementService.ts`

- **Line 515:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_2/vscode/src/vs/platform/files/browser/indexedDBFileSystemProvider.ts`

- **Line 300:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 400:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 415:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_2/vscode/src/vs/platform/files/node/watcher/nodejs/nodejsWatcher.ts`

- **Line 140:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_2/vscode/src/vs/platform/files/node/watcher/parcel/parcelWatcher.ts`

- **Line 678:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/api/node/extHostAuthentication.ts`

- **Line 263:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/browser/parts/editor/editorActions.ts`

- **Line 678:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/bulkEdit/browser/bulkEditService.ts`

- **Line 285:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/chat/browser/chatEditing/chatEditingSession.ts`

- **Line 576:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/debug/common/abstractDebugAdapter.ts`

- **Line 165:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 167:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 200:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/inlineChat/browser/inlineChatStrategies.ts`

- **Line 548:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/notebook/browser/view/renderers/backLayerWebView.ts`

- **Line 644:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 645:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1727:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.
- **Line 1728:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/remote/browser/remoteIndicator.ts`

- **Line 333:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/search/browser/replaceService.ts`

- **Line 126:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/contrib/terminalContrib/chatAgentTools/browser/tools/task/createAndRunTaskTool.ts`

- **Line 89:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/services/authentication/browser/dynamicAuthenticationProviderStorageService.ts`

- **Line 161:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/services/editor/browser/editorService.ts`

- **Line 1001:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

### `../../../audit_targets/batch_2/vscode/src/vs/workbench/services/workingCopy/electron-browser/workingCopyBackupTracker.ts`

- **Line 351:** Database/API call inside loop. Consider batching queries or moving the call outside the loop.

---

Generated by DriftGuard v0.4

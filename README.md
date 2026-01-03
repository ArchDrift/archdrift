# ArchDrift

**Measure architectural drift before it becomes technical debt.**

ArchDrift is a VS Code extension that detects code smells and architectural violations in real-time. It provides instant visual feedback as you code, helping maintain clean architecture and prevent common performance issues.

## 🎯 The Problem

Architectural drift creeps into codebases silently. What starts as a "quick fix" becomes technical debt that slows down development velocity. By the time you notice it, refactoring costs are 10x higher.

**Real-world impact:**
- **Storybook** (1,879 files, 166K LOC): **0.4% drift** → Rock solid architecture, minimal technical debt
- **Lodash** (13 files, 26K LOC): **38.5% drift** → Critical refactoring needed, high maintenance burden

The difference? Early detection and prevention.

## ✨ Features

- **Zero Configuration**: Works immediately after installation
- **Real-time Analysis**: Scans files automatically on open and save
- **Visual Feedback**: Diagnostics appear directly in the editor with hover messages
- **Status Bar Integration**: Quick overview of file health at a glance
- **Manual Scanning**: Use Command Palette → "ArchDrift: Scan Active File"

## 🛡️ The Three Rules

ArchDrift enforces three key rules to maintain code quality:

### Rule 1: God Class Detection 🚨

**Purpose**: Prevent files from growing too large and becoming unmaintainable.

**How it works**:
- Counts actual code lines (excluding empty lines and comments)
- Flags files exceeding **500 code lines**
- Provides file-level warning diagnostics

**What you'll see**:
- Warning diagnostic across the entire file
- Status bar: `🚨 ArchDrift: Oversized (N lines)`
- Hover message explaining the issue

**Example**:
```javascript
// A file with 600+ lines of code will trigger:
// 🚨 God Class detected (612 code lines). Consider splitting into smaller modules.
```

---

### Rule 2: N+1 Query Detection ⚠️

**Purpose**: Identify performance problems where database or API calls are made inside loops.

**How it works**:
- Detects loops: `for`, `while`, `.map()`, `.filter()`, `.forEach()`
- Identifies database/API calls inside those loops:
  - `await` with `.query()`, `.find()`, `.findOne()`, `.save()`, etc.
  - `fetch()`
  - `axios.get/post/put/delete()`
  - `prisma.*`, `db.*`
- Provides line-level warning diagnostics

**What you'll see**:
- Warning diagnostics on specific violation lines
- Status bar: `⚠ ArchDrift: N+1 hotspots (N)`
- Hover messages suggesting fixes (batching queries, moving calls outside loops)

**Example**:
```javascript
// ❌ Bad: N+1 query pattern
for (const user of users) {
    const profile = await db.findOne({ userId: user.id }); // ⚠️ N+1 Query
}

// ✅ Good: Batch query outside loop
const userIds = users.map(u => u.id);
const profiles = await db.find({ userId: { $in: userIds } });
```

---

### Rule 3: Layer Integrity Detection 🚫

**Purpose**: Enforce clean architecture by preventing forbidden dependencies between layers.

**How it works**:
- Automatically detects file layer from directory path patterns
- Parses import/require statements in your code
- Validates layer dependencies against architectural rules
- Provides error-level diagnostics for violations

**What you'll see**:
- **Error diagnostics** on import lines that violate layer boundaries (highest priority)
- Status bar: `🚫 ArchDrift: Layer violations (N)`
- Hover messages explaining the violation and architectural rule

## Default Layer Model

ArchDrift uses a **convention-over-configuration** approach. Files are automatically classified into layers based on their directory paths:

### Layer Detection Patterns

| Layer | Directory Patterns | Description |
|-------|-------------------|-------------|
| **API** (Outermost) | `/api/`, `/presentation/`, `/controllers/` | Delivery/presentation layer - handles HTTP requests, UI |
| **Domain** (Core) | `/domain/`, `/core/`, `/usecases/` | Business logic layer - contains core business rules |
| **Infra** (Infrastructure) | `/infra/`, `/infrastructure/`, `/persistence/`, `/adapters/` | Infrastructure layer - databases, external services, adapters |

### Dependency Rules

**Allowed Dependencies** ✅:
- API → Domain (allowed)
- API → Infra (allowed)
- Domain → Infra (allowed)

**Forbidden Dependencies** ❌:
- Domain → API (forbidden)
- Infra → API (forbidden)
- Infra → Domain (forbidden)

### Examples

```javascript
// ✅ ALLOWED: api/userController.js
import { UserService } from '../domain/userService.js';  // API → Domain

// ❌ VIOLATION: domain/userService.js
import { UserController } from '../api/userController.js';  // Domain → API

// ❌ VIOLATION: infra/database.js
import { UserService } from '../domain/userService.js';  // Infra → Domain
```

**Note**: Files that don't match any layer pattern are considered "unclassified" and are not checked for layer violations.

## 📊 Real-World Results

ArchDrift has analyzed **43+ open-source repositories** to validate its methodology:

| Repository | Files | LOC | Drift | Status |
|------------|-------|-----|-------|--------|
| **Storybook** | 1,879 | 166K | **0.4%** | 🟢 Rock Solid |
| **Angular** | 2,720 | 255K | **2.1%** | 🟡 Stable |
| **Prisma** | 881 | 58K | **13.4%** | 🟠 Eroding |
| **Lodash** | 13 | 26K | **38.5%** | 🔴 Critical |

**Key Insight**: Repository size doesn't determine drift. Architecture discipline does.

## Supported File Types

- JavaScript (`.js`)
- TypeScript (`.ts`)
- JSX (`.jsx`)
- TSX (`.tsx`)
- Python (`.py`)
- Java (`.java`)
- Go (`.go`)

## 🚀 Installation

### Install from VSIX File

1. **Download the VSIX file** (`.vsix` extension package)

2. **Install in VS Code**:
   - Open VS Code
   - Go to **Extensions** view (Ctrl+Shift+X / Cmd+Shift+X)
   - Click the **"..."** menu (top right of Extensions panel)
   - Select **"Install from VSIX..."**
   - Browse and select the `.vsix` file
   - Wait for installation to complete

3. **Verify Installation**:
   - Open any supported code file
   - ArchDrift will automatically start analyzing
   - Check the status bar (bottom right) for ArchDrift status

### Development Setup

To build and test the extension locally:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd archdrift
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Compile TypeScript**:
   ```bash
   npm run compile
   ```

4. **Run in Extension Development Host**:
   - Open the project in VS Code
   - Press `F5` to launch Extension Development Host
   - In the new window, open code files to test ArchDrift

5. **Package for distribution**:
   ```bash
   npm install -g vsce
   vsce package
   ```
   This creates a `.vsix` file you can distribute.

## Status Bar Priority

The status bar shows issues in priority order (highest to lowest):

1. 🚫 **Layer Violations** - Architectural violations (Error severity)
2. 🚨 **Oversized** - God Class detected (Warning severity)
3. ⚠️ **N+1 Hotspots** - Performance issues (Warning severity)
4. ✅ **Clean** - No issues detected

## How It Works

### God Class Detection
- Counts non-empty lines of code
- Excludes empty lines, single-line comments (`//`, `#`), and block comments (`/* ... */`)
- Threshold: **500 code lines**

### N+1 Query Detection
- Scans for loop patterns: `for`, `while`, `.map()`, `.filter()`, `.forEach()`
- Detects database/API calls within loop bodies
- Supports multiple languages with language-specific parsing

### Layer Integrity Detection
- Automatically detects file layer from directory path patterns
- Parses import/require statements (JS/TS/Python/Java/Go)
- Resolves relative imports to check layer boundaries
- Supports aliased imports (e.g., `@app/domain/foo`)
- Only checks files within recognized layer directories

## 📈 Version History

**v0.2** - Added Layer Integrity detection for architectural violations
- Layer-based dependency checking
- Support for multiple languages (JS/TS/Python/Java/Go)
- Error-level diagnostics for architectural violations

**v0.1** - Initial release
- God Class detection
- N+1 Query detection
- Real-time file analysis

## 🗺️ Roadmap

- Custom layer pattern configuration
- Custom dependency rules
- Additional architectural invariants
- Configurable thresholds (God Class line count, etc.)
- CI/CD integration for pull request checks

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ to help developers maintain clean architecture and prevent technical debt.**

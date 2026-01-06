// Import vscode types for TypeScript compilation
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { DOMAIN_WEIGHTS, ProjectDomain, detectProjectDomain } from './config/constants';

export type LayerType = 'api' | 'domain' | 'infra' | 'service' | 'model' | 'lib';

export interface LayerViolation {
    sourceLayer: LayerType;
    targetLayer: LayerType;
    line: number;
    column: number;
    importText: string;
}

export type IssuePattern = 'God Class' | 'N+1 Query' | 'Layer Violation';

// Diagnostic severity constants (matching vscode.DiagnosticSeverity enum)
// 0 = Error, 1 = Warning, 2 = Information, 3 = Hint
export const DiagnosticSeverity = {
    Error: 0,
    Warning: 1,
    Information: 2,
    Hint: 3
} as const;

export type DiagnosticSeverityType = typeof DiagnosticSeverity[keyof typeof DiagnosticSeverity];

export interface RawIssue {
    pattern: IssuePattern;
    line: number;
    column: number;
    message: string;
    severity: DiagnosticSeverityType;
    range?: vscode.Range; // Optional range for file-level issues
    codeSnippet?: string; // Code snippet for CI/CD evidence (required for all violations)
    likelyBatched?: boolean; // For N+1: true if wrapped in batching pattern (Promise.all, .map().join(), etc.)
    // Pattern-specific data
    codeLineCount?: number; // For God Class
    godClassTier?: 'Large Class' | 'Monolith'; // Tier for God Class (801-1500 = Large Class, 1501+ = Monolith)
    importText?: string; // For Layer Violation
    sourceLayer?: LayerType; // For Layer Violation
    targetLayer?: LayerType; // For Layer Violation
}

export interface IssueSummary {
    totalIssues: number;
    totalPatterns: number;
    patternCounts: Map<IssuePattern, number>;
}

export interface AnalysisResult {
    godClass: {
        isGodClass: boolean;
        codeLineCount: number;
    };
    nPlusOne: {
        violations: number[];
    };
    layerViolations: LayerViolation[];
    // New: Raw issues array and summary
    rawIssues: RawIssue[];
    summary: IssueSummary;
    codeLineCount: number; // Exposed for reuse to avoid duplicate getText() calls
}

// Configurable violation weights (can be moved to config file in future)
export const VIOLATION_WEIGHTS = {
    layerViolation: 10,    // Layer violations (highest weight - architectural boundary violations)
    godClassMonolith: 5,    // God Class Monoliths (1501+ LOC for regular files, 2501+ for type files)
    nPlusOneQuery: 2       // N+1 Queries (reduced from 3 due to false positives)
} as const;

const GOD_CLASS_THRESHOLD = 800; // Only flag files exceeding 800 LOC
const SUPPORTED_EXTENSIONS = ['.js', '.ts', '.jsx', '.tsx', '.mjs', '.py', '.java', '.go'];

// Layer patterns - ordered by specificity
// Ghost-style patterns are checked first, then default patterns
const LAYER_PATTERNS = {
    // Ghost-style patterns (checked first)
    service: ['/services/'],
    model: ['/models/'],
    lib: ['/lib/', '/adapters/'],
    api: ['/api/', '/presentation/', '/controllers/'],
    // Default patterns
    domain: ['/domain/', '/core/', '/usecases/'],
    infra: ['/infra/', '/infrastructure/', '/persistence/']
};

// Forbidden dependencies: [sourceLayer, targetLayer]
// These represent architectural violations where lower layers depend on higher layers
const FORBIDDEN_DEPENDENCIES: Array<[LayerType, LayerType]> = [
    // Default violations
    ['domain', 'api'],
    ['infra', 'api'],
    ['infra', 'domain'],
    // Ghost-style violations
    ['service', 'api'],  // e.g., services/email-service/EmailServiceWrapper.js → api/...
    ['lib', 'api']       // e.g., lib/lexical.js → api/endpoints/...
];

/**
 * Simple .gitignore pattern matcher (handles common patterns for CI/CD)
 * Returns true if file should be ignored
 */
function isGitIgnored(filePath: string, workspaceRoot: string | null): boolean {
    if (!workspaceRoot) {
        return false; // Can't check .gitignore without workspace root
    }
    
    const gitignorePath = path.join(workspaceRoot, '.gitignore');
    if (!fs.existsSync(gitignorePath)) {
        return false; // No .gitignore file
    }
    
    try {
        const gitignoreContent = fs.readFileSync(gitignorePath, 'utf-8');
        const patterns = gitignoreContent.split('\n')
            .map(line => line.trim())
            .filter(line => line && !line.startsWith('#')); // Remove comments and empty lines
        
        const normalizedFilePath = path.relative(workspaceRoot, filePath).replace(/\\/g, '/');
        
        for (const pattern of patterns) {
            // Simple pattern matching (handles common cases)
            // Convert glob patterns to regex-like matching
            let regexPattern = pattern
                .replace(/\./g, '\\.')  // Escape dots
                .replace(/\*/g, '.*')   // * matches anything
                .replace(/\?/g, '.');   // ? matches single char
            
            // Handle leading slash (root-relative)
            if (pattern.startsWith('/')) {
                regexPattern = '^' + regexPattern.substring(1);
            } else {
                regexPattern = '.*' + regexPattern; // Match anywhere in path
            }
            
            // Handle trailing slash (directory)
            if (pattern.endsWith('/')) {
                regexPattern = regexPattern.substring(0, regexPattern.length - 1) + '(/.*)?';
            }
            
            const regex = new RegExp(regexPattern);
            if (regex.test(normalizedFilePath)) {
                return true;
            }
        }
    } catch (error) {
        // If .gitignore parsing fails, don't block analysis
        console.warn(`[ArchDrift] Failed to parse .gitignore: ${error}`);
    }
    
    return false;
}

/**
 * Checks if a file extension is supported for analysis
 */
export function isSupportedFile(uri: vscode.Uri): boolean {
    const filePath = uri.fsPath.toLowerCase();
    
    // Smart Exclusions: Do not run architectural drift checks on test/bench/example files
    if (filePath.includes('/test/') || filePath.includes('\\test\\') ||
        filePath.includes('/tests/') || filePath.includes('\\tests\\') ||
        filePath.includes('/bench/') || filePath.includes('\\bench\\') ||
        filePath.includes('/benchmark/') || filePath.includes('\\benchmark\\') ||
        filePath.includes('/examples/') || filePath.includes('\\examples\\') ||
        filePath.includes('/example/') || filePath.includes('\\example\\')) {
        return false;
    }
    
    // Exclude minified files (min.js, min.css, etc.)
    if (filePath.includes('.min.') || filePath.endsWith('.min.js') || filePath.endsWith('.min.ts')) {
        return false;
    }
    
    // Exclude node_modules, dist, build directories
    if (filePath.includes('node_modules') || filePath.includes('\\dist\\') || filePath.includes('/dist/') ||
        filePath.includes('\\build\\') || filePath.includes('/build/')) {
        return false;
    }
    
    const lastDot = filePath.lastIndexOf('.');
    if (lastDot === -1 || lastDot === filePath.length - 1) {
        return false; // No extension or dot at end
    }
    const ext = filePath.substring(lastDot);
    return SUPPORTED_EXTENSIONS.includes(ext.toLowerCase());
}

/**
 * Normalizes an absolute path to a workspace-relative path for layer detection.
 * 
 * FIX: Layer Detection failing on Windows Absolute Paths
 * PROBLEM: detectLayer(filePath) was working with absolute paths, but converting
 * to workspace-relative paths makes layer detection more robust and avoids false
 * positives from path components outside the project (e.g., "C:\Users\api\project").
 * 
 * WHAT CHANGED: Layer detection now works for absolute workspace paths by normalizing
 * them to workspace-relative paths before pattern matching. This ensures that:
 * - Paths like "C:\Users\Prajeesh\Downloads\for testing 2\Ghost\ghost\core\core\server\lib\lexical.js"
 *   are normalized to "ghost/core/core/server/lib/lexical.js" (relative to workspace root)
 * - Layer patterns like "/lib/" and "/api/" are matched in the project structure,
 *   not in user directory names or other path components outside the project
 * 
 * This function:
 * 1. Calculates path relative to project root
 *    Result: ghost/core/core/server/lib/lexical.js (regardless of where the project is downloaded)
 * 2. Forces forward slashes (Windows fix)
 *    Replaces all '\' with '/' so string checks like '.includes("/lib/")' work.
 * 
 * @param absolutePath - Full absolute path from VS Code (e.g., "C:\Users\...\lib\file.ts")
 * @param rootPath - Workspace root path (e.g., "C:\Users\...\Ghost") or null if not available
 * @returns Normalized relative path with forward slashes (e.g., "ghost/core/core/server/lib/lexical.js")
 */
export function getNormalizedRelativePath(absolutePath: string, rootPath: string | null): string {
    // If no workspace root provided, normalize and return absolute path
    // (this maintains backward compatibility and works in test environments)
    if (!rootPath) {
        return absolutePath.split(path.sep).join('/');
    }
    
    // CRITICAL FIX #1: Case Sensitivity & Drive Letters
    // On Windows, fs.realpathSync might return C:\ while VS Code's URI returns c:\
    // If these aren't unified, path.relative returns an absolute path, breaking layer detection
    // Solution: Lowercase drive letters before calculating relative path
    const normalizedAbsolute = normalizeDriveLetter(absolutePath);
    const normalizedRoot = normalizeDriveLetter(rootPath);
    
    // CRITICAL: Call path.relative with normalized paths (drive letters unified)
    // Then normalize the result to forward slashes
    // This ensures path.relative works correctly on Windows regardless of drive letter case
    let relativePath = path.relative(normalizedRoot, normalizedAbsolute);
    
    // Normalize path separators (Windows backslashes → forward slashes)
    // This ensures .includes('/lib/') works correctly on Windows
    relativePath = relativePath.split(path.sep).join('/');
    
    // If path.relative returns an empty string or '.', the file is at the root
    // In this case, we still want to check the absolute path for layer patterns
    if (!relativePath || relativePath === '.') {
        // Return normalized absolute path so layer detection can still work
        return normalizedAbsolute.split(path.sep).join('/');
    }
    
    // Handle edge case: if relative path doesn't start with /, it's a relative path
    // like "lib/file.js". This is fine - detectLayer will handle it with the startsWith check
    return relativePath;
}

/**
 * Normalizes drive letters to lowercase to ensure consistent path comparison
 * Example: "C:\\path" → "c:\\path", "/path" → "/path" (Unix unchanged)
 */
function normalizeDriveLetter(filePath: string): string {
    // Match Windows drive letter (C:, D:, etc.) and lowercase it
    return filePath.replace(/^([A-Z]):/, (match, drive) => drive.toLowerCase() + ':');
}

/**
 * Detects the layer of a file based on its path
 * Returns LayerType | null (unclassified)
 * Checks Ghost-style patterns first, then default patterns
 * 
 * Layer detection works by checking if the normalized (lowercase, forward-slash) path
 * contains any of the layer pattern substrings. For example:
 * - "ghost/core/core/server/services/email-service/EmailServiceWrapper.js" 
 *   → contains "/services/" → returns 'service'
 * - Resolved import path "ghost/core/core/server/api/endpoints/..."
 *   → contains "/api/" → returns 'api'
 * 
 * IMPORTANT: Layer detection now works for absolute workspace paths, not just repo-relative paths.
 * This means it correctly handles full VS Code paths like:
 * - "C:\\Users\\Prajeesh\\Downloads\\for testing 2\\Ghost\\ghost\\core\\core\\server\\lib\\lexical.js"
 *   → normalized to "c:/users/prajeesh/downloads/for testing 2/ghost/ghost/core/core/server/lib/lexical.js"
 *   → contains "/lib/" → returns 'lib'
 * 
 * The pattern matching uses substring search, so it works regardless of what comes before
 * the layer pattern (e.g., "/lib/" matches anywhere in the path, not just at a specific position).
 * 
 * This works with both relative and absolute paths, and handles Windows backslashes
 * by normalizing them to forward slashes before pattern matching.
 */
export function detectLayer(filePath: string): LayerType | null {
    // CRITICAL: Normalize path separators using path.sep (Windows backslashes → forward slashes)
    // This ensures .includes('/lib/') works correctly on Windows where filePath uses backslashes
    // Then lowercase for case-insensitive matching
    // This handles:
    // - Windows absolute paths: "C:\\Users\\...\\lib\\file.js" → "c:/users/.../lib/file.js"
    // - Windows relative paths: "ghost\\core\\lib\\file.js" → "ghost/core/lib/file.js"
    // - Unix absolute paths: "/home/user/.../lib/file.js" → "/home/user/.../lib/file.js"
    // - Unix relative paths: "ghost/core/lib/file.js" → "ghost/core/lib/file.js"
    // Drive letters (C:) are lowercased but preserved, and pattern matching works
    // regardless of the path prefix (workspace root, user directory, etc.)
    const normalizedPath = filePath.split(path.sep).join('/').toLowerCase();
    
    // Check Ghost-style patterns first (service, model, lib, api)
    // Order matters: check more specific patterns first
    // Patterns can match:
    // - With leading slash anywhere: "/lib/" in "path/to/lib/file.js"
    // - At start of path: "lib/" in "lib/file.js" (relative path)
    // - As directory: "/lib" at end or before slash
    for (const pattern of LAYER_PATTERNS.service) {
        const patternWithoutSlash = pattern.replace(/^\//, '').replace(/\/$/, ''); // Remove leading/trailing slashes
        if (normalizedPath.includes(pattern) || 
            normalizedPath.startsWith(patternWithoutSlash + '/') ||
            normalizedPath === patternWithoutSlash) {
            return 'service';
        }
    }
    for (const pattern of LAYER_PATTERNS.model) {
        const patternWithoutSlash = pattern.replace(/^\//, '').replace(/\/$/, '');
        if (normalizedPath.includes(pattern) || 
            normalizedPath.startsWith(patternWithoutSlash + '/') ||
            normalizedPath === patternWithoutSlash) {
            return 'model';
        }
    }
    for (const pattern of LAYER_PATTERNS.lib) {
        const patternWithoutSlash = pattern.replace(/^\//, '').replace(/\/$/, '');
        if (normalizedPath.includes(pattern) || 
            normalizedPath.startsWith(patternWithoutSlash + '/') ||
            normalizedPath === patternWithoutSlash) {
            return 'lib';
        }
    }
    for (const pattern of LAYER_PATTERNS.api) {
        const patternWithoutSlash = pattern.replace(/^\//, '').replace(/\/$/, '');
        if (normalizedPath.includes(pattern) || 
            normalizedPath.startsWith(patternWithoutSlash + '/') ||
            normalizedPath === patternWithoutSlash) {
            return 'api';
        }
    }
    
    // Check default patterns (domain, infra)
    for (const pattern of LAYER_PATTERNS.domain) {
        const patternWithoutSlash = pattern.replace(/^\//, '').replace(/\/$/, '');
        if (normalizedPath.includes(pattern) || 
            normalizedPath.startsWith(patternWithoutSlash + '/') ||
            normalizedPath === patternWithoutSlash) {
            return 'domain';
        }
    }
    for (const pattern of LAYER_PATTERNS.infra) {
        const patternWithoutSlash = pattern.replace(/^\//, '').replace(/\/$/, '');
        if (normalizedPath.includes(pattern) || 
            normalizedPath.startsWith(patternWithoutSlash + '/') ||
            normalizedPath === patternWithoutSlash) {
            return 'infra';
        }
    }
    
    return null; // Unclassified
}

/**
 * Resolves a relative import path to an absolute path string using Node.js path.resolve
 * 
 * This is the standard, robust way to resolve relative paths. The resolved absolute path
 * is then normalized using getNormalizedRelativePath before layer detection.
 * 
 * Example:
 * - Source: "C:\\Users\\...\\lib\\lexical.js"
 * - Import: "../api/endpoints/utils/serializers/output/posts"
 * - Resolved (absolute): "C:\\Users\\...\\api\\endpoints\\utils\\serializers\\output\\posts"
 * - Then normalized to workspace-relative: "Ghost/ghost/core/core/server/api/endpoints/..."
 * - Contains "/api/" → correctly identified as 'api' layer
 */
export function resolveImportPath(importPath: string, sourceFilePath: string): string {
    // Handle relative imports (./path or ../path)
    if (importPath.startsWith('./') || importPath.startsWith('../')) {
        // Use Node.js path.resolve for robust path resolution
        // This handles all edge cases (Windows backslashes, drive letters, etc.)
        const sourceDir = path.dirname(sourceFilePath);
        const absoluteTargetPath = path.resolve(sourceDir, importPath);
        
        // CRITICAL FIX #3: Handle Unresolved Dependencies
        // In Ghost, some requires might point to generated files or optional dependencies
        // that don't exist on disk during the scan.
        // Check if the resolved path exists (as file or directory)
        // If it doesn't exist, we still return it but mark it for "Broken Dependency" handling
        const pathExists = fs.existsSync(absoluteTargetPath) || 
                          fs.existsSync(absoluteTargetPath + '.js') ||
                          fs.existsSync(absoluteTargetPath + '.ts') ||
                          fs.existsSync(absoluteTargetPath + '/index.js') ||
                          fs.existsSync(absoluteTargetPath + '/index.ts');
        
        // Store the "broken" status in a way that can be checked later
        // For now, we return the path anyway (layer detection can still work from the path string)
        // But we could add a flag or separate handling for broken dependencies
        if (!pathExists && !importPath.startsWith('@')) {
            // This is a broken dependency - the file doesn't exist
            // We'll still try to detect the layer from the path pattern
            // but could flag this separately if needed
        }
        
        return absoluteTargetPath;
    }
    
    // For absolute/aliased imports (e.g., @app/domain/foo), return as-is
    // These will be pattern-matched directly against layer patterns
    return importPath;
}

/**
 * Extracts import statements from JavaScript/TypeScript code
 */
export function extractImportsJS(lines: string[]): Array<{ line: number; column: number; importPath: string; importText: string }> {
    const imports: Array<{ line: number; column: number; importPath: string; importText: string }> = [];
    
    // Patterns for import/require - capture the import path
    // import X from 'path' or import {X} from 'path' or import * as X from 'path'
    // const/var/let X = require('path') or const {X} = require('path')
    // X = require('path') or X = require('path').property
    // require('path') standalone or require('path').property
    const importPatterns = [
        /^\s*import\s+(?:(?:\{[^}]*\}|\*\s+as\s+\w+|\w+)\s+from\s+)?['"]([^'"]+)['"]/,
        /^\s*(?:const|var|let)\s+(?:\{[^}]*\}|\w+)\s*=\s*require\s*\(\s*['"]([^'"]+)['"]\s*\)/,
        /\brequire\s*\(\s*['"]([^'"]+)['"]\s*\)(?:\.\w+)?/,  // require('path') or require('path').property (anywhere in line)
        /^\s*import\s*\(\s*['"]([^'"]+)['"]\s*\)/  // Dynamic import
    ];
    
    // CRITICAL FIX #2: Handle line-breaks in require() statements
    // Some code has: const posts = require(
    //   '../api/posts'
    // ).all;
    // We need to handle multi-line requires by joining consecutive lines
    let skipUntilLine = -1; // Track lines to skip after multi-line processing
    
    for (let i = 0; i < lines.length; i++) {
        // Skip lines that were part of a multi-line require
        if (i < skipUntilLine) {
            continue;
        }
        
        let line = lines[i];
        let actualLineNumber = i + 1; // Track original line number
        
        // Skip comments
        if (line.trim().startsWith('//') || line.trim().startsWith('/*')) {
            continue;
        }
        
        // Check if this line starts a require() that might span multiple lines
        // Pattern: require( with no closing ) on same line
        const hasRequireStart = /\brequire\s*\(\s*/.test(line);
        const hasRequireEnd = line.includes(')');
        
        if (hasRequireStart && !hasRequireEnd) {
            // This line starts a require but doesn't close it - likely multi-line
            // Look ahead up to 5 lines for the closing parenthesis
            let multiLineRequire = line;
            let j = i + 1;
            let foundClosing = false;
            
            while (j < lines.length && j < i + 6 && !foundClosing) {
                const nextLine = lines[j];
                // Join with space (removes newline, preserves structure)
                multiLineRequire += ' ' + nextLine.trim();
                
                // Check if this line completes the require
                if (nextLine.includes(')')) {
                    foundClosing = true;
                    line = multiLineRequire; // Use the joined line
                    skipUntilLine = j + 1; // Skip the lines we've processed
                    break;
                }
                j++;
            }
            
            // If we didn't find closing within reasonable distance, treat as single line
            // (might be a syntax error, but we'll try to match what we can)
        }
        
        // Now try to match patterns on the (potentially joined) line
        for (const pattern of importPatterns) {
            const match = line.match(pattern);
            if (match && match[1]) {
                const importPath = match[1];
                // Only add if not already captured (avoid duplicates)
                const alreadyFound = imports.some(imp => 
                    imp.line === actualLineNumber && imp.importPath === importPath
                );
                if (!alreadyFound) {
                    const column = line.indexOf(importPath);
                    imports.push({
                        line: actualLineNumber, // Use original line number
                        column: column >= 0 ? column : 0,
                        importPath: importPath,
                        importText: line.trim()
                    });
                }
                break; // Only match once per line per pattern
            }
        }
    }
    
    return imports;
}

/**
 * Extracts import statements from Python code
 */
export function extractImportsPython(lines: string[]): Array<{ line: number; column: number; importPath: string; importText: string }> {
    const imports: Array<{ line: number; column: number; importPath: string; importText: string }> = [];
    
    // Patterns: import package.module or from package.module import X
    const importPattern = /^\s*(?:import\s+([\w.]+)|from\s+([\w.]+)\s+import)/;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const match = line.match(importPattern);
        if (match) {
            const importPath = match[1] || match[2];
            const column = line.indexOf(importPath);
            imports.push({
                line: i + 1,
                column: column >= 0 ? column : 0,
                importPath: importPath || '',
                importText: line.trim()
            });
        }
    }
    
    return imports;
}

/**
 * Extracts import statements from Java code
 */
export function extractImportsJava(lines: string[]): Array<{ line: number; column: number; importPath: string; importText: string }> {
    const imports: Array<{ line: number; column: number; importPath: string; importText: string }> = [];
    
    // Pattern: import com.company.package.Class;
    const importPattern = /^\s*import\s+([\w.]+)\s*;/;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const match = line.match(importPattern);
        if (match) {
            const importPath = match[1];
            const column = line.indexOf(importPath);
            imports.push({
                line: i + 1,
                column: column >= 0 ? column : 0,
                importPath: importPath || '',
                importText: line.trim()
            });
        }
    }
    
    return imports;
}

/**
 * Extracts import statements from Go code
 */
export function extractImportsGo(lines: string[]): Array<{ line: number; column: number; importPath: string; importText: string }> {
    const imports: Array<{ line: number; column: number; importPath: string; importText: string }> = [];
    
    // Pattern: import "package/path" or import alias "package/path"
    const importPattern = /^\s*import\s+(?:\w+\s+)?["']([^"']+)["']/;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const match = line.match(importPattern);
        if (match) {
            const importPath = match[1];
            const column = line.indexOf(importPath);
            imports.push({
                line: i + 1,
                column: column >= 0 ? column : 0,
                importPath: importPath || '',
                importText: line.trim()
            });
        }
    }
    
    return imports;
}

/**
 * Detects layer violations in a document
 */
function detectLayerViolations(
    document: vscode.TextDocument,
    sourceLayer: LayerType | null,
    workspaceRoot: string | null = null,
    outputChannel?: vscode.OutputChannel
): LayerViolation[] {
    if (!sourceLayer) {
        return []; // Unclassified files don't get layer checks
    }
    
    const text = document.getText();
    const lines = text.split('\n');
    const languageId = document.languageId;
    // CRITICAL: Normalize Windows path separators (\) to forward slashes (/) at entry point
    // This ensures path resolution and layer detection work correctly on Windows
    const sourceFilePath = document.uri.fsPath.split(path.sep).join('/');
    
    // Extract imports based on language
    let imports: Array<{ line: number; column: number; importPath: string; importText: string }> = [];
    
    if (languageId === 'javascript' || languageId === 'typescript' || 
        languageId === 'javascriptreact' || languageId === 'typescriptreact') {
        imports = extractImportsJS(lines);
    } else if (languageId === 'python') {
        imports = extractImportsPython(lines);
    } else if (languageId === 'java') {
        imports = extractImportsJava(lines);
    } else if (languageId === 'go') {
        imports = extractImportsGo(lines);
    }
    
    const violations: LayerViolation[] = [];
    
    // Debug: Log all imports found
    if (outputChannel) {
        outputChannel.appendLine(`[ArchDrift] Found ${imports.length} imports in file`);
        imports.forEach((imp, idx) => {
            outputChannel.appendLine(`  Import ${idx + 1}: "${imp.importPath}" at line ${imp.line}`);
        });
    }
    
    for (const imp of imports) {
        // Skip node_modules and external packages (heuristic: no slashes or starts with @)
        // We focus on project-internal imports
        const importPath = imp.importPath;
        
        // CRITICAL: Skip imports that clearly point to node_modules or dist
        const normalizedImportPath = importPath.toLowerCase();
        if (normalizedImportPath.includes('node_modules') || 
            normalizedImportPath.includes('/dist/') || 
            normalizedImportPath.includes('\\dist\\')) {
            if (outputChannel) {
                outputChannel.appendLine(`[ArchDrift] Skipping import to node_modules/dist: "${importPath}"`);
            }
            continue; // Skip external dependencies and build artifacts
        }
        
        // Resolve import path (handle relative imports)
        let resolvedPath = importPath;
        if (importPath.startsWith('./') || importPath.startsWith('../')) {
            resolvedPath = resolveImportPath(importPath, sourceFilePath);
            if (outputChannel) {
                outputChannel.appendLine(`[ArchDrift] Resolved relative import "${importPath}" → "${resolvedPath}"`);
            }
        }
        
        // CRITICAL: Verify resolved path is not in dist/ or node_modules/
        const normalizedResolvedPathLower = resolvedPath.toLowerCase();
        if (normalizedResolvedPathLower.includes('node_modules') || 
            normalizedResolvedPathLower.includes('/dist/') || 
            normalizedResolvedPathLower.includes('\\dist\\') ||
            normalizedResolvedPathLower.includes('/build/') ||
            normalizedResolvedPathLower.includes('\\build\\')) {
            if (outputChannel) {
                outputChannel.appendLine(`[ArchDrift] Skipping resolved path in dist/node_modules/build: "${resolvedPath}"`);
            }
            continue; // Skip build artifacts and external dependencies
        }
        
        // Normalize resolved path to workspace-relative for layer detection
        // This ensures layer detection works correctly with absolute Windows paths
        const normalizedResolvedPath = getNormalizedRelativePath(resolvedPath, workspaceRoot);
        
        if (outputChannel && (importPath.includes('api') || importPath.includes('../'))) {
            outputChannel.appendLine(`[ArchDrift] Processing import: "${importPath}"`);
            outputChannel.appendLine(`  Resolved: "${resolvedPath}"`);
            outputChannel.appendLine(`  Normalized: "${normalizedResolvedPath}"`);
        }
        
        // Detect target layer from import path
        // detectLayer works with both absolute and relative paths by doing substring matching
        // It normalizes paths internally (backslashes → forward slashes, lowercase)
        let targetLayer = detectLayer(normalizedResolvedPath);
        
        if (!targetLayer) {
            // Fallback: Also check the original import path (for aliased imports like @app/domain)
            // Normalize it too if it's an absolute path
            const normalizedImportPath = getNormalizedRelativePath(importPath, workspaceRoot);
            targetLayer = detectLayer(normalizedImportPath);
        }
        
        // Final fallback: if still no layer detected and it's a relative import,
        // try detecting from the import path string directly (might contain layer patterns)
        if (!targetLayer && (importPath.includes('/api/') || importPath.includes('/lib/') || 
            importPath.includes('/services/') || importPath.includes('/domain/') || 
            importPath.includes('/infra/'))) {
            targetLayer = detectLayer(importPath);
        }
        
        if (outputChannel && (importPath.includes('api') || importPath.includes('../'))) {
            outputChannel.appendLine(`  Target layer: ${targetLayer || 'null (not detected)'}`);
        }
        
        if (!targetLayer) {
            if (outputChannel && (importPath.includes('api') || importPath.includes('../'))) {
                outputChannel.appendLine(`  ⚠️ Skipping: Could not detect target layer for "${importPath}"`);
            }
            continue; // Skip unclassified targets
        }
        
        // Check if this dependency is forbidden
        const isForbidden = FORBIDDEN_DEPENDENCIES.some(
            ([src, tgt]) => src === sourceLayer && tgt === targetLayer
        );
        
        if (outputChannel && (importPath.includes('api') || importPath.includes('../'))) {
            outputChannel.appendLine(`  Forbidden check: ${sourceLayer} → ${targetLayer} = ${isForbidden ? 'VIOLATION!' : 'allowed'}`);
        }
        
        if (isForbidden) {
            violations.push({
                sourceLayer,
                targetLayer,
                line: imp.line,
                column: imp.column,
                importText: imp.importText
            });
        }
    }
    
    return violations;
}

/**
 * Counts actual code lines (excluding empty lines and comments)
 */
export function countCodeLines(text: string, languageId: string): number {
    const lines = text.split('\n');
    let codeLineCount = 0;
    let inBlockComment = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        // Skip empty lines
        if (line === '') {
            continue;
        }

        // Handle block comments
        if (languageId === 'javascript' || languageId === 'typescript' || 
            languageId === 'javascriptreact' || languageId === 'typescriptreact') {
            // Check for block comment start/end
            if (line.includes('/*')) {
                inBlockComment = true;
            }
            if (line.includes('*/')) {
                inBlockComment = false;
                // If the line has code after the comment, count it
                const afterComment = line.substring(line.indexOf('*/') + 2).trim();
                if (afterComment && !afterComment.startsWith('//')) {
                    codeLineCount++;
                }
                continue;
            }
            if (inBlockComment) {
                continue;
            }
            // Skip single-line comments
            if (line.startsWith('//')) {
                continue;
            }
        } else if (languageId === 'python') {
            // Python: skip lines starting with #
            if (line.startsWith('#')) {
                continue;
            }
            // Python block comments are just multiple # lines, already handled above
        } else if (languageId === 'java') {
            // Java: similar to JS/TS
            if (line.includes('/*')) {
                inBlockComment = true;
            }
            if (line.includes('*/')) {
                inBlockComment = false;
                const afterComment = line.substring(line.indexOf('*/') + 2).trim();
                if (afterComment && !afterComment.startsWith('//')) {
                    codeLineCount++;
                }
                continue;
            }
            if (inBlockComment) {
                continue;
            }
            if (line.startsWith('//')) {
                continue;
            }
        } else if (languageId === 'go') {
            // Go: similar to JS/TS
            if (line.includes('/*')) {
                inBlockComment = true;
            }
            if (line.includes('*/')) {
                inBlockComment = false;
                const afterComment = line.substring(line.indexOf('*/') + 2).trim();
                if (afterComment && !afterComment.startsWith('//')) {
                    codeLineCount++;
                }
                continue;
            }
            if (inBlockComment) {
                continue;
            }
            if (line.startsWith('//')) {
                continue;
            }
        }

        codeLineCount++;
    }

    return codeLineCount;
}

/**
 * Result of N+1 query detection with context awareness
 */
export interface NPlusOneDetectionResult {
    violations: number[]; // Line numbers with violations
    optimizedViolations: number[]; // Line numbers that are optimized (cache, etc.)
    batchedViolations: number[]; // Line numbers that are likely batched (Promise.all, .map().join(), etc.)
    hasDataLoader: boolean; // File uses DataLoader or loadMany
}

/**
 * Detects N+1 query patterns: DB/API calls inside loops
 * Now context-aware: checks for DataLoader, cache(), unstable_cache(), and batching patterns
 */
export function detectNPlusOneQueries(text: string, languageId: string): NPlusOneDetectionResult {
    const lines = text.split('\n');
    const violations: number[] = [];
    const optimizedViolations: number[] = [];
    const batchedViolations: number[] = [];
    
    // Check for DataLoader usage
    const hasDataLoader = /dataloader|loadMany|DataLoader/i.test(text);
    
    // Check for Next.js cache patterns
    const cachePatterns = [
        /cache\s*\(/,
        /unstable_cache\s*\(/,
        /export\s+(const|async\s+function)\s+\w+\s*=\s*cache\s*\(/,
        /export\s+(const|async\s+function)\s+\w+\s*=\s*unstable_cache\s*\(/
    ];
    
    // Batching patterns that indicate queries are likely batched
    // Promise.all, Promise.allSettled, array.map().join(), etc.
    const batchingPatterns = [
        /Promise\.all\s*\(/i,
        /Promise\.allSettled\s*\(/i,
        /\.map\s*\([^)]*\)\s*\.(join|then|await)/i,  // .map().join() or .map().then()
        /\.flatMap\s*\(/i,
        /\.reduce\s*\(/i,
        /batch\s*\(/i,
        /bulk\s*\(/i,
        /loadMany\s*\(/i
    ];
    
    // Patterns for loop starts
    const loopPatterns: RegExp[] = [
        /^\s*for\s*\(/,           // for (...)
        /^\s*while\s*\(/,         // while (...)
        /^\s*for\s+\w+\s+in\s+/,  // for x in ... (Python/JS)
        /\.map\s*\(/,             // array.map(...)
        /\.filter\s*\(/,          // array.filter(...)
        /\.forEach\s*\(/,         // array.forEach(...)
    ];

    // Patterns for DB/API calls
    // NOTE: Exclude Map/Set/Array methods (.get, .set, etc.) to avoid false positives
    // Only match actual HTTP/API/database calls, not data structure methods
    const dbApiPatterns: RegExp[] = [
        /await\s+.*\.(query|find|findOne|findById|save|update|delete|create)\s*\(/i,
        /fetch\s*\(/i,
        /axios\.(get|post|put|delete|patch)\s*\(/i,
        /prisma\./i,
        /db\./i,
        /requests\.(get|post|put|delete|patch)\s*\(/i,  // Python requests
        // HTTP client methods with URL strings (exclude Map.get(), Set.get(), etc.)
        /\.(?:get|post|put|delete|patch)\s*\(\s*['"`]https?:\/\//i,  // .get('https://...')
        /\.(?:get|post|put|delete|patch)\s*\(\s*['"`]\//i,  // .get('/api/...')
        // HTTP client objects (http, https, request, etc.)
        /(?:https?|http|request)\.(?:get|post|put|delete|patch)\s*\(/i,
    ];

    // For Python, use indentation-based detection with Python-specific patterns
    if (languageId === 'python') {
        const pythonLoopPatterns: RegExp[] = [
            /^\s*for\s+\w+\s+in\s+/,  // for x in ...
            /^\s*while\s+/,            // while ...
        ];
        const result = detectNPlusOnePython(lines, pythonLoopPatterns, dbApiPatterns, cachePatterns, batchingPatterns);
        return {
            violations: result.violations,
            optimizedViolations: result.optimizedViolations,
            batchedViolations: result.batchedViolations,
            hasDataLoader
        };
    }

    // For brace-based languages (JS/TS/Java/Go)
    const result = detectNPlusOneBraceBased(lines, loopPatterns, dbApiPatterns, cachePatterns, batchingPatterns);
    return {
        violations: result.violations,
        optimizedViolations: result.optimizedViolations,
        batchedViolations: result.batchedViolations,
        hasDataLoader
    };
}

/**
 * Detects N+1 queries in Python (indentation-based)
 */
function detectNPlusOnePython(
    lines: string[],
    loopPatterns: RegExp[],
    dbApiPatterns: RegExp[],
    cachePatterns: RegExp[],
    batchingPatterns: RegExp[]
): { violations: number[]; optimizedViolations: number[]; batchedViolations: number[] } {
    const violations: number[] = [];
    const optimizedViolations: number[] = [];
    const batchedViolations: number[] = [];
    const loopStack: { line: number; indent: number }[] = [];
    
    // Track if we're inside a cached function
    let inCachedFunction = false;
    let cacheDepth = 0;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmedLine = line.trim();
        const indent = line.length - line.trimStart().length;

        // Check for cache() or unstable_cache() wrapper
        const hasCachePattern = cachePatterns.some(pattern => pattern.test(line));
        if (hasCachePattern) {
            inCachedFunction = true;
            cacheDepth = indent;
        }
        
        // Check if we've exited the cached function
        if (inCachedFunction && indent <= cacheDepth && !hasCachePattern) {
            inCachedFunction = false;
        }

        // Check if this line starts a loop
        const isLoopStart = loopPatterns.some(pattern => pattern.test(trimmedLine));
        
        if (isLoopStart) {
            loopStack.push({ line: i, indent });
        }

        // Remove loops that have ended (indentation decreased)
        while (loopStack.length > 0 && indent <= loopStack[loopStack.length - 1].indent && 
               !trimmedLine.startsWith('for ') && !trimmedLine.startsWith('while ')) {
            loopStack.pop();
        }

        // If we're inside a loop, check for DB/API calls
        if (loopStack.length > 0) {
            const hasDbApiCall = dbApiPatterns.some(pattern => pattern.test(line));
            if (hasDbApiCall) {
                // Check if this is wrapped in a batching pattern (look ahead/behind in context)
                const contextStart = Math.max(0, i - 5);
                const contextEnd = Math.min(lines.length, i + 5);
                const context = lines.slice(contextStart, contextEnd).join('\n');
                const isBatched = batchingPatterns.some(pattern => pattern.test(context));
                
                if (inCachedFunction) {
                    optimizedViolations.push(i + 1); // Optimized, don't penalize
                } else if (isBatched) {
                    batchedViolations.push(i + 1); // Likely batched, reduce weight
                } else {
                    violations.push(i + 1); // 1-indexed for VS Code
                }
            }
        }
    }

    return { violations, optimizedViolations, batchedViolations };
}

/**
 * Detects N+1 queries in brace-based languages (JS/TS/Java/Go)
 */
function detectNPlusOneBraceBased(
    lines: string[],
    loopPatterns: RegExp[],
    dbApiPatterns: RegExp[],
    cachePatterns: RegExp[],
    batchingPatterns: RegExp[]
): { violations: number[]; optimizedViolations: number[]; batchedViolations: number[] } {
    const violations: number[] = [];
    const optimizedViolations: number[] = [];
    const batchedViolations: number[] = [];
    const loopStack: { line: number; braceDepth: number }[] = [];
    let currentBraceDepth = 0;
    
    // Track if we're inside a cached function
    let inCachedFunction = false;
    let cacheBraceDepth = -1;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmedLine = line.trim();

        // Count braces on this line
        const openBraces = (line.match(/{/g) || []).length;
        const closeBraces = (line.match(/}/g) || []).length;
        const netBraces = openBraces - closeBraces;

        // Check for cache() or unstable_cache() wrapper
        const hasCachePattern = cachePatterns.some(pattern => pattern.test(line));
        if (hasCachePattern) {
            inCachedFunction = true;
            cacheBraceDepth = currentBraceDepth;
        }
        
        // Check if we've exited the cached function
        if (inCachedFunction && currentBraceDepth < cacheBraceDepth && closeBraces > 0) {
            inCachedFunction = false;
            cacheBraceDepth = -1;
        }

        // Check if this line starts a loop
        const isLoopStart = loopPatterns.some(pattern => pattern.test(trimmedLine));
        
        if (isLoopStart) {
            // Push current brace depth when entering loop
            loopStack.push({ line: i, braceDepth: currentBraceDepth });
        }

        // Update current brace depth
        currentBraceDepth += netBraces;

        // Remove loops that have ended (brace depth returned to loop's starting depth)
        while (loopStack.length > 0 && 
               currentBraceDepth <= loopStack[loopStack.length - 1].braceDepth &&
               closeBraces > 0) {
            loopStack.pop();
        }

        // If we're inside a loop, check for DB/API calls
        if (loopStack.length > 0) {
            const hasDbApiCall = dbApiPatterns.some(pattern => pattern.test(line));
            if (hasDbApiCall) {
                // Check if this is wrapped in a batching pattern (look ahead/behind in context)
                const contextStart = Math.max(0, i - 5);
                const contextEnd = Math.min(lines.length, i + 5);
                const context = lines.slice(contextStart, contextEnd).join('\n');
                const isBatched = batchingPatterns.some(pattern => pattern.test(context));
                
                if (inCachedFunction) {
                    optimizedViolations.push(i + 1); // Optimized, don't penalize
                } else if (isBatched) {
                    batchedViolations.push(i + 1); // Likely batched, reduce weight
                } else {
                    violations.push(i + 1); // 1-indexed for VS Code
                }
            }
        }
    }

    return { violations, optimizedViolations, batchedViolations };
}

/**
 * Groups raw issues by pattern and computes summary statistics
 */
function groupIssuesByPattern(rawIssues: RawIssue[]): IssueSummary {
    const patternCounts = new Map<IssuePattern, number>();
    
    // Initialize all patterns to 0
    const patterns: IssuePattern[] = ['God Class', 'N+1 Query', 'Layer Violation'];
    patterns.forEach(pattern => patternCounts.set(pattern, 0));
    
    // Count issues per pattern
    rawIssues.forEach(issue => {
        const currentCount = patternCounts.get(issue.pattern) || 0;
        patternCounts.set(issue.pattern, currentCount + 1);
    });
    
    // Count unique patterns (patterns with count > 0)
    const totalPatterns = Array.from(patternCounts.values()).filter(count => count > 0).length;
    
    return {
        totalIssues: rawIssues.length,
        totalPatterns: totalPatterns,
        patternCounts: patternCounts
    };
}

/**
 * Analyzes a document and returns analysis results
 */
export function analyzeDocument(document: vscode.TextDocument, workspaceRoot: string | null = null, outputChannel?: vscode.OutputChannel): AnalysisResult {
    const text = document.getText();
    const languageId = document.languageId;
    // Cache lines array to avoid multiple splits
    const lines = text.split('\n');
    const codeLineCount = countCodeLines(text, languageId);
    const nPlusOneResult = detectNPlusOneQueries(text, languageId);
    const nPlusOneViolations = nPlusOneResult.violations;
    const nPlusOneBatched = nPlusOneResult.batchedViolations;
    const hasDataLoader = nPlusOneResult.hasDataLoader;
    
    // Detect layer violations
    // CRITICAL: Normalize Windows path separators (\) to forward slashes (/) at entry point
    // This ensures .includes('/lib/') works correctly on Windows where filePath uses backslashes
    const filePath = document.uri.fsPath;
    
    // Normalize the source file path to workspace-relative for layer detection
    // This ensures layer detection works correctly with absolute Windows paths from VS Code
    const normalizedSourcePath = getNormalizedRelativePath(filePath, workspaceRoot);
    const sourceLayer = detectLayer(normalizedSourcePath);
    
    // Debug logging - log to output channel if available, otherwise console
    // Disabled for workspace scans (outputChannel is undefined during workspace scans)
    const logMsg = `[ArchDrift] Analyzing file: ${filePath.split(path.sep).pop()}\n  Path: ${filePath}\n  Workspace: ${workspaceRoot || 'null'}\n  Normalized: ${normalizedSourcePath}\n  Layer: ${sourceLayer || 'null'}`;
    if (outputChannel) {
        outputChannel.appendLine(logMsg);
    } else {
        console.log(logMsg);
    }
    
    const layerViolations = detectLayerViolations(document, sourceLayer, workspaceRoot, outputChannel);

    // STEP 1: Collect all raw issues into an array
    const rawIssues: RawIssue[] = [];
    
    // Collect God Class issues with tiered weighting
    // 801-1,500 LOC = Large Class (1 point)
    // 1,501+ LOC = Monolith (5 points)
    // For type/schema definition files: 2,500 LOC threshold for Monolith
    const isTypeOrSchemaFile = (): boolean => {
        const fileName = document.fileName.toLowerCase();
        const fileContent = text.toLowerCase();
        
        // Check filename patterns
        if (fileName.includes('schema') || 
            fileName.includes('type') || 
            fileName.includes('.d.ts') ||
            fileName.includes('definition')) {
            return true;
        }
        
        // Check content patterns - type/schema definition files typically have:
        // - High ratio of type/interface/class definitions
        // - Low ratio of function implementations
        const typeKeywords = (fileContent.match(/\b(type|interface|enum|namespace|schema)\s+/g) || []).length;
        const functionKeywords = (fileContent.match(/\b(function|const|let|var)\s+\w+\s*[=:]/g) || []).length;
        const totalLines = lines.length;
        
        // If type keywords are >30% of total lines or >2x function keywords, likely a type definition file
        if (totalLines > 0 && (typeKeywords / totalLines > 0.3 || (functionKeywords > 0 && typeKeywords / functionKeywords > 2))) {
            return true;
        }
        
        return false;
    };
    
    const isTypeDefinitionFile = isTypeOrSchemaFile();
    const monolithThreshold = isTypeDefinitionFile ? 2500 : 1501;
    
    const isGodClass = codeLineCount > GOD_CLASS_THRESHOLD;
    if (isGodClass) {
        const fileRange = new vscode.Range(0, 0, document.lineCount - 1, 0);
        let tier: 'Large Class' | 'Monolith';
        let tierMessage: string;
        
        if (codeLineCount >= monolithThreshold) {
            tier = 'Monolith';
            const fileType = isTypeDefinitionFile ? 'type/schema definition' : '';
            tierMessage = `Monolith detected (${codeLineCount} code lines${fileType ? ` in ${fileType} file` : ''}). Consider splitting into smaller modules to reduce complexity pressure.`;
        } else {
            tier = 'Large Class';
            tierMessage = `Large Class detected (${codeLineCount} code lines). Consider splitting into smaller modules.`;
        }
        
        // Get code snippet (first 3 lines of file for context)
        const codeSnippet = lines.slice(0, Math.min(3, lines.length)).join('\n').substring(0, 200);
        
        rawIssues.push({
            pattern: 'God Class',
            line: 1,
            column: 0,
            message: tierMessage,
            severity: DiagnosticSeverity.Warning,
            range: fileRange,
            codeSnippet: codeSnippet,
            codeLineCount: codeLineCount,
            godClassTier: tier
        });
    }
    
    // Collect N+1 Query issues
    // Apply DataLoader penalty reduction: 90% reduction if file uses DataLoader
    // Batched violations get 50% weight reduction (they're likely optimized)
    const nPlusOnePenaltyMultiplier = hasDataLoader ? 0.1 : 1.0;
    const effectiveNPlusOneCount = Math.ceil(nPlusOneViolations.length * nPlusOnePenaltyMultiplier);
    
    // Only add violations up to the effective count (reduced if DataLoader is present)
    nPlusOneViolations.slice(0, effectiveNPlusOneCount).forEach(lineNumber => {
        const lineIndex = Math.max(0, Math.min(lineNumber - 1, document.lineCount - 1));
        try {
            const line = document.lineAt(lineIndex);
            const isBatched = nPlusOneBatched.includes(lineNumber);
            const message = hasDataLoader 
                ? `Database/API call inside loop (DataLoader detected - penalty reduced). Consider batching queries or moving the call outside the loop.`
                : isBatched
                ? `Database/API call inside loop (likely batched - weight reduced). Consider batching queries or moving the call outside the loop.`
                : `Database/API call inside loop. Consider batching queries or moving the call outside the loop.`;
            
            // Get code snippet (violation line + 2 lines of context)
            const startLine = Math.max(0, lineIndex - 1);
            const endLine = Math.min(lines.length, lineIndex + 2);
            const codeSnippet = lines.slice(startLine, endLine).join('\n').substring(0, 200);
            
            rawIssues.push({
                pattern: 'N+1 Query',
                line: lineNumber,
                column: 0,
                message: message,
                severity: DiagnosticSeverity.Warning,
                codeSnippet: codeSnippet,
                likelyBatched: isBatched
            });
        } catch (error) {
            // Skip invalid line numbers
        }
    });
    
    // Note: optimizedViolations are not added to rawIssues - they're already handled by cache()
    
    // Collect Layer Violation issues
    layerViolations.forEach(violation => {
        // Get code snippet (violation line + 2 lines of context)
        const lineIndex = Math.max(0, Math.min(violation.line - 1, lines.length - 1));
        const startLine = Math.max(0, lineIndex - 1);
        const endLine = Math.min(lines.length, lineIndex + 2);
        const codeSnippet = lines.slice(startLine, endLine).join('\n').substring(0, 200);
        
        rawIssues.push({
            pattern: 'Layer Violation',
            line: violation.line,
            column: violation.column,
            message: `${violation.sourceLayer} module importing from ${violation.targetLayer} ("${violation.importText}"). This creates architectural coupling between layers. Consider refactoring to respect layer boundaries.`,
            severity: DiagnosticSeverity.Error,
            codeSnippet: codeSnippet,
            importText: violation.importText,
            sourceLayer: violation.sourceLayer,
            targetLayer: violation.targetLayer
        });
    });
    
    // STEP 2: Build grouped map by pattern with counts
    const summary = groupIssuesByPattern(rawIssues);

    return {
        godClass: {
            isGodClass: isGodClass,
            codeLineCount: codeLineCount
        },
        nPlusOne: {
            violations: nPlusOneViolations
        },
        layerViolations: layerViolations,
        rawIssues: rawIssues,
        summary: summary,
        codeLineCount: codeLineCount // Exposed for reuse to avoid duplicate getText() calls
    };
}

/**
 * Checks if a file is production code (not test, not ignored by .gitignore)
 * CI/CD Gatekeeper: Any supported file is production unless explicitly excluded
 */
export function isProductionCode(filePath: string, workspaceRoot: string | null = null): boolean {
    const normalizedPath = filePath.replace(/\\/g, '/').toLowerCase();
    
    // Exclude test patterns (common test file/directory patterns)
    const testPatterns = [
        '/test/', '/tests/', '/__tests__/', '/__test__/',
        '/spec/', '/specs/',
        '.test.', '.spec.',
        '/coverage/', '/.nyc_output/',
        '/bench/', '/benches/', '/benchmark/', '/benchmarks/',
        '/example/', '/examples/',
        '/demo/', '/demos/',
        '/playground/', '/sandbox/'
    ];
    
    if (testPatterns.some(pattern => normalizedPath.includes(pattern) || normalizedPath.endsWith(pattern.replace('/', '')))) {
        return false;
    }
    
    // Exclude test file extensions
    if (normalizedPath.endsWith('.test.ts') || normalizedPath.endsWith('.test.js') ||
        normalizedPath.endsWith('.test.tsx') || normalizedPath.endsWith('.test.jsx') ||
        normalizedPath.endsWith('.spec.ts') || normalizedPath.endsWith('.spec.js') ||
        normalizedPath.endsWith('.spec.tsx') || normalizedPath.endsWith('.spec.jsx')) {
        return false;
    }
    
    // Exclude build artifacts
    if (normalizedPath.includes('/dist/') || normalizedPath.includes('/build/') ||
        normalizedPath.includes('/out/') || normalizedPath.includes('/.next/') ||
        normalizedPath.includes('/node_modules/') || normalizedPath.includes('/.cache/')) {
        return false;
    }
    
    // Exclude minified files
    if (normalizedPath.includes('.min.') || normalizedPath.includes('.bundle.')) {
        return false;
    }
    
    // Check if file is ignored by .gitignore
    if (isGitIgnored(filePath, workspaceRoot)) {
        return false;
    }
    
    // Check if file has a supported extension (any supported file is production unless excluded above)
    const lastDot = normalizedPath.lastIndexOf('.');
    if (lastDot === -1 || lastDot === normalizedPath.length - 1) {
        return false; // No extension
    }
    const ext = normalizedPath.substring(lastDot);
    if (!SUPPORTED_EXTENSIONS.includes(ext)) {
        return false; // Not a supported file type
    }
    
    // If we get here, it's a supported file that's not a test and not ignored
    return true;
}

/**
 * Calculates the Architectural Drift score from analysis results
 * CI/CD Gatekeeper: 0% = perfect (no drift), 100% = total drift
 * @param rawIssues Array of raw issues from analysis
 * @param productionLOC Total lines of production code
 * @param totalProductionFiles Total number of production files
 * @param strictMode Whether to use density-based scoring with logarithmic floor (default: true)
 * @param workspaceRoot Workspace root path for .gitignore checking
 * @returns Object containing drift score and related metrics
 */
export interface DriftCalculationResult {
    driftScore: number; // Architectural Drift (0-100, where 0 = perfect, 100 = total drift)
    weightedDebt: number;
    weightedDebtDensity: number; // Debt points per 1,000 LOC
    productionLOC: number;
    productionIssues: number;
    totalProductionFiles: number;
}

export function calculateDrift(rawIssues: RawIssue[], productionLOC: number, totalProductionFiles: number, strictMode: boolean = true, workspaceRoot: string | null = null, domain?: 'FRAMEWORK' | 'UTILITY' | 'DATABASE' | 'APPLICATION' | 'UNKNOWN'): DriftCalculationResult {

    if (strictMode) {
        // STRICT MODE: Proportional density-based penalties
        let productionIssues = 0;
        let godClassMonoliths = 0;
        let nPlusOneQueries = 0;
        let layerViolations = 0;

        rawIssues.forEach(issue => {
            productionIssues++;
            
            if (issue.pattern === 'Layer Violation') {
                layerViolations++;
            } else if (issue.pattern === 'N+1 Query') {
                // Batched violations get 50% weight reduction
                if (issue.likelyBatched) {
                    nPlusOneQueries += 0.5; // Half weight for batched
                } else {
                    nPlusOneQueries++;
                }
            } else if (issue.pattern === 'God Class') {
                // Only Monolith counts (threshold varies: 1501 for regular files, 2501 for type/schema files)
                // Check if it's a type definition file by examining the file path and message
                const filePath = (issue as any).filePath || '';
                const isTypeFile = filePath && (
                    filePath.toLowerCase().includes('schema') ||
                    filePath.toLowerCase().includes('type') ||
                    filePath.toLowerCase().endsWith('.d.ts') ||
                    filePath.toLowerCase().includes('definition') ||
                    (issue.message && issue.message.includes('type/schema definition'))
                );
                const monolithThreshold = isTypeFile ? 2501 : 1501;
                
                // Only count as Monolith if it exceeds the appropriate threshold
                // If tier is already set to Monolith, trust it (it was set correctly during analysis)
                // Otherwise, check if LOC exceeds threshold
                if (issue.godClassTier === 'Monolith') {
                    // Double-check: if it's a type file and LOC is between 1501-2500, it shouldn't be Monolith
                    if (isTypeFile && issue.codeLineCount && issue.codeLineCount < 2501) {
                        // Don't count as Monolith - it's a type file below 2501 threshold
                    } else {
                        godClassMonoliths++;
                    }
                } else if (issue.codeLineCount && issue.codeLineCount >= monolithThreshold) {
                    // Fallback: if tier not set but LOC exceeds threshold, count as Monolith
                    godClassMonoliths++;
                }
            }
        });
        
        // Domain-aware calculation: Use domain-specific weights if domain is provided
        // If domain is not provided, detect it from workspace root or use UNKNOWN
        const detectedDomain: ProjectDomain = domain || (workspaceRoot ? detectProjectDomain(path.basename(workspaceRoot), { layer: layerViolations, nPlusOne: nPlusOneQueries, godClass: godClassMonoliths }) : 'UNKNOWN');
        const domainWeights = DOMAIN_WEIGHTS[detectedDomain];
        
        // Calculate weighted violation count using domain-aware weights
        const weightedViolations = (godClassMonoliths * domainWeights.godClassMonolith) + 
                                   (nPlusOneQueries * domainWeights.nPlusOneQuery) + 
                                   (layerViolations * domainWeights.layerViolation);
        
        // Domain-aware drift calculation using weighted densities
        // Drift = (Structural_Weight * Layer_Density) + (Performance_Weight * N1_Density) + (Complexity_Weight * GodClass_Density)
        const totalFiles = Math.max(totalProductionFiles, 1); // Prevent division by zero
        
        // Calculate individual densities
        const layerDensity = layerViolations / totalFiles;
        const n1Density = nPlusOneQueries / totalFiles;
        const godClassDensity = godClassMonoliths / totalFiles;
        
        // Apply domain-specific weights to densities
        const structuralDrift = domainWeights.structuralWeight * (layerDensity * domainWeights.layerViolation + godClassDensity * domainWeights.godClassMonolith) * 100;
        const performanceDrift = domainWeights.performanceWeight * (n1Density * domainWeights.nPlusOneQuery) * 100;
        const complexityDrift = domainWeights.complexityWeight * (godClassDensity * domainWeights.godClassMonolith) * 100;
        
        // Combined drift score
        let driftScore = structuralDrift + performanceDrift + complexityDrift;
        
        // Calculate overall violation density for ceiling calculation
        const violationDensity = weightedViolations / totalFiles;
        
        // Logarithmic Ceiling: Cap maximum drift for extremely problematic codebases
        // MONOTONIC GUARANTEE: ceiling(density) is strictly non-decreasing - higher density never results in lower ceiling
        // Formula: ceiling = 100 - (60 * e^(-violationDensity * 1.5))
        // This ensures: (1) early saturation for low densities, (2) smooth asymptotic approach to 100, (3) monotonicity
        const logarithmicCeiling = 100 - (60 * Math.exp(-violationDensity * 1.5));
        driftScore = Math.min(driftScore, logarithmicCeiling);
        
        // Clamp result between 0 and 100 (0 = perfect, 100 = total drift)
        const driftScoreClamped = Math.min(100, Math.max(0, driftScore));
        
        // Round to 1 decimal place for display
        const driftScoreRounded = Math.round(driftScoreClamped * 10) / 10;
        
        // Calculate weighted debt for reporting
        const weightedDebt = weightedViolations;
        const weightedDebtDensity = productionLOC > 0 ? (weightedDebt / (productionLOC / 1000)) : 0;
        
        // Validation: Check for edge cases
        // Weighted debt can exceed production files (each violation is weighted, multiple violations per file possible)
        // But if violation density is extremely high (>10 violations per file), log a warning
        if (totalFiles > 0 && violationDensity > 10) {
            // This is unusual - may indicate calculation error or extremely problematic codebase
            // Log warning but don't fail - this is a valid (if extreme) case
            console.warn(`[ArchDrift] High violation density detected: ${violationDensity.toFixed(2)} violations per file. This may indicate a calculation issue or extremely problematic codebase.`);
        }
        
        // Validation: Ensure production files count is reasonable
        if (totalFiles === 0 && productionLOC > 0) {
            console.warn(`[ArchDrift] Warning: Production LOC > 0 but production files = 0. This may indicate a calculation error.`);
        }
        
        return {
            driftScore: driftScoreRounded,
            weightedDebt,
            weightedDebtDensity,
            productionLOC,
            productionIssues,
            totalProductionFiles: totalFiles
        };
    } else {
        // ORIGINAL MODE: Weighted debt normalized by LOC
        // Calculate Weighted Debt with Structural Decay multipliers
        // Layer Violations: 10 points (Fatal structural drift)
        // N+1 Queries: 4 points (Core efficiency drift)
        // God Classes: Tiered weighting
        //   - Large Class (801-1,500 LOC): 1 point
        //   - Monolith (1,501+ LOC): 5 points
        let weightedDebt = 0;
        let productionIssues = 0;

        rawIssues.forEach(issue => {
            if (issue.pattern === 'Layer Violation') {
                weightedDebt += VIOLATION_WEIGHTS.layerViolation;
                productionIssues++;
            } else if (issue.pattern === 'N+1 Query') {
                // Batched violations get 50% weight reduction
                const weight = issue.likelyBatched 
                    ? VIOLATION_WEIGHTS.nPlusOneQuery * 0.5 
                    : VIOLATION_WEIGHTS.nPlusOneQuery;
                weightedDebt += weight;
                productionIssues++;
            } else if (issue.pattern === 'God Class') {
                // Determine tier from godClassTier or message
                if (issue.godClassTier === 'Monolith') {
                    weightedDebt += VIOLATION_WEIGHTS.godClassMonolith;
                } else {
                    weightedDebt += 1; // Large Class (not counted in strict mode)
                }
                productionIssues++;
            } else {
                weightedDebt += 1; // Default weight for unknown patterns
                productionIssues++;
            }
        });
        
        // Calculate Architectural Drift (FLIPPED: 0 = perfect, 100 = total drift)
        // Formula: Drift = (TotalWeightedDebt / (Math.max(ProductionLOC, 1) * 0.05)) * 100
        // This normalizes debt against codebase size with a 5% threshold factor
        const productionLOCSafe = Math.max(productionLOC, 1); // Prevent division by zero
        const driftScore = (weightedDebt / (productionLOCSafe * 0.05)) * 100;
        
        // Clamp result between 0 and 100 (0 = perfect, 100 = total drift)
        const driftScoreClamped = Math.min(100, Math.max(0, driftScore));
        
        // Round to 1 decimal place for display
        const driftScoreRounded = Math.round(driftScoreClamped * 10) / 10;
        
        // Calculate Weighted Debt Density for reporting (debt points per 1,000 LOC)
        const weightedDebtDensity = productionLOC > 0 ? (weightedDebt / (productionLOC / 1000)) : 0;
        
        // Validation: Check for edge cases in non-strict mode
        if (productionLOC > 0 && weightedDebt > productionLOC * 10) {
            // If weighted debt exceeds 10x production LOC, this is unusual
            // (Each violation can be up to 10 points, so this means >1 violation per LOC on average)
            console.warn(`[ArchDrift] Warning: Weighted debt (${weightedDebt}) is extremely high relative to production LOC (${productionLOC}). This may indicate a calculation error.`);
        }
        
        return {
            driftScore: driftScoreRounded,
            weightedDebt,
            weightedDebtDensity,
            productionLOC,
            productionIssues,
            totalProductionFiles: Math.max(productionLOC > 0 ? 1 : 0, 1)
        };
    }
}

/**
 * Compares drift between base and head results for CI/CD PR analysis
 * @param baseResult Drift calculation result from base branch/commit
 * @param headResult Drift calculation result from head branch/commit (PR)
 * @returns Comparison result with drift change and new violations
 */
export interface DriftComparisonResult {
    driftChange: number; // Change in drift score (head - base)
    driftChangePercent: number; // Percentage change
    baseDrift: number;
    headDrift: number;
    newViolations: {
        godClasses: number;
        nPlusOneQueries: number;
        layerViolations: number;
        total: number;
    };
    status: 'PASS' | 'FAIL' | 'WARN'; // PASS: < 1%, WARN: 1-5%, FAIL: > 5%
}

export function compareDrift(baseResult: DriftCalculationResult, headResult: DriftCalculationResult): DriftComparisonResult {
    const driftChange = headResult.driftScore - baseResult.driftScore;
    const driftChangePercent = baseResult.driftScore > 0 
        ? (driftChange / baseResult.driftScore) * 100 
        : (driftChange > 0 ? 100 : 0); // If base is 0, any increase is 100% change
    
    // Determine status based on absolute drift change (not percentage)
    // PASS: drift increased < 1%, WARN: 1-5%, FAIL: > 5%
    let status: 'PASS' | 'FAIL' | 'WARN';
    if (driftChange < 1.0) {
        status = 'PASS';
    } else if (driftChange <= 5.0) {
        status = 'WARN';
    } else {
        status = 'FAIL';
    }
    
    // Calculate new violations (simplified: compare issue counts)
    // In a real implementation, you'd compare specific violations
    const newViolations = {
        godClasses: Math.max(0, headResult.productionIssues - baseResult.productionIssues), // Simplified
        nPlusOneQueries: 0, // Would need detailed comparison
        layerViolations: 0, // Would need detailed comparison
        total: Math.max(0, headResult.productionIssues - baseResult.productionIssues)
    };
    
    return {
        driftChange,
        driftChangePercent,
        baseDrift: baseResult.driftScore,
        headDrift: headResult.driftScore,
        newViolations,
        status
    };
}

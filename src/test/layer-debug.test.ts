import * as assert from 'assert';
import * as vscode from 'vscode';
import { analyzeDocument, getNormalizedRelativePath } from '../analyzer';

// Direct test of layer detection logic
suite('Layer Detection Debug', () => {
    test('should correctly identify service layer from real Ghost path', () => {
        const filePath = 'ghost/core/core/server/services/email-service/EmailServiceWrapper.js';
        const uri = vscode.Uri.file(filePath);
        const document = createMockDocument(uri, 'javascript', '');
        
        const result = analyzeDocument(document);
        
        // The source layer should be detected as 'service' because path contains /services/
        // We can't directly test detectLayer, but we can test via analyzeDocument
        // If the file has no imports, layerViolations will be empty, but we can check
        // by adding an import that should trigger a violation
    });

    test('should detect service → api violation with exact Ghost paths (relative)', () => {
        const text = `
const {serialize} = require('../../api/endpoints/utils/serializers/output/utils/url');
const emailService = require('./email');

module.exports = class EmailServiceWrapper {
    send(data) {
        const serialized = serialize(data);
        return emailService.send(serialized);
    }
};
        `.trim();
        
        // Exact Ghost path structure (relative path as user reported)
        const filePath = 'ghost/core/core/server/services/email-service/EmailServiceWrapper.js';
        const uri = vscode.Uri.file(filePath);
        const document = createMockDocument(uri, 'javascript', text);
        
        const result = analyzeDocument(document);
        
        assert.strictEqual(result.layerViolations.length, 1, 
            `Expected 1 violation but got ${result.layerViolations.length}. ` +
            `File path: ${filePath}, Import: ../../api/endpoints/utils/serializers/output/utils/url`);
        
        assert.strictEqual(result.layerViolations[0].sourceLayer, 'service',
            `Expected sourceLayer 'service' but got '${result.layerViolations[0].sourceLayer}'`);
        assert.strictEqual(result.layerViolations[0].targetLayer, 'api',
            `Expected targetLayer 'api' but got '${result.layerViolations[0].targetLayer}'`);
    });

    test('should detect service → api violation with absolute Windows path (VS Code format)', () => {
        const text = `
const {serialize} = require('../../api/endpoints/utils/serializers/output/utils/url');
const emailService = require('./email');

module.exports = class EmailServiceWrapper {
    send(data) {
        const serialized = serialize(data);
        return emailService.send(serialized);
    }
};
        `.trim();
        
        // VS Code returns absolute paths via document.uri.fsPath
        // Test with Windows-style absolute path
        const filePath = 'C:\\ghost\\core\\core\\server\\services\\email-service\\EmailServiceWrapper.js';
        const uri = vscode.Uri.file(filePath);
        const document = createMockDocument(uri, 'javascript', text);
        
        const result = analyzeDocument(document);
        
        assert.strictEqual(result.layerViolations.length, 1, 
            `Expected 1 violation but got ${result.layerViolations.length}. ` +
            `File path: ${filePath}, Import: ../../api/endpoints/utils/serializers/output/utils/url`);
        
        assert.strictEqual(result.layerViolations[0].sourceLayer, 'service',
            `Expected sourceLayer 'service' but got '${result.layerViolations[0].sourceLayer}'`);
        assert.strictEqual(result.layerViolations[0].targetLayer, 'api',
            `Expected targetLayer 'api' but got '${result.layerViolations[0].targetLayer}'`);
    });

    test('should detect service → api violation with absolute Unix-style path', () => {
        const text = `
const {serialize} = require('../../api/endpoints/utils/serializers/output/utils/url');
        `.trim();
        
        // Unix-style absolute path
        const filePath = '/ghost/core/core/server/services/email-service/EmailServiceWrapper.js';
        const uri = vscode.Uri.file(filePath);
        const document = createMockDocument(uri, 'javascript', text);
        
        const result = analyzeDocument(document);
        
        assert.strictEqual(result.layerViolations.length, 1, 
            `Expected 1 violation but got ${result.layerViolations.length}. ` +
            `File path: ${filePath}`);
        
        assert.strictEqual(result.layerViolations[0].sourceLayer, 'service');
        assert.strictEqual(result.layerViolations[0].targetLayer, 'api');
    });

    test('should detect lib → api violation for lexical.js (exact Ghost paths - relative)', () => {
        const text = `
const {serialize} = require('../api/endpoints/utils/serializers/output/posts');
const lexicalUtils = require('./lexical-utils');

module.exports = function processLexical(content) {
    const serialized = serialize(content);
    return lexicalUtils.transform(serialized);
};
        `.trim();
        
        // Exact Ghost path structure as reported (relative path)
        const filePath = 'ghost/core/core/server/lib/lexical.js';
        const uri = vscode.Uri.file(filePath);
        const document = createMockDocument(uri, 'javascript', text);
        
        const result = analyzeDocument(document);
        
        assert.strictEqual(result.layerViolations.length, 1, 
            `Expected 1 violation but got ${result.layerViolations.length}. ` +
            `File path: ${filePath}, Import: ../api/endpoints/utils/serializers/output/posts`);
        
        assert.strictEqual(result.layerViolations[0].sourceLayer, 'lib',
            `Expected sourceLayer 'lib' but got '${result.layerViolations[0].sourceLayer}'`);
        assert.strictEqual(result.layerViolations[0].targetLayer, 'api',
            `Expected targetLayer 'api' but got '${result.layerViolations[0].targetLayer}'`);
    });

    test('should detect lib → api violation for lexical.js (absolute Windows path - VS Code format)', () => {
        const text = `
const {serialize} = require('../api/endpoints/utils/serializers/output/posts');
        `.trim();
        
        // VS Code returns absolute paths via document.uri.fsPath
        // Test with Windows-style absolute path matching real VS Code behavior
        const filePath = 'C:\\ghost\\core\\core\\server\\lib\\lexical.js';
        const uri = vscode.Uri.file(filePath);
        const document = createMockDocument(uri, 'javascript', text);
        
        const result = analyzeDocument(document);
        
        assert.strictEqual(result.layerViolations.length, 1, 
            `Expected 1 violation but got ${result.layerViolations.length}. ` +
            `File path: ${filePath}, Import: ../api/endpoints/utils/serializers/output/posts`);
        
        assert.strictEqual(result.layerViolations[0].sourceLayer, 'lib',
            `Expected sourceLayer 'lib' but got '${result.layerViolations[0].sourceLayer}'`);
        assert.strictEqual(result.layerViolations[0].targetLayer, 'api',
            `Expected targetLayer 'api' but got '${result.layerViolations[0].targetLayer}'`);
    });

    test('should detect lib → api violation with full absolute Windows path (real VS Code format)', () => {
        const text = `
const {serialize} = require('../api/endpoints/utils/serializers/output/posts');
const lexicalUtils = require('./lexical-utils');

module.exports = function processLexical(content) {
    const serialized = serialize(content);
    return lexicalUtils.transform(serialized);
};
        `.trim();
        
        // Real VS Code absolute path format with spaces and full path
        // This is what document.uri.fsPath returns in VS Code
        const filePath = 'C:\\Users\\Prajeesh\\Downloads\\for testing 2\\Ghost\\ghost\\core\\core\\server\\lib\\lexical.js';
        const workspaceRoot = 'C:\\Users\\Prajeesh\\Downloads\\for testing 2\\Ghost';
        const uri = vscode.Uri.file(filePath);
        const document = createMockDocument(uri, 'javascript', text);
        
        const result = analyzeDocument(document, workspaceRoot);
        
        assert.strictEqual(result.layerViolations.length, 1, 
            `Expected 1 violation but got ${result.layerViolations.length}. ` +
            `File path: ${filePath}, Import: ../api/endpoints/utils/serializers/output/posts. ` +
            `This test verifies layer detection works with full absolute Windows paths from VS Code using workspace-relative normalization.`);
        
        assert.strictEqual(result.layerViolations[0].sourceLayer, 'lib',
            `Expected sourceLayer 'lib' but got '${result.layerViolations[0].sourceLayer}'. ` +
            `Path should contain '/lib/' after normalization.`);
        assert.strictEqual(result.layerViolations[0].targetLayer, 'api',
            `Expected targetLayer 'api' but got '${result.layerViolations[0].targetLayer}'. ` +
            `Resolved import path should contain '/api/' after normalization.`);
    });

    test('REGRESSION: should detect require() with assignment and property access (exact lexical.js bug pattern)', () => {
        // CRITICAL REGRESSION TEST: This is the EXACT pattern that caused the bug
        // Pattern: serializePosts = require('../api/...').all
        // Issues this tests:
        // 1. Assignment without const/var/let (just "serializePosts = require(...)")
        // 2. Property access after require (".all")
        // 3. Inside a function, not at top level
        // 4. Windows absolute paths with workspace root
        const text = `
const path = require('path');
const config = require('../../shared/config');

async function render(lexical, userOptions = {}) {
    let serializePosts;
    if (!serializePosts) {
        serializePosts = require('../api/endpoints/utils/serializers/output/posts').all;
    }
    return serializePosts(lexical);
}

module.exports = { render };
        `.trim();
        
        // Exact real-world scenario from Ghost repo
        const filePath = 'C:\\Users\\Prajeesh\\Downloads\\for testing 2\\Ghost\\ghost\\core\\core\\server\\lib\\lexical.js';
        const workspaceRoot = 'C:\\Users\\Prajeesh\\Downloads\\for testing 2\\Ghost';
        const uri = vscode.Uri.file(filePath);
        const document = createMockDocument(uri, 'javascript', text);
        
        const result = analyzeDocument(document, workspaceRoot);
        
        assert.strictEqual(result.layerViolations.length, 1,
            `REGRESSION TEST FAILED: Expected 1 lib → api violation. ` +
            `This test ensures we catch: serializePosts = require('../api/...').all ` +
            `Pattern: assignment without const/var/let + property access. ` +
            `If this fails, the regex pattern needs to be fixed.`);
        
        assert.strictEqual(result.layerViolations[0].sourceLayer, 'lib',
            `Source should be 'lib' layer`);
        assert.strictEqual(result.layerViolations[0].targetLayer, 'api',
            `Target should be 'api' layer`);
        assert(result.layerViolations[0].line > 0,
            `Should have valid line number`);
    });

    test('should normalize absolute paths to workspace-relative paths correctly', () => {
        const absolutePath = 'C:\\Users\\Prajeesh\\Downloads\\for testing 2\\Ghost\\ghost\\core\\core\\server\\lib\\lexical.js';
        const workspaceRoot = 'C:\\Users\\Prajeesh\\Downloads\\for testing 2\\Ghost';
        
        const normalized = getNormalizedRelativePath(absolutePath, workspaceRoot);
        
        // Should be relative to workspace root with forward slashes
        assert.strictEqual(normalized, 'ghost/core/core/server/lib/lexical.js',
            `Expected normalized path 'ghost/core/core/server/lib/lexical.js' but got '${normalized}'`);
        
        // Verify it contains /lib/ for layer detection
        assert(normalized.includes('/lib/'), 'Normalized path should contain /lib/');
    });

    test('should handle import path resolution with workspace-relative normalization', () => {
        const sourceFile = 'C:\\Users\\Prajeesh\\Downloads\\for testing 2\\Ghost\\ghost\\core\\core\\server\\lib\\lexical.js';
        const workspaceRoot = 'C:\\Users\\Prajeesh\\Downloads\\for testing 2\\Ghost';
        const importPath = '../api/endpoints/utils/serializers/output/posts';
        
        // Simulate the resolution process
        const normalizedSource = sourceFile.replace(/\\/g, '/');
        const sourceDir = normalizedSource.substring(0, normalizedSource.lastIndexOf('/'));
        const parts = sourceDir.split('/').filter(p => p !== '');
        const importParts = importPath.split('/');
        
        for (const part of importParts) {
            if (part === '.' || part === '') {
                continue;
            } else if (part === '..') {
                if (parts.length > 0) {
                    parts.pop();
                }
            } else {
                parts.push(part);
            }
        }
        
        const resolved = parts.join('/');
        const normalized = getNormalizedRelativePath(resolved, workspaceRoot);
        
        // Should resolve to workspace-relative path containing /api/
        assert(normalized.includes('/api/'), 
            `Resolved import path '${normalized}' should contain '/api/' for layer detection`);
    });
});

/**
 * Helper function to create a mock VS Code document for testing
 */
function createMockDocument(uri: vscode.Uri, languageId: string, text: string): vscode.TextDocument {
    const lines = text.split('\n');
    
    return {
        uri: uri,
        fileName: uri.fsPath,
        isUntitled: false,
        languageId: languageId,
        version: 1,
        isDirty: false,
        isClosed: false,
        save: async () => Promise.resolve(true),
        eol: vscode.EndOfLine.LF,
        lineCount: lines.length,
        lineAt: (lineOrPosition: number | vscode.Position) => {
            const line = typeof lineOrPosition === 'number' ? lineOrPosition : lineOrPosition.line;
            const lineText = lines[line] || '';
            return {
                lineNumber: line,
                text: lineText,
                range: new vscode.Range(line, 0, line, lineText.length),
                rangeIncludingLineBreak: new vscode.Range(line, 0, line + 1, 0),
                firstNonWhitespaceCharacterIndex: lineText.match(/^\s*/)?.[0].length || 0,
                isEmptyOrWhitespace: lineText.trim().length === 0
            };
        },
        offsetAt: (position: vscode.Position) => {
            let offset = 0;
            for (let i = 0; i < position.line; i++) {
                offset += lines[i].length + 1;
            }
            return offset + position.character;
        },
        positionAt: (offset: number) => {
            let currentOffset = 0;
            for (let i = 0; i < lines.length; i++) {
                const lineLength = lines[i].length + 1;
                if (currentOffset + lineLength > offset) {
                    return new vscode.Position(i, offset - currentOffset);
                }
                currentOffset += lineLength;
            }
            return new vscode.Position(lines.length - 1, lines[lines.length - 1].length);
        },
        getText: (range?: vscode.Range) => {
            if (!range) {
                return text;
            }
            const startLine = range.start.line;
            const endLine = range.end.line;
            if (startLine === endLine) {
                return lines[startLine].substring(range.start.character, range.end.character);
            }
            const selectedLines = [lines[startLine].substring(range.start.character)];
            for (let i = startLine + 1; i < endLine; i++) {
                selectedLines.push(lines[i]);
            }
            selectedLines.push(lines[endLine].substring(0, range.end.character));
            return selectedLines.join('\n');
        },
        getWordRangeAtPosition: (position: vscode.Position, regex?: RegExp) => {
            const line = lines[position.line] || '';
            const wordRegex = regex || /\w+/g;
            let match;
            while ((match = wordRegex.exec(line)) !== null) {
                if (match.index <= position.character && match.index + match[0].length >= position.character) {
                    return new vscode.Range(
                        position.line,
                        match.index,
                        position.line,
                        match.index + match[0].length
                    );
                }
            }
            return undefined;
        },
        validateRange: (range: vscode.Range) => range,
        validatePosition: (position: vscode.Position) => position
    } as unknown as vscode.TextDocument;
}


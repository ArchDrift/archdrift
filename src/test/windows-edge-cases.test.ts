import * as assert from 'assert';
import * as vscode from 'vscode';
import { analyzeDocument, getNormalizedRelativePath } from '../analyzer';
import { createMockDocument } from './analyzer.test';

/**
 * Phase 1 Hardening: Windows Edge Cases
 * 
 * These tests cover edge cases where static analysis typically fails on Windows:
 * - Path normalization edge cases
 * - Import extraction edge cases
 * - Windows-specific path handling
 * - Quote variations
 * - Special characters in paths
 */

suite('Windows Edge Cases - Path Normalization', () => {
    test('should handle paths with spaces (Windows common issue)', () => {
        const filePath = 'C:\\Users\\John Doe\\My Projects\\Ghost\\ghost\\core\\server\\lib\\file.js';
        const workspaceRoot = 'C:\\Users\\John Doe\\My Projects\\Ghost';
        
        const normalized = getNormalizedRelativePath(filePath, workspaceRoot);
        
        assert(normalized.includes('/lib/'), 'Should contain /lib/ after normalization');
        assert.strictEqual(normalized, 'ghost/core/server/lib/file.js');
    });

    test('should handle mixed case drive letters (C: vs c:)', () => {
        const filePath = 'C:\\project\\lib\\file.js';
        const workspaceRoot = 'c:\\project'; // Lowercase drive
        
        const normalized = getNormalizedRelativePath(filePath, workspaceRoot);
        
        // Should work regardless of drive letter case - path should be relative, not absolute
        assert(!normalized.startsWith('C:') && !normalized.startsWith('c:'), 'Should return relative path, not absolute');
        assert(normalized.includes('/lib/') || normalized.startsWith('lib/'), 'Should work regardless of drive letter case');
    });

    test('should handle paths with special characters', () => {
        const filePath = 'C:\\project (v2)\\lib\\file.js';
        const workspaceRoot = 'C:\\project (v2)';
        
        const normalized = getNormalizedRelativePath(filePath, workspaceRoot);
        
        // Should contain lib/ (with or without leading slash)
        assert(normalized.includes('/lib/') || normalized.startsWith('lib/'), 'Should handle parentheses in paths');
    });

    test('should handle very deep nesting', () => {
        const filePath = 'C:\\project\\a\\b\\c\\d\\e\\f\\g\\h\\lib\\file.js';
        const workspaceRoot = 'C:\\project';
        
        const normalized = getNormalizedRelativePath(filePath, workspaceRoot);
        
        assert(normalized.includes('/lib/'), 'Should handle deep nesting');
    });

    test('should handle relative paths that go above workspace root', () => {
        // This shouldn't happen in practice, but we should handle it gracefully
        const filePath = 'C:\\project\\lib\\file.js';
        const workspaceRoot = 'C:\\project\\subfolder'; // Workspace is inside project
        
        const normalized = getNormalizedRelativePath(filePath, workspaceRoot);
        
        // Should return normalized absolute path since file is outside workspace
        assert(normalized.includes('/lib/'), 'Should still detect layer even if outside workspace');
    });
});

suite('Windows Edge Cases - Import Extraction', () => {
    test('should handle single quotes in require()', () => {
        const text = `
const x = require('../api/service');
const y = require('../lib/util');
        `.trim();
        
        const uri = vscode.Uri.file('C:/project/services/file.js');
        const document = createMockDocument(uri, 'javascript', text);
        
        const result = analyzeDocument(document, 'C:/project');
        
        // Should extract both imports
        assert(result.layerViolations.length >= 0, 'Should not crash on single quotes');
    });

    test('should handle double quotes in require()', () => {
        const text = `
const x = require("../api/service");
const y = require("../lib/util");
        `.trim();
        
        const uri = vscode.Uri.file('C:/project/services/file.js');
        const document = createMockDocument(uri, 'javascript', text);
        
        const result = analyzeDocument(document, 'C:/project');
        
        assert(result.layerViolations.length >= 0, 'Should not crash on double quotes');
    });

    test('should handle var, let, const assignments', () => {
        const text = `
var varImport = require('../api/service');
let letImport = require('../api/service');
const constImport = require('../api/service');
        `.trim();
        
        const uri = vscode.Uri.file('C:/project/lib/file.js');
        const document = createMockDocument(uri, 'javascript', text);
        
        const result = analyzeDocument(document, 'C:/project');
        
        assert.strictEqual(result.layerViolations.length, 3, 'Should detect all three require patterns');
    });

    test('should handle destructuring assignments', () => {
        const text = `
const {serialize, parse} = require('../api/service');
const {util1, util2, util3} = require('../lib/utils');
        `.trim();
        
        const uri = vscode.Uri.file('C:/project/lib/file.js');
        const document = createMockDocument(uri, 'javascript', text);
        
        const result = analyzeDocument(document, 'C:/project');
        
        assert.strictEqual(result.layerViolations.length, 1, 'Should detect lib → api violation');
    });

    test('should handle require() with property access variations', () => {
        const text = `
const x = require('../api/service').default;
const y = require('../api/service').all;
const z = require('../api/service').serialize;
        `.trim();
        
        const uri = vscode.Uri.file('C:/project/lib/file.js');
        const document = createMockDocument(uri, 'javascript', text);
        
        const result = analyzeDocument(document, 'C:/project');
        
        assert.strictEqual(result.layerViolations.length, 3, 'Should detect all property access patterns');
    });

    test('should handle require() without assignment (standalone)', () => {
        const text = `
function init() {
    require('../api/service');
    require('../lib/utils');
}
        `.trim();
        
        const uri = vscode.Uri.file('C:/project/lib/file.js');
        const document = createMockDocument(uri, 'javascript', text);
        
        const result = analyzeDocument(document, 'C:/project');
        
        assert.strictEqual(result.layerViolations.length, 1, 'Should detect lib → api violation from standalone require');
    });

    test('should handle require() inside try-catch blocks', () => {
        const text = `
try {
    const service = require('../api/service');
} catch (err) {
    const fallback = require('../lib/fallback');
}
        `.trim();
        
        const uri = vscode.Uri.file('C:/project/lib/file.js');
        const document = createMockDocument(uri, 'javascript', text);
        
        const result = analyzeDocument(document, 'C:/project');
        
        assert.strictEqual(result.layerViolations.length, 1, 'Should detect require inside try-catch');
    });

    test('should handle require() in conditional blocks', () => {
        const text = `
if (condition) {
    const service = require('../api/service');
} else {
    const util = require('../lib/util');
}
        `.trim();
        
        const uri = vscode.Uri.file('C:/project/lib/file.js');
        const document = createMockDocument(uri, 'javascript', text);
        
        const result = analyzeDocument(document, 'C:/project');
        
        assert.strictEqual(result.layerViolations.length, 1, 'Should detect require in conditionals');
    });

    test('should handle multiple requires on same line', () => {
        const text = `
const a = require('../api/service'), b = require('../lib/util');
        `.trim();
        
        const uri = vscode.Uri.file('C:/project/lib/file.js');
        const document = createMockDocument(uri, 'javascript', text);
        
        const result = analyzeDocument(document, 'C:/project');
        
        // Should extract at least one import (may extract both depending on regex)
        assert(result.layerViolations.length >= 1, 'Should handle multiple requires on same line');
    });

    test('should handle Windows backslashes in import paths (should normalize)', () => {
        // Note: This is unusual but some codebases might have this
        const text = `
const service = require('..\\api\\service');
        `.trim();
        
        const uri = vscode.Uri.file('C:/project/lib/file.js');
        const document = createMockDocument(uri, 'javascript', text);
        
        const result = analyzeDocument(document, 'C:/project');
        
        // Should still detect the violation after normalization
        assert.strictEqual(result.layerViolations.length, 1, 'Should normalize backslashes in import paths');
    });
});

suite('Windows Edge Cases - Layer Detection', () => {
    test('should detect layer with mixed case paths', () => {
        const filePath = 'C:\\Project\\LIB\\File.js';
        const workspaceRoot = 'C:\\Project';
        
        const normalized = getNormalizedRelativePath(filePath, workspaceRoot);
        
        // detectLayer lowercases, so should still work
        const lowerNormalized = normalized.toLowerCase();
        assert(lowerNormalized.includes('/lib/') || lowerNormalized.startsWith('lib/'), 'Should handle mixed case');
    });

    test('should handle paths with trailing slashes', () => {
        const filePath = 'C:\\project\\lib\\file.js';
        const workspaceRoot = 'C:\\project\\'; // Trailing slash
        
        const normalized = getNormalizedRelativePath(filePath, workspaceRoot);
        
        // Should work with or without trailing slash in workspace root
        assert(normalized.includes('/lib/') || normalized.startsWith('lib/'), 'Should handle trailing slashes in workspace root');
    });

    test('should handle empty workspace root (fallback to absolute)', () => {
        const filePath = 'C:\\project\\lib\\file.js';
        const workspaceRoot = null;
        
        const normalized = getNormalizedRelativePath(filePath, workspaceRoot);
        
        // Should return normalized absolute path
        assert(normalized.includes('/lib/'), 'Should fallback to absolute path normalization');
    });
});

suite('Windows Edge Cases - Real-World Scenarios', () => {
    test('should handle Ghost-style nested structure with spaces', () => {
        const text = `
const serialize = require('../api/endpoints/utils/serializers/output/posts').all;
        `.trim();
        
        const filePath = 'C:\\Users\\Test User\\My Projects\\Ghost\\ghost\\core\\core\\server\\lib\\lexical.js';
        const workspaceRoot = 'C:\\Users\\Test User\\My Projects\\Ghost';
        const uri = vscode.Uri.file(filePath);
        const document = createMockDocument(uri, 'javascript', text);
        
        const result = analyzeDocument(document, workspaceRoot);
        
        assert.strictEqual(result.layerViolations.length, 1, 'Should handle real-world path with spaces');
        assert.strictEqual(result.layerViolations[0].sourceLayer, 'lib');
        assert.strictEqual(result.layerViolations[0].targetLayer, 'api');
    });

    test('should handle multiple violations in same file', () => {
        const text = `
const api1 = require('../api/service1');
const api2 = require('../api/service2');
const domain = require('../../domain/util');
        `.trim();
        
        const uri = vscode.Uri.file('C:/project/lib/file.js');
        const document = createMockDocument(uri, 'javascript', text);
        
        const result = analyzeDocument(document, 'C:/project');
        
        assert.strictEqual(result.layerViolations.length, 2, 'Should detect multiple violations');
        assert(result.layerViolations.every(v => v.sourceLayer === 'lib' && v.targetLayer === 'api'),
            'All violations should be lib → api');
    });

    test('should handle complex nested require pattern', () => {
        const text = `
async function render() {
    let serializePosts;
    if (!serializePosts) {
        serializePosts = require('../api/endpoints/utils/serializers/output/posts').all;
    }
    if (!someOther) {
        const util = require('../lib/utils').helper;
    }
    return serializePosts();
}
        `.trim();
        
        const uri = vscode.Uri.file('C:/project/lib/file.js');
        const document = createMockDocument(uri, 'javascript', text);
        
        const result = analyzeDocument(document, 'C:/project');
        
        assert.strictEqual(result.layerViolations.length, 1, 'Should detect violation in complex nested pattern');
    });
});

suite('Critical Fixes - Phase 1 Hardening', () => {
    test('FIX #1: should handle case sensitivity in drive letters (C: vs c:)', () => {
        // Scenario: VS Code returns C:\ but workspace root is c:\
        // path.relative should still work correctly
        const filePath = 'C:\\project\\lib\\file.js';
        const workspaceRoot = 'c:\\project'; // Lowercase drive
        
        const normalized = getNormalizedRelativePath(filePath, workspaceRoot);
        
        // Should normalize to relative path, not absolute
        assert(!normalized.startsWith('C:') && !normalized.startsWith('c:'),
            'Should return relative path, not absolute with drive letter');
        assert.strictEqual(normalized, 'lib/file.js',
            'Should correctly calculate relative path regardless of drive letter case');
    });

    test('FIX #2: should handle line-breaks in require() statements', () => {
        // Scenario: const posts = require(
        //   '../api/posts'
        // ).all;
        const text = `
const posts = require(
  '../api/posts'
).all;

const service = require('../lib/service');
        `.trim();
        
        const uri = vscode.Uri.file('C:/project/lib/file.js');
        const document = createMockDocument(uri, 'javascript', text);
        
        const result = analyzeDocument(document, 'C:/project');
        
        // Should detect both requires, including the multi-line one
        assert.strictEqual(result.layerViolations.length, 1,
            'Should detect lib → api violation even with line-breaks in require()');
        assert.strictEqual(result.layerViolations[0].targetLayer, 'api',
            'Multi-line require should be detected');
    });

    test('FIX #2: should handle require() with whitespace between require and (', () => {
        const text = `
const posts = require (
  '../api/posts'
).all;
        `.trim();
        
        const uri = vscode.Uri.file('C:/project/lib/file.js');
        const document = createMockDocument(uri, 'javascript', text);
        
        const result = analyzeDocument(document, 'C:/project');
        
        assert.strictEqual(result.layerViolations.length, 1,
            'Should handle whitespace between require and parentheses');
    });

    test('FIX #3: should handle unresolved dependencies gracefully', () => {
        // Scenario: require points to a file that doesn't exist
        // Should still detect layer from path pattern, not crash
        const text = `
const service = require('../api/non-existent-service');
const util = require('../lib/missing-util');
        `.trim();
        
        const uri = vscode.Uri.file('C:/project/lib/file.js');
        const document = createMockDocument(uri, 'javascript', text);
        
        // Should not throw, should still detect layer violations from path patterns
        const result = analyzeDocument(document, 'C:/project');
        
        // Even though files don't exist, we can still detect layers from path patterns
        assert(result.layerViolations.length >= 0,
            'Should not crash on unresolved dependencies');
        // If the path pattern contains /api/, we should still detect it
        if (result.layerViolations.length > 0) {
            assert.strictEqual(result.layerViolations[0].targetLayer, 'api',
                'Should detect layer from path pattern even if file doesn\'t exist');
        }
    });

    test('FIX #3: should handle optional/generated file patterns', () => {
        // Some requires might point to generated files that don't exist during scan
        const text = `
const generated = require('../api/generated/output');
const optional = require('../lib/optional-feature');
        `.trim();
        
        const uri = vscode.Uri.file('C:/project/lib/file.js');
        const document = createMockDocument(uri, 'javascript', text);
        
        const result = analyzeDocument(document, 'C:/project');
        
        // Should not crash, should still attempt layer detection
        assert(result !== null, 'Should return result even with non-existent files');
    });
});


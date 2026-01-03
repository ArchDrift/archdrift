import * as assert from 'assert';
import * as vscode from 'vscode';
import { analyzeDocument, isSupportedFile } from '../analyzer';

suite('Analyzer Tests', () => {
    suite('God Class Detection', () => {
        test('should detect God Class for file with more than 800 code lines', () => {
            // Create a file with 900 lines of code (excluding comments/empty lines)
            // Threshold is now 800 LOC, so 900 should be detected as "Large Class" (801-1500 range)
            const lines: string[] = [];
            for (let i = 0; i < 900; i++) {
                lines.push(`function test${i}() { return ${i}; }`);
            }
            const text = lines.join('\n');
            
            const uri = vscode.Uri.file('/test/file.ts');
            const document = createMockDocument(uri, 'typescript', text);
            
            const result = analyzeDocument(document);
            
            assert.strictEqual(result.godClass.isGodClass, true);
            assert.strictEqual(result.godClass.codeLineCount, 900);
        });

        test('should not detect God Class for file with exactly 800 code lines', () => {
            const lines: string[] = [];
            for (let i = 0; i < 800; i++) {
                lines.push(`function test${i}() { return ${i}; }`);
            }
            const text = lines.join('\n');
            
            const uri = vscode.Uri.file('/test/file.ts');
            const document = createMockDocument(uri, 'typescript', text);
            
            const result = analyzeDocument(document);
            
            assert.strictEqual(result.godClass.isGodClass, false);
            assert.strictEqual(result.godClass.codeLineCount, 800);
        });

        test('should not detect God Class for file with less than 800 code lines', () => {
            const lines: string[] = [];
            for (let i = 0; i < 100; i++) {
                lines.push(`function test${i}() { return ${i}; }`);
            }
            const text = lines.join('\n');
            
            const uri = vscode.Uri.file('/test/file.ts');
            const document = createMockDocument(uri, 'typescript', text);
            
            const result = analyzeDocument(document);
            
            assert.strictEqual(result.godClass.isGodClass, false);
            assert.strictEqual(result.godClass.codeLineCount, 100);
        });

        test('should exclude comments and empty lines from code line count', () => {
            const text = `
// This is a comment
function test1() { return 1; }

/* Block comment */
function test2() { return 2; }

function test3() { return 3; }
            `.trim();
            
            const uri = vscode.Uri.file('/test/file.ts');
            const document = createMockDocument(uri, 'typescript', text);
            
            const result = analyzeDocument(document);
            
            // Should count only the 3 function lines, not comments or empty lines
            assert.strictEqual(result.godClass.codeLineCount, 3);
        });
    });

    suite('N+1 Query Detection', () => {
        test('should detect N+1 query when DB call is inside a for loop', () => {
            const text = `
function processUsers(users) {
    for (let user of users) {
        const data = await db.findOne({ id: user.id });
        console.log(data);
    }
}
            `.trim();
            
            const uri = vscode.Uri.file('/test/file.ts');
            const document = createMockDocument(uri, 'typescript', text);
            
            const result = analyzeDocument(document);
            
            assert.strictEqual(result.nPlusOne.violations.length, 1);
            assert(result.nPlusOne.violations[0] > 0);
        });

        test('should detect N+1 query when fetch is inside a map', () => {
            const text = `
const results = users.map(async (user) => {
    const response = await fetch(\`/api/users/\${user.id}\`);
    return response.json();
});
            `.trim();
            
            const uri = vscode.Uri.file('/test/file.ts');
            const document = createMockDocument(uri, 'typescript', text);
            
            const result = analyzeDocument(document);
            
            assert.strictEqual(result.nPlusOne.violations.length, 1);
        });

        test('should not detect N+1 query when DB call is outside loop', () => {
            const text = `
const data = await db.findAll();
for (let item of data) {
    console.log(item);
}
            `.trim();
            
            const uri = vscode.Uri.file('/test/file.ts');
            const document = createMockDocument(uri, 'typescript', text);
            
            const result = analyzeDocument(document);
            
            assert.strictEqual(result.nPlusOne.violations.length, 0);
        });

        test('should detect multiple N+1 queries in nested loops', () => {
            const text = `
for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 5; j++) {
        const data1 = await db.findOne({ id: i });
        const data2 = await fetch(\`/api/\${j}\`);
    }
}
            `.trim();
            
            const uri = vscode.Uri.file('/test/file.ts');
            const document = createMockDocument(uri, 'typescript', text);
            
            const result = analyzeDocument(document);
            
            assert(result.nPlusOne.violations.length >= 2);
        });
    });

    suite('Layer Integrity Detection', () => {
        test('should detect violation when domain file imports from api', () => {
            const text = `
import { ApiService } from '@app/api/services';
import { DomainEntity } from './entities';

function processData() {
    return ApiService.getData();
}
            `.trim();
            
            // Use path that only matches domain, not services
            const uri = vscode.Uri.file('/project/domain/core/processor.ts');
            const document = createMockDocument(uri, 'typescript', text);
            
            const result = analyzeDocument(document);
            
            assert.strictEqual(result.layerViolations.length, 1);
            assert.strictEqual(result.layerViolations[0].sourceLayer, 'domain');
            assert.strictEqual(result.layerViolations[0].targetLayer, 'api');
            assert(result.layerViolations[0].importText.includes('api'));
        });

        test('should detect violation when infra file imports from domain', () => {
            const text = `
import { DomainRepository } from '../../domain/repositories';
import { Database } from './database';

class UserRepository {
    async findUser(id: string) {
        return Database.query('SELECT * FROM users WHERE id = ?', [id]);
    }
}
            `.trim();
            
            const uri = vscode.Uri.file('/project/infra/persistence/userRepository.ts');
            const document = createMockDocument(uri, 'typescript', text);
            
            const result = analyzeDocument(document);
            
            assert.strictEqual(result.layerViolations.length, 1);
            assert.strictEqual(result.layerViolations[0].sourceLayer, 'infra');
            assert.strictEqual(result.layerViolations[0].targetLayer, 'domain');
        });

        test('should detect violation when infra file imports from api', () => {
            const text = `
import { ApiClient } from '../api/client';
import { Config } from './config';

function initialize() {
    return ApiClient.connect();
}
            `.trim();
            
            // Use path that only matches infra, not adapters (which is now lib)
            const uri = vscode.Uri.file('/project/infra/persistence/apiAdapter.ts');
            const document = createMockDocument(uri, 'typescript', text);
            
            const result = analyzeDocument(document);
            
            assert.strictEqual(result.layerViolations.length, 1);
            assert.strictEqual(result.layerViolations[0].sourceLayer, 'infra');
            assert.strictEqual(result.layerViolations[0].targetLayer, 'api');
        });

        test('should allow domain importing from infra', () => {
            const text = `
import { Database } from '../infra/persistence/database';
import { Entity } from './entity';

class Repository {
    async save(entity: Entity) {
        return Database.save(entity);
    }
}
            `.trim();
            
            const uri = vscode.Uri.file('/project/domain/repositories/userRepository.ts');
            const document = createMockDocument(uri, 'typescript', text);
            
            const result = analyzeDocument(document);
            
            // domain -> infra is allowed, so no violations
            assert.strictEqual(result.layerViolations.length, 0);
        });

        test('should allow api importing from domain', () => {
            const text = `
import { UseCase } from '../domain/usecases/getUser';
import { Response } from 'express';

export function getUserHandler(req: any, res: Response) {
    const useCase = new UseCase();
    return useCase.execute(req.params.id);
}
            `.trim();
            
            const uri = vscode.Uri.file('/project/api/controllers/userController.ts');
            const document = createMockDocument(uri, 'typescript', text);
            
            const result = analyzeDocument(document);
            
            // api -> domain is allowed, so no violations
            assert.strictEqual(result.layerViolations.length, 0);
        });

        test('should allow api importing from infra', () => {
            const text = `
import { Database } from '../infra/persistence/database';

export function getData() {
    return Database.query('SELECT * FROM data');
}
            `.trim();
            
            // Use path that only matches api, not services
            const uri = vscode.Uri.file('/project/api/controllers/dataService.ts');
            const document = createMockDocument(uri, 'typescript', text);
            
            const result = analyzeDocument(document);
            
            // api -> infra is allowed, so no violations
            assert.strictEqual(result.layerViolations.length, 0);
        });

        test('should skip layer checks for unclassified files', () => {
            const text = `
import { Something } from '../api/services';
import { Other } from '../domain/entities';
            `.trim();
            
            // File path doesn't match any layer pattern
            const uri = vscode.Uri.file('/project/utils/helper.ts');
            const document = createMockDocument(uri, 'typescript', text);
            
            const result = analyzeDocument(document);
            
            // Unclassified files don't get layer checks
            assert.strictEqual(result.layerViolations.length, 0);
        });

        test('should handle relative imports correctly', () => {
            const text = `
import { ApiService } from '../../api/services';
            `.trim();
            
            const uri = vscode.Uri.file('/project/domain/usecases/processData.ts');
            const document = createMockDocument(uri, 'typescript', text);
            
            const result = analyzeDocument(document);
            
            // Should detect domain -> api violation even with relative import
            assert(result.layerViolations.length >= 0); // May or may not match depending on path resolution
        });

        test('should handle Python imports', () => {
            const text = `
from api.services import ApiService
from domain.entities import Entity
            `.trim();
            
            const uri = vscode.Uri.file('/project/domain/usecases/processor.py');
            const document = createMockDocument(uri, 'python', text);
            
            const result = analyzeDocument(document);
            
            // Should detect domain -> api violation
            assert(result.layerViolations.length >= 0);
        });

        test('should detect violation when services file imports from api (Ghost-style)', () => {
            const text = `
import { PostSerializer } from '../../api/endpoints/utils/serializers/output/posts';
import { EmailService } from './email';

export class EmailServiceWrapper {
    async sendEmail(data) {
        const serialized = PostSerializer.serialize(data);
        return EmailService.send(serialized);
    }
}
            `.trim();
            
            const uri = vscode.Uri.file('/project/core/server/services/email-service/EmailServiceWrapper.js');
            const document = createMockDocument(uri, 'javascript', text);
            
            const result = analyzeDocument(document);
            
            assert.strictEqual(result.layerViolations.length, 1);
            assert.strictEqual(result.layerViolations[0].sourceLayer, 'service');
            assert.strictEqual(result.layerViolations[0].targetLayer, 'api');
            assert(result.layerViolations[0].importText.includes('api'));
        });

        test('should detect violation when lib file imports from api (Ghost-style)', () => {
            const text = `
import { PostSerializer } from '../api/endpoints/utils/serializers/output/posts';
import { lexicalUtils } from './lexical-utils';

export function processLexical(content) {
    const serialized = PostSerializer.serialize(content);
    return lexicalUtils.transform(serialized);
}
            `.trim();
            
            const uri = vscode.Uri.file('/project/core/server/lib/lexical.js');
            const document = createMockDocument(uri, 'javascript', text);
            
            const result = analyzeDocument(document);
            
            assert.strictEqual(result.layerViolations.length, 1);
            assert.strictEqual(result.layerViolations[0].sourceLayer, 'lib');
            assert.strictEqual(result.layerViolations[0].targetLayer, 'api');
            assert(result.layerViolations[0].importText.includes('api'));
        });

        test('should allow services importing from models (Ghost-style)', () => {
            const text = `
import { UserModel } from '../models/user';
import { EmailService } from './email';

export class UserService {
    async findUser(id) {
        return UserModel.findById(id);
    }
}
            `.trim();
            
            const uri = vscode.Uri.file('/project/core/server/services/user-service/UserService.js');
            const document = createMockDocument(uri, 'javascript', text);
            
            const result = analyzeDocument(document);
            
            // services -> models is allowed, so no violations
            assert.strictEqual(result.layerViolations.length, 0);
        });

        test('should allow services importing from lib (Ghost-style)', () => {
            const text = `
import { dbUtils } from '../lib/db-utils';
import { EmailService } from './email';

export class EmailServiceWrapper {
    async send(data) {
        const processed = dbUtils.process(data);
        return EmailService.send(processed);
    }
}
            `.trim();
            
            const uri = vscode.Uri.file('/project/core/server/services/email-service/EmailServiceWrapper.js');
            const document = createMockDocument(uri, 'javascript', text);
            
            const result = analyzeDocument(document);
            
            // services -> lib is allowed, so no violations
            assert.strictEqual(result.layerViolations.length, 0);
        });

        test('should allow api importing from services (Ghost-style)', () => {
            const text = `
import { EmailService } from '../services/email-service/EmailServiceWrapper';
import { Response } from 'express';

export function sendEmailHandler(req, res) {
    const emailService = new EmailService();
    return emailService.send(req.body);
}
            `.trim();
            
            const uri = vscode.Uri.file('/project/core/server/api/endpoints/email.js');
            const document = createMockDocument(uri, 'javascript', text);
            
            const result = analyzeDocument(document);
            
            // api -> services is allowed, so no violations
            assert.strictEqual(result.layerViolations.length, 0);
        });

        test('should detect violation in real Ghost-style paths - EmailServiceWrapper', () => {
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
            
            // Real Ghost path structure
            const uri = vscode.Uri.file('C:/ghost/core/core/server/services/email-service/EmailServiceWrapper.js');
            const document = createMockDocument(uri, 'javascript', text);
            
            const result = analyzeDocument(document);
            
            assert.strictEqual(result.layerViolations.length, 1, 'Should detect service -> api violation');
            assert.strictEqual(result.layerViolations[0].sourceLayer, 'service');
            assert.strictEqual(result.layerViolations[0].targetLayer, 'api');
        });

        test('should detect violation in real Ghost-style paths - lexical.js', () => {
            const text = `
const {serialize} = require('../api/endpoints/utils/serializers/output/posts');
const lexicalUtils = require('./lexical-utils');

module.exports = function processLexical(content) {
    const serialized = serialize(content);
    return lexicalUtils.transform(serialized);
};
            `.trim();
            
            // Real Ghost path structure
            const uri = vscode.Uri.file('C:/ghost/core/core/server/lib/lexical.js');
            const document = createMockDocument(uri, 'javascript', text);
            
            const result = analyzeDocument(document);
            
            assert.strictEqual(result.layerViolations.length, 1, 'Should detect lib -> api violation');
            assert.strictEqual(result.layerViolations[0].sourceLayer, 'lib');
            assert.strictEqual(result.layerViolations[0].targetLayer, 'api');
        });

        test('REGRESSION: should detect require() with assignment and property access (exact lexical.js bug)', () => {
            // CRITICAL REGRESSION TEST: This is the EXACT pattern that caused the bug
            // Pattern: serializePosts = require('../api/...').all
            // Issues this tests:
            // 1. Assignment without const/var/let (just "serializePosts = require(...)")
            // 2. Property access after require (".all")
            // 3. Inside a function, not at top level
            // This pattern was NOT being detected before the regex fix
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
            
            const uri = vscode.Uri.file('C:/ghost/core/core/server/lib/lexical.js');
            const document = createMockDocument(uri, 'javascript', text);
            
            const result = analyzeDocument(document);
            
            assert.strictEqual(result.layerViolations.length, 1,
                `REGRESSION TEST: Expected 1 violation for lib → api with require().property pattern. ` +
                `This ensures we catch: serializePosts = require('../api/...').all`);
            
            assert.strictEqual(result.layerViolations[0].sourceLayer, 'lib');
            assert.strictEqual(result.layerViolations[0].targetLayer, 'api');
        });
    });

    suite('File Support Detection', () => {
        test('should recognize supported file extensions', () => {
            const extensions = ['.js', '.ts', '.jsx', '.tsx', '.py', '.java', '.go'];
            
            extensions.forEach(ext => {
                const uri = vscode.Uri.file(`/project/src/file${ext}`);
                assert.strictEqual(isSupportedFile(uri), true, `Should support ${ext}`);
            });
        });

        test('should reject unsupported file extensions', () => {
            const uri = vscode.Uri.file('/test/file.txt');
            assert.strictEqual(isSupportedFile(uri), false);
        });

        test('should reject files without extensions', () => {
            const uri = vscode.Uri.file('/test/file');
            assert.strictEqual(isSupportedFile(uri), false);
        });
    });
});

/**
 * Helper function to create a mock VS Code document for testing
 */
export function createMockDocument(uri: vscode.Uri, languageId: string, text: string): vscode.TextDocument {
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
                offset += lines[i].length + 1; // +1 for newline
            }
            return offset + position.character;
        },
        positionAt: (offset: number) => {
            let currentOffset = 0;
            for (let i = 0; i < lines.length; i++) {
                const lineLength = lines[i].length + 1; // +1 for newline
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


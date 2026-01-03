// Mock vscode module for testing outside VS Code extension host
import * as path from 'path';

export const Uri = {
    file: (fsPath: string) => ({
        scheme: 'file',
        fsPath: fsPath,
        path: fsPath.replace(/\\/g, '/'),
        toString: () => `file://${fsPath.replace(/\\/g, '/')}`
    })
};

export const Range = class {
    constructor(
        public startLine: number,
        public startCharacter: number,
        public endLine: number,
        public endCharacter: number
    ) {}
};

export const Position = class {
    constructor(
        public line: number,
        public character: number
    ) {}
};

export const EndOfLine = {
    LF: 1,
    CRLF: 2
};

export const DiagnosticSeverity = {
    Error: 0,
    Warning: 1,
    Information: 2,
    Hint: 3
};

// Mock the vscode module
const vscodeMock = {
    Uri,
    Range,
    Position,
    EndOfLine,
    DiagnosticSeverity
};

// Make it available globally for require
if (typeof module !== 'undefined' && module.exports) {
    module.exports = vscodeMock;
}



import * as path from 'path';
import * as Mocha from 'mocha';
import { glob } from 'glob';

// Mock vscode module before any test files are loaded
const Module = require('module');
const originalRequire = Module.prototype.require;
Module.prototype.require = function(id: string) {
    if (id === 'vscode') {
        return require('../vscodeMock');
    }
    return originalRequire.apply(this, arguments);
};

export function run(): Promise<void> {
    // Create the mocha test
    const mocha = new Mocha({
        ui: 'tdd',
        timeout: 20000,
        color: true
    });

    const testsRoot = path.resolve(__dirname, '..');

    return glob('**/**.test.js', { cwd: testsRoot })
        .then((files: string[]) => {
            // Add files to the test suite
            files.forEach((f: string) => mocha.addFile(path.resolve(testsRoot, f)));

            // Run the mocha test
            return new Promise<void>((resolve, reject) => {
                try {
                    mocha.run((failures: number) => {
                        if (failures > 0) {
                            reject(new Error(`${failures} test(s) failed.`));
                        } else {
                            resolve();
                        }
                    });
                } catch (err) {
                    console.error(err);
                    reject(err);
                }
            });
        });
}


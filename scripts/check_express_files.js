const fs = require('fs');
const path = require('path');

function countCodeLines(text) {
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
        // Skip single-line comments
        if (line.startsWith('//')) {
            continue;
        }

        codeLineCount++;
    }

    return codeLineCount;
}

const libDir = path.join(__dirname, '..', 'audit_targets', 'batch_1', 'express', 'lib');
const files = fs.readdirSync(libDir).filter(f => f.endsWith('.js'));

console.log('Express lib files analysis:\n');
files.forEach(file => {
    const filePath = path.join(libDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const totalLines = content.split('\n').length;
    const codeLines = countCodeLines(content);
    
    console.log(`${file}:`);
    console.log(`  Total lines: ${totalLines}`);
    console.log(`  Code lines: ${codeLines}`);
    if (codeLines > 800) {
        console.log(`  ⚠️  Large Class detected! (threshold: 800)`);
    }
    if (codeLines > 1501) {
        console.log(`  🔴 Monolith detected! (threshold: 1501)`);
    }
    console.log('');
});

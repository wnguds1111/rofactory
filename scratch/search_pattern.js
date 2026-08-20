const fs = require('fs');
const path = require('path');

const files = [
    'c:\\Users\\GRAVITY\\Desktop\\Anti\\ro_factory\\market.html',
    'c:\\Users\\GRAVITY\\Desktop\\Anti\\ro_factory\\market_detail.html'
];

function searchPattern(pattern) {
    console.log(`\n=== Searching for "${pattern}" ===`);
    files.forEach(fullPath => {
        const buffer = fs.readFileSync(fullPath);
        let content = '';
        if (buffer.length >= 2 && buffer[0] === 0xFF && buffer[1] === 0xFE) {
            content = buffer.toString('utf16le');
        } else {
            content = buffer.toString('utf8');
        }

        const lines = content.split(/\r?\n/);
        lines.forEach((line, idx) => {
            if (line.includes(pattern)) {
                console.log(`${path.basename(fullPath)}:${idx + 1}: ${line.trim()}`);
            }
        });
    });
}

searchPattern('Remaining Balance');
searchPattern('결제');
searchPattern('?');

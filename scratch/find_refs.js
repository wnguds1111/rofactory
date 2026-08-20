const fs = require('fs');
const path = require('path');

const files = [
    'c:\\Users\\GRAVITY\\Desktop\\Anti\\ro_factory\\market.html',
    'c:\\Users\\GRAVITY\\Desktop\\Anti\\ro_factory\\market_detail.html'
];

files.forEach(fullPath => {
    const buffer = fs.readFileSync(fullPath);
    let content = '';
    if (buffer.length >= 2 && buffer[0] === 0xFF && buffer[1] === 0xFE) {
        content = buffer.toString('utf16le');
    } else {
        content = buffer.toString('utf8');
    }

    const lines = content.split(/\r?\n/);
    console.log(`=== ${path.basename(fullPath)} ===`);
    lines.forEach((line, idx) => {
        if (line.includes('currentKafraPoints')) {
            console.log(`${idx + 1}: ${line.trim()}`);
        }
    });
});

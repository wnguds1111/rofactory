const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('판매 포인트')) {
        console.log(`[판매 포인트 found in ${file}]`);
        const lines = content.split('\n');
        lines.forEach((line, idx) => {
            if (line.includes('판매 포인트')) {
                console.log(`  Line ${idx + 1}: ${line.trim()}`);
            }
        });
    }
    if (content.includes('구매하기')) {
        console.log(`[구매하기 found in ${file}]`);
        const lines = content.split('\n');
        lines.forEach((line, idx) => {
            if (line.includes('구매하기')) {
                console.log(`  Line ${idx + 1}: ${line.trim()}`);
            }
        });
    }
});

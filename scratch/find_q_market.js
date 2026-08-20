const fs = require('fs');

const files = [
    'c:\\Users\\GRAVITY\\Desktop\\Anti\\ro_factory\\market.html',
    'c:\\Users\\GRAVITY\\Desktop\\Anti\\ro_factory\\market_detail.html'
];

const koreanRegex = /[ㄱ-ㅎㅏ-ㅣ가-힣]/;

files.forEach(file => {
    const buffer = fs.readFileSync(file);
    const content = buffer.toString('utf8');
    const lines = content.split(/\r?\n/);
    console.log(`=== ${file} ===`);
    lines.forEach((line, idx) => {
        if (line.includes('?') && koreanRegex.test(line)) {
            console.log(`${idx+1}: ${line.trim()}`);
        }
    });
});

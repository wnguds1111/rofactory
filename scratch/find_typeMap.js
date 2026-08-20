const fs = require('fs');
const file = 'c:\\Users\\GRAVITY\\Desktop\\Anti\\ro_factory\\market.html';
const buffer = fs.readFileSync(file);
const content = buffer.toString('utf8');

const lines = content.split(/\r?\n/);
lines.forEach((line, idx) => {
    if (line.includes('typeMap') || line.includes('colorMap')) {
        console.log(`${idx+1}: ${line.trim()}`);
    }
});

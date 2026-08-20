const fs = require('fs');

const file = 'c:\\Users\\GRAVITY\\Desktop\\Anti\\ro_factory\\market.html';
const buffer = fs.readFileSync(file);
const content = buffer.toString('utf8');

const lines = content.split(/\r?\n/);
let found = -1;
lines.forEach((line, idx) => {
    if (line.includes('let mockProducts = [')) {
        found = idx;
    }
});

if (found !== -1) {
    console.log(`Found mockProducts at line ${found + 1}:`);
    for (let i = found; i < found + 25; i++) {
        console.log(`${i+1}: ${lines[i].trim()}`);
    }
} else {
    console.log('mockProducts not found.');
}

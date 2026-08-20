const fs = require('fs');
const path = require('path');

const file = 'c:\\Users\\GRAVITY\\Desktop\\Anti\\ro_factory\\market.html';
const buffer = fs.readFileSync(file);
let content = '';
if (buffer.length >= 2 && buffer[0] === 0xFF && buffer[1] === 0xFE) {
    content = buffer.toString('utf16le');
} else {
    content = buffer.toString('utf8');
}

const lines = content.split(/\r?\n/);
for (let i = 640; i < 700; i++) {
    console.log(`${i+1}: ${lines[i]}`);
}

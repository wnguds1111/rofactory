const fs = require('fs');
const file = 'c:\\Users\\GRAVITY\\Desktop\\Anti\\ro_factory\\market.html';
const buffer = fs.readFileSync(file);
const content = buffer.toString('utf8');

const lines = content.split(/\r?\n/);
const keywords = [
    'Payment Complete!',
    'The item has been successfully',
    'Item Name',
    'Remaining Balance',
    'Continue Browsing',
    'My Studio',
    'Item Price',
    'Final Payment Amount',
    'Pay 50 KP'
];

lines.forEach((line, idx) => {
    keywords.forEach(kw => {
        if (line.includes(kw)) {
            console.log(`${idx+1}: ${line.trim()}`);
        }
    });
});

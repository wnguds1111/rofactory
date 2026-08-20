const fs = require('fs');

const files = [
    'c:\\Users\\GRAVITY\\Desktop\\Anti\\ro_factory\\market.html',
    'c:\\Users\\GRAVITY\\Desktop\\Anti\\ro_factory\\market_detail.html'
];

files.forEach(f => {
    const buf = fs.readFileSync(f);
    console.log(`${f}: size=${buf.length}`);
    if (buf[0] === 0xFF && buf[1] === 0xFE) {
        console.log('UTF-16LE with BOM');
    } else if (buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF) {
        console.log('UTF-8 with BOM');
    } else {
        console.log('Probably UTF-8 or ASCII');
    }
});

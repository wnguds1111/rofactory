const fs = require('fs');
const fp = 'register.html';
let c = fs.readFileSync(fp, 'utf8');

// Remove the oninput restriction entirely, keep everything else
const oldInput = `oninput="this.value=this.value.replace(/[^a-zA-Z0-9\\s\\-_'.!]/g,'')"`;
const newInput = '';

if (c.includes(oldInput)) {
    c = c.replace(oldInput, newInput);
    fs.writeFileSync(fp, c, 'utf8');
    console.log('Done: removed oninput restriction from workTitle');
} else {
    console.log('Pattern not found, checking...');
    const idx = c.indexOf('workTitle');
    console.log(c.substring(idx - 10, idx + 250));
}

// Safe cache buster update + input regex fix
// Reads files as raw Buffer, replaces only ASCII patterns, preserves encoding
const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '..');
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

htmlFiles.forEach(f => {
    const fp = path.join(dir, f);
    const buf = fs.readFileSync(fp);
    let content = buf.toString('utf8');
    
    // Update cache buster v=3.0 -> v=3.1
    const oldCb = 'desc-script.js?v=3.0';
    const newCb = 'desc-script.js?v=3.1';
    if (content.includes(oldCb)) {
        content = content.split(oldCb).join(newCb);
        console.log('Cache buster updated:', f);
    }
    
    // Fix input regex in register.html only
    if (f === 'register.html') {
        const oldRegex = "this.value=this.value.replace(/[^a-zA-Z\\s]/g,'')";
        const newRegex = "this.value=this.value.replace(/[^a-zA-Z0-9\\s\\-_'.!]/g,'')";
        if (content.includes(oldRegex)) {
            content = content.split(oldRegex).join(newRegex);
            console.log('Input regex updated:', f);
        }
    }
    
    // Write back preserving BOM if present
    const hasBOM = buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF;
    if (hasBOM) {
        fs.writeFileSync(fp, '\uFEFF' + content.replace(/^\uFEFF/, ''), 'utf8');
    } else {
        fs.writeFileSync(fp, content, 'utf8');
    }
});

console.log('Done!');

const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\GRAVITY\\Desktop\\Anti\\ro_factory';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(fileName => {
    const filePath = path.join(dir, fileName);
    let html = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // 1. Remove inline renderGNB() script call (now auto-initialized)
    const before = html;
    html = html.replace(/\s*<script>renderGNB\(\{[^}]*\}\);<\/script>\s*/g, '\n');

    // 2. Remove orphan closing </div> left after stripping gnjoy-topbar
    // These appear right before <main> and are empty/orphan
    html = html.replace(/(\n\s*<\/div>\s*\n)(\s*\n\s*<main)/g, '\n$2');

    if (html !== before) {
        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`✅ Cleaned: ${fileName}`);
    } else {
        console.log(`⏭  No changes: ${fileName}`);
    }
});
console.log('Done.');

const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\GRAVITY\\Desktop\\Anti\\ro_factory';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.startsWith('admin'));

// Pattern that matches the entire gnjoy topbar + gnb header block
// We'll remove the old topbar + gnb and replace with script include + renderGNB() call
const GNB_SCRIPT_TAG = `    <script src="gnb.js"></script>`;
const GNB_CALL_TAG = `    <script>renderGNB({ activePage: 'ro-factory' });</script>`;

let processed = 0;

files.forEach(fileName => {
    const filePath = path.join(dir, fileName);
    let html = fs.readFileSync(filePath, 'utf8');

    // Skip if already using gnb.js
    if (html.includes('gnb.js')) {
        console.log(`⏭  Skipping (already updated): ${fileName}`);
        return;
    }

    // Remove old gnjoy-topbar block
    // Matches from <!-- Global GNJOY Bar --> or <div class="gnjoy-topbar"> to end of </div> block
    html = html.replace(/[ \t]*<!--[^>]*GNJOY[^>]*-->\s*<div class="gnjoy-topbar"[\s\S]*?<\/div>\s*<\/div>\s*/i, '');
    // Also try without the comment
    html = html.replace(/[ \t]*<div class="gnjoy-topbar"[\s\S]*?<\/div>\s*<\/div>\s*/i, '');

    // Remove old <header class="gnb"> block entirely
    html = html.replace(/[ \t]*<!--[^>]*GNB[^>]*-->\s*<header class="gnb"[\s\S]*?<\/header>\s*/i, '');
    // Also try without the comment
    html = html.replace(/[ \t]*<header class="gnb"[\s\S]*?<\/header>\s*/i, '');

    // Now inject gnb.js script + renderGNB call right after <body>
    if (!html.includes('gnb.js')) {
        html = html.replace(/(<body[^>]*>)/i, `$1\n${GNB_SCRIPT_TAG}\n${GNB_CALL_TAG}\n`);
    }

    fs.writeFileSync(filePath, html, 'utf8');
    processed++;
    console.log(`✅ Updated: ${fileName}`);
});

console.log(`\nDone. ${processed} files updated.`);

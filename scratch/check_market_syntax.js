const fs = require('fs');
const html = fs.readFileSync('market.html', 'utf8');
const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/g;
let match;
let count = 0;
let hasError = false;
while ((match = scriptRegex.exec(html)) !== null) {
    count++;
    const js = match[1];
    // Skip external script references that have no body
    if (!js.trim()) continue;
    try {
        new Function(js);
        console.log(`Script block ${count} is valid.`);
    } catch (e) {
        hasError = true;
        console.error(`Syntax error in script block ${count}:`, e.message);
        // Print around error line if possible
        const lines = js.split('\n');
        lines.forEach((line, idx) => {
            console.error(`${idx + 1}: ${line}`);
        });
    }
}
if (!hasError) {
    console.log("All inline script blocks in market.html are syntax-valid!");
} else {
    process.exit(1);
}

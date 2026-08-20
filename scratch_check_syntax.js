const fs = require('fs');
const html = fs.readFileSync('register.html', 'utf8');
const scriptRegex = /<script>([\s\S]*?)<\/script>/g;
let match;
let count = 0;
while ((match = scriptRegex.exec(html)) !== null) {
    count++;
    const js = match[1];
    try {
        new Function(js);
        console.log(`Script block ${count} is valid.`);
    } catch (e) {
        console.error(`Syntax error in script block ${count}:`, e.message);
        console.error(js.split('\n').map((line, idx) => `${idx + 1}: ${line}`).join('\n'));
    }
}

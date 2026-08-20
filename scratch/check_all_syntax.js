const fs = require('fs');

const files = [
    'market.html',
    'market_detail.html'
];

let overallSuccess = true;

files.forEach(fileName => {
    console.log(`Checking syntax for ${fileName}...`);
    const html = fs.readFileSync(fileName, 'utf8');
    const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/g;
    let match;
    let count = 0;
    let hasError = false;
    while ((match = scriptRegex.exec(html)) !== null) {
        count++;
        const js = match[1];
        if (!js.trim()) continue;
        try {
            new Function(js);
        } catch (e) {
            hasError = true;
            overallSuccess = false;
            console.error(`  [ERROR] Syntax error in script block ${count}:`, e.message);
            const lines = js.split('\n');
            lines.forEach((line, idx) => {
                console.error(`    ${idx + 1}: ${line}`);
            });
        }
    }
    if (!hasError) {
        console.log(`  [OK] All inline script blocks in ${fileName} are valid!`);
    }
});

if (overallSuccess) {
    console.log("All syntax checks passed!");
    process.exit(0);
} else {
    console.error("Syntax checks failed!");
    process.exit(1);
}

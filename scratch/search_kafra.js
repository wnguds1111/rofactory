const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');
    let found = false;
    lines.forEach((line, idx) => {
        if (line.toLowerCase().includes('kafra point') || line.includes('카프라')) {
            if (!found) {
                console.log(`\n[Found in ${file}]`);
                found = true;
            }
            console.log(`  Line ${idx + 1}: ${line.trim()}`);
        }
    });
});

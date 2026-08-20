const fs = require('fs');
const path = require('path');

const rootDir = 'c:\\Users\\GRAVITY\\Desktop\\Anti\\ro_factory';
const excludeDirs = ['.git', 'node_modules'];

function searchDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            if (!excludeDirs.includes(file)) {
                searchDir(fullPath);
            }
        } else {
            // Read file content
            try {
                const buffer = fs.readFileSync(fullPath);
                // Convert buffer to string, support UTF-8 and UTF-16
                let content = '';
                if (buffer.length >= 2 && buffer[0] === 0xFF && buffer[1] === 0xFE) {
                    content = buffer.toString('utf16le');
                } else if (buffer.length >= 2 && buffer[0] === 0xFE && buffer[1] === 0xFF) {
                    // Big endian UTF-16
                    content = buffer.swap16().toString('utf16le');
                } else {
                    content = buffer.toString('utf8');
                }

                const lines = content.split(/\r?\n/);
                lines.forEach((line, idx) => {
                    if (line.toLowerCase().includes('kafra') || line.includes('카프라')) {
                        console.log(`${fullPath}:${idx + 1}: ${line.trim()}`);
                    }
                });
            } catch (e) {
                // Ignore read errors
            }
        }
    }
}

searchDir(rootDir);
console.log('Search complete.');

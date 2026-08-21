const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'contest_policy.html');
let html = fs.readFileSync(targetPath, 'utf8');

// Change max-width from 1440px to 100% (or 1680px for spacious layout)
html = html.replace('max-width: 1440px;', 'width: 100%; max-width: 100%; padding: 0 20px;');

fs.writeFileSync(targetPath, html, 'utf8');
console.log('Successfully expanded layout width to 100%!');

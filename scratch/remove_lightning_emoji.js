const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'contest_policy.html');
let html = fs.readFileSync(targetPath, 'utf8');

html = html.replace('<span>⚡</span> <span>RO Factory 공모전 프로세스 요약</span>', '<span>RO Factory 공모전 프로세스 요약</span>');
html = html.replace('<span class="alert-icon">⚡</span>', '');

fs.writeFileSync(targetPath, html, 'utf8');
console.log('Successfully removed lightning emoji from contest_policy.html!');

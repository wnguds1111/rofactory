const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'contest_policy.html');
let html = fs.readFileSync(targetPath, 'utf8');

html = html.replace(/100% 무인 프로세스 자동화/g, '프로세스 자동화');
html = html.replace(/100% 시스템 무인 자동화/g, '프로세스 자동화');
html = html.replace(/100% 시스템 자동화/g, '프로세스 자동화');
html = html.replace(/100% 무인 프로세스/g, '프로세스 자동화');

fs.writeFileSync(targetPath, html, 'utf8');
console.log('Successfully updated automation phrases in contest_policy.html!');

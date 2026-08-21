const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'contest_policy.html');
let html = fs.readFileSync(targetPath, 'utf8');

html = html.replace(/ \(Admin Override\)/g, '');
html = html.replace(/\(Admin Override\)/g, '');

fs.writeFileSync(targetPath, html, 'utf8');
console.log("Successfully removed '(Admin Override)' text from contest_policy.html!");

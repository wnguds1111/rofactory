const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'contest_policy.html');
let content = fs.readFileSync(filePath, 'utf8');

const isCRLF = content.includes('\r\n');
content = content.replace(/\r\n/g, '\n');

const rowRegex = /\s*<tr>\s*<td[^>]*>당첨 보상 혜택<\/td>[\s\S]*?<\/tr>/;

if (rowRegex.test(content)) {
    content = content.replace(rowRegex, '');
    console.log('✅ "당첨 보상 혜택" row removed successfully');
} else {
    console.log('❌ "당첨 보상 혜택" row not found');
}

if (isCRLF) {
    content = content.replace(/\n/g, '\r\n');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('🎉 Successfully saved contest_policy.html!');

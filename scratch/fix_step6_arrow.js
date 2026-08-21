const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'contest_policy.html');
let html = fs.readFileSync(targetPath, 'utf8');

html = html.replace('</div>\n\n                            <!-- STEP 07 -->', '</div>\n\n                            <div style="text-align:center; color:#64748b; font-size:32px; font-weight:900; margin:8px 0; line-height:1;">↓</div>\n\n                            <!-- STEP 07 -->');

fs.writeFileSync(targetPath, html, 'utf8');
console.log('Added missing arrow between Step 06 and Step 07!');

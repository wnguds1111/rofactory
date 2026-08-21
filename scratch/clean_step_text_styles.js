const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'contest_policy.html');
let html = fs.readFileSync(targetPath, 'utf8');

// 1. Remove page tag "Vertical 11-Step Process Timeline"
html = html.replace(/<span class="page-tag"[^>]*>Vertical 11-Step Process Timeline<\/span>/g, '');

// 2. Remove code tag filenames: admin.html, register.html, contest_vote.html, market.html
html = html.replace(/<code>admin\.html<\/code>/g, '');
html = html.replace(/<code>register\.html<\/code>/g, '');
html = html.replace(/<code>contest_vote\.html<\/code>/g, '');
html = html.replace(/<code>market\.html<\/code>/g, '');

// Clean up any remaining double spaces or awkward parentheses resulting from deletion
html = html.replace(/어드민 백오피스\(\s*\)에서/g, '어드민 백오피스에서');
html = html.replace(/웹 마켓\(\s*\)과/g, '웹 마켓과');
html = html.replace(/인기 투표 사이트\(\s*\)의/g, '인기 투표 사이트의');

// 3. Change step description font size from 13px/13.5px to 16px
html = html.replace(/style="font-size:13px; color:#334155; line-height:1.6;"/g, 'style="font-size:16px; color:#334155; line-height:1.6;"');
html = html.replace(/style="font-size:13px; color:#047857; line-height:1.6;"/g, 'style="font-size:16px; color:#047857; line-height:1.6;"');
html = html.replace(/style="font-size:13.5px; color:#dcfce7; line-height:1.6;"/g, 'style="font-size:16px; color:#dcfce7; line-height:1.6;"');

fs.writeFileSync(targetPath, html, 'utf8');
console.log('Successfully cleaned up tags, filenames (admin.html, etc.), and updated description font-size to 16px!');

const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..');
const filesToUpdate = ['contest_policy.html', 'contest_event.html', 'contest_vote.html', 'policy.html', 'policy_checklist.html', 'ia.html', 'obt_schedule.html', 'flowchart.html'];

const newRightContent = `<div style="font-size:14px; font-weight:800; color:#e2e8f0; background:rgba(255,255,255,0.08); padding:6px 16px; border-radius:20px; border:1px solid rgba(255,255,255,0.15);">웹기획unit 이주형</div>`;

filesToUpdate.forEach(fileName => {
    const filePath = path.join(targetDir, fileName);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        if (content.includes('class="top-bar-links"')) {
            const oldLinks = content.substring(
                content.indexOf('<div class="top-bar-links">'),
                content.indexOf('</div>', content.indexOf('<div class="top-bar-links">')) + 6
            );
            const newLinks = `<div class="top-bar-links">\n            ${newRightContent}\n        </div>`;
            content = content.replace(oldLinks, newLinks);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated top bar right in ${fileName}`);
        }
    }
});

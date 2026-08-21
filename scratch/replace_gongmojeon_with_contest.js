const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..');
const filesToUpdate = ['contest_policy.html', 'contest_event.html', 'contest_vote.html', 'index.html', 'policy.html', 'policy_checklist.html', 'register.html', 'market.html'];

filesToUpdate.forEach(fileName => {
    const filePath = path.join(targetDir, fileName);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        if (content.includes('공모전')) {
            content = content.replace(/공모전/g, '콘테스트');
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated ${fileName}: Replaced '공모전' with '콘테스트'`);
        }
    }
});

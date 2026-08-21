const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'contest_policy.html');
let html = fs.readFileSync(targetPath, 'utf8');

const targetOld = `콘테스트 발표 후 최종 선정된 발자국 아이템을 남들보다 먼저 소장할 수 있다는 강력한 과금 동기를 형성합니다.`;
const targetNew = `콘테스트 발표 후 최종 선정된 발자국 아이템을 무료 소장 할 수 있다는 동기 형성.`;

if (html.includes(targetOld)) {
    html = html.replace(targetOld, targetNew);
    fs.writeFileSync(targetPath, html, 'utf8');
    console.log('Successfully updated free sojang motivation text in contest_policy.html!');
} else {
    console.error('Target text not found in contest_policy.html');
}

const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'contest_policy.html');
let html = fs.readFileSync(targetPath, 'utf8');

const oldBoxContent = `• <strong>유저 소속감 및 브랜드 가치 제고</strong>: 단순 소비자가 아닌 RO Factory 공식 크리에이터 아티스트 멤버십에 참여한다는 자부심을 제공합니다.`;

const newBoxContent = `• <strong>유저 소속감 및 브랜드 가치 제고</strong>: 단순 소비자가 아닌 RO Factory 공식 크리에이터 아티스트 멤버십에 참여한다는 자부심을 제공합니다.<br>
                                • <strong>비결제 유저 박탈감 완화 및 수용성 확보</strong>: 비결제 유저들에게는 최종 선정된 발자국 아이템 중 1회 구매권을 제공하여 박탈감을 완화하고 일반 유저의 마켓 참여를 유도합니다.`;

if (html.includes(oldBoxContent)) {
    html = html.replace(oldBoxContent, newBoxContent);
    fs.writeFileSync(targetPath, html, 'utf8');
    console.log('Successfully added F2P retention intent item to contest_policy.html!');
} else {
    console.error('Target box content not found in contest_policy.html');
}

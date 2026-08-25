const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'contest_policy.html');
let content = fs.readFileSync(filePath, 'utf8');

const isCRLF = content.includes('\r\n');
content = content.replace(/\r\n/g, '\n');

// 1. Update Table cell in Section 2
const oldCell = `<td style="padding:11px 14px; border:1px solid #e2e8f0; font-size:13.5px; color:#1e1b4b; background:#faf5ff;">
                                        <strong>이벤트 기간 내 결제 완료 유저</strong> (아티스트 권한)
                                    </td>`;

const newCell = `<td style="padding:11px 14px; border:1px solid #e2e8f0; font-size:13.5px; color:#1e1b4b; background:#faf5ff;">
                                        <strong>이벤트 기간 내 결제 완료 유저</strong> (아티스트 권한)<br>
                                        <span style="display:inline-block; margin-top:4px; font-size:12px; color:#6b21a8; font-weight:700;">※ 카프라 포인트(KP) / 정액제 결제 수단 무관</span>
                                    </td>`;

if (content.includes(oldCell)) {
    content = content.replace(oldCell, newCell);
    console.log('✅ Table cell updated');
} else {
    console.log('❌ Table cell match failed');
}

// 2. Update intro text in Section 2
const oldIntro = `이벤트 기간 결제 시 <strong>[아티스트 권한]</strong>을 부여하고`;
const newIntro = `이벤트 기간 결제 시(카프라 포인트 / 정액제 결제 무관) <strong>[아티스트 권한]</strong>을 부여하고`;
if (content.includes(oldIntro)) {
    content = content.replace(oldIntro, newIntro);
    console.log('✅ Section 2 intro updated');
}

// 3. Update strategic intent bullet point 1
const oldBullet = `기존 유저가 이벤트 기간 결제 시 발자국 등록 기회`;
const newBullet = `기존 유저가 이벤트 기간 내 결제 시(정액제 또는 카프라 포인트 결제 무관) 발자국 등록 기회`;
if (content.includes(oldBullet)) {
    content = content.replace(oldBullet, newBullet);
    console.log('✅ Section 2 bullet updated');
}

if (isCRLF) {
    content = content.replace(/\n/g, '\r\n');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('🎉 Successfully saved contest_policy.html!');

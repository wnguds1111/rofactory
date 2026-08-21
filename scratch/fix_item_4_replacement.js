const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'contest_policy.html');
let html = fs.readFileSync(targetPath, 'utf8');

const oldItem4 = `<strong>[당사 제안 반영]</strong> 작품 응모 시 <strong>'아티스트 명(닉네임)' 1회 필수 입력 모달</strong> 제공.<br>
                                        최초 1회 입력 후 마케팅/프로모션/인게임 제작자 표기에 해당 닉네임으로 자동 매칭 및 노출.`;

const newItem4 = `작품 등록 시 <strong>'아티스트 명(닉네임)' 1회 필수 입력 모달</strong> 제공.<br>
                                        최초 1회 입력 후 제작자 표기에 해당 닉네임으로 자동 매칭 및 노출.`;

if (html.includes(oldItem4)) {
    html = html.replace(oldItem4, newItem4);
    fs.writeFileSync(targetPath, html, 'utf8');
    console.log('Successfully updated Item 4 text in contest_policy.html!');
} else {
    console.error('Item 4 old text not found!');
}

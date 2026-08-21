const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'contest_policy.html');
let html = fs.readFileSync(targetPath, 'utf8');

const targetOld = `<strong>[당사 제안 반영]</strong> 작품 응모 시 <strong>'아티스트 명(닉네임)' 1회 필수 입력 모달</strong> 제공.<br>\r\n                                        최초 1회 입력 후 마케팅/프로모션/인게임 제작자 표기에 해당 닉네임으로 자동 매칭 및 노출.`;
const targetOldLF = `<strong>[당사 제안 반영]</strong> 작품 응모 시 <strong>'아티스트 명(닉네임)' 1회 필수 입력 모달</strong> 제공.<br>\n                                        최초 1회 입력 후 마케팅/프로모션/인게임 제작자 표기에 해당 닉네임으로 자동 매칭 및 노출.`;

const targetNew = `작품 등록 시 <strong>'아티스트 명(닉네임)' 1회 필수 입력 모달</strong> 제공.<br>\n                                        최초 1회 입력 후 제작자 표기에 해당 닉네임으로 자동 매칭 및 노출.`;

if (html.includes(targetOld)) {
    html = html.replace(targetOld, targetNew);
    fs.writeFileSync(targetPath, html, 'utf8');
    console.log('Successfully replaced CRLF targetOld!');
} else if (html.includes(targetOldLF)) {
    html = html.replace(targetOldLF, targetNew);
    fs.writeFileSync(targetPath, html, 'utf8');
    console.log('Successfully replaced LF targetOldLF!');
} else {
    // Regex replacement fallback
    html = html.replace(/<strong>\[당사 제안 반영\]<\/strong>\s*작품 응모 시\s*<strong>'아티스트 명\(닉네임\)' 1회 필수 입력 모달<\/strong>\s*제공\.<br>\s*최초 1회 입력 후 마케팅\/프로모션\/인게임 제작자 표기에 해당 닉네임으로 자동 매칭 및 노출\./,
        `작품 등록 시 <strong>'아티스트 명(닉네임)' 1회 필수 입력 모달</strong> 제공.<br>\n                                        최초 1회 입력 후 제작자 표기에 해당 닉네임으로 자동 매칭 및 노출.`
    );
    fs.writeFileSync(targetPath, html, 'utf8');
    console.log('Successfully replaced using Regex fallback!');
}

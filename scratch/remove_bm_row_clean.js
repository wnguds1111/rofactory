const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'contest_policy.html');
let html = fs.readFileSync(targetPath, 'utf8');

const targetOld = `                                <tr>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; font-size:14.5px; font-weight:800; color:#0f172a; background:#faf5ff;">BM 과금 동기 (Benefit)</td>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; font-size:14.5px; color:#334155; line-height:1.7;">단순 콘테스트 출품 기회 제공 (결제 유인 요소 약함)</td>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; font-size:14.5px; color:#581c87; line-height:1.7;">
                                        아티스트 권한 획득을 통한 <strong>유저 결제 유도(과금 명분 극대화)</strong> + 최종 선정작 구매 소장권 제공
                                    </td>
                                </tr>`;

if (html.includes(targetOld)) {
    html = html.replace(targetOld, '');
    fs.writeFileSync(targetPath, html, 'utf8');
    console.log('Successfully removed BM 과금 동기 row from contest_policy.html!');
} else {
    console.log('Target string match not found, executing regex replacement');
    html = html.replace(/<tr>\s*<td[^>]*>BM 과금 동기 \(Benefit\)<\/td>[\s\S]*?<\/tr>/, '');
    fs.writeFileSync(targetPath, html, 'utf8');
    console.log('Regex replacement completed!');
}

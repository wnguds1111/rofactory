const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'contest_policy.html');
let html = fs.readFileSync(targetPath, 'utf8');

// Update STEP 06 (Winner Ranking)
const oldStep06 = html.substring(html.indexOf('<!-- STEP 06 -->'), html.indexOf('<!-- STEP 07 -->'));

const newStep06 = `<!-- STEP 06 -->
                            <div style="background:#ffffff; border:1px solid #cbd5e1; border-left:5px solid #6366f1; border-radius:12px; padding:20px; box-shadow:0 2px 6px rgba(0,0,0,0.02);">
                                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                                    <div style="font-size:16px; font-weight:900; color:#0f172a;">STEP 06. 랭킹 선정 (Winner Ranking)</div>
                                    <span style="background:#e0e7ff; color:#3730a3; padding:3px 10px; border-radius:6px; font-size:11px; font-weight:800;">당첨작 확정</span>
                                </div>
                                <div style="font-size:15px; color:#334155; line-height:1.6;">
                                    유저 인기 투표 유효 득표 순위 상위 10개 당첨작을 100% 오로지 유저 투표 결과로 확정합니다. (GM/개발진 내부 심사 제외)
                                </div>
                                <div style="margin-top:12px; background:#f8fafc; border-left:3px solid #6366f1; padding:10px 14px; border-radius:0 6px 6px 0; font-size:14.5px; color:#475569; line-height:1.6;">
                                    <strong>고려사항</strong>: 계정당 최종 당첨 1개 제한(특정 유저 독식 방지).
                                </div>
                            </div>

                            `;

if (html.indexOf('<!-- STEP 06 -->') !== -1 && html.indexOf('<!-- STEP 07 -->') !== -1) {
    html = html.substring(0, html.indexOf('<!-- STEP 06 -->')) + newStep06 + html.substring(html.indexOf('<!-- STEP 07 -->'));
    fs.writeFileSync(targetPath, html, 'utf8');
    console.log('Successfully updated Step 06 Winner Ranking details in contest_policy.html!');
} else {
    console.error('STEP 06 or STEP 07 markers not found!');
}

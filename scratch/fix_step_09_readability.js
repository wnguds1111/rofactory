const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'contest_policy.html');
let html = fs.readFileSync(targetPath, 'utf8');

// Replace STEP 09 with light green card for perfect contrast and 100% readability
const oldStep09 = html.substring(
    html.indexOf('<!-- STEP 09'),
    html.indexOf('</div>\n\n                        </div>\n                    </div>\n\n                    <!-- Proposal Box:')
);

const newStep09 = `<!-- STEP 09 (LAUNCHED HIGHLIGHT) -->
                            <div style="background:#f0fdf4; border:2px solid #22c55e; border-left:5px solid #16a34a; border-radius:12px; padding:20px; box-shadow:0 4px 12px rgba(22, 163, 74, 0.08);">
                                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                                    <div style="font-size:16px; font-weight:900; color:#14532d;">STEP 09. 마켓 개시</div>
                                    <span style="background:#16a34a; color:#ffffff; padding:4px 12px; border-radius:6px; font-size:11.5px; font-weight:900;">마켓 개시 (START)</span>
                                </div>
                                <div style="font-size:15px; color:#166534; line-height:1.6;">
                                    어드민 백오피스에서 관리자가 <strong style="color:#14532d; font-weight:900;">[마켓 상점 일괄 개시 (START)]</strong> 버튼을 클릭하는 즉시 웹 마켓과 인게임 상점이 100% 동시에 활성화되어 유저 대상 판매가 시작됩니다!
                                </div>
                                <div style="margin-top:12px; background:#ffffff; border:1px solid #bbf7d0; border-left:4px solid #16a34a; padding:10px 14px; border-radius:0 6px 6px 0; font-size:14.5px; color:#14532d; line-height:1.6;">
                                    <strong style="color:#14532d; font-weight:900;">고려사항</strong>: 관리자 실수 클릭 방지용 2차 확인 모달 팝업 적용 및 개시 클릭 후 10초간 취소할 수 있는 카운트다운 롤백 타임아웃을 연동합니다.
                                </div>
                            </div>`;

if (oldStep09) {
    html = html.replace(oldStep09, newStep09);
    fs.writeFileSync(targetPath, html, 'utf8');
    console.log('Successfully updated Step 09 readability and styling in contest_policy.html!');
} else {
    console.error('STEP 09 section not found!');
}

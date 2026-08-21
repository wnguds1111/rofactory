const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'contest_policy.html');
let html = fs.readFileSync(targetPath, 'utf8');

// 1. Remove English titles from Step cards
html = html.replace('STEP 01. 일정 세팅 (Date Setup)', 'STEP 01. 일정 세팅');
html = html.replace('STEP 02. 접수 개시 (Submission Open)', 'STEP 02. 접수 개시');
html = html.replace('STEP 03. 접수 마감 (Submission Deadline)', 'STEP 03. 접수 마감');
html = html.replace('STEP 04. S3 유효성 파일 검증 (S3 File Verification)', 'STEP 04. S3 유효성 파일 검증');
html = html.replace('STEP 05. 투표 노출 및 유저 인기 투표 (Vote Display &amp; User Voting)', 'STEP 05. 투표 노출 및 유저 인기 투표');
html = html.replace('STEP 05. 투표 노출 및 유저 인기 투표 (Vote Display & User Voting)', 'STEP 05. 투표 노출 및 유저 인기 투표');
html = html.replace('STEP 06. 랭킹 선정 (Winner Ranking)', 'STEP 06. 랭킹 선정');
html = html.replace('STEP 09. 마켓 개시 (Admin 1-Click Launch)', 'STEP 09. 마켓 개시');

// 2. Fix Step 09 card styling for 100% font contrast & readability
const oldStep09Card = `                            <!-- STEP 09 (LAUNCHED HIGHLIGHT) -->
                            <div style="background:linear-gradient(135deg, #0f172a, #16a34a); border:2px solid #22c55e; border-radius:14px; padding:22px; color:#ffffff; box-shadow:0 6px 20px rgba(34, 197, 94, 0.2);">
                                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                                    <div style="font-size:16px; font-weight:900; color:#ffffff;">STEP 09. 마켓 개시</div>
                                    <span style="background:#ffffff; color:#15803d; padding:4px 12px; border-radius:6px; font-size:11.5px; font-weight:900;">마켓 개시 (START)</span>
                                </div>
                                <div style="font-size:15px; color:#dcfce7; line-height:1.6;">
                                    어드민 백오피스에서 관리자가 <strong>[마켓 상점 일괄 개시 (START)]</strong> 버튼을 클릭하는 즉시 웹 마켓과 인게임 상점이 100% 동시에 활성화되어 유저 대상 판매가 시작됩니다!
                                </div>
                                <div style="margin-top:12px; background:rgba(255,255,255,0.1); border-left:4px solid #22c55e; padding:10px 14px; border-radius:0 6px 6px 0; font-size:14.5px; color:#f0fdf4; line-height:1.6;">
                                    <strong>고려사항</strong>: 관리자 실수 클릭 방지용 2차 확인 모달 팝업 적용 및 개시 클릭 후 10초간 취소할 수 있는 카운트다운 롤백 타임아웃을 연동합니다.
                                </div>
                            </div>`;

const newStep09Card = `                            <!-- STEP 09 (LAUNCHED HIGHLIGHT) -->
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

if (html.includes(oldStep09Card)) {
    html = html.replace(oldStep09Card, newStep09Card);
} else {
    console.log('Old Step 09 card string exact match not found, doing fallback regex replacement');
    html = html.replace(
        /<!-- STEP 09 [\s\S]*?<\/div>\s*<\/div>/,
        newStep09Card
    );
}

fs.writeFileSync(targetPath, html, 'utf8');
console.log('Successfully updated Step titles and Step 09 card contrast in contest_policy.html!');

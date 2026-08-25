const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'contest_policy.html');
let html = fs.readFileSync(targetPath, 'utf8');

const targetArea = html.substring(
    html.indexOf('<!-- STEP 04 -->'),
    html.indexOf('<!-- STEP 07 -->')
);

const newArea = `<!-- STEP 04 -->
                            <div style="background:#ffffff; border:1px solid #cbd5e1; border-left:5px solid #7e22ce; border-radius:12px; padding:20px; box-shadow:0 2px 6px rgba(0,0,0,0.02);">
                                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                                    <div style="font-size:16px; font-weight:900; color:#0f172a;">STEP 04. S3 유효성 파일 검증</div>
                                    <span style="background:#f3e8ff; color:#6b21a8; padding:3px 10px; border-radius:6px; font-size:11px; font-weight:800;">자동화 검증</span>
                                </div>
                                <div style="font-size:15px; color:#334155; line-height:1.6;">
                                    S3 유효성 파일 검증 (웹에서 접수된 발자국의 등록 마감 이후 다음 단계로 넘어가지 전 전체 파일을 대상으로 유효성 확인을 진행하는 과정 추가.)
                                </div>
                                <div style="margin-top:12px; background:#f8fafc; border-left:3px solid #7e22ce; padding:10px 14px; border-radius:0 6px 6px 0; font-size:14.5px; color:#475569; line-height:1.6;">
                                    <strong>고려사항</strong>: S3 데이터 기능 유효성 자동화 부분에서 OBT 당시 정보보안에서 수동으로 한 보안 검증 자동화까지도 가능한지 확인 필요.
                                </div>
                            </div>

                            <div style="text-align:center; color:#64748b; font-size:32px; font-weight:900; margin:8px 0; line-height:1;">↓</div>

                            <!-- STEP 05 (MERGED 05 + 06) -->
                            <div style="background:#ffffff; border:1px solid #cbd5e1; border-left:5px solid #ec4899; border-radius:12px; padding:20px; box-shadow:0 2px 6px rgba(0,0,0,0.02);">
                                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                                    <div style="font-size:16px; font-weight:900; color:#0f172a;">STEP 05. 투표 노출 및 유저 인기 투표</div>
                                    <span style="background:#fce7f3; color:#9d174d; padding:3px 10px; border-radius:6px; font-size:11px; font-weight:800;">투표 전용 웹</span>
                                </div>
                                <div style="font-size:15px; color:#334155; line-height:1.6;">
                                    검수를 거친 응모작들이 전용 투표 사이트에 자동 노출되며, 로그인 유저는 매일 1회 마음에 드는 발자국 아이템에 투표 가능 (어드민에서 설정한 기간 까지 투표 가능)
                                </div>
                                <div style="margin-top:12px; background:#f8fafc; border-left:3px solid #ec4899; padding:10px 14px; border-radius:0 6px 6px 0; font-size:14.5px; color:#475569; line-height:1.6;">
                                    <strong>고려사항</strong>: 실시간 투표 기능 웹사이트 제작
                                </div>
                            </div>

                            <div style="text-align:center; color:#64748b; font-size:32px; font-weight:900; margin:8px 0; line-height:1;">↓</div>

                            <!-- STEP 06 -->
                            <div style="background:#ffffff; border:1px solid #cbd5e1; border-left:5px solid #6366f1; border-radius:12px; padding:20px; box-shadow:0 2px 6px rgba(0,0,0,0.02);">
                                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                                    <div style="font-size:16px; font-weight:900; color:#0f172a;">STEP 06. 랭킹 선정</div>
                                    <span style="background:#e0e7ff; color:#3730a3; padding:3px 10px; border-radius:6px; font-size:11px; font-weight:800;">당첨작 확정</span>
                                </div>
                                <div style="font-size:15px; color:#334155; line-height:1.6;">
                                    유저 인기 투표 유효 득표 순위 상위 10개 당첨작을 100% 오로지 유저 투표 결과로 확정합니다.
                                </div>
                            </div>

                            <div style="text-align:center; color:#64748b; font-size:32px; font-weight:900; margin:8px 0; line-height:1;">↓</div>

                            `;

html = html.replace(targetArea, newArea);
fs.writeFileSync(targetPath, html, 'utf8');
console.log('Successfully restored STEP 05 and cleanly updated STEP 06!');

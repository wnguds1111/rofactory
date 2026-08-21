const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'contest_policy.html');
let html = fs.readFileSync(targetPath, 'utf8');

// 1. Update Title, Subtitle, and Sidebar from 10단계 to 9단계
html = html.replace(/1\. 공모전 운영 10단계 프로세스/g, '1. 공모전 운영 9단계 프로세스');
html = html.replace('1단계부터 10단계까지 <strong>위에서 아래로 한 줄씩 순차적으로 내려가는 프로세스 타임라인</strong>', '1단계부터 9단계까지 <strong>위에서 아래로 한 줄씩 순차적으로 내려가는 프로세스 타임라인</strong>');
html = html.replace('공모전 운영 10단계 프로세스 세부 명세', '공모전 운영 9단계 프로세스 세부 명세');

// 2. Rebuild the 9 Step Cards Container cleanly
const new9StepsContainer = `
                        <div style="display:flex; flex-direction:column; gap:6px; margin-top:16px;" id="verticalStepContainer">
                            
                            <!-- STEP 01 -->
                            <div style="background:#ffffff; border:1px solid #cbd5e1; border-left:5px solid #2563eb; border-radius:12px; padding:20px; box-shadow:0 2px 6px rgba(0,0,0,0.02);">
                                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                                    <div style="font-size:16px; font-weight:900; color:#0f172a;">STEP 01. 일정 세팅 (Date Setup)</div>
                                    <span style="background:#dbeafe; color:#1e40af; padding:3px 10px; border-radius:6px; font-size:11px; font-weight:800;">어드민 세팅</span>
                                </div>
                                <div style="font-size:15px; color:#334155; line-height:1.6;">
                                    어드민 백오피스에서 ① 유저 발자국 등록 시작/종료일 및 ② 랭킹 선정(투표) 시작/종료일을 회차별 사전 세팅 관리합니다.
                                </div>
                            </div>

                            <div style="text-align:center; color:#64748b; font-size:32px; font-weight:900; margin:8px 0; line-height:1;">↓</div>

                            <!-- STEP 02 -->
                            <div style="background:#ffffff; border:1px solid #cbd5e1; border-left:5px solid #0284c7; border-radius:12px; padding:20px; box-shadow:0 2px 6px rgba(0,0,0,0.02);">
                                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                                    <div style="font-size:16px; font-weight:900; color:#0f172a;">STEP 02. 접수 개시 (Submission Open)</div>
                                    <span style="background:#e0f2fe; color:#0369a1; padding:3px 10px; border-radius:6px; font-size:11px; font-weight:800;">유저 접수</span>
                                </div>
                                <div style="font-size:15px; color:#334155; line-height:1.6;">
                                    이벤트 랜딩 페이지가 오픈되고 결제 유저 대상 유저가 작품 등록 가능 (어드민에서 설정한 기간 까지 발자국 등록 가능)
                                </div>
                                <div style="margin-top:12px; background:#f8fafc; border-left:3px solid #0284c7; padding:10px 14px; border-radius:0 6px 6px 0; font-size:14.5px; color:#475569; line-height:1.6;">
                                    <strong>고려사항</strong>: 제출작 삭제 시 티켓 미재발급 경고 표기 및 아티스트 닉네임 1회 필수 입력 절차 적용.
                                </div>
                            </div>

                            <div style="text-align:center; color:#64748b; font-size:32px; font-weight:900; margin:8px 0; line-height:1;">↓</div>

                            <!-- STEP 03 -->
                            <div style="background:#ffffff; border:1px solid #cbd5e1; border-left:5px solid #d97706; border-radius:12px; padding:20px; box-shadow:0 2px 6px rgba(0,0,0,0.02);">
                                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                                    <div style="font-size:16px; font-weight:900; color:#0f172a;">STEP 03. 접수 마감 (Submission Deadline)</div>
                                    <span style="background:#fef3c7; color:#92400e; padding:3px 10px; border-radius:6px; font-size:11px; font-weight:800;">자동 차단</span>
                                </div>
                                <div style="font-size:15px; color:#334155; line-height:1.6;">
                                    등록 종료 일시 도달 시 서버 타임스탬프 기반으로 신규 등록 및 수정/삭제가 자동 차단되며 수집작이 Lock 처리됩니다.
                                </div>
                            </div>

                            <div style="text-align:center; color:#64748b; font-size:32px; font-weight:900; margin:8px 0; line-height:1;">↓</div>

                            <!-- STEP 04 -->
                            <div style="background:#ffffff; border:1px solid #cbd5e1; border-left:5px solid #7e22ce; border-radius:12px; padding:20px; box-shadow:0 2px 6px rgba(0,0,0,0.02);">
                                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                                    <div style="font-size:16px; font-weight:900; color:#0f172a;">STEP 04. S3 유효성 파일 검증 (S3 File Verification)</div>
                                    <span style="background:#f3e8ff; color:#6b21a8; padding:3px 10px; border-radius:6px; font-size:11px; font-weight:800;">S3 + Lambda</span>
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
                                    <div style="font-size:16px; font-weight:900; color:#0f172a;">STEP 05. 투표 노출 및 유저 인기 투표 (Vote Display &amp; User Voting)</div>
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
                                    <div style="font-size:16px; font-weight:900; color:#0f172a;">STEP 06. 랭킹 선정 (Winner Ranking)</div>
                                    <span style="background:#e0e7ff; color:#3730a3; padding:3px 10px; border-radius:6px; font-size:11px; font-weight:800;">당첨작 확정</span>
                                </div>
                                <div style="font-size:15px; color:#334155; line-height:1.6;">
                                    유효 득표 1순위 상위 5개(유저 투표 5개) + GM/개발진 내부 심사 5개를 조합하여 총 10개 당첨작을 확정합니다.
                                </div>
                                <div style="margin-top:12px; background:#f8fafc; border-left:3px solid #6366f1; padding:10px 14px; border-radius:0 6px 6px 0; font-size:14.5px; color:#475569; line-height:1.6;">
                                    <strong>고려사항</strong>: 계정당 최종 당첨 1개 제한(특정 유저 독식 방지), 동률 발생 시 우선순위 규칙 적용 [1순위: 업로드 등록 시점이 빠른 순 ➔ 2순위: 3D 추천수 많은 순].
                                </div>
                            </div>

                            <div style="text-align:center; color:#64748b; font-size:32px; font-weight:900; margin:8px 0; line-height:1;">↓</div>

                            <!-- STEP 07 -->
                            <div style="background:#ffffff; border:1px solid #cbd5e1; border-left:5px solid #a855f7; border-radius:12px; padding:20px; box-shadow:0 2px 6px rgba(0,0,0,0.02);">
                                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                                    <div style="font-size:16px; font-weight:900; color:#0f172a;">STEP 07. 패치 및 마켓 데이터 자동 생성</div>
                                    <span style="background:#f3e8ff; color:#6b21a8; padding:3px 10px; border-radius:6px; font-size:11px; font-weight:800;">자동 빌드</span>
                                </div>
                                <div style="font-size:15px; color:#334155; line-height:1.6;">
                                    선정된 발자국 리스트에 자동으로 아이템 ID 매핑
                                </div>
                                <div style="margin-top:12px; background:#f8fafc; border-left:3px solid #a855f7; padding:10px 14px; border-radius:0 6px 6px 0; font-size:14.5px; color:#475569; line-height:1.6;">
                                    <strong>고려사항</strong>: 정기점검 당일 점검 시작 2시간 전 리소스 패치 파일 자동 컴파일 완료 및 RO 패처 CDN 스테이징 서버 자동 동기화.
                                </div>
                            </div>

                            <div style="text-align:center; color:#64748b; font-size:32px; font-weight:900; margin:8px 0; line-height:1;">↓</div>

                            <!-- STEP 08 -->
                            <div style="background:#ffffff; border:1px solid #cbd5e1; border-left:5px solid #09090b; border-radius:12px; padding:20px; box-shadow:0 2px 6px rgba(0,0,0,0.02);">
                                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                                    <div style="font-size:16px; font-weight:900; color:#0f172a;">STEP 08. 마켓 DB 전달</div>
                                    <span style="background:#f4f4f5; color:#18181b; padding:3px 10px; border-radius:6px; font-size:11px; font-weight:800;">판매 대기</span>
                                </div>
                                <div style="font-size:15px; color:#334155; line-height:1.6;">
                                    자동 매핑 이후 어드민에서 판매 대기 상태 전환
                                </div>
                                <div style="margin-top:12px; background:#f8fafc; border-left:3px solid #09090b; padding:10px 14px; border-radius:0 6px 6px 0; font-size:14.5px; color:#475569; line-height:1.6;">
                                    <strong>고려사항</strong>: 당첨 크리에이터 유저에게 [영구 소유 귀속 아이템] 무상 발급 + 마켓 일반 구매 유저용 [무제한 영구 소유권] 상품 속성 최종 전달.
                                </div>
                            </div>

                            <div style="text-align:center; color:#64748b; font-size:32px; font-weight:900; margin:8px 0; line-height:1;">↓</div>

                            <!-- STEP 09 (LAUNCHED HIGHLIGHT) -->
                            <div style="background:linear-gradient(135deg, #0f172a, #16a34a); border:2px solid #22c55e; border-radius:14px; padding:22px; color:#ffffff; box-shadow:0 6px 20px rgba(34, 197, 94, 0.2);">
                                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                                    <div style="font-size:16px; font-weight:900; color:#ffffff;">STEP 09. 마켓 개시 (Admin 1-Click Launch)</div>
                                    <span style="background:#ffffff; color:#15803d; padding:4px 12px; border-radius:6px; font-size:11.5px; font-weight:900;">마켓 개시 (START)</span>
                                </div>
                                <div style="font-size:15px; color:#dcfce7; line-height:1.6;">
                                    어드민 백오피스에서 관리자가 <strong>[마켓 상점 일괄 개시 (START)]</strong> 버튼을 클릭하는 즉시 웹 마켓과 인게임 상점이 100% 동시에 활성화되어 유저 대상 판매가 시작됩니다!
                                </div>
                                <div style="margin-top:12px; background:rgba(255,255,255,0.1); border-left:4px solid #22c55e; padding:10px 14px; border-radius:0 6px 6px 0; font-size:14.5px; color:#f0fdf4; line-height:1.6;">
                                    <strong>고려사항</strong>: 관리자 실수 클릭 방지용 2차 확인 모달 팝업 적용 및 개시 클릭 후 10초간 취소할 수 있는 카운트다운 롤백 타임아웃을 연동합니다.
                                </div>
                            </div>

                        </div>`;

const containerStart = html.indexOf('<div style="display:flex; flex-direction:column; gap:6px; margin-top:16px;" id="verticalStepContainer">');
const containerEnd = html.indexOf('</div>\n                    </div>\n\n                    <!-- Proposal Box:', containerStart);

if (containerStart !== -1 && containerEnd !== -1) {
    html = html.substring(0, containerStart) + new9StepsContainer + '\n                    ' + html.substring(containerEnd);
    fs.writeFileSync(targetPath, html, 'utf8');
    console.log('Successfully merged Step 5 and 6 into 9-step pipeline in contest_policy.html!');
} else {
    console.error('Step container markers not found!');
}

const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'contest_policy.html');
let html = fs.readFileSync(targetPath, 'utf8');

// 1. Update Title and Sidebar
html = html.replace('3. 리스크 관리 &amp; 법적 고지</a>', '3. 리스크 관리 &amp; 법적 고지</a>');
html = html.replace('1. 공모전 운영 11단계 타임라인', '1. 공모전 운영 10단계 프로세스');
html = html.replace('<h3>1. 공모전 운영 11단계 프로세스 타임라인 및 단계별 고려사항</h3>', '<h3>1. 공모전 운영 10단계 프로세스</h3>');
html = html.replace('<strong>RO Factory 공모전 운영 11단계 한 줄씩 순차 이동 타임라인</strong>', '<strong>RO Factory 공모전 운영 10단계 프로세스 타임라인</strong>');
html = html.replace('1단계부터 11단계까지 <strong>위에서 아래로 한 줄씩 순차적으로 내려가는 직관적인 세로형 타임라인</strong> 명세입니다. 각 단계 바로 하단에 세부 고려사항이 포함되어 있습니다.', '1단계부터 10단계까지 <strong>위에서 아래로 한 줄씩 순차적으로 내려가는 프로세스 타임라인</strong> 명세입니다.');
html = html.replace('<div class="spec-label">1단계부터 11단계까지 순차 하강 타임라인 세부 명세</div>', '<div class="spec-label">공모전 운영 10단계 프로세스 세부 명세</div>');

// 2. Rebuild the 10 Step Cards Container
const newStepsContainer = `
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

                            <!-- STEP 05 -->
                            <div style="background:#ffffff; border:1px solid #cbd5e1; border-left:5px solid #ec4899; border-radius:12px; padding:20px; box-shadow:0 2px 6px rgba(0,0,0,0.02);">
                                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                                    <div style="font-size:16px; font-weight:900; color:#0f172a;">STEP 05. 투표 노출 (Vote Display)</div>
                                    <span style="background:#fce7f3; color:#9d174d; padding:3px 10px; border-radius:6px; font-size:11px; font-weight:800;">투표 전용 웹</span>
                                </div>
                                <div style="font-size:15px; color:#334155; line-height:1.6;">
                                    검수를 거친 응모작들이 전용 투표 사이트에 자동 노출 (어드민에서 설정한 기간 까지 투표 가능)
                                </div>
                                <div style="margin-top:12px; background:#f8fafc; border-left:3px solid #ec4899; padding:10px 14px; border-radius:0 6px 6px 0; font-size:14.5px; color:#475569; line-height:1.6;">
                                    <strong>고려사항</strong>: 반응형 3D 실시간 뷰어 최적화 및 이메일 노출 방지(아티스트 닉네임 표기).
                                </div>
                            </div>

                            <div style="text-align:center; color:#64748b; font-size:32px; font-weight:900; margin:8px 0; line-height:1;">↓</div>

                            <!-- STEP 06 -->
                            <div style="background:#ffffff; border:1px solid #cbd5e1; border-left:5px solid #8b5cf6; border-radius:12px; padding:20px; box-shadow:0 2px 6px rgba(0,0,0,0.02);">
                                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                                    <div style="font-size:16px; font-weight:900; color:#0f172a;">STEP 06. 유저 인기 투표 (User Voting)</div>
                                    <span style="background:#f3e8ff; color:#6b21a8; padding:3px 10px; border-radius:6px; font-size:11px; font-weight:800;">유저 투표</span>
                                </div>
                                <div style="font-size:15px; color:#334155; line-height:1.6;">
                                    로그인 유저는 매일 1회 마음에 드는 발자국 아이템에 투표 가능
                                </div>
                                <div style="margin-top:12px; background:#f8fafc; border-left:3px solid #8b5cf6; padding:10px 14px; border-radius:0 6px 6px 0; font-size:14.5px; color:#475569; line-height:1.6;">
                                    <strong>고려사항</strong>: 계정당 1일 1회 투표 제한, 매크로 방지 CAPTCHA 검증 및 동일 IP 다계정 부당 득표 차단 필터링 적용.
                                </div>
                            </div>

                            <div style="text-align:center; color:#64748b; font-size:32px; font-weight:900; margin:8px 0; line-height:1;">↓</div>

                            <!-- STEP 07 -->
                            <div style="background:#ffffff; border:1px solid #cbd5e1; border-left:5px solid #6366f1; border-radius:12px; padding:20px; box-shadow:0 2px 6px rgba(0,0,0,0.02);">
                                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                                    <div style="font-size:16px; font-weight:900; color:#0f172a;">STEP 07. 랭킹 선정 (Winner Ranking)</div>
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

                            <!-- STEP 08 -->
                            <div style="background:#ffffff; border:1px solid #cbd5e1; border-left:5px solid #a855f7; border-radius:12px; padding:20px; box-shadow:0 2px 6px rgba(0,0,0,0.02);">
                                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                                    <div style="font-size:16px; font-weight:900; color:#0f172a;">STEP 08. 패치 및 마켓 데이터 자동 생성</div>
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

                            <!-- STEP 09 -->
                            <div style="background:#ffffff; border:1px solid #cbd5e1; border-left:5px solid #09090b; border-radius:12px; padding:20px; box-shadow:0 2px 6px rgba(0,0,0,0.02);">
                                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                                    <div style="font-size:16px; font-weight:900; color:#0f172a;">STEP 09. 마켓 DB 전달</div>
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

                            <!-- STEP 10 (LAUNCHED HIGHLIGHT) -->
                            <div style="background:linear-gradient(135deg, #0f172a, #16a34a); border:2px solid #22c55e; border-radius:14px; padding:22px; color:#ffffff; box-shadow:0 6px 20px rgba(34, 197, 94, 0.2);">
                                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                                    <div style="font-size:16px; font-weight:900; color:#ffffff;">STEP 10. 마켓 개시 (Admin 1-Click Launch)</div>
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
const containerEnd = html.indexOf('</div>\n                    </div>\n\n                    <!-- Proposal Box: Ticket Distribution & Market Purchase Privileges -->', containerStart);

if (containerStart !== -1 && containerEnd !== -1) {
    html = html.substring(0, containerStart) + newStepsContainer + '\n                    ' + html.substring(containerEnd);
}

// 3. Rebuild Proposal Box (Infographic Flow + Clean Comparison Table with NO Status Column)
const newProposalBox = `
                    <!-- Proposal Box: Ticket Distribution & Market Purchase Privileges -->
                    <div class="spec-group" style="margin-top:36px; background:#faf5ff; border:2px solid #c084fc; border-radius:16px; padding:28px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                            <div style="font-size:17px; font-weight:900; color:#581c87;">
                                발자국 티켓 지급 및 구매 권한 프리미엄 회원제 제안
                            </div>
                            <span style="background:#9333ea; color:#fff; padding:4px 14px; border-radius:12px; font-size:11.5px; font-weight:800;">BM &amp; Membership Proposal</span>
                        </div>

                        <div style="font-size:14.5px; color:#6b21a8; line-height:1.6; margin-bottom:24px;">
                            기존 플레이어 유저에게 발자국 작품 등록 기회뿐만 아니라 <strong>[아티스트 권한]</strong>을 부여하여, 결제 시 추후 최종 선정된 한정판 발자국 아이템을 소장할 수 있는 <strong>프리미엄 멤버십 가치</strong>를 제공하는 기획 제안입니다.
                        </div>

                        <!-- Infographic Visual Process Flow -->
                        <div style="background:#ffffff; border:1.5px solid #e9d5ff; border-radius:14px; padding:20px; margin-bottom:24px; box-shadow:0 4px 12px rgba(147, 51, 234, 0.05);">
                            <div style="font-size:14px; font-weight:900; color:#581c87; margin-bottom:14px; border-left:3px solid #9333ea; padding-left:8px;">
                                프리미엄 아티스트 회원제 메커니즘 인포그래픽
                            </div>
                            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:12px; align-items:center;">
                                
                                <div style="background:#faf5ff; border:1px solid #d8b4fe; border-radius:10px; padding:14px; text-align:center;">
                                    <div style="font-size:11px; font-weight:800; color:#9333ea; text-transform:uppercase;">1단계. 결제 &amp; 권한 부여</div>
                                    <div style="font-size:14px; font-weight:900; color:#581c87; margin-top:4px;">이벤트 기간 결제</div>
                                    <div style="font-size:12px; color:#6b21a8; margin-top:4px; line-height:1.4;">
                                        정액제/KP 결제 시 <strong>[아티스트 권한]</strong> + 발자국 티켓 10회 동시 발급
                                    </div>
                                </div>

                                <div style="text-align:center; color:#a855f7; font-size:20px; font-weight:900;">→</div>

                                <div style="background:#faf5ff; border:1px solid #d8b4fe; border-radius:10px; padding:14px; text-align:center;">
                                    <div style="font-size:11px; font-weight:800; color:#9333ea; text-transform:uppercase;">2단계. 정성 출품</div>
                                    <div style="font-size:14px; font-weight:900; color:#581c87; margin-top:4px;">10회 집중 출품 캡</div>
                                    <div style="font-size:12px; color:#6b21a8; margin-top:4px; line-height:1.4;">
                                        30회 대량 스팸 방지 및 완성도 높은 3D 자산 집중 업로드
                                    </div>
                                </div>

                                <div style="text-align:center; color:#a855f7; font-size:20px; font-weight:900;">→</div>

                                <div style="background:#faf5ff; border:1px solid #d8b4fe; border-radius:10px; padding:14px; text-align:center;">
                                    <div style="font-size:11px; font-weight:800; color:#9333ea; text-transform:uppercase;">3단계. 공모전 당첨작 확정</div>
                                    <div style="font-size:14px; font-weight:900; color:#581c87; margin-top:4px;">10개 최종 선정</div>
                                    <div style="font-size:12px; color:#6b21a8; margin-top:4px; line-height:1.4;">
                                        유저 투표 5개 + GM 평가 5개 ➔ 인게임 패치 &amp; 마켓 출시
                                    </div>
                                </div>

                                <div style="text-align:center; color:#a855f7; font-size:20px; font-weight:900;">→</div>

                                <div style="background:#f3e8ff; border:2px solid #9333ea; border-radius:10px; padding:14px; text-align:center;">
                                    <div style="font-size:11px; font-weight:800; color:#6b21a8; text-transform:uppercase;">4단계. 프리미엄 혜택</div>
                                    <div style="font-size:14px; font-weight:900; color:#581c87; margin-top:4px;">아티스트 전용 소장</div>
                                    <div style="font-size:12px; color:#581c87; font-weight:800; margin-top:4px; line-height:1.4;">
                                        <strong>[아티스트 권한 보유자 전용 마켓 소장/구매 자격 제공]</strong>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <!-- Comparison Table (Clean Layout with NO Status Column) -->
                        <table class="spec-table" style="margin-bottom:20px;">
                            <thead>
                                <tr>
                                    <th style="width:180px;">구분</th>
                                    <th style="width:340px;">기본안 (Standard Policy)</th>
                                    <th>당사 제안안 (Premium Artist Membership)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="field">티켓 지급 조건</td>
                                    <td>기간 상관없이 정액제 구매 시 30회 티켓 일괄 발송</td>
                                    <td>
                                        <strong>이벤트 기간 내 정액제 또는 결제(KP/패키지) 진행 시</strong> 발자국 등록 티켓 10회 발송 + <strong>[아티스트 권한]</strong> 부여
                                    </td>
                                </tr>
                                <tr>
                                    <td class="field">작품 출품 캡</td>
                                    <td>30회 출품 기회 제공</td>
                                    <td><strong>10회 출품 캡 적용</strong> (무성의한 스팸 업로드 방지 및 고품질 정성 출품 유도)</td>
                                </tr>
                                <tr>
                                    <td class="field">마켓 구매 자격</td>
                                    <td>정액제 구매 여부와 상관없이 모든 유저 구매 가능</td>
                                    <td>
                                        <strong>[아티스트 권한] 보유 유저 전용 마켓 구매 가능</strong> (이벤트 기간 결제 유저 대상 독점 소유권 제공)
                                    </td>
                                </tr>
                                <tr>
                                    <td class="field">BM 과금 동기 (Benefit)</td>
                                    <td>단순 공모전 출품 기회 제공 (결제 유인 요소 약함)</td>
                                    <td>
                                        아티스트 권한 획득을 통한 <strong>유저 결제 유도(과금 명분 극대화)</strong> + 최종 선정작 구매 소장권 제공
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <!-- Detailed Strategic Intent -->
                        <div style="background:#ffffff; border:1px solid #e9d5ff; border-radius:12px; padding:18px 20px;">
                            <div style="font-size:14.5px; font-weight:900; color:#581c87; margin-bottom:8px;">
                                프리미엄 아티스트 회원제 기획 의도 및 기대 효과
                            </div>
                            <div style="font-size:13.5px; color:#475569; line-height:1.7;">
                                • <strong>과금 유저 대상 프리미엄 가치 제공</strong>: 기존 유저가 이벤트 기간 결제 시 발자국 등록 기회(10회)뿐만 아니라 '아티스트 권한'을 획득하게 되어, 공모전 발표 후 최종 선정된 발자국 아이템을 남들보다 먼저 소장할 수 있다는 강력한 과금 동기를 형성합니다.<br>
                                • <strong>작품 퀄리티 상승 및 스팸 차단</strong>: 무분별한 30회 등록 대신 10회 집중 등록을 유도하여 3D 메시 규격 및 완성도가 높은 양질의 크리에이터 데이터 수집을 도모합니다.<br>
                                • <strong>유저 소속감 및 브랜드 가치 제고</strong>: 단순 소비자가 아닌 RO Factory 공식 크리에이터 아티스트 멤버십에 참여한다는 자부심을 제공합니다.
                            </div>
                        </div>

                    </div>`;

const proposalStart = html.indexOf('<!-- Proposal Box: Ticket Distribution & Market Purchase Privileges -->');
const proposalEnd = html.indexOf('</div>\n\n                </div>\n            </div>', proposalStart);

if (proposalStart !== -1 && proposalEnd !== -1) {
    html = html.substring(0, proposalStart) + newProposalBox + html.substring(proposalEnd);
}

fs.writeFileSync(targetPath, html, 'utf8');
console.log('Successfully updated 10-step process timeline and infographic proposal box in contest_policy.html!');

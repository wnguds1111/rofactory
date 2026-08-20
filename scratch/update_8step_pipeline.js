const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'contest_policy.html');
let html = fs.readFileSync(targetPath, 'utf8');

// Replace Section 5 with the exact 8-step pipeline requested by the user
const newSection5 = `<!-- ===================== SECTION 5 ===================== -->
            <div class="page-section" id="sec-automation">
                <div class="page-header">
                    <div class="page-icon" style="background:#f0fdf4; color:#16a34a;">🤖</div>
                    <h3>5. 공모전 운영 8단계 자동화 파이프라인 & 프로세스 플로우차트 명세</h3>
                    <div class="section-edit-tools" style="display:none; margin-left:auto; gap:6px;">
                        <button onclick="addTableRow(this)" style="background:#e0f2fe; color:#0369a1; border:1px solid #bae6fd; padding:3px 10px; border-radius:4px; font-size:11.5px; font-weight:700; cursor:pointer;">+ 행 추가</button>
                    </div>
                    <span class="page-tag" style="margin-left:10px; background:#dcfce7; color:#15803d;">8-Step Automation Spec</span>
                </div>
                <div class="page-body">

                    <div class="alert-box alert-info" style="margin-bottom:24px; background:#ecfdf5; border-color:#a7f3d0; color:#065f46;">
                        <span class="alert-icon">⚡</span>
                        <div>
                            <strong>RO Factory 시즌제 콘테스트 8단계 운영 및 자동화 연동 명세</strong><br>
                            날짜 설정부터 발자국 등록, S3 기반 보안/유효성 검사, 웹 DB 수신, 인기 투표 및 랭킹 선정(5개)까지의 전체 세부 프로세스입니다.
                        </div>
                    </div>

                    <!-- Flowchart Visual Diagram Header -->
                    <div class="spec-group">
                        <div class="spec-label-row">
                            <div class="spec-label" style="border-left-color:#10b981;">🔄 콘테스트 8단계 상세 프로세스 플로우차트</div>
                        </div>

                        <!-- 8 Step Cards Flowchart Container -->
                        <div style="display:flex; flex-direction:column; gap:12px; position:relative; margin-top:16px;" id="automationFlowContainer">
                            
                            <!-- STEP 1 -->
                            <div style="background:#f8fafc; border:2px solid #cbd5e1; border-radius:12px; padding:18px 22px; display:flex; gap:16px; align-items:center; position:relative;">
                                <div style="width:42px; height:42px; border-radius:50%; background:#2563eb; color:#fff; font-weight:900; font-size:16px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">1</div>
                                <div style="flex:1;">
                                    <div style="font-size:11px; font-weight:800; color:#2563eb; text-transform:uppercase;">STEP 01. 일정 설정 (Admin Date Configuration)</div>
                                    <div style="font-size:15px; font-weight:900; color:#0f172a; margin-top:2px;">📅 발자국 시즌제 콘테스트 날짜 설정</div>
                                    <div style="font-size:12.5px; color:#475569; margin-top:4px;">
                                        어드민 백오피스(<code>admin.html</code>)에서 ① <strong>유저 발자국 등록 시작/종료일</strong> 및 ② <strong>유저 인기 투표 랭킹 선정 시작/종료일</strong>을 회차별로 사전 설정합니다.
                                    </div>
                                </div>
                                <div style="background:#dbeafe; color:#1e40af; padding:6px 12px; border-radius:8px; font-size:11.5px; font-weight:800; white-space:nowrap;">어드민 세팅</div>
                            </div>

                            <div style="text-align:center; color:#94a3b8; font-size:18px; font-weight:900; margin:-4px 0;">⬇️</div>

                            <!-- STEP 2 -->
                            <div style="background:#f8fafc; border:2px solid #cbd5e1; border-radius:12px; padding:18px 22px; display:flex; gap:16px; align-items:center; position:relative;">
                                <div style="width:42px; height:42px; border-radius:50%; background:#0284c7; color:#fff; font-weight:900; font-size:16px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">2</div>
                                <div style="flex:1;">
                                    <div style="font-size:11px; font-weight:800; color:#0284c7; text-transform:uppercase;">STEP 02. 접수 개시 (Submission Open)</div>
                                    <div style="font-size:15px; font-weight:900; color:#0f172a; margin-top:2px;">🎨 발자국 등록 시작 (티켓 30장 발급 & register.html)</div>
                                    <div style="font-size:12.5px; color:#475569; margin-top:4px;">
                                        설정된 시작 일시에 이벤트 페이지(<code>contest_event.html</code>)가 오픈되며, 결제 유저 대상 크리에이터 티켓(30회 캡) 발급 및 <code>register.html</code>을 통한 작품 출품이 활성화됩니다.
                                    </div>
                                </div>
                                <div style="background:#e0f2fe; color:#0369a1; padding:6px 12px; border-radius:8px; font-size:11.5px; font-weight:800; white-space:nowrap;">웹/이벤트 랜딩</div>
                            </div>

                            <div style="text-align:center; color:#94a3b8; font-size:18px; font-weight:900; margin:-4px 0;">⬇️</div>

                            <!-- STEP 3 -->
                            <div style="background:#f8fafc; border:2px solid #cbd5e1; border-radius:12px; padding:18px 22px; display:flex; gap:16px; align-items:center; position:relative;">
                                <div style="width:42px; height:42px; border-radius:50%; background:#d97706; color:#fff; font-weight:900; font-size:16px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">3</div>
                                <div style="flex:1;">
                                    <div style="font-size:11px; font-weight:800; color:#d97706; text-transform:uppercase;">STEP 03. 접수 마감 (Submission Deadline)</div>
                                    <div style="font-size:15px; font-weight:900; color:#0f172a; margin-top:2px;">⏰ 발자국 등록 마감 (시스템 자동 차단)</div>
                                    <div style="font-size:12.5px; color:#475569; margin-top:4px;">
                                        등록 종료 일시(예: 1st 회차 10/31 23:59:59) 도달 시 서버 타임스탬프 기반으로 신규 등록 및 수정/삭제가 자동 차단되며 1차 수집작이 락(Lock) 처리됩니다.
                                    </div>
                                </div>
                                <div style="background:#fef3c7; color:#92400e; padding:6px 12px; border-radius:8px; font-size:11.5px; font-weight:800; white-space:nowrap;">자동 마감</div>
                            </div>

                            <div style="text-align:center; color:#94a3b8; font-size:18px; font-weight:900; margin:-4px 0;">⬇️</div>

                            <!-- STEP 4 -->
                            <div style="background:#faf5ff; border:2px solid #c084fc; border-radius:12px; padding:18px 22px; display:flex; gap:16px; align-items:center; position:relative;">
                                <div style="width:42px; height:42px; border-radius:50%; background:#7e22ce; color:#fff; font-weight:900; font-size:16px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">4</div>
                                <div style="flex:1;">
                                    <div style="font-size:11px; font-weight:800; color:#7e22ce; text-transform:uppercase;">STEP 04. 보안/검증 자동화 (S3 Validation & Security)</div>
                                    <div style="font-size:15px; font-weight:900; color:#0f172a; margin-top:2px;">🛡️ 적재된 발자국 데이터 기능 유효성 & 보안 검사 (S3 트리거 연동)</div>
                                    <div style="font-size:12.5px; color:#475569; margin-top:4px;">
                                        <strong>[S3 가능 여부 기술 명세]</strong>: AWS S3 이벤트 트리거(<code>S3 Event Notification</code>)와 <code>Lambda Serverless Engine</code>을 연동하여, 업로드 즉시 ① 파일 바이트 헤더/시그니처 보안 검사, ② <code>.foot</code> 3D 메시 헤더 규격 및 용량 유효성 검사, ③ 악성 스크립트/유해성 검사를 S3 적재 단계에서 100% 자동 검사합니다.
                                    </div>
                                </div>
                                <div style="background:#f3e8ff; color:#6b21a8; padding:6px 12px; border-radius:8px; font-size:11.5px; font-weight:800; white-space:nowrap;">S3 + Lambda Engine</div>
                            </div>

                            <div style="text-align:center; color:#94a3b8; font-size:18px; font-weight:900; margin:-4px 0;">⬇️</div>

                            <!-- STEP 5 -->
                            <div style="background:#f8fafc; border:2px solid #cbd5e1; border-radius:12px; padding:18px 22px; display:flex; gap:16px; align-items:center; position:relative;">
                                <div style="width:42px; height:42px; border-radius:50%; background:#059669; color:#fff; font-weight:900; font-size:16px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">5</div>
                                <div style="flex:1;">
                                    <div style="font-size:11px; font-weight:800; color:#059669; text-transform:uppercase;">STEP 05. DB 수신 & 정제 (Database Indexing)</div>
                                    <div style="font-size:15px; font-weight:900; color:#0f172a; margin-top:2px;">🗄️ 선별된 발자국 데이터 웹 DB 자동 수신</div>
                                    <div style="font-size:12.5px; color:#475569; margin-top:4px;">
                                        보안/유효성 검사를 통과한 정제 파일(<code>APPROVED</code>)만 웹 DB(MySQL/MongoDB) 스테이징 테이블로 데이터가 수신되며, 3D WebGL 실시간 프리뷰 메타데이터가 생성됩니다.
                                    </div>
                                </div>
                                <div style="background:#d1fae5; color:#065f46; padding:6px 12px; border-radius:8px; font-size:11.5px; font-weight:800; white-space:nowrap;">Production Web DB</div>
                            </div>

                            <div style="text-align:center; color:#94a3b8; font-size:18px; font-weight:900; margin:-4px 0;">⬇️</div>

                            <!-- STEP 6 -->
                            <div style="background:#f8fafc; border:2px solid #cbd5e1; border-radius:12px; padding:18px 22px; display:flex; gap:16px; align-items:center; position:relative;">
                                <div style="width:42px; height:42px; border-radius:50%; background:#ec4899; color:#fff; font-weight:900; font-size:16px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">6</div>
                                <div style="flex:1;">
                                    <div style="font-size:11px; font-weight:800; color:#ec4899; text-transform:uppercase;">STEP 06. 투표 후보작 바인딩 (Vote Page Display)</div>
                                    <div style="font-size:15px; font-weight:900; color:#0f172a; margin-top:2px;">🗳️ 투표 페이지(<code>contest_vote.html</code>)에 선별된 발자국 데이터 자동 노출</div>
                                    <div style="font-size:12.5px; color:#475569; margin-top:4px;">
                                        선별 및 GM 1차 검수를 거친 숏리스트 응모작들이 전용 인기 투표 사이트(<code>contest_vote.html</code>)의 3D 실시간 뷰어 그리드로 자동 노출 및 배치됩니다.
                                    </div>
                                </div>
                                <div style="background:#fce7f3; color:#9d174d; padding:6px 12px; border-radius:8px; font-size:11.5px; font-weight:800; white-space:nowrap;">투표 웹 페이지</div>
                            </div>

                            <div style="text-align:center; color:#94a3b8; font-size:18px; font-weight:900; margin:-4px 0;">⬇️</div>

                            <!-- STEP 7 -->
                            <div style="background:#f8fafc; border:2px solid #cbd5e1; border-radius:12px; padding:18px 22px; display:flex; gap:16px; align-items:center; position:relative;">
                                <div style="width:42px; height:42px; border-radius:50%; background:#8b5cf6; color:#fff; font-weight:900; font-size:16px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">7</div>
                                <div style="flex:1;">
                                    <div style="font-size:11px; font-weight:800; color:#8b5cf6; text-transform:uppercase;">STEP 07. 유저 참여 투표 (User Voting Phase)</div>
                                    <div style="font-size:15px; font-weight:900; color:#0f172a; margin-top:2px;">🗳️ 유저 인기 투표 진행 (1일 1회 로그인 계정 투표)</div>
                                    <div style="font-size:12.5px; color:#475569; margin-top:4px;">
                                        랭킹 선정 기간 동안 유저는 매일 1회 마음에 드는 발자국 3D 아이템에 투표를 행사하며, 어뷰징/매크로 방지 IP 및 캡차(CAPTCHA) 검증이 적용됩니다.
                                    </div>
                                </div>
                                <div style="background:#f3e8ff; color:#6b21a8; padding:6px 12px; border-radius:8px; font-size:11.5px; font-weight:800; white-space:nowrap;">유저 투표 진행</div>
                            </div>

                            <div style="text-align:center; color:#94a3b8; font-size:18px; font-weight:900; margin:-4px 0;">⬇️</div>

                            <!-- STEP 8 -->
                            <div style="background:linear-gradient(135deg, #0f172a, #16a34a); border:2px solid #22c55e; border-radius:14px; padding:22px 26px; color:#fff; display:flex; gap:18px; align-items:center; position:relative; box-shadow:0 8px 20px rgba(22, 163, 74, 0.25);">
                                <div style="width:48px; height:48px; border-radius:50%; background:#22c55e; color:#fff; font-weight:900; font-size:18px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">8</div>
                                <div style="flex:1;">
                                    <div style="font-size:11px; font-weight:800; color:#86efac; text-transform:uppercase;">STEP 08. 최종 랭킹 확정 (Final Ranking & Winner Selection)</div>
                                    <div style="font-size:17px; font-weight:900; color:#fff; margin-top:2px;">🏆 투표 랭킹 선정 (기준 적용: 상위 5개 당첨작 확정)</div>
                                    <div style="font-size:13px; color:#dcfce7; margin-top:6px; line-height:1.6;">
                                        <strong>[랭킹 선정 명확 기준]</strong>:<br>
                                        ① <strong>1순위 (득표수)</strong>: 중복/어뷰징 검증 후 유효 득표수가 높은 순서대로 상위 5개 최종 선정<br>
                                        ② <strong>2순위 (동률 처리)</strong>: 득표수가 동일할 경우 <u>작품 업로드 등록 시점이 빠른 순</u> ➔ <u>3D 뷰어 추천(좋아요) 수가 높은 순</u><br>
                                        ③ <strong>중복 제한</strong>: 동일 계정 다수 당첨 시 최고 득표작 1개만 인정 (차순위 자동 승계)
                                    </div>
                                </div>
                                <div style="background:#ffffff; color:#15803d; padding:10px 18px; border-radius:10px; font-size:13px; font-weight:900; white-space:nowrap; box-shadow:0 4px 12px rgba(0,0,0,0.15);">
                                    👑 상위 5개 당첨 확정
                                </div>
                            </div>

                        </div>
                    </div>

                    <!-- Pipeline Specification Table -->
                    <div class="spec-group" style="margin-top:28px;">
                        <div class="spec-label-row">
                            <div class="spec-label">8단계 운영 및 기술 세부 명세표</div>
                            <div class="section-edit-tools" style="display:none; gap:6px;">
                                <button onclick="addTableRow(this)" style="background:#e0f2fe; color:#0369a1; border:1px solid #bae6fd; padding:3px 10px; border-radius:4px; font-size:11.5px; font-weight:700; cursor:pointer;">+ 행 추가</button>
                            </div>
                        </div>
                        <table class="spec-table">
                            <thead>
                                <tr>
                                    <th style="width:160px;">운영/기술 단계</th>
                                    <th style="width:260px;">주요 세부 파라미터</th>
                                    <th>기술 명세 및 검증/운영 처리 로직</th>
                                    <th style="width:110px; text-align:center;">상태</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="field">1. 날짜 설정</td>
                                    <td><code>reg_start</code>, <code>reg_end</code>, <code>vote_start</code>, <code>vote_end</code></td>
                                    <td>어드민 백오피스에서 유저 등록 및 인기 투표 랭킹 기간을 분 단위로 설정 관리.</td>
                                    <td style="text-align:center;"><span class="badge badge-green">✅ 확정</span></td>
                                </tr>
                                <tr>
                                    <td class="field">2. 등록 시작</td>
                                    <td>티켓 30장 발급, <code>register.html</code></td>
                                    <td>정액제/KP 결제 유저에 회차당 30회 캡 티켓 발급 및 작품 업로드 양식 활성화.</td>
                                    <td style="text-align:center;"><span class="badge badge-green">✅ 확정</span></td>
                                </tr>
                                <tr>
                                    <td class="field">3. 등록 마감</td>
                                    <td>타임스탬프 차단, <code>IS_LOCKED=true</code></td>
                                    <td>등록 종료 일시 도달 시 서버 단에서 신규 업로드 및 기존 등록작 수정/삭제 자동 차단.</td>
                                    <td style="text-align:center;"><span class="badge badge-green">✅ 확정</span></td>
                                </tr>
                                <tr>
                                    <td class="field">4. S3 보안/유효성 검사</td>
                                    <td>S3 Event + AWS Lambda Serverless</td>
                                    <td>S3 적재 직후 Lambda가 바이트 헤더, 3D Mesh 규격, 스크립트 유해성 100% 자동 검사 (S3에서 처리 가능).</td>
                                    <td style="text-align:center;"><span class="badge badge-blue">✅ 기술검증완료</span></td>
                                </tr>
                                <tr>
                                    <td class="field">5. 웹 DB 수신</td>
                                    <td>MySQL / MongoDB Indexing</td>
                                    <td>검증 통과된 클린 데이터만 정제되어 웹 마켓 및 투표용 DB 스테이징 테이블로 이관.</td>
                                    <td style="text-align:center;"><span class="badge badge-green">✅ 확정</span></td>
                                </tr>
                                <tr>
                                    <td class="field">6. 투표 페이지 노출</td>
                                    <td><code>contest_vote.html</code> 3D Grid</td>
                                    <td>1차 선별된 응모작들이 유저 투표 사이트에 3D 실시간 WebGL 프리뷰 형태로 자동 노출.</td>
                                    <td style="text-align:center;"><span class="badge badge-green">✅ 확정</span></td>
                                </tr>
                                <tr>
                                    <td class="field">7. 투표 진행</td>
                                    <td>1일 1회 투표, 어뷰징/매크로 방지</td>
                                    <td>로그인 계정당 1일 1회 투표 가능. CAPTCHA 및 IP 중복 방지 로직 적용.</td>
                                    <td style="text-align:center;"><span class="badge badge-green">✅ 확정</span></td>
                                </tr>
                                <tr>
                                    <td class="field">8. 랭킹 선정 (기준)</td>
                                    <td>유효 득표 1순위 ➔ 등록순 ➔ 추천순 (5개)</td>
                                    <td>유효 득표 순 상위 5개 선정. 동률 시 [업로드 등록 시점 빠른 순] ➔ [3D 추천수 순]. 계정당 1개 당첨 제한.</td>
                                    <td style="text-align:center;"><span class="badge badge-green">✅ 기준확정</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>`;

// Replace section 5 in contest_policy.html
const sec5Start = html.indexOf('<!-- ===================== SECTION 5 ===================== -->');
if (sec5Start !== -1) {
    const mainEnd = html.indexOf('</div>\n    </div>', sec5Start);
    if (mainEnd !== -1) {
        html = html.substring(0, sec5Start) + newSection5 + '\n\n        ' + html.substring(mainEnd);
    }
}

fs.writeFileSync(targetPath, html, 'utf8');
console.log('Successfully updated Section 5 with the 8-step pipeline!');

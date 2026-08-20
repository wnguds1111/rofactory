const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'contest_policy.html');
let html = fs.readFileSync(targetPath, 'utf8');

// Replace Section 5 with the exact 11-step pipeline + Considerations block requested by the user
const newSection5 = `<!-- ===================== SECTION 5 ===================== -->
            <div class="page-section" id="sec-automation">
                <div class="page-header">
                    <div class="page-icon" style="background:#f0fdf4; color:#16a34a;">🤖</div>
                    <h3>5. 공모전 운영 11단계 전과정 자동화 파이프라인 & 프로세스 플로우차트</h3>
                    <div class="section-edit-tools" style="display:none; margin-left:auto; gap:6px;">
                        <button onclick="addTableRow(this)" style="background:#e0f2fe; color:#0369a1; border:1px solid #bae6fd; padding:3px 10px; border-radius:4px; font-size:11.5px; font-weight:700; cursor:pointer;">+ 행 추가</button>
                    </div>
                    <span class="page-tag" style="margin-left:10px; background:#dcfce7; color:#15803d;">11-Step Pipeline & Considerations</span>
                </div>
                <div class="page-body">

                    <div class="alert-box alert-info" style="margin-bottom:24px; background:#ecfdf5; border-color:#a7f3d0; color:#065f46;">
                        <span class="alert-icon">⚡</span>
                        <div>
                            <strong>RO Factory 시즌제 콘테스트 11단계 E2E 자동화 파이프라인</strong><br>
                            날짜 설정부터 발자국 등록, S3 보안 검사, 웹 DB 수신, 투표 진행/랭킹 선정, 스튜디오 패치 빌드, 최종 마켓 DB 전달 및 어드민 1-Click 스타트 개시까지의 전체 프로세스와 주요 기획/기술 고려사항입니다.
                        </div>
                    </div>

                    <!-- Flowchart Visual Diagram Header -->
                    <div class="spec-group">
                        <div class="spec-label-row">
                            <div class="spec-label" style="border-left-color:#10b981;">🔄 콘테스트 11단계 상세 프로세스 플로우차트</div>
                        </div>

                        <!-- 11 Step Cards Flowchart Container -->
                        <div style="display:flex; flex-direction:column; gap:10px; position:relative; margin-top:16px;" id="automationFlowContainer">
                            
                            <!-- STEP 1 -->
                            <div style="background:#f8fafc; border:2px solid #cbd5e1; border-radius:12px; padding:16px 20px; display:flex; gap:16px; align-items:center;">
                                <div style="width:38px; height:38px; border-radius:50%; background:#2563eb; color:#fff; font-weight:900; font-size:15px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">1</div>
                                <div style="flex:1;">
                                    <div style="font-size:11px; font-weight:800; color:#2563eb; text-transform:uppercase;">STEP 01. 일정 설정 (Date Setup)</div>
                                    <div style="font-size:14.5px; font-weight:900; color:#0f172a; margin-top:2px;">📅 발자국 시즌제 콘테스트 날짜 설정</div>
                                    <div style="font-size:12.5px; color:#475569; margin-top:2px;">
                                        어드민 백오피스(<code>admin.html</code>)에서 ① <strong>유저 발자국 등록 시작/종료일</strong> 및 ② <strong>랭킹 선정(투표) 시작/종료일</strong>을 회차별 사전 세팅 관리합니다.
                                    </div>
                                </div>
                                <div style="background:#dbeafe; color:#1e40af; padding:5px 10px; border-radius:6px; font-size:11px; font-weight:800; white-space:nowrap;">어드민 세팅</div>
                            </div>

                            <div style="text-align:center; color:#94a3b8; font-size:16px; font-weight:900; margin:-4px 0;">⬇️</div>

                            <!-- STEP 2 -->
                            <div style="background:#f8fafc; border:2px solid #cbd5e1; border-radius:12px; padding:16px 20px; display:flex; gap:16px; align-items:center;">
                                <div style="width:38px; height:38px; border-radius:50%; background:#0284c7; color:#fff; font-weight:900; font-size:15px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">2</div>
                                <div style="flex:1;">
                                    <div style="font-size:11px; font-weight:800; color:#0284c7; text-transform:uppercase;">STEP 02. 접수 개시 (Submission Open)</div>
                                    <div style="font-size:14.5px; font-weight:900; color:#0f172a; margin-top:2px;">🎨 발자국 등록 시작</div>
                                    <div style="font-size:12.5px; color:#475569; margin-top:2px;">
                                        시작 일시에 이벤트 페이지(<code>contest_event.html</code>)가 오픈되고 결제 유저 대상 티켓(30회 캡) 지급 및 <code>register.html</code> 작품 출품이 활성화됩니다.
                                    </div>
                                </div>
                                <div style="background:#e0f2fe; color:#0369a1; padding:5px 10px; border-radius:6px; font-size:11px; font-weight:800; white-space:nowrap;">이벤트 랜딩</div>
                            </div>

                            <div style="text-align:center; color:#94a3b8; font-size:16px; font-weight:900; margin:-4px 0;">⬇️</div>

                            <!-- STEP 3 -->
                            <div style="background:#f8fafc; border:2px solid #cbd5e1; border-radius:12px; padding:16px 20px; display:flex; gap:16px; align-items:center;">
                                <div style="width:38px; height:38px; border-radius:50%; background:#d97706; color:#fff; font-weight:900; font-size:15px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">3</div>
                                <div style="flex:1;">
                                    <div style="font-size:11px; font-weight:800; color:#d97706; text-transform:uppercase;">STEP 03. 접수 마감 (Submission Deadline)</div>
                                    <div style="font-size:14.5px; font-weight:900; color:#0f172a; margin-top:2px;">⏰ 발자국 등록 마감</div>
                                    <div style="font-size:12.5px; color:#475569; margin-top:2px;">
                                        등록 종료 일시 도달 시 서버 타임스탬프 기반으로 신규 등록 및 수정/삭제가 자동 차단되며 수집작이 Lock 처리됩니다.
                                    </div>
                                </div>
                                <div style="background:#fef3c7; color:#92400e; padding:5px 10px; border-radius:6px; font-size:11px; font-weight:800; white-space:nowrap;">자동 마감</div>
                            </div>

                            <div style="text-align:center; color:#94a3b8; font-size:16px; font-weight:900; margin:-4px 0;">⬇️</div>

                            <!-- STEP 4 -->
                            <div style="background:#faf5ff; border:2px solid #c084fc; border-radius:12px; padding:16px 20px; display:flex; gap:16px; align-items:center;">
                                <div style="width:38px; height:38px; border-radius:50%; background:#7e22ce; color:#fff; font-weight:900; font-size:15px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">4</div>
                                <div style="flex:1;">
                                    <div style="font-size:11px; font-weight:800; color:#7e22ce; text-transform:uppercase;">STEP 04. 보안/검증 자동화 (S3 Verification)</div>
                                    <div style="font-size:14.5px; font-weight:900; color:#0f172a; margin-top:2px;">🛡️ 적재된 발자국 데이터 기능 유효성 & 보안 검사 (S3 트리거 연동)</div>
                                    <div style="font-size:12.5px; color:#475569; margin-top:2px;">
                                        <strong>AWS S3 Event Notification + Lambda Engine</strong> 연동으로 업로드 즉시 ① 바이트 헤더 보안, ② 3D 메시 규격/용량 검사, ③ NSFW/악성 스크립트 100% 자동 검증.
                                    </div>
                                </div>
                                <div style="background:#f3e8ff; color:#6b21a8; padding:5px 10px; border-radius:6px; font-size:11px; font-weight:800; white-space:nowrap;">S3 + Lambda</div>
                            </div>

                            <div style="text-align:center; color:#94a3b8; font-size:16px; font-weight:900; margin:-4px 0;">⬇️</div>

                            <!-- STEP 5 -->
                            <div style="background:#f8fafc; border:2px solid #cbd5e1; border-radius:12px; padding:16px 20px; display:flex; gap:16px; align-items:center;">
                                <div style="width:38px; height:38px; border-radius:50%; background:#059669; color:#fff; font-weight:900; font-size:15px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">5</div>
                                <div style="flex:1;">
                                    <div style="font-size:11px; font-weight:800; color:#059669; text-transform:uppercase;">STEP 05. DB 수신 & 정제 (Database Indexing)</div>
                                    <div style="font-size:14.5px; font-weight:900; color:#0f172a; margin-top:2px;">🗄️ 선별된 발자국 데이터 웹 DB 자동 수신</div>
                                    <div style="font-size:12.5px; color:#475569; margin-top:2px;">
                                        보안/유효성 검사를 통과한 정제 파일(<code>APPROVED</code>)만 웹 DB 스테이징 테이블로 데이터가 수신되며 3D WebGL 프리뷰 경로가 생성됩니다.
                                    </div>
                                </div>
                                <div style="background:#d1fae5; color:#065f46; padding:5px 10px; border-radius:6px; font-size:11px; font-weight:800; white-space:nowrap;">Production DB</div>
                            </div>

                            <div style="text-align:center; color:#94a3b8; font-size:16px; font-weight:900; margin:-4px 0;">⬇️</div>

                            <!-- STEP 6 -->
                            <div style="background:#f8fafc; border:2px solid #cbd5e1; border-radius:12px; padding:16px 20px; display:flex; gap:16px; align-items:center;">
                                <div style="width:38px; height:38px; border-radius:50%; background:#ec4899; color:#fff; font-weight:900; font-size:15px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">6</div>
                                <div style="flex:1;">
                                    <div style="font-size:11px; font-weight:800; color:#ec4899; text-transform:uppercase;">STEP 06. 투표 노출 (Vote Display)</div>
                                    <div style="font-size:14.5px; font-weight:900; color:#0f172a; margin-top:2px;">🖼️ 투표 페이지(<code>contest_vote.html</code>)에 선별된 발자국 데이터 노출</div>
                                    <div style="font-size:12.5px; color:#475569; margin-top:2px;">
                                        선별 및 1차 검수를 거친 응모작들이 전용 인기 투표 사이트(<code>contest_vote.html</code>)의 3D 실시간 WebGL 뷰어 그리드로 자동 배치 노출됩니다.
                                    </div>
                                </div>
                                <div style="background:#fce7f3; color:#9d174d; padding:5px 10px; border-radius:6px; font-size:11px; font-weight:800; white-space:nowrap;">투표 전용 웹</div>
                            </div>

                            <div style="text-align:center; color:#94a3b8; font-size:16px; font-weight:900; margin:-4px 0;">⬇️</div>

                            <!-- STEP 7 -->
                            <div style="background:#f8fafc; border:2px solid #cbd5e1; border-radius:12px; padding:16px 20px; display:flex; gap:16px; align-items:center;">
                                <div style="width:38px; height:38px; border-radius:50%; background:#8b5cf6; color:#fff; font-weight:900; font-size:15px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">7</div>
                                <div style="flex:1;">
                                    <div style="font-size:11px; font-weight:800; color:#8b5cf6; text-transform:uppercase;">STEP 07. 투표 진행 (Voting Active)</div>
                                    <div style="font-size:14.5px; font-weight:900; color:#0f172a; margin-top:2px;">🗳️ 유저 인기 투표 진행 (1일 1회 로그인 계정 투표)</div>
                                    <div style="font-size:12.5px; color:#475569; margin-top:2px;">
                                        투표 기간 동안 로그인 유저는 매일 1회 마음에 드는 발자국 3D 아이템에 투표를 행사하며, 어뷰징/매크로 방지 CAPTCHA 검증이 실행됩니다.
                                    </div>
                                </div>
                                <div style="background:#f3e8ff; color:#6b21a8; padding:5px 10px; border-radius:6px; font-size:11px; font-weight:800; white-space:nowrap;">유저 투표</div>
                            </div>

                            <div style="text-align:center; color:#94a3b8; font-size:16px; font-weight:900; margin:-4px 0;">⬇️</div>

                            <!-- STEP 8 -->
                            <div style="background:#f8fafc; border:2px solid #cbd5e1; border-radius:12px; padding:16px 20px; display:flex; gap:16px; align-items:center;">
                                <div style="width:38px; height:38px; border-radius:50%; background:#6366f1; color:#fff; font-weight:900; font-size:15px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">8</div>
                                <div style="flex:1;">
                                    <div style="font-size:11px; font-weight:800; color:#6366f1; text-transform:uppercase;">STEP 08. 랭킹 선정 (Winner Ranking)</div>
                                    <div style="font-size:14.5px; font-weight:900; color:#0f172a; margin-top:2px;">🏆 투표 랭킹 선정 (기준 적용: 상위 5개 당첨작 확정)</div>
                                    <div style="font-size:12.5px; color:#475569; margin-top:2px;">
                                        유효 득표수 1순위 기준 상위 5개 선정. (동률 발생 시: ① 업로드 등록 시점이 빠른 순 ➔ ② 3D 추천수 순. 계정당 1개 당첨 제한)
                                    </div>
                                </div>
                                <div style="background:#e0e7ff; color:#3730a3; padding:5px 10px; border-radius:6px; font-size:11px; font-weight:800; white-space:nowrap;">상위 5개 선정</div>
                            </div>

                            <div style="text-align:center; color:#94a3b8; font-size:16px; font-weight:900; margin:-4px 0;">⬇️</div>

                            <!-- STEP 9 -->
                            <div style="background:#faf5ff; border:2px solid #a855f7; border-radius:12px; padding:16px 20px; display:flex; gap:16px; align-items:center;">
                                <div style="width:38px; height:38px; border-radius:50%; background:#a855f7; color:#fff; font-weight:900; font-size:15px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">9</div>
                                <div style="flex:1;">
                                    <div style="font-size:11px; font-weight:800; color:#a855f7; text-transform:uppercase;">STEP 09. 스튜디오 전달 & 자동 패치 (Studio Transfer & Auto Patch)</div>
                                    <div style="font-size:14.5px; font-weight:900; color:#0f172a; margin-top:2px;">🎬 선정된 데이터 스튜디오 전달 ➔ 패치데이터 & 마켓 데이터 생성 자동</div>
                                    <div style="font-size:12.5px; color:#475569; margin-top:2px;">
                                        선정작 10개(GM 5개 + 투표 5개) 원본 자산을 스튜디오 빌드 파이프라인으로 전달하여 라그나로크 클라이언트 리소스 패치(<code>.grf</code> / <code>.gpf</code>) 및 마켓 상점 상품 객체를 100% 자동 생성합니다.
                                    </div>
                                </div>
                                <div style="background:#f3e8ff; color:#6b21a8; padding:5px 10px; border-radius:6px; font-size:11px; font-weight:800; white-space:nowrap;">Studio & Patch Generator</div>
                            </div>

                            <div style="text-align:center; color:#94a3b8; font-size:16px; font-weight:900; margin:-4px 0;">⬇️</div>

                            <!-- STEP 10 -->
                            <div style="background:#f8fafc; border:2px solid #cbd5e1; border-radius:12px; padding:16px 20px; display:flex; gap:16px; align-items:center;">
                                <div style="width:38px; height:38px; border-radius:50%; background:#09090b; color:#fff; font-weight:900; font-size:15px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">10</div>
                                <div style="flex:1;">
                                    <div style="font-size:11px; font-weight:800; color:#09090b; text-transform:uppercase;">STEP 10. 마켓 DB 전달 (Market DB Sync)</div>
                                    <div style="font-size:14.5px; font-weight:900; color:#0f172a; margin-top:2px;">🌐 웹에 최종 마켓 DB 자동 전달 및 준비</div>
                                    <div style="font-size:12.5px; color:#475569; margin-top:2px;">
                                        최종 정제된 아이템 스펙, 3D WebGL 프리뷰 데이터, 아티스트 닉네임, 유효기간 및 가격 파라미터를 운영 환경 웹 마켓 DB로 전달하여 개시 대기 상태(<code>STATUS_READY</code>)로 전환합니다.
                                    </div>
                                </div>
                                <div style="background:#f4f4f5; color:#18181b; padding:5px 10px; border-radius:6px; font-size:11px; font-weight:800; white-space:nowrap;">Web Market DB</div>
                            </div>

                            <div style="text-align:center; color:#94a3b8; font-size:16px; font-weight:900; margin:-4px 0;">⬇️</div>

                            <!-- STEP 11 -->
                            <div style="background:linear-gradient(135deg, #0f172a, #16a34a); border:2px solid #22c55e; border-radius:14px; padding:20px 24px; color:#fff; display:flex; gap:18px; align-items:center; box-shadow:0 8px 20px rgba(22, 163, 74, 0.25);">
                                <div style="width:44px; height:44px; border-radius:50%; background:#22c55e; color:#fff; font-weight:900; font-size:18px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">11</div>
                                <div style="flex:1;">
                                    <div style="font-size:11px; font-weight:800; color:#86efac; text-transform:uppercase;">STEP 11. 최종 런칭 (Admin 1-Click Launch)</div>
                                    <div style="font-size:16px; font-weight:900; color:#fff; margin-top:2px;">🚀 어드민 마켓 개시 버튼 스타트 (Start Market Launch)</div>
                                    <div style="font-size:12.5px; color:#dcfce7; margin-top:4px; line-height:1.6;">
                                        어드민 백오피스(<code>admin.html</code>)에서 관리자가 <strong>[🚀 마켓 상점 일괄 개시 (START)]</strong> 버튼을 클릭하는 즉시, 
                                        웹 마켓(<code>market.html</code>)과 인게임 상점 판매가 100% 동시에 활성화되어 유저 대상 판매가 시작됩니다!
                                    </div>
                                </div>
                                <div style="background:#ffffff; color:#15803d; padding:10px 16px; border-radius:8px; font-size:12.5px; font-weight:900; white-space:nowrap;">
                                    🚀 마켓 개시 (START)
                                </div>
                            </div>

                        </div>
                    </div>

                    <!-- Pipeline Specification Table -->
                    <div class="spec-group" style="margin-top:28px;">
                        <div class="spec-label-row">
                            <div class="spec-label">11단계 운영 및 기술 세부 명세표</div>
                            <div class="section-edit-tools" style="display:none; gap:6px;">
                                <button onclick="addTableRow(this)" style="background:#e0f2fe; color:#0369a1; border:1px solid #bae6fd; padding:3px 10px; border-radius:4px; font-size:11.5px; font-weight:700; cursor:pointer;">+ 행 추가</button>
                            </div>
                        </div>
                        <table class="spec-table">
                            <thead>
                                <tr>
                                    <th style="width:150px;">운영/기술 단계</th>
                                    <th style="width:240px;">주요 세부 파라미터</th>
                                    <th>기술 명세 및 검증/운영 처리 로직</th>
                                    <th style="width:110px; text-align:center;">상태</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="field">1. 날짜 설정</td>
                                    <td><code>reg_start</code>, <code>reg_end</code>, <code>vote_start</code>, <code>vote_end</code></td>
                                    <td>어드민 백오피스에서 유저 등록 및 랭킹 선정 기간을 분 단위로 사전 세팅 관리.</td>
                                    <td style="text-align:center;"><span class="badge badge-green">✅ 확정</span></td>
                                </tr>
                                <tr>
                                    <td class="field">2. 등록 시작</td>
                                    <td>티켓 30장 발급, <code>register.html</code></td>
                                    <td>정액제/KP 결제 유저 대상 티켓 30장 발급 및 출품 페이지 연동.</td>
                                    <td style="text-align:center;"><span class="badge badge-green">✅ 확정</span></td>
                                </tr>
                                <tr>
                                    <td class="field">3. 등록 마감</td>
                                    <td>타임스탬프 차단, <code>IS_LOCKED=true</code></td>
                                    <td>종료 시점 도달 시 신규 업로드 및 기존 등록작 수정/삭제 자동 차단.</td>
                                    <td style="text-align:center;"><span class="badge badge-green">✅ 확정</span></td>
                                </tr>
                                <tr>
                                    <td class="field">4. S3 보안/유효성 검사</td>
                                    <td>S3 Event + AWS Lambda Serverless</td>
                                    <td>S3 적재 직후 Lambda가 바이트 헤더, 3D Mesh 규격, 스크립트 유해성 100% 자동 검사 (S3 가능 확인).</td>
                                    <td style="text-align:center;"><span class="badge badge-blue">✅ 기술검증완료</span></td>
                                </tr>
                                <tr>
                                    <td class="field">5. 웹 DB 수신</td>
                                    <td>MySQL / MongoDB Indexing</td>
                                    <td>검증 통과된 클린 데이터만 정제되어 웹 마켓 DB 스테이징 테이블로 자동 수신.</td>
                                    <td style="text-align:center;"><span class="badge badge-green">✅ 확정</span></td>
                                </tr>
                                <tr>
                                    <td class="field">6. 투표 노출</td>
                                    <td><code>contest_vote.html</code> 3D Grid</td>
                                    <td>선별된 숏리스트 응모작들이 투표 사이트에 3D WebGL 프리뷰 형태로 자동 노출.</td>
                                    <td style="text-align:center;"><span class="badge badge-green">✅ 확정</span></td>
                                </tr>
                                <tr>
                                    <td class="field">7. 투표 진행</td>
                                    <td>1일 1회 투표, 어뷰징/매크로 방지</td>
                                    <td>로그인 계정당 1일 1회 투표 가능. CAPTCHA 및 IP 중복 방지 로직 적용.</td>
                                    <td style="text-align:center;"><span class="badge badge-green">✅ 확정</span></td>
                                </tr>
                                <tr>
                                    <td class="field">8. 랭킹 선정</td>
                                    <td>유효 득표 1순위 ➔ 등록순 ➔ 추천순 (5개)</td>
                                    <td>유효 득표 순 상위 5개 선정. 동률 시 [등록 시점 빠른 순] ➔ [3D 추천수 순]. 계정당 1개 당첨 제한.</td>
                                    <td style="text-align:center;"><span class="badge badge-green">✅ 기준확정</span></td>
                                </tr>
                                <tr>
                                    <td class="field">9. 스튜디오 전달 & 자동 패치</td>
                                    <td><code>.grf</code> / <code>.gpf</code> 패치 자동 생성</td>
                                    <td>선정작 10개의 자산을 스튜디오 패치 빌더로 전달하여 클라이언트 패치데이터 및 마켓 상품 자동 생성.</td>
                                    <td style="text-align:center;"><span class="badge badge-green">✅ 확정</span></td>
                                </tr>
                                <tr>
                                    <td class="field">10. 최종 마켓 DB 전달</td>
                                    <td><code>STATUS_READY</code> 이관 적재</td>
                                    <td>웹 마켓 DB로 상품 객체, 가격, 유효기간, 3D 뷰어 메타데이터 전달 완료.</td>
                                    <td style="text-align:center;"><span class="badge badge-green">✅ 확정</span></td>
                                </tr>
                                <tr>
                                    <td class="field">11. 어드민 마켓 개시</td>
                                    <td><code>admin.html</code> [START] 버튼</td>
                                    <td>관리자가 스타트 버튼 클릭 시 웹 마켓(<code>market.html</code>)과 인게임 마켓 상점이 일괄 런칭.</td>
                                    <td style="text-align:center;"><span class="badge badge-green">✅ 확정</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Key Operational & Technical Considerations (별도 고려사항 섹션) -->
                    <div class="spec-group" style="margin-top:32px; background:#fffbfb; border:1.5px solid #fecaca; border-radius:14px; padding:22px 26px;">
                        <div style="font-size:16px; font-weight:900; color:#991b1b; display:flex; align-items:center; gap:8px; margin-bottom:14px;">
                            <span>💡</span> <span>핵심 기획 & 운영/기술 고려사항 명세 (당사 판단 & 제안)</span>
                        </div>

                        <div style="display:flex; flex-direction:column; gap:16px;">
                            
                            <!-- Consideration 1 -->
                            <div style="background:#ffffff; border:1px solid #fca5a5; border-radius:10px; padding:16px 20px;">
                                <div style="font-size:14px; font-weight:900; color:#7f1d1d; margin-bottom:6px;">
                                    ① 아이템 이용 기간 & 마켓 개시 유효기간 정책 (개시일 기준 사용 기간)
                                </div>
                                <div style="font-size:12.5px; color:#475569; line-height:1.7;">
                                    • <strong>개시일 기준 유효기간 세부 스펙</strong>: 어드민 [마켓 개시] 스타트 버튼 클릭일로부터 <strong>차기 시즌 개시일(3개월 후)까지 프로모션 상점 판매</strong> 진행.<br>
                                    • <strong>크리에이터(당첨 아티스트) 혜택</strong>: 당첨작 제작 유저에게는 <strong>[영구 소유 귀속 아이템] 무상 발급</strong> + 인게임 제작자 닉네임 각인 + 마켓 판매 수익 로열티 분배.<br>
                                    • <strong>마켓 구매 일반 유저 정책</strong>: <u>[당사 제안 확정]</u> 무제한 영구 소유권 상품으로 등록하여 유저 구매 욕구 극대화 (구매 후 인게임 스튜디오 인벤토리에 상시 보존).
                                </div>
                            </div>

                            <!-- Consideration 2 -->
                            <div style="background:#ffffff; border:1px solid #fca5a5; border-radius:10px; padding:16px 20px;">
                                <div style="font-size:14px; font-weight:900; color:#7f1d1d; margin-bottom:6px;">
                                    ② S3 자동 검증 타임아웃 & 예외 처리 리트라이 (Retry Queue)
                                </div>
                                <div style="font-size:12.5px; color:#475569; line-height:1.7;">
                                    • <strong>검수 실패/타임아웃 처리</strong>: S3 업로드 후 AI Worker 검증 중 대용량 3D 메시 혹은 트래픽 몰림으로 타임아웃 발생 시 <strong>RETRY_QUEUE에 배치하여 최대 3회 재검수 자동 시도</strong>.<br>
                                    • <strong>3회 연속 실패 시 대응</strong>: 유해성/위반 의심 패킷으로 분류하여 어드민 수동 검수 대기열(<code>STATUS_NEED_MANUAL_REVIEW</code>)로 자동 전환하여 안전성 확보.
                                </div>
                            </div>

                            <!-- Consideration 3 -->
                            <div style="background:#ffffff; border:1px solid #fca5a5; border-radius:10px; padding:16px 20px;">
                                <div style="font-size:14px; font-weight:900; color:#7f1d1d; margin-bottom:6px;">
                                    ③ 스튜디오 패치 빌드 & 정기점검 핫패치 타임존 연동
                                </div>
                                <div style="font-size:12.5px; color:#475569; line-height:1.7;">
                                    • <strong>자동 패치 생성 시점</strong>: 정기점검 당일 점검 시작 2시간 전 <code>.grf</code> / <code>.gpf</code> 리소스 패치 파일 자동 컴파일 완료.<br>
                                    • <strong>CDN 동기화</strong>: 패치 데이터 빌드 완료 즉시 RO 패처 CDN 스테이징 서버로 자동 동기화되어, 정기점검 오픈 시점에 유저 클라이언트에 오차 없이 배포.
                                </div>
                            </div>

                            <!-- Consideration 4 -->
                            <div style="background:#ffffff; border:1px solid #fca5a5; border-radius:10px; padding:16px 20px;">
                                <div style="font-size:14px; font-weight:900; color:#7f1d1d; margin-bottom:6px;">
                                    ④ 어드민 1-Click 스타트 안전장치 (Accidental Click Protection)
                                </div>
                                <div style="font-size:12.5px; color:#475569; line-height:1.7;">
                                    • <strong>실수 클릭 방지 모달</strong>: 관리자가 [🚀 마켓 개시] 버튼 클릭 시 <strong>"선정작 10개 작품 및 인게임 패치가 즉시 상점에 공개됩니다. 실행하시겠습니까?" 2차 확인 모달 팝업</strong> 필수 적용.<br>
                                    • <strong>10초 롤백 카운트다운</strong>: 개시 클릭 후 10초간 취소(Rollback)할 수 있는 대기 타임아웃 제공.
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>`;

// Replace Section 5 in contest_policy.html
const sec5Start = html.indexOf('<!-- ===================== SECTION 5 ===================== -->');
if (sec5Start !== -1) {
    const mainEnd = html.indexOf('</div>\n    </div>', sec5Start);
    if (mainEnd !== -1) {
        html = html.substring(0, sec5Start) + newSection5 + '\n\n        ' + html.substring(mainEnd);
    }
}

fs.writeFileSync(targetPath, html, 'utf8');
console.log('Successfully updated Section 5 with 11-step pipeline and considerations!');

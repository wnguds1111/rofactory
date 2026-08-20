const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'contest_policy.html');
let html = fs.readFileSync(targetPath, 'utf8');

// Replace Section 5 with high-end Road/Milestone Infographic Diagram matching user's reference image
const updatedSection5 = `<!-- ===================== SECTION 5 ===================== -->
            <div class="page-section" id="sec-automation">
                <div class="page-header">
                    <div class="page-icon" style="background:#faf5ff; color:#9333ea;">5</div>
                    <h3>5. 공모전 운영 11단계 인포그래픽 로드맵 & 프로세스 플로우차트</h3>
                    <div class="section-edit-tools" style="display:none; margin-left:auto; gap:6px;">
                        <button onclick="addTableRow(this)" style="background:#e0f2fe; color:#0369a1; border:1px solid #bae6fd; padding:3px 10px; border-radius:4px; font-size:11.5px; font-weight:700; cursor:pointer;">+ 행 추가</button>
                    </div>
                    <span class="page-tag" style="margin-left:10px; background:#f3e8ff; color:#7e22ce;">Infographic Roadmap & Step Considerations</span>
                </div>
                <div class="page-body">

                    <div class="alert-box alert-info" style="margin-bottom:24px; background:#faf5ff; border-color:#d8b4fe; color:#581c87;">
                        <span class="alert-icon">⚡</span>
                        <div>
                            <strong>RO Factory 공모전 운영 11단계 E2E 로드맵 파이프라인</strong><br>
                            참고 인포그래픽 스타일을 적용하여 <strong>도로/트랙 경로 연출, 핀 마일스톤, 4대 페이즈 카드 및 STEP별 하단 고려사항</strong>을 통합 배치한 명세서입니다.
                        </div>
                    </div>

                    <!-- ================= INFOGRAPHIC ROADMAP PIPELINE CONTAINER ================= -->
                    <div style="background: linear-gradient(135deg, #fbfbfe 0%, #f5f3ff 50%, #f0fdf4 100%); border:2px solid #c084fc; border-radius:24px; padding:32px; box-shadow:0 12px 32px rgba(147, 51, 234, 0.08); position:relative; overflow:hidden;">
                        
                        <!-- Top Road Line Decoration -->
                        <div style="position:absolute; top:0; left:0; right:0; height:8px; background:linear-gradient(90deg, #9333ea, #3b82f6, #10b981);"></div>

                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; border-bottom:2px dashed #cbd5e1; padding-bottom:16px;">
                            <div>
                                <div style="font-size:11px; font-weight:800; color:#9333ea; text-transform:uppercase; letter-spacing:1px;">RO FACTORY CONTEST PIPELINE</div>
                                <div style="font-size:18px; font-weight:900; color:#0f172a; margin-top:2px;">시즌제 콘테스트 11단계 진행 인포그래픽 로드맵</div>
                            </div>
                            <div style="background:#ffffff; border:1.5px solid #a855f7; color:#7e22ce; padding:6px 16px; border-radius:20px; font-size:12px; font-weight:800; box-shadow:0 2px 8px rgba(168, 85, 247, 0.15);">
                                4-Phase Roadmap
                            </div>
                        </div>

                        <!-- ROADMAP STAGE CARDS GRID -->
                        <div style="display:flex; flex-direction:column; gap:24px; position:relative;">
                            
                            <!-- PHASE 1: 준비 & 접수 -->
                            <div style="background:#ffffff; border:1.5px solid #e9d5ff; border-radius:20px; padding:24px; box-shadow:0 6px 20px rgba(168, 85, 247, 0.06); position:relative;">
                                <div style="position:absolute; top:-14px; left:24px; background:#9333ea; color:#fff; padding:4px 14px; border-radius:14px; font-size:11.5px; font-weight:800; letter-spacing:0.5px;">
                                    PHASE 01. 준비 및 유저 작품 접수 (Step 01 ~ Step 03)
                                </div>

                                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin-top:10px;">
                                    
                                    <!-- Step 1 Card -->
                                    <div style="background:#faf5ff; border:1px solid #f0abfc; border-radius:14px; padding:18px; display:flex; flex-direction:column; justify-content:space-between;">
                                        <div>
                                            <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
                                                <div style="width:24px; height:24px; border-radius:50%; background:#9333ea; color:#fff; font-size:11px; font-weight:900; display:flex; align-items:center; justify-content:center;">1</div>
                                                <div style="font-size:13.5px; font-weight:900; color:#581c87;">STEP 01. 일정 세팅</div>
                                            </div>
                                            <div style="font-size:12.5px; color:#475569; line-height:1.5;">
                                                어드민 백오피스(<code>admin.html</code>)에서 유저 접수일 및 랭킹 투표 기간을 분 단위로 사전 세팅합니다.
                                            </div>
                                        </div>
                                        <!-- Consideration -->
                                        <div style="margin-top:12px; background:#ffffff; border-left:3px solid #9333ea; padding:8px 12px; border-radius:0 6px 6px 0; font-size:11.5px; color:#6b21a8; line-height:1.5;">
                                            <strong>고려사항</strong>: 런칭 1회차 예외 적용(유저 작품 수 확보 위해 접수 2.5개월 확장).
                                        </div>
                                    </div>

                                    <!-- Step 2 Card -->
                                    <div style="background:#faf5ff; border:1px solid #f0abfc; border-radius:14px; padding:18px; display:flex; flex-direction:column; justify-content:space-between;">
                                        <div>
                                            <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
                                                <div style="width:24px; height:24px; border-radius:50%; background:#9333ea; color:#fff; font-size:11px; font-weight:900; display:flex; align-items:center; justify-content:center;">2</div>
                                                <div style="font-size:13.5px; font-weight:900; color:#581c87;">STEP 02. 접수 개시</div>
                                            </div>
                                            <div style="font-size:12.5px; color:#475569; line-height:1.5;">
                                                이벤트 오픈 및 결제 유저 대상 출품 티켓(30회 캡) 지급, <code>register.html</code> 접수 활성화.
                                            </div>
                                        </div>
                                        <!-- Consideration -->
                                        <div style="margin-top:12px; background:#ffffff; border-left:3px solid #9333ea; padding:8px 12px; border-radius:0 6px 6px 0; font-size:11.5px; color:#6b21a8; line-height:1.5;">
                                            <strong>고려사항</strong>: 삭제 시 티켓 미재발급 경고 문구 및 아티스트 닉네임 1회 필수 입력.
                                        </div>
                                    </div>

                                    <!-- Step 3 Card -->
                                    <div style="background:#faf5ff; border:1px solid #f0abfc; border-radius:14px; padding:18px; display:flex; flex-direction:column; justify-content:space-between;">
                                        <div>
                                            <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
                                                <div style="width:24px; height:24px; border-radius:50%; background:#9333ea; color:#fff; font-size:11px; font-weight:900; display:flex; align-items:center; justify-content:center;">3</div>
                                                <div style="font-size:13.5px; font-weight:900; color:#581c87;">STEP 03. 접수 마감</div>
                                            </div>
                                            <div style="font-size:12.5px; color:#475569; line-height:1.5;">
                                                종료 일시 도달 시 서버 타임스탬프 기반으로 신규 등록 및 수정/삭제가 자동 차단됩니다.
                                            </div>
                                        </div>
                                        <!-- Consideration -->
                                        <div style="margin-top:12px; background:#ffffff; border-left:3px solid #9333ea; padding:8px 12px; border-radius:0 6px 6px 0; font-size:11.5px; color:#6b21a8; line-height:1.5;">
                                            <strong>고려사항</strong>: 서버 타임스탬프 락(<code>IS_LOCKED=true</code>) 및 서버 시간 동기화(NTP).
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <!-- Connector Arrow -->
                            <div style="text-align:center; color:#c084fc; font-size:20px; font-weight:900; margin:-12px 0;">⬇️</div>

                            <!-- PHASE 2: S3 검증 & DB 수신 -->
                            <div style="background:#ffffff; border:1.5px solid #bbf7d0; border-radius:20px; padding:24px; box-shadow:0 6px 20px rgba(16, 185, 129, 0.06); position:relative;">
                                <div style="position:absolute; top:-14px; left:24px; background:#059669; color:#fff; padding:4px 14px; border-radius:14px; font-size:11.5px; font-weight:800; letter-spacing:0.5px;">
                                    PHASE 02. S3 자동 검증 및 웹 DB 수신 (Step 04 ~ Step 05)
                                </div>

                                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap:16px; margin-top:10px;">
                                    
                                    <!-- Step 4 Card -->
                                    <div style="background:#f0fdf4; border:1px solid #86efac; border-radius:14px; padding:18px; display:flex; flex-direction:column; justify-content:space-between;">
                                        <div>
                                            <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
                                                <div style="width:24px; height:24px; border-radius:50%; background:#059669; color:#fff; font-size:11px; font-weight:900; display:flex; align-items:center; justify-content:center;">4</div>
                                                <div style="font-size:13.5px; font-weight:900; color:#064e3b;">STEP 04. 보안 및 자동 검증 (S3)</div>
                                            </div>
                                            <div style="font-size:12.5px; color:#475569; line-height:1.5;">
                                                AWS S3 Event + Lambda 연동으로 바이트 헤더 보안, 3D 메시 규격/용량, 유해성 100% 자동 검증.
                                            </div>
                                        </div>
                                        <!-- Consideration -->
                                        <div style="margin-top:12px; background:#ffffff; border-left:3px solid #059669; padding:8px 12px; border-radius:0 6px 6px 0; font-size:11.5px; color:#047857; line-height:1.5;">
                                            <strong>고려사항</strong>: 타임아웃 시 Retry Queue 최대 3회 재검수, 3회 실패 건 수동 검수 대기열 전환.
                                        </div>
                                    </div>

                                    <!-- Step 5 Card (HIGHLIGHTED) -->
                                    <div style="background:#ecfdf5; border:2px solid #10b981; border-radius:14px; padding:18px; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 4px 14px rgba(16, 185, 129, 0.15);">
                                        <div>
                                            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
                                                <div style="display:flex; align-items:center; gap:8px;">
                                                    <div style="width:24px; height:24px; border-radius:50%; background:#047857; color:#fff; font-size:11px; font-weight:900; display:flex; align-items:center; justify-content:center;">5</div>
                                                    <div style="font-size:14px; font-weight:900; color:#064e3b;">STEP 05. DB 자동 수신 (Web DB Sync)</div>
                                                </div>
                                                <span style="background:#059669; color:#fff; padding:2px 8px; border-radius:6px; font-size:10.5px; font-weight:800;">핵심 수신</span>
                                            </div>
                                            <div style="font-size:12.5px; color:#047857; line-height:1.5;">
                                                S3 검증 통과 데이터만 SQS 큐를 거쳐 웹 DB 테이블 저장 및 3D WebGL 프리뷰 생성, <code>STATUS_VOTING_READY</code> 변환.
                                            </div>
                                        </div>
                                        <!-- Consideration -->
                                        <div style="margin-top:12px; background:#ffffff; border-left:3px solid #047857; padding:8px 12px; border-radius:0 6px 6px 0; font-size:11.5px; color:#064e3b; line-height:1.5;">
                                            <strong>고려사항</strong>:
                                            <br>• 개시일 시점 유효기간 파라미터(<code>EFFECTIVE_START_DATE</code>) 및 무제한 영구 소유권 세팅.
                                            <br>• SQS 실시간 연동 + 매시간 배치 듀얼 체크, MD5 해시 기반 중복 등록 차단.
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <!-- Connector Arrow -->
                            <div style="text-align:center; color:#4ade80; font-size:20px; font-weight:900; margin:-12px 0;">⬇️</div>

                            <!-- PHASE 3: 심사 & 투표 랭킹 -->
                            <div style="background:#ffffff; border:1.5px solid #bfdbfe; border-radius:20px; padding:24px; box-shadow:0 6px 20px rgba(59, 130, 246, 0.06); position:relative;">
                                <div style="position:absolute; top:-14px; left:24px; background:#2563eb; color:#fff; padding:4px 14px; border-radius:14px; font-size:11.5px; font-weight:800; letter-spacing:0.5px;">
                                    PHASE 03. 유저 심사 투표 및 랭킹 선정 (Step 06 ~ Step 08)
                                </div>

                                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin-top:10px;">
                                    
                                    <!-- Step 6 Card -->
                                    <div style="background:#eff6ff; border:1px solid #93c5fd; border-radius:14px; padding:18px; display:flex; flex-direction:column; justify-content:space-between;">
                                        <div>
                                            <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
                                                <div style="width:24px; height:24px; border-radius:50%; background:#2563eb; color:#fff; font-size:11px; font-weight:900; display:flex; align-items:center; justify-content:center;">6</div>
                                                <div style="font-size:13.5px; font-weight:900; color:#1e3a8a;">STEP 06. 투표 노출</div>
                                            </div>
                                            <div style="font-size:12.5px; color:#475569; line-height:1.5;">
                                                검증 완료된 응모작들이 전용 인기 투표 사이트(<code>contest_vote.html</code>)의 3D WebGL 그리드로 노출.
                                            </div>
                                        </div>
                                        <!-- Consideration -->
                                        <div style="margin-top:12px; background:#ffffff; border-left:3px solid #2563eb; padding:8px 12px; border-radius:0 6px 6px 0; font-size:11.5px; color:#1e40af; line-height:1.5;">
                                            <strong>고려사항</strong>: 반응형 3D 실시간 뷰어 최적화 및 이메일 노출 방지(닉네임 표기).
                                        </div>
                                    </div>

                                    <!-- Step 7 Card -->
                                    <div style="background:#eff6ff; border:1px solid #93c5fd; border-radius:14px; padding:18px; display:flex; flex-direction:column; justify-content:space-between;">
                                        <div>
                                            <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
                                                <div style="width:24px; height:24px; border-radius:50%; background:#2563eb; color:#fff; font-size:11px; font-weight:900; display:flex; align-items:center; justify-content:center;">7</div>
                                                <div style="font-size:13.5px; font-weight:900; color:#1e3a8a;">STEP 07. 유저 투표</div>
                                            </div>
                                            <div style="font-size:12.5px; color:#475569; line-height:1.5;">
                                                로그인 유저 대상 계정당 1일 1회 인기 투표를 진행하며 CAPTCHA 로직 적용.
                                            </div>
                                        </div>
                                        <!-- Consideration -->
                                        <div style="margin-top:12px; background:#ffffff; border-left:3px solid #2563eb; padding:8px 12px; border-radius:0 6px 6px 0; font-size:11.5px; color:#1e40af; line-height:1.5;">
                                            <strong>고려사항</strong>: 계정당 1일 1회 제한, CAPTCHA 및 동일 IP 다계정 부당 득표 차단.
                                        </div>
                                    </div>

                                    <!-- Step 8 Card -->
                                    <div style="background:#eff6ff; border:1px solid #93c5fd; border-radius:14px; padding:18px; display:flex; flex-direction:column; justify-content:space-between;">
                                        <div>
                                            <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
                                                <div style="width:24px; height:24px; border-radius:50%; background:#2563eb; color:#fff; font-size:11px; font-weight:900; display:flex; align-items:center; justify-content:center;">8</div>
                                                <div style="font-size:13.5px; font-weight:900; color:#1e3a8a;">STEP 08. 랭킹 선정</div>
                                            </div>
                                            <div style="font-size:12.5px; color:#475569; line-height:1.5;">
                                                유저 투표 5개 + GM 심사 5개를 조합하여 총 10개 당첨작을 최종 확정합니다.
                                            </div>
                                        </div>
                                        <!-- Consideration -->
                                        <div style="margin-top:12px; background:#ffffff; border-left:3px solid #2563eb; padding:8px 12px; border-radius:0 6px 6px 0; font-size:11.5px; color:#1e40af; line-height:1.5;">
                                            <strong>고려사항</strong>: 계정당 1개 당첨 제한, 동률 시 [1순위: 등록일 빠른 순 ➔ 2순위: 추천수 순].
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <!-- Connector Arrow -->
                            <div style="text-align:center; color:#60a5fa; font-size:20px; font-weight:900; margin:-12px 0;">⬇️</div>

                            <!-- PHASE 4: 패치 빌드 & 최종 개시 -->
                            <div style="background:#ffffff; border:1.5px solid #cbd5e1; border-radius:20px; padding:24px; box-shadow:0 6px 20px rgba(15, 23, 42, 0.06); position:relative;">
                                <div style="position:absolute; top:-14px; left:24px; background:#0f172a; color:#fff; padding:4px 14px; border-radius:14px; font-size:11.5px; font-weight:800; letter-spacing:0.5px;">
                                    PHASE 04. 자동 패치 빌드 및 마켓 개시 (Step 09 ~ Step 11)
                                </div>

                                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin-top:10px;">
                                    
                                    <!-- Step 9 Card -->
                                    <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:14px; padding:18px; display:flex; flex-direction:column; justify-content:space-between;">
                                        <div>
                                            <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
                                                <div style="width:24px; height:24px; border-radius:50%; background:#0f172a; color:#fff; font-size:11px; font-weight:900; display:flex; align-items:center; justify-content:center;">9</div>
                                                <div style="font-size:13.5px; font-weight:900; color:#0f172a;">STEP 09. 패치 자동 생성</div>
                                            </div>
                                            <div style="font-size:12.5px; color:#475569; line-height:1.5;">
                                                스튜디오 패치 빌더로 전달하여 리소스 패치(<code>.grf</code>/<code>.gpf</code>) 및 마켓 상점 상품 자동 생성.
                                            </div>
                                        </div>
                                        <!-- Consideration -->
                                        <div style="margin-top:12px; background:#ffffff; border-left:3px solid #0f172a; padding:8px 12px; border-radius:0 6px 6px 0; font-size:11.5px; color:#334155; line-height:1.5;">
                                            <strong>고려사항</strong>: 정기점검 2시간 전 패치 자동 컴파일 완료 및 CDN 동기화.
                                        </div>
                                    </div>

                                    <!-- Step 10 Card -->
                                    <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:14px; padding:18px; display:flex; flex-direction:column; justify-content:space-between;">
                                        <div>
                                            <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
                                                <div style="width:24px; height:24px; border-radius:50%; background:#0f172a; color:#fff; font-size:11px; font-weight:900; display:flex; align-items:center; justify-content:center;">10</div>
                                                <div style="font-size:13.5px; font-weight:900; color:#0f172a;">STEP 10. 마켓 DB 전달</div>
                                            </div>
                                            <div style="font-size:12.5px; color:#475569; line-height:1.5;">
                                                상품 객체, 가격, 유효기간, 3D 메타데이터를 웹 마켓 DB로 전달하여 개시 대기(<code>STATUS_READY</code>) 설정.
                                            </div>
                                        </div>
                                        <!-- Consideration -->
                                        <div style="margin-top:12px; background:#ffffff; border-left:3px solid #0f172a; padding:8px 12px; border-radius:0 6px 6px 0; font-size:11.5px; color:#334155; line-height:1.5;">
                                            <strong>고려사항</strong>: 당첨 크리에이터 영구 소유권 + 마켓 일반 유저용 무제한 영구 소유권 세팅.
                                        </div>
                                    </div>

                                    <!-- Step 11 Card (HIGHLIGHTED LAUNCH) -->
                                    <div style="background:linear-gradient(135deg, #0f172a, #16a34a); border:2px solid #22c55e; border-radius:14px; padding:18px; color:#fff; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 6px 20px rgba(34, 197, 94, 0.2);">
                                        <div>
                                            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
                                                <div style="display:flex; align-items:center; gap:8px;">
                                                    <div style="width:24px; height:24px; border-radius:50%; background:#22c55e; color:#fff; font-size:11px; font-weight:900; display:flex; align-items:center; justify-content:center;">11</div>
                                                    <div style="font-size:14px; font-weight:900; color:#ffffff;">STEP 11. 마켓 개시 (Launch)</div>
                                                </div>
                                                <span style="background:#ffffff; color:#15803d; padding:2px 8px; border-radius:6px; font-size:10.5px; font-weight:900;">START</span>
                                            </div>
                                            <div style="font-size:12.5px; color:#dcfce7; line-height:1.5;">
                                                관리자가 [마켓 개시] 버튼 클릭 즉시 웹 마켓과 인게임 상점 100% 동시 개시!
                                            </div>
                                        </div>
                                        <!-- Consideration -->
                                        <div style="margin-top:12px; background:rgba(255,255,255,0.1); border-left:3px solid #22c55e; padding:8px 12px; border-radius:0 6px 6px 0; font-size:11.5px; color:#f0fdf4; line-height:1.5;">
                                            <strong>고려사항</strong>: 실수 클릭 방지 2차 확인 모달 팝업 및 10초 롤백 타임아웃.
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>

                    <!-- Mermaid Flowchart Reference Diagram Block -->
                    <div class="spec-group" style="margin-top:28px; background:#ffffff; border:1px solid #e2e8f0; border-radius:16px; padding:24px 28px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">
                            <div style="font-size:15px; font-weight:900; color:#0f172a;">
                                보조 데이터 시스템 플로우차트 (시스템 연동용)
                            </div>
                            <span style="background:#f1f5f9; color:#475569; padding:4px 12px; border-radius:12px; font-size:11px; font-weight:800;">System Diagram</span>
                        </div>

                        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:20px; overflow-x:auto;" class="mermaid-container">
                            <pre class="mermaid" style="display:flex; justify-content:center;">
flowchart TD
    subgraph Phase1 [1. 접수 준비 단계]
        S1[STEP 01. 일정 사전 세팅<br/>어드민 날짜 세팅] --> S2[STEP 02. 발자국 접수 개시<br/>이벤트 오픈 및 출품]
        S2 --> S3[STEP 03. 발자국 접수 마감<br/>서버 타임스탬프 자동 차단]
    end

    subgraph Phase2 [2. 데이터 검증 및 DB 연동 단계]
        S3 --> S4[STEP 04. S3 자동 보안 검사<br/>Lambda 헤더 및 3D 규격 검증]
        S4 --> S5[STEP 05. 웹 DB 자동 수신<br/>정제 데이터 저장 및 3D 인덱싱]
    end

    subgraph Phase3 [3. 심사 및 투표 랭킹 단계]
        S5 --> S6[STEP 06. 투표 페이지 노출<br/>3D WebGL 그리드 자동 배치]
        S6 --> S7[STEP 07. 유저 인기 투표 진행<br/>1일 1회 계정당 투표]
        S7 --> S8[STEP 08. 최종 랭킹 선정<br/>GM 5개 + 유저 5개 당첨]
    end

    subgraph Phase4 [4. 패치 제작 및 최종 개시 단계]
        S8 --> S9[STEP 09. 패치 자동 생성<br/>클라이언트 패치 및 상점 생성]
        S9 --> S10[STEP 10. 마켓 DB 전달<br/>상점 객체 런칭 대기]
        S10 --> S11[STEP 11. 어드민 마켓 개시<br/>1-Click 개시 버튼 클릭]
    end

    style Phase1 fill:#f8fafc,stroke:#e2e8f0,stroke-width:1px
    style Phase2 fill:#f8fafc,stroke:#e2e8f0,stroke-width:1px
    style Phase3 fill:#f8fafc,stroke:#e2e8f0,stroke-width:1px
    style Phase4 fill:#f8fafc,stroke:#e2e8f0,stroke-width:1px

    style S1 fill:#ffffff,stroke:#cbd5e1,stroke-width:1.5px
    style S2 fill:#ffffff,stroke:#cbd5e1,stroke-width:1.5px
    style S3 fill:#ffffff,stroke:#cbd5e1,stroke-width:1.5px
    style S4 fill:#ffffff,stroke:#cbd5e1,stroke-width:1.5px
    style S5 fill:#ecfdf5,stroke:#10b981,stroke-width:2px
    style S6 fill:#ffffff,stroke:#cbd5e1,stroke-width:1.5px
    style S7 fill:#ffffff,stroke:#cbd5e1,stroke-width:1.5px
    style S8 fill:#ffffff,stroke:#cbd5e1,stroke-width:1.5px
    style S9 fill:#ffffff,stroke:#cbd5e1,stroke-width:1.5px
    style S10 fill:#ffffff,stroke:#cbd5e1,stroke-width:1.5px
    style S11 fill:#0f172a,stroke:#22c55e,color:#ffffff,stroke-width:2px
                            </pre>
                        </div>
                    </div>

                </div>
            </div>`;

// Replace Section 5 in contest_policy.html
const startMarker = '<!-- ===================== SECTION 5 ===================== -->';

const startIndex = html.indexOf(startMarker);

if (startIndex !== -1) {
    const beforeSec5 = html.substring(0, startIndex);
    const afterSec5 = html.substring(html.indexOf('</div>\n            </div>\n\n        </div>', startIndex));
    html = beforeSec5 + updatedSection5 + afterSec5;
    
    fs.writeFileSync(targetPath, html, 'utf8');
    console.log('Successfully updated contest_policy.html Section 5 with road infographic!');
} else {
    console.error('SECTION 5 marker not found');
}

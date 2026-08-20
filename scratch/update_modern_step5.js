const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'contest_policy.html');
let html = fs.readFileSync(targetPath, 'utf8');

// Modern, unified color scheme & step-by-step considerations inside each step
const updatedSection5 = `<!-- ===================== SECTION 5 ===================== -->
            <div class="page-section" id="sec-automation">
                <div class="page-header">
                    <div class="page-icon" style="background:#f1f5f9; color:#0f172a;">5</div>
                    <h3>5. 공모전 운영 11단계 프로세스 플로우차트 및 단계별 고려사항</h3>
                    <div class="section-edit-tools" style="display:none; margin-left:auto; gap:6px;">
                        <button onclick="addTableRow(this)" style="background:#e0f2fe; color:#0369a1; border:1px solid #bae6fd; padding:3px 10px; border-radius:4px; font-size:11.5px; font-weight:700; cursor:pointer;">+ 행 추가</button>
                    </div>
                    <span class="page-tag" style="margin-left:10px; background:#f1f5f9; color:#334155;">11-Step Process & Inline Considerations</span>
                </div>
                <div class="page-body">

                    <div class="alert-box alert-info" style="margin-bottom:24px; background:#f8fafc; border-color:#cbd5e1; color:#1e293b;">
                        <span class="alert-icon">💡</span>
                        <div>
                            <strong>RO Factory 공모전 운영 11단계 통합 명세</strong><br>
                            체계화된 모던 스타일의 프로세스 플로우차트와 함께 <strong>각 STEP별 주요 기획/운영/기술 고려사항</strong>을 단계 하단에 통합하여 직관성을 높였습니다.
                        </div>
                    </div>

                    <!-- Modern Flowchart Visual Diagram Container -->
                    <div class="spec-group" style="background:#ffffff; border:1px solid #e2e8f0; border-radius:16px; padding:24px 28px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">
                            <div style="font-size:15px; font-weight:900; color:#0f172a;">
                                공모전 전체 11단계 모던 플로우차트
                            </div>
                            <span style="background:#0f172a; color:#fff; padding:4px 12px; border-radius:12px; font-size:11px; font-weight:800;">4-Phase Architecture</span>
                        </div>

                        <!-- Mermaid Rendering Block -->
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

                    <!-- Unified Color Palette Step Cards (Step 1~11) with Step-by-Step Inline Considerations -->
                    <div class="spec-group" style="margin-top:28px;">
                        <div class="spec-label-row">
                            <div class="spec-label">단계별 프로세스 및 STEP별 주요 고려사항 (1단계 ~ 11단계)</div>
                        </div>

                        <div style="display:flex; flex-direction:column; gap:16px; margin-top:16px;">
                            
                            <!-- STEP 1 -->
                            <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:20px; box-shadow:0 2px 6px rgba(0,0,0,0.02);">
                                <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
                                    <div style="display:flex; align-items:center; gap:10px;">
                                        <div style="width:28px; height:28px; border-radius:50%; background:#0f172a; color:#fff; font-weight:800; font-size:12px; display:flex; align-items:center; justify-content:center;">1</div>
                                        <div style="font-size:14.5px; font-weight:900; color:#0f172a;">STEP 01. 일정 세팅 (Date Setup)</div>
                                    </div>
                                    <span style="background:#f1f5f9; color:#475569; padding:3px 10px; border-radius:6px; font-size:11px; font-weight:700;">어드민 세팅</span>
                                </div>
                                <div style="font-size:13px; color:#334155; line-height:1.6; margin-left:38px;">
                                    어드민 백오피스(<code>admin.html</code>)에서 ① 유저 발자국 등록 시작/종료일 및 ② 랭킹 선정(투표) 시작/종료일을 회차별 사전 세팅 관리합니다.
                                </div>
                                <!-- Consideration Box -->
                                <div style="margin-top:10px; margin-left:38px; background:#f8fafc; border-left:3px solid #64748b; padding:10px 14px; border-radius:0 6px 6px 0; font-size:12px; color:#475569; line-height:1.6;">
                                    <strong>단계별 고려사항</strong>: 분 단위 파라미터 연동 지원하며, 런칭 1st 사이클은 유저 작품 수량 확보를 위해 접수 기간을 예외적으로 2.5개월 확장 세팅합니다.
                                </div>
                            </div>

                            <!-- STEP 2 -->
                            <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:20px; box-shadow:0 2px 6px rgba(0,0,0,0.02);">
                                <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
                                    <div style="display:flex; align-items:center; gap:10px;">
                                        <div style="width:28px; height:28px; border-radius:50%; background:#0f172a; color:#fff; font-weight:800; font-size:12px; display:flex; align-items:center; justify-content:center;">2</div>
                                        <div style="font-size:14.5px; font-weight:900; color:#0f172a;">STEP 02. 접수 개시 (Submission Open)</div>
                                    </div>
                                    <span style="background:#f1f5f9; color:#475569; padding:3px 10px; border-radius:6px; font-size:11px; font-weight:700;">유저 접수</span>
                                </div>
                                <div style="font-size:13px; color:#334155; line-height:1.6; margin-left:38px;">
                                    이벤트 랜딩 페이지가 오픈되고 결제 유저 대상 티켓(30회 캡) 지급 및 <code>register.html</code> 작품 출품이 활성화됩니다.
                                </div>
                                <!-- Consideration Box -->
                                <div style="margin-top:10px; margin-left:38px; background:#f8fafc; border-left:3px solid #64748b; padding:10px 14px; border-radius:0 6px 6px 0; font-size:12px; color:#475569; line-height:1.6;">
                                    <strong>단계별 고려사항</strong>: 무성의한 스팸 업로드 방지를 위해 회차당 30회 제출 캡 설정. 제출작 삭제 시 티켓 미재발급 경고 문구를 명시하고, 개인정보 보호를 위한 아티스트 닉네임 1회 필수 입력 절차를 적용합니다.
                                </div>
                            </div>

                            <!-- STEP 3 -->
                            <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:20px; box-shadow:0 2px 6px rgba(0,0,0,0.02);">
                                <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
                                    <div style="display:flex; align-items:center; gap:10px;">
                                        <div style="width:28px; height:28px; border-radius:50%; background:#0f172a; color:#fff; font-weight:800; font-size:12px; display:flex; align-items:center; justify-content:center;">3</div>
                                        <div style="font-size:14.5px; font-weight:900; color:#0f172a;">STEP 03. 접수 마감 (Submission Deadline)</div>
                                    </div>
                                    <span style="background:#f1f5f9; color:#475569; padding:3px 10px; border-radius:6px; font-size:11px; font-weight:700;">자동 차단</span>
                                </div>
                                <div style="font-size:13px; color:#334155; line-height:1.6; margin-left:38px;">
                                    등록 종료 일시 도달 시 서버 타임스탬프 기반으로 신규 등록 및 수정/삭제가 자동 차단되며 수집작이 Lock 처리됩니다.
                                </div>
                                <!-- Consideration Box -->
                                <div style="margin-top:10px; margin-left:38px; background:#f8fafc; border-left:3px solid #64748b; padding:10px 14px; border-radius:0 6px 6px 0; font-size:12px; color:#475569; line-height:1.6;">
                                    <strong>단계별 고려사항</strong>: 서버 타임스탬프 락(<code>IS_LOCKED=true</code>) 처리하며, 마감 직전 대량 업로드 시 분산 트랜잭션 지연을 방지하기 위한 서버 시간 동기화(NTP)를 적용합니다.
                                </div>
                            </div>

                            <!-- STEP 4 -->
                            <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:20px; box-shadow:0 2px 6px rgba(0,0,0,0.02);">
                                <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
                                    <div style="display:flex; align-items:center; gap:10px;">
                                        <div style="width:28px; height:28px; border-radius:50%; background:#0f172a; color:#fff; font-weight:800; font-size:12px; display:flex; align-items:center; justify-content:center;">4</div>
                                        <div style="font-size:14.5px; font-weight:900; color:#0f172a;">STEP 04. 보안 및 자동 검증 (S3 Verification)</div>
                                    </div>
                                    <span style="background:#f1f5f9; color:#475569; padding:3px 10px; border-radius:6px; font-size:11px; font-weight:700;">S3 + Lambda</span>
                                </div>
                                <div style="font-size:13px; color:#334155; line-height:1.6; margin-left:38px;">
                                    AWS S3 Event Notification + Lambda 연동으로 바이트 헤더 보안, 3D 메시 규격/용량 검사, NSFW 및 악성 스크립트를 100% 자동 검증합니다.
                                </div>
                                <!-- Consideration Box -->
                                <div style="margin-top:10px; margin-left:38px; background:#f8fafc; border-left:3px solid #64748b; padding:10px 14px; border-radius:0 6px 6px 0; font-size:12px; color:#475569; line-height:1.6;">
                                    <strong>단계별 고려사항</strong>: 대용량 3D 메시 타임아웃 발생 시 Retry Queue에서 최대 3회 재검수를 시도하며, 3회 연동 실패 건은 수동 검수 대기열(<code>STATUS_NEED_MANUAL_REVIEW</code>)로 전환합니다.
                                </div>
                            </div>

                            <!-- STEP 5 HIGHLIGHTED CARD -->
                            <div style="background:#ffffff; border:1.5px solid #10b981; border-radius:12px; padding:20px; box-shadow:0 4px 12px rgba(16, 185, 129, 0.08);">
                                <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
                                    <div style="display:flex; align-items:center; gap:10px;">
                                        <div style="width:28px; height:28px; border-radius:50%; background:#059669; color:#fff; font-weight:800; font-size:12px; display:flex; align-items:center; justify-content:center;">5</div>
                                        <div style="font-size:14.5px; font-weight:900; color:#065f46;">STEP 05. DB 자동 수신 및 정제 (Web DB Sync)</div>
                                    </div>
                                    <span style="background:#dcfce7; color:#15803d; padding:3px 10px; border-radius:6px; font-size:11px; font-weight:700;">웹 DB 수신</span>
                                </div>
                                <div style="font-size:13px; color:#047857; line-height:1.6; margin-left:38px;">
                                    S3 검증 통과 데이터(<code>APPROVED</code>)만 SQS 메시지 큐를 거쳐 웹 DB 스테이징 및 프로덕션 테이블로 수신되며 3D WebGL 실시간 프리뷰 경로 생성 및 상태값(<code>VOTING_READY</code>)으로 변환됩니다.
                                </div>
                                <!-- Consideration Box -->
                                <div style="margin-top:10px; margin-left:38px; background:#ecfdf5; border-left:3px solid #10b981; padding:10px 14px; border-radius:0 6px 6px 0; font-size:12px; color:#065f46; line-height:1.6;">
                                    <strong>단계별 고려사항</strong>:
                                    <br>• <strong>개시일 기준 사용 기간 세팅</strong>: 어드민 스타트 개시 시점(<code>EFFECTIVE_START_DATE</code>) 기준 유효기간 및 무제한 영구 소유권 속성 부여.
                                    <br>• <strong>데이터 보관 정책</strong>: 활성 데이터(Web DB + Redis) 3D 프리뷰 지원, 1년 경과 raw 3D 파일 Cold Storage(S3 Glacier) 이전.
                                    <br>• <strong>수신 방식 & 멱등성</strong>: SQS 실시간 연동 + 매시간 배치 듀얼 체크 동기화, MD5 해시 기반 중복 등록 차단.
                                </div>
                            </div>

                            <!-- STEP 6 -->
                            <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:20px; box-shadow:0 2px 6px rgba(0,0,0,0.02);">
                                <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
                                    <div style="display:flex; align-items:center; gap:10px;">
                                        <div style="width:28px; height:28px; border-radius:50%; background:#0f172a; color:#fff; font-weight:800; font-size:12px; display:flex; align-items:center; justify-content:center;">6</div>
                                        <div style="font-size:14.5px; font-weight:900; color:#0f172a;">STEP 06. 투표 노출 (Vote Display)</div>
                                    </div>
                                    <span style="background:#f1f5f9; color:#475569; padding:3px 10px; border-radius:6px; font-size:11px; font-weight:700;">투표 전용 웹</span>
                                </div>
                                <div style="font-size:13px; color:#334155; line-height:1.6; margin-left:38px;">
                                    검수를 거친 응모작들이 전용 인기 투표 사이트(<code>contest_vote.html</code>)의 3D 실시간 WebGL 뷰어 그리드로 자동 노출됩니다.
                                </div>
                                <!-- Consideration Box -->
                                <div style="margin-top:10px; margin-left:38px; background:#f8fafc; border-left:3px solid #64748b; padding:10px 14px; border-radius:0 6px 6px 0; font-size:12px; color:#475569; line-height:1.6;">
                                    <strong>단계별 고려사항</strong>: 모바일/PC 반응형 3D 실시간 뷰어 최적화 및 계정 프로필 이메일 직접 노출 방지(아티스트 닉네임 표기).
                                </div>
                            </div>

                            <!-- STEP 7 -->
                            <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:20px; box-shadow:0 2px 6px rgba(0,0,0,0.02);">
                                <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
                                    <div style="display:flex; align-items:center; gap:10px;">
                                        <div style="width:28px; height:28px; border-radius:50%; background:#0f172a; color:#fff; font-weight:800; font-size:12px; display:flex; align-items:center; justify-content:center;">7</div>
                                        <div style="font-size:14.5px; font-weight:900; color:#0f172a;">STEP 07. 유저 인기 투표 (User Voting)</div>
                                    </div>
                                    <span style="background:#f1f5f9; color:#475569; padding:3px 10px; border-radius:6px; font-size:11px; font-weight:700;">유저 투표</span>
                                </div>
                                <div style="font-size:13px; color:#334155; line-height:1.6; margin-left:38px;">
                                    로그인 유저는 매일 1회 마음에 드는 발자국 3D 아이템에 투표를 행사하며 어뷰징/매크로 방지가 동작합니다.
                                </div>
                                <!-- Consideration Box -->
                                <div style="margin-top:10px; margin-left:38px; background:#f8fafc; border-left:3px solid #64748b; padding:10px 14px; border-radius:0 6px 6px 0; font-size:12px; color:#475569; line-height:1.6;">
                                    <strong>단계별 고려사항</strong>: 계정당 1일 1회 투표 제한, 매크로 방지 CAPTCHA 검증 및 동일 IP 다계정 부당 득표 차단 필터링 적용.
                                </div>
                            </div>

                            <!-- STEP 8 -->
                            <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:20px; box-shadow:0 2px 6px rgba(0,0,0,0.02);">
                                <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
                                    <div style="display:flex; align-items:center; gap:10px;">
                                        <div style="width:28px; height:28px; border-radius:50%; background:#0f172a; color:#fff; font-weight:800; font-size:12px; display:flex; align-items:center; justify-content:center;">8</div>
                                        <div style="font-size:14.5px; font-weight:900; color:#0f172a;">STEP 08. 랭킹 선정 (Winner Ranking)</div>
                                    </div>
                                    <span style="background:#f1f5f9; color:#475569; padding:3px 10px; border-radius:6px; font-size:11px; font-weight:700;">당첨작 확정</span>
                                </div>
                                <div style="font-size:13px; color:#334155; line-height:1.6; margin-left:38px;">
                                    유효 득표 1순위 상위 5개(유저 투표 5개) + GM/개발진 내부 심사 5개를 조합하여 총 10개 당첨작을 확정합니다.
                                </div>
                                <!-- Consideration Box -->
                                <div style="margin-top:10px; margin-left:38px; background:#f8fafc; border-left:3px solid #64748b; padding:10px 14px; border-radius:0 6px 6px 0; font-size:12px; color:#475569; line-height:1.6;">
                                    <strong>단계별 고려사항</strong>: 계정당 최종 당첨 1개 제한(특정 유저 독식 방지), 동률 발생 시 우선순위 규칙 적용 [1순위: 업로드 등록 시점이 빠른 순 ➔ 2순위: 3D 추천수 많은 순].
                                </div>
                            </div>

                            <!-- STEP 9 -->
                            <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:20px; box-shadow:0 2px 6px rgba(0,0,0,0.02);">
                                <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
                                    <div style="display:flex; align-items:center; gap:10px;">
                                        <div style="width:28px; height:28px; border-radius:50%; background:#0f172a; color:#fff; font-weight:800; font-size:12px; display:flex; align-items:center; justify-content:center;">9</div>
                                        <div style="font-size:14.5px; font-weight:900; color:#0f172a;">STEP 09. 패치 자동 생성 (Studio & Patch Generator)</div>
                                    </div>
                                    <span style="background:#f1f5f9; color:#475569; padding:3px 10px; border-radius:6px; font-size:11px; font-weight:700;">자동 빌드</span>
                                </div>
                                <div style="font-size:13px; color:#334155; line-height:1.6; margin-left:38px;">
                                    선정작 10개 원본 자산을 스튜디오 패치 빌더로 전달하여 라그나로크 클라이언트 패치(<code>.grf</code> / <code>.gpf</code>) 및 마켓 상점 상품을 자동 생성합니다.
                                </div>
                                <!-- Consideration Box -->
                                <div style="margin-top:10px; margin-left:38px; background:#f8fafc; border-left:3px solid #64748b; padding:10px 14px; border-radius:0 6px 6px 0; font-size:12px; color:#475569; line-height:1.6;">
                                    <strong>단계별 고려사항</strong>: 정기점검 당일 점검 시작 2시간 전 리소스 패치 파일 자동 컴파일 완료 및 RO 패처 CDN 스테이징 서버 자동 동기화.
                                </div>
                            </div>

                            <!-- STEP 10 -->
                            <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:20px; box-shadow:0 2px 6px rgba(0,0,0,0.02);">
                                <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
                                    <div style="display:flex; align-items:center; gap:10px;">
                                        <div style="width:28px; height:28px; border-radius:50%; background:#0f172a; color:#fff; font-weight:800; font-size:12px; display:flex; align-items:center; justify-content:center;">10</div>
                                        <div style="font-size:14.5px; font-weight:900; color:#0f172a;">STEP 10. 마켓 DB 전달 (Market DB Sync)</div>
                                    </div>
                                    <span style="background:#f1f5f9; color:#475569; padding:3px 10px; border-radius:6px; font-size:11px; font-weight:700;">판매 대기</span>
                                </div>
                                <div style="font-size:13px; color:#334155; line-height:1.6; margin-left:38px;">
                                    정제된 아이템 스펙, 3D WebGL 메타데이터, 가격 파라미터를 운영 환경 웹 마켓 DB로 전달하여 개시 대기 상태(<code>STATUS_READY</code>)로 전환합니다.
                                </div>
                                <!-- Consideration Box -->
                                <div style="margin-top:10px; margin-left:38px; background:#f8fafc; border-left:3px solid #64748b; padding:10px 14px; border-radius:0 6px 6px 0; font-size:12px; color:#475569; line-height:1.6;">
                                    <strong>단계별 고려사항</strong>: 당첨 크리에이터 유저에게 [영구 소유 귀속 아이템] 무상 발급 + 마켓 일반 구매 유저용 [무제한 영구 소유권] 상품 속성 최종 전달.
                                </div>
                            </div>

                            <!-- STEP 11 -->
                            <div style="background:#0f172a; border:1px solid #1e293b; border-radius:12px; padding:20px; color:#ffffff; box-shadow:0 4px 12px rgba(15, 23, 42, 0.15);">
                                <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
                                    <div style="display:flex; align-items:center; gap:10px;">
                                        <div style="width:28px; height:28px; border-radius:50%; background:#22c55e; color:#fff; font-weight:800; font-size:12px; display:flex; align-items:center; justify-content:center;">11</div>
                                        <div style="font-size:14.5px; font-weight:900; color:#ffffff;">STEP 11. 마켓 개시 (Admin 1-Click Launch)</div>
                                    </div>
                                    <span style="background:#22c55e; color:#ffffff; padding:3px 10px; border-radius:6px; font-size:11px; font-weight:800;">최종 런칭</span>
                                </div>
                                <div style="font-size:13px; color:#cbd5e1; line-height:1.6; margin-left:38px;">
                                    어드민 백오피스(<code>admin.html</code>)에서 관리자가 <strong>[마켓 상점 일괄 개시 (START)]</strong> 버튼을 클릭하는 즉시 웹 마켓(<code>market.html</code>)과 인게임 상점이 100% 동시에 활성화되어 유저 대상 판매가 시작됩니다.
                                </div>
                                <!-- Consideration Box -->
                                <div style="margin-top:10px; margin-left:38px; background:rgba(255,255,255,0.08); border-left:3px solid #22c55e; padding:10px 14px; border-radius:0 6px 6px 0; font-size:12px; color:#e2e8f0; line-height:1.6;">
                                    <strong>단계별 고려사항</strong>: 관리자 실수 클릭 방지용 2차 확인 모달 팝업 적용 및 개시 클릭 후 10초간 취소할 수 있는 카운트다운 롤백 타임아웃을 연동합니다.
                                </div>
                            </div>

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
    console.log('Successfully updated contest_policy.html Section 5 with modern unified design!');
} else {
    console.error('SECTION 5 marker not found');
}

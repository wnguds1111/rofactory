const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'contest_policy.html');
let html = fs.readFileSync(targetPath, 'utf8');

// Ensure Mermaid script is included in head if not present
if (!html.includes('mermaid.min.js')) {
    html = html.replace('</head>', `    <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            if (window.mermaid) {
                mermaid.initialize({ startOnLoad: true, theme: 'neutral' });
            }
        });
    </script>
</head>`);
}

// Replace Section 5 with updated diagrammatic structure and considerations (No emojis in titles/headers)
const updatedSection5 = `<!-- ===================== SECTION 5 ===================== -->
            <div class="page-section" id="sec-automation">
                <div class="page-header">
                    <div class="page-icon" style="background:#f0fdf4; color:#16a34a;">5</div>
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
                            <div class="spec-label" style="border-left-color:#10b981;">콘테스트 11단계 상세 프로세스 파이프라인</div>
                        </div>

                        <!-- 11 Step Cards Flowchart Container -->
                        <div style="display:flex; flex-direction:column; gap:10px; position:relative; margin-top:16px;" id="automationFlowContainer">
                            
                            <!-- STEP 1 -->
                            <div style="background:#f8fafc; border:2px solid #cbd5e1; border-radius:12px; padding:16px 20px; display:flex; gap:16px; align-items:center;">
                                <div style="width:38px; height:38px; border-radius:50%; background:#2563eb; color:#fff; font-weight:900; font-size:15px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">1</div>
                                <div style="flex:1;">
                                    <div style="font-size:11px; font-weight:800; color:#2563eb; text-transform:uppercase;">STEP 01. 일정 설정 (Date Setup)</div>
                                    <div style="font-size:14.5px; font-weight:900; color:#0f172a; margin-top:2px;">발자국 시즌제 콘테스트 날짜 설정</div>
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
                                    <div style="font-size:14.5px; font-weight:900; color:#0f172a; margin-top:2px;">발자국 등록 시작</div>
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
                                    <div style="font-size:14.5px; font-weight:900; color:#0f172a; margin-top:2px;">발자국 등록 마감</div>
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
                                    <div style="font-size:14.5px; font-weight:900; color:#0f172a; margin-top:2px;">적재된 발자국 데이터 기능 유효성 & 보안 검사 (S3 트리거 연동)</div>
                                    <div style="font-size:12.5px; color:#475569; margin-top:2px;">
                                        <strong>AWS S3 Event Notification + Lambda Engine</strong> 연동으로 업로드 즉시 ① 바이트 헤더 보안, ② 3D 메시 규격/용량 검사, ③ NSFW/악성 스크립트 100% 자동 검증.
                                    </div>
                                </div>
                                <div style="background:#f3e8ff; color:#6b21a8; padding:5px 10px; border-radius:6px; font-size:11px; font-weight:800; white-space:nowrap;">S3 + Lambda</div>
                            </div>

                            <div style="text-align:center; color:#94a3b8; font-size:16px; font-weight:900; margin:-4px 0;">⬇️</div>

                            <!-- STEP 5 HIGHLIGHTED CARD -->
                            <div style="background:#ecfdf5; border:2px solid #10b981; border-radius:12px; padding:18px 22px; display:flex; gap:16px; align-items:center; box-shadow: 0 4px 14px rgba(16, 185, 129, 0.15);">
                                <div style="width:42px; height:42px; border-radius:50%; background:#059669; color:#fff; font-weight:900; font-size:17px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">5</div>
                                <div style="flex:1;">
                                    <div style="font-size:11px; font-weight:800; color:#059669; text-transform:uppercase;">STEP 05. DB 수신 & 정제 (Database Ingestion Engine)</div>
                                    <div style="font-size:15px; font-weight:900; color:#064e3b; margin-top:2px;">선별된 발자국 데이터 웹 DB 자동 수신 및 3D WebGL 인덱싱</div>
                                    <div style="font-size:12.5px; color:#047857; margin-top:3px; line-height:1.5;">
                                        S3 보안/유효성 검사를 통과한 클린 데이터만 수신 큐(SQS)를 거쳐 <strong>Web DB 스테이징 및 프로덕션 테이블로 자동 연동</strong>되며, 3D WebGL 실시간 프리뷰 경로 생성 및 <code>STATUS_VOTING_READY</code> 상태값으로 변환됩니다.
                                    </div>
                                </div>
                                <div style="background:#059669; color:#ffffff; padding:6px 12px; border-radius:6px; font-size:11.5px; font-weight:800; white-space:nowrap;">
                                    상세 수신 파이프라인
                                </div>
                            </div>

                            <div style="text-align:center; color:#94a3b8; font-size:16px; font-weight:900; margin:-4px 0;">⬇️</div>

                            <!-- STEP 6 -->
                            <div style="background:#f8fafc; border:2px solid #cbd5e1; border-radius:12px; padding:16px 20px; display:flex; gap:16px; align-items:center;">
                                <div style="width:38px; height:38px; border-radius:50%; background:#ec4899; color:#fff; font-weight:900; font-size:15px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">6</div>
                                <div style="flex:1;">
                                    <div style="font-size:11px; font-weight:800; color:#ec4899; text-transform:uppercase;">STEP 06. 투표 노출 (Vote Display)</div>
                                    <div style="font-size:14.5px; font-weight:900; color:#0f172a; margin-top:2px;">투표 페이지(<code>contest_vote.html</code>)에 선별된 발자국 데이터 노출</div>
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
                                    <div style="font-size:14.5px; font-weight:900; color:#0f172a; margin-top:2px;">유저 인기 투표 진행 (1일 1회 로그인 계정 투표)</div>
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
                                    <div style="font-size:14.5px; font-weight:900; color:#0f172a; margin-top:2px;">투표 랭킹 선정 (기준 적용: 상위 5개 당첨작 확정)</div>
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
                                    <div style="font-size:14.5px; font-weight:900; color:#0f172a; margin-top:2px;">선정된 데이터 스튜디오 전달 ➔ 패치데이터 & 마켓 데이터 생성 자동</div>
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
                                    <div style="font-size:14.5px; font-weight:900; color:#0f172a; margin-top:2px;">웹에 최종 마켓 DB 자동 전달 및 준비</div>
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
                                    <div style="font-size:16px; font-weight:900; color:#fff; margin-top:2px;">어드민 마켓 개시 버튼 스타트 (Start Market Launch)</div>
                                    <div style="font-size:12.5px; color:#dcfce7; margin-top:4px; line-height:1.6;">
                                        어드민 백오피스(<code>admin.html</code>)에서 관리자가 <strong>[마켓 상점 일괄 개시 (START)]</strong> 버튼을 클릭하는 즉시, 
                                        웹 마켓(<code>market.html</code>)과 인게임 상점 판매가 100% 동시에 활성화되어 유저 대상 판매가 시작됩니다!
                                    </div>
                                </div>
                                <div style="background:#ffffff; color:#15803d; padding:10px 16px; border-radius:8px; font-size:12.5px; font-weight:900; white-space:nowrap;">
                                    마켓 개시 (START)
                                </div>
                            </div>

                        </div>
                    </div>

                    <!-- ================= DEDICATED STEP 5 SYSTEM FLOWCHART ================= -->
                    <div class="spec-group" style="margin-top:32px; background:#f0fdf4; border:2px solid #a7f3d0; border-radius:16px; padding:24px 28px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">
                            <div style="font-size:16px; font-weight:900; color:#065f46;">
                                5단계 시스템 플로우차트: 선별된 발자국 데이터 웹 DB 수신 프로세스
                            </div>
                            <span style="background:#10b981; color:#fff; padding:4px 12px; border-radius:12px; font-size:11px; font-weight:800;">System Architecture Diagram</span>
                        </div>

                        <div style="font-size:13px; color:#047857; margin-bottom:20px; line-height:1.6;">
                            S3 보안 및 유효성 검사(Step 4) 통과 후부터 메시지 큐(SQS), Ingestion Worker, DB 스테이징, Master DB 인덱싱 및 노출 상태(VOTING_READY) 변환까지의 <strong>전체 데이터 연동 시스템 플로우</strong>입니다.
                        </div>

                        <!-- Interactive Mermaid Render Block -->
                        <div style="background:#ffffff; border:1.5px solid #6ee7b7; border-radius:12px; padding:20px; overflow-x:auto;" class="mermaid-container">
                            <pre class="mermaid" style="display:flex; justify-content:center;">
flowchart TD
    subgraph S3_Validation_Layer [1. S3 및 검증 레이어]
        A1[유저 발자국 데이터 S3 업로드] --> A2[S3 Event Trigger 발생]
        A2 --> A3[Lambda 검증 엔진 실행<br/>보안, 메시 용량, NSFW 검사]
        A3 --> B1{Step 4 검증 판정}
    end

    subgraph Messaging_Layer [2. 메시지 전달 레이어]
        B1 -- FAIL --> C1[불합격 처리<br/>REJECTED 상태 기록 및 사유 S3 적재]
        B1 -- PASS --> C2[검증 통과 이벤트<br/>APPROVED Event]
        C2 --> C3[AWS SQS / EventBridge 메시지 큐]
    end

    subgraph Worker_Layer [3. DB 수신 및 변환 엔진]
        C3 --> D1[DB Ingestion Worker 실행]
        D1 --> D2[메시지 파싱 및 DB 스키마 바인딩]
        D2 --> D3{데이터 무결성 검사}
        D3 -- FAIL --> E1[Dead Letter Queue 이동<br/>운영진 장애 알림 발생]
        D3 -- PASS --> D4[3D WebGL 프리뷰 URL 생성 및 메타데이터 파싱]
    end

    subgraph Web_DB_Layer [4. 웹 DB 수신 레이어]
        D4 --> F1[(Web Staging DB<br/>Footprint_Staging Table)]
        F1 --> F2[데이터 노출 상태 업데이트<br/>STATUS: VOTING_READY]
        F2 --> F3[(Web Production DB<br/>Footprint_Master Table)]
        F3 --> F4[Redis Cache Invalidation 및 인덱싱]
    end

    subgraph Presentation_Layer [5. 서비스 노출 준비]
        F4 --> G1[Step 6. 투표 페이지 노출 준비 완료]
    end

    style B1 fill:#fee2e2,stroke:#ef4444,stroke-width:2px
    style D3 fill:#fef3c7,stroke:#f59e0b,stroke-width:2px
    style F3 fill:#dbeafe,stroke:#3b82f6,stroke-width:2px
    style G1 fill:#dcfce7,stroke:#10b981,stroke-width:2px
                            </pre>
                        </div>

                        <!-- Structured UI Grid Flow Chart Representation -->
                        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:14px; margin-top:20px;">
                            
                            <div style="background:#ffffff; border:1px solid #a7f3d0; border-radius:10px; padding:14px 16px;">
                                <div style="font-size:11px; font-weight:800; color:#047857; text-transform:uppercase;">1. S3 & 검증 레이어</div>
                                <div style="font-size:13.5px; font-weight:900; color:#064e3b; margin-top:4px;">S3 Event & Lambda</div>
                                <div style="font-size:12px; color:#475569; margin-top:6px; line-height:1.5;">
                                    S3 업로드 즉시 Lambda가 바이트 헤더, 3D 메시 규격, 스크립트 검사를 수행하여 PASS/FAIL을 판정합니다.
                                </div>
                            </div>

                            <div style="background:#ffffff; border:1px solid #a7f3d0; border-radius:10px; padding:14px 16px;">
                                <div style="font-size:11px; font-weight:800; color:#047857; text-transform:uppercase;">2. 메시지 전달 레이어</div>
                                <div style="font-size:13.5px; font-weight:900; color:#064e3b; margin-top:4px;">AWS SQS Queue</div>
                                <div style="font-size:12px; color:#475569; margin-top:6px; line-height:1.5;">
                                    검증 통과된 <code>APPROVED</code> 이벤트만 메시지 큐로 전달되어 DB 대량 수신 시 병목 현상을 방지합니다.
                                </div>
                            </div>

                            <div style="background:#ffffff; border:1px solid #a7f3d0; border-radius:10px; padding:14px 16px;">
                                <div style="font-size:11px; font-weight:800; color:#047857; text-transform:uppercase;">3. DB 수신 & 변환 엔진</div>
                                <div style="font-size:13.5px; font-weight:900; color:#064e3b; margin-top:4px;">Ingestion Worker</div>
                                <div style="font-size:12px; color:#475569; margin-top:6px; line-height:1.5;">
                                    메시지를 수신하여 DB 스키마로 파싱하고 무결성을 검증하며 실패 시 DLQ로 이관하여 자동 알림을 발송합니다.
                                </div>
                            </div>

                            <div style="background:#ffffff; border:1px solid #a7f3d0; border-radius:10px; padding:14px 16px;">
                                <div style="font-size:11px; font-weight:800; color:#047857; text-transform:uppercase;">4. 웹 DB 수신 레이어</div>
                                <div style="font-size:13.5px; font-weight:900; color:#064e3b; margin-top:4px;">Web DB & Redis</div>
                                <div style="font-size:12px; color:#475569; margin-top:6px; line-height:1.5;">
                                    Staging DB 수신 후 Master DB로 이관하고 상태값을 <code>VOTING_READY</code>로 변경 후 Redis 캐시를 갱신합니다.
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
                                    <td style="text-align:center;"><span class="badge badge-green">확정</span></td>
                                </tr>
                                <tr>
                                    <td class="field">2. 등록 시작</td>
                                    <td>티켓 30장 발급, <code>register.html</code></td>
                                    <td>정액제/KP 결제 유저 대상 티켓 30장 발급 및 출품 페이지 연동.</td>
                                    <td style="text-align:center;"><span class="badge badge-green">확정</span></td>
                                </tr>
                                <tr>
                                    <td class="field">3. 등록 마감</td>
                                    <td>타임스탬프 차단, <code>IS_LOCKED=true</code></td>
                                    <td>종료 시점 도달 시 신규 업로드 및 기존 등록작 수정/삭제 자동 차단.</td>
                                    <td style="text-align:center;"><span class="badge badge-green">확정</span></td>
                                </tr>
                                <tr>
                                    <td class="field">4. S3 보안/유효성 검사</td>
                                    <td>S3 Event + AWS Lambda Serverless</td>
                                    <td>S3 적재 직후 Lambda가 바이트 헤더, 3D Mesh 규격, 스크립트 유해성 100% 자동 검사 (S3 가능 확인).</td>
                                    <td style="text-align:center;"><span class="badge badge-blue">기술검증완료</span></td>
                                </tr>
                                <tr>
                                    <td class="field">5. 웹 DB 수신</td>
                                    <td>SQS + Ingestion Worker (MySQL/Redis)</td>
                                    <td>S3 검증 통과(APPROVED) 데이터만 SQS 큐를 거쳐 웹 DB 스테이징/마스터에 수신 및 STATUS_VOTING_READY 변환.</td>
                                    <td style="text-align:center;"><span class="badge badge-green">확정</span></td>
                                </tr>
                                <tr>
                                    <td class="field">6. 투표 노출</td>
                                    <td><code>contest_vote.html</code> 3D Grid</td>
                                    <td>선별된 숏리스트 응모작들이 투표 사이트에 3D WebGL 프리뷰 형태로 자동 노출.</td>
                                    <td style="text-align:center;"><span class="badge badge-green">확정</span></td>
                                </tr>
                                <tr>
                                    <td class="field">7. 투표 진행</td>
                                    <td>1일 1회 투표, 어뷰징/매크로 방지</td>
                                    <td>로그인 계정당 1일 1회 투표 가능. CAPTCHA 및 IP 중복 방지 로직 적용.</td>
                                    <td style="text-align:center;"><span class="badge badge-green">확정</span></td>
                                </tr>
                                <tr>
                                    <td class="field">8. 랭킹 선정</td>
                                    <td>유효 득표 1순위 ➔ 등록순 ➔ 추천순 (5개)</td>
                                    <td>유효 득표 순 상위 5개 선정. 동률 시 [등록 시점 빠른 순] ➔ [3D 추천수 순]. 계정당 1개 당첨 제한.</td>
                                    <td style="text-align:center;"><span class="badge badge-green">기준확정</span></td>
                                </tr>
                                <tr>
                                    <td class="field">9. 스튜디오 전달 & 자동 패치</td>
                                    <td><code>.grf</code> / <code>.gpf</code> 패치 자동 생성</td>
                                    <td>선정작 10개의 자산을 스튜디오 패치 빌더로 전달하여 클라이언트 패치데이터 및 마켓 상품 자동 생성.</td>
                                    <td style="text-align:center;"><span class="badge badge-green">확정</span></td>
                                </tr>
                                <tr>
                                    <td class="field">10. 최종 마켓 DB 전달</td>
                                    <td><code>STATUS_READY</code> 이관 적재</td>
                                    <td>웹 마켓 DB로 상품 객체, 가격, 유효기간, 3D 뷰어 메타데이터 전달 완료.</td>
                                    <td style="text-align:center;"><span class="badge badge-green">확정</span></td>
                                </tr>
                                <tr>
                                    <td class="field">11. 어드민 마켓 개시</td>
                                    <td><code>admin.html</code> [START] 버튼</td>
                                    <td>관리자가 스타트 버튼 클릭 시 웹 마켓(<code>market.html</code>)과 인게임 마켓 상점이 일괄 런칭.</td>
                                    <td style="text-align:center;"><span class="badge badge-green">확정</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Key Operational & Technical Considerations (NO EMOJIS IN TITLES) -->
                    <div class="spec-group" style="margin-top:32px; background:#fffbfb; border:1.5px solid #fecaca; border-radius:14px; padding:24px 28px;">
                        <div style="font-size:16px; font-weight:900; color:#991b1b; display:flex; align-items:center; gap:8px; margin-bottom:16px;">
                            <span>5단계 및 파이프라인 주요 고려사항 (Technical & Operational Considerations)</span>
                        </div>

                        <div style="display:flex; flex-direction:column; gap:16px;">
                            
                            <!-- Consideration 1 -->
                            <div style="background:#ffffff; border:1px solid #fca5a5; border-radius:10px; padding:18px 22px;">
                                <div style="font-size:14.5px; font-weight:900; color:#7f1d1d; margin-bottom:8px;">
                                    1. 개시일 기준 사용 기간 및 데이터 보관 정책 (Data Lifecycle & Retention Period)
                                </div>
                                <div style="font-size:12.5px; color:#475569; line-height:1.7;">
                                    • <strong>어드민 마켓 개시일 기준 사용 기간 설정</strong>: 어드민 백오피스에서 [마켓 개시] 스타트 버튼 클릭 시점(<code>EFFECTIVE_START_DATE</code>)을 기준으로 판매/사용 시작 일시가 기록됩니다.<br>
                                    • <strong>상품 사용 유효기간 (Use Duration)</strong>:
                                      <br>- <strong>마켓 상점 프로모션 노출 기간</strong>: 개시일로부터 차기 시즌 개시일(3개월 주기)까지 상점 메인 판매 유지.
                                      <br>- <strong>유저 아이템 소유권 정책</strong>: 당첨 크리에이터(영구 소유 귀속 + 닉네임 각인) 및 구매 유저 모두 <strong>[무제한 영구 소유권 상품]</strong>으로 세팅하여 가치 보존.
                                    <br>
                                    • <strong>데이터 보관 및 아카이빙 주기 (Data Retention)</strong>:
                                      <br>- <strong>활성 데이터</strong>: 진행 중인 시즌 데이터는 Web RDB 및 Redis In-Memory DB에 적재하여 고성능 3D 프리뷰 지원.
                                      <br>- <strong>콜드 아카이빙 (Cold Archiving)</strong>: 마켓 개시 후 1년이 지난 원본 3D 메시/텍스처 raw 데이터는 S3 Glacier로 자동 이전하여 웹 DB 및 CDN 트래픽 비용을 절감합니다.
                                </div>
                            </div>

                            <!-- Consideration 2 -->
                            <div style="background:#ffffff; border:1px solid #fca5a5; border-radius:10px; padding:18px 22px;">
                                <div style="font-size:14.5px; font-weight:900; color:#7f1d1d; margin-bottom:8px;">
                                    2. S3-Web DB 수신 연동 방식 (Event-Driven vs Batch Polling)
                                </div>
                                <div style="font-size:12.5px; color:#475569; line-height:1.7;">
                                    • <strong>이벤트 기반 실시간 수신 (Event-Driven Ingestion)</strong>: S3 Event Notification ➔ AWS SQS 큐 ➔ 백엔드 DB Worker 연동 방식으로 검증 통과(<code>APPROVED</code>) 즉시 웹 DB로 실시간 수신.<br>
                                    • <strong>배치 듀얼 체크 (Dual Check Batch)</strong>: 메시지 누락 방지를 위해 매 1시간마다 S3 <code>APPROVED</code> 폴더와 웹 DB 간 미수신 건을 자동 비교/동기화하는 폴링 워커 병행 운영.
                                </div>
                            </div>

                            <!-- Consideration 3 -->
                            <div style="background:#ffffff; border:1px solid #fca5a5; border-radius:10px; padding:18px 22px;">
                                <div style="font-size:14.5px; font-weight:900; color:#7f1d1d; margin-bottom:8px;">
                                    3. DB 수신 상태 플래그 (Status Flag) 세부 정의
                                </div>
                                <div style="font-size:12.5px; color:#475569; line-height:1.7;">
                                    웹 DB의 <code>STATUS</code> 컬럼을 통해 수신 및 검수/투표/마켓 단계를 체계적으로 제어합니다.<br>
                                    <code>PENDING</code>(검사 대기) ➔ <code>APPROVED</code>(검사 통과) / <code>REJECTED</code>(검사 실패) ➔ <code>STAGING</code>(웹 DB 수신 완료) ➔ <code>VOTING_READY</code>(투표 노출 대기) ➔ <code>VOTED_WINNER</code>(상위 5개 당첨) ➔ <code>LAUNCHED</code>(마켓 개시).
                                </div>
                            </div>

                            <!-- Consideration 4 -->
                            <div style="background:#ffffff; border:1px solid #fca5a5; border-radius:10px; padding:18px 22px;">
                                <div style="font-size:14.5px; font-weight:900; color:#7f1d1d; margin-bottom:8px;">
                                    4. 데이터 무결성 및 멱등성 (Idempotency) 보장
                                </div>
                                <div style="font-size:12.5px; color:#475569; line-height:1.7;">
                                    • <strong>중복 처리 방지</strong>: S3 객체의 MD5 ETag Hash 및 이벤트 Unique ID를 DB Primary Key에 매핑하여 동일 데이터의 중복 수신 방지.<br>
                                    • <strong>단일 트랜잭션 수신</strong>: 3D 프리뷰 URL 생성, DB 레코드 저장, Redis 캐시 갱신 작업을 단일 DB 트랜잭션 범위로 묶어 이중 입력 및 데이터 불일치 예방.
                                </div>
                            </div>

                            <!-- Consideration 5 -->
                            <div style="background:#ffffff; border:1px solid #fca5a5; border-radius:10px; padding:18px 22px;">
                                <div style="font-size:14.5px; font-weight:900; color:#7f1d1d; margin-bottom:8px;">
                                    5. 장애 대응 및 예외 처리 (Retry Engine & Dead Letter Queue)
                                </div>
                                <div style="font-size:12.5px; color:#475569; line-height:1.7;">
                                    • <strong>지수 백오프 재시도 (Exponential Backoff Retry)</strong>: DB 락 또는 순간 네트워크 지연 시 최대 3회 자동 재시도.<br>
                                    • <strong>Dead Letter Queue (DLQ) 이관</strong>: 3회 재시도 실패 시 해당 메시지를 DLQ로 이관하고 Slack/Dooray 및 어드민 모니터링 팝업으로 수동 검수 알림을 즉시 발송.
                                </div>
                            </div>

                            <!-- Consideration 6 -->
                            <div style="background:#ffffff; border:1px solid #fca5a5; border-radius:10px; padding:18px 22px;">
                                <div style="font-size:14.5px; font-weight:900; color:#7f1d1d; margin-bottom:8px;">
                                    6. 보안 및 네트워크 접근제어 (Security & Access Control)
                                </div>
                                <div style="font-size:12.5px; color:#475569; line-height:1.7;">
                                    • <strong>S3 Presigned / CDN URL 활용</strong>: Web DB에는 S3 원본 버킷 직접 경로 대신 읽기 권한 전용 CDN 서명 URL을 저장하여 원본 파일 탈취 차단.<br>
                                    • <strong>DB Worker 전용 계정 권한 분리</strong>: Ingestion Worker 전용 DB 서비스 계정을 부여하여 최소한의 쓰기/수정 권한만 할당.
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>`;

// Replace Section 5 in contest_policy.html
const startMarker = '<!-- ===================== SECTION 5 ===================== -->';
const endMarker = '</div>\n\n        </div>\n    </div>';

const startIndex = html.indexOf(startMarker);
const endIndex = html.indexOf('<!-- Main Content -->'); // Let's locate precisely

if (startIndex !== -1) {
    // Find the end of section 5 before main end
    const nextSectionOrEnd = html.indexOf('</div>\n        </div>\n    </div>\n\n    <script>');
    let section5End = html.indexOf('</div>\n            </div>\n\n        </div>', startIndex);
    if (section5End === -1) {
        section5End = html.indexOf('<!-- ===================== SECTION 5 END ===================== -->');
    }
    
    // Replace section 5
    const beforeSec5 = html.substring(0, startIndex);
    const afterSec5 = html.substring(html.indexOf('</div>\n            </div>\n\n        </div>', startIndex));
    html = beforeSec5 + updatedSection5 + afterSec5;
    
    fs.writeFileSync(targetPath, html, 'utf8');
    console.log('Successfully updated contest_policy.html Section 5!');
} else {
    console.error('SECTION 5 marker not found');
}

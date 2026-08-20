const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'contest_policy.html');
let html = fs.readFileSync(targetPath, 'utf8');

// Simplified, non-developer friendly 11-step flowchart Section 5
const updatedSection5 = `<!-- ===================== SECTION 5 ===================== -->
            <div class="page-section" id="sec-automation">
                <div class="page-header">
                    <div class="page-icon" style="background:#f0fdf4; color:#16a34a;">5</div>
                    <h3>5. 공모전 운영 11단계 전체 파이프라인 및 직관적 프로세스 플로우차트</h3>
                    <div class="section-edit-tools" style="display:none; margin-left:auto; gap:6px;">
                        <button onclick="addTableRow(this)" style="background:#e0f2fe; color:#0369a1; border:1px solid #bae6fd; padding:3px 10px; border-radius:4px; font-size:11.5px; font-weight:700; cursor:pointer;">+ 행 추가</button>
                    </div>
                    <span class="page-tag" style="margin-left:10px; background:#dcfce7; color:#15803d;">Simple 11-Step Process Flow</span>
                </div>
                <div class="page-body">

                    <div class="alert-box alert-info" style="margin-bottom:24px; background:#ecfdf5; border-color:#a7f3d0; color:#065f46;">
                        <span class="alert-icon">⚡</span>
                        <div>
                            <strong>RO Factory 시즌제 콘테스트 전체 11단계 진행 한눈에 보기</strong><br>
                            비개발자 및 서비스 운영진도 직관적으로 이해할 수 있는 공모전 전체 운영 11단계 프로세스 흐름도입니다.
                        </div>
                    </div>

                    <!-- Non-Developer Friendly Overview Flowchart -->
                    <div class="spec-group" style="background:#ffffff; border:2px solid #3b82f6; border-radius:16px; padding:24px 28px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">
                            <div style="font-size:16px; font-weight:900; color:#1e3a8a;">
                                공모전 전체 11단계 운영 프로세스 플로우차트
                            </div>
                            <span style="background:#2563eb; color:#fff; padding:4px 12px; border-radius:12px; font-size:11px; font-weight:800;">쉬운 4단계 프로세스 구분</span>
                        </div>

                        <!-- Mermaid Rendering Block -->
                        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:12px; padding:20px; overflow-x:auto;" class="mermaid-container">
                            <pre class="mermaid" style="display:flex; justify-content:center;">
flowchart TD
    subgraph Phase_1 [1단계. 준비 및 작품 접수]
        A1[1. 콘테스트 일정 설정<br/>어드민에서 접수 및 투표 기간 입력] --> A2[2. 발자국 등록 시작<br/>이벤트 오픈 & 유저 출품 접수]
        A2 --> A3[3. 발자국 등록 마감<br/>마감 시점 자동 수정/등록 차단]
    end

    subgraph Phase_2 [2단계. 데이터 검증 및 웹 수신]
        A3 --> B1[4. 보안 및 3D 데이터 검사<br/>S3 자동 검사: 규격, 유해성, 보안]
        B1 --> B2{검사 결과}
        B2 -- 통과 --> B3[5. 웹 DB 자동 수신<br/>검증 완료 데이터 웹 수신]
        B2 -- 불합격 --> B4[등록 거절 및 사유 기록]
    end

    subgraph Phase_3 [3단계. 유저 투표 및 당첨작 선정]
        B3 --> C1[6. 투표 페이지 노출<br/>3D 실시간 뷰어 형태로 자동 배치]
        C1 --> C2[7. 유저 인기 투표 진행<br/>로그인 유저 1일 1회 투표]
        C2 --> C3[8. 랭킹 선정 및 당첨작 확정<br/>GM 심사 5개 + 유저 투표 5개 = 총 10개]
    end

    subgraph Phase_4 [4단계. 패치 자동 생성 및 마켓 런칭]
        C3 --> D1[9. 스튜디오 전달 및 패치 자동 생성<br/>인게임 패치 파일 & 마켓 상품 자동 제작]
        D1 --> D2[10. 웹 마켓 DB 최종 전달<br/>웹 상점 판매 대기 상태 전환]
        D2 --> D3[11. 어드민 마켓 개시<br/>관리자 개시 버튼 클릭 ➔ 즉시 인게임/웹 판매 개시]
    end

    style B2 fill:#fef3c7,stroke:#f59e0b,stroke-width:2px
    style C3 fill:#dbeafe,stroke:#3b82f6,stroke-width:2px
    style D3 fill:#dcfce7,stroke:#10b981,stroke-width:2px
                            </pre>
                        </div>

                    </div>

                    <!-- Simplified Step Cards Flowchart Container (1~11 Steps) -->
                    <div class="spec-group" style="margin-top:28px;">
                        <div class="spec-label-row">
                            <div class="spec-label">단계별 세부 운영 설명 (1단계 ~ 11단계)</div>
                        </div>

                        <div style="display:flex; flex-direction:column; gap:12px; margin-top:16px;">
                            
                            <!-- STEP 1 -->
                            <div style="background:#f8fafc; border:1.5px solid #cbd5e1; border-radius:12px; padding:16px 20px; display:flex; gap:16px; align-items:center;">
                                <div style="width:36px; height:36px; border-radius:50%; background:#2563eb; color:#fff; font-weight:900; font-size:14px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">1</div>
                                <div style="flex:1;">
                                    <div style="font-size:11px; font-weight:800; color:#2563eb;">STEP 01. 일정 설정</div>
                                    <div style="font-size:14px; font-weight:900; color:#0f172a; margin-top:2px;">발자국 시즌제 콘테스트 날짜 설정</div>
                                    <div style="font-size:12.5px; color:#475569; margin-top:2px;">
                                        어드민 페이지에서 ① 작품 접수 기간 및 ② 유저 투표 랭킹 선정 기간을 분 단위로 사전 세팅합니다.
                                    </div>
                                </div>
                                <div style="background:#dbeafe; color:#1e40af; padding:4px 10px; border-radius:6px; font-size:11px; font-weight:800; white-space:nowrap;">1단계: 준비</div>
                            </div>

                            <!-- STEP 2 -->
                            <div style="background:#f8fafc; border:1.5px solid #cbd5e1; border-radius:12px; padding:16px 20px; display:flex; gap:16px; align-items:center;">
                                <div style="width:36px; height:36px; border-radius:50%; background:#0284c7; color:#fff; font-weight:900; font-size:14px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">2</div>
                                <div style="flex:1;">
                                    <div style="font-size:11px; font-weight:800; color:#0284c7;">STEP 02. 접수 개시</div>
                                    <div style="font-size:14px; font-weight:900; color:#0f172a; margin-top:2px;">발자국 등록 시작</div>
                                    <div style="font-size:12.5px; color:#475569; margin-top:2px;">
                                        이벤트 페이지가 오픈되며, 결제 유저에게 출품 티켓(30장)이 지급되어 작품 응모가 시작됩니다.
                                    </div>
                                </div>
                                <div style="background:#e0f2fe; color:#0369a1; padding:4px 10px; border-radius:6px; font-size:11px; font-weight:800; white-space:nowrap;">1단계: 접수</div>
                            </div>

                            <!-- STEP 3 -->
                            <div style="background:#f8fafc; border:1.5px solid #cbd5e1; border-radius:12px; padding:16px 20px; display:flex; gap:16px; align-items:center;">
                                <div style="width:36px; height:36px; border-radius:50%; background:#d97706; color:#fff; font-weight:900; font-size:14px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">3</div>
                                <div style="flex:1;">
                                    <div style="font-size:11px; font-weight:800; color:#d97706;">STEP 03. 접수 마감</div>
                                    <div style="font-size:14px; font-weight:900; color:#0f172a; margin-top:2px;">발자국 등록 마감</div>
                                    <div style="font-size:12.5px; color:#475569; margin-top:2px;">
                                        마감 일시에 도달하면 신규 업로드 및 기존 등록작의 수정/삭제가 자동 차단됩니다.
                                    </div>
                                </div>
                                <div style="background:#fef3c7; color:#92400e; padding:4px 10px; border-radius:6px; font-size:11px; font-weight:800; white-space:nowrap;">1단계: 마감</div>
                            </div>

                            <!-- STEP 4 -->
                            <div style="background:#faf5ff; border:1.5px solid #c084fc; border-radius:12px; padding:16px 20px; display:flex; gap:16px; align-items:center;">
                                <div style="width:36px; height:36px; border-radius:50%; background:#7e22ce; color:#fff; font-weight:900; font-size:14px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">4</div>
                                <div style="flex:1;">
                                    <div style="font-size:11px; font-weight:800; color:#7e22ce;">STEP 04. 자동 검증</div>
                                    <div style="font-size:14px; font-weight:900; color:#0f172a; margin-top:2px;">보안 및 3D 데이터 유효성 검사 (S3 연동)</div>
                                    <div style="font-size:12.5px; color:#475569; margin-top:2px;">
                                        업로드 즉시 3D 메시 규격, 용량, 악성 코드 및 유해성 여부를 100% 자동 검사합니다.
                                    </div>
                                </div>
                                <div style="background:#f3e8ff; color:#6b21a8; padding:4px 10px; border-radius:6px; font-size:11px; font-weight:800; white-space:nowrap;">2단계: 검증</div>
                            </div>

                            <!-- STEP 5 -->
                            <div style="background:#ecfdf5; border:1.5px solid #10b981; border-radius:12px; padding:16px 20px; display:flex; gap:16px; align-items:center;">
                                <div style="width:36px; height:36px; border-radius:50%; background:#059669; color:#fff; font-weight:900; font-size:14px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">5</div>
                                <div style="flex:1;">
                                    <div style="font-size:11px; font-weight:800; color:#059669;">STEP 05. DB 자동 수신</div>
                                    <div style="font-size:14px; font-weight:900; color:#064e3b; margin-top:2px;">선별된 발자국 데이터 웹 DB 자동 저장</div>
                                    <div style="font-size:12.5px; color:#047857; margin-top:2px;">
                                        검증을 통과한 안전한 작품만 웹 DB로 자동 수신되고 3D 실시간 프리뷰가 준비됩니다.
                                    </div>
                                </div>
                                <div style="background:#059669; color:#fff; padding:4px 10px; border-radius:6px; font-size:11px; font-weight:800; white-space:nowrap;">2단계: DB수신</div>
                            </div>

                            <!-- STEP 6 -->
                            <div style="background:#f8fafc; border:1.5px solid #cbd5e1; border-radius:12px; padding:16px 20px; display:flex; gap:16px; align-items:center;">
                                <div style="width:36px; height:36px; border-radius:50%; background:#ec4899; color:#fff; font-weight:900; font-size:14px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">6</div>
                                <div style="flex:1;">
                                    <div style="font-size:11px; font-weight:800; color:#ec4899;">STEP 06. 투표 노출</div>
                                    <div style="font-size:14px; font-weight:900; color:#0f172a; margin-top:2px;">투표 페이지에 선별된 작품 노출</div>
                                    <div style="font-size:12.5px; color:#475569; margin-top:2px;">
                                        검증 완료된 작품들이 전용 인기 투표 페이지의 3D 실시간 뷰어 그리드로 배치 노출됩니다.
                                    </div>
                                </div>
                                <div style="background:#fce7f3; color:#9d174d; padding:4px 10px; border-radius:6px; font-size:11px; font-weight:800; white-space:nowrap;">3단계: 투표노출</div>
                            </div>

                            <!-- STEP 7 -->
                            <div style="background:#f8fafc; border:1.5px solid #cbd5e1; border-radius:12px; padding:16px 20px; display:flex; gap:16px; align-items:center;">
                                <div style="width:36px; height:36px; border-radius:50%; background:#8b5cf6; color:#fff; font-weight:900; font-size:14px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">7</div>
                                <div style="flex:1;">
                                    <div style="font-size:11px; font-weight:800; color:#8b5cf6;">STEP 07. 유저 투표</div>
                                    <div style="font-size:14px; font-weight:900; color:#0f172a; margin-top:2px;">유저 인기 투표 진행 (1일 1회)</div>
                                    <div style="font-size:12.5px; color:#475569; margin-top:2px;">
                                        로그인 유저는 매일 1회 마음에 드는 작품에 투표를 행사하며, 매크로 방지 로직이 동작합니다.
                                    </div>
                                </div>
                                <div style="background:#f3e8ff; color:#6b21a8; padding:4px 10px; border-radius:6px; font-size:11px; font-weight:800; white-space:nowrap;">3단계: 유저투표</div>
                            </div>

                            <!-- STEP 8 -->
                            <div style="background:#f8fafc; border:1.5px solid #cbd5e1; border-radius:12px; padding:16px 20px; display:flex; gap:16px; align-items:center;">
                                <div style="width:36px; height:36px; border-radius:50%; background:#6366f1; color:#fff; font-weight:900; font-size:14px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">8</div>
                                <div style="flex:1;">
                                    <div style="font-size:11px; font-weight:800; color:#6366f1;">STEP 08. 랭킹 선정</div>
                                    <div style="font-size:14px; font-weight:900; color:#0f172a; margin-top:2px;">최종 당첨작 10개 선정 확정</div>
                                    <div style="font-size:12.5px; color:#475569; margin-top:2px;">
                                        GM 내부 심사 5개 + 유저 인기 투표 5개를 조합하여 총 10개의 당첨작이 최종 결정됩니다.
                                    </div>
                                </div>
                                <div style="background:#e0e7ff; color:#3730a3; padding:4px 10px; border-radius:6px; font-size:11px; font-weight:800; white-space:nowrap;">3단계: 당첨선정</div>
                            </div>

                            <!-- STEP 9 -->
                            <div style="background:#faf5ff; border:1.5px solid #a855f7; border-radius:12px; padding:16px 20px; display:flex; gap:16px; align-items:center;">
                                <div style="width:36px; height:36px; border-radius:50%; background:#a855f7; color:#fff; font-weight:900; font-size:14px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">9</div>
                                <div style="flex:1;">
                                    <div style="font-size:11px; font-weight:800; color:#a855f7;">STEP 09. 패치 자동 생성</div>
                                    <div style="font-size:14px; font-weight:900; color:#0f172a; margin-top:2px;">스튜디오 전달 ➔ 인게임 패치 및 마켓 상품 자동 생성</div>
                                    <div style="font-size:12.5px; color:#475569; margin-top:2px;">
                                        선정된 10개 작품이 스튜디오 빌더로 전달되어 클라이언트 패치 파일(.grf) 및 상점 상품이 100% 자동 생성됩니다.
                                    </div>
                                </div>
                                <div style="background:#f3e8ff; color:#6b21a8; padding:4px 10px; border-radius:6px; font-size:11px; font-weight:800; white-space:nowrap;">4단계: 패치생성</div>
                            </div>

                            <!-- STEP 10 -->
                            <div style="background:#f8fafc; border:1.5px solid #cbd5e1; border-radius:12px; padding:16px 20px; display:flex; gap:16px; align-items:center;">
                                <div style="width:36px; height:36px; border-radius:50%; background:#09090b; color:#fff; font-weight:900; font-size:14px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">10</div>
                                <div style="flex:1;">
                                    <div style="font-size:11px; font-weight:800; color:#09090b;">STEP 10. 마켓 DB 전달</div>
                                    <div style="font-size:14px; font-weight:900; color:#0f172a; margin-top:2px;">웹 마켓 DB 전달 및 판매 준비</div>
                                    <div style="font-size:12.5px; color:#475569; margin-top:2px;">
                                        상품 정보, 가격, 3D 프리뷰 데이터가 웹 마켓 DB로 전달되어 개시 대기 상태로 설정됩니다.
                                    </div>
                                </div>
                                <div style="background:#f4f4f5; color:#18181b; padding:4px 10px; border-radius:6px; font-size:11px; font-weight:800; white-space:nowrap;">4단계: 판매대기</div>
                            </div>

                            <!-- STEP 11 -->
                            <div style="background:linear-gradient(135deg, #0f172a, #16a34a); border:2px solid #22c55e; border-radius:14px; padding:18px 22px; color:#fff; display:flex; gap:18px; align-items:center; box-shadow:0 6px 16px rgba(22, 163, 74, 0.25);">
                                <div style="width:40px; height:40px; border-radius:50%; background:#22c55e; color:#fff; font-weight:900; font-size:16px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">11</div>
                                <div style="flex:1;">
                                    <div style="font-size:11px; font-weight:800; color:#86efac;">STEP 11. 마켓 개시 (최종 런칭)</div>
                                    <div style="font-size:15px; font-weight:900; color:#fff; margin-top:2px;">어드민 [마켓 개시] 버튼 스타트</div>
                                    <div style="font-size:12.5px; color:#dcfce7; margin-top:3px; line-height:1.5;">
                                        관리자가 스타트 버튼을 클릭하는 즉시 웹 마켓과 인게임 상점에서 100% 동시에 유저 대상 판매가 개시됩니다!
                                    </div>
                                </div>
                                <div style="background:#ffffff; color:#15803d; padding:8px 14px; border-radius:8px; font-size:12px; font-weight:900; white-space:nowrap;">
                                    마켓 개시 (START)
                                </div>
                            </div>

                        </div>
                    </div>

                    <!-- Key Operational Considerations -->
                    <div class="spec-group" style="margin-top:32px; background:#fffbfb; border:1.5px solid #fecaca; border-radius:14px; padding:24px 28px;">
                        <div style="font-size:16px; font-weight:900; color:#991b1b; margin-bottom:16px;">
                            콘테스트 주요 기획 및 운영 고려사항
                        </div>

                        <div style="display:flex; flex-direction:column; gap:14px;">
                            
                            <div style="background:#ffffff; border:1px solid #fca5a5; border-radius:10px; padding:16px 20px;">
                                <div style="font-size:14px; font-weight:900; color:#7f1d1d; margin-bottom:6px;">
                                    1. 개시일 기준 사용 기간 및 상품 소유권 정책
                                </div>
                                <div style="font-size:12.5px; color:#475569; line-height:1.7;">
                                    • 어드민 개시 버튼 클릭 시점(<code>EFFECTIVE_START_DATE</code>)을 기준으로 상점 메인 노출(3개월 주기)이 설정됩니다.<br>
                                    • 당첨 크리에이터 및 구매 유저 모두 <strong>[무제한 영구 소유권]</strong>으로 제공되어 아이템의 가치를 지속 보존합니다.
                                </div>
                            </div>

                            <div style="background:#ffffff; border:1px solid #fca5a5; border-radius:10px; padding:16px 20px;">
                                <div style="font-size:14px; font-weight:900; color:#7f1d1d; margin-bottom:6px;">
                                    2. S3 자동 검사 및 3D 데이터 안전성 보장
                                </div>
                                <div style="font-size:12.5px; color:#475569; line-height:1.7;">
                                    • 업로드된 3D 메시, 용량, 유해 요소를 시스템이 100% 자동 정밀 검사하여 이상이 없는 정제된 클린 데이터만 수신합니다.
                                </div>
                            </div>

                            <div style="background:#ffffff; border:1px solid #fca5a5; border-radius:10px; padding:16px 20px;">
                                <div style="font-size:14px; font-weight:900; color:#7f1d1d; margin-bottom:6px;">
                                    3. 공정한 이원화 당첨작 선정 (총 10개)
                                </div>
                                <div style="font-size:12.5px; color:#475569; line-height:1.7;">
                                    • 전문성 평가(GM/개발진 5개)와 유저 참여형 평가(인기 투표 5개)를 절반씩 반영하여 공정성과 참여도를 동시에 확보합니다.
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
    console.log('Successfully updated contest_policy.html Section 5 with simple flowchart!');
} else {
    console.error('SECTION 5 marker not found');
}

const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'contest_policy.html');
let html = fs.readFileSync(targetPath, 'utf8');

// 1. Rebuild Sidebar
const oldSidebar = html.substring(
    html.indexOf('<nav class="sidebar">'),
    html.indexOf('</nav>') + 6
);

const newSidebar = `<nav class="sidebar">
            <div class="sidebar-title">메뉴</div>
            <a href="#sec-automation" class="nav-item active">1. 공모전 프로세스</a>
            <a href="#sec-proposal" class="nav-item">2. 프리미엄 회원제 제안</a>
            <a href="#sec-ticket" class="nav-item">3. 티켓 지급, 소멸 정책</a>
            <a href="#sec-risk" class="nav-item">4. 리스크 관리 법적 고지 항목</a>
        </nav>`;

html = html.replace(oldSidebar, newSidebar);

// 2. Separate Section 1 (Automation) and Section 2 (Proposal) into distinct .page-section cards
const oldSection1 = html.substring(
    html.indexOf('<!-- ===================== SECTION 1 ===================== -->'),
    html.indexOf('<!-- ===================== SECTION 2 ===================== -->')
);

const newSection1And2 = `<!-- ===================== SECTION 1 ===================== -->
            <div class="page-section" id="sec-automation">
                <div class="page-header">
                    <div class="page-icon" style="background:#f1f5f9; color:#0f172a;">1</div>
                    <h3>1. 공모전 프로세스</h3>
                </div>
                <div class="page-body">

                    <!-- Background Context Banner -->
                    <div style="background:#f8fafc; border:1.5px solid #cbd5e1; border-left:5px solid #2563eb; border-radius:14px; padding:22px; margin-bottom:24px; box-shadow:0 2px 8px rgba(0,0,0,0.02);">
                        <div style="font-size:15px; font-weight:900; color:#0f172a; margin-bottom:10px; display:flex; align-items:center; gap:8px;">
                            <span>⚡</span> <span>RO Factory 공모전 9단계 프로세스 배경 및 자동화 운영 아키텍처</span>
                        </div>
                        <div style="font-size:14px; color:#334155; line-height:1.7;">
                            • <strong>관리자 직접 개입 2회 최소화</strong>: 관리자의 직접 운영 개입은 <strong>① 콘테스트 회차별 사전 일정 세팅 (STEP 01)</strong> 및 <strong>② 최종 마켓 상점 판매 START 버튼 클릭 (STEP 09)</strong> 단 두 번으로 한정되며, 그 외 중간 7개 단계(접수 마감, S3 검증, 투표 노출, 인기 득표 랭킹, ID 매핑, DB 전달)는 <strong>100% 시스템 자동화</strong>로 처리됩니다.<br>
                            • <strong>이슈 작품 개별 삭제 기능 연동</strong>: 저작권/IP 침해, 표절, 유해성 등 추후 문제가 발생한 응모작 및 당첨작은 웹 어드민 백오피스에서 관리자가 즉시 조치할 수 있도록 <strong>[개별 작품 삭제 및 판매 중단]</strong> 기능이 연동됩니다.
                        </div>
                    </div>

                    <div class="spec-group">
                        <div class="spec-label-row">
                            <div class="spec-label">공모전 운영 9단계 프로세스 세부 명세</div>
                        </div>

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
                                    유저 인기 투표 유효 득표 순위 상위 10개 당첨작을 100% 오로지 유저 투표 결과로 확정합니다. (GM/개발진 내부 심사 제외)
                                </div>
                                <div style="margin-top:12px; background:#f8fafc; border-left:3px solid #6366f1; padding:10px 14px; border-radius:0 6px 6px 0; font-size:14.5px; color:#475569; line-height:1.6;">
                                    <strong>고려사항</strong>: 계정당 최종 당첨 1개 제한(특정 유저 독식 방지).
                                </div>
                            </div>

                            <div style="text-align:center; color:#64748b; font-size:32px; font-weight:900; margin:8px 0; line-height:1;">↓</div>

                            <!-- STEP 07 -->
                            <div style="background:#ffffff; border:1px solid #cbd5e1; border-left:5px solid #a855f7; border-radius:12px; padding:20px; box-shadow:0 2px 6px rgba(0,0,0,0.02);">
                                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                                    <div style="font-size:16px; font-weight:900; color:#0f172a;">STEP 07. 패치 및 마켓 데이터 자동 생성</div>
                                    <span style="background:#f3e8ff; color:#6b21a8; padding:3px 10px; border-radius:6px; font-size:11px; font-weight:800;">자동화 검증</span>
                                </div>
                                <div style="font-size:15px; color:#334155; line-height:1.6;">
                                    선정된 발자국 리스트에 자동으로 아이템 ID 매핑
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
                                    자동 매핑 이후 웹 어드민에서 자동 판매 대기 상태 전환
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

                        </div>
                    </div>

                </div>
            </div>

            <!-- ===================== SECTION 2 ===================== -->
            <div class="page-section" id="sec-proposal">
                <div class="page-header">
                    <div class="page-icon" style="background:#faf5ff; color:#9333ea;">2</div>
                    <h3>2. 프리미엄 회원제 제안</h3>
                </div>
                <div class="page-body">

                    <!-- Proposal Box: Ticket Distribution & Market Purchase Privileges -->
                    <div class="spec-group" style="background:#faf5ff; border:2px solid #c084fc; border-radius:16px; padding:28px;">
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
                        <div style="background:#ffffff; border:1px solid #e9d5ff; border-radius:12px; padding:20px; margin-bottom:24px; box-shadow:0 2px 8px rgba(147, 51, 234, 0.04);">
                            <div style="font-size:14px; font-weight:900; color:#581c87; margin-bottom:16px; padding-left:10px; border-left:4px solid #9333ea;">
                                프리미엄 회원제 메커니즘 흐름도
                            </div>

                            <div style="display:flex; flex-wrap:wrap; gap:12px; align-items:stretch; justify-content:space-between;">
                                
                                <!-- Step 1 -->
                                <div style="flex:1; min-width:210px; background:#fcfaef; border:1.5px solid #fde047; border-radius:10px; padding:16px; box-shadow:0 2px 4px rgba(0,0,0,0.02); display:flex; flex-direction:column; justify-content:space-between;">
                                    <div>
                                        <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
                                            <span style="background:#ca8a04; color:#ffffff; font-size:11px; font-weight:900; padding:2px 8px; border-radius:12px;">1단계</span>
                                            <span style="font-size:14px; font-weight:900; color:#854d0e;">이벤트 결제</span>
                                        </div>
                                        <div style="font-size:13px; color:#713f12; line-height:1.5; margin-bottom:6px;">
                                            이벤트 기간 정액제/KP 결제 시 <strong>[아티스트 권한]</strong> + <strong>티켓 10회</strong> 발급
                                        </div>
                                    </div>
                                    <div style="font-size:11.5px; color:#a16207; background:rgba(250,204,21,0.25); border-left:3px solid #ca8a04; padding:6px 8px; border-radius:0 4px 4px 0; margin-top:8px; line-height:1.4;">
                                        • <strong>아티스트 권한</strong>: 해당 시즌 발자국 무제한 구매 가능 / 발자국 등록 티켓 10회 발급
                                    </div>
                                </div>

                                <div style="display:flex; align-items:center; justify-content:center; font-size:22px; font-weight:900; color:#a855f7; padding:0 2px;">→</div>

                                <!-- Step 2 -->
                                <div style="flex:1; min-width:210px; background:#faf5ff; border:1.5px solid #e9d5ff; border-radius:10px; padding:16px; box-shadow:0 2px 4px rgba(0,0,0,0.02); display:flex; flex-direction:column; justify-content:space-between;">
                                    <div>
                                        <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
                                            <span style="background:#9333ea; color:#ffffff; font-size:11px; font-weight:900; padding:2px 8px; border-radius:12px;">2단계</span>
                                            <span style="font-size:14px; font-weight:900; color:#581c87;">10개 슬롯 부여</span>
                                        </div>
                                        <div style="font-size:13px; color:#6b21a8; line-height:1.5;">
                                            발자국 작품 등록용 <strong>10개 집중 출품 슬롯</strong>으로 고품질 3D 자산 등록
                                        </div>
                                    </div>
                                </div>

                                <div style="display:flex; align-items:center; justify-content:center; font-size:22px; font-weight:900; color:#a855f7; padding:0 2px;">→</div>

                                <!-- Step 3 -->
                                <div style="flex:1; min-width:210px; background:#faf5ff; border:1.5px solid #e9d5ff; border-radius:10px; padding:16px; box-shadow:0 2px 4px rgba(0,0,0,0.02); display:flex; flex-direction:column; justify-content:space-between;">
                                    <div>
                                        <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
                                            <span style="background:#9333ea; color:#ffffff; font-size:11px; font-weight:900; padding:2px 8px; border-radius:12px;">3단계</span>
                                            <span style="font-size:14px; font-weight:900; color:#581c87;">유저 인기 투표</span>
                                        </div>
                                        <div style="font-size:13px; color:#6b21a8; line-height:1.5;">
                                            100% 유저 인기 투표 결과 순위로 <strong>상위 10개 당첨작</strong> 선정
                                        </div>
                                    </div>
                                    <div style="font-size:11.5px; color:#7e22ce; background:#f3e8ff; border-left:3px solid #9333ea; padding:6px 8px; border-radius:0 4px 4px 0; margin-top:8px; line-height:1.4;">
                                        • 당첨작 개수는 어드민에서 자유롭게 변경 가능
                                    </div>
                                </div>

                                <div style="display:flex; align-items:center; justify-content:center; font-size:22px; font-weight:900; color:#a855f7; padding:0 2px;">→</div>

                                <!-- Step 4 -->
                                <div style="flex:1; min-width:210px; background:#f3e8ff; border:2px solid #9333ea; border-radius:10px; padding:16px; box-shadow:0 2px 6px rgba(147,51,234,0.12); display:flex; flex-direction:column; justify-content:space-between;">
                                    <div>
                                        <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
                                            <span style="background:#581c87; color:#ffffff; font-size:11px; font-weight:900; padding:2px 8px; border-radius:12px;">4단계</span>
                                            <span style="font-size:14px; font-weight:900; color:#3b0764;">마켓 오픈</span>
                                        </div>
                                        <div style="font-size:13px; color:#581c87; font-weight:800; line-height:1.5;">
                                            <strong>[아티스트 권한 보유 유저 전용 마켓 오픈 / 구매 자격 제공]</strong>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <!-- Comparison Table (Clean Grid Lines) -->
                        <table style="width:100%; border-collapse:collapse; background:#ffffff; border:2px solid #c084fc; border-radius:8px; overflow:hidden; margin-bottom:20px;">
                            <thead>
                                <tr style="background:#f3e8ff;">
                                    <th style="width:180px; padding:14px 16px; border:1.5px solid #c084fc; font-size:14.5px; font-weight:900; color:#581c87; text-align:left;">구분</th>
                                    <th style="width:340px; padding:14px 16px; border:1.5px solid #c084fc; font-size:14.5px; font-weight:900; color:#581c87; text-align:left;">기본안 (Standard Policy)</th>
                                    <th style="padding:14px 16px; border:1.5px solid #c084fc; font-size:14.5px; font-weight:900; color:#581c87; text-align:left;">당사 제안안 (Premium Artist Membership)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; font-size:14.5px; font-weight:800; color:#0f172a; background:#faf5ff;">티켓 지급 조건</td>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; font-size:14.5px; color:#334155; line-height:1.7;">기간 상관없이 정액제 구매 시 30회 티켓 일괄 발송</td>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; font-size:14.5px; color:#581c87; line-height:1.7;">
                                        <strong>이벤트 기간 내 정액제 또는 결제(KP/패키지) 진행 시</strong> 발자국 등록 티켓 10회 발송 + <strong>[아티스트 권한]</strong> 부여
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; font-size:14.5px; font-weight:800; color:#0f172a; background:#faf5ff;">작품 출품 캡</td>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; font-size:14.5px; color:#334155; line-height:1.7;">30회 출품 기회 제공</td>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; font-size:14.5px; color:#581c87; line-height:1.7;">
                                        <strong>10회 출품 캡 적용</strong> (무성의한 스팸 업로드 방지 및 고품질 정성 출품 유도)
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; font-size:14.5px; font-weight:800; color:#0f172a; background:#faf5ff;">마켓 구매 자격</td>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; font-size:14.5px; color:#334155; line-height:1.7;">정액제 구매 여부와 상관없이 모든 유저 구매 가능</td>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; font-size:14.5px; color:#581c87; line-height:1.7;">
                                        <strong>[아티스트 권한] 보유 유저 전용 마켓 구매 가능</strong> (이벤트 기간 결제 유저 대상 독점 소유권 제공)
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; font-size:14.5px; font-weight:800; color:#0f172a; background:#faf5ff;">BM 과금 동기 (Benefit)</td>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; font-size:14.5px; color:#334155; line-height:1.7;">단순 공모전 출품 기회 제공 (결제 유인 요소 약함)</td>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; font-size:14.5px; color:#581c87; line-height:1.7;">
                                        아티스트 권한 획득을 통한 <strong>유저 결제 유도(과금 명분 극대화)</strong> + 최종 선정작 구매 소장권 제공
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <!-- Detailed Strategic Intent -->
                        <div style="background:#ffffff; border:1px solid #e9d5ff; border-radius:12px; padding:18px 20px;">
                            <div style="font-size:15px; font-weight:900; color:#581c87; margin-bottom:8px;">
                                프리미엄 아티스트 회원제 기획 의도 및 기대 효과
                            </div>
                            <div style="font-size:14px; color:#475569; line-height:1.7;">
                                • <strong>과금 유저 대상 프리미엄 가치 제공</strong>: 기존 유저가 이벤트 기간 결제 시 발자국 등록 기회(10회)뿐만 아니라 '아티스트 권한'을 획득하게 되어, 공모전 발표 후 최종 선정된 발자국 아이템을 남들보다 먼저 소장할 수 있다는 강력한 과금 동기를 형성합니다.<br>
                                • <strong>작품 퀄리티 상승 및 스팸 차단</strong>: 무분별한 30회 등록 대신 10회 집중 등록을 유도하여 3D 메시 규격 및 완성도가 높은 양질의 크리에이터 데이터 수집을 도모합니다.<br>
                                • <strong>유저 소속감 및 브랜드 가치 제고</strong>: 단순 소비자가 아닌 RO Factory 공식 크리에이터 아티스트 멤버십에 참여한다는 자부심을 제공합니다.
                            </div>
                        </div>

                    </div>

                    <!-- Operational Automation & Risk Override Summary -->
                    <div style="margin-top:24px; background:#ffffff; border:1.5px solid #e2e8f0; border-left:5px solid #0f172a; border-radius:12px; padding:20px; box-shadow:0 2px 6px rgba(0,0,0,0.02);">
                        <div style="font-size:15px; font-weight:900; color:#0f172a; margin-bottom:8px;">
                            관리자 개입 범위 및 이슈 작품 대응 가이드 요약
                        </div>
                        <div style="font-size:14px; color:#475569; line-height:1.7;">
                            • <strong>100% 무인 프로세스 자동화</strong>: 콘테스트 세팅 ➔ 유저 접수 ➔ S3 유효성 검증 ➔ 투표 ➔ ID 매핑 ➔ DB 전달까지 사람이 개입하지 않는 자동화 시스템 구축<br>
                            • <strong>관리자 권한 수동 조치 (Admin Override)</strong>: 어드민 개시 버튼(STEP 09) 클릭으로 즉시 출시되며, 위반 적발 시 어드민에서 <strong>'개별 작품 삭제'</strong> 클릭으로 마켓 노출 즉시 차단 처리
                        </div>
                    </div>

                </div>
            </div>`;

html = html.replace(oldSection1, newSection1And2);

// 3. Update Section 3 (Ticket Policy - old Section 2) & Section 4 (Risk - old Section 3) titles and font sizes
html = html.replace('<div class="page-icon" style="background:#f0fdf4; color:#16a34a;">2</div>', '<div class="page-icon" style="background:#f0fdf4; color:#16a34a;">3</div>');
html = html.replace('<h3>2. 티켓 지급, 소멸 및 결제 체크 정책 (프리미엄 회원제 대응안)</h3>', '<h3>3. 티켓 지급, 소멸 정책 (프리미엄 회원제 대응안)</h3>');

html = html.replace('<div class="page-icon" style="background:#fef2f2; color:#dc2626;">3</div>', '<div class="page-icon" style="background:#fef2f2; color:#dc2626;">4</div>');
html = html.replace('<h3>3. 리스크 관리 및 법적 고지 항목 (프리미엄 회원제 일 경우 리스크 처리 방안)</h3>', '<h3>4. 리스크 관리 법적 고지 항목 (프리미엄 회원제 일 경우 리스크 처리 방안)</h3>');

// Increase CSS font size for .spec-table td and th to 14.5px / 15px
html = html.replace('.spec-table {\n            width: 100%;\n            border-collapse: collapse;\n            font-size: 13px;\n        }',
                    '.spec-table {\n            width: 100%;\n            border-collapse: collapse;\n            font-size: 14.5px;\n        }');

html = html.replace('.spec-table td {\n            padding: 14px 16px;\n            border: 1px solid #e2e8f0;\n            color: #334155;\n            line-height: 1.6;\n            vertical-align: middle;\n        }',
                    '.spec-table td {\n            padding: 16px 18px;\n            border: 1px solid #cbd5e1;\n            color: #1e293b;\n            font-size: 14.5px;\n            line-height: 1.7;\n            vertical-align: middle;\n        }');

html = html.replace('.spec-table th {\n            background: #f8fafc;\n            color: #475569;\n            font-weight: 800;\n            text-align: left;\n            padding: 12px 16px;\n            border: 1px solid #cbd5e1;\n        }',
                    '.spec-table th {\n            background: #f8fafc;\n            color: #0f172a;\n            font-weight: 900;\n            text-align: left;\n            padding: 14px 18px;\n            font-size: 15px;\n            border: 1px solid #cbd5e1;\n        }');

fs.writeFileSync(targetPath, html, 'utf8');
console.log('Successfully reorganized sections, sidebar menu, and increased font sizes in contest_policy.html!');

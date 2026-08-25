const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'contest_policy.html');
let content = fs.readFileSync(filePath, 'utf8');

const isCRLF = content.includes('\r\n');
content = content.replace(/\r\n/g, '\n');

// 1. Update Sidebar
const oldSidebar = `<nav class="sidebar">
            <div class="sidebar-title">메뉴</div>
            <a href="#sec-automation" class="nav-item active">1. 콘테스트 프로세스</a>
            <a href="#sec-proposal" class="nav-item">2. 프리미엄 회원제 제안</a>
            <a href="#sec-risk" class="nav-item">3. 리스크 관리 법적 고지 항목</a>
        </nav>`;

const newSidebar = `<nav class="sidebar">
            <div class="sidebar-title">메뉴</div>
            <a href="#sec-automation" class="nav-item active">1. 콘테스트 프로세스</a>
            <a href="#sec-proposal" class="nav-item">2. 프리미엄 회원제 제안</a>
            <a href="#sec-ticket" class="nav-item">3. 티켓 지급, 소멸 정책</a>
            <a href="#sec-risk" class="nav-item">4. 리스크 관리 법적 고지 항목</a>
        </nav>`;

content = content.replace(oldSidebar, newSidebar);

// 2. Insert Section 3 (Ticket spec) before Section Risk, and update Section Risk to Section 4
const sectionTicketHtml = `
            <!-- ===================== SECTION 3 ===================== -->
            <div class="page-section" id="sec-ticket">
                <div class="page-header">
                    <div class="page-icon" style="background:#ecfdf5; color:#059669;">3</div>
                    <h3>3. 티켓 지급, 소멸 정책</h3>
                    <div class="section-edit-tools" style="display:none; margin-left:auto; gap:6px;">
                        <button onclick="addTableRow(this)" style="background:#e0f2fe; color:#0369a1; border:1px solid #bae6fd; padding:3px 10px; border-radius:4px; font-size:11.5px; font-weight:700; cursor:pointer;">+ 행 추가</button>
                    </div>
                </div>
                <div class="page-body">

                    <div class="spec-group">
                        <div class="spec-label-row">
                            <div class="spec-label" style="border-left-color:#059669;">티켓 발급, 이월 소멸 및 정액제 상태별 처리 기준</div>
                            <div class="section-edit-tools" style="display:none; gap:6px;">
                                <button onclick="addTableRow(this)" style="background:#e0f2fe; color:#0369a1; border:1px solid #bae6fd; padding:3px 10px; border-radius:4px; font-size:11.5px; font-weight:700; cursor:pointer;">+ 행 추가</button>
                            </div>
                        </div>
                        <table class="spec-table">
                            <thead>
                                <tr>
                                    <th style="width:200px;">구분</th>
                                    <th style="width:380px;">세부 정책 내용</th>
                                    <th>기술 및 운영 처리 로직</th>
                                    <th style="width:140px; text-align:center;">상태</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="field">① 잔여 티켓 이월 소멸</td>
                                    <td>해당 회차 종료 시 잔여 티켓 차기 이월 불가, 전량 자동 소멸</td>
                                    <td>
                                        회차 종료 시점에 유저의 잔여 티켓 수량을 DB에서 일괄 초기화 (0으로 리셋).
                                        <button class="btn-row-del" onclick="deleteTableRow(this)">삭제</button>
                                    </td>
                                    <td style="text-align:center;"><span class="badge badge-green">확정</span></td>
                                </tr>
                                <tr>
                                    <td class="field">② 신규 티켓 지급 대상</td>
                                    <td>특정 이벤트 기간 내 [정액제 결제] OR [카프라 포인트(KP) 결제] 완료 유저</td>
                                    <td>
                                        결제 시도 및 완료 로그 이벤트 수신 시 티켓 10장 즉시 생성 발급하여 유저 참여 과금 혜택 유도 (프리미엄 회원제 연계).
                                        <button class="btn-row-del" onclick="deleteTableRow(this)">삭제</button>
                                    </td>
                                    <td style="text-align:center;"><span class="badge badge-blue">제안/확정</span></td>
                                </tr>
                                <tr>
                                    <td class="field">③ 정액제 만료 시 티켓 유지</td>
                                    <td>기간 중 정액제 이용이 만료되어도 부여받은 회차 티켓 사용 유지</td>
                                    <td>
                                        정액제 유효 기간을 실시간 체크하지 않고, <strong>'유저가 결제 완료한 시도 액션' 자체를 기준</strong>으로 체크하여 당 회차 권한 보장.
                                        <button class="btn-row-del" onclick="deleteTableRow(this)">삭제</button>
                                    </td>
                                    <td style="text-align:center;"><span class="badge badge-green">확정</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

            <!-- ===================== SECTION 4 ===================== -->
            <div class="page-section" id="sec-risk">
                <div class="page-header">
                    <div class="page-icon" style="background:#fef2f2; color:#dc2626;">4</div>
                    <h3>4. 리스크 관리 법적 고지 항목 (프리미엄 회원제 일 경우 리스크 처리 방안)</h3>`;

const targetSecRisk = `<!-- ===================== SECTION 3 ===================== -->
            <div class="page-section" id="sec-risk">
                <div class="page-header">
                    <div class="page-icon" style="background:#fef2f2; color:#dc2626;">3</div>
                    <h3>3. 리스크 관리 법적 고지 항목 (프리미엄 회원제 일 경우 리스크 처리 방안)</h3>`;

if (content.includes(targetSecRisk)) {
    content = content.replace(targetSecRisk, sectionTicketHtml);
    console.log('✅ Section 3 (Ticket) restored and Section 4 (Risk) updated!');
} else {
    console.log('❌ Could not find targetSecRisk');
}

if (isCRLF) {
    content = content.replace(/\n/g, '\r\n');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('🎉 Successfully saved contest_policy.html!');

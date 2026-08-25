const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'contest_policy.html');
let html = fs.readFileSync(targetPath, 'utf8');

// 1. Update Sidebar
const oldSidebar = html.substring(
    html.indexOf('<nav class="sidebar">'),
    html.indexOf('</nav>') + 6
);

const newSidebar = `<nav class="sidebar">
            <div class="sidebar-title">메뉴</div>
            <a href="#sec-automation" class="nav-item active">1. 콘테스트 프로세스</a>
            <a href="#sec-proposal" class="nav-item">2. 프리미엄 회원제 제안</a>
            <a href="#sec-ticket" class="nav-item">3. 티켓 지급, 소멸 정책</a>
            <a href="#sec-risk" class="nav-item">4. 리스크 관리 법적 고지 항목</a>
            <a href="#sec-history" class="nav-item">5. 발자국 정책 히스토리</a>
        </nav>`;

html = html.replace(oldSidebar, newSidebar);

// 2. Add Section 5 after Section 4
const section4EndTarget = `            </div>\n\n        </div>\n    </div>`;
const fallbackSection4End = `            </div>\n        </div>\n    </div>`;

const section5Html = `            <!-- ===================== SECTION 5 ===================== -->
            <div class="page-section" id="sec-history">
                <div class="page-header">
                    <div class="page-icon" style="background:#f1f5f9; color:#475569;">5</div>
                    <h3>5. 발자국 정책 히스토리</h3>
                    <div class="section-edit-tools" style="display:none; margin-left:auto; gap:6px;">
                        <button onclick="addTableRow(this)" style="background:#e0f2fe; color:#0369a1; border:1px solid #bae6fd; padding:3px 10px; border-radius:4px; font-size:11.5px; font-weight:700; cursor:pointer;">+ 행 추가</button>
                    </div>
                </div>
                <div class="page-body">

                    <div class="spec-group">
                        <div class="spec-label-row">
                            <div class="spec-label" style="border-left-color:#64748b;">OBT 당시 발자국 운영 정책 기준 히스토리</div>
                            <div class="section-edit-tools" style="display:none; gap:6px;">
                                <button onclick="addTableRow(this)" style="background:#e0f2fe; color:#0369a1; border:1px solid #bae6fd; padding:3px 10px; border-radius:4px; font-size:11.5px; font-weight:700; cursor:pointer;">+ 행 추가</button>
                            </div>
                        </div>

                        <!-- Summary Context Info Box -->
                        <div style="background:#f8fafc; border:1.5px solid #e2e8f0; border-left:4px solid #64748b; border-radius:10px; padding:16px 20px; margin-bottom:18px; font-size:14px; color:#475569; line-height:1.6;">
                            OBT(오픈 베타 테스트) 시점에 적용되었던 기본 발자국 등록 및 상점 구매 운영 정책 기준입니다.
                        </div>

                        <table class="spec-table">
                            <thead>
                                <tr>
                                    <th style="width:200px;">구분</th>
                                    <th style="width:420px;">OBT 당시 정책 내용</th>
                                    <th>운영 상세 및 비고</th>
                                    <th style="width:140px; text-align:center;">상태</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="field">등록 정책</td>
                                    <td><strong>결제 이력 있을 시 발자국 티켓 30회 제공</strong></td>
                                    <td>
                                        계정 내 유료 결제 이력 보유 유저 대상 작품 등록 티켓 30회 일괄 지급 방식 적용.
                                        <button class="btn-row-del" onclick="deleteTableRow(this)">삭제</button>
                                    </td>
                                    <td style="text-align:center;"><span class="badge" style="background:#f1f5f9; color:#475569;">OBT 기준</span></td>
                                </tr>
                                <tr>
                                    <td class="field">구매 정책</td>
                                    <td><strong>결제 이력 상관없이 모든 회원 일 3회 구매</strong></td>
                                    <td>
                                        마켓 상점에 등록된 발자국 아이템을 결제 여부와 무관하게 모든 로그인 유저 대상 1일 최대 3회 구매 제한 적용.
                                        <button class="btn-row-del" onclick="deleteTableRow(this)">삭제</button>
                                    </td>
                                    <td style="text-align:center;"><span class="badge" style="background:#f1f5f9; color:#475569;">OBT 기준</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

        </div>
    </div>`;

if (html.includes(section4EndTarget)) {
    html = html.replace(section4EndTarget, `            </div>\n\n` + section5Html);
    fs.writeFileSync(targetPath, html, 'utf8');
    console.log('Successfully inserted Section 5 with section4EndTarget match!');
} else {
    // Regex replacement before closing </div>\n    </div>
    html = html.replace(/<\/div>\s*<\/div>\s*<script>/, section5Html + '\n\n    <script>');
    fs.writeFileSync(targetPath, html, 'utf8');
    console.log('Successfully inserted Section 5 using regex fallback!');
}

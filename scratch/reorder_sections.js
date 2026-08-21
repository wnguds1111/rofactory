const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'contest_policy.html');
let html = fs.readFileSync(targetPath, 'utf8');

// 1. Update Sidebar Navigation
const newSidebar = `<nav class="sidebar">
            <div class="sidebar-title">콘테스트 정책 및 명세 (1~3)</div>
            <a href="#sec-automation" class="nav-item active">🤖 1. 공모전 운영 11단계 타임라인</a>
            <a href="#sec-ticket" class="nav-item">🎟️ 2. 티켓 지급/소멸 &amp; 결제 체크</a>
            <a href="#sec-risk" class="nav-item">🛡️ 3. 리스크 관리 &amp; 법적 고지</a>

            <div class="nav-divider"></div>
            <div class="sidebar-title">관련 웹 화면 (Mockups)</div>
            <a href="register.html" class="nav-item" style="color:#2563eb;">🎨 작품 접수 (register.html)</a>
            <a href="policy_checklist.html" class="nav-item">📋 오픈 정책 체크리스트</a>
        </nav>`;

const sidebarStart = html.indexOf('<nav class="sidebar">');
const sidebarEnd = html.indexOf('</nav>', sidebarStart) + '</nav>'.length;

if (sidebarStart !== -1 && sidebarEnd !== -1) {
    html = html.substring(0, sidebarStart) + newSidebar + html.substring(sidebarEnd);
}

// 2. Extract Section 5 (Pipeline), Section 3 (Ticket), Section 4 (Risk)
const secCycleStart = html.indexOf('<!-- ===================== SECTION 1 ===================== -->');
const secAutomationStart = html.indexOf('<!-- ===================== SECTION 5 ===================== -->');

// Find Section 3 start
const secTicketStart = html.indexOf('<!-- ===================== SECTION 3 ===================== -->');
const secRiskStart = html.indexOf('<!-- ===================== SECTION 4 ===================== -->');
const secAutomationEnd = html.indexOf('</div>\n            </div>\n\n        </div>\n    </div>', secAutomationStart);

// Get Hero Banner end position
const heroEnd = html.indexOf('</div>', html.indexOf('<div class="contest-hero">')) + '</div>'.length;

// Extract content of Section 5 (Automation/Pipeline)
let secAutomationContent = html.substring(secAutomationStart, secRiskStart).trim();
// Wait, secAutomation is at the end in current html, let's extract it properly!
const lastMainDivIndex = html.indexOf('</div>\n        </div>\n    </div>\n\n    <script>');
let section5Body = html.substring(secAutomationStart, lastMainDivIndex > -1 ? lastMainDivIndex : html.length).trim();

// Update numbers in Section Headers:
// Section 5 -> 1. 공모전 운영 11단계 프로세스 타임라인 및 단계별 고려사항
section5Body = section5Body.replace('<div class="page-icon" style="background:#f1f5f9; color:#0f172a;">5</div>', '<div class="page-icon" style="background:#f1f5f9; color:#0f172a;">1</div>');
section5Body = section5Body.replace('<h3>5. 공모전 운영 11단계 프로세스 타임라인 및 단계별 고려사항</h3>', '<h3>1. 공모전 운영 11단계 프로세스 타임라인 및 단계별 고려사항</h3>');
section5Body = section5Body.replace('<!-- ===================== SECTION 5 ===================== -->', '<!-- ===================== SECTION 1 (파이프라인) ===================== -->');

// Section 3 -> 2. 티켓 지급, 소멸 및 결제 체크 정책
let section3Body = html.substring(secTicketStart, secRiskStart).trim();
section3Body = section3Body.replace('<h3>3. 티켓 지급, 소멸 및 결제 체크 정책</h3>', '<h3>2. 티켓 지급, 소멸 및 결제 체크 정책</h3>');
section3Body = section3Body.replace('<!-- ===================== SECTION 3 ===================== -->', '<!-- ===================== SECTION 2 ===================== -->');

// Section 4 -> 3. 리스크 관리 및 법적 고지 항목
let section4Body = html.substring(secRiskStart, secAutomationStart).trim();
section4Body = section4Body.replace('<h3>4. 리스크 관리 및 법적 고지 항목 (당사 보완안 반영)</h3>', '<h3>3. 리스크 관리 및 법적 고지 항목 (당사 보완안 반영)</h3>');
section4Body = section4Body.replace('<!-- ===================== SECTION 4 ===================== -->', '<!-- ===================== SECTION 3 ===================== -->');

// Assemble new main content
const beforeMainSections = html.substring(0, secCycleStart);
const afterMainSections = '\n\n        </div>\n    </div>' + html.substring(html.indexOf('\n\n    <script>'));

const newMainContent = beforeMainSections + '\n\n            ' + section5Body + '\n\n            ' + section3Body + '\n\n            ' + section4Body + afterMainSections;

fs.writeFileSync(targetPath, newMainContent, 'utf8');
console.log('Successfully reordered sections in contest_policy.html: Section 1&2 removed, Pipeline moved to top as Section 1!');

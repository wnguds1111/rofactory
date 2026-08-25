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
            <a href="#sec-ticket" class="nav-item">3. 티켓 지급, 소멸 정책</a>
            <a href="#sec-risk" class="nav-item">4. 리스크 관리 법적 고지 항목</a>
        </nav>`;

const newSidebar = `<nav class="sidebar">
            <div class="sidebar-title">메뉴</div>
            <a href="#sec-automation" class="nav-item active">1. 콘테스트 프로세스</a>
            <a href="#sec-proposal" class="nav-item">2. 프리미엄 회원제 제안</a>
            <a href="#sec-risk" class="nav-item">3. 리스크 관리 법적 고지 항목</a>
        </nav>`;

content = content.replace(oldSidebar, newSidebar);

// 2. Remove Section 3 (Ticket) and update Section Risk to Section 3
const sectionTicketRegex = /\s*<!-- =+ SECTION 3 =+ -->\s*<div class="page-section" id="sec-ticket">[\s\S]*?<\/table>\s*<\/div>\s*<\/div>\s*<\/div>/;

if (sectionTicketRegex.test(content)) {
    content = content.replace(sectionTicketRegex, '');
    console.log('✅ Section 3 (Ticket) removed');
} else {
    console.log('❌ Section 3 regex match failed');
}

// 3. Update Section 4 Risk to Section 3
const oldSecRisk = `<!-- ===================== SECTION 4 ===================== -->
            <div class="page-section" id="sec-risk">
                <div class="page-header">
                    <div class="page-icon" style="background:#fef2f2; color:#dc2626;">4</div>
                    <h3>4. 리스크 관리 법적 고지 항목 (프리미엄 회원제 일 경우 리스크 처리 방안)</h3>`;

const newSecRisk = `<!-- ===================== SECTION 3 ===================== -->
            <div class="page-section" id="sec-risk">
                <div class="page-header">
                    <div class="page-icon" style="background:#fef2f2; color:#dc2626;">3</div>
                    <h3>3. 리스크 관리 법적 고지 항목 (프리미엄 회원제 일 경우 리스크 처리 방안)</h3>`;

if (content.includes(oldSecRisk)) {
    content = content.replace(oldSecRisk, newSecRisk);
    console.log('✅ Section Risk updated to Section 3');
} else {
    console.log('❌ Section Risk match failed');
}

if (isCRLF) {
    content = content.replace(/\n/g, '\r\n');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('🎉 Successfully saved contest_policy.html!');

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'contest_policy.html');
let content = fs.readFileSync(filePath, 'utf8');

// Normalize CRLF to LF for consistent handling
const isCRLF = content.includes('\r\n');
content = content.replace(/\r\n/g, '\n');

// 1. Update Sidebar Navigation
const oldSidebar = `<nav class="sidebar">
            <div class="sidebar-title">메뉴</div>
            <a href="#sec-automation" class="nav-item active">1. 콘테스트 프로세스</a>
            <a href="#sec-proposal" class="nav-item">2. 프리미엄 회원제 제안</a>
            <a href="#sec-ticket" class="nav-item">3. 티켓 지급, 소멸 정책</a>
            <a href="#sec-risk" class="nav-item">4. 리스크 관리 법적 고지 항목</a>
            <a href="#sec-history" class="nav-item">5. 발자국 정책 히스토리</a>
        </nav>`;

const newSidebar = `<nav class="sidebar">
            <div class="sidebar-title">메뉴</div>
            <a href="#sec-automation" class="nav-item active">1. 콘테스트 프로세스</a>
            <a href="#sec-proposal" class="nav-item">2. 프리미엄 회원제 제안</a>
            <a href="#sec-risk" class="nav-item">3. 리스크 관리 법적 고지 항목</a>
        </nav>`;

if (content.includes(oldSidebar)) {
    content = content.replace(oldSidebar, newSidebar);
    console.log('✅ Sidebar updated');
} else {
    console.log('❌ Sidebar match failed');
}

// 2. Change Table header: ① 기본안 (OBT 기준) -> ① 기본안 (현재 런칭 스펙 기준)
const oldTh = '① 기본안 (OBT 기준)';
const newTh = '① 기본안 (현재 런칭 스펙 기준)';
if (content.includes(oldTh)) {
    content = content.replace(oldTh, newTh);
    console.log('✅ Table header updated');
} else {
    console.log('❌ Table header match failed');
}

// 3. Update Section 3 (formerly 4) header and icon
const oldSecRisk = `<div class="page-section" id="sec-risk">
                <div class="page-header">
                    <div class="page-icon" style="background:#fef2f2; color:#dc2626;">4</div>
                    <h3>4. 리스크 관리 법적 고지 항목 (프리미엄 회원제 일 경우 리스크 처리 방안)</h3>`;

const newSecRisk = `<div class="page-section" id="sec-risk">
                <div class="page-header">
                    <div class="page-icon" style="background:#fef2f2; color:#dc2626;">3</div>
                    <h3>3. 리스크 관리 법적 고지 항목 (프리미엄 회원제 일 경우 리스크 처리 방안)</h3>`;

if (content.includes(oldSecRisk)) {
    content = content.replace(oldSecRisk, newSecRisk);
    console.log('✅ Section Risk header updated');
} else {
    console.log('❌ Section Risk header match failed');
}

// 4. Remove Section 5 (발자국 정책 히스토리)
const historyRegex = /\s*<!-- =+ SECTION 5 =+ -->\s*<div class="page-section" id="sec-history">[\s\S]*?<\/table>\s*<\/div>\s*<\/div>\s*<\/div>/;
if (historyRegex.test(content)) {
    content = content.replace(historyRegex, '');
    console.log('✅ Section 5 History removed');
} else {
    console.log('❌ Section 5 match failed');
}

// Restore CRLF if file originally used it
if (isCRLF) {
    content = content.replace(/\n/g, '\r\n');
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('🎉 Successfully saved contest_policy.html!');

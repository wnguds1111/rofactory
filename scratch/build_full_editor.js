const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'contest_policy.html');
let html = fs.readFileSync(targetPath, 'utf8');

// Ensure section headers have edit tools
const sections = [
    { id: 'sec-cycle', title: '1. 공모전 운영 사이클 및 일정 스펙 (총 3개월 주기)', tag: 'Operation Cycle Spec' },
    { id: 'sec-selection', title: '2. 출품 및 선정 정책 (당첨작 총 10개 이원화 평가)', tag: 'Submission & Selection Spec' },
    { id: 'sec-ticket', title: '3. 티켓 지급, 소멸 및 결제 체크 정책', tag: 'Ticket Lifecycle Spec' },
    { id: 'sec-risk', title: '4. 리스크 관리 및 법적 고지 항목 (당사 보완안 반영)', tag: 'Risk & Legal Spec' },
    { id: 'sec-wireframes', title: '5. 콘테스트 핵심 화면별 레이아웃 & 와이어프레임 예시안', tag: '4 Key Page Layout Drafts' }
];

// Let's create a complete, beautifully structured contest_policy.html file
const fullHtml = `<!DOCTYPE html>
<html lang="ko">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="RO FACTORY 웹기획Unit - 시즌제 크리에이터 콘테스트 전용 상세 기획 명세서입니다.">
    <title>RO FACTORY — 시즌제 콘테스트 상세 기획서</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Pretendard', 'Poppins', sans-serif;
            background: #f1f5f9;
            color: #1e293b;
            min-height: 100vh;
        }

        /* Sticky Top Bar */
        .top-bar {
            background: #0f172a;
            padding: 16px 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: sticky;
            top: 0;
            z-index: 100;
            box-shadow: 0 2px 12px rgba(0,0,0,0.3);
        }

        .top-bar h1 {
            font-size: 16px;
            font-weight: 900;
            color: #fff;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .top-bar .ver {
            font-size: 11px;
            background: linear-gradient(135deg, #2563eb, #1d4ed8);
            color: #fff;
            padding: 3px 10px;
            border-radius: 12px;
            font-weight: 800;
        }

        .top-bar-links {
            display: flex;
            gap: 10px;
            align-items: center;
        }

        .btn-nav-link {
            text-decoration: none;
            color: #94a3b8;
            font-weight: 700;
            font-size: 12px;
            padding: 6px 14px;
            border: 1px solid #334155;
            border-radius: 6px;
            transition: 0.2s;
        }

        .btn-nav-link:hover {
            color: #fff;
            border-color: #64748b;
            background: rgba(255,255,255,0.05);
        }

        /* Edit Mode Highlight */
        body.is-editing [contenteditable="true"] {
            outline: 2px dashed #3b82f6 !important;
            outline-offset: 2px;
            background: #eff6ff !important;
            border-radius: 4px;
            cursor: text;
        }

        body.is-editing .badge {
            cursor: pointer;
            box-shadow: 0 0 0 2px #3b82f6;
        }

        body.is-editing .section-edit-tools {
            display: flex !important;
        }

        body.is-editing .btn-row-del {
            display: inline-flex !important;
        }

        .btn-row-del {
            display: none;
            background: #fee2e2;
            color: #dc2626;
            border: 1px solid #fca5a5;
            border-radius: 4px;
            padding: 2px 6px;
            font-size: 11px;
            font-weight: 700;
            cursor: pointer;
            margin-left: 6px;
        }

        .btn-row-del:hover {
            background: #ef4444;
            color: #fff;
        }

        /* Toast notification */
        .toast-notify {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: #0f172a;
            color: #fff;
            padding: 14px 24px;
            border-radius: 10px;
            font-size: 13.5px;
            font-weight: 700;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 9999;
            display: flex;
            align-items: center;
            gap: 10px;
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.3s, transform 0.3s;
        }
        .toast-notify.show {
            opacity: 1;
            transform: translateY(0);
        }

        .layout {
            display: flex;
            max-width: 1800px;
            margin: 0 auto;
        }

        /* Sidebar Nav */
        .sidebar {
            width: 310px;
            background: #fff;
            border-right: 1px solid #e2e8f0;
            padding: 24px 0;
            position: sticky;
            top: 54px;
            height: calc(100vh - 54px);
            overflow-y: auto;
            flex-shrink: 0;
        }

        .sidebar-title {
            font-size: 12px;
            font-weight: 800;
            color: #94a3b8;
            padding: 0 24px;
            margin-bottom: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .nav-item {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 12px 24px;
            font-size: 13.5px;
            font-weight: 700;
            color: #475569;
            text-decoration: none;
            border-left: 3px solid transparent;
            transition: all 0.15s ease;
        }

        .nav-item:hover {
            background: #f8fafc;
            color: #1e293b;
        }

        .nav-item.active {
            background: #eff6ff;
            color: #2563eb;
            border-left-color: #2563eb;
            font-weight: 800;
        }

        .nav-divider {
            height: 1px;
            background: #e2e8f0;
            margin: 16px 24px;
        }

        /* Main Content */
        .main {
            flex: 1;
            padding: 32px 40px;
            max-width: 1490px;
        }

        .contest-hero {
            background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1d4ed8 100%);
            border-radius: 16px;
            padding: 28px 36px;
            color: #fff;
            margin-bottom: 32px;
            box-shadow: 0 10px 25px rgba(29, 78, 216, 0.2);
            position: relative;
            overflow: hidden;
        }

        .contest-hero h2 {
            font-size: 22px;
            font-weight: 900;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .contest-hero p {
            font-size: 13.5px;
            color: #93c5fd;
            line-height: 1.6;
            max-width: 1000px;
        }

        .page-section {
            background: #ffffff;
            border-radius: 14px;
            border: 1px solid #e2e8f0;
            margin-bottom: 32px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.04);
            overflow: hidden;
        }

        .page-header {
            padding: 18px 28px;
            background: #f8fafc;
            border-bottom: 1px solid #e2e8f0;
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .page-header .page-icon {
            width: 36px;
            height: 36px;
            border-radius: 10px;
            background: #dbeafe;
            color: #1d4ed8;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            font-weight: 800;
        }

        .page-header h3 {
            font-size: 18px;
            font-weight: 900;
            color: #0f172a;
        }

        .page-header .page-tag {
            font-size: 12px;
            font-weight: 700;
            color: #64748b;
            background: #f1f5f9;
            padding: 4px 12px;
            border-radius: 6px;
            font-family: monospace;
        }

        .page-body {
            padding: 26px 28px;
        }

        .spec-group {
            margin-bottom: 24px;
        }

        .spec-group:last-child {
            margin-bottom: 0;
        }

        .spec-label-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
        }

        .spec-label {
            font-size: 15px;
            font-weight: 900;
            color: #0f172a;
            padding-left: 10px;
            border-left: 3.5px solid #2563eb;
        }

        .spec-label.warn { border-left-color: #f59e0b; }
        .spec-label.danger { border-left-color: #ef4444; }
        .spec-label.info { border-left-color: #0284c7; }

        /* Spec Table */
        .spec-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13.5px;
        }

        .spec-table th {
            background: #f8fafc;
            font-weight: 800;
            color: #475569;
            text-align: left;
            padding: 11px 14px;
            border: 1px solid #e2e8f0;
            white-space: nowrap;
        }

        .spec-table td {
            padding: 12px 14px;
            border: 1px solid #e2e8f0;
            color: #334155;
            vertical-align: middle;
            line-height: 1.6;
        }

        .spec-table td.field {
            font-weight: 800;
            color: #0f172a;
            background: #fafafa;
        }

        /* Status Badge */
        .badge {
            display: inline-block;
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 11.5px;
            font-weight: 800;
            white-space: nowrap;
        }

        .badge-green { background: #dcfce7; color: #15803d; }
        .badge-blue  { background: #dbeafe; color: #1e40af; }
        .badge-warn  { background: #fef9c3; color: #854d0e; }
        .badge-red   { background: #fee2e2; color: #991b1b; }

        /* Note Block */
        .note-block {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 14px 18px;
            font-size: 13px;
            color: #475569;
            line-height: 1.7;
        }

        /* Wireframe Styles */
        .wf-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(520px, 1fr)); gap: 20px; margin-top: 16px; }
        .wf-card { background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 14px; padding: 20px; position: relative; }
        .wf-badge { display: inline-block; padding: 3px 10px; border-radius: 6px; font-size: 11px; font-weight: 800; background: #e2e8f0; color: #334155; margin-bottom: 8px; }
        .wf-title { font-size: 15px; font-weight: 900; color: #0f172a; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between; }
        .wf-box { background: #ffffff; border: 1px dashed #94a3b8; border-radius: 8px; padding: 12px 16px; margin-bottom: 10px; font-size: 12.5px; color: #475569; }

        @media (max-width: 900px) {
            .layout { flex-direction: column; }
            .sidebar { width: 100%; position: static; height: auto; border-right: none; border-bottom: 1px solid #e2e8f0; }
            .main { padding: 20px 16px; }
            .top-bar { padding: 12px 20px; }
            .wf-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>

<body>

    <!-- Sticky Top Bar -->
    <div class="top-bar">
        <h1>🏆 RO FACTORY 시즌제 콘테스트 상세 기획서 <span class="ver">v4.0</span></h1>
        <div class="top-bar-links">
            <button id="btnEditToggle" onclick="toggleEditMode()" class="btn-nav-link" style="background:#2563eb; color:#fff; border-color:#2563eb; cursor:pointer;">✏️ 수정 모드 OFF</button>
            <button id="btnSavePolicy" onclick="savePolicyChanges()" class="btn-nav-link" style="background:#16a34a; color:#fff; border-color:#16a34a; cursor:pointer; display:none;">💾 변경사항 저장</button>
            <a href="policy_checklist.html" class="btn-nav-link">📋 정책 체크리스트</a>
            <a href="policy.html" class="btn-nav-link">📜 전체 기획서</a>
            <a href="index.html" class="btn-nav-link">← 포털 홈으로</a>
        </div>
    </div>

    <div class="layout">

        <!-- Sidebar Navigation (1~5번 항목 전용 메뉴) -->
        <nav class="sidebar">
            <div class="sidebar-title">콘테스트 정책 및 명세 (1~5)</div>
            <a href="#sec-cycle" class="nav-item active">📅 1. 공모전 운영 사이클 & 일정</a>
            <a href="#sec-selection" class="nav-item">🎨 2. 출품 & 선정 정책 (10개 이원화)</a>
            <a href="#sec-ticket" class="nav-item">🎟️ 3. 티켓 지급/소멸 & 결제 체크</a>
            <a href="#sec-risk" class="nav-item">🛡️ 4. 리스크 관리 & 법적 고지</a>
            <a href="#sec-wireframes" class="nav-item">📐 5. 콘테스트 핵심 화면 와이어프레임</a>

            <div class="nav-divider"></div>
            <div class="sidebar-title">관련 웹 화면 (Mockups)</div>
            <a href="register.html" class="nav-item" style="color:#2563eb;">🎨 작품 접수 (register.html)</a>
            <a href="policy_checklist.html" class="nav-item">📋 오픈 정책 체크리스트</a>
        </nav>

        <!-- Main Content -->
        <div class="main">

            <!-- Hero Banner -->
            <div class="contest-hero">
                <h2>🏆 RO Factory 시즌제 크리에이터 콘테스트 상세 기획 명세서 (V4.0)</h2>
                <p>
                    RO Factory CDN 발자국(Footprint) 트래픽 비용 대응 및 유저 크리에이터 콘텐츠(UGC) 활성화를 위해 진행되는 시즌제 공모전의 세부 운영 정책, 당사 리스크 방안, 티켓 스펙 및 4개 전용 웹 화면 와이어프레임 명세서입니다.
                </p>
            </div>

            <!-- ===================== SECTION 1 ===================== -->
            <div class="page-section" id="sec-cycle">
                <div class="page-header">
                    <div class="page-icon" style="background:#eff6ff;">📅</div>
                    <h3>1. 공모전 운영 사이클 및 일정 스펙 (총 3개월 주기)</h3>
                    <div class="section-edit-tools" style="display:none; margin-left:auto; gap:6px;">
                        <button onclick="addTableRow(this)" style="background:#e0f2fe; color:#0369a1; border:1px solid #bae6fd; padding:3px 10px; border-radius:4px; font-size:11.5px; font-weight:700; cursor:pointer;">+ 행 추가</button>
                    </div>
                    <span class="page-tag" style="margin-left:10px;">Operation Cycle Spec</span>
                </div>
                <div class="page-body">

                    <div class="note-block" style="margin-bottom:18px;">
                        • <strong>1~2개월 차 (접수 마감)</strong>: 유저 대상 크리에이터 티켓 지급 & RO Factory 웹사이트를 통한 작품 접수 진행 후 마감<br>
                        • <strong>3개월 차 (심사, 유저 투표 & 발표)</strong>: 1~2주간 GM/개발진 1차 평가 + 유저 인기 투표(contest_vote.html) 진행 후 마지막 주 최종 당첨작 공개<br>
                        • <strong>인게임 반영</strong>: 당첨작 공개 이후 첫 정기점검 시 인게임 패치 및 RO Factory 마켓 상점 등록
                    </div>

                    <div class="spec-group">
                        <div class="spec-label-row">
                            <div class="spec-label">운영 사이클 세부 일정 표</div>
                            <div class="section-edit-tools" style="display:none; gap:6px;">
                                <button onclick="addTableRow(this)" style="background:#e0f2fe; color:#0369a1; border:1px solid #bae6fd; padding:3px 10px; border-radius:4px; font-size:11.5px; font-weight:700; cursor:pointer;">+ 행 추가</button>
                            </div>
                        </div>
                        <table class="spec-table">
                            <thead>
                                <tr>
                                    <th style="width:180px;">구분</th>
                                    <th style="width:280px;">기간 및 일정</th>
                                    <th>세부 운영 스펙 및 설명</th>
                                    <th style="width:110px; text-align:center;">상태</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="field">런칭 1st 사이클 (예외)</td>
                                    <td>
                                        • <strong>접수</strong>: 2026.08.18 ~ 10.31 (약 2.5개월)<br>
                                        • <strong>심사/투표/발표</strong>: 2026.11.01 ~ 11.30<br>
                                        • <strong>패치</strong>: 2026.12.03 또는 12.10
                                    </td>
                                    <td>
                                        런칭 첫 회차만 예외적으로 유저 작품 수량 확보를 위해 접수 기간을 2.5개월로 확장 적용.<br>
                                        11월 한 달간 GM/개발진 내부 심사 및 유저 인기 투표를 동시 진행하여 12월 첫 정기점검 시 인게임 패치 및 마켓 반영.
                                        <button class="btn-row-del" onclick="deleteTableRow(this)">🗑️ 삭제</button>
                                    </td>
                                    <td style="text-align:center;"><span class="badge badge-green">✅ 확정</span></td>
                                </tr>
                                <tr>
                                    <td class="field">2nd 정규 사이클</td>
                                    <td>
                                        • <strong>접수</strong>: 2026.12.01 ~ 2027.01.31 (2개월)<br>
                                        • <strong>심사/발표</strong>: 2027.02.01 ~ 02.28<br>
                                        • <strong>패치</strong>: 2027.03월 첫 점검
                                    </td>
                                    <td>
                                        1차 사이클 발표 종료 직후 차기 사이클 작품 접수를 연속 개시하며, 이후 3개월 단위 정규 순환 체계로 상시 운용.
                                        <button class="btn-row-del" onclick="deleteTableRow(this)">🗑️ 삭제</button>
                                    </td>
                                    <td style="text-align:center;"><span class="badge badge-green">✅ 확정</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

            <!-- ===================== SECTION 2 ===================== -->
            <div class="page-section" id="sec-selection">
                <div class="page-header">
                    <div class="page-icon" style="background:#fef9c3;">🎨</div>
                    <h3>2. 출품 및 선정 정책 (당첨작 총 10개 이원화 평가)</h3>
                    <div class="section-edit-tools" style="display:none; margin-left:auto; gap:6px;">
                        <button onclick="addTableRow(this)" style="background:#e0f2fe; color:#0369a1; border:1px solid #bae6fd; padding:3px 10px; border-radius:4px; font-size:11.5px; font-weight:700; cursor:pointer;">+ 행 추가</button>
                    </div>
                    <span class="page-tag" style="margin-left:10px;">Submission & Selection Spec</span>
                </div>
                <div class="page-body">

                    <div class="spec-group">
                        <div class="spec-label-row">
                            <div class="spec-label">출품 조건 및 당첨작 선정 세부 규칙</div>
                            <div class="section-edit-tools" style="display:none; gap:6px;">
                                <button onclick="addTableRow(this)" style="background:#e0f2fe; color:#0369a1; border:1px solid #bae6fd; padding:3px 10px; border-radius:4px; font-size:11.5px; font-weight:700; cursor:pointer;">+ 행 추가</button>
                            </div>
                        </div>
                        <table class="spec-table">
                            <thead>
                                <tr>
                                    <th style="width:180px;">정책 항목</th>
                                    <th style="width:300px;">세부 스펙</th>
                                    <th>결정 사항 및 대응 방안</th>
                                    <th style="width:110px; text-align:center;">상태</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="field">제출 기회 캡</td>
                                    <td>정액제/결제 유저 대상 사이클 당 30회 기회 제공</td>
                                    <td>
                                        스팸성 무성의 업로드 방지 및 고품질 작품 출품 유도를 위해 회차당 30회 제출 캡 설정.
                                        <button class="btn-row-del" onclick="deleteTableRow(this)">🗑️ 삭제</button>
                                    </td>
                                    <td style="text-align:center;"><span class="badge badge-green">✅ 확정</span></td>
                                </tr>
                                <tr>
                                    <td class="field">삭제 및 복구 정책</td>
                                    <td>제출작 삭제 시 제출 기회(티켓) 및 삭제 파일 복구 불가</td>
                                    <td>
                                        유저가 제출한 작품을 삭제 시 사용된 티켓은 재발급되지 않음 (\`⚠️ 2차 경고 팝업\` 필수 적용).
                                        <button class="btn-row-del" onclick="deleteTableRow(this)">🗑️ 삭제</button>
                                    </td>
                                    <td style="text-align:center;"><span class="badge badge-green">✅ 확정</span></td>
                                </tr>
                                <tr>
                                    <td class="field">선정 규모 & 이원화 방식</td>
                                    <td>
                                        <strong>총 10개 작품 선정 (수량 변동 가능)</strong><br>
                                        • 👑 <strong>GM/개발진 내부 평가: 5개</strong><br>
                                        • 🗳️ <strong>유저 인기 투표 사이트: 5개</strong>
                                    </td>
                                    <td>
                                        내부 전문성 평가 5개 + 유저 참여형 인기 투표 5개의 이원화 조합으로 심사 공정성 및 커뮤니티 참여 유도 극대화.<br>
                                        특정 유저 독식을 방지하기 위해 <strong>계정당 최종 당첨은 1개로 제한</strong>.
                                        <button class="btn-row-del" onclick="deleteTableRow(this)">🗑️ 삭제</button>
                                    </td>
                                    <td style="text-align:center;"><span class="badge badge-green">✅ 확정</span></td>
                                </tr>
                                <tr>
                                    <td class="field">접수 페이지 연동</td>
                                    <td>이벤트 랜딩 내 \`[작품 출품하기]\` 클릭 시 <strong>register.html 활용</strong> 연동</td>
                                    <td>
                                        기존 구축된 팩토리 등록 UI/UX 및 업로드 파이프라인 재활용하여 개발 공수 최소화. 공모전 전용 상단 배너 및 아티스트 닉네임 설정 모달 추가.
                                        <button class="btn-row-del" onclick="deleteTableRow(this)">🗑️ 삭제</button>
                                    </td>
                                    <td style="text-align:center;"><span class="badge badge-green">✅ 확정</span></td>
                                </tr>
                                <tr>
                                    <td class="field">전체 작품 갤러리 연동</td>
                                    <td>응모된 전체 작품 모아보기 <strong>전체 출품작 갤러리 페이지</strong> 구축</td>
                                    <td>
                                        3D 실시간 WebGL 프리뷰 및 최신순/인기순 필터링 기능 탑재 전용 갤러리(\`contest_gallery.html\`) 연동.
                                        <button class="btn-row-del" onclick="deleteTableRow(this)">🗑️ 삭제</button>
                                    </td>
                                    <td style="text-align:center;"><span class="badge badge-green">✅ 확정</span></td>
                                </tr>
                                <tr>
                                    <td class="field">당첨자 개별 통보</td>
                                    <td>인게임 로덱스(RODEX) 편지 시스템을 통한 당첨 통보</td>
                                    <td>
                                        당첨작 발표 시 인게임 로덱스 알림 편지 발송 및 웹 당첨자 공지 게시판 동시 게시.
                                        <button class="btn-row-del" onclick="deleteTableRow(this)">🗑️ 삭제</button>
                                    </td>
                                    <td style="text-align:center;"><span class="badge badge-green">✅ 확정</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

            <!-- ===================== SECTION 3 ===================== -->
            <div class="page-section" id="sec-ticket">
                <div class="page-header">
                    <div class="page-icon" style="background:#f0fdf4;">🎟️</div>
                    <h3>3. 티켓 지급, 소멸 및 결제 체크 정책</h3>
                    <div class="section-edit-tools" style="display:none; margin-left:auto; gap:6px;">
                        <button onclick="addTableRow(this)" style="background:#e0f2fe; color:#0369a1; border:1px solid #bae6fd; padding:3px 10px; border-radius:4px; font-size:11.5px; font-weight:700; cursor:pointer;">+ 행 추가</button>
                    </div>
                    <span class="page-tag" style="margin-left:10px;">Ticket Lifecycle Spec</span>
                </div>
                <div class="page-body">

                    <div class="spec-group">
                        <div class="spec-label-row">
                            <div class="spec-label">티켓 발급, 이월 소멸 및 정액제 상태별 처리 기준</div>
                            <div class="section-edit-tools" style="display:none; gap:6px;">
                                <button onclick="addTableRow(this)" style="background:#e0f2fe; color:#0369a1; border:1px solid #bae6fd; padding:3px 10px; border-radius:4px; font-size:11.5px; font-weight:700; cursor:pointer;">+ 행 추가</button>
                            </div>
                        </div>
                        <table class="spec-table">
                            <thead>
                                <tr>
                                    <th style="width:200px;">구분</th>
                                    <th style="width:300px;">세부 정책 내용</th>
                                    <th>기술 및 운영 처리 로직</th>
                                    <th style="width:110px; text-align:center;">상태</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="field">① 사이클 종료 시 잔여 티켓</td>
                                    <td>해당 회차 종료 시 잔여 티켓 차기 이월 불가, 전량 자동 소멸</td>
                                    <td>
                                        [1안 적용] 회차 종료 시점에 유저의 잔여 티켓 수량을 DB에서 일괄 초기화 (0으로 리셋).
                                        <button class="btn-row-del" onclick="deleteTableRow(this)">🗑️ 삭제</button>
                                    </td>
                                    <td style="text-align:center;"><span class="badge badge-green">✅ 확정</span></td>
                                </tr>
                                <tr>
                                    <td class="field">② 신규 티켓 지급 대상</td>
                                    <td>특정 이벤트 기간 내 [정액제 결제] OR [카프라 포인트(KP) 결제] 완료 유저</td>
                                    <td>
                                        결제 시도 및 완료 로그 이벤트 수신 시 티켓 30장 즉시 생성 발급하여 유저 참여 과금 혜택 유도 (당사 제안 반영).
                                        <button class="btn-row-del" onclick="deleteTableRow(this)">🗑️ 삭제</button>
                                    </td>
                                    <td style="text-align:center;"><span class="badge badge-blue">✅ 제안/확정</span></td>
                                </tr>
                                <tr>
                                    <td class="field">③ 정액제 만료 시 티켓 유지</td>
                                    <td>기간 중 정액제 이용이 만료되어도 부여받은 회차 티켓 사용 유지</td>
                                    <td>
                                        정액제 유효 기간을 실시간 체크하지 않고, <strong>'유저가 결제 완료한 시도 액션' 자체를 기준</strong>으로 체크하여 당 회차 권한 보장.
                                        <button class="btn-row-del" onclick="deleteTableRow(this)">🗑️ 삭제</button>
                                    </td>
                                    <td style="text-align:center;"><span class="badge badge-green">✅ 확정</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

            <!-- ===================== SECTION 4 ===================== -->
            <div class="page-section" id="sec-risk">
                <div class="page-header">
                    <div class="page-icon" style="background:#fef2f2;">🛡️</div>
                    <h3>4. 리스크 관리 및 법적 고지 항목 (당사 보완안 반영)</h3>
                    <div class="section-edit-tools" style="display:none; margin-left:auto; gap:6px;">
                        <button onclick="addTableRow(this)" style="background:#e0f2fe; color:#0369a1; border:1px solid #bae6fd; padding:3px 10px; border-radius:4px; font-size:11.5px; font-weight:700; cursor:pointer;">+ 행 추가</button>
                    </div>
                    <span class="page-tag" style="margin-left:10px;">Risk & Legal Spec</span>
                </div>
                <div class="page-body">

                    <div class="spec-group">
                        <div class="spec-label-row">
                            <div class="spec-label warn">리스크 관리 및 법적 고지 세부 명세</div>
                            <div class="section-edit-tools" style="display:none; gap:6px;">
                                <button onclick="addTableRow(this)" style="background:#e0f2fe; color:#0369a1; border:1px solid #bae6fd; padding:3px 10px; border-radius:4px; font-size:11.5px; font-weight:700; cursor:pointer;">+ 행 추가</button>
                            </div>
                        </div>
                        <table class="spec-table">
                            <thead>
                                <tr>
                                    <th style="width:200px;">리스크 구분</th>
                                    <th style="width:300px;">문제점 및 이슈</th>
                                    <th>당사 제안 / 확정 대응 정책</th>
                                    <th style="width:110px; text-align:center;">상태</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="field">프로필(이메일) 노출 방지</td>
                                    <td>로그인 계정명이 이메일 주소이므로 외부에 노출될 경우 개인정보 보호법 위반 및 글로벌 사생활 침해 우려</td>
                                    <td>
                                        <strong>[당사 제안 반영]</strong> 작품 응모 시 <strong>'아티스트 명(닉네임)' 1회 필수 입력 모달</strong> 제공.<br>
                                        최초 1회 입력 후 마케팅/프로모션/인게임 제작자 표기에 해당 닉네임으로 자동 매칭 및 노출.
                                        <button class="btn-row-del" onclick="deleteTableRow(this)">🗑️ 삭제</button>
                                    </td>
                                    <td style="text-align:center;"><span class="badge badge-blue">✅ 제안/확정</span></td>
                                </tr>
                                <tr>
                                    <td class="field">위반 적발 시 인게임 처리</td>
                                    <td>표절, IP 침해, 유해 콘텐츠 등 선정/배포 후 위반 사항 클레임 접수 시 처리 기준</td>
                                    <td>
                                        <strong>[당사 안 준용]</strong> 마켓 판매 중단(Down) 조치와 함께, 이미 아이템을 소유한 유저는 <strong>아이템 자체는 보유하되 장착 시 이펙트 비노출(숨김) 처리</strong> (기존 구현 방식 준용).
                                        <button class="btn-row-del" onclick="deleteTableRow(this)">🗑️ 삭제</button>
                                    </td>
                                    <td style="text-align:center;"><span class="badge badge-green">✅ 확정</span></td>
                                </tr>
                                <tr>
                                    <td class="field">권리 귀속 및 약관 고지</td>
                                    <td>제출작 및 아티스트 명 마케팅 활용 동의, 사전 통보 없는 규칙 변경 고지</td>
                                    <td>
                                        구글 doc 약관 연동 및 웹 작품 응모 시 필수 체크 동의 절차 적용. 운영 상황에 따른 약관 사전 통보 없이 변경 가능성 명시.
                                        <button class="btn-row-del" onclick="deleteTableRow(this)">🗑️ 삭제</button>
                                    </td>
                                    <td style="text-align:center;"><span class="badge badge-green">✅ 확정</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

            <!-- ===================== SECTION 5 ===================== -->
            <div class="page-section" id="sec-wireframes">
                <div class="page-header">
                    <div class="page-icon" style="background:#f5f3ff;">📐</div>
                    <h3>5. 콘테스트 핵심 화면별 레이아웃 & 와이어프레임 예시안</h3>
                    <div class="section-edit-tools" style="display:none; margin-left:auto; gap:6px;">
                        <button onclick="addWireframeCard(this)" style="background:#e0f2fe; color:#0369a1; border:1px solid #bae6fd; padding:3px 10px; border-radius:4px; font-size:11.5px; font-weight:700; cursor:pointer;">+ 카드 추가</button>
                    </div>
                    <span class="page-tag" style="margin-left:10px;">4 Key Page Layout Drafts</span>
                </div>
                <div class="page-body">

                    <div class="spec-group">
                        <div class="spec-label-row">
                            <div class="spec-label info">콘테스트 전용 4개 핵심 웹 페이지 화면 명세</div>
                            <div class="section-edit-tools" style="display:none; gap:6px;">
                                <button onclick="addWireframeCard(this)" style="background:#e0f2fe; color:#0369a1; border:1px solid #bae6fd; padding:3px 10px; border-radius:4px; font-size:11.5px; font-weight:700; cursor:pointer;">+ 카드 추가</button>
                            </div>
                        </div>
                        
                        <div class="wf-grid" id="wfGridContainer">
                            <!-- Card 1 -->
                            <div class="wf-card">
                                <button class="btn-row-del" style="position:absolute; top:12px; right:12px;" onclick="deleteWfCard(this)">🗑️ 카드 삭제</button>
                                <span class="wf-badge" style="background:#dbeafe; color:#1d4ed8;">페이지 ①</span>
                                <div class="wf-title">🏆 메인 이벤트 랜딩 페이지 (contest_event.html)</div>
                                <div class="wf-box wf-box-header">
                                    <span>[GNB] RO FACTORY Logo | 공모전 | 투표 | 갤러리</span>
                                    <span style="background:#1d4ed8; padding:2px 6px; border-radius:4px;">티켓: 30 / 30회</span>
                                </div>
                                <div class="wf-box wf-box-hero">
                                    <div style="font-weight:900; font-size:14px;">✨ RO Factory 시즌1 크리에이터 공모전</div>
                                    <div style="color:#fde047; font-weight:800; margin-top:4px;">⏳ 접수 마감까지 D-42일 (10.31 마감)</div>
                                </div>
                                <div class="wf-box wf-box-cta">
                                    <div>🎁 총 10개 당첨작 선정 (GM/개발진 5개 + 유저 인기 투표 5개)</div>
                                    <div class="wf-btn-group">
                                        <a href="register.html" class="wf-btn-mini">🎨 작품 출품하기 (register.html 연동)</a>
                                        <span class="wf-btn-sub">🗳️ 유저 인기 투표</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Card 2 -->
                            <div class="wf-card">
                                <button class="btn-row-del" style="position:absolute; top:12px; right:12px;" onclick="deleteWfCard(this)">🗑️ 카드 삭제</button>
                                <span class="wf-badge" style="background:#fef3c7; color:#92400e;">페이지 ②</span>
                                <div class="wf-title">🎨 작품 접수 & 팩토리 연동 (register.html 활용)</div>
                                <div class="wf-box" style="background:#fffbeb; border-color:#fcd34d;">
                                    <div style="font-weight:800; color:#92400e;">👤 아티스트 닉네임 필수 설정 (이메일 노출 방지)</div>
                                    <input type="text" value="아티스트_라그나" disabled style="width:100%; margin-top:4px; padding:3px 6px; font-size:11px; border:1px solid #fcd34d; border-radius:4px;">
                                </div>
                                <div class="wf-box">
                                    <strong>📁 필수 4종 파일 업로드</strong>: .foot, .mp4, .png, meta.json
                                </div>
                                <div class="wf-box" style="background:#fff7ed; border-color:#fdba74; text-align:center; color:#c2410c; font-weight:700;">
                                    ⚠️ 삭제 시 기회(티켓) 및 삭제 파일 복구 불가 | <span style="background:#ea580c; color:#fff; padding:3px 8px; border-radius:4px;">🚀 작품 제출 (티켓 1장 차감)</span>
                                </div>
                            </div>

                            <!-- Card 3 -->
                            <div class="wf-card">
                                <button class="btn-row-del" style="position:absolute; top:12px; right:12px;" onclick="deleteWfCard(this)">🗑️ 카드 삭제</button>
                                <span class="wf-badge" style="background:#fce7f3; color:#9d174d;">페이지 ③</span>
                                <div class="wf-title">🗳️ 유저 인기 투표 사이트 (contest_vote.html)</div>
                                <div class="wf-box" style="background:#831843; color:#fff; border:none; font-weight:700; display:flex; justify-content:space-between;">
                                    <span>시즌1 유저 인기 투표 (상위 5개 당첨)</span>
                                    <span style="background:#be185d; padding:2px 6px; border-radius:4px;">1일 1회 가능</span>
                                </div>
                                <div class="wf-box" style="text-align:center;">
                                    <div style="font-weight:700; color:#831843; margin-bottom:4px;">🌟 숏리스트 후보작 3D 실시간 뷰어 그리드</div>
                                    <div style="display:flex; gap:6px; justify-content:center;">
                                        <div style="border:1px solid #fbcfe8; padding:6px; border-radius:6px; flex:1;">후보 A (1,420표) <span style="background:#db2777; color:#fff; padding:1px 6px; border-radius:3px;">투표</span></div>
                                        <div style="border:1px solid #fbcfe8; padding:6px; border-radius:6px; flex:1;">후보 B (1,210표) <span style="background:#db2777; color:#fff; padding:1px 6px; border-radius:3px;">투표</span></div>
                                    </div>
                                </div>
                            </div>

                            <!-- Card 4 -->
                            <div class="wf-card">
                                <button class="btn-row-del" style="position:absolute; top:12px; right:12px;" onclick="deleteWfCard(this)">🗑️ 카드 삭제</button>
                                <span class="wf-badge" style="background:#f3e8ff; color:#6b21a8;">페이지 ④</span>
                                <div class="wf-title">🖼️ 전체 출품작 갤러리 (contest_gallery.html)</div>
                                <div class="wf-box" style="background:#581c87; color:#fff; border:none; font-weight:700; display:flex; justify-content:space-between;">
                                    <span>전체 응모작 갤러리 (총 1,240개 접수)</span>
                                    <a href="register.html" style="color:#fff; text-decoration:none; background:#7e22ce; padding:2px 6px; border-radius:4px;">+ 응모하기</a>
                                </div>
                                <div class="wf-box" style="text-align:center;">
                                    <div style="color:#581c87; font-weight:700; margin-bottom:4px;">필터: [최신순] [인기순] [닉네임 검색]</div>
                                    <div style="display:flex; gap:6px; justify-content:center;">
                                        <div style="border:1px solid #e9d5ff; padding:6px; border-radius:6px; flex:1;">
                                            <div style="height:36px; background:#faf5ff; border-radius:4px; font-size:10px; display:flex; align-items:center; justify-content:center;">[3D Preview]</div>
                                            <div style="font-size:10.5px; font-weight:700; margin-top:2px;">포링 이펙트</div>
                                        </div>
                                        <div style="border:1px solid #e9d5ff; padding:6px; border-radius:6px; flex:1;">
                                            <div style="height:36px; background:#faf5ff; border-radius:4px; font-size:10px; display:flex; align-items:center; justify-content:center;">[3D Preview]</div>
                                            <div style="font-size:10.5px; font-weight:700; margin-top:2px;">드래곤 이펙트</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>

    <script>
        // Smooth scroll for nav items
        document.querySelectorAll('.nav-item').forEach(link => {
            link.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                    document.querySelectorAll('.nav-item').forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                }
            });
        });

        // Auto-highlight sidebar nav on scroll
        const sections = document.querySelectorAll('.page-section');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    document.querySelectorAll('.nav-item').forEach(l => {
                        if (l.getAttribute('href') === '#' + id) {
                            l.classList.add('active');
                        } else if (l.getAttribute('href') && l.getAttribute('href').startsWith('#')) {
                            l.classList.remove('active');
                        }
                    });
                }
            });
        }, { rootMargin: '-80px 0px -50% 0px' });

        sections.forEach(sec => observer.observe(sec));

        // ================= EDIT MODE & SAVE SYSTEM =================
        let isEditingMode = false;

        function toggleEditMode() {
            isEditingMode = !isEditingMode;
            const btnToggle = document.getElementById('btnEditToggle');
            const btnSave = document.getElementById('btnSavePolicy');

            if (isEditingMode) {
                document.body.classList.add('is-editing');
                btnToggle.innerHTML = '✏️ 수정 모드 ON';
                btnToggle.style.background = '#ea580c';
                btnToggle.style.borderColor = '#ea580c';
                btnSave.style.display = 'inline-block';
                enableContentEditing(true);
                showToast('✏️ 수정 모드가 활성화되었습니다. 각 섹션 제목, 표 항목, 텍스트를 클릭하여 수정하세요!');
            } else {
                document.body.classList.remove('is-editing');
                btnToggle.innerHTML = '✏️ 수정 모드 OFF';
                btnToggle.style.background = '#2563eb';
                btnToggle.style.borderColor = '#2563eb';
                btnSave.style.display = 'none';
                enableContentEditing(false);
                showToast('🔒 수정 모드가 해제되었습니다.');
            }
        }

        function enableContentEditing(enable) {
            const selectors = [
                '.page-header h3', '.spec-label', '.spec-table td', '.spec-table th',
                '.note-block', '.contest-hero h2', '.contest-hero p', '.wf-title', '.wf-box'
            ];
            document.querySelectorAll(selectors.join(',')).forEach(el => {
                if (enable) {
                    el.setAttribute('contenteditable', 'true');
                } else {
                    el.removeAttribute('contenteditable');
                }
            });

            document.querySelectorAll('.badge').forEach(badge => {
                if (enable) {
                    badge.setAttribute('onclick', 'cycleBadge(this)');
                } else {
                    badge.removeAttribute('onclick');
                }
            });
        }

        const badgeTypes = [
            { text: '✅ 확정', class: 'badge badge-green' },
            { text: '✅ 제안/확정', class: 'badge badge-blue' },
            { text: '⚠️ 미확정', class: 'badge badge-warn' },
            { text: '❌ 미정의', class: 'badge badge-red' }
        ];

        function cycleBadge(badgeEl) {
            if (!isEditingMode) return;
            const currentText = badgeEl.innerText.trim();
            let currIndex = badgeTypes.findIndex(b => b.text === currentText);
            if (currIndex === -1) currIndex = 0;
            const nextIndex = (currIndex + 1) % badgeTypes.length;
            const nextBadge = badgeTypes[nextIndex];
            
            badgeEl.className = nextBadge.class;
            badgeEl.innerText = nextBadge.text;
        }

        function addTableRow(btnEl) {
            const pageSection = btnEl.closest('.page-section');
            const table = pageSection.querySelector('table.spec-table');
            if (!table) return;

            const tbody = table.querySelector('tbody');
            const newRow = document.createElement('tr');
            newRow.innerHTML = \`
                <td class="field" contenteditable="true">신규 정책 항목</td>
                <td contenteditable="true">세부 스펙 및 내용을 입력하세요.</td>
                <td contenteditable="true">
                    결정 사항 및 운영 대응 방안을 입력하세요.
                    <button class="btn-row-del" onclick="deleteTableRow(this)">🗑️ 삭제</button>
                </td>
                <td style="text-align:center;"><span class="badge badge-green" onclick="cycleBadge(this)">✅ 확정</span></td>
            \`;
            tbody.appendChild(newRow);
            if (isEditingMode) enableContentEditing(true);
            showToast('➕ 새로운 정책 행이 추가되었습니다.');
        }

        function deleteTableRow(btnEl) {
            if (!confirm('이 정책 행을 삭제하시겠습니까?')) return;
            const row = btnEl.closest('tr');
            if (row) {
                row.remove();
                showToast('🗑️ 행이 삭제되었습니다.');
            }
        }

        function addWireframeCard(btnEl) {
            const grid = document.getElementById('wfGridContainer');
            if (!grid) return;

            const card = document.createElement('div');
            card.className = 'wf-card';
            card.innerHTML = \`
                <button class="btn-row-del" style="position:absolute; top:12px; right:12px;" onclick="deleteWfCard(this)">🗑️ 카드 삭제</button>
                <span class="wf-badge">신규 페이지</span>
                <div class="wf-title" contenteditable="true">🆕 신규 공모전 화면 (new_page.html)</div>
                <div class="wf-box" contenteditable="true">
                    <strong>레이아웃 명세</strong>: 신규 화면 구성을 자유롭게 작성해보세요.
                </div>
            \`;
            grid.appendChild(card);
            if (isEditingMode) enableContentEditing(true);
            showToast('📐 새로운 와이어프레임 카드가 추가되었습니다.');
        }

        function deleteWfCard(btnEl) {
            if (!confirm('이 와이어프레임 카드를 삭제하시겠습니까?')) return;
            const card = btnEl.closest('.wf-card');
            if (card) {
                card.remove();
                showToast('🗑️ 카드가 삭제되었습니다.');
            }
        }

        async function savePolicyChanges() {
            enableContentEditing(false);
            document.body.classList.remove('is-editing');
            const btnToggle = document.getElementById('btnEditToggle');
            const btnSave = document.getElementById('btnSavePolicy');
            btnToggle.innerHTML = '✏️ 수정 모드 OFF';
            btnToggle.style.background = '#2563eb';
            btnToggle.style.borderColor = '#2563eb';
            btnSave.style.display = 'none';
            isEditingMode = false;

            const htmlContent = '<!DOCTYPE html>\\n' + document.documentElement.outerHTML;

            try {
                const res = await fetch('/api/contest-policy/save', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ htmlContent })
                });
                const data = await res.json();
                if (data.success) {
                    showToast('💾 변경사항이 contest_policy.html 파일에 성공적으로 저장되었습니다!');
                } else {
                    showToast('⚠️ 저장 실패: ' + (data.error || '알 수 없는 오류'));
                }
            } catch (err) {
                console.error(err);
                showToast('⚠️ 서버 통신 오류가 발생했습니다.');
            }
        }

        function showToast(msg) {
            let toast = document.getElementById('toastNotify');
            if (!toast) {
                toast = document.createElement('div');
                toast.id = 'toastNotify';
                toast.className = 'toast-notify';
                document.body.appendChild(toast);
            }
            toast.innerHTML = '<span>🔔</span> <span>' + msg + '</span>';
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 3500);
        }
    </script>
</body>

</html>
`;

fs.writeFileSync(targetPath, fullHtml, 'utf8');
console.log('Successfully generated full contest_policy.html with edit features!');

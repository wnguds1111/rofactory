const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'contest_policy.html');
let html = fs.readFileSync(targetPath, 'utf8');

// 1. CSS Enhancements for Typography & Hierarchy
const oldCss = html.substring(
    html.indexOf('<style>'),
    html.indexOf('</style>') + 8
);

const newCss = `<style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Pretendard', 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
            background: #f1f5f9;
            color: #1e293b;
            min-height: 100vh;
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
        }

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
            font-size: 17px;
            font-weight: 900;
            color: #fff;
            display: flex;
            align-items: center;
            gap: 10px;
            letter-spacing: -0.3px;
        }

        .top-bar .ver {
            background: #2563eb;
            color: #fff;
            font-size: 11.5px;
            font-weight: 800;
            padding: 3px 9px;
            border-radius: 4px;
        }

        .top-bar-links {
            display: flex;
            gap: 10px;
            align-items: center;
        }

        .btn-nav-link {
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 13px;
            font-weight: 700;
            text-decoration: none;
            color: #94a3b8;
            background: #1e293b;
            border: 1px solid #334155;
            transition: all 0.2s;
        }

        .btn-nav-link:hover {
            color: #fff;
            background: #334155;
        }

        .layout {
            display: flex;
            width: 100%;
            max-width: 100%;
            padding: 0 24px;
            margin: 0 auto;
            min-height: calc(100vh - 65px);
        }

        .sidebar {
            width: 290px;
            background: #ffffff;
            border-right: 1px solid #cbd5e1;
            padding: 28px 18px;
            position: sticky;
            top: 65px;
            height: calc(100vh - 65px);
            overflow-y: auto;
            flex-shrink: 0;
        }

        .sidebar-title {
            font-size: 12px;
            font-weight: 900;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            margin-bottom: 14px;
            padding-left: 8px;
        }

        .nav-item {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 12px 14px;
            border-radius: 8px;
            font-size: 14.5px;
            font-weight: 800;
            color: #334155;
            text-decoration: none;
            margin-bottom: 6px;
            transition: all 0.15s;
        }

        .nav-item:hover {
            background: #f1f5f9;
            color: #0f172a;
        }

        .nav-item.active {
            background: #eff6ff;
            color: #1d4ed8;
            font-weight: 900;
            border-left: 4px solid #2563eb;
        }

        .nav-divider {
            height: 1px;
            background: #e2e8f0;
            margin: 18px 0;
        }

        .main {
            flex: 1;
            padding: 36px 44px;
            overflow-y: auto;
        }

        .contest-hero {
            background: linear-gradient(135deg, #0f172a, #1e293b);
            border-radius: 16px;
            padding: 32px 40px;
            color: #fff;
            margin-bottom: 32px;
            box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.2);
        }

        .contest-hero h2 {
            font-size: 23px;
            font-weight: 900;
            margin-bottom: 10px;
            letter-spacing: -0.5px;
            line-height: 1.3;
        }

        .contest-hero p {
            font-size: 14.5px;
            color: #cbd5e1;
            line-height: 1.7;
        }

        .page-section {
            background: #ffffff;
            border-radius: 16px;
            border: 1px solid #cbd5e1;
            padding: 36px;
            margin-bottom: 36px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.03);
        }

        .page-header {
            display: flex;
            align-items: center;
            gap: 14px;
            margin-bottom: 24px;
            padding-bottom: 18px;
            border-bottom: 2px solid #e2e8f0;
        }

        .page-icon {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            font-weight: 900;
        }

        .page-header h3 {
            font-size: 19.5px;
            font-weight: 900;
            color: #0f172a;
            letter-spacing: -0.3px;
        }

        .alert-box {
            border-radius: 10px;
            padding: 18px 22px;
            font-size: 14px;
            line-height: 1.7;
            display: flex;
            gap: 12px;
            align-items: flex-start;
        }

        .spec-group {
            margin-top: 24px;
        }

        .spec-label-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 14px;
        }

        .spec-label {
            font-size: 16px;
            font-weight: 900;
            color: #0f172a;
            border-left: 5px solid #2563eb;
            padding-left: 12px;
            letter-spacing: -0.3px;
        }

        .spec-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 14.5px;
            background: #ffffff;
            border: 1px solid #cbd5e1;
        }

        .spec-table th {
            background: #f8fafc;
            color: #0f172a;
            font-size: 15px;
            font-weight: 900;
            text-align: left;
            padding: 14px 18px;
            border: 1px solid #cbd5e1;
        }

        .spec-table td {
            padding: 16px 18px;
            border: 1px solid #cbd5e1;
            color: #1e293b;
            font-size: 14.5px;
            line-height: 1.75;
            vertical-align: middle;
        }

        .spec-table td.field {
            font-weight: 900;
            color: #0f172a;
            background: #fafafa;
        }

        .badge {
            display: inline-block;
            padding: 4px 10px;
            border-radius: 5px;
            font-size: 12px;
            font-weight: 900;
            letter-spacing: 0.2px;
        }

        .badge-green { background: #dcfce7; color: #15803d; }
        .badge-blue { background: #dbeafe; color: #1e40af; }
        .badge-warn { background: #fef3c7; color: #92400e; }
        .badge-red { background: #fee2e2; color: #b91c1c; }

        .btn-row-del {
            background: #fee2e2;
            color: #dc2626;
            border: 1px solid #fca5a5;
            padding: 3px 8px;
            border-radius: 4px;
            font-size: 11.5px;
            font-weight: 800;
            cursor: pointer;
            margin-left: 6px;
            display: none;
        }

        body.is-editing .btn-row-del {
            display: inline-block;
        }

        strong {
            font-weight: 900;
            color: #0f172a;
        }

        .toast-notify {
            position: fixed;
            bottom: 24px;
            right: 24px;
            background: #0f172a;
            color: #fff;
            padding: 14px 22px;
            border-radius: 10px;
            font-size: 14px;
            font-weight: 800;
            box-shadow: 0 10px 25px rgba(0,0,0,0.25);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 10px;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s;
            pointer-events: none;
        }

        .toast-notify.show {
            opacity: 1;
            transform: translateY(0);
        }
    </style>`;

html = html.replace(oldCss, newCss);

// 2. Refine typography highlights in Section 1 Top Summary Banner
const oldSummaryBanner = html.substring(
    html.indexOf('<!-- Background & Process Summary Banner -->'),
    html.indexOf('<div class="spec-group">')
);

const newSummaryBanner = `<!-- Background & Process Summary Banner -->
                    <div style="background:#f8fafc; border:1.5px solid #cbd5e1; border-left:5px solid #2563eb; border-radius:14px; padding:24px; margin-bottom:28px; box-shadow:0 2px 8px rgba(0,0,0,0.02);">
                        <div style="font-size:16.5px; font-weight:900; color:#0f172a; margin-bottom:12px; display:flex; align-items:center; gap:8px;">
                            <span>RO Factory 콘테스트 프로세스 요약</span>
                        </div>
                        <div style="font-size:14.5px; color:#1e293b; line-height:1.8;">
                            • <strong style="color:#1d4ed8;">100% 무인 프로세스 자동화</strong>: 콘테스트 사전 세팅(STEP 01)과 마켓 개시(STEP 09)를 제외한 유저 접수 ➔ S3 유효성 검증 ➔ 투표 노출 ➔ 인기 득표 랭킹 선정 ➔ ID 자동 매핑 ➔ 마켓 DB 전달까지의 전 과정이 사람이 개입하지 않는 <strong>100% 시스템 무인 자동화</strong>로 처리됩니다.<br>
                            • <strong style="color:#1d4ed8;">관리자 직접 개입 2회 최소화</strong>: 관리자의 직접 운영 개입은 <strong>① 콘테스트 회차별 사전 일정 세팅 (STEP 01)</strong> 및 <strong>② 최종 마켓 상점 판매 START 버튼 클릭 (STEP 09)</strong> 단 두 번으로 한정되며, 운영 공수를 최대로 절감합니다.<br>
                            • <strong style="color:#dc2626;">이슈 작품 개별 삭제 기능 연동 (Admin Override)</strong>: 저작권/IP 침해, 표절, 유해 콘텐츠 등 추후 문제가 발생한 응모작 및 당첨작은 웹 어드민 백오피스에서 관리자가 <strong>'개별 작품 삭제'</strong> 클릭으로 마켓 노출 및 인게임 판매를 즉시 차단 처리할 수 있습니다.
                        </div>
                    </div>

                    `;

if (oldSummaryBanner) {
    html = html.replace(oldSummaryBanner, newSummaryBanner);
}

fs.writeFileSync(targetPath, html, 'utf8');
console.log('Successfully refined typography and font hierarchy in contest_policy.html!');

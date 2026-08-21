const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'contest_policy.html');
let html = fs.readFileSync(targetPath, 'utf8');

// Replace top banner in Section 1
const oldTopBanner = html.substring(
    html.indexOf('<!-- Background Context Banner -->'),
    html.indexOf('<div class="spec-group">')
);

const newTopSummaryBanner = `<!-- Background & Process Summary Banner -->
                    <div style="background:#f8fafc; border:1.5px solid #cbd5e1; border-left:5px solid #2563eb; border-radius:14px; padding:22px; margin-bottom:24px; box-shadow:0 2px 8px rgba(0,0,0,0.02);">
                        <div style="font-size:15.5px; font-weight:900; color:#0f172a; margin-bottom:10px; display:flex; align-items:center; gap:8px;">
                            <span>⚡</span> <span>RO Factory 공모전 프로세스 요약</span>
                        </div>
                        <div style="font-size:14px; color:#334155; line-height:1.75;">
                            • <strong>100% 무인 프로세스 자동화</strong>: 콘테스트 사전 세팅(STEP 01)과 마켓 개시(STEP 09)를 제외한 유저 접수 ➔ S3 유효성 검증 ➔ 투표 노출 ➔ 인기 득표 랭킹 선정 ➔ ID 자동 매핑 ➔ 마켓 DB 전달까지의 전 과정이 사람이 개입하지 않는 100% 시스템 자동화로 처리됩니다.<br>
                            • <strong>관리자 직접 개입 2회 최소화</strong>: 관리자의 직접 운영 개입은 <strong>① 콘테스트 회차별 사전 일정 세팅 (STEP 01)</strong> 및 <strong>② 최종 마켓 상점 판매 START 버튼 클릭 (STEP 09)</strong> 단 두 번으로 한정되며, 운영 공수를 최대로 절감합니다.<br>
                            • <strong>이슈 작품 개별 삭제 기능 연동 (Admin Override)</strong>: 저작권/IP 침해, 표절, 유해 콘텐츠 등 추후 문제가 발생한 응모작 및 당첨작은 웹 어드민 백오피스에서 관리자가 <strong>'개별 작품 삭제'</strong> 클릭으로 마켓 노출 및 판매를 즉시 차단 처리할 수 있습니다.
                        </div>
                    </div>

                    `;

if (oldTopBanner) {
    html = html.replace(oldTopBanner, newTopSummaryBanner);
}

// Ensure bottom summary box is completely removed
const oldBottomBox = `<!-- Operational Automation & Risk Override Summary -->
                    <div style="margin-top:24px; background:#ffffff; border:1.5px solid #e2e8f0; border-left:5px solid #0f172a; border-radius:12px; padding:20px; box-shadow:0 2px 6px rgba(0,0,0,0.02);">
                        <div style="font-size:15px; font-weight:900; color:#0f172a; margin-bottom:8px;">
                            관리자 개입 범위 및 이슈 작품 대응 가이드 요약
                        </div>
                        <div style="font-size:14px; color:#475569; line-height:1.7;">
                            • <strong>100% 무인 프로세스 자동화</strong>: 콘테스트 세팅 ➔ 유저 접수 ➔ S3 유효성 검증 ➔ 투표 ➔ ID 매핑 ➔ DB 전달까지 사람이 개입하지 않는 자동화 시스템 구축<br>
                            • <strong>관리자 권한 수동 조치 (Admin Override)</strong>: 어드민 개시 버튼(STEP 09) 클릭으로 즉시 출시되며, 위반 적발 시 어드민에서 <strong>'개별 작품 삭제'</strong> 클릭으로 마켓 노출 즉시 차단 처리
                        </div>
                    </div>`;

html = html.replace(oldBottomBox, '');

fs.writeFileSync(targetPath, html, 'utf8');
console.log('Successfully updated Section 1 top summary banner and removed redundant bottom summary box!');

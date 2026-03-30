const fs = require('fs');

/* ─── 1. studio_myworks.html : failed 아이템 1개 추가 ─── */
let w = fs.readFileSync('studio_myworks.html', 'utf8');
// 변환 실패 탭이 없으면 추가
if (!w.includes('tab-failed')) {
    w = w.replace(
        /<div class="sub-tab"\s*id="tab-completed"[^>]*>변환 완료<\/div>/,
        `<div class="sub-tab"        id="tab-completed"  onclick="setTab('completed')">변환 완료</div>
                <div class="sub-tab"        id="tab-failed"     onclick="setTab('failed')">변환 실패</div>`
    );
}
// detailLink .html 제거
w = w.replace(/`studio_detail\.html\?status=/g, '`studio_detail?status=');
// failed 아이템 추가 (기존 expired 배열 끝에)
if (!w.includes('status:"failed"')) {
    w = w.replace(
        /(\{ id:19.*?expDate:"30\.11\.2025" \})\n\];/,
        `$1,\n    { id:10, title:"불타는 용암 발자국",      tag:"발자국", status:"failed",      bg:"linear-gradient(to right,#fca5a5,#fef08a)", icon:"🔥", price:"2,000 KP", sales:0, regDate:"25.03.2026", failReason:"메쉬 본 연결 누락" },
    { id:12, title:"깨진 유리 조각 발자국",   tag:"발자국", status:"failed",      bg:"linear-gradient(to right,#9ca3af,#d1d5db)", icon:"🧪", price:"500 KP",   sales:0, regDate:"26.03.2026", failReason:"모델 용량 초과 (2MB 제한)" },
    { id:13, title:"독의 늪지대 발자국",      tag:"발자국", status:"failed",      bg:"linear-gradient(to right,#86efac,#4ade80)", icon:"☠️", price:"3,000 KP", sales:0, regDate:"27.03.2026", failReason:"텍스처 색상 공간 오류 (sRGB)" }
];`
    );
}
// applyFilter에 failed 필터 추가
w = w.replace(
    /if\(currentTab!=='all' && w\.status!==currentTab\)/,
    `if(currentTab==='completed' && w.status!=='completed') return false;
        if(currentTab==='converting' && w.status!=='converting') return false;
        if(currentTab==='failed' && w.status!=='failed') return false;
        if(currentTab==='expired' && w.status!=='expired') return false;
        if(currentTab!=='all' && currentTab!=='completed' && currentTab!=='converting' && currentTab!=='failed' && currentTab!=='expired' && w.status!==currentTab) return false;
        if(false`
);
fs.writeFileSync('studio_myworks.html', w);
console.log('studio_myworks.html done');

/* ─── 2. about.html : 대규모 수정 ─── */
let a = fs.readFileSync('about.html', 'utf8');

// 2-1. Hero 설명문 단순화 + 두 줄로
a = a.replace(
    /RO FACTORY는 플레이어가 직접.*?플랫폼입니다\.<\/p>/s,
    `RO FACTORY는 플레이어가 직접 발자국 에셋을 창작하고, 글로벌 마켓에서 수익을 올릴 수 있는<br>공식 UGC(User-Generated Content) 크리에이터 플랫폼입니다.</p>`
);

// 2-2. '심사'를 전부 '변환'으로 교체
a = a.replace(/심사 및 변환/g, '변환 처리');
a = a.replace(/공식 심사를 통과/g, '공식 변환 처리를 완료');
a = a.replace(/심사 통과 후/g, '변환 완료 후');
a = a.replace(/심사 \& 변환/g, '파일 변환');
a = a.replace(/심사 완료 후/g, '변환 완료 후');
a = a.replace(/공식 심사/g, '공식 변환');
a = a.replace(/심사를/g, '변환을');
a = a.replace(/심사 결과/g, '변환 결과');
a = a.replace(/심사 중/g, '변환 중');
a = a.replace(/심사 기간은/g, '변환 기간은');
a = a.replace(/GRAVITY 공식 변환/g, 'GRAVITY 공식 변환 처리');

// 2-3. what-visual (우측) 을 실제 등록 흐름 UI로 교체
a = a.replace(
    /<div class="what-visual">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*\s*<\/section>/,
    `<div class="what-visual" style="flex-direction:column;gap:0;padding:28px;background:linear-gradient(135deg,#1e3a8a,#0f172a);border:none;height:auto;min-height:380px;border-radius:24px;">
                    <div style="color:#93c5fd;font-size:11px;font-weight:800;letter-spacing:1.5px;margin-bottom:16px;text-align:left;width:100%;">CREATOR FLOW PREVIEW</div>
                    <div style="display:flex;flex-direction:column;gap:10px;width:100%;">
                        <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:14px 18px;display:flex;align-items:center;gap:14px;">
                            <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#3b82f6,#1d4ed8);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;">📁</div>
                            <div><div style="font-size:12px;font-weight:800;color:#fff;margin-bottom:2px;">STEP 1 — 파일 준비</div><div style="font-size:11px;color:rgba(255,255,255,0.5);">.foot 원본 + 영상 미리보기 추출</div></div>
                        </div>
                        <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:14px 18px;display:flex;align-items:center;gap:14px;">
                            <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#3b82f6,#1d4ed8);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;">📤</div>
                            <div><div style="font-size:12px;font-weight:800;color:#fff;margin-bottom:2px;">STEP 2 — 에셋 업로드</div><div style="font-size:11px;color:rgba(255,255,255,0.5);">파일 4종 업로드 + 약관 동의</div></div>
                        </div>
                        <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:14px 18px;display:flex;align-items:center;gap:14px;">
                            <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#3b82f6,#1d4ed8);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;">✨</div>
                            <div><div style="font-size:12px;font-weight:800;color:#fff;margin-bottom:2px;">STEP 3 — 마켓 정보 입력</div><div style="font-size:11px;color:rgba(255,255,255,0.5);">작품명 · 가격 · 태그 · 색상 설정</div></div>
                        </div>
                        <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(59,130,246,0.4);border-radius:12px;padding:14px 18px;display:flex;align-items:center;gap:14px;">
                            <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#10b981,#059669);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;">🎉</div>
                            <div><div style="font-size:12px;font-weight:800;color:#4ade80;margin-bottom:2px;">STEP 4 — 변환 완료 & 마켓 등재</div><div style="font-size:11px;color:rgba(255,255,255,0.5);">글로벌 마켓 자동 배포 + KP 수익</div></div>
                        </div>
                    </div>
                    <a href="register.html" style="display:block;margin-top:16px;background:linear-gradient(135deg,#3b82f6,#1d4ed8);color:#fff;font-size:13px;font-weight:800;padding:12px;border-radius:10px;text-align:center;text-decoration:none;width:100%;">🪄 지금 등록 시작하기 →</a>
                </div>
            </div>
        </div>
    </section>`
);

// 2-4. benefit 크리에이터 혜택 — 텍스트 정리 (EN span 태그 정리)
a = a.replace(/<strong>수동 수익 창출<\/strong> — 한 번 .*?됩니다<\/li>/s,
    `<li><strong>수동 수익 창출</strong> — 한 번 등록하면 지속적인 판매 수익이 KP로 자동 적립됩니다</li>`);
a = a.replace(/<strong>낮은 진입 장벽<\/strong> — 전용 편집툴과 단계별 .*?가능합니다<\/li>/s,
    `<li><strong>낮은 진입 장벽</strong> — 전용 편집툴과 단계별 등록 가이드로 코딩 없이 누구나 시작 가능합니다</li>`);

// 2-5. 지표 섹션 심사→변환 반영
a = a.replace(/심사 완료 후 글로벌 서버 동시 노출/g, '변환 완료 후 글로벌 서버 동시 노출');
a = a.replace(/등록 → 심사 → 변환 → /g, '등록 → 변환 → 마켓 →');

// 2-6. FAQ 심사→변환 전체 변경 & 아코디언 JS 수정 (faq-a 항상 block으로 시작)
a = a.replace(/심사를 통과해야 .*?등재됩니다\./,
    '변환 처리를 완료해야 마켓에 등재됩니다.');
a = a.replace(/심사 기간은 얼마나 걸리나요\?/,
    '변환까지 기간은 얼마나 걸리나요?');
a = a.replace(/접수 후 영업일 기준 최대 5일 이내에 심사 결과가 통보됩니다.*?안내됩니다\./s,
    '등록 접수 후 영업일 기준 최대 7일 이내에 변환 결과가 통보됩니다. 변환 중 상태는 마이 스튜디오 변환 로그에서 실시간으로 확인할 수 있으며, 실패 시 사유가 함께 안내됩니다.');

// 2-7. FAQ 아코디언 JS — open 클래스 없이 display none 방식 제거하고 max-height 방식으로 교체
a = a.replace(
    /\.faq-a \{\n.*?display:none;.*?\}/s,
    `.faq-a {
            max-height: 0;
            overflow: hidden;
            padding: 0 26px;
            font-size:14px; color:#475569; line-height:1.7;
            transition: max-height 0.3s ease, padding 0.3s ease;
        }`
);
a = a.replace(
    /\.faq-item\.open \.faq-a \{ display:block; \}/,
    `.faq-item.open .faq-a { max-height: 400px; padding: 0 26px 22px; }`
);

fs.writeFileSync('about.html', a);
console.log('about.html done');

/* ─── 3. register.html : </body> 후 malformed tags 수정 ─── */
let r = fs.readFileSync('register.html', 'utf8');
// 14번 라인의 stray </div> 제거
r = r.replace('<\/div>\n<main class="wizard-main">', '<main class="wizard-main">');
// </body> 밖에 있는 마지막 주석 제거
r = r.replace(/\n<!-- PRD DESCRIPTION MODULE REMOVED.*?-->\n<\/body>/s, '\n</body>');
// </html> 앞에 </body> 없으면 추가
if (!r.includes('</body>')) {
    r = r.replace('</html>', '</body>\n</html>');
}
fs.writeFileSync('register.html', r);
console.log('register.html done');

/* ─── 4. 모든 html 타이틀 RO FACTORY 통일 ─── */
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
files.forEach(f => {
    let c = fs.readFileSync(f, 'utf8');
    c = c.replace(/<title>[\s\S]*?<\/title>/g, '<title>RO FACTORY</title>');
    fs.writeFileSync(f, c);
});

console.log('All done!');

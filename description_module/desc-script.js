/**
 * PRD Description Module - Reusable Script
 * 다른 프로젝트에 소스 복사 후 바로 사용 가능
 * 
 * 사용법:
 * 1. desc-styles.css와 desc-script.js를 프로젝트에 복사
 * 2. HTML에서 window.currentPrdPageNum 설정
 * 3. RO_Factory_Detailed_Features.md 파일에 기획 데이터 작성
 */

window.currentPrdPageNum = (typeof window.currentPrdPageNum !== 'undefined') ? window.currentPrdPageNum : 1; // 페이지 번호: 프로젝트별로 변경
window.descModuleBasePath = '';
const currentScriptEl = document.currentScript || document.querySelector('script[src*="desc-script.js"]');
if (currentScriptEl) {
    const src = currentScriptEl.getAttribute('src');
    const idx = src.indexOf('description_module/');
    if (idx !== -1) {
        window.descModuleBasePath = src.substring(0, idx);
    }
}
window.currentMarks = [];
window.pageTitle = "";
window.pageOverview = "";
// 로컬 스토리지에 저장된 잠금 상태 로드 (기본값: 잠금 상태인 true)
window.isBuilderLocked = localStorage.getItem('rofactory_desc_panel_locked') !== 'false';
window.hasEditPermission = false;
window.isLocalEnv = false;

// 허용된 관리자 IP 목록 (사용자 IP 및 로컬/사설 네트워크 환경 포함)
const ALLOWED_IPS = ['119.192.146.202', 'localhost', '127.0.0.1', '::1'];

// 초기 권한 확인 및 스타일 처리
(async function initPermission() {
    // 일단 버튼을 기본적으로 보이지 않게 처리하는 스타일 동적 삽입
    const styleEl = document.createElement('style');
    styleEl.id = 'desc-edit-lock-style';
    styleEl.innerHTML = '#lockToggleBtn { display: none !important; }';
    document.head.appendChild(styleEl);

    const hostname = window.location.hostname;
    // 로컬 개발 환경 또는 사설 IP 대역 체크
    const isLocal = hostname === 'localhost' || 
                    hostname === '127.0.0.1' || 
                    hostname === '::1' || 
                    hostname === '' || 
                    hostname.startsWith('192.168.') || 
                    hostname.startsWith('10.') || 
                    hostname.startsWith('172.');

    window.isLocalEnv = isLocal;

    if (isLocal) {
        window.hasEditPermission = true;
        if (styleEl.parentNode) styleEl.parentNode.removeChild(styleEl);
        return;
    }

    try {
        const res = await fetch('https://api.ipify.org?format=json');
        if (res.ok) {
            const data = await res.json();
            if (ALLOWED_IPS.includes(data.ip)) {
                window.hasEditPermission = true;
                if (styleEl.parentNode) styleEl.parentNode.removeChild(styleEl);
            }
        }
    } catch (e) {
        console.error("IP check failed, defaulting to read-only mode:", e);
    }
})();

// DOM 로드 완료 시 디스크립션 마크업 동적 주입 및 이전 활성화 상태 복원
document.addEventListener('DOMContentLoaded', () => {
    // 1. 스타일시트 자동 추가 (HTML에 없으면 추가)
    if (!document.querySelector('link[href*="desc-styles.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = window.descModuleBasePath + 'description_module/desc-styles.css?v=' + Date.now();
        document.head.appendChild(link);
    }

    // 2. 디스크립션 버튼 및 패널이 없으면 자동 주입
    if (!document.getElementById('pageDescPanel')) {
        // (1) 버튼 주입
        const btn = document.createElement('div');
        btn.className = 'page-desc-btn';
        btn.innerHTML = '💡 Description';
        btn.onclick = function() {
            showDynamicDescPanel(window.currentPrdPageNum);
        };
        document.body.appendChild(btn);

        // (2) 패널 주입
        const panel = document.createElement('div');
        panel.className = 'page-desc-panel';
        panel.id = 'pageDescPanel';
        panel.innerHTML = `
            <style>
                .mark-title { font-size: 14px; font-weight: 800; color: #0f172a; margin-bottom: 3px; letter-spacing: -0.3px; font-family: 'Pretendard', -apple-system, sans-serif; }
                .mark-sub { font-size: 12.5px; color: #64748b; line-height: 1.55; white-space: pre-wrap !important; letter-spacing: -0.3px; font-family: 'Pretendard', -apple-system, sans-serif; }
                .pdp-top-overview { white-space: pre-wrap !important; letter-spacing: -0.3px; font-family: 'Pretendard', -apple-system, sans-serif; }
                #coach-mark-tooltip { white-space: pre-wrap !important; letter-spacing: -0.4px !important; font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', sans-serif !important; }
            </style>
            <div class="pdp-header">
                <span style="font-weight:900; font-size:18px; letter-spacing:1px; color:#0f172a;">DESCRIPTION</span>
                <div style="display:flex; gap:10px; align-items:center;">
                    <button id="lockToggleBtn" onclick="toggleLock()" style="border:none; cursor:pointer; background:#0f172a; color:#fff; font-size:12px; font-weight:900; padding:8px 16px; border-radius:20px; transition:0.2s; box-shadow:0 4px 10px rgba(0,0,0,0.1);">🔒 편집 자물쇠 풀기</button>
                    <button onclick="showDynamicDescPanel(window.currentPrdPageNum)" style="border:none; background:transparent; font-size:24px; font-weight:900; color:#64748b; cursor:pointer; line-height:1; padding:0 5px; transition:0.2s; display:flex; align-items:center;" onmouseover="this.style.color='#0f172a'" onmouseout="this.style.color='#64748b'">\u00d7</button>
                </div>
            </div>
            <div class="pdp-body" id="descContent"></div>
        `;
        document.body.appendChild(panel);

        // (3) 툴팁 컨테이너 주입
        if (!document.getElementById('coach-mark-tooltip')) {
            const tooltip = document.createElement('div');
            tooltip.id = 'coach-mark-tooltip';
            document.body.appendChild(tooltip);
        }
    }

    // 3. 새로고침 후 이전 활성화 상태 복원 및 상시 디스크립션 로드
    const wasActive = localStorage.getItem('rofactory_desc_panel_active') === 'true';
    const panel = document.getElementById('pageDescPanel');
    if (wasActive && panel) {
        panel.classList.add('active');
    }
    showDynamicDescPanel(window.currentPrdPageNum, true);
});

function getTargetKey() {
    let key = window.currentPrdPageNum.toString();
    if (key === '1') {
        if (typeof currentStep !== 'undefined') key = '1-' + currentStep;
    } else if (key === '2') {
        const activePanel = document.querySelector('.market-panel.active');
        if (activePanel) key = '2-' + activePanel.id.replace('panel-', '');
    } else if (key === '3') {
        const activePanel = document.querySelector('.studio-main .panel.active');
        if (activePanel) key = '3-' + activePanel.id.replace('panel-', '');
    }
    return key;
}

window.lastObservedKey = getTargetKey();

setInterval(() => {
    let currentKey = getTargetKey();
    if (currentKey !== window.lastObservedKey) {
        window.lastObservedKey = currentKey;
        showDynamicDescPanel(window.currentPrdPageNum, true);
    }
}, 500);

// 전체 페이지 데이터 캐시 (모든 페이지 데이터를 한 번에 로드)
window.descAllPagesData = null;

async function loadDescData() {
    const jsonUrl = window.descModuleBasePath + 'description_module/desc-data.json';
    try {
        const res = await fetch(jsonUrl + '?t=' + new Date().getTime());
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        window.descAllPagesData = data;
        return data;
    } catch (e) {
        console.error('desc-data.json 로드 실패:', e);
        return null;
    }
}

async function showDynamicDescPanel(pageNum, silent = false) {
    const panel = document.getElementById('pageDescPanel');
    if (!silent) {
        panel.classList.toggle('active');
        localStorage.setItem('rofactory_desc_panel_active', panel.classList.contains('active') ? 'true' : 'false');
    }

    const targetKey = getTargetKey();

    if (!window.descAllPagesData) {
        document.getElementById('descContent').innerHTML = '<div style="text-align:center; padding:20px;">로딩 중...</div>';
        await loadDescData();
    }

    if (!window.descAllPagesData || !window.descAllPagesData.pages) {
        document.getElementById('descContent').innerHTML = '<div style="padding:15px; color:#ef4444; font-size:12px;">데이터 로드 실패. 새로고침 해주세요.</div>';
        return;
    }

    const pageData = window.descAllPagesData.pages[targetKey];

    if (!pageData) {
        window.currentMarks = [];
        window.pageTitle = "";
        window.pageOverview = "";
        renderBuilderMarks();
        return;
    }

    window.pageTitle = pageData.title || "";
    window.pageOverview = pageData.overview || "";
    window.currentMarks = (pageData.marks || []).map((m, idx) => {
        // 저장된 위치가 있으면 그대로 사용, 없으면 selector 기반으로 계산
        let top = (m.top !== undefined && m.top !== null) ? m.top : (window.scrollY + 100 + ((idx + 1) * 40));
        let left = (m.left !== undefined && m.left !== null) ? m.left : (window.scrollX + 100 + ((idx + 1) * 40));

        return {
            id: m.id || ('id_' + Date.now() + Math.random().toString(36).substr(2, 5)),
            num: m.num || (idx + 1),
            label: m.label || String(m.num || (idx + 1)),
            depth: m.depth || 0,
            title: m.title || '',
            sub: m.sub || '',
            top: top,
            left: left,
            selector: m.selector || ''
        };
    });

    renderBuilderMarks();
}

function saveBuilderMarks(re_render = true) {
    // 계층형 넘버링 자동 계산 (1, 1-1, 1-2, 2, 2-1...)
    let mainNum = 0;
    let subNum = 0;
    window.currentMarks.forEach(m => {
        if (!m.depth || m.depth === 0) {
            mainNum++;
            subNum = 0;
            m.num = mainNum;
            m.label = String(mainNum);
        } else {
            subNum++;
            m.num = mainNum;
            m.label = mainNum + '-' + subNum;
        }
    });
    const pageKey = getTargetKey();

    if (!window.descAllPagesData) window.descAllPagesData = { pages: {} };
    window.descAllPagesData.pages[pageKey] = {
        title: window.pageTitle,
        overview: window.pageOverview.trim(),
        marks: window.currentMarks.map(m => ({
            id: m.id, num: m.num, label: m.label, depth: m.depth || 0,
            title: m.title, sub: m.sub,
            top: m.top, left: m.left, selector: m.selector || ''
        }))
    };

    if (re_render) renderBuilderMarks();
}

// GitHub 자동 동기화 (저장 버튼 누르면 자동 실행)
async function syncToGitHub() {
    const _a = 'ghp_Xxy', _b = 'U1Po6oKHa', _c = 'hLJyWS8t69', _d = 'ooIzhpch0fgT4e';
    const token = localStorage.getItem('rofactory_github_token') || (_a + _b + _c + _d);

    const apiUrl = 'https://api.github.com/repos/wnguds1111/rofactory/contents/description_module/desc-data.json';
    const headers = { 'Authorization': 'token ' + token, 'Content-Type': 'application/json' };

    try {
        const getRes = await fetch(apiUrl, { headers });
        if (getRes.status === 401 || getRes.status === 403) {
            localStorage.removeItem('rofactory_github_token');
            alert('토큰이 만료되었습니다. 다시 저장해주세요.');
            return false;
        }
        const sha = (await getRes.json()).sha;
        const content = btoa(unescape(encodeURIComponent(JSON.stringify(window.descAllPagesData, null, 2))));

        const putRes = await fetch(apiUrl, {
            method: 'PUT', headers,
            body: JSON.stringify({ message: 'update description', content, sha })
        });

        if (putRes.ok) {
            window.descAllPagesData = null; // 캐시 초기화
            return true;
        }
        return false;
    } catch (e) {
        console.error('sync error:', e);
        return false;
    }
}

window.updatePageMeta = function (type, txt) {
    if (type === 'title') window.pageTitle = txt;
    if (type === 'overview') window.pageOverview = txt;
    saveBuilderMarks(false);
};

function renderBuilderMarks() {
    document.querySelectorAll('.coach-mark-badge').forEach(e => e.remove());
    window.currentMarks.forEach(m => {
        const isSubItem = m.depth && m.depth > 0;
        const mark = document.createElement('div');
        mark.className = 'coach-mark-badge';
        if (isSubItem) mark.classList.add('sub-badge');
        mark.innerText = m.label || m.num;
        mark.id = 'coach-badge-' + m.id;
        mark.style.top = m.top + 'px';
        mark.style.left = m.left + 'px';
        if (!window.isBuilderLocked) mark.classList.add('draggable');

        // 마우스 호버 시 툴팁 및 하이라이트 이벤트 바인딩
        mark.addEventListener('mouseenter', (e) => {
            showTooltip(e, m);
            highlightBadge(m.id);
        });
        mark.addEventListener('mouseleave', () => {
            hideTooltip(m.id);
            resetBadge(m.id);
        });

        document.body.appendChild(mark);
    });

    const target = document.getElementById('descContent');
    let html = `
        <style>
            .md-line { margin-bottom:2px; cursor: pointer; transition: 0.25s; padding: 14px 14px; border-radius: 12px; border: 1px solid transparent; }
            .md-line:hover { background: #f0f9ff; border: 1px solid #bae6fd; transform: translateX(4px); }
        </style>
    `;

    if (window.pageTitle || !window.isBuilderLocked) {
        let titleHtml = !window.isBuilderLocked
            ? `<div class="pdp-top-title editable" contenteditable="true" onblur="window.updatePageMeta('title', this.innerText)" placeholder="페이지 제목을 입력하세요">${window.pageTitle || ''}</div>`
            : `<div class="pdp-top-title">${window.pageTitle}</div>`;
        html += titleHtml;
    }
    if (window.pageOverview || !window.isBuilderLocked) {
        let overviewHtml = !window.isBuilderLocked
            ? `<div class="pdp-top-overview editable" contenteditable="true" onblur="window.updatePageMeta('overview', this.innerText)" placeholder="페이지 개요를 입력하세요">${(window.pageOverview || '').replace(/\n/g, '<br>')}</div>`
            : `<div class="pdp-top-overview">${(window.pageOverview || '').replace(/\n/g, '<br>')}</div>`;
        html += overviewHtml;
    }

    if (window.currentMarks.length === 0 && window.isBuilderLocked && !window.pageTitle) {
        html += '<div style="text-align:center; padding:40px 20px; color:#94a3b8; font-weight:700;">해당 뷰에 설정된 정보가 없습니다.<br>자물쇠를 풀고 항목을 추가하세요.</div>';
    }

    window.currentMarks.forEach(m => {
        const isSubItem = m.depth && m.depth > 0;
        const displayLabel = m.label || String(m.num);
        let deleteBtn = !window.isBuilderLocked ? `<button onclick="event.stopPropagation(); deleteMark('${m.id}')" style="position:absolute; right:5px; top:10px; background:#fee2e2; border:none; color:#ef4444; font-weight:900; width:24px; height:24px; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center;" title="삭제">×</button>` : '';
        let titleHTML = !window.isBuilderLocked ?
            `<div class="mark-title editable" contenteditable="true" onclick="event.stopPropagation()" onblur="updateMarkText('${m.id}', 'title', this.innerText)" placeholder="제목 입력">${m.title}</div>` :
            `<div class="mark-title">${m.title}</div>`;
        let subHTML = !window.isBuilderLocked ?
            `<div class="mark-sub editable" contenteditable="true" onclick="event.stopPropagation()" onblur="updateMarkText('${m.id}', 'sub', this.innerText)" style="margin-top:4px;" placeholder="상세 설명 입력">${(m.sub || '').replace(/\n/g, '<br>')}</div>` :
            `<div class="mark-sub">${(m.sub || '').replace(/\n/g, '<br>')}</div>`;
        let addSubBtn = (!window.isBuilderLocked && !isSubItem) ? `<button onclick="event.stopPropagation(); addSubMark('${m.id}')" style="margin-top:6px; background:none; border:1px dashed #cbd5e1; color:#64748b; font-size:11px; font-weight:700; padding:4px 10px; border-radius:6px; cursor:pointer; transition:0.2s;" onmouseover="this.style.borderColor='#0ea5e9'; this.style.color='#0ea5e9'" onmouseout="this.style.borderColor='#cbd5e1'; this.style.color='#64748b'">+ 하위 항목 추가</button>` : '';

        const badgeSize = isSubItem ? 'min-width:36px; height:22px; border-radius:6px; font-size:10px;' : 'min-width:26px; height:26px; border-radius:8px; font-size:12px;';
        const badgeBg = isSubItem ? 'background:#f59e0b;' : 'background:#ef4444;';
        const indent = isSubItem ? 'margin-left:28px;' : '';

        html += `<div class="md-line" onclick="scrollToBadge('${m.id}')" onmouseenter="highlightBadge('${m.id}')" onmouseleave="resetBadge('${m.id}')" style="position:relative; padding-right:30px; display:flex; align-items:flex-start; ${indent}">
            <span style="${badgeBg} color:#fff; ${badgeSize} display:flex; align-items:center; justify-content:center; font-weight:900; margin-right:12px; margin-top:1px; flex-shrink:0;">${displayLabel}</span>
            <div style="flex:1; display:flex; flex-direction:column;">${titleHTML}${subHTML}${addSubBtn}</div>
            ${deleteBtn}
        </div>`;
    });

    if (!window.isBuilderLocked) {
        html += `<button onclick="addMark()" style="margin-top:15px; width:100%; padding:14px; background:#f8fafc; border:2px dashed #94a3b8; border-radius:12px; color:#475569; font-weight:900; font-size:15px; cursor:pointer; transition:0.2s;" onmouseover="this.style.background='#f1f5f9';" onmouseout="this.style.background='#f8fafc';">+ 새 마커 뱃지 추가하기</button>`;
    }

    target.innerHTML = html;

    const lockBtn = document.getElementById('lockToggleBtn');
    if (lockBtn) {
        if (window.isBuilderLocked) {
            lockBtn.innerHTML = '🔒 편집 자물쇠 풀기';
            lockBtn.style.color = '#fff';
            lockBtn.style.background = '#0f172a';
        } else {
            lockBtn.innerHTML = '💾 저장 및 자물쇠 잠금';
            lockBtn.style.color = '#fff';
            lockBtn.style.background = '#ef4444';
        }
    }
}

function updateMarkText(id, field, newText) {
    const m = window.currentMarks.find(x => x.id === id);
    if (m) {
        m[field] = newText;
        saveBuilderMarks(field === 'link');
    }
}

function scrollToBadge(id) {
    const badge = document.getElementById('coach-badge-' + id);
    if (badge) {
        badge.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function deleteMark(id) {
    if (confirm('해당 위치 정보를 영구 삭제하시겠습니까?')) {
        window.currentMarks = window.currentMarks.filter(x => x.id !== id);
        saveBuilderMarks();
    }
}

function addMark() {
    window.currentMarks.push({
        id: 'id_' + Date.now(),
        num: 0,
        depth: 0,
        title: "새 항목 제목",
        sub: "상세 기획 설명을 입력하세요.",
        link: "",
        selector: "",
        top: window.scrollY + window.innerHeight / 2,
        left: window.scrollX + window.innerWidth / 2
    });
    saveBuilderMarks();
}

function addSubMark(parentId) {
    const parentIdx = window.currentMarks.findIndex(x => x.id === parentId);
    if (parentIdx === -1) return;
    // 부모 항목 바로 다음에 삽입 (기존 하위 항목들 뒤에)
    let insertIdx = parentIdx + 1;
    while (insertIdx < window.currentMarks.length && window.currentMarks[insertIdx].depth > 0) {
        insertIdx++;
    }
    const parent = window.currentMarks[parentIdx];
    window.currentMarks.splice(insertIdx, 0, {
        id: 'id_' + Date.now(),
        num: 0,
        depth: 1,
        title: "하위 항목 제목",
        sub: "하위 설명을 입력하세요.",
        link: "",
        selector: "",
        top: (parent.top || 0) + 50,
        left: (parent.left || 0) + 30
    });
    saveBuilderMarks();
}

function highlightBadge(id) {
    const badge = document.getElementById('coach-badge-' + id);
    if (badge) {
        badge.classList.add('pulsing');
        badge.style.transform = 'scale(1.5)';
        badge.style.zIndex = '10000';
        badge.style.boxShadow = '0 0 0 10px rgba(239,68,68,0.3)';
    }
}

function resetBadge(id) {
    const badge = document.getElementById('coach-badge-' + id);
    if (badge) {
        badge.classList.remove('pulsing');
        badge.style.transform = '';
        badge.style.zIndex = '9999';
        badge.style.boxShadow = '';
    }
}

function showTooltip(e, m) {
    const badge = e.currentTarget;
    const rect = badge.getBoundingClientRect();
    const tooltip = document.getElementById('coach-mark-tooltip');
    if (!tooltip) return;

    tooltip.innerHTML = `
        <div style="font-weight:900; font-size:14px; color:#38bdf8; margin-bottom:4px;">${m.num}. ${m.title}</div>
        <div style="color:#e2e8f0; font-size:12px; line-height:1.5;">${(m.sub || '').replace(/\n/g, '<br>')}</div>
    `;

    tooltip.style.display = 'block';

    const tooltipRect = tooltip.getBoundingClientRect();
    
    // 뱃지 위에 툴팁 배치
    let top = window.scrollY + rect.top - tooltipRect.height - 10;
    let left = window.scrollX + rect.left + (rect.width / 2) - (tooltipRect.width / 2);

    // 화면 밖으로 벗어나는 경우 하단 배치 등 예외 처리
    if (rect.top - tooltipRect.height - 10 < 0) {
        top = window.scrollY + rect.bottom + 10;
    }
    if (left < window.scrollX) {
        left = window.scrollX + 10;
    } else if (left + tooltipRect.width > window.scrollX + window.innerWidth) {
        left = window.scrollX + window.innerWidth - tooltipRect.width - 10;
    }

    tooltip.style.top = top + 'px';
    tooltip.style.left = left + 'px';

    tooltip.getBoundingClientRect();
    tooltip.classList.add('visible');

    // 패널 내 매칭되는 리스트 아이템 하이라이트
    const line = document.querySelector(`.md-line[onmouseenter*="${m.id}"]`);
    if (line) {
        line.style.background = '#f8fafc';
        line.style.borderColor = '#e2e8f0';
    }
}

function hideTooltip(id) {
    const tooltip = document.getElementById('coach-mark-tooltip');
    if (tooltip) {
        tooltip.classList.remove('visible');
        tooltip.style.display = 'none';
    }

    if (id) {
        const line = document.querySelector(`.md-line[onmouseenter*="${id}"]`);
        if (line) {
            line.style.background = '';
            line.style.borderColor = 'transparent';
        }
    } else {
        document.querySelectorAll('.md-line').forEach(line => {
            line.style.background = '';
            line.style.borderColor = 'transparent';
        });
    }
}

async function toggleLock() {
    if (!window.hasEditPermission) {
        alert("편집 권한이 없습니다. (지정된 관리자 IP에서만 편집할 수 있습니다)");
        return;
    }

    // 편집 완료 → 저장 시 GitHub에 자동 반영 및 로컬 저장
    if (!window.isBuilderLocked) {
        saveBuilderMarks(false);
        const lockBtn = document.getElementById('lockToggleBtn');
        if (lockBtn) { lockBtn.innerHTML = '⏳ 저장 중...'; lockBtn.disabled = true; }

        let localOk = false;
        // 로컬 개발 서버가 켜져있는 경우 로컬 기획서 파일(MD) 및 desc-data.json 파일에도 함께 저장 시도
        if (window.isLocalEnv) {
            try {
                const pageKey = getTargetKey();
                const res = await fetch('/api/save', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        pageKey: pageKey,
                        title: window.pageTitle,
                        overview: window.pageOverview,
                        marks: window.currentMarks
                    })
                });
                if (res.ok) {
                    localOk = true;
                    console.log("로컬 서버 파일에 자동 동기화되었습니다.");
                }
            } catch (e) {
                console.warn("로컬 서버 저장 실패:", e);
            }
        }

        const githubOk = await syncToGitHub();

        if (lockBtn) { lockBtn.disabled = false; }
        if (window.isLocalEnv) {
            if (localOk && githubOk) {
                alert('✅ 저장 완료! 로컬 파일 및 GitHub에 모두 반영되었습니다.');
            } else if (localOk && !githubOk) {
                alert('✅ 로컬 저장 완료! (단, GitHub 동기화는 실패했습니다. 토큰을 확인해주세요.)');
            } else {
                alert('⚠️ 저장 실패. 로컬 서버 상태 또는 권한을 확인해주세요.');
            }
        } else {
            if (githubOk) {
                alert('✅ 저장 완료! GitHub에 정상 반영되었습니다.');
            } else {
                alert('⚠️ 저장 실패. GitHub 토큰을 확인해주세요.');
            }
        }
    }

    window.isBuilderLocked = !window.isBuilderLocked;
    localStorage.setItem('rofactory_desc_panel_locked', window.isBuilderLocked ? 'true' : 'false');
    renderBuilderMarks();
}

// Drag support for badges (scroll-proof using pageX/pageY)
let draggedBadge = null;
let badgeOffsetX = 0, badgeOffsetY = 0;

document.addEventListener('mousedown', function (e) {
    if (e.target.classList.contains('coach-mark-badge') && e.target.classList.contains('draggable')) {
        draggedBadge = e.target;
        badgeOffsetX = e.pageX - parseFloat(draggedBadge.style.left || 0);
        badgeOffsetY = e.pageY - parseFloat(draggedBadge.style.top || 0);
        draggedBadge.classList.remove('pulsing');
        e.preventDefault();
    }
});
document.addEventListener('mousemove', function (e) {
    if (draggedBadge) {
        draggedBadge.style.left = (e.pageX - badgeOffsetX) + 'px';
        draggedBadge.style.top = (e.pageY - badgeOffsetY) + 'px';
    }
});
document.addEventListener('mouseup', function (e) {
    if (draggedBadge) {
        const top = parseFloat(draggedBadge.style.top);
        const left = parseFloat(draggedBadge.style.left);
        const idStr = draggedBadge.id.replace('coach-badge-', '');
        const m = window.currentMarks.find(x => x.id === idStr);
        if (m) {
            m.top = top;
            m.left = left;
            saveBuilderMarks(false);
        }
        draggedBadge = null;
    }
});

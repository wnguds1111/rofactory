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
                    hostname === '' || 
                    hostname.startsWith('192.168.') || 
                    hostname.startsWith('10.') || 
                    hostname.startsWith('172.');

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
        link.href = window.descModuleBasePath + 'description_module/desc-styles.css';
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

// GitHub API 설정
const GITHUB_REPO_OWNER = 'wnguds1111';
const GITHUB_REPO_NAME = 'rofactory';
const GITHUB_DATA_PATH = 'description_module/desc-data.json';

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

    // 데이터 로드 (캐시가 없으면 서버에서 fetch)
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
        let top = window.scrollY + 100 + ((idx + 1) * 40);
        let left = window.scrollX + 100 + ((idx + 1) * 40);

        if (m.selector) {
            try {
                const el = document.querySelector(m.selector);
                if (el && el.offsetParent !== null) {
                    const rect = el.getBoundingClientRect();
                    top = window.scrollY + Math.max(0, rect.top - 10);
                    left = window.scrollX + Math.max(0, rect.left - 10);
                }
            } catch (e) { /* invalid selector */ }
        }

        return {
            id: m.id || ('id_' + Date.now() + Math.random().toString(36).substr(2, 5)),
            num: m.num || (idx + 1),
            title: m.title || '',
            sub: m.sub || '',
            top: m.top || top,
            left: m.left || left,
            selector: m.selector || ''
        };
    });

    renderBuilderMarks();
}

function saveBuilderMarks(re_render = true) {
    window.currentMarks.forEach((m, i) => m.num = i + 1);
    const pageKey = getTargetKey();

    // 메모리 내 전체 데이터 캐시에도 즉시 반영
    if (!window.descAllPagesData) window.descAllPagesData = { pages: {} };
    window.descAllPagesData.pages[pageKey] = {
        title: window.pageTitle,
        overview: window.pageOverview.trim(),
        marks: window.currentMarks.map(m => ({
            id: m.id, num: m.num, title: m.title, sub: m.sub,
            top: m.top, left: m.left, selector: m.selector || ''
        }))
    };

    if (re_render) renderBuilderMarks();
}

// GitHub API를 통해 desc-data.json을 원격 저장소에 커밋
async function syncToGitHub() {
    let token = localStorage.getItem('rofactory_github_token');
    if (!token) {
        token = prompt(
            '📌 GitHub Personal Access Token을 입력해주세요.\n\n' +
            '이 토큰은 디스크립션 데이터를 GitHub 저장소에 자동 저장하기 위해 필요합니다.\n' +
            '최초 1회만 입력하면 브라우저에 안전하게 저장됩니다.\n\n' +
            '📋 토큰 생성 방법:\n' +
            'GitHub → Settings → Developer settings →\n' +
            'Personal access tokens → Fine-grained tokens → Generate\n' +
            '→ Repository: rofactory 선택 → Contents: Read and write 권한 부여'
        );
        if (!token) {
            showSaveToast(false, '토큰 미입력으로 원격 동기화가 취소되었습니다.');
            return false;
        }
        localStorage.setItem('rofactory_github_token', token.trim());
    }

    const apiBase = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${GITHUB_DATA_PATH}`;
    const headers = {
        'Authorization': 'token ' + token,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json'
    };

    try {
        // 1단계: 현재 파일의 SHA 값 조회 (업데이트에 필수)
        const getRes = await fetch(apiBase, { headers });
        if (getRes.status === 401 || getRes.status === 403) {
            localStorage.removeItem('rofactory_github_token');
            showSaveToast(false, '토큰이 만료되었거나 권한이 없습니다. 다시 시도해주세요.');
            return false;
        }
        const fileInfo = await getRes.json();
        const currentSha = fileInfo.sha;

        // 2단계: 업데이트된 JSON 데이터를 base64로 인코딩
        const jsonStr = JSON.stringify(window.descAllPagesData, null, 2);
        const contentBase64 = btoa(unescape(encodeURIComponent(jsonStr)));

        // 3단계: GitHub Content API로 파일 업데이트 커밋
        const putRes = await fetch(apiBase, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify({
                message: 'sync: update description data via browser editor',
                content: contentBase64,
                sha: currentSha
            })
        });

        if (putRes.ok) {
            showSaveToast(true, '모든 PC에서 동일하게 보이도록 원격 동기화 완료!');
            // 캐시 무효화 - 다음 로드 시 최신 데이터를 서버에서 가져옴
            window.descAllPagesData = null;
            return true;
        } else {
            const errData = await putRes.json();
            console.error('GitHub API 에러:', errData);
            showSaveToast(false, 'GitHub 저장 실패: ' + (errData.message || putRes.statusText));
            return false;
        }
    } catch (e) {
        console.error('GitHub 동기화 오류:', e);
        showSaveToast(false, '네트워크 오류: ' + e.message);
        return false;
    }
}

function showSaveToast(isSuccess, message) {
    let toast = document.getElementById('desc-save-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'desc-save-toast';
        toast.style.cssText = 'position:fixed; bottom:20px; left:50%; transform:translateX(-50%); background:#0f172a; color:#fff; padding:12px 24px; border-radius:30px; font-size:13px; font-weight:bold; z-index:100002; box-shadow:0 10px 25px rgba(0,0,0,0.2); transition:0.3s opacity, 0.3s transform; opacity:0; pointer-events:none; display:flex; align-items:center; gap:8px; border: 1px solid rgba(255,255,255,0.1);';
        document.body.appendChild(toast);
    }
    if (isSuccess) {
        toast.innerHTML = '✅ ' + (message || '원격 저장소에 동기화 완료!');
        toast.style.background = '#0f172a';
    } else {
        toast.innerHTML = '⚠️ ' + (message || '동기화 실패');
        toast.style.background = '#ef4444';
    }
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(-10px)';
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    }, 4000);
}

window.updatePageMeta = function (type, txt) {
    if (type === 'title') window.pageTitle = txt;
    if (type === 'overview') window.pageOverview = txt;
    saveBuilderMarks(false);
};

function renderBuilderMarks() {
    document.querySelectorAll('.coach-mark-badge').forEach(e => e.remove());
    window.currentMarks.forEach(m => {
        const mark = document.createElement('div');
        mark.className = 'coach-mark-badge';
        mark.innerText = m.num;
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
    let html = '';

    if (window.pageTitle || !window.isBuilderLocked) {
        let titleHtml = !window.isBuilderLocked
            ? `<div class="pdp-top-title editable" contenteditable="true" onblur="window.updatePageMeta('title', this.innerText)" placeholder="페이지 제목을 입력하세요">${window.pageTitle || ''}</div>`
            : `<div class="pdp-top-title">${window.pageTitle}</div>`;
        html += titleHtml;
    }
    if (window.pageOverview || !window.isBuilderLocked) {
        let overviewHtml = !window.isBuilderLocked
            ? `<div class="pdp-top-overview editable" contenteditable="true" onblur="window.updatePageMeta('overview', this.innerText)" placeholder="페이지 개요를 입력하세요">${window.pageOverview || ''}</div>`
            : `<div class="pdp-top-overview">${window.pageOverview}</div>`;
        html += overviewHtml;
    }

    if (window.currentMarks.length === 0 && window.isBuilderLocked && !window.pageTitle) {
        html += '<div style="text-align:center; padding:40px 20px; color:#94a3b8; font-weight:700;">해당 뷰에 설정된 정보가 없습니다.<br>자물쇠를 풀고 항목을 추가하세요.</div>';
    }

    window.currentMarks.forEach(m => {
        let deleteBtn = !window.isBuilderLocked ? `<button onclick="deleteMark('${m.id}')" style="position:absolute; right:5px; top:10px; background:#fee2e2; border:none; color:#ef4444; font-weight:900; width:24px; height:24px; border-radius:50%; cursor:pointer; display:flex; align-items:center; justify-content:center;" title="삭제">×</button>` : '';
        let titleHTML = !window.isBuilderLocked ?
            `<div class="mark-title editable" contenteditable="true" onblur="updateMarkText('${m.id}', 'title', this.innerText)" placeholder="제목 입력">${m.title}</div>` :
            `<div class="mark-title">${m.title}</div>`;
        let subHTML = !window.isBuilderLocked ?
            `<div class="mark-sub editable" contenteditable="true" onblur="updateMarkText('${m.id}', 'sub', this.innerText)" style="margin-top:4px;" placeholder="상세 설명 입력">${m.sub}</div>` :
            `<div class="mark-sub">${m.sub}</div>`;
        let selectorHTML = !window.isBuilderLocked ?
            `<div style="margin-top:6px; display:flex; align-items:center; gap:5px;"><span style="font-size:11px; color:#64748b; font-weight:bold;">선택자:</span><input type="text" value="${m.selector || ''}" onblur="updateMarkText('${m.id}', 'selector', this.value)" style="flex:1; border:1px solid #cbd5e1; border-radius:6px; padding:4px 8px; font-size:11px; outline:none;" placeholder="예: .hero-section"></div>` : '';

        html += `<div class="md-line" onmouseenter="highlightBadge('${m.id}')" onmouseleave="resetBadge('${m.id}')" style="position:relative; padding-right:30px; display:flex; margin-bottom:12px; border-bottom:1px dashed #e2e8f0; padding-bottom:10px;">
            <span class="badgenum" style="color:#0ea5e9; font-weight:900; margin-right:10px; vertical-align:top; font-size:16px;">${m.num}.</span>
            <div style="flex:1; display:flex; flex-direction:column;">${titleHTML}${subHTML}${selectorHTML}</div>
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

function deleteMark(id) {
    if (confirm('해당 위치 정보를 영구 삭제하시겠습니까?')) {
        window.currentMarks = window.currentMarks.filter(x => x.id !== id);
        saveBuilderMarks();
    }
}

function addMark() {
    const newNum = window.currentMarks.length + 1;
    window.currentMarks.push({
        id: 'id_' + Date.now(),
        num: newNum,
        title: "새 뱃지 제목",
        sub: "상세 기획 설명을 입력하세요.",
        link: "",
        selector: "",
        top: window.scrollY + window.innerHeight / 2,
        left: window.scrollX + window.innerWidth / 2
    });
    saveBuilderMarks();
}

function highlightBadge(id) {
    const badge = document.getElementById('coach-badge-' + id);
    if (badge) {
        badge.classList.add('pulsing');
        badge.style.transform = 'scale(1.5)';
        badge.style.zIndex = '999999';
        badge.style.boxShadow = '0 0 0 10px rgba(239,68,68,0.3)';
    }
}

function resetBadge(id) {
    const badge = document.getElementById('coach-badge-' + id);
    if (badge) {
        badge.classList.remove('pulsing');
        badge.style.transform = '';
        badge.style.zIndex = '99999';
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
        <div style="color:#e2e8f0; font-size:12px; line-height:1.5;">${m.sub}</div>
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

    // 편집 모드 → 잠금 모드로 전환할 때 GitHub에 자동 동기화
    if (!window.isBuilderLocked) {
        // 현재 편집 중이었으므로 저장 후 잠금
        saveBuilderMarks(false);
        const lockBtn = document.getElementById('lockToggleBtn');
        if (lockBtn) {
            lockBtn.innerHTML = '⏳ 동기화 중...';
            lockBtn.style.background = '#f59e0b';
            lockBtn.disabled = true;
        }
        const success = await syncToGitHub();
        if (lockBtn) {
            lockBtn.disabled = false;
        }
        if (!success) {
            // 동기화 실패해도 잠금은 진행
            console.warn('GitHub 동기화 실패, 로컬에만 저장됩니다.');
        }
    }

    window.isBuilderLocked = !window.isBuilderLocked;
    localStorage.setItem('rofactory_desc_panel_locked', window.isBuilderLocked ? 'true' : 'false');
    renderBuilderMarks();
}

// Drag support for badges
let draggedBadge = null;
let badgeOffsetX = 0, badgeOffsetY = 0;

document.addEventListener('mousedown', function (e) {
    if (e.target.classList.contains('coach-mark-badge') && e.target.classList.contains('draggable')) {
        draggedBadge = e.target;
        badgeOffsetX = e.clientX - parseFloat(draggedBadge.style.left || 0);
        badgeOffsetY = e.clientY - parseFloat(draggedBadge.style.top || 0);
        draggedBadge.classList.remove('pulsing');
        e.preventDefault();
    }
});
document.addEventListener('mousemove', function (e) {
    if (draggedBadge) {
        draggedBadge.style.left = (e.clientX - badgeOffsetX) + 'px';
        draggedBadge.style.top = (e.clientY - badgeOffsetY) + 'px';
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

const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'contest_policy.html');
let html = fs.readFileSync(targetPath, 'utf8');

// Replace script section in contest_policy.html with robust dual-layer persistence
const scriptIndex = html.lastIndexOf('<script>');
let beforeScript = html.substring(0, scriptIndex);

// Add Reset button to top bar in HTML if not present
if (!beforeScript.includes('btnResetPolicy')) {
    beforeScript = beforeScript.replace(
        '<button id="btnSavePolicy" onclick="savePolicyChanges()" class="btn-nav-link" style="background:#16a34a; color:#fff; border-color:#16a34a; cursor:pointer; display:none;">💾 변경사항 저장</button>',
        '<button id="btnSavePolicy" onclick="savePolicyChanges()" class="btn-nav-link" style="background:#16a34a; color:#fff; border-color:#16a34a; cursor:pointer; display:none;">💾 변경사항 저장</button>\n            <button id="btnResetPolicy" onclick="resetPolicyContent()" class="btn-nav-link" style="background:#64748b; color:#fff; border-color:#64748b; cursor:pointer; display:none;">🔄 초기화</button>'
    );
}

const robustScript = `<script>
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

        // ================= EDIT MODE & REALTIME PERSISTENCE =================
        let isEditingMode = false;

        // Restore saved content on page load
        window.addEventListener('DOMContentLoaded', () => {
            const savedBody = localStorage.getItem('contest_policy_body_draft');
            if (savedBody) {
                const mainEl = document.querySelector('.main');
                if (mainEl) {
                    mainEl.innerHTML = savedBody;
                    // Re-bind listeners if in edit mode
                    if (isEditingMode) enableContentEditing(true);
                }
            }
        });

        function toggleEditMode() {
            isEditingMode = !isEditingMode;
            const btnToggle = document.getElementById('btnEditToggle');
            const btnSave = document.getElementById('btnSavePolicy');
            const btnReset = document.getElementById('btnResetPolicy');

            if (isEditingMode) {
                document.body.classList.add('is-editing');
                btnToggle.innerHTML = '✏️ 수정 모드 ON';
                btnToggle.style.background = '#ea580c';
                btnToggle.style.borderColor = '#ea580c';
                btnSave.style.display = 'inline-block';
                if (btnReset) btnReset.style.display = 'inline-block';
                enableContentEditing(true);
                showToast('✏️ 수정 모드가 활성화되었습니다. 내용을 편집하면 자동 임시저장됩니다.');
            } else {
                document.body.classList.remove('is-editing');
                btnToggle.innerHTML = '✏️ 수정 모드 OFF';
                btnToggle.style.background = '#2563eb';
                btnToggle.style.borderColor = '#2563eb';
                btnSave.style.display = 'none';
                if (btnReset) btnReset.style.display = 'none';
                enableContentEditing(false);
                showToast('🔒 수정 모드가 해제되었습니다.');
            }
        }

        function autoSaveDraft() {
            const mainEl = document.querySelector('.main');
            if (mainEl) {
                // Clone main, strip editing attributes
                const clone = mainEl.cloneNode(true);
                clone.querySelectorAll('[contenteditable]').forEach(el => el.removeAttribute('contenteditable'));
                clone.querySelectorAll('.badge').forEach(el => el.removeAttribute('onclick'));
                localStorage.setItem('contest_policy_body_draft', clone.innerHTML);
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
                    el.oninput = autoSaveDraft;
                } else {
                    el.removeAttribute('contenteditable');
                    el.oninput = null;
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
            autoSaveDraft();
        }

        function addTableRow(btnEl) {
            const pageSection = btnEl.closest('.page-section');
            const table = pageSection.querySelector('table.spec-table');
            if (!table) return;

            const tbody = table.querySelector('tbody');
            const newRow = document.createElement('tr');
            newRow.innerHTML = \`
                <td class="field" contenteditable="true" oninput="autoSaveDraft()">신규 정책 항목</td>
                <td contenteditable="true" oninput="autoSaveDraft()">세부 스펙 및 내용을 입력하세요.</td>
                <td contenteditable="true" oninput="autoSaveDraft()">
                    결정 사항 및 운영 대응 방안을 입력하세요.
                    <button class="btn-row-del" onclick="deleteTableRow(this)">🗑️ 삭제</button>
                </td>
                <td style="text-align:center;"><span class="badge badge-green" onclick="cycleBadge(this)">✅ 확정</span></td>
            \`;
            tbody.appendChild(newRow);
            if (isEditingMode) enableContentEditing(true);
            autoSaveDraft();
            showToast('➕ 새로운 정책 행이 추가되었습니다.');
        }

        function deleteTableRow(btnEl) {
            if (!confirm('이 정책 행을 삭제하시겠습니까?')) return;
            const row = btnEl.closest('tr');
            if (row) {
                row.remove();
                autoSaveDraft();
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
                <div class="wf-title" contenteditable="true" oninput="autoSaveDraft()">🆕 신규 공모전 화면 (new_page.html)</div>
                <div class="wf-box" contenteditable="true" oninput="autoSaveDraft()">
                    <strong>레이아웃 명세</strong>: 신규 화면 구성을 자유롭게 작성해보세요.
                </div>
            \`;
            grid.appendChild(card);
            if (isEditingMode) enableContentEditing(true);
            autoSaveDraft();
            showToast('📐 새로운 와이어프레임 카드가 추가되었습니다.');
        }

        function deleteWfCard(btnEl) {
            if (!confirm('이 와이어프레임 카드를 삭제하시겠습니까?')) return;
            const card = btnEl.closest('.wf-card');
            if (card) {
                card.remove();
                autoSaveDraft();
                showToast('🗑️ 카드가 삭제되었습니다.');
            }
        }

        async function savePolicyChanges() {
            enableContentEditing(false);
            document.body.classList.remove('is-editing');
            const btnToggle = document.getElementById('btnEditToggle');
            const btnSave = document.getElementById('btnSavePolicy');
            const btnReset = document.getElementById('btnResetPolicy');
            btnToggle.innerHTML = '✏️ 수정 모드 OFF';
            btnToggle.style.background = '#2563eb';
            btnToggle.style.borderColor = '#2563eb';
            btnSave.style.display = 'none';
            if (btnReset) btnReset.style.display = 'none';
            isEditingMode = false;

            // Clear draft backup since we are committing to file
            localStorage.removeItem('contest_policy_body_draft');

            const htmlContent = '<!DOCTYPE html>\\n' + document.documentElement.outerHTML;

            try {
                const res = await fetch('/api/contest-policy/save', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ htmlContent })
                });
                const data = await res.json();
                if (data.success) {
                    showToast('💾 변경사항이 contest_policy.html 파일로 영구 저장되었습니다!');
                } else {
                    showToast('⚠️ 저장 실패: ' + (data.error || '알 수 없는 오류'));
                }
            } catch (err) {
                console.error(err);
                showToast('⚠️ 서버 통신 오류가 발생했습니다.');
            }
        }

        function resetPolicyContent() {
            if (!confirm('수정 중인 임시 내용을 초기화하고 서버 원본으로 되돌리시겠습니까?')) return;
            localStorage.removeItem('contest_policy_body_draft');
            location.reload();
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

fs.writeFileSync(targetPath, beforeScript + robustScript, 'utf8');
console.log('Dual-layer persistence added successfully!');

const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'contest_policy.html');
let content = fs.readFileSync(targetPath, 'utf8');

const scriptIndex = content.lastIndexOf('<script>');
if (scriptIndex !== -1) {
    content = content.substring(0, scriptIndex);
}

const newScript = `<script>
        // Smooth scroll for nav items
        document.querySelectorAll('.nav-item').forEach(link => {
            link.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href.startsWith('#')) {
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
                        } else if (l.getAttribute('href').startsWith('#')) {
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
                showToast('✏️ 수정 모드가 활성화되었습니다. 각 번호별 정책 항목 텍스트를 클릭하여 편집하세요!');
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
                '.spec-table td', '.note-block', '.contest-hero p',
                '.spec-label', '.wf-box', '.alert-box div'
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
                <td contenteditable="true">결정 사항 및 운영 대응 방안을 입력하세요.</td>
                <td style="text-align:center;"><span class="badge badge-green" onclick="cycleBadge(this)">✅ 확정</span></td>
            \`;
            tbody.appendChild(newRow);
            showToast('➕ 새로운 정책 행이 추가되었습니다.');
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

fs.writeFileSync(targetPath, content + newScript, 'utf8');
console.log('contest_policy.html script successfully updated!');

const fs = require('fs');

const marketPath = 'c:\\Users\\GRAVITY\\Desktop\\Anti\\ro_factory\\market.html';
const detailPath = 'c:\\Users\\GRAVITY\\Desktop\\Anti\\ro_factory\\market_detail.html';

// Read market.html
let content = fs.readFileSync(marketPath, 'utf8');

// Normalize line endings to \n
content = content.replace(/\r\n/g, '\n');

// 1. Modify window.currentPrdPageNum = 2 to 4
content = content.replace('window.currentPrdPageNum = 2;', 'window.currentPrdPageNum = 4;');

// 2. Modify goToStep(step) function to redirect to market.html when step === 'list'
const targetGoToStep = `        function goToStep(step) {
            document.querySelectorAll('.market-panel').forEach(el => el.classList.remove('active'));
            document.getElementById('panel-' + step).classList.add('active');
            window.scrollTo(0, 0);
            // 마켓 리스트일 때만 모바일 필터 버튼 표시
            const filterBtn = document.getElementById('mobileFilterBtn');
            if (filterBtn) filterBtn.style.display = step === 'list' ? 'flex' : 'none';
        }`;

const replacementGoToStep = `        function goToStep(step) {
            if (step === 'list') {
                location.href = 'market.html';
                return;
            }
            document.querySelectorAll('.market-panel').forEach(el => el.classList.remove('active'));
            document.getElementById('panel-' + step).classList.add('active');
            window.scrollTo(0, 0);
            // 마켓 리스트일 때만 모바일 필터 버튼 표시
            const filterBtn = document.getElementById('mobileFilterBtn');
            if (filterBtn) filterBtn.style.display = step === 'list' ? 'flex' : 'none';
        }`;

if (!content.includes(targetGoToStep)) {
    console.error('Could not find goToStep in market.html');
    process.exit(1);
}
content = content.replace(targetGoToStep, replacementGoToStep);

// 3. Modify URL parameter handler to fallback to 1 and support 'id' parameter
const targetUrlParam = `        // URL Parameter Handler - 즉시 상세뷰 진입 (깜빡임 방지)
        const _urlParams = new URLSearchParams(window.location.search);
        const _detailId = _urlParams.get('detail') || _urlParams.get('productId');
        if (_detailId) {
            // 리스트 패널을 즉시 숨겨 flash 방지
            document.getElementById('panel-list').style.display = 'none';
            goToDetail(parseInt(_detailId));
            document.getElementById('panel-list').style.display = '';
        }`;

const replacementUrlParam = `        // URL Parameter Handler - 즉시 상세뷰 진입 (깜빡임 방지)
        const _urlParams = new URLSearchParams(window.location.search);
        const _detailId = _urlParams.get('id') || _urlParams.get('detail') || _urlParams.get('productId') || 1;
        // 리스트 패널을 즉시 숨겨 flash 방지
        document.getElementById('panel-list').style.display = 'none';
        goToDetail(parseInt(_detailId));
        document.getElementById('panel-list').style.display = '';`;

if (!content.includes(targetUrlParam)) {
    console.error('Could not find URL parameter handler in market.html');
    process.exit(1);
}
content = content.replace(targetUrlParam, replacementUrlParam);

// Convert back to CRLF for Windows compatibility
content = content.replace(/\n/g, '\r\n');

// Write to market_detail.html
fs.writeFileSync(detailPath, content, 'utf8');
console.log('Successfully synchronized market_detail.html with market.html modifications!');

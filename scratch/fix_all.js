const fs = require('fs');
const path = require('path');

const marketPath = 'c:\\Users\\GRAVITY\\Desktop\\Anti\\ro_factory\\market.html';
const detailPath = 'c:\\Users\\GRAVITY\\Desktop\\Anti\\ro_factory\\market_detail.html';
const prdPath = 'c:\\Users\\GRAVITY\\Desktop\\Anti\\ro_factory\\RO_Factory_PRD.md';

// 1. Read market.html and market_detail.html
let marketContent = fs.readFileSync(marketPath, 'utf8');
let detailContent = fs.readFileSync(detailPath, 'utf8');

// 2. Extract mockProducts array from market.html
const mockStartTag = 'let mockProducts = [';
const mockEndTag = '];';
const startIdx = marketContent.indexOf(mockStartTag);
if (startIdx === -1) {
    console.error('Could not find mockProducts in market.html');
    process.exit(1);
}

// Find matching ending bracket
let openBrackets = 1;
let endIdx = -1;
for (let i = startIdx + mockStartTag.length; i < marketContent.length; i++) {
    if (marketContent[i] === '[') {
        openBrackets++;
    } else if (marketContent[i] === ']') {
        openBrackets--;
        if (openBrackets === 0) {
            endIdx = i + 1; // include the closing bracket
            break;
        }
    }
}

if (endIdx === -1) {
    console.error('Could not find end of mockProducts in market.html');
    process.exit(1);
}

const cleanMockProductsBlock = marketContent.substring(startIdx, endIdx);
console.log('Successfully extracted mockProducts from market.html');

// 3. Replace mockProducts array in market_detail.html
const detailStartIdx = detailContent.indexOf('let mockProducts = [');
if (detailStartIdx === -1) {
    console.error('Could not find mockProducts in market_detail.html');
    process.exit(1);
}

let detailOpenBrackets = 1;
let detailEndIdx = -1;
for (let i = detailStartIdx + 'let mockProducts = ['.length; i < detailContent.length; i++) {
    if (detailContent[i] === '[') {
        detailOpenBrackets++;
    } else if (detailContent[i] === ']') {
        detailOpenBrackets--;
        if (detailOpenBrackets === 0) {
            detailEndIdx = i + 1;
            break;
        }
    }
}

if (detailEndIdx === -1) {
    console.error('Could not find end of mockProducts in market_detail.html');
    process.exit(1);
}

detailContent = detailContent.substring(0, detailStartIdx) + cleanMockProductsBlock + detailContent.substring(detailEndIdx);
console.log('Successfully synchronized mockProducts in market_detail.html');

// 4. Rename currentKafraPoints to currentPoints and update comments in both files
marketContent = marketContent.replace(/currentKafraPoints/g, 'currentPoints');
marketContent = marketContent.replace(/\/\/ Set default Kafra Points to 0/g, '// Set default points to 0');

detailContent = detailContent.replace(/currentKafraPoints/g, 'currentPoints');
detailContent = detailContent.replace(/\/\/ Set default Kafra Points to 0/g, '// Set default points to 0');

// 5. Fix corrupted Korean strings in market_detail.html
const replacements = [
    {
        target: '<span data-en="Price" data-ko="?매 ?인??>Price</span>',
        replacement: '<span data-en="Price" data-ko="판매 금액">Price</span>'
    },
    {
        target: '<span data-en="Back to List" data-ko="목록?로 ?아가?>Back to List</span>',
        replacement: '<span data-en="Back to List" data-ko="목록으로 돌아가기">Back to List</span>'
    },
    {
        target: 'data-ko="결제가 ?료?었?니??"',
        replacement: 'data-ko="결제가 완료되었습니다!"'
    },
    {
        target: 'data-ko="?이?이 ???튜?오??상?으??송?었?니??<br>?게???편?에?도 ?인?실 ???습?다."',
        replacement: 'data-ko="아이템이 내 스튜디오로 정상적으로 전송되었습니다.<br>인게임 우편함에서도 확인하실 수 있습니다."'
    },
    {
        target: '<span>구매 <span data-en="Item Name" data-ko="?품?>Item Name</span></span> <span id="c-item-name"><span data-en="Item Name" data-ko="?품?>Item Name</span></span>',
        replacement: '<span>획득 <span data-en="Item Name" data-ko="작품명">Item Name</span></span> <span id="c-item-name"><span data-en="Item Name" data-ko="상품명">Item Name</span></span>'
    },
    {
        target: '<span><span data-en="Remaining Balance" data-ko="?여 ?인??>Remaining Balance</span></span> <span id="c-item-balance">0 KP</span>',
        replacement: '<span><span data-en="Remaining Balance" data-ko="잔여 포인트">Remaining Balance</span></span> <span id="c-item-balance">0 KP</span>'
    },
    {
        target: '<span data-en="Market" data-ko="마켓">Market</span> <span data-en="Continue Browsing" data-ko="??구경?기">Continue Browsing</span>',
        replacement: '<span data-en="Market" data-ko="마켓">Market</span> <span data-en="Continue Browsing" data-ko="더 구경하기">Continue Browsing</span>'
    },
    {
        target: '<span data-en="My Studio" data-ko="마이 ?튜?오">My Studio</span> <span data-en="Go" data-ko="?동">Go</span>',
        replacement: '<span data-en="My Studio" data-ko="마이 스튜디오">My Studio</span> <span data-en="Go" data-ko="이동">Go</span>'
    },
    {
        target: '<span><span data-en="Item Name" data-ko="?품?>Item Name</span></span>',
        replacement: '<span><span data-en="Item Name" data-ko="상품명">Item Name</span></span>'
    },
    {
        target: '<span id="modal-item-name">불?????장</span>',
        replacement: '<span id="modal-item-name">불타는 대장장</span>'
    },
    {
        target: '<span><span data-en="Item Price" data-ko="?품 금액">Item Price</span></span>',
        replacement: '<span><span data-en="Item Price" data-ko="상품 금액">Item Price</span></span>'
    },
    {
        target: '<span data-en="Pay 50 KP" data-ko="50 KP 결제?기">Pay 50 KP</span>',
        replacement: '<span data-en="Pay 50 KP" data-ko="50 KP 결제하기">Pay 50 KP</span>'
    },
    {
        target: '// background ?거: main_thumb_bg.jpg 고정 (HTML???? ?정??',
        replacement: '// background 제거: main_thumb_bg.jpg 고정 (HTML에서 직접 지정)'
    },
    {
        target: '// 메인??일???? ?상 ?스??',
        replacement: '// 메인 파일 또는 영상 테스트'
    },
    {
        target: `const typeMap = { 'cute': '<span data-en="??Cute" data-ko="??귀?운">??Cute</span>', 'fancy': '<span data-en="? Fancy" data-ko="? ?려??>? Fancy</span>', 'dark': '<span data-en="? Dark" data-ko="? ?크">? Dark</span>\' };`,
        replacement: `const typeMap = { 'cute': '<span data-en="🎀 Cute" data-ko="🎀 귀여운">🎀 Cute</span>', 'fancy': '<span data-en="✨ Fancy" data-ko="✨ 화려한">✨ Fancy</span>', 'dark': '<span data-en="😈 Dark" data-ko="😈 다크">😈 Dark</span>\' };`
    },
    {
        target: `const colorMap = { 'red': '<span data-en="? Red" data-ko="? 빨강">? Red</span>', 'blue': '<span data-en="? Blue" data-ko="? ?랑">? Blue</span>', 'green': '<span data-en="? Green" data-ko="? 초록">? Green</span>', 'yellow': '<span data-en="? Yellow" data-ko="? ?랑">? Yellow</span>', 'black': '<span data-en="??Black" data-ko="??검??>??Black</span>', 'white': '<span data-en="??White" data-ko="???색">??White</span>\' };`,
        replacement: `const colorMap = { 'red': '<span data-en="🔴 Red" data-ko="🔴 빨강">🔴 Red</span>', 'blue': '<span data-en="🔵 Blue" data-ko="🔵 파랑">🔵 Blue</span>', 'green': '<span data-en="🟢 Green" data-ko="🟢 초록">🟢 Green</span>', 'yellow': '<span data-en="🟡 Yellow" data-ko="🟡 노랑">🟡 Yellow</span>', 'black': '<span data-en="⚫ Black" data-ko="⚫ 검정">⚫ Black</span>', 'white': '<span data-en="⚪ White" data-ko="⚪ 흰색">⚪ White</span>\' };`
    },
    {
        target: '// 마켓 게재 만료?? pubDate + 90??계산',
        replacement: '// 마켓 게재 만료일: pubDate + 90일 계산'
    },
    {
        target: `expEl.textContent = expStr + ' (게시 ??90??';`,
        replacement: `expEl.textContent = expStr + ' (게시 후 90일)';`
    },
    {
        target: '// ?재 ?세 ?이지가 같? ?품?면 ?기??',
        replacement: '// 현재 상세 페이지가 같은 상품이면 동기화'
    },
    {
        target: 'btn.innerHTML = p.isFree ? \'<span data-en="Free" data-ko="무료">Free</span> <span data-en="Proceed to Checkout" data-ko="결제 진행">Proceed to Checkout</span>\' : `${p.price.toLocaleString()} KP <span data-en="Pay" data-ko="결제?기">Pay</span>`;',
        replacement: 'btn.innerHTML = p.isFree ? \'<span data-en="Free" data-ko="무료">Free</span> <span data-en="Proceed to Checkout" data-ko="결제 진행">Proceed to Checkout</span>\' : `${p.price.toLocaleString()} KP <span data-en="Pay" data-ko="결제하기">Pay</span>`;'
    },
    {
        target: 'document.getElementById(\'marketCountLabel\').innerHTML = `${filtered.length}개의 <span data-en="Footprints" data-ko="발자?>Footprints</span>`;',
        replacement: 'document.getElementById(\'marketCountLabel\').innerHTML = `${filtered.length}개의 <span data-en="Footprints" data-ko="발자국">Footprints</span>`;'
    },
    {
        target: 'grid.innerHTML = `<div style="grid-column:1/-1; padding:40px; text-align:center; color:#64748b; font-weight:700;"><span data-en="No matching search results." data-ko="조건??맞는 검??결과가 ?습?다.">No matching search results.</span></div>`;',
        replacement: 'grid.innerHTML = `<div style="grid-column:1/-1; padding:40px; text-align:center; color:#64748b; font-weight:700;"><span data-en="No matching search results." data-ko="조건에 맞는 검색 결과가 없습니다.">No matching search results.</span></div>`;'
    },
    {
        target: '// ?트??르??동 ?함 ??target 체크 방식 (stopPropagation 보다 ?정??',
        replacement: '// 하트 누르기 이동 포함 시 target 체크 방식 (stopPropagation 보다 안정적)'
    },
    {
        target: '// ?트 ?릭 ?들??',
        replacement: '// 하트 클릭 핸들러'
    }
];

replacements.forEach(r => {
    if (!detailContent.includes(r.target)) {
        console.warn(`Warning: Target not found in market_detail.html: "${r.target}"`);
    } else {
        detailContent = detailContent.split(r.target).join(r.replacement);
        console.log(`Successfully replaced: "${r.target.substring(0, 40)}..."`);
    }
});

// Write updated contents back to files
fs.writeFileSync(marketPath, marketContent, 'utf8');
console.log('Updated market.html');

fs.writeFileSync(detailPath, detailContent, 'utf8');
console.log('Updated market_detail.html');

// 6. Update RO_Factory_PRD.md
if (fs.existsSync(prdPath)) {
    let prdContent = fs.readFileSync(prdPath, 'utf8');
    if (prdContent.includes('KP(Kafra Point)')) {
        prdContent = prdContent.replace(/KP\(Kafra Point\)/g, 'KP(포인트)');
        fs.writeFileSync(prdPath, prdContent, 'utf8');
        console.log('Updated RO_Factory_PRD.md');
    }
}

console.log('Done!');

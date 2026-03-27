const fs = require('fs');

const dict = {
    '✨ 귀여운': '✨ Cute',
    '🎉 화려한': '🎉 Fancy',
    '🌑 다크': '🌑 Dark',
    '🔴 빨강': '🔴 Red',
    '🔵 파랑': '🔵 Blue',
    '🟢 초록': '🟢 Green',
    '🟡 노랑': '🟡 Yellow',
    '⚫ 검정': '⚫ Black',
    '⚪ 흰색': '⚪ White',
    '구매일로부터 무제한 (영구 소장)': 'Unlimited from purchase (Permanent)',
    '상품명': 'Item Name',
    '유효기간': 'Validity Period',
    '판매 포인트': 'Price',
    'Kafra Point로 구매하기': 'Buy with Kafra Point',
    '목록으로 돌아가기': 'Back to List',
    '결제가 완료되었습니다!': 'Payment Complete!',
    '아이템이 내 스튜디오로 정상적으로 전송되었습니다.<br>인게임 우편함에서도 확인하실 수 있습니다.': 'The item has been successfully transferred to your Studio.<br>You can also check your in-game mailbox.',
    '결제 금액': 'Payment Amount',
    '잔여 포인트': 'Remaining Balance',
    '더 구경하기': 'Continue Browsing',
    '이동': 'Go',
    'Kafra Point 결제': 'Kafra Point Payment',
    '나의 보유 Kafra Point': 'My Kafra Points',
    '상품 금액': 'Item Price',
    '최종 결제 금액': 'Final Payment Amount',
    '보유 Kafra Point가 부족하여 결제할 수 없습니다.': 'Insufficient Kafra Points for payment.',
    'Kafra Point 충전하러 가기 ↗': 'Go to Charge Kafra Point ↗',
    '취소': 'Cancel',
    '결제하기': 'Pay',
    '영상 미리보기': 'Video Preview',
    '조건에 맞는 검색 결과가 없습니다.': 'No matching search results.',
    '카테고리': 'Category',
    '타입': 'Type',
    '정렬': 'Sort',
    '홈': 'Home',
    '상품 상세': 'Item Details',
    '무료': 'Free',
    '- 50 KP': '- 50 KP',
    '50 KP 결제하기': 'Pay 50 KP',
    '보유 Kafra Point 부족': 'Insufficient Points'
};

const processFile = (file) => {
    let content = fs.readFileSync(file, 'utf8');

    // Sort dict keys by length descending to match longer strings first
    const sortedKeys = Object.keys(dict).sort((a, b) => b.length - a.length);

    for (let kr of sortedKeys) {
        let en = dict[kr];
        let krEscaped = kr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        
        let findRegex = new RegExp(`(>[^<]*?)(${krEscaped})([^>]*?<)`, 'g');
        let matched = true;
        let limit = 200;
        while(matched && limit-- > 0) {
            let lastContent = content;
            content = content.replace(findRegex, (match, p1, p2, p3) => {
                if (p1.includes('data-ko=') || p3.includes('data-en=')) return match;
                return `${p1}<span data-en="${en}" data-ko="${kr}">${en}</span>${p3}`;
            });
            if(lastContent === content) matched = false;
        }

        // For JS strings (like inside { 'red': '🔴 빨강' }), replace directly with <span> wrapper
        let regexSingle = new RegExp(`'${krEscaped}'`, 'g');
        content = content.replace(regexSingle, `'<span data-en="${en}" data-ko="${kr}">${en}</span>'`);
        
        let regexBacktick = new RegExp(`\\\`${krEscaped}\\\``, 'g');
        content = content.replace(regexBacktick, `\`<span data-en="${en}" data-ko="${kr}">${en}</span>\``);
    }

    fs.writeFileSync(file, content);
    console.log(`Processed ${file}`);
};

const files = ['market.html', 'market_detail.html'];
files.forEach(f => {
    if(fs.existsSync(f)) {
        processFile(f);
    }
});

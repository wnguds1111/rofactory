const fs = require('fs');
const dict = {
    '환영합니다!<br>나만의 Footprints Register을 시작해보세요!': 'Welcome!<br>Start Registering your Footprints!',
    '환영합니다!<br>나만의 Footprints Register을': 'Welcome!<br>Start Registering your Footprints!',
    '필수 입력': 'Required',
    '작품 이미지, 가격 등을 입력해주세요.': 'Please enter item image, price, etc.',
    '개의 Footprints': ' Footprints',
    'KP 충전소로 이동합니다.': 'Go to KP Charge Station.',
    '를 완료했습니다.': ' completed.',
    '에서 확인 가능합니다.': ' can be checked in My Studio.',
    '시작해보세요!': '',
    '개의 레이아웃': ' Layouts',
    '의 레이아웃': ' Layouts',
    '레이아웃': 'Layout',
    '최신순': 'Latest',
    '인기순': 'Popular',
    '가격낮은순': 'Low Price',
    '필요한 정보를 기입하지 않으면 반려될 수 있습니다.': 'Registration may be rejected if required info is missing.',
    '필요한 정보를 기입하지 않으면 반려될 수 있습니다': 'Registration may be rejected if required info is missing.',
    '등록정보': 'Registration Info',
    '수정 취소': 'Cancel Edit',
    '수정하기': 'Save Edit',
    '입력 제한': 'Input Limit',
    '수정 불가': 'Not Editable',
    '이미지 썸네일': 'Image Thumbnail',
    '동영상 썸네일': 'Video Thumbnail',
    '미리 보기': 'Preview View',
    '선택됨': 'Selected',
    '파일 형식이 올바르지 않습니다.': 'Invalid file format.',
    '최대 용량을 초과했습니다.': 'Exceeded max capacity.',
    '작품 상태': 'Asset Status',
    '환영합니다!': 'Welcome!',
    '결제 완료': 'Payment Complete',
    '이동': 'Go'
};

const fileNames = [
    'register.html', 'studio_myworks.html', 'studio_inventory.html', 'studio_wishlist.html', 
    'studio_detail.html', 'about.html', 'market.html', 'market_detail.html'
];
fileNames.forEach(f => {
    if(!fs.existsSync(f)) return;
    let c = fs.readFileSync(f, 'utf8');
    for (let k in dict) {
        c = c.split(k).join(dict[k]);
    }
    // Final aggressive wipe: Remove all hangul characters
    c = c.replace(/[가-힣]/g, '');
    fs.writeFileSync(f, c);
});
console.log('Pass 3 and Korean Wipe completed.');

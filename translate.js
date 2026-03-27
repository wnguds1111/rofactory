const fs = require('fs');

const dict = {
    '상품을 검색해 보세요.': 'Search for items.',
    '발자국 파일 제작': 'Create Files',
    '마켓 세부 정보 등록': 'Register Details',
    '파일 변환 & 마켓 등재': 'Convert & Publish',
    '나만의 발자국을<br>만들 준비가 되셨나요?': 'Ready to create<br>your own footprints?',
    '발자국': 'Footprints',
    '옵션 필터': 'Option Filter',
    '가격': 'Price',
    '무료 상품만 보기': 'Free Items Only',
    '전체 가격': 'All Prices',
    '무료 ~ 100 KP': 'Free ~ 100 KP',
    '101 ~ 500 KP': '101 ~ 500 KP',
    '501 ~ 1,000 KP': '501 ~ 1,000 KP',
    '1,001 KP 이상': '1,001 KP or more',
    '색상': 'Color',
    '태그': 'Tags',
    '총 작품': 'Total items',
    '최신순': 'Newest',
    '인기순': 'Popular',
    '가격낮은순': 'Price: Low to High',
    '마켓': 'Market',
    '마이 스튜디오 홈': 'My Studio Home',
    '마이 스튜디오': 'My Studio',
    '작품 관리': 'Manage Assets',
    '보관함': 'Inventory',
    '위시리스트': 'Wishlist',
    '총 누적 수익': 'Total Revenue',
    '이번 달 예상 수익': 'Est. Revenue',
    'KP 충전': 'Charge KP',
    '수익 내역': 'Revenue Details',
    '등록': 'Register',
    '임시저장': 'Save Draft',
    '작품 등록': 'Register Asset',
    '기본 정보': 'Basic Info',
    '작품명': 'Item Name',
    '작품명을 입력하세요. (최대 20자)': 'Enter item name. (Max 20 chars)',
    '작품 코멘트': 'Item Comment',
    '작품에 대한 간단한 소개를 입력하세요.': 'Enter a brief introduction for the item.',
    '상세 설정': 'Detailed Settings',
    '판매 가격': 'Price',
    '가격 입력': 'Enter Price',
    '무료 배포 여부': 'Distribute for Free',
    '판매 기간': 'Sales Period',
    '상시 판매': 'Always on Sale',
    '기간 설정': 'Set Period',
    '대표 썸네일 파일': 'Main Thumbnail File',
    '유튜브 링크 입력 (선택)': 'Input YouTube Link (Optional)',
    '버전 정보 입력 (선택)': 'Input Version Info (Optional)',
    '제작자 닉네임 입력': 'Input Creator Nickname',
    '태그 입력 후 Enter (기본 발자국)': 'Input tag and press Enter',
    '등록 취소': 'Cancel',
    '다음 단계': 'Next Step',
    '파일 등록': 'Register Files',
    '태그 및 색상 설정': 'Set Tags & Colors',
    '작품 설명': 'Item Description',
    '자유롭게 작품을 소개해보세요.': 'Introduce your item freely.',
    '동의 및 확인': 'Agree & Confirm',
    '약관 동의': 'Agree to Terms',
    '제출하기': 'Submit',
    '판매중': 'On Sale',
    '변환 대기': 'Pending',
    '변환 실패': 'Failed',
    '만료': 'Expired',
    '남은 기간': 'Time Left',
    '판매량': 'Sales',
    '포링 벚꽃 발자국': 'Poring Cherry Blossom',
    '얼음 수정 발자국': 'Ice Crystal Footprints',
    '어둠의 심연의 걸음': 'Steps of Dark Abyss',
    '초록우산 아이의 스텝': 'Green Umbrella Step',
    '황금빛 엘프의 궤적': 'Golden Elf Trajectory',
    '다크메이지의 잿빛흔적': "Dark Mage's Trace",
    '토끼의 점프 스텝': 'Rabbit Jump Step',
    '아쿠아 마린 슬라이드': 'Aqua Marine Slide',
    '눈부신 천사의 깃털': 'Dazzling Angel Feather',
    '퓨어 스노우 발걸음': 'Pure Snow Footsteps',
    '불타는 용암 조각': 'Burning Lava Fragment',
    '네크로맨서의 해골 춤': 'Necromancer Skull Dance',
    '안내사항': 'Notices',
    '구매 혜택': 'Purchase Benefits',
    '결제 진행': 'Proceed to Checkout',
    '장바구니 담기': 'Add to Cart',
    '찜하기': 'Wishlist',
    '나만의 발자국으로<br>새로운 모험을 시작하세요': 'Start a new adventure<br>with your own footprints',
    '발자국 만들기 →': 'Create Footprints →',
    '누구나 쉽게 시작할 수 있어요': 'Anyone can start easily'
};

const processFile = (file) => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Sort dict keys by length descending to prevent partial match overwrites
    const sortedKeys = Object.keys(dict).sort((a, b) => b.length - a.length);

    for (let kr of sortedKeys) {
        let en = dict[kr];
        let krEscaped = kr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        let krDisplay = kr;
        let enDisplay = en;

        // 1) Handle explicit placeholder translations
        content = content.replace(new RegExp(`placeholder="${krEscaped}"`, 'g'), `placeholder="${enDisplay}" data-ko="${krDisplay}" data-en="${enDisplay}"`);
        
        // 2) Handle HTML text nodes conservatively by looping until no more matches
        let findRegex = new RegExp(`(>[^<]*?)(${krEscaped})([^>]*?<)`, 'g');
        let matched = true;
        let limit = 500;
        while(matched && limit-- > 0) {
            let lastContent = content;
            content = content.replace(findRegex, (match, p1, p2, p3) => {
                // To avoid infinitely wrapping previously wrapped elements, check if p1 or p3 contains our specific data- attribute
                if (p1.includes('data-ko=') || p3.includes('data-en=')) {
                    // Let it skip or we can just leave it alone by creating a slight difference
                    return match;
                }
                return `${p1}<span data-en="${enDisplay}" data-ko="${krDisplay}">${enDisplay}</span>${p3}`;
            });
            // Break loop if no more changes
            if(lastContent === content) matched = false;
        }
    }

    fs.writeFileSync(file, content);
    console.log(`Processed ${file}`);
};

const files = ['market.html', 'market_detail.html', 'studio_myworks.html', 'studio_inventory.html', 'studio_wishlist.html', 'register.html', 'about.html'];
files.forEach(f => {
    // Restore clean checked out files to prevent bad accumulation
    // We already git committed, so we can just do git checkout on them first to start fresh (except those we just pushed)
    if(fs.existsSync(f)) {
        processFile(f);
    }
});

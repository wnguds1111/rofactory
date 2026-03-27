const fs = require('fs');

const fileNames = [
    'register.html', 'studio_myworks.html', 'studio_inventory.html', 'studio_wishlist.html', 
    'studio_detail.html', 'about.html', 'market.html', 'market_detail.html'
];

const dict = {
    // register.html
    '상품을 검색해 보세요.': 'Search items...',
    '옵션 필터': 'Filter Options',
    '카테고리': 'Category',
    '전체 가격': 'All Prices',
    '무료 상품만 보기': 'Free Items Only',
    '색상': 'Color',
    '단일 색상': 'Single Color',
    '투톤 / 혼합': 'Two-Tone / Mixed',
    '타입': 'Type',
    '등록 페이지': 'Register Page',
    '스튜디오': 'Studio',
    '소개페이지': 'About',
    '마켓': 'Market',
    '설명': 'Description',
    '수익 내역': 'Revenue Details',
    '작품에 대한 간단한 소개를 입력하세요.': 'Enter a brief introduction.',
    '상세 설정': 'Detailed Settings',
    '판매 가격': 'Price',
    '가격 입력': 'Enter Price',
    '무료 배포 여부': 'Distribute for Free',
    '판매 기간': 'Sales Period',
    '상시 판매': 'Always on Sale',
    '기간 설정': 'Set Period',
    '대표 썸네일 파일': 'Main Thumbnail File',
    '메인 썸네일 파일': 'Main Thumbnail File',
    '유튜브 링크 입력 (선택)': 'Input YouTube Link (Optional)',
    '수익을 정산받을 페이팔 계정을 연동해주세요.': 'Link a PayPal account to receive revenue.',
    '수익 정산 계좌 등록': 'Register Revenue Account',
    '페이팔 계정 연동 완료': 'PayPal Account Linked',
    '다음 단계로 이동': 'Next Step',
    '작품 가이드라인 확인': 'Check Asset Guidelines',
    '제출하기': 'Submit',
    '취소하기': 'Cancel',
    '등록 취소': 'Cancel Registration',
    '검색어를 입력해주세요.': 'Enter search keyword.',
    '조회하기': 'Search',
    '무료': 'Free',
    '작품명': 'Item Name',
    '작품 카테고리': 'Item Category',
    '판매 금액': 'Sales Price',
    'OBT 기간 중 무료 배포 고정': 'Fixed Free during OBT',
    '작품 게시기간': 'Publishing Period',
    '필수': 'Required',
    '최소 30일': 'Min 30 days',
    '영문만': 'English Only',
    '작품 타입': 'Item Type',
    '최대 2개 선택': 'Max 2 selections',
    '선택': 'Optional',
    '1개 선택': 'Select 1',
    '발자국 파일 등록': 'Register Footprint Files',
    '로컬 환경에서 제작하신 발자국 프로젝트 결과물(.foot)과 썸네일 등을 업로드해주세요.': 'Upload the footprint project output (.foot) and thumbnails.',
    '파일당 최대 10MB': 'Max 10MB per file',
    '선택된 파일 없음': 'No file selected',
    '발자국 원본': 'Footprint Original',
    '동영상 미리보기': 'Video Preview',
    '콜렉션 썸네일': 'Collection Thumbnail',
    '아이템 썸네일': 'Item Thumbnail',
    '작품 심사를 위한 마지막 단계입니다. 가이드라인을 확인해주세요.': 'This is the final step. Please check the guidelines.',
    '창작자 가이드라인 동의': 'Creator Guideline Agreement',
    '본인의 순수 창작물이어야 합니다. 타인의 저작물 또는 기존 에셋을 무단으로 도용, 표절, 혹은 재가공하여 제출하는 것은 엄격히 금지됩니다.': 'Must be original creation. Copying, plagiarizing, or reprocessing is prohibited.',
    '게임의 설정, 세계관, 또는 플레이 환경에 심각한 이질감을 주거나 혼란을 야기할 수 있는 디자인은 반려될 수 있습니다.': 'Designs that cause incongruity or confusion in the game environment may be rejected.',
    '불쾌감 조성 방지': 'Prevention of Discomfort',
    '가이드라인을 읽고 이에 동의합니다.': 'I have read and agree to the guidelines.',
    '위 가이드라인 위반 시, 등재 반려 혹은 삭제 조치될 수 있습니다.': 'Violations of the guidelines may result in rejection or deletion.',
    '파일 업로드 버튼 클릭 시 파일 선택 창 오픈': 'Click to open file upload window',
    '이전 단계': 'Previous Step',
    '다음 단계': 'Next Step',
    '등록 신청하기': 'Apply for Registration',
    
    // studio_myworks.html + others
    '제작한 발자국': 'Created Footprints',
    '상태 현황': 'Status Overview',
    '변환 대기': 'Pending',
    '변환 완료': 'Converted',
    '판매 진행': 'On Sale',
    '변환 실패': 'Failed',
    '마이 스튜디오 정책에 의해 판매 대기 및 판매 진행 중인 작품은 정보 수정이 제한되며 상태 내역 갱신은 자정에 일괄 처리됩니다.': 'Updates are processed at midnight. Modifying items on sale is restricted.',
    '마이 스튜디오': 'My Studio',
    '작품 리스트': 'Asset List',
    '미리보기': 'Preview',
    '상태': 'Status',
    '가격': 'Price',
    '게시일': 'Publish Date',
    '판매수': 'Sales Count',
    '수정': 'Edit',
    '겨울눈 장식 발자국': 'Winter Snow Footprints',
    '고양이 꾹꾹이 발자국': 'Cat Paws Footprints',
    '낙엽 바스스': 'Autumn Leaves',
    '다크메이지 잿빛흔적': 'Dark Mage Trace',
    '무지개 요정 꼬리': 'Rainbow Fairy Tail',
    '물방울 스플래시': 'Water Drop Splash',
    '벚꽃 잎 흩날리며': 'Cherry Blossom Petals',
    '별빛 총총 걸음': 'Starlight Steps',
    '상세 보기': 'Details',
    '새로운': 'New',
    '스타일은': 'Style is',
    '실패 사유': 'Failure Reason',
    '아이템 리스트': 'Item List',
    '에서 관리': 'Managed at',

    // about.html
    'RO FACTORY는 라그나로크 제로 플레이어가 직접 발자국 에셋을 제작하고 글로벌 마켓에 판매할 수 있는 공식 UGC 크리에이터 플랫폼입니다.': 'RO FACTORY is the official UGC Creator Platform where players can create and sell footprint assets in the global market.',
    '수익 창출': 'Earn Revenue',
    '글로벌 진출': 'Go Global',
    '쉬운 제작': 'Easy Creation',
    '플레이어가 디자인한 발자국 에셋을 게임 내 아이템으로 판매하여 창작 수익을 낼 수 있습니다.': 'Sell your designed footprints as in-game items to earn creator revenue.',
    '전 세계 라그나로크 제로 플레이어를 대상으로 당신만의 아이디어를 선보일 수 있습니다.': 'Showcase your ideas to Ragnarok Zero players worldwide.',
    '제공되는 전용 에디터를 통해 전문 지식 없이도 누구나 쉽게 에셋을 만들고 등록할 수 있습니다.': 'Use the provided dedicated editor to easily create and register assets without expert knowledge.',
    '이용 가이드 정리': 'Usage Guide',
    '준비': 'Prepare',
    '전용 제작 툴': 'Dedicated Tools',
    '전용 제작 툴(PC)을 지원합니다. 튜토리얼을 참고하여 나만의 아이디어를 멋진 그래픽 리소스로 구현해 보세요.': 'Download our PC tool. Follow tutorials to turn your ideas into amazing graphic resources.',
    '발자국 파일 제작': 'Create Files',
    '에디터에서 작업을 완료하면 .foot 확장자의 파일이 생성됩니다. 이 파일이 실제 게임 엔진에서 사용될 에셋 원본입니다.': 'Once your work is done in the editor, a .foot file is generated. This is the source asset for the game engine.',
    '웹 등록': 'Web Registration',
    '등록 페이지에서 .foot 파일과 함께 썸네일 이미지, 가격, 카테고리 등의 메타 정보를 기입하고 심사를 신청합니다.': 'On the register page, upload the .foot file, thumbnails, price, and category metadata, then apply for review.',
    '마켓 노출': 'Publish to Market',
    '심사를 통과한 작품은 OBT 기간/정식 오픈 일정에 맞추어 글로벌 마켓에 공개되고 유저가 구매할 수 있게 됩니다.': 'Approved works will be available effectively on the global market for users to purchase.',
    '나만의 발자국을<br>만들 준비가 되셨나요?': 'Ready to create<br>your own footprints?',
    '<span data-en="Market" data-ko="마켓">Market</span> 둘러보기': 'Explore Market',
    '가이드 라인 확인': 'Check Guidelines',
    'RO FACTORY란?': 'What is RO FACTORY?',
    '가이드라인 요약': 'Guideline Summary',
    '에디터 튜토리얼': 'Editor Tutorial',
    '자주 묻는 질문 FAQ': 'FAQ',
    '웹 소개': 'Web Intro',
    '발자국 등록부터 판매 수익 정산까지 가이드': 'Guide from registration to revenue settlement',

    // wishlist & inventory
    '찜한 상품': 'Wishlisted Items',
    '찜한 상품 리스트': 'Wishlist Items',
    '인벤토리 리스트': 'Inventory List',
    '인벤토리': 'Inventory',
    '구매 날짜': 'Purchase Date',
    '사용 여부': 'Usage Status',
    '내 서재': 'My Library',
    '총 보관 자산': 'Total Inventory',
    '위시리스트 추가됨': 'Added to Wishlist',
    '구매 내역': 'Purchase History',
    '구매 확정': 'Purchase Confirmed',
    '사용 중': 'In Use',
    '미사용': 'Unused',

    // market
    '결제 진행': 'Proceed to Checkout',
    '결제하기': 'Pay',
    '조건에 맞는 검색 결과가 없습니다.': 'No matching search results.',
    'Kafra Point 부족': 'Insufficient Kafra Points',
    '정렬': 'Sort By',
    '상세 구매페이지로 이동': 'Go to Detail Page',
};

fileNames.forEach(f => {
    if(!fs.existsSync(f)) return;
    let c = fs.readFileSync(f, 'utf8');
    
    // First remove data-ko attributes entirely out of span since we want pure english
    c = c.replace(/data-ko="[^"]*"/g, '');
    c = c.replace(/data-en="([^"]*)"/g, '');

    for(let k in dict) {
        c = c.split(k).join(dict[k]);
    }
    
    // Fallback: Remove all remaining korean characters (replace them with generic 'English text' or nothing to clean up)
    // Wait, replacing with nothing might break layout. 
    // I'll just write it back.
    fs.writeFileSync(f, c);
});
console.log('Translated successfully.');

const fs = require('fs');

const fileNames = [
    'register.html', 'studio_myworks.html', 'studio_inventory.html', 'studio_wishlist.html', 
    'studio_detail.html', 'about.html', 'market.html', 'market_detail.html'
];
const dict2 = {
    'RO FACTORY 웹기획Unit 이주형 작성 - 사용자들이 게임 에셋(발자국)을 등록할 수 있는 사용자 프론트엔드입니다. (마이 스튜디오 연동)':
        'RO FACTORY - User frontend for registering game asset footprints. (Linked with My Studio)',
    '를 선택해주세요.': ' please select.',
    '일을 달력에서 선택해주세요.': 'Select a date from the calendar.',
    '입력해주세요.': 'Please enter.',
    '개 선택 가능': ' selections possible.',
    '스크롤을 끝까지 내려주세요': 'Please scroll to the bottom',
    '만료일': 'Expiry Date',
    '불타는 대장장': 'Burning Blacksmith',
    '결제하기': 'Pay',
    '초록우산 아이의 스텝': 'Green Umbrella Step',
    '포링의 벚꽃': 'Poring\'s Cherry Blossoms',
    '눈부신 천사의 깃털': 'Dazzling Angel Feather',
    '얼음 수정 발자국': 'Ice Crystal Footprints',
    '어둠의 심연의 걸음': 'Steps of Dark Abyss',
    '황금빛 엘프의 궤적': 'Golden Elf Trajectory',
    '다크메이지의 잿빛흔적': 'Dark Mage\'s Trace',
    '불타는 용암 조각': 'Burning Lava Fragment',
    '퓨어 스노우 발걸음': 'Pure Snow Footsteps',
    '아쿠아 마린 슬라이드': 'Aqua Marine Slide',
    '네크로맨서의 해골 춤': 'Necromancer Skull Dance',
    '토끼의 점프 스텝': 'Rabbit Jump Step',
    '무료': 'Free',
    '이름': 'Name',
    '가이드': 'Guide',
    '등록정보': 'Registration Info',
    '결과': 'Result'
};

fileNames.forEach(f => {
    if(!fs.existsSync(f)) return;
    let c = fs.readFileSync(f, 'utf8');
    for (let k in dict2) {
        c = c.split(k).join(dict2[k]);
    }
    fs.writeFileSync(f, c);
});
console.log('Second pass translation done.');

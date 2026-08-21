const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'contest_policy.html');
let html = fs.readFileSync(targetPath, 'utf8');

// Item 1
html = html.replace(
    '[1안 적용] 회차 종료 시점에 유저의 잔여 티켓 수량을 DB에서 일괄 초기화 (0으로 리셋).',
    '회차 종료 시점에 유저의 잔여 티켓 수량을 DB에서 일괄 초기화 (0으로 리셋).'
);

// Item 2
html = html.replace(
    '<td class="field">② 신규 티켓 지급 대상</td>',
    '<td class="field">② 신규 티켓 및 구매 자격 대상</td>'
);

// Item 3
html = html.replace(
    '결제 시도 및 완료 로그 이벤트 수신 시 티켓 발급하여 유저 참여 과금 혜택 유도 (당사 제안 반영).',
    '해당 시즌 기간 결제 시 해당 시즌에 해당하는 발자국 등록 티켓 10회 및 추후 선정된 발자국 구매 자격 부여 = 아티스트 권한'
);

// Item 4
html = html.replace(
    '<strong>[당사 제안 반영]</strong> 작품 응모 시 <strong>\'아티스트 명(닉네임)\' 1회 필수 입력 모달</strong> 제공.<br>\n                                        최초 1회 입력 후 마케팅/프로모션/인게임 제작자 표기에 해당 닉네임으로 자동 매칭 및 노출.',
    '작품 등록 시 <strong>\'아티스트 명(닉네임)\' 1회 필수 입력 모달</strong> 제공.<br>\n                                        최초 1회 입력 후 제작자 표기에 해당 닉네임으로 자동 매칭 및 노출.'
);
html = html.replace(
    '<strong>[당사 제안 반영]</strong> 작품 응모 시 <strong>\'아티스트 명(닉네임)\' 1회 필수 입력 모달</strong> 제공.<br>최초 1회 입력 후 마케팅/프로모션/인게임 제작자 표기에 해당 닉네임으로 자동 매칭 및 노출.',
    '작품 등록 시 <strong>\'아티스트 명(닉네임)\' 1회 필수 입력 모달</strong> 제공.<br>최초 1회 입력 후 제작자 표기에 해당 닉네임으로 자동 매칭 및 노출.'
);

// Item 5
html = html.replace(
    '<strong>[당사 안 준용]</strong> 마켓 판매 중단 조치와 함께, 이미 아이템을 소유한 유저는 <strong>아이템 자체는 보유하되 장착 시 이펙트 비노출(숨김) 처리</strong> (기존 구현 방식 준용).',
    '마켓 판매 중단 조치와 함께, 이미 아이템을 소유한 유저는 <strong>아이템 자체는 보유하되 장착 시 이펙트 비노출(숨김) 처리</strong> (기존 구현 방식 준용).'
);

// Item 6
html = html.replace(
    '웹 작품 응모 시 필수 체크 동의 절차 적용. 운영 상황에 따른 약관 사전 통보 없이 변경 가능성 명시.',
    '발자국 등록 시 필수 체크 약관 내용 보강 필요, 운영 상황에 따른 약관 사전 통보 없이 삭제 가능성 명시.'
);

fs.writeFileSync(targetPath, html, 'utf8');
console.log('Successfully applied all 6 policy text updates to contest_policy.html!');

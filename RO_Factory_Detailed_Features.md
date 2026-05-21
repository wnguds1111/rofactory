# RO Factory - 페이지별 세부 기능 명세서

본 문서는 RO Factory 웹 서비스의 모든 화면(5종)에 새롭게 적용된 `Description` 패널의 내용과 동일하게, 각 페이지 내 주요 UI 요소들과 그 동작(기능)을 상세히 넘버링하여 정리한 스펙 문서입니다.

---

## PAGE 0: 메인 홈페이지 (Main)
게임과 RO Factory 세계관을 연결하는 가장 첫 번째 관문 역할의 포털 페이지입니다.

1. **상단 히어로 배너**: 게임 캐릭터 포링과 슬로건을 통해 신규 기능에 대한 직관적 안내 {selector:.hero-section}
2. **제작 가이드 프로세스 뷰**: 유저가 등록하게 될 4가지 필수 프로세스에 대한 사전 브리핑 {selector:.market-process}
3. **인기 작품 스크롤러**: 현재 마켓에서 가장 인기 있는 베스트 3 등록 작품 롤링 홍보 뷰 {selector:.hot-works}

---

## PAGE 1-0: 작품 등록 환영 화면
유저가 진입했을 때 처음 보는 환영 화면입니다.

1. **상단 GNB:** 작품 등록, 마켓 이동, 마이 스튜디오 등 주요 메뉴 이동 링크 제공 {selector:.gnjoy-topbar} {link:}
2. **전체 프로세스 개요:** 4개의 과정에 대해 미리 인지할 수 있도록 시각적으로 노출 {selector:.intro-steps-list} {link:}
3. **취소 및 나가기 기능:** 페이지를 즉시 이탈할 수 있는 나가기 버튼 {selector:.wizard-exit-btn} {link:}

## PAGE 1-1: 툴 다운로드 (STEP 1)
에셋 작업 및 툴 다운로드 안내 페이지입니다.

1. **UGC 편집 툴 다운로드:** 사용자에게 사전에 필요한 자체 편집툴 다운로드를 유도 {selector:.tool-guide-box} {link:}
2. **단계 표기 UI:** 현재 자신이 몇 번째 스텝에 있는지 시각적 인지 {selector:#step1 .step-sub} {link:}

## PAGE 1-2: 파일 업로드 (STEP 2)
실제 파일을 업로드하고 약관에 동의하는 페이지입니다.

1. **다중 포맷 슬롯 UI:** `원본(.foot)`, `영상(.mp4)`, `썸네일(.png)` 등 확장자별 개별 입력 지원 및 썸네일 미리보기 {selector:.file-grid} {link:}
2. **약관 동의 모달 연동:** 가짜 동의를 방지하기 위해 약관 스크롤을 필수로 유도 {selector:.custom-chk} {link:}
3. **하단 진행 액션바:** 업로드 조건을 만족해야만 다음 단계 이동 허용 {selector:.wizard-footer} {link:}

## PAGE 1-3: 메타 데이터 기입 (STEP 3)
마켓 판매를 위한 메타 데이터를 기입하는 페이지입니다.

1. **마켓 가격 무결성 기입란:** 최소 금액 0 KP 이상 숫자 폼 유효성 적용 {selector:input[type="number"]} {link:}
2. **게시 만료 기간:** 최소 30일 이상의 일자 선택 로직 {selector:#postDate} {link:}
3. **태깅 큐(Queue) 알고리즘:** 태그 선택 최대 2개 제한 및 초과 시 밀어내기 적용 {selector:.tag-group} {link:}
4. **메인 색상 단선택:** 1개만 선택 가능한 라디오 버튼 기반 태그 그룹 {selector:.color-pill} {link:}

## PAGE 1-4: 업로드 성공 (STEP 4)
모든 제출 과정이 끝난 후 나타나는 완료 화면입니다.

1. **성공 화면 표기:** 업로드 과정이 무사히 종료되었음을 알리는 메시지 도출 {selector:.completion-box} {link:}
2. **최종 마이 스튜디오 이동:** 완료 후 유저를 대시보드로 리다이렉팅하는 파이널 링크 버튼 {selector:.btn-next} {link:}

---

## PAGE 2-list: 마켓 (Store)
변환이 완료되고 판매(On Sale) 중인 모든 유저 UGC가 모여있는 통합 스토어 검색 뷰입니다.

1. **다중 복합 필터 바:** 카테고리, 태그 속성(다크/화려 등), 색상 칩 옵션 필터 혼합 제공 {selector:.filter-sidebar} {link:}
2. **범위형 듀얼 슬라이더:** 직관적인 마우스 드래그를 통해 최저~최대 KP 등락 범위를 한정 검색 {selector:.price-range} {link:}
3. **상단 키워드 검색바:** 상품명이나 크리에이터 등 텍스트 기반 상품 검색 기능 {selector:.search-box} {link:}
4. **아이템 그리드 카드:** 상품 썸네일, 마켓 태그, 하트 수치, 가격이 집약된 상품 목록 UI {selector:.market-grid} {link:}

---

## PAGE 3-myworks: 마이 스튜디오 (나의 작품)
내 활동 요약과 내가 창작한 작품들의 생애주기 전체를 관할하는 관리 탭입니다.

1. **프로필 패널:** 좌측 상단 로그인된 유저의 아이디, 프로필 썸네일 노출 {selector:.profile-card} {link:}
2. **인앱 액수 표기:** 현재 마이월렛 등에서 불러온 실 보유 `KP` 화폐 재화 노출란 {selector:.user-kp} {link:}
3. **KP 충전 모달 버튼:** 보유액 우측 하단에 `[KP 충전하기]` 버튼을 분리 표기하여 원활한 과금 동선 유도 {selector:.profile-card a} {link:}
4. **목록 검색 폼:** 탭 내에서 연동/유지되는 내 작품 전용 검색창 {selector:#searchMyWorks} {link:}
5. **서브 탭 동적 스크롤뷰 필터:** 전체, 변환 완료 등 클릭 액션마다 하단 아이템 강제 필터링 {selector:#tabMyWorks} {link:}
6. **파라미터 링크 쏘기:** 단일 상품 클릭 시 상태를 파라미터로 인코딩하여 상세보기 창에 패스 {selector:#listMyWorks} {link:}

---

## PAGE 3-inventory: 마이 스튜디오 (인벤토리)
내가 마켓에서 구매한 에셋 아이템들을 확인하고 유효기간을 체크하는 탭입니다.

1. **구매 내역 필터 탭:** 전체 목록이나 구매 완료, 만료된 작품만 따로 소팅할 수 있는 필터바 {selector:#tabInventory} {link:}
2. **유효기간 뱃지 알고리즘:** 시스템 시간과 대조하여 만료됨/활성화 배지 색상을 치환하는 UI {selector:#listInventory} {link:}

---

## PAGE 4: 작품 상세 보기
단일 아이템의 정보 및 지난 상태 로그들을 역추적하여 살펴보는 페이지입니다.

1. **다이내믹 뷰 디코딩:** URL 파라미터를 기반으로 화면의 이미지 썸네일과 텍스트 즉시 로딩 {selector:.dt-left} {link:}
2. **상위 상태 뱃지 라벨:** 상태 값 파라미터에 맞춰 "변환 대기 중", "판매 중" 시스템 전용 배지 노출 {selector:.dt-status} {link:}
3. **수정 보안 권한 분기:** 상태가 `변환 대기 중`일 때만 유일하게 `[삭제하기]` 와 `[수정하기]` 작동 {selector:#actionContainer} {link:}
4. **타임라인 트리 구조 트래커:** 등록 시작부터 진화되어 온 거쳐온 모든 단계별 시간순 트리 로그 정렬 {selector:.timeline} {link:}

---

## PAGE 5: 정보 수정 모드
초기 반려 및 정보 변경 요청이 왔을 때 사용되는 전용 수정 모드 폼입니다.

1. **수정 불가 종속 필드 (Lock):** 바꿀 수 없는 필드는 ReadOnly(읽기 전용 회색 칸) 처리 방어 {selector:input[readonly]} {link:}
2. **태깅 최적화 일원화:** 가장 먼저 누른 것을 해제하는 알고리즘 검증 {selector:#editTagGroup} {link:}
3. **숫자 기입 무결성 검증:** HTML5 폼 검증과 음수 배제 Number 특수기능 {selector:input[type="number"]} {link:}
4. **결정 액션 기능 버튼 UI 제한:** 하단에만 버튼 액션을 배치하여 직관적 인터페이스를 제공 {selector:.form-actions} {link:}

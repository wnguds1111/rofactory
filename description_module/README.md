# 📝 PRD Description Module

재사용 가능한 기획서 Description 패널 모듈입니다.
다른 프로젝트에 복사하여 바로 사용할 수 있습니다. 로컬 및 GitHub 자동 동기화를 지원합니다.

## 사용법

### 1. 파일 복사
`description_module` 폴더 전체를 프로젝트 루트에 복사합니다.

### 2. 설정 및 HTML에 추가
적용할 HTML 파일의 `</body>` 바로 위에 아래 코드를 추가합니다:

```html
<!-- PRD DESCRIPTION INJECTION -->
<script>
// 프로젝트에 맞게 설정을 변경하세요
window.DescConfig = {
    storagePrefix: 'myproject_', // 로컬 스토리지 키 충돌 방지용 접두사
    githubRepo: 'owner/repo', // GitHub 저장소 (동기화 사용 시)
    githubPath: 'description_module/desc-data.json' // 저장할 JSON 경로
};
</script>
<link rel="stylesheet" href="description_module/desc-styles.css">
<script src="description_module/desc-script.js"></script>

<div class="page-desc-btn" onclick="showDynamicDescPanel(1)">
    💡 Description
</div>
<div class="page-desc-panel" id="pageDescPanel">
    <div class="pdp-header">
        <span style="font-weight:900; font-size:18px; letter-spacing:1px; color:#0f172a;">DESCRIPTION</span>
        <div style="display:flex; gap:10px; align-items:center;">
            <button id="lockToggleBtn" onclick="toggleLock()" style="border:none; cursor:pointer; background:#0f172a; color:#fff; font-size:12px; font-weight:900; padding:8px 16px; border-radius:20px; transition:0.2s; box-shadow:0 4px 10px rgba(0,0,0,0.1);">🔒 편집 자물쇠 풀기</button>
        </div>
    </div>
    <div class="pdp-body" id="descContent"></div>
</div>
<!-- // PRD DESCRIPTION INJECTION -->
```

### 3. 페이지 번호 설정
해당 페이지 스크립트 상단에 `window.currentPrdPageNum`을 페이지에 맞는 번호로 설정합니다. (예: `window.currentPrdPageNum = 1;`)

### 4. 로컬 서버 사용 (선택 사항)
Node.js 로컬 서버에서 마크다운 및 JSON 파일에 동기화하려면 제공된 `server-handler.js`를 활용하세요:

```javascript
// server.js 파일 내
const createDescSaveHandler = require('./description_module/server-handler');
const descSaveHandler = createDescSaveHandler({
    mdFilePath: require('path').join(__dirname, 'Project_Features.md'),
    jsonFilePath: require('path').join(__dirname, 'description_module', 'desc-data.json')
});

// Express/HTTP 라우터 내에서 호출
if (req.url === '/api/save' && req.method === 'POST') {
    const data = await getBody(req);
    await descSaveHandler(JSON.parse(data));
    // 응답 처리...
}
```

## 파일 구성
- `desc-styles.css` - Description 패널 스타일
- `desc-script.js` - Description 패널 로직 (마커, 빌더, 드래그 등)
- `server-handler.js` - 로컬 파일(MD, JSON) 저장을 지원하는 Node.js 유틸리티
- `desc-data.json` - 저장된 기획 데이터 파일
- `README.md` - 사용 가이드

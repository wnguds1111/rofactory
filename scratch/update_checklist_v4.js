const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'policy_checklist.html');
let html = fs.readFileSync(targetPath, 'utf8');

const automationSection = `
                    <!-- 5. 유저 응모 ~ 마켓 개시 자동화 파이프라인 명세 -->
                    <div style="margin-top:28px; background:#f0fdf4; border:1.5px solid #86efac; border-radius:14px; padding:20px 24px;">
                        <div style="font-size:16px; font-weight:900; color:#166534; display:flex; align-items:center; gap:8px;">
                            <span>🤖</span> <span>5. 유저 발자국 등록 ~ 마켓 개시 전과정 자동화 파이프라인 (E2E Pipeline)</span>
                        </div>
                        <div style="font-size:12.5px; color:#15803d; margin-top:4px;">
                            유저 응모부터 AI 검수, 패치 빌드, 웹 DB 인덱싱 및 어드민 1-Click 마켓 개시까지의 연동 플로우입니다.
                        </div>

                        <!-- 7 Step Visual Pipeline Flowchart -->
                        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:10px; margin-top:16px;">
                            <div style="background:#fff; border:1px solid #bbf7d0; padding:12px; border-radius:8px;">
                                <div style="font-size:11px; font-weight:800; color:#2563eb;">STEP 1. 작품 접수</div>
                                <div style="font-size:12.5px; font-weight:800; color:#0f172a; margin-top:2px;">🎨 발자국 파일 등록</div>
                                <div style="font-size:11px; color:#64748b; margin-top:2px;">register.html 4종 파일 업로드</div>
                            </div>
                            <div style="background:#fff; border:1px solid #bbf7d0; padding:12px; border-radius:8px;">
                                <div style="font-size:11px; font-weight:800; color:#0284c7;">STEP 2. 클라우드 적재</div>
                                <div style="font-size:12.5px; font-weight:800; color:#0f172a; margin-top:2px;">☁️ AWS S3 버킷 저장</div>
                                <div style="font-size:11px; color:#64748b; margin-top:2px;">Presigned URL 자동 저장</div>
                            </div>
                            <div style="background:#fff; border:1px solid #c084fc; padding:12px; border-radius:8px;">
                                <div style="font-size:11px; font-weight:800; color:#7e22ce;">STEP 3. AI 검증 파이프라인</div>
                                <div style="font-size:12.5px; font-weight:800; color:#0f172a; margin-top:2px;">🤖 AI 모델 & 유해성 검수</div>
                                <div style="font-size:11px; color:#64748b; margin-top:2px;">메시/용량/NSFW/IP 자동 체크</div>
                            </div>
                            <div style="background:#fff; border:1px solid #bbf7d0; padding:12px; border-radius:8px;">
                                <div style="font-size:11px; font-weight:800; color:#d97706;">STEP 4. 검증 리스트 분류</div>
                                <div style="font-size:12.5px; font-weight:800; color:#0f172a; margin-top:2px;">📁 완료 파일 폴더화</div>
                                <div style="font-size:11px; color:#64748b; margin-top:2px;">/verified_assets/ 디렉토리화</div>
                            </div>
                            <div style="background:#fff; border:1px solid #bbf7d0; padding:12px; border-radius:8px;">
                                <div style="font-size:11px; font-weight:800; color:#4f46e5;">STEP 5. 패치데이터 빌드</div>
                                <div style="font-size:12.5px; font-weight:800; color:#0f172a; margin-top:2px;">⚙️ 인게임 패치 생성</div>
                                <div style="font-size:11px; color:#64748b; margin-top:2px;">.grf/.gpf 바이너리 자동 생성</div>
                            </div>
                            <div style="background:#fff; border:1px solid #bbf7d0; padding:12px; border-radius:8px;">
                                <div style="font-size:11px; font-weight:800; color:#059669;">STEP 6. 웹 DB 적재</div>
                                <div style="font-size:12.5px; font-weight:800; color:#0f172a; margin-top:2px;">🗄️ 웹 마켓 DB 인덱싱</div>
                                <div style="font-size:11px; color:#64748b; margin-top:2px;">메타데이터 & 3D 경로 저장</div>
                            </div>
                            <div style="background:linear-gradient(135deg,#0f172a,#16a34a); color:#fff; padding:12px; border-radius:8px;">
                                <div style="font-size:11px; font-weight:800; color:#86efac;">STEP 7. 마켓 개시</div>
                                <div style="font-size:12.5px; font-weight:900; color:#fff; margin-top:2px;">🚀 어드민 1-Click Launch</div>
                                <div style="font-size:11px; color:#dcfce7; margin-top:2px;">[START] 버튼 클릭 시 공개</div>
                            </div>
                        </div>
                    </div>
`;

if (!html.includes('5. 유저 발자국 등록 ~ 마켓 개시 전과정 자동화 파이프라인')) {
    const v4TabEnd = html.indexOf('</div>\n            </div>', html.indexOf('id="tab-v4"'));
    if (v4TabEnd !== -1) {
        html = html.substring(0, v4TabEnd) + automationSection + '\n' + html.substring(v4TabEnd);
        fs.writeFileSync(targetPath, html, 'utf8');
        console.log('Successfully added automation pipeline flowchart to policy_checklist.html V4 tab!');
    }
}

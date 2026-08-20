const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'contest_policy.html');
let html = fs.readFileSync(targetPath, 'utf8');

// Replace Section 5 and sidebar 5 with the requested End-to-End Automation Pipeline Flowchart
const newSidebar5 = `<a href="#sec-automation" class="nav-item">🤖 5. 응모 ~ 마켓 개시 자동화 파이프라인</a>`;
html = html.replace('<a href="#sec-wireframes" class="nav-item">📐 5. 콘테스트 핵심 화면 와이어프레임</a>', newSidebar5);
html = html.replace('<a href="#sec-automation" class="nav-item">📐 5. 콘테스트 핵심 화면 와이어프레임</a>', newSidebar5);

const newSection5 = `<!-- ===================== SECTION 5 ===================== -->
            <div class="page-section" id="sec-automation">
                <div class="page-header">
                    <div class="page-icon" style="background:#f0fdf4; color:#16a34a;">🤖</div>
                    <h3>5. 유저 응모 ~ 인게임/마켓 개시 전 과정 자동화 파이프라인 & 프로세스 플로우차트</h3>
                    <div class="section-edit-tools" style="display:none; margin-left:auto; gap:6px;">
                        <button onclick="addAutomationStep(this)" style="background:#e0f2fe; color:#0369a1; border:1px solid #bae6fd; padding:3px 10px; border-radius:4px; font-size:11.5px; font-weight:700; cursor:pointer;">+ 단계 추가</button>
                    </div>
                    <span class="page-tag" style="margin-left:10px; background:#dcfce7; color:#15803d;">End-to-End Automation Spec</span>
                </div>
                <div class="page-body">

                    <div class="alert-box alert-info" style="margin-bottom:24px; background:#ecfdf5; border-color:#a7f3d0; color:#065f46;">
                        <span class="alert-icon">⚡</span>
                        <div>
                            <strong>RO Factory 크리에이터 공모전 전과정 자동화 파이프라인 (E2E Process)</strong><br>
                            유저의 작품 응모(<code>register.html</code>)부터 S3 데이터 적재, AI 자동 검증, 인게임 패치 빌드, 웹 DB 적재 및 어드민 1-Click 마켓 런칭까지 전체 시스템 연동 플로우차트입니다.
                        </div>
                    </div>

                    <!-- Flowchart Visual Diagram Header -->
                    <div class="spec-group">
                        <div class="spec-label-row">
                            <div class="spec-label" style="border-left-color:#10b981;">🔄 프로세스 플로우차트 다이어그램 (7개 단계)</div>
                        </div>

                        <!-- Step Cards Flowchart Container -->
                        <div style="display:flex; flex-direction:column; gap:12px; position:relative; margin-top:16px;" id="automationFlowContainer">
                            
                            <!-- STEP 1 -->
                            <div style="background:#f8fafc; border:2px solid #cbd5e1; border-radius:12px; padding:18px 22px; display:flex; gap:16px; align-items:center; position:relative;">
                                <div style="width:42px; height:42px; border-radius:50%; background:#2563eb; color:#fff; font-weight:900; font-size:16px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">1</div>
                                <div style="flex:1;">
                                    <div style="font-size:11px; font-weight:800; color:#2563eb; text-transform:uppercase;">STEP 01. 유저 작품 접수 (User Submission)</div>
                                    <div style="font-size:15px; font-weight:900; color:#0f172a; margin-top:2px;">🎨 유저 발자국 파일 등록 (<code>register.html</code>)</div>
                                    <div style="font-size:12.5px; color:#475569; margin-top:4px;">
                                        정액제/KP 결제 유저가 공모전 티켓(30회 캡)을 사용하여 필수 4종 자산 파일(<code>.foot</code>, <code>.mp4</code>, <code>.png</code>, <code>meta.json</code>)과 <strong>아티스트 닉네임</strong>을 작성하여 업로드합니다.
                                    </div>
                                </div>
                                <div style="background:#dbeafe; color:#1e40af; padding:6px 12px; border-radius:8px; font-size:11.5px; font-weight:800; white-space:nowrap;">웹 클라이언트</div>
                            </div>

                            <div style="text-align:center; color:#94a3b8; font-size:18px; font-weight:900; margin:-4px 0;">⬇️</div>

                            <!-- STEP 2 -->
                            <div style="background:#f8fafc; border:2px solid #cbd5e1; border-radius:12px; padding:18px 22px; display:flex; gap:16px; align-items:center; position:relative;">
                                <div style="width:42px; height:42px; border-radius:50%; background:#0284c7; color:#fff; font-weight:900; font-size:16px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">2</div>
                                <div style="flex:1;">
                                    <div style="font-size:11px; font-weight:800; color:#0284c7; text-transform:uppercase;">STEP 02. 클라우드 파일 적재 (S3 Storage)</div>
                                    <div style="font-size:15px; font-weight:900; color:#0f172a; margin-top:2px;">☁️ AWS S3 원본 자산 버킷 자동 적재</div>
                                    <div style="font-size:12.5px; color:#475569; margin-top:4px;">
                                        업로드된 자산이 보안 서명된 URL을 통해 AWS S3 Staging 버킷(<code>s3://rofactory-contest-staging/season_1/{item_id}/</code>)에 즉시 저장됩니다.
                                    </div>
                                </div>
                                <div style="background:#e0f2fe; color:#0369a1; padding:6px 12px; border-radius:8px; font-size:11.5px; font-weight:800; white-space:nowrap;">AWS S3 Bucket</div>
                            </div>

                            <div style="text-align:center; color:#94a3b8; font-size:18px; font-weight:900; margin:-4px 0;">⬇️</div>

                            <!-- STEP 3 -->
                            <div style="background:#faf5ff; border:2px solid #c084fc; border-radius:12px; padding:18px 22px; display:flex; gap:16px; align-items:center; position:relative;">
                                <div style="width:42px; height:42px; border-radius:50%; background:#7e22ce; color:#fff; font-weight:900; font-size:16px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">3</div>
                                <div style="flex:1;">
                                    <div style="font-size:11px; font-weight:800; color:#7e22ce; text-transform:uppercase;">STEP 03. AI 검증 파이프라인 (AI Automated Verification)</div>
                                    <div style="font-size:15px; font-weight:900; color:#0f172a; margin-top:2px;">🤖 AI 모델 검증 & 저작권/유해성/규격 자동 검수</div>
                                    <div style="font-size:12.5px; color:#475569; margin-top:4px;">
                                        AI 파이프라인이 3D 메시 텍스처 폴리곤 수, 파일 용량 제한, 텍스트/이미지 유해성(NSFW), 폰트 및 기존 타사 IP 침해 가능성을 100% 자동 검사합니다. (통과 시 <code>PASSED</code> 플래그 부여)
                                    </div>
                                </div>
                                <div style="background:#f3e8ff; color:#6b21a8; padding:6px 12px; border-radius:8px; font-size:11.5px; font-weight:800; white-space:nowrap;">AI Worker Engine</div>
                            </div>

                            <div style="text-align:center; color:#94a3b8; font-size:18px; font-weight:900; margin:-4px 0;">⬇️</div>

                            <!-- STEP 4 -->
                            <div style="background:#f8fafc; border:2px solid #cbd5e1; border-radius:12px; padding:18px 22px; display:flex; gap:16px; align-items:center; position:relative;">
                                <div style="width:42px; height:42px; border-radius:50%; background:#d97706; color:#fff; font-weight:900; font-size:16px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">4</div>
                                <div style="flex:1;">
                                    <div style="font-size:11px; font-weight:800; color:#d97706; text-transform:uppercase;">STEP 04. 검증 자산 구조화 (Verified Asset Staging)</div>
                                    <div style="font-size:15px; font-weight:900; color:#0f172a; margin-top:2px;">📁 별도 검증 완료 파일 리스트 자동 폴더화</div>
                                    <div style="font-size:12.5px; color:#475569; margin-top:4px;">
                                        AI 검증을 통과한 무결성 파일만 정제되어 별도 검증 완료 Production 저장소(<code>/verified_assets/season_1/approved/</code>)로 자동 분류 및 디렉토리화됩니다.
                                    </div>
                                </div>
                                <div style="background:#fef3c7; color:#92400e; padding:6px 12px; border-radius:8px; font-size:11.5px; font-weight:800; white-space:nowrap;">Verified Staging Directory</div>
                            </div>

                            <div style="text-align:center; color:#94a3b8; font-size:18px; font-weight:900; margin:-4px 0;">⬇️</div>

                            <!-- STEP 5 -->
                            <div style="background:#f8fafc; border:2px solid #cbd5e1; border-radius:12px; padding:18px 22px; display:flex; gap:16px; align-items:center; position:relative;">
                                <div style="width:42px; height:42px; border-radius:50%; background:#4f46e5; color:#fff; font-weight:900; font-size:16px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">5</div>
                                <div style="flex:1;">
                                    <div style="font-size:11px; font-weight:800; color:#4f46e5; text-transform:uppercase;">STEP 05. 인게임 패치 자동 빌드 (Automated Patch Generator)</div>
                                    <div style="font-size:15px; font-weight:900; color:#0f172a; margin-top:2px;">⚙️ 라그나로크 클라이언트 패치 데이터 자동 생성</div>
                                    <div style="font-size:12.5px; color:#475569; margin-top:4px;">
                                        선정 및 검증된 10개 작품의 <code>.foot</code> 바이너리를 라그나로크 온라인 클라이언트 리소스 번들(<code>.grf</code> / <code>.gpf</code>) 및 인게임 이펙트 테이블 연동 파일로 자동 컴파일 및 빌드합니다.
                                    </div>
                                </div>
                                <div style="background:#e0e7ff; color:#3730a3; padding:6px 12px; border-radius:8px; font-size:11.5px; font-weight:800; white-space:nowrap;">Patch Builder Pipeline</div>
                            </div>

                            <div style="text-align:center; color:#94a3b8; font-size:18px; font-weight:900; margin:-4px 0;">⬇️</div>

                            <!-- STEP 6 -->
                            <div style="background:#f8fafc; border:2px solid #cbd5e1; border-radius:12px; padding:18px 22px; display:flex; gap:16px; align-items:center; position:relative;">
                                <div style="width:42px; height:42px; border-radius:50%; background:#059669; color:#fff; font-weight:900; font-size:16px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">6</div>
                                <div style="flex:1;">
                                    <div style="font-size:11px; font-weight:800; color:#059669; text-transform:uppercase;">STEP 06. 웹 & 마켓 DB 인덱싱 (Web & Market Database Indexing)</div>
                                    <div style="font-size:15px; font-weight:900; color:#0f172a; margin-top:2px;">🗄️ 웹 DB & RO Factory 마켓 상점 자동 적재</div>
                                    <div style="font-size:12.5px; color:#475569; margin-top:4px;">
                                        작품 메타데이터, 3D WebGL 프리뷰 경로, 아티스트 닉네임 및 가격/상점 정보를 상용 웹 DB(MySQL/MongoDB) 및 마켓 상점 스테이징 테이블에 자동 인덱싱 및 저장합니다.
                                    </div>
                                </div>
                                <div style="background:#d1fae5; color:#065f46; padding:6px 12px; border-radius:8px; font-size:11.5px; font-weight:800; white-space:nowrap;">Production Web DB</div>
                            </div>

                            <div style="text-align:center; color:#94a3b8; font-size:18px; font-weight:900; margin:-4px 0;">⬇️</div>

                            <!-- STEP 7 -->
                            <div style="background:linear-gradient(135deg, #0f172a, #16a34a); border:2px solid #22c55e; border-radius:14px; padding:22px 26px; color:#fff; display:flex; gap:18px; align-items:center; position:relative; box-shadow:0 8px 20px rgba(22, 163, 74, 0.25);">
                                <div style="width:48px; height:48px; border-radius:50%; background:#22c55e; color:#fff; font-weight:900; font-size:18px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">7</div>
                                <div style="flex:1;">
                                    <div style="font-size:11px; font-weight:800; color:#86efac; text-transform:uppercase;">STEP 07. 최종 마켓 개시 (Admin 1-Click Launch)</div>
                                    <div style="font-size:17px; font-weight:900; color:#fff; margin-top:2px;">🚀 관리자 스타트 버튼 클릭 시 마켓 & 인게임 상점 통합 개시</div>
                                    <div style="font-size:13px; color:#dcfce7; margin-top:4px; line-height:1.6;">
                                        어드민 백오피스(<code>admin.html</code>)에서 관리자가 <strong>[🚀 마켓 상점 일괄 개시 (Start Market)]</strong> 버튼을 클릭하는 즉시, 
                                        RO Factory 글로벌 마켓(<code>market.html</code>)과 인게임 정기점검 상점 판매가 100% 동시에 활성화되고 공개됩니다!
                                    </div>
                                </div>
                                <div style="background:#ffffff; color:#15803d; padding:10px 18px; border-radius:10px; font-size:13px; font-weight:900; white-space:nowrap; box-shadow:0 4px 12px rgba(0,0,0,0.15);">
                                    🚀 마켓 개시 (START)
                                </div>
                            </div>

                        </div>
                    </div>

                    <!-- Pipeline Specification Table -->
                    <div class="spec-group" style="margin-top:28px;">
                        <div class="spec-label-row">
                            <div class="spec-label">자동화 파이프라인 단계별 세부 기술 명세표</div>
                            <div class="section-edit-tools" style="display:none; gap:6px;">
                                <button onclick="addTableRow(this)" style="background:#e0f2fe; color:#0369a1; border:1px solid #bae6fd; padding:3px 10px; border-radius:4px; font-size:11.5px; font-weight:700; cursor:pointer;">+ 행 추가</button>
                            </div>
                        </div>
                        <table class="spec-table">
                            <thead>
                                <tr>
                                    <th style="width:160px;">파이프라인 단계</th>
                                    <th style="width:260px;">자동화 입출력 데이터</th>
                                    <th>기술 처리 로직 및 자동화 명세</th>
                                    <th style="width:110px; text-align:center;">상태</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="field">① S3 원본 적재</td>
                                    <td><code>.foot</code>, <code>.mp4</code>, <code>.png</code>, <code>meta.json</code></td>
                                    <td>유저가 웹 업로드 시 AWS S3 보안 Presigned URL 발급을 통해 Staging 버킷으로 원본 파일 자동 업로드 저장.</td>
                                    <td style="text-align:center;"><span class="badge badge-green">✅ 확정</span></td>
                                </tr>
                                <tr>
                                    <td class="field">② AI 검증 자동화</td>
                                    <td>3D Mesh, Texture, Metadata</td>
                                    <td>
                                        AI Worker 모듈이 3D 폴리곤 수, 파일 용량 제한, 텍스트/이미지 유해성(NSFW), 폰트 및 IP 침해 여부를 100% 자동 검수 후 <code>PASSED</code> 상태 부여.
                                        <button class="btn-row-del" onclick="deleteTableRow(this)">🗑️ 삭제</button>
                                    </td>
                                    <td style="text-align:center;"><span class="badge badge-blue">✅ 제안/확정</span></td>
                                </tr>
                                <tr>
                                    <td class="field">③ 검증 리스트 폴더화</td>
                                    <td><code>/verified_assets/season_N/</code></td>
                                    <td>AI 검증이 통과된 클린 파일만 정제하여 별도 검증 완료 Production 디렉토리로 자동 분류 및 디렉토리화.</td>
                                    <td style="text-align:center;"><span class="badge badge-green">✅ 확정</span></td>
                                </tr>
                                <tr>
                                    <td class="field">④ 패치데이터 빌드</td>
                                    <td><code>.gpf</code> / <code>.grf</code> 리소스 패치</td>
                                    <td>최종 선정작 10개의 <code>.foot</code> 바이너리를 라그나로크 온라인 클라이언트 패치 데이터(.grf/.gpf)로 자동 컴파일 및 연동 테이블 생성.</td>
                                    <td style="text-align:center;"><span class="badge badge-green">✅ 확정</span></td>
                                </tr>
                                <tr>
                                    <td class="field">⑤ 웹 DB 적재</td>
                                    <td>MySQL / MongoDB Index</td>
                                    <td>작품 상세 정보, 3D WebGL 뷰어 경로, 아티스트 닉네임 및 가격 정보를 Production 웹 DB에 자동 적재.</td>
                                    <td style="text-align:center;"><span class="badge badge-green">✅ 확정</span></td>
                                </tr>
                                <tr>
                                    <td class="field">⑥ 관리자 1-Click 개시</td>
                                    <td><code>admin.html</code> [START] 버튼</td>
                                    <td>어드민 백오피스에서 관리자가 [마켓 개시] 스타트 버튼 클릭 시 웹 마켓(<code>market.html</code>)과 인게임 마켓 상점이 일괄 동시 런칭.</td>
                                    <td style="text-align:center;"><span class="badge badge-green">✅ 확정</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>`;

// Replace section 5 block in HTML
const sec5Start = html.indexOf('<!-- ===================== SECTION 5 ===================== -->');
if (sec5Start !== -1) {
    const mainEnd = html.indexOf('</div>\n    </div>', sec5Start);
    if (mainEnd !== -1) {
        html = html.substring(0, sec5Start) + newSection5 + '\n\n        ' + html.substring(mainEnd);
    }
}

fs.writeFileSync(targetPath, html, 'utf8');
console.log('Successfully updated Section 5 with E2E Automation Pipeline Flowchart!');

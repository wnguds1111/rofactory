const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'contest_policy.html');
let html = fs.readFileSync(targetPath, 'utf8');

// 1. Update STEP 04 badge to '자동화 검증'
html = html.replace('<span style="background:#f3e8ff; color:#6b21a8; padding:3px 10px; border-radius:6px; font-size:11px; font-weight:800;">S3 + Lambda</span>',
                    '<span style="background:#f3e8ff; color:#6b21a8; padding:3px 10px; border-radius:6px; font-size:11px; font-weight:800;">자동화 검증</span>');

// 2. Update STEP 07 (패치 및 마켓 데이터 자동 생성) badge to '자동화 검증' and REMOVE considerations box
const step07Old = `<!-- STEP 07 -->
                            <div style="background:#ffffff; border:1px solid #cbd5e1; border-left:5px solid #a855f7; border-radius:12px; padding:20px; box-shadow:0 2px 6px rgba(0,0,0,0.02);">
                                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                                    <div style="font-size:16px; font-weight:900; color:#0f172a;">STEP 07. 패치 및 마켓 데이터 자동 생성</div>
                                    <span style="background:#f3e8ff; color:#6b21a8; padding:3px 10px; border-radius:6px; font-size:11px; font-weight:800;">자동 빌드</span>
                                </div>
                                <div style="font-size:15px; color:#334155; line-height:1.6;">
                                    선정된 발자국 리스트에 자동으로 아이템 ID 매핑
                                </div>
                                <div style="margin-top:12px; background:#f8fafc; border-left:3px solid #a855f7; padding:10px 14px; border-radius:0 6px 6px 0; font-size:14.5px; color:#475569; line-height:1.6;">
                                    <strong>고려사항</strong>: 정기점검 당일 점검 시작 2시간 전 리소스 패치 파일 자동 컴파일 완료 및 RO 패처 CDN 스테이징 서버 자동 동기화.
                                </div>
                            </div>`;

const step07New = `<!-- STEP 07 -->
                            <div style="background:#ffffff; border:1px solid #cbd5e1; border-left:5px solid #a855f7; border-radius:12px; padding:20px; box-shadow:0 2px 6px rgba(0,0,0,0.02);">
                                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                                    <div style="font-size:16px; font-weight:900; color:#0f172a;">STEP 07. 패치 및 마켓 데이터 자동 생성</div>
                                    <span style="background:#f3e8ff; color:#6b21a8; padding:3px 10px; border-radius:6px; font-size:11px; font-weight:800;">자동화 검증</span>
                                </div>
                                <div style="font-size:15px; color:#334155; line-height:1.6;">
                                    선정된 발자국 리스트에 자동으로 아이템 ID 매핑
                                </div>
                            </div>`;

html = html.replace(step07Old, step07New);

// 3. Update STEP 08 (마켓 DB 전달) description and REMOVE considerations box
const step08Old = `<!-- STEP 08 -->
                            <div style="background:#ffffff; border:1px solid #cbd5e1; border-left:5px solid #09090b; border-radius:12px; padding:20px; box-shadow:0 2px 6px rgba(0,0,0,0.02);">
                                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                                    <div style="font-size:16px; font-weight:900; color:#0f172a;">STEP 08. 마켓 DB 전달</div>
                                    <span style="background:#f4f4f5; color:#18181b; padding:3px 10px; border-radius:6px; font-size:11px; font-weight:800;">판매 대기</span>
                                </div>
                                <div style="font-size:15px; color:#334155; line-height:1.6;">
                                    자동 매핑 이후 어드민에서 판매 대기 상태 전환
                                </div>
                                <div style="margin-top:12px; background:#f8fafc; border-left:3px solid #09090b; padding:10px 14px; border-radius:0 6px 6px 0; font-size:14.5px; color:#475569; line-height:1.6;">
                                    <strong>고려사항</strong>: 당첨 크리에이터 유저에게 [영구 소유 귀속 아이템] 무상 발급 + 마켓 일반 구매 유저용 [무제한 영구 소유권] 상품 속성 최종 전달.
                                </div>
                            </div>`;

const step08New = `<!-- STEP 08 -->
                            <div style="background:#ffffff; border:1px solid #cbd5e1; border-left:5px solid #09090b; border-radius:12px; padding:20px; box-shadow:0 2px 6px rgba(0,0,0,0.02);">
                                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                                    <div style="font-size:16px; font-weight:900; color:#0f172a;">STEP 08. 마켓 DB 전달</div>
                                    <span style="background:#f4f4f5; color:#18181b; padding:3px 10px; border-radius:6px; font-size:11px; font-weight:800;">판매 대기</span>
                                </div>
                                <div style="font-size:15px; color:#334155; line-height:1.6;">
                                    자동 매핑 이후 웹 어드민에서 자동 판매 대기 상태 전환
                                </div>
                            </div>`;

html = html.replace(step08Old, step08New);

// 4. Redesign the Infographic Process Flow inside Proposal Box for Ultra-Clean Visibility
const proposalInfographicOld = html.substring(
    html.indexOf('<!-- Infographic Visual Process Flow -->'),
    html.indexOf('<!-- Comparison Table -->')
);

const proposalInfographicNew = `<!-- Infographic Visual Process Flow -->
                        <div style="background:#ffffff; border:1px solid #e9d5ff; border-radius:12px; padding:20px; margin-bottom:24px; box-shadow:0 2px 8px rgba(147, 51, 234, 0.04);">
                            <div style="font-size:14px; font-weight:900; color:#581c87; margin-bottom:16px; padding-left:10px; border-left:4px solid #9333ea;">
                                프리미엄 회원제 메커니즘 흐름도
                            </div>

                            <div style="display:flex; flex-wrap:wrap; gap:12px; align-items:center; justify-content:space-between;">
                                
                                <!-- Step 1 -->
                                <div style="flex:1; min-width:200px; background:#fcfaef; border:1.5px solid #fde047; border-radius:10px; padding:16px; box-shadow:0 2px 4px rgba(0,0,0,0.02);">
                                    <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
                                        <span style="background:#ca8a04; color:#ffffff; font-size:11px; font-weight:900; padding:2px 8px; border-radius:12px;">1단계</span>
                                        <span style="font-size:14px; font-weight:900; color:#854d0e;">이벤트 결제</span>
                                    </div>
                                    <div style="font-size:13px; color:#713f12; line-height:1.5;">
                                        정액제/KP 결제 시 <strong>[아티스트 권한]</strong> + <strong>티켓 10회</strong> 발급
                                    </div>
                                </div>

                                <div style="font-size:22px; font-weight:900; color:#a855f7; padding:0 4px;">→</div>

                                <!-- Step 2 -->
                                <div style="flex:1; min-width:200px; background:#faf5ff; border:1.5px solid #e9d5ff; border-radius:10px; padding:16px; box-shadow:0 2px 4px rgba(0,0,0,0.02);">
                                    <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
                                        <span style="background:#9333ea; color:#ffffff; font-size:11px; font-weight:900; padding:2px 8px; border-radius:12px;">2단계</span>
                                        <span style="font-size:14px; font-weight:900; color:#581c87;">10회 정성 출품</span>
                                    </div>
                                    <div style="font-size:13.5px; color:#6b21a8; line-height:1.5;">
                                        스팸 방지용 <strong>10회 집중 출품 캡</strong>으로 고품질 3D 자산 등록
                                    </div>
                                </div>

                                <div style="font-size:22px; font-weight:900; color:#a855f7; padding:0 4px;">→</div>

                                <!-- Step 3 -->
                                <div style="flex:1; min-width:200px; background:#faf5ff; border:1.5px solid #e9d5ff; border-radius:10px; padding:16px; box-shadow:0 2px 4px rgba(0,0,0,0.02);">
                                    <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
                                        <span style="background:#9333ea; color:#ffffff; font-size:11px; font-weight:900; padding:2px 8px; border-radius:12px;">3단계</span>
                                        <span style="font-size:14px; font-weight:900; color:#581c87;">유저 인기 투표</span>
                                    </div>
                                    <div style="font-size:13.5px; color:#6b21a8; line-height:1.5;">
                                        100% 유저 인기 투표 결과 순위로 <strong>상위 10개 당첨작</strong> 선정
                                    </div>
                                </div>

                                <div style="font-size:22px; font-weight:900; color:#a855f7; padding:0 4px;">→</div>

                                <!-- Step 4 -->
                                <div style="flex:1; min-width:200px; background:#f3e8ff; border:2px solid #9333ea; border-radius:10px; padding:16px; box-shadow:0 2px 6px rgba(147,51,234,0.12);">
                                    <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
                                        <span style="background:#581c87; color:#ffffff; font-size:11px; font-weight:900; padding:2px 8px; border-radius:12px;">4단계</span>
                                        <span style="font-size:14px; font-weight:900; color:#3b0764;">독점 소장 자격</span>
                                    </div>
                                    <div style="font-size:13.5px; color:#581c87; font-weight:800; line-height:1.5;">
                                        <strong>[아티스트 권한 보유 유저 전용 마켓 소장/구매 자격 제공]</strong>
                                    </div>
                                </div>

                            </div>
                        </div>\n\n                        `;

html = html.replace(proposalInfographicOld, proposalInfographicNew);

fs.writeFileSync(targetPath, html, 'utf8');
console.log('Successfully updated steps 04, 07, 08 and redesigned proposal infographic in contest_policy.html!');

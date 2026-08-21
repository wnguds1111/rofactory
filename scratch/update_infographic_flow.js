const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'contest_policy.html');
let html = fs.readFileSync(targetPath, 'utf8');

const oldFlow = html.substring(
    html.indexOf('<!-- Infographic Visual Process Flow -->'),
    html.indexOf('<!-- Comparison Table (Clean Grid Lines) -->')
);

const newFlow = `<!-- Infographic Visual Process Flow -->
                        <div style="background:#ffffff; border:1px solid #e9d5ff; border-radius:12px; padding:20px; margin-bottom:24px; box-shadow:0 2px 8px rgba(147, 51, 234, 0.04);">
                            <div style="font-size:14px; font-weight:900; color:#581c87; margin-bottom:16px; padding-left:10px; border-left:4px solid #9333ea;">
                                프리미엄 회원제 메커니즘 흐름도
                            </div>

                            <div style="display:flex; flex-wrap:wrap; gap:12px; align-items:stretch; justify-content:space-between;">
                                
                                <!-- Step 1 -->
                                <div style="flex:1; min-width:210px; background:#fcfaef; border:1.5px solid #fde047; border-radius:10px; padding:16px; box-shadow:0 2px 4px rgba(0,0,0,0.02); display:flex; flex-direction:column; justify-content:space-between;">
                                    <div>
                                        <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
                                            <span style="background:#ca8a04; color:#ffffff; font-size:11px; font-weight:900; padding:2px 8px; border-radius:12px;">1단계</span>
                                            <span style="font-size:14px; font-weight:900; color:#854d0e;">이벤트 결제</span>
                                        </div>
                                        <div style="font-size:13px; color:#713f12; line-height:1.5; margin-bottom:6px;">
                                            이벤트 기간 정액제/KP 결제 시 <strong>[아티스트 권한]</strong> + <strong>티켓 10회</strong> 발급
                                        </div>
                                    </div>
                                    <div style="font-size:11.5px; color:#a16207; background:rgba(250,204,21,0.25); border-left:3px solid #ca8a04; padding:6px 8px; border-radius:0 4px 4px 0; margin-top:8px; line-height:1.4;">
                                        • <strong>아티스트 권한</strong>: 해당 시즌 발자국 무제한 구매 가능 / 발자국 등록 티켓 10회 발급
                                    </div>
                                </div>

                                <div style="display:flex; align-items:center; justify-content:center; font-size:22px; font-weight:900; color:#a855f7; padding:0 2px;">→</div>

                                <!-- Step 2 -->
                                <div style="flex:1; min-width:210px; background:#faf5ff; border:1.5px solid #e9d5ff; border-radius:10px; padding:16px; box-shadow:0 2px 4px rgba(0,0,0,0.02); display:flex; flex-direction:column; justify-content:space-between;">
                                    <div>
                                        <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
                                            <span style="background:#9333ea; color:#ffffff; font-size:11px; font-weight:900; padding:2px 8px; border-radius:12px;">2단계</span>
                                            <span style="font-size:14px; font-weight:900; color:#581c87;">10개 슬롯 부여</span>
                                        </div>
                                        <div style="font-size:13px; color:#6b21a8; line-height:1.5;">
                                            발자국 작품 등록용 <strong>10개 집중 출품 슬롯</strong>으로 고품질 3D 자산 등록
                                        </div>
                                    </div>
                                </div>

                                <div style="display:flex; align-items:center; justify-content:center; font-size:22px; font-weight:900; color:#a855f7; padding:0 2px;">→</div>

                                <!-- Step 3 -->
                                <div style="flex:1; min-width:210px; background:#faf5ff; border:1.5px solid #e9d5ff; border-radius:10px; padding:16px; box-shadow:0 2px 4px rgba(0,0,0,0.02); display:flex; flex-direction:column; justify-content:space-between;">
                                    <div>
                                        <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
                                            <span style="background:#9333ea; color:#ffffff; font-size:11px; font-weight:900; padding:2px 8px; border-radius:12px;">3단계</span>
                                            <span style="font-size:14px; font-weight:900; color:#581c87;">유저 인기 투표</span>
                                        </div>
                                        <div style="font-size:13px; color:#6b21a8; line-height:1.5;">
                                            100% 유저 인기 투표 결과 순위로 <strong>상위 10개 당첨작</strong> 선정
                                        </div>
                                    </div>
                                    <div style="font-size:11.5px; color:#7e22ce; background:#f3e8ff; border-left:3px solid #9333ea; padding:6px 8px; border-radius:0 4px 4px 0; margin-top:8px; line-height:1.4;">
                                        • 당첨작 개수는 어드민에서 자유롭게 변경 가능
                                    </div>
                                </div>

                                <div style="display:flex; align-items:center; justify-content:center; font-size:22px; font-weight:900; color:#a855f7; padding:0 2px;">→</div>

                                <!-- Step 4 -->
                                <div style="flex:1; min-width:210px; background:#f3e8ff; border:2px solid #9333ea; border-radius:10px; padding:16px; box-shadow:0 2px 6px rgba(147,51,234,0.12); display:flex; flex-direction:column; justify-content:space-between;">
                                    <div>
                                        <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
                                            <span style="background:#581c87; color:#ffffff; font-size:11px; font-weight:900; padding:2px 8px; border-radius:12px;">4단계</span>
                                            <span style="font-size:14px; font-weight:900; color:#3b0764;">마켓 오픈</span>
                                        </div>
                                        <div style="font-size:13px; color:#581c87; font-weight:800; line-height:1.5;">
                                            <strong>[아티스트 권한 보유 유저 전용 마켓 오픈 / 구매 자격 제공]</strong>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>\n\n                        `;

if (oldFlow) {
    html = html.replace(oldFlow, newFlow);
    fs.writeFileSync(targetPath, html, 'utf8');
    console.log('Successfully updated 4-step infographic flowchart in contest_policy.html!');
} else {
    console.error('Infographic flowchart section not found!');
}

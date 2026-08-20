const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'contest_policy.html');
let html = fs.readFileSync(targetPath, 'utf8');

// Proposal HTML component matching the user's explicit specification
const proposalHtml = `
                    <!-- Proposal Box: Ticket Distribution & Market Purchase Privileges -->
                    <div class="spec-group" style="margin-top:32px; background:#faf5ff; border:2px solid #c084fc; border-radius:16px; padding:24px 28px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                            <div style="font-size:16px; font-weight:900; color:#581c87;">
                                발자국 티켓 지급 및 구매 권한 정책 명세 (기본안 vs 프리미엄 아티스트 회원제 제안안)
                            </div>
                            <span style="background:#9333ea; color:#fff; padding:4px 12px; border-radius:12px; font-size:11px; font-weight:800;">BM & Membership Proposal</span>
                        </div>

                        <div style="font-size:13px; color:#6b21a8; line-height:1.6; margin-bottom:20px;">
                            기존 플레이어 유저에게 발자국 작품 등록 기회뿐만 아니라 <strong>[아티스트 권한]</strong>을 부여하여, 결제 시 추후 최종 선정된 한정판 발자국 아이템을 소장할 수 있는 <strong>프리미엄 멤버십 가치</strong>를 제공하는 기획 제안입니다.
                        </div>

                        <!-- Comparison Table -->
                        <table class="spec-table" style="margin-bottom:20px;">
                            <thead>
                                <tr>
                                    <th style="width:160px;">구분</th>
                                    <th style="width:300px;">기본안 (Standard Policy)</th>
                                    <th>당사 제안안 (Premium Artist Membership)</th>
                                    <th style="width:110px; text-align:center;">상태</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="field">티켓 지급 조건</td>
                                    <td>기간 상관없이 정액제 구매 시 30회 티켓 일괄 발송</td>
                                    <td>
                                        <strong>이벤트 기간 내 정액제 또는 결제(KP/패키지) 진행 시</strong> 발자국 등록 티켓 10회 발송 + <strong>[아티스트 권한]</strong> 부여
                                    </td>
                                    <td style="text-align:center;"><span class="badge badge-blue">당사제안</span></td>
                                </tr>
                                <tr>
                                    <td class="field">작품 출품 캡</td>
                                    <td>30회 출품 기회 제공</td>
                                    <td><strong>10회 출품 캡 적용</strong> (무성의한 스팸 업로드 방지 및 고품질 정성 출품 유도)</td>
                                    <td style="text-align:center;"><span class="badge badge-blue">당사제안</span></td>
                                </tr>
                                <tr>
                                    <td class="field">마켓 구매 자격</td>
                                    <td>정액제 구매 여부와 상관없이 모든 유저 구매 가능</td>
                                    <td>
                                        <strong>[아티스트 권한] 보유 유저 전용 마켓 구매 가능</strong> (이벤트 기간 결제 유저 대상 독점 소유권 제공)
                                    </td>
                                    <td style="text-align:center;"><span class="badge badge-blue">당사제안</span></td>
                                </tr>
                                <tr>
                                    <td class="field">BM 과금 동기 (Benefit)</td>
                                    <td>단순 공모전 출품 기회 제공 (결제 유인 요소 약함)</td>
                                    <td>
                                        아티스트 권한 획득을 통한 <strong>유저 결제 유도(과금 명분 극대화)</strong> + 최종 선정작 구매 소장권 제공
                                    </td>
                                    <td style="text-align:center;"><span class="badge badge-green">기획효과</span></td>
                                </tr>
                            </tbody>
                        </table>

                        <!-- Detailed Strategic Intent -->
                        <div style="background:#ffffff; border:1px solid #e9d5ff; border-radius:12px; padding:18px 20px;">
                            <div style="font-size:14px; font-weight:900; color:#581c87; margin-bottom:8px;">
                                프리미엄 아티스트 회원제 기획 의도 및 기대 효과
                            </div>
                            <div style="font-size:12.5px; color:#475569; line-height:1.7;">
                                • <strong>과금 유저 대상 프리미엄 가치 제공</strong>: 기존 유저가 이벤트 기간 결제 시 발자국 등록 기회(10회)뿐만 아니라 '아티스트 권한'을 획득하게 되어, 공모전 발표 후 최종 선정된 발자국 아이템을 남들보다 먼저 소장할 수 있다는 강력한 과금 동기를 형성합니다.<br>
                                • <strong>작품 퀄리티 상승 및 스팸 차단</strong>: 무분별한 30회 등록 대신 10회 집중 등록을 유도하여 3D 메시 규격 및 완성도가 높은 양질의 크리에이터 데이터 수집을 도모합니다.<br>
                                • <strong>유저 소속감 및 브랜드 가치 제고</strong>: 단순 소비자가 아닌 RO Factory 공식 크리에이터 아티스트 멤버십에 참여한다는 자부심을 제공합니다.
                            </div>
                        </div>

                    </div>`;

// Insert the proposal block right before the closing </div> of #automationFlowContainer or #sec-automation
const targetMarker = '<!-- STEP 11 (LAUNCHED HIGHLIGHT) -->';
const step11EndIndex = html.indexOf('</div>\n\n                        </div>\n                    </div>', html.indexOf(targetMarker));

if (step11EndIndex !== -1) {
    const insertPos = step11EndIndex + '</div>\n\n                        </div>\n                    </div>'.length;
    const updatedHtml = html.slice(0, insertPos) + '\n' + proposalHtml + html.slice(insertPos);
    fs.writeFileSync(targetPath, updatedHtml, 'utf8');
    console.log('Successfully added ticket & market purchase proposal block to contest_policy.html!');
} else {
    console.error('Target step 11 end marker not found!');
}

const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'contest_policy.html');
let html = fs.readFileSync(targetPath, 'utf8');

const oldTableArea = html.substring(
    html.indexOf('<!-- 3-Way Policy Comparison Table'),
    html.indexOf('<!-- Detailed Strategic Intent -->')
);

const newTableArea = `<!-- 3-Way Policy Comparison Table (Clean Minimalist 1-Line Layout) -->
                        <div style="font-size:15px; font-weight:800; color:#1e293b; margin-bottom:12px; padding-left:10px; border-left:4px solid #6366f1;">
                            발자국 운영 정책 3단 비교 (기본안 vs 제안안 아티스트 회원 vs 제안안 일반 회원)
                        </div>

                        <table style="width:100%; border-collapse:collapse; background:#ffffff; border:1px solid #cbd5e1; border-radius:8px; overflow:hidden; margin-bottom:24px;">
                            <thead>
                                <tr style="background:#f8fafc;">
                                    <th style="width:15%; padding:12px 14px; border:1px solid #e2e8f0; font-size:14px; font-weight:800; color:#334155; text-align:left;">구분</th>
                                    <th style="width:28%; padding:12px 14px; border:1px solid #e2e8f0; font-size:14px; font-weight:800; color:#334155; text-align:left;">① 기본안 (OBT 기준)</th>
                                    <th style="width:31%; padding:12px 14px; border:1px solid #e2e8f0; font-size:14px; font-weight:800; color:#4338ca; text-align:left; background:#eef2ff;">② 제안안: 아티스트 회원 (결제)</th>
                                    <th style="width:26%; padding:12px 14px; border:1px solid #e2e8f0; font-size:14px; font-weight:800; color:#334155; text-align:left;">③ 제안안: 일반 회원 (미결제)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style="padding:11px 14px; border:1px solid #e2e8f0; font-size:13.5px; font-weight:800; color:#1e293b; background:#f8fafc;">자격 획득 조건</td>
                                    <td style="padding:11px 14px; border:1px solid #e2e8f0; font-size:13.5px; color:#475569;">정액제 결제 이력 보유 유저</td>
                                    <td style="padding:11px 14px; border:1px solid #e2e8f0; font-size:13.5px; color:#1e1b4b; background:#faf5ff;">
                                        <strong>이벤트 기간 내 결제 완료 유저</strong> (아티스트 권한)
                                    </td>
                                    <td style="padding:11px 14px; border:1px solid #e2e8f0; font-size:13.5px; color:#475569;">이벤트 기간 내 미결제 일반 유저</td>
                                </tr>
                                <tr>
                                    <td style="padding:11px 14px; border:1px solid #e2e8f0; font-size:13.5px; font-weight:800; color:#1e293b; background:#f8fafc;">작품 출품 슬롯</td>
                                    <td style="padding:11px 14px; border:1px solid #e2e8f0; font-size:13.5px; color:#475569;">30회 출품 가능 (스팸 과다 우려)</td>
                                    <td style="padding:11px 14px; border:1px solid #e2e8f0; font-size:13.5px; color:#1e1b4b; background:#faf5ff;">
                                        <strong>10회 집중 출품 캡</strong> (고품질 3D 정성 출품)
                                    </td>
                                    <td style="padding:11px 14px; border:1px solid #e2e8f0; font-size:13.5px; color:#475569;">
                                        <strong>출품 불가 (0회)</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:11px 14px; border:1px solid #e2e8f0; font-size:13.5px; font-weight:800; color:#1e293b; background:#f8fafc;">투표 참여 권한</td>
                                    <td style="padding:11px 14px; border:1px solid #e2e8f0; font-size:13.5px; color:#475569;">로그인 계정당 1일 1회 투표</td>
                                    <td style="padding:11px 14px; border:1px solid #e2e8f0; font-size:13.5px; color:#1e1b4b; background:#faf5ff;">
                                        <strong>로그인 계정당 1일 1회 투표 (동일)</strong>
                                    </td>
                                    <td style="padding:11px 14px; border:1px solid #e2e8f0; font-size:13.5px; color:#475569;">
                                        <strong>로그인 계정당 1일 1회 투표 (동일)</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:11px 14px; border:1px solid #e2e8f0; font-size:13.5px; font-weight:800; color:#1e293b; background:#f8fafc;">마켓 구매 권한</td>
                                    <td style="padding:11px 14px; border:1px solid #e2e8f0; font-size:13.5px; color:#475569;">모든 유저 1일 3회 구매 제한</td>
                                    <td style="padding:11px 14px; border:1px solid #e2e8f0; font-size:13.5px; color:#1e1b4b; background:#faf5ff;">
                                        <strong>[무제한 구매]</strong> 최종 선정작 전체 소장 가능
                                    </td>
                                    <td style="padding:11px 14px; border:1px solid #e2e8f0; font-size:13.5px; color:#475569;">
                                        <strong>[1회 구매권]</strong> 최종 선정작 중 1개 구매 가능
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:11px 14px; border:1px solid #e2e8f0; font-size:13.5px; font-weight:800; color:#1e293b; background:#f8fafc;">당첨 보상 혜택</td>
                                    <td style="padding:11px 14px; border:1px solid #e2e8f0; font-size:13.5px; color:#475569;">단순 인게임 아이템 등록</td>
                                    <td style="padding:11px 14px; border:1px solid #e2e8f0; font-size:13.5px; color:#1e1b4b; background:#faf5ff;">
                                        <strong>당첨작 무료 귀속 지급</strong> + 제작자 닉네임 표기
                                    </td>
                                    <td style="padding:11px 14px; border:1px solid #e2e8f0; font-size:13.5px; color:#475569;">해당 없음 (출품 미대상)</td>
                                </tr>
                                <tr>
                                    <td style="padding:11px 14px; border:1px solid #e2e8f0; font-size:13.5px; font-weight:800; color:#1e293b; background:#f8fafc;">BM 기획 가치</td>
                                    <td style="padding:11px 14px; border:1px solid #e2e8f0; font-size:13.5px; color:#475569;">단순 출품 제공 (결제 동기 부재)</td>
                                    <td style="padding:11px 14px; border:1px solid #e2e8f0; font-size:13.5px; color:#1e1b4b; background:#faf5ff;">
                                        <strong>결제 명분 극대화</strong> + 크리에이터 자부심 부여
                                    </td>
                                    <td style="padding:11px 14px; border:1px solid #e2e8f0; font-size:13.5px; color:#475569;">
                                        <strong>박탈감 완화</strong> + 차기 시즌 결제 전환 유도
                                    </td>
                                </tr>
                            </tbody>
                        </table>\n\n                        `;

html = html.replace(oldTableArea, newTableArea);
fs.writeFileSync(targetPath, html, 'utf8');
console.log('Successfully updated 3-way table to clean minimalist 1-line layout!');

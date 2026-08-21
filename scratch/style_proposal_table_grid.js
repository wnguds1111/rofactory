const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'contest_policy.html');
let html = fs.readFileSync(targetPath, 'utf8');

// Also update CSS to make all spec tables have crisp grid borders
html = html.replace('.spec-table th {\n            background: #f8fafc;\n            color: #475569;\n            font-weight: 800;\n            text-align: left;\n            padding: 12px 16px;\n            border-top: 1px solid #e2e8f0;\n            border-bottom: 1px solid #e2e8f0;\n        }',
                    '.spec-table th {\n            background: #f8fafc;\n            color: #475569;\n            font-weight: 800;\n            text-align: left;\n            padding: 12px 16px;\n            border: 1px solid #cbd5e1;\n        }');

html = html.replace('.spec-table td {\n            padding: 14px 16px;\n            border-bottom: 1px solid #f1f5f9;\n            color: #334155;\n            line-height: 1.6;\n            vertical-align: middle;\n        }',
                    '.spec-table td {\n            padding: 14px 16px;\n            border: 1px solid #e2e8f0;\n            color: #334155;\n            line-height: 1.6;\n            vertical-align: middle;\n        }');

// Replace Proposal Table with solid border table
const oldTable = html.substring(
    html.indexOf('<!-- Comparison Table -->'),
    html.indexOf('<!-- Detailed Strategic Intent -->')
);

const newTable = `<!-- Comparison Table (Clean Grid Lines) -->
                        <table style="width:100%; border-collapse:collapse; background:#ffffff; border:2px solid #c084fc; border-radius:8px; overflow:hidden; margin-bottom:20px;">
                            <thead>
                                <tr style="background:#f3e8ff;">
                                    <th style="width:180px; padding:14px 16px; border:1.5px solid #c084fc; font-size:14px; font-weight:900; color:#581c87; text-align:left;">구분</th>
                                    <th style="width:340px; padding:14px 16px; border:1.5px solid #c084fc; font-size:14px; font-weight:900; color:#581c87; text-align:left;">기본안 (Standard Policy)</th>
                                    <th style="padding:14px 16px; border:1.5px solid #c084fc; font-size:14px; font-weight:900; color:#581c87; text-align:left;">당사 제안안 (Premium Artist Membership)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; font-weight:800; color:#0f172a; background:#faf5ff;">티켓 지급 조건</td>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; color:#334155; line-height:1.6;">기간 상관없이 정액제 구매 시 30회 티켓 일괄 발송</td>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; color:#581c87; line-height:1.6;">
                                        <strong>이벤트 기간 내 정액제 또는 결제(KP/패키지) 진행 시</strong> 발자국 등록 티켓 10회 발송 + <strong>[아티스트 권한]</strong> 부여
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; font-weight:800; color:#0f172a; background:#faf5ff;">작품 출품 캡</td>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; color:#334155; line-height:1.6;">30회 출품 기회 제공</td>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; color:#581c87; line-height:1.6;">
                                        <strong>10회 출품 캡 적용</strong> (무성의한 스팸 업로드 방지 및 고품질 정성 출품 유도)
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; font-weight:800; color:#0f172a; background:#faf5ff;">마켓 구매 자격</td>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; color:#334155; line-height:1.6;">정액제 구매 여부와 상관없이 모든 유저 구매 가능</td>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; color:#581c87; line-height:1.6;">
                                        <strong>[아티스트 권한] 보유 유저 전용 마켓 구매 가능</strong> (이벤트 기간 결제 유저 대상 독점 소유권 제공)
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; font-weight:800; color:#0f172a; background:#faf5ff;">BM 과금 동기 (Benefit)</td>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; color:#334155; line-height:1.6;">단순 공모전 출품 기회 제공 (결제 유인 요소 약함)</td>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; color:#581c87; line-height:1.6;">
                                        아티스트 권한 획득을 통한 <strong>유저 결제 유도(과금 명분 극대화)</strong> + 최종 선정작 구매 소장권 제공
                                    </td>
                                </tr>
                            </tbody>
                        </table>\n\n                        `;

if (oldTable) {
    html = html.replace(oldTable, newTable);
}

fs.writeFileSync(targetPath, html, 'utf8');
console.log('Successfully styled proposal table with clean solid grid lines in contest_policy.html!');

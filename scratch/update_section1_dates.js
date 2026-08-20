const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'contest_policy.html');
let html = fs.readFileSync(targetPath, 'utf8');

const dateRow = `
                                <tr>
                                    <td class="field">어드민 콘테스트 날짜 설정</td>
                                    <td>
                                        • <code>reg_start</code> ~ <code>reg_end</code> (작품 접수)<br>
                                        • <code>vote_start</code> ~ <code>vote_end</code> (랭킹 선정)
                                    </td>
                                    <td>
                                        어드민 백오피스(<code>admin.html</code>)에서 분 단위로 날짜 파라미터를 사전 세팅 관리.<br>
                                        ① 유저 발자국 등록 시작/마감 시점 자동 제어 및 ② 유저 투표 랭킹 선정 시작/마감 시점 자동 연동.
                                        <button class="btn-row-del" onclick="deleteTableRow(this)">🗑️ 삭제</button>
                                    </td>
                                    <td style="text-align:center;"><span class="badge badge-green">✅ 확정</span></td>
                                </tr>`;

if (!html.includes('어드민 콘테스트 날짜 설정')) {
    html = html.replace('<tbody>\n                                <tr>', '<tbody>' + dateRow + '\n                                <tr>');
    fs.writeFileSync(targetPath, html, 'utf8');
    console.log('Successfully added Date Configuration row to Section 1!');
}

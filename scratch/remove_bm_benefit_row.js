const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'contest_policy.html');
let html = fs.readFileSync(targetPath, 'utf8');

const oldRow = html.substring(
    html.indexOf('<tr>\n                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; font-size:14.5px; font-weight:800; color:#0f172a; background:#faf5ff;">BM 과금 동기 (Benefit)</td>'),
    html.indexOf('</tr>\n                            </tbody>\n                        </table>') + 5
);

if (oldRow) {
    html = html.replace(oldRow, '');
    fs.writeFileSync(targetPath, html, 'utf8');
    console.log('Successfully removed BM 과금 동기 row from contest_policy.html!');
} else {
    console.error('BM 과금 동기 row not found!');
}

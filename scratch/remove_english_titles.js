const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'contest_policy.html');
let html = fs.readFileSync(targetPath, 'utf8');

html = html.replace('STEP 01. 일정 세팅 (Date Setup)', 'STEP 01. 일정 세팅');
html = html.replace('STEP 02. 접수 개시 (Submission Open)', 'STEP 02. 접수 개시');
html = html.replace('STEP 03. 접수 마감 (Submission Deadline)', 'STEP 03. 접수 마감');
html = html.replace('STEP 04. S3 유효성 파일 검증 (S3 File Verification)', 'STEP 04. S3 유효성 파일 검증');
html = html.replace('STEP 05. 투표 노출 및 유저 인기 투표 (Vote Display &amp; User Voting)', 'STEP 05. 투표 노출 및 유저 인기 투표');
html = html.replace('STEP 05. 투표 노출 및 유저 인기 투표 (Vote Display & User Voting)', 'STEP 05. 투표 노출 및 유저 인기 투표');
html = html.replace('STEP 06. 랭킹 선정 (Winner Ranking)', 'STEP 06. 랭킹 선정');
html = html.replace('STEP 09. 마켓 개시 (Admin 1-Click Launch)', 'STEP 09. 마켓 개시');

fs.writeFileSync(targetPath, html, 'utf8');
console.log('Successfully removed English titles from Step cards in contest_policy.html!');

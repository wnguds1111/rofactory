const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'contest_policy.html');
let html = fs.readFileSync(targetPath, 'utf8');

// 1. Update Section 2 (#sec-ticket)
const oldSection2 = html.substring(html.indexOf('<!-- ===================== SECTION 2 ===================== -->'), html.indexOf('<!-- ===================== SECTION 3 ===================== -->'));

const newSection2 = `<!-- ===================== SECTION 2 ===================== -->
            <div class="page-section" id="sec-ticket">
                <div class="page-header">
                    <div class="page-icon" style="background:#f0fdf4; color:#16a34a;">2</div>
                    <h3>2. 티켓 지급, 소멸 및 결제 체크 정책</h3>
                    <div class="section-edit-tools" style="display:none; margin-left:auto; gap:6px;">
                        <button onclick="addTableRow(this)" style="background:#e0f2fe; color:#0369a1; border:1px solid #bae6fd; padding:3px 10px; border-radius:4px; font-size:11.5px; font-weight:700; cursor:pointer;">+ 행 추가</button>
                    </div>
                </div>
                <div class="page-body">

                    <div class="spec-group">
                        <div class="spec-label-row">
                            <div class="spec-label">티켓 발급, 이월 소멸 및 정액제 상태별 처리 기준</div>
                            <div class="section-edit-tools" style="display:none; gap:6px;">
                                <button onclick="addTableRow(this)" style="background:#e0f2fe; color:#0369a1; border:1px solid #bae6fd; padding:3px 10px; border-radius:4px; font-size:11.5px; font-weight:700; cursor:pointer;">+ 행 추가</button>
                            </div>
                        </div>
                        <table class="spec-table">
                            <thead>
                                <tr>
                                    <th style="width:200px;">구분</th>
                                    <th style="width:420px;">세부 정책 내용</th>
                                    <th>기술 및 운영 처리 로직</th>
                                    <th style="width:140px; text-align:center;">상태</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="field">① 사이클 종료 시 잔여 티켓</td>
                                    <td>해당 회차 종료 시 잔여 티켓 차기 이월 불가, 전량 자동 소멸</td>
                                    <td>
                                        [1안 적용] 회차 종료 시점에 유저의 잔여 티켓 수량을 DB에서 일괄 초기화 (0으로 리셋).
                                        <button class="btn-row-del" onclick="deleteTableRow(this)">삭제</button>
                                    </td>
                                    <td style="text-align:center;"><span class="badge badge-warn">사업 확인 필요</span></td>
                                </tr>
                                <tr>
                                    <td class="field">② 신규 티켓 지급 대상</td>
                                    <td>특정 이벤트 기간 내 [정액제 결제] OR [카프라 포인트(KP) 결제] 완료 유저</td>
                                    <td>
                                        결제 시도 및 완료 로그 이벤트 수신 시 티켓 발급하여 유저 참여 과금 혜택 유도 (당사 제안 반영).
                                        <button class="btn-row-del" onclick="deleteTableRow(this)">삭제</button>
                                    </td>
                                    <td style="text-align:center;"><span class="badge badge-warn">사업 확인 필요</span></td>
                                </tr>
                                <tr>
                                    <td class="field">③ 정액제 만료 시 티켓 유지</td>
                                    <td>기간 중 정액제 이용이 만료되어도 부여받은 회차 티켓 사용 유지</td>
                                    <td>
                                        정액제 유효 기간을 실시간 체크하지 않고, <strong>'유저가 결제 완료한 시도 액션' 자체를 기준</strong>으로 체크하여 당 회차 권한 보장.
                                        <button class="btn-row-del" onclick="deleteTableRow(this)">삭제</button>
                                    </td>
                                    <td style="text-align:center;"><span class="badge badge-warn">사업 확인 필요</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>\n\n            `;

// 2. Update Section 3 (#sec-risk)
const secRiskStart = html.indexOf('<!-- ===================== SECTION 3 ===================== -->');
const secRiskEnd = html.indexOf('</div>\n    </div>\n\n    <script>');

const newSection3 = `<!-- ===================== SECTION 3 ===================== -->
            <div class="page-section" id="sec-risk">
                <div class="page-header">
                    <div class="page-icon" style="background:#fef2f2; color:#dc2626;">3</div>
                    <h3>3. 리스크 관리 및 법적 고지 항목 (당사 보완안 반영)</h3>
                    <div class="section-edit-tools" style="display:none; margin-left:auto; gap:6px;">
                        <button onclick="addTableRow(this)" style="background:#e0f2fe; color:#0369a1; border:1px solid #bae6fd; padding:3px 10px; border-radius:4px; font-size:11.5px; font-weight:700; cursor:pointer;">+ 행 추가</button>
                    </div>
                </div>
                <div class="page-body">

                    <div class="spec-group">
                        <div class="spec-label-row">
                            <div class="spec-label" style="border-left-color:#dc2626;">리스크 관리 및 법적 고지 세부 명세</div>
                            <div class="section-edit-tools" style="display:none; gap:6px;">
                                <button onclick="addTableRow(this)" style="background:#e0f2fe; color:#0369a1; border:1px solid #bae6fd; padding:3px 10px; border-radius:4px; font-size:11.5px; font-weight:700; cursor:pointer;">+ 행 추가</button>
                            </div>
                        </div>
                        <table class="spec-table">
                            <thead>
                                <tr>
                                    <th style="width:200px;">리스크 구분</th>
                                    <th style="width:420px;">문제점 및 이슈</th>
                                    <th>당사 제안 / 확정 대응 정책</th>
                                    <th style="width:140px; text-align:center;">상태</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="field">프로필(이메일) 노출 방지</td>
                                    <td>로그인 계정명이 이메일 주소이므로 외부에 노출될 경우 개인정보 보호법 위반 및 글로벌 사생활 침해 우려</td>
                                    <td>
                                        <strong>[당사 제안 반영]</strong> 작품 응모 시 <strong>'아티스트 명(닉네임)' 1회 필수 입력 모달</strong> 제공.<br>
                                        최초 1회 입력 후 마케팅/프로모션/인게임 제작자 표기에 해당 닉네임으로 자동 매칭 및 노출.
                                        <button class="btn-row-del" onclick="deleteTableRow(this)">삭제</button>
                                    </td>
                                    <td style="text-align:center;"><span class="badge badge-warn">사업 확인 필요</span></td>
                                </tr>
                                <tr>
                                    <td class="field">위반 적발 시 인게임 처리</td>
                                    <td>표절, IP 침해, 유해 콘텐츠 등 선정/배포 후 위반 사항 클레임 접수 시 처리 기준</td>
                                    <td>
                                        <strong>[당사 안 준용]</strong> 마켓 판매 중단 조치와 함께, 이미 아이템을 소유한 유저는 <strong>아이템 자체는 보유하되 장착 시 이펙트 비노출(숨김) 처리</strong> (기존 구현 방식 준용).
                                        <button class="btn-row-del" onclick="deleteTableRow(this)">삭제</button>
                                    </td>
                                    <td style="text-align:center;"><span class="badge badge-warn">사업 확인 필요</span></td>
                                </tr>
                                <tr>
                                    <td class="field">권리 귀속 및 약관 고지</td>
                                    <td>제출작 및 아티스트 명 마케팅 활용 동의, 사전 통보 없는 규칙 변경 고지</td>
                                    <td>
                                        웹 작품 응모 시 필수 체크 동의 절차 적용. 운영 상황에 따른 약관 사전 통보 없이 변경 가능성 명시.
                                        <button class="btn-row-del" onclick="deleteTableRow(this)">삭제</button>
                                    </td>
                                    <td style="text-align:center;"><span class="badge badge-warn">사업 확인 필요</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>`;

const sec2Start = html.indexOf('<!-- ===================== SECTION 2 ===================== -->');
const sec3End = html.indexOf('</div>\n    </div>\n\n    <script>');

if (sec2Start !== -1 && sec3End !== -1) {
    html = html.substring(0, sec2Start) + newSection2 + newSection3 + '\n\n        ' + html.substring(sec3End);
    fs.writeFileSync(targetPath, html, 'utf8');
    console.log('Successfully updated Section 2 and Section 3 table widths and status badges!');
} else {
    console.error('Section 2 or Section 3 markers not found!');
}

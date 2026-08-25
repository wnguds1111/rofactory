const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'contest_policy.html');
let html = fs.readFileSync(targetPath, 'utf8');

// Target Section 2
const oldSection2 = html.substring(
    html.indexOf('<!-- ===================== SECTION 2 ===================== -->'),
    html.indexOf('<!-- ===================== SECTION 3 ===================== -->')
);

const newSection2 = `<!-- ===================== SECTION 2 ===================== -->
            <div class="page-section" id="sec-proposal">
                <div class="page-header">
                    <div class="page-icon" style="background:#faf5ff; color:#9333ea;">2</div>
                    <h3>2. 프리미엄 회원제 제안</h3>
                </div>
                <div class="page-body">

                    <!-- Proposal Master Box -->
                    <div class="spec-group" style="background:#faf5ff; border:2px solid #c084fc; border-radius:16px; padding:28px; box-shadow:0 4px 16px rgba(147, 51, 234, 0.05);">
                        
                        <!-- Header & Badge -->
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
                            <div style="font-size:18px; font-weight:900; color:#581c87; letter-spacing:-0.3px;">
                                발자국 티켓 지급 및 구매 권한 프리미엄 회원제 제안
                            </div>
                            <span style="background:#9333ea; color:#fff; padding:5px 14px; border-radius:12px; font-size:12px; font-weight:800;">BM &amp; Membership Proposal</span>
                        </div>

                        <div style="font-size:14.5px; color:#6b21a8; line-height:1.7; margin-bottom:24px;">
                            기존 유저에게 단순 출품 기회만 주던 방식을 탈피하여, 이벤트 기간 결제 시 <strong>[아티스트 권한]</strong>을 부여하고 최종 선정작의 <strong>독점/무제한 소장권</strong>을 제공함으로써 <strong>강력한 결제 명분(BM)</strong>과 <strong>고품질 UGC 생태계</strong>를 구축하는 기획 제안입니다.
                        </div>

                        <!-- 💡 Deep Dive Card: [아티스트 권한이란?] -->
                        <div style="background:#ffffff; border:1.5px solid #d8b4fe; border-left:6px solid #9333ea; border-radius:12px; padding:22px; margin-bottom:24px; box-shadow:0 2px 8px rgba(147, 51, 234, 0.06);">
                            <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px;">
                                <span style="font-size:17px; font-weight:900; color:#581c87;">👑 [아티스트 권한 (Artist Privileges)] 핵심 정의 및 4대 혜택</span>
                            </div>
                            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:12px;">
                                
                                <div style="background:#faf5ff; border:1px solid #e9d5ff; border-radius:8px; padding:14px;">
                                    <div style="font-size:13.5px; font-weight:900; color:#6b21a8; margin-bottom:4px;">① 10회 정성 출품 슬롯</div>
                                    <div style="font-size:13px; color:#475569; line-height:1.5;">
                                        해당 시즌 발자국 작품을 <strong>최대 10개까지 정성 등록</strong>할 수 있는 전용 출품 티켓 지급
                                    </div>
                                </div>

                                <div style="background:#faf5ff; border:1px solid #e9d5ff; border-radius:8px; padding:14px;">
                                    <div style="font-size:13.5px; font-weight:900; color:#6b21a8; margin-bottom:4px;">② 마켓 무제한 구매/소장권</div>
                                    <div style="font-size:13px; color:#475569; line-height:1.5;">
                                        최종 선정된 10종의 한정판 발자국을 <strong>수량 제한 없이 무제한 구매 및 영구 소장</strong> 가능
                                    </div>
                                </div>

                                <div style="background:#faf5ff; border:1px solid #e9d5ff; border-radius:8px; padding:14px;">
                                    <div style="font-size:13.5px; font-weight:900; color:#6b21a8; margin-bottom:4px;">③ 당첨작 무료 귀속 + 닉네임 박제</div>
                                    <div style="font-size:13px; color:#475569; line-height:1.5;">
                                        본인 출품작 당첨 시 <strong>[영구 귀속 아이템] 무상 지급</strong> + 인게임/웹 상점 <strong>제작자 닉네임 공식 표기</strong>
                                    </div>
                                </div>

                                <div style="background:#faf5ff; border:1px solid #e9d5ff; border-radius:8px; padding:14px;">
                                    <div style="font-size:13.5px; font-weight:900; color:#6b21a8; margin-bottom:4px;">④ 아티스트 전용 배지 부여</div>
                                    <div style="font-size:13px; color:#475569; line-height:1.5;">
                                        RO Factory 공식 크리에이터 멤버십을 인증하는 <strong>[공식 아티스트 배지]</strong> 프로필 연동
                                    </div>
                                </div>

                            </div>
                        </div>

                        <!-- Infographic Visual Process Flow -->
                        <div style="background:#ffffff; border:1px solid #e9d5ff; border-radius:12px; padding:20px; margin-bottom:28px; box-shadow:0 2px 8px rgba(147, 51, 234, 0.04);">
                            <div style="font-size:14.5px; font-weight:900; color:#581c87; margin-bottom:16px; padding-left:10px; border-left:4px solid #9333ea;">
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
                                        • <strong>권한 획득</strong>: 무제한 마켓 구매권 + 등록 티켓 10회 동시 활성화
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
                                    <div style="font-size:11.5px; color:#7e22ce; background:#f3e8ff; border-left:3px solid #9333ea; padding:6px 8px; border-radius:0 4px 4px 0; margin-top:8px; line-height:1.4;">
                                        • <strong>출품 집중</strong>: 무분별한 스팸 방지 및 3D 퀄리티 보장
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
                                            <strong>[아티스트 권한: 무제한 소장 / 일반 회원: 1회 구매 체험]</strong>
                                        </div>
                                    </div>
                                    <div style="font-size:11.5px; color:#581c87; background:#ede9fe; border-left:3px solid #6b21a8; padding:6px 8px; border-radius:0 4px 4px 0; margin-top:8px; line-height:1.4;">
                                        • <strong>차등 권한</strong>: 아티스트 무제한 독점 vs 일반 1회 구매권
                                    </div>
                                </div>

                            </div>
                        </div>

                        <!-- 3-Way Policy Comparison Table (기본안 vs 제안안 아티스트회원 vs 제안안 일반회원) -->
                        <div style="font-size:15px; font-weight:900; color:#581c87; margin-bottom:12px; padding-left:10px; border-left:4px solid #9333ea;">
                            발자국 운영 정책 3단 비교 (기본안 vs 제안안 아티스트 회원 vs 제안안 일반 회원)
                        </div>

                        <table style="width:100%; border-collapse:collapse; background:#ffffff; border:2px solid #c084fc; border-radius:10px; overflow:hidden; margin-bottom:24px; box-shadow:0 2px 8px rgba(0,0,0,0.02);">
                            <thead>
                                <tr style="background:#f3e8ff;">
                                    <th style="width:160px; padding:14px 16px; border:1.5px solid #c084fc; font-size:14.5px; font-weight:900; color:#581c87; text-align:left;">구분</th>
                                    <th style="width:280px; padding:14px 16px; border:1.5px solid #c084fc; font-size:14.5px; font-weight:900; color:#475569; text-align:left; background:#f1f5f9;">① 기본안 (OBT 기준)</th>
                                    <th style="padding:14px 16px; border:1.5px solid #c084fc; font-size:14.5px; font-weight:900; color:#581c87; text-align:left; background:#faf5ff;">② 제안안: 아티스트 회원 (이벤트 결제)</th>
                                    <th style="width:300px; padding:14px 16px; border:1.5px solid #c084fc; font-size:14.5px; font-weight:900; color:#0369a1; text-align:left; background:#f0f9ff;">③ 제안안: 일반 회원 (미결제/무과금)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; font-size:14.5px; font-weight:900; color:#0f172a; background:#faf5ff;">자격 획득 조건</td>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; font-size:14px; color:#475569; line-height:1.6; background:#f8fafc;">
                                        이벤트 기간 상관없이 <strong>정액제 결제 이력 보유 유저</strong>
                                    </td>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; font-size:14.5px; color:#581c87; line-height:1.6; background:#ffffff;">
                                        <strong>이벤트 기간 내 정액제 또는 KP/패키지 결제 완료 유저</strong><br>
                                        ➔ <strong>[아티스트 권한]</strong> 즉시 부여
                                    </td>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; font-size:14px; color:#0369a1; line-height:1.6; background:#f8fafc;">
                                        이벤트 기간 내 결제 이력이 없는 <strong>일반/무과금 전체 유저</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; font-size:14.5px; font-weight:900; color:#0f172a; background:#faf5ff;">작품 출품 슬롯</td>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; font-size:14px; color:#475569; line-height:1.6; background:#f8fafc;">
                                        <strong>30회 출품 기회 제공</strong><br>
                                        <span style="font-size:12.5px; color:#64748b;">(무성의한 스팸 업로드 및 CDN 비용 과다 발생)</span>
                                    </td>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; font-size:14.5px; color:#581c87; line-height:1.6; background:#ffffff;">
                                        <strong>10회 집중 출품 캡 적용</strong><br>
                                        <span style="font-size:12.5px; color:#7e22ce;">(스팸 차단 및 3D 퀄리티가 높은 정성 출품 유도)</span>
                                    </td>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; font-size:14px; color:#0369a1; line-height:1.6; background:#f8fafc;">
                                        <strong>출품 불가 (0회)</strong><br>
                                        <span style="font-size:12.5px; color:#0284c7;">(투표 및 마켓 1회 체험 구매만 가능)</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; font-size:14.5px; font-weight:900; color:#0f172a; background:#faf5ff;">투표 참여 권한</td>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; font-size:14px; color:#475569; line-height:1.6; background:#f8fafc;">
                                        로그인 회원 대상 1일 1회 투표
                                    </td>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; font-size:14.5px; color:#581c87; line-height:1.6; background:#ffffff;">
                                        <strong>로그인 회원 대상 1일 1회 투표 (동일 참여)</strong>
                                    </td>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; font-size:14px; color:#0369a1; line-height:1.6; background:#f8fafc;">
                                        <strong>로그인 회원 대상 1일 1회 투표 (동일 참여)</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; font-size:14.5px; font-weight:900; color:#0f172a; background:#faf5ff;">마켓 구매 및 소장권</td>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; font-size:14px; color:#475569; line-height:1.6; background:#f8fafc;">
                                        결제 여부 상관없이 <strong>모든 유저 일 3회 구매 가능</strong>
                                    </td>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; font-size:14.5px; color:#581c87; line-height:1.6; background:#ffffff;">
                                        <strong>[아티스트 전용 마켓 무제한 구매/소장]</strong><br>
                                        <span style="font-size:12.5px; color:#7e22ce;">(시즌 최종 선정작 10종에 대한 독점 영구 소장권)</span>
                                    </td>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; font-size:14px; color:#0369a1; line-height:1.6; background:#f8fafc;">
                                        <strong>[최종 선정작 중 1회 구매권 제공]</strong><br>
                                        <span style="font-size:12.5px; color:#0284c7;">(박탈감 완화 및 맛보기 소장 기회 부여)</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; font-size:14.5px; font-weight:900; color:#0f172a; background:#faf5ff;">당첨 시 보상 혜택</td>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; font-size:14px; color:#475569; line-height:1.6; background:#f8fafc;">
                                        단순 인게임 아이템 등록
                                    </td>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; font-size:14.5px; color:#581c87; line-height:1.6; background:#ffffff;">
                                        <strong>[영구 귀속 아이템] 무상 지급</strong> +<br>
                                        인게임/웹 마켓 <strong>공식 제작자 닉네임 영구 박제</strong>
                                    </td>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; font-size:14px; color:#0369a1; line-height:1.6; background:#f8fafc;">
                                        해당 없음 (출품 미대상)
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; font-size:14.5px; font-weight:900; color:#0f172a; background:#faf5ff;">BM 기획 가치</td>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; font-size:14px; color:#475569; line-height:1.6; background:#f8fafc;">
                                        단순 출품 기회 제공 (결제 유인 및 차별화 요소 부재)
                                    </td>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; font-size:14.5px; color:#581c87; line-height:1.6; background:#ffffff;">
                                        <strong>결제 유인(과금 명분) 극대화</strong> +<br>
                                        고품질 UGC 크리에이터 자부심 형성
                                    </td>
                                    <td style="padding:14px 16px; border:1px solid #e9d5ff; font-size:14px; color:#0369a1; line-height:1.6; background:#f8fafc;">
                                        <strong>F2P 유저 반발 차단</strong> +<br>
                                        1회 소장 체험을 통한 <strong>차기 시즌 결제 전환(CVR) 유도</strong>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <!-- Detailed Strategic Intent -->
                        <div style="background:#ffffff; border:1px solid #e9d5ff; border-radius:12px; padding:20px 22px;">
                            <div style="font-size:15.5px; font-weight:900; color:#581c87; margin-bottom:10px;">
                                프리미엄 아티스트 회원제 기획 의도 및 기대 효과
                            </div>
                            <div style="font-size:14px; color:#475569; line-height:1.75;">
                                • <strong>과금 유저 대상 프리미엄 가치 제공</strong>: 기존 유저가 이벤트 기간 결제 시 발자국 등록 기회(10회)뿐만 아니라 '아티스트 권한'을 획득하게 되어, 콘테스트 발표 후 최종 선정된 발자국 아이템을 무료 소장 할 수 있다는 동기 형성.<br>
                                • <strong>작품 퀄리티 상승 및 스팸 차단</strong>: 무분별한 30회 등록 대신 10회 집중 등록을 유도하여 3D 메시 규격 및 완성도가 높은 양질의 크리에이터 데이터 수집을 도모합니다.<br>
                                • <strong>유저 소속감 및 브랜드 가치 제고</strong>: 단순 소비자가 아닌 RO Factory 공식 크리에이터 아티스트 멤버십에 참여한다는 자부심을 제공합니다.<br>
                                • <strong>비결제 유저 박탈감 완화 및 수용성 확보</strong>: 비결제 유저들에게는 최종 선정된 발자국 아이템 중 1회 구매권을 제공하여 박탈감을 완화하고 일반 유저의 마켓 참여를 유도합니다.
                            </div>
                        </div>

                    </div>

                </div>
            </div>`;

if (oldSection2) {
    html = html.replace(oldSection2, newSection2 + '\n\n            ');
    fs.writeFileSync(targetPath, html, 'utf8');
    console.log('Successfully updated Section 2 with 3-way comparison table and detailed Artist Privileges deep-dive!');
} else {
    console.error('Section 2 not found!');
}

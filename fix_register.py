
with open(r'c:\Users\GRAVITY\Desktop\Anti\ro_factory\register.html', 'r', encoding='utf-8') as f:
    content = f.read()

lines = content.split('\n')
head = '\n'.join(lines[:64])   # lines 1-64
tail = '\n'.join(lines[237:])  # line 238 onward

new_steps = '''
            <!-- STEP 0: INTRO OVERVIEW -->
            <div class="step-panel active text-center" id="step0">
                <h2 class="step-title">환영합니다!<br>나만의 발자국 등록을 시작해볼까요?</h2>
                <p class="step-desc">단 4개의 과정만 거치면 나만의 발자국이 탄생합니다.</p>
                <div class="intro-steps-list">
                    <div class="intro-card"><div class="step-icon">📁</div><span class="step-tag">STEP 1</span><h4 style="font-size:18px;">파일 준비</h4><p style="font-size:13px;">전용 편집툴에서 .foot 원본과 클립을 PC로 추출합니다.</p></div>
                    <div class="intro-card"><div class="step-icon">📤</div><span class="step-tag">STEP 2</span><h4 style="font-size:18px;">에셋 업로드</h4><p style="font-size:13px;">추출하신 파일들과 썸네일을 안전하게 서버에 등록합니다.</p></div>
                    <div class="intro-card"><div class="step-icon">✨</div><span class="step-tag">STEP 3</span><h4 style="font-size:18px;">마켓 정보 입력</h4><p style="font-size:13px;">작품명과 가격, 태그 등 상세 데이터를 결정하고 기입합니다.</p></div>
                    <div class="intro-card"><div class="step-icon">🎉</div><span class="step-tag">STEP 4</span><h4 style="font-size:18px;">파일 변환 완료</h4><p style="font-size:13px;">업로드 파일이 변환을 거쳐 글로벌 마켓에 자동 등재됩니다!</p></div>
                </div>
            </div>

            <!-- STEP 1: TOOL INSTRUCTION -->
            <div class="step-panel text-center" id="step1">
                <div class="step-sub">STEP 1</div>
                <h2 class="step-title">편집툴에서 파일을 먼저 준비해주세요.</h2>
                <p class="step-desc mb-30">RO Factory 공식 편집툴을 실행한 뒤,<br>제작하신 작품의 <strong>원본 파일(.foot)</strong>과 <strong>동영상 미리보기 파일</strong>을 미리 저장해주세요.</p>
                <div class="tool-guide-box">
                    <div class="icon-wrap">🛠️</div>
                    <h3>아직 파일 준비가 안되셨나요?</h3>
                    <p>편집툴을 다운하여 나만의 발자국을 만들어보세요.</p>
                    <button class="btn-tool-download">UGC 편집 툴 다운로드 🚀</button>
                </div>
            </div>

            <!-- STEP 2: FILE UPLOAD -->
            <div class="step-panel" id="step2">
                <div class="step-sub text-center">STEP 2</div>
                <h2 class="step-title text-center">발자국 파일 등록</h2>
                <p class="step-desc text-center mb-30">편집툴에서 추출해둔 에셋 파일들을 업로드하고 약관에 동의합니다.</p>
                <div class="form-container-clean">
                    <div class="file-grid" style="grid-template-columns:repeat(4,1fr);gap:14px;">
                        <div class="file-box" onclick="document.getElementById('f1').click()">
                            <div class="icon">📁</div><h4>발자국 원본 데이터</h4><span>(.foot 확장자 필수)</span>
                            <input type="file" id="f1" style="display:none" accept=".foot" onchange="handleFileSelect(this,'f1_name')">
                            <span id="f1_name" style="display:block;margin-top:10px;font-weight:900;color:#3b82f6;word-break:break-all;"></span>
                        </div>
                        <div class="file-box" onclick="document.getElementById('f2').click()">
                            <div class="icon">🎬</div><h4>동영상 미리보기 파일</h4><span>(.mp4 / .mov 권장)</span>
                            <input type="file" id="f2" style="display:none" accept="video/*" onchange="handleFileSelect(this,'f2_name')">
                            <span id="f2_name" style="display:block;margin-top:10px;font-weight:900;color:#3b82f6;word-break:break-all;"></span>
                        </div>
                        <div class="file-box" id="f3_box" onclick="document.getElementById('f3').click()">
                            <div class="icon" style="color:#6366f1;">💎</div><h4>콜렉션 썸네일</h4><span>(마켓 노출용 누끼 .png)</span>
                            <input type="file" id="f3" style="display:none" accept=".png" onchange="handleImageSelect(this,'f3_box','f3_name')">
                        </div>
                        <div class="file-box" id="f4_box" onclick="document.getElementById('f4').click()">
                            <div class="icon" style="color:#d97706;">🎒</div><h4>아이템 썸네일</h4><span>(인게임 아이템 적용 가능 이미지)</span>
                            <input type="file" id="f4" style="display:none" accept=".png,.jpg" onchange="handleImageSelect(this,'f4_box','f4_name')">
                        </div>
                    </div>
                    <div class="section-divider">약관 동의 <span style="color:#ef4444">*필수</span></div>
                    <label class="custom-chk mt-30" style="margin-bottom:20px;" onclick="forceOpenTerms(event)">
                        <input type="checkbox" id="termsChk" disabled>
                        <div class="chk-box"></div>
                        <span class="chk-text">제3자의 저작권, 초상권 등 제반 권리를 침해하지 않으며 분쟁 시 당사자가 법적 책임을 지는 것에 동의합니다. <br><a href="#" onclick="forceOpenTerms(event)" style="font-weight:900;">(약관 보기)</a></span>
                    </label>
                </div>
            </div>

            <!-- STEP 3: MARKET INFO -->
            <div class="step-panel" id="step3">
                <div class="step-sub text-center">STEP 3</div>
                <h2 class="step-title text-center" style="margin-bottom:6px;">마켓 정보 입력</h2>
                <p class="step-desc text-center" style="margin-bottom:18px;font-size:14px;">글로벌 마켓에 노출될 기초 데이터를 기입해주세요.</p>
                <div class="form-container-clean">
                    <div class="form-row" style="margin-bottom:14px;">
                        <div class="form-group half">
                            <label>작품 카테고리</label>
                            <input type="text" class="form-control" value="발자국" readonly>
                        </div>
                        <div class="form-group half">
                            <label>판매 금액 <span>(OBT 기간 중 무료 배포 고정)</span></label>
                            <input type="text" class="form-control" value="FREE" readonly style="font-weight:900;color:#059669;background:#f0fdf4;border-color:#86efac;cursor:not-allowed;font-size:18px;letter-spacing:1px;">
                        </div>
                    </div>
                    <div class="form-row" style="margin-bottom:14px;">
                        <div class="form-group half">
                            <label>작품 게시기간 <span style="color:#ef4444;">*필수</span> <span>(MM.DD.YYYY, 최소 30일)</span></label>
                            <input type="text" class="form-control" id="postDate" placeholder="MM.DD.YYYY" maxlength="10" oninput="formatDateInput(this)">
                        </div>
                        <div class="form-group half">
                            <label>작품명 <span style="color:#ef4444;">*</span> <span>(영문만 입력)</span></label>
                            <input type="text" class="form-control" id="workTitle" placeholder="Enter title in English (max 20 chars)" maxlength="20" oninput="this.value=this.value.replace(/[^a-zA-Z0-9\\s\\-_.!?']/g,'')">
                        </div>
                    </div>
                    <div class="s3-bottom-row">
                        <div class="s3-card">
                            <div class="s3-card-label">작품 타입 <span>최대 2개 선택</span></div>
                            <div class="tag-group" id="typeTags">
                                <label class="tag-pill"><input type="checkbox" value="c1"> 귀여운</label>
                                <label class="tag-pill"><input type="checkbox" value="c2"> 화려한</label>
                                <label class="tag-pill"><input type="checkbox" value="c3"> 시크한</label>
                                <label class="tag-pill"><input type="checkbox" value="c4"> 다크</label>
                                <label class="tag-pill"><input type="checkbox" value="c5"> 신비한</label>
                            </div>
                        </div>
                        <div class="s3-divider"></div>
                        <div class="s3-card">
                            <div class="s3-card-label">메인 색상 <span>1개 선택 (선택)</span></div>
                            <div class="tag-group" id="colorTags">
                                <label class="tag-pill color-pill"><input type="radio" name="mainColor" value="red"><span class="color-dot" style="background:#ef4444;"></span> 빨강</label>
                                <label class="tag-pill color-pill"><input type="radio" name="mainColor" value="blue"><span class="color-dot" style="background:#3b82f6;"></span> 파랑</label>
                                <label class="tag-pill color-pill"><input type="radio" name="mainColor" value="black"><span class="color-dot" style="background:#0f172a;"></span> 블랙</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- STEP 4: COMPLETION -->
            <div class="step-panel text-center" id="step4">
                <div class="step-sub">STEP 4</div>
                <h2 class="step-title">성공적으로 마무리되었습니다!</h2>
                <div class="completion-box">
                    <div class="anim-icon">🎉</div>
                    <p class="step-desc">파일 변환이 진행 중이며, 완료되면 글로벌 마켓에 자동 등재됩니다.</p>
                    <div class="limit-box mt-30">
                        <span>오늘 남은 등록 잔여 횟수</span>
                        <strong>2 / 3회 남음</strong>
                    </div>
                </div>
            </div>

        </div>
    </main>
'''

result = head + '\n' + new_steps + '\n' + tail

with open(r'c:\Users\GRAVITY\Desktop\Anti\ro_factory\register.html', 'w', encoding='utf-8') as f:
    f.write(result)

print('Done')

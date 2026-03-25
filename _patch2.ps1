$files = Get-ChildItem 'c:\Users\GRAVITY\Desktop\Anti\ro_factory\*.html' | Select-Object -ExpandProperty FullName

foreach ($f in $files) {
    $c = [System.IO.File]::ReadAllText($f, [System.Text.Encoding]::UTF8)
    $original = $c

    # ── 어드민 승인 / 심사 관련 문구 전부 제거 ──────────────────────
    $c = $c.Replace("빠른 어드민 승인 절차를 거치면 지정된 일자에 맞춰 공식 거래소에 출시됩니다!", "파일 변환이 완료되면 글로벌 마켓에 자동 등재됩니다.")
    $c = $c.Replace("빠른 어드민 승인 절차를 거치면 지정된 일자에 맞춰 공식 거래소에 출시됩니다.", "파일 변환이 완료되면 글로벌 마켓에 자동 등재됩니다.")
    $c = $c.Replace("어드민 승인 후 지정 일자에 공식 마켓 상장", "파일 변환 후 공식 마켓 등재")
    $c = $c.Replace("어드민 승인 절차", "파일 변환 절차")
    $c = $c.Replace("관리자 심사", "파일 변환")
    $c = $c.Replace("심사 승인", "파일 변환 완료")
    $c = $c.Replace("심사 대기", "변환 대기")
    $c = $c.Replace("어드민 검수", "파일 변환")

    # ── STEP 1 설명: .foot + 영상 미리보기 ──────────────────────────
    $c = $c.Replace(
        "라그나로크 UGC 전용 클라이언트를 통해 나만의 커스텀 `.foot` 파일을 추출합니다.",
        "라그나로크 UGC 전용 클라이언트를 통해 <code style=`"background:rgba(255,255,255,0.15);padding:1px 5px;border-radius:4px;`">.foot</code> 원본 파일과 영상 미리보기 파일을 추출합니다."
    )
    # policy.html 테이블 내 STEP1 설명
    $c = $c.Replace(
        "UGC 편집툴을 통해 `.foot` 원본 파일과 영상 미리보기 파일 추출",
        "UGC 편집툴을 통해 .foot 원본 파일과 영상 미리보기 파일 추출"
    )
    $c = $c.Replace(
        "라그나로크 UGC 전용 클라이언트를 통해 `.foot` 파일 추출",
        "UGC 편집툴을 통해 .foot 원본 파일과 영상 미리보기 파일 추출"
    )

    # ── STEP 1 버튼: 편집 가이드 보기 → 편집툴 다운로드 .exe ────────
    $c = $c.Replace(
        '<a href="register.html" class="btn-step outline-white">편집 가이드 보기</a>',
        '<a href="#" class="btn-step outline-white" onclick="alert(''편집툴 다운로드가 시작됩니다.''); return false;">편집툴 다운로드 .exe</a>'
    )
    # policy 테이블 버튼 동작
    $c = $c.Replace(
        "편집 가이드 보기 → register.html",
        "편집툴 다운로드 .exe (UGC 파일 다운로드)"
    )

    # ── STEP 3 제목/설명 ─────────────────────────────────────────────
    $c = $c.Replace("팩토리 공식 마켓 출시", "파일 변환 &amp; 마켓 등재")
    $c = $c.Replace("팩토리 공식 마켓 출시", "파일 변환 & 마켓 등재")

    # ── register.html STEP4 완료 문구 ───────────────────────────────
    $c = $c.Replace(
        "업로드하신 데이터가 파일 변환을 거치고 있으며, 완료 시 글로벌 마켓에 출시됩니다.",
        "파일 변환이 진행 중이며, 완료되면 글로벌 마켓에 자동 등재됩니다."
    )
    $c = $c.Replace(
        "업로드하신 파일이 변환 중이며, 완료되면 글로벌 마켓에 자동 등재됩니다.",
        "파일 변환이 진행 중이며, 완료되면 글로벌 마켓에 자동 등재됩니다."
    )
    # register.html STEP0 인트로 카드
    $c = $c.Replace(
        "업로드 데이터가 실제 게임 내 아이템으로 변환되어 출시!",
        "업로드 파일이 변환을 거쳐 글로벌 마켓에 자동 등재됩니다!"
    )
    $c = $c.Replace(
        "업로드 파일이 변환을 거쳐 자동으로 마켓에 등재됩니다!",
        "업로드 파일이 변환을 거쳐 글로벌 마켓에 자동 등재됩니다!"
    )

    # ── studio_detail.html 타임라인 등 ───────────────────────────────
    $c = $c.Replace("관리자 검수를 진행 중입니다.", "파일 변환을 진행 중입니다.")
    $c = $c.Replace("관리자 검수 대기 중입니다.", "파일 변환 대기 중입니다.")
    $c = $c.Replace("검수가 완료되었습니다.", "파일 변환이 완료되었습니다.")

    if ($c -ne $original) {
        [System.IO.File]::WriteAllText($f, $c, [System.Text.Encoding]::UTF8)
        Write-Host "PATCHED: $f"
    } else {
        Write-Host "NO CHANGE: $f"
    }
}
Write-Host "Done."

$files = Get-ChildItem -Path 'c:\Users\GRAVITY\Desktop\Anti\ro_factory' -Filter '*.html'
foreach ($f in $files) {
    $content = Get-Content $f.FullName -Raw
    if ($content -match 'desc-script\.js\?v=3\.0') {
        $newContent = $content -replace 'desc-script\.js\?v=3\.0', 'desc-script.js?v=3.1'
        Set-Content $f.FullName -Value $newContent -NoNewline
        Write-Output "Updated: $($f.Name)"
    }
}

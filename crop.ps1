Add-Type -AssemblyName System.Drawing

$dest = "C:\Users\GRAVITY\Desktop\Anti\ro_factory\roz\assets\images\header"
$icons = @("gnb-sub.png", "gnb-topup.png", "gnb-factory.png", "gnb-poring.png", "gnb-news.png", "gnb-gameinfo.png", "gnb-resource.png", "gnb-community.png")

foreach ($icon in $icons) {
    Try {
        $path = Join-Path $dest $icon
        if (-Not (Test-Path $path)) { continue }
        
        $src = [System.Drawing.Bitmap]::FromFile($path)
        $w = $src.Width; $h = $src.Height
        
        $minX = $w; $minY = $h
        $maxX = 0; $maxY = 0
        
        # Aggressive bounding box (ignore white/off-white background and exact white)
        for ($x = 0; $x -lt $w; $x++) {
            for ($y = 0; $y -lt $h; $y++) {
                $p = $src.GetPixel($x, $y)
                # If pixel is opaque AND NOT nearly white
                if ($p.A -gt 15 -and ($p.R -lt 250 -or $p.G -lt 250 -or $p.B -lt 250)) {
                    if ($x -lt $minX) { $minX = $x }
                    if ($x -gt $maxX) { $maxX = $x }
                    if ($y -lt $minY) { $minY = $y }
                    if ($y -gt $maxY) { $maxY = $y }
                }
            }
        }
        
        if ($minX -ge $maxX -or $minY -ge $maxY) {
            Write-Host "Empty image for $icon"
            $src.Dispose()
            continue
        }
        
        $bboxW = $maxX - $minX + 1
        $bboxH = $maxY - $minY + 1
        $cx = $minX + ($bboxW / 2)
        $cy = $minY + ($bboxH / 2)
        
        $maxDim = [math]::Max($bboxW, $bboxH)
        
        # Exact tight square bounds
        $left = [math]::Max(0, $cx - ($maxDim / 2))
        $top = [math]::Max(0, $cy - ($maxDim / 2))
        if ($left -lt 0) { $left = 0 }
        if ($top -lt 0) { $top = 0 }
        
        $cropRect = [System.Drawing.Rectangle]::new([int]$left, [int]$top, [int]$maxDim, [int]$maxDim)
        
        $tile = New-Object System.Drawing.Bitmap(100, 100)
        $g = [System.Drawing.Graphics]::FromImage($tile)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.DrawImage($src, [System.Drawing.Rectangle]::new(0,0,100,100), $cropRect, [System.Drawing.GraphicsUnit]::Pixel)
        $g.Dispose()
        $src.Dispose()
        
        # Now aggressively remove ANY remaining off-white background in the new 100x100 tile
        for ($x = 0; $x -lt 100; $x++) {
            for ($y = 0; $y -lt 100; $y++) {
                $p = $tile.GetPixel($x, $y)
                if ($p.R -gt 245 -and $p.G -gt 245 -and $p.B -gt 245) {
                    $tile.SetPixel($x, $y, [System.Drawing.Color]::Transparent)
                }
            }
        }
        
        $tile.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
        $tile.Dispose()
        Write-Host "Processed aggressively: $icon"
    } Catch {
        Write-Host "Failed tightening $icon : $_"
    }
}

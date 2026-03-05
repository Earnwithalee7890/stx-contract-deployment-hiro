# Convert CRLF to LF and Remove BOM for ALL .clar files recursively
$rootPath = "f:\STX CONTRACT\stacks-builder-challenge\contracts"
$files = Get-ChildItem -Path $rootPath -Filter "*.clar" -Recurse
$utf8NoBOM = New-Object System.Text.UTF8Encoding($false)

foreach ($file in $files) {
    try {
        $content = [System.IO.File]::ReadAllText($file.FullName)
        if ($content.Contains("`r`n")) {
            $content = $content.Replace("`r`n", "`n")
            [System.IO.File]::WriteAllText($file.FullName, $content, $utf8NoBOM)
            Write-Host "Fixed $($file.FullName) (LF + No BOM)" -ForegroundColor Green
        } else {
            # Still rewrite to ensure no BOM
            [System.IO.File]::WriteAllText($file.FullName, $content, $utf8NoBOM)
            Write-Host "Rewrote $($file.FullName) to ensure no BOM" -ForegroundColor Gray
        }
    } catch {
        Write-Host "Error processing $($file.FullName): $($_.Exception.Message)" -ForegroundColor Red
    }
}

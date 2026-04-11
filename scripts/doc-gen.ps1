# Simple script to extract comments from Clarity files into a markdown file.
$contracts = Get-ChildItem -Path contracts -Filter *.clar
$output = "CONTRACTS_DOCUMENTATION.md"

"# Smart Contracts Documentation`n" | Out-File $output -Encoding UTF8

foreach ($file in $contracts) {
    "## $($file.Name)" | Out-File $output -Append -Encoding UTF8
    $content = Get-Content $file.FullName
    foreach ($line in $content) {
        if ($line.StartsWith(";;")) {
            $line.Substring(2).Trim() | Out-File $output -Append -Encoding UTF8
        }
    }
    "`n---`n" | Out-File $output -Append -Encoding UTF8
}

Write-Host "Documentation generated in $output"

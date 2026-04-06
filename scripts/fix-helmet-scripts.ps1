$ErrorActionPreference = "Stop"
Set-Location "c:\Users\lenovo\careercompas\src\pages"

$files = Get-ChildItem -Filter *.tsx

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # Replace JSON.stringify blocks
    $pattern1 = '(?s)<script type="application/ld\+json">\s*(\{JSON\.stringify\([\s\S]*?\)\})\s*</script>'
    $repl1 = '<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: $1 }} />'
    $newContent = [regex]::Replace($content, $pattern1, $repl1)
    
    # Replace template literal blocks
    $pattern2 = '(?s)<script type="application/ld\+json">\s*(\{\`[\s\S]*?\`\})\s*</script>'
    $repl2 = '<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: $1 }} />'
    $newContent = [regex]::Replace($newContent, $pattern2, $repl2)
    
    if ($newContent -cne $content) {
        [System.IO.File]::WriteAllText($file.FullName, $newContent, [System.Text.Encoding]::UTF8)
        Write-Host "Fixed $($file.Name)" -ForegroundColor Green
    }
}

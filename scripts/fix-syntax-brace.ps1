$ErrorActionPreference = "Stop"
Set-Location "c:\Users\lenovo\careercompas\src\pages"

$files = Get-ChildItem -Filter *.tsx

foreach ($file in $files) {
    if ($file.Name -eq "BlogSEO.tsx") { continue } # BlogSEO is in components, but just in case
    
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # regex 1: JSON.stringify
    # find `dangerouslySetInnerHTML={{ __html: {JSON.stringify(...) } }}`
    # Note: we used {{ __html: $1 }} earlier where $1 = {JSON.stringify({ ... })}
    # So it looks like {{ __html: {JSON.stringify({ ... })} }}
    $pattern1 = '(?s)dangerouslySetInnerHTML=\{\{\s*__html:\s*\{JSON\.stringify\(([\s\S]*?)\)\}\s*\}\}'
    $repl1 = 'dangerouslySetInnerHTML={{ __html: JSON.stringify($1) }}'
    
    $newContent = [regex]::Replace($content, $pattern1, $repl1)
    
    # regex 2: Template literals {`  ... `}
    # looks like {{ __html: {` ... `} }}
    $pattern2 = '(?s)dangerouslySetInnerHTML=\{\{\s*__html:\s*\{\`([\s\S]*?)\`\}\s*\}\}'
    $repl2 = 'dangerouslySetInnerHTML={{ __html: `$1` }}'
    
    $newContent = [regex]::Replace($newContent, $pattern2, $repl2)
    
    if ($newContent -cne $content) {
        [System.IO.File]::WriteAllText($file.FullName, $newContent, [System.Text.Encoding]::UTF8)
        Write-Host "Fixed syntax in $($file.Name)" -ForegroundColor Green
    }
}

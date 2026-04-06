const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'src', 'index.css');
let content = fs.readFileSync(cssPath, 'utf8');

// Split into lines
const lines = content.split('\n');
const newLines = [];
let insideDarkBlock = false;
let braceCount = 0;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Check if this line starts a .dark rule
    if (trimmed.startsWith('.dark') || trimmed.startsWith('/* Dark mode') || trimmed.startsWith('/* Enhanced dark mode') || trimmed.startsWith('/* ===== DARK MODE') || trimmed.startsWith('/* ===== ENHANCED DARK')) {
        // Check if it's a CSS rule (contains { or is a comment leading into dark rules)
        if (trimmed.startsWith('/*')) {
            // Skip comment lines about dark mode
            continue;
        }
        insideDarkBlock = true;
        braceCount = 0;
        // Count braces on this opening line
        for (const char of line) {
            if (char === '{') braceCount++;
            if (char === '}') braceCount--;
        }
        if (braceCount <= 0) insideDarkBlock = false;
        continue;
    }

    if (insideDarkBlock) {
        for (const char of line) {
            if (char === '{') braceCount++;
            if (char === '}') braceCount--;
        }
        if (braceCount <= 0) insideDarkBlock = false;
        continue;
    }

    // Also skip @media blocks that only contain dark mode stuff
    if (trimmed.startsWith('@media') && i + 1 < lines.length && lines[i+1].trim().startsWith('.dark')) {
        // Skip the @media block
        let mediaBraceCount = 0;
        for (const char of line) {
            if (char === '{') mediaBraceCount++;
            if (char === '}') mediaBraceCount--;
        }
        let j = i + 1;
        while (j < lines.length && mediaBraceCount > 0) {
            for (const char of lines[j]) {
                if (char === '{') mediaBraceCount++;
                if (char === '}') mediaBraceCount--;
            }
            j++;
        }
        i = j - 1; // Skip to end of block
        continue;
    }

    // Skip standalone dark mode comments  
    if (trimmed.startsWith('/* Dark mode') || 
        trimmed.startsWith('/* Ensure proper contrast') ||
        trimmed.startsWith('/* Dark mode CSS has been removed')) {
        continue;
    }

    newLines.push(line);
}

// Clean up excessive blank lines (more than 2 consecutive)
let finalContent = newLines.join('\n');
finalContent = finalContent.replace(/\n{4,}/g, '\n\n\n');

fs.writeFileSync(cssPath, finalContent, 'utf8');
console.log(`Cleaned index.css: removed dark mode rules. ${lines.length} lines -> ${newLines.length} lines`);

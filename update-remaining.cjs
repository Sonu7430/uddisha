const fs = require('fs');
const path = require('path');

const applyUddishaTheme = (filePath) => {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Theme mapping replacements (Aggressive coverage for leftover gradients and dark mode)
    content = content
        // Gradients
        .replace(/bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800/g, 'ud-main')
        .replace(/bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800/g, 'ud-main')
        .replace(/bg-gradient-to-br from-red-50 to-yellow-50 dark:from-red-900\/20 dark:to-yellow-900\/20/g, 'ud-main')
        .replace(/bg-gradient-to-r from-red-600 to-orange-600/g, 'bg-[var(--ud-gold)]')
        .replace(/bg-gradient-to-br from-purple-50 to-blue-50 dark:from-slate-800 dark:to-slate-900/g, 'bg-[var(--ud-gold-pale)] border-[var(--ud-border)]')
        .replace(/border-purple-200 dark:border-slate-700/g, 'border-[var(--ud-border)]')
        .replace(/bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-800/g, 'bg-[var(--ud-gold-pale)] border border-[var(--ud-gold)]')
        .replace(/bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900\/20 dark:to-orange-900\/20 border border-yellow-200 dark:border-yellow-800/g, 'bg-[var(--ud-gold-pale)] border border-[var(--ud-gold)]')
        .replace(/bg-gradient-to-br from-green-50 to-teal-50 dark:from-slate-800 dark:to-slate-700/g, 'bg-[var(--ud-gold-pale)]')
        .replace(/bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-slate-800 dark:to-slate-700/g, 'bg-[var(--ud-gold-pale)]')
        .replace(/bg-gradient-to-br from-pink-50 to-rose-50 dark:from-slate-800 dark:to-slate-700/g, 'bg-[var(--ud-gold-pale)]')

        // Backgrounds & Badges
        .replace(/bg-gray-200 dark:bg-slate-700/g, 'bg-[var(--ud-gold-pale)]')
        .replace(/bg-green-100 dark:bg-green-900\/30/g, 'bg-[var(--ud-gold-pale)]')
        .replace(/bg-blue-100 dark:bg-blue-900\/30/g, 'bg-[var(--ud-gold-pale)]')
        .replace(/bg-yellow-100 dark:bg-yellow-900\/30/g, 'bg-[var(--ud-gold-pale)]')
        .replace(/bg-purple-100 dark:bg-purple-900\/30/g, 'bg-[var(--ud-gold-pale)]')
        .replace(/bg-blue-50 dark:bg-blue-900\/20/g, 'bg-[var(--ud-gold-pale)]')
        .replace(/bg-gray-50 dark:bg-slate-700/g, 'bg-[var(--ud-gold-pale)]')
        
        .replace(/bg-white dark:bg-slate-700/g, 'bg-[var(--ud-paper)]')
        
        // Text Colors
        .replace(/text-slate-800 dark:text-slate-100/g, 'text-[var(--ud-ink)] text-base font-[family-name:var(--ud-sans)]')
        .replace(/text-gray-400 dark:text-gray-500/g, 'text-[var(--ud-muted)]')
        .replace(/text-gray-600 dark:text-gray-400/g, 'text-[var(--ud-muted)]')
        .replace(/text-gray-700 dark:text-gray-200/g, 'text-[var(--ud-ink)]')
        .replace(/text-gray-900 dark:text-white/g, 'text-[var(--ud-ink)]')
        
        .replace(/text-green-800 dark:text-green-300/g, 'text-[var(--ud-ink)]')
        .replace(/text-blue-800 dark:text-blue-300/g, 'text-[var(--ud-ink)]')
        .replace(/text-yellow-800 dark:text-yellow-300/g, 'text-[var(--ud-ink)]')
        
        .replace(/text-green-600 dark:text-green-400/g, 'text-[var(--ud-ink)]')
        .replace(/text-green-700 dark:text-green-400/g, 'text-[var(--ud-ink)]')
        .replace(/text-orange-700 dark:text-orange-400/g, 'text-[var(--ud-ink)]')
        .replace(/text-blue-600/g, 'text-[var(--ud-gold)]')
        .replace(/text-red-600 dark:text-red-400/g, 'text-[var(--ud-ink)]')
        .replace(/text-yellow-500/g, 'text-[var(--ud-gold)]')

        // Hovers and Active states
        .replace(/hover:text-blue-600 dark:hover:text-blue-400/g, 'hover:text-[var(--ud-gold)]')
        .replace(/hover:text-green-700 dark:hover:text-green-300/g, 'hover:text-[var(--ud-gold)]')
        .replace(/hover:bg-green-100 dark:hover:bg-green-900\/30/g, 'hover:bg-[var(--ud-paper)]')
        .replace(/hover:text-blue-700 dark:hover:text-blue-300/g, 'hover:text-[var(--ud-gold)]')
        .replace(/hover:bg-blue-100 dark:hover:bg-blue-900\/30/g, 'hover:bg-[var(--ud-paper)]')
        .replace(/border-blue-300/g, 'border-[var(--ud-gold)]')
        .replace(/border-gray-200 dark:border-slate-600/g, 'border-[var(--ud-border)]')
        .replace(/border-gray-200 dark:border-gray-600/g, 'border-[var(--ud-border)]')
        .replace(/border-blue-200 dark:border-blue-800/g, 'border-[var(--ud-gold)]')
        
        .replace(/hover:border-green-400 dark:hover:border-green-500/g, 'hover:border-[var(--ud-gold)]')
        .replace(/hover:border-orange-400 dark:hover:border-orange-500/g, 'hover:border-[var(--ud-gold)]')
        .replace(/hover:border-pink-400 dark:hover:border-pink-500/g, 'hover:border-[var(--ud-gold)]');


    fs.writeFileSync(filePath, content, 'utf8');
};

const pagesDir = path.join(__dirname, 'src', 'pages');
const pagesFiles = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

pagesFiles.forEach(file => {
    try {
        applyUddishaTheme(path.join(pagesDir, file));
        console.log(`Updated page: ${file}`);
    } catch (err) {
        console.log(`Could not update ${file}:`, err.message);
    }
});

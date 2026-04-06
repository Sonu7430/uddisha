const fs = require('fs');
const path = require('path');

const applyUddishaTheme = (filePath) => {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Theme mapping replacements
    content = content
        // Global backgrounds
        .replace(/bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-900 text-gray-800 dark:text-gray-100/g, 'ud-main')
        .replace(/bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-900/g, 'ud-main')
        .replace(/bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-900/g, 'ud-main')
        .replace(/bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-700 dark:to-slate-700/g, 'ud-main')
        .replace(/bg-slate-50 dark:bg-slate-900 text-gray-800 dark:text-gray-100/g, 'ud-main')
        .replace(/bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-gray-100/g, 'ud-main')
        .replace(/bg-gradient-to-r from-blue-600 to-purple-600 text-white/g, 'bg-[var(--ud-gold)] text-white')
        .replace(/bg-gradient-to-r from-blue-600 to-purple-600 border-none/g, 'bg-[var(--ud-gold)] border-none text-[var(--ud-paper)]')
        
        // General background replacements (to paper and gold)
        .replace(/bg-white dark:bg-slate-800/g, 'bg-[var(--ud-paper)]')
        .replace(/bg-gray-50 dark:bg-slate-800/g, 'bg-[var(--ud-paper)]')
        .replace(/bg-gray-50 dark:bg-slate-900/g, 'bg-[var(--ud-paper)]')
        .replace(/bg-blue-50 dark:bg-slate-800/g, 'bg-[var(--ud-gold-pale)]')
        .replace(/bg-blue-600 hover:bg-blue-700/g, 'bg-[var(--ud-gold)] hover:brightness-105')
        .replace(/hover:bg-blue-700/g, 'hover:brightness-105')
        
        // Borders
        .replace(/border-gray-100 dark:border-slate-700/g, 'border-[var(--ud-border)]')
        .replace(/border-gray-200 dark:border-slate-700/g, 'border-[var(--ud-border)]')
        .replace(/border-blue-100 dark:border-slate-700/g, 'border-[var(--ud-border)]')
        
        // Text Colors
        .replace(/text-gray-900 dark:text-gray-100/g, 'text-[var(--ud-ink)]')
        .replace(/text-gray-900/g, 'text-[var(--ud-ink)]')
        .replace(/text-gray-800 dark:text-gray-200/g, 'text-[var(--ud-ink)]')
        .replace(/text-gray-800 dark:text-gray-100/g, 'text-[var(--ud-ink)]')
        .replace(/text-gray-700 dark:text-gray-300/g, 'text-[var(--ud-muted)]')
        .replace(/text-gray-600 dark:text-gray-300/g, 'text-[var(--ud-muted)]')
        .replace(/text-gray-600 dark:text-gray-400/g, 'text-[var(--ud-muted)]')
        .replace(/text-gray-500 dark:text-gray-400/g, 'text-[var(--ud-muted)]')
        .replace(/text-blue-700 dark:text-blue-300/g, 'text-[var(--ud-gold)]')
        .replace(/text-blue-600 dark:text-blue-400/g, 'text-[var(--ud-gold)]')
        .replace(/text-purple-600 dark:text-purple-400/g, 'text-[var(--ud-ink)]')
        .replace(/from-blue-600 to-purple-600 bg-clip-text text-transparent/g, 'text-[var(--ud-ink)]');

    fs.writeFileSync(filePath, content, 'utf8');
};

const blogsDir = path.join(__dirname, 'src', 'blogs');
const blogFiles = fs.readdirSync(blogsDir).filter(f => f.endsWith('.tsx'));

blogFiles.forEach(file => {
    try {
        applyUddishaTheme(path.join(blogsDir, file));
        console.log(`Updated blog: ${file}`);
    } catch (err) {
        console.log(`Could not update ${file}:`, err.message);
    }
});

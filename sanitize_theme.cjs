const fs = require('fs');
const path = require('path');

const applyUddishaTheme = (filePath) => {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Theme mapping replacements
    content = content
        // Global backgrounds
        .replace(/bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-900 text-gray-800 dark:text-gray-100/g, 'ud-main')
        .replace(/bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-900/g, 'ud-main')
        .replace(/bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-700 dark:to-slate-700/g, 'ud-main')
        .replace(/bg-gradient-to-r from-gray-50 to-blue-50 dark:from-slate-800 dark:to-slate-900/g, 'ud-main')
        .replace(/bg-slate-50 dark:bg-slate-900 text-gray-800 dark:text-gray-100/g, 'ud-main')
        .replace(/bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-gray-100/g, 'ud-main')
        
        // Cards and surfaces
        .replace(/bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700/g, 'bg-[var(--ud-paper)] border border-[var(--ud-border)]')
        .replace(/bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700/g, 'bg-[var(--ud-paper)] border-[var(--ud-border)]')
        .replace(/bg-white dark:bg-slate-800/g, 'bg-[var(--ud-paper)]')
        .replace(/bg-gray-50 dark:bg-slate-800/g, 'bg-[var(--ud-paper)]')
        .replace(/bg-gray-100 dark:bg-slate-700/g, 'bg-[var(--ud-gold-pale)]')
        .replace(/bg-white\/80 dark:bg-slate-800\/80/g, 'bg-[var(--ud-paper)]/80')
        .replace(/backdrop-blur-sm/g, '')

        // Gradients -> Gold
        .replace(/bg-gradient-to-r from-blue-600 to-purple-600 text-white/g, 'bg-[var(--ud-gold)] text-white')
        .replace(/bg-gradient-to-r from-blue-500 to-purple-500/g, 'bg-[var(--ud-gold)]')
        .replace(/bg-gradient-to-r from-purple-600 to-blue-600/g, 'bg-[var(--ud-gold)]')
        .replace(/bg-gradient-to-r from-blue-600 to-purple-600/g, 'bg-[var(--ud-gold)]')
        .replace(/bg-gradient-to-r from-green-600 to-blue-600/g, 'text-[var(--ud-gold)]')
        .replace(/bg-gradient-to-r from-purple-50 to-blue-50 dark:from-slate-800 dark:to-slate-800/g, 'bg-[var(--ud-gold-pale)] border-b border-[var(--ud-border)]')

        // Text Colors
        .replace(/text-gray-900 dark:text-gray-100/g, 'text-[var(--ud-ink)]')
        .replace(/text-gray-900 dark:text-white/g, 'text-[var(--ud-ink)]')
        .replace(/text-gray-800 dark:text-gray-200/g, 'text-[var(--ud-ink)]')
        .replace(/text-gray-800 dark:text-gray-100/g, 'text-[var(--ud-ink)]')
        .replace(/text-gray-700 dark:text-gray-300/g, 'text-[var(--ud-muted)]')
        .replace(/text-gray-600 dark:text-gray-400/g, 'text-[var(--ud-muted)]')
        .replace(/text-gray-600 dark:text-gray-300/g, 'text-[var(--ud-muted)]')
        .replace(/text-gray-500 dark:text-gray-400/g, 'text-[var(--ud-muted)]')
        .replace(/text-blue-700 dark:text-blue-300/g, 'text-[var(--ud-gold)]')
        .replace(/text-blue-600 dark:text-blue-400/g, 'text-[var(--ud-gold)]')
        .replace(/text-blue-600/g, 'text-[var(--ud-gold)]')
        .replace(/text-blue-500/g, 'text-[var(--ud-gold)]')
        .replace(/text-purple-600 dark:text-purple-400/g, 'text-[var(--ud-ink)]')

        // Borders
        .replace(/border-gray-200 dark:border-slate-700/g, 'border-[var(--ud-border)]')
        .replace(/border-gray-100 dark:border-slate-700/g, 'border-[var(--ud-border)]')
        .replace(/border-gray-300 dark:border-slate-600/g, 'border-[var(--ud-border)]')
        .replace(/border-blue-200 dark:border-slate-600/g, 'border-[var(--ud-gold)]')
        .replace(/border-blue-200 dark:border-blue-900/g, 'border-[var(--ud-border)]')
        .replace(/border-blue-300 dark:border-blue-500/g, 'border-[var(--ud-gold)]')
        .replace(/border-blue-500 dark:border-blue-400/g, 'border-[var(--ud-gold)]')

        // Buttons and form fields
        .replace(/focus:ring-blue-500/g, 'focus:ring-[#c8922a]')
        .replace(/focus:ring-purple-500/g, 'focus:ring-[#c8922a]')
        .replace(/hover:bg-blue-50 dark:hover:bg-slate-700/g, 'hover:bg-[var(--ud-gold-pale)]')
        .replace(/hover:bg-gray-100 dark:hover:bg-slate-700/g, 'hover:bg-[var(--ud-gold-pale)]')

        // Specific category colors for assessment page (flatten to uniform Uddisha palette or slight variations)
        .replace(/bg-blue-100 dark:bg-blue-900\/30 text-blue-600 dark:text-blue-400/g, 'bg-[var(--ud-gold-pale)] text-[var(--ud-ink)]')
        .replace(/bg-green-100 dark:bg-green-900\/30 text-green-600 dark:text-green-400/g, 'bg-[var(--ud-gold-pale)] text-[var(--ud-ink)]')
        .replace(/bg-red-100 dark:bg-red-900\/30 text-red-600 dark:text-red-400/g, 'bg-[var(--ud-gold-pale)] text-[var(--ud-ink)]')
        .replace(/bg-yellow-100 dark:bg-yellow-900\/30 text-yellow-600 dark:text-yellow-400/g, 'bg-[var(--ud-gold-pale)] text-[var(--ud-ink)]')
        .replace(/bg-purple-100 dark:bg-purple-900\/30 text-purple-600 dark:text-purple-400/g, 'bg-[var(--ud-gold-pale)] text-[var(--ud-ink)]')
        .replace(/bg-cyan-100 dark:bg-cyan-900\/30 text-cyan-600 dark:text-cyan-400/g, 'bg-[var(--ud-gold-pale)] text-[var(--ud-ink)]')
        .replace(/bg-orange-100 dark:bg-orange-900\/30 text-orange-600 dark:text-orange-400/g, 'bg-[var(--ud-gold-pale)] text-[var(--ud-ink)]')
        .replace(/bg-indigo-100 dark:bg-indigo-900\/30 text-indigo-600 dark:text-indigo-400/g, 'bg-[var(--ud-gold-pale)] text-[var(--ud-ink)]')
        .replace(/bg-teal-100 dark:bg-teal-900\/30 text-teal-600 dark:text-teal-400/g, 'bg-[var(--ud-gold-pale)] text-[var(--ud-ink)]')
        .replace(/bg-pink-100 dark:bg-pink-900\/30 text-pink-600 dark:text-pink-400/g, 'bg-[var(--ud-gold-pale)] text-[var(--ud-ink)]')
        .replace(/bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400/g, 'bg-[var(--ud-gold-pale)] text-[var(--ud-ink)]');

    fs.writeFileSync(filePath, content, 'utf8');
};

const pagesToUpdate = [
    'src/pages/AssessmentPage.tsx',
    'src/pages/ResultsPage.tsx',
    'src/pages/CareersPage.tsx',
    'src/pages/CareerDetailPage.tsx',
    'src/pages/BlogPage.tsx',
    'src/pages/AboutPage.tsx',
    'src/pages/TermsofService.tsx',
    'src/pages/PrivacyPolicy.tsx',
    'src/pages/CookiePolicy.tsx',
    'src/components/BlogCard.tsx'
];

pagesToUpdate.forEach(file => {
    try {
        applyUddishaTheme(path.join(__dirname, file));
        console.log(`Updated ${file}`);
    } catch (err) {
        console.log(`Could not update ${file}:`, err.message);
    }
});

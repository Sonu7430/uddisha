const fs = require('fs');
const path = require('path');

const cleanFile = (filePath) => {
    if (!fs.existsSync(filePath)) return false;
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    // Replace remaining gradient backgrounds
    content = content
        .replace(/bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600/g, 'bg-[var(--ud-gold)]')
        .replace(/bg-gradient-to-br from-blue-100 to-purple-100/g, 'bg-[var(--ud-gold-pale)]')
        .replace(/bg-gradient-to-r from-blue-100 to-purple-100/g, 'bg-[var(--ud-gold-pale)]')
        .replace(/bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent/g, '')
        .replace(/bg-gradient-to-br from-blue-50 to-purple-50/g, 'bg-[var(--ud-gold-pale)]')
        .replace(/bg-gradient-to-r from-blue-50 to-purple-50/g, 'bg-[var(--ud-gold-pale)]')
        .replace(/bg-gradient-to-br from-blue-50 via-white to-purple-50/g, 'bg-[var(--ud-gold-pale)]')
        .replace(/bg-gradient-to-r from-green-100 to-blue-100/g, 'bg-[var(--ud-gold-pale)]')
        .replace(/bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent/g, 'text-[var(--ud-gold)]')
        .replace(/bg-gradient-to-r from-blue-500 to-purple-500/g, 'bg-[var(--ud-gold)]')
        
        // Fix remaining standalone old colors
        .replace(/border-blue-500 /g, 'border-[var(--ud-gold)] ')
        .replace(/from-blue-50 to-indigo-50/g, 'from-[#f5edda] to-[#f5edda]')
        .replace(/border-blue-500/g, 'border-[var(--ud-gold)]')
        
        // Remaining text colors
        .replace(/ text-white text-center/g, ' text-[var(--ud-paper)] text-center')
        ;

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        return true;
    }
    return false;
};

const files = [
    'src/pages/CareersPage.tsx',
    'src/pages/CareerDetailPage.tsx',
    'src/pages/AboutPage.tsx',
    'src/components/FeedbackForm.tsx',
    'src/components/RelatedPosts.tsx',
    'src/components/StreamSelector.tsx',
    'src/blogs/CareerAdviceBlog.tsx',
    'src/blogs/BlockchainCareer2026.tsx',
    'src/blogs/InterviewTips2026.tsx',
];

files.forEach(file => {
    const fp = path.join(__dirname, file);
    if (cleanFile(fp)) console.log(`Fixed: ${file}`);
});

// Also convert remaining blog decorative gradients from blue/green/purple to warm tones
const blogsDir = path.join(__dirname, 'src', 'blogs');
fs.readdirSync(blogsDir).filter(f => f.endsWith('.tsx')).forEach(file => {
    const fp = path.join(blogsDir, file);
    let content = fs.readFileSync(fp, 'utf8');
    const original = content;

    content = content
        .replace(/bg-gradient-to-r from-blue-50 to-blue-100/g, 'bg-[var(--ud-gold-pale)]')
        .replace(/bg-gradient-to-r from-green-50 to-green-100/g, 'bg-[var(--ud-gold-pale)]')
        .replace(/bg-gradient-to-r from-purple-50 to-purple-100/g, 'bg-[var(--ud-gold-pale)]')
        .replace(/bg-gradient-to-r from-orange-50 to-orange-100/g, 'bg-[var(--ud-gold-pale)]')
        .replace(/bg-gradient-to-r from-pink-50 to-pink-100/g, 'bg-[var(--ud-gold-pale)]')
        .replace(/bg-gradient-to-r from-green-50 to-emerald-50/g, 'bg-[var(--ud-gold-pale)]')
        .replace(/bg-gradient-to-r from-blue-50 to-cyan-50/g, 'bg-[var(--ud-gold-pale)]')
        .replace(/bg-gradient-to-r from-purple-50 to-pink-50/g, 'bg-[var(--ud-gold-pale)]')
        .replace(/bg-gradient-to-r from-orange-50 to-yellow-50/g, 'bg-[var(--ud-gold-pale)]')
        .replace(/bg-gradient-to-r from-blue-50 to-purple-50/g, 'bg-[var(--ud-gold-pale)]')
        .replace(/bg-gradient-to-r from-blue-50 to-indigo-50/g, 'bg-[var(--ud-gold-pale)]')
        .replace(/border-blue-500/g, 'border-[var(--ud-gold)]')
        ;

    if (content !== original) {
        fs.writeFileSync(fp, content, 'utf8');
        console.log(`Fixed blog: ${file}`);
    }
});

console.log('Done!');

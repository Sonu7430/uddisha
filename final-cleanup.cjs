const fs = require('fs');
const path = require('path');

const cleanFile = (filePath) => {
    if (!fs.existsSync(filePath)) return false;
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    // Remove ALL dark: prefixed classes (the nuclear option - we don't use dark mode anymore)
    // This regex matches dark:some-class-name-with-dashes/slashes
    content = content.replace(/ ?dark:[a-zA-Z0-9_\-\/\[\]\(\):\.]+/g, '');

    // Clean up any double spaces left behind
    content = content.replace(/  +/g, ' ');
    // Clean up empty className strings
    content = content.replace(/className=" "/g, 'className=""');
    // Clean up trailing spaces before quotes
    content = content.replace(/ "/g, '"');
    content = content.replace(/ '/g, "'");
    // Fix className=" something" -> className="something"  
    content = content.replace(/className=" /g, 'className="');

    // Replace remaining old Tailwind color classes with Uddisha equivalents
    const replacements = [
        // Backgrounds
        [/bg-white/g, 'bg-[var(--ud-paper)]'],
        [/bg-gray-50/g, 'bg-[var(--ud-paper)]'],
        [/bg-gray-100/g, 'bg-[var(--ud-gold-pale)]'],
        [/bg-gray-200/g, 'bg-[var(--ud-gold-pale)]'],
        [/bg-slate-900/g, 'bg-[var(--ud-paper)]'],
        [/bg-slate-800/g, 'bg-[var(--ud-paper)]'],
        [/bg-slate-700/g, 'bg-[var(--ud-gold-pale)]'],
        [/bg-blue-50/g, 'bg-[var(--ud-gold-pale)]'],
        [/bg-blue-100/g, 'bg-[var(--ud-gold-pale)]'],
        [/bg-blue-600/g, 'bg-[var(--ud-gold)]'],
        [/bg-blue-500/g, 'bg-[var(--ud-gold)]'],
        [/bg-green-100/g, 'bg-[var(--ud-gold-pale)]'],
        [/bg-green-50/g, 'bg-[var(--ud-gold-pale)]'],
        [/bg-purple-600/g, 'bg-[var(--ud-gold)]'],
        [/bg-indigo-600/g, 'bg-[var(--ud-gold)]'],
        [/bg-indigo-500/g, 'bg-[var(--ud-gold)]'],

        // Text colors  
        [/text-gray-900/g, 'text-[var(--ud-ink)]'],
        [/text-gray-800/g, 'text-[var(--ud-ink)]'],
        [/text-gray-700/g, 'text-[var(--ud-muted)]'],
        [/text-gray-600/g, 'text-[var(--ud-muted)]'],
        [/text-gray-500/g, 'text-[var(--ud-muted)]'],
        [/text-gray-400/g, 'text-[var(--ud-muted)]'],
        [/text-gray-300/g, 'text-[var(--ud-muted)]'],
        [/text-slate-800/g, 'text-[var(--ud-ink)]'],
        [/text-slate-100/g, 'text-[var(--ud-ink)]'],
        [/text-blue-800/g, 'text-[var(--ud-ink)]'],
        [/text-blue-700/g, 'text-[var(--ud-gold)]'],
        [/text-blue-600/g, 'text-[var(--ud-gold)]'],
        [/text-blue-500/g, 'text-[var(--ud-gold)]'],
        [/text-blue-400/g, 'text-[var(--ud-gold)]'],
        [/text-blue-300/g, 'text-[var(--ud-gold)]'],
        [/text-indigo-700/g, 'text-[var(--ud-ink)]'],
        [/text-indigo-600/g, 'text-[var(--ud-gold)]'],
        [/text-indigo-400/g, 'text-[var(--ud-gold)]'],
        [/text-purple-600/g, 'text-[var(--ud-gold)]'],
        [/text-teal-500/g, 'text-[var(--ud-gold)]'],
        [/text-green-800/g, 'text-[var(--ud-ink)]'],
        [/text-green-700/g, 'text-[var(--ud-ink)]'],
        [/text-green-600/g, 'text-[var(--ud-ink)]'],
        [/text-orange-600/g, 'text-[var(--ud-gold)]'],
        [/text-pink-600/g, 'text-[var(--ud-gold)]'],
        [/text-yellow-600/g, 'text-[var(--ud-gold)]'],
        [/text-yellow-400/g, 'text-[var(--ud-gold)]'],
        [/text-red-600/g, 'text-[var(--ud-ink)]'],

        // Borders
        [/border-gray-300/g, 'border-[var(--ud-border)]'],
        [/border-gray-200/g, 'border-[var(--ud-border)]'],
        [/border-gray-100/g, 'border-[var(--ud-border)]'],
        [/border-gray-700/g, 'border-[var(--ud-border)]'],
        [/border-blue-200/g, 'border-[var(--ud-gold)]'],
        [/border-blue-400/g, 'border-[var(--ud-gold)]'],
        [/border-blue-800/g, 'border-[var(--ud-gold)]'],
        [/border-blue-100/g, 'border-[var(--ud-border)]'],
        [/border-indigo-100/g, 'border-[var(--ud-border)]'],

        // Hovers
        [/hover:text-blue-700/g, 'hover:text-[var(--ud-gold)]'],
        [/hover:text-blue-600/g, 'hover:text-[var(--ud-gold)]'],
        [/hover:bg-blue-700/g, 'hover:bg-[var(--ud-gold)]'],
        [/hover:bg-gray-100/g, 'hover:bg-[var(--ud-gold-pale)]'],
        [/hover:bg-gray-700/g, 'hover:bg-[var(--ud-gold-pale)]'],
        [/hover:border-blue-400/g, 'hover:border-[var(--ud-gold)]'],
        [/hover:border-blue-300/g, 'hover:border-[var(--ud-gold)]'],
        
        // Focus rings
        [/focus:ring-blue-500/g, 'focus:ring-[#c8922a]'],
        [/focus:ring-blue-300/g, 'focus:ring-[#c8922a]'],
        [/focus:ring-indigo-300/g, 'focus:ring-[#c8922a]'],

        // Gradients
        [/bg-gradient-to-r from-indigo-500 to-teal-500/g, 'bg-[var(--ud-gold)]'],
        [/bg-gradient-to-br from-indigo-500 to-teal-500/g, 'bg-[var(--ud-gold)]'],
        [/bg-gradient-to-r from-indigo-600 to-teal-600/g, 'bg-[var(--ud-gold)]'],
        [/bg-gradient-to-br from-indigo-500 via-purple-500 to-teal-500/g, 'bg-[var(--ud-gold)]'],
        [/bg-gradient-to-r from-indigo-50 to-teal-50/g, 'bg-[var(--ud-gold-pale)]'],
        [/bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600/g, 'text-[var(--ud-gold)]'],
        [/bg-gradient-to-r from-blue-600 to-purple-600/g, 'bg-[var(--ud-gold)]'],

        // Replace hover:from-* hover:to-* leftover gradient hovers
        [/hover:from-indigo-700 hover:to-teal-700/g, ''],
    ];

    replacements.forEach(([pattern, replacement]) => {
        content = content.replace(pattern, replacement);
    });

    // Clean up doubled var references like text-[var(--ud-ink)] text-[var(--ud-ink)]
    content = content.replace(/(text-\[var\(--ud-ink\)\]) \1/g, '$1');
    content = content.replace(/(text-\[var\(--ud-muted\)\]) \1/g, '$1');
    content = content.replace(/(bg-\[var\(--ud-paper\)\]) \1/g, '$1');
    content = content.replace(/(bg-\[var\(--ud-gold-pale\)\]) \1/g, '$1');
    content = content.replace(/(border-\[var\(--ud-border\)\]) \1/g, '$1');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        return true;
    }
    return false;
};

let totalUpdated = 0;

// Process all pages
const pagesDir = path.join(__dirname, 'src', 'pages');
fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx')).forEach(file => {
    if (cleanFile(path.join(pagesDir, file))) {
        console.log(`Fixed: src/pages/${file}`);
        totalUpdated++;
    }
});

// Process all components
const componentsDir = path.join(__dirname, 'src', 'components');
fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx')).forEach(file => {
    if (cleanFile(path.join(componentsDir, file))) {
        console.log(`Fixed: src/components/${file}`);
        totalUpdated++;
    }
});

// Process all blogs
const blogsDir = path.join(__dirname, 'src', 'blogs');
fs.readdirSync(blogsDir).filter(f => f.endsWith('.tsx')).forEach(file => {
    if (cleanFile(path.join(blogsDir, file))) {
        console.log(`Fixed: src/blogs/${file}`);
        totalUpdated++;
    }
});

console.log(`\nDone! Updated ${totalUpdated} files.`);

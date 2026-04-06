const fs = require('fs');
const path = require('path');
const glob = require('glob');

const dirs = ['src/pages', 'src/blogs'];
const MAX_TITLE_LENGTH = 60;

function auditFiles() {
    let missingH1 = [];
    let longTitles = [];

    dirs.forEach(dir => {
        const files = glob.sync(`${dir}/**/*.tsx`);
        files.forEach(file => {
            const content = fs.readFileSync(file, 'utf8');

            // Check for H1
            const hasH1 = /<h1/i.test(content);
            if (!hasH1) {
                missingH1.push(file);
            }

            // Check for Title
            const titleMatch = content.match(/<title>(.*?)<\/title>/);
            if (titleMatch) {
                const title = titleMatch[1];
                if (title.length > MAX_TITLE_LENGTH) {
                    longTitles.push({ file, title, length: title.length });
                }
            }
        });
    });

    console.log('--- MISSING H1 TAGS ---');
    missingH1.forEach(f => console.log(f));

    console.log('\n--- LONG TITLES (>60 chars) ---');
    longTitles.forEach(t => console.log(`${t.file} (${t.length} chars): ${t.title}`));
}

auditFiles();

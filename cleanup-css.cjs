const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'src', 'index.css');
let content = fs.readFileSync(cssPath, 'utf8');

// Remove the dark-pulse keyframe
content = content.replace(/@keyframes dark-pulse \{[\s\S]*?\n\}\r?\n/, '');

// Remove excessive consecutive empty lines (more than 2)
content = content.replace(/(\r?\n){4,}/g, '\n\n');

fs.writeFileSync(cssPath, content, 'utf8');
console.log('Cleaned up leftover dark-pulse keyframe and excessive blank lines.');

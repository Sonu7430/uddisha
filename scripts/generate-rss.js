
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://www.uddisha.com';
const APP_TSX_PATH = path.join(__dirname, '../src/App.tsx');
const BLOG_DIR = path.join(__dirname, '../src/blogs');
const OUTPUT_FILE = path.join(__dirname, '../public/rss.xml');

// Helper to escape XML special characters
function escapeXml(unsafe) {
    if (!unsafe) return '';
    return unsafe.replace(/[<>&'"]/g, function (c) {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
        }
    });
}

function parseDate(dateStr) {
    // Try to parse "Published: Month Year" or other formats
    // Example: "Published: December 2025"
    if (!dateStr) return new Date().toUTCString();

    // Remove "Published:" prefix if present
    const cleanDate = dateStr.replace(/Published:\s*/i, '').trim();

    const date = new Date(cleanDate);
    if (!isNaN(date.getTime())) {
        return date.toUTCString();
    }
    return new Date().toUTCString();
}

async function generateRss() {
    console.log('Generating RSS Feed...');
    try {
        const appTsxContent = fs.readFileSync(APP_TSX_PATH, 'utf8');

        // 1. Extract Lazy Imports to map Component Name -> File Path
        // const ComponentName = lazy(() => import('./blogs/FileName'));
        const importRegex = /const\s+(\w+)\s*=\s*lazy\(\(\)\s*=>\s*import\(['"](.+?)['"]\)\);/g;
        const componentToPathMap = {};

        let importMatch;
        while ((importMatch = importRegex.exec(appTsxContent)) !== null) {
            const [_, componentName, importPath] = importMatch;
            // Resolve path relative to src/App.tsx. 
            const fullPath = path.resolve(__dirname, '../src', importPath);
            // Add extension if missing
            const cryptoExtension = ['.tsx', '.ts', '.jsx', '.js'].find(ext => fs.existsSync(fullPath + ext));

            if (cryptoExtension) {
                componentToPathMap[componentName] = fullPath + cryptoExtension;
            } else if (fs.existsSync(fullPath)) {
                componentToPathMap[componentName] = fullPath;
            }
        }

        const blogPosts = [];

        // 2. Iterate over known components and find their routes
        // Strategy: For each component, find regex match in App.tsx that links it to a /blog/ path.
        // We use negative lookahead ((?!<Route)[\s\S]) to ensure we don't cross Route boundaries
        // This ensures the path belongs to the component.

        for (const [componentName, filePath] of Object.entries(componentToPathMap)) {
            // Regex to find: <Route path="..." ... <ComponentName ...
            // We only care about paths starting with /blog/
            const routeRegex = new RegExp(`<Route\\s+path="(\\/blog\\/[^"]+)"((?!<Route)[\\s\\S])*?<${componentName}\\s*\\/?>`);
            const match = routeRegex.exec(appTsxContent);

            if (match) {
                const slug = match[1];

                const fileContent = fs.readFileSync(filePath, 'utf8');

                // 3. Extract Metadata from Component
                // Title - Support Multi-line with [\s\S]*?
                const titleMatch = /<title>([\s\S]*?)<\/title>/.exec(fileContent);
                let title = titleMatch ? titleMatch[1] : 'Untitled Post';
                // Remove suffix like " | CareerCompass"
                title = title.split('|')[0].trim();
                // Normalize whitespace
                title = title.replace(/\s+/g, ' ').trim();

                // Description - Support Multi-line with [\s\S]*?
                const descMatch = /<meta\s+name="description"\s+content="([\s\S]*?)"\s*\/?>/.exec(fileContent);
                let description = descMatch ? descMatch[1] : '';
                description = description.replace(/\s+/g, ' ').trim();

                // Date
                const dateMatch = /Published:\s*([^<]+)/.exec(fileContent);
                const pubDate = parseDate(dateMatch ? dateMatch[0] : '');

                console.log(`Found post: ${title} (${slug})`);

                blogPosts.push({
                    title: escapeXml(title),
                    link: SITE_URL + slug,
                    description: escapeXml(description),
                    pubDate: pubDate
                });
            }
        }

        // Sort by date (optional, but good)
        blogPosts.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

        // 4. Generate XML
        const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Career Compass Blog</title>
    <link>${SITE_URL}</link>
    <description>Updates on AI, LLMs, and innovation in career guidance.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    ${blogPosts.map(post => `
    <item>
      <title>${post.title}</title>
      <link>${post.link}</link>
      <description>${post.description}</description>
      <pubDate>${post.pubDate}</pubDate>
      <guid>${post.link}</guid>
    </item>`).join('')}
  </channel>
</rss>`;

        // 5. Write to file
        const publicDir = path.dirname(OUTPUT_FILE);
        if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir, { recursive: true });
        }

        fs.writeFileSync(OUTPUT_FILE, rssXml);
        console.log(`✅ RSS Feed generated with ${blogPosts.length} posts at ${OUTPUT_FILE}`);

    } catch (error) {
        console.error('❌ Error generating RSS feed:', error);
        process.exit(1);
    }
}

generateRss();

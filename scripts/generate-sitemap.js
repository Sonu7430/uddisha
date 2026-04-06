
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://www.uddisha.com';
const APP_TSX_PATH = path.join(__dirname, '../src/App.tsx');
const OUTPUT_FILE = path.join(__dirname, '../public/sitemap.xml');

async function generateSitemap() {
    console.log('🚀 Generating Comprehensive Sitemap...');
    try {
        const appTsxContent = fs.readFileSync(APP_TSX_PATH, 'utf8');

        // 1. Static Pages
        const staticPages = [
            '/',
            '/about',
            '/assessment',
            '/careers',
            '/counselling',
            '/contact-us',
            '/privacy-policy',
            '/terms-of-service',
            '/cookie-policy'
        ];

        // 2. Extract Blog Routes
        // Regex to find: <Route path="/blog/..."
        const blogRouteRegex = /path="(\/blog\/[^"]+)"/g;
        const blogRoutes = new Set();
        let match;
        while ((match = blogRouteRegex.exec(appTsxContent)) !== null) {
            blogRoutes.add(match[1]);
        }

        // Add the main blog list page
        blogRoutes.add('/blog');

        // 3. Generate Career Routes (IDs 1 to 1800+)
        // Based on allCareers generateComprehensiveCareers sequential IDs
        const careerRoutes = [];
        for (let i = 1; i <= 1850; i++) {
            careerRoutes.push(`/career/${i}`);
        }

        const allUrls = [
            ...staticPages,
            ...Array.from(blogRoutes),
            ...careerRoutes
        ];

        console.log(`📊 Found ${staticPages.length} static pages.`);
        console.log(`📊 Found ${blogRoutes.size} blog posts.`);
        console.log(`📊 Generated ${careerRoutes.length} career guides.`);

        const lastMod = new Date().toISOString().split('T')[0];

        // 4. Build XML
        let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

        allUrls.forEach(urlPath => {
            let priority = 0.5;
            let freq = 'monthly';

            if (urlPath === '/') {
                priority = 1.0;
                freq = 'daily';
            } else if (urlPath === '/assessment' || urlPath === '/careers' || urlPath === '/blog') {
                priority = 0.9;
                freq = 'weekly';
            } else if (urlPath.startsWith('/blog/')) {
                priority = 0.8;
                freq = 'monthly';
            } else if (urlPath.startsWith('/career/')) {
                priority = 0.7;
                freq = 'monthly';
            }

            sitemapXml += `  <url>
    <loc>${SITE_URL}${urlPath}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${priority.toFixed(2)}</priority>
  </url>
`;
        });

        sitemapXml += '</urlset>';

        // 5. Write to file
        fs.writeFileSync(OUTPUT_FILE, sitemapXml);
        console.log(`✅ Sitemap successfully generated at ${OUTPUT_FILE}`);
        console.log(`📈 Total URLs indexed: ${allUrls.length}`);

    } catch (error) {
        console.error('❌ Error generating sitemap:', error);
        process.exit(1);
    }
}

generateSitemap();

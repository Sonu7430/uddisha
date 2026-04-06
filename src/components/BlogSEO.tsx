// src/components/BlogSEO.tsx
// Reusable SEO wrapper for all blog posts - injects BlogPosting schema + Article meta
// Usage: <BlogSEO title="..." description="..." slug="..." date="..." />

import React from'react';
import { Helmet } from'react-helmet-async';

interface BlogSEOProps {
 title: string;
 description: string;
 slug: string; // URL slug, e.g.,"data-science-career-2026"
 date: string; // Published date, e.g.,"2026-01-15"
 keywords?: string;
 image?: string;
}

const BASE_URL ='https://www.uddisha.com';
const DEFAULT_IMAGE = `${BASE_URL}/favicons/android-chrome-512x512.png`;

const BlogSEO: React.FC<BlogSEOProps> = ({
 title,
 description,
 slug,
 date,
 keywords ='',
 image = DEFAULT_IMAGE,
}) => {
 const url = `${BASE_URL}/blog/${slug}`;
 const modifiedDate ='2026-03-26'; // Keep updating this when content is refreshed

 const blogPostingSchema = {
'@context':'https://schema.org',
'@type':'BlogPosting',
 headline: title,
 description: description,
 url: url,
 image: {
'@type':'ImageObject',
 url: image,
 },
 datePublished: date,
 dateModified: modifiedDate,
 author: {
'@type':'Organization',
 name:'Uddisha Editorial Team',
 url: BASE_URL,
 },
 publisher: {
'@type':'Organization',
 name:'Uddisha',
 url: BASE_URL,
 logo: {
'@type':'ImageObject',
 url: DEFAULT_IMAGE,
 width: 512,
 height: 512,
 },
 },
 mainEntityOfPage: {
'@type':'WebPage',
'@id': url,
 },
 inLanguage:'en-IN',
 isPartOf: {
'@type':'Blog',
 name:'Uddisha Blog',
 url: `${BASE_URL}/blog`,
 },
 };

 const breadcrumbSchema = {
'@context':'https://schema.org',
'@type':'BreadcrumbList',
 itemListElement: [
 {
'@type':'ListItem',
 position: 1,
 name:'Home',
 item: BASE_URL,
 },
 {
'@type':'ListItem',
 position: 2,
 name:'Blog',
 item: `${BASE_URL}/blog`,
 },
 {
'@type':'ListItem',
 position: 3,
 name: title,
 item: url,
 },
 ],
 };

 return (
 <Helmet>
 <title>{title} | Uddisha</title>
 <meta name="description" content={description} />
 {keywords && <meta name="keywords" content={keywords} />}
 <link rel="canonical" href={url} />

 {/* Open Graph / Article */}
 <meta property="og:title" content={title} />
 <meta property="og:description" content={description} />
 <meta property="og:url" content={url} />
 <meta property="og:type" content="article" />
 <meta property="og:image" content={image} />
 <meta property="og:site_name" content="Uddisha" />
 <meta property="og:locale" content="en_IN" />
 <meta property="article:published_time" content={date} />
 <meta property="article:modified_time" content={modifiedDate} />
 <meta property="article:author" content="Uddisha Editorial Team" />

 {/* Twitter Card */}
 <meta name="twitter:card" content="summary_large_image" />
 <meta name="twitter:title" content={title} />
 <meta name="twitter:description" content={description} />
 <meta name="twitter:image" content={image} />

 {/* Robots */}
 <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

 {/* BlogPosting Schema */}
 <script key={`blogpost-${slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} />

 {/* BreadcrumbList Schema */}
 <script key={`breadcrumb-${slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
 </Helmet>
 );
};

export default BlogSEO;

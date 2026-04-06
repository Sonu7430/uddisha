import { useEffect } from'react';

/**
 * A utility component that preloads blog-related resources
 * This component doesn't render anything visible
 */
const BlogPreloader = () => {
 useEffect(() => {
 // Preload the main blog page component
 const preloadBlogPage = () => {
 // Dynamic import to trigger preloading
 import('../pages/BlogPage');
 };

 // Preload the first few blog articles
 const preloadTopArticles = () => {
 // Preload the most popular blog articles
 import('../blogs/AIRevolution');
 import('../blogs/EmergingCareers');
 };

 // Delay preloading to prioritize initial page load (especially on mobile)
 const timer = setTimeout(() => {
 preloadBlogPage();
 // Further delay the article preloading
 setTimeout(preloadTopArticles, 3000);
 }, 8000); // Increased from 3s to 8s for mobile performance

 return () => {
 clearTimeout(timer);
 };
 }, []);

 // This component doesn't render anything
 return null;
};

export default BlogPreloader;
import { useEffect } from'react';

const RoutePreloader = () => {
 useEffect(() => {
 const prefetchRoutes = async () => {
 // Helper to import routes
 const importRoutes = () => {
 try {
 import('../pages/AboutPage');
 import('../pages/AssessmentPage');
 import('../pages/CareersPage');
 import('../pages/BlogPage');
 import('../pages/ResultsPage');
 } catch (error) {
 console.warn('Prefetching failed:', error);
 }
 };

 // Wait for network idle or 5 seconds
 if ('requestIdleCallback' in window) {
 // @ts-ignore - requestIdleCallback is not fully typed in all envs yet
 requestIdleCallback(() => {
 setTimeout(importRoutes, 5000); // Delayed to prioritize initial mobile render
 });
 } else {
 setTimeout(importRoutes, 7000);
 }
 };

 // Trigger on load
 if (document.readyState ==='complete') {
 prefetchRoutes();
 } else {
 window.addEventListener('load', prefetchRoutes);
 return () => window.removeEventListener('load', prefetchRoutes);
 }
 }, []);

 return null;
};

export default RoutePreloader;

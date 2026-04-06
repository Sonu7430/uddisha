/**
 * Utility functions for preloading page components
 * These functions help improve perceived performance by preloading
 * components before the user navigates to them
 */



/**
 * Preloads the blog page component and top blog articles
 * Call this function when a user hovers over or focuses on a blog link
 */
export const preloadBlogPage = () => {
  // Dynamic import to trigger webpack/vite to load the chunk
  import('../pages/BlogPage')
    .then(() => {
      // After blog page loads, preload the most popular blog articles
      import('../blogs/AIRevolution');
      import('../blogs/EmergingCareers');
    })
    .catch(error => {
      // Silently handle any preloading errors
      console.debug('Blog preloading error:', error);
    });
};
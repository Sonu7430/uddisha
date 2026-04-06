import React, { memo } from'react';
import { Link } from'react-router-dom';

interface BlogPost {
 id: string;
 title: string;
 summary: string;
 date: string;
}

interface BlogCardProps {
 post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
 const handleClick = () => {
 // Force immediate scroll to top when navigating to blog post
 window.scrollTo(0, 0);
 document.documentElement.scrollTop = 0;
 document.body.scrollTop = 0;

 // Additional fallback with delay
 setTimeout(() => {
 window.scrollTo(0, 0);
 document.documentElement.scrollTop = 0;
 document.body.scrollTop = 0;
 }, 100);
 };

 return (
 <Link
 to={`/blog/${post.id}`}
 onClick={handleClick}
 className="block border border-[var(--ud-border)] rounded-xl p-4 hover:shadow-lg hover:border-[var(--ud-gold)] transition-all duration-300 bg-[var(--ud-paper)] cursor-pointer group"
 >
 <h2 className="text-xl font-semibold text-[var(--ud-ink)] group-hover:text-[var(--ud-gold)] transition-colors duration-200">{post.title}</h2>
 <p className="text-[var(--ud-muted)] mt-2">{post.summary}</p>
 <div className="mt-2 text-sm text-[var(--ud-muted)]">{post.date}</div>
 <span className="mt-4 inline-block text-[var(--ud-gold)] text-sm font-medium group-hover:underline">
 Read More →
 </span>
 </Link>
 );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(BlogCard);
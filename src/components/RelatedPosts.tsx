import React, { useCallback } from'react';
import { useNavigate, Link } from'react-router-dom';
import { ArrowRight } from'lucide-react';

interface RelatedPost {
 id: string;
 title: string;
 summary: string;
}

interface RelatedPostsProps {
 posts: RelatedPost[];
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ posts }) => {
 const navigate = useNavigate();

 const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, postId: string) => {
 e.preventDefault();

 // Scroll to top immediately
 window.scrollTo(0, 0);
 document.documentElement.scrollTop = 0;
 document.body.scrollTop = 0;

 // Navigate to the new blog post
 navigate(`/blog/${postId}`);

 // Fallback scroll after navigation
 setTimeout(() => {
 window.scrollTo(0, 0);
 document.documentElement.scrollTop = 0;
 document.body.scrollTop = 0;
 }, 100);
 }, [navigate]);

 if (!posts || posts.length === 0) return null;

 return (
 <section className="mt-12 pt-8 border-t border-[var(--ud-border)]">
 <h2 className="text-2xl font-bold mb-6 text-[var(--ud-ink)]">
 📚 Related Articles
 </h2>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
 {posts.map((post) => (
 <a
 key={post.id}
 href={`/blog/${post.id}`}
 onClick={(e) => handleClick(e, post.id)}
 className="group block p-4 bg-[var(--ud-gold-pale)] rounded-xl border border-[var(--ud-border)] hover:shadow-lg hover:border-[var(--ud-gold)] transition-all duration-300"
 >
 <h3 className="font-semibold text-[var(--ud-ink)] group-hover:text-[var(--ud-gold)] transition-colors line-clamp-2 mb-2">
 {post.title}
 </h3>
 <p className="text-sm text-[var(--ud-muted)] line-clamp-2 mb-3">
 {post.summary}
 </p>
 <span className="inline-flex items-center text-sm font-medium text-[var(--ud-gold)] group-hover:gap-2 transition-all">
 Read More <ArrowRight className="h-4 w-4 ml-1" />
 </span>
 </a>
 ))}
 </div>

 {/* Back to Blog Link */}
 <div className="mt-8 text-center">
 <Link
 to="/blog"
 className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--ud-gold)] text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300"
 >
 ← Back to All Articles
 </Link>
 </div>
 </section>
 );
};

export default RelatedPosts;

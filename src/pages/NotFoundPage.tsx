import React from'react';
import { Link } from'react-router-dom';
import { Helmet } from'react-helmet-async';
import { Home, BookOpen, Compass, HelpCircle, ArrowLeft } from'lucide-react';

const NotFoundPage: React.FC = () => {
 return (
 <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
 <Helmet>
 <title>Page Not Found | Uddisha</title>
 <meta name="description" content="The page you're looking for doesn't exist. Navigate back to Uddisha to discover your ideal career path." />
 <meta name="robots" content="noindex, nofollow" />
 </Helmet>

 <div className="max-w-lg w-full text-center">
 {/* Animated 404 Number */}
 <div className="relative mb-8">
 <h1 className="text-[150px] md:text-[200px] font-bold leading-none select-none" style={{ fontFamily:'var(--ud-serif)', color:'var(--ud-gold)', opacity: 0.3 }}>
 404
 </h1>
 </div>

 {/* Message */}
 <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily:'var(--ud-serif)', color:'var(--ud-ink)' }}>
 Oops! You've wandered off the path
 </h2>
 <p className="mb-8 text-lg" style={{ color:'var(--ud-muted)' }}>
 Don't worry, even the best explorers get lost sometimes. Let's get you back on track to discover your perfect career.
 </p>

 {/* Navigation Cards */}
 <div className="grid grid-cols-2 gap-4 mb-8">
 <Link
 to="/"
 className="group flex flex-col items-center p-4 rounded-xl border transition-all duration-300 hover:shadow-lg"
 style={{ background:'var(--ud-gold-pale)', borderColor:'var(--ud-border)' }}
 >
 <Home className="h-8 w-8 mb-2 group-hover:scale-110 transition-transform" style={{ color:'var(--ud-gold)' }} />
 <span className="font-semibold" style={{ color:'var(--ud-ink)' }}>Home</span>
 </Link>

 <Link
 to="/assessment"
 className="group flex flex-col items-center p-4 rounded-xl border transition-all duration-300 hover:shadow-lg"
 style={{ background:'var(--ud-gold-pale)', borderColor:'var(--ud-border)' }}
 >
 <Compass className="h-8 w-8 mb-2 group-hover:scale-110 transition-transform" style={{ color:'var(--ud-gold)' }} />
 <span className="font-semibold" style={{ color:'var(--ud-ink)' }}>Assessment</span>
 </Link>

 <Link
 to="/blog"
 className="group flex flex-col items-center p-4 rounded-xl border transition-all duration-300 hover:shadow-lg"
 style={{ background:'var(--ud-gold-pale)', borderColor:'var(--ud-border)' }}
 >
 <BookOpen className="h-8 w-8 mb-2 group-hover:scale-110 transition-transform" style={{ color:'var(--ud-gold)' }} />
 <span className="font-semibold" style={{ color:'var(--ud-ink)' }}>Blog</span>
 </Link>

 <Link
 to="/careers"
 className="group flex flex-col items-center p-4 rounded-xl border transition-all duration-300 hover:shadow-lg"
 style={{ background:'var(--ud-gold-pale)', borderColor:'var(--ud-border)' }}
 >
 <HelpCircle className="h-8 w-8 mb-2 group-hover:scale-110 transition-transform" style={{ color:'var(--ud-gold)' }} />
 <span className="font-semibold" style={{ color:'var(--ud-ink)' }}>Careers</span>
 </Link>
 </div>

 {/* Back Button */}
 <button
 onClick={() => window.history.back()}
 className="inline-flex items-center gap-2 px-6 py-3 font-medium transition-colors"
 style={{ color:'var(--ud-muted)' }}
 >
 <ArrowLeft className="h-5 w-5" />
 Go Back
 </button>
 </div>
 </div>
 );
};

export default NotFoundPage;

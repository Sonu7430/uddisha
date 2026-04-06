import React, { useState, lazy, Suspense } from'react';
import { Link } from'react-router-dom';
import { Helmet } from'react-helmet-async';
import { Database, Target, TrendingUp, BookOpen, ArrowRight } from'lucide-react';
import { preloadBlogPage } from'../lib/preloaders';
import ScrollReveal from'../components/ScrollReveal';

import { allCareers } from '../data/careers';

const StreamSelector = lazy(() => import('../components/StreamSelector'));

const HomePage = () => {
 const [isStreamSelectorOpen, setIsStreamSelectorOpen] = useState(false);

 // Helper to find career ID by name (case insensitive match)
 const getCareerLink = (name: string) => {
   const career = allCareers.find(c => c.name.toLowerCase().includes(name.toLowerCase()));
   return career ? `/career/${career.id}` : '/careers';
 };

 return (
 <main className="ud-main">
 <Helmet>
 <title>Uddisha — AI-Powered Career Discovery | Free Career Test India</title>
 <meta name="description" content="Take India's best free AI career test. Uddisha matches you to 1800+ career options using advanced AI. Get stream advice after 10th, 12th & college. 50,000+ students guided. 100% free." />
 <meta name="keywords" content="free career test India, career guidance AI, career options after 12th, career options after 10th, AI career assessment, stream selector, career counselor India, best career for me, Uddisha" />
 <link rel="canonical" href="https://www.uddisha.com/" />
 <meta property="og:title" content="Uddisha — Free AI Career Test for Indian Students" />
 <meta property="og:description" content="India's leading free AI career guidance platform. Take our free career test, explore 1800+ careers, stream selector, expert blog. 100% free." />
 <meta property="og:url" content="https://www.uddisha.com/" />
 <meta property="og:type" content="website" />
 <meta property="og:image" content="https://www.uddisha.com/favicons/android-chrome-512x512.png" />
 </Helmet>

 {/* Hero Section */}
 <section className="ud-hero">
 <div className="ud-hero-left">
 <div className="ud-eyebrow">Discover Your Path</div>
 <h1 className="ud-hero-title">Navigate Your Career with <em>AI Precision</em></h1>
 <p className="ud-hero-sub">
 India's premium career discovery platform. We analyze 50+ traits to find your perfect path.
 </p>
 <div className="ud-hero-actions">
 <Link to="/assessment" className="ud-btn-primary">Find My Perfect Career</Link>
 <button onClick={() => setIsStreamSelectorOpen(true)} className="ud-btn-ghost">
 Take Stream Test <ArrowRight className="w-4 h-4" />
 </button>
 </div>
 <div className="ud-hero-stats">
 <ScrollReveal animation="fade-up" delay={200}>
 <div className="ud-stat-val">1800+</div>
 <div className="ud-stat-label">Career Options</div>
 </ScrollReveal>
 <ScrollReveal animation="fade-up" delay={350}>
 <div className="ud-stat-val">95%</div>
 <div className="ud-stat-label">Accuracy Rate</div>
 </ScrollReveal>
 <ScrollReveal animation="fade-up" delay={500}>
 <div className="ud-stat-val">50K+</div>
 <div className="ud-stat-label">Users Helped</div>
 </ScrollReveal>
 </div>
 </div>
 <div className="ud-hero-right">
 <div className="ud-hero-visual">
 <div className="ud-central-orb">
 <div className="ud-orb-icon" style={{ fontFamily: 'var(--ud-serif)', fontSize: '13px', letterSpacing: '0.05em', color: 'var(--ud-gold)' }}>Uddisha</div>
 <div className="ud-orb-text">Career Care</div>
 <div className="ud-orb-sub">Guiding You</div>
 </div>
 <div className="ud-card-float f1">
 <div className="fcard-label">Top Match</div>
 <div className="fcard-val">Data Scientist</div>
 <div className="fcard-sub"><span className="fcard-dot"></span> 98% Compatibility</div>
 </div>
 <div className="ud-card-float f2">
 <div className="fcard-label">Archetype</div>
 <div className="fcard-val">The Innovator</div>
 </div>
 <div className="ud-card-float f3">
 <div className="fcard-label">Industry</div>
 <div className="fcard-val">Technology</div>
 </div>
 </div>
 </div>
 </section>

 {/* Features Section */}
 <section id="features" className="ud-section">
 <ScrollReveal animation="fade-up">
 <div className="ud-section-eyebrow">The Methodology</div>
 <h2 className="ud-section-title">How we find your match.</h2>
 <p className="ud-section-sub">
 Unlike simple quizzes, our assessment uses deep trait analysis, layered questioning, and weight-based scoring to generate highly accurate archetype profiles.
 </p>
 </ScrollReveal>

 <div className="ud-feat-grid">
 <ScrollReveal animation="flip-up" delay={0}>
 <div className="ud-feat-cell">
 <div className="ud-feat-num">01</div>
 <h3 className="ud-feat-title">Trait Analysis</h3>
 <p className="ud-feat-desc">Evaluates 50+ dimensions of your personality, cognitive style, and core values to form a complete baseline.</p>
 </div>
 </ScrollReveal>
 <ScrollReveal animation="flip-up" delay={150}>
 <div className="ud-feat-cell">
 <div className="ud-feat-num">02</div>
 <h3 className="ud-feat-title">Layered Logic</h3>
 <p className="ud-feat-desc">Smart branching questions adapt to your responses, probing deeper into emerging patterns without bloat.</p>
 </div>
 </ScrollReveal>
 <ScrollReveal animation="flip-up" delay={300}>
 <div className="ud-feat-cell">
 <div className="ud-feat-num">03</div>
 <h3 className="ud-feat-title">Weight-Based Scoring</h3>
 <p className="ud-feat-desc">Assigns precise coefficients to competing variables to find your dominant career archetypes accurately.</p>
 </div>
 </ScrollReveal>
 </div>
 </section>

 {/* Careers Strip Section */}
 <section className="ud-section ud-careers-strip">
 <ScrollReveal animation="fade-left">
 <div className="ud-section-eyebrow">Explore Roles</div>
 <h2 className="ud-section-title">A universe of possibilities.</h2>
 </ScrollReveal>
 <ScrollReveal animation="fade-up" delay={200}>
 <div className="ud-pill-row">
 <Link to={getCareerLink("Data Science")} className="ud-pill">Data Science</Link>
 <Link to={getCareerLink("Product Management")} className="ud-pill">Product Management</Link>
 <Link to={getCareerLink("Investment Banking")} className="ud-pill">Investment Banking</Link>
 <Link to={getCareerLink("Clinical Psychology")} className="ud-pill">Clinical Psychology</Link>
 <Link to={getCareerLink("Artificial Intelligence")} className="ud-pill">Artificial Intelligence</Link>
 <Link to={getCareerLink("Corporate Law")} className="ud-pill">Corporate Law</Link>
 <Link to={getCareerLink("Architecture")} className="ud-pill">Architecture</Link>
 <Link to={getCareerLink("Biotechnology")} className="ud-pill">Biotechnology</Link>
 <Link to="/careers" className="ud-pill">View All 1800+ Careers →</Link>
 </div>
 </ScrollReveal>
 </section>

 {/* Assessment CTA */}
 <section className="ud-section ud-assess">
 <div className="ud-assess-inner">
 <ScrollReveal animation="fade-right">
 <div className="ud-assess-left">
 <div className="ud-section-eyebrow">Free Assessment</div>
 <h2 className="ud-section-title">Ready to discover your true potential?</h2>
 <div className="ud-assess-steps">
 <ScrollReveal animation="fade-up" delay={100}>
 <div className="ud-step">
 <div className="ud-step-num">1</div>
 <div className="ud-step-text"><strong>Answer 40 questions</strong> Takes roughly 10 minutes. Go with your gut.</div>
 </div>
 </ScrollReveal>
 <ScrollReveal animation="fade-up" delay={250}>
 <div className="ud-step">
 <div className="ud-step-num">2</div>
 <div className="ud-step-text"><strong>Get your Archetype</strong> Discover your primary and secondary professional personas.</div>
 </div>
 </ScrollReveal>
 <ScrollReveal animation="fade-up" delay={400}>
 <div className="ud-step">
 <div className="ud-step-num">3</div>
 <div className="ud-step-text"><strong>Explore Matches</strong> See specific careers ranked by compatibility.</div>
 </div>
 </ScrollReveal>
 </div>
 </div>
 </ScrollReveal>
 <ScrollReveal animation="zoom-in" delay={200}>
 <div className="ud-assess-right">
 <h3>Start Assessment</h3>
 <p>Join 50,000+ others who have found their calling with Uddisha.</p>
 <Link to="/assessment" className="ud-btn-primary" style={{display:'block', width:'100%', boxSizing:'border-box'}}>Begin Free Test Now</Link>
 </div>
 </ScrollReveal>
 </div>
 </section>

 {/* Blog Section */}
 <section className="ud-section">
 <ScrollReveal animation="blur-in">
 <div className="ud-section-eyebrow">Insights</div>
 <h2 className="ud-section-title">Latest career intelligence.</h2>
 </ScrollReveal>
 <div className="ud-blog-grid">
 <ScrollReveal animation="fade-up" delay={0}>
 <Link to="/blog/data-science-career-2026" className="ud-blog-card">
 <div className="ud-blog-img">
 <span className="ud-blog-tag">Technology</span>
 <div className="ud-blog-img-inner" style={{ fontFamily: 'var(--ud-serif)', fontSize: '11px', letterSpacing: '0.05em', color: 'var(--ud-gold)', opacity: 0.8 }}>Uddisha</div>
 </div>
 <div className="ud-blog-body">
 <h3 className="ud-blog-title">Is Data Science still a good bet in 2026?</h3>
 <div className="ud-blog-meta">5 min read • Industry Trends</div>
 </div>
 </Link>
 </ScrollReveal>
 <ScrollReveal animation="fade-up" delay={150}>
 <Link to="/blog/upsc-civil-services-career-2026" className="ud-blog-card">
 <div className="ud-blog-img">
 <span className="ud-blog-tag">Govt</span>
 <div className="ud-blog-img-inner" style={{ fontFamily: 'var(--ud-serif)', fontSize: '11px', letterSpacing: '0.05em', color: 'var(--ud-gold)', opacity: 0.8 }}>Uddisha</div>
 </div>
 <div className="ud-blog-body">
 <h3 className="ud-blog-title">The changing landscape of UPSC preparation</h3>
 <div className="ud-blog-meta">7 min read • Exam Strategy</div>
 </div>
 </Link>
 </ScrollReveal>
 <ScrollReveal animation="fade-up" delay={300}>
 <Link to="/blog/finance-career-paths-2026" className="ud-blog-card">
 <div className="ud-blog-img">
 <span className="ud-blog-tag">Finance</span>
 <div className="ud-blog-img-inner" style={{ fontFamily: 'var(--ud-serif)', fontSize: '11px', letterSpacing: '0.05em', color: 'var(--ud-gold)', opacity: 0.8 }}>Uddisha</div>
 </div>
 <div className="ud-blog-body">
 <h3 className="ud-blog-title">IB vs PE: Navigating the high-finance divide</h3>
 <div className="ud-blog-meta">6 min read • Career Paths</div>
 </div>
 </Link>
 </ScrollReveal>
 </div>
 </section>

 <Suspense fallback={<div className="fixed inset-0 bg-black/30 flex items-center justify-center">Loading...</div>}>
 {isStreamSelectorOpen && (
 <StreamSelector
 isOpen={isStreamSelectorOpen}
 onClose={() => setIsStreamSelectorOpen(false)}
 />
 )}
 </Suspense>
 </main>
 );
};

export default HomePage;


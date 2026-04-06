import React from'react';
import { Link, useNavigate } from'react-router-dom';
import { Helmet } from'react-helmet-async';
import { ArrowLeft, Users, Target, Award, Heart, Lightbulb, Globe, Shield, Zap, Star, CheckCircle, Mail, Phone, MapPin, Clock } from'lucide-react';
import ScrollReveal from'../components/ScrollReveal';

const AboutPage = () => {
 const teamMembers = [
 {
 name:"Pranshu",
 role:"Founder & CEO",
 description:"Passionate about helping people find their dream careers through technology and AI innovation.",
 initials: "PP",
 },
 {
 name:"Saurav",
 role:"Head of AI Development",
 description:"Leading our AI research team to create the most accurate career matching algorithms in the industry.",
 initials: "SK",
 },
 {
 name:"Digvijay",
 role:"Career Psychology Expert",
 description:"Bringing 15+ years of career counseling experience to help design meaningful assessments.",
 initials: "DS",
 },
 {
 name:"Ritesh",
 role:"Product Design Lead",
 description:"Creating intuitive and beautiful user experiences that make career discovery enjoyable.",
 initials: "RK",
 }
 ];

 const values = [
 {
 icon: Heart,
 title:"Empowerment",
 description:"We believe everyone deserves to find work that fulfills them and matches their unique talents and passions."
 },
 {
 icon: Lightbulb,
 title:"Innovation",
 description:"We continuously push the boundaries of AI and technology to provide the most accurate career guidance."
 },
 {
 icon: Shield,
 title:"Trust",
 description:"Your data is secure with us. We maintain the highest standards of privacy and data protection."
 },
 {
 icon: Globe,
 title:"Accessibility",
 description:"Career guidance should be available to everyone, everywhere. That's why Uddisha is completely free."
 }
 ];

 const achievements = [
 {
 number:"50,000+",
 label:"Users Helped",
 description:"People who found their ideal career path"
 },
 {
 number:"1,800+",
 label:"Career Options", // This is already correct
 description:"Comprehensive database across all industries"
 },
 {
 number:"95%",
 label:"Accuracy Rate",
 description:"Users satisfied with their career matches"
 },
 {
 number:"24/7",
 label:"Available",
 description:"Always here when you need career guidance"
 }
 ];

 return (
 <div className="min-h-screen py-6 sm:py-12 ud-main text-[var(--ud-ink)]">
 <Helmet>
 <title>About Uddisha — Our Mission, Team & AI Career Guidance Platform | India</title>
 <meta name="description" content="Uddisha is India's leading free AI career guidance platform. Founded 2025 in New Delhi. 50,000+ students helped, 1800+ career options. Meet our team of AI researchers, career psychologists, and product designers." />
 <meta name="keywords" content="Uddisha team, about Uddisha, AI career counselor India, career guidance platform India, free career assessment, career counseling online" />
 <meta property="og:title" content="About Uddisha — AI-Powered Career Guidance for India" />
 <meta property="og:description" content="Uddisha helps 50,000+ Indian students find their ideal career with free AI assessments. 1800+ career options. Meet our team." />
 <meta property="og:type" content="website" />
 <meta property="og:url" content="https://www.uddisha.com/about" />
 <meta property="og:image" content="https://www.uddisha.com/favicons/android-chrome-512x512.png" />
 <meta property="og:site_name" content="Uddisha" />
 <meta name="twitter:card" content="summary_large_image" />
 <meta name="twitter:title" content="About Uddisha — Free AI Career Guidance India" />
 <meta name="twitter:description" content="India's leading free AI career platform. 50,000+ users, 1800+ careers. Meet our team." />
 <link rel="canonical" href="https://www.uddisha.com/about" />
 <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
 {/* Organization E-E-A-T Schema */}
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
"@context":"https://schema.org",
"@type":"Organization",
"name":"Uddisha",
"alternateName":"Uddisha",
"url":"https://www.uddisha.com",
"logo": {
"@type":"ImageObject",
"url":"https://www.uddisha.com/favicons/android-chrome-512x512.png",
"width": 512,
"height": 512
 },
"description":"Uddisha is India's leading free AI-powered career guidance platform, helping students discover their ideal career paths through intelligent assessments, 1800+ career database, and expert blog content.",
"foundingDate":"2025",
"foundingLocation": {
"@type":"Place",
"addressLocality":"New Delhi",
"addressCountry":"IN"
 },
"areaServed":"IN",
"numberOfEmployees": {
"@type":"QuantitativeValue",
"value": 10
 },
"knowsAbout": [
"Career Guidance","AI Career Assessment","Career Counseling",
"JEE Counseling","NEET Counseling","Stream Selection","Career Discovery"
 ],
  "contactPoint": {
    "@type":"ContactPoint",
    "email":"contact@uddisha.com",
    "contactType":"customer support",
    "areaServed":"IN",
    "availableLanguage":"English"
  },
"address": {
"@type":"PostalAddress",
"addressLocality":"New Delhi",
"addressCountry":"IN"
 },
"sameAs": [
"https://twitter.com/Uddisha",
"https://linkedin.com/company/Uddisha"
 ]
 }) }} />
 {/* FAQPage Schema for E-E-A-T */}
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
"@context":"https://schema.org",
"@type":"FAQPage",
"mainEntity": [
 {
"@type":"Question",
"name":"Is Uddisha free?",
"acceptedAnswer": {"@type":"Answer","text":"Yes, Uddisha is 100% free. There is no premium tier or paywall. All features including the AI career assessment, 1800+ career database, and expert blog are completely free." }
 },
 {
"@type":"Question",
"name":"How does Uddisha work?",
"acceptedAnswer": {"@type":"Answer","text":"Uddisha uses an AI-powered adaptive assessment that analyzes 50+ personality traits, skills, and values to match you with careers from a database of 1800+ options using weight-based scoring algorithms." }
 },
 {
"@type":"Question",
"name":"How many career options does Uddisha have?",
"acceptedAnswer": {"@type":"Answer","text":"Uddisha has a database of 1800+ career options covering all industries including technology, healthcare, arts, law, finance, government, and emerging fields." }
 }
 ]
 }) }} />
 {/* BreadcrumbList */}
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
"@context":"https://schema.org",
"@type":"BreadcrumbList",
"itemListElement": [
 {"@type":"ListItem","position": 1,"name":"Home","item":"https://www.uddisha.com/" },
 {"@type":"ListItem","position": 2,"name":"About","item":"https://www.uddisha.com/about" }
 ]
 }) }} />
 </Helmet>
 <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
 {/* Header with Back Button */}
 <div className="flex items-center mb-6 sm:mb-8">
 {/* Back to Home button */}
 <Link
 to="/"
 className="flex items-center space-x-2 text-[var(--ud-muted)] hover:text-[var(--ud-ink)] transition-colors"
 >
 <ArrowLeft className="h-5 w-5" />
 <span className="text-sm sm:text-base">Back to Home</span>
 </Link>
 </div>

 {/* Hero Section */}
 <ScrollReveal animation="blur-in">
 <div className="text-center mb-12 sm:mb-20">
 <div className="inline-flex items-center space-x-2 bg-[var(--ud-gold-pale)] text-[var(--ud-ink)] px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6">
 <Users className="h-4 w-4" />
 <span className="text-sm font-medium">About Uddisha</span>
 </div>
 <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--ud-ink)] mb-4 sm:mb-6">
 Empowering Careers Through
 <span className="block bg-[var(--ud-gold)] bg-clip-text text-transparent">
 AI Innovation
 </span>
 </h1>
 <p className="text-lg sm:text-xl text-[var(--ud-muted)] max-w-4xl mx-auto leading-relaxed">
 Uddisha was born from a simple belief: everyone deserves to find work that truly fulfills them.
 We're on a mission to democratize career guidance through cutting-edge AI technology, making personalized
 career discovery accessible to everyone, everywhere.
 </p>
 </div>
 </ScrollReveal>

 {/* Our Story Section */}
 <div className="bg-[var(--ud-paper)] rounded-2xl sm:rounded-3xl p-6 sm:p-12 shadow-xl border border-[var(--ud-border)] mb-12 sm:mb-20">
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
 <ScrollReveal animation="fade-left">
 <div>
 <h2 className="text-2xl sm:text-3xl font-bold text-[var(--ud-ink)] mb-4 sm:mb-6">Our Story</h2>
 <div className="space-y-4 sm:space-y-6 text-[var(--ud-muted)] leading-relaxed">
 <p className="text-base sm:text-lg">
 Founded in 2024, Uddisha emerged from the recognition that traditional career guidance
 was often inaccessible, expensive, or one-size-fits-all. Our founders, coming from backgrounds
 in AI research, psychology, and career counseling, saw an opportunity to revolutionize how people
 discover their ideal career paths.
 </p>
 <p className="text-base sm:text-lg">
 We started with a simple question: "What if AI could understand not just what jobs exist,
 but what makes each person unique?" This led us to develop our proprietary career matching
 algorithm that considers personality, skills, values, and aspirations to provide truly
 personalized recommendations.
 </p>
 <p className="text-base sm:text-lg">
 Today, we're proud to have helped over 50,000 people find clarity in their career journey,
 and we're just getting started. Our vision is a world where everyone can find work that
 not only pays the bills but ignites their passion and utilizes their unique talents.
 </p>
 </div>
 </div>
 </ScrollReveal>
 <ScrollReveal animation="fade-right" delay={200}>
 <div className="relative">
 <div className="bg-[var(--ud-gold-pale)] rounded-2xl p-8 sm:p-10 flex flex-col items-center justify-center min-h-[320px]">
 <div className="w-28 h-28 rounded-full bg-[var(--ud-gold)] flex items-center justify-center mb-6 shadow-lg">
 <Star className="w-14 h-14 text-white" />
 </div>
 <h3 className="text-2xl font-bold text-[var(--ud-ink)] mb-2" style={{ fontFamily: 'var(--ud-serif)' }}>Since 2024</h3>
 <p className="text-[var(--ud-muted)] text-center text-sm">Building India's most trusted career guidance platform</p>
 <div className="grid grid-cols-2 gap-4 mt-6 w-full">
 <div className="text-center bg-white rounded-xl p-3 shadow-sm border border-[var(--ud-border)]">
 <div className="text-lg font-bold text-[var(--ud-gold)]" style={{ fontFamily: 'var(--ud-serif)' }}>50K+</div>
 <div className="text-xs text-[var(--ud-muted)]">Users Guided</div>
 </div>
 <div className="text-center bg-white rounded-xl p-3 shadow-sm border border-[var(--ud-border)]">
 <div className="text-lg font-bold text-[var(--ud-gold)]" style={{ fontFamily: 'var(--ud-serif)' }}>1800+</div>
 <div className="text-xs text-[var(--ud-muted)]">Career Paths</div>
 </div>
 </div>
 </div>
 </div>
 </ScrollReveal>
 </div>
 </div>

 {/* Expert Credentials (E-E-A-T) Section */}
 <div className="mb-12 sm:mb-20">
 <div className="text-center mb-8 sm:mb-12">
 <h2 className="text-2xl sm:text-3xl font-bold text-[var(--ud-ink)] mb-4">Our Advisory Board & Experts</h2>
 <p className="text-[var(--ud-muted)] max-w-2xl mx-auto">
 Our career assessments and guides are backed by decades of combined experience from industry leaders, certified career counselors, and psychologists.
 </p>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
 <div className="bg-[var(--ud-paper)] p-6 rounded-2xl shadow-md border border-[var(--ud-border)]">
 <div className="w-16 h-16 bg-[var(--ud-gold-pale)] rounded-full flex items-center justify-center mb-4 text-2xl font-bold text-[var(--ud-gold)]">SR</div>
 <h3 className="text-xl font-bold text-[var(--ud-ink)] mb-1">Dr. S. Raghavan</h3>
 <p className="text-sm font-medium text-[var(--ud-gold)] mb-3">Lead Psychologist (Ph.D.)</p>
 <p className="text-[var(--ud-muted)] text-sm">Former head of occupational psychology at NIMHANS. Architect of the Uddisha 5-factor career compatibility model.</p>
 </div>
 <div className="bg-[var(--ud-paper)] p-6 rounded-2xl shadow-md border border-[var(--ud-border)]">
 <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 text-2xl font-bold text-[var(--ud-ink)]">AM</div>
 <h3 className="text-xl font-bold text-[var(--ud-ink)] mb-1">Dr. Amit Malhotra</h3>
 <p className="text-sm font-medium text-[var(--ud-ink)] mb-3">EdTech Council Member</p>
 <p className="text-[var(--ud-muted)] text-sm">20+ years in higher education administration. Ensures all academic pathways and college recommendations meet stringent quality standards.</p>
 </div>
 <div className="bg-[var(--ud-paper)] p-6 rounded-2xl shadow-md border border-[var(--ud-border)]">
 <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4 text-2xl font-bold text-teal-600">PD</div>
 <h3 className="text-xl font-bold text-[var(--ud-ink)] mb-1">Priya Desai, CCC</h3>
 <p className="text-sm font-medium text-teal-600 mb-3">Certified Career Counselor</p>
 <p className="text-[var(--ud-muted)] text-sm">Recognized by the NCS (National Career Service). Personally overseen over 5,000 student transitions into successful tech and arts careers.</p>
 </div>
 </div>
 </div>
 {/* Our Values Section */}
 <div className="mb-12 sm:mb-20">
 <div className="text-center mb-8 sm:mb-12">
 <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--ud-ink)] mb-3 sm:mb-4">
 Our Core Values
 </h2>
 <p className="text-lg sm:text-xl text-[var(--ud-muted)] max-w-3xl mx-auto">
 These principles guide everything we do and shape how we build products that truly serve our users.
 </p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
 {values.map((value, index) => (
 <ScrollReveal key={index} animation="flip-up" delay={index * 120}>
 <div
 key={index}
 className="bg-[var(--ud-paper)] rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-[var(--ud-border)]"
 >
 <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-[var(--ud-gold-pale)] rounded-xl mb-4 sm:mb-6">
 <value.icon className="h-6 w-6 sm:h-8 sm:w-8 text-[var(--ud-gold)]" />
 </div>
 <h3 className="text-lg sm:text-xl font-semibold text-[var(--ud-ink)] mb-3 sm:mb-4">{value.title}</h3>
 <p className="text-[var(--ud-muted)] leading-relaxed text-sm sm:text-base">{value.description}</p>
 </div>
 </ScrollReveal>
 ))}
 </div>
 </div>

 {/* Achievements Section */}
 <ScrollReveal animation="zoom-in">
 <div className="bg-[var(--ud-gold)] rounded-2xl sm:rounded-3xl p-6 sm:p-12 text-white mb-12 sm:mb-20">
 <div className="text-center mb-8 sm:mb-12">
 <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
 Our Impact in Numbers
 </h2>
 <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto">
 We're proud of the positive impact we've made in people's lives and careers.
 </p>
 </div>

 <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
 {achievements.map((achievement, index) => (
 <div key={index} className="text-center">
 <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3 text-yellow-300">
 {achievement.number}
 </div>
 <div className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{achievement.label}</div>
 <div className="text-sm sm:text-base text-blue-100">{achievement.description}</div>
 </div>
 ))}
 </div>
 </div>
 </ScrollReveal>

 {/* Team Section */}
 <div className="mb-12 sm:mb-20">
 <div className="text-center mb-8 sm:mb-12">
 <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--ud-ink)] mb-3 sm:mb-4">
 Meet Our Team
 </h2>
 <p className="text-lg sm:text-xl text-[var(--ud-muted)] max-w-3xl mx-auto">
 The passionate individuals behind Uddisha, dedicated to revolutionizing career discovery.
 </p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
 {teamMembers.map((member, index) => (
 <ScrollReveal key={index} animation="fade-up" delay={index * 100}>
 <div
 className="bg-[var(--ud-paper)] rounded-xl sm:rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-[var(--ud-border)]"
 >
 <div className="mb-4 sm:mb-6 flex justify-center">
 <div className="w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold shadow-md" style={{ background: 'linear-gradient(135deg, var(--ud-gold), var(--ud-gold-light))', color: 'white', fontFamily: 'var(--ud-serif)' }}>
 {member.initials}
 </div>
 </div>
 <h3 className="text-lg sm:text-xl font-semibold text-[var(--ud-ink)] mb-1 sm:mb-2 text-center">{member.name}</h3>
 <p className="text-[var(--ud-gold)] font-medium mb-3 sm:mb-4 text-sm sm:text-base text-center">{member.role}</p>
 <p className="text-[var(--ud-muted)] leading-relaxed text-sm text-center">{member.description}</p>
 </div>
 </ScrollReveal>
 ))}
 </div>
 </div>

 {/* Mission Section */}
 <div className="bg-[var(--ud-paper)] rounded-2xl sm:rounded-3xl p-6 sm:p-12 shadow-xl border border-[var(--ud-border)] mb-12 sm:mb-20">
 <div className="text-center mb-8 sm:mb-12">
 <Target className="h-12 w-12 sm:h-16 sm:w-16 text-[var(--ud-gold)] mx-auto mb-4 sm:mb-6" />
 <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--ud-ink)] mb-3 sm:mb-4">
 Our Mission
 </h2>
 </div>

 <div className="max-w-4xl mx-auto">
 <div className="text-center mb-8 sm:mb-12">
 <p className="text-xl sm:text-2xl text-[var(--ud-ink)] leading-relaxed font-medium">
"To democratize career guidance by making personalized, AI-powered career discovery
 accessible to everyone, helping individuals find work that aligns with their unique
 talents, values, and aspirations."
 </p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
 <div className="text-center">
 <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-[var(--ud-ink)] mx-auto mb-3 sm:mb-4" />
 <h3 className="font-semibold text-[var(--ud-ink)] mb-2 text-base sm:text-lg">Accessible</h3>
 <p className="text-[var(--ud-muted)] text-sm sm:text-base">Free for everyone, everywhere</p>
 </div>
 <div className="text-center">
 <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-[var(--ud-ink)] mx-auto mb-3 sm:mb-4" />
 <h3 className="font-semibold text-[var(--ud-ink)] mb-2 text-base sm:text-lg">Accurate</h3>
 <p className="text-[var(--ud-muted)] text-sm sm:text-base">AI-powered precision matching</p>
 </div>
 <div className="text-center">
 <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-[var(--ud-ink)] mx-auto mb-3 sm:mb-4" />
 <h3 className="font-semibold text-[var(--ud-ink)] mb-2 text-base sm:text-lg">Actionable</h3>
 <p className="text-[var(--ud-muted)] text-sm sm:text-base">Clear next steps and guidance</p>
 </div>
 </div>
 </div>
 </div>

 {/* Contact Section */}
 <div className="ud-main rounded-2xl sm:rounded-3xl p-6 sm:p-12 border border-[var(--ud-border)]">
 <div className="text-center mb-8 sm:mb-12">
 <h2 className="text-2xl sm:text-3xl font-bold text-[var(--ud-ink)] mb-3 sm:mb-4">
 Get in Touch
 </h2>
 <p className="text-lg sm:text-xl text-[var(--ud-muted)] max-w-3xl mx-auto">
 Have questions about Uddisha? We'd love to hear from you and help you on your career journey.
 </p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
  <div className="text-center">
    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-[var(--ud-gold-pale)] rounded-xl mb-3 sm:mb-4">
      <Mail className="h-6 w-6 sm:h-8 sm:w-8 text-[var(--ud-gold)]" />
    </div>
    <h3 className="font-semibold text-[var(--ud-ink)] mb-2 text-base sm:text-lg">Email Us</h3>
    <p className="text-[var(--ud-muted)] text-sm sm:text-base">contact@uddisha.com</p>
    <div className="mt-2 inline-block px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded uppercase tracking-wider">
      Responds in &lt; 24h
    </div>
  </div>
  <div className="text-center">
    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-[var(--ud-gold-pale)] rounded-xl mb-3 sm:mb-4">
      <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-[var(--ud-gold)]" />
    </div>
    <h3 className="font-semibold text-[var(--ud-ink)] mb-2 text-base sm:text-lg">Support Hours</h3>
    <p className="text-[var(--ud-muted)] text-sm sm:text-base">Mon - Sat, 10am - 6pm</p>
  </div>
  <div className="text-center">
    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-[var(--ud-gold-pale)] rounded-xl mb-3 sm:mb-4">
      <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-[var(--ud-ink)]" />
    </div>
    <h3 className="font-semibold text-[var(--ud-ink)] mb-2 text-base sm:text-lg">Visit Us</h3>
    <p className="text-[var(--ud-muted)] text-sm sm:text-base">New Delhi, India</p>
  </div>
 </div>

 <div className="text-center">
 <Link
 to="/assessment"
 className="inline-flex items-center space-x-2 bg-[var(--ud-gold)] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:shadow-lg transition-all duration-300 font-medium transform hover:-translate-y-1 text-sm sm:text-base"
 >
 <Zap className="h-4 w-4 sm:h-5 sm:w-5" />
 <span>Start Your Career Journey</span>
 </Link>
 </div>
 </div>
 </div>
 </div>
 );
};

export default AboutPage;

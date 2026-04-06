// src/pages/BlogPage.tsx

import React, { useMemo, useEffect } from'react';
import { Helmet } from'react-helmet-async';
import BlogCard from'../components/BlogCard';

const BlogPage = () => {
 // Force scroll to top when component mounts
 useEffect(() => {
 // Multiple scroll methods for maximum compatibility
 window.scrollTo(0, 0);
 document.documentElement.scrollTop = 0;
 document.body.scrollTop = 0;

 // Additional fallback
 setTimeout(() => {
 window.scrollTo(0, 0);
 document.documentElement.scrollTop = 0;
 document.body.scrollTop = 0;
 }, 100);
 }, []);

 // Memoize blog posts to prevent unnecessary re-renders
 const blogPosts = useMemo(() => [
 {
 id:'nursing-career-india-2026',
 title:'Nursing Career in India 2026: Complete Guide to BSc Nursing, Specializations & Salaries',
 summary:"Complete guide to nursing careers in India 2026. BSc Nursing, GNM, ICU specialist, midwifery, nurse practitioner, hospital admin. Salaries ₹3-20 LPA + international opportunities.",
 date:'March 2026'
 },
 {
 id:'nutrition-dietitian-career-2026',
 title:'Nutrition & Dietitian Career in India 2026: Scope, Salaries & Certifications',
 summary:"Complete guide to Nutrition & Dietetics careers. Clinical dietitian, sports nutritionist, food tech, public health nutrition. Salaries ₹3-18 LPA, freelancing guide included.",
 date:'March 2026'
 },
 {
 id:'environmental-science-career-2026',
 title:'Environmental Science Career in India 2026: Jobs, ESG, EIA & Green Careers',
 summary:"Complete guide to Environmental Science careers. EIA consulting, ESG analyst, pollution control, GIS, climate science. Salaries ₹4-25 LPA, top employers.",
 date:'March 2026'
 },
 {
 id:'graphic-design-career-2026',
 title:'Graphic Design Career in India 2026: Salaries, Tools, Courses & Freelancing',
 summary:"Everything about graphic design careers. Brand identity, motion graphics, packaging, illustration, freelancing. Adobe tools, salaries ₹3-30 LPA + freelance income guide.",
 date:'March 2026'
 },
 {
 id:'social-work-career-india-2026',
 title:'Social Work Career in India 2026: MSW Jobs, Salaries & NGO Opportunities',
 summary:"Complete guide to social work careers. MSW, CSR, TISS, NGOs, international development, government welfare jobs. Salaries ₹3-30 LPA, impact-driven work.",
 date:'March 2026'
 },
 {
 id:'civil-engineering-career-2026',
 title:'Civil Engineering Career in India 2026: Jobs, Salaries, Government & Private Sector',
 summary:"Complete guide to civil engineering careers. IES, SSC JE, UPSC ESE, PSUs, private infrastructure, real estate. Salaries ₹4-45 LPA, GATE guidance.",
 date:'March 2026'
 },
 {
 id:'gap-year-guide-india-2026',
 title:'Gap Year Guide India 2026: How to Use a Gap Year Productively After 12th or College',
 summary:"How to make your gap year count. Exam re-attempts, skill building, startups, volunteering, international programs. Sample plans and common mistakes to avoid.",
 date:'March 2026'
 },
 {
 id:'defence-career-india-2026',
 title:'Defence Career Guide India 2026: Army, Navy, Air Force — NDA, CDS & Beyond',
 summary:"Complete guide to Defence career. Indian Army, Navy, Air Force, NDA, CDS exam, SSB interview. Salaries ₹6-20+ LPA with allowances.",
 date:'March 2026'
 },
 {
 id:'ca-career-india-2026',
 title:'Chartered Accountancy (CA) Career Guide India 2026: Exam, Salary & Scope',
 summary:"Complete guide to CA career. CA Foundation, Intermediate, Final exam, articleship, Big 4 firms. Salaries ₹7-50+ LPA.",
 date:'March 2026'
 },
 {
 id:'robotics-iot-career-2026',
 title:'Robotics & IoT Career Guide India 2026: Skills, Salary & Jobs',
 summary:"Complete guide to Robotics & IoT career. Industrial automation, embedded systems, ROS, Arduino. Salaries ₹5-40+ LPA.",
 date:'March 2026'
 },
 {
 id:'gaming-esports-career-2026',
 title:'Gaming & Esports Career Guide India 2026: Jobs, Salary & How to Start',
 summary:"Complete guide to Gaming & Esports career. Game development, esports, streaming, Unity, Unreal Engine. Salaries ₹3-50+ LPA.",
 date:'March 2026'
 },
 {
 id:'hr-management-career-2026',
 title:'HR Management Career Guide India 2026: Jobs, MBA HR, Salary & Scope',
 summary:"Complete guide to HR Management career. Talent acquisition, HRBP, people analytics, HR tech. Salaries ₹4-50+ LPA.",
 date:'March 2026'
 },
 {
 id:'architecture-interior-design-career-2026',
 title:'Architecture & Interior Design Career Guide India 2026: Jobs, Salary & Scope',
 summary:"Complete guide to Architecture & Interior Design career. B.Arch, NATA, interior design, landscape architecture. Salaries ₹4-40+ LPA.",
 date:'February 2026'
 },
 {
 id:'agriculture-agritech-career-2026',
 title:'Agriculture & Agritech Career Guide India 2026: Jobs, Salary & Scope',
 summary:"Complete guide to Agriculture & Agritech career. Agricultural science, agritech startups, precision farming. Salaries ₹3-35+ LPA.",
 date:'February 2026'
 },
 {
 id:'aviation-aerospace-career-2026',
 title:'Aviation & Aerospace Career Guide India 2026: Pilot, Engineer, Jobs & Salary',
 summary:"Complete guide to Aviation & Aerospace career. Pilot training, aerospace engineering, ISRO, DGCA. Salaries ₹5-50+ LPA.",
 date:'February 2026'
 },
 {
 id:'upsc-civil-services-career-2026',
 title:'UPSC Civil Services Career Guide 2026: IAS, IPS, IFS Preparation & Salary',
 summary:"Complete guide to UPSC Civil Services. IAS/IPS/IFS preparation strategy, exam pattern, salary ₹6-30+ LPA with perks.",
 date:'February 2026'
 },
 {
 id:'merchant-navy-career-2026',
 title:'Merchant Navy Career Guide India 2026: Jobs, Salary & How to Join',
 summary:"Complete guide to Merchant Navy career. Marine engineering, nautical science, IMU CET, tax-free salaries ₹5-50+ LPA.",
 date:'February 2026'
 },
 {
 id:'event-management-career-2026',
 title:'Event Management Career Guide India 2026: Jobs, Salary & Scope',
 summary:"Complete guide to Event Management career. Wedding planning, corporate events, MICE. Salaries ₹3-40+ LPA.",
 date:'February 2026'
 },
 {
 id:'pharmacy-career-2026',
 title:'Pharmacy Career Guide India 2026: D.Pharm, B.Pharm, Salary & Jobs',
 summary:"Complete guide to Pharmacy career. D.Pharm, B.Pharm, clinical pharmacy. Salaries ₹3-35+ LPA.",
 date:'February 2026'
 },
 {
 id:'animation-vfx-career-2026',
 title:'Animation & VFX Career Guide India 2026: Jobs, Salary & Scope',
 summary:"Complete guide to Animation & VFX career. 3D animation, game design, Bollywood VFX. Salaries ₹3-40+ LPA.",
 date:'February 2026'
 },
 {
 id:'real-estate-career-2026',
 title:'Real Estate Career Guide India 2026: Jobs, Salary & Growth',
 summary:"Complete guide to Real Estate career. Property consulting, RERA, PropTech. Salaries ₹4-50+ LPA.",
 date:'February 2026'
 },
 {
 id:'fashion-design-career-2026',
 title:'Fashion Design Career Guide India 2026: Jobs, Salary & Scope',
 summary:"Complete guide to Fashion Design career. NIFT, textile design, styling. Salaries ₹3-40+ LPA.",
 date:'February 2026'
 },
 {
 id:'biotech-career-2026',
 title:'Biotech & Life Sciences Career Guide India 2026: Jobs, Salary & Scope',
 summary:"Complete guide to Biotech & Life Sciences career. Pharma, clinical research, bioinformatics. Salaries ₹4-40+ LPA.",
 date:'February 2026'
 },
 {
 id:'hospitality-tourism-career-2026',
 title:'Hospitality & Tourism Career Guide India 2026: Jobs, Salary & Scope',
 summary:"Complete guide to Hospitality & Tourism career. Hotel management, travel industry, airline jobs. Salaries ₹3-30+ LPA.",
 date:'February 2026'
 },
 {
 id:'supply-chain-career-2026',
 title:'Supply Chain & Logistics Career Guide India 2026: Jobs, Salary & Scope',
 summary:"Complete guide to Supply Chain & Logistics career. SCM, warehouse management, procurement. Salaries ₹4-50+ LPA.",
 date:'February 2026'
 },
 {
 id:'media-journalism-career-2026',
 title:'Media & Journalism Career Guide India 2026: Jobs, Salary & Scope',
 summary:"Complete guide to Media & Journalism career. News, broadcast, digital media. Salaries ₹3-40+ LPA.",
 date:'February 2026'
 },
 {
 id:'sports-management-career-2026',
 title:'Sports Management Career Guide India 2026: Jobs, Salary & Scope',
 summary:"Complete guide to Sports Management career. IPL, sports marketing, analytics. Salaries ₹4-50+ LPA.",
 date:'February 2026'
 },
 {
 id:'blockchain-web3-career-2026',
 title:'Blockchain & Web3 Career Guide India 2026: Skills, Salary & Jobs',
 summary:"Complete guide to Blockchain & Web3 career. Learn Solidity, smart contracts, salaries (₹6-50 LPA), and how to become a blockchain developer.",
 date:'February 2026'
 },
 {
 id:'product-management-career',
 title:'Product Manager Career Guide India 2026: Skills, Salary & Roadmap',
 summary:"Complete guide to Product Management career. APM programs, PM skills, interview prep, salaries (₹8-60 LPA), and transition paths.",
 date:'February 2026'
 },
 {
 id:'finance-career-paths-2026',
 title:'Finance & Fintech Career Guide India 2026: Jobs, Salary & Paths',
 summary:"Complete guide to Finance & Fintech careers. Investment banking, wealth management, fintech jobs. Salaries ₹5-50+ LPA. CFA, CA alternatives.",
 date:'February 2026'
 },
 {
 id:'teaching-edtech-career-2026',
 title:'Teaching & EdTech Career Guide India 2026: Jobs, Salary & Opportunities',
 summary:"Complete guide to Teaching & EdTech careers. School teaching, online tutoring, EdTech jobs. Government vs private salary comparison.",
 date:'February 2026'
 },
 {
 id:'law-career-india-2026',
 title:'Law Career Guide India 2026: CLAT, Corporate Law, Salary & Paths',
 summary:"Complete guide to Law career in India. CLAT preparation, corporate law, litigation, legal tech. NLU admission, salary ranges ₹5-50+ LPA.",
 date:'February 2026'
 },
 {
 id:'ai-career-path-2026',
 title:'AI & Machine Learning Career Path India 2026: Complete Guide',
 summary:"Complete guide to AI/ML career in India. Learn skills, certifications, salaries (₹6-50 LPA), and how to become an AI engineer or prompt engineer.",
 date:'February 2026'
 },
 {
 id:'cloud-computing-career-2026',
 title:'Cloud Computing & DevOps Career Guide 2026: AWS, Azure, GCP',
 summary:"Complete guide to Cloud & DevOps career in India. Learn AWS, Azure, GCP certifications, Kubernetes, salaries (₹6-50 LPA), and career roadmap.",
 date:'February 2026'
 },
 {
 id:'ux-ui-design-career-2026',
 title:'UX/UI Design Career Scope India 2026: Skills, Salary & Portfolio',
 summary:"Complete guide to UX/UI Design career. Learn Figma, product design, portfolio tips, salaries (₹4-40 LPA), and how to become a product designer.",
 date:'February 2026'
 },
 {
 id:'green-energy-careers-2026',
 title:'Renewable Energy & Green Jobs India 2026: Careers & Salary',
 summary:"Complete guide to green energy careers. Explore solar, wind, EV, sustainability jobs with salaries (₹4-50 LPA) and emerging opportunities.",
 date:'February 2026'
 },
 {
 id:'interview-tips-freshers-2026',
 title:'Job Interview Tips for Freshers India 2026: Complete Guide',
 summary:"Crack your first job interview! Learn HR questions, technical preparation, body language tips, and how to ace campus placements.",
 date:'February 2026'
 },
 {
 id:'cybersecurity-career-2026',
 title:'Cybersecurity Career Guide 2026: Skills, Salary & Roadmap',
 summary:"Complete guide to Cybersecurity career in India. Learn ethical hacking, certifications (CEH, OSCP), salaries (₹5-40 LPA), and career roadmap.",
 date:'January 2026'
 },
 {
 id:'freelance-career-guide',
 title:'Freelancing Career 2026: Complete Guide for Indians',
 summary:"Start your freelancing journey. Learn about Upwork, Fiverr, top skills, pricing strategies, taxes, and how to earn ₹50K-₹5L/month.",
 date:'January 2026'
 },
 {
 id:'psychology-career-paths',
 title:'Psychology Career Paths 2026: Beyond Clinical Practice',
 summary:"Explore diverse psychology careers - Clinical, Counseling, UX Research, Organizational Psychology, Sports Psychology. Salaries ₹4-30 LPA.",
 date:'January 2026'
 },
 {
 id:'content-creator-career',
 title:'Content Creator Career 2026: YouTube, Instagram & Monetization',
 summary:"Build a successful content creator career. Learn platforms, monetization strategies, brand deals, and realistic income expectations.",
 date:'January 2026'
 },
 {
 id:'remote-work-guide-2026',
 title:'Remote Work Jobs 2026: Complete Guide for Indian Professionals',
 summary:"Find remote jobs in India. Companies hiring remotely, salary comparison, tools, and tips for successful work from home career.",
 date:'January 2026'
 },
 {
 id:'data-science-career-2026',
 title:'Data Science Career Path India 2026: Complete Guide',
 summary:"Complete guide to Data Science career in India. Learn skills, salaries (₹6-50 LPA), certifications, roadmap, and how to become a data scientist from scratch.",
 date:'January 2026'
 },
 {
 id:'top-skills-2026',
 title:'Top 15 Skills in Demand India 2026: Future-Proof Your Career',
 summary:"Master the 15 most in-demand skills for 2026. AI, Data Science, Cloud Computing, Cybersecurity, and essential soft skills with salary potential.",
 date:'January 2026'
 },
 {
 id:'study-abroad-guide-2026',
 title:'Study Abroad Guide 2026: Best Countries for Indian Students',
 summary:"Complete study abroad guide for Indian students. Compare USA, UK, Canada, Germany, Australia. Scholarships, costs, visa, and PR pathways explained.",
 date:'January 2026'
 },
 {
 id:'digital-marketing-career',
 title:'Digital Marketing Career Guide 2026: Salary, Skills, Jobs',
 summary:"Start your digital marketing career. Learn SEO, Google Ads, Social Media. Salaries ₹3-30 LPA. Free courses and certifications in India.",
 date:'January 2026'
 },
 {
 id:'arts-career-paths',
 title:'Arts Career Options After 12th: 30+ High-Paying Paths',
 summary:"Break the myth! Arts/Humanities has amazing career options. Law, Psychology, Design, Media, Civil Services, and 30+ high-paying paths in 2026.",
 date:'January 2026'
 },
 {
 id:'mba-vs-ms',
 title:'MBA vs MS Abroad 2026: Which is Better? Complete Comparison',
 summary:"MBA or MS abroad? Compare cost, ROI, career outcomes, work experience requirements. Make the right choice with this comprehensive guide.",
 date:'January 2026'
 },
 {
 id:'career-after-btech',
 title:'Career Options After BTech: Complete Guide for 2026',
 summary:"Confused about what to do after BTech? Explore all career options including top jobs, GATE, MBA, MS abroad, startups, and government jobs. Complete guide for engineering graduates.",
 date:'January 2026'
 },
 {
 id:'career-options-after-10th',
 title:'Career Options After 10th: A Complete Guide for 2026',
 summary:"Confused about what to do after 10th? Explore all career options including Science, Commerce, Arts, Diploma courses, and vocational streams. Complete guide for students and parents.",
 date:'January 2026'
 },
 {
 id:'government-jobs-guide',
 title:'Government Jobs Guide 2026: Complete Preparation Roadmap',
 summary:"Complete guide to government jobs in India 2026. Learn about top exams (UPSC, SSC, Banking), eligibility, salaries, preparation strategy, and how to crack sarkari naukri.",
 date:'January 2026'
 },
 {
 id:'jee-counseling-2026',
 title:'JEE Counseling 2026: Complete Guide to JoSAA & CSAB',
 summary:"Complete guide to JEE Main & Advanced 2026 counseling. Learn about JoSAA, CSAB, state counseling, choice filling, seat allotment, and IIT/NIT admission process.",
 date:'January 2026'
 },
 {
 id:'neet-counseling-2026',
 title:'NEET Counseling 2026: Complete Guide to MBBS/BDS Admission',
 summary:"Complete guide to NEET 2026 counseling for MBBS, BDS, AYUSH admissions. Learn about MCC counseling, state counseling, AIQ quota, choice filling, and seat allotment process.",
 date:'January 2026'
 },
 {
 id:'personal-branding-career-success-2026',
 title:'💼 How to Build a Personal Brand for Career Success in 2026',
 summary:"Learn 7 actionable steps to build a powerful personal brand. Optimize your LinkedIn, create a portfolio, and stand out in the 2026 job market.",
 date:'January 2026'
 },
 {
 id:'beginner-ai-projects',
 title:'The $0 AI Portfolio: 3 Beginner Projects You Can Build Today (No Coding Required)',
 summary:"Build real AI projects for free without coding. Create a resume analyzer, recommendation engine, or chatbot to boost your portfolio.",
 date:'December 2025'
 },
 {
 id:'never-take-career-advice-from-parents',
 title:'🤔 Why You Should Never Take Career Advice from Your Parents and Elders',
 summary:"Your parents' career advice is often outdated and based on fear. Learn why you should trust your own judgment and how to navigate career choices in the modern world.",
 date:'October 2025'
 },
 {
 id:'future-of-work-2035',
 title:'🔮 The Future of Work in 2035: Skills, Careers, and Industries to Prepare For',
 summary:'Discover the top skills, emerging careers, and industries that will shape work in 2035. A practical guide for students and professionals to future-proof their careers.',
 date:'September 2025'
 },
 {
 id:'ai-career-guidance',
 title:'How AI Is Revolutionizing Career Guidance',
 summary:'Exploring the impact of intelligent assessments and adaptive feedback on future job discovery.',
 date:'July 2025'
 },
 {
 id:'top-careers-india',
 title:'Top 10 Emerging Careers in India for 2025',
 summary:'An updated list of roles gaining traction in tech, sustainability, health, and analytics.',
 date:'June 2025'
 },
 {
 id:'resume-tips',
 title:'7 Resume Tips That Actually Get You Interviews',
 summary:'Crafting resumes with clarity, impact, and personalization in the AI era.',
 date:'May 2025'
 },
 {
 id:'wrong-career-path',
 title:"5 Signs You're on the Wrong Career Path (and How to Fix It)",
 summary:'Learn how to identify if your current job doesn’t align with your passion—and what to do next.',
 date:'July 2025'
 },
 {
 id:'passion-isnt-enough',
 title:'Why Passion Isn’t Enough—And What Actually Leads to Career Fulfillment',
 summary:'Think passion is everything? Discover the deeper drivers behind true career satisfaction and success.',
 date:'July 2025'
 },
 {
 id:'career-mirage',
 title:'The Career Mirage: Why Students Choose the Wrong Path—and How AI Can Help Them See Clearly',
 summary:'A deep dive into societal pressure, bad guidance, and how Uddisha AI helps students reclaim clarity and confidence.',
 date:'August 2025'
 },
 {
 id:'college-vs-passion',
 title:'Career Choice Dilemma: Prestigious College (MIT/IIT) vs Passion',
 summary:'Should you follow the prestige of IIT/MIT or your true passion? Explore the dilemma students face and how to make the right career decision.',
 date:'September 2025'
 },
 {
 id:'perfect-career-myth',
 title:'The Perfect Career is a Myth: Gen Z’s Guide to Finding Your Path',
 summary:'Why chasing a"perfect career" might hold Gen Z back — and how to find your real path instead.',
 date:'August 2025'
 },
 {
 id:'healthcare-careers-2025',
 title:'Healthcare Careers in 2025: Opportunities, Salaries & Future Trends',
 summary:'An in-depth guide on the fastest growing healthcare roles, salary insights, and the impact of technology in shaping the future of healthcare careers.',
 date:'August 2025'
 },
 {
 id:'right-career-path-after-12th',
 title:'How to Choose the Right Career Path After 12th',
 summary:'A complete step-by-step guide to help students make informed career choices after class 12th across science, commerce, arts, and emerging fields.',
 date:'August 2025'
 },
 {
 id:'commerce-career-paths-after-12th',
 title:'Beyond Accounts: 25+ Career Paths After Choosing Commerce in Class 12',
 summary:'Commerce isn\'t just about CA/CS—discover 25+ diverse and high-growth career paths in finance, management, law, digital, creative, and global domains.',
 date:'September 2025'
 }
 ], []);

 return (
 <div className="max-w-5xl mx-auto px-4 py-8 text-[var(--ud-ink)] min-h-screen" style={{ background:'var(--ud-paper)' }}>
 <Helmet>
 <title>Career Guidance Blog India 2026 | Uddisha — Expert Career Advice &amp; Tips</title>
 <meta
 name="description"
 content="Read expert career guidance articles on Uddisha. Career options after 10th, 12th & college, salary guides, JEE & NEET counseling, top skills 2026, and more. 60+ in-depth career blogs."
 />
 <meta
 name="keywords"
 content="career blog India, career advice India, career guidance articles, career options after 12th, career options after 10th, JEE counseling 2026, NEET counseling 2026, data science career India, career tips, Uddisha blog"
 />
 <link rel="canonical" href="https://www.uddisha.com/blog" />
 <meta property="og:title" content="Career Guidance Blog India | Uddisha" />
 <meta property="og:description" content="60+ expert career guidance articles. Career paths, salary data, exam counseling, and professional development tips for Indian students." />
 <meta property="og:url" content="https://www.uddisha.com/blog" />
 <meta property="og:type" content="website" />
 <meta property="og:image" content="https://www.uddisha.com/favicons/android-chrome-512x512.png" />
 <meta name="twitter:card" content="summary_large_image" />
 <meta name="twitter:title" content="Career Guidance Blog India | Uddisha" />
 <meta name="twitter:description" content="Expert career guidance articles for Indian students. 60+ blogs on career paths, salaries, JEE, NEET, and more." />
 <script key="schema-blogpage" type="application/ld+json" dangerouslySetInnerHTML={{ __html: `
 {
"@context":"https://schema.org",
"@type":"CollectionPage",
"name":"Uddisha Career Guidance Blog",
"description":"Expert career guidance articles covering career paths, salary data, JEE/NEET counseling, stream selection, and professional development for Indian students.",
"url":"https://www.uddisha.com/blog",
"publisher": {
"@type":"Organization",
"name":"Uddisha",
"url":"https://www.uddisha.com",
"logo": {
"@type":"ImageObject",
"url":"https://www.uddisha.com/favicons/android-chrome-512x512.png"
 }
 },
"breadcrumb": {
"@type":"BreadcrumbList",
"itemListElement": [
 {"@type":"ListItem","position": 1,"name":"Home","item":"https://www.uddisha.com/" },
 {"@type":"ListItem","position": 2,"name":"Blog","item":"https://www.uddisha.com/blog" }
 ]
 }
 }
 ` }} />
 {/* Preload the first few blog articles for faster navigation */}
 <link rel="prefetch" href="/blog/ai-career-guidance" as="document" />
 <link rel="prefetch" href="/blog/top-careers-india" as="document" />
 </Helmet>

 <h1 className="text-3xl font-bold mb-6 text-[var(--ud-ink)]">Career Guidance Blog India 2026: Expert Advice, Salary Data &amp; Career Paths</h1>
 <div className="space-y-6">
 {blogPosts.map((post) => (
 <BlogCard key={post.id} post={post} />
 ))}
 </div>
 </div>
 );
};

export default BlogPage;

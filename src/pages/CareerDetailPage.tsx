import React, { useState, useEffect } from'react';
import { useParams, useNavigate, Link } from'react-router-dom';
import { Helmet } from'react-helmet-async';
import { ArrowLeft, DollarSign, TrendingUp, Clock, MapPin, Briefcase, Users, Star, Target, Award, BookOpen, Lightbulb, CheckCircle, AlertCircle, ExternalLink, Share2, Heart } from'lucide-react';
import { allCareers, Career } from'../data/careers';

const CareerDetailPage = () => {
 const { id } = useParams<{ id: string }>();
 const navigate = useNavigate();
 const [career, setCareer] = useState<Career | null>(null);
 const [relatedCareers, setRelatedCareers] = useState<Career[]>([]);
 const [activeTab, setActiveTab] = useState<'overview' |'requirements' |'growth' |'day-in-life'>('overview');
 const [isSaved, setIsSaved] = useState(false);

 useEffect(() => {
 if (id) {
 const foundCareer = allCareers.find(c => c.id === parseInt(id));
 if (foundCareer) {
 setCareer(foundCareer);

 // Find unique related careers in the same category
 const related = allCareers.reduce((acc, c) => {
 // Add to accumulator if it's in the same category, not the current career, and not already added
 if (c.category === foundCareer.category && c.id !== foundCareer.id && !acc.find(item => item.name.toLowerCase() === c.name.toLowerCase())) {
 acc.push(c);
 }
 return acc;
 }, [] as Career[])
 .slice(0, 6);
 setRelatedCareers(related);
 } else {
 navigate('/careers');
 }
 }
 }, [id, navigate]);

 const handleShare = async () => {
 if (navigator.share && career) {
 try {
 await navigator.share({
 title: `${career.name} - Uddisha`,
 text: `Check out this career: ${career.name}`,
 url: window.location.href,
 });
 } catch (error) {
 // Fallback to copying URL
 navigator.clipboard.writeText(window.location.href);
 }
 } else {
 navigator.clipboard.writeText(window.location.href);
 }
 };

 const toggleSave = () => {
 setIsSaved(!isSaved);
 // In a real app, this would save to user's favorites
 };

 if (!career) {
 return (
 <div className="min-h-screen flex items-center justify-center ud-main">
 <div className="text-center">
 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
 <p className="text-[var(--ud-muted)]">Loading career details...</p>
 </div>
 </div>
 );
 }

 const getDayInLifeTasks = (career: Career): string[] => {
 const tasksByCategory: { [key: string]: string[] } = {
'Technology': [
'Review and respond to emails and team communications',
'Participate in daily standup meetings with development team',
'Write, test, and debug code for current projects',
'Collaborate with designers and product managers on feature requirements',
'Conduct code reviews for team members',
'Research new technologies and best practices',
'Document code and update technical specifications',
'Troubleshoot and resolve technical issues'
 ],
'Healthcare': [
'Review patient charts and medical histories',
'Conduct patient consultations and examinations',
'Collaborate with healthcare team members',
'Document patient interactions and treatment plans',
'Stay updated on medical research and best practices',
'Participate in continuing education activities',
'Ensure compliance with healthcare regulations',
'Provide patient education and support'
 ],
'Business': [
'Check emails and prioritize daily tasks',
'Attend team meetings and client calls',
'Analyze business data and market trends',
'Prepare reports and presentations',
'Collaborate with cross-functional teams',
'Develop and implement strategic initiatives',
'Network with industry professionals',
'Review and approve team deliverables'
 ],
'Education': [
'Prepare lesson plans and educational materials',
'Conduct classes and facilitate learning activities',
'Grade assignments and provide student feedback',
'Meet with students for individual support',
'Collaborate with colleagues and administrators',
'Participate in professional development',
'Communicate with parents and guardians',
'Update curriculum based on educational standards'
 ]
 };

 return tasksByCategory[career.category] || [
'Plan and organize daily work activities',
'Collaborate with team members and stakeholders',
'Complete core job responsibilities and tasks',
'Attend meetings and training sessions',
'Document work progress and outcomes',
'Stay updated with industry trends',
'Communicate with clients or customers',
'Participate in professional development'
 ];
 };

 const getCareerProgression = (career: Career): { level: string; title: string; experience: string; salary: string }[] => {
 const baseTitle = career.name.replace(/Senior |Lead |Principal |Chief /,'');

 return [
 {
 level:'Entry Level',
 title: `Junior ${baseTitle}`,
 experience:'0-2 years',
 salary:'$35,000 - $55,000'
 },
 {
 level:'Mid Level',
 title: baseTitle,
 experience:'2-5 years',
 salary:'$55,000 - $85,000'
 },
 {
 level:'Senior Level',
 title: `Senior ${baseTitle}`,
 experience:'5-8 years',
 salary:'$85,000 - $120,000'
 },
 {
 level:'Lead Level',
 title: `Lead ${baseTitle}`,
 experience:'8+ years',
 salary:'$120,000 - $180,000'
 }
 ];
 };

 const getRequiredCertifications = (career: Career): string[] => {
 const certsByCategory: { [key: string]: string[] } = {
'Technology': ['AWS Certified Solutions Architect','Google Cloud Professional','Microsoft Azure Fundamentals','CompTIA Security+','Certified Scrum Master'],
'Healthcare': ['BLS Certification','ACLS Certification','State Medical License','Board Certification','Continuing Medical Education'],
'Business': ['PMP Certification','Six Sigma Green Belt','Google Analytics Certified','HubSpot Certification','Salesforce Administrator'],
'Education': ['Teaching License','Subject Area Certification','ESL Certification','Special Education Certification','Technology Integration Certification']
 };

 return certsByCategory[career.category] || ['Industry-Specific Certification','Professional Development Courses','Continuing Education Requirements'];
 };

 return (
 <div className="min-h-screen py-6 sm:py-12 ud-main text-[var(--ud-ink)]">
 <Helmet>
 <title>{career.name} Career Guide India 2026 — Salary, Skills & Roadmap | Uddisha</title>
 <meta name="description" content={`${career.name} career guide: Salary ${career.salary}, Growth ${career.growth}, Education: ${career.education}. ${career.description.substring(0, 120)}... Explore this career on Uddisha.`} />
 <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
 <link rel="canonical" href={`https://www.uddisha.com/career/${career.id}`} />
 {/* Open Graph */}
 <meta property="og:title" content={`${career.name} — Career Guide, Salary & Roadmap | Uddisha`} />
 <meta property="og:description" content={`${career.description.substring(0, 200)}...`} />
 <meta property="og:url" content={`https://www.uddisha.com/career/${career.id}`} />
 <meta property="og:type" content="website" />
 <meta property="og:image" content="https://www.uddisha.com/favicons/android-chrome-512x512.png" />
 <meta property="og:site_name" content="Uddisha" />
 {/* Twitter Card */}
 <meta name="twitter:card" content="summary_large_image" />
 <meta name="twitter:title" content={`${career.name} Career Guide | Uddisha`} />
 <meta name="twitter:description" content={`Salary: ${career.salary} | Growth: ${career.growth} | ${career.description.substring(0, 120)}...`} />
 {/* Occupation Schema — enables Google rich snippets for salary/job info */}
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
"@context":"https://schema.org",
"@type":"Occupation",
"name": career.name,
"description": career.description,
"estimatedSalary": {
"@type":"MonetaryAmountDistribution",
"name":"base",
"currency":"INR",
"duration":"P1Y",
"description": career.salary
 },
"educationRequirements": {
"@type":"EducationalOccupationalCredential",
"credentialCategory": career.education
 },
"occupationLocation": {
"@type":"Country",
"name":"India"
 },
"responsibilities": career.skills.join(","),
"skills": career.skills.join(","),
 }) }} />
 {/* BreadcrumbList Schema */}
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
"@context":"https://schema.org",
"@type":"BreadcrumbList",
"itemListElement": [
 {"@type":"ListItem","position": 1,"name":"Home","item":"https://www.uddisha.com/" },
 {"@type":"ListItem","position": 2,"name":"Careers","item":"https://www.uddisha.com/careers" },
 {"@type":"ListItem","position": 3,"name": career.name,"item": `https://www.uddisha.com/career/${career.id}` }
 ]
 }) }} />
 </Helmet>
 <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
 {/* Header with Back Button */}
 <div className="flex items-center justify-between mb-6 sm:mb-8">
 <button
 onClick={() => navigate(-1)}
 className="flex items-center space-x-2 text-[var(--ud-muted)] hover:text-[var(--ud-ink)] transition-colors"
 >
 <ArrowLeft className="h-5 w-5" />
 <span className="text-sm sm:text-base">Back to Careers</span>
 </button>

 <div className="flex items-center space-x-3">
 <button
 onClick={toggleSave}
 title={isSaved ?"Remove from saved" :"Save career"}
 aria-label={isSaved ?"Remove from saved" :"Save career"}
 className={`p-2 rounded-lg transition-colors ${isSaved ?'bg-red-100 text-[var(--ud-ink)]' :'bg-[var(--ud-gold-pale)] text-[var(--ud-muted)] hover:bg-[var(--ud-gold-pale)]'
 }`}
 >
 <Heart className={`h-5 w-5 ${isSaved ?'fill-current' :''}`} />
 </button>
 <button
 onClick={handleShare}
 title="Share career"
 aria-label="Share career"
 className="p-2 bg-[var(--ud-gold-pale)] text-[var(--ud-muted)] hover:bg-[var(--ud-gold-pale)] rounded-lg transition-colors"
 >
 <Share2 className="h-5 w-5" />
 </button>
 </div>
 </div>

 {/* Career Header */}
 <div className="bg-[var(--ud-paper)] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-[var(--ud-border)] mb-6 sm:mb-8">
 <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
 <div className="flex-1 mb-6 lg:mb-0 lg:pr-8">
 <div className="flex flex-wrap items-center gap-2 mb-4">
 <span className="inline-block bg-[var(--ud-gold-pale)] text-[var(--ud-ink)] text-sm font-medium px-3 py-1 rounded-full">
 {career.category}
 </span>
 <span className="inline-block bg-[var(--ud-gold-pale)] text-[var(--ud-muted)] text-sm px-3 py-1 rounded-full">
 {career.subcategory}
 </span>
 {career.remote && (
 <span className="inline-block bg-[var(--ud-gold-pale)] text-[var(--ud-ink)] text-sm px-3 py-1 rounded-full">
 Remote Available
 </span>
 )}
 </div>

 <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--ud-ink)] mb-4">
 {career.name}
 </h1>

 <p className="text-lg sm:text-xl text-[var(--ud-muted)] leading-relaxed mb-6">
 {career.description}
 </p>

 {/* Quick Stats */}
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 <div className="text-center p-4 bg-[var(--ud-gold-pale)] rounded-xl">
 <DollarSign className="h-6 w-6 text-[var(--ud-ink)] mx-auto mb-2" />
 <div className="text-sm text-[var(--ud-muted)] mb-1">Salary Range</div>
 <div className="font-semibold text-[var(--ud-ink)]">{career.salary}</div>
 </div>
 <div className="text-center p-4 bg-[var(--ud-gold-pale)] rounded-xl">
 <TrendingUp className="h-6 w-6 text-[var(--ud-gold)] mx-auto mb-2" />
 <div className="text-sm text-[var(--ud-muted)] mb-1">Job Growth</div>
 <div className={`font-semibold ${career.growth.startsWith('+') ?'text-[var(--ud-ink)]' :'text-[var(--ud-ink)]'}`}>
 {career.growth}
 </div>
 </div>
 <div className="text-center p-4 bg-purple-50 rounded-xl">
 <Clock className="h-6 w-6 text-[var(--ud-gold)] mx-auto mb-2" />
 <div className="text-sm text-[var(--ud-muted)] mb-1">Education</div>
 <div className="font-semibold text-[var(--ud-ink)]">{career.education}</div>
 </div>
 <div className="text-center p-4 bg-yellow-50 rounded-xl">
 <Briefcase className="h-6 w-6 text-[var(--ud-gold)] mx-auto mb-2" />
 <div className="text-sm text-[var(--ud-muted)] mb-1">Stress Level</div>
 <div className="font-semibold text-[var(--ud-ink)]">{career.stressLevel}</div>
 </div>
 </div>
 </div>

 {/* Career Attributes Radar */}
 <div className="lg:w-80 bg-[var(--ud-gold-pale)] rounded-2xl p-6 border border-[var(--ud-gold)]">
 <h3 className="text-lg font-semibold text-[var(--ud-ink)] mb-4 text-center">Career Profile</h3>
 <div className="space-y-4">
 <div>
 <div className="flex justify-between text-sm mb-1">
 <span>Technical</span>
 <span>{career.technical}/10</span>
 </div>
 <div className="w-full bg-[var(--ud-gold-pale)] rounded-full h-2">
 <div className="bg-[var(--ud-gold)] h-2 rounded-full" style={{ width: `${career.technical * 10}%` }}></div>
 </div>
 </div>
 <div>
 <div className="flex justify-between text-sm mb-1">
 <span>Creative</span>
 <span>{career.creative}/10</span>
 </div>
 <div className="w-full bg-[var(--ud-gold-pale)] rounded-full h-2">
 <div className="bg-[var(--ud-gold)] h-2 rounded-full" style={{ width: `${career.creative * 10}%` }}></div>
 </div>
 </div>
 <div>
 <div className="flex justify-between text-sm mb-1">
 <span>Analytical</span>
 <span>{career.analytical}/10</span>
 </div>
 <div className="w-full bg-[var(--ud-gold-pale)] rounded-full h-2">
 <div className="bg-green-600 h-2 rounded-full" style={{ width: `${career.analytical * 10}%` }}></div>
 </div>
 </div>
 <div>
 <div className="flex justify-between text-sm mb-1">
 <span>Social</span>
 <span>{career.social}/10</span>
 </div>
 <div className="w-full bg-[var(--ud-gold-pale)] rounded-full h-2">
 <div className="bg-yellow-600 h-2 rounded-full" style={{ width: `${career.social * 10}%` }}></div>
 </div>
 </div>
 <div>
 <div className="flex justify-between text-sm mb-1">
 <span>Leadership</span>
 <span>{career.leadership}/10</span>
 </div>
 <div className="w-full bg-[var(--ud-gold-pale)] rounded-full h-2">
 <div className="bg-red-600 h-2 rounded-full" style={{ width: `${career.leadership * 10}%` }}></div>
 </div>
 </div>
 <div>
 <div className="flex justify-between text-sm mb-1">
 <span>Physical</span>
 <span>{career.physical}/10</span>
 </div>
 <div className="w-full bg-[var(--ud-gold-pale)] rounded-full h-2">
 <div className="bg-orange-600 h-2 rounded-full" style={{ width: `${career.physical * 10}%` }}></div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>

 {/* Tab Navigation */}
 <div className="bg-[var(--ud-paper)] rounded-xl sm:rounded-2xl shadow-lg border border-[var(--ud-border)] mb-6 sm:mb-8">
 <div className="flex flex-wrap border-b border-[var(--ud-border)]">
 {[
 { id:'overview', label:'Overview', icon: Target },
 { id:'requirements', label:'Requirements', icon: CheckCircle },
 { id:'growth', label:'Career Path', icon: TrendingUp },
 { id:'day-in-life', label:'Day in Life', icon: Clock }
 ].map((tab) => {
 const Icon = tab.icon;
 return (
 <button
 key={tab.id}
 onClick={() => setActiveTab(tab.id as any)}
 className={`flex items-center space-x-2 px-4 sm:px-6 py-3 sm:py-4 font-medium transition-colors ${activeTab === tab.id
 ?'text-[var(--ud-gold)] border-b-2 border-blue-600 bg-[var(--ud-gold-pale)]'
 :'text-[var(--ud-muted)] hover:text-[var(--ud-ink)] hover:bg-[var(--ud-paper)]'
 }`}
 >
 <Icon className="h-4 w-4" />
 <span className="text-sm sm:text-base">{tab.label}</span>
 </button>
 );
 })}
 </div>

 <div className="p-6 sm:p-8">
 {activeTab ==='overview' && (
 <div className="space-y-8">
 {/* Skills Required */}
 <div>
 <h3 className="text-xl font-semibold text-[var(--ud-ink)] mb-4 flex items-center">
 <Award className="h-5 w-5 mr-2 text-[var(--ud-gold)]" />
 Key Skills Required
 </h3>
 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
 {career.skills.map((skill, index) => (
 <div key={index} className="bg-[var(--ud-gold-pale)] text-[var(--ud-ink)] px-3 py-2 rounded-lg text-sm font-medium text-center">
 {skill}
 </div>
 ))}
 </div>
 </div>

 {/* Work Environment */}
 <div>
 <h3 className="text-xl font-semibold text-[var(--ud-ink)] mb-4 flex items-center">
 <MapPin className="h-5 w-5 mr-2 text-[var(--ud-ink)]" />
 Work Environment
 </h3>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
 {career.workEnvironment.map((env, index) => (
 <div key={index} className="bg-[var(--ud-gold-pale)] text-[var(--ud-ink)] px-3 py-2 rounded-lg text-sm font-medium text-center">
 {env}
 </div>
 ))}
 </div>
 </div>

 {/* Personality Traits */}
 <div>
 <h3 className="text-xl font-semibold text-[var(--ud-ink)] mb-4 flex items-center">
 <Users className="h-5 w-5 mr-2 text-[var(--ud-gold)]" />
 Ideal Personality Traits
 </h3>
 <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
 {career.personality.map((trait, index) => (
 <div key={index} className="bg-purple-50 text-purple-800 px-3 py-2 rounded-lg text-sm font-medium text-center">
 {trait}
 </div>
 ))}
 </div>
 </div>

 {/* Additional Info */}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div className="bg-[var(--ud-gold-pale)] rounded-xl p-6">
 <h4 className="font-semibold text-[var(--ud-ink)] mb-3">Travel Requirements</h4>
 <p className="text-[var(--ud-muted)]">
 {career.travelRequired ?'This role may require occasional travel for meetings, conferences, or client visits.' :'This role typically does not require travel.'}
 </p>
 </div>
 <div className="bg-[var(--ud-gold-pale)] rounded-xl p-6">
 <h4 className="font-semibold text-[var(--ud-ink)] mb-3">Remote Work</h4>
 <p className="text-[var(--ud-muted)]">
 {career.remote ?'Remote work options are available for this position.' :'This role typically requires on-site presence.'}
 </p>
 </div>
 </div>
 </div>
 )}

 {activeTab ==='requirements' && (
 <div className="space-y-8">
 {/* Education Requirements */}
 <div>
 <h3 className="text-xl font-semibold text-[var(--ud-ink)] mb-4 flex items-center">
 <BookOpen className="h-5 w-5 mr-2 text-[var(--ud-gold)]" />
 Education Requirements
 </h3>
 <div className="bg-[var(--ud-gold-pale)] rounded-xl p-6">
 <div className="flex items-center mb-3">
 <CheckCircle className="h-5 w-5 text-[var(--ud-gold)] mr-2" />
 <span className="font-semibold text-blue-900">Minimum Education: {career.education}</span>
 </div>
 <p className="text-[var(--ud-ink)]">
 Most employers prefer candidates with at least a {career.education.toLowerCase()} degree in a relevant field.
 Additional certifications and continuing education can enhance career prospects.
 </p>
 </div>
 </div>

 {/* Certifications */}
 <div>
 <h3 className="text-xl font-semibold text-[var(--ud-ink)] mb-4 flex items-center">
 <Award className="h-5 w-5 mr-2 text-[var(--ud-ink)]" />
 Recommended Certifications
 </h3>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 {getRequiredCertifications(career).map((cert, index) => (
 <div key={index} className="bg-[var(--ud-gold-pale)] border border-green-200 rounded-lg p-4">
 <div className="flex items-center">
 <CheckCircle className="h-4 w-4 text-[var(--ud-ink)] mr-2" />
 <span className="text-[var(--ud-ink)] font-medium">{cert}</span>
 </div>
 </div>
 ))}
 </div>
 </div>

 {/* Experience Levels */}
 <div>
 <h3 className="text-xl font-semibold text-[var(--ud-ink)] mb-4 flex items-center">
 <TrendingUp className="h-5 w-5 mr-2 text-[var(--ud-gold)]" />
 Experience Requirements by Level
 </h3>
 <div className="space-y-4">
 {getCareerProgression(career).map((level, index) => (
 <div key={index} className="bg-[var(--ud-paper)] border border-[var(--ud-border)] rounded-lg p-4">
 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
 <div>
 <h4 className="font-semibold text-[var(--ud-ink)]">{level.title}</h4>
 <p className="text-[var(--ud-muted)]">{level.level} • {level.experience}</p>
 </div>
 <div className="mt-2 sm:mt-0">
 <span className="bg-[var(--ud-gold-pale)] text-[var(--ud-ink)] px-3 py-1 rounded-full text-sm font-medium">
 {level.salary}
 </span>
 </div>
 </div>
 </div>
 ))}
 </div>
 </div>
 </div>
 )}

 {activeTab ==='growth' && (
 <div className="space-y-8">
 {/* Career Progression */}
 <div>
 <h3 className="text-xl font-semibold text-[var(--ud-ink)] mb-6 flex items-center">
 <TrendingUp className="h-5 w-5 mr-2 text-[var(--ud-gold)]" />
 Career Progression Path
 </h3>
 <div className="relative">
 {getCareerProgression(career).map((level, index) => (
 <div key={index} className="flex items-center mb-8 last:mb-0">
 <div className="flex-shrink-0 w-12 h-12 bg-[var(--ud-gold)] text-white rounded-full flex items-center justify-center font-bold text-lg">
 {index + 1}
 </div>
 <div className="ml-6 flex-1">
 <div className="bg-[var(--ud-paper)] border border-[var(--ud-border)] rounded-xl p-6 shadow-sm">
 <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
 <div className="mb-4 lg:mb-0">
 <h4 className="text-lg font-semibold text-[var(--ud-ink)] mb-1">{level.title}</h4>
 <p className="text-[var(--ud-gold)] font-medium mb-2">{level.level}</p>
 <p className="text-[var(--ud-muted)]">Experience: {level.experience}</p>
 </div>
 <div className="text-right">
 <div className="text-2xl font-bold text-[var(--ud-ink)] mb-1">{level.salary}</div>
 <div className="text-sm text-[var(--ud-muted)]">Annual Salary</div>
 </div>
 </div>
 </div>
 </div>
 {index < getCareerProgression(career).length - 1 && (
 <div className="absolute left-6 mt-12 w-0.5 h-8 bg-gray-300"></div>
 )}
 </div>
 ))}
 </div>
 </div>

 {/* Growth Opportunities */}
 <div>
 <h3 className="text-xl font-semibold text-[var(--ud-ink)] mb-4 flex items-center">
 <Lightbulb className="h-5 w-5 mr-2 text-[var(--ud-gold)]" />
 Growth Opportunities
 </h3>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div className="bg-yellow-50 rounded-xl p-6">
 <h4 className="font-semibold text-yellow-900 mb-3">Skill Development</h4>
 <ul className="space-y-2 text-[var(--ud-ink)]">
 <li>• Continuous learning through online courses and workshops</li>
 <li>• Industry conferences and networking events</li>
 <li>• Mentorship programs and professional coaching</li>
 <li>• Cross-functional project opportunities</li>
 </ul>
 </div>
 <div className="bg-[var(--ud-gold-pale)] rounded-xl p-6">
 <h4 className="font-semibold text-green-900 mb-3">Career Advancement</h4>
 <ul className="space-y-2 text-[var(--ud-ink)]">
 <li>• Leadership and management training</li>
 <li>• Specialization in emerging technologies</li>
 <li>• Industry certifications and credentials</li>
 <li>• Entrepreneurial and consulting opportunities</li>
 </ul>
 </div>
 </div>
 </div>
 </div>
 )}

 {activeTab ==='day-in-life' && (
 <div className="space-y-8">
 {/* Typical Day */}
 <div>
 <h3 className="text-xl font-semibold text-[var(--ud-ink)] mb-6 flex items-center">
 <Clock className="h-5 w-5 mr-2 text-[var(--ud-gold)]" />
 A Typical Day as a {career.name}
 </h3>
 <div className="space-y-4">
 {getDayInLifeTasks(career).map((task, index) => (
 <div key={index} className="flex items-start space-x-4 p-4 bg-[var(--ud-gold-pale)] rounded-lg">
 <div className="flex-shrink-0 w-8 h-8 bg-[var(--ud-gold-pale)] text-[var(--ud-gold)] rounded-full flex items-center justify-center text-sm font-semibold">
 {index + 1}
 </div>
 <div className="flex-1">
 <p className="text-[var(--ud-ink)]">{task}</p>
 </div>
 </div>
 ))}
 </div>
 </div>

 {/* Work Schedule */}
 <div>
 <h3 className="text-xl font-semibold text-[var(--ud-ink)] mb-4 flex items-center">
 <Briefcase className="h-5 w-5 mr-2 text-[var(--ud-ink)]" />
 Typical Work Schedule
 </h3>
 <div className="bg-[var(--ud-gold-pale)] rounded-xl p-6">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div>
 <h4 className="font-semibold text-green-900 mb-3">Standard Hours</h4>
 <p className="text-[var(--ud-ink)] mb-2">Monday - Friday: 9:00 AM - 5:00 PM</p>
 <p className="text-[var(--ud-ink)] text-sm">40 hours per week typical</p>
 </div>
 <div>
 <h4 className="font-semibold text-green-900 mb-3">Flexibility</h4>
 <p className="text-[var(--ud-ink)] mb-2">
 {career.remote ?'Remote work options available' :'Primarily on-site work'}
 </p>
 <p className="text-[var(--ud-ink)] text-sm">
 {career.stressLevel ==='Low' ?'Flexible schedule possible' :'May require overtime during busy periods'}
 </p>
 </div>
 </div>
 </div>
 </div>

 {/* Challenges & Rewards */}
 <div>
 <h3 className="text-xl font-semibold text-[var(--ud-ink)] mb-4 flex items-center">
 <Target className="h-5 w-5 mr-2 text-[var(--ud-gold)]" />
 Daily Challenges & Rewards
 </h3>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div className="bg-red-50 rounded-xl p-6">
 <h4 className="font-semibold text-red-900 mb-3 flex items-center">
 <AlertCircle className="h-4 w-4 mr-2" />
 Common Challenges
 </h4>
 <ul className="space-y-2 text-red-800 text-sm">
 <li>• Managing multiple priorities and deadlines</li>
 <li>• Staying updated with industry changes</li>
 <li>• Balancing quality with time constraints</li>
 <li>• Collaborating across different teams</li>
 </ul>
 </div>
 <div className="bg-[var(--ud-gold-pale)] rounded-xl p-6">
 <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
 <Star className="h-4 w-4 mr-2" />
 Daily Rewards
 </h4>
 <ul className="space-y-2 text-[var(--ud-ink)] text-sm">
 <li>• Solving complex problems and seeing results</li>
 <li>• Learning new skills and technologies</li>
 <li>• Collaborating with talented colleagues</li>
 <li>• Making meaningful contributions to projects</li>
 </ul>
 </div>
 </div>
 </div>
 </div>
 )}
 </div>
 </div>

 {/* Call to Action */}
 <div className="bg-[var(--ud-paper)] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-[var(--ud-border)] text-center mb-8">
 <h3 className="text-2xl font-bold text-[var(--ud-ink)] mb-4">Ready to Pursue This Career?</h3>
 <p className="text-[var(--ud-muted)] mb-6 max-w-2xl mx-auto">
 Take our comprehensive AI-powered assessment to see how well this career matches your unique profile and discover your personalized career roadmap.
 </p>
 <div className="flex flex-col sm:flex-row gap-4 justify-center">
 <Link
 to="/assessment"
 className="bg-[var(--ud-gold)] text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-medium inline-flex items-center justify-center space-x-2"
 >
 <Target className="h-5 w-5" />
 <span>Take Career Assessment</span>
 </Link>
 <Link
 to="/careers"
 className="bg-[var(--ud-paper)] text-[var(--ud-ink)] px-8 py-3 rounded-xl border-2 border-[var(--ud-border)] hover:border-[var(--ud-gold)] hover:shadow-lg transition-all duration-300 font-medium"
 >
 Explore More Careers
 </Link>
 </div>
 </div>

 {/* Related Careers */}
 {relatedCareers.length > 0 && (
 <div className="bg-[var(--ud-paper)] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-[var(--ud-border)]">
 <h3 className="text-2xl font-bold text-[var(--ud-ink)] mb-6 text-center">
 Related Careers in {career.category}
 </h3>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 {relatedCareers.map((relatedCareer) => (
 <Link
 key={relatedCareer.id}
 to={`/career/${relatedCareer.id}`}
 className="group bg-[var(--ud-gold-pale)] rounded-xl p-6 hover:bg-[var(--ud-gold-pale)] hover:shadow-lg transition-all duration-300 border border-[var(--ud-border)] hover:border-[var(--ud-gold)]"
 >
 <h4 className="font-semibold text-[var(--ud-ink)] group-hover:text-[var(--ud-gold)] mb-2 transition-colors">
 {relatedCareer.name}
 </h4>
 <p className="text-[var(--ud-muted)] text-sm mb-3 line-clamp-2">
 {relatedCareer.description}
 </p>
 <div className="flex items-center justify-between text-sm">
 <span className="text-[var(--ud-ink)] font-medium">{relatedCareer.salary}</span>
 <ExternalLink className="h-4 w-4 text-[var(--ud-muted)] group-hover:text-[var(--ud-gold)] transition-colors" />
 </div>
 </Link>
 ))}
 </div>
 </div>
 )}
 </div>
 </div>
 );
};

export default CareerDetailPage;
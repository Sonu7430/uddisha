import React, { useState, useEffect } from'react';
import { useLocation, useNavigate, Link } from'react-router-dom';
import { Helmet } from'react-helmet-async';
import {
 ArrowRight,
 RefreshCw,
 Star,
 TrendingUp,
 DollarSign,
 Clock,
 Target,
 Brain,
 Award,
 MapPin,
 Briefcase,
 Lightbulb
} from'lucide-react';
import { CareerMatch } from'../utils/careerMatcher';
import { AICareerAnalysisService } from'../services/aiCareerAnalysis';
import { AIAnalysisResponse, PersonalityProfile } from'../types/ai';

const ResultsPage: React.FC = () => {
 const location = useLocation();
 const navigate = useNavigate();

 const [careerMatches, setCareerMatches] = useState<CareerMatch[]>([]);
 const [personalityProfile, setPersonalityProfile] = useState<PersonalityProfile | null>(null);
 const [alternativeCareers, setAlternativeCareers] = useState<string[]>([]);
 const [growthPaths, setGrowthPaths] = useState<string[]>([]);
 const [status, setStatus] = useState<'loading' |'success' |'error'>('loading');
 const [progress, setProgress] = useState(0);
 const [progressMessage, setProgressMessage] = useState('Initializing analysis...');
 const [userFeedback, setUserFeedback] = useState<'accurate' |'needs-refinement' | null>(null);
 const [showRefineOptions, setShowRefineOptions] = useState(false);
 const [assessmentId, setAssessmentId] = useState<string>('');
 const [isCached, setIsCached] = useState(false);
 const [isFallback, setIsFallback] = useState(false);

 const { answers, questions, totalQuestions } = (location.state as any) || {};

 const progressClass = `w-[${progress}%]`;

 useEffect(() => {
 if (!answers || !questions) {
 navigate('/assessment');
 return;
 }

 let mounted = true;

 const analyzeCareer = async () => {
 try {
 setStatus('loading');
 setProgress(10);

 const response: AIAnalysisResponse = await AICareerAnalysisService.analyzeCareer(
 answers,
 questions,
 (message: string) => {
 if (mounted) {
 setProgressMessage(message);
 setProgress(prev => Math.min(prev + 15, 90));
 }
 }
 );

 if (!mounted) return;

 setProgress(100);
 setAssessmentId(response.assessmentId);
 setIsCached(response.cached);
 setIsFallback(!!(response as any).fallback);

 // Set career matches (deduplicate by career ID to prevent showing same career twice)
 const uniqueCareers = (response.careerMatches as any[]).filter(
 (career, index, self) =>
 index === self.findIndex((c) => c.id === career.id)
 );
 setCareerMatches(uniqueCareers);

 // Set AI insights if available
 if (response.personalityProfile) {
 setPersonalityProfile(response.personalityProfile);
 }
 if (response.alternativeCareers) {
 setAlternativeCareers(response.alternativeCareers);
 }
 if (response.growthPaths) {
 setGrowthPaths(response.growthPaths);
 }

 setTimeout(() => {
 if (mounted) setStatus('success');
 }, 400);

 } catch (error) {
 console.error('Career analysis error:', error);
 if (mounted) {
 setStatus('error');
 }
 }
 };

 analyzeCareer();

 return () => {
 mounted = false;
 };
 }, [answers, questions, navigate]);

 const handleFeedback = (feedback:'accurate' |'needs-refinement') => {
 setUserFeedback(feedback);
 if (feedback ==='needs-refinement') setShowRefineOptions(true);

 // Submit feedback to backend
 if (assessmentId) {
 AICareerAnalysisService.submitFeedback({
 assessmentId,
 userRating: feedback ==='accurate' ? 5 : 3,
 feedbackType: feedback,
 comments: undefined
 });
 }
 };

 const handleRefineResults = () => {
 navigate('/careers', {
 state: {
 refinedSearch: true,
 originalResults: careerMatches,
 userProfile: answers
 }
 });
 };

 const handleRetakeAssessment = () => {
 navigate('/assessment');
 };

 if (!answers || !questions) {
 return (
 <div className="min-h-screen flex items-center justify-center ud-main px-3">
 <div className="text-center max-w-md mx-auto">
 <h2 className="text-xl sm:text-2xl font-bold text-[var(--ud-ink)] mb-3 sm:mb-4">No Assessment Data Found</h2>
 <p className="text-[var(--ud-muted)] mb-4 sm:mb-6 text-sm sm:text-base">Please take the assessment first to see your results.</p>
 <Link
 to="/assessment"
 className="bg-[var(--ud-gold)] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:shadow-lg transition-all text-sm sm:text-base"
 >
 Take Assessment
 </Link>
 </div>
 </div>
 );
 }

 // Loading screen
 if (status ==='loading') {
 return (
 <div className="min-h-screen flex items-center justify-center ud-main px-3">
 <div className="text-center max-w-lg mx-auto">
 <div className="relative mb-6 sm:mb-8">
 <div className="animate-spin rounded-full h-24 w-24 sm:h-32 sm:w-32 border-4 border-[var(--ud-border)] mx-auto"></div>
 <div className="animate-spin rounded-full h-24 w-24 sm:h-32 sm:w-32 border-t-4 border-blue-600 mx-auto absolute top-0 left-1/2 transform -translate-x-1/2"></div>
 <div className="absolute inset-0 flex items-center justify-center">
 <Brain className="h-8 w-8 sm:h-12 sm:w-12 text-[var(--ud-gold)] animate-pulse" />
 </div>
 </div>
 <h2 className="text-2xl sm:text-3xl font-bold text-[var(--ud-ink)] mb-3 sm:mb-4">
 {isCached ?'Retrieving Your Analysis...' :'AI Analysis in Progress...'}
 </h2>
 <p className="text-lg sm:text-xl text-[var(--ud-muted)] mb-2">Processing your {totalQuestions} responses</p>
 <p className="text-[var(--ud-muted)] mb-2 text-sm sm:text-base">{progressMessage}</p>
 <p className="text-[var(--ud-muted)] mb-4 sm:mb-6 text-xs sm:text-sm">Matching against 1800+ career profiles</p>

 <div className="w-full bg-[var(--ud-gold-pale)] rounded-full h-2.5 mb-4">
 <div
 className={`bg-[var(--ud-gold)] h-2.5 rounded-full transition-all duration-500 ease-out`}
 style={{ width: `${progress}%` }}
 />
 </div>

 <div className="bg-[var(--ud-paper)] rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg">
 <div className="space-y-3 sm:space-y-4">
 <div className="flex items-center justify-between">
 <span className="text-xs sm:text-sm text-[var(--ud-muted)]">Personality Analysis</span>
 <div className="flex space-x-1">
 <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[var(--ud-gold)] rounded-full animate-pulse"></div>
 <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[var(--ud-gold)] rounded-full animate-pulse delay-100"></div>
 <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[var(--ud-gold)] rounded-full animate-pulse delay-200"></div>
 </div>
 </div>
 <div className="flex items-center justify-between">
 <span className="text-xs sm:text-sm text-[var(--ud-muted)]">Skills Matching</span>
 <div className="flex space-x-1">
 <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-600 rounded-full animate-pulse delay-300"></div>
 <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-600 rounded-full animate-pulse delay-400"></div>
 <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-600 rounded-full animate-pulse delay-500"></div>
 </div>
 </div>
 <div className="flex items-center justify-between">
 <span className="text-xs sm:text-sm text-[var(--ud-muted)]">Career Scoring</span>
 <div className="flex space-x-1">
 <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[var(--ud-gold)] rounded-full animate-pulse delay-700"></div>
 <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[var(--ud-gold)] rounded-full animate-pulse delay-800"></div>
 <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[var(--ud-gold)] rounded-full animate-pulse delay-900"></div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>
 );
 }

 if (status ==='error') {
 return (
 <div className="min-h-screen flex items-center justify-center ud-main px-3">
 <div className="text-center max-w-md mx-auto">
 <h2 className="text-xl sm:text-2xl font-bold text-[var(--ud-ink)] mb-3 sm:mb-4">Analysis Failed</h2>
 <p className="text-[var(--ud-muted)] mb-4 sm:mb-6 text-sm sm:text-base">
 We encountered an error while analyzing your results. Please try taking the assessment again.
 </p>
 <button
 onClick={handleRetakeAssessment}
 className="bg-[var(--ud-gold)] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:shadow-lg transition-all text-sm sm:text-base"
 >
 Retake Assessment
 </button>
 </div>
 </div>
 );
 }

 // Main results view
 return (
 <div className="min-h-screen py-6 sm:py-12 ud-main text-[var(--ud-ink)]">
 <Helmet>
 <title>Your AI Career Match Results | Uddisha</title>
 <meta name="description" content="View your personalized AI career assessment results. See your top career matches, personality insights, and recommended next steps." />
 <meta property="og:title" content="Your AI Career Match Results | Uddisha" />
 <meta property="og:description" content="Discover your top career matches based on AI analysis of your personality, skills, and values." />
 <link rel="canonical" href="https://www.uddisha.com/results" />
 </Helmet>
 <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
 {/* Header */}
 <div className="text-center mb-8 sm:mb-12">
 <div className="inline-flex items-center space-x-2 bg-[var(--ud-gold-pale)] text-[var(--ud-ink)] px-3 sm:px-4 py-2 rounded-full mb-3 sm:mb-4">
 <Target className="h-3 w-3 sm:h-4 sm:w-4" />
 <span className="text-xs sm:text-sm font-medium">Assessment Complete</span>
 {isCached && <span className="text-xs">• Cached Result</span>}
 {isFallback && <span className="text-xs">• Algorithmic Fallback</span>}
 </div>
 <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--ud-ink)] mb-3 sm:mb-4">
 Your AI-Powered
 <span className="block bg-[var(--ud-gold)] bg-clip-text text-transparent">
 Career Matches
 </span>
 </h1>
 <p className="text-base sm:text-xl text-[var(--ud-muted)] max-w-3xl mx-auto px-2">
 Based on your {totalQuestions} responses, our AI analyzed your profile against 1800+ careers to find your perfect matches.
 </p>
 </div>

 {/* AI Personality Profile Section */}
 {personalityProfile && !isFallback && (
 <div className="bg-[var(--ud-gold-pale)] border-[var(--ud-border)] rounded-2xl p-6 sm:p-8 shadow-lg mb-8 border-2 border-[var(--ud-border)]">
 <div className="flex items-center space-x-2 mb-4">
 <Star className="w-5 h-5 text-[var(--ud-gold)]" />
 <h2 className="text-2xl font-bold text-[var(--ud-ink)]">AI Personality Analysis</h2>
 </div>
 <p className="text-[var(--ud-muted)] mb-4 leading-relaxed">{personalityProfile.summary}</p>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
 <div>
 <h3 className="font-semibold text-[var(--ud-ink)] mb-3 flex items-center">
 <Brain className="h-5 w-5 mr-2 text-[var(--ud-gold)]" />
 Core Traits
 </h3>
 <div className="flex flex-wrap gap-2">
 {personalityProfile.traits.map((trait, i) => (
 <span key={i} className="bg-[var(--ud-gold-pale)] text-[var(--ud-ink)] px-3 py-1 rounded-full text-sm">
 {trait}
 </span>
 ))}
 </div>
 </div>

 <div>
 <h3 className="font-semibold text-[var(--ud-ink)] mb-3 flex items-center">
 <Lightbulb className="h-5 w-5 mr-2 text-[var(--ud-gold)]" />
 Core Values
 </h3>
 <div className="flex flex-wrap gap-2">
 {personalityProfile.values?.map((value, i) => (
 <span key={i} className="bg-[var(--ud-gold-pale)] text-[var(--ud-ink)] px-3 py-1 rounded-full text-sm">
 {value}
 </span>
 ))}
 </div>
 </div>
 </div>

 <div className="bg-[var(--ud-paper)] rounded-lg p-4">
 <h3 className="font-semibold text-[var(--ud-ink)] mb-2">Work Style</h3>
 <p className="text-[var(--ud-muted)] text-sm">{personalityProfile.workStyle}</p>
 </div>
 </div>
 )}

 {/* Feedback Section */}
 <div className="bg-[var(--ud-paper)] rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg mb-6 sm:mb-8 border border-[var(--ud-border)]">
 <div className="text-center">
 {userFeedback ==='accurate' ? (
 <div className="py-4 sm:py-6">
 <div className="text-4xl sm:text-5xl mb-4">🎉</div>
 <h3 className="text-lg sm:text-xl font-bold text-transparent bg-clip-text text-[var(--ud-gold)] mb-3">
 Thank You So Much for Your Feedback! 💚
 </h3>
 <p className="text-[var(--ud-muted)] text-sm sm:text-base max-w-lg mx-auto mb-3">
 Your review helps us improve Uddisha for thousands of students just like you who are searching for their perfect career path.
 </p>
 <p className="text-[var(--ud-muted)] text-xs sm:text-sm">
 Together, we're helping students discover careers they'll love! 🌟
 </p>
 <div className="mt-4 inline-flex items-center space-x-2 bg-[var(--ud-gold-pale)] text-[var(--ud-ink)] px-4 py-2 rounded-full">
 <span className="text-sm font-medium">✓ Feedback Recorded</span>
 </div>
 </div>
 ) : (
 <>
 <h3 className="text-base sm:text-lg font-semibold text-[var(--ud-ink)] mb-3 sm:mb-4">How do these results feel to you?</h3>
 <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
 <button
 onClick={() => handleFeedback('accurate')}
 className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all text-sm sm:text-base bg-[var(--ud-gold-pale)] text-[var(--ud-muted)] hover:bg-[var(--ud-paper)] hover:text-[var(--ud-gold)]"
 >
 🎯 Very Accurate
 </button>
 <button
 onClick={() => handleFeedback('needs-refinement')}
 className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all text-sm sm:text-base ${userFeedback ==='needs-refinement' ?'bg-[var(--ud-gold)] text-white shadow-lg' :'bg-[var(--ud-gold-pale)] text-[var(--ud-muted)] hover:bg-[var(--ud-paper)] hover:text-[var(--ud-gold)]'
 }`}
 >
 🔄 Needs Refinement
 </button>
 </div>
 </>
 )}
 </div>

 {showRefineOptions && (
 <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-[var(--ud-gold-pale)] rounded-lg border border-[var(--ud-gold)]">
 <h4 className="font-semibold text-[var(--ud-ink)] mb-2 sm:mb-3 text-sm sm:text-base">Let's Find Better Matches</h4>
 <p className="text-[var(--ud-muted)] mb-3 sm:mb-4 text-xs sm:text-sm">No problem! We can help you explore more options or retake the assessment with different focus areas.</p>
 <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
 <button onClick={handleRefineResults} className="flex items-center justify-center space-x-2 bg-[var(--ud-gold)] text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-[var(--ud-gold)] transition-all text-xs sm:text-sm">
 <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4" />
 <span>Explore All 1800+ Careers</span>
 </button>
 <button onClick={handleRetakeAssessment} className="flex items-center justify-center space-x-2 bg-gray-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-[var(--ud-gold-pale)] transition-all text-xs sm:text-sm">
 <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
 <span>Retake Assessment</span>
 </button>
 </div>
 </div>
 )}
 </div>

 {/* Career Matches Grid */}
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-12">
 {careerMatches.map((career, index) => (
 <div
 key={career.id}
 className={`bg-[var(--ud-paper)] rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 transform hover:-translate-y-1 ${index === 0 ?'border-blue-500 bg-[var(--ud-gold-pale)] border border-[var(--ud-gold)]' :'border-[var(--ud-border)] hover:border-[var(--ud-gold)]'
 }`}
 >
 {index === 0 && (
 <div className="flex items-center space-x-2 mb-3 sm:mb-4">
 <Star className="h-4 w-4 sm:h-5 sm:w-5 text-[var(--ud-gold)] fill-current" />
 <span className="text-xs sm:text-sm font-medium text-[var(--ud-gold)]">🏆 Top Match</span>
 </div>
 )}

 <div className="flex items-start justify-between mb-4 sm:mb-6">
 <div className="flex-1 min-w-0">
 <h3 className="text-lg sm:text-2xl font-bold text-[var(--ud-ink)] mb-2 line-clamp-2">{career.name}</h3>
 <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-3">
 <span className="inline-block bg-[var(--ud-gold-pale)] text-[var(--ud-ink)] text-xs font-medium px-2 py-0.5 rounded-full">{career.category}</span>
 <span className="inline-block bg-[var(--ud-gold-pale)] text-[var(--ud-muted)] text-xs px-2 py-0.5 rounded-full">{career.subcategory}</span>
 </div>
 </div>
 <div className="text-right flex-shrink-0 ml-3">
 <div className="text-2xl sm:text-3xl font-bold text-[var(--ud-ink)] mb-1">{career.matchScore}%</div>
 <div className="text-xs text-[var(--ud-muted)]">Match Score</div>
 </div>
 </div>

 <p className="text-[var(--ud-muted)] mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base line-clamp-3">{career.description}</p>

 <div className="mb-4 sm:mb-6">
 <h4 className="font-semibold text-[var(--ud-ink)] mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
 <Target className="h-3 w-3 sm:h-4 sm:w-4 mr-2 text-[var(--ud-gold)]" />
 Why This Matches You:
 </h4>
 <ul className="space-y-1 sm:space-y-2">
 {career.matchReasons.map((reason, reasonIndex) => (
 <li key={reasonIndex} className="flex items-start space-x-2">
 <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[var(--ud-gold)] rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
 <span className="text-xs sm:text-sm text-[var(--ud-muted)]">{reason}</span>
 </li>
 ))}
 </ul>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
 <div>
 <h5 className="font-medium text-[var(--ud-ink)] mb-2 flex items-center text-xs sm:text-sm">
 <Award className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
 Your Strengths:
 </h5>
 <ul className="text-xs sm:text-sm text-[var(--ud-muted)] space-y-1">
 {career.strengthAreas.map((strength, i) => (
 <li key={i} className="flex items-center">
 <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-[var(--ud-gold-pale)]0 rounded-full mr-2"></span>
 {strength}
 </li>
 ))}
 </ul>
 </div>
 <div>
 <h5 className="font-medium text-[var(--ud-ink)] mb-2 flex items-center text-xs sm:text-sm">
 <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
 Growth Areas:
 </h5>
 <ul className="text-xs sm:text-sm text-[var(--ud-muted)] space-y-1">
 {career.developmentAreas.map((area, i) => (
 <li key={i} className="flex items-center">
 <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-orange-500 rounded-full mr-2"></span>
 {area}
 </li>
 ))}
 </ul>
 </div>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6 p-3 sm:p-4 bg-[var(--ud-gold-pale)] rounded-lg sm:rounded-xl">
 <div className="text-center">
 <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-[var(--ud-gold-pale)] rounded-lg mx-auto mb-1 sm:mb-2">
 <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-[var(--ud-ink)]" />
 </div>
 <div className="text-xs text-[var(--ud-muted)] mb-1">Salary Range</div>
 <div className="text-xs sm:text-sm font-semibold text-[var(--ud-ink)]">{career.salary}</div>
 </div>
 <div className="text-center">
 <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-[var(--ud-gold-pale)] rounded-lg mx-auto mb-1 sm:mb-2">
 <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-[var(--ud-gold)]" />
 </div>
 <div className="text-xs text-[var(--ud-muted)] mb-1">Job Growth</div>
 <div className={`text-xs sm:text-sm font-semibold ${career.growth.startsWith('+') ?'text-[var(--ud-ink)]' :'text-[var(--ud-ink)]'}`}>{career.growth}</div>
 </div>
 <div className="text-center">
 <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-[var(--ud-gold-pale)] rounded-lg mx-auto mb-1 sm:mb-2">
 <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-[var(--ud-ink)]" />
 </div>
 <div className="text-xs text-[var(--ud-muted)] mb-1">Education</div>
 <div className="text-xs sm:text-sm font-semibold text-[var(--ud-ink)]">{career.education}</div>
 </div>
 </div>

 <div className="flex items-center justify-between text-xs sm:text-sm text-[var(--ud-muted)] mb-4 sm:mb-6">
 <div className="flex items-center space-x-2 sm:space-x-4">
 {career.remote && (
 <span className="flex items-center">
 <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
 Remote OK
 </span>
 )}
 <span className="flex items-center">
 <Briefcase className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
 {career.stressLevel} Stress
 </span>
 </div>
 </div>

 <button
 onClick={() => navigate(`/career/${career.id}`)}
 className="w-full bg-[var(--ud-gold)] text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl hover:shadow-lg transition-all duration-300 font-medium transform hover:-translate-y-0.5 text-sm sm:text-base"
 >
 Explore This Career Path
 </button>
 </div>
 ))}
 </div>

 {/* Alternative Careers Section */}
 {alternativeCareers.length > 0 && !isFallback && (
 <div className="bg-[var(--ud-paper)] rounded-2xl p-6 sm:p-8 shadow-lg mb-8 border border-[var(--ud-border)]">
 <h2 className="text-2xl font-bold text-[var(--ud-ink)] mb-4 flex items-center">
 <Lightbulb className="h-6 w-6 mr-2 text-[var(--ud-gold)]" />
 Alternative Career Paths to Explore
 </h2>
 <p className="text-[var(--ud-muted)] mb-4">Based on your profile, you might also consider these careers:</p>
 <div className="flex flex-wrap gap-3">
 {alternativeCareers.map((career, i) => (
 <span key={i} className="bg-[var(--ud-gold-pale)] border border-[var(--ud-gold)] text-[var(--ud-ink)] px-4 py-2 rounded-lg text-sm font-medium">
 {career}
 </span>
 ))}
 </div>
 </div>
 )}

 {/* Next Steps */}
 <div className="bg-[var(--ud-paper)] rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-lg text-center border border-[var(--ud-border)]">
 <h3 className="text-xl sm:text-2xl font-bold text-[var(--ud-ink)] mb-3 sm:mb-4">Ready to Explore Further?</h3>
 <p className="text-[var(--ud-muted)] mb-4 sm:mb-6 max-w-2xl mx-auto text-sm sm:text-base">
 These are your top matches from our analysis of 1800+ careers. Want to see more options or dive deeper into specific industries?
 </p>
 <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
 <Link
 to="/careers"
 className="bg-[var(--ud-gold)] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl hover:shadow-lg transition-all duration-300 font-medium inline-flex items-center justify-center space-x-2 text-sm sm:text-base"
 >
 <span>Browse All 1800+ Careers</span>
 <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
 </Link>
 <button
 onClick={handleRetakeAssessment}
 className="bg-[var(--ud-paper)] text-[var(--ud-ink)] px-6 sm:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl border-2 border-[var(--ud-border)] hover:border-[var(--ud-gold)] hover:shadow-lg transition-all duration-300 font-medium text-sm sm:text-base"
 >
 Take Assessment Again
 </button>
 </div>
 </div>
 </div>
 </div>
 );
};

export default ResultsPage;
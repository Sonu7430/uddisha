import React, { useState, useRef, useEffect } from'react';
import { useNavigate } from'react-router-dom';
import { Helmet } from'react-helmet-async';
import { ArrowRight, ArrowLeft, Brain, Target, Users, Lightbulb, Heart, Settings, Check } from'lucide-react';
import { assessmentQuestions, Question } from'../data/questions';
import CelebratoryModal from'../components/CelebratoryModal';
import { useCelebration } from'../hooks/useCelebration';

const AssessmentPage = () => {
 const navigate = useNavigate();
 const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
 const [answers, setAnswers] = useState<{ [key: number]: any }>({});
 const [questionStack, setQuestionStack] = useState<Question[]>(assessmentQuestions);
 const [isComplete, setIsComplete] = useState(false);
 const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

 // Celebration hook
 const { showCelebration, celebrationData, closeCelebration } = useCelebration({
 currentQuestion: currentQuestionIndex + 1,
 totalQuestions: questionStack.length,
 isEnabled: true
 });

 // Ref for the question container to control scrolling
 const questionContainerRef = useRef<HTMLDivElement>(null);

 const currentQuestion = questionStack[currentQuestionIndex];

 // Scroll to top of question container when question changes
 useEffect(() => {
 if (questionContainerRef.current) {
 questionContainerRef.current.scrollIntoView({
 behavior:'smooth',
 block:'start'
 });
 }
 }, [currentQuestionIndex]);

 // Dynamic progress message functions - NOW PROPERLY USED
 const getProgressStartText = (completed: number) => {
 if (completed <= 5) return"🚀 Getting Started";
 if (completed <= 10) return"💪 Building Momentum";
 if (completed <= 15) return"🔥 On Fire!";
 return"⭐ Crushing It!";
 };

 const getProgressEndText = (completed: number, total: number) => {
 const remaining = total - completed;
 if (remaining > 15) return"🎯 Keep Going!";
 if (remaining > 10) return"🌟 You're Doing Great!";
 if (remaining > 5) return"🚀 Almost There!";
 if (remaining > 2) return"🏆 So Close!";
 if (remaining > 0) return"🎉 Final Push!";
 return"✨ Complete!";
 };

 // Optional: Add milestone celebration animation
 useEffect(() => {
 const questionsCompleted = currentQuestionIndex + 1;
 const isNewMilestone = questionsCompleted % 5 === 0 && questionsCompleted > 0;

 if (isNewMilestone) {
 // Brief celebration animation
 const progressBar = document.querySelector('.progress-bar-container');
 if (progressBar) {
 progressBar.classList.add('animate-bounce');
 setTimeout(() => {
 progressBar.classList.remove('animate-bounce');
 }, 1000);
 }
 }
 }, [currentQuestionIndex]);

 const handleAnswer = (answer: any) => {
 const newAnswers = { ...answers, [currentQuestion.id]: answer };
 setAnswers(newAnswers);

 // Check for follow-up questions
 if (currentQuestion.followUp && currentQuestion.type ==='multiple') {
 const followUpQuestion = currentQuestion.followUp[answer];
 if (followUpQuestion) {
 // Insert follow-up question after current question
 const newQuestions = [...questionStack];
 newQuestions.splice(currentQuestionIndex + 1, 0, followUpQuestion);
 setQuestionStack(newQuestions);
 }
 }

 // Reset selected options for next question
 setSelectedOptions([]);

 // Move to next question or complete assessment
 if (currentQuestionIndex < questionStack.length - 1) {
 setCurrentQuestionIndex(currentQuestionIndex + 1);
 } else {
 setIsComplete(true);
 // Navigate to results with answers
 navigate('/results', {
 state: {
 answers: newAnswers,
 questions: questionStack,
 totalQuestions: questionStack.length
 }
 });
 }
 };

 const handleMultiSelectToggle = (option: string) => {
 const maxSelections = currentQuestion.maxSelections || 3;

 if (selectedOptions.includes(option)) {
 setSelectedOptions(selectedOptions.filter(opt => opt !== option));
 } else if (selectedOptions.length < maxSelections) {
 setSelectedOptions([...selectedOptions, option]);
 }
 };

 const handleMultiSelectSubmit = () => {
 if (selectedOptions.length > 0) {
 handleAnswer(selectedOptions);
 }
 };

 const handlePrevious = () => {
 if (currentQuestionIndex > 0) {
 setCurrentQuestionIndex(currentQuestionIndex - 1);
 // Reset selections when going back
 setSelectedOptions([]);
 }
 };

 const renderQuestion = () => {
 if (!currentQuestion) return null;

 switch (currentQuestion.type) {
 case'multiple':
 return (
 <div className="space-y-3 sm:space-y-4">
 {currentQuestion.options?.map((option, index) => (
 <button
 key={index}
 onClick={() => handleAnswer(option)}
 className="w-full text-left p-4 sm:p-6 border-2 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg group"
 style={{ background:'var(--ud-paper)', borderColor:'var(--ud-border)', color:'var(--ud-ink)' }}
 >
 <div className="flex items-center justify-between">
 <span className="font-medium text-sm sm:text-base leading-relaxed pr-2">
 {option}
 </span>
 <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transform group-hover:translate-x-1 transition-all flex-shrink-0" style={{ color:'var(--ud-gold)' }} />
 </div>
 </button>
 ))}
 </div>
 );

 case'multiselect':
 return (
 <div className="space-y-3 sm:space-y-4">
 <div className="text-center mb-4 sm:mb-6">
 <p className="text-[var(--ud-muted)] mb-2 text-sm sm:text-base">
 Select up to {currentQuestion.maxSelections || 3} options that best describe you:
 </p>
 <div className="text-sm text-[var(--ud-gold)] font-medium">
 {selectedOptions.length} of {currentQuestion.maxSelections || 3} selected
 </div>
 </div>

 <div className="grid grid-cols-1 gap-2 sm:gap-3">
 {currentQuestion.options?.map((option, index) => (
 <button
 key={index}
 onClick={() => handleMultiSelectToggle(option)}
 disabled={!selectedOptions.includes(option) && selectedOptions.length >= (currentQuestion.maxSelections || 3)}
 className={`w-full text-left p-3 sm:p-4 border-2 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 ${!selectedOptions.includes(option) && selectedOptions.length >= (currentQuestion.maxSelections || 3) ?'opacity-50 cursor-not-allowed' :'hover:shadow-lg'}`}
 style={{
 background: selectedOptions.includes(option) ?'var(--ud-gold-pale)' :'var(--ud-paper)',
 borderColor: selectedOptions.includes(option) ?'var(--ud-gold)' :'var(--ud-border)',
 color:'var(--ud-ink)'
 }}
 >
 <div className="flex items-center justify-between">
 <span className="font-medium text-xs sm:text-sm leading-relaxed pr-2">
 {option}
 </span>
 {selectedOptions.includes(option) && (
 <Check className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" style={{ color:'var(--ud-gold)' }} />
 )}
 </div>
 </button>
 ))}
 </div>

 {selectedOptions.length > 0 && (
 <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-[var(--ud-border)]">
 <button
 onClick={handleMultiSelectSubmit}
 className="ud-btn-primary w-full"
 style={{ border:'none' }}
 >
 Continue with Selected Options
 </button>
 </div>
 )}
 </div>
 );

 case'scale':
 return (
 <div className="space-y-6 sm:space-y-8">
 <div className="flex justify-between text-xs sm:text-sm text-[var(--ud-muted)] px-1 sm:px-2">
 <span className="font-medium text-center max-w-[45%] leading-tight">{currentQuestion.scaleLabels?.min ||'Not Important'}</span>
 <span className="font-medium text-center max-w-[45%] leading-tight">{currentQuestion.scaleLabels?.max ||'Very Important'}</span>
 </div>
 <div className="grid grid-cols-5 md:grid-cols-10 gap-1 sm:gap-2">
 {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
 <button
 key={value}
 onClick={() => handleAnswer(value)}
 className="aspect-square border-2 rounded-lg sm:rounded-xl transition-all duration-300 font-semibold transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center text-sm sm:text-base"
 style={{ background:'var(--ud-paper)', borderColor:'var(--ud-border)', color:'var(--ud-ink)' }}
 >
 {value}
 </button>
 ))}
 </div>
 <div className="text-center text-xs sm:text-sm text-[var(--ud-muted)]">
 Select a number from 1-10 that best represents your preference
 </div>
 </div>
 );

 case'ranking':
 return (
 <div className="space-y-3 sm:space-y-4">
 <p className="text-[var(--ud-muted)] mb-4 sm:mb-6 text-sm sm:text-base">Drag to rank these options in order of preference (most preferred first):</p>
 <div className="space-y-2 sm:space-y-3">
 {currentQuestion.options?.map((option, index) => (
 <div
 key={index}
 className="p-3 sm:p-4 border-2 border-[var(--ud-border)] rounded-lg cursor-move hover:border-[var(--ud-gold)] transition-colors"
 >
 <span className="flex items-center">
 <span className="w-6 h-6 sm:w-8 sm:h-8 bg-[var(--ud-gold-pale)] rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold mr-2 sm:mr-3 text-[var(--ud-muted)]">
 {index + 1}
 </span>
 <span className="text-sm sm:text-base text-[var(--ud-ink)]">{option}</span>
 </span>
 </div>
 ))}
 </div>
 <button
 onClick={() => handleAnswer(currentQuestion.options)}
 className="ud-btn-primary w-full"
 style={{ border:'none' }}
 >
 Confirm Ranking
 </button>
 </div>
 );

 default:
 return null;
 }
 };

 const getCategoryIcon = (category: string) => {
 switch (category) {
 case'personality': return Brain;
 case'skills': return Target;
 case'values': return Heart;
 case'environment': return Lightbulb;
 case'preferences': return Settings;
 default: return Brain;
 }
 };

 const getCategoryColor = (category: string) => {
 switch (category) {
 case'personality': return'bg-[var(--ud-gold-pale)] text-[var(--ud-gold)]';
 case'skills': return'bg-[var(--ud-gold-pale)] text-[var(--ud-ink)]';
 case'values': return'bg-[var(--ud-gold-pale)] text-[var(--ud-ink)]';
 case'environment': return'bg-[var(--ud-gold-pale)] text-[var(--ud-ink)]';
 case'preferences': return'bg-[var(--ud-gold-pale)] text-[var(--ud-ink)]';
 default: return'bg-[var(--ud-gold-pale)] text-[var(--ud-muted)]';
 }
 };

 if (isComplete) {
 return (
 <div className="min-h-screen flex items-center justify-center px-3 ud-main">
 <div className="text-center max-w-md mx-auto">
 <div className="relative mb-6 sm:mb-8">
 <div className="animate-spin rounded-full h-24 w-24 sm:h-32 sm:w-32 border-4 mx-auto" style={{ borderColor:'var(--ud-gold-pale)' }}></div>
 <div className="animate-spin rounded-full h-24 w-24 sm:h-32 sm:w-32 border-t-4 mx-auto absolute top-0 left-1/2 transform -translate-x-1/2" style={{ borderTopColor:'var(--ud-gold)' }}></div>
 </div>
 <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4" style={{ fontFamily:'var(--ud-serif)', color:'var(--ud-ink)' }}>Analyzing Your Responses...</h2>
 <p className="text-lg sm:text-xl mb-2" style={{ color:'var(--ud-muted)' }}>Our AI is processing your unique profile</p>
 <p className="text-sm sm:text-base" style={{ color:'var(--ud-muted)' }}>Finding your perfect career matches from 1800+ options</p>
 <div className="mt-6 sm:mt-8 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border" style={{ background:'var(--ud-paper)', borderColor:'var(--ud-border)' }}>
 <div className="flex items-center justify-center space-x-2 sm:space-x-4 text-xs sm:text-sm" style={{ color:'var(--ud-ink)' }}>
 <div className="flex items-center space-x-1 sm:space-x-2">
 <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full animate-pulse" style={{ background:'var(--ud-gold)' }}></div>
 <span>Personality Analysis</span>
 </div>
 <div className="flex items-center space-x-1 sm:space-x-2">
 <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full animate-pulse delay-300" style={{ background:'var(--ud-gold)' }}></div>
 <span>Skills Matching</span>
 </div>
 <div className="flex items-center space-x-1 sm:space-x-2">
 <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full animate-pulse delay-700" style={{ background:'var(--ud-gold)' }}></div>
 <span>Career Scoring</span>
 </div>
 </div>
 </div>
 </div>
 </div>
 );
 }

 const CategoryIcon = getCategoryIcon(currentQuestion.category);
 const progressPercentage = ((currentQuestionIndex + 1) / questionStack.length) * 100;

 return (
 <div className="min-h-screen py-4 sm:py-8 ud-main">
 <Helmet>
 <title>Free AI Career Assessment India — Discover Your Ideal Career | Uddisha</title>
 <meta name="description" content="Take our free AI-powered career assessment. Answer 20 smart questions and get matched to careers from 1800+ options based on your personality, skills, and values. Used by 50,000+ Indian students." />
 <meta name="keywords" content="free career test India, career aptitude test, career quiz India, AI career assessment, career counseling test, free career guidance, stream selector test, career options test, Uddisha" />
 <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
 <link rel="canonical" href="https://www.uddisha.com/assessment" />
 {/* Open Graph */}
 <meta property="og:title" content="Free AI Career Assessment — Find Your Perfect Career | Uddisha" />
 <meta property="og:description" content="Answer 20 questions. Get matched to 1800+ career options. Free, instant, AI-powered career guidance for Indian students." />
 <meta property="og:type" content="website" />
 <meta property="og:url" content="https://www.uddisha.com/assessment" />
 <meta property="og:image" content="https://www.uddisha.com/favicons/android-chrome-512x512.png" />
 <meta property="og:site_name" content="Uddisha" />
 {/* Twitter Card */}
 <meta name="twitter:card" content="summary_large_image" />
 <meta name="twitter:title" content="Free AI Career Assessment India | Uddisha" />
 <meta name="twitter:description" content="Free career test for Indian students. AI-powered, instant results, 1800+ career options. Take it now!" />
 {/* SoftwareApplication Schema */}
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
"@context":"https://schema.org",
"@type":"SoftwareApplication",
"name":"Uddisha AI Career Assessment",
"applicationCategory":"EducationalApplication",
"operatingSystem":"Web",
"url":"https://www.uddisha.com/assessment",
"description":"Free AI-powered career assessment tool for Indian students. Analyzes personality, skills, and values to match users with ideal careers from a database of 1800+ options.",
"offers": {
"@type":"Offer",
"price":"0",
"priceCurrency":"INR"
 },
"aggregateRating": {
"@type":"AggregateRating",
"ratingValue":"4.9",
"ratingCount":"10000",
"bestRating":"5"
 },
"author": {
"@type":"Organization",
"name":"Uddisha",
"url":"https://www.uddisha.com"
 }
 }) }} />
 {/* Quiz Schema */}
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
"@context":"https://schema.org",
"@type":"Quiz",
"name":"Uddisha Free AI Career Assessment",
"description":"A 20-question adaptive career assessment that uses AI to match you with ideal careers from 1800+ options based on your personality, skills, interests, and values.",
"url":"https://www.uddisha.com/assessment",
"educationalLevel":"High School and Above",
"about": {
"@type":"Thing",
"name":"Career Guidance"
 },
"provider": {
"@type":"Organization",
"name":"Uddisha",
"url":"https://www.uddisha.com"
 }
 }) }} />
 {/* BreadcrumbList */}
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
"@context":"https://schema.org",
"@type":"BreadcrumbList",
"itemListElement": [
 {"@type":"ListItem","position": 1,"name":"Home","item":"https://www.uddisha.com/" },
 {"@type":"ListItem","position": 2,"name":"Free Career Assessment","item":"https://www.uddisha.com/assessment" }
 ]
 }) }} />
 </Helmet>
 <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8">
 {/* Progress Section - NOW WITH DYNAMIC MESSAGES */}
 <div className="mb-6 sm:mb-8">
 <div className="flex justify-between items-center mb-3 sm:mb-4">
 <div className="flex items-center space-x-2 sm:space-x-3">
 <span className="text-sm sm:text-lg font-semibold text-[var(--ud-muted)]">
 Question {currentQuestionIndex + 1} of {questionStack.length}
 </span>
 <div className={`inline-flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getCategoryColor(currentQuestion.category)}`}>
 <CategoryIcon className="h-3 w-3 sm:h-4 sm:w-4" />
 <span className="capitalize hidden sm:inline">{currentQuestion.category}</span>
 </div>
 </div>
 <span className="text-sm sm:text-lg font-bold text-[var(--ud-gold)]">
 {Math.round(progressPercentage)}%
 </span>
 </div>

 {/* Enhanced Progress Bar with Dynamic Messages - FIXED */}
 <div className="relative progress-bar-container">
 <div className="w-full rounded-full h-2 sm:h-3 overflow-hidden" style={{ background:'var(--ud-gold-pale)' }}>
 <div
 className="h-2 sm:h-3 rounded-full transition-all duration-500 ease-out relative"
 style={{ width: `${progressPercentage}%`, background:'var(--ud-gold)' }}
 >
 <div className="absolute inset-0 bg-[var(--ud-paper)] opacity-30 animate-pulse"></div>
 </div>
 </div>

 {/* DYNAMIC PROGRESS MESSAGES - NOW PROPERLY DISPLAYED */}
 <div className="flex justify-between mt-2 sm:mt-3 text-xs sm:text-sm">
 <span className="font-medium text-[var(--ud-gold)] animate-pulse">
 {getProgressStartText(currentQuestionIndex + 1)}
 </span>
 <span className="font-medium text-[var(--ud-ink)] animate-pulse">
 {getProgressEndText(currentQuestionIndex + 1, questionStack.length)}
 </span>
 </div>
 </div>
 </div>

 {/* Question Card - Mobile Optimized with scroll control */}
 <div
 ref={questionContainerRef}
 className="rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 md:p-12 border"
 style={{ background:'var(--ud-paper)', borderColor:'var(--ud-border)' }}
 >
 {/* Question Header - Mobile Optimized with Dynamic Message */}
 <div className="text-center mb-6 sm:mb-8">
 <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 shadow-lg" style={{ background:'var(--ud-gold)' }}>
 <CategoryIcon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
 </div>
 <h1 className="text-lg sm:text-2xl md:text-3xl font-medium leading-tight mb-3 sm:mb-4 px-2" style={{ fontFamily:'var(--ud-serif)', color:'var(--ud-ink)' }}>
 {currentQuestion.text}
 </h1>

 {/* Dynamic Progress Message in Header - ADDED */}
 <div className="mb-4 sm:mb-6">
 <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-full border" style={{ background:'var(--ud-gold-pale)', borderColor:'var(--ud-border)' }}>
 <span className="text-sm sm:text-base font-medium" style={{ color:'var(--ud-ink)' }}>
 {getProgressStartText(currentQuestionIndex + 1)}
 </span>
 <span className="text-xs sm:text-sm" style={{ color:'var(--ud-muted)' }}>
 • {getProgressEndText(currentQuestionIndex + 1, questionStack.length)}
 </span>
 </div>
 </div>

 {currentQuestion.type ==='multiple' && (
 <p className="text-sm sm:text-base" style={{ color:'var(--ud-muted)' }}>Choose the option that best describes you:</p>
 )}
 </div>

 {/* Answer Options */}
 <div className="mb-6 sm:mb-8">
 {renderQuestion()}
 </div>

 {/* Navigation - Mobile Optimized */}
 <div className="flex justify-between items-center pt-4 sm:pt-6 border-t" style={{ borderColor:'var(--ud-border)' }}>
 <button
 onClick={handlePrevious}
 disabled={currentQuestionIndex === 0}
 className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all text-sm sm:text-base ${currentQuestionIndex === 0
 ?'opacity-50 cursor-not-allowed'
 :'hover:bg-[#f5edda]'
 }`}
 style={{ color:'var(--ud-ink)' }}
 >
 <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
 <span>Previous</span>
 </button>

 <div className="text-center">
 <p className="text-xs sm:text-sm text-[var(--ud-muted)] mb-1">
 Enhanced assessment with multiple selections
 </p>
 <div className="flex items-center justify-center space-x-1">
 {[...Array(Math.min(5, questionStack.length))].map((_, i) => (
 <div
 key={i}
 className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors`}
 style={{ background: i <= currentQuestionIndex ?'var(--ud-gold)' :'var(--ud-gold-pale)' }}
 />
 ))}
 {questionStack.length > 5 && (
 <span className="text-xs text-[var(--ud-muted)] ml-1 sm:ml-2">+{questionStack.length - 5} more</span>
 )}
 </div>
 </div>

 <div className="w-16 sm:w-24"></div> {/* Spacer for alignment */}
 </div>
 </div>

 {/* Assessment Info - Mobile Optimized */}
 <div className="mt-6 sm:mt-8 text-center">
 <div className="rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border" style={{ background:'var(--ud-paper)', borderColor:'var(--ud-border)' }}>
 <h3 className="font-semibold mb-2 text-sm sm:text-base" style={{ fontFamily:'var(--ud-serif)', color:'var(--ud-ink)' }}>Advanced AI Career Matching</h3>
 <p className="text-xs sm:text-sm leading-relaxed" style={{ color:'var(--ud-muted)' }}>
 Our intelligent assessment analyzes your responses across multiple dimensions to match you
 with careers from our database of 1800+ options. Multiple selection questions provide deeper insights.
 </p>
 <div className="flex items-center justify-center space-x-3 sm:space-x-6 mt-3 sm:mt-4 text-xs font-medium" style={{ color:'var(--ud-ink)' }}>
 <div className="flex items-center space-x-1">
 <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full" style={{ background:'var(--ud-gold)' }}></div>
 <span>Personality</span>
 </div>
 <div className="flex items-center space-x-1">
 <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full" style={{ background:'var(--ud-gold)' }}></div>
 <span>Skills</span>
 </div>
 <div className="flex items-center space-x-1">
 <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full" style={{ background:'var(--ud-gold)' }}></div>
 <span>Values</span>
 </div>
 <div className="flex items-center space-x-1">
 <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-600 rounded-full" style={{ background:'var(--ud-gold)' }}></div>
 <span>Environment</span>
 </div>
 </div>
 </div>
 </div>
 </div>

 {/* Celebratory Modal */}
 {showCelebration && celebrationData && (
 <CelebratoryModal
 isOpen={showCelebration}
 onClose={closeCelebration}
 questionsCompleted={celebrationData.questionsCompleted}
 totalQuestions={celebrationData.totalQuestions}
 milestone={celebrationData.milestone}
 />
 )}
 </div>
 );
};

export default AssessmentPage;

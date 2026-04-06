import React, { useState, memo } from'react';
import { X, Brain, Calculator, Palette, Microscope, Code, Heart, Scale, Wrench } from'lucide-react';

interface StreamSelectorProps {
 isOpen: boolean;
 onClose: () => void;
}

interface Question {
 id: number;
 text: string;
 options: {
 text: string;
 streams: { [key: string]: number };
 }[];
}

interface StreamResult {
 name: string;
 score: number;
 icon: React.ComponentType<any>;
 color: string;
 description: string;
 careers: string[];
 nextSteps: string[];
}

// Memoized OptionButton to prevent re-renders and reduce lag
const OptionButton = memo(({ option, onSelect }: { option: Question['options'][0], onSelect: () => void }) => (
 <button
 onClick={onSelect}
 className="w-full text-left p-4 sm:p-6 border-2 border-[var(--ud-border)] rounded-lg sm:rounded-xl hover:border-[var(--ud-gold)] hover:bg-[var(--ud-gold-pale)] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg group"
 >
 <div className="flex items-center justify-between">
 <span className="text-[var(--ud-ink)] group-hover:text-[var(--ud-gold)] font-medium text-sm sm:text-base leading-relaxed pr-2">
 {option.text}
 </span>
 <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 border-2 border-[var(--ud-border)] rounded-full group-hover:border-[var(--ud-gold)] transition-colors"></div>
 </div>
 </button>
));

interface Option {
 text: string;
 streams: {
 [key: string]: number;
 };
}

const StreamSelector: React.FC<StreamSelectorProps> = ({ isOpen, onClose }) => {
 const [currentQuestion, setCurrentQuestion] = useState(0);
 const [answers, setAnswers] = useState<number[]>([]);
 const [showResults, setShowResults] = useState(false);
 const [streamScores, setStreamScores] = useState<{ [key: string]: number }>({});

 const questions: Question[] = [
 {
 id: 1,
 text:"What type of activities do you enjoy most in your free time?",
 options: [
 {
 text:"Reading about scientific discoveries and conducting experiments",
 streams: {"Science": 3,"Engineering": 2,"Medical": 2 }
 },
 {
 text:"Solving math puzzles and working with numbers",
 streams: {"Commerce": 3,"Engineering": 2,"Science": 1 }
 },
 {
 text:"Drawing, writing stories, or creating art",
 streams: {"Arts": 3,"Humanities": 2 }
 },
 {
 text:"Building or fixing things with my hands",
 streams: {"Engineering": 3,"Science": 1 }
 },
 {
 text:"Helping others and volunteering in community",
 streams: {"Humanities": 3,"Medical": 2,"Arts": 1 }
 }
 ]
 },
 {
 id: 2,
 text:"Which school subjects do you find most interesting?",
 options: [
 {
 text:"Physics, Chemistry, and Biology",
 streams: {"Science": 3,"Medical": 2,"Engineering": 2 }
 },
 {
 text:"Mathematics and Statistics",
 streams: {"Commerce": 3,"Engineering": 2,"Science": 2 }
 },
 {
 text:"History, Literature, and Languages",
 streams: {"Humanities": 3,"Arts": 2 }
 },
 {
 text:"Computer Science and Technology",
 streams: {"Engineering": 3,"Science": 2,"Commerce": 1 }
 },
 {
 text:"Economics and Business Studies",
 streams: {"Commerce": 3,"Humanities": 1 }
 }
 ]
 },
 {
 id: 3,
 text:"What kind of problems do you enjoy solving?",
 options: [
 {
 text:"Scientific mysteries and research questions",
 streams: {"Science": 3,"Medical": 2,"Engineering": 1 }
 },
 {
 text:"Mathematical equations and logical puzzles",
 streams: {"Commerce": 3,"Engineering": 2,"Science": 2 }
 },
 {
 text:"Creative challenges and artistic expression",
 streams: {"Arts": 3,"Humanities": 2 }
 },
 {
 text:"Technical problems and building solutions",
 streams: {"Engineering": 3,"Science": 2 }
 },
 {
 text:"Social issues and human behavior",
 streams: {"Humanities": 3,"Medical": 2,"Arts": 1 }
 }
 ]
 },
 {
 id: 4,
 text:"What type of work environment appeals to you?",
 options: [
 {
 text:"Laboratory or research facility",
 streams: {"Science": 3,"Medical": 2,"Engineering": 1 }
 },
 {
 text:"Corporate office or business setting",
 streams: {"Commerce": 3,"Humanities": 1 }
 },
 {
 text:"Creative studio or artistic workspace",
 streams: {"Arts": 3,"Humanities": 2 }
 },
 {
 text:"Hospital or healthcare facility",
 streams: {"Medical": 3,"Science": 1 }
 },
 {
 text:"Engineering firm or tech company",
 streams: {"Engineering": 3,"Science": 2,"Commerce": 1 }
 }
 ]
 },
 {
 id: 5,
 text:"Which activity would you choose for a group project?",
 options: [
 {
 text:"Conducting a scientific experiment",
 streams: {"Science": 3,"Medical": 2,"Engineering": 1 }
 },
 {
 text:"Creating a business plan",
 streams: {"Commerce": 3,"Humanities": 1 }
 },
 {
 text:"Making a documentary or creative presentation",
 streams: {"Arts": 3,"Humanities": 2 }
 },
 {
 text:"Building a working model or prototype",
 streams: {"Engineering": 3,"Science": 2 }
 },
 {
 text:"Organizing a community service project",
 streams: {"Humanities": 3,"Medical": 2,"Arts": 1 }
 }
 ]
 },
 {
 id: 6,
 text:"What motivates you most in your studies?",
 options: [
 {
 text:"Understanding how things work in nature",
 streams: {"Science": 3,"Medical": 2,"Engineering": 1 }
 },
 {
 text:"Learning about money, markets, and business",
 streams: {"Commerce": 3 }
 },
 {
 text:"Expressing creativity and emotions",
 streams: {"Arts": 3,"Humanities": 2 }
 },
 {
 text:"Helping people and making a difference",
 streams: {"Medical": 3,"Humanities": 2,"Arts": 1 }
 },
 {
 text:"Creating innovative solutions to problems",
 streams: {"Engineering": 3,"Science": 2,"Commerce": 1 }
 }
 ]
 },
 {
 id: 7,
 text:"Which career sounds most appealing to you?",
 options: [
 {
 text:"Research Scientist or Lab Technician",
 streams: {"Science": 3,"Medical": 1,"Engineering": 1 }
 },
 {
 text:"Business Analyst or Financial Advisor",
 streams: {"Commerce": 3,"Humanities": 1 }
 },
 {
 text:"Artist, Writer, or Designer",
 streams: {"Arts": 3,"Humanities": 2 }
 },
 {
 text:"Doctor, Nurse, or Therapist",
 streams: {"Medical": 3,"Science": 1,"Humanities": 1 }
 },
 {
 text:"Engineer or Software Developer",
 streams: {"Engineering": 3,"Science": 2,"Commerce": 1 }
 }
 ]
 },
 {
 id: 8,
 text:"How do you prefer to learn new things?",
 options: [
 {
 text:"Through experiments and hands-on research",
 streams: {"Science": 3,"Medical": 2,"Engineering": 2 }
 },
 {
 text:"By analyzing data and case studies",
 streams: {"Commerce": 3,"Science": 1,"Humanities": 1 }
 },
 {
 text:"Through creative projects and self-expression",
 streams: {"Arts": 3,"Humanities": 2 }
 },
 {
 text:"By helping others and practical application",
 streams: {"Medical": 3,"Humanities": 2,"Engineering": 1 }
 },
 {
 text:"Building and creating things from scratch",
 streams: {"Engineering": 3,"Science": 2,"Arts": 1 }
 }
 ]
 },
 {
 id: 9,
 text:"What type of books or content do you enjoy reading?",
 options: [
 {
 text:"Scientific journals and discovery articles",
 streams: {"Science": 3,"Medical": 2,"Engineering": 1 }
 },
 {
 text:"Business magazines and economic news",
 streams: {"Commerce": 3,"Humanities": 1 }
 },
 {
 text:"Novels, poetry, and creative literature",
 streams: {"Arts": 3,"Humanities": 3 }
 },
 {
 text:"Medical journals and health articles",
 streams: {"Medical": 3,"Science": 2 }
 },
 {
 text:"Technology blogs and innovation stories",
 streams: {"Engineering": 3,"Science": 2,"Commerce": 1 }
 }
 ]
 },
 {
 id: 10,
 text:"Which skill would you most like to develop?",
 options: [
 {
 text:"Advanced research and analytical thinking",
 streams: {"Science": 3,"Medical": 2,"Engineering": 1 }
 },
 {
 text:"Financial planning and business strategy",
 streams: {"Commerce": 3,"Humanities": 1 }
 },
 {
 text:"Creative design and artistic expression",
 streams: {"Arts": 3,"Humanities": 2 }
 },
 {
 text:"Patient care and medical knowledge",
 streams: {"Medical": 3,"Science": 1,"Humanities": 1 }
 },
 {
 text:"Technical problem-solving and innovation",
 streams: {"Engineering": 3,"Science": 2,"Commerce": 1 }
 }
 ]
 }
 ];

 const streamInfo: { [key: string]: StreamResult } = {
"Science": {
 name:"Science Stream",
 score: 0,
 icon: Microscope,
 color:"from-green-500 to-emerald-600",
 description:"Perfect for curious minds who love to explore, experiment, and understand the natural world through scientific inquiry.",
 careers: [
"Research Scientist","Data Scientist","Biotechnologist","Environmental Scientist",
"Physicist","Chemist","Biologist","Astronomer","Geologist","Marine Biologist"
 ],
 nextSteps: [
"Focus on Physics, Chemistry, Biology, and Mathematics",
"Participate in science fairs and research projects",
"Consider pursuing Bachelor's in Science (B.Sc) in your area of interest",
"Look for internships in research labs or scientific organizations"
 ]
 },
"Commerce": {
 name:"Commerce Stream",
 score: 0,
 icon: Calculator,
 color:"from-blue-500 to-indigo-600",
 description:"Ideal for analytical minds interested in business, finance, economics, and the world of commerce and trade.",
 careers: [
"Chartered Accountant","Financial Analyst","Investment Banker","Business Consultant",
"Marketing Manager","Economist","Auditor","Tax Consultant","Stock Broker","Entrepreneur"
 ],
 nextSteps: [
"Focus on Mathematics, Economics, Business Studies, and Accountancy",
"Develop analytical and numerical skills",
"Consider Bachelor's in Commerce (B.Com) or Business Administration (BBA)",
"Gain practical experience through internships in finance or business"
 ]
 },
"Arts": {
 name:"Arts Stream",
 score: 0,
 icon: Palette,
 color:"from-purple-500 to-pink-600",
 description:"Perfect for creative souls who express themselves through art, design, literature, and various forms of creative expression.",
 careers: [
"Graphic Designer","Writer","Journalist","Artist","Photographer",
"Film Director","Fashion Designer","Interior Designer","Animator","Art Therapist"
 ],
 nextSteps: [
"Focus on Fine Arts, Literature, and creative subjects",
"Build a strong portfolio of your creative work",
"Consider Bachelor's in Fine Arts (BFA) or related creative fields",
"Participate in art exhibitions, writing competitions, and creative workshops"
 ]
 },
"Humanities": {
 name:"Humanities Stream",
 score: 0,
 icon: Brain,
 color:"from-orange-500 to-red-600",
 description:"Great for those interested in human society, culture, history, psychology, and making a positive impact on communities.",
 careers: [
"Psychologist","Social Worker","Teacher","Lawyer","Historian",
"Anthropologist","Political Scientist","Counselor","Human Rights Activist","Diplomat"
 ],
 nextSteps: [
"Focus on History, Political Science, Psychology, and Sociology",
"Develop strong communication and analytical skills",
"Consider Bachelor's in Arts (BA) in your preferred subject",
"Engage in community service and social awareness programs"
 ]
 },
"Medical": {
 name:"Medical Stream",
 score: 0,
 icon: Heart,
 color:"from-red-500 to-rose-600",
 description:"Perfect for compassionate individuals who want to heal, help, and improve the health and wellbeing of others.",
 careers: [
"Doctor","Surgeon","Nurse","Pharmacist","Physiotherapist",
"Dentist","Veterinarian","Medical Researcher","Radiologist","Psychiatrist"
 ],
 nextSteps: [
"Focus on Biology, Chemistry, Physics, and Mathematics",
"Prepare for medical entrance exams (NEET, etc.)",
"Consider Bachelor's in Medicine (MBBS) or related health sciences",
"Volunteer at hospitals or healthcare facilities for experience"
 ]
 },
"Engineering": {
 name:"Engineering Stream",
 score: 0,
 icon: Wrench,
 color:"from-gray-500 to-slate-600",
 description:"Ideal for problem-solvers who love to build, design, and create innovative solutions using technology and engineering principles.",
 careers: [
"Software Engineer","Civil Engineer","Mechanical Engineer","Electrical Engineer",
"Computer Engineer","Aerospace Engineer","Chemical Engineer","Biomedical Engineer","Environmental Engineer","Robotics Engineer"
 ],
 nextSteps: [
"Focus on Physics, Chemistry, Mathematics, and Computer Science",
"Prepare for engineering entrance exams (JEE, etc.)",
"Consider Bachelor's in Engineering (B.Tech/B.E.) in your preferred branch",
"Work on technical projects and participate in coding competitions"
 ]
 }
 };

 const handleAnswer = (optionIndex: number) => {
 const newAnswers = [...answers, optionIndex];
 setAnswers(newAnswers);

 // Calculate scores
 const option = questions[currentQuestion].options[optionIndex];
 const newScores = { ...streamScores };

 Object.entries(option.streams).forEach(([stream, points]) => {
 newScores[stream] = (newScores[stream] || 0) + points;
 });

 setStreamScores(newScores);

 if (currentQuestion < questions.length - 1) {
 setCurrentQuestion(currentQuestion + 1);
 } else {
 // Show results
 setShowResults(true);
 }
 };

 const getTopStreams = (): StreamResult[] => {
 const streamsWithScores = Object.entries(streamScores).map(([name, score]) => ({
 ...streamInfo[name], // This could be undefined if name is not in streamInfo
 score: Number(score) || 0 // Explicitly convert to number with fallback
 }))
 // ✅ FIX: Filter out any invalid streams to prevent crashes from bad data.
 .filter(stream => stream.name);

 return streamsWithScores.sort((a, b) => b.score - a.score).slice(0, 3);
 };

 const resetAssessment = () => {
 setCurrentQuestion(0);
 setAnswers([]);
 setStreamScores({});
 setShowResults(false);
 };

 if (!isOpen) return null;

 return (
 <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
 {/* Scrollable container for the entire modal */}
 <div className="bg-[var(--ud-paper)] rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[95vh] overflow-y-auto shadow-2xl border border-[var(--ud-border)] hide-scrollbar">
 <div className="flex flex-col">
 {/* Header - now part of the scrollable content */}
 <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[var(--ud-border)] bg-[var(--ud-gold-pale)] rounded-t-2xl sm:rounded-t-3xl">
 <div className="flex items-center space-x-2 sm:space-x-3">
 <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[var(--ud-gold)] rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
 <Brain className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
 </div>
 <div>
 <h2 className="text-xl sm:text-2xl font-bold bg-[var(--ud-gold)] bg-clip-text text-transparent">
 🎯 Stream Selector
 </h2>
 <p className="text-xs sm:text-sm text-[var(--ud-muted)]">Find Your Perfect Academic Stream</p>
 </div>
 </div>
 <button
 onClick={onClose}
 className="p-2 rounded-full hover:bg-[var(--ud-gold-pale)] transition-colors"
 aria-label="Close"
 >
 <X className="h-6 w-6 text-[var(--ud-muted)]" />
 </button>
 </div>

 {/* Content Area */}
 <div className="flex-grow scroll-smooth">
 {!showResults ? (
 /* Questions */
 <div className="p-4 sm:p-8">
 {/* Progress */}
 <div className="mb-6 sm:mb-8">
 <div className="flex justify-between items-center mb-2">
 <span className="text-sm sm:text-base font-semibold text-[var(--ud-muted)]">
 Question {currentQuestion + 1} of {questions.length}
 </span>
 <span className="text-sm sm:text-base font-bold text-[var(--ud-gold)]">
 {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
 </span>
 </div>
 <div className="w-full bg-[var(--ud-gold-pale)] rounded-full h-2 sm:h-3">
 <div
 className="bg-[var(--ud-gold)] h-2 sm:h-3 rounded-full transition-all duration-500"
 style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
 ></div>
 </div>
 </div>

 {/* Question */}
 <div className="text-center mb-6 sm:mb-8">
 <h3 className="text-lg sm:text-2xl font-bold text-[var(--ud-ink)] mb-4 leading-tight">
 {questions[currentQuestion].text}
 </h3>
 <p className="text-[var(--ud-muted)] text-sm sm:text-base">Choose the option that best describes you:</p>
 </div>

 {/* Options */}
 <div className="space-y-3 sm:space-y-4">
 {questions[currentQuestion].options.map((option: Option, index: number) => (
 <OptionButton
 key={index}
 option={option}
 onSelect={() => handleAnswer(index)}
 />
 ))}
 </div>
 </div>
 ) : (
 /* Results */
 <div className="p-4 sm:p-8">
 <div className="text-center mb-6 sm:mb-8">
 <div className="inline-flex items-center space-x-2 bg-[var(--ud-gold-pale)] text-[var(--ud-ink)] px-3 sm:px-4 py-2 rounded-full mb-3 sm:mb-4">
 <div className="w-2 h-2 bg-green-600 rounded-full"></div>
 <span className="text-xs sm:text-sm font-medium">Assessment Complete</span>
 </div>
 <h3 className="text-2xl sm:text-3xl font-bold text-[var(--ud-ink)] mb-3 sm:mb-4">
 Your Recommended Streams
 </h3>
 <p className="text-[var(--ud-muted)] text-sm sm:text-base">
 Based on your responses, here are the academic streams that best match your interests and aptitudes:
 </p>
 </div>

 {/* Top Streams */}
 <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
 {getTopStreams().map((stream, index) => {
 const IconComponent = stream.icon;
 return (
 <div
 key={stream.name}
 className={`relative overflow-hidden rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 ${index === 0
 ?'border-[var(--ud-gold)] bg-[var(--ud-gold-pale)]'
 :'border-[var(--ud-border)] bg-[var(--ud-paper)]'
 } shadow-lg`}
 >
 {index === 0 && (
 <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
 🏆 Best Match
 </div>
 )}

 <div className="flex items-start space-x-3 sm:space-x-4 mb-4">
 <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${stream.color} rounded-xl flex items-center justify-center shadow-lg`}>
 <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
 </div>
 <div className="flex-1">
 <div className="flex items-center justify-between mb-2">
 <h4 className="text-lg sm:text-xl font-bold text-[var(--ud-ink)]">{stream.name}</h4>
 <div className="text-right">
 <div className="text-xl sm:text-2xl font-bold text-[var(--ud-ink)]">{stream.score}</div>
 <div className="text-xs text-[var(--ud-muted)]">Match Score</div>
 </div>
 </div>
 <p className="text-[var(--ud-muted)] text-sm sm:text-base mb-3">{stream.description}</p>
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 <div>
 <h5 className="font-semibold text-[var(--ud-ink)] mb-2 text-sm sm:text-base">Popular Careers:</h5>
 <div className="flex flex-wrap gap-1 sm:gap-2">
 {stream.careers.slice(0, 5).map((career, i) => (
 <span key={i} className="bg-[var(--ud-gold-pale)] text-[var(--ud-muted)] px-2 py-1 rounded text-xs">
 {career}
 </span>
 ))}
 {stream.careers.length > 5 && (
 <span className="text-[var(--ud-muted)] text-xs px-2 py-1">
 +{stream.careers.length - 5} more
 </span>
 )}
 </div>
 </div>
 <div>
 <h5 className="font-semibold text-[var(--ud-ink)] mb-2 text-sm sm:text-base">Next Steps:</h5>
 <ul className="space-y-1">
 {stream.nextSteps.slice(0, 2).map((step, i) => (
 <li key={i} className="flex items-start space-x-2 text-xs sm:text-sm text-[var(--ud-muted)]">
 <div className="w-1.5 h-1.5 bg-[var(--ud-gold)] rounded-full mt-1.5 flex-shrink-0"></div>
 <span>{step}</span>
 </li>
 ))}
 </ul>
 </div>
 </div>
 </div>
 );
 })}
 </div>

 {/* Call to Action */}
 <div className="bg-[var(--ud-gold-pale)] rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center border border-[var(--ud-gold)]">
 <h4 className="text-lg sm:text-xl font-bold text-[var(--ud-ink)] mb-2 sm:mb-3">
 Ready to Explore Your Career Path?
 </h4>
 <p className="text-[var(--ud-muted)] mb-4 sm:mb-6 text-sm sm:text-base">
 Now that you know your ideal stream, take our comprehensive AI-powered career assessment
 to discover specific careers that match your unique profile!
 </p>
 <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
 <button
 onClick={() => {
 onClose();
 // Navigate to assessment
 window.location.href ='/assessment';
 }}
 className="bg-[var(--ud-gold)] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl hover:shadow-lg transition-all duration-300 font-medium text-sm sm:text-base"
 >
 Take Career Assessment
 </button>
 <button
 onClick={resetAssessment}
 className="bg-[var(--ud-paper)] text-[var(--ud-muted)] px-6 sm:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl border-2 border-[var(--ud-border)] hover:border-[var(--ud-gold)] hover:shadow-lg transition-all duration-300 font-medium text-sm sm:text-base"
 >
 Retake Stream Test
 </button>
 </div>
 </div>
 </div>
 )}
 </div>
 </div>
 </div>
 </div>
 );
};

export default StreamSelector;

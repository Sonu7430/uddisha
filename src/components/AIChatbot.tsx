import React, { useState, useRef, useEffect } from'react';
import { MessageCircle, Send, X, User, Cat, Minimize2, Maximize2, AlertCircle, CheckCircle, Star } from 'lucide-react';

interface Message {
 id: string;
 text: string;
 isUser: boolean;
 timestamp: Date;
 source?: string;
}

const AIChatbot = () => {
 const [isOpen, setIsOpen] = useState(false);
 const [isMinimized, setIsMinimized] = useState(false);
 const [messages, setMessages] = useState<Message[]>([]);
 const [inputText, setInputText] = useState('');
 const [isLoading, setIsLoading] = useState(false);
 const [isTyping, setIsTyping] = useState(false);
 const [connectionStatus, setConnectionStatus] = useState<'checking' |'connected' |'fallback'>('checking');
 const messagesEndRef = useRef<HTMLDivElement>(null);
 const inputRef = useRef<HTMLInputElement>(null);

 // Template questions for career guidance
 const templateQuestions = [
"What career suits my personality?",
"How do I choose the right career path?",
"What skills are in demand for tech careers?",
"How to transition to a new career field?",
"What are the highest paying careers?",
"How to improve my resume for job applications?",
"What careers have good work-life balance?",
"How to prepare for career interviews?",
"What are emerging career opportunities?",
"How to develop leadership skills?"
 ];

 // ✅ COMPLETELY FIXED: HTML response cleaning function with PROPER REGEX
 const cleanHtmlResponse = (text: string): string => {
 if (!text) return'';

 let cleaned = text
 // Remove markdown code block syntax for html
 .replace(/```html\s*([\s\S]*?)```/gi,'$1')
 // Remove generic markdown code block syntax
 .replace(/```\s*([\s\S]*?)```/gi,'$1')
 // Remove"html" if it appears at the very start (common artifact)
 .replace(/^\s*html\s*/i,'')
 .trim();

 // If the response doesn't contain HTML tags, wrap in <p>
 // This handles plain text responses gracefully
 if (!cleaned.includes('<') && !cleaned.includes('>')) {
 return `<p>${cleaned}</p>`;
 }

 return cleaned;
 };

 // Check AI connection status on component mount
 useEffect(() => {
 checkAIConnection();
 }, []);

 // Initial welcome message with proper formatting
 useEffect(() => {
 if (isOpen && messages.length === 0) {
 const welcomeMessage: Message = {
 id: Date.now().toString(),
 text:"<h2>👋 Welcome to Disha Uddisha!</h2><p>Hi there! I'm <strong>Disha</strong>, your AI Career Assistant. I'm here to help you with:</p><ul><li><strong>Career guidance</strong> and exploration</li><li><strong>Job search tips</strong> and strategies</li><li><strong>Skill development</strong> recommendations</li><li><strong>Resume and interview</strong> preparation</li><li><strong>Salary information</strong> and career paths</li></ul><p>💡 <strong>How can I assist you today?</strong> Feel free to ask me anything about your career journey!</p>",
 isUser: false,
 timestamp: new Date(),
 source:'system'
 };
 setMessages([welcomeMessage]);
 }
 }, [isOpen, messages.length]);

 // Scroll to bottom when new messages arrive
 useEffect(() => {
 scrollToBottom();
 }, [messages]);

 const scrollToBottom = () => {
 messagesEndRef.current?.scrollIntoView({ behavior:'smooth' });
 };

 // Check AI connection status
 const checkAIConnection = async () => {
 try {
 const response = await fetch('/.netlify/functions/chat', {
 method:'POST',
 headers: {
'Content-Type':'application/json',
 },
 body: JSON.stringify({
 message:'test connection'
 })
 });

 if (response.ok) {
 const data = await response.json();
 if (data.fallback) {
 setConnectionStatus('fallback');
 } else {
 setConnectionStatus('connected');
 }
 } else {
 setConnectionStatus('fallback');
 }
 } catch (error) {
 console.log('AI connection check failed, using fallback mode');
 setConnectionStatus('fallback');
 }
 };

 // Enhanced AI API call with comprehensive error handling
 const callAIAPI = async (userMessage: string): Promise<{ text: string; source: string }> => {
 try {
 // Try Netlify Functions
 const response = await fetch('/.netlify/functions/chat', {
 method:'POST',
 headers: {
'Content-Type':'application/json',
 },
 body: JSON.stringify({
 message: `You are Disha, an AI career coach. Respond with clean HTML markup only. Do NOT include any code block markers like \`\`\`html or \`\`\` or the word"html" at the start. Use this structure:
- <h2> for main headings
- <h3> for sub-headings 
- <ul><li> for bullet points
- <ol><li> for numbered steps
- <p> for paragraphs
- <strong> for emphasis
- <em> for italics

Return ONLY the HTML content directly without any wrapper text.

User question: ${userMessage}`
 })
 });

 if (response.ok) {
 const data = await response.json();
 if (data.response) {
 // Clean the response to remove any markdown code blocks
 const cleanedResponse = cleanHtmlResponse(data.response);
 return {
 text: cleanedResponse,
 source: data.fallback ?'intelligent-fallback' :'ai'
 };
 }
 }

 // If API fails, use intelligent fallback
 return {
 text: getIntelligentMockResponse(userMessage),
 source:'local-fallback'
 };

 } catch (error) {
 console.error('AI API Error:', error);
 return {
 text: getIntelligentMockResponse(userMessage),
 source:'local-fallback'
 };
 }
 };

 // Enhanced intelligent mock responses with comprehensive career guidance
 const getIntelligentMockResponse = (userMessage: string): string => {
 const message = userMessage.toLowerCase();

 // ENHANCED GREETING RESPONSES with proper formatting
 if (message.includes('hi') || message.includes('hello') || message.includes('hey') ||
 message.includes('disha') || message.includes('good morning') || message.includes('good afternoon') ||
 message.includes('good evening') || message.includes('how are you')) {
 return"<h2>👋 Hello there!</h2><p>Great to meet you! I'm <strong>Disha</strong>, your dedicated <strong>AI Career Coach</strong>. I'm here and ready to help you with:</p><ul><li><strong>Career exploration</strong> - Find careers that match your interests and personality</li><li><strong>Job search guidance</strong> - Tips for finding and landing your dream job</li><li><strong>Resume optimization</strong> - Creating compelling resumes that get noticed</li><li><strong>Interview preparation</strong> - Ace your next interview with confidence</li><li><strong>Salary insights</strong> - Know your worth in the job market</li><li><strong>Skill development</strong> - Build in-demand skills for career growth</li></ul><p>💼 <strong>What aspect of your career journey would you like to explore today?</strong></p><p><em>Feel free to ask me anything - I'm here to help you succeed and reach your career goals!</em> ✨</p>";
 }

 // THANK YOU RESPONSES with enhanced formatting
 if (message.includes('thank') || message.includes('thanks') || message.includes('appreciate')) {
 return"<h2>🙏 You're Very Welcome!</h2><p>I'm so glad I could help! That's exactly what I'm here for.</p><p><strong>Remember these important points:</strong></p><ul><li>Your <strong>career journey</strong> is unique and valuable</li><li>Every step forward is <strong>progress worth celebrating</strong></li><li>I'm always here when you need <strong>guidance and support</strong></li></ul><p>💡 <strong>Feel free to come back anytime</strong> with more questions about:</p><ul><li><strong>Career planning</strong> and exploration</li><li><strong>Job search strategies</strong> and techniques</li><li><strong>Professional development</strong> opportunities</li><li><strong>Interview and resume tips</strong></li></ul><p><em>Wishing you all the best in your career journey!</em> 🌟</p>";
 }

 // Career personality matching
 if (message.includes('career') && (message.includes('personality') || message.includes('suits me') || message.includes('match'))) {
 return"<h2>🎯 Career-Personality Matching</h2><p>Your <strong>personality</strong> plays a crucial role in career satisfaction. Consider these general guidelines:</p><ul><li><strong>Analytical minds:</strong> Thrive in data science, research, engineering, or finance</li><li><strong>Creative personalities:</strong> Excel in design, marketing, writing, or arts</li><li><strong>People-oriented individuals:</strong> Succeed in healthcare, education, sales, or counseling</li><li><strong>Detail-focused people:</strong> Do well in accounting, law, project management, or quality assurance</li></ul><p>💡 <strong>Want a personalized assessment?</strong> Take our comprehensive career assessment to discover careers that match your unique traits!</p>";
 }

 // Technology and programming careers
 if (message.includes('tech') || message.includes('technology') || message.includes('programming') || message.includes('software') || message.includes('coding')) {
 return"<h2>💻 Technology Career Opportunities</h2><p>Technology offers <strong>incredible career opportunities</strong>! High-demand skills include:</p><ul><li><strong>Programming:</strong> Python, JavaScript, React, Node.js</li><li><strong>Cloud Computing:</strong> AWS, Azure, Google Cloud platforms</li><li><strong>Data Science & AI:</strong> Machine learning and analytics</li><li><strong>Cybersecurity:</strong> Network and information security</li><li><strong>Mobile Development:</strong> iOS and Android applications</li><li><strong>DevOps:</strong> Automation and deployment systems</li></ul><p><strong>💰 Salary Range:</strong> Entry-level roles start at <strong>$60k-80k</strong> and can grow to Senior positions at <strong>$120k-200k+</strong></p><p>🌐 The field offers <strong>excellent remote work opportunities</strong>! Want to see detailed tech career paths and salary information? Visit our <em>All Careers</em> section for comprehensive career data.</p>";
 }

 // Resume and job applications 
 if (message.includes('resume') || message.includes('cv') || message.includes('application') || message.includes('apply')) {
 return"<h2>📄 Creating a Winning Resume</h2><p>Here's your <strong>step-by-step guide</strong> to resume success:</p><ol><li><strong>Tailor it:</strong> Customize for each job posting using relevant keywords</li><li><strong>Use action verbs:</strong> Quantify achievements (increased sales by 25%, managed team of 10)</li><li><strong>Keep it concise:</strong> 1-2 pages maximum</li><li><strong>Professional summary:</strong> Include a compelling overview</li><li><strong>Skills section:</strong> List relevant skills and certifications</li><li><strong>Clean format:</strong> Use ATS-friendly design</li><li><strong>Proofread:</strong> Check for errors carefully</li></ol><p><em>Focus on <strong>results and impact</strong> rather than just duties.</em> Our website offers detailed resume templates and examples for different career fields!</p>";
 }

 // Interview preparation
 if (message.includes('interview') || message.includes('job interview') || message.includes('prepare')) {
 return"<h2>🎯 Interview Success Strategy</h2><p><strong>Interview success</strong> comes from thorough preparation! Follow these key steps:</p><ol><li><strong>Company research:</strong> Study mission, values, recent news, and competitors</li><li><strong>Practice responses:</strong> Use the STAR method (Situation, Task, Action, Result)</li><li><strong>Prepare examples:</strong> Have specific achievements ready to share</li><li><strong>Dress appropriately:</strong> Match the company culture</li><li><strong>Prepare questions:</strong> Ask about role growth and opportunities</li></ol><p>💡 <strong>Pro tip:</strong> Practice with friends, arrive early, and remember that <strong>confidence comes from preparation</strong>!</p>";
 }

 // Salary and compensation
 if (message.includes('salary') || message.includes('pay') || message.includes('money') || message.includes('income') || message.includes('wage')) {
 return"<h2>💰 Career Salary Information</h2><p>Here are <strong>average salary ranges</strong> across popular career fields:</p><ul><li><strong>Software Engineering:</strong> $85k - $200k+</li><li><strong>Data Science:</strong> $95k - $185k+</li><li><strong>Healthcare (RN):</strong> $65k - $120k+</li><li><strong>Marketing:</strong> $45k - $120k+</li><li><strong>Finance:</strong> $65k - $260k+</li><li><strong>Engineering:</strong> $75k - $155k+</li><li><strong>Project Management:</strong> $70k - $140k+</li></ul><p><em>*Salaries vary by location, experience, and company size</em></p><p>🔍 <strong>Want to see other profession salaries?</strong> Check out our comprehensive <em>All Careers</em> section for detailed salary information across hundreds of career fields!</p>";
 }

 // Default comprehensive response with enhanced formatting
 return"<h2>🌟 Welcome to Your Career Journey!</h2><p>I'm here to help with <strong>all aspects</strong> of your professional development:</p><ul><li><strong>Career exploration</strong> and personality matching</li><li><strong>Job search strategies</strong> and application tips</li><li><strong>Resume writing</strong> and interview preparation</li><li><strong>Salary negotiation</strong> and compensation data</li><li><strong>Skill development</strong> and learning paths</li><li><strong>Career transitions</strong> and pivoting advice</li><li><strong>Work-life balance</strong> and workplace culture</li><li><strong>Networking</strong> and professional growth</li></ul><p>Whether you're <strong>just starting out</strong>, looking to <strong>advance</strong>, or considering a <strong>career change</strong>, I'm here to provide personalized guidance.</p><p><strong>What specific aspect of your career would you like to explore?</strong></p><p><em>Try asking me about specific careers, salary ranges, or career advice!</em> 💼</p>";
 };

 const handleSendMessage = async () => {
 if (!inputText.trim() || isLoading) return;

 const userMessage: Message = {
 id: Date.now().toString(),
 text: inputText.trim(),
 isUser: true,
 timestamp: new Date()
 };

 setMessages(prev => [...prev, userMessage]);
 setInputText('');
 setIsLoading(true);
 setIsTyping(true);

 try {
 const { text: aiResponse, source } = await callAIAPI(userMessage.text);

 // Simulate typing delay for better UX
 setTimeout(() => {
 const aiMessage: Message = {
 id: (Date.now() + 1).toString(),
 text: cleanHtmlResponse(aiResponse), // Clean the response
 isUser: false,
 timestamp: new Date(),
 source
 };

 setMessages(prev => [...prev, aiMessage]);
 setIsLoading(false);
 setIsTyping(false);
 }, 1000);
 } catch (error) {
 setIsLoading(false);
 setIsTyping(false);

 // ERROR MESSAGE with proper formatting
 const errorMessage: Message = {
 id: (Date.now() + 1).toString(),
 text:"<h2>🔧 Technical Assistance</h2><p>I'm here to help with your <strong>career questions</strong>! While I'm experiencing some technical difficulties, I can still provide comprehensive career guidance.</p><ul><li><strong>Career exploration</strong> and matching</li><li><strong>Job search strategies</strong></li><li><strong>Resume and interview tips</strong></li><li><strong>Salary information</strong></li><li><strong>Professional development</strong></li></ul><p><strong>What would you like to know about careers, job searching, or professional development?</strong></p>",
 isUser: false,
 timestamp: new Date(),
 source:'error-fallback'
 };

 setMessages(prev => [...prev, errorMessage]);
 }
 };

 const handleKeyPress = (e: React.KeyboardEvent) => {
 if (e.key ==='Enter' && !e.shiftKey) {
 e.preventDefault();
 handleSendMessage();
 }
 };

 const handleTemplateQuestion = (question: string) => {
 setInputText(question);
 inputRef.current?.focus();
 };

 const formatTime = (date: Date) => {
 return date.toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' });
 };

 const getStatusIcon = () => {
 switch (connectionStatus) {
 case'connected':
 return <CheckCircle className="h-2 w-2 text-green-500" />;
 case'fallback':
 return <AlertCircle className="h-2 w-2 text-yellow-500" />;
 default:
 return <div className="w-2 h-2 bg-[var(--ud-gold-pale)]0 rounded-full animate-pulse" />;
 }
 };

 const getStatusText = () => {
 switch (connectionStatus) {
 case'connected':
 return'AI Enhanced';
 case'fallback':
 return'Smart Mode';
 default:
 return'Connecting...';
 }
 };

 return (
 <>
 {/* Chat Toggle Button */}
 {!isOpen && (
 <button
 onClick={() => setIsOpen(true)}
 className="fixed bottom-24 right-4 sm:bottom-32 sm:right-6 text-white p-3 sm:p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 z-40 group animate-pulse hover:animate-none flex items-center justify-center"
 aria-label="Open AI Chatbot"
 style={{ background:'var(--ud-ink)' }}
 >
 <div className="relative">
 <Cat className="h-5 w-5 sm:h-6 sm:w-6" />
 <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1">
 <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white animate-pulse" />
 </div>
 </div>

 {/* Tooltip */}
 <div className="absolute right-full mr-3 sm:mr-4 top-1/2 -translate-y-1/2 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 shadow-lg hidden sm:block" style={{ background:'var(--ud-gold-pale)', color:'var(--ud-ink)' }}>
 <div className="flex items-center space-x-2">
 <span className="text-[10px] font-bold tracking-tight" style={{ fontFamily: 'var(--ud-serif)' }}>Uddisha</span>
 <span>Chat with Disha AI</span>
 </div>
 <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-2 h-2 rotate-45" style={{ background:'var(--ud-gold-pale)' }}></div>
 </div>

 {/* Floating Animation Ring */}
 <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping"></div>
 </button>
 )}

 {/* Chat Window */}
 {isOpen && (
 <div className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 rounded-2xl sm:rounded-3xl shadow-2xl z-50 transition-all duration-300 ${isMinimized ?'w-80 h-16' :'w-80 sm:w-96 h-96 sm:h-[500px]'
 }`} style={{ background:'var(--ud-paper)', border:'1px solid var(--ud-border)' }}>
 {/* Header */}
 <div className="flex items-center justify-between p-3 sm:p-4 border-b rounded-t-2xl sm:rounded-t-3xl" style={{ borderColor:'var(--ud-border)', background:'var(--ud-gold-pale)' }}>
 <div className="flex items-center space-x-2 sm:space-x-3">
 <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-lg" style={{ background:'var(--ud-gold)' }}>
 <Cat className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
 </div>
 <div>
 <h3 className="font-medium text-sm sm:text-base" style={{ fontFamily:'var(--ud-serif)', color:'var(--ud-ink)' }}>Disha Uddisha AI</h3>
 <div className="flex items-center space-x-1">
 {getStatusIcon()}
 <span className="text-xs" style={{ color:'var(--ud-muted)' }}>{getStatusText()}</span>
 </div>
 </div>
 </div>
 <div className="flex items-center space-x-1 sm:space-x-2">
 <button
 onClick={() => setIsMinimized(!isMinimized)}
 className="p-1.5 sm:p-2 text-[var(--ud-muted)] hover:text-[var(--ud-muted)] hover:bg-[var(--ud-gold-pale)] rounded-lg transition-colors"
 aria-label={isMinimized ?'Maximize chat window' :'Minimize chat window'}
 >
 {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
 </button>
 <button
 onClick={() => setIsOpen(false)}
 className="p-1.5 sm:p-2 text-[var(--ud-muted)] hover:text-[var(--ud-muted)] hover:bg-[var(--ud-gold-pale)] rounded-lg transition-colors"
 aria-label="Close AI Chatbot"
 >
 <X className="h-4 w-4" />
 </button>
 </div>
 </div>

 {!isMinimized && (
 <>
 {/* Messages Area */}
 <div className="flex-1 overflow-y-auto p-3 sm:p-4 h-64 sm:h-80 space-y-3 sm:space-y-4">
 {messages.map((message) => (
 <div
 key={message.id}
 className={`flex ${message.isUser ?'justify-end' :'justify-start'}`}
 >
 <div className={`max-w-[80%] ${message.isUser ?'order-2' :'order-1'}`}>
 <div
 className={`px-3 sm:px-4 py-2 sm:py-3 rounded-2xl text-sm sm:text-base`}
 style={{
 background: message.isUser ?'var(--ud-ink)' :'var(--ud-gold-pale)',
 color: message.isUser ?'var(--ud-paper)' :'var(--ud-ink)',
 border: message.isUser ?'none' :'1px solid var(--ud-border)'
 }}
 dangerouslySetInnerHTML={!message.isUser ? { __html: message.text } : undefined}
 >
 {message.isUser ? message.text : null}
 </div>
 <div className={`text-xs text-[var(--ud-muted)] mt-1 flex items-center ${message.isUser ?'justify-end' :'justify-start'}`}>
 <span>{formatTime(message.timestamp)}</span>
 {!message.isUser && message.source && (
 <span className="ml-2 text-xs text-[var(--ud-muted)]">
 {message.source ==='ai' ?'🤖' : message.source ==='intelligent-fallback' ?'🧠' :'💡'}
 </span>
 )}
 </div>
 </div>
 <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.isUser ?'order-1 mr-2' :'order-2 ml-2'
 }`} style={{ background: message.isUser ?'var(--ud-border)' :'var(--ud-gold)' }}>
 {message.isUser ? (
 <User className="h-3 w-3 sm:h-4 sm:w-4" style={{ color:'var(--ud-ink)' }} />
 ) : (
 <Cat className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
 )}
 </div>
 </div>
 ))}

 {/* Typing Indicator */}
 {isTyping && (
 <div className="flex justify-start">
 <div className="flex items-center space-x-2 bg-[var(--ud-gold-pale)] px-4 py-3 rounded-2xl">
 <Cat className="h-4 w-4 text-[var(--ud-gold)]" />
 <div className="flex space-x-1">
 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
 </div>
 </div>
 </div>
 )}

 {/* Template Questions */}
 {messages.length === 1 && (
 <div className="space-y-2">
 <p className="text-xs text-[var(--ud-muted)] text-center">Quick questions to get started:</p>
 <div className="grid grid-cols-1 gap-2">
 {templateQuestions.slice(0, 3).map((question, index) => (
 <button
 key={index}
 onClick={() => handleTemplateQuestion(question)}
 className="text-left text-xs sm:text-sm p-2 sm:p-3 rounded-lg border transition-colors"
 style={{ background:'var(--ud-paper)', color:'var(--ud-ink)', borderColor:'var(--ud-border)' }}
 >
 {question}
 </button>
 ))}
 </div>
 </div>
 )}

 <div ref={messagesEndRef} />
 </div>

 {/* Input Area */}
 <div className="border-t p-3 sm:p-4" style={{ borderColor:'var(--ud-border)' }}>
 <div className="flex items-center space-x-2 sm:space-x-3">
 <input
 ref={inputRef}
 type="text"
 value={inputText}
 onChange={(e) => setInputText(e.target.value)}
 onKeyPress={handleKeyPress}
 placeholder="Ask me about careers, skills, or job search..."
 disabled={isLoading}
 className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border focus:outline-none rounded-xl text-sm sm:text-base disabled:opacity-50"
 style={{ background:'var(--ud-paper)', color:'var(--ud-ink)', borderColor:'var(--ud-border)' }}
 maxLength={1000}
 aria-label="AI Chatbot input field"
 />
 <button
 onClick={handleSendMessage}
 disabled={!inputText.trim() || isLoading}
 className="p-2 sm:p-3 text-white rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
 style={{ background:'var(--ud-gold)', border:'none' }}
 aria-label="Send message to AI Chatbot"
 >
 {isLoading ? (
 <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
 ) : (
 <Send className="h-4 w-4 sm:h-5 sm:w-5" />
 )}
 </button>
 </div>
 <p className="text-xs mt-2 text-center" style={{ color:'var(--ud-muted)' }}>
 Powered by AI • Career guidance & job search assistance • Always available
 </p>
 </div>
 </>
 )}
 </div>
 )}
 </>
 );
};

export default AIChatbot;

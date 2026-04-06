import React, { useEffect, useState } from'react';
import { X, CheckCircle, ArrowRight, Star, Heart, Target, Trophy } from 'lucide-react';

interface CelebratoryModalProps {
 isOpen: boolean;
 onClose: () => void;
 questionsCompleted: number;
 totalQuestions: number;
 milestone: number;
}

interface ConfettiParticle {
 id: number;
 x: number;
 y: number;
 color: string;
 size: number;
 velocity: { x: number; y: number };
 rotation: number;
 rotationSpeed: number;
}

const CelebratoryModal: React.FC<CelebratoryModalProps> = ({
 isOpen,
 onClose,
 questionsCompleted,
 totalQuestions,
 milestone
}) => {
 const [confetti, setConfetti] = useState<ConfettiParticle[]>([]);
 const [showModal, setShowModal] = useState(false);
 const [progressAnimation, setProgressAnimation] = useState(0);

 const colors = ['#c8922a','#e8c97a','#1a1612','#7a6f62','#f5edda','#c8922a'];

 // Generate confetti particles
 const generateConfetti = () => {
 const particles: ConfettiParticle[] = [];
 for (let i = 0; i < 50; i++) {
 particles.push({
 id: i,
 x: Math.random() * 400,
 y: -10,
 color: colors[Math.floor(Math.random() * colors.length)],
 size: Math.random() * 8 + 4,
 velocity: {
 x: (Math.random() - 0.5) * 4,
 y: Math.random() * 3 + 2
 },
 rotation: Math.random() * 360,
 rotationSpeed: (Math.random() - 0.5) * 10
 });
 }
 setConfetti(particles);
 };

 // Animate confetti
 useEffect(() => {
 if (!isOpen) return;

 const interval = setInterval(() => {
 setConfetti(prev => 
 prev.map(particle => ({
 ...particle,
 x: particle.x + particle.velocity.x,
 y: particle.y + particle.velocity.y,
 rotation: particle.rotation + particle.rotationSpeed,
 velocity: {
 ...particle.velocity,
 y: particle.velocity.y + 0.1 // gravity
 }
 })).filter(particle => particle.y < 500)
 );
 }, 16);

 return () => clearInterval(interval);
 }, [isOpen]);

 // Handle modal opening
 useEffect(() => {
 if (isOpen) {
 setShowModal(true);
 generateConfetti();
 
 // Animate progress bar
 setTimeout(() => {
 setProgressAnimation((questionsCompleted / totalQuestions) * 100);
 }, 300);
 } else {
 setShowModal(false);
 setConfetti([]);
 setProgressAnimation(0);
 }
 }, [isOpen, questionsCompleted, totalQuestions]);

 // Handle escape key
 useEffect(() => {
 const handleEscape = (e: KeyboardEvent) => {
 if (e.key ==='Escape' && isOpen) {
 onClose();
 }
 };

 document.addEventListener('keydown', handleEscape);
 return () => document.removeEventListener('keydown', handleEscape);
 }, [isOpen, onClose]);

 // Focus trap
 useEffect(() => {
 if (isOpen) {
 const modal = document.getElementById('celebratory-modal');
 const focusableElements = modal?.querySelectorAll(
'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
 );
 const firstElement = focusableElements?.[0] as HTMLElement;
 const lastElement = focusableElements?.[focusableElements.length - 1] as HTMLElement;

 const handleTabKey = (e: KeyboardEvent) => {
 if (e.key ==='Tab') {
 if (e.shiftKey) {
 if (document.activeElement === firstElement) {
 lastElement?.focus();
 e.preventDefault();
 }
 } else {
 if (document.activeElement === lastElement) {
 firstElement?.focus();
 e.preventDefault();
 }
 }
 }
 };

 document.addEventListener('keydown', handleTabKey);
 firstElement?.focus();

 return () => document.removeEventListener('keydown', handleTabKey);
 }
 }, [isOpen]);

 const remainingQuestions = totalQuestions - questionsCompleted;

 if (!isOpen) return null;

 return (
 <div 
 className="fixed inset-0 flex items-center justify-center z-50 p-4"
 style={{ background:'rgba(26,22,18,0.6)', backdropFilter:'blur(4px)' }}
 role="dialog"
 aria-modal="true"
 aria-labelledby="modal-title"
 aria-describedby="modal-description"
 onClick={(e) => e.target === e.currentTarget && onClose()}
 >
 {/* Confetti Layer */}
 <div className="absolute inset-0 pointer-events-none overflow-hidden">
 {confetti.map(particle => (
 <div
 key={particle.id}
 className="absolute w-2 h-2 opacity-80"
 style={{
 left: `${particle.x}px`,
 top: `${particle.y}px`,
 backgroundColor: particle.color,
 width: `${particle.size}px`,
 height: `${particle.size}px`,
 transform: `rotate(${particle.rotation}deg)`,
 borderRadius: Math.random() > 0.5 ?'50%' :'0%',
 transition:'none'
 }}
 />
 ))}
 </div>

 {/* Modal Container */}
 <div
 id="celebratory-modal"
 className={`rounded-2xl shadow-2xl w-full max-w-md mx-auto relative overflow-hidden transform transition-all duration-500 ease-out ${
 showModal ?'scale-100 opacity-100' :'scale-90 opacity-0'
 }`}
 style={{ background:'var(--ud-paper)' }}
 >
 {/* Close Button */}
 <button
 onClick={onClose}
 className="absolute top-4 right-4 p-2 rounded-full transition-all duration-200 z-10"
 style={{ color:'var(--ud-muted)' }}
 aria-label="Close celebration modal"
 >
 <X className="h-5 w-5" />
 </button>

 {/* Background Decoration */}
 <div className="absolute top-0 left-0 w-full h-32 opacity-10" style={{ background:'linear-gradient(135deg, var(--ud-gold), var(--ud-gold-light))' }}></div>
 <div className="absolute top-4 left-4 opacity-30" style={{ color:'var(--ud-gold)' }}>
 <Star className="w-10 h-10 text-[var(--ud-gold)]" />
 </div>
 <div className="absolute top-8 right-8 opacity-30" style={{ color:'var(--ud-gold)' }}>
 <Star className="h-6 w-6 animate-pulse delay-300" />
 </div>

 {/* Content */}
 <div className="relative p-8 text-center">
 {/* Icon */}
 <div className="mb-6">
 <div className="inline-flex items-center justify-center w-16 h-16 rounded-full shadow-lg mb-4 transform animate-bounce" style={{ background:'var(--ud-gold)' }}>
 {milestone % 10 === 0 ? (
 <Trophy className="h-8 w-8 text-white" />
 ) : (
 <CheckCircle className="h-8 w-8 text-white" />
 )}
 </div>
 </div>

 {/* Heading */}
 <h2 
 id="modal-title"
 className="text-2xl sm:text-3xl font-bold mb-2"
 style={{ fontFamily:'var(--ud-serif)', color:'var(--ud-ink)' }}
 >
 🎉 Awesome Progress!
 </h2>
 
 <p className="text-lg mb-6" style={{ color:'var(--ud-muted)' }}>
 You've completed <span className="font-bold" style={{ color:'var(--ud-gold)' }}>{questionsCompleted}</span> questions!
 </p>

 {/* Progress Section */}
 <div className="mb-8">
 <div className="flex items-center justify-between text-sm mb-2" style={{ color:'var(--ud-muted)' }}>
 <span>Progress</span>
 <span className="font-semibold">{questionsCompleted} of {totalQuestions}</span>
 </div>
 
 {/* Progress Bar */}
 <div className="w-full rounded-full h-3 overflow-hidden" style={{ background:'var(--ud-gold-pale)' }}>
 <div 
 className="h-full rounded-full transition-all duration-1000 ease-out relative"
 style={{ width: `${progressAnimation}%`, background:'var(--ud-gold)' }}
 >
 <div className="absolute inset-0 bg-[var(--ud-paper)] opacity-30 animate-pulse"></div>
 </div>
 </div>
 
 <p 
 id="modal-description"
 className="text-sm mt-2"
 style={{ color:'var(--ud-muted)' }}
 >
 {remainingQuestions > 0 
 ? `Only ${remainingQuestions} questions remaining!` 
 :"Assessment complete! 🎊"
 }
 </p>
 </div>

 {/* Milestone Message */}
 <div className="rounded-xl p-4 mb-6 border" style={{ background:'var(--ud-gold-pale)', borderColor:'var(--ud-border)' }}>
 <div className="flex items-center justify-center space-x-2" style={{ color:'var(--ud-ink)' }}>
 <Star className="h-5 w-5 fill-current" style={{ color:'var(--ud-gold)' }} />
 <span className="font-semibold">
 {milestone % 10 === 0 
 ? `🏆 Major Milestone: ${milestone} Questions!` 
 : `✨ Milestone: ${milestone} Questions Complete!`
 }
 </span>
 </div>
 <p className="text-sm mt-1" style={{ color:'var(--ud-muted)' }}>
 You're doing amazing! Keep up the great work!
 </p>
 </div>

 {/* Action Button */}
 <button
 onClick={onClose}
 className="ud-btn-primary w-full text-lg"
 aria-label="Continue with assessment"
 >
 {remainingQuestions > 0 ?"Keep Going! 🚀" :"View Results! 🎯"}
 </button>

 {/* Encouragement Text */}
 <p className="text-xs mt-4" style={{ color:'var(--ud-muted)' }}>
 {remainingQuestions > 0 
 ?"You're making excellent progress towards finding your perfect career!"
 :"Congratulations on completing the assessment!"
 }
 </p>
 </div>
 </div>
 </div>
 );
};

export default CelebratoryModal;
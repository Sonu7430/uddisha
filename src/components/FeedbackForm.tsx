import React, { useState } from'react';
import { Send, Star, MessageCircle, CheckCircle, X, ThumbsUp, Heart, AlertCircle } from'lucide-react';
import { submitFeedback, isSupabaseConfigured, FeedbackData } from'../lib/supabase';
import CustomDropdown from'./CustomDropdown';

interface NameInputProps {
 value: string;
 onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
 isSubmitting: boolean;
}

const NameInput: React.FC<NameInputProps> = ({ value, onChange, isSubmitting }) => (
 <div>
 <label className="block text-sm font-medium text-[var(--ud-muted)] mb-2">
 Name *
 </label>
 <input
 type="text"
 required
 value={value}
 onChange={onChange}
 className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[var(--ud-border)] rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#c8922a] focus:border-transparent transition-all duration-200 text-sm sm:text-base"
 placeholder="Your full name"
 disabled={isSubmitting}
 maxLength={100}
 />
 </div>
);

interface EmailInputProps {
 value: string;
 onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
 isSubmitting: boolean;
}

const EmailInput: React.FC<EmailInputProps> = ({ value, onChange, isSubmitting }) => (
 <div>
 <label className="block text-sm font-medium text-[var(--ud-muted)] mb-2">
 Email *
 </label>
 <input
 type="email"
 required
 value={value}
 onChange={onChange}
 className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[var(--ud-border)] rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#c8922a] focus:border-transparent transition-all duration-200 text-sm sm:text-base"
 placeholder="your.email@example.com"
 disabled={isSubmitting}
 maxLength={255}
 />
 </div>
);

const FeedbackForm: React.FC = () => {
 const [isOpen, setIsOpen] = useState(false);
 const [formData, setFormData] = useState({
 name:'',
 email:'',
 rating: 0,
 category:'',
 message:'',
 improvements:''
 });
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [isSubmitted, setIsSubmitted] = useState(false);
 const [submitError, setSubmitError] = useState<string | null>(null);
 const [submitMethod, setSubmitMethod] = useState<'database' |'email' | null>(null);

 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 setIsSubmitting(true);
 setSubmitError(null);
 setSubmitMethod(null);

 // Validate form data
 if (!formData.name.trim()) {
 setSubmitError('Please enter your name');
 setIsSubmitting(false);
 return;
 }
 if (!formData.email.trim()) {
 setSubmitError('Please enter your email');
 setIsSubmitting(false);
 return;
 }
 if (!formData.message.trim()) {
 setSubmitError('Please enter your feedback message');
 setIsSubmitting(false);
 return;
 }
 if (formData.rating === 0) {
 setSubmitError('Please select a rating');
 setIsSubmitting(false);
 return;
 }
 // Email validation
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 if (!emailRegex.test(formData.email.trim())) {
 setSubmitError('Please enter a valid email address');
 setIsSubmitting(false);
 return;
 }

 try {
 // Prepare feedback data
 const feedbackData: any = {
 name: formData.name.trim(),
 email: formData.email.trim(),
 rating: formData.rating,
 category: formData.category.trim() || null,
 message: formData.message.trim(),
 improvements: formData.improvements.trim() || null,
 user_agent: typeof navigator !=='undefined' ? navigator.userAgent : null,
 turnstileToken: null,
 ip_address: null
 };

  // Try database submission first if Supabase is configured
  if (isSupabaseConfigured()) {
    const result = await submitFeedback(feedbackData);

    if (result.success) {
      setSubmitMethod('database');
      setIsSubmitted(true);

      // Auto-close after 3 seconds
      setTimeout(() => {
        resetForm();
      }, 3000);
      return;
    } else {
      setSubmitError(result.error || 'Failed to submit feedback');
      setIsSubmitting(false);
      return;
    }
  }

 // Fallback to email submission only if Supabase is not configured
 const emailContent = `
New Feedback from Uddisha User
Name: ${feedbackData.name}
Email: ${feedbackData.email}
Rating: ${feedbackData.rating}/5 stars
Category: ${feedbackData.category ||'Not specified'}
Message:
${feedbackData.message}
Suggested Improvements:
${feedbackData.improvements ||'None provided'}
User Agent: ${feedbackData.user_agent}
Submitted at: ${new Date().toLocaleString()}
Environment: ${import.meta.env.MODE}
 `;

 const subject = encodeURIComponent(`Uddisha Feedback from ${feedbackData.name}`);
 const body = encodeURIComponent(emailContent);
 const mailtoLink = `mailto:Uddisha188@gmail.com?subject=${subject}&body=${body}`;

 // Open email client
 window.open(mailtoLink,'_blank');

 setSubmitMethod('email');
 setIsSubmitted(true);

 // Auto-close after 3 seconds
 setTimeout(() => {
 resetForm();
 }, 3000);

 } catch (error: any) {
 console.error('Complete feedback submission failure:', error);
 setSubmitError(`Failed to submit feedback: ${error.message}. Please try again or contact us directly at Uddisha188@gmail.com`);
 } finally {
 setIsSubmitting(false);
 }
 };

 const handleRatingClick = (rating: number) => {
 setFormData({ ...formData, rating });
 };

 const resetForm = () => {
 setFormData({
 name:'',
 email:'',
 rating: 0,
 category:'',
 message:'',
 improvements:''
 });
 setSubmitError(null);
 setIsSubmitted(false);
 setSubmitMethod(null);
 setIsOpen(false);
 };

 const closeModal = () => {
 resetForm();
 };

 // ✅ FIX: Defined the missing options array for the CustomDropdown.
 // This was causing the component to crash and show a white screen.
 const feedbackOptions = [
 { value:'assessment', label:'Career Assessment' },
 { value:'results', label:'Assessment Results' },
 { value:'careers', label:'Career Database' },
 { value:'ui-ux', label:'User Interface/Experience' },
 { value:'performance', label:'Website Performance' },
 { value:'features', label:'Feature Requests' },
 { value:'bug', label:'Bug Report' },
 { value:'general', label:'General Feedback' },
 ];

 return (
 <>
 {/* Enhanced Feedback Toggle Button - Mobile Optimized */}
 <button
 onClick={() => setIsOpen(true)}
 className={`fixed bottom-6 right-4 sm:bottom-8 sm:right-6 text-white p-3 sm:p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 z-30 ${isOpen ?'hidden' :'flex'
 } items-center justify-center group animate-pulse hover:animate-none`}
 style={{ background:'var(--ud-ink)' }}
 >
 <div className="relative">
 <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
 <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1">
 <Heart className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-red-400 animate-pulse" />
 </div>
 </div>

 {/* Enhanced Tooltip - Hidden on mobile */}
 <div className="absolute right-full mr-3 sm:mr-4 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 shadow-lg hidden sm:block" style={{ background:'var(--ud-ink)', color:'var(--ud-paper)' }}>
 <div className="flex items-center space-x-2">
 <ThumbsUp className="h-3 w-3 text-white" />
 <span className="text-white">Share Your Experience</span>
 </div>
 <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-2 h-2 rotate-45" style={{ background:'var(--ud-ink)' }}></div>
 </div>
 {/* Floating Animation Ring */}
 <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping"></div>
 </button>

 {/* Enhanced Feedback Modal - Mobile Optimized */}
 {isOpen && (
 <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
 {/* FIXED: Enhanced modal with proper scrolling behavior */}
 <div className="rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] shadow-2xl border hide-scrollbar" style={{ background:'var(--ud-paper)', borderColor:'var(--ud-border)' }}>
 {/* ✅ Scrollable content area */}
 {isSubmitted ? (
 <div className="p-6 sm:p-8 text-center">
 <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[var(--ud-gold-pale)] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
 <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-[var(--ud-ink)]" />
 </div>
 <h3 className="text-2xl sm:text-3xl font-bold text-[var(--ud-gold)] mb-3 sm:mb-4">
 Thank You! 🎉
 </h3>
 <p className="text-[var(--ud-muted)] mb-4 sm:mb-6 text-base sm:text-lg">
 Your feedback has been submitted successfully. We appreciate your input and will use it to improve Uddisha.
 </p>

 {/* Submission Method Indicator */}
 <div className={`text-sm px-3 sm:px-4 py-2 rounded-lg mb-4 ${submitMethod ==='database'
 ?'text-[var(--ud-ink)] bg-[var(--ud-gold-pale)] border border-green-200'
 :'text-[var(--ud-gold)] bg-[var(--ud-gold-pale)] border border-[var(--ud-gold)]'
 }`}>
 {submitMethod ==='database'
 ?'✅ Saved to secure database'
 :'📧 Submitted via email (database unavailable)'
 }
 </div>

 <div className="text-sm text-[var(--ud-muted)] bg-[var(--ud-paper)] px-3 sm:px-4 py-2 rounded-lg">
 This window will close automatically...
 </div>
 </div>
 ) : (
 <div className="overflow-y-auto">
 <>
 {/* Enhanced Header - Mobile Optimized */}
 <div className="flex items-center justify-between p-4 sm:p-6 border-b" style={{ borderColor:'var(--ud-border)', background:'var(--ud-gold-pale)' }}>
 <div className="flex items-center space-x-2 sm:space-x-3">
 <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg" style={{ background:'var(--ud-gold)' }}>
 <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
 </div>
 <div>
 <h2 className="text-xl sm:text-2xl font-bold" style={{ fontFamily:'var(--ud-serif)', color:'var(--ud-ink)' }}>
 Share Your Feedback
 </h2>
 <p className="text-xs sm:text-sm" style={{ color:'var(--ud-muted)', fontFamily:'var(--ud-sans)' }}>Help us improve Uddisha</p>
 </div>
 </div>
 <button
 onClick={closeModal}
 className="transition-colors p-2 rounded-lg"
 style={{ color:'var(--ud-muted)' }}
 >
 <X className="h-5 w-5 sm:h-6 sm:w-6" />
 </button>
 </div>

 {/* Form - Mobile Optimized */}
 <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
 {/* Error Message */}
 {submitError && (
 <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 flex items-start space-x-3">
 <AlertCircle className="h-5 w-5 text-[var(--ud-ink)] flex-shrink-0 mt-0.5" />
 <div>
 <p className="text-red-700 text-sm font-medium">Submission Error</p>
 <p className="text-[var(--ud-ink)] text-sm mt-1">{submitError}</p>
 </div>
 </div>
 )}

 {/* Personal Information */}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
 <NameInput
 value={formData.name}
 onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
 isSubmitting={isSubmitting}
 />
 <EmailInput
 value={formData.email}
 onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
 isSubmitting={isSubmitting}
 />
 </div>

 {/* Enhanced Rating - Mobile Optimized */}
 <div>
 <label className="block text-sm font-medium text-[var(--ud-muted)] mb-3">
 Overall Rating *
 </label>
 <div className="flex items-center space-x-1 sm:space-x-2">
 {[1, 2, 3, 4, 5].map((star) => (
 <button
 key={star}
 type="button"
 onClick={() => handleRatingClick(star)}
 disabled={isSubmitting}
 className={`p-1 sm:p-2 transition-all duration-200 transform hover:scale-110 disabled:cursor-not-allowed ${star <= formData.rating
 ?'text-[var(--ud-gold)]'
 :'text-[var(--ud-muted)] hover:text-yellow-300'
 }`}
 >
 <Star className="h-6 w-6 sm:h-8 sm:w-8 fill-current" />
 </button>
 ))}
 <span className="ml-2 sm:ml-4 text-sm text-[var(--ud-muted)] font-medium">
 {formData.rating > 0 && `${formData.rating}/5 stars`}
 </span>
 </div>
 </div>

 {/* Category */}
 <div>
 <label className="block text-sm font-medium text-[var(--ud-muted)] mb-2">
 Feedback Category
 </label>
 {/* ✅ FIX: Restored the CustomDropdown component for category selection. */}
 <CustomDropdown
 options={feedbackOptions}
 value={formData.category}
 onChange={(value) => setFormData({ ...formData, category: value })}
 placeholder="Select a category"
 disabled={isSubmitting}
 />
 </div>

 {/* Main Message */}
 <div>
 <label className="block text-sm font-medium text-[var(--ud-muted)] mb-2">
 Your Feedback *
 </label>
 <textarea
 required
 rows={4}
 value={formData.message}
 onChange={(e) => setFormData({ ...formData, message: e.target.value })}
 disabled={isSubmitting}
 className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[var(--ud-border)] rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#c8922a] focus:border-transparent resize-none transition-all duration-200 text-sm sm:text-base"
 placeholder="Please share your thoughts about Uddisha. What did you like? What could be improved?"
 maxLength={1000}
 />
 <div className="text-xs text-[var(--ud-muted)] mt-1">
 {formData.message.length}/1000 characters
 </div>
 </div>

 {/* Improvements */}
 <div>
 <label className="block text-sm font-medium text-[var(--ud-muted)] mb-2">
 Suggested Improvements
 </label>
 <textarea
 rows={3}
 value={formData.improvements}
 onChange={(e) => setFormData({ ...formData, improvements: e.target.value })}
 disabled={isSubmitting}
 className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[var(--ud-border)] rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#c8922a] focus:border-transparent resize-none transition-all duration-200 text-sm sm:text-base"
 placeholder="Any specific features or improvements you'd like to see?"
 maxLength={500}
 />
 <div className="text-xs text-[var(--ud-muted)] mt-1">
 {formData.improvements.length}/500 characters
 </div>
 </div>

 {/* Submit Button - Mobile Optimized */}
 <div className="flex items-center justify-between pt-3 sm:pt-4">
 <div className="text-xs sm:text-sm text-[var(--ud-muted)]">
 * Required fields
 </div>
 <div className="flex flex-row space-x-3">
 <button
 type="button"
 onClick={closeModal}
 disabled={isSubmitting}
 className="px-4 sm:px-6 py-2 sm:py-3 border border-[var(--ud-border)] text-[var(--ud-muted)] rounded-lg sm:rounded-xl hover:bg-[var(--ud-paper)] transition-all duration-200 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
 >
 Cancel
 </button>
 <button
 type="submit"
 disabled={isSubmitting || !formData.name || !formData.email || !formData.message || formData.rating === 0}
 className="px-4 sm:px-6 py-2 sm:py-3 text-white rounded-lg sm:rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transform hover:-translate-y-0.5 text-sm sm:text-base ud-btn-primary"
 style={{ border:'none' }}
 >
 {isSubmitting ? (
 <>
 <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
 <span>Submitting...</span>
 </>
 ) : (
 <>
 <Send className="h-3 w-3 sm:h-4 sm:w-4" />
 <span>Submit Feedback</span>
 </>
 )}
 </button>
 </div>
 </div>
 </form>

 {/* Enhanced Footer - Mobile Optimized */}
 <div className="px-4 sm:px-6 py-3 sm:py-4 rounded-b-2xl sm:rounded-b-3xl border-t" style={{ background:'var(--ud-gold-pale)', borderColor:'var(--ud-border)' }}>
 <div className="text-center space-y-2 sm:space-y-3">
 <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm" style={{ color:'var(--ud-muted)' }}>
 <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
 <span>Your feedback helps us improve Uddisha</span>
 </div>
 <div className="text-xs px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border shadow-sm" style={{ background:'rgba(255,255,255,0.7)', borderColor:'var(--ud-border)', color:'var(--ud-ink)' }}>
 <div className="flex items-center justify-center space-x-2 mb-1">
 <CheckCircle className="h-3 w-3" style={{ color:'var(--ud-gold)' }} />
 <span className="font-semibold">✨ Secure Feedback System:</span>
 </div>
 <div className="leading-relaxed">
 {isSupabaseConfigured()
 ?'Your feedback is securely stored in our database and processed instantly!'
 :'Your feedback will be sent via email to ensure we receive it!'}
 </div>
 </div>
 </div>
 </div>
 </>
 </div>
 )}
 </div>
 </div>
 )}
 </>
 );
};

export default FeedbackForm;

import React, { useState } from'react';
import { Helmet } from'react-helmet-async';
import { MessageCircle, Send, Star, CheckCircle, ArrowLeft, Phone, Mail } from'lucide-react';
import { Link } from'react-router-dom';
import { submitHelpRequest, isSupabaseConfigured } from'../lib/supabase';
import CustomDropdown from'../components/CustomDropdown';

const ContactUsPage = () => {
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

 const resetForm = () => {
 setIsSubmitted(false);
 setFormData({
 name:'',
 email:'',
 rating: 0,
 category:'',
 message:'',
 improvements:''
 });
 };

 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();

 setIsSubmitting(true);

 try {
 const helpRequestData = {
 ...formData,
 user_agent: navigator.userAgent
 };

 const response = await fetch('/.netlify/functions/submit-help-request', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify(helpRequestData)
 });

 const result = await response.json();

 if (result.success) {
 console.log('Help request submitted successfully:', result);
 setIsSubmitted(true);
 } else {
 console.warn('Netlify function submission failed, falling back to email:', result.error);
 await fallbackToEmail();
 }
 } catch (error) {
 console.error('Error submitting help request:', error);
 await fallbackToEmail();
 } finally {
 setIsSubmitting(false);
 }
 };

 const fallbackToEmail = async () => {
 const emailContent = `
New Help Request from Uddisha User

Name: ${formData.name}
Email: ${formData.email}
Rating: ${formData.rating}/5 stars
Category: ${formData.category}

Message:
${formData.message}

Additional Information:
${formData.improvements}

Submitted at: ${new Date().toLocaleString()}
 `;

 const subject = encodeURIComponent(`Uddisha Help Request from ${formData.name}`);
 const body = encodeURIComponent(emailContent);
 const mailtoLink = `mailto:contact@uddisha.com?subject=${subject}&body=${body}`;

 window.open(mailtoLink,'_blank');

 await new Promise(resolve => setTimeout(resolve, 2000));
 setIsSubmitted(true);
 };

 const handleRatingClick = (rating: number) => {
 setFormData({ ...formData, rating });
 };

 const helpOptions = [
 { value:'assessment', label:'Career Assessment Help' },
 { value:'results', label:'Understanding My Results' },
 { value:'careers', label:'Career Information' },
 { value:'technical', label:'Technical Issues' },
 { value:'account', label:'Account Problems' },
 { value:'general', label:'General Questions' },
 { value:'bug', label:'Report a Bug' },
 { value:'feature', label:'Feature Request' },
 ];

 return (
 <>
 <Helmet>
 <title>Contact Us | Uddisha - Get Help & Support</title>
 <meta name="description" content="Need help with Uddisha? Contact our support team for career assessment help, technical issues, or general questions. We're here to assist you on your career journey." />
 <link rel="canonical" href="https://www.uddisha.com/contact-us" />
 </Helmet>

 <div className="min-h-screen py-8 sm:py-16 ud-main">
 <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
 {/* Back Button */}
 <Link
 to="/"
 className="inline-flex items-center space-x-2 ud-btn-ghost mb-6 sm:mb-8 transition-colors border-none"
 >
 <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
 <span className="text-sm sm:text-base">Back to Home</span>
 </Link>

 {/* Main Card */}
 <div className="rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden" style={{ background:'var(--ud-paper)', border:'1px solid var(--ud-border)' }}>
 {isSubmitted ? (
 <div className="p-8 sm:p-12 text-center">
 <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg" style={{ background:'var(--ud-gold-pale)' }}>
 <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12" style={{ color:'var(--ud-gold)' }} />
 </div>
 <h2 className="text-3xl sm:text-4xl font-medium mb-4" style={{ fontFamily:'var(--ud-serif)', color:'var(--ud-ink)' }}>
 Help Request Sent! 🎉
 </h2>
 <p className="mb-6 text-lg" style={{ color:'var(--ud-muted)', fontFamily:'var(--ud-sans)' }}>
 Your help request has been {isSupabaseConfigured() ?'saved to our database' :'sent via email'}. Our team will get back to you soon.
 </p>
 <div className="flex flex-col sm:flex-row gap-4 justify-center">
 <button
 onClick={resetForm}
 className="ud-btn-primary w-full sm:w-auto"
 style={{ border:'none' }}
 >
 Submit Another Request
 </button>
 <Link
 to="/"
 className="ud-btn-ghost w-full sm:w-auto justify-center"
 style={{ borderBottom:'1px solid var(--ud-border)' }}
 >
 Return Home
 </Link>
 </div>
 </div>
 ) : (
 <>
 {/* Header */}
 <div className="p-6 sm:p-8" style={{ background:'var(--ud-gold-pale)', borderBottom:'1px solid var(--ud-border)' }}>
 <div className="flex items-center space-x-3 sm:space-x-4 mb-4">
 <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg" style={{ background:'var(--ud-gold)' }}>
 <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
 </div>
 <div>
 <h1 className="text-2xl sm:text-3xl font-medium" style={{ fontFamily:'var(--ud-serif)', color:'var(--ud-ink)' }}>
 Contact Us
 </h1>
 <p className="text-sm sm:text-base" style={{ color:'var(--ud-muted)' }}>How can we help you today?</p>
 </div>
 </div>
 {/* Contact Info */}
 <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-sm sm:text-base">
  <a href="mailto:contact@uddisha.com" className="flex items-center space-x-2 hover:text-[#c8922a] transition-colors" style={{ color:'var(--ud-ink)' }}>
    <Mail className="h-4 w-4 sm:h-5 sm:w-5" style={{ color:'var(--ud-gold)' }} />
    <span>contact@uddisha.com</span>
  </a>
 </div>
 </div>

 {/* Form */}
 <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
 {/* Personal Information */}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
 <div>
 <label className="block text-sm font-medium text-[var(--ud-muted)] mb-2">
 Name *
 </label>
 <input
 type="text"
 required
 value={formData.name}
 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
 className="ud-form-field"
 placeholder="Your full name"
 />
 </div>
 <div>
 <label className="block text-sm font-medium text-[var(--ud-muted)] mb-2">
 Email *
 </label>
 <input
 type="email"
 required
 value={formData.email}
 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
 className="ud-form-field"
 placeholder="your.email@example.com"
 />
 </div>
 </div>

 {/* Rating */}
 <div>
 <label className="block text-sm font-medium text-[var(--ud-muted)] mb-3">
 How would you rate your experience? *
 </label>
 <div className="flex items-center space-x-2">
 {[1, 2, 3, 4, 5].map((star) => (
 <button
 key={star}
 type="button"
 onClick={() => handleRatingClick(star)}
 aria-label={`Rate ${star} out of 5 stars`}
 className={`p-2 transition-all duration-200 transform hover:scale-110 ${star <= formData.rating
 ?'text-[var(--ud-gold)]'
 :'text-[var(--ud-muted)] hover:text-yellow-300'
 }`}
 >
 <Star className="h-8 w-8 sm:h-10 sm:w-10 fill-current" />
 </button>
 ))}
 <span className="ml-4 text-sm text-[var(--ud-muted)] font-medium">
 {formData.rating > 0 && `${formData.rating}/5 stars`}
 </span>
 </div>
 </div>

 {/* Category */}
 <div>
 <label className="block text-sm font-medium text-[var(--ud-muted)] mb-2">
 What do you need help with?
 </label>
 <CustomDropdown
 options={helpOptions}
 value={formData.category}
 onChange={(value) => setFormData({ ...formData, category: value })}
 placeholder="Select a category"
 disabled={isSubmitting}
 />
 </div>

 {/* Main Message */}
 <div>
 <label className="block text-sm font-medium text-[var(--ud-muted)] mb-2">
 How can we help you? *
 </label>
 <textarea
 required
 rows={5}
 value={formData.message}
 onChange={(e) => setFormData({ ...formData, message: e.target.value })}
 className="ud-form-field resize-none"
 placeholder="Please describe your question or issue in detail..."
 />
 </div>

 {/* Additional Info */}
 <div>
 <label className="block text-sm font-medium text-[var(--ud-muted)] mb-2">
 Additional Information
 </label>
 <textarea
 rows={3}
 value={formData.improvements}
 onChange={(e) => setFormData({ ...formData, improvements: e.target.value })}
 className="ud-form-field resize-none"
 placeholder="Any additional details that might help us assist you better..."
 />
 </div>

 {/* Submit Button */}
 <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
 <div className="text-sm text-[var(--ud-muted)]">
 * Required fields
 </div>
 <button
 type="submit"
 disabled={isSubmitting || !formData.name || !formData.email || !formData.message || formData.rating === 0}
 className="ud-btn-primary w-full sm:w-auto flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
 style={{ border:'none' }}
 >
 {isSubmitting ? (
 <>
 <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
 <span>Sending...</span>
 </>
 ) : (
 <>
 <Send className="h-5 w-5" />
 <span>Send Help Request</span>
 </>
 )}
 </button>
 </div>
 </form>

 {/* Footer Info */}
 <div className="px-6 sm:px-8 py-4 sm:py-6" style={{ background:'var(--ud-gold-pale)', borderTop:'1px solid var(--ud-border)' }}>
 <div className="text-center space-y-3">
  <div className="flex items-center justify-center space-x-2 text-sm" style={{ color:'var(--ud-ink)' }}>
    <MessageCircle className="h-4 w-4" />
    <span>Typical response time: &lt; 24 hours</span>
  </div>
 {!isSupabaseConfigured() && (
 <div className="text-xs px-4 py-3 rounded-xl shadow-sm border" style={{ background:'var(--ud-paper)', borderColor:'var(--ud-border)', color:'var(--ud-muted)' }}>
 <div className="flex items-center justify-center space-x-2 mb-1">
 <span className="font-semibold" style={{ color:'var(--ud-ink)' }}>📱 Mobile & Tablet Users:</span>
 </div>
 <div className="leading-relaxed">
 If you don't have a mail app, it will not work. Make sure you have downloaded the mail app.
 Database integration coming soon!
 </div>
 </div>
 )}
 </div>
 </div>
 </>
 )}
 </div>
 </div>
 </div>
 </>
 );
};

export default ContactUsPage;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Mail, Clock, Users, CheckCircle, ArrowRight, Star, Heart, Calendar, Loader2 } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import { submitCounsellingRequest } from '../lib/supabase';

const CounsellingPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const result = await submitCounsellingRequest({
      ...formData,
      user_agent: navigator.userAgent
    });

    if (result.success) {
      setIsSubmitted(true);
    } else {
      setError(result.error || 'Failed to submit request');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="ud-main" style={{ background: 'var(--ud-paper)', minHeight: '100vh' }}>
      <Helmet>
        <title>1:1 Live Career Counselling in Delhi NCR — Uddisha</title>
        <meta name="description" content="Get personalized 1:1 live career counselling in Delhi NCR. Meet our expert career counselors in person. Book your session today — our team will connect with you soon." />
        <link rel="canonical" href="https://www.uddisha.com/counselling" />
      </Helmet>

      {/* Hero Banner */}
      <section style={{
        background: 'var(--ud-ink)',
        padding: '80px 40px 60px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 70% at 30% 50%, rgba(200,146,42,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <ScrollReveal animation="fade-up">
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: 11, fontWeight: 500, letterSpacing: '0.12em',
              textTransform: 'uppercase' as const, color: 'var(--ud-gold-light)', marginBottom: 20,
              fontFamily: 'var(--ud-sans)',
            }}>
              <span style={{ width: 24, height: 1, background: 'var(--ud-gold-light)', display: 'inline-block' }} />
              In-Person Guidance
            </div>
            <h1 style={{
              fontFamily: 'var(--ud-serif)', fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 500,
              lineHeight: 1.1, color: 'var(--ud-paper)', marginBottom: 20, letterSpacing: '-0.01em',
            }}>
              1:1 Live Career<br />
              <em style={{ color: 'var(--ud-gold)' }}>Counselling</em>
            </h1>
            <p style={{
              fontFamily: 'var(--ud-sans)', fontSize: 17, color: 'rgba(250,248,244,0.7)',
              lineHeight: 1.7, maxWidth: 520, marginBottom: 32,
            }}>
              Meet our expert career counselors face-to-face in Delhi NCR. Get personalized guidance
              tailored to your unique aspirations, strengths, and career goals.
            </p>
            <a href="#book-session" style={{
              background: 'var(--ud-gold)', color: 'white', padding: '14px 32px', borderRadius: 40,
              fontSize: 14, fontWeight: 500, textDecoration: 'none', letterSpacing: '0.02em',
              fontFamily: 'var(--ud-sans)', display: 'inline-flex', alignItems: 'center', gap: 8,
              transition: 'background 0.2s, transform 0.15s',
            }}>
              Book Your Session <ArrowRight className="w-4 h-4" />
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Choose Section */}
      <section style={{ padding: '80px 40px', maxWidth: 1100, margin: '0 auto' }}>
        <ScrollReveal animation="fade-up">
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontSize: 11, fontWeight: 500, letterSpacing: '0.12em',
            textTransform: 'uppercase' as const, color: 'var(--ud-gold)', marginBottom: 14,
            fontFamily: 'var(--ud-sans)',
          }}>
            <span style={{ width: 20, height: 1, background: 'var(--ud-gold)', display: 'inline-block' }} />
            Why Choose Us
          </div>
          <h2 style={{
            fontFamily: 'var(--ud-serif)', fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 500,
            lineHeight: 1.15, color: 'var(--ud-ink)', marginBottom: 48,
          }}>
            Personal guidance that changes lives.
          </h2>
        </ScrollReveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {[
            { icon: Users, title: 'Expert Counselors', desc: 'Certified career counselors with 10+ years of experience in education and industry placement.' },
            { icon: Heart, title: 'Personalized Approach', desc: 'Every session is tailored to your unique personality, interests, strengths, and family situation.' },
            { icon: MapPin, title: 'Delhi NCR Based', desc: 'Convenient in-person sessions across Delhi, Gurgaon, Noida, and Greater Noida locations.' },
            { icon: Calendar, title: 'Flexible Scheduling', desc: 'Choose a time that works for you. Weekend and evening slots available for students and parents.' },
            { icon: Star, title: 'Complete Roadmap', desc: 'Walk away with a clear action plan — from stream selection to college choices to career paths.' },
            { icon: CheckCircle, title: 'Follow-Up Support', desc: 'We don\'t just counsel and leave. Get ongoing support via calls and messages after your session.' },
          ].map((item, i) => (
            <ScrollReveal key={i} animation="flip-up" delay={i * 80}>
              <div style={{
                background: 'white', border: '1px solid var(--ud-border)', borderRadius: 16,
                padding: 28, transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'default',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(26,22,18,0.08)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 12, background: 'var(--ud-gold-pale)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16,
                }}>
                  <item.icon style={{ width: 24, height: 24, color: 'var(--ud-gold)' }} />
                </div>
                <h3 style={{ fontFamily: 'var(--ud-sans)', fontSize: 16, fontWeight: 500, color: 'var(--ud-ink)', marginBottom: 8 }}>
                  {item.title}
                </h3>
                <p style={{ fontFamily: 'var(--ud-sans)', fontSize: 13.5, color: 'var(--ud-muted)', lineHeight: 1.65 }}>
                  {item.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <div style={{ width: '100%', height: 1, background: 'var(--ud-border)' }} />

      {/* How It Works */}
      <section style={{ padding: '80px 40px', maxWidth: 900, margin: '0 auto' }}>
        <ScrollReveal animation="blur-in">
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontSize: 11, fontWeight: 500, letterSpacing: '0.12em',
            textTransform: 'uppercase' as const, color: 'var(--ud-gold)', marginBottom: 14,
            fontFamily: 'var(--ud-sans)',
          }}>
            <span style={{ width: 20, height: 1, background: 'var(--ud-gold)', display: 'inline-block' }} />
            How It Works
          </div>
          <h2 style={{
            fontFamily: 'var(--ud-serif)', fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 500,
            lineHeight: 1.15, color: 'var(--ud-ink)', marginBottom: 48,
          }}>
            Three simple steps to clarity.
          </h2>
        </ScrollReveal>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {[
            { num: '01', title: 'Fill the Form Below', desc: 'Share your details and preferred time. Our team reviews every request personally.' },
            { num: '02', title: 'We Connect With You', desc: 'A counselor will call you within 24 hours to understand your needs and schedule a session.' },
            { num: '03', title: 'Meet & Get Your Roadmap', desc: 'Attend your 1:1 session in Delhi NCR. Walk away with a clear, actionable career plan.' },
          ].map((step, i) => (
            <ScrollReveal key={i} animation="fade-left" delay={i * 150}>
              <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                <div style={{
                  fontFamily: 'var(--ud-serif)', fontSize: 42, color: 'var(--ud-border)',
                  fontWeight: 600, lineHeight: 1, minWidth: 60,
                }}>
                  {step.num}
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--ud-sans)', fontSize: 17, fontWeight: 500, color: 'var(--ud-ink)', marginBottom: 6 }}>
                    {step.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--ud-sans)', fontSize: 14, color: 'var(--ud-muted)', lineHeight: 1.7 }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <div style={{ width: '100%', height: 1, background: 'var(--ud-border)' }} />

      {/* Contact / Book Session Form */}
      <section id="book-session" style={{ padding: '80px 40px', background: 'var(--ud-gold-pale)' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <ScrollReveal animation="zoom-in">
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: 11, fontWeight: 500, letterSpacing: '0.12em',
              textTransform: 'uppercase' as const, color: 'var(--ud-gold)', marginBottom: 14,
              fontFamily: 'var(--ud-sans)',
            }}>
              <span style={{ width: 20, height: 1, background: 'var(--ud-gold)', display: 'inline-block' }} />
              Book Your Session
            </div>
            <h2 style={{
              fontFamily: 'var(--ud-serif)', fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 500,
              lineHeight: 1.15, color: 'var(--ud-ink)', marginBottom: 12,
            }}>
              Ready for personal guidance?
            </h2>
            <p style={{
              fontFamily: 'var(--ud-sans)', fontSize: 15, color: 'var(--ud-muted)',
              lineHeight: 1.7, marginBottom: 36, maxWidth: 520,
            }}>
              Fill in your details below and our team will connect with you as soon as possible
              to schedule your 1:1 live counselling session in Delhi NCR.
            </p>
          </ScrollReveal>

          {!isSubmitted ? (
            <ScrollReveal animation="fade-up" delay={200}>
              <form onSubmit={handleSubmit} style={{
                background: 'white', borderRadius: 20, padding: '36px 32px',
                border: '1px solid var(--ud-border)', boxShadow: '0 4px 24px rgba(26,22,18,0.07)',
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <input
                    type="text" name="name" placeholder="Your Full Name *" required
                    value={formData.name} onChange={handleChange}
                    className="ud-form-field"
                  />
                  <input
                    type="tel" name="phone" placeholder="Phone Number *" required
                    value={formData.phone} onChange={handleChange}
                    className="ud-form-field"
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <input
                    type="email" name="email" placeholder="Email Address"
                    value={formData.email} onChange={handleChange}
                    className="ud-form-field"
                  />
                  <select
                    name="city" value={formData.city} onChange={handleChange}
                    className="ud-form-field" required
                  >
                    <option value="">Select City *</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Gurgaon">Gurgaon</option>
                    <option value="Noida">Noida</option>
                    <option value="Greater Noida">Greater Noida</option>
                    <option value="Faridabad">Faridabad</option>
                    <option value="Ghaziabad">Ghaziabad</option>
                    <option value="Other">Other (Delhi NCR)</option>
                  </select>
                </div>
                <textarea
                  name="message" placeholder="Tell us about your career concerns or questions..."
                  rows={4} value={formData.message} onChange={handleChange}
                  className="ud-form-field" style={{ resize: 'vertical', marginBottom: 20 }}
                />

                {error && (
                  <div style={{ color: '#dc2626', fontSize: 13, marginBottom: 16, textAlign: 'center' }}>
                    {error}
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="ud-btn-primary" 
                  style={{
                    width: '100%', padding: '15px 28px', fontSize: 15, cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    opacity: isSubmitting ? 0.7 : 1
                  }}
                >
                  {isSubmitting ? (
                    <>Submitting... <Loader2 className="w-4 h-4 animate-spin" /></>
                  ) : (
                    <>Request a Callback <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </form>
            </ScrollReveal>
          ) : (
            <ScrollReveal animation="zoom-in">
              <div style={{
                background: 'white', borderRadius: 20, padding: '48px 32px',
                border: '1px solid var(--ud-border)', textAlign: 'center',
              }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%', background: 'var(--ud-gold)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px',
                }}>
                  <CheckCircle style={{ width: 32, height: 32, color: 'white' }} />
                </div>
                <h3 style={{ fontFamily: 'var(--ud-serif)', fontSize: 28, fontWeight: 500, color: 'var(--ud-ink)', marginBottom: 12 }}>
                  Thank You!
                </h3>
                <p style={{ fontFamily: 'var(--ud-sans)', fontSize: 15, color: 'var(--ud-muted)', lineHeight: 1.7, maxWidth: 400, margin: '0 auto' }}>
                  Our team has received your request and will connect with you within 24 hours to schedule your 1:1 session.
                </p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* Location Info */}
      <section style={{ padding: '60px 40px', maxWidth: 900, margin: '0 auto' }}>
        <ScrollReveal animation="fade-up">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32, textAlign: 'center' }}>
            <div>
              <MapPin style={{ width: 28, height: 28, color: 'var(--ud-gold)', margin: '0 auto 12px' }} />
              <h4 style={{ fontFamily: 'var(--ud-sans)', fontSize: 14, fontWeight: 500, color: 'var(--ud-ink)', marginBottom: 6 }}>Location</h4>
              <p style={{ fontFamily: 'var(--ud-sans)', fontSize: 13, color: 'var(--ud-muted)' }}>Delhi NCR, India</p>
            </div>
            <div>
              <Mail style={{ width: 28, height: 28, color: 'var(--ud-gold)', margin: '0 auto 12px' }} />
              <h4 style={{ fontFamily: 'var(--ud-sans)', fontSize: 14, fontWeight: 500, color: 'var(--ud-ink)', marginBottom: 6 }}>Email</h4>
              <p style={{ fontFamily: 'var(--ud-sans)', fontSize: 13, color: 'var(--ud-muted)' }}>contact@uddisha.com</p>
            </div>
            <div>
              <Clock style={{ width: 28, height: 28, color: 'var(--ud-gold)', margin: '0 auto 12px' }} />
              <h4 style={{ fontFamily: 'var(--ud-sans)', fontSize: 14, fontWeight: 500, color: 'var(--ud-ink)', marginBottom: 6 }}>Availability</h4>
              <p style={{ fontFamily: 'var(--ud-sans)', fontSize: 13, color: 'var(--ud-muted)' }}>Mon–Sat, 10 AM – 7 PM</p>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default CounsellingPage;

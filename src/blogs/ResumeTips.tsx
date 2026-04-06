// src/pages/blog/ResumeTips.tsx

import React from'react';
import BlogSEO from'../components/BlogSEO';
import RelatedPosts from'../components/RelatedPosts';

const relatedPosts = [
 { id:'wrong-career-path', title:'5 Signs You\'re on the Wrong Career Path', summary:'Learn how to identify if your job doesn\'t align with your passion.' },
 { id:'right-career-path-after-12th', title:'How to Choose the Right Career After 12th', summary:'A complete guide to making informed career choices.' },
 { id:'passion-isnt-enough', title:'Why Passion Isn\'t Enough', summary:'Discover what truly leads to career fulfillment.' },
];

const ResumeTips = () => (
 <div className="max-w-4xl mx-auto px-4 py-10 text-[var(--ud-ink)]">
 <BlogSEO
 title="Resume Writing Tips India 2026: ATS-Optimized Resume Guide"
 description="Complete resume writing guide for Indian job seekers. ATS optimization, format, keywords, skills section - how to write a resume that gets interviews."
 slug="resume-tips"
 date="2025-05-15"
 keywords="resume tips India, how to write resume, ATS resume, resume format India, job resume guide, Uddisha"
 />

 <h1 className="text-3xl font-bold mb-4 text-[var(--ud-ink)]">Resume Tips to Boost Your Career Success</h1>
 <p className="text-[var(--ud-muted)] mb-6 text-sm">Published: July 2025</p>

 <p className="mb-6 text-[var(--ud-muted)]">
 Your resume isn't just a document—it's your gateway to a new opportunity. It's the first thing employers see and often the only thing they use to decide whether you get an interview. Whether you're entering the workforce for the first time or pivoting to a new industry, a strong resume can dramatically increase your chances of landing your dream job.
 </p>

 <p className="mb-6 text-[var(--ud-muted)]">
 The Uddisha team has analyzed hundreds of recruiter insights, ATS algorithms, and top-performing resumes to compile this list of 10 proven resume tips. These practical strategies will help you make a lasting impression.
 </p>

 <h2 className="text-2xl font-semibold mb-3 mt-8 text-[var(--ud-ink)]">1. Tailor Each Resume to the Role</h2>
 <p className="mb-6 text-[var(--ud-muted)]">
 A common mistake job seekers make is submitting a generic resume to multiple employers. Recruiters can spot a copy-paste resume in seconds—and so can applicant tracking systems (ATS).
 </p>
 <p className="mb-6 text-[var(--ud-muted)]">
 Instead, tailor your resume for every role by mirroring the job description. Use the exact job title, skills, and qualifications listed in the posting. If the role asks for"project management experience," include that exact phrase in your experience section. Highlight the tools, certifications, and soft skills that align with the employer’s needs.
 </p>
 <p className="mb-6 text-[var(--ud-muted)]">
 Not only does this help your resume pass ATS filters, but it also demonstrates your attention to detail and genuine interest in the role.
 </p>

 <h2 className="text-2xl font-semibold mb-3 mt-8 text-[var(--ud-ink)]">2. Start with a Strong Summary</h2>
 <p className="mb-6 text-[var(--ud-muted)]">
 Your resume summary is a short professional introduction. This section sits at the top and should be personalized, engaging, and results-focused. Avoid vague objectives like"Seeking a challenging position…" Instead, be specific about your strengths and goals.
 </p>
 <p className="mb-6 text-[var(--ud-muted)]">
 Example: “Data-driven marketing strategist with 5+ years of experience in B2C campaigns, SEO optimization, and CRM automation. Proven track record of increasing brand visibility and driving 40% lead growth.”
 </p>
 <p className="mb-6 text-[var(--ud-muted)]">
 A great summary grabs attention and entices the recruiter to read more. Make it count.
 </p>

 <h2 className="text-2xl font-semibold mb-3 mt-8 text-[var(--ud-ink)]">3. Focus on Achievements, Not Duties</h2>
 <p className="mb-6 text-[var(--ud-muted)]">
 Employers want to know how you made a difference—not just what you were assigned to do. Frame your experience using action + result. Think “accomplishments,” not “responsibilities.”
 </p>
 <p className="mb-6 text-[var(--ud-muted)]">
 Instead of: “Responsible for managing marketing campaigns,” try: “Led a 3-person team to execute a digital campaign that generated ₹20 lakh in revenue within 60 days.”
 </p>
 <p className="mb-6 text-[var(--ud-muted)]">
 Quantifying your impact not only adds credibility but also shows your potential value to the company.
 </p>

 <h2 className="text-2xl font-semibold mb-3 mt-8 text-[var(--ud-ink)]">4. Use Action-Oriented Language</h2>
 <p className="mb-6 text-[var(--ud-muted)]">
 Dull, passive resumes fail to impress. Use strong, active verbs that convey initiative and results. Replace phrases like “was responsible for” with “spearheaded,” “developed,” “orchestrated,” or “optimized.”
 </p>
 <p className="mb-6 text-[var(--ud-muted)]">
 Action words show that you are results-driven, confident, and proactive. Pair them with the STAR method (Situation, Task, Action, Result) to create powerful bullet points.
 </p>

 <h2 className="text-2xl font-semibold mb-3 mt-8 text-[var(--ud-ink)]">5. Keep It Concise and Clean</h2>
 <p className="mb-6 text-[var(--ud-muted)]">
 The average recruiter spends less than 10 seconds reviewing a resume. That means clarity and readability are critical. Stick to a one-page resume if you're early in your career; two pages is acceptable for those with 7+ years of experience.
 </p>
 <p className="mb-6 text-[var(--ud-muted)]">
 Use a professional font like Arial, Calibri, or Helvetica, and maintain consistent spacing and alignment. Make good use of white space and avoid dense blocks of text. Prioritize the most relevant information for the role you’re applying to.
 </p>

 <h2 className="text-2xl font-semibold mb-3 mt-8 text-[var(--ud-ink)]">6. Optimize for ATS (Applicant Tracking Systems)</h2>
 <p className="mb-6 text-[var(--ud-muted)]">
 Over 90% of large companies use ATS to filter resumes. If your resume isn't optimized, it might never reach human eyes. Use standard section headers like “Experience,” “Education,” and “Skills.” Avoid using text in images or charts that ATS can’t read.
 </p>
 <p className="mb-6 text-[var(--ud-muted)]">
 Save your resume as a .docx or plain PDF and avoid complicated designs. Focus on keywords from the job description. Tools like Jobscan and Resume Worded can help you assess how ATS-friendly your resume is.
 </p>

 <h2 className="text-2xl font-semibold mb-3 mt-8 text-[var(--ud-ink)]">7. Highlight Transferable Skills</h2>
 <p className="mb-6 text-[var(--ud-muted)]">
 If you’re changing industries, don’t worry—focus on transferable skills. Project management, communication, leadership, problem-solving, and tech literacy are in demand across sectors.
 </p>
 <p className="mb-6 text-[var(--ud-muted)]">
 Translate your experience into language that fits the new role. For example, a teacher transitioning to a customer success role could emphasize “client relationship management,” “conflict resolution,” and “training delivery.”
 </p>

 <h2 className="text-2xl font-semibold mb-3 mt-8 text-[var(--ud-ink)]">8. Include Keywords from the Job Description</h2>
 <p className="mb-6 text-[var(--ud-muted)]">
 Mirror relevant keywords in your skills and experience. If the job mentions tools like “JIRA,” “Figma,” or “Python,” include those if you’ve used them. Also, look for domain-specific terms like “UX audit,” “regression testing,” or “budget forecasting.”
 </p>
 <p className="mb-6 text-[var(--ud-muted)]">
 Doing this increases your chances of passing ATS filters and shows hiring managers you speak their language.
 </p>

 <h2 className="text-2xl font-semibold mb-3 mt-8 text-[var(--ud-ink)]">9. Quantify Everything You Can</h2>
 <p className="mb-6 text-[var(--ud-muted)]">
 Numbers tell a story better than adjectives. Hiring managers love to see measurable impact. For example:
 </p>
 <ul className="list-disc ml-6 mb-6 text-[var(--ud-muted)]">
 <li>“Boosted user retention by 22% in 3 months.”</li>
 <li>“Reduced support ticket backlog by 50%.”</li>
 <li>“Onboarded 60+ new clients within 1 quarter.”</li>
 </ul>
 <p className="mb-6 text-[var(--ud-muted)]">
 These details help you stand out by providing context and scope for your achievements.
 </p>

 <h2 className="text-2xl font-semibold mb-3 mt-8 text-[var(--ud-ink)]">10. Proofread Like a Pro</h2>
 <p className="mb-6 text-[var(--ud-muted)]">
 Spelling and grammar mistakes are red flags. Always proofread your resume multiple times. Use tools like Grammarly, Hemingway, or even AI-based editing assistants to catch minor issues.
 </p>
 <p className="mb-6 text-[var(--ud-muted)]">
 Ask a friend or mentor to review it as well. Sometimes, a fresh set of eyes can catch inconsistencies you’ve missed. And never forget to double-check your contact information!
 </p>

 <h2 className="text-2xl font-semibold mb-3 mt-8 text-[var(--ud-ink)]">Your LinkedIn Profile: The Resume That Never Sleeps</h2>
 <p className="mb-4 text-[var(--ud-muted)]">
 In 2026, recruiters don't just look at your resume — they look at your <strong>LinkedIn profile</strong>. 95% of recruiters use LinkedIn to find candidates. A polished LinkedIn can get you <em>inbound recruiter messages</em> even without applying to jobs:
 </p>
 <ul className="list-disc ml-6 mb-6 text-[var(--ud-muted)] space-y-2">
 <li><strong>Headline:</strong> Don't just list your title. Use searchable keywords:"Software Engineer | React, Node.js | Seeking Product/Startup roles" captures intent and searchability.</li>
 <li><strong>About Section:</strong> Write in first person; tell your story. Include the impact you've had, skills you're developing, and what you're looking for. End with a call-to-action.</li>
 <li><strong>Open to Work:</strong> Turn it on for recruiters only if you're employed, or publicly if you're actively seeking. This signals urgency to recruiters.</li>
 <li><strong>Skills Section:</strong> LinkedIn now surfaces profiles in recruiter searches based on skills. Prioritize the 5 most relevant skills and get endorsements for them.</li>
 <li><strong>Creator Mode:</strong> If you're comfortable sharing content (articles, case studies, opinions), turning on Creator Mode increases profile visibility and signals expertise.</li>
 </ul>

 <h2 className="text-2xl font-semibold mb-3 mt-8 text-[var(--ud-ink)]">Writing a Cover Letter That Doesn't Get Ignored</h2>
 <p className="mb-4 text-[var(--ud-muted)]">
 Many candidates skip cover letters or write generic ones. Here's how to write one that actually gets read:
 </p>
 <div className="space-y-3 mb-6">
 <div className="bg-[var(--ud-paper)] border rounded-xl p-4">
 <h4 className="font-semibold mb-1">Paragraph 1: The Hook (Why You're Excited About THIS Company)</h4>
 <p className="text-sm text-[var(--ud-muted)]">Reference something specific: a product launch, a recent news story, a mission statement. Show you've done your homework. Example:"When Zepto launched its 10-minute delivery in Tier-2 cities, I knew this was the kind of scaling challenge I wanted to be part of."</p>
 </div>
 <div className="bg-[var(--ud-paper)] border rounded-xl p-4">
 <h4 className="font-semibold mb-1">Paragraph 2: Your Competitive Edge (Most Relevant Achievement)</h4>
 <p className="text-sm text-[var(--ud-muted)]">Pick your single most relevant achievement and explain how it directly relates to the role they need filled. Use numbers. Don't list 5 achievements — give one story done fully.</p>
 </div>
 <div className="bg-[var(--ud-paper)] border rounded-xl p-4">
 <h4 className="font-semibold mb-1">Paragraph 3: Your Fit + CTA</h4>
 <p className="text-sm text-[var(--ud-muted)]">Explain briefly how your skills/goals align with where the company is going. End with a confident (not desperate) ask:"I'd love to discuss how I can contribute to [X] — I'm available for a call this week."</p>
 </div>
 </div>

 <h2 className="text-2xl font-semibold mb-3 mt-8 text-[var(--ud-ink)]">10 Commonly Overused Resume Phrases to Avoid</h2>
 <div className="overflow-x-auto mb-6">
 <table className="w-full border border-[var(--ud-border)] text-sm">
 <thead>
 <tr className="bg-[var(--ud-gold-pale)]">
 <th className="border px-3 py-2">❌ Overused Phrase</th>
 <th className="border px-3 py-2">✅ Better Alternative</th>
 </tr>
 </thead>
 <tbody>
 <tr><td className="border px-3 py-2">"Hardworking and dedicated"</td><td className="border px-3 py-2">Show it through a specific achievement with numbers</td></tr>
 <tr><td className="border px-3 py-2">"Team player"</td><td className="border px-3 py-2">"Collaborated with cross-functional team of 8" (specific)</td></tr>
 <tr><td className="border px-3 py-2">"Excellent written and verbal communication"</td><td className="border px-3 py-2">"Wrote weekly executive summary; presented to 50+ stakeholders"</td></tr>
 <tr><td className="border px-3 py-2">"Results-driven"</td><td className="border px-3 py-2">List the actual result (%, ₹, time saved)</td></tr>
 <tr><td className="border px-3 py-2">"Passionate about [industry]"</td><td className="border px-3 py-2">Show passion through side projects, certifications, content created</td></tr>
 <tr><td className="border px-3 py-2">"Responsible for"</td><td className="border px-3 py-2">Lead, built, optimized, reduced, increased (active verbs)</td></tr>
 <tr><td className="border px-3 py-2">"Proven track record"</td><td className="border px-3 py-2">Cite specific data that proves it</td></tr>
 </tbody>
 </table>
 </div>

 <h2 className="text-2xl font-semibold mb-3 mt-8 text-[var(--ud-ink)]">Resume Formats: Which One to Use?</h2>
 <div className="grid md:grid-cols-3 gap-4 mb-6">
 <div className="bg-[var(--ud-paper)] border rounded-xl p-4">
 <h4 className="font-semibold text-[var(--ud-gold)] mb-2">Chronological</h4>
 <p className="text-sm text-[var(--ud-muted)]">Most common. Lists work experience newest to oldest. Best for: candidates with consistent work history in the same field.</p>
 </div>
 <div className="bg-[var(--ud-paper)] border rounded-xl p-4">
 <h4 className="font-semibold text-[var(--ud-ink)] mb-2">Functional</h4>
 <p className="text-sm text-[var(--ud-muted)]">Skills-first format. Best for: career changers, freshers with limited experience, people with employment gaps.</p>
 </div>
 <div className="bg-[var(--ud-paper)] border rounded-xl p-4">
 <h4 className="font-semibold text-[var(--ud-ink)] mb-2">Combination</h4>
 <p className="text-sm text-[var(--ud-muted)]">Hybrid of both. Best for: experienced professionals pivoting to a new industry while highlighting transferable skills.</p>
 </div>
 </div>

 <hr className="my-8 border-t border-[var(--ud-border)]" />


 <h2 className="text-xl font-semibold mb-2 text-[var(--ud-ink)]">Final Thought</h2>
 <p className="mb-6 text-[var(--ud-muted)]">
 Your resume is your career launchpad. Make sure it reflects not just what you've done—but what you're capable of. With these 10 resume tips from Uddisha, you're well-equipped to stand out in the job market and take the next big step in your professional journey.
 </p>
 <p className="text-sm text-[var(--ud-muted)] italic mt-8">
 Uddisha is continuously improving its resume resources. Stay tuned for smarter tools like AI-based resume graders, role-matching engines, and real-time recruiter feedback.
 </p>

 <RelatedPosts posts={relatedPosts} />
 </div>
);

export default ResumeTips;
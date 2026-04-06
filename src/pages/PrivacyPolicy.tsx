// src/pages/PrivacyPolicy.tsx

import React from'react';
import { Helmet } from'react-helmet-async';

const PrivacyPolicy = () => (
 <div className="max-w-4xl mx-auto px-4 py-8 text-[var(--ud-ink)] text-base font-[family-name:var(--ud-sans)]">
 <Helmet>
 <title>Privacy Policy | Uddisha</title>
 <meta name="description" content="Read Uddisha privacy policy. Learn how we collect, use, and protect your personal data when you use our AI career guidance platform." />
 <link rel="canonical" href="https://www.uddisha.com/privacy-policy" />
 </Helmet>
 <h1 className="text-3xl font-bold mb-6 text-[var(--ud-ink)]">Privacy Policy</h1>
 <p className="mb-4 text-sm text-[var(--ud-muted)]">Last Updated: January 2026</p>

 <section className="mb-8">
 <h2 className="text-2xl font-semibold mb-4 text-[var(--ud-gold)]">1. Information We Collect</h2>
 <p className="mb-4 leading-relaxed text-[var(--ud-muted)]">
 We collect information to provide better services to all our users. This includes:
 </p>
 <ul className="list-disc pl-6 space-y-2 mb-4 text-[var(--ud-muted)]">
 <li><strong>Personal Information:</strong> When you sign up for an account, subscribe to our newsletter, or contact us, we may ask for personal information like your name and email address.</li>
 <li><strong>Usage Data:</strong> We may collect information about how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</li>
 </ul>
 </section>

 <section className="mb-8">
 <h2 className="text-2xl font-semibold mb-4 text-[var(--ud-gold)]">2. How We Use Information</h2>
 <p className="mb-4 leading-relaxed text-[var(--ud-muted)]">We use the collected data for various purposes:</p>
 <ul className="list-disc pl-6 space-y-2 mb-4 text-[var(--ud-muted)]">
 <li>To provide and maintain the Service</li>
 <li>To notify you about changes to our Service</li>
 <li>To provide customer care and support</li>
 <li>To provide analysis or valuable information so that we can improve the Service</li>
 <li>To monitor the usage of the Service</li>
 <li>To detect, prevent and address technical issues</li>
 </ul>
 </section>

 <section className="mb-8">
 <h2 className="text-2xl font-semibold mb-4 text-[var(--ud-gold)]">3. Data Security</h2>
 <p className="mb-4 leading-relaxed text-[var(--ud-muted)]">
 The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
 </p>
 </section>

 <section className="mb-8">
 <h2 className="text-2xl font-semibold mb-4 text-[var(--ud-gold)]">4. Third-Party Services</h2>
 <p className="mb-4 leading-relaxed text-[var(--ud-muted)]">
 We may employ third party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used. These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
 </p>
 </section>

 <section className="mb-8">
 <h2 className="text-2xl font-semibold mb-4 text-[var(--ud-gold)]">5. Changes to This Privacy Policy</h2>
 <p className="mb-4 leading-relaxed text-[var(--ud-muted)]">
 We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
 </p>
 </section>

 <section className="mb-8">
 <h2 className="text-2xl font-semibold mb-4 text-[var(--ud-gold)]">6. Contact Us</h2>
 <p className="mb-4 leading-relaxed text-[var(--ud-muted)]">
 If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@uddisha.com" className="text-[var(--ud-gold)] underline">privacy@uddisha.com</a>.
 </p>
 </section>
 </div>
);

export default PrivacyPolicy;

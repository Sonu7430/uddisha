// src/pages/CookiePolicy.tsx

import React from'react';
import { Helmet } from'react-helmet-async';

const CookiePolicy = () => (
 <div className="max-w-4xl mx-auto px-4 py-8 text-[var(--ud-ink)] text-base font-[family-name:var(--ud-sans)]">
 <Helmet>
 <title>Cookie Policy | Uddisha</title>
 <meta name="description" content="Learn about how Uddisha uses cookies to enhance your experience and provide personalized career recommendations." />
 <link rel="canonical" href="https://www.uddisha.com/cookie-policy" />
 </Helmet>
 <h1 className="text-3xl font-bold mb-6 text-[var(--ud-ink)]">Cookie Policy</h1>
 <p className="mb-4 text-sm text-[var(--ud-muted)]">Last Updated: January 2026</p>

 <section className="mb-8">
 <h2 className="text-2xl font-semibold mb-4 text-[var(--ud-gold)]">1. Introduction</h2>
 <p className="mb-4 leading-relaxed text-[var(--ud-muted)]">
 Uddisha ("we","our", or"us") uses cookies and similar tracking technologies to enhance your experience on our website.
 This Cookie Policy explains what cookies are, how we use them, and your choices regarding their use.
 </p>
 </section>

 <section className="mb-8">
 <h2 className="text-2xl font-semibold mb-4 text-[var(--ud-gold)]">2. What Are Cookies?</h2>
 <p className="mb-4 leading-relaxed text-[var(--ud-muted)]">
 Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website.
 They are widely used to make websites work more efficiently, as well as to provide reporting information to the site owners.
 </p>
 </section>

 <section className="mb-8">
 <h2 className="text-2xl font-semibold mb-4 text-[var(--ud-gold)]">3. How We Use Cookies</h2>
 <p className="mb-4 leading-relaxed text-[var(--ud-muted)]">We use cookies for the following purposes:</p>
 <ul className="list-disc pl-6 space-y-2 mb-4 text-[var(--ud-muted)]">
 <li><strong>Essential Cookies:</strong> These are strictly necessary for the website to function properly. They enable basic features like page navigation and access to secure areas.</li>
 <li><strong>Performance & Analytics Cookies:</strong> These help us understand how visitors interact with our website by collecting and reporting information anonymously. We use this data to improve our site's functionality.</li>
 <li><strong>Functionality Cookies:</strong> These allow the website to remember choices you make (such as your username, language, or region) to provide a more personalized experience.</li>
 <li><strong>Targeting & Advertising Cookies:</strong> These may be set through our site by our advertising partners to build a profile of your interests and show you relevant ads on other sites.</li>
 </ul>
 </section>

 <section className="mb-8">
 <h2 className="text-2xl font-semibold mb-4 text-[var(--ud-gold)]">4. Managing Your Cookie Preferences</h2>
 <p className="mb-4 leading-relaxed text-[var(--ud-muted)]">
 Most web browsers automatically accept cookies, but you can usually modify your browser settings to decline cookies if you prefer.
 However, please note that disabling cookies may prevent you from taking full advantage of the website.
 </p>
 <p className="mb-4 leading-relaxed text-[var(--ud-muted)]">
 You can typically find cookie settings in the"Options" or"Preferences" menu of your browser.
 </p>
 </section>

 <section className="mb-8">
 <h2 className="text-2xl font-semibold mb-4 text-[var(--ud-gold)]">5. Updates to This Policy</h2>
 <p className="mb-4 leading-relaxed text-[var(--ud-muted)]">
 We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.
 Please revisit this page periodically to stay informed about our use of cookies.
 </p>
 </section>

 <section className="mb-8">
 <h2 className="text-2xl font-semibold mb-4 text-[var(--ud-gold)]">6. Contact Us</h2>
 <p className="mb-4 leading-relaxed text-[var(--ud-muted)]">
 If you have any questions about our use of cookies, please contact us at: <a href="mailto:contact@uddisha.com" className="text-[var(--ud-gold)] underline">contact@uddisha.com</a>.
 </p>
 </section>
 </div>
);

export default CookiePolicy;

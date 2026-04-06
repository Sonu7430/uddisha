// src/pages/TermsOfService.tsx

import React from'react';
import { Helmet } from'react-helmet-async';

const TermsOfService = () => (
 <div className="max-w-4xl mx-auto px-4 py-8 text-[var(--ud-ink)] text-base font-[family-name:var(--ud-sans)]">
 <Helmet>
 <title>Terms of Service | Uddisha</title>
 <meta name="description" content="Review Uddisha terms of service. Understand your rights and responsibilities when using our AI-powered career guidance platform." />
 <link rel="canonical" href="https://www.uddisha.com/terms-of-service" />
 </Helmet>
 <h1 className="text-3xl font-bold mb-6 text-[var(--ud-ink)]">Terms of Service</h1>
 <p className="mb-4 text-sm text-[var(--ud-muted)]">Effective Date: January 1, 2026</p>

 <section className="mb-8">
 <h2 className="text-2xl font-semibold mb-4 text-[var(--ud-gold)]">1. Acceptance of Terms</h2>
 <p className="mb-4 leading-relaxed text-[var(--ud-muted)]">
 By accessing or using the Uddisha website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations.
 If you do not agree with any of these terms, you are prohibited from using or accessing this site.
 </p>
 </section>

 <section className="mb-8">
 <h2 className="text-2xl font-semibold mb-4 text-[var(--ud-gold)]">2. Use License</h2>
 <p className="mb-4 leading-relaxed text-[var(--ud-muted)]">
 Permission is granted to temporarily download one copy of the materials (information or software) on Uddisha's website for personal, non-commercial transitory viewing only.
 This is the grant of a license, not a transfer of title, and under this license, you may not:
 </p>
 <ul className="list-disc pl-6 space-y-2 mb-4 text-[var(--ud-muted)]">
 <li>Modify or copy the materials;</li>
 <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
 <li>Attempt to decompile or reverse engineer any software contained on Uddisha's website;</li>
 <li>Remove any copyright or other proprietary notations from the materials; or</li>
 <li>Transfer the materials to another person or"mirror" the materials on any other server.</li>
 </ul>
 </section>

 <section className="mb-8">
 <h2 className="text-2xl font-semibold mb-4 text-[var(--ud-gold)]">3. Disclaimer</h2>
 <p className="mb-4 leading-relaxed text-[var(--ud-muted)]">
 The materials on Uddisha's website are provided on an"as is" basis. Uddisha makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
 </p>
 </section>

 <section className="mb-8">
 <h2 className="text-2xl font-semibold mb-4 text-[var(--ud-gold)]">4. Limitations</h2>
 <p className="mb-4 leading-relaxed text-[var(--ud-muted)]">
 In no event shall Uddisha or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Uddisha's website, even if Uddisha or a Uddisha authorized representative has been notified orally or in writing of the possibility of such damage.
 </p>
 </section>

 <section className="mb-8">
 <h2 className="text-2xl font-semibold mb-4 text-[var(--ud-gold)]">5. Governing Law</h2>
 <p className="mb-4 leading-relaxed text-[var(--ud-muted)]">
 These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
 </p>
 </section>

 <section className="mb-8">
 <h2 className="text-2xl font-semibold mb-4 text-[var(--ud-gold)]">6. Contact Us</h2>
 <p className="mb-4 leading-relaxed text-[var(--ud-muted)]">
 If you have specific questions about these Terms, please reach out to us at <a href="mailto:legal@uddisha.com" className="text-[var(--ud-gold)] underline">legal@uddisha.com</a>.
 </p>
 </section>
 </div>
);

export default TermsOfService;

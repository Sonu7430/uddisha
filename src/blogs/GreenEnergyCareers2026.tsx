// src/blogs/GreenEnergyCareers2026.tsx

import React from'react';
import BlogSEO from'../components/BlogSEO';
import AuthorByline from'../components/AuthorByline';
import RelatedPosts from'../components/RelatedPosts';

const relatedPosts = [
 { id:'top-careers-india', title:'Top 10 Emerging Careers India 2025', summary:'Discover the fastest growing career fields.' },
 { id:'top-skills-2026', title:'Top 15 Skills in Demand 2026', summary:'Future-proof your career with these skills.' },
 { id:'career-options-after-10th', title:'Career Options After 10th', summary:'Complete guide for students after 10th.' },
];

const GreenEnergyCareers2026 = () => {
 return (
 <div className="max-w-4xl mx-auto px-4 py-10 text-[var(--ud-ink)]">
 <BlogSEO
 title="Green Energy Career India 2026: Solar, Wind and Clean Tech Jobs"
 description="Complete guide to Green Energy and Clean Tech careers in India. Solar engineer, wind energy, climate tech - government incentives and salary prospects."
 slug="green-energy-careers-2026"
 date="2026-02-15"
 keywords="green energy career India, solar energy jobs, wind energy career, clean tech India, renewable energy salary, Uddisha"
 />

 <article>
 <h1 className="text-3xl font-bold mb-4 text-[var(--ud-ink)]">
 Renewable Energy & Green Jobs India 2026: Careers, Salary & Scope
 </h1>
 <AuthorByline date="2026-02-15" />

 {/* Introduction */}
 <section className="mb-6">
 <p className="text-[var(--ud-muted)] mb-4">
 India has committed to achieving <strong>500 GW of renewable energy capacity by 2030</strong> and
 <strong> net-zero emissions by 2070</strong>. This massive transition is creating millions of green jobs
 across solar, wind, electric vehicles, and sustainability sectors. The green energy sector is expected
 to create <strong>10 million new jobs by 2030</strong> in India alone.
 </p>
 <p className="text-[var(--ud-muted)]">
 From engineering roles to management positions, green careers offer competitive salaries
 (<strong>₹4-50+ LPA</strong>), job security, and the satisfaction of contributing to a sustainable future.
 </p>
 </section>

 {/* Why Green Careers */}
 <section className="mb-8">
 <h2 className="text-2xl font-semibold mb-4 mt-8 text-[var(--ud-ink)]">🌱 Why Choose Green Careers?</h2>
 <div className="grid md:grid-cols-3 gap-4">
 <div className="bg-[var(--ud-gold-pale)] border border-green-200 rounded-xl p-4 text-center">
 <div className="text-3xl mb-2">📈</div>
 <h4 className="font-semibold text-[var(--ud-ink)]">Rapid Growth</h4>
 <p className="text-sm text-[var(--ud-muted)]">40% annual growth in renewable sector</p>
 </div>
 <div className="bg-[var(--ud-gold-pale)] border border-[var(--ud-gold)] rounded-xl p-4 text-center">
 <div className="text-3xl mb-2">🏛️</div>
 <h4 className="font-semibold text-[var(--ud-ink)]">Govt. Support</h4>
 <p className="text-sm text-[var(--ud-muted)]">₹19,500 Cr investment in green hydrogen</p>
 </div>
 <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center">
 <div className="text-3xl mb-2">🌍</div>
 <h4 className="font-semibold text-purple-800">Global Demand</h4>
 <p className="text-sm text-[var(--ud-muted)]">ESG mandates driving hiring worldwide</p>
 </div>
 </div>
 </section>

 {/* Green Career Domains */}
 <section className="mb-8">
 <h2 className="text-2xl font-semibold mb-4 mt-8 text-[var(--ud-ink)]">🌿 Green Career Domains</h2>
 <ul className="list-disc pl-6 mb-4 text-[var(--ud-muted)]">
 <li><strong>Solar Energy:</strong> Installation, design, project management, solar engineers</li>
 <li><strong>Wind Energy:</strong> Turbine technicians, wind farm managers, site assessors</li>
 <li><strong>Electric Vehicles:</strong> Battery engineers, EV charger technicians, EV design</li>
 <li><strong>Green Hydrogen:</strong> Electrolyzer engineers, fuel cell specialists (emerging)</li>
 <li><strong>Environmental Engineering:</strong> Pollution control, waste management, water treatment</li>
 <li><strong>Sustainability Management:</strong> ESG reporting, carbon accounting, CSR</li>
 <li><strong>Green Building:</strong> LEED certification, sustainable architecture, energy auditing</li>
 </ul>
 </section>

 {/* Career Paths */}
 <section className="mb-8">
 <h2 className="text-2xl font-semibold mb-4 mt-8 text-[var(--ud-ink)]">🎯 Career Paths & Salaries</h2>
 <div className="overflow-x-auto">
 <table className="w-full border border-[var(--ud-border)] text-sm sm:text-base mb-4">
 <thead>
 <tr className="bg-[var(--ud-gold-pale)] text-left">
 <th className="border border-[var(--ud-border)] px-3 py-2">Role</th>
 <th className="border border-[var(--ud-border)] px-3 py-2">Experience</th>
 <th className="border border-[var(--ud-border)] px-3 py-2">Salary (India)</th>
 </tr>
 </thead>
 <tbody>
 <tr>
 <td className="border border-[var(--ud-border)] px-3 py-2 font-medium">Solar Technician</td>
 <td className="border border-[var(--ud-border)] px-3 py-2">0-2 years</td>
 <td className="border border-[var(--ud-border)] px-3 py-2">₹3-6 LPA</td>
 </tr>
 <tr>
 <td className="border border-[var(--ud-border)] px-3 py-2 font-medium">Environmental Engineer</td>
 <td className="border border-[var(--ud-border)] px-3 py-2">0-3 years</td>
 <td className="border border-[var(--ud-border)] px-3 py-2">₹4-10 LPA</td>
 </tr>
 <tr>
 <td className="border border-[var(--ud-border)] px-3 py-2 font-medium">EV Battery Engineer</td>
 <td className="border border-[var(--ud-border)] px-3 py-2">2-5 years</td>
 <td className="border border-[var(--ud-border)] px-3 py-2">₹8-20 LPA</td>
 </tr>
 <tr>
 <td className="border border-[var(--ud-border)] px-3 py-2 font-medium">Solar Project Manager</td>
 <td className="border border-[var(--ud-border)] px-3 py-2">3-6 years</td>
 <td className="border border-[var(--ud-border)] px-3 py-2">₹12-25 LPA</td>
 </tr>
 <tr>
 <td className="border border-[var(--ud-border)] px-3 py-2 font-medium">Sustainability Manager</td>
 <td className="border border-[var(--ud-border)] px-3 py-2">5-8 years</td>
 <td className="border border-[var(--ud-border)] px-3 py-2">₹15-35 LPA</td>
 </tr>
 <tr>
 <td className="border border-[var(--ud-border)] px-3 py-2 font-medium">ESG Director</td>
 <td className="border border-[var(--ud-border)] px-3 py-2">10+ years</td>
 <td className="border border-[var(--ud-border)] px-3 py-2">₹40-80 LPA</td>
 </tr>
 <tr>
 <td className="border border-[var(--ud-border)] px-3 py-2 font-medium">Chief Sustainability Officer</td>
 <td className="border border-[var(--ud-border)] px-3 py-2">15+ years</td>
 <td className="border border-[var(--ud-border)] px-3 py-2">₹80 LPA - ₹2 Cr</td>
 </tr>
 </tbody>
 </table>
 </div>
 </section>

 {/* Educational Paths */}
 <section className="mb-8">
 <h2 className="text-2xl font-semibold mb-4 mt-8 text-[var(--ud-ink)]">🎓 Educational Pathways</h2>
 <div className="space-y-4">
 <div className="bg-[var(--ud-paper)] border border-[var(--ud-border)] rounded-xl p-4">
 <h4 className="font-semibold text-[var(--ud-ink)] mb-2">🔧 Engineering Route</h4>
 <ul className="list-disc pl-5 text-[var(--ud-muted)] text-sm">
 <li>B.Tech in Renewable Energy Engineering</li>
 <li>B.Tech in Environmental Engineering</li>
 <li>B.Tech in Electrical/Mechanical + renewable specialization</li>
 <li>M.Tech in Solar/Wind Energy (IITs, NITs)</li>
 </ul>
 </div>
 <div className="bg-[var(--ud-paper)] border border-[var(--ud-border)] rounded-xl p-4">
 <h4 className="font-semibold text-[var(--ud-gold)] mb-2">📊 Management Route</h4>
 <ul className="list-disc pl-5 text-[var(--ud-muted)] text-sm">
 <li>MBA in Sustainability Management</li>
 <li>MBA in Energy Management (IIMs, ISB)</li>
 <li>PG Diploma in Environmental Management</li>
 <li>ESG certification courses</li>
 </ul>
 </div>
 <div className="bg-[var(--ud-paper)] border border-[var(--ud-border)] rounded-xl p-4">
 <h4 className="font-semibold text-[var(--ud-ink)] mb-2">📜 Certifications</h4>
 <ul className="list-disc pl-5 text-[var(--ud-muted)] text-sm">
 <li><strong>NABCEP</strong> - Solar industry standard (international)</li>
 <li><strong>LEED Green Associate</strong> - Green building certification</li>
 <li><strong>CEM (Certified Energy Manager)</strong> - Energy auditing</li>
 <li><strong>GRI Sustainability Reporting</strong> - ESG focused</li>
 </ul>
 </div>
 </div>
 </section>

 {/* Emerging Opportunities */}
 <section className="mb-8">
 <h2 className="text-2xl font-semibold mb-4 mt-8 text-[var(--ud-ink)]">🚀 Emerging Opportunities (2026+)</h2>
 <div className="grid md:grid-cols-2 gap-4">
 <div className="bg-[var(--ud-gold-pale)] p-4 rounded-xl">
 <h4 className="font-semibold text-[var(--ud-ink)] mb-2">🔋 Green Hydrogen</h4>
 <p className="text-sm text-[var(--ud-muted)]">India's National Green Hydrogen Mission creating new roles in electrolyzer manufacturing and fuel cell technology.</p>
 </div>
 <div className="bg-[var(--ud-gold-pale)] p-4 rounded-xl">
 <h4 className="font-semibold text-[var(--ud-ink)] mb-2">⚡ EV Ecosystem</h4>
 <p className="text-sm text-[var(--ud-muted)]">Battery recycling, charging infrastructure, and EV component manufacturing creating 10L+ jobs.</p>
 </div>
 <div className="bg-[var(--ud-gold-pale)] p-4 rounded-xl">
 <h4 className="font-semibold text-purple-800 mb-2">🌊 Offshore Wind</h4>
 <p className="text-sm text-[var(--ud-muted)]">India targeting 30 GW offshore wind by 2030, creating specialized marine energy jobs.</p>
 </div>
 <div className="bg-[var(--ud-gold-pale)] p-4 rounded-xl">
 <h4 className="font-semibold text-orange-800 mb-2">🏢 ESG Compliance</h4>
 <p className="text-sm text-[var(--ud-muted)]">SEBI mandates driving demand for ESG analysts, carbon accountants, and sustainability consultants.</p>
 </div>
 </div>
 </section>

 {/* Top Companies */}
 <section className="mb-8">
 <h2 className="text-2xl font-semibold mb-4 mt-8 text-[var(--ud-ink)]">🏢 Top Hiring Companies in India</h2>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
 {['Tata Power','Adani Green','ReNew Power','Suzlon','Ola Electric','Ather Energy','Azure Power','NTPC','BHEL','L&T','Mahindra','Hero Electric'].map((company) => (
 <div key={company} className="bg-[var(--ud-gold-pale)] rounded-lg p-3 text-center font-medium text-sm">
 {company}
 </div>
 ))}
 </div>
 </section>

 {/* Transition to Green */}
 <section className="mb-8">
 <h2 className="text-2xl font-semibold mb-4 mt-8 text-[var(--ud-ink)]">🔄 How to Transition to Green Energy From Engineering/MBA</h2>
 <div className="grid md:grid-cols-2 gap-4 mb-4">
 <div className="bg-[var(--ud-paper)] border rounded-xl p-4">
 <h4 className="font-semibold mb-2">🔧 From Mechanical/Electrical Engineering</h4>
 <ul className="list-disc pl-5 text-sm text-[var(--ud-muted)] space-y-1">
 <li>Your core skills in thermodynamics, fluid mechanics, electrical systems are directly applicable</li>
 <li>Add: Solar PV design (AutoCAD PVSyst), wind turbine fundamentals (Bladed), EV battery management</li>
 <li>Target: Solar project engineering at Tata Power, Adani Green, NTPC Renewable</li>
 <li>Certification: NABCEP (in 6 months), CEM after 2 years</li>
 </ul>
 </div>
 <div className="bg-[var(--ud-paper)] border rounded-xl p-4">
 <h4 className="font-semibold mb-2">💼 From MBA / Management</h4>
 <ul className="list-disc pl-5 text-sm text-[var(--ud-muted)] space-y-1">
 <li>Sustainability management, ESG reporting, and green project financing are high-demand niches</li>
 <li>Add: GRI Sustainability Reporting certification, SEBI BRSR framework knowledge</li>
 <li>Target: ESG Analyst at mutual funds/SEBI-regulated entities, Sustainability Manager at top 500 companies</li>
 <li>IIM/ISB programs offer MBA in Energy Management with strong placements</li>
 </ul>
 </div>
 </div>

 <h3 className="text-xl font-semibold mb-3 text-[var(--ud-ink)]">Government Schemes Driving Green Hiring</h3>
 <ul className="list-disc pl-6 text-[var(--ud-muted)] space-y-2 mb-4">
 <li><strong>PM-KUSUM Scheme:</strong> 3.5 lakh solar pumps for farmers — driving installation engineers + rural electrification specialists</li>
 <li><strong>FAME-II (Faster Adoption and Manufacturing of EVs):</strong> ₹10,000 Cr subsidy creating EV charging infrastructure and manufacturing jobs</li>
 <li><strong>National Green Hydrogen Mission (₹19,744 Cr):</strong> Creating 600,000 jobs in hydrogen production, storage, transportation by 2030</li>
 <li><strong>Rooftop Solar Phase III:</strong> 1 Crore households to get rooftop solar — driving demand for solar surveyors, installer-technicians, quality engineers</li>
 </ul>
 </section>

 {/* India's Top Green Projects */}
 <section className="mb-8">
 <h2 className="text-2xl font-semibold mb-4 mt-8 text-[var(--ud-ink)]">🏗️ India's Top Green Energy Projects Driving Hiring</h2>
 <div className="grid md:grid-cols-2 gap-4 mb-4">
 {[
 { name:'Adani Green Khavda Solar Park', size:'30 GW — World\'s largest solar park (Gujarat)', role:'Solar engineers, O&M technicians, data analysts' },
 { name:'NTPC Floating Solar (Ramagundam)', size:'100 MW floating solar farm', role:'Marine engineers, environmental consultants' },
 { name:'Ola Electric GigaFactory', size:'World\'s largest 2-wheeler EV factory (Tamil Nadu)', role:'Battery R&D, manufacturing engineers, quality' },
 { name:'National High Speed Rail (NHSRCL)', size:'Bullet train project with green mobility focus', role:'Transit electrification, green corridor planning' },
 ].map((p) => (
 <div key={p.name} className="bg-[var(--ud-paper)] border rounded-xl p-4">
 <h4 className="font-semibold text-[var(--ud-ink)] mb-1">{p.name}</h4>
 <p className="text-xs text-[var(--ud-muted)] mb-1">{p.size}</p>
 <p className="text-sm text-[var(--ud-muted)]"><strong>Roles:</strong> {p.role}</p>
 </div>
 ))}
 </div>
 </section>

 {/* CTA */}
 <section className="mt-10 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-xl text-sm sm:text-base">
 🌱 <strong>Is a green career right for you?</strong> Take the{''}
 <a href="https://www.uddisha.com/assessment" className="text-yellow-700 font-bold underline">
 Free Career Assessment
 </a>{''}
 on <span className="font-semibold text-yellow-700">Uddisha</span> and discover
 careers that match your passion for sustainability and technical interests.
 </section>

 <RelatedPosts posts={relatedPosts} />
 </article>
 </div>
 );
};

export default GreenEnergyCareers2026;

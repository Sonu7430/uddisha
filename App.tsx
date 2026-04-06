import React, { Suspense, lazy, ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout'; // Assuming a Layout component exists for nav/footer

// Import your pages
import HomePage from './pages/HomePage';
import AssessmentPage from './pages/AssessmentPage';
import ResultsPage from './pages/ResultsPage';
import CareersPage from './pages/CareersPage';
import CareerDetailPage from './pages/CareerDetailPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsofService';
import CookiePolicy from './pages/CookiePolicy';
import ContactUsPage from './pages/ContactUsPage';

// Helper for lazy loading with Suspense
const lazyWithSuspense = (factory: () => Promise<{ default: React.ComponentType<any>; }>) => {
  const LazyComponent = lazy(factory);
  return <Suspense fallback={<div>Loading...</div>}><LazyComponent /></Suspense>;
};

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/assessment" element={<AssessmentPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/career/:id" element={<CareerDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/contact-us" element={<ContactUsPage />} />

            {/* Blog post routes */}
            <Route path="/blog/never-take-career-advice-from-parents" element={lazyWithSuspense(() => import('./pages/blogs/CareerAdviceBlog'))} />
            <Route path="/blog/ai-career-guidance" element={lazyWithSuspense(() => import('./pages/blogs/AIRevolution'))} />
            <Route path="/blog/top-careers-india" element={lazyWithSuspense(() => import('./pages/blogs/EmergingCareers'))} />
            <Route path="/blog/resume-tips" element={lazyWithSuspense(() => import('./blogs/ResumeTips'))} />
            <Route path="/blog/wrong-career-path" element={lazyWithSuspense(() => import('./pages/blogs/WrongCareerPath'))} />
            <Route path="/blog/passion-isnt-enough" element={lazyWithSuspense(() => import('./pages/blogs/PassionIsntEnough'))} />
            <Route path="/blog/career-mirage" element={lazyWithSuspense(() => import('./pages/blogs/CareerMirage'))} />
            <Route path="/blog/perfect-career-myth" element={lazyWithSuspense(() => import('./pages/blogs/PerfectCareerMyth'))} />
            <Route path="/blog/healthcare-careers-2025" element={lazyWithSuspense(() => import('./pages/blogs/HealthcareCareers2025'))} />
            <Route path="/blog/right-career-path-after-12th" element={lazyWithSuspense(() => import('./pages/blogs/RightCareerPath'))} />
            <Route path="/blog/commerce-career-paths-after-12th" element={lazyWithSuspense(() => import('./pages/blogs/CommerceCareerPaths'))} />
            <Route path="/blog/college-vs-passion" element={lazyWithSuspense(() => import('./pages/blogs/CollegeVsPassion'))} />
            <Route path="/blog/future-of-work-2035" element={lazyWithSuspense(() => import('./pages/blogs/FutureOfWork2035'))} />
          </Routes>
        </Layout>
      </Router>
    </HelmetProvider>
  );
}

export default App;
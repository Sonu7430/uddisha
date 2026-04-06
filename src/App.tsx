// src/App.tsx

import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LoadingFallback from './components/LoadingFallback';
import Header from './components/Header';
import Footer from './components/Footer';
const FeedbackForm = lazy(() => import('./components/FeedbackForm'));
const AIChatbot = lazy(() => import('./components/AIChatbot'));
import HomePage from './pages/HomePage';
const AboutPage = lazy(() => import('./pages/AboutPage'));
const AssessmentPage = lazy(() => import('./pages/AssessmentPage'));
const CareersPage = lazy(() => import('./pages/CareersPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const ResultsPage = lazy(() => import('./pages/ResultsPage'));
const CareerDetailPage = lazy(() => import('./pages/CareerDetailPage'));
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsofService'; // Note: Your file is named "TermsofService"
import CookiePolicy from './pages/CookiePolicy';
import NotFoundPage from './pages/NotFoundPage';
const ContactUsPage = lazy(() => import('./pages/ContactUsPage'));
const CounsellingPage = lazy(() => import('./pages/CounsellingPage'));

// Lazy load blog components
const AIRevolution = lazy(() => import('./blogs/AIRevolution'));
const EmergingCareers = lazy(() => import('./blogs/EmergingCareers'));
const ResumeTips = lazy(() => import('./blogs/ResumeTips'));
const WrongCareerPath = lazy(() => import('./blogs/WrongCareerPath'));
const PassionIsntEnough = lazy(() => import('./blogs/PassionIsntEnough'));
const CareerMirage = lazy(() => import('./blogs/CareerMirage'));
const PerfectCareerMyth = lazy(() => import('./blogs/PerfectCareerMyth'));
const HealthcareCareers2025 = lazy(() => import('./blogs/HealthcareCareers2025'));
const RightCareerPath = lazy(() => import('./blogs/RightCareerPath'));
const CommerceCareerPaths = lazy(() => import('./blogs/CommerceCareerPaths'));
const CollegeVsPassion = lazy(() => import('./blogs/CollegeVsPassion'));
const BeginnerAIProjects = lazy(() => import('./blogs/BeginnerAIProjects'));
const FutureOfWork2035 = lazy(() => import('./blogs/FutureOfWork2035'));
const CareerAdviceBlog = lazy(() => import('./blogs/CareerAdviceBlog'));
const PersonalBranding2026 = lazy(() => import('./blogs/PersonalBranding2026'));
const CareerOptionsAfter10th = lazy(() => import('./blogs/CareerOptionsAfter10th'));
const CareerAfterBTech = lazy(() => import('./blogs/CareerAfterBTech'));
const JEECounseling2026 = lazy(() => import('./blogs/JEECounseling2026'));
const NEETCounseling2026 = lazy(() => import('./blogs/NEETCounseling2026'));
const GovernmentJobsGuide = lazy(() => import('./blogs/GovernmentJobsGuide'));
const DataScienceCareer2026 = lazy(() => import('./blogs/DataScienceCareer2026'));
const TopSkills2026 = lazy(() => import('./blogs/TopSkills2026'));
const StudyAbroadGuide2026 = lazy(() => import('./blogs/StudyAbroadGuide2026'));
const DigitalMarketingCareer = lazy(() => import('./blogs/DigitalMarketingCareer'));
const ArtsCareerPaths = lazy(() => import('./blogs/ArtsCareerPaths'));
const MBAvsMS = lazy(() => import('./blogs/MBAvsMS'));
const CybersecurityCareer2026 = lazy(() => import('./blogs/CybersecurityCareer2026'));
const FreelanceCareer2026 = lazy(() => import('./blogs/FreelanceCareer2026'));
const PsychologyCareer2026 = lazy(() => import('./blogs/PsychologyCareer2026'));
const ContentCreatorCareer2026 = lazy(() => import('./blogs/ContentCreatorCareer2026'));
const RemoteWorkGuide2026 = lazy(() => import('./blogs/RemoteWorkGuide2026'));
const AICareerPath2026 = lazy(() => import('./blogs/AICareerPath2026'));
const CloudComputingCareer2026 = lazy(() => import('./blogs/CloudComputingCareer2026'));
const UXUIDesignCareer2026 = lazy(() => import('./blogs/UXUIDesignCareer2026'));
const GreenEnergyCareers2026 = lazy(() => import('./blogs/GreenEnergyCareers2026'));
const InterviewTips2026 = lazy(() => import('./blogs/InterviewTips2026'));
const BlockchainCareer2026 = lazy(() => import('./blogs/BlockchainCareer2026'));
const ProductManagementCareer2026 = lazy(() => import('./blogs/ProductManagementCareer2026'));
const FinanceCareerPaths2026 = lazy(() => import('./blogs/FinanceCareerPaths2026'));
const TeachingCareer2026 = lazy(() => import('./blogs/TeachingCareer2026'));
const LawCareerIndia2026 = lazy(() => import('./blogs/LawCareerIndia2026'));
const BiotechCareer2026 = lazy(() => import('./blogs/BiotechCareer2026'));
const HospitalityTourismCareer2026 = lazy(() => import('./blogs/HospitalityTourismCareer2026'));
const SupplyChainCareer2026 = lazy(() => import('./blogs/SupplyChainCareer2026'));
const MediaJournalism2026 = lazy(() => import('./blogs/MediaJournalism2026'));
const SportsManagementCareer2026 = lazy(() => import('./blogs/SportsManagementCareer2026'));
const EventManagementCareer2026 = lazy(() => import('./blogs/EventManagementCareer2026'));
const PharmacyCareer2026 = lazy(() => import('./blogs/PharmacyCareer2026'));
const AnimationVFXCareer2026 = lazy(() => import('./blogs/AnimationVFXCareer2026'));
const RealEstateCareer2026 = lazy(() => import('./blogs/RealEstateCareer2026'));
const FashionDesignCareer2026 = lazy(() => import('./blogs/FashionDesignCareer2026'));
const ArchitectureInteriorDesignCareer2026 = lazy(() => import('./blogs/ArchitectureInteriorDesignCareer2026'));
const AgricultureAgritechCareer2026 = lazy(() => import('./blogs/AgricultureAgritechCareer2026'));
const AviationAerospaceCareer2026 = lazy(() => import('./blogs/AviationAerospaceCareer2026'));
const UPSCCivilServicesCareer2026 = lazy(() => import('./blogs/UPSCCivilServicesCareer2026'));
const MerchantNavyCareer2026 = lazy(() => import('./blogs/MerchantNavyCareer2026'));
const DefenceCareerIndia2026 = lazy(() => import('./blogs/DefenceCareerIndia2026'));
const CACareerIndia2026 = lazy(() => import('./blogs/CACareerIndia2026'));
const RoboticsIoTCareer2026 = lazy(() => import('./blogs/RoboticsIoTCareer2026'));
const GamingEsportsCareer2026 = lazy(() => import('./blogs/GamingEsportsCareer2026'));
const HRManagementCareer2026 = lazy(() => import('./blogs/HRManagementCareer2026'));
const NursingCareer2026 = lazy(() => import('./blogs/NursingCareer2026'));
const NutritionDietitianCareer2026 = lazy(() => import('./blogs/NutritionDietitianCareer2026'));
const EnvironmentalScienceCareer2026 = lazy(() => import('./blogs/EnvironmentalScienceCareer2026'));
const GraphicDesignCareer2026 = lazy(() => import('./blogs/GraphicDesignCareer2026'));
const SocialWorkCareer2026 = lazy(() => import('./blogs/SocialWorkCareer2026'));
const CivilEngineeringCareer2026 = lazy(() => import('./blogs/CivilEngineeringCareer2026'));
const GapYearGuide2026 = lazy(() => import('./blogs/GapYearGuide2026'));

// Component to handle scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Enhanced scroll to top with smooth theme transition
    const scrollToTop = () => {
      try {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      } catch (err) {
        window.scrollTo(0, 0);
      }
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Immediate scroll
    scrollToTop();

    // Fallback with delay for route transitions
    const timeoutId = setTimeout(scrollToTop, 50);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
}


function App() {
  // Force Uddisha light theme - remove any legacy dark mode
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    localStorage.removeItem('theme');
  }, []);


  return (
    <Router>
      <ScrollToTop />
      {/* AdLoader removed from initial load for performance - ads load via index.html after user interaction */}

      <div className="min-h-screen transition-all duration-300" style={{ background: 'var(--ud-paper)', color: 'var(--ud-ink)' }}>
        <Header />
        <main id="main-content" className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={
              <Suspense fallback={<LoadingFallback message="Loading about page..." />}>
                <AboutPage />
              </Suspense>
            } />
            <Route path="/assessment" element={
              <Suspense fallback={<LoadingFallback message="Loading assessment..." />}>
                <AssessmentPage />
              </Suspense>
            } />

            {/* Lazy loaded routes with suspense fallbacks */}
            <Route path="/careers" element={
              <Suspense fallback={<LoadingFallback message="Loading careers..." />}>
                <CareersPage />
              </Suspense>
            } />
            <Route path="/career/:id" element={
              <Suspense fallback={<LoadingFallback message="Loading career details..." />}>
                <CareerDetailPage />
              </Suspense>
            } />
            <Route path="/results" element={
              <Suspense fallback={<LoadingFallback message="Loading results..." />}>
                <ResultsPage />
              </Suspense>
            } />

            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/contact-us" element={
              <Suspense fallback={<LoadingFallback message="Loading contact form..." />}>
                <ContactUsPage />
              </Suspense>
            } />

            <Route path="/counselling" element={
              <Suspense fallback={<LoadingFallback message="Loading counselling page..." />}>
                <CounsellingPage />
              </Suspense>
            } />

            {/* Blog routes with suspense fallbacks */}
            <Route path="/blog" element={
              <Suspense fallback={<LoadingFallback message="Loading blog posts..." />}>
                <BlogPage />
              </Suspense>
            } />
            <Route path="/blog/ai-career-guidance" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <AIRevolution />
              </Suspense>
            } />
            <Route path="/blog/top-careers-india" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <EmergingCareers />
              </Suspense>
            } />
            <Route path="/blog/resume-tips" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <ResumeTips />
              </Suspense>
            } />
            <Route path="/blog/wrong-career-path" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <WrongCareerPath />
              </Suspense>
            } />
            <Route path="/blog/passion-isnt-enough" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <PassionIsntEnough />
              </Suspense>
            } />
            <Route path="/blog/career-mirage" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <CareerMirage />
              </Suspense>
            } />
            <Route path="/blog/college-vs-passion" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <CollegeVsPassion />
              </Suspense>
            } />
            <Route path="/blog/beginner-ai-projects" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <BeginnerAIProjects />
              </Suspense>
            } />
            <Route path="/blog/perfect-career-myth" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <PerfectCareerMyth />
              </Suspense>
            } />
            <Route path="/blog/healthcare-careers-2025" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <HealthcareCareers2025 />
              </Suspense>
            } />
            <Route path="/blog/right-career-path-after-12th" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <RightCareerPath />
              </Suspense>
            } />
            <Route path="/blog/commerce-career-paths-after-12th" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <CommerceCareerPaths />
              </Suspense>
            } />
            <Route path="/blog/future-of-work-2035" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <FutureOfWork2035 />
              </Suspense>
            } />
            <Route path="/blog/never-take-career-advice-from-parents" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <CareerAdviceBlog />
              </Suspense>
            } />
            <Route path="/blog/personal-branding-career-success-2026" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <PersonalBranding2026 />
              </Suspense>
            } />
            <Route path="/blog/career-options-after-10th" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <CareerOptionsAfter10th />
              </Suspense>
            } />
            <Route path="/blog/career-after-btech" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <CareerAfterBTech />
              </Suspense>
            } />
            <Route path="/blog/jee-counseling-2026" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <JEECounseling2026 />
              </Suspense>
            } />
            <Route path="/blog/neet-counseling-2026" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <NEETCounseling2026 />
              </Suspense>
            } />
            <Route path="/blog/government-jobs-guide" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <GovernmentJobsGuide />
              </Suspense>
            } />
            <Route path="/blog/data-science-career-2026" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <DataScienceCareer2026 />
              </Suspense>
            } />
            <Route path="/blog/top-skills-2026" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <TopSkills2026 />
              </Suspense>
            } />
            <Route path="/blog/study-abroad-guide-2026" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <StudyAbroadGuide2026 />
              </Suspense>
            } />
            <Route path="/blog/digital-marketing-career" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <DigitalMarketingCareer />
              </Suspense>
            } />
            <Route path="/blog/arts-career-paths" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <ArtsCareerPaths />
              </Suspense>
            } />
            <Route path="/blog/mba-vs-ms" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <MBAvsMS />
              </Suspense>
            } />
            <Route path="/blog/cybersecurity-career-2026" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <CybersecurityCareer2026 />
              </Suspense>
            } />
            <Route path="/blog/freelance-career-guide" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <FreelanceCareer2026 />
              </Suspense>
            } />
            <Route path="/blog/psychology-career-paths" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <PsychologyCareer2026 />
              </Suspense>
            } />
            <Route path="/blog/content-creator-career" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <ContentCreatorCareer2026 />
              </Suspense>
            } />
            <Route path="/blog/remote-work-guide-2026" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <RemoteWorkGuide2026 />
              </Suspense>
            } />
            <Route path="/blog/ai-career-path-2026" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <AICareerPath2026 />
              </Suspense>
            } />
            <Route path="/blog/cloud-computing-career-2026" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <CloudComputingCareer2026 />
              </Suspense>
            } />
            <Route path="/blog/ux-ui-design-career-2026" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <UXUIDesignCareer2026 />
              </Suspense>
            } />
            <Route path="/blog/green-energy-careers-2026" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <GreenEnergyCareers2026 />
              </Suspense>
            } />
            <Route path="/blog/interview-tips-freshers-2026" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <InterviewTips2026 />
              </Suspense>
            } />
            <Route path="/blog/blockchain-web3-career-2026" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <BlockchainCareer2026 />
              </Suspense>
            } />
            <Route path="/blog/product-management-career" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <ProductManagementCareer2026 />
              </Suspense>
            } />
            <Route path="/blog/finance-career-paths-2026" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <FinanceCareerPaths2026 />
              </Suspense>
            } />
            <Route path="/blog/teaching-edtech-career-2026" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <TeachingCareer2026 />
              </Suspense>
            } />
            <Route path="/blog/law-career-india-2026" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <LawCareerIndia2026 />
              </Suspense>
            } />
            <Route path="/blog/biotech-career-2026" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <BiotechCareer2026 />
              </Suspense>
            } />
            <Route path="/blog/hospitality-tourism-career-2026" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <HospitalityTourismCareer2026 />
              </Suspense>
            } />
            <Route path="/blog/supply-chain-career-2026" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <SupplyChainCareer2026 />
              </Suspense>
            } />
            <Route path="/blog/media-journalism-career-2026" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <MediaJournalism2026 />
              </Suspense>
            } />
            <Route path="/blog/sports-management-career-2026" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <SportsManagementCareer2026 />
              </Suspense>
            } />
            <Route path="/blog/event-management-career-2026" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <EventManagementCareer2026 />
              </Suspense>
            } />
            <Route path="/blog/pharmacy-career-2026" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <PharmacyCareer2026 />
              </Suspense>
            } />
            <Route path="/blog/animation-vfx-career-2026" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <AnimationVFXCareer2026 />
              </Suspense>
            } />
            <Route path="/blog/real-estate-career-2026" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <RealEstateCareer2026 />
              </Suspense>
            } />
            <Route path="/blog/fashion-design-career-2026" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <FashionDesignCareer2026 />
              </Suspense>
            } />
            <Route path="/blog/architecture-interior-design-career-2026" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <ArchitectureInteriorDesignCareer2026 />
              </Suspense>
            } />
            <Route path="/blog/agriculture-agritech-career-2026" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <AgricultureAgritechCareer2026 />
              </Suspense>
            } />
            <Route path="/blog/aviation-aerospace-career-2026" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <AviationAerospaceCareer2026 />
              </Suspense>
            } />
            <Route path="/blog/upsc-civil-services-career-2026" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <UPSCCivilServicesCareer2026 />
              </Suspense>
            } />
            <Route path="/blog/merchant-navy-career-2026" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <MerchantNavyCareer2026 />
              </Suspense>
            } />
            <Route path="/blog/defence-career-india-2026" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <DefenceCareerIndia2026 />
              </Suspense>
            } />
            <Route path="/blog/ca-career-india-2026" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <CACareerIndia2026 />
              </Suspense>
            } />
            <Route path="/blog/robotics-iot-career-2026" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <RoboticsIoTCareer2026 />
              </Suspense>
            } />
            <Route path="/blog/gaming-esports-career-2026" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <GamingEsportsCareer2026 />
              </Suspense>
            } />
            <Route path="/blog/hr-management-career-2026" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <HRManagementCareer2026 />
              </Suspense>
            } />
            <Route path="/blog/nursing-career-india-2026" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <NursingCareer2026 />
              </Suspense>
            } />
            <Route path="/blog/nutrition-dietitian-career-2026" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <NutritionDietitianCareer2026 />
              </Suspense>
            } />
            <Route path="/blog/environmental-science-career-2026" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <EnvironmentalScienceCareer2026 />
              </Suspense>
            } />
            <Route path="/blog/graphic-design-career-2026" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <GraphicDesignCareer2026 />
              </Suspense>
            } />
            <Route path="/blog/social-work-career-india-2026" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <SocialWorkCareer2026 />
              </Suspense>
            } />
            <Route path="/blog/civil-engineering-career-2026" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <CivilEngineeringCareer2026 />
              </Suspense>
            } />
            <Route path="/blog/gap-year-guide-india-2026" element={
              <Suspense fallback={<LoadingFallback message="Loading article..." />}>
                <GapYearGuide2026 />
              </Suspense>
            } />

            {/* 404 Catch-all route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer />
        <Suspense fallback={null}>
          <FeedbackForm />
          <AIChatbot />
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
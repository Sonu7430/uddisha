# inject-author.ps1
# Mass-injects AuthorByline component to all blog files for E-E-A-T
$ErrorActionPreference = "Continue"

Set-Location "c:\Users\lenovo\careercompas"
$blogsDir = "src\blogs"

$blogData = @(
    @("AICareerPath2026.tsx","ai-career-path-2026","AI Career Path India 2026: Complete Guide","Explore AI career paths...","2026-02-15"),
    @("AIRevolution.tsx","ai-career-guidance","How AI is Revolutionizing Career Guidance","Discover how AI...","2025-07-15"),
    @("AgricultureAgritechCareer2026.tsx","agriculture-agritech-career-2026","Agriculture and AgriTech Career India 2026","Complete guide...","2026-02-18"),
    @("AnimationVFXCareer2026.tsx","animation-vfx-career-2026","Animation and VFX Career India 2026: Complete Guide","Complete guide...","2026-02-15"),
    @("ArchitectureInteriorDesignCareer2026.tsx","architecture-interior-design-career-2026","Architecture and Interior Design Career India 2026","Complete guide...","2026-02-20"),
    @("ArtsCareerPaths.tsx","arts-career-paths","Arts Career Paths: High-Paying Humanities Jobs India","Discover high-paying...","2026-01-12"),
    @("AviationAerospaceCareer2026.tsx","aviation-aerospace-career-2026","Aviation and Aerospace Career India 2026: Complete Guide","Guide to Aviation...","2026-02-18"),
    @("BeginnerAIProjects.tsx","beginner-ai-projects","Zero Cost AI Portfolio: 3 Beginner Projects to Start Your AI Career","Build real AI projects...","2025-12-15"),
    @("BiotechCareer2026.tsx","biotech-career-2026","Biotechnology Career India 2026: Salaries, Skills and Opportunities","Complete guide...","2026-02-15"),
    @("BlockchainCareer2026.tsx","blockchain-web3-career-2026","Blockchain and Web3 Career India 2026: Salary, Skills and Roadmap","Complete guide...","2026-02-15"),
    @("CACareerIndia2026.tsx","ca-career-india-2026","Chartered Accountant CA Career India 2026: Complete Guide","Complete guide...","2026-03-15"),
    @("CareerAdviceBlog.tsx","never-take-career-advice-from-parents","Why You Should Never Take Career Advice from Your Parents","Honest advice...","2025-10-15"),
    @("CareerAfterBTech.tsx","career-after-btech","Career Options After BTech: Jobs, GATE, MBA, MS and More","Complete guide...","2026-01-20"),
    @("CareerMirage.tsx","career-mirage","The Career Mirage: Why Your Dream Job May Disappoint You","The truth about...","2025-08-18"),
    @("CivilEngineeringCareer2026.tsx","civil-engineering-career-2026","Civil Engineering Career India 2026: Salary, Scope and Roadmap","Complete guide...","2026-03-15"),
    @("CloudComputingCareer2026.tsx","cloud-computing-career-2026","Cloud Computing Career India 2026: AWS, Azure and GCP Guide","Complete guide...","2026-02-15"),
    @("CollegeVsPassion.tsx","college-vs-passion","Prestigious College vs Your Passion: What Matters More in India?","Should you choose...","2025-09-10"),
    @("CommerceCareerPaths.tsx","commerce-career-paths-after-12th","25 Commerce Career Paths After 12th: Beyond CA and MBA","Discover 25+ career...","2025-09-10"),
    @("ContentCreatorCareer2026.tsx","content-creator-career","Content Creator Career India 2026: From Hobby to Full-Time Income","Complete guide to...","2026-01-10"),
    @("CybersecurityCareer2026.tsx","cybersecurity-career-2026","Cybersecurity Career India 2026: Salary, Certifications and Roadmap","Complete guide...","2026-01-10"),
    @("DefenceCareerIndia2026.tsx","defence-career-india-2026","Defence Career India 2026: Army, Navy, Air Force and UPSC CDS","Complete guide...","2026-03-15"),
    @("DigitalMarketingCareer.tsx","digital-marketing-career","Digital Marketing Career India 2026: Salary, Skills and Roadmap","Complete guide...","2026-01-12"),
    @("EmergingCareers.tsx","top-careers-india","10 Emerging Careers Shaping the Future of Work in India","Discover 10 emerging...","2025-06-15"),
    @("EnvironmentalScienceCareer2026.tsx","environmental-science-career-2026","Environmental Science Career India 2026: Green Careers Guide","Complete guide...","2026-03-15"),
    @("EventManagementCareer2026.tsx","event-management-career-2026","Event Management Career India 2026: Salary, Courses and Growth","Complete guide...","2026-02-15"),
    @("FashionDesignCareer2026.tsx","fashion-design-career-2026","Fashion Design Career India 2026: NIFT, Salary and Opportunities","Complete guide...","2026-02-15"),
    @("FinanceCareerPaths2026.tsx","finance-career-paths-2026","Finance Career Paths India 2026: Investment Banking, CFA and More","Complete guide...","2026-02-15"),
    @("FreelanceCareer2026.tsx","freelance-career-guide","Freelance Career Guide India 2026: How to Earn Rs1-10L Per Month","Complete guide to...","2026-01-10"),
    @("FutureOfWork2035.tsx","future-of-work-2035","The Future of Work in 2035: Skills and Careers That Will Thrive","What will the job...","2025-09-15"),
    @("GamingEsportsCareer2026.tsx","gaming-esports-career-2026","Gaming and Esports Career India 2026: Pro Player, Game Dev and More","Complete guide...","2026-03-15"),
    @("GapYearGuide2026.tsx","gap-year-guide-india-2026","Gap Year Guide India 2026: How to Make the Most of Your Time Off","Complete guide to...","2026-03-15"),
    @("GovernmentJobsGuide.tsx","government-jobs-guide","Government Jobs India 2026: Complete Guide to UPSC, SSC, Banking","Complete guide...","2026-01-15"),
    @("GraphicDesignCareer2026.tsx","graphic-design-career-2026","Graphic Design Career India 2026: Salary, Skills and Portfolio Guide","Complete guide...","2026-03-15"),
    @("GreenEnergyCareers2026.tsx","green-energy-careers-2026","Green Energy Career India 2026: Solar, Wind and Clean Tech Jobs","Complete guide...","2026-02-15"),
    @("HRManagementCareer2026.tsx","hr-management-career-2026","HR Management Career India 2026: Salary, Skills and Growth Path","Complete guide...","2026-03-15"),
    @("HealthcareCareers2025.tsx","healthcare-careers-2025","Healthcare Careers India 2025: Beyond MBBS - Allied Health and More","Explore diverse...","2025-08-15"),
    @("HospitalityTourismCareer2026.tsx","hospitality-tourism-career-2026","Hospitality and Tourism Career India 2026: Hotels, Travel and More","Complete guide...","2026-02-15"),
    @("InterviewTips2026.tsx","interview-tips-freshers-2026","Job Interview Tips for Freshers 2026: Complete Preparation Guide","Complete interview...","2026-02-15"),
    @("LawCareerIndia2026.tsx","law-career-india-2026","Law Career India 2026: CLAT, LLB, Salary and Career Paths","Complete guide...","2026-02-15"),
    @("MBAvsMS.tsx","mba-vs-ms","MBA vs MS: Which One Should You Choose After Engineering?","Complete comparison...","2026-01-12"),
    @("MediaJournalism2026.tsx","media-journalism-career-2026","Media and Journalism Career India 2026: Salary, Scope and Opportunities","Complete guide...","2026-02-15"),
    @("MerchantNavyCareer2026.tsx","merchant-navy-career-2026","Merchant Navy Career India 2026: Salary, Courses and Life at Sea","Complete guide...","2026-02-15"),
    @("NEETCounseling2026.tsx","neet-counseling-2026","NEET Counseling 2026: Complete Guide to MBBS and BDS Admission","Complete guide to...","2026-01-15"),
    @("NursingCareer2026.tsx","nursing-career-india-2026","Nursing Career India 2026: Salary, Abroad Opportunities and Growth","Complete guide to...","2026-03-15"),
    @("NutritionDietitianCareer2026.tsx","nutrition-dietitian-career-2026","Nutrition and Dietitian Career India 2026: Salary, Courses and Scope","Complete guide...","2026-03-15"),
    @("PassionIsntEnough.tsx","passion-isnt-enough","Passion Isnt Enough: What a Successful Career Really Requires","Why following your...","2025-07-18"),
    @("PerfectCareerMyth.tsx","perfect-career-myth","The Perfect Career Myth: Why There Is No Such Thing as the Dream Job","Why the perfect...","2025-08-20"),
    @("PersonalBranding2026.tsx","personal-branding-career-success-2026","Personal Branding for Career Success India 2026: Complete Guide","How to build a...","2026-01-08"),
    @("PharmacyCareer2026.tsx","pharmacy-career-2026","Pharmacy Career India 2026: B.Pharm, D.Pharm, Salary and Scope","Complete guide...","2026-02-15"),
    @("ProductManagementCareer2026.tsx","product-management-career","Product Management Career India 2026: PM Roadmap and Salary Guide","Complete guide...","2026-02-15"),
    @("PsychologyCareer2026.tsx","psychology-career-paths","Psychology Career Paths India 2026: Clinical, Industrial and More","Complete guide...","2026-01-10"),
    @("RealEstateCareer2026.tsx","real-estate-career-2026","Real Estate Career India 2026: Agent, Developer and PropTech Jobs","Complete guide...","2026-02-15"),
    @("RemoteWorkGuide2026.tsx","remote-work-guide-2026","Remote Work India 2026: How to Find and Land Remote Jobs","Complete guide...","2026-01-10"),
    @("ResumeTips.tsx","resume-tips","Resume Writing Tips India 2026: ATS-Optimized Resume Guide","Complete resume...","2025-05-15"),
    @("RightCareerPath.tsx","right-career-path-after-12th","Choosing the Right Career Path After 12th: A Complete Guide","How to choose...","2025-08-15"),
    @("RoboticsIoTCareer2026.tsx","robotics-iot-career-2026","Robotics and IoT Career India 2026: Salary, Skills and Opportunities","Complete guide...","2026-03-15"),
    @("SocialWorkCareer2026.tsx","social-work-career-india-2026","Social Work Career India 2026: NGO, UPSC and International Roles","Complete guide...","2026-03-15"),
    @("SportsManagementCareer2026.tsx","sports-management-career-2026","Sports Management Career India 2026: IPL, Olympic and Global Roles","Complete guide...","2026-02-15"),
    @("StudyAbroadGuide2026.tsx","study-abroad-guide-2026","Study Abroad Guide India 2026: USA, UK, Canada, Australia, Germany","Complete guide...","2026-01-15"),
    @("SupplyChainCareer2026.tsx","supply-chain-career-2026","Supply Chain and Logistics Career India 2026: Salary and Roadmap","Complete guide...","2026-02-15"),
    @("TeachingCareer2026.tsx","teaching-edtech-career-2026","Teaching and EdTech Career India 2026: Salary, Scope and Opportunities","Complete guide...","2026-02-15"),
    @("TopSkills2026.tsx","top-skills-2026","Top Skills in Demand 2026: What Employers Are Hiring For Now","The most in-demand...","2026-01-15"),
    @("UPSCCivilServicesCareer2026.tsx","upsc-civil-services-career-2026","UPSC Civil Services Career 2026: IAS, IFS, IPS Complete Guide","Complete guide...","2026-02-15"),
    @("UXUIDesignCareer2026.tsx","ux-ui-design-career-2026","UX UI Design Career India 2026: Salary Rs8-35 LPA, Skills and Tools","Complete guide...","2026-02-15"),
    @("WrongCareerPath.tsx","wrong-career-path","Are You on the Wrong Career Path? 7 Signs You Should Pivot","7 clear signs...","2025-07-20"),
    @("CareerOptionsAfter10th.tsx","career-options-after-10th","Career Options After 10th: A Complete Guide for 2026","Confused about...","2026-01-20"),
    @("JEECounseling2026.tsx","jee-counseling-2026","JEE Counseling 2026: Complete Guide to JoSAA and CSAB","Complete guide...","2026-01-15"),
    @("DataScienceCareer2026.tsx","data- विज्ञान-career-2026","Data Science Career 2026","Guide...","2026-01-15")
)

$migrated = 0

foreach ($row in $blogData) {
    $filename = $row[0]
    $date = $row[4]
    $fullPath = Join-Path $blogsDir $filename
    
    if (-not (Test-Path $fullPath)) { continue }
    
    $content = Get-Content $fullPath -Raw -Encoding UTF8
    
    # 1. Skip if already imported
    if ($content -match 'import AuthorByline') {
        Write-Host "  [SKIP] $filename (already has AuthorByline)" -ForegroundColor Yellow
        continue
    }

    # 2. Inject import
    $content = $content -replace "import RelatedPosts from '../components/RelatedPosts';", "import AuthorByline from '../components/AuthorByline';`nimport RelatedPosts from '../components/RelatedPosts';"
    if ($content -notmatch "import AuthorByline") {
        # Try finding BlogSEO instead
        $content = $content -replace "import BlogSEO from '../components/BlogSEO';", "import BlogSEO from '../components/BlogSEO';`nimport AuthorByline from '../components/AuthorByline';"
    }

    # 3. Handle the Published paragraph replace
    $authorTag = "<AuthorByline date=`"$date`" />"
    
    # regex target: <p className="[^"]*mb-4[^"]*text-sm">Published:.*?</p> (or similar logic)
    $pattern = '(?s)<p className="text-gray-600[^"]*mb-4[^"]*text-sm">\s*Published:.*?</p>'
    $contentChanged = [regex]::Replace($content, $pattern, $authorTag)
    
    if ($contentChanged -ne $content) {
        [System.IO.File]::WriteAllText((Get-Location).Path + "\" + $fullPath, $contentChanged, [System.Text.Encoding]::UTF8)
        Write-Host "  [OK]  $filename" -ForegroundColor Green
        $migrated++
    } else {
        Write-Host "  [WARN] $filename - Could not find Published p-tag" -ForegroundColor Magenta
    }
}

Write-Host "Injected into $migrated blogs."

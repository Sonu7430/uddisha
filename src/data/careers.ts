// Complete career database with 1,200+ careers across all industries
export interface Career {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  skills: string[];
  education: string;
  salary: string;
  growth: string;
  workEnvironment: string[];
  personality: string[];
  remote: boolean;
  stressLevel: 'Low' | 'Medium' | 'High';
  travelRequired: boolean;
  // Optional image URL
  image?: string;
  // Scoring attributes for matching
  technical: number; // 1-10
  creative: number; // 1-10
  analytical: number; // 1-10
  social: number; // 1-10
  leadership: number; // 1-10
  physical: number; // 1-10
  // UI-specific properties for search
  isAiMatch?: boolean;
  isKeywordMatch?: boolean;
}

// Generate comprehensive careers database with FIXED IDs
const generateComprehensiveCareers = (): Career[] => {
  const careersData: Career[] = [];
  let currentId = 1; // Start with ID 1 and increment sequentially

  // Technology Careers (250+ careers)
  const techCareers = generateCategoryData("Technology", [
    "Software Development", "Data Science", "Cybersecurity", "Web Development",
    "Mobile Development", "DevOps", "AI/Machine Learning", "Cloud Computing",
    "Database Administration", "Network Administration", "IT Support", "Systems Analysis"
  ], 250, {
    baseSalary: [60000, 180000],
    growth: "+15%",
    remote: true,
    technical: 9,
    creative: 6,
    analytical: 8,
    social: 4,
    leadership: 5,
    physical: 1
  }, currentId);
  careersData.push(...techCareers);
  currentId += techCareers.length;

  // Healthcare Careers (200+ careers)
  const healthcareCareers = generateCategoryData("Healthcare", [
    "Nursing", "Medical Specialists", "Mental Health", "Allied Health",
    "Administration", "Emergency Medicine", "Surgery", "Pediatrics",
    "Geriatrics", "Pharmacy", "Physical Therapy", "Radiology"
  ], 200, {
    baseSalary: [45000, 400000],
    growth: "+7%",
    remote: false,
    technical: 6,
    creative: 4,
    analytical: 7,
    social: 9,
    leadership: 6,
    physical: 5
  }, currentId);
  careersData.push(...healthcareCareers);
  currentId += healthcareCareers.length;

  // Engineering Careers (150+ careers)
  const engineeringCareers = generateCategoryData("Engineering", [
    "Civil", "Mechanical", "Electrical", "Chemical", "Aerospace",
    "Biomedical", "Environmental", "Industrial", "Materials", "Nuclear",
    "Petroleum", "Software Engineering"
  ], 150, {
    baseSalary: [65000, 150000],
    growth: "+4%",
    remote: true,
    technical: 10,
    creative: 6,
    analytical: 9,
    social: 4,
    leadership: 5,
    physical: 3
  }, currentId);
  careersData.push(...engineeringCareers);
  currentId += engineeringCareers.length;

  // Business & Finance Careers (130+ careers)
  const businessCareers = generateCategoryData("Business", [
    "Finance", "Marketing", "Management", "Sales", "Consulting",
    "Human Resources", "Operations", "Strategy", "Investment Banking",
    "Insurance", "Real Estate", "Entrepreneurship"
  ], 130, {
    baseSalary: [40000, 250000],
    growth: "+5%",
    remote: true,
    technical: 5,
    creative: 6,
    analytical: 7,
    social: 8,
    leadership: 8,
    physical: 1
  }, currentId);
  careersData.push(...businessCareers);
  currentId += businessCareers.length;

  // Education Careers (100+ careers)
  const educationCareers = generateCategoryData("Education", [
    "K-12 Teaching", "Higher Education", "Administration", "Special Education",
    "Adult Education", "Curriculum Development", "Educational Technology",
    "School Counseling", "Library Science", "Training & Development"
  ], 100, {
    baseSalary: [35000, 90000],
    growth: "+4%",
    remote: false,
    technical: 4,
    creative: 7,
    analytical: 5,
    social: 9,
    leadership: 7,
    physical: 3
  }, currentId);
  careersData.push(...educationCareers);
  currentId += educationCareers.length;

  // Continue with other categories...
  const artsCareers = generateCategoryData("Arts", [
    "Visual Arts", "Performing Arts", "Music", "Film & Television",
    "Writing & Publishing", "Design", "Photography", "Gaming",
    "Fashion", "Architecture"
  ], 90, {
    baseSalary: [25000, 120000],
    growth: "+3%",
    remote: true,
    technical: 4,
    creative: 10,
    analytical: 4,
    social: 6,
    leadership: 5,
    physical: 4
  }, currentId);
  careersData.push(...artsCareers);
  currentId += artsCareers.length;

  // Add remaining categories with sequential IDs...
  const legalCareers = generateCategoryData("Legal", [
    "Corporate Law", "Criminal Law", "Family Law", "Immigration Law",
    "Intellectual Property", "Environmental Law", "Tax Law", "Litigation",
    "Legal Support", "Paralegal Services"
  ], 60, {
    baseSalary: [45000, 300000],
    growth: "+4%",
    remote: true,
    technical: 5,
    creative: 5,
    analytical: 9,
    social: 7,
    leadership: 7,
    physical: 1
  }, currentId);
  careersData.push(...legalCareers);
  currentId += legalCareers.length;

  const manufacturingCareers = generateCategoryData("Manufacturing", [
    "Production", "Quality Control", "Assembly", "Machining",
    "Welding", "Electronics Manufacturing", "Automotive", "Aerospace Manufacturing",
    "Food Production", "Textile Manufacturing", "Chemical Production"
  ], 100, {
    baseSalary: [30000, 85000],
    growth: "+2%",
    remote: false,
    technical: 7,
    creative: 3,
    analytical: 6,
    social: 4,
    leadership: 5,
    physical: 8
  }, currentId);
  careersData.push(...manufacturingCareers);
  currentId += manufacturingCareers.length;

  const transportationCareers = generateCategoryData("Transportation", [
    "Aviation", "Maritime", "Trucking", "Rail", "Logistics",
    "Supply Chain", "Warehousing", "Delivery Services", "Traffic Management",
    "Fleet Management"
  ], 70, {
    baseSalary: [35000, 120000],
    growth: "+4%",
    remote: false,
    technical: 5,
    creative: 3,
    analytical: 6,
    social: 5,
    leadership: 6,
    physical: 7
  }, currentId);
  careersData.push(...transportationCareers);
  currentId += transportationCareers.length;

  const constructionCareers = generateCategoryData("Construction", [
    "General Construction", "Electrical", "Plumbing", "HVAC",
    "Carpentry", "Masonry", "Roofing", "Painting", "Heavy Equipment",
    "Project Management", "Architecture", "Surveying"
  ], 110, {
    baseSalary: [35000, 95000],
    growth: "+5%",
    remote: false,
    technical: 6,
    creative: 5,
    analytical: 5,
    social: 5,
    leadership: 6,
    physical: 9
  }, currentId);
  careersData.push(...constructionCareers);
  currentId += constructionCareers.length;

  const governmentCareers = generateCategoryData("Government", [
    "Federal Government", "State Government", "Local Government", "Military",
    "Law Enforcement", "Fire & Emergency", "Public Administration",
    "Social Services", "Regulatory Affairs", "Intelligence"
  ], 60, {
    baseSalary: [40000, 150000],
    growth: "+3%",
    remote: false,
    technical: 5,
    creative: 4,
    analytical: 6,
    social: 7,
    leadership: 7,
    physical: 6
  }, currentId);
  careersData.push(...governmentCareers);
  currentId += governmentCareers.length;

  const agricultureCareers = generateCategoryData("Agriculture", [
    "Crop Production", "Livestock", "Forestry", "Fishing", "Food Processing",
    "Agricultural Technology", "Veterinary Services", "Farm Management",
    "Agricultural Research", "Food Safety"
  ], 50, {
    baseSalary: [30000, 80000],
    growth: "+1%",
    remote: false,
    technical: 5,
    creative: 4,
    analytical: 6,
    social: 5,
    leadership: 5,
    physical: 8
  }, currentId);
  careersData.push(...agricultureCareers);
  currentId += agricultureCareers.length;

  const energyCareers = generateCategoryData("Energy", [
    "Oil & Gas", "Renewable Energy", "Nuclear", "Electric Utilities",
    "Water & Wastewater", "Energy Efficiency", "Power Generation",
    "Energy Trading", "Environmental Services"
  ], 40, {
    baseSalary: [50000, 130000],
    growth: "+8%",
    remote: false,
    technical: 8,
    creative: 4,
    analytical: 7,
    social: 4,
    leadership: 6,
    physical: 6
  }, currentId);
  careersData.push(...energyCareers);
  currentId += energyCareers.length;

  const retailCareers = generateCategoryData("Retail", [
    "Sales", "Customer Service", "Store Management", "Merchandising",
    "E-commerce", "Fashion Retail", "Automotive Sales", "Real Estate",
    "Personal Services", "Beauty Services"
  ], 80, {
    baseSalary: [25000, 85000],
    growth: "+2%",
    remote: false,
    technical: 3,
    creative: 5,
    analytical: 4,
    social: 9,
    leadership: 6,
    physical: 5
  }, currentId);
  careersData.push(...retailCareers);
  currentId += retailCareers.length;

  const hospitalityCareers = generateCategoryData("Hospitality", [
    "Hotels", "Restaurants", "Travel", "Event Planning", "Recreation",
    "Gaming", "Cruise Lines", "Airlines", "Tourism", "Food Service"
  ], 50, {
    baseSalary: [25000, 75000],
    growth: "+6%",
    remote: false,
    technical: 3,
    creative: 6,
    analytical: 4,
    social: 9,
    leadership: 6,
    physical: 6
  }, currentId);
  careersData.push(...hospitalityCareers);
  currentId += hospitalityCareers.length;

  const scienceCareers = generateCategoryData("Science", [
    "Biology", "Chemistry", "Physics", "Environmental Science", "Geology",
    "Astronomy", "Mathematics", "Statistics", "Research", "Laboratory Sciences"
  ], 90, {
    baseSalary: [45000, 120000],
    growth: "+5%",
    remote: true,
    technical: 8,
    creative: 6,
    analytical: 10,
    social: 4,
    leadership: 5,
    physical: 3
  }, currentId);
  careersData.push(...scienceCareers);
  currentId += scienceCareers.length;

  const mediaCareers = generateCategoryData("Media", [
    "Journalism", "Broadcasting", "Digital Media", "Public Relations",
    "Advertising", "Social Media", "Content Creation", "Publishing",
    "Telecommunications"
  ], 40, {
    baseSalary: [30000, 100000],
    growth: "+4%",
    remote: true,
    technical: 6,
    creative: 9,
    analytical: 5,
    social: 8,
    leadership: 6,
    physical: 2
  }, currentId);
  careersData.push(...mediaCareers);
  currentId += mediaCareers.length;

  const nonprofitCareers = generateCategoryData("Nonprofit", [
    "Social Work", "Community Services", "Fundraising", "Program Management",
    "Advocacy", "International Aid", "Religious Services", "Volunteer Coordination"
  ], 30, {
    baseSalary: [30000, 70000],
    growth: "+7%",
    remote: false,
    technical: 3,
    creative: 5,
    analytical: 5,
    social: 10,
    leadership: 7,
    physical: 4
  }, currentId);
  careersData.push(...nonprofitCareers);
  currentId += nonprofitCareers.length;

  const sportsCareers = generateCategoryData("Sports", [
    "Professional Sports", "Coaching", "Sports Medicine", "Fitness",
    "Recreation Management", "Sports Marketing", "Athletic Training",
    "Sports Broadcasting"
  ], 30, {
    baseSalary: [25000, 150000],
    growth: "+8%",
    remote: false,
    technical: 3,
    creative: 5,
    analytical: 5,
    social: 8,
    leadership: 7,
    physical: 9
  }, currentId);
  careersData.push(...sportsCareers);
  currentId += sportsCareers.length;

  const environmentalCareers = generateCategoryData("Environmental", [
    "Environmental Science", "Conservation", "Sustainability Consulting",
    "Renewable Energy", "Environmental Law", "Climate Science",
    "Waste Management", "Environmental Education"
  ], 25, {
    baseSalary: [40000, 90000],
    growth: "+8%",
    remote: true,
    technical: 6,
    creative: 5,
    analytical: 8,
    social: 6,
    leadership: 6,
    physical: 5
  }, currentId);
  careersData.push(...environmentalCareers);

  return careersData;
};

function generateCategoryData(
  category: string, 
  subcategories: string[], 
  totalCareers: number,
  defaults: any,
  startId: number
): Career[] {
  const careers: Career[] = [];
  const careersPerSubcategory = Math.ceil(totalCareers / subcategories.length);
  
  subcategories.forEach((subcategory, subIndex) => {
    for (let i = 0; i < careersPerSubcategory && careers.length < totalCareers; i++) {
      const careerNames = getCareerNamesForSubcategory(category, subcategory);
      const careerName = careerNames[i % careerNames.length];
      
      careers.push({
        id: startId + careers.length, // Sequential ID assignment
        name: careerName,
        category,
        subcategory,
        description: `Professional working in ${subcategory} within the ${category} industry. ${getCareerDescription(category, subcategory, careerName)}`,
        skills: getSkillsForCareer(category, subcategory),
        education: getEducationForCareer(category, subcategory),
        salary: generateSalaryRange(defaults.baseSalary[0], defaults.baseSalary[1]),
        growth: defaults.growth,
        workEnvironment: getWorkEnvironment(category, subcategory),
        personality: getPersonalityTraits(category, subcategory),
        remote: defaults.remote && Math.random() > 0.3,
        stressLevel: getStressLevel(category, subcategory),
        travelRequired: Math.random() > 0.7,
        technical: Math.max(1, Math.min(10, defaults.technical + Math.floor(Math.random() * 3) - 1)),
        creative: Math.max(1, Math.min(10, defaults.creative + Math.floor(Math.random() * 3) - 1)),
        analytical: Math.max(1, Math.min(10, defaults.analytical + Math.floor(Math.random() * 3) - 1)),
        social: Math.max(1, Math.min(10, defaults.social + Math.floor(Math.random() * 3) - 1)),
        leadership: Math.max(1, Math.min(10, defaults.leadership + Math.floor(Math.random() * 3) - 1)),
        physical: Math.max(1, Math.min(10, defaults.physical + Math.floor(Math.random() * 3) - 1))
      });
    }
  });
  
  return careers;
}

const newCareersData: Partial<Career>[] = [
  { name: "Software Engineer", education: "Bachelor's degree", salary: "$85,000 - $200,000", stressLevel: "Medium", remote: true, skills: ["Programming", "Software Development", "Problem Solving"] },
  { name: "Data Scientist", education: "Bachelor's/Master's degree", salary: "$75,000 - $130,000", stressLevel: "Medium", remote: true, skills: ["Statistics", "Python", "R", "Machine Learning"] },
  { name: "UX Designer", education: "Bachelor's degree", salary: "$80,000 - $150,000", stressLevel: "Medium", remote: true, skills: ["Design", "User Research", "Prototyping"] },
  { name: "Content Strategist", education: "Bachelor's degree", salary: "$75,000 - $120,000", stressLevel: "Low", remote: true, skills: ["Writing", "Content Planning", "Marketing"] },
  { name: "Digital Marketing Director", education: "Bachelor's degree", salary: "$115,000 - $160,000", stressLevel: "Medium", remote: true, skills: ["Marketing", "SEO", "Social Media", "Analytics"] },
  { name: "Web Developer", education: "Bachelor's degree", salary: "$65,000 - $180,000", stressLevel: "Medium", remote: true, skills: ["HTML", "CSS", "JavaScript", "Web Development"] },
  { name: "Product Manager", education: "Bachelor's degree", salary: "$100,000 - $185,000", stressLevel: "High", remote: true, skills: ["Product Development", "Project Management", "Strategy"] },
  { name: "Copywriter", education: "Bachelor's degree", salary: "$70,000 - $120,000", stressLevel: "Low", remote: true, skills: ["Writing", "Marketing", "Communication"] },
  { name: "Graphic Designer", education: "Bachelor's degree", salary: "$50,000 - $100,000", stressLevel: "Low", remote: true, skills: ["Design", "Adobe Creative Suite", "Visual Communication"] },
  { name: "Social Media Manager", education: "Bachelor's degree", salary: "$90,000 - $125,000", stressLevel: "Medium", remote: true, skills: ["Social Media", "Content Creation", "Marketing"] },
  { name: "Lawyer", education: "Doctoral/Professional degree", salary: "$127,990 - $200,000", stressLevel: "High", remote: false, skills: ["Legal Research", "Writing", "Communication", "Critical Thinking"] },
  { name: "Surgeon", education: "Doctoral/Professional degree", salary: "$208,000 - $400,000", stressLevel: "High", remote: false, skills: ["Medical Knowledge", "Precision", "Decision Making", "Stamina"] },
  { name: "Pilot", education: "Commercial Pilot License", salary: "$50,000 - $200,000", stressLevel: "High", remote: false, skills: ["Aviation", "Navigation", "Decision Making", "Communication"] },
  { name: "Firefighter", education: "Postsecondary nondegree award", salary: "$50,700 - $80,000", stressLevel: "High", remote: false, skills: ["Emergency Response", "Physical Fitness", "Teamwork"] },
  { name: "Mental Health Counselor", education: "Master's degree", salary: "$49,130 - $70,000", stressLevel: "High", remote: false, skills: ["Psychology", "Communication", "Empathy", "Counseling"] },
  { name: "Paramedic", education: "Postsecondary nondegree award", salary: "$46,770 - $60,000", stressLevel: "High", remote: false, skills: ["Emergency Medicine", "Decision Making", "Physical Stamina"] },
  { name: "Construction Worker", education: "No formal credentials", salary: "$37,770 - $65,000", stressLevel: "High", remote: false, skills: ["Physical Strength", "Safety Awareness", "Hand Tools"] },
  { name: "Compliance Officer", education: "Bachelor's degree", salary: "$71,650 - $90,000", stressLevel: "High", remote: false, skills: ["Regulatory Knowledge", "Attention to Detail", "Analysis"] },
  { name: "Nurse Practitioner", education: "Master's degree", salary: "$126,260 - $180,000", stressLevel: "High", remote: false, skills: ["Medical Knowledge", "Patient Care", "Communication"] },
  { name: "Registered Nurse", education: "Bachelor's degree", salary: "$86,070 - $120,000", stressLevel: "High", remote: false, skills: ["Medical Knowledge", "Patient Care", "Critical Thinking"] },
  { name: "Physician Assistant", education: "Master's degree", salary: "$120,000 - $160,000", stressLevel: "High", remote: false, skills: ["Medical Knowledge", "Diagnosis", "Patient Care"] },
  { name: "Medical Assistant", education: "Certificate/Associate degree", salary: "$35,000 - $45,000", stressLevel: "Medium", remote: false, skills: ["Medical Procedures", "Record Keeping", "Patient Care"] },
  { name: "Physical Therapist", education: "Doctoral degree", salary: "$90,000 - $130,000", stressLevel: "Medium", remote: false, skills: ["Anatomy", "Rehabilitation", "Patient Care"] },
  { name: "Pharmacist", education: "Doctoral degree", salary: "$130,000 - $160,000", stressLevel: "Medium", remote: false, skills: ["Pharmacology", "Patient Counseling", "Attention to Detail"] },
  { name: "Dentist", education: "Doctoral degree", salary: "$160,000 - $220,000", stressLevel: "Medium", remote: false, skills: ["Dental Procedures", "Patient Care", "Manual Dexterity"] },
  { name: "Veterinarian", education: "Doctoral degree", salary: "$100,000 - $140,000", stressLevel: "High", remote: false, skills: ["Animal Medicine", "Surgery", "Communication"] },
  { name: "Computer Programmer", education: "Bachelor's degree", salary: "$85,000 - $200,000", stressLevel: "Medium", remote: true, skills: ["Programming Languages", "Problem Solving", "Logic"] },
  { name: "Information Security Analyst", education: "Bachelor's degree", salary: "$82,496 - $130,000", stressLevel: "High", remote: true, skills: ["Cybersecurity", "Network Security", "Risk Assessment"] },
  { name: "Database Administrator", education: "Bachelor's degree", salary: "$90,037 - $120,000", stressLevel: "Medium", remote: true, skills: ["Database Management", "SQL", "Systems Administration"] },
  { name: "Network Engineer", education: "Bachelor's degree", salary: "$88,757 - $110,000", stressLevel: "Medium", remote: false, skills: ["Networking", "Troubleshooting", "System Design"] },
  { name: "Mobile Developer", education: "Bachelor's degree", salary: "$65,000 - $180,000", stressLevel: "Medium", remote: true, skills: ["Mobile Programming", "iOS/Android", "User Interface"] },
  { name: "DevOps Engineer", education: "Bachelor's degree", salary: "$95,000 - $150,000", stressLevel: "Medium", remote: true, skills: ["Cloud Platforms", "Automation", "System Administration"] },
  { name: "AI Engineer", education: "Bachelor's/Master's degree", salary: "$100,000 - $180,000", stressLevel: "Medium", remote: true, skills: ["Machine Learning", "Python", "Deep Learning"] },
  { name: "Cybersecurity Specialist", education: "Bachelor's degree", salary: "$80,000 - $140,000", stressLevel: "High", remote: true, skills: ["Security Protocols", "Penetration Testing", "Risk Analysis"] },
  { name: "Financial Manager", education: "Bachelor's degree", salary: "$102,857 - $150,000", stressLevel: "High", remote: false, skills: ["Financial Analysis", "Budgeting", "Strategic Planning"] },
  { name: "Marketing Manager", education: "Bachelor's degree", salary: "$70,297 - $100,000", stressLevel: "Medium", remote: true, skills: ["Marketing Strategy", "Analytics", "Brand Management"] },
  { name: "Sales Manager", education: "Bachelor's degree", salary: "$81,041 - $120,000", stressLevel: "High", remote: false, skills: ["Sales Strategy", "Team Management", "Communication"] },
  { name: "Accountant", education: "Bachelor's degree", salary: "$60,582 - $80,000", stressLevel: "Medium", remote: true, skills: ["Accounting Principles", "Tax Preparation", "Financial Analysis"] },
  { name: "Business Analyst", education: "Bachelor's degree", salary: "$73,117 - $95,000", stressLevel: "Medium", remote: true, skills: ["Data Analysis", "Process Improvement", "Communication"] },
  { name: "Human Resources Specialist", education: "Bachelor's degree", salary: "$79,228 - $100,000", stressLevel: "Medium", remote: false, skills: ["Employee Relations", "Recruitment", "Policy Development"] },
  { name: "Investment Banker", education: "Bachelor's degree", salary: "$100,000 - $200,000", stressLevel: "High", remote: false, skills: ["Financial Modeling", "Client Relations", "Market Analysis"] },
  { name: "Real Estate Agent", education: "High School + License", salary: "$50,000 - $150,000", stressLevel: "Medium", remote: false, skills: ["Sales", "Market Knowledge", "Negotiation"] },
  { name: "Teacher (K-12)", education: "Bachelor's degree", salary: "$45,468 - $65,000", stressLevel: "High", remote: false, skills: ["Subject Knowledge", "Communication", "Classroom Management"] },
  { name: "Professor", education: "Doctoral degree", salary: "$80,000 - $150,000", stressLevel: "Medium", remote: false, skills: ["Research", "Teaching", "Subject Expertise"] },
  { name: "School Counselor", education: "Master's degree", salary: "$55,573 - $70,000", stressLevel: "Medium", remote: false, skills: ["Counseling", "Psychology", "Communication"] },
  { name: "Educational Administrator", education: "Master's degree", salary: "$70,000 - $120,000", stressLevel: "High", remote: false, skills: ["Leadership", "Policy Development", "Budget Management"] },
  { name: "Librarian", education: "Master's degree", salary: "$50,000 - $70,000", stressLevel: "Low", remote: false, skills: ["Information Management", "Research", "Customer Service"] },
  { name: "Instructional Designer", education: "Bachelor's/Master's degree", salary: "$60,000 - $90,000", stressLevel: "Medium", remote: true, skills: ["Curriculum Design", "Learning Technologies", "Project Management"] },
  { name: "Art Director", education: "Bachelor's degree", salary: "$80,000 - $130,000", stressLevel: "Medium", remote: false, skills: ["Creative Vision", "Team Leadership", "Design Software"] },
  { name: "Video Game Designer", education: "Bachelor's degree", salary: "$76,887 - $120,000", stressLevel: "Medium", remote: true, skills: ["Game Development", "Programming", "Creative Design"] },
  { name: "Photographer", education: "Certificate/Bachelor's degree", salary: "$35,000 - $80,000", stressLevel: "Medium", remote: true, skills: ["Photography", "Photo Editing", "Client Management"] },
  { name: "Writer/Author", education: "Bachelor's degree", salary: "$40,000 - $100,000", stressLevel: "Medium", remote: true, skills: ["Writing", "Research", "Communication"] },
  { name: "Musician", education: "Variable", salary: "$25,000 - $100,000", stressLevel: "Medium", remote: false, skills: ["Musical Ability", "Performance", "Creativity"] },
  { name: "Fashion Designer", education: "Bachelor's degree", salary: "$40,000 - $90,000", stressLevel: "Medium", remote: false, skills: ["Design", "Fashion Trends", "Sketching"] },
  { name: "Interior Designer", education: "Bachelor's degree", salary: "$50,000 - $85,000", stressLevel: "Medium", remote: false, skills: ["Design", "Space Planning", "Client Relations"] },
  { name: "Electrician", education: "Trade school/Apprenticeship", salary: "$50,000 - $85,000", stressLevel: "Medium", remote: false, skills: ["Electrical Systems", "Safety Protocols", "Problem Solving"] },
  { name: "Plumber", education: "Trade school/Apprenticeship", salary: "$45,000 - $75,000", stressLevel: "Medium", remote: false, skills: ["Plumbing Systems", "Pipe Fitting", "Customer Service"] },
  { name: "HVAC Technician", education: "Trade school/Certificate", salary: "$48,000 - $70,000", stressLevel: "Medium", remote: false, skills: ["HVAC Systems", "Refrigeration", "Mechanical Repair"] },
  { name: "Welder", education: "Trade school/Certificate", salary: "$42,000 - $68,000", stressLevel: "Medium", remote: false, skills: ["Welding Techniques", "Metal Work", "Safety"] },
  { name: "Carpenter", education: "Trade school/Apprenticeship", salary: "$40,000 - $65,000", stressLevel: "Medium", remote: false, skills: ["Woodworking", "Construction", "Blueprint Reading"] },
  { name: "Auto Mechanic", education: "Trade school/Certificate", salary: "$40,000 - $60,000", stressLevel: "Medium", remote: false, skills: ["Automotive Repair", "Diagnostic Tools", "Customer Service"] },
  { name: "Dental Hygienist", education: "Associate degree", salary: "$65,000 - $90,000", stressLevel: "Medium", remote: false, skills: ["Dental Care", "Patient Communication", "Health Assessment"] },
  { name: "Licensed Practical Nurse", education: "Certificate/Diploma", salary: "$45,000 - $60,000", stressLevel: "High", remote: false, skills: ["Patient Care", "Medical Procedures", "Communication"] },
  { name: "Commercial Pilot", education: "Commercial Pilot License", salary: "$80,000 - $150,000", stressLevel: "High", remote: false, skills: ["Aviation", "Navigation", "Decision Making"] },
  { name: "Radiation Therapist", education: "Associate degree/Certificate", salary: "$80,000 - $100,000", stressLevel: "High", remote: false, skills: ["Medical Equipment", "Patient Care", "Precision"] },
  { name: "Power Plant Operator", education: "High school + Training", salary: "$85,000 - $105,000", stressLevel: "High", remote: false, skills: ["Power Systems", "Monitoring", "Safety Protocols"] },
  { name: "Civil Service Officer (IAS)", education: "Bachelor's degree + Exam", salary: "$56,100 - $250,000", stressLevel: "High", remote: false, skills: ["Administration", "Policy Implementation", "Leadership"] },
  { name: "Police Officer (IPS)", education: "Bachelor's degree + Exam", salary: "$56,100 - $225,000", stressLevel: "High", remote: false, skills: ["Law Enforcement", "Investigation", "Public Safety"] },
  { name: "Foreign Service Officer (IFS)", education: "Bachelor's degree + Exam", salary: "$56,100 - $250,000", stressLevel: "High", remote: false, skills: ["Diplomacy", "International Relations", "Communication"] },
  { name: "Revenue Officer (IRS)", education: "Bachelor's degree + Exam", salary: "$56,100 - $225,000", stressLevel: "High", remote: false, skills: ["Tax Law", "Financial Analysis", "Investigation"] },
  { name: "Air Traffic Controller", education: "Associate degree + Training", salary: "$60,000 - $180,000", stressLevel: "High", remote: false, skills: ["Air Traffic Management", "Decision Making", "Communication"] },
  { name: "Postal Worker", education: "High school diploma", salary: "$35,000 - $60,000", stressLevel: "Medium", remote: false, skills: ["Mail Processing", "Customer Service", "Organization"] },
  { name: "Intelligence Analyst", education: "Bachelor's degree", salary: "$65,000 - $120,000", stressLevel: "High", remote: false, skills: ["Analysis", "Research", "Security Clearance"] },
  { name: "Border Patrol Officer", education: "High school + Training", salary: "$45,000 - $85,000", stressLevel: "High", remote: false, skills: ["Security", "Law Enforcement", "Physical Fitness"] },
  { name: "Hotel Manager", education: "Bachelor's degree", salary: "$50,000 - $90,000", stressLevel: "High", remote: false, skills: ["Hotel Operations", "Customer Service", "Staff Management"] },
  { name: "Event Planner", education: "Bachelor's degree", salary: "$45,000 - $75,000", stressLevel: "High", remote: false, skills: ["Event Coordination", "Project Management", "Vendor Relations"] },
  { name: "Chef", education: "Culinary school/Experience", salary: "$45,000 - $85,000", stressLevel: "High", remote: false, skills: ["Cooking", "Menu Planning", "Kitchen Management"] },
  { name: "Restaurant Manager", education: "Bachelor's degree/Experience", salary: "$45,000 - $70,000", stressLevel: "High", remote: false, skills: ["Restaurant Operations", "Staff Management", "Customer Service"] },
  { name: "Travel Agent", education: "High school + Training", salary: "$35,000 - $55,000", stressLevel: "Medium", remote: true, skills: ["Travel Planning", "Customer Service", "Geography Knowledge"] },
  { name: "Cruise Ship Director", education: "Bachelor's degree", salary: "$50,000 - $80,000", stressLevel: "High", remote: false, skills: ["Entertainment Planning", "Customer Service", "Leadership"] },
  { name: "Tour Guide", education: "High school + Certification", salary: "$25,000 - $45,000", stressLevel: "Medium", remote: false, skills: ["Communication", "Local Knowledge", "Customer Service"] },
  { name: "Sommelier", education: "Certification/Training", salary: "$45,000 - $80,000", stressLevel: "Medium", remote: false, skills: ["Wine Knowledge", "Tasting", "Customer Service"] },
  { name: "Resort Activities Coordinator", education: "Bachelor's degree", salary: "$35,000 - $55,000", stressLevel: "Medium", remote: false, skills: ["Activity Planning", "Customer Service", "Organization"] },
  { name: "Commercial Truck Driver", education: "CDL License", salary: "$45,000 - $75,000", stressLevel: "Medium", remote: false, skills: ["Driving", "Navigation", "Safety Awareness"] },
  { name: "Bus Driver", education: "CDL License", salary: "$35,000 - $55,000", stressLevel: "Medium", remote: false, skills: ["Driving", "Customer Service", "Safety"] },
  { name: "Train Conductor", education: "High school + Training", salary: "$55,000 - $75,000", stressLevel: "High", remote: false, skills: ["Railway Operations", "Safety", "Communication"] },
  { name: "Ship Engineer", education: "Maritime Academy", salary: "$70,000 - $120,000", stressLevel: "Medium", remote: false, skills: ["Marine Engineering", "Maintenance", "Safety"] },
  { name: "Logistics Coordinator", education: "Bachelor's degree", salary: "$45,000 - $70,000", stressLevel: "Medium", remote: true, skills: ["Supply Chain", "Organization", "Communication"] },
  { name: "Airline Mechanic", education: "Trade school + License", salary: "$55,000 - $85,000", stressLevel: "High", remote: false, skills: ["Aircraft Maintenance", "Problem Solving", "Safety"] },
  { name: "Dispatcher", education: "High school + Training", salary: "$35,000 - $55,000", stressLevel: "High", remote: false, skills: ["Communication", "Multi-tasking", "Decision Making"] },
  { name: "Port Operations Manager", education: "Bachelor's degree", salary: "$70,000 - $100,000", stressLevel: "High", remote: false, skills: ["Operations Management", "Logistics", "Leadership"] },
  { name: "Farm Manager", education: "Bachelor's degree", salary: "$60,000 - $120,000", stressLevel: "High", remote: false, skills: ["Farm Operations", "Budget Management", "Leadership"] },
  { name: "Agricultural Engineer", education: "Bachelor's degree", salary: "$70,000 - $100,000", stressLevel: "Medium", remote: false, skills: ["Engineering", "Equipment Design", "Problem Solving"] },
  { name: "Agronomist", education: "Bachelor's degree", salary: "$65,000 - $90,000", stressLevel: "Medium", remote: false, skills: ["Soil Science", "Crop Management", "Research"] },
  { name: "Veterinarian (Agricultural)", education: "Doctoral degree", salary: "$95,000 - $140,000", stressLevel: "High", remote: false, skills: ["Veterinary Medicine", "Animal Care", "Diagnosis"] },
  { name: "Food Scientist", education: "Bachelor's degree", salary: "$60,000 - $95,000", stressLevel: "Medium", remote: false, skills: ["Food Safety", "Research", "Quality Control"] },
  { name: "Agricultural Economist", education: "Master's degree", salary: "$75,000 - $120,000", stressLevel: "Medium", remote: true, skills: ["Economic Analysis", "Market Research", "Statistics"] },
  { name: "Forester", education: "Bachelor's degree", salary: "$55,000 - $75,000", stressLevel: "Medium", remote: false, skills: ["Forest Management", "Conservation", "Environmental Science"] },
  { name: "Agricultural Technician", education: "Associate degree", salary: "$35,000 - $55,000", stressLevel: "Medium", remote: false, skills: ["Laboratory Skills", "Data Collection", "Equipment Operation"] },
  { name: "Farm Equipment Operator", education: "High school + Training", salary: "$30,000 - $50,000", stressLevel: "Medium", remote: false, skills: ["Equipment Operation", "Maintenance", "Safety"] },
  { name: "Agricultural Inspector", education: "Bachelor's degree", salary: "$50,000 - $75,000", stressLevel: "Medium", remote: false, skills: ["Quality Control", "Regulations", "Inspection"] },
  { name: "Retail Sales Associate", education: "High school diploma", salary: "$22,000 - $35,000", stressLevel: "Medium", remote: false, skills: ["Customer Service", "Product Knowledge", "Communication"] },
  { name: "Store Manager", education: "High school/Bachelor's degree", salary: "$45,000 - $75,000", stressLevel: "High", remote: false, skills: ["Management", "Sales", "Leadership"] },
  { name: "Visual Merchandiser", education: "Associate/Bachelor's degree", salary: "$35,000 - $55,000", stressLevel: "Medium", remote: false, skills: ["Design", "Creativity", "Visual Planning"] },
  { name: "Sales Representative", education: "High school/Bachelor's degree", salary: "$40,000 - $80,000", stressLevel: "High", remote: false, skills: ["Sales", "Communication", "Relationship Building"] },
  { name: "Buyer/Purchaser", education: "Bachelor's degree", salary: "$50,000 - $85,000", stressLevel: "Medium", remote: false, skills: ["Market Analysis", "Negotiation", "Inventory Management"] },
  { name: "Loss Prevention Specialist", education: "High school diploma", salary: "$30,000 - $50,000", stressLevel: "Medium", remote: false, skills: ["Security", "Observation", "Investigation"] },
  { name: "Customer Service Representative", education: "High school diploma", salary: "$28,000 - $45,000", stressLevel: "Medium", remote: true, skills: ["Communication", "Problem Solving", "Patience"] },
  { name: "Cashier", education: "High school diploma", salary: "$20,000 - $30,000", stressLevel: "Medium", remote: false, skills: ["Cash Handling", "Customer Service", "Accuracy"] },
  { name: "Inventory Manager", education: "Bachelor's degree", salary: "$45,000 - $70,000", stressLevel: "Medium", remote: false, skills: ["Inventory Control", "Organization", "Analytics"] },
  { name: "E-commerce Specialist", education: "Bachelor's degree", salary: "$45,000 - $75,000", stressLevel: "Medium", remote: true, skills: ["Digital Marketing", "E-commerce Platforms", "Analytics"] },
  { name: "Production Worker", education: "High school diploma", salary: "$30,000 - $50,000", stressLevel: "Medium", remote: false, skills: ["Machine Operation", "Quality Control", "Teamwork"] },
  { name: "Manufacturing Engineer", education: "Bachelor's degree", salary: "$65,000 - $95,000", stressLevel: "Medium", remote: false, skills: ["Process Design", "Problem Solving", "Engineering"] },
  { name: "Quality Control Inspector", education: "High school/Associate degree", salary: "$35,000 - $55,000", stressLevel: "Medium", remote: false, skills: ["Attention to Detail", "Testing", "Documentation"] },
  { name: "Machine Operator", education: "High school + Training", salary: "$32,000 - $52,000", stressLevel: "Medium", remote: false, skills: ["Machine Operation", "Safety", "Technical Skills"] },
  { name: "Industrial Maintenance Technician", education: "Associate degree/Certificate", salary: "$45,000 - $70,000", stressLevel: "Medium", remote: false, skills: ["Mechanical Repair", "Troubleshooting", "Electrical"] },
  { name: "Plant Manager", education: "Bachelor's degree", salary: "$80,000 - $130,000", stressLevel: "High", remote: false, skills: ["Operations Management", "Leadership", "Strategy"] },
  { name: "Assembly Line Worker", education: "High school diploma", salary: "$28,000 - $45,000", stressLevel: "Medium", remote: false, skills: ["Manual Dexterity", "Attention to Detail", "Teamwork"] },
  { name: "Industrial Designer", education: "Bachelor's degree", salary: "$55,000 - $85,000", stressLevel: "Medium", remote: false, skills: ["Design", "CAD Software", "Creativity"] },
  { name: "Supply Chain Manager", education: "Bachelor's degree", salary: "$70,000 - $110,000", stressLevel: "High", remote: false, skills: ["Logistics", "Planning", "Analytics"] },
  { name: "Warehouse Manager", education: "High school/Bachelor's degree", salary: "$50,000 - $75,000", stressLevel: "High", remote: false, skills: ["Inventory Management", "Leadership", "Organization"] },
  { name: "Research Scientist", education: "Doctoral degree", salary: "$80,000 - $120,000", stressLevel: "Medium", remote: false, skills: ["Research Methods", "Data Analysis", "Laboratory Skills"] },
  { name: "Laboratory Technician", education: "Associate degree", salary: "$40,000 - $60,000", stressLevel: "Medium", remote: false, skills: ["Laboratory Procedures", "Data Collection", "Equipment Operation"] },
  { name: "Chemist", education: "Bachelor's degree", salary: "$60,000 - $90,000", stressLevel: "Medium", remote: false, skills: ["Chemistry", "Research", "Problem Solving"] },
  { name: "Biologist", education: "Bachelor's degree", salary: "$55,000 - $85,000", stressLevel: "Medium", remote: false, skills: ["Biology", "Research", "Data Analysis"] },
  { name: "Environmental Scientist", education: "Bachelor's degree", salary: "$60,000 - $90,000", stressLevel: "Medium", remote: false, skills: ["Environmental Science", "Research", "Policy Analysis"] },
  { name: "Geologist", education: "Bachelor's degree", salary: "$65,000 - $95,000", stressLevel: "Medium", remote: false, skills: ["Geology", "Field Work", "Data Analysis"] },
  { name: "Meteorologist", education: "Bachelor's degree", salary: "$70,000 - $100,000", stressLevel: "Medium", remote: false, skills: ["Weather Analysis", "Forecasting", "Communication"] },
  { name: "Physicist", education: "Doctoral degree", salary: "$85,000 - $130,000", stressLevel: "Medium", remote: false, skills: ["Physics", "Mathematics", "Research"] },
  { name: "Statistician", education: "Master's degree", salary: "$75,000 - $110,000", stressLevel: "Medium", remote: true, skills: ["Statistics", "Data Analysis", "Mathematics"] },
  { name: "Marine Biologist", education: "Bachelor's/Master's degree", salary: "$50,000 - $80,000", stressLevel: "Medium", remote: false, skills: ["Marine Biology", "Research", "Field Work"] },
  { name: "Personal Trainer", education: "Certification", salary: "$30,000 - $70,000", stressLevel: "Medium", remote: false, skills: ["Fitness Training", "Motivation", "Exercise Science"] },
  { name: "Sports Coach", education: "Bachelor's degree/Certification", salary: "$35,000 - $70,000", stressLevel: "High", remote: false, skills: ["Coaching", "Strategy", "Leadership"] },
  { name: "Athletic Trainer", education: "Master's degree", salary: "$45,000 - $65,000", stressLevel: "Medium", remote: false, skills: ["Sports Medicine", "Injury Prevention", "Rehabilitation"] },
  { name: "Sports Manager", education: "Bachelor's degree", salary: "$45,000 - $80,000", stressLevel: "High", remote: false, skills: ["Management", "Marketing", "Event Planning"] },
  { name: "Fitness Instructor", education: "Certification", salary: "$25,000 - $45,000", stressLevel: "Medium", remote: false, skills: ["Group Fitness", "Instruction", "Motivation"] },
  { name: "Sports Referee/Umpire", education: "Certification", salary: "$30,000 - $100,000", stressLevel: "High", remote: false, skills: ["Rule Knowledge", "Decision Making", "Communication"] },
  { name: "Exercise Physiologist", education: "Master's degree", salary: "$50,000 - $75,000", stressLevel: "Medium", remote: false, skills: ["Exercise Science", "Health Assessment", "Research"] },
  { name: "Sports Photographer", education: "High school/Bachelor's", salary: "$35,000 - $65,000", stressLevel: "Medium", remote: false, skills: ["Photography", "Sports Knowledge", "Equipment"] },
  { name: "Nutritionist/Dietitian", education: "Bachelor's degree", salary: "$45,000 - $75,000", stressLevel: "Medium", remote: false, skills: ["Nutrition Science", "Counseling", "Health Planning"] },
  { name: "Actor", education: "Variable/Training", salary: "$25,000 - $200,000", stressLevel: "High", remote: false, skills: ["Acting", "Performance", "Memorization"] },
  { name: "Dancer", education: "Training", salary: "$25,000 - $80,000", stressLevel: "High", remote: false, skills: ["Dance", "Performance", "Physical Fitness"] },
  { name: "Film Director", education: "Bachelor's degree", salary: "$60,000 - $200,000", stressLevel: "High", remote: false, skills: ["Directing", "Creativity", "Leadership"] },
  { name: "Sound Engineer", education: "Associate/Bachelor's", salary: "$40,000 - $80,000", stressLevel: "Medium", remote: false, skills: ["Audio Engineering", "Technology", "Music"] },
  { name: "Video Editor", education: "Certificate/Bachelor's", salary: "$35,000 - $75,000", stressLevel: "Medium", remote: true, skills: ["Video Editing Software", "Creativity", "Attention to Detail"] },
  { name: "Makeup Artist", education: "Certificate/Training", salary: "$30,000 - $70,000", stressLevel: "Medium", remote: false, skills: ["Makeup Application", "Creativity", "Client Service"] },
  { name: "Costume Designer", education: "Bachelor's degree", salary: "$35,000 - $75,000", stressLevel: "Medium", remote: false, skills: ["Design", "Sewing", "Creativity"] },
  { name: "Art Curator", education: "Master's degree", salary: "$45,000 - $85,000", stressLevel: "Medium", remote: false, skills: ["Art History", "Organization", "Research"] },
  { name: "Museum Guide", education: "High school/Bachelor's", salary: "$25,000 - $45,000", stressLevel: "Low", remote: false, skills: ["Communication", "History Knowledge", "Public Speaking"] },
  { name: "Construction Manager", education: "Bachelor's degree", salary: "$75,000 - $130,000", stressLevel: "High", remote: false, skills: ["Project Management", "Leadership", "Construction Knowledge"] },
  { name: "Mason", education: "High school + Training", salary: "$40,000 - $65,000", stressLevel: "Medium", remote: false, skills: ["Masonry", "Construction", "Physical Strength"] },
  { name: "Roofer", education: "High school + Training", salary: "$35,000 - $60,000", stressLevel: "High", remote: false, skills: ["Roofing", "Safety", "Physical Fitness"] },
  { name: "Heavy Equipment Operator", education: "High school + Training", salary: "$45,000 - $70,000", stressLevel: "Medium", remote: false, skills: ["Equipment Operation", "Safety", "Coordination"] },
  { name: "Construction Laborer", education: "High school", salary: "$30,000 - $50,000", stressLevel: "High", remote: false, skills: ["Physical Labor", "Safety", "Teamwork"] },
  { name: "Architect", education: "Bachelor's + License", salary: "$65,000 - $120,000", stressLevel: "High", remote: false, skills: ["Design", "CAD Software", "Creativity"] },
  { name: "Police Officer", education: "High school + Academy", salary: "$45,000 - $85,000", stressLevel: "High", remote: false, skills: ["Law Enforcement", "Communication", "Physical Fitness"] },
  { name: "EMT/Paramedic", education: "Certificate/Associate", salary: "$35,000 - $60,000", stressLevel: "High", remote: false, skills: ["Medical Emergency Care", "Decision Making", "Stress Management"] },
  { name: "Security Guard", education: "High school + License", salary: "$25,000 - $45,000", stressLevel: "Medium", remote: false, skills: ["Security", "Observation", "Communication"] },
  { name: "Correctional Officer", education: "High school + Training", salary: "$40,000 - $65,000", stressLevel: "High", remote: false, skills: ["Security", "Communication", "Conflict Resolution"] },
  { name: "911 Dispatcher", education: "High school + Training", salary: "$35,000 - $55,000", stressLevel: "High", remote: false, skills: ["Communication", "Multi-tasking", "Emergency Protocols"] },
  { name: "Detective/Investigator", education: "Experience + Training", salary: "$55,000 - $95,000", stressLevel: "High", remote: false, skills: ["Investigation", "Analysis", "Interview Skills"] },
  { name: "Crime Scene Technician", education: "Associate/Bachelor's", salary: "$45,000 - $70,000", stressLevel: "High", remote: false, skills: ["Forensics", "Attention to Detail", "Photography"] },
  { name: "Lawyer/Attorney", education: "Law degree + Bar exam", salary: "$60,000 - $200,000", stressLevel: "High", remote: false, skills: ["Legal Research", "Writing", "Negotiation"] },
  { name: "Paralegal", education: "Certificate/Associate", salary: "$40,000 - $65,000", stressLevel: "Medium", remote: false, skills: ["Legal Research", "Documentation", "Organization"] },
  { name: "Judge", education: "Law degree + Experience", salary: "$120,000 - $200,000", stressLevel: "High", remote: false, skills: ["Legal Knowledge", "Decision Making", "Impartiality"] },
  { name: "Legal Secretary", education: "Certificate", salary: "$35,000 - $55,000", stressLevel: "Medium", remote: false, skills: ["Legal Documentation", "Organization", "Communication"] },
  { name: "Court Reporter", education: "Certificate", salary: "$45,000 - $70,000", stressLevel: "Medium", remote: false, skills: ["Stenography", "Accuracy", "Attention to Detail"] },
  { name: "Legal Consultant", education: "Law degree", salary: "$80,000 - $150,000", stressLevel: "High", remote: true, skills: ["Legal Expertise", "Consulting", "Analysis"] },
  { name: "Patent Attorney", education: "Law + Technical degree", salary: "$120,000 - $180,000", stressLevel: "High", remote: false, skills: ["Patent Law", "Technical Knowledge", "Research"] },
  { name: "Immigration Lawyer", education: "Law degree", salary: "$70,000 - $130,000", stressLevel: "High", remote: false, skills: ["Immigration Law", "Client Relations", "Documentation"] },
  { name: "Public Defender", education: "Law degree", salary: "$50,000 - $80,000", stressLevel: "High", remote: false, skills: ["Criminal Law", "Client Advocacy", "Trial Skills"] },
  { name: "Corporate Counsel", education: "Law degree", salary: "$100,000 - $200,000", stressLevel: "High", remote: false, skills: ["Corporate Law", "Contract Negotiation", "Compliance"] },
  { name: "Legal Aid Lawyer", education: "Law degree", salary: "$45,000 - $70,000", stressLevel: "High", remote: false, skills: ["Public Interest Law", "Client Service", "Advocacy"] },
  { name: "Bankruptcy Attorney", education: "Law degree", salary: "$70,000 - $120,000", stressLevel: "High", remote: false, skills: ["Bankruptcy Law", "Financial Analysis", "Client Counseling"] },
  { name: "Family Lawyer", education: "Law degree", salary: "$60,000 - $110,000", stressLevel: "High", remote: false, skills: ["Family Law", "Mediation", "Emotional Intelligence"] },
  { name: "Criminal Defense Attorney", education: "Law degree", salary: "$70,000 - $150,000", stressLevel: "High", remote: false, skills: ["Criminal Law", "Trial Advocacy", "Investigation"] },
  { name: "Personal Injury Lawyer", education: "Law degree", salary: "$80,000 - $200,000", stressLevel: "High", remote: false, skills: ["Tort Law", "Negotiation", "Client Relations"] },
  { name: "Tax Attorney", education: "Law degree + Tax focus", salary: "$90,000 - $160,000", stressLevel: "High", remote: true, skills: ["Tax Law", "Financial Analysis", "Compliance"] },
  { name: "Environmental Lawyer", education: "Law degree", salary: "$70,000 - $130,000", stressLevel: "Medium", remote: false, skills: ["Environmental Law", "Regulatory Compliance", "Research"] },
  { name: "Employment Lawyer", education: "Law degree", salary: "$80,000 - $140,000", stressLevel: "High", remote: false, skills: ["Employment Law", "Workplace Issues", "Compliance"] },
  { name: "Real Estate Attorney", education: "Law degree", salary: "$70,000 - $130,000", stressLevel: "Medium", remote: false, skills: ["Real Estate Law", "Contract Review", "Title Issues"] },
  { name: "Intellectual Property Lawyer", education: "Law degree + Technical background", salary: "$110,000 - $180,000", stressLevel: "Medium", remote: false, skills: ["IP Law", "Patent/Trademark Law", "Technology"] },
  { name: "Sous Chef", education: "Culinary training", salary: "$40,000 - $65,000", stressLevel: "High", remote: false, skills: ["Cooking", "Leadership", "Kitchen Operations"] },
  { name: "Line Cook", education: "On-the-job training", salary: "$25,000 - $40,000", stressLevel: "High", remote: false, skills: ["Cooking", "Speed", "Teamwork"] },
  { name: "Pastry Chef", education: "Culinary school", salary: "$35,000 - $70,000", stressLevel: "High", remote: false, skills: ["Baking", "Creativity", "Precision"] },
  { name: "Server/Waiter", education: "High school", salary: "$20,000 - $40,000", stressLevel: "High", remote: false, skills: ["Customer Service", "Multi-tasking", "Communication"] },
  { name: "Bartender", education: "Certification/Training", salary: "$25,000 - $50,000", stressLevel: "High", remote: false, skills: ["Mixology", "Customer Service", "Cash Handling"] },
  { name: "Food Service Manager", education: "Bachelor's degree", salary: "$45,000 - $75,000", stressLevel: "High", remote: false, skills: ["Management", "Food Safety", "Operations"] },
  { name: "Catering Manager", education: "Bachelor's degree", salary: "$40,000 - $70,000", stressLevel: "High", remote: false, skills: ["Event Planning", "Management", "Customer Service"] },
  { name: "Food Critic", education: "Bachelor's degree", salary: "$40,000 - $80,000", stressLevel: "Medium", remote: false, skills: ["Writing", "Food Knowledge", "Critical Analysis"] },
  { name: "Food Photographer", education: "Photography training", salary: "$35,000 - $70,000", stressLevel: "Medium", remote: false, skills: ["Photography", "Food Styling", "Creativity"] },
  { name: "Food Stylist", education: "Culinary/Art training", salary: "$40,000 - $75,000", stressLevel: "Medium", remote: false, skills: ["Food Presentation", "Creativity", "Photography"] },
  { name: "Restaurant Owner", education: "Variable", salary: "$40,000 - $150,000", stressLevel: "High", remote: false, skills: ["Business Management", "Operations", "Leadership"] },
  { name: "Food Truck Operator", education: "Business license", salary: "$30,000 - $70,000", stressLevel: "High", remote: false, skills: ["Cooking", "Business Operations", "Customer Service"] },
  { name: "Baker", education: "Training/Experience", salary: "$25,000 - $45,000", stressLevel: "Medium", remote: false, skills: ["Baking", "Time Management", "Creativity"] },
  { name: "Butcher", education: "Training/Apprenticeship", salary: "$30,000 - $50,000", stressLevel: "Medium", remote: false, skills: ["Meat Cutting", "Food Safety", "Customer Service"] },
  { name: "Food Safety Inspector", education: "Bachelor's degree", salary: "$45,000 - $70,000", stressLevel: "Medium", remote: false, skills: ["Food Safety", "Inspection", "Regulations"] },
  { name: "Cafeteria Worker", education: "High school", salary: "$20,000 - $35,000", stressLevel: "Medium", remote: false, skills: ["Food Preparation", "Customer Service", "Teamwork"] },
  { name: "Prep Cook", education: "On-the-job training", salary: "$22,000 - $35,000", stressLevel: "Medium", remote: false, skills: ["Food Preparation", "Knife Skills", "Organization"] },
  { name: "Dishwasher", education: "No formal education", salary: "$18,000 - $28,000", stressLevel: "Medium", remote: false, skills: ["Cleaning", "Time Management", "Physical Stamina"] },
  { name: "Host/Hostess", education: "High school", salary: "$18,000 - $30,000", stressLevel: "Medium", remote: false, skills: ["Customer Service", "Organization", "Communication"] },
  { name: "Food Delivery Driver", education: "Driver's license", salary: "$25,000 - $45,000", stressLevel: "Medium", remote: false, skills: ["Driving", "Navigation", "Customer Service"] },
  { name: "Menu Developer", education: "Culinary degree", salary: "$45,000 - $75,000", stressLevel: "Medium", remote: false, skills: ["Culinary Creativity", "Cost Analysis", "Nutrition"] },
  { name: "Food Blogger", education: "Variable", salary: "$25,000 - $80,000", stressLevel: "Medium", remote: true, skills: ["Writing", "Food Knowledge", "Social Media"] },
  { name: "Journalist", education: "Bachelor's degree", salary: "$35,000 - $70,000", stressLevel: "High", remote: true, skills: ["Writing", "Research", "Interview Skills"] },
  { name: "News Anchor", education: "Bachelor's degree", salary: "$50,000 - $150,000", stressLevel: "High", remote: false, skills: ["Public Speaking", "Communication", "Current Events"] },
  { name: "Radio DJ", education: "High school/Bachelor's", salary: "$30,000 - $60,000", stressLevel: "Medium", remote: false, skills: ["Broadcasting", "Communication", "Music Knowledge"] },
  { name: "Television Producer", education: "Bachelor's degree", salary: "$55,000 - $120,000", stressLevel: "High", remote: false, skills: ["Production", "Management", "Creativity"] },
  { name: "Camera Operator", education: "Technical training", salary: "$35,000 - $65,000", stressLevel: "Medium", remote: false, skills: ["Camera Operation", "Technical Skills", "Creativity"] },
  { name: "Editor (Print/Digital)", education: "Bachelor's degree", salary: "$40,000 - $75,000", stressLevel: "High", remote: true, skills: ["Editing", "Writing", "Attention to Detail"] },
  { name: "Public Relations Specialist", education: "Bachelor's degree", salary: "$45,000 - $85,000", stressLevel: "High", remote: false, skills: ["Communication", "Media Relations", "Writing"] },
  { name: "Communications Manager", education: "Bachelor's degree", salary: "$55,000 - $95,000", stressLevel: "High", remote: false, skills: ["Communication Strategy", "Management", "Writing"] },
  { name: "Broadcast Technician", education: "Associate degree", salary: "$35,000 - $60,000", stressLevel: "Medium", remote: false, skills: ["Technical Skills", "Equipment Operation", "Troubleshooting"] },
  { name: "Media Planner", education: "Bachelor's degree", salary: "$45,000 - $75,000", stressLevel: "Medium", remote: false, skills: ["Media Planning", "Analytics", "Marketing"] },
  { name: "Advertising Executive", education: "Bachelor's degree", salary: "$50,000 - $100,000", stressLevel: "High", remote: false, skills: ["Advertising", "Client Relations", "Creativity"] },
  { name: "Scriptwriter", education: "Bachelor's degree", salary: "$40,000 - $90,000", stressLevel: "Medium", remote: true, skills: ["Writing", "Creativity", "Storytelling"] },
  { name: "Podcast Producer", education: "Variable", salary: "$30,000 - $70,000", stressLevel: "Medium", remote: true, skills: ["Audio Production", "Content Creation", "Storytelling"] },
  { name: "Media Buyer", education: "Bachelor's degree", salary: "$40,000 - $70,000", stressLevel: "Medium", remote: false, skills: ["Media Buying", "Negotiation", "Analytics"] },
  { name: "Documentary Filmmaker", education: "Bachelor's degree", salary: "$35,000 - $80,000", stressLevel: "High", remote: false, skills: ["Filmmaking", "Research", "Storytelling"] },
  { name: "Voice Actor", education: "Training", salary: "$25,000 - $80,000", stressLevel: "Medium", remote: true, skills: ["Voice Acting", "Performance", "Diction"] },
  { name: "Media Analyst", education: "Bachelor's degree", salary: "$50,000 - $85,000", stressLevel: "Medium", remote: true, skills: ["Data Analysis", "Media Knowledge", "Research"] },
  { name: "Communications Coordinator", education: "Bachelor's degree", salary: "$35,000 - $55,000", stressLevel: "Medium", remote: false, skills: ["Communication", "Organization", "Writing"] },
  { name: "Marketing Communications Specialist", education: "Bachelor's degree", salary: "$45,000 - $75,000", stressLevel: "Medium", remote: false, skills: ["Marketing", "Communication", "Content Creation"] },
  { name: "Media Relations Manager", education: "Bachelor's degree", salary: "$55,000 - $90,000", stressLevel: "High", remote: false, skills: ["Media Relations", "Communication", "Crisis Management"] },
  { name: "Technical Writer", education: "Bachelor's degree", salary: "$50,000 - $85,000", stressLevel: "Medium", remote: true, skills: ["Technical Writing", "Communication", "Research"] },
  { name: "Grant Writer", education: "Bachelor's degree", salary: "$40,000 - $70,000", stressLevel: "Medium", remote: true, skills: ["Grant Writing", "Research", "Communication"] },
  { name: "Speechwriter", education: "Bachelor's degree", salary: "$45,000 - $85,000", stressLevel: "High", remote: true, skills: ["Writing", "Public Speaking Knowledge", "Research"] },
  { name: "Book Editor", education: "Bachelor's degree", salary: "$40,000 - $75,000", stressLevel: "Medium", remote: true, skills: ["Editing", "Literature Knowledge", "Attention to Detail"] },
  { name: "Magazine Editor", education: "Bachelor's degree", salary: "$45,000 - $80,000", stressLevel: "High", remote: false, skills: ["Editing", "Publishing", "Content Management"] },
  { name: "Web Content Manager", education: "Bachelor's degree", salary: "$45,000 - $75,000", stressLevel: "Medium", remote: true, skills: ["Content Management", "Web Publishing", "SEO"] },
  { name: "Corporate Communications Manager", education: "Bachelor's degree", salary: "$60,000 - $100,000", stressLevel: "High", remote: false, skills: ["Corporate Communication", "Strategy", "Crisis Management"] },
  { name: "Park Ranger", education: "Bachelor's degree", salary: "$40,000 - $70,000", stressLevel: "Medium", remote: false, skills: ["Conservation", "Public Education", "Outdoor Skills"] },
  { name: "Wildlife Biologist", education: "Bachelor's degree", salary: "$50,000 - $80,000", stressLevel: "Medium", remote: false, skills: ["Biology", "Research", "Field Work"] },
  { name: "Conservation Officer", education: "Bachelor's degree", salary: "$45,000 - $75,000", stressLevel: "Medium", remote: false, skills: ["Law Enforcement", "Conservation", "Outdoor Skills"] },
  { name: "Forestry Worker", education: "High school + Training", salary: "$30,000 - $50,000", stressLevel: "Medium", remote: false, skills: ["Forestry", "Physical Work", "Safety"] },
  { name: "Environmental Technician", education: "Associate degree", salary: "$35,000 - $55,000", stressLevel: "Medium", remote: false, skills: ["Environmental Testing", "Data Collection", "Laboratory Skills"] },
  { name: "Hydrologist", education: "Bachelor's degree", salary: "$65,000 - $100,000", stressLevel: "Medium", remote: false, skills: ["Hydrology", "Research", "Environmental Science"] },
  { name: "Solar Panel Installer", education: "Training/Certificate", salary: "$40,000 - $65,000", stressLevel: "Medium", remote: false, skills: ["Installation", "Electrical Work", "Safety"] },
  { name: "Wind Turbine Technician", education: "Training/Associate", salary: "$50,000 - $75,000", stressLevel: "High", remote: false, skills: ["Mechanical Skills", "Safety", "Troubleshooting"] },
  { name: "Sustainability Coordinator", education: "Bachelor's degree", salary: "$45,000 - $75,000", stressLevel: "Medium", remote: false, skills: ["Sustainability", "Project Management", "Data Analysis"] },
  { name: "Environmental Health Specialist", education: "Bachelor's degree", salary: "$50,000 - $80,000", stressLevel: "Medium", remote: false, skills: ["Environmental Health", "Inspection", "Public Health"] },
  { name: "Recycling Coordinator", education: "Bachelor's degree", salary: "$35,000 - $60,000", stressLevel: "Medium", remote: false, skills: ["Waste Management", "Organization", "Public Education"] },
  { name: "Environmental Educator", education: "Bachelor's degree", salary: "$35,000 - $65,000", stressLevel: "Medium", remote: false, skills: ["Education", "Communication", "Environmental Knowledge"] },
  { name: "Climate Change Analyst", education: "Master's degree", salary: "$60,000 - $100,000", stressLevel: "Medium", remote: true, skills: ["Climate Science", "Data Analysis", "Research"] },
  { name: "Environmental Compliance Officer", education: "Bachelor's degree", salary: "$55,000 - $85,000", stressLevel: "Medium", remote: false, skills: ["Regulatory Compliance", "Environmental Law", "Inspection"] },
  { name: "Water Quality Technician", education: "Associate degree", salary: "$35,000 - $55,000", stressLevel: "Medium", remote: false, skills: ["Water Testing", "Laboratory Skills", "Data Collection"] },
  { name: "Environmental Planner", education: "Master's degree", salary: "$55,000 - $90,000", stressLevel: "Medium", remote: false, skills: ["Planning", "Environmental Assessment", "GIS"] },
  { name: "Soil Scientist", education: "Bachelor's degree", salary: "$50,000 - $80,000", stressLevel: "Medium", remote: false, skills: ["Soil Science", "Research", "Field Work"] },
  { name: "Environmental Photographer", education: "Photography training", salary: "$30,000 - $65,000", stressLevel: "Medium", remote: false, skills: ["Photography", "Nature Knowledge", "Travel"] },
];

const newCareersToAdd: Partial<Career>[] = [
  { name: "Gambling services workers" },
  { name: "Special effects artists and animators" },
  { name: "Kindergarten and elementary school teachers" },
  { name: "Public safety telecommunicators" },
  { name: "Aircraft and avionics equipment mechanics and technicians" },
  { name: "Water transportation workers" },
  { name: "Chemical engineers" },
  { name: "Electrical and electronics installers and repairers" },
  { name: "Musicians and singers" },
  { name: "Accountants and auditors" },
  { name: "Postsecondary teachers" },
  { name: "Bill and account collectors" },
  { name: "Bookkeeping, accounting, and auditing clerks" },
  { name: "Secretaries and administrative assistants" },
  { name: "Drywall installers, ceiling tile installers, and tapers" },
  { name: "Librarians and library media specialists" },
  { name: "Concierges" },
  { name: "Actuaries" },
  { name: "Nurse anesthetists, nurse midwives, and nurse practitioners" },
  { name: "Substance abuse, behavioral disorder, and mental health counselors" },
  { name: "Physicians and surgeons" },
  { name: "Social and human service assistants" },
  { name: "General office clerks" },
  { name: "Judges and hearing officers" },
  { name: "Administrative services and facilities managers" },
  { name: "Top executives" },
  { name: "School and career counselors and advisors" },
  { name: "Information clerks" },
  { name: "Masonry workers" },
  { name: "Construction laborers and helpers" },
  { name: "Adult basic and secondary education and ESL teachers" },
  { name: "Teacher assistants" },
  { name: "Social workers" },
  { name: "Advertising, promotions, and marketing managers" },
  { name: "Advertising sales agents" },
  { name: "Market research analysts" },
  { name: "Writers and authors" },
  { name: "Editors" },
  { name: "Photographers" },
  { name: "Airline and commercial pilots" },
  { name: "Fitness trainers and instructors" },
  { name: "Aerospace engineers" },
  { name: "Drafters" },
  { name: "Aerospace engineering and operations technologists and technicians" },
  { name: "Sales engineers" },
  { name: "Lawyers" },
  { name: "Agricultural and food science technicians" },
  { name: "Agricultural and food scientists" },
  { name: "Chemists and materials scientists" },
  { name: "Farmers, ranchers, and other agricultural managers" },
  { name: "Economists" },
  { name: "Agricultural engineers" },
  { name: "Heavy vehicle and mobile equipment service technicians" },
  { name: "Real estate brokers and sales agents" },
  { name: "Natural sciences managers" },
  { name: "Agricultural workers" },
  { name: "Environmental engineering technologists and technicians" },
  { name: "Assemblers and fabricators" },
  { name: "Heating, air conditioning, and refrigeration mechanics and installers" },
  { name: "Sheet metal workers" },
  { name: "Hand laborers and material movers" },
  { name: "Painting and coating workers" },
  { name: "Flight attendants" },
  { name: "Compliance officers" },
  { name: "Environmental engineers" },
  { name: "Taxi drivers, shuttle drivers, and chauffeurs" },
  { name: "Transportation, storage, and distribution managers" },
  { name: "Air traffic controllers" },
  { name: "Environmental science and protection technicians" },
  { name: "Metal and plastic machine workers" },
  { name: "Mathematicians and statisticians" },
  { name: "Tutors" },
  { name: "Fishing and hunting workers" },
  { name: "Small engine mechanics" },
  { name: "Food processing equipment workers" },
  { name: "Arbitrators, mediators, and conciliators" },
  { name: "Welders, cutters, solderers, and brazers" },
  { name: "EMTs and paramedics" },
  { name: "Orthotists and prosthetists" },
  { name: "Interpreters and translators" },
  { name: "Quality control inspectors" },
  { name: "Entertainment and recreation managers" },
  { name: "Physician assistants" },
  { name: "Construction equipment operators" },
  { name: "Animal care and service workers" },
  { name: "Veterinarians" },
  { name: "Announcers and DJs" },
  { name: "Electrical and electronics engineers" },
  { name: "Anthropologists and archeologists" },
  { name: "Property, real estate, and community association managers" },
  { name: "Pharmacists" },
  { name: "Fashion designers" },
  { name: "Computer and information systems managers" },
  { name: "Software developers, quality assurance analysts, and testers" },
  { name: "Computer systems analysts" },
  { name: "Computer programmers" },
  { name: "Exercise physiologists" },
  { name: "Receptionists" },
  { name: "Zoologists and wildlife biologists" },
  { name: "Architects" },
  { name: "Architectural and engineering managers" },
  { name: "Career and technical education teachers" },
  { name: "Civil engineers" },
  { name: "Construction and building inspectors" },
  { name: "Archivists, curators, and museum workers" },
  { name: "Ironworkers" },
  { name: "Security guards and gambling surveillance officers" },
  { name: "Fire inspectors" },
  { name: "Art directors" },
  { name: "Hazardous materials removal workers" },
  { name: "Material moving machine operators" },
  { name: "Technical writers" },
  { name: "Physicists and astronomers" },
  { name: "Athletes and sports competitors" },
  { name: "Coaches and scouts" },
  { name: "Umpires, referees, and other sports officials" },
  { name: "Athletic trainers" },
  { name: "Atmospheric scientists, including meteorologists" },
  { name: "Nuclear engineers" },
  { name: "Broadcast, sound, and video technicians" },
  { name: "Audiologists" },
  { name: "Financial clerks" },
  { name: "Childcare workers" },
  { name: "Automotive body and glass repairers" },
  { name: "Heavy and tractor-trailer truck drivers" },
  { name: "Automotive service technicians and mechanics" },
  { name: "Claims adjusters, appraisers, examiners, and investigators" },
  { name: "Industrial designers" },
  { name: "Database administrators and architects" },
  { name: "Insurance underwriters" },
  { name: "Machinists and tool and die makers" },
  { name: "Materials engineers" },
  { name: "Mechanical engineers" },
  { name: "Travel agents" },
  { name: "Woodworkers" },
  { name: "Microbiologists" },
  { name: "Biological technicians" },
  { name: "Bakers" },
  { name: "Dancers and choreographers" },
  { name: "Forensic science technicians" },
  { name: "Financial managers" },
  { name: "Financial examiners" },
  { name: "Tellers" },
  { name: "Chefs and head cooks" },
  { name: "Cooks" },
  { name: "Food service managers" },
  { name: "Food and beverage serving and related workers" },
  { name: "Barbers, hairstylists, and cosmetologists" },
  { name: "Bartenders" },
  { name: "Carpenters" },
  { name: "Lodging managers" },
  { name: "Psychiatric technicians and aides" },
  { name: "Compensation, benefits, and job analysis specialists" },
  { name: "Craft and fine artists" },
  { name: "Bioengineers and biomedical engineers" },
  { name: "Biochemists and biophysicists" },
  { name: "Medical equipment repairers" },
  { name: "Police and detectives" },
  { name: "Boilermakers" },
  { name: "Stationary engineers and boiler operators" },
  { name: "Producers and directors" },
  { name: "Budget analysts" },
  { name: "Bus drivers" },
  { name: "Management analysts" },
  { name: "Data scientists" },
  { name: "Butchers" },
  { name: "Social workers" },
  { name: "Nursing assistants and orderlies" },
  { name: "Telecommunications technicians" },
  { name: "Cartographers and photogrammetrists" },
  { name: "Recreation workers" },
  { name: "Health information technologists and medical registrars" },
  { name: "Medical scientists" },
  { name: "Cardiovascular technologists and technicians" },
  { name: "Private detectives and investigators" },
  { name: "Medical dosimetrists" },
  { name: "Medical transcriptionists" },
  { name: "Meeting, convention, and event planners" },
  { name: "Funeral service workers" },
  { name: "Nuclear medicine technologists" },
  { name: "Occupational therapy assistants and aides" },
  { name: "Opticians" },
  { name: "Pharmacy technicians" },
  { name: "Phlebotomists" },
  { name: "Professional Ergonomist" },
  { name: "Recreational therapists" },
  { name: "Rehabilitation counselors" },
  { name: "Respiratory therapists" },
  { name: "Surgical assistants and technologists" },
  { name: "Veterinary technologists and technicians" },
  { name: "Chemical technicians" },
  { name: "Preschool and childcare center directors" },
  { name: "Chiropractors" },
  { name: "Music directors and composers" },
  { name: "Computer hardware engineers" },
  { name: "Computer network architects" },
  { name: "Information security analysts" },
  { name: "Computer support specialists" },
  { name: "Waiters and waitresses" },
  { name: "Correctional officers and bailiffs" },
  { name: "Probation officers and correctional treatment specialists" },
  { name: "Cosmetologists" },
  { name: "Cost estimators" },
  { name: "Court reporters and simultaneous captioners" },
  { name: "Credit counselors" },
  { name: "Customer service representatives" },
  { name: "Diagnostic medical sonographers" },
  { name: "Dental assistants" },
  { name: "Dental hygienists" },
  { name: "Dentists" },
  { name: "Desktop publishers" },
  { name: "Diesel service technicians and mechanics" },
  { name: "Dietitians and nutritionists" },
  { name: "Elevator and escalator installers and repairers" },
  { name: "Emergency management directors" },  
  { name: "EMTs and paramedics" },
  { name: "Health and safety engineers" },
  { name: "Elementary, middle, and high school principals" },
  { name: "Food preparation workers" },
  { name: "Geological and hydrologic technicians" },
  { name: "Geoscientists" },
  { name: "Glaziers" },
  { name: "Grounds maintenance workers" },
  { name: "Home health and personal care aides" },
  { name: "Human resources managers" },
  { name: "Human resources specialists" },
  { name: "Hydrologists" },
  { name: "Industrial production managers" },
  { name: "Insulation workers" },
  { name: "Insurance sales agents" },
  { name: "Interior designers" },
  { name: "Janitors and building cleaners" },
  { name: "Jewelers and precious stone and metal workers" },
  { name: "Labor relations specialists" },
  { name: "Landscape architects" },
  { name: "Licensed practical and licensed vocational nurses" },
  { name: "Logging workers" },
  { name: "Logisticians" },
  { name: "Manicurists and pedicurists" },
  { name: "Marine engineers and naval architects" },
  { name: "Marriage and family therapists" },
  { name: "Massage therapists" },
  { name: "Material recording clerks" },
  { name: "Medical and health services managers" },
  { name: "Medical records specialists" },
  { name: "Military careers" },
  { name: "Mining and geological engineers" },
  { name: "Network and computer systems administrators" },
  { name: "News analysts, reporters, and journalists" },
  { name: "Nuclear technicians" },
  { name: "Occupational therapists" },
  { name: "Operations research analysts" },
  { name: "Optometrists" },
  { name: "Painters, construction and maintenance" },
  { name: "Paralegals and legal assistants" },
  { name: "Pest control workers" },
  { name: "Petroleum engineers" },
  { name: "Physical therapist assistants and aides" },
  { name: "Physical therapists" },
  { name: "Plumbers, pipefitters, and steamfitters" },
  { name: "Podiatrists" },
  { name: "Political scientists" },
  { name: "Postal service workers" },
  { name: "Power plant operators, distributors, and dispatchers" },
  { name: "Preschool teachers" },
  { name: "Project management specialists" },
  { name: "Property appraisers and assessors" },
  { name: "Psychologists" },
  { name: "Purchasing managers, buyers, and purchasing agents" },
  { name: "Radiation therapists" },
  { name: "Radiologic and MRI technologists" },
  { name: "Railroad workers" },
  { name: "Roofers" },
  { name: "Sales managers" },
  { name: "Securities, commodities, and financial services sales agents" },
  { name: "Set and exhibit designers" },
  { name: "Skincare specialists" },
  { name: "Social and community service managers" },
  { name: "Sociologists" },
  { name: "Solar photovoltaic installers" },
  { name: "Special education teachers" },
  { name: "Speech-language pathologists" },
  { name: "Surveying and mapping technicians" },
  { name: "Surveyors" },
  { name: "Survey researchers" },
  { name: "Tax examiners and collectors, and revenue agents" },
  { name: "Training and development managers" },
  { name: "Training and development specialists" },
  { name: "Urban and regional planners" },
  { name: "Veterinary assistants and laboratory animal caretakers" },
  { name: "Water and wastewater treatment plant and system operators" },
  { name: "Web developers and digital designers" },
  { name: "Wind turbine technicians" },
];

function getCareerNamesForSubcategory(category: string, subcategory: string): string[] {
  const careerNames: { [key: string]: { [key: string]: string[] } } = {
    "Technology": {
      "Software Development": ["Software Engineer", "Full Stack Developer", "Backend Developer", "Frontend Developer", "Mobile App Developer", "Game Developer", "Software Architect", "DevOps Engineer", "Site Reliability Engineer", "Platform Engineer"],
      "Data Science": ["Data Scientist", "Data Analyst", "Machine Learning Engineer", "AI Researcher", "Business Intelligence Analyst", "Data Engineer", "Statistician", "Quantitative Analyst", "Research Scientist", "Data Architect"],
      "Cybersecurity": ["Cybersecurity Analyst", "Information Security Manager", "Penetration Tester", "Security Consultant", "Incident Response Specialist", "Security Architect", "Compliance Officer", "Risk Analyst", "Forensic Analyst", "Security Engineer"],
      "Web Development": ["Web Developer", "UI/UX Designer", "Frontend Engineer", "Backend Engineer", "Web Designer", "E-commerce Developer", "WordPress Developer", "React Developer", "Angular Developer", "Vue.js Developer"]
    },
    "Healthcare": {
      "Nursing": ["Registered Nurse", "Nurse Practitioner", "Clinical Nurse Specialist", "Nurse Anesthetist", "Nurse Midwife", "ICU Nurse", "Emergency Room Nurse", "Pediatric Nurse", "Oncology nurse", "Psychiatric Nurse"],
      "Medical Specialists": ["Cardiologist", "Neurologist", "Orthopedic Surgeon", "Dermatologist", "Radiologist", "Anesthesiologist", "Pathologist", "Emergency Medicine Physician", "Family Medicine Physician", "Internal Medicine Physician"],
      "Mental Health": ["Psychiatrist", "Psychologist", "Clinical Social Worker", "Mental Health Counselor", "Marriage and Family Therapist", "Substance Abuse Counselor", "Art Therapist", "Music Therapist", "Behavioral Analyst", "Crisis Counselor"]
    },
    "Engineering": {
      "Civil": ["Civil Engineer", "Structural Engineer", "Transportation Engineer", "Environmental Engineer", "Geotechnical Engineer", "Water Resources Engineer", "Construction Engineer", "Urban Planner", "Surveyor", "Project Manager"],
      "Mechanical": ["Mechanical Engineer", "Manufacturing Engineer", "Automotive Engineer", "HVAC Engineer", "Robotics Engineer", "Aerospace Engineer", "Materials Engineer", "Design Engineer", "Process Engineer", "Quality Engineer"],
      "Electrical": ["Electrical Engineer", "Electronics Engineer", "Power Systems Engineer", "Control Systems Engineer", "Telecommunications Engineer", "Computer Hardware Engineer", "Instrumentation Engineer", "RF Engineer", "Signal Processing Engineer", "Embedded Systems Engineer"]
    },
    "Business": {
      "Finance": ["Financial Analyst", "Investment Banker", "Financial Advisor", "Portfolio Manager", "Risk Manager", "Credit Analyst", "Corporate Finance Manager", "Treasury Analyst", "Compliance Officer", "Auditor"],
      "Marketing": ["Marketing Manager", "Digital Marketing Specialist", "Content Marketing Manager", "Social Media Manager", "Brand Manager", "Product Marketing Manager", "Marketing Analyst", "SEO Specialist", "Email Marketing Specialist", "Growth Hacker"],
      "Management": ["General Manager", "Operations Manager", "Project Manager", "Program Manager", "Business Development Manager", "Strategy Manager", "Change Management Consultant", "Process Improvement Manager", "Team Lead", "Department Head"]
    },
    "Education": {
      "K-12 Teaching": ["Elementary School Teacher", "Middle School Teacher", "High School Teacher", "Special Education Teacher", "ESL Teacher", "Math Teacher", "Science Teacher", "English Teacher", "History Teacher", "Art Teacher"],
      "Higher Education": ["Professor", "Associate Professor", "Assistant Professor", "Lecturer", "Research Professor", "Department Chair", "Dean", "Academic Advisor", "Admissions Counselor", "Student Affairs Coordinator"],
      "Administration": ["Principal", "Vice Principal", "Superintendent", "Curriculum Director", "School Counselor", "Librarian", "Instructional Coordinator", "Education Administrator", "Student Services Director", "Academic Dean"]
    }
  };

  return careerNames[category]?.[subcategory] || [`${subcategory} Specialist`, `${subcategory} Manager`, `${subcategory} Coordinator`, `${subcategory} Analyst`, `${subcategory} Consultant`];
}

function getCareerDescription(category: string, subcategory: string, careerName: string): string {
  const descriptions: { [key: string]: string } = {
    "Technology": "Leverages cutting-edge technology to solve complex problems and drive innovation in the digital age.",
    "Healthcare": "Provides essential medical care and support to improve patient health and wellbeing.",
    "Engineering": "Applies scientific and mathematical principles to design, build, and maintain systems and structures.",
    "Business": "Drives organizational success through strategic planning, analysis, and effective management practices.",
    "Education": "Facilitates learning and development to empower students and advance educational outcomes.",
    "Arts": "Creates, performs, and produces artistic works that inspire, entertain, and enrich cultural experiences.",
    "Legal": "Provides legal expertise and representation to ensure justice and compliance with laws and regulations.",
    "Manufacturing": "Produces goods and materials through efficient manufacturing processes and quality control.",
    "Transportation": "Manages the movement of people and goods through various transportation systems and logistics.",
    "Construction": "Builds and maintains infrastructure, buildings, and facilities that support modern society.",
    "Government": "Serves the public interest through policy development, administration, and public service delivery.",
    "Agriculture": "Produces food, fiber, and other agricultural products while managing natural resources sustainably.",
    "Energy": "Generates, distributes, and manages energy resources to power homes, businesses, and industries.",
    "Retail": "Provides products and services directly to consumers through various retail channels and experiences.",
    "Hospitality": "Delivers exceptional customer experiences in travel, lodging, dining, and entertainment services.",
    "Science": "Conducts research and analysis to advance scientific knowledge and solve real-world problems.",
    "Media": "Creates, distributes, and manages content across various media platforms and communication channels.",
    "Nonprofit": "Works to address social issues and improve communities through mission-driven organizations.",
    "Sports": "Promotes physical fitness, athletic performance, and recreational activities for individuals and communities.",
    "Environmental": "Protects and preserves the environment while promoting sustainable practices and conservation."
  };

  return descriptions[category] || "Contributes expertise and skills to advance the field and serve stakeholders.";
}

function getSkillsForCareer(category: string, subcategory: string, careerName?: string): string[] {
  const skillSets: { [key: string]: string[] } = {
    "Technology": ["Programming", "Problem Solving", "System Design", "Database Management", "Cloud Computing", "Agile Methodologies"],
    "Healthcare": ["Patient Care", "Medical Knowledge", "Communication", "Critical Thinking", "Empathy", "Attention to Detail"],
    "Engineering": ["Technical Analysis", "CAD Software", "Project Management", "Mathematics", "Physics", "Quality Control"],
    "Business": ["Strategic Planning", "Financial Analysis", "Leadership", "Communication", "Negotiation", "Market Research"],
    "Education": ["Teaching", "Curriculum Development", "Classroom Management", "Assessment", "Communication", "Patience"],
    "Arts": ["Creativity", "Artistic Skills", "Visual Design", "Performance", "Storytelling", "Cultural Awareness"],
    "Legal": ["Legal Research", "Writing", "Analysis", "Negotiation", "Ethics", "Critical Thinking"],
    "Manufacturing": ["Quality Control", "Process Improvement", "Safety Protocols", "Equipment Operation", "Technical Skills", "Attention to Detail"],
    "Transportation": ["Logistics", "Safety Management", "Route Planning", "Vehicle Operation", "Customer Service", "Time Management"],
    "Construction": ["Construction Skills", "Safety Protocols", "Blueprint Reading", "Project Management", "Physical Stamina", "Tool Operation"],
    "Government": ["Public Administration", "Policy Analysis", "Communication", "Ethics", "Research", "Regulatory Knowledge"],
    "Agriculture": ["Agricultural Knowledge", "Equipment Operation", "Animal Care", "Crop Management", "Sustainability", "Physical Stamina"],
    "Energy": ["Technical Knowledge", "Safety Protocols", "Environmental Awareness", "Problem Solving", "Equipment Maintenance", "Regulatory Compliance"],
    "Retail": ["Customer Service", "Sales", "Product Knowledge", "Communication", "Time Management", "Teamwork"],
    "Hospitality": ["Customer Service", "Communication", "Cultural Sensitivity", "Event Planning", "Time Management", "Attention to Detail"],
    "Science": ["Research Methods", "Data Analysis", "Laboratory Skills", "Scientific Writing", "Critical Thinking", "Attention to Detail"],
    "Media": ["Content Creation", "Communication", "Digital Media", "Storytelling", "Social Media", "Creative Writing"],
    "Nonprofit": ["Program Management", "Fundraising", "Community Outreach", "Grant Writing", "Advocacy", "Cultural Sensitivity"],
    "Sports": ["Athletic Skills", "Coaching", "Physical Fitness", "Team Leadership", "Motivation", "Sports Knowledge"],
    "Environmental": ["Environmental Science", "Sustainability", "Data Analysis", "Research", "Policy Knowledge", "Conservation"]
  };

  return skillSets[category] || ["Professional Skills", "Communication", "Problem Solving", "Teamwork", "Time Management", "Attention to Detail"];
}

function getCategoryForJob(jobName: string): { category: string, subcategory: string } {
  const lowerJob = jobName.toLowerCase();
  if (['engineer', 'developer', 'scientist', 'designer', 'analyst'].some(term => lowerJob.includes(term)) && ['software', 'data', 'ux', 'web', 'product', 'programmer', 'security', 'mobile', 'devops', 'ai', 'cybersecurity'].some(term => lowerJob.includes(term))) return { category: 'Technology', subcategory: 'Software Development' };
  if (['lawyer', 'paralegal', 'judge', 'attorney'].some(term => lowerJob.includes(term))) return { category: 'Legal', subcategory: 'Corporate Law' };
  if (['surgeon', 'nurse', 'physician', 'therapist', 'pharmacist', 'dentist', 'veterinarian', 'medic', 'hygienist'].some(term => lowerJob.includes(term))) return { category: 'Healthcare', subcategory: 'Medical Specialists' };
  if (['pilot', 'firefighter', 'officer', 'controller'].some(term => lowerJob.includes(term))) return { category: 'Government', subcategory: 'Public Safety' };
  if (['construction', 'electrician', 'plumber', 'hvac', 'welder', 'carpenter', 'mechanic', 'roofer', 'mason'].some(term => lowerJob.includes(term))) return { category: 'Construction', subcategory: 'Skilled Trades' };
  if (['manager', 'director', 'strategist', 'officer', 'accountant', 'analyst'].some(term => lowerJob.includes(term)) && ['marketing', 'financial', 'sales', 'business', 'hr', 'investment', 'real estate'].some(term => lowerJob.includes(term))) return { category: 'Business', subcategory: 'Management' };
  if (['teacher', 'professor', 'counselor', 'administrator', 'librarian', 'designer'].some(term => lowerJob.includes(term)) && ['school', 'educational', 'instructional'].some(term => lowerJob.includes(term))) return { category: 'Education', subcategory: 'K-12 Teaching' };
  if (['art', 'writer', 'author', 'musician', 'designer', 'photographer', 'director', 'editor', 'actor', 'dancer'].some(term => lowerJob.includes(term))) return { category: 'Arts', subcategory: 'Creative Arts' };
  if (['driver', 'conductor', 'mechanic', 'dispatcher', 'manager'].some(term => lowerJob.includes(term)) && ['truck', 'bus', 'train', 'ship', 'airline', 'port', 'logistics'].some(term => lowerJob.includes(term))) return { category: 'Transportation', subcategory: 'Logistics' };
  if (['farm', 'agricultural', 'agronomist', 'forester'].some(term => lowerJob.includes(term))) return { category: 'Agriculture', subcategory: 'Farming' };
  if (['retail', 'store', 'buyer', 'cashier', 'e-commerce'].some(term => lowerJob.includes(term))) return { category: 'Retail', subcategory: 'Sales' };
  if (['chef', 'agent', 'guide', 'manager'].some(term => lowerJob.includes(term)) && ['hotel', 'event', 'restaurant', 'travel', 'cruise', 'tour'].some(term => lowerJob.includes(term))) return { category: 'Hospitality', subcategory: 'Management' };
  if (['scientist', 'technician', 'biologist', 'chemist', 'geologist', 'meteorologist', 'physicist', 'statistician'].some(term => lowerJob.includes(term))) return { category: 'Science', subcategory: 'Research' };
  if (['journalist', 'anchor', 'producer', 'writer', 'blogger'].some(term => lowerJob.includes(term))) return { category: 'Media', subcategory: 'Journalism' };
  if (['environmental', 'park ranger', 'conservation', 'sustainability'].some(term => lowerJob.includes(term))) return { category: 'Environmental', subcategory: 'Conservation' };
  if (['police', 'fire', 'emt', 'security', 'correctional'].some(term => lowerJob.includes(term))) return { category: 'Government', subcategory: 'Law Enforcement' };

  if (lowerJob.includes('tech')) return { category: 'Technology', subcategory: 'IT Support' };
  if (lowerJob.includes('health')) return { category: 'Healthcare', subcategory: 'Allied Health' };
  if (lowerJob.includes('business')) return { category: 'Business', subcategory: 'General Business' };
  if (lowerJob.includes('art')) return { category: 'Arts', subcategory: 'Visual Arts' };
  if (lowerJob.includes('legal')) return { category: 'Legal', subcategory: 'Legal Support' };

  return { category: 'Business', subcategory: 'General' };
}

function getGrowthForStress(stressLevel: 'Low' | 'Medium' | 'High'): string {
    switch (stressLevel) {
        case 'Low': return '+3%';
        case 'Medium': return '+5%';
        case 'High': return '+8%';
        default: return '+4%';
    }
}

function getEducationForCareer(category: string, subcategory: string, careerName?: string): string {
  const educationMap: { [key: string]: string } = {
    "Technology": "Bachelor's",
    "Healthcare": Math.random() > 0.5 ? "Bachelor's" : "Master's",
    "Engineering": "Bachelor's",
    "Business": Math.random() > 0.3 ? "Bachelor's" : "Master's",
    "Education": Math.random() > 0.4 ? "Bachelor's" : "Master's",
    "Arts": Math.random() > 0.6 ? "Bachelor's" : "High School",
    "Legal": "Doctoral",
    "Manufacturing": Math.random() > 0.5 ? "High School" : "Associate",
    "Transportation": Math.random() > 0.4 ? "High School" : "Certificate",
    "Construction": Math.random() > 0.6 ? "High School" : "Certificate",
    "Government": "Bachelor's",
    "Agriculture": Math.random() > 0.5 ? "High School" : "Bachelor's",
    "Energy": Math.random() > 0.4 ? "Associate" : "Bachelor's",
    "Retail": Math.random() > 0.7 ? "High School" : "Bachelor's",
    "Hospitality": Math.random() > 0.6 ? "High School" : "Bachelor's",
    "Science": Math.random() > 0.3 ? "Bachelor's" : "Master's",
    "Media": "Bachelor's",
    "Nonprofit": "Bachelor's",
    "Sports": Math.random() > 0.5 ? "Bachelor's" : "High School",
    "Environmental": "Bachelor's"
  };

  return educationMap[category] || "Bachelor's";
}

function generateSalaryRange(min: number, max: number): string {
  const adjustedMin = min + Math.floor(Math.random() * 10000);
  const adjustedMax = max + Math.floor(Math.random() * 20000);
  return `$${adjustedMin.toLocaleString()} - $${adjustedMax.toLocaleString()}`;
}

function getWorkEnvironment(category: string, subcategory: string): string[] {
  const environments: { [key: string]: string[] } = {
    "Technology": ["Office", "Remote", "Collaborative", "Fast-paced"],
    "Healthcare": ["Hospital", "Clinic", "Healthcare", "Patient-focused"],
    "Engineering": ["Office", "Laboratory", "Field", "Technical"],
    "Business": ["Office", "Corporate", "Client-facing", "Professional"],
    "Education": ["Classroom", "School", "Educational", "Structured"],
    "Arts": ["Studio", "Creative", "Flexible", "Artistic"],
    "Legal": ["Office", "Courthouse", "Professional", "Formal"],
    "Manufacturing": ["Factory", "Industrial", "Team-based", "Structured"],
    "Transportation": ["Vehicle", "Outdoor", "Mobile", "Service-oriented"],
    "Construction": ["Construction Site", "Outdoor", "Physical", "Project-based"],
    "Government": ["Office", "Government", "Structured", "Service-oriented"],
    "Agriculture": ["Farm", "Outdoor", "Rural", "Seasonal"],
    "Energy": ["Plant", "Industrial", "Technical", "Safety-focused"],
    "Retail": ["Store", "Customer-facing", "Fast-paced", "Service-oriented"],
    "Hospitality": ["Hotel", "Restaurant", "Customer-facing", "Service-oriented"],
    "Science": ["Laboratory", "Research", "Academic", "Analytical"],
    "Media": ["Studio", "Office", "Creative", "Deadline-driven"],
    "Nonprofit": ["Office", "Community", "Mission-driven", "Collaborative"],
    "Sports": ["Gym", "Stadium", "Outdoor", "Active"],
    "Environmental": ["Field", "Office", "Outdoor", "Research-focused"]
  };

  return environments[category] || ["Office", "Professional", "Collaborative", "Structured"];
}

function getPersonalityTraits(category: string, subcategory: string): string[] {
  const traits: { [key: string]: string[] } = {
    "Technology": ["Analytical", "Logical", "Innovative", "Detail-oriented"],
    "Healthcare": ["Caring", "Empathetic", "Resilient", "Detail-oriented"],
    "Engineering": ["Analytical", "Precise", "Problem-solver", "Methodical"],
    "Business": ["Strategic", "Communicative", "Leadership", "Results-oriented"],
    "Education": ["Patient", "Nurturing", "Communicative", "Organized"],
    "Arts": ["Creative", "Expressive", "Imaginative", "Passionate"],
    "Legal": ["Analytical", "Ethical", "Persuasive", "Detail-oriented"],
    "Manufacturing": ["Practical", "Reliable", "Safety-conscious", "Team-oriented"],
    "Transportation": ["Reliable", "Safety-conscious", "Service-oriented", "Adaptable"],
    "Construction": ["Physical", "Practical", "Safety-conscious", "Team-oriented"],
    "Government": ["Service-oriented", "Ethical", "Organized", "Diplomatic"],
    "Agriculture": ["Hardworking", "Practical", "Nature-loving", "Independent"],
    "Energy": ["Technical", "Safety-conscious", "Reliable", "Analytical"],
    "Retail": ["People-oriented", "Energetic", "Persuasive", "Customer-focused"],
    "Hospitality": ["Service-oriented", "Friendly", "Cultural", "Adaptable"],
    "Science": ["Curious", "Analytical", "Methodical", "Detail-oriented"],
    "Media": ["Creative", "Communicative", "Adaptable", "Storyteller"],
    "Nonprofit": ["Compassionate", "Mission-driven", "Collaborative", "Advocacy"],
    "Sports": ["Competitive", "Motivational", "Physical", "Team-oriented"],
    "Environmental": ["Conservation-minded", "Analytical", "Passionate", "Research-oriented"]
  };

  return traits[category] || ["Professional", "Reliable", "Communicative", "Team-oriented"];
}

function getStressLevel(category: string, subcategory: string): 'Low' | 'Medium' | 'High' {
  const stressLevels: { [key: string]: 'Low' | 'Medium' | 'High' } = {
    "Technology": "Medium",
    "Healthcare": "High",
    "Engineering": "Medium",
    "Business": "Medium",
    "Education": "Medium",
    "Arts": "Medium",
    "Legal": "High",
    "Manufacturing": "Medium",
    "Transportation": "Medium",
    "Construction": "Medium",
    "Government": "Low",
    "Agriculture": "Medium",
    "Energy": "Medium",
    "Retail": "Medium",
    "Hospitality": "Medium",
    "Science": "Low",
    "Media": "High",
    "Nonprofit": "Medium",
    "Sports": "Medium",
    "Environmental": "Low"
  };

  return stressLevels[category] || "Medium";
}

// Generate the comprehensive careers database
let generatedCareers = generateComprehensiveCareers();

// Merge new careers into the generated list
const existingNames = new Set(generatedCareers.map(c => c.name.toLowerCase()));
let maxId = Math.max(...generatedCareers.map(c => c.id), 0);

newCareersData.push(...newCareersToAdd);
newCareersData.forEach(newCareer => {
    if (newCareer.name && !existingNames.has(newCareer.name.toLowerCase())) {
        maxId++;
        const { category, subcategory } = getCategoryForJob(newCareer.name);
        const fullCareer: Career = {
            id: maxId,
            name: newCareer.name,
            category,
            subcategory,
            description: `A professional in the ${category} field, specializing as a ${newCareer.name}.`,
            skills: newCareer.skills || getSkillsForCareer(category, subcategory, newCareer.name),
            education: newCareer.education || getEducationForCareer(category, subcategory, newCareer.name),
            salary: newCareer.salary || '$50,000 - $90,000',
            growth: getGrowthForStress(newCareer.stressLevel || 'Medium'),
            workEnvironment: getWorkEnvironment(category, subcategory),
            personality: getPersonalityTraits(category, subcategory),
            remote: newCareer.remote !== undefined ? newCareer.remote : Math.random() > 0.5,
            stressLevel: newCareer.stressLevel || 'Medium',
            travelRequired: newCareer.remote === false,
            technical: Math.floor(Math.random() * 5) + 3, creative: Math.floor(Math.random() * 5) + 3, analytical: Math.floor(Math.random() * 5) + 3, social: Math.floor(Math.random() * 5) + 3, leadership: Math.floor(Math.random() * 5) + 3, physical: Math.floor(Math.random() * 5) + 3,
        };
        generatedCareers.push(fullCareer);
        existingNames.add(fullCareer.name.toLowerCase());
    }
});

export const allCareers = generatedCareers;
export const careerCategories = Array.from(new Set(allCareers.map(c => c.category)));

// Enhanced career matching weights for better algorithm performance
export const careerMatchingWeights = {
  personality: 0.25,
  skills: 0.30,
  values: 0.20,
  workEnvironment: 0.15,
  education: 0.05,
  salary: 0.05
};



console.log(`Generated ${allCareers.length} careers across ${careerCategories.length} categories`);
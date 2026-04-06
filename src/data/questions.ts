// Enhanced question system with comprehensive career matching for 1,388+ careers
export interface Question {
  id: number;
  text: string;
  type: 'multiple' | 'scale' | 'ranking' | 'branching' | 'multiselect';
  options?: string[];
  followUp?: { [key: string]: Question };
  category: 'personality' | 'skills' | 'values' | 'environment' | 'preferences';
  weight: number;
  scoringMap?: { [key: string]: { [key: string]: number } };
  scaleLabels?: { min: string; max: string };
  maxSelections?: number;
}

export const assessmentQuestions: Question[] = [
  // Core Personality & Work Style Questions
  {
    id: 1,
    text: "What energizes you most in a work environment? (Select up to 4 options)",
    type: 'multiselect',
    maxSelections: 4,
    options: [
      "Solving complex technical problems and debugging challenging issues",
      "Working directly with people and helping them achieve their goals",
      "Creating something new, innovative, and original from scratch", 
      "Organizing systems, processes, and managing efficient operations",
      "Analyzing data patterns and finding meaningful insights",
      "Leading teams and inspiring others to achieve ambitious goals",
      "Working independently with minimal supervision and autonomy",
      "Collaborating in dynamic, fast-paced team environments",
      "Teaching, mentoring, and developing others' skills and knowledge",
      "Building and maintaining strong relationships with clients and customers",
      "Hands-on work with tools, equipment, and physical materials",
      "Research and investigation to discover new knowledge",
      "Performing, entertaining, and expressing creativity publicly",
      "Protecting and serving the community and public safety",
      "Working with nature, animals, and outdoor environments",
      "Managing finances, investments, and economic resources",
      "Designing and building structures, systems, and infrastructure",
      "Providing healthcare and medical services to improve lives",
      "Creating art, media content, and cultural experiences",
      "Operating machinery, vehicles, and transportation systems"
    ],
    category: 'personality',
    weight: 5,
    followUp: {
      "Solving complex technical problems and debugging challenging issues": {
        id: 101,
        text: "What type of technical challenges excite you most? (Select up to 3)",
        type: 'multiselect',
        maxSelections: 3,
        options: [
          "Software development, coding, and programming challenges",
          "System architecture, scalability, and infrastructure design",
          "Data science, machine learning, and artificial intelligence",
          "Cybersecurity, network security, and information protection",
          "Hardware engineering, electronics, and embedded systems",
          "Database optimization, data management, and performance tuning",
          "Cloud computing, DevOps, and automation technologies",
          "Mobile app development and user interface design",
          "Web development, frontend and backend technologies",
          "Robotics, automation, and mechatronics engineering",
          "Biomedical engineering and healthcare technology",
          "Aerospace and aviation technology systems",
          "Automotive engineering and vehicle systems",
          "Energy systems and renewable technology",
          "Telecommunications and network infrastructure"
        ],
        category: 'skills',
        weight: 4
      },
      "Working directly with people and helping them achieve their goals": {
        id: 102,
        text: "How do you prefer to help and work with others? (Select up to 4)",
        type: 'multiselect',
        maxSelections: 4,
        options: [
          "One-on-one counseling, coaching, and individual mentoring",
          "Providing healthcare, medical care, and healing services",
          "Teaching in classrooms and educational environments",
          "Leading and managing teams toward common objectives",
          "Customer service and client relationship management",
          "Training groups, conducting workshops, and facilitating learning",
          "Social work, community outreach, and public service",
          "Therapy, rehabilitation, and mental health support",
          "Consulting and providing professional advisory services",
          "Sales and helping customers find solutions to their needs",
          "Legal advocacy and representing clients' interests",
          "Emergency response and crisis intervention services",
          "Childcare and youth development programs",
          "Elder care and senior services",
          "Religious and spiritual guidance",
          "Career counseling and job placement services"
        ],
        category: 'values',
        weight: 4
      },
      "Creating something new, innovative, and original from scratch": {
        id: 103,
        text: "What type of creative work appeals to you most? (Select up to 4)",
        type: 'multiselect',
        maxSelections: 4,
        options: [
          "Visual design, graphics, and artistic expression",
          "Writing, content creation, journalism, and storytelling",
          "Product development and invention of new solutions",
          "Marketing campaigns, advertising, and brand strategy",
          "Music composition, performance, and audio production",
          "Film, video production, and multimedia content creation",
          "Architecture, interior design, and spatial planning",
          "Fashion design, textile creation, and style innovation",
          "Game design, interactive media, and entertainment",
          "Photography, visual documentation, and image creation",
          "Industrial design and user experience innovation",
          "Culinary arts, food creation, and recipe development",
          "Landscape design and environmental planning",
          "Theater, dance, and performing arts",
          "Crafts, pottery, and handmade artisan work"
        ],
        category: 'skills',
        weight: 4
      }
    }
  },

  {
    id: 2,
    text: "Rate the importance of work-life balance in your ideal career (1-10)",
    type: 'scale',
    category: 'values',
    weight: 4,
    scaleLabels: { 
      min: "Not Important - I prefer work-focused lifestyle with long hours", 
      max: "Extremely Important - Must have flexible schedule and personal time" 
    }
  },

  {
    id: 3,
    text: "Which work environments appeal to you? (Select up to 5 options)",
    type: 'multiselect',
    maxSelections: 5,
    options: [
      "Fast-paced startup with lots of variety and innovation",
      "Structured corporate environment with clear hierarchies and processes",
      "Remote/flexible work arrangement from anywhere in the world",
      "Collaborative team-based setting with constant interaction",
      "Independent work with minimal supervision and high autonomy",
      "Outdoor or field-based work in natural settings",
      "Laboratory or research facility with controlled conditions",
      "Creative studio or artistic workspace with inspiring atmosphere",
      "Healthcare facility helping patients directly",
      "Educational institution focused on teaching and learning",
      "Government office serving the public interest",
      "Non-profit organization making positive social impact",
      "Manufacturing or industrial facility with hands-on production",
      "Retail or customer-facing environment with public interaction",
      "Construction sites and building projects",
      "Transportation and logistics operations",
      "Financial institutions and banking environments",
      "Legal offices and courtroom settings",
      "Entertainment and media production facilities",
      "Agricultural farms and rural environments",
      "Military or defense installations",
      "Hospitality venues like hotels and restaurants",
      "Sports facilities and recreational centers",
      "Emergency services and first responder environments"
    ],
    category: 'environment',
    weight: 4
  },

  {
    id: 4,
    text: "How comfortable are you with technology and digital tools? (1-10)",
    type: 'scale',
    category: 'skills',
    weight: 4,
    scaleLabels: { 
      min: "Not Comfortable - Prefer minimal technology use", 
      max: "Very Comfortable - Love learning and using new technology" 
    }
  },

  {
    id: 5,
    text: "What motivates you most in your career? (Select up to 5 options)",
    type: 'multiselect',
    maxSelections: 5,
    options: [
      "High salary and financial security for long-term stability",
      "Making a positive impact on society and communities",
      "Personal growth and continuous learning opportunities",
      "Recognition, achievement, and professional status in my field",
      "Creative expression and innovative problem-solving",
      "Helping individuals directly with their personal problems",
      "Building and leading successful teams and organizations",
      "Work-life balance and flexible schedule arrangements",
      "Job security and stable, predictable employment",
      "Independence and entrepreneurial opportunities",
      "Intellectual challenges and complex problem-solving",
      "Travel opportunities and experiencing different cultures",
      "Environmental sustainability and green initiatives",
      "Social justice, equality, and advocacy work",
      "Competition and achieving measurable results",
      "Variety and change in daily tasks and responsibilities",
      "Prestige and working for respected organizations",
      "Serving others and contributing to the greater good",
      "Physical activity and staying active during work",
      "Working with cutting-edge technology and innovation",
      "Preserving traditions and cultural heritage",
      "Scientific discovery and advancing human knowledge"
    ],
    category: 'values',
    weight: 5
  },

  {
    id: 6,
    text: "Which industries or sectors interest you most? (Select up to 6 options)",
    type: 'multiselect',
    maxSelections: 6,
    options: [
      "Technology and software development",
      "Healthcare and medical services",
      "Education and training",
      "Finance and banking",
      "Manufacturing and production",
      "Retail and consumer goods",
      "Entertainment and media",
      "Government and public service",
      "Non-profit and social services",
      "Construction and real estate",
      "Transportation and logistics",
      "Energy and utilities",
      "Agriculture and food production",
      "Legal and professional services",
      "Hospitality and tourism",
      "Arts and creative industries",
      "Environmental and sustainability",
      "Military and defense",
      "Research and development",
      "Sports and recreation",
      "Telecommunications",
      "Insurance and risk management",
      "Mining and natural resources",
      "Aerospace and aviation",
      "Automotive industry",
      "Fashion and textiles",
      "Pharmaceutical and biotechnology",
      "Architecture and urban planning"
    ],
    category: 'preferences',
    weight: 4
  },

  {
    id: 7,
    text: "What type of problem-solving appeals to you? (Select up to 4 options)",
    type: 'multiselect',
    maxSelections: 4,
    options: [
      "Logical, step-by-step analytical problems with clear solutions",
      "Creative challenges requiring innovative and original thinking",
      "People-related issues, conflicts, and interpersonal problems",
      "Strategic business and organizational challenges",
      "Technical and engineering problems with systematic approaches",
      "Research and investigative problems requiring deep analysis",
      "Financial and mathematical problems with quantitative solutions",
      "Design and aesthetic problems with visual solutions",
      "Health and medical problems affecting human wellbeing",
      "Environmental and sustainability challenges",
      "Legal and regulatory compliance issues",
      "Educational and learning-related challenges",
      "Emergency and crisis situations requiring quick decisions",
      "Long-term planning and strategic thinking problems",
      "Quality control and process improvement challenges",
      "Safety and security risk assessment problems",
      "Communication and public relations challenges",
      "Resource allocation and optimization problems"
    ],
    category: 'skills',
    weight: 4
  },

  {
    id: 8,
    text: "What level of physical activity do you want in your work?",
    type: 'multiple',
    options: [
      "Mostly sedentary - desk work with minimal physical activity",
      "Light activity - some walking and standing throughout the day",
      "Moderate activity - regular movement and physical tasks",
      "High activity - physically demanding work requiring strength and endurance",
      "Variable activity - sometimes sedentary, sometimes very active",
      "Outdoor activity - working outside in various weather conditions",
      "Athletic activity - sports-related or fitness-focused work",
      "Manual labor - hands-on work with tools and equipment"
    ],
    category: 'preferences',
    weight: 3
  },

  {
    id: 9,
    text: "Which educational commitment are you willing to make? (Select up to 3 options)",
    type: 'multiselect',
    maxSelections: 3,
    options: [
      "High school diploma is sufficient for my career goals",
      "Certificate or trade school program (6 months - 2 years)",
      "Associate degree from community college (2 years)",
      "Bachelor's degree from university (4 years)",
      "Master's degree for advanced specialization (additional 2 years)",
      "Doctoral degree (PhD, MD, JD) for expert-level careers",
      "Continuous professional certifications and ongoing education",
      "Apprenticeship or on-the-job training programs",
      "Online courses and self-directed learning",
      "Military training and specialized service education",
      "Professional licensing and regulatory requirements",
      "International education and study abroad programs",
      "Specialized technical training and bootcamps",
      "Art school or conservatory training"
    ],
    category: 'preferences',
    weight: 3
  },

  {
    id: 10,
    text: "How do you prefer to communicate at work? (Select up to 4 options)",
    type: 'multiselect',
    maxSelections: 4,
    options: [
      "Face-to-face meetings and in-person discussions",
      "Written communication through emails and detailed documentation",
      "Presentations to groups and public speaking engagements",
      "One-on-one conversations and individual mentoring sessions",
      "Digital collaboration through messaging and video calls",
      "Visual communication through design, charts, and multimedia",
      "Phone calls and voice-based communication",
      "Social media and online community engagement",
      "Formal reports and detailed written analysis",
      "Informal conversations and casual workplace interactions",
      "Non-verbal communication and hands-on demonstration",
      "Creative expression through art, music, or performance",
      "Technical documentation and instruction manuals",
      "Multilingual communication and translation services"
    ],
    category: 'personality',
    weight: 3
  },

  {
    id: 11,
    text: "What's your preferred salary range for your ideal career?",
    type: 'multiple',
    options: [
      "$25,000 - $40,000 (Entry level, basic needs covered)",
      "$40,000 - $60,000 (Comfortable lifestyle, some savings)",
      "$60,000 - $80,000 (Good middle class lifestyle)",
      "$80,000 - $120,000 (Upper middle class, good savings potential)",
      "$120,000 - $180,000 (High income, luxury lifestyle options)",
      "$180,000 - $300,000 (Very high income, significant wealth building)",
      "$300,000+ (Top earner, financial independence potential)",
      "Variable income with high potential (entrepreneurship, sales, commission)",
      "Salary is not my primary concern - other factors matter more"
    ],
    category: 'preferences',
    weight: 3
  },

  {
    id: 12,
    text: "How do you handle stress and pressure? (Select up to 3 options)",
    type: 'multiselect',
    maxSelections: 3,
    options: [
      "I thrive under pressure and tight deadlines - it motivates me",
      "I prefer steady, manageable workloads with predictable schedules",
      "I need variety and change to stay engaged and motivated",
      "I work best with clear structure and well-defined expectations",
      "I like challenges but need adequate recovery time between projects",
      "I perform exceptionally well in crisis and emergency situations",
      "I prefer collaborative support when facing difficult challenges",
      "I handle stress better with flexible scheduling and autonomy",
      "I need quiet, low-stress environments to be most productive",
      "I enjoy competitive, high-stakes environments with clear winners",
      "I work well under pressure but prefer advance notice",
      "I need regular breaks and time to recharge between intense periods"
    ],
    category: 'personality',
    weight: 4
  },

  {
    id: 13,
    text: "What type of impact do you want to have through your work? (Select up to 4 options)",
    type: 'multiselect',
    maxSelections: 4,
    options: [
      "Directly helping individuals solve their personal problems",
      "Contributing to scientific knowledge and breakthrough discoveries",
      "Building products that millions of people use daily",
      "Teaching and developing the next generation of leaders",
      "Protecting people's safety, security, and wellbeing",
      "Creating beautiful and inspiring artistic works",
      "Improving business efficiency and profitability",
      "Advancing social justice and equality for all",
      "Protecting the environment and promoting sustainability",
      "Innovating technology that changes how we live and work",
      "Preserving culture, history, and important knowledge",
      "Providing essential services to communities",
      "Healing and improving people's physical health",
      "Supporting mental health and emotional wellbeing",
      "Building infrastructure and physical structures",
      "Managing financial resources and investments",
      "Ensuring legal compliance and justice",
      "Entertaining and bringing joy to others",
      "Feeding people and ensuring food security",
      "Connecting people through transportation and communication"
    ],
    category: 'values',
    weight: 4
  },

  {
    id: 14,
    text: "Rate your interest in leadership and management roles (1-10)",
    type: 'scale',
    category: 'skills',
    weight: 4,
    scaleLabels: { 
      min: "Prefer Individual Contributor - No management responsibilities", 
      max: "Love Leading - Want to manage large teams and organizations" 
    }
  },

  {
    id: 15,
    text: "How do you feel about travel for work? (Select up to 3 options)",
    type: 'multiselect',
    maxSelections: 3,
    options: [
      "Love traveling frequently and seeing new places regularly",
      "Occasional travel (monthly) is perfectly fine and enjoyable",
      "Minimal travel (quarterly) - prefer staying local most of the time",
      "No travel - want to work close to home always",
      "International travel excites me and broadens my perspective",
      "Regional travel within my state/area is acceptable",
      "Business travel for conferences and meetings is valuable",
      "Travel for client visits and relationship building",
      "Field work and on-site project travel appeals to me",
      "Seasonal travel based on project needs works well"
    ],
    category: 'preferences',
    weight: 3
  },

  {
    id: 16,
    text: "What's your ideal work schedule? (Select up to 3 options)",
    type: 'multiselect',
    maxSelections: 3,
    options: [
      "Traditional 9-5 Monday-Friday schedule with weekends off",
      "Flexible hours with core collaboration time requirements",
      "Early morning start with early afternoon finish",
      "Evening/night shift work when others aren't around",
      "Weekend work with weekday breaks and flexibility",
      "Project-based schedule with varying time commitments",
      "Part-time work with excellent work-life balance",
      "Seasonal work with intensive periods and extended breaks",
      "On-call availability for urgent situations and emergencies",
      "Compressed work week (4 days, longer hours)",
      "Split schedule with morning and evening work periods",
      "Completely flexible schedule based on deliverables"
    ],
    category: 'preferences',
    weight: 3
  },

  {
    id: 17,
    text: "Which specific career areas interest you? (Select up to 6 options)",
    type: 'multiselect',
    maxSelections: 6,
    options: [
      // Technology careers
      "Software Engineering and Programming",
      "Data Science and Analytics",
      "Cybersecurity and Information Security",
      "Web and Mobile Development",
      "Artificial Intelligence and Machine Learning",
      "Cloud Computing and DevOps",
      "Database Administration",
      "Network Administration",
      "Computer Hardware Engineering",
      "IT Support and Help Desk",
      
      // Healthcare careers
      "Nursing and Patient Care",
      "Medical Practice (Doctors, Specialists)",
      "Mental Health and Counseling",
      "Physical Therapy and Rehabilitation",
      "Medical Technology and Lab Work",
      "Pharmacy and Pharmaceutical",
      "Dental Care and Oral Health",
      "Veterinary Medicine",
      "Public Health and Epidemiology",
      "Healthcare Administration",
      
      // Engineering careers
      "Civil and Structural Engineering",
      "Mechanical Engineering",
      "Electrical Engineering",
      "Chemical Engineering",
      "Aerospace Engineering",
      "Environmental Engineering",
      "Biomedical Engineering",
      "Industrial Engineering",
      "Materials Engineering",
      "Nuclear Engineering",
      
      // Business and Finance
      "Financial Analysis and Investment",
      "Marketing and Advertising",
      "Sales and Business Development",
      "Human Resources",
      "Management and Leadership",
      "Consulting",
      "Accounting and Auditing",
      "Real Estate",
      "Insurance",
      "Banking",
      
      // Education
      "Elementary and Secondary Teaching",
      "Higher Education and Research",
      "Special Education",
      "Educational Administration",
      "Curriculum Development",
      "Training and Development",
      "Library Science",
      "Educational Technology",
      
      // Arts and Creative
      "Visual Arts and Design",
      "Music and Audio Production",
      "Writing and Journalism",
      "Film and Video Production",
      "Photography",
      "Theater and Performing Arts",
      "Fashion Design",
      "Architecture and Interior Design",
      "Game Design",
      "Graphic Design",
      
      // Trades and Manufacturing
      "Construction and Building Trades",
      "Automotive Repair and Maintenance",
      "Manufacturing and Production",
      "Welding and Metalworking",
      "Electrical Work",
      "Plumbing and HVAC",
      "Carpentry and Woodworking",
      "Heavy Equipment Operation",
      "Quality Control",
      "Machine Operation",
      
      // Public Service
      "Law Enforcement and Security",
      "Fire Fighting and Emergency Services",
      "Military and Defense",
      "Government Administration",
      "Social Work",
      "Legal Services",
      "Corrections and Rehabilitation",
      "Emergency Medical Services",
      
      // Transportation and Logistics
      "Aviation and Aerospace",
      "Maritime and Shipping",
      "Trucking and Delivery",
      "Railroad Operations",
      "Logistics and Supply Chain",
      "Warehouse Operations",
      "Traffic Management",
      "Fleet Management",
      
      // Agriculture and Environment
      "Farming and Agriculture",
      "Forestry and Conservation",
      "Environmental Science",
      "Wildlife Management",
      "Landscaping and Groundskeeping",
      "Food Production and Processing",
      "Renewable Energy",
      "Water Management",
      
      // Hospitality and Service
      "Restaurant and Food Service",
      "Hotel and Lodging",
      "Travel and Tourism",
      "Event Planning",
      "Customer Service",
      "Personal Care Services",
      "Cleaning and Maintenance",
      "Recreation and Entertainment",
      
      // Science and Research
      "Biological Sciences",
      "Chemistry and Chemical Research",
      "Physics and Astronomy",
      "Earth and Environmental Sciences",
      "Mathematics and Statistics",
      "Psychology and Behavioral Sciences",
      "Anthropology and Archaeology",
      "Laboratory Technology"
    ],
    category: 'preferences',
    weight: 5
  },

  {
    id: 18,
    text: "How important is job security versus growth potential? (1-10)",
    type: 'scale',
    category: 'values',
    weight: 4,
    scaleLabels: { 
      min: "Security First - Stable job with benefits and predictability", 
      max: "Growth First - High risk, high reward, rapid advancement" 
    }
  },

  {
    id: 19,
    text: "What's your tolerance for routine versus variety? (1-10)",
    type: 'scale',
    category: 'personality',
    weight: 3,
    scaleLabels: { 
      min: "Love Routine - Predictable daily tasks and consistency", 
      max: "Need Variety - Different challenges and tasks daily" 
    }
  },

  {
    id: 20,
    text: "Rate your interest in continuous learning and skill development (1-10)",
    type: 'scale',
    category: 'values',
    weight: 4,
    scaleLabels: { 
      min: "Prefer Stability - Like mastering current skills deeply", 
      max: "Love Learning - Always want new challenges and growth" 
    }
  }
];

// Enhanced scoring system for comprehensive career matching
export const scoringSystem = {
  personalityScores: {
    analytical: ['Solving complex technical problems', 'Logical, step-by-step analytical problems', 'Research and investigative problems'],
    creative: ['Creating something new and innovative', 'Creative challenges requiring innovation', 'Design and aesthetic problems'],
    social: ['Working with and helping people', 'Constant collaboration and team interaction', 'Client-facing work'],
    leadership: ['Leading large teams and organizations', 'Love Leading', 'Making decisions that affect large groups'],
    independent: ['Independent work with minimal supervision', 'Prefer Individual Work', 'Making independent decisions'],
    physical: ['Hands-on work with tools', 'High activity', 'Outdoor activity'],
    helping: ['Helping individuals directly', 'Teaching and mentoring', 'Healthcare and medical services']
  },
  
  skillScores: {
    technical: ['Software development', 'Very Comfortable', 'Technology and software development'],
    communication: ['Presentations to groups', 'Love It', 'Teaching and training'],
    analytical: ['Data analysis', 'Research and investigative problems', 'Financial and mathematical problems'],
    creative: ['Visual design', 'Creative output', 'Arts and creative industries'],
    leadership: ['Leading teams', 'Management roles', 'Strategic decisions'],
    physical: ['Hands-on practice', 'High activity', 'Manufacturing and production']
  },
  
  valueScores: {
    workLifeBalance: ['Extremely Important', 'Maintaining work-life balance', 'Flexible schedule'],
    highIncome: ['High salary and financial security', '$150,000+', 'Financial incentives'],
    impact: ['Making a positive impact', 'Long-term impact on people\'s lives', 'Social justice'],
    growth: ['Personal growth and continuous learning', 'Love Learning', 'Learning new skills'],
    security: ['Job security', 'Security First', 'Stable job with benefits'],
    recognition: ['Recognition and achievement', 'Recognition and praise', 'Professional status']
  }
};
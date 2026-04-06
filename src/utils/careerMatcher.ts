import { Career, allCareers } from '../data/careers';
import { Question } from '../data/questions';

export interface UserProfile {
  personality: { [key: string]: number };
  skills: { [key: string]: number };
  values: { [key: string]: number };
  environment: { [key: string]: number };
  preferences: { [key: string]: number };
  industries: string[];
  rawAnswers: { [key: number]: any };
}

export interface CareerMatch extends Career {
  matchScore: number;
  matchReasons: string[];
  strengthAreas: string[];
  developmentAreas: string[];
  personalityFit: number;
  skillsFit: number;
  valuesFit: number;
  environmentFit: number;
}

export class CareerMatcher {
  private userProfile: UserProfile;

  constructor() {
    this.userProfile = {
      personality: {},
      skills: {},
      values: {},
      environment: {},
      preferences: {},
      industries: [],
      rawAnswers: {}
    };
  }

  // Enhanced analysis for comprehensive career matching
  analyzeResponses(answers: { [key: number]: any }, questions: Question[]): UserProfile {
    this.userProfile = {
      personality: {},
      skills: {},
      values: {},
      environment: {},
      preferences: {},
      industries: [],
      rawAnswers: answers
    };

    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = questions.find(q => q.id === parseInt(questionId));
      if (!question) return;

      this.processAnswer(question, answer);
    });

    // Normalize scores
    this.normalizeProfile();
    
    return this.userProfile;
  }

  private processAnswer(question: Question, answer: any) {
    const category = question.category;
    const weight = question.weight;

    if (question.type === 'multiple' && typeof answer === 'string') {
      this.processMultipleChoiceAnswer(category, answer, weight, question.id);
    } else if (question.type === 'multiselect' && Array.isArray(answer)) {
      answer.forEach(option => {
        this.processMultipleChoiceAnswer(category, option, weight, question.id);
      });
    } else if (question.type === 'scale' && typeof answer === 'number') {
      this.processScaleAnswer(question, answer, weight);
    }
  }

  private processMultipleChoiceAnswer(category: string, answer: string, weight: number, questionId: number) {
    // Enhanced mapping for comprehensive career matching with more specific keywords
    const mappings: { [key: string]: { [key: string]: { [key: string]: number } } } = {
      personality: {
        'Solving complex technical problems': { analytical: 5, technical: 4, problemSolver: 4, logical: 3 },
        'Working directly with people': { social: 5, empathetic: 4, collaborative: 4, communicative: 3 },
        'Creating something new and innovative': { creative: 5, innovative: 4, artistic: 3, original: 3 },
        'Organizing systems and managing': { organized: 5, systematic: 4, leadership: 3, structured: 3 },
        'Analyzing data patterns': { analytical: 5, research: 4, technical: 3, dataOriented: 4 },
        'Leading teams and inspiring': { leadership: 5, social: 4, motivational: 4, charismatic: 3 },
        'Working independently': { independent: 5, autonomous: 4, selfDirected: 4, focused: 3 },
        'Collaborating in dynamic': { collaborative: 5, adaptable: 4, teamPlayer: 4, flexible: 3 },
        'Teaching, mentoring': { teaching: 5, patient: 4, communicative: 4, nurturing: 3 },
        'Building relationships': { social: 5, networking: 4, customerFocused: 4, interpersonal: 3 },
        'Hands-on work with tools': { physical: 5, practical: 4, mechanical: 4, tactile: 3 },
        'Research and investigation': { research: 5, analytical: 4, curious: 4, methodical: 3 },
        'Performing, entertaining': { creative: 5, expressive: 4, confident: 4, artistic: 3 },
        'Protecting and serving': { service: 5, protective: 4, ethical: 4, responsible: 3 },
        'Working with nature': { outdoor: 5, environmental: 4, physical: 3, naturalistic: 4 }
      },
      skills: {
        'Software Engineering': { technical: 5, programming: 5, analytical: 4, logical: 4 },
        'Data Science': { analytical: 5, technical: 4, research: 4, mathematical: 4 },
        'Cybersecurity': { technical: 5, analytical: 4, protective: 4, systematic: 3 },
        'Web Development': { technical: 5, creative: 3, visual: 3, userFocused: 3 },
        'AI/Machine Learning': { technical: 5, analytical: 5, research: 4, innovative: 4 },
        'Healthcare': { caring: 5, technical: 3, service: 5, empathetic: 4 },
        'Teaching': { teaching: 5, patient: 4, communicative: 5, nurturing: 4 },
        'Business': { leadership: 4, analytical: 3, strategic: 4, communicative: 4 },
        'Arts': { creative: 5, artistic: 5, expressive: 4, visual: 4 },
        'Engineering': { technical: 5, analytical: 4, systematic: 4, problemSolver: 4 }
      },
      values: {
        'High salary and financial security': { financial: 5, security: 4, ambitious: 3, materialistic: 2 },
        'Making a positive impact': { impact: 5, service: 4, altruistic: 4, meaningful: 4 },
        'Personal growth': { growth: 5, learning: 4, ambitious: 3, selfImprovement: 4 },
        'Recognition and achievement': { achievement: 5, recognition: 4, competitive: 4, status: 3 },
        'Creative expression': { creativity: 5, artistic: 4, expressive: 4, original: 3 },
        'Helping individuals': { service: 5, empathetic: 4, caring: 5, altruistic: 4 },
        'Building and leading teams': { leadership: 5, social: 4, ambitious: 4, influential: 3 },
        'Work-life balance': { workLifeBalance: 5, family: 4, flexible: 4, personal: 3 },
        'Job security': { security: 5, stability: 4, conservative: 3, predictable: 3 },
        'Independence': { independence: 5, autonomous: 4, entrepreneurial: 4, freedom: 4 },
        'Intellectual challenges': { intellectual: 5, analytical: 4, curious: 4, complex: 4 },
        'Travel opportunities': { travel: 5, adventurous: 4, cultural: 3, exploration: 3 },
        'Environmental sustainability': { environmental: 5, ethical: 4, future: 3, responsible: 4 },
        'Social justice': { justice: 5, ethical: 4, advocacy: 4, equality: 4 }
      },
      environment: {
        'Fast-paced startup': { dynamic: 5, innovative: 4, risk: 3, energetic: 4 },
        'Structured corporate': { structured: 5, stable: 4, formal: 3, hierarchical: 3 },
        'Remote/flexible': { flexible: 5, independent: 4, technology: 3, autonomous: 4 },
        'Collaborative team': { collaborative: 5, social: 4, teamwork: 5, interactive: 4 },
        'Independent work': { independent: 5, autonomous: 4, focused: 4, solitary: 3 },
        'Outdoor or field': { outdoor: 5, physical: 4, adventurous: 3, natural: 4 },
        'Laboratory': { research: 5, technical: 4, precise: 4, controlled: 3 },
        'Creative studio': { creative: 5, artistic: 4, inspiring: 4, expressive: 3 },
        'Healthcare facility': { caring: 5, service: 4, technical: 3, helping: 4 },
        'Educational institution': { teaching: 5, learning: 4, stable: 3, nurturing: 4 },
        'Government office': { service: 4, structured: 4, stable: 4, bureaucratic: 2 },
        'Non-profit organization': { impact: 5, service: 5, mission: 4, altruistic: 4 }
      }
    };

    // Special handling for industry preferences (Question 6)
    if (questionId === 6) {
      this.userProfile.industries.push(answer);
    }

    // Special handling for specific career areas (Question 17)
    if (questionId === 17) {
      this.processCareerAreaAnswer(answer, weight);
    }

    const categoryMappings = mappings[category as keyof typeof mappings];
    if (categoryMappings) {
      Object.keys(categoryMappings).forEach(key => {
        if (this.isAnswerMatch(answer, key)) {
          const attributes = categoryMappings[key as keyof typeof categoryMappings];
          Object.entries(attributes).forEach(([attr, score]) => {
            const profileCategory = this.userProfile[category as keyof UserProfile] as { [key: string]: number };
            profileCategory[attr] = (profileCategory[attr] || 0) + (score * weight);
          });
        }
      });
    }
  }

  private processCareerAreaAnswer(answer: string, weight: number) {
    // Map specific career areas to detailed attributes
    const careerAreaMappings: { [key: string]: { [key: string]: number } } = {
      'Software Engineering': { technical: 5, programming: 5, analytical: 4, logical: 4 },
      'Data Science': { analytical: 5, technical: 4, research: 4, mathematical: 5 },
      'Cybersecurity': { technical: 5, analytical: 4, protective: 4, systematic: 4 },
      'Nursing': { caring: 5, service: 5, empathetic: 4, helping: 5 },
      'Teaching': { teaching: 5, patient: 4, communicative: 5, nurturing: 4 },
      'Engineering': { technical: 5, analytical: 4, systematic: 4, problemSolver: 5 },
      'Business': { leadership: 4, strategic: 4, communicative: 4, ambitious: 3 },
      'Arts': { creative: 5, artistic: 5, expressive: 4, original: 4 },
      'Healthcare': { caring: 5, service: 5, technical: 3, helping: 5 },
      'Finance': { analytical: 4, mathematical: 4, strategic: 4, financial: 5 }
    };

    Object.entries(careerAreaMappings).forEach(([area, attributes]) => {
      if (this.isAnswerMatch(answer, area)) {
        Object.entries(attributes).forEach(([attr, score]) => {
          this.userProfile.skills[attr] = 
            (this.userProfile.skills[attr] || 0) + (score * weight);
        });
      }
    });
  }

  private isAnswerMatch(answer: string, keyword: string): boolean {
    const answerLower = answer.toLowerCase();
    const keywordLower = keyword.toLowerCase();

    return answerLower.includes(keywordLower) || keywordLower.includes(answerLower);
  }

  private processScaleAnswer(question: Question, answer: number, weight: number) {
    const category = question.category;
    
    // Enhanced scale mapping with more nuanced scoring
    const scaleMapping: { [key: number]: { [key: string]: number } } = {
      2: { // Work-life balance importance
        workLifeBalance: answer * weight,
        flexible: answer > 7 ? answer * weight * 0.8 : 0,
        family: answer > 6 ? answer * weight * 0.6 : 0
      },
      4: { // Technology comfort
        technical: answer * weight,
        programming: answer > 8 ? answer * weight * 0.7 : 0,
        digital: answer * weight * 0.8
      },
      14: { // Leadership interest
        leadership: answer * weight,
        management: answer > 7 ? answer * weight * 0.9 : 0,
        influential: answer > 6 ? answer * weight * 0.6 : 0
      },
      18: { // Security vs Growth
        security: (11 - answer) * weight,
        growth: answer * weight,
        risk: answer > 7 ? answer * weight * 0.7 : 0,
        stability: (11 - answer) * weight * 0.8
      },
      19: { // Routine vs Variety
        routine: (11 - answer) * weight,
        variety: answer * weight,
        adaptable: answer > 6 ? answer * weight * 0.7 : 0,
        structured: (11 - answer) * weight * 0.6
      },
      20: { // Continuous learning
        learning: answer * weight,
        growth: answer * weight * 0.8,
        curious: answer > 7 ? answer * weight * 0.7 : 0,
        intellectual: answer > 8 ? answer * weight * 0.6 : 0
      }
    };

    const mapping = scaleMapping[question.id as keyof typeof scaleMapping];
    if (mapping) {
      Object.entries(mapping).forEach(([attr, score]) => {
        const profileCategory = this.userProfile[category as keyof UserProfile] as { [key: string]: number };
        profileCategory[attr] = (profileCategory[attr] || 0) + score;
      });
    }
  }

  private normalizeProfile() {
    // Normalize scores to 0-10 scale for consistent matching
    Object.keys(this.userProfile).forEach(category => {
      if (category !== 'industries' && category !== 'rawAnswers') {
        const categoryData = this.userProfile[category as keyof UserProfile] as { [key: string]: number };
        const values = Object.values(categoryData);
        const maxScore = Math.max(...values, 1); // Prevent division by zero
        
        if (maxScore > 0) {
          Object.keys(categoryData).forEach(attr => {
            categoryData[attr] = Math.min((categoryData[attr] / maxScore) * 10, 10);
          });
        }
      }
    });
  }

  // Optimized career matching with fast scoring
  matchCareers(topN: number = 12): CareerMatch[] {
    // Quick score calculation for all careers
    const scoredCareers = allCareers.map(career => ({
      career,
      score: this.quickScore(career)
    }));

    // Sort and get top candidates
    scoredCareers.sort((a, b) => b.score - a.score);
    const topCandidates = scoredCareers.slice(0, Math.min(topN * 3, 50));

    // Full analysis only for top candidates
    const matches: CareerMatch[] = topCandidates.map(({ career }) => {
      const personalityFit = this.calculatePersonalityFit(career);
      const skillsFit = this.calculateSkillsFit(career);
      const valuesFit = this.calculateValuesFit(career);
      const environmentFit = this.calculateEnvironmentFit(career);

      const matchScore = this.calculateDynamicMatchScore(
        personalityFit, skillsFit, valuesFit, environmentFit, career
      );

      const matchReasons = this.generateMatchReasons(career, matchScore);
      const strengthAreas = this.identifyStrengthAreas(career);
      const developmentAreas = this.identifyDevelopmentAreas(career);

      return {
        ...career,
        matchScore,
        matchReasons,
        strengthAreas,
        developmentAreas,
        personalityFit,
        skillsFit,
        valuesFit,
        environmentFit
      };
    });

    // Sort by final match score
    const sortedMatches = matches.sort((a, b) => b.matchScore - a.matchScore);

    // Ensure realistic score distribution with meaningful differences
    this.adjustScoreDistribution(sortedMatches);

    return sortedMatches.slice(0, topN);
  }

  // Fast preliminary scoring
  private quickScore(career: Career): number {
    let score = 0;

    // Quick personality check (30%)
    const personalityMatch = (
      Math.abs((this.userProfile.personality.analytical || 0) - career.analytical) +
      Math.abs((this.userProfile.personality.creative || 0) - career.creative) +
      Math.abs((this.userProfile.personality.social || 0) - career.social) +
      Math.abs((this.userProfile.personality.leadership || 0) - career.leadership)
    );
    score += (40 - personalityMatch) * 0.3;

    // Quick technical match (30%)
    const techMatch = Math.abs((this.userProfile.skills.technical || 0) - career.technical);
    score += (10 - techMatch) * 0.3;

    // Quick industry match (20%)
    if (this.userProfile.industries.length > 0) {
      const industryMatch = this.userProfile.industries.some(industry =>
        career.category.toLowerCase().includes(industry.toLowerCase())
      );
      if (industryMatch) score += 20;
    }

    // Quick values match (20%)
    const userFinancial = this.userProfile.values.financial || 0;
    const salaryMatch = career.salary.includes('$100,000') || career.salary.includes('$150,000');
    if (userFinancial > 7 && salaryMatch) score += 15;
    if (userFinancial < 4 && !salaryMatch) score += 10;

    return score;
  }

  private adjustScoreDistribution(matches: CareerMatch[]) {
    // Ensure the top matches have meaningfully different scores
    if (matches.length > 0) {
      let currentScore = Math.min(matches[0].matchScore, 96);
      matches[0].matchScore = currentScore;
      
      for (let i = 1; i < matches.length; i++) {
        const scoreDrop = Math.random() * 4 + 1; // 1-5 point drops
        currentScore = Math.max(currentScore - scoreDrop, 45);
        matches[i].matchScore = Math.round(currentScore);
      }
    }
  }

  private calculatePersonalityFit(career: Career): number {
    let totalScore = 0;
    let totalWeight = 0;

    // Enhanced personality matching with career-specific weights
    const personalityFactors = [
      { user: 'analytical', career: career.analytical, weight: 3 },
      { user: 'creative', career: career.creative, weight: 3 },
      { user: 'social', career: career.social, weight: 3 },
      { user: 'leadership', career: career.leadership, weight: 2.5 },
      { user: 'technical', career: career.technical, weight: 2.5 },
      { user: 'physical', career: career.physical, weight: 2 }
    ];

    personalityFactors.forEach(factor => {
      const userScore = this.userProfile.personality[factor.user] || 0;
      const careerRequirement = factor.career;
      
      // Calculate alignment score with penalty for mismatches
      let alignmentScore;
      if (userScore >= careerRequirement) {
        // User exceeds or meets requirement - good match
        alignmentScore = Math.min(userScore, 10) * factor.weight;
      } else {
        // User below requirement - calculate penalty
        const gap = careerRequirement - userScore;
        alignmentScore = Math.max(0, (userScore - gap * 0.5)) * factor.weight;
      }
      
      totalScore += alignmentScore;
      totalWeight += factor.weight * 10; // Max possible score per factor
    });

    return totalWeight > 0 ? Math.min((totalScore / totalWeight) * 100, 100) : 50;
  }

  private calculateSkillsFit(career: Career): number {
    let skillMatchScore = 0;
    let skillMatches = 0;
    const userSkillEntries = Object.entries(this.userProfile.skills);

    // Optimized skill matching
    for (const skill of career.skills.slice(0, 4)) {
      const skillLower = skill.toLowerCase();
      let bestMatch = 0;

      for (const [userSkill, userLevel] of userSkillEntries) {
        if (skillLower.includes(userSkill.toLowerCase()) || userSkill.toLowerCase().includes(skillLower)) {
          bestMatch = Math.max(bestMatch, userLevel);
          skillMatches++;
          break;
        }
      }

      skillMatchScore += bestMatch;
    }

    // Technical alignment
    const userTechnical = this.userProfile.skills.technical || 0;
    const technicalGap = Math.abs(userTechnical - career.technical);
    const technicalScore = Math.max(0, 10 - technicalGap) * 2;

    // Calculate final score
    let finalScore = skillMatches > 0 ? (skillMatchScore / skillMatches) * 10 : 30;
    finalScore += technicalScore;

    // Bonus for skill matches
    if (skillMatches >= 2) finalScore *= 1.15;

    return Math.min(finalScore, 100);
  }

  private calculateValuesFit(career: Career): number {
    let totalScore = 0;
    let maxPossibleScore = 0;

    // Financial values alignment
    const userFinancial = this.userProfile.values.financial || 0;
    const salaryRange = this.parseSalaryRange(career.salary);
    let financialScore = 0;
    
    if (userFinancial > 7) {
      if (salaryRange.min > 120000) financialScore = 30;
      else if (salaryRange.min > 80000) financialScore = 20;
      else if (salaryRange.min > 50000) financialScore = 10;
      else financialScore = 5;
    } else if (userFinancial < 4) {
      if (salaryRange.min < 60000) financialScore = 25;
      else financialScore = 15;
    } else {
      financialScore = 18; // Neutral financial interest
    }
    totalScore += financialScore;
    maxPossibleScore += 30;

    // Impact and meaning alignment
    const userImpact = this.userProfile.values.impact || 0;
    let impactScore = 0;
    
    const impactCareers = ['Healthcare', 'Education', 'Nonprofit', 'Government', 'Environmental', 'Science'];
    if (userImpact > 7) {
      if (impactCareers.includes(career.category)) impactScore = 35;
      else impactScore = 15;
    } else if (userImpact < 4) {
      if (['Technology', 'Business', 'Finance', 'Manufacturing'].includes(career.category)) {
        impactScore = 25;
      } else impactScore = 20;
    } else {
      impactScore = 22;
    }
    totalScore += impactScore;
    maxPossibleScore += 35;

    // Work-life balance alignment
    const userBalance = this.userProfile.values.workLifeBalance || 0;
    let balanceScore = 0;
    
    if (userBalance > 7) {
      if (career.remote && career.stressLevel === 'Low') balanceScore = 25;
      else if (career.remote || career.stressLevel === 'Low') balanceScore = 18;
      else if (career.stressLevel === 'Medium') balanceScore = 12;
      else balanceScore = 8;
    } else if (userBalance < 4) {
      if (career.stressLevel === 'High') balanceScore = 20;
      else balanceScore = 15;
    } else {
      balanceScore = 16;
    }
    totalScore += balanceScore;
    maxPossibleScore += 25;

    // Growth and learning alignment
    const userGrowth = this.userProfile.values.growth || 0;
    const growthRate = parseFloat(career.growth.replace(/[%+]/g, ''));
    let growthScore = 0;
    
    if (userGrowth > 7) {
      if (growthRate > 10) growthScore = 20;
      else if (growthRate > 5) growthScore = 15;
      else growthScore = 10;
    } else {
      growthScore = 12;
    }
    totalScore += growthScore;
    maxPossibleScore += 20;

    return maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 50;
  }

  private calculateEnvironmentFit(career: Career): number {
    let environmentScore = 0;
    let environmentMatches = 0;
    const userEnvEntries = Object.entries(this.userProfile.environment);

    // Optimized environment matching
    for (const env of career.workEnvironment.slice(0, 3)) {
      const envLower = env.toLowerCase();
      let bestEnvMatch = 0;

      for (const [userEnv, userScore] of userEnvEntries) {
        if (envLower.includes(userEnv.toLowerCase()) || userEnv.toLowerCase().includes(envLower)) {
          bestEnvMatch = Math.max(bestEnvMatch, userScore);
          environmentMatches++;
          break;
        }
      }

      environmentScore += bestEnvMatch;
    }

    if (environmentMatches === 0) return 65;

    const avgScore = environmentScore / environmentMatches;
    return Math.min(avgScore * 10, 100);
  }

  private calculateDynamicMatchScore(
    personalityFit: number, 
    skillsFit: number, 
    valuesFit: number, 
    environmentFit: number,
    career: Career
  ): number {
    // Dynamic weights based on user profile strength
    const personalityStrength = Object.values(this.userProfile.personality).reduce((a, b) => a + b, 0);
    const skillsStrength = Object.values(this.userProfile.skills).reduce((a, b) => a + b, 0);
    const valuesStrength = Object.values(this.userProfile.values).reduce((a, b) => a + b, 0);
    
    // Base weights
    let weights = {
      personality: 0.25,
      skills: 0.35,
      values: 0.30,
      environment: 0.10
    };

    // Adjust weights based on user response patterns
    if (skillsStrength > personalityStrength && skillsStrength > valuesStrength) {
      weights.skills = 0.45;
      weights.personality = 0.20;
      weights.values = 0.25;
      weights.environment = 0.10;
    } else if (valuesStrength > skillsStrength && valuesStrength > personalityStrength) {
      weights.values = 0.40;
      weights.skills = 0.30;
      weights.personality = 0.20;
      weights.environment = 0.10;
    } else if (personalityStrength > skillsStrength && personalityStrength > valuesStrength) {
      weights.personality = 0.35;
      weights.skills = 0.30;
      weights.values = 0.25;
      weights.environment = 0.10;
    }

    // Calculate weighted score
    const weightedScore = 
      (personalityFit * weights.personality) +
      (skillsFit * weights.skills) +
      (valuesFit * weights.values) +
      (environmentFit * weights.environment);

    // Apply contextual bonuses and penalties
    let finalScore = weightedScore;
    
    // Industry alignment bonus
    if (this.userProfile.industries.length > 0) {
      const industryMatch = this.userProfile.industries.some(industry => 
        career.category.toLowerCase().includes(industry.toLowerCase()) ||
        career.subcategory.toLowerCase().includes(industry.toLowerCase())
      );
      if (industryMatch) finalScore += 5;
    }

    // High-growth career bonus for growth-oriented users
    const growthRate = parseFloat(career.growth.replace(/[%+]/g, ''));
    if (this.userProfile.values.growth > 7 && growthRate > 10) {
      finalScore += 3;
    }

    // Remote work bonus for flexibility-oriented users
    if (this.userProfile.values.workLifeBalance > 7 && career.remote) {
      finalScore += 2;
    }

    // Ensure realistic score range with meaningful variation
    return Math.max(Math.min(Math.round(finalScore), 96), 45);
  }

  private parseSalaryRange(salary: string): { min: number; max: number } {
    const matches = salary.match(/\$(\d+,?\d*)\s*-\s*\$(\d+,?\d*)/);
    if (matches) {
      return {
        min: parseInt(matches[1].replace(',', '')),
        max: parseInt(matches[2].replace(',', ''))
      };
    }
    return { min: 0, max: 0 };
  }

  private generateMatchReasons(career: Career, matchScore: number): string[] {
    const reasons: string[] = [];

    // Personality-based reasons
    if (this.userProfile.personality.analytical >= 7 && career.analytical >= 7) {
      reasons.push("Your strong analytical thinking perfectly aligns with this role's complex problem-solving requirements");
    }
    if (this.userProfile.personality.creative >= 7 && career.creative >= 7) {
      reasons.push("Your creative mindset matches excellently with this career's innovative and artistic demands");
    }
    if (this.userProfile.personality.social >= 7 && career.social >= 7) {
      reasons.push("Your people-focused approach fits perfectly with this role's collaborative and interpersonal aspects");
    }
    if (this.userProfile.personality.leadership >= 7 && career.leadership >= 7) {
      reasons.push("Your leadership interests strongly align with this career's management and team coordination opportunities");
    }

    // Skills-based reasons
    if (this.userProfile.skills.technical >= 7 && career.technical >= 7) {
      reasons.push("Your technical aptitude strongly matches this role's technology and systems requirements");
    }

    // Values-based reasons
    if (this.userProfile.values.impact >= 7 && ['Healthcare', 'Education', 'Nonprofit', 'Environmental'].includes(career.category)) {
      reasons.push("Your desire to make a positive impact aligns perfectly with this career's mission-driven nature");
    }
    
    const salaryRange = this.parseSalaryRange(career.salary);
    if (this.userProfile.values.financial >= 7 && salaryRange.min > 80000) {
      reasons.push("The competitive salary range aligns well with your financial goals and expectations");
    }
    
    if (this.userProfile.values.workLifeBalance >= 7 && career.remote) {
      reasons.push("Remote work flexibility matches your preference for work-life balance and location independence");
    }

    // Industry alignment
    if (this.userProfile.industries.length > 0) {
      const industryMatch = this.userProfile.industries.some(industry => 
        career.category.toLowerCase().includes(industry.toLowerCase()) ||
        career.subcategory.toLowerCase().includes(industry.toLowerCase())
      );
      if (industryMatch) {
        reasons.push("This career is in your preferred industry sector with strong alignment to your interests");
      }
    }

    // Ensure minimum reasons based on match score
    if (reasons.length < 3) {
      if (matchScore > 85) {
        reasons.push("Exceptional overall compatibility across multiple assessment dimensions");
      } else if (matchScore > 75) {
        reasons.push("Strong compatibility with your personality and career preferences");
      } else {
        reasons.push("Good foundational match with opportunities for growth and development");
      }
    }

    return reasons.slice(0, 4);
  }

  private identifyStrengthAreas(career: Career): string[] {
    const strengths: string[] = [];

    if (this.userProfile.skills.technical >= 6 && career.technical >= 6) {
      strengths.push("Technical Skills and Problem Solving");
    }
    if (this.userProfile.personality.social >= 6 && career.social >= 6) {
      strengths.push("Interpersonal Communication and Teamwork");
    }
    if (this.userProfile.skills.analytical >= 6 && career.analytical >= 6) {
      strengths.push("Analytical Thinking and Data Analysis");
    }
    if (this.userProfile.personality.creative >= 6 && career.creative >= 6) {
      strengths.push("Creative Problem Solving and Innovation");
    }
    if (this.userProfile.personality.leadership >= 6 && career.leadership >= 6) {
      strengths.push("Leadership and Team Management");
    }

    // Ensure minimum strengths
    if (strengths.length < 2) {
      strengths.push("Strong Foundation in Core Career Requirements");
      if (strengths.length < 2) {
        strengths.push("Adaptability and Learning Potential");
      }
    }

    return strengths.slice(0, 3);
  }

  private identifyDevelopmentAreas(career: Career): string[] {
    const development: string[] = [];

    if ((this.userProfile.skills.leadership || 0) < 5 && career.leadership >= 7) {
      development.push("Leadership and Management Skills");
    }
    if ((this.userProfile.personality.social || 0) < 5 && career.social >= 7) {
      development.push("Public Speaking and Presentation Skills");
    }
    if ((this.userProfile.skills.technical || 0) < 5 && career.technical >= 7) {
      development.push("Technical Proficiency and Digital Skills");
    }
    if ((this.userProfile.personality.creative || 0) < 5 && career.creative >= 7) {
      development.push("Creative Thinking and Innovation");
    }

    // Ensure at least one development area
    if (development.length === 0) {
      development.push("Industry-Specific Knowledge and Expertise");
    }

    return development.slice(0, 2);
  }
}
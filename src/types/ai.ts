// TypeScript type definitions for AI Career Matching System

import { Question } from '../data/questions';

export interface AIAnalysisRequest {
  answers: { [key: number]: any };
  questions: Question[];
  answerHash: string;
}

export interface AIAnalysisResponse {
  cached: boolean;
  assessmentId: string;
  personalityProfile: PersonalityProfile;
  careerMatches: AICareerMatch[];
  alternativeCareers: string[];
  strengthAreas: string[];
  developmentAreas: string[];
  growthPaths: string[];
  processingTime: number;
  algorithmicMatches?: any[]; // For hybrid scoring
}

export interface AICareerMatch {
  careerId: number;
  careerName: string;
  score: number;
  reasoning: string;
  confidence: number;
  aiEnhanced?: boolean;
}

export interface PersonalityProfile {
  traits: string[];
  workStyle: string;
  summary: string;
  strengths: string[];
  values: string[];
}

export interface DeepSeekResponse {
  personalityProfile: PersonalityProfile;
  careerMatches: Array<{
    careerId: number;
    score: number;
    reasoning: string;
    confidence: number;
  }>;
  alternativeCareers: string[];
  strengthAreas: string[];
  developmentAreas: string[];
  growthPaths: string[];
}

export interface CacheEntry {
  id: string;
  answer_hash: string;
  raw_answers: { [key: number]: any };
  ai_analysis: DeepSeekResponse;
  career_matches: AICareerMatch[];
  created_at: string;
  expires_at: string;
}

export interface AnalysisLog {
  id?: string;
  assessment_id: string;
  timestamp: string;
  api_status: 'success' | 'failure' | 'cached' | 'fallback';
  response_time_ms: number;
  tokens_used?: number;
  error_message?: string;
  model_used: string;
}

export interface FeedbackSubmission {
  assessmentId: string;
  userRating: number;
  feedbackType: 'accurate' | 'needs-refinement' | 'poor';
  comments?: string;
}

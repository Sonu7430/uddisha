// Frontend API Service for AI Career Analysis
// Handles communication with Netlify Function backend

import CryptoJS from 'crypto-js';
import { AIAnalysisRequest, AIAnalysisResponse, FeedbackSubmission } from '../types/ai';
import { Question } from '../data/questions';
import { allCareers } from '../data/careers';

const API_ENDPOINT = '/.netlify/functions/career-analysis';
const FEEDBACK_ENDPOINT = '/.netlify/functions/submit-feedback';

export class AICareerAnalysisService {
    /**
     * Analyze career matches using AI backend
     */
    static async analyzeCareer(
        answers: { [key: number]: any },
        questions: Question[],
        onProgress?: (message: string) => void
    ): Promise<AIAnalysisResponse> {
        const answerHash = this.hashAnswers(answers);

        onProgress?.('Preparing analysis...');

        const requestBody: AIAnalysisRequest = {
            answers,
            questions,
            answerHash
        };

        try {
            onProgress?.('Connecting to AI analysis service...');

            const response = await this.fetchWithRetry(API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...requestBody
                    // careers: allCareers // Removed: Backend now imports this directly
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `API error: ${response.status}`);
            }

            onProgress?.('Processing AI insights...');

            const data: AIAnalysisResponse = await response.json();

            if (data.cached) {
                onProgress?.('Retrieved cached analysis');
            } else {
                onProgress?.('AI analysis complete');
            }

            return data;

        } catch (error) {
            console.error('AI Career Analysis error:', error);
            throw new Error(
                error instanceof Error
                    ? error.message
                    : 'Failed to analyze career matches. Please try again.'
            );
        }
    }

    /**
     * Generate SHA-256 hash of answers for cache lookup
     */
    static hashAnswers(answers: { [key: number]: any }): string {
        const sortedAnswers = Object.keys(answers)
            .sort((a, b) => parseInt(a) - parseInt(b))
            .map(key => `${key}:${JSON.stringify(answers[parseInt(key)])}`)
            .join('|');

        return CryptoJS.SHA256(sortedAnswers).toString();
    }

    /**
     * Submit user feedback on AI analysis accuracy
     */
    static async submitFeedback(feedback: FeedbackSubmission): Promise<void> {
        try {
            const response = await fetch(FEEDBACK_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(feedback)
            });

            if (!response.ok) {
                throw new Error('Failed to submit feedback');
            }
        } catch (error) {
            console.error('Feedback submission error:', error);
            // Don't throw - feedback is optional
        }
    }

    /**
     * Fetch with retry logic (exponential backoff)
     */
    private static async fetchWithRetry(
        url: string,
        options: RequestInit,
        maxRetries: number = 3
    ): Promise<Response> {
        let lastError: Error | null = null;

        for (let attempt = 0; attempt < maxRetries; attempt++) {
            try {
                const response = await fetch(url, options);

                // Don't retry on client errors (4xx)
                if (response.status >= 400 && response.status < 500) {
                    return response;
                }

                // Retry on server errors (5xx)
                if (response.status >= 500 && attempt < maxRetries - 1) {
                    await this.sleep(Math.pow(2, attempt) * 1000);
                    continue;
                }

                return response;

            } catch (error) {
                lastError = error instanceof Error ? error : new Error(String(error));

                if (attempt < maxRetries - 1) {
                    await this.sleep(Math.pow(2, attempt) * 1000);
                }
            }
        }

        throw lastError || new Error('Request failed after retries');
    }

    /**
     * Sleep utility for retry delays
     */
    private static sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

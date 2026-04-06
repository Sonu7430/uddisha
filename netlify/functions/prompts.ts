// AI Prompt Engineering for DeepSeek R1T2 Chimera
// Comprehensive prompts for personality analysis and career matching

import { Question } from '../src/data/questions';
import { Career } from '../src/data/careers';

export const SYSTEM_PROMPT = `You are an expert career counselor. Analyze user responses and provide personalized career recommendations.

OUTPUT REQUIREMENTS:
- JSON format only.
- Be concise.
- Score careers 0-100.
- Confidence 0-1.`;

export function generateAnalysisPrompt(
    answers: { [key: number]: any },
    questions: Question[],
    careers: Career[]
): string {
    // Format user responses (keep this to ensure personalization)
    const formattedResponses = questions.map(q => {
        const answer = answers[q.id];
        return `Q${q.id} [${q.category}]: ${q.text}
A: ${formatAnswer(answer, q)}`;
    }).join('\n');

    // Extract user preferences for filtering
    const industryPreferences = (answers[6] || []) as string[]; // Q6: Industries
    const careerPreferences = (answers[17] || []) as string[];  // Q17: Specific Career Areas

    // Filter careers based on preferences
    let relevantCareers = careers;
    if (industryPreferences.length > 0 || careerPreferences.length > 0) {
        relevantCareers = careers.filter(c => {
            const matchesIndustry = industryPreferences.some(ind =>
                c.category.includes(ind) || ind.includes(c.category)
            );
            const matchesArea = careerPreferences.some(area =>
                c.subcategory.includes(area) ||
                area.includes(c.subcategory) ||
                c.name.includes(area) ||
                area.includes(c.name)
            );
            return matchesIndustry || matchesArea;
        });
    }

    // If filtering resulted in too few careers, add some diversity
    if (relevantCareers.length < 20) {
        const diverseCareers = careers.filter(c => !relevantCareers.includes(c))
            .sort(() => 0.5 - Math.random())
            .slice(0, 30);
        relevantCareers = [...relevantCareers, ...diverseCareers];
    }

    // STRICT LIMIT: Max 60 careers to prevent timeout
    if (relevantCareers.length > 60) {
        relevantCareers = relevantCareers.slice(0, 60);
    }

    // Ultra-compact career summary
    const careerSummary = relevantCareers.map(c =>
        `ID:${c.id}|${c.name}|${c.skills.slice(0, 2).join(',')}`
    ).join('\n');

    return `CAREER ANALYSIS
USER:
${formattedResponses}

DB (${relevantCareers.length}):
${careerSummary}

TASK:
1. PROFILE: 3 key traits, work style, 2 strengths, 2 values.
2. MATCHING: Pick TOP 6 careers from DB. Score 0-100. Reason briefly.
3. EXTRAS: 2 strength areas, 2 dev areas, 3 alt careers, 2 growth paths.

JSON OUTPUT:
{
  "personalityProfile": {
    "traits": ["t1", "t2", "t3"],
    "workStyle": "brief desc",
    "summary": "1 sentence",
    "strengths": ["s1", "s2"],
    "values": ["v1", "v2"]
  },
  "careerMatches": [
    { "careerId": 123, "score": 95, "reasoning": "brief reason", "confidence": 0.9 }
  ],
  "alternativeCareers": ["Alt1", "Alt2", "Alt3"],
  "strengthAreas": ["a1", "a2"],
  "developmentAreas": ["d1", "d2"],
  "growthPaths": ["p1", "p2"]
}`;
}

function formatAnswer(answer: any, question: Question): string {
    if (Array.isArray(answer)) {
        return answer.join(', ');
    }
    if (typeof answer === 'number' && question.type === 'scale') {
        return `${answer}/10 (${question.scaleLabels?.min} → ${question.scaleLabels?.max})`;
    }
    return String(answer);
}

export function validateDeepSeekResponse(response: any): boolean {
    // Validate response structure
    if (!response || typeof response !== 'object') return false;

    const required = [
        'personalityProfile',
        'careerMatches',
        'alternativeCareers',
        'strengthAreas',
        'developmentAreas',
        'growthPaths'
    ];

    for (const field of required) {
        if (!(field in response)) return false;
    }

    // Validate personality profile
    const profile = response.personalityProfile;
    if (!profile.traits || !Array.isArray(profile.traits) || profile.traits.length === 0) return false;
    if (!profile.workStyle || typeof profile.workStyle !== 'string') return false;
    if (!profile.summary || typeof profile.summary !== 'string') return false;

    // Validate career matches
    if (!Array.isArray(response.careerMatches) || response.careerMatches.length === 0) return false;

    for (const match of response.careerMatches) {
        if (typeof match.careerId !== 'number') return false;
        if (typeof match.score !== 'number' || match.score < 0 || match.score > 100) return false;
        if (typeof match.reasoning !== 'string') return false;
        if (typeof match.confidence !== 'number' || match.confidence < 0 || match.confidence > 1) return false;
    }

    return true;
}

// Netlify Function: Protected Career Data API
// Serves career data with anti-scraping protection

import { Handler } from '@netlify/functions';
import { allCareers, careerCategories, Career } from '../../src/data/careers';

// Cloudflare Turnstile secret key
const TURNSTILE_SECRET_KEY = process.env.TURNSTILE_SECRET_KEY || process.env.VITE_TURNSTILE_SECRET_KEY;

// Rate limiting store (in-memory, resets on cold start)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX = 15; // 15 requests per minute

interface TurnstileVerifyResponse {
    success: boolean;
    'error-codes'?: string[];
    challenge_ts?: string;
    hostname?: string;
}

// Verify Turnstile token with Cloudflare
async function verifyTurnstileToken(token: string, ip: string): Promise<boolean> {
    if (!TURNSTILE_SECRET_KEY) {
        console.warn('Turnstile secret key not configured - skipping verification');
        return true; // Allow in dev if not configured
    }

    try {
        const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                secret: TURNSTILE_SECRET_KEY,
                response: token,
                remoteip: ip
            })
        });

        const result: TurnstileVerifyResponse = await response.json();
        return result.success === true;
    } catch (error) {
        console.error('Turnstile verification failed:', error);
        return false;
    }
}

// Simple IP-based rate limiting
function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
    const now = Date.now();
    const record = rateLimitStore.get(ip);

    if (!record || now > record.resetTime) {
        rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
        return { allowed: true, remaining: RATE_LIMIT_MAX - 1 };
    }

    if (record.count >= RATE_LIMIT_MAX) {
        return { allowed: false, remaining: 0 };
    }

    record.count++;
    return { allowed: true, remaining: RATE_LIMIT_MAX - record.count };
}

// Get client IP from request headers
function getClientIP(event: any): string {
    return (
        event.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
        event.headers['x-real-ip'] ||
        event.headers['client-ip'] ||
        'unknown'
    );
}

// Add small delay to slow down bulk scraping
function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const handler: Handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json',
        'Cache-Control': 'private, no-cache, no-store, must-revalidate'
    };

    // Handle OPTIONS (CORS preflight)
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed. Use POST.' })
        };
    }

    const clientIP = getClientIP(event);

    // Check rate limit
    const rateLimit = checkRateLimit(clientIP);
    if (!rateLimit.allowed) {
        return {
            statusCode: 429,
            headers: {
                ...headers,
                'Retry-After': '60',
                'X-RateLimit-Remaining': '0'
            },
            body: JSON.stringify({
                error: 'Too many requests. Please wait before trying again.',
                retryAfter: 60
            })
        };
    }

    try {
        // Parse request body
        const body = JSON.parse(event.body || '{}');
        const { token, page = 1, limit = 50, category, search, id } = body;

        // Require Turnstile token
        if (!token) {
            return {
                statusCode: 401,
                headers,
                body: JSON.stringify({
                    error: 'Verification required',
                    message: 'Please complete the CAPTCHA verification first.'
                })
            };
        }

        // Verify Turnstile token
        const isValidToken = await verifyTurnstileToken(token, clientIP);
        if (!isValidToken) {
            return {
                statusCode: 403,
                headers,
                body: JSON.stringify({
                    error: 'Verification failed',
                    message: 'CAPTCHA verification failed. Please try again.'
                })
            };
        }

        // Add small delay to prevent rapid scraping (100-300ms)
        await delay(100 + Math.random() * 200);

        // If requesting a single career by ID
        if (id !== undefined) {
            const career = allCareers.find(c => c.id === parseInt(id));
            if (!career) {
                return {
                    statusCode: 404,
                    headers,
                    body: JSON.stringify({ error: 'Career not found' })
                };
            }

            return {
                statusCode: 200,
                headers: { ...headers, 'X-RateLimit-Remaining': String(rateLimit.remaining) },
                body: JSON.stringify({
                    success: true,
                    career
                })
            };
        }

        // Filter careers
        let filteredCareers = [...allCareers];

        // Filter by category
        if (category && category !== 'All') {
            filteredCareers = filteredCareers.filter(c => c.category === category);
        }

        // Filter by search term
        if (search) {
            const searchLower = search.toLowerCase();
            filteredCareers = filteredCareers.filter(c =>
                c.name.toLowerCase().includes(searchLower) ||
                c.description?.toLowerCase().includes(searchLower) ||
                c.skills?.some((s: string) => s.toLowerCase().includes(searchLower))
            );
        }

        // Enforce pagination limits
        const safeLimit = Math.min(Math.max(1, parseInt(limit) || 50), 50); // Max 50 per request
        const safePage = Math.max(1, parseInt(page) || 1);
        const totalItems = filteredCareers.length;
        const totalPages = Math.ceil(totalItems / safeLimit);
        const startIndex = (safePage - 1) * safeLimit;
        const endIndex = startIndex + safeLimit;

        const paginatedCareers = filteredCareers.slice(startIndex, endIndex);

        return {
            statusCode: 200,
            headers: { ...headers, 'X-RateLimit-Remaining': String(rateLimit.remaining) },
            body: JSON.stringify({
                success: true,
                careers: paginatedCareers,
                pagination: {
                    page: safePage,
                    limit: safeLimit,
                    totalItems,
                    totalPages,
                    hasNextPage: safePage < totalPages,
                    hasPrevPage: safePage > 1
                },
                categories: careerCategories
            })
        };

    } catch (error) {
        console.error('Get careers error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'Server error',
                message: 'An error occurred while fetching careers.'
            })
        };
    }
};

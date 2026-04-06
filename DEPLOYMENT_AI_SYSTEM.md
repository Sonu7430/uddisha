# Backend AI Career Matching System - Deployment Guide

## Prerequisites

1. **OpenRouter API Key**: Sign up at [OpenRouter](https://openrouter.ai/) and get your API key
2. **Supabase Project**: Ensure you have a Supabase project set up
3. **Netlify Account**: Connected to your GitHub repository

## Step 1: Database Setup

### Apply Supabase Migration

1. Navigate to your Supabase project dashboard
2. Go to **SQL Editor**
3. Copy the contents of `supabase/migrations/20250627000000_ai_career_system.sql`
4. Paste and execute the SQL script
5. Verify tables were created:
   - `assessment_cache`
   - `analysis_logs`
   - `ai_feedback`

### Verify RLS Policies

Check that Row Level Security policies are enabled for all three tables.

## Step 2: Environment Variables

### Netlify Environment Variables

Add the following environment variables in your Netlify dashboard (**Site settings > Environment variables**):

| Key | Value |
|-----|-------|
| `OPENROUTER_API_KEY` | `your-openrouter-api-key-here` |
| `DEEPSEEK_MODEL` | `tngtech/tng-r1t-chimera:free` |
| `API_TIMEOUT` | `60000` |
| `CACHE_EXPIRATION_DAYS` | `30` |
| `ENABLE_AI_ANALYSIS` | `true` |
| `MAX_RETRIES` | `3` |
| `VITE_SUPABASE_URL` | `your-supabase-project-url` |
| `VITE_SUPABASE_ANON_KEY` | `your-supabase-anon-key` |
| `SUPABASE_SERVICE_ROLE_KEY` | `your-supabase-service-role-key` |

### Get Your Keys

**OpenRouter API Key:**
1. Go to https://openrouter.ai/
2. Sign up/login
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key (starts with `sk-or-v1-...`)

**Supabase Keys:**
1. Go to your Supabase project dashboard
2. Navigate to **Settings > API**
3. Copy:
   - Project URL → `VITE_SUPABASE_URL`
   - `anon` `public` key → `VITE_SUPABASE_ANON_KEY`
   - `service_role` `secret` key → `SUPABASE_SERVICE_ROLE_KEY`

## Step 3: Deploy to Netlify

### Option A: Automatic Deployment (Recommended)

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Add AI career matching backend system"
   git push origin main
   ```

2. Netlify will automatically detect the changes and deploy

3. Monitor the deployment in Netlify dashboard

### Option B: Manual Deployment

1. Build locally:
   ```bash
   npm install
   npm run build
   ```

2. Deploy via Netlify CLI:
   ```bash
   netlify deploy --prod
   ```

## Step 4: Verification

### Test the System

1. **Navigate to your deployed site**
2. **Take the assessment** - Complete all questions
3. **Check loading screen** - Should show "AI Analysis in Progress..."
4. **Verify results page** displays:
   - AI Personality Analysis section (if not fallback)
   - Career matches with scores
   - Alternative careers section
   - Proper match reasons

### Check Supabase Database

1. Go to **Table Editor** in Supabase
2. Check `assessment_cache` table - should have entries
3. Check `analysis_logs` table - should show API calls
4. Verify `api_status` is `success` or `cached`

### Monitor Netlify Functions

1. Go to **Netlify Dashboard > Functions**
2. Click on `career-analysis`
3. Check function logs for:
   - Successful executions
   - Response times (should be < 10s for AI, < 500ms for cache hits)
   - Any errors

## Step 5: Testing Scenarios

### Test Cache Functionality

1. Complete an assessment
2. Note the results
3. Retake with **identical answers**
4. Results should load much faster (cached)
5. Check Supabase `analysis_logs` - should show `api_status: 'cached'`

### Test Error Handling

1. Temporarily set `ENABLE_AI_ANALYSIS=false` in Netlify
2. Take assessment
3. Should see algorithmic results with fallback message
4. Re-enable AI analysis

### Test Feedback System

1. Complete assessment
2. Click "Very Accurate" or "Needs Refinement"
3. Check `ai_feedback` table in Supabase
4. Should have new entry with your feedback

## Troubleshooting

### Issue: "Analysis Failed" Error

**Possible Causes:**
- OpenRouter API key not set or invalid
- Supabase connection issues
- Function timeout

**Solutions:**
1. Verify environment variables in Netlify
2. Check Netlify function logs for specific error
3. Ensure Supabase service role key is correct

### Issue: No AI Personality Profile Showing

**Possible Causes:**
- Cache hit: < 500ms
- Cache miss (AI analysis): 5-15 seconds
- If > 30 seconds, check function timeout settings

### Issue: Database Connection Errors

**Solutions:**
1. Verify `SUPABASE_SERVICE_ROLE_KEY` is set correctly
2. Check Supabase project is active
3. Verify RLS policies allow insertions

## Monitoring & Maintenance

### Regular Checks

1. **Weekly**: Review `analysis_logs` for error rates
2. **Monthly**: Check cache hit ratio
3. **As needed**: Clear expired cache entries (automatic after 30 days)

### Cache Management

To manually clear cache:
```sql
-- In Supabase SQL Editor
DELETE FROM assessment_cache WHERE expires_at < now();
```

### Cost Monitoring

- DeepSeek R1T2 Chimera is **free** via OpenRouter
- Monitor token usage in `analysis_logs` table
- Check OpenRouter dashboard for usage stats

## Success Criteria

✅ Assessment completes successfully  
✅ AI analysis runs without errors  
✅ Personality profile displays correctly  
✅ Career matches show with proper scores  
✅ Cache works on repeat assessments  
✅ Feedback submission works  
✅ Database logs all requests  

## Next Steps

1. **Monitor user feedback** in `ai_feedback` table
2. **Refine prompts** based on feedback quality
3. **Optimize caching** strategy if needed
4. **Add analytics** dashboard for insights

## Support

If you encounter issues:
1. Check Netlify function logs
2. Review Supabase logs
3. Verify all environment variables
4. Test with sample data

---

**Deployment Date**: {Current Date}  
**System Version**: 1.0.0  
**AI Model**: TNG DeepSeek R1T2 Chimera (Free) (tngtech/tng-r1t-chimera:free)

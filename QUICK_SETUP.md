
# AI Career Matching System - Quick Setup

## 1. Get Your API Keys

### OpenRouter API Key
1. Visit https://openrouter.ai/
2. Sign up/Login
3. Go to API Keys
4. Create new key
5. Copy key (starts with `sk-or-v1-...`)

### Supabase Keys (from your project dashboard)
- Project URL
- Anon key
- Service role key

## 2. Add to Netlify Environment Variables

Go to: **Netlify Dashboard > Site Settings > Environment Variables**

Add these:
Add these (Key -> Value):

| Key | Value |
|-----|-------|
| `OPENROUTER_API_KEY` | `sk-or-v1-your-key-here` |
| `DEEPSEEK_MODEL` | `tngtech/tng-r1t-chimera:free` |
| `VITE_SUPABASE_URL` | `your-supabase-url` |
| `VITE_SUPABASE_ANON_KEY` | `your-anon-key` |
| `SUPABASE_SERVICE_ROLE_KEY` | `your-service-role-key` |
| `ENABLE_AI_ANALYSIS` | `true` |
| `CACHE_EXPIRATION_DAYS` | `30` |
| `MAX_RETRIES` | `3` |
| `API_TIMEOUT` | `60000` |

## 3. Run Database Migration

In Supabase SQL Editor, run:
```sql
-- Copy and paste contents from:
-- supabase/migrations/20250627000000_ai_career_system.sql
```

## 4. Deploy

```bash
git add .
git commit -m "Add AI career matching system"
git push origin main
```

Netlify will auto-deploy!

## 5. Test

1. Visit your site
2. Take assessment
3. See AI-powered results!

## Verify Success

✅ Assessment loads  
✅ "AI Analysis in Progress" shows  
✅ Results show personality profile  
✅ Career matches display  
✅ Feedback buttons work  

## Troubleshooting

**"Analysis Failed"** → Check OpenRouter API key in Netlify  
**No personality profile** → Verify DEEPSEEK_MODEL is `tngtech/tng-r1t-chimera:free`  
**Slow loading** → Normal for first analysis (5-15s), cached results are instant  

---

**Model**: TNG DeepSeek R1T2 Chimera (Free) (tngtech/tng-r1t-chimera:free)  
**Cost**: $0 - Completely free!

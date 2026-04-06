# Troubleshooting "Analysis Failed" Error

## Quick Diagnosis

The "Analysis Failed" error means the Netlify Function couldn't complete the AI analysis. This is most likely because:

1. ❌ **Environment variables not set** in Netlify
2. ❌ **Database migration not run** in Supabase
3. ❌ **API key invalid** or not configured

## Step-by-Step Fix

### Step 1: Check Netlify Environment Variables

1. Go to **Netlify Dashboard** → Your Site → **Site settings** → **Environment variables**

2. Verify these variables are set:

| Key | Value |
|-----|-------|
| `OPENROUTER_API_KEY` | `sk-or-v1-your-actual-key-here` |
| `DEEPSEEK_MODEL` | `tngtech/tng-r1t-chimera:free` |
| `VITE_SUPABASE_URL` | `https://your-project.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `your-anon-key` |
| `SUPABASE_SERVICE_ROLE_KEY` | `your-service-role-key` |
| `ENABLE_AI_ANALYSIS` | `true` |
| `CACHE_EXPIRATION_DAYS` | `30` |
| `MAX_RETRIES` | `3` |
| `API_TIMEOUT` | `60000` |

3. **If missing**, add them now:
   - Click **Add a variable**
   - Add each variable one by one
   - Click **Save**

4. **After adding variables**, you MUST redeploy:
   - Go to **Deploys** tab
   - Click **Trigger deploy** → **Clear cache and deploy site**

### Step 2: Get Your OpenRouter API Key

If you don't have it yet:

1. Visit https://openrouter.ai/
2. Sign up or log in
3. Go to **Keys** section
4. Click **Create Key**
5. Copy the key (starts with `sk-or-v1-...`)
6. Add it to Netlify as `OPENROUTER_API_KEY`

### Step 3: Get Supabase Credentials

1. Go to your Supabase project: https://supabase.com/dashboard/projects
2. Click on your project
3. Go to **Settings** → **API**
4. Copy these values:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`
   - **service_role secret** key → `SUPABASE_SERVICE_ROLE_KEY` ⚠️ Keep this secret!

### Step 4: Run Database Migration

1. Open Supabase SQL Editor: https://supabase.com/dashboard/project/YOUR_PROJECT/sql
2. Click **New query**
3. Copy the ENTIRE contents of this file:
   ```
   d:\career compass\careercompas-1\supabase\migrations\20250627000000_ai_career_system.sql
   ```
4. Paste into SQL Editor
5. Click **Run** (or press Ctrl+Enter)
6. Verify success - should see "Success. No rows returned"

### Step 5: Verify Tables Created

In Supabase:
1. Go to **Table Editor**
2. Check these tables exist:
   - ✅ `assessment_cache`
   - ✅ `analysis_logs`
   - ✅ `ai_feedback`

If they don't exist, the migration didn't run properly. Try Step 4 again.

### Step 6: Redeploy on Netlify

After setting environment variables:

1. Go to **Netlify Dashboard** → **Deploys**
2. Click **Trigger deploy** → **Clear cache and deploy site**
3. Wait for deployment to complete (2-3 minutes)

### Step 7: Test Again

1. Visit your deployed site
2. Take the assessment
3. Should now work! ✅

## Still Getting Error?

### Check Netlify Function Logs

1. Go to **Netlify Dashboard** → **Functions**
2. Click on `career-analysis`
3. Look at recent logs
4. Common errors:

**"Missing API key"**
→ Add `OPENROUTER_API_KEY` to environment variables

**"Supabase error"**
→ Check `SUPABASE_SERVICE_ROLE_KEY` is correct
→ Verify database migration ran successfully

**"Invalid model"**
→ Verify `DEEPSEEK_MODEL=tngtech/tng-r1t-chimera:free`

### Enable Fallback Mode (Temporary)

If you want to test without AI while debugging:

1. In Netlify environment variables, set:
   ```
   ENABLE_AI_ANALYSIS=false
   ```
2. Redeploy
3. Assessment will use algorithmic matching (no AI personality profile)
4. Once fixed, set back to `true`

## Quick Checklist

Before testing again, verify:

- [ ] All 9 environment variables added to Netlify
- [ ] OpenRouter API key is valid (starts with `sk-or-v1-`)
- [ ] Supabase credentials are correct
- [ ] Database migration ran successfully
- [ ] 3 tables exist in Supabase
- [ ] Redeployed site after adding variables
- [ ] Cleared cache during redeploy

## Expected Behavior

✅ **Working correctly:**
- Loading shows "AI Analysis in Progress..."
- Takes 5-15 seconds for first analysis
- Results show personality profile
- Alternative careers section appears
- Feedback buttons work

❌ **Still broken:**
- Share the Netlify function logs
- Check browser console for errors (F12)
- Verify environment variables are actually set

## Need More Help?

1. Check Netlify function logs (copy exact error)
2. Check browser console (F12 → Console tab)
3. Verify Supabase table editor shows the 3 tables
4. Confirm environment variables are saved in Netlify

---

**Most Common Issue**: Forgot to redeploy after adding environment variables!  
**Solution**: Trigger deploy → Clear cache and deploy site

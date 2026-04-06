# Setup Checklist - Fix "Analysis Failed" Error

## ⚠️ The error means environment variables aren't set yet!

Follow these steps **IN ORDER**:

## 1️⃣ Get OpenRouter API Key (2 min)

1. Go to: https://openrouter.ai/
2. Sign up / Login
3. Click **Keys** → **Create Key**
4. Copy the key (starts with `sk-or-v1-...`)
5. **Save it somewhere** - you'll need it in step 3

## 2️⃣ Get Supabase Credentials (1 min)

1. Go to: https://supabase.com/dashboard
2. Click your project
3. Go to **Settings** → **API**
4. Copy these 3 values:
   - **Project URL** (looks like: `https://xxx.supabase.co`)
   - **anon public** key (long string)
   - **service_role secret** key (long string) ⚠️ Keep secret!

## 3️⃣ Add to Netlify (3 min)
API_TIMEOUT = 60000
```

4. Click **Save** after each one

## 4️⃣ Run Database Migration (2 min)

1. Open file: `d:\career compass\careercompas-1\supabase\migrations\20250627000000_ai_career_system.sql`
2. **Copy ALL the contents** (Ctrl+A, Ctrl+C)
3. Go to: https://supabase.com/dashboard/project/YOUR_PROJECT/sql
4. Click **New query**
5. **Paste** the SQL (Ctrl+V)
6. Click **Run** (or Ctrl+Enter)
7. Should see: "Success. No rows returned"

## 5️⃣ Verify Tables (30 sec)

1. In Supabase, go to **Table Editor**
2. Check these tables exist:
   - ✅ `assessment_cache`
   - ✅ `analysis_logs`
   - ✅ `ai_feedback`

If missing, repeat step 4.

## 6️⃣ Redeploy Netlify (2 min)

**CRITICAL**: You MUST redeploy after adding environment variables!

1. Go to Netlify → **Deploys** tab
2. Click **Trigger deploy** → **Clear cache and deploy site**
3. Wait for green checkmark (2-3 min)

## 7️⃣ Test (1 min)

1. Visit your site
2. Take assessment
3. Should work now! ✅

---

## ✅ Success Checklist

Before testing, verify:
- [ ] Added all 9 environment variables to Netlify
- [ ] OpenRouter key starts with `sk-or-v1-`
- [ ] Ran database migration in Supabase
- [ ] See 3 tables in Supabase Table Editor
- [ ] **Redeployed site** after adding variables
- [ ] Deployment shows green checkmark

## 🆘 Still Broken?

1. Check Netlify **Functions** tab → `career-analysis` → View logs
2. Check browser console (F12 → Console)
3. See **TROUBLESHOOTING.md** for detailed help

---

**Total Time**: ~10 minutes  
**Most Common Mistake**: Forgetting to redeploy after adding variables!

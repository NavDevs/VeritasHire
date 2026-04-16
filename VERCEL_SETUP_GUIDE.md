# 🚀 Complete Vercel Deployment Guide - VeritasHire

## ✅ Current Status

**Your project is already on GitHub!**
- Repository: `https://github.com/NavDevs/VeritasHire`
- Branch: `main`
- Latest commit: "Ready for Vercel deployment - Mobile optimized & ML enhanced"
- ML models: Tracked via Git LFS ✅
- Build status: Tested and working ✅

---

## 📋 Step-by-Step Vercel Deployment

### Step 1: Create Vercel Account

1. Go to **https://vercel.com**
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub account
5. Complete the account setup

---

### Step 2: Import Your Repository

1. After logging in, click **"Add New..."** → **"Project"**
2. You'll see a list of your GitHub repositories
3. Find and click **"Import"** next to **VeritasHire**
   - If you don't see it, click "Adjust GitHub App Permissions" and select the repository

---

### Step 3: Configure Project Settings ⚙️

This is the **MOST IMPORTANT** step! Configure exactly as shown:

#### **Project Name**
```
veritashire
```
(or your preferred name)

#### **Framework Preset**
```
Next.js
```
(Vercel should auto-detect this)

#### **Root Directory** ⚠️ CRITICAL
```
web-app
```
**DO NOT leave this as root!** Your Next.js app is inside the `web-app` folder.

Click **"Edit"** next to Root Directory and type: `web-app`

#### **Build Command**
```
npm run build
```
(Should be auto-detected)

#### **Output Directory**
```
.next
```
(Should be auto-detected)

#### **Install Command**
```
npm install
```
(Should be auto-detected)

#### **Node.js Version**
```
18.x
```
(Select from dropdown)

---

### Step 4: Configure Environment Variables (Optional)

Click **"Environment Variables"** section:

For basic deployment, **NO environment variables are required**.

If you want to add optional variables later:
- `NODE_ENV`: `production` (default)
- `PYTHON_PATH`: `python3` (default)

---

### Step 5: Deploy! 🎉

1. Click **"Deploy"** button
2. Wait 2-4 minutes for the build to complete
3. You'll see a success screen with your live URL!

**Your app will be live at:**
```
https://veritashire.vercel.app
```
(or your project name)

---

## 🔧 Vercel Configuration Explained

### vercel.json (Already Configured ✅)

Your project includes `vercel.json` which tells Vercel how to handle your app:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/app/api/$1"
    }
  ]
}
```

**What this does:**
- Tells Vercel to use Next.js builder
- Routes API calls to the correct handlers
- Ensures Python API endpoints work

### next.config.ts (Already Optimized ✅)

Your Next.js configuration is production-ready:
- Image optimization enabled (AVIF/WebP)
- Compression enabled for faster loading
- React strict mode for better performance
- TypeScript validation

---

## 🐍 Python ML Backend on Vercel

### How It Works

Your prediction API uses a **hybrid approach**:

1. **Next.js API Route** (`/api/predict/route.ts`) receives the request
2. **Spawns Python process** to run `predict.py`
3. **Python loads ML models** from `ml-models/` directory
4. **Returns prediction** as JSON response

### File Structure on Vercel

```
web-app/
├── app/
│   └── api/
│       └── predict/
│           └── route.ts          ← API endpoint
├── ml-models/
│   ├── model.pkl                 ← Random Forest model (3MB)
│   └── vectorizer.pkl            ← TF-IDF vectorizer (64MB)
├── predict.py                    ← Python prediction script
├── requirements.txt              ← Python dependencies
└── package.json                  ← Node.js dependencies
```

### Python Dependencies (requirements.txt)

All dependencies are specified and will be installed by Vercel:
```
pandas==2.1.4
numpy==1.26.2
scikit-learn==1.3.2
scipy==1.11.4
nltk==3.8.1
joblib==1.3.2
```

---

## 📦 ML Models Handling

### ✅ Models Are Properly Tracked

Your ML models are tracked via **Git LFS** (Large File Storage):
- `ml-models/model.pkl` (3MB) - Random Forest classifier
- `ml-models/vectorizer.pkl` (64MB) - TF-IDF text vectorizer

### What is Git LFS?

Git LFS allows Git to handle large files efficiently. Vercel fully supports Git LFS, so your models will be:
- ✅ Properly downloaded during deployment
- ✅ Accessible to the Python script
- ✅ Loaded at runtime for predictions

### Verification

After deployment, the models will be at:
```
/web-app/ml-models/model.pkl
/web-app/ml-models/vectorizer.pkl
```

The `predict.py` script loads them with:
```python
model = joblib.load('ml-models/model.pkl')
vectorizer = joblib.load('ml-models/vectorizer.pkl')
```

---

## 🧪 Testing After Deployment

### 1. Test Homepage
- Visit your Vercel URL
- Check mobile responsiveness
- Verify all sections load

### 2. Test ML Prediction

**Test Fake Job:**
1. Click "Try Fake Job" button
2. Click "Analyze Job Posting"
3. Should show: **"Potentially Fake"** with 90%+ confidence
4. Should display multiple red flags

**Test Real Job:**
1. Click "Try Real Job" button
2. Click "Analyze Job Posting"
3. Should show: **"Likely Legitimate"** with 60%+ confidence
4. Should show extracted skills

### 3. Test Recent Analysis
1. After analyzing jobs, click "Recent Analysis"
2. Verify history is saved
3. Check details page works

---

## 🐛 Troubleshooting Common Issues

### Issue 1: Build Fails

**Error:** `Module not found` or `Build error`

**Solution:**
```bash
# Test build locally first
cd web-app
npm run build

# Fix any TypeScript errors
npm run type-check

# Fix linting issues
npm run lint:fix
```

**Common causes:**
- Root directory not set to `web-app`
- Missing dependencies in package.json
- TypeScript errors

---

### Issue 2: Python API Not Working

**Error:** `Failed to analyze job posting` or 500 error

**Checklist:**
1. ✅ Verify `predict.py` exists in `web-app/` root
2. ✅ Verify `ml-models/` folder has both `.pkl` files
3. ✅ Check Vercel function logs:
   - Go to Vercel Dashboard → Your Project → Logs
   - Look for Python errors

**Solution:**
```bash
# Test Python locally
cd web-app
pip install -r requirements.txt
python predict.py "Test job description here"
```

---

### Issue 3: ML Models Not Loading

**Error:** `Model file not found` or `FileNotFoundError`

**Causes:**
- Models not uploaded to GitHub
- Git LFS not working
- Wrong file paths

**Solution:**
```bash
# Verify models are in Git LFS
git lfs ls-files

# Should show:
# ml-models/model.pkl
# ml-models/vectorizer.pkl

# If missing, re-add them:
git lfs track "*.pkl"
git add ml-models/
git commit -m "Add ML models"
git push origin main
```

---

### Issue 4: 404 Errors on Pages

**Error:** Page not found when navigating

**Solution:**
- This is normal for client-side navigation
- Hard refresh (Ctrl+F5) if needed
- Check Next.js routing in `app/` directory

---

### Issue 5: Slow First Prediction

**Cause:** Cold start - Python needs to load ML models (64MB vectorizer)

**Solution:**
- First prediction: 3-5 seconds (loading models)
- Subsequent predictions: <1 second
- This is normal and expected

---

## 📊 Monitoring Your Deployment

### Vercel Dashboard

1. **Overview**
   - URL: https://vercel.com/dashboard
   - View deployments, analytics, logs

2. **Function Logs** (for Python errors)
   - Go to your project → "Logs" tab
   - Filter by "Function" to see Python API logs
   - Look for error messages

3. **Analytics**
   - View visitor stats
   - Page performance metrics
   - Geographic data

### GitHub Actions

1. **CI/CD Pipeline**
   - URL: https://github.com/NavDevs/VeritasHire/actions
   - View build status
   - Check test results

2. **Automatic Deployments**
   - Every push to `main` triggers deployment
   - Can configure Vercel secrets for auto-deploy

---

## 🔐 Setting Up Auto-Deploy (Optional)

If you want GitHub Actions to automatically deploy to Vercel:

### 1. Get Vercel Credentials

1. Go to Vercel Dashboard → Your Project → Settings
2. Copy these values:
   - **Project ID**
   - **Organization ID**

3. Go to Vercel Account Settings → Tokens
4. Create a new token named "GitHub Actions"
5. Copy the token

### 2. Add to GitHub Secrets

1. Go to: `https://github.com/NavDevs/VeritasHire/settings/secrets/actions`
2. Add these secrets:
   ```
   VERCEL_TOKEN = <your token>
   VERCEL_ORG_ID = <your org ID>
   VERCEL_PROJECT_ID = <your project ID>
   ```

### 3. Test Auto-Deploy

```bash
# Make a small change
echo "# Test" >> README.md
git add .
git commit -m "Test auto-deploy"
git push origin main
```

Check GitHub Actions - it should automatically deploy to Vercel!

---

## 🌐 Custom Domain (Optional)

### 1. Add Domain in Vercel

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Enter your domain (e.g., `veritashire.com`)
3. Click "Add"

### 2. Configure DNS

Vercel will show DNS records to add:
```
Type: A
Name: @
Value: 76.76.21.21
```

Or use CNAME:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 3. Wait for Propagation

DNS changes take 5 minutes to 48 hours to propagate.

---

## ✅ Deployment Checklist

Before considering deployment complete, verify:

- [ ] Vercel project created successfully
- [ ] Root directory set to `web-app`
- [ ] Build completed without errors
- [ ] Homepage loads correctly
- [ ] Mobile responsive design works
- [ ] "Try Fake Job" detection works (90%+ confidence)
- [ ] "Try Real Job" detection works (60%+ confidence)
- [ ] Red flags displayed correctly
- [ ] Recent analysis page accessible
- [ ] No console errors in browser
- [ ] Python API logs show no errors

---

## 🎓 For Your College Project

### Demo Script

1. **Show Homepage**: "This is VeritasHire, an AI-powered fake job detection platform"
2. **Demonstrate Mobile**: Resize browser to show responsive design
3. **Test Fake Job**: Click "Try Fake Job" → Analyze → Show red flags
4. **Explain ML**: "Uses Random Forest with TF-IDF and 16 custom scam indicators"
5. **Show Accuracy**: "97.8% accuracy, 94.3% precision on our dataset"
6. **Recent Analysis**: Show history feature
7. **Show GitHub**: Mention CI/CD pipeline and deployment

### Key Points to Mention

- ✅ Machine Learning: Random Forest + TF-IDF + Custom Features
- ✅ Dataset: 17,880 job postings (Kaggle)
- ✅ Features: 10,016 (10,000 text + 16 scam indicators)
- ✅ Metrics: 97.8% accuracy, 94.3% precision, 57.8% recall
- ✅ Tech Stack: Next.js, Python, scikit-learn
- ✅ Deployment: Vercel with CI/CD via GitHub Actions

---

## 📞 Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **GitHub Repo**: https://github.com/NavDevs/VeritasHire
- **Issues**: Use GitHub Issues tab

---

## 🎉 You're Ready!

**Your project is fully configured and ready for deployment!**

Just follow the 5 steps at the top, and you'll have a live, production-ready ML-powered web app in minutes!

**Good luck with your college project!** 🚀🎓

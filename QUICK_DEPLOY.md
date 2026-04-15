# 🚀 Quick Deploy - VeritasHire

Get your fake job detection app deployed in 10 minutes!

## ⚡ Fast Track (5 Steps)

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Fill in:
   - **Repository name:** `VeritasHire`
   - **Description:** `AI-Powered Fake Job Detection`
   - **Visibility:** Public or Private
   - ⚠️ DO NOT check "Add README" or ".gitignore"
3. Click **Create repository**
4. Copy the repository URL (e.g., `https://github.com/NavDevs/VeritasHire.git`)

### Step 2: Push Code to GitHub

Open terminal in the `web-app` directory:

```bash
# Windows (PowerShell)
.\setup-github.ps1

# Mac/Linux
bash setup-github.sh

# OR manually:
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/VeritasHire.git
git push -u origin main
```

### Step 3: Create Vercel Account

1. Go to https://vercel.com
2. Click **Sign Up**
3. Choose **Continue with GitHub**
4. Authorize Vercel

### Step 4: Deploy to Vercel

**Option A: One-Click Deploy** (Easiest)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/NavDevs/VeritasHire)

**Option B: Manual Setup**

1. Go to https://vercel.com/dashboard
2. Click **Add New Project**
3. Select **VeritasHire** repository
4. Configure:
   - **Framework Preset:** Next.js
   - **Root Directory:** `web-app`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
5. Click **Deploy**

### Step 5: Configure GitHub Secrets (Optional)

For automated deployments on push:

1. Get Vercel credentials:
   - Go to Vercel Dashboard → Your Project → Settings
   - Copy **Project ID** and **Organization ID**
   - Go to Account Settings → Tokens → Create Token

2. Add to GitHub:
   - Go to `https://github.com/YOUR_USERNAME/VeritasHire/settings/secrets/actions`
   - Add these secrets:
     ```
     VERCEL_TOKEN = <your token>
     VERCEL_ORG_ID = <your org ID>
     VERCEL_PROJECT_ID = <your project ID>
     ```

## ✅ Verify Deployment

### Check GitHub Actions

1. Go to your repository
2. Click **Actions** tab
3. You should see workflows running:
   - ✅ CI/CD Pipeline
   - ✅ Security Scanning

### Check Vercel

1. Go to Vercel Dashboard
2. Click your project
3. Wait for deployment (2-3 minutes)
4. Click the **Visit** button

### Your app is now live! 🎉

URL: `https://veritas-hire.vercel.app` (or your custom domain)

---

## 📊 What's Included

### GitHub Actions Workflows

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| **CI/CD Pipeline** | Push/PR to main | Test, build, deploy |
| **Security Scanning** | Weekly + PRs | Dependency audits |
| **GitHub Pages** | Push to main | Static deployment |

### CI/CD Pipeline Jobs

1. **Code Quality** - ESLint + Prettier
2. **Python ML Tests** - Model validation
3. **Build** - Next.js production build
4. **Deploy** - Auto-deploy to Vercel

### Features

- ✅ 97.8% ML model accuracy
- ✅ 16 scam indicators
- ✅ Real-time analysis
- ✅ Beautiful UI
- ✅ Mobile responsive
- ✅ Analysis history
- ✅ Automated deployments
- ✅ Security scanning

---

## 🆘 Troubleshooting

### Issue: GitHub Actions not running

**Fix:**
- Check Actions tab is enabled in repository settings
- Make sure workflows are in `.github/workflows/`
- Push a new commit to trigger

### Issue: Vercel build fails

**Common causes:**
- Python not installed in Vercel (add to settings)
- Missing dependencies
- Build command incorrect

**Fix:**
1. Check build logs in Vercel
2. Verify `requirements.txt` exists
3. Ensure root directory is `web-app`

### Issue: ML model not working

**Fix:**
- Verify `ml-models/model.pkl` and `vectorizer.pkl` are committed
- Check file size < 10MB each
- Run `python test_model.py` locally

---

## 📚 Next Steps

- [ ] Customize domain in Vercel
- [ ] Add Google Analytics
- [ ] Set up monitoring
- [ ] Invite collaborators
- [ ] Create issues for future features

---

## 📖 Full Documentation

- [README.md](README.md) - Project overview
- [DEPLOYMENT.md](DEPLOYMENT.md) - Detailed deployment guide
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines

---

**Need help?** Open an issue on GitHub! 🐛

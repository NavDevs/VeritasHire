# Deployment Guide for VeritasHire

This guide covers deploying VeritasHire to various platforms using GitHub Actions.

## 📋 Table of Contents

1. [Repository Setup](#repository-setup)
2. [GitHub Actions Workflows](#github-actions-workflows)
3. [Vercel Deployment (Recommended)](#vercel-deployment-recommended)
4. [GitHub Pages Deployment](#github-pages-deployment)
5. [Environment Variables](#environment-variables)
6. [CI/CD Pipeline](#cicd-pipeline)
7. [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start

### 1. Push to GitHub

```bash
cd "c:\Users\huesh\Downloads\College Project\Fake Job detection\web-app"
git init
git add .
git commit -m "Initial commit: VeritasHire Fake Job Detection"
git branch -M main
git remote add origin https://github.com/NavDevs/VeritasHire.git
git push -u origin main
```

### 2. Configure GitHub Secrets

Go to: `https://github.com/NavDevs/VeritasHire/settings/secrets/actions`

Add these secrets:

#### For Vercel Deployment:
- `VERCEL_TOKEN` - Your Vercel API token
- `VERCEL_ORG_ID` - Your Vercel organization ID
- `VERCEL_PROJECT_ID` - Your Vercel project ID

### 3. Workflows Run Automatically

Once pushed, GitHub Actions will:
- ✅ Run code quality checks
- ✅ Execute Python ML tests
- ✅ Build the Next.js application
- ✅ Deploy to Vercel (if configured)

---

## 🔄 GitHub Actions Workflows

### Workflow 1: CI/CD Pipeline (`ci-cd.yml`)

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main`

**Jobs:**
1. **Code Quality** - ESLint + Prettier checks
2. **Python ML Tests** - Model validation and testing
3. **Build** - Next.js production build
4. **Deploy** - Automatic deployment to Vercel (main branch only)

**Caching:**
- npm dependencies
- pip dependencies

### Workflow 2: Security Scanning (`security.yml`)

**Triggers:**
- Weekly (Monday 9 AM UTC)
- Push to main
- Pull requests

**Jobs:**
1. **NPM Audit** - Check for vulnerable packages
2. **Python Safety** - Check Python dependencies
3. **Dependency Review** - Analyze license compatibility (PRs only)

### Workflow 3: GitHub Pages (`deploy-pages.yml`)

**Triggers:**
- Push to main
- Manual trigger

**Note:** Only use this if NOT using Vercel.

---

## 🌐 Vercel Deployment (Recommended)

### Why Vercel?

✅ **Best for Next.js** - Built by the same team  
✅ **Serverless API support** - Python API routes work  
✅ **Automatic HTTPS** - Free SSL certificates  
✅ **Global CDN** - Fast worldwide  
✅ **Preview deployments** - Test PRs before merging  
✅ **Free tier** - Perfect for college projects  

### Step-by-Step Setup

#### 1. Create Vercel Account

1. Go to https://vercel.com
2. Sign up with GitHub
3. Authorize Vercel to access your repositories

#### 2. Import Project

1. Click "Add New Project"
2. Select "VeritasHire" repository
3. Configure:
   - **Framework Preset:** Next.js
   - **Root Directory:** `web-app`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`

#### 3. Get Vercel Credentials

1. Go to Project Settings → General
2. Copy these values:
   - **Project ID**
   - **Organization ID**

3. Go to Account Settings → Tokens
4. Create a new token named "GitHub Actions"
5. Copy the token

#### 4. Add Secrets to GitHub

1. Go to: `https://github.com/NavDevs/VeritasHire/settings/secrets/actions`
2. Add:
   ```
   VERCEL_TOKEN = <your token>
   VERCEL_ORG_ID = <your org ID>
   VERCEL_PROJECT_ID = <your project ID>
   ```

#### 5. Deploy!

Push to main branch:
```bash
git push origin main
```

GitHub Actions will automatically deploy to Vercel! 🎉

---

## 📄 GitHub Pages Deployment

### Limitations

⚠️ **Static site only** - Python API routes won't work  
⚠️ **No serverless functions** - ML model prediction unavailable  
⚠️ **Manual model hosting** - Need external API for predictions  

### Setup Steps

1. **Enable GitHub Pages:**
   - Go to Settings → Pages
   - Source: "GitHub Actions"
   - Click Save

2. **Workflow runs automatically** on push to main

3. **Access your site:**
   ```
   https://navdevs.github.io/VeritasHire/
   ```

### Important: Update next.config.ts

For GitHub Pages, add this to `next.config.ts`:

```typescript
const nextConfig = {
  output: 'export',
  basePath: '/VeritasHire',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

**Note:** This disables API routes. You'll need to host the Python backend separately.

---

## 🔐 Environment Variables

### Required for Vercel Deployment

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `VERCEL_TOKEN` | API authentication token | Vercel Account Settings → Tokens |
| `VERCEL_ORG_ID` | Organization identifier | Vercel Project Settings |
| `VERCEL_PROJECT_ID` | Project identifier | Vercel Project Settings |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Node environment | `production` |
| `PYTHON_PATH` | Python executable path | `python3` |

### Local Development

Create `.env.local` file:

```bash
cp .env.example .env.local
# Edit .env.local with your values
```

**Never commit `.env.local` to Git!**

---

## 🔄 CI/CD Pipeline

### Workflow Overview

```
Push/PR to main
    ↓
[Code Quality Checks]
    ↓
[Python ML Tests]
    ↓
[Build Next.js App]
    ↓
[Deploy to Vercel] (main branch only)
```

### Job Dependencies

- **build** requires: code-quality + python-tests
- **deploy** requires: build (and main branch only)

### Caching Strategy

- **npm cache:** `~/.npm`
- **pip cache:** `~/.cache/pip`
- **Next.js cache:** `.next/cache`

---

## 🛠️ Available npm Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm run type-check   # TypeScript type checking
npm run export       # Static export (for GitHub Pages)
```

---

## 🐛 Troubleshooting

### Issue: Workflow Fails on Build

**Solution:**
```bash
# Test build locally
npm run build

# Check for TypeScript errors
npm run type-check

# Fix linting issues
npm run lint:fix
```

### Issue: Python Tests Fail

**Solution:**
```bash
# Install dependencies
pip install -r requirements.txt

# Run tests manually
python test_model.py

# Verify model files exist
ls ml-models/
```

### Issue: Vercel Deployment Fails

**Check:**
1. ✅ Secrets are correctly configured
2. ✅ Vercel project is created
3. ✅ Root directory is set to `web-app`
4. ✅ Build command is `npm run build`

**Fix:**
```bash
# Re-sync with Vercel
vercel link
vercel pull
```

### Issue: GitHub Pages Shows 404

**Solution:**
1. Enable GitHub Pages in Settings
2. Check workflow completed successfully
3. Wait 2-3 minutes for deployment
4. Check Actions tab for errors

---

## 📊 Monitoring Deployments

### GitHub Actions

1. Go to **Actions** tab
2. Click on workflow run
3. Check job logs
4. Download artifacts if needed

### Vercel

1. Go to Vercel Dashboard
2. Select VeritasHire project
3. View deployments
4. Check logs and analytics

---

## 🎓 Best Practices

### 1. Branch Protection

Enable on `main` branch:
- ✅ Require pull request reviews
- ✅ Require status checks to pass
- ✅ Require branches to be up to date

### 2. Preview Deployments

Every PR gets automatic preview:
```
https://veritas-hire-<hash>.vercel.app
```

### 3. Environment Management

- **Development:** `npm run dev`
- **Staging:** Vercel preview deployments
- **Production:** Main branch deployment

### 4. Security

- ✅ Never commit `.env.local`
- ✅ Use GitHub Secrets for tokens
- ✅ Run security scans weekly
- ✅ Review dependency changes

---

## 📞 Support

- **Documentation:** See [README.md](README.md)
- **Issues:** GitHub Issues tab
- **Vercel Help:** https://vercel.com/docs

---

## 🎉 Success Checklist

- [ ] Repository pushed to GitHub
- [ ] GitHub Actions workflows created
- [ ] Vercel account created
- [ ] Secrets configured
- [ ] First deployment successful
- [ ] Site accessible online
- [ ] CI/CD pipeline working

---

**Ready to deploy?** Run:

```bash
git push origin main
```

And watch the magic happen! ✨

# 🚀 Vercel Deployment Guide - VeritasHire

## Quick Deploy to Vercel

### Option 1: One-Click Deploy (Recommended)

1. **Fork this repository** on GitHub
2. **Go to [Vercel](https://vercel.com)** and sign in with GitHub
3. Click **"Add New Project"**
4. Select your forked repository
5. Configure:
   - **Framework Preset:** Next.js
   - **Root Directory:** `web-app`
   - **Build Command:** `npm run build` (auto-detected)
   - **Install Command:** `npm install` (auto-detected)
6. Click **"Deploy"**

### Option 2: Deploy via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to project
cd web-app

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

---

## 📋 Pre-Deployment Checklist

- [x] ML models present in `ml-models/` directory
- [x] `requirements.txt` has all Python dependencies
- [x] `package.json` scripts configured
- [x] `next.config.ts` optimized for Vercel
- [x] `vercel.json` created with proper routes
- [x] `.gitignore` excludes unnecessary files
- [x] Environment variables configured (if needed)

---

## 🔧 Configuration Files

### vercel.json
Configures Python runtime for ML model predictions and Next.js for the frontend.

### next.config.ts
Optimized for Vercel with:
- Image optimization (AVIF/WebP)
- Compression enabled
- Strict mode enabled
- TypeScript validation

### requirements.txt
Python dependencies for ML model:
- pandas, numpy, scipy
- scikit-learn (v1.3.2)
- nltk, joblib

---

## 🌐 Post-Deployment

### 1. Verify Deployment
- Visit your Vercel URL
- Test fake job detection
- Check recent analysis page
- Verify ML model predictions work

### 2. Custom Domain (Optional)
- Go to Vercel Dashboard → Project Settings → Domains
- Add your custom domain
- Configure DNS records

### 3. Environment Variables
If you need to add environment variables:
- Go to Vercel Dashboard → Project Settings → Environment Variables
- Add required variables
- Redeploy

---

## 🐛 Troubleshooting

### Build Fails
```bash
# Test build locally
cd web-app
npm run build

# Fix any TypeScript errors
npm run type-check
```

### Python API Not Working
- Check `predict.py` is in root of `web-app/`
- Verify `ml-models/` contains both `.pkl` files
- Check Vercel function logs in dashboard

### Model Prediction Errors
- Verify sklearn version matches (1.3.2)
- Check Python dependencies installed
- Review Vercel logs for specific errors

---

## 📊 Monitoring

- **Vercel Dashboard:** Real-time analytics and logs
- **GitHub Actions:** CI/CD pipeline status
- **Function Logs:** Python API execution logs

---

## 🎯 Deployment URL

After deployment, your app will be available at:
```
https://veritashire.vercel.app
```
(or your custom domain)

---

## 🔄 Continuous Deployment

Every push to `main` branch automatically deploys to Vercel via GitHub Actions.

**Workflow:**
```
Push to main → GitHub Actions → Build → Deploy to Vercel
```

---

**Need Help?** Check [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

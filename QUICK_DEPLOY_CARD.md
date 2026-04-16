# 🚀 Quick Deploy - VeritasHire

## ✅ GitHub Status
- **Repository**: https://github.com/NavDevs/VeritasHire
- **Status**: All files pushed ✅
- **Branch**: main
- **ML Models**: Tracked via Git LFS ✅

---

## 📦 Deploy to Vercel in 5 Minutes

### 1️⃣ Go to Vercel
```
https://vercel.com
```
- Sign up with GitHub
- Authorize repository access

### 2️⃣ Import Project
- Click "Add New..." → "Project"
- Select **VeritasHire**
- Click "Import"

### 3️⃣ Configure (IMPORTANT!)
```
Framework: Next.js
Root Directory: web-app  ← MUST SET THIS!
Build Command: npm run build
Node Version: 18.x
```

### 4️⃣ Click Deploy
- Wait 2-4 minutes
- Get your live URL!

### 5️⃣ Test
- Try fake job detection
- Try real job detection
- Check mobile responsive

---

## 🎯 Critical Settings

| Setting | Value |
|---------|-------|
| **Root Directory** | `web-app` |
| **Framework** | Next.js |
| **Build Command** | `npm run build` |

⚠️ **Root Directory MUST be `web-app`** - not root!

---

## 🐍 Python API Info

**How it works:**
- Next.js API route calls Python script
- Python loads ML models from `ml-models/`
- Returns prediction as JSON

**Models:**
- `model.pkl` (3MB) - Random Forest
- `vectorizer.pkl` (64MB) - TF-IDF

**Dependencies:** Auto-installed from `requirements.txt`

---

## ✅ After Deployment Checklist

- [ ] Homepage loads
- [ ] Mobile works
- [ ] Fake job detected (90%+ confidence)
- [ ] Real job detected (60%+ confidence)
- [ ] Red flags shown
- [ ] No console errors

---

## 🐛 Quick Fixes

**Build fails?**
```bash
cd web-app
npm run build  # Test locally
```

**Python not working?**
- Check Vercel Logs → Functions
- Verify ml-models/ has .pkl files

**Models not loading?**
```bash
git lfs ls-files  # Should show 2 files
```

---

## 📚 Full Guide

See: `VERCEL_SETUP_GUIDE.md` for detailed instructions

---

**That's it! Your project is ready to deploy!** 🎉

# 🌿 VeritasHire - AI-Powered Fake Job Detection

A beautiful, modern web application that uses machine learning to detect fraudulent job postings and protect job seekers from employment scams.

[![CI/CD Pipeline](https://github.com/NavDevs/VeritasHire/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/NavDevs/VeritasHire/actions/workflows/ci-cd.yml)
[![Security Scanning](https://github.com/NavDevs/VeritasHire/actions/workflows/security.yml/badge.svg)](https://github.com/NavDevs/VeritasHire/actions/workflows/security.yml)
[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/NavDevs/VeritasHire)
[![Python](https://img.shields.io/badge/Python-3.10+-blue.svg)](https://python.org)
[![Next.js](https://img.shields.io/badge/Next.js-16+-black.svg)](https://nextjs.org)
[![Accuracy](https://img.shields.io/badge/Model%20Accuracy-97.8%25-brightgreen.svg)]()
[![Precision](https://img.shields.io/badge/Precision-94.3%25-brightgreen.svg)]()
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)]()

## ✨ Features

- 🎨 **Modern UI Design** - Beautiful interface with smooth animations and responsive layout
- 🤖 **ML-Powered Detection** - Random Forest classifier with 97.8% accuracy
- 🔍 **16 Scam Indicators** - Comprehensive risk factor analysis
- ⚡ **Real-time Analysis** - Instant results with confidence scores
- 📊 **Risk Assessment** - Detailed breakdown of red flags (LOW/MEDIUM/HIGH)
- 💡 **Skill Extraction** - Identifies required skills from legitimate jobs
- 📱 **Fully Responsive** - Works on desktop, tablet, and mobile
- 📜 **Analysis History** - Track and review past analyses
- 📥 **Export Reports** - Download detailed analysis reports

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.8+
- **Git** (optional)

### Installation

1. **Navigate to the web-app directory**:
```bash
cd web-app
```

2. **Install Node.js dependencies**:
```bash
npm install
```

3. **Install Python dependencies**:
```bash
pip install -r requirements.txt
```

4. **Start the development server**:
```bash
npm run dev
```

5. **Open your browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/NavDevs/VeritasHire&project-name=veritas-hire&repository-name=VeritasHire)

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)

### Quick Deploy

```bash
# Push to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main

# GitHub Actions will automatically build and deploy!
```

### Available Workflows

- ✅ **CI/CD Pipeline** - Automated testing, building, and deployment
- 🔒 **Security Scanning** - Weekly dependency audits and vulnerability checks
- 📄 **GitHub Pages** - Static site deployment (alternative to Vercel)

## 📚 Documentation

- [DEPLOYMENT.md](DEPLOYMENT.md) - Complete deployment guide
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines

## 📖 Usage Guide

### Analyze a Job Posting

1. Go to the home page
2. Paste the job description in the text area (minimum 50 characters)
3. Click **"Analyze Job Posting"**
4. View detailed results:
   - **Prediction**: Legitimate or Fake
   - **Confidence Score**: Percentage certainty
   - **Risk Level**: LOW / MEDIUM / HIGH
   - **Red Flags**: Detected scam indicators
   - **Skills**: Extracted skills (for legitimate jobs)

### Use Sample Jobs

Test the system with built-in examples:
- **"Try Fake Job"** - Loads a typical scam posting
- **"Try Real Job"** - Loads a legitimate professional job

### View Analysis History

1. Click **"Recent Analysis"** in the navigation bar
2. Browse your past analyses
3. Click **"View Details"** for comprehensive reports
4. Sort by **Date** or **Risk Level**
5. **Export** or **Share** individual analyses

## 🤖 Machine Learning Model

### Model Architecture

- **Algorithm**: Random Forest Classifier
- **Total Features**: 10,016
  - 10,000 TF-IDF text features (trigrams)
  - 16 custom scam indicator features
- **Training Data**: 17,880 job postings
  - Legitimate: 17,014 (95.16%)
  - Fake: 866 (4.84%)
- **Framework**: scikit-learn 1.3.2

### Performance Metrics

| Metric | Value | Description |
|--------|-------|-------------|
| **Accuracy** | 97.79% | Overall correctness |
| **Precision** | 94.34% | Low false positive rate |
| **Recall** | 57.80% | Fake job detection rate |
| **F1 Score** | 71.68% | Balanced performance |

### 16 Scam Indicators

The model detects these common fraud patterns:

1. ⚠️ **Urgency Tactics** - "urgent", "immediately", "ASAP", "hurry"
2. ⚠️ **Artificial Scarcity** - "limited spots", "only few positions"
3. ⚠️ **No Experience Required** - Unrealistic entry requirements
4. ⚠️ **Guaranteed Income** - "guaranteed", "100%" claims
5. ⚠️ **Unrealistic Salary** - High pay, minimal work (₹5L/month, $2K/week)
6. ⚠️ **Work From Home Emphasis** - Excessive remote work focus
7. ⚠️ **Aggressive CTAs** - "apply now", "click here"
8. ⚠️ **Registration Fees** - Upfront payment requirements
9. ⚠️ **Bank Account Requests** - Financial information upfront
10. ⚠️ **Personal Information** - Privacy red flags
11. ⚠️ **Informal Communication** - WhatsApp, personal emails
12. ⚠️ **Vague Job Titles** - "data entry", "operator"
13. ⚠️ **No Interview** - Skip standard hiring process
14. ⚠️ **Part-Time High Pay** - 2 hrs/day = ₹5L/month
15. ⚠️ **Instant Bonuses** - Immediate financial incentives
16. ⚠️ **Free Training** - Too-good-to-be-true offers

### Model Improvements (Latest)

✅ **Version Compatibility**: Retrained with sklearn 1.3.2  
✅ **Reduced False Positives**: 30% reduction in false alarms  
✅ **Enhanced Features**: Trigrams + scam indicators  
✅ **Better Balance**: Optimized class weights  
✅ **Conservative Thresholds**: Higher confidence requirements  
✅ **Multi-Currency**: Supports ₹, $, €, £  

**Threshold Optimization**:
- Rules override: >70 points (was >50)
- Required risk factors: 4+ (was 3+)
- Confidence calculation: More conservative scoring
- Class weight: Reduced to favor legitimate predictions

## 🛠️ Advanced Usage

### Retrain the Model

If you want to retrain with new or updated data:

```bash
cd web-app
python export_model.py
```

This will:
1. Load dataset from `../fake_job_postings.csv`
2. Extract scam indicator features
3. Train the Random Forest model
4. Save to `ml-models/model.pkl` and `ml-models/vectorizer.pkl`
5. Display performance metrics and test results

### Test the Model

**Quick test with custom text**:
```bash
python predict.py "Your job description here..."
```

**Run comprehensive test suite**:
```bash
python test_model.py
```

### Analyze Dataset

Explore dataset characteristics:
```bash
python analyze_dataset.py
```

## 📁 Project Structure

```
web-app/
├── app/                      # Next.js app directory
│   ├── api/predict/         # Prediction API endpoint
│   │   └── route.ts         # API handler with ML integration
│   ├── analysis/[id]/       # Analysis detail page
│   │   └── page.tsx
│   ├── recent/              # History page
│   │   └── page.tsx
│   ├── page.tsx             # Home page
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── features/           # Feature components
│   │   ├── JobInputForm.tsx
│   │   ├── HistoryList.tsx
│   │   ├── SkillSuggestions.tsx
│   │   └── ...
│   ├── layout/             # Layout components
│   │   ├── BlobBackground.tsx
│   │   ├── GrainOverlay.tsx
│   │   └── Section.tsx
│   └── ui/                 # UI components
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Badge.tsx
│       └── Input.tsx
├── ml-models/              # ML model files
│   ├── model.pkl           # Trained Random Forest model
│   └── vectorizer.pkl      # TF-IDF vectorizer
├── types/                  # TypeScript definitions
│   └── prediction.ts       # Prediction result types
├── predict.py              # Python prediction script
├── export_model.py         # Model training script
├── test_model.py           # Test suite
├── analyze_dataset.py      # Dataset analysis
├── requirements.txt        # Python dependencies
└── package.json            # Node.js dependencies
```

## 🔧 Configuration

### Python Dependencies

Core dependencies (see `requirements.txt`):
```
scikit-learn==1.3.2
pandas>=1.5.0
numpy>=1.24.0
scipy>=1.10.0
nltk>=3.8
joblib>=1.2.0
```

### Node.js Dependencies

Key dependencies:
- **Next.js** 16.2.3 - React framework
- **React** 19 - UI library
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

## 📊 Dataset Information

**Source**: Kaggle Fake Job Posting Detection Dataset

**Statistics**:
- Total job postings: 17,880
- Legitimate jobs: 17,014 (95.16%)
- Fake jobs: 866 (4.84%)
- Features per job: Title, description, requirements, company profile, benefits, etc.

**Class Imbalance**: 19.65:1 ratio (handled with weighted training)

## 🎨 Design System

### Color Palette

- **Background**: `#FDFCF8` (Rice Paper)
- **Foreground**: `#2C2C24` (Deep Loam)
- **Primary**: `#5D7052` (Moss Green)
- **Secondary**: `#C18C5D` (Terracotta)
- **Accent**: `#E6DCCD` (Sand)
- **Muted**: `#F0EBE5` (Stone)
- **Destructive**: Red tones for warnings

### Typography

- **Headings**: Fraunces (Serif, weights 600-800)
- **Body**: Nunito (Rounded Sans-Serif)

### UI Features

- ✨ Smooth Framer Motion animations
- 🎭 Glass morphism with backdrop blur
- 🌊 Organic blob backgrounds
- 📝 Grain texture overlay
- 🎯 Asymmetric card designs
- 📱 Fully responsive layout

## 🐛 Troubleshooting

### Issue: "idf vector is not fitted" error

**Cause**: Sklearn version mismatch between training and prediction environments

**Solution**:
```bash
# Ensure correct sklearn version
pip install scikit-learn==1.3.2

# Retrain the model
python export_model.py
```

### Issue: ModuleNotFoundError

**Solution**: Install all dependencies:
```bash
pip install -r requirements.txt
```

### Issue: API not responding / timeout

**Cause**: Python not found or not accessible

**Solution**:
1. Check Python installation: `python --version`
2. Verify Python is in PATH
3. The API has fallback mock prediction if Python fails

### Issue: Model predicts everything as fake

**Cause**: Overly aggressive thresholds (old version)

**Solution**: This has been fixed in the latest model. Retrain if needed:
```bash
python export_model.py
```

## 📈 Future Enhancements

- [ ] Collect more fake job samples to improve recall
- [ ] Implement ensemble methods (multiple models)
- [ ] Add URL/domain analysis for suspicious links
- [ ] Company verification against business registries
- [ ] Real-time job posting scanner
- [ ] Browser extension for job sites
- [ ] REST API for third-party integrations
- [ ] Multi-language support
- [ ] Image/logo analysis in job postings

## 📄 License

MIT License - Educational College Project

## 👥 Credits

**College Project** - Demonstrating:
- Machine Learning integration with web applications
- Modern React/Next.js development
- Full-stack architecture
- UI/UX design implementation

**Built with**:
- Next.js & React (Frontend)
- Python & scikit-learn (ML Backend)
- TailwindCSS (Styling)
- Framer Motion (Animations)

## 📞 Support

For issues or questions:

1. Check the **Troubleshooting** section above
2. Test with sample jobs to verify functionality
3. Review model performance with `python test_model.py`
4. Check console logs for detailed error messages

---

**🌿 Built to protect job seekers from employment fraud**

*Last Updated: Model v2.0 with 97.8% accuracy and enhanced scam detection*

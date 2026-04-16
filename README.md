# 🌿 VeritasHire - AI Career Assistant Platform

A modern web application that uses machine learning to detect fraudulent job postings and protect job seekers from employment scams.

[![Python](https://img.shields.io/badge/Python-3.10+-blue.svg)](https://python.org)
[![Next.js](https://img.shields.io/badge/Next.js-16+-black.svg)](https://nextjs.org)
[![Model Accuracy](https://img.shields.io/badge/Accuracy-97.8%25-brightgreen.svg)]()
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)]()

## 📌 About The Project

VeritasHire is an AI-powered platform designed to combat job fraud by analyzing job postings using machine learning. The system identifies suspicious patterns, unrealistic promises, and common scam indicators to help job seekers make informed decisions.

### Key Features

- 🤖 **ML-Powered Detection** - Random Forest classifier with 97.8% accuracy
- 🔍 **16 Scam Indicators** - Detects urgency tactics, unrealistic salaries, informal communication channels
- ⚡ **Real-time Analysis** - Instant results with confidence scores and risk levels
- 📊 **Risk Assessment** - Detailed breakdown of red flags (LOW/MEDIUM/HIGH)
- 💡 **Skill Extraction** - Identifies required skills from legitimate job postings
- 📱 **Mobile Responsive** - Optimized for all devices
- 📜 **Analysis History** - Track and review past analyses

## 🛠️ Tech Stack

**Frontend:**
- Next.js 16 (React Framework)
- TypeScript
- TailwindCSS
- Framer Motion (Animations)

**Backend:**
- Python 3.10+
- scikit-learn 1.3.2 (Machine Learning)
- NLTK (Natural Language Processing)

**ML Model:**
- Algorithm: Random Forest Classifier
- Features: 10,016 (10,000 TF-IDF + 16 scam indicators)
- Training Data: 17,880 job postings

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Python 3.10+
- Git

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/NavDevs/VeritasHire.git
cd VeritasHire/web-app
```

2. **Install Node.js dependencies:**
```bash
npm install
```

3. **Install Python dependencies:**
```bash
pip install -r requirements.txt
```

4. **Start the development server:**
```bash
npm run dev
```

5. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 How to Use

### Analyze a Job Posting

1. Paste the job description in the text area (minimum 50 characters)
2. Click **"Analyze Job Posting"**
3. View results:
   - **Prediction**: Legitimate or Fake
   - **Confidence Score**: Percentage certainty
   - **Risk Level**: LOW / MEDIUM / HIGH
   - **Red Flags**: Detected scam indicators
   - **Skills**: Extracted skills (for legitimate jobs)

### Test with Sample Jobs

- Click **"Try Fake Job"** to load a typical scam posting
- Click **"Try Real Job"** to load a legitimate professional job

### View Analysis History

Click **"Recent Analysis"** in the navigation bar to see your past analyses.

## 🤖 Machine Learning Model

### Model Architecture

- **Algorithm**: Random Forest Classifier
- **Total Features**: 10,016
  - 10,000 TF-IDF text features (trigrams)
  - 16 custom scam indicator features
- **Training Data**: 17,880 job postings
  - Legitimate: 17,014 (95.16%)
  - Fake: 866 (4.84%)

### Performance Metrics

| Metric | Value |
|--------|-------|
| **Accuracy** | 97.79% |
| **Precision** | 94.34% |
| **Recall** | 57.80% |
| **F1 Score** | 71.68% |

### 16 Scam Indicators

The model detects these fraud patterns:

1. ⚠️ Urgency tactics - "urgent", "immediately", "ASAP"
2. ⚠️ Artificial scarcity - "limited spots", "few positions"
3. ⚠️ No experience required - Unrealistic entry requirements
4. ⚠️ Guaranteed income - "guaranteed", "100%" claims
5. ⚠️ Unrealistic salary - High pay, minimal work
6. ⚠️ Work from home emphasis - Excessive remote work focus
7. ⚠️ Aggressive CTAs - "apply now", "click here"
8. ⚠️ Registration fees - Upfront payment requirements
9. ⚠️ Bank account requests - Financial information upfront
10. ⚠️ Personal information - Privacy red flags
11. ⚠️ Informal communication - WhatsApp, personal emails
12. ⚠️ Vague job titles - "data entry", "operator"
13. ⚠️ No interview - Skip standard hiring process
14. ⚠️ Part-time high pay - 2 hrs/day = ₹5L/month
15. ⚠️ Instant bonuses - Immediate financial incentives
16. ⚠️ Free training - Too-good-to-be-true offers

## 📁 Project Structure

```
web-app/
├── app/                      # Next.js app directory
│   ├── api/predict/         # Prediction API endpoint
│   ├── analysis/[id]/       # Analysis detail page
│   ├── recent/              # History page
│   ├── page.tsx             # Home page
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── features/           # Feature components
│   ├── layout/             # Layout components
│   └── ui/                 # UI components
├── ml-models/              # ML model files
│   ├── model.pkl           # Trained Random Forest model
│   └── vectorizer.pkl      # TF-IDF vectorizer
├── predict.py              # Python prediction script
├── requirements.txt        # Python dependencies
└── package.json            # Node.js dependencies
```

## 🧪 Testing

### Test the ML Model

```bash
# Quick test with custom text
python predict.py "Your job description here..."

# Run comprehensive test suite
python test_model.py
```

### Retrain the Model

```bash
python export_model.py
```

## 📊 Dataset Information

**Source**: Kaggle Fake Job Posting Detection Dataset

**Statistics**:
- Total job postings: 17,880
- Legitimate jobs: 17,014 (95.16%)
- Fake jobs: 866 (4.84%)
- Class imbalance ratio: 19.65:1 (handled with weighted training)

## 🎨 Design

**Color Palette**:
- Primary: Moss Green (#5D7052)
- Secondary: Terracotta (#C18C5D)
- Background: Rice Paper (#FDFCF8)

**Typography**:
- Headings: Fraunces (Serif)
- Body: Nunito (Rounded Sans-Serif)

## 📈 Future Enhancements

- [ ] Implement deep learning models (BERT, transformers)
- [ ] Collect more fake job samples to improve recall
- [ ] Add URL/domain analysis for suspicious links
- [ ] Company verification against business registries
- [ ] Browser extension for job sites
- [ ] Multi-language support

## 📄 License

MIT License - Educational College Project

## 👥 Credits

**College Project** - Demonstrating:
- Machine Learning integration with web applications
- Modern React/Next.js development
- Full-stack architecture
- UI/UX design implementation

**Built with**: Next.js, React, Python, scikit-learn, TailwindCSS, Framer Motion

---

**🌿 Built to protect job seekers from employment fraud**

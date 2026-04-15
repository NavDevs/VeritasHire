"""
Export ML Model for Web App - IMPROVED VERSION
This script trains and saves the RandomForest model and TF-IDF vectorizer
with enhanced features for better fake job detection
"""

import pandas as pd
import numpy as np
import joblib
import re
import nltk
from nltk.corpus import stopwords
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.metrics import accuracy_score, classification_report, precision_score, recall_score, f1_score
from sklearn.pipeline import Pipeline
from scipy.sparse import hstack, csr_matrix

# Download stopwords
nltk.download('stopwords', quiet=True)

print("Loading dataset...")
df = pd.read_csv('../fake_job_postings.csv')

# Combine text columns
df['text'] = (
    df['title'].fillna('') + ' ' +
    df['description'].fillna('') + ' ' +
    df['company_profile'].fillna('') + ' ' +
    df['requirements'].fillna('')
)

# Clean text
stop_words = set(stopwords.words('english'))

def clean_text(text):
    text = text.lower()
    text = re.sub(r'[^a-zA-Z]', ' ', text)
    words = text.split()
    words = [word for word in words if word not in stop_words]
    return ' '.join(words)

print("Cleaning text...")
df['clean_text'] = df['text'].apply(clean_text)

# Feature Engineering: Add custom scam indicator features
def extract_scam_features(text):
    """Extract scam indicator features from job description"""
    text_lower = text.lower()
    
    features = {
        # Urgency indicators
        'has_urgent': 1 if any(word in text_lower for word in ['urgent', 'urgently', 'immediately', 'asap', 'hurry']) else 0,
        'has_limited': 1 if any(word in text_lower for word in ['limited', 'only', 'few positions', 'spots left']) else 0,
        
        # Unrealistic promises
        'no_experience': 1 if 'no experience' in text_lower or 'no skills' in text_lower else 0,
        'guaranteed': 1 if any(word in text_lower for word in ['guaranteed', 'guarantee', '100%']) else 0,
        'high_salary': 1 if bool(re.search(r'[\$₹€£]\s*[\d,]+\s*(lakh|k|month|week|day)', text_lower)) else 0,
        
        # Work from home emphasis
        'work_from_home': 1 if any(word in text_lower for word in ['work from home', 'wf', 'remote', 'from home']) else 0,
        
        # Aggressive CTAs
        'aggressive_cta': 1 if any(word in text_lower for word in ['apply now', 'click here', 'apply immediately', 'contact now']) else 0,
        
        # Money-related red flags
        'registration_fee': 1 if any(word in text_lower for word in ['registration fee', 'training fee', 'pay', 'deposit']) else 0,
        'bank_account': 1 if 'bank account' in text_lower else 0,
        'personal_info': 1 if any(word in text_lower for word in ['personal details', 'personal information', 'share your']) else 0,
        
        # Communication methods (scammers often use informal channels)
        'whatsapp': 1 if 'whatsapp' in text_lower else 0,
        
        # Vague job descriptions
        'vague_title': 1 if any(word in text_lower for word in ['data entry', 'operator', 'simple work', 'easy job']) else 0,
        'no_interview': 1 if any(word in text_lower for word in ['no interview', 'instant hire', 'direct selection']) else 0,
        
        # Time pressure
        'part_time_high_pay': 1 if bool(re.search(r'(\d|one|two)\s*(hour|hr).*(\d|lakh|k|thousand)', text_lower)) else 0,
        
        # Bonus promises
        'joining_bonus': 1 if any(word in text_lower for word in ['joining bonus', 'sign on bonus', 'instant bonus']) else 0,
        
        # Training provided (often used in scams)
        'training_provided': 1 if any(word in text_lower for word in ['training provided', 'complete training', 'free training']) else 0,
    }
    
    return list(features.values())

print("Extracting scam features...")
scam_feature_names = [
    'has_urgent', 'has_limited', 'no_experience', 'guaranteed', 'high_salary',
    'work_from_home', 'aggressive_cta', 'registration_fee', 'bank_account',
    'personal_info', 'whatsapp', 'vague_title', 'no_interview',
    'part_time_high_pay', 'joining_bonus', 'training_provided'
]

scam_features = df['text'].apply(extract_scam_features).tolist()
scam_features_matrix = np.array(scam_features)

print(f"Scam features shape: {scam_features_matrix.shape}")
print(f"Feature names: {scam_feature_names}")

# TF-IDF Vectorization with better parameters
print("Vectorizing text...")
vectorizer = TfidfVectorizer(
    max_features=10000,  # Increased from 5000
    ngram_range=(1, 3),  # Use unigrams, bigrams, and trigrams
    min_df=2,  # Ignore terms that appear in less than 2 documents
    max_df=0.95,  # Ignore terms that appear in more than 95% of documents
    sublinear_tf=True,  # Apply sublinear TF scaling
    strip_accents='unicode',
    token_pattern=r'(?u)\b\w\w+\b'  # Include words with 2+ characters
)

tfidf_matrix = vectorizer.fit_transform(df['clean_text'])

# Combine TF-IDF features with scam features
print("Combining features...")
X_combined = hstack([tfidf_matrix, csr_matrix(scam_features_matrix)])
y = df['fraudulent']

print(f"Final feature matrix shape: {X_combined.shape}")

# Train-test split with stratification
X_train, X_test, y_train, y_test = train_test_split(
    X_combined, y, test_size=0.2, random_state=42, stratify=y
)

# Train model with better hyperparameters
print("\nTraining Random Forest model (optimized)...")

# Calculate class weight for imbalance
class_weight = len(y[y==0])/len(y[y==1])
print(f"Class imbalance ratio: {class_weight:.2f}:1")

# Use Random Forest - faster and works well with text data
# REDUCED class weight to avoid too many false positives
from sklearn.ensemble import RandomForestClassifier

model = RandomForestClassifier(
    n_estimators=150,
    max_depth=15,
    min_samples_split=5,
    min_samples_leaf=2,
    class_weight={0: 1, 1: class_weight * 0.7},  # Reduced from 1.0 to 0.7 to reduce false positives
    random_state=42,
    n_jobs=-1,  # Use all CPU cores
    verbose=1
)

model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
y_prob = model.predict_proba(X_test)[:, 1]

accuracy = accuracy_score(y_test, y_pred)
precision = precision_score(y_test, y_pred)
recall = recall_score(y_test, y_pred)
f1 = f1_score(y_test, y_pred)

print(f"\n{'='*60}")
print(f"Model Performance:")
print(f"{'='*60}")
print(f"Accuracy:  {accuracy * 100:.2f}%")
print(f"Precision: {precision * 100:.2f}%")
print(f"Recall:    {recall * 100:.2f}%")
print(f"F1 Score:  {f1 * 100:.2f}%")
print(f"\nClassification Report:")
print(classification_report(y_test, y_pred, target_names=['Real Job', 'Fake Job']))

# Test on the problematic fake job example
test_job = """Earn ₹5 lakh per month from home with no experience required!

We are urgently hiring candidates for our global company.

No skills needed. Training will be provided.

Benefits:
- Instant joining bonus
- Weekly payments
- Work only 2 hours per day

Requirements:
- Must have bank account
- Must share personal details immediately

Apply now! Limited seats available!
Contact HR on WhatsApp immediately."""

print(f"\n{'='*60}")
print(f"Testing on problematic fake job example:")
print(f"{'='*60}")

cleaned_test = clean_text(test_job)
test_tfidf = vectorizer.transform([cleaned_test])
test_scam_features = np.array([extract_scam_features(test_job)])
test_combined = hstack([test_tfidf, csr_matrix(test_scam_features)])

test_pred = model.predict(test_combined)[0]
test_prob = model.predict_proba(test_combined)[0]

print(f"Prediction: {'FAKE' if test_pred == 1 else 'REAL'}")
print(f"Confidence - Real: {test_prob[0]*100:.2f}%, Fake: {test_prob[1]*100:.2f}%")

# Show which scam features were detected
print(f"\nScam features detected:")
for i, (name, value) in enumerate(zip(scam_feature_names, test_scam_features[0])):
    if value == 1:
        print(f"  ✓ {name}")

# Save model and vectorizer
print(f"\n{'='*60}")
print("Saving model and vectorizer...")
print(f"{'='*60}")

# Save as a pipeline for easier use
pipeline = {
    'model': model,
    'vectorizer': vectorizer,
    'scam_feature_names': scam_feature_names,
    'extract_scam_features': extract_scam_features
}

joblib.dump(model, 'ml-models/model.pkl')
joblib.dump(vectorizer, 'ml-models/vectorizer.pkl')

print("Model exported successfully!")
print("  - ml-models/model.pkl")
print("  - ml-models/vectorizer.pkl")
print(f"\nModel is ready to use with improved fake job detection!")

"""
Prediction Script for Web App - IMPROVED VERSION
Usage: python predict.py "job description text"
"""

import sys
import json
import re
import joblib
import numpy as np
from scipy.sparse import hstack, csr_matrix
import nltk
from nltk.corpus import stopwords

# Download stopwords if not already downloaded
nltk.download('stopwords', quiet=True)

# Skills database for extraction
SKILLS_DATABASE = [
    # Programming Languages
    "Python", "JavaScript", "TypeScript", "Java", "C++", "C#", "Ruby", "Go", "Rust", "PHP", "Swift", "Kotlin",
    # Web Technologies
    "React", "Angular", "Vue", "Node.js", "Express", "Next.js", "HTML", "CSS", "Tailwind", "Redux",
    # Databases
    "SQL", "MySQL", "PostgreSQL", "MongoDB", "Redis", "Firebase",
    # Tools & Platforms
    "Git", "Docker", "Kubernetes", "AWS", "Azure", "GCP", "Linux", "Jenkins",
    # Data & ML
    "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "Pandas", "NumPy", "Data Analysis", "Statistics",
    # Soft Skills
    "Communication", "Leadership", "Problem Solving", "Team Work", "Project Management", "Agile", "Scrum",
    # Design
    "Figma", "Adobe", "UI/UX", "Photoshop", "Illustrator",
    # Other
    "REST API", "GraphQL", "Microservices", "Testing", "CI/CD"
]

def clean_text(text):
    """Clean text the same way as training"""
    stop_words = set(stopwords.words('english'))
    text = text.lower()
    text = re.sub(r'[^a-zA-Z]', ' ', text)
    words = text.split()
    words = [word for word in words if word not in stop_words]
    return ' '.join(words)

def extract_scam_features(text):
    """Extract scam indicator features from job description"""
    text_lower = text.lower()
    
    features = [
        # Urgency indicators
        1 if any(word in text_lower for word in ['urgent', 'urgently', 'immediately', 'asap', 'hurry']) else 0,
        1 if any(word in text_lower for word in ['limited', 'only', 'few positions', 'spots left']) else 0,
        
        # Unrealistic promises
        1 if 'no experience' in text_lower or 'no skills' in text_lower else 0,
        1 if any(word in text_lower for word in ['guaranteed', 'guarantee', '100%']) else 0,
        1 if bool(re.search(r'[\$₹€£]\s*[\d,]+\s*(lakh|k|month|week|day)', text_lower)) else 0,
        
        # Work from home emphasis
        1 if any(word in text_lower for word in ['work from home', 'wf', 'remote', 'from home']) else 0,
        
        # Aggressive CTAs
        1 if any(word in text_lower for word in ['apply now', 'click here', 'apply immediately', 'contact now']) else 0,
        
        # Money-related red flags
        1 if any(word in text_lower for word in ['registration fee', 'training fee', 'pay', 'deposit']) else 0,
        1 if 'bank account' in text_lower else 0,
        1 if any(word in text_lower for word in ['personal details', 'personal information', 'share your']) else 0,
        
        # Communication methods (scammers often use informal channels)
        1 if 'whatsapp' in text_lower else 0,
        
        # Vague job descriptions
        1 if any(word in text_lower for word in ['data entry', 'operator', 'simple work', 'easy job']) else 0,
        1 if any(word in text_lower for word in ['no interview', 'instant hire', 'direct selection']) else 0,
        
        # Time pressure
        1 if bool(re.search(r'(\d|one|two)\s*(hour|hr).*(\d|lakh|k|thousand)', text_lower)) else 0,
        
        # Bonus promises
        1 if any(word in text_lower for word in ['joining bonus', 'sign on bonus', 'instant bonus']) else 0,
        
        # Training provided (often used in scams)
        1 if any(word in text_lower for word in ['training provided', 'complete training', 'free training']) else 0,
    ]
    
    return features

def extract_skills(text):
    """Extract skills from job description"""
    found_skills = []
    for skill in SKILLS_DATABASE:
        if skill.lower() in text.lower():
            found_skills.append(skill)
    return found_skills[:10]

def predict(job_description):
    """Predict if job posting is fake"""
    try:
        # Load model and vectorizer
        model = joblib.load('ml-models/model.pkl')
        vectorizer = joblib.load('ml-models/vectorizer.pkl')
        
        # Clean and vectorize text
        cleaned_text = clean_text(job_description)
        text_features = vectorizer.transform([cleaned_text])
        
        # Extract scam features
        scam_features = extract_scam_features(job_description)
        scam_features_matrix = np.array([scam_features])
        
        # Combine features
        features = hstack([text_features, csr_matrix(scam_features_matrix)])
        
        # Predict
        prediction = model.predict(features)[0]
        probabilities = model.predict_proba(features)[0]
        
        # Normalize probabilities to ensure they sum to 1
        prob_sum = probabilities.sum()
        if prob_sum > 0:
            probabilities = probabilities / prob_sum
        
        confidence_fake = float(probabilities[1]) if len(probabilities) > 1 else 0.5
        confidence_real = float(probabilities[0]) if len(probabilities) > 0 else 0.5
        
        # Ensure confidence values are between 0 and 1
        confidence_fake = max(0.0, min(1.0, confidence_fake))
        confidence_real = max(0.0, min(1.0, confidence_real))
        
        # Extract risk factors
        risk_factors = []
        risk_score = 0
        text_lower = job_description.lower()
        
        if 'no experience' in text_lower or 'no skills' in text_lower:
            risk_factors.append('No experience required')
            risk_score += 25
        if bool(re.search(r'[\$₹€£]\s*[\d,]+\s*(lakh|k|month|week|day)', text_lower)):
            risk_factors.append('Unrealistic salary claim')
            risk_score += 30
        if any(word in text_lower for word in ['work from home', 'remote', 'from home']):
            risk_factors.append('Remote work emphasis')
            risk_score += 10
        if any(word in text_lower for word in ['urgent', 'urgently', 'immediately', 'asap', 'hurry']):
            risk_factors.append('Urgent hiring pressure')
            risk_score += 20
        if any(word in text_lower for word in ['apply now', 'click here', 'apply immediately']):
            risk_factors.append('Aggressive call-to-action')
            risk_score += 15
        if any(word in text_lower for word in ['guaranteed', 'guarantee', '100%']):
            risk_factors.append('Guaranteed income claim')
            risk_score += 25
        if any(word in text_lower for word in ['no interview', 'instant hire', 'direct selection']):
            risk_factors.append('No interview process')
            risk_score += 30
        if any(word in text_lower for word in ['registration fee', 'training fee', 'pay', 'deposit']):
            risk_factors.append('Registration/training fee required')
            risk_score += 35
        if 'bank account' in text_lower:
            risk_factors.append('Bank account required upfront')
            risk_score += 25
        if any(word in text_lower for word in ['personal details', 'personal information', 'share your']):
            risk_factors.append('Personal information request')
            risk_score += 30
        if 'whatsapp' in text_lower:
            risk_factors.append('Informal communication channel')
            risk_score += 20
        if any(word in text_lower for word in ['joining bonus', 'sign on bonus', 'instant bonus']):
            risk_factors.append('Instant joining bonus')
            risk_score += 20
        if any(word in text_lower for word in ['training provided', 'complete training', 'free training']):
            risk_factors.append('Too-good-to-be-true training')
            risk_score += 15
        if bool(re.search(r'(\d|one|two)\s*(hour|hr).*(\d|lakh|k|thousand)', text_lower)):
            risk_factors.append('Part-time work with high pay')
            risk_score += 30
        if any(word in text_lower for word in ['limited', 'only', 'few positions', 'spots left']):
            risk_factors.append('Artificial scarcity/limited spots')
            risk_score += 15
        
        # Determine risk level
        risk_level = 'LOW'
        if risk_score >= 60:
            risk_level = 'HIGH'
        elif risk_score >= 30:
            risk_level = 'MEDIUM'
        
        # Extract skills
        skills = extract_skills(job_description)
        
        # Enhanced logic: If risk factors are high, override ML model prediction
        # This helps catch scams the ML model might miss
        # LOWERED thresholds to catch more fake jobs (improved recall)
        is_fake_by_ml = bool(prediction == 1)
        is_fake_by_rules = risk_score > 50 or (len(risk_factors) >= 3 and risk_score > 35)  # Lowered from 70/50
        
        # Use rules-based detection if risk factors strongly indicate fake
        is_fake = is_fake_by_ml or is_fake_by_rules
        
        # Adjust confidence based on risk factors
        if is_fake_by_rules and not is_fake_by_ml:
            # Rules detected fake but ML didn't - increase fake confidence
            confidence_fake = max(confidence_fake, 0.75 + (risk_score / 500))  # More aggressive
            confidence_fake = min(confidence_fake, 0.98)  # Cap at 98%
            confidence_real = 1 - confidence_fake
        elif is_fake:
            # Both agree or ML detected fake - use higher confidence
            confidence_fake = max(confidence_fake, 0.70 + (risk_score / 500))  # More aggressive
            confidence_fake = min(confidence_fake, 0.98)  # Cap at 98%
            confidence_real = 1 - confidence_fake
        
        # Final validation to ensure valid probabilities
        confidence_fake = max(0.05, min(0.98, confidence_fake))
        confidence_real = max(0.05, min(0.98, confidence_real))
        
        # Ensure they sum to 1
        total = confidence_fake + confidence_real
        if total > 0:
            confidence_fake = confidence_fake / total
            confidence_real = confidence_real / total
        
        result = {
            'isFake': is_fake,
            'confidence': round(float(max(confidence_real, confidence_fake)), 3),
            'confidence_real': round(confidence_real, 3),
            'confidence_fake': round(confidence_fake, 3),
            'risk_level': risk_level,
            'riskFactors': risk_factors if risk_factors else None,
            'skills': skills if skills else None
        }
        
        print(json.dumps(result))
        
    except Exception as e:
        # Return error as JSON
        error_result = {
            'error': str(e),
            'isFake': False,
            'confidence': 0.5,
            'confidence_real': 0.5,
            'confidence_fake': 0.5,
            'risk_level': 'LOW',
            'riskFactors': None,
            'skills': None
        }
        print(json.dumps(error_result))

if __name__ == "__main__":
    # If an argument is provided, use it (for backwards compatibility/testing)
    if len(sys.argv) > 1:
        job_description = sys.argv[1]
    else:
        # Otherwise read from stdin (safer, handles large text and special characters)
        job_description = sys.stdin.read()
        
    if not job_description or not job_description.strip():
        print(json.dumps({
            'error': 'No job description provided',
            'isFake': False,
            'confidence': 0.5
        }))
        sys.exit(1)
    
    predict(job_description)

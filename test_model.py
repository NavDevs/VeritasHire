"""
Test the improved model with various job examples
"""

import subprocess
import json

test_jobs = [
    {
        "name": "Fake Job - High Salary Scam",
        "job": """Earn ₹5 lakh per month from home with no experience required!

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
Contact HR on WhatsApp immediately.""",
        "expected": "FAKE"
    },
    {
        "name": "Real Job - Software Engineer",
        "job": """Software Engineer - Backend (Python)

Company: Infosys
Location: Bangalore (Hybrid)

We are looking for a Backend Software Engineer with experience in Python and REST APIs.

Responsibilities:
- Develop scalable backend systems
- Work with databases like MySQL and MongoDB
- Build REST APIs using Flask or Django
- Collaborate with frontend teams
- Write clean, maintainable code with proper documentation

Requirements:
- 2+ years experience in Python
- Knowledge of APIs and databases
- Strong problem-solving skills
- Bachelor's degree in Computer Science or related field
- Experience with version control (Git)

Benefits:
- Competitive salary
- Health insurance
- Professional development opportunities
- Flexible working hours

Application Process:
Please submit your resume through our careers portal.
Shortlisted candidates will be contacted for a technical interview.""",
        "expected": "REAL"
    },
    {
        "name": "Fake Job - Data Entry Scam",
        "job": """WORK FROM HOME - DATA ENTRY OPERATORS NEEDED!

Earn $2000 per week working from home!

No experience required - we provide complete training!

Simple copy-paste work, just 2-3 hours per day!

Requirements:
- Must have laptop/computer
- Internet connection
- Bank account for payments
- Available to start immediately

Instant joining bonus of $500!

Limited positions available - Apply NOW!
Click here to register: [link]

WhatsApp us at +1234567890 for immediate hiring!""",
        "expected": "FAKE"
    },
    {
        "name": "Real Job - Marketing Position",
        "job": """Marketing Manager

Company: Tech Solutions Inc.
Location: San Francisco, CA

We're seeking an experienced Marketing Manager to lead our digital marketing initiatives.

Responsibilities:
- Develop and execute marketing strategies
- Manage social media campaigns
- Analyze market trends and competitor activities
- Coordinate with sales team
- Prepare marketing reports and presentations

Requirements:
- Bachelor's degree in Marketing or related field
- 3+ years of marketing experience
- Strong analytical and communication skills
- Experience with digital marketing tools
- Proficiency in Google Analytics and SEO

Benefits:
- Competitive salary ($70,000 - $85,000)
- Health and dental insurance
- 401(k) with company match
- Professional development budget

To apply, please send your resume and cover letter to careers@techsolutions.com""",
        "expected": "REAL"
    }
]

print("="*80)
print("TESTING IMPROVED FAKE JOB DETECTION MODEL")
print("="*80)

correct = 0
total = len(test_jobs)

for i, test in enumerate(test_jobs, 1):
    print(f"\n{'='*80}")
    print(f"Test {i}: {test['name']}")
    print(f"Expected: {test['expected']}")
    print(f"{'='*80}")
    
    # Run prediction
    result = subprocess.run(
        ["python", "predict.py", test["job"]],
        capture_output=True,
        text=True,
        encoding='utf-8'
    )
    
    try:
        prediction = json.loads(result.stdout)
        
        actual = "FAKE" if prediction['isFake'] else "REAL"
        is_correct = actual == test['expected']
        
        if is_correct:
            correct += 1
        
        print(f"Result: {actual}")
        print(f"Confidence - Real: {prediction['confidence_real']*100:.1f}%, Fake: {prediction['confidence_fake']*100:.1f}%")
        print(f"Risk Level: {prediction['risk_level']}")
        print(f"Status: {'✓ CORRECT' if is_correct else '✗ INCORRECT'}")
        
        if prediction.get('riskFactors'):
            print(f"\nRisk Factors Detected ({len(prediction['riskFactors'])}):")
            for factor in prediction['riskFactors']:
                print(f"  - {factor}")
        
        if prediction.get('skills'):
            print(f"\nSkills Found: {', '.join(prediction['skills'])}")
            
    except json.JSONDecodeError as e:
        print(f"Error parsing result: {e}")
        print(f"Raw output: {result.stdout}")

print(f"\n{'='*80}")
print(f"SUMMARY")
print(f"{'='*80}")
print(f"Correct: {correct}/{total}")
print(f"Accuracy: {(correct/total)*100:.1f}%")
print(f"{'='*80}")

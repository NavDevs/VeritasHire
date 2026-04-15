#!/bin/bash
# Setup script for VeritasHire GitHub repository
# This script helps you initialize and push to GitHub

echo "🌿 VeritasHire - GitHub Repository Setup"
echo "=========================================="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first:"
    echo "   https://git-scm.com/downloads"
    exit 1
fi

echo "✅ Git is installed"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Please run this script from the web-app directory."
    exit 1
fi

echo "📂 Current directory: $(pwd)"
echo ""

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
    echo "🔧 Initializing Git repository..."
    git init
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already initialized"
fi

echo ""

# Add all files
echo "📝 Adding files to Git..."
git add .
echo "✅ Files added"

echo ""

# Check for .env.local
if [ -f ".env.local" ]; then
    echo "⚠️  Warning: .env.local file detected!"
    echo "   This file should NOT be committed to Git."
    echo "   It's already in .gitignore, so it won't be committed."
    echo ""
fi

# Initial commit
echo "📦 Creating initial commit..."
git commit -m "Initial commit: VeritasHire Fake Job Detection

Features:
- ML-powered fake job detection (97.8% accuracy)
- Next.js 16 frontend with modern UI
- Python Random Forest classifier
- 16 scam indicator features
- Real-time analysis with confidence scores
- GitHub Actions CI/CD pipeline
- Automated testing and deployment"

echo "✅ Initial commit created"

echo ""

# Ask for remote repository URL
echo "🔗 GitHub Repository Setup"
echo "---------------------------"
echo ""
echo "Please create a new repository on GitHub:"
echo "1. Go to https://github.com/new"
echo "2. Repository name: VeritasHire"
echo "3. Description: AI-Powered Fake Job Detection"
echo "4. Select 'Public' or 'Private'"
echo "5. DO NOT initialize with README, .gitignore, or license"
echo "6. Click 'Create repository'"
echo ""

read -p "Enter your GitHub repository URL (or press Enter to skip): " REPO_URL

if [ -n "$REPO_URL" ]; then
    echo ""
    echo "🔗 Adding remote repository..."
    git remote add origin "$REPO_URL"
    echo "✅ Remote added: $REPO_URL"
    
    echo ""
    echo "📤 Pushing to GitHub..."
    git branch -M main
    git push -u origin main
    
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "🎉 Next steps:"
    echo "   1. Go to your repository on GitHub"
    echo "   2. Check the 'Actions' tab to see CI/CD pipeline"
    echo "   3. Follow DEPLOYMENT.md to deploy to Vercel"
    echo ""
else
    echo ""
    echo "⏭️  Skipping remote setup."
    echo ""
    echo "📋 Manual steps to push to GitHub:"
    echo ""
    echo "   # Create repository on GitHub first"
    echo "   git remote add origin https://github.com/NavDevs/VeritasHire.git"
    echo "   git branch -M main"
    echo "   git push -u origin main"
    echo ""
fi

echo "📚 Documentation:"
echo "   - README.md - Project overview"
echo "   - DEPLOYMENT.md - Deployment guide"
echo "   - CONTRIBUTING.md - Contribution guidelines"
echo ""
echo "🚀 Your project is ready for GitHub!"
echo ""

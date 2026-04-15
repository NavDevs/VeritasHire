# Setup script for VeritasHire GitHub repository (PowerShell)
# This script helps you initialize and push to GitHub

Write-Host "🌿 VeritasHire - GitHub Repository Setup" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is installed
try {
    $null = Get-Command git -ErrorAction Stop
    Write-Host "✅ Git is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Git is not installed. Please install Git first:" -ForegroundColor Red
    Write-Host "   https://git-scm.com/downloads" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ package.json not found. Please run this script from the web-app directory." -ForegroundColor Red
    exit 1
}

Write-Host "📂 Current directory: $(Get-Location)" -ForegroundColor White
Write-Host ""

# Initialize git if not already initialized
if (-not (Test-Path ".git")) {
    Write-Host "🔧 Initializing Git repository..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Git repository initialized" -ForegroundColor Green
} else {
    Write-Host "✅ Git repository already initialized" -ForegroundColor Green
}

Write-Host ""

# Add all files
Write-Host "📝 Adding files to Git..." -ForegroundColor Yellow
git add .
Write-Host "✅ Files added" -ForegroundColor Green

Write-Host ""

# Check for .env.local
if (Test-Path ".env.local") {
    Write-Host "⚠️  Warning: .env.local file detected!" -ForegroundColor Yellow
    Write-Host "   This file should NOT be committed to Git." -ForegroundColor Yellow
    Write-Host "   It's already in .gitignore, so it won't be committed." -ForegroundColor Yellow
    Write-Host ""
}

# Initial commit
Write-Host "📦 Creating initial commit..." -ForegroundColor Yellow
git commit -m "Initial commit: VeritasHire Fake Job Detection

Features:
- ML-powered fake job detection (97.8% accuracy)
- Next.js 16 frontend with modern UI
- Python Random Forest classifier
- 16 scam indicator features
- Real-time analysis with confidence scores
- GitHub Actions CI/CD pipeline
- Automated testing and deployment"

Write-Host "✅ Initial commit created" -ForegroundColor Green

Write-Host ""

# Ask for remote repository URL
Write-Host "🔗 GitHub Repository Setup" -ForegroundColor Cyan
Write-Host "---------------------------" -ForegroundColor Cyan
Write-Host ""
Write-Host "Please create a new repository on GitHub:" -ForegroundColor White
Write-Host "1. Go to https://github.com/new" -ForegroundColor White
Write-Host "2. Repository name: VeritasHire" -ForegroundColor White
Write-Host "3. Description: AI-Powered Fake Job Detection" -ForegroundColor White
Write-Host "4. Select 'Public' or 'Private'" -ForegroundColor White
Write-Host "5. DO NOT initialize with README, .gitignore, or license" -ForegroundColor White
Write-Host "6. Click 'Create repository'" -ForegroundColor White
Write-Host ""

$REPO_URL = Read-Host "Enter your GitHub repository URL (or press Enter to skip)"

if ($REPO_URL) {
    Write-Host ""
    Write-Host "🔗 Adding remote repository..." -ForegroundColor Yellow
    git remote add origin $REPO_URL
    Write-Host "✅ Remote added: $REPO_URL" -ForegroundColor Green
    
    Write-Host ""
    Write-Host "📤 Pushing to GitHub..." -ForegroundColor Yellow
    git branch -M main
    git push -u origin main
    
    Write-Host ""
    Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🎉 Next steps:" -ForegroundColor Cyan
    Write-Host "   1. Go to your repository on GitHub" -ForegroundColor White
    Write-Host "   2. Check the 'Actions' tab to see CI/CD pipeline" -ForegroundColor White
    Write-Host "   3. Follow DEPLOYMENT.md to deploy to Vercel" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "⏭️  Skipping remote setup." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "📋 Manual steps to push to GitHub:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "   # Create repository on GitHub first" -ForegroundColor White
    Write-Host "   git remote add origin https://github.com/NavDevs/VeritasHire.git" -ForegroundColor White
    Write-Host "   git branch -M main" -ForegroundColor White
    Write-Host "   git push -u origin main" -ForegroundColor White
    Write-Host ""
}

Write-Host "📚 Documentation:" -ForegroundColor Cyan
Write-Host "   - README.md - Project overview" -ForegroundColor White
Write-Host "   - DEPLOYMENT.md - Deployment guide" -ForegroundColor White
Write-Host "   - CONTRIBUTING.md - Contribution guidelines" -ForegroundColor White
Write-Host ""
Write-Host "🚀 Your project is ready for GitHub!" -ForegroundColor Green
Write-Host ""

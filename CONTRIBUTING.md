# Contributing to VeritasHire

Thank you for your interest in contributing to VeritasHire! This guide will help you get started.

## 🎯 Quick Start

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📋 Development Setup

### Prerequisites

- Node.js 18+
- Python 3.10+
- npm or yarn

### Local Development

```bash
# Clone the repository
git clone https://github.com/NavDevs/VeritasHire.git
cd VeritasHire/web-app

# Install dependencies
npm install
pip install -r requirements.txt

# Start development server
npm run dev
```

## 🧪 Testing

Before submitting a PR, ensure all tests pass:

```bash
# Run Python ML tests
python test_model.py

# Run linting
npm run lint

# Check TypeScript
npm run type-check

# Test build
npm run build
```

## 📝 Code Style

### JavaScript/TypeScript

- Use ESLint rules (enforced by CI)
- Use Prettier for formatting
- Follow Next.js best practices

```bash
# Auto-fix linting issues
npm run lint:fix

# Format code
npm run format
```

### Python

- Follow PEP 8
- Use type hints where possible
- Add docstrings to functions

## 🔄 Pull Request Process

### 1. Update Documentation

If you change functionality, update:
- README.md
- DEPLOYMENT.md
- Code comments

### 2. Update Tests

- Add tests for new features
- Ensure all tests pass
- Update test coverage if needed

### 3. PR Checklist

Before submitting:

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No console errors/warnings
- [ ] Build succeeds locally

### 4. PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] New tests added
- [ ] Manual testing completed

## Screenshots (if applicable)
Add screenshots of UI changes

## Checklist
- [ ] Code follows guidelines
- [ ] Documentation updated
```

## 🐛 Reporting Bugs

### Bug Report Template

```markdown
**Describe the bug**
Clear description of the bug

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What should happen

**Screenshots**
If applicable

**Environment:**
- OS: [e.g. Windows 11]
- Browser: [e.g. Chrome 120]
- Node.js: [e.g. 18.0]
- Python: [e.g. 3.10]
```

## 💡 Feature Requests

### Feature Request Template

```markdown
**Problem**
Is your feature request related to a problem?

**Solution**
Describe the solution you'd like

**Alternatives**
Any alternative solutions considered

**Additional context**
Any other context or screenshots
```

## 🏗️ Project Structure

```
web-app/
├── app/              # Next.js pages
├── components/       # React components
├── ml-models/        # ML model files
├── types/            # TypeScript types
├── predict.py        # Prediction logic
├── export_model.py   # Model training
└── test_model.py     # Test suite
```

## 📊 ML Model Development

### Retraining the Model

```bash
# Run training script
python export_model.py

# Test the model
python test_model.py

# Verify accuracy
# Look for accuracy > 95%
```

### Model Guidelines

- Always test with real and fake job samples
- Document changes in model performance
- Update test cases if needed
- Keep model files < 10MB

## 🚀 Deployment

### CI/CD Pipeline

All PRs trigger:
1. Code quality checks
2. Python ML tests
3. Next.js build
4. Security scans

### Manual Deployment

```bash
# Build locally
npm run build

# Test production build
npm run start
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Scikit-learn Documentation](https://scikit-learn.org)
- [GitHub Actions Docs](https://docs.github.com/actions)

## 🎓 Learning Resources

### For Beginners

1. Learn Next.js basics
2. Understand ML concepts
3. Practice with sample datasets
4. Read existing code

### Advanced Topics

1. Model optimization
2. Performance tuning
3. Security best practices
4. Deployment strategies

## 💬 Getting Help

- **Questions:** Open a Discussion
- **Bugs:** Open an Issue
- **Chat:** Join our Discord (if available)

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Acknowledgments

Thanks to all contributors who help improve VeritasHire!

---

**Happy Contributing!** 🎉

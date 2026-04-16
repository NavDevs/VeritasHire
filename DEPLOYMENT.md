# Deployment Guide

## Deploy to Render

This application is configured for deployment on Render with both Node.js (Next.js) and Python (ML model) support.

### Prerequisites

1. Create a Render account at [render.com](https://render.com)
2. Fork or connect your GitHub repository to Render

### Deployment Steps

#### Option 1: Using render.yaml (Recommended)

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Blueprint Instance"**
3. Connect your GitHub repository
4. Render will automatically detect the `render.yaml` file
5. Click **"Apply"** to deploy

#### Option 2: Manual Setup

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your repository
4. Configure the service:
   - **Name**: veritashire
   - **Environment**: Node
   - **Build Command**: `bash render-build.sh`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. Add Environment Variables:
   - `NODE_VERSION`: `20.0.0`
   - `PYTHON_VERSION`: `3.10.0`
   - `NODE_ENV`: `production`
   - `PYTHONPATH`: `.`

6. Click **"Create Web Service"**

### Configuration Files

- **render.yaml**: Blueprint configuration for automatic deployment
- **render-build.sh**: Build script that installs both Node.js and Python dependencies
- **.gitignore**: Excludes unnecessary files from version control

### How It Works

The application uses:
- **Next.js 16** for the frontend and API routes
- **Python 3.10** with scikit-learn for ML-based job prediction
- The API route (`/api/predict`) calls Python scripts to analyze job postings

### Auto-Deploy

The service is configured with `autoDeploy: true`, which means:
- Every push to the main branch will automatically trigger a new deployment
- No manual intervention required

### Health Check

- Health check endpoint: `/`
- Render will monitor this endpoint to ensure your service is running

### Troubleshooting

#### Build Fails
- Check the build logs in Render dashboard
- Ensure all dependencies are listed in `package.json` and `requirements.txt`
- Verify that `render-build.sh` has execute permissions

#### Python Not Found
- Make sure `PYTHON_VERSION` is set in environment variables
- Check that `requirements.txt` is in the root directory

#### ML Model Errors
- Verify that `ml-models/model.pkl` and `ml-models/vectorizer.pkl` exist
- Check that the model files are committed to Git (not in .gitignore)

### Monitoring

- View deployment logs in the Render dashboard
- Monitor service health and performance metrics
- Set up notifications for deployment failures

### Custom Domain (Optional)

1. Go to your service in Render dashboard
2. Click **"Settings"** → **"Custom Domain"**
3. Add your domain and follow the DNS configuration instructions

### Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| NODE_VERSION | Yes | Node.js version (20.0.0) |
| PYTHON_VERSION | Yes | Python version (3.10.0) |
| NODE_ENV | Yes | Environment (production) |
| PYTHONPATH | Yes | Python path (.) |

### Support

For issues with:
- **Render**: Check [Render Documentation](https://render.com/docs)
- **Application**: Review GitHub issues or create a new one

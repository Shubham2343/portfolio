# Railway Deployment Guide

This Django portfolio project is now configured for deployment on Railway.

## Files Added/Modified for Railway Deployment

### New Files:
- `Procfile` - Specifies the command to run the application
- `railway.json` - Railway-specific configuration
- `runtime.txt` - Specifies Python version
- `env.example` - Environment variables template
- `DEPLOYMENT.md` - This deployment guide

### Modified Files:
- `requirements.txt` - Added production dependencies
- `portfolio/settings.py` - Updated for production deployment

## Dependencies Added:
- `gunicorn` - WSGI server for production
- `whitenoise` - Static file serving
- `python-decouple` - Environment variable management

## Deployment Steps:

### 1. Push to GitHub
```bash
git add .
git commit -m "Prepare for Railway deployment"
git push origin main
```

### 2. Deploy on Railway
1. Go to [Railway.app](https://railway.app)
2. Sign up/Login with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your portfolio repository
5. Railway will automatically detect it's a Django project

### 3. Configure Environment Variables
In Railway dashboard, go to your project → Variables tab and add:
```
SECRET_KEY=your-very-secure-secret-key-here
DEBUG=False
ALLOWED_HOSTS=your-app-name.railway.app
```

### 4. Deploy
Railway will automatically build and deploy your application.

## Environment Variables:
- `SECRET_KEY`: Django secret key (required)
- `DEBUG`: Set to False for production
- `ALLOWED_HOSTS`: Comma-separated list of allowed hosts
- `EMAIL_*`: Optional email settings for contact form

## Static Files:
Static files are automatically collected and served using WhiteNoise middleware.

## Database:
Currently using SQLite. For production with high traffic, consider upgrading to PostgreSQL.

## Notes:
- The app will be available at `https://your-app-name.railway.app`
- Railway provides automatic HTTPS
- Static files are served efficiently with WhiteNoise
- All migrations are applied automatically during deployment

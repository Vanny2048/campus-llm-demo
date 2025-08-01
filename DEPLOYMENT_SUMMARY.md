# 🚀 Campus LLM App - Complete Deployment Guide

## 📋 Quick Start (Everything You Need)

### 1. Test Your App Locally
```bash
# Start backend
cd backend
source venv/bin/activate
python app.py

# In another terminal, start frontend
cd frontend
npm start

# Test everything
python simple_test.py
```

### 2. Deploy to Free Hosting (Recommended)

#### Option A: Render + Vercel (Best for React Apps)
1. **Backend (Render)**:
   - Go to [render.com](https://render.com)
   - Create Web Service
   - Build: `pip install -r backend/requirements.txt`
   - Start: `cd backend && python app.py`
   - Environment: `PORT=10000`

2. **Frontend (Vercel)**:
   - Go to [vercel.com](https://vercel.com)
   - Import GitHub repo
   - Root: `frontend`
   - Build: `npm run build`
   - Environment: `REACT_APP_API_URL=https://your-backend.onrender.com`

#### Option B: Streamlit (Simpler)
1. Create `streamlit_app.py` in root
2. Deploy to [share.streamlit.io](https://share.streamlit.io)

### 3. Test Your Deployment
```bash
# Run automated tests
python test_deployment.py

# Or run simple tests
python simple_test.py
```

## 🧪 Testing Checklist

### Backend Tests
- [ ] `GET /api/events` - Returns events list
- [ ] `GET /api/users` - Returns users list
- [ ] `GET /api/leaderboard` - Returns leaderboard
- [ ] `GET /api/prizes` - Returns prizes
- [ ] `POST /api/events/{id}/rsvp` - RSVP works
- [ ] `POST /api/genz-buddy` - Chatbot responds

### Frontend Tests
- [ ] App loads without errors
- [ ] Navigation works
- [ ] Events display correctly
- [ ] RSVP functionality works
- [ ] Mobile responsive

### Manual Testing Commands
```bash
# Test backend API
curl http://localhost:5000/api/events
curl http://localhost:5000/api/users
curl http://localhost:5000/api/leaderboard
curl http://localhost:5000/api/prizes
curl -X POST http://localhost:5000/api/events/1/rsvp
curl -X POST http://localhost:5000/api/genz-buddy -H "Content-Type: application/json" -d '{"prompt":"Hello!"}'

# Test frontend build
cd frontend && npm run build
```

## 🛠️ Files You Need

### Core Files
- `backend/app.py` - Flask API server
- `backend/requirements.txt` - Python dependencies
- `frontend/package.json` - Node.js dependencies
- `frontend/src/App.js` - React app
- `frontend/src/components/API.js` - API configuration

### Testing Files
- `test_deployment.py` - Comprehensive test suite
- `simple_test.py` - Quick test script
- `deploy.sh` - Automated deployment script

### Documentation
- `README.md` - Complete guide
- `DEPLOYMENT.md` - Detailed deployment instructions
- `DEPLOYMENT_SUMMARY.md` - This file

## 🚨 Common Issues & Solutions

### Backend Won't Start
```bash
# Check if port is in use
lsof -i :5000
# Kill process if needed
kill -9 <PID>

# Or change port in app.py
app.run(debug=True, host='0.0.0.0', port=5001)
```

### Frontend Build Fails
```bash
# Clear cache and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run build
```

### CORS Errors
- Make sure Flask-CORS is installed
- Check API URLs in frontend
- Verify backend is running

### API Connection Issues
- Test with curl first
- Check environment variables
- Verify backend URL in frontend

## 📊 Environment Variables

### Backend (Render)
```
PORT=10000
FLASK_ENV=production
CORS_ORIGINS=https://your-frontend-domain.com
```

### Frontend (Vercel)
```
REACT_APP_API_URL=https://your-backend-domain.com
```

## 🎯 Deployment Success Criteria

Your app is successfully deployed when:

1. ✅ Backend API responds to all requests
2. ✅ Frontend loads without errors
3. ✅ Users can RSVP to events
4. ✅ Chatbot responds to messages
5. ✅ Leaderboard updates correctly
6. ✅ All tests pass: `python simple_test.py`

## 🚀 Quick Deployment Commands

```bash
# 1. Test everything locally
python simple_test.py

# 2. Push to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main

# 3. Run deployment script
./deploy.sh

# 4. Follow the instructions provided
```

## 📞 Support

If you get stuck:

1. **Check the troubleshooting section** in README.md
2. **Run the test scripts** to identify issues
3. **Check the logs** in your hosting platform
4. **Verify environment variables** are set correctly

## 🎉 Success!

Once deployed, your app will be available at:
- **Frontend**: `https://your-app-name.vercel.app`
- **Backend**: `https://your-app-name.onrender.com`

Share your frontend URL with users and start collecting feedback!

---

**Remember**: The free tiers can handle hundreds of users for MVP testing. Upgrade only when you hit real scale!

**Need help?** Check the troubleshooting section or run `python simple_test.py` to diagnose issues.
# 🦁 Campus LLM App - LMU Campus Experience Platform

A modern, mobile-first web application designed to enhance the LMU campus experience through events, gamification, and AI-powered assistance.

## ✨ Features

### 🎉 Core Functionality
- **Event Discovery & RSVP**: Browse campus events, filter by type, and RSVP with one tap
- **Game Day Zone**: Check-in at events, complete challenges, and track campus spirit
- **Leaderboard System**: Compete with friends across individuals, organizations, and dorms
- **Rewards & Prizes**: Earn points and redeem them for LMU merchandise and campus perks
- **AI Chatbot**: LMU Buddy provides GenZ-style assistance and campus guidance

### 🎨 Design & UX
- **LMU Branding**: Authentic LMU colors (#8C1515 cardinal red, #F4C95D gold)
- **Mobile-First**: Optimized for mobile devices with bottom navigation
- **Modern UI**: Material-UI components with smooth animations and interactions
- **Accessible**: Designed with accessibility in mind

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js (v16 or higher)
- Python 3.8+
- npm or yarn

### Local Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd campus-llm
   ```

2. **Set up the Backend**
   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python app.py
   ```
   The backend will run on `http://localhost:5000`

3. **Set up the Frontend** (in a new terminal)
   ```bash
   cd frontend
   npm install
   npm start
   ```
   The frontend will run on `http://localhost:3000`

4. **Test Everything**
   ```bash
   # Run the comprehensive test suite
   python test_deployment.py
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000` to see the app in action!

## 🚀 Deployment Instructions

### Option 1: Free Hosting (Recommended for MVP)

#### Step 1: Prepare Your Repository
```bash
# Make sure your code is pushed to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main
```

#### Step 2: Deploy Backend to Render (Free)

1. **Sign up at [Render.com](https://render.com)**
2. **Create a new Web Service**
   - Connect your GitHub repository
   - Set build command: `pip install -r backend/requirements.txt`
   - Set start command: `cd backend && python app.py`
   - Set environment variables:
     ```
     PORT=10000
     FLASK_ENV=production
     ```
3. **Your backend will be available at**: `https://your-app-name.onrender.com`

#### Step 3: Deploy Frontend to Vercel (Free)

1. **Sign up at [Vercel.com](https://vercel.com)**
2. **Import your GitHub repository**
3. **Configure the project**:
   - Framework Preset: Create React App
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`
4. **Set environment variables**:
   ```
   REACT_APP_API_URL=https://your-backend-name.onrender.com
   ```
5. **Deploy!** Your frontend will be available at `https://your-app-name.vercel.app`

#### Step 4: Update API URLs

Before deploying, update the frontend to use your production backend URL:

```javascript
// In frontend/src/components/API.js (create this file)
const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const api = {
  events: `${API_BASE}/api/events`,
  users: `${API_BASE}/api/users`,
  leaderboard: `${API_BASE}/api/leaderboard`,
  prizes: `${API_BASE}/api/prizes`,
  rsvp: (id) => `${API_BASE}/api/events/${id}/rsvp`,
  checkin: `${API_BASE}/api/checkin`,
  chatbot: `${API_BASE}/api/genz-buddy`,
};
```

### Option 2: Streamlit Deployment (Simpler)

If you prefer a simpler deployment, you can convert the app to Streamlit:

1. **Create a Streamlit wrapper** (`streamlit_app.py` in root):
```python
import streamlit as st
import requests
import json

st.set_page_config(page_title="Campus LLM App", page_icon="🦁", layout="wide")

# Your app logic here
st.title("🦁 Campus LLM App")
# Add your components here
```

2. **Deploy to Streamlit Community Cloud**:
   - Go to [share.streamlit.io](https://share.streamlit.io)
   - Connect your GitHub repository
   - Set the path to `streamlit_app.py`
   - Deploy!

### Option 3: Docker Deployment

1. **Create a Dockerfile** in the root directory:
```dockerfile
# Backend Dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY backend/requirements.txt .
RUN pip install -r requirements.txt
COPY backend/ .
EXPOSE 5000
CMD ["python", "app.py"]
```

2. **Deploy to any cloud platform** that supports Docker (AWS, Google Cloud, Azure)

## 🧪 Testing Your Deployment

### Automated Testing
```bash
# Run the comprehensive test suite
python test_deployment.py
```

### Manual Testing Checklist

#### Backend API Tests
- [ ] `GET /api/events` - Returns list of events
- [ ] `GET /api/users` - Returns list of users
- [ ] `GET /api/leaderboard` - Returns sorted leaderboard
- [ ] `GET /api/prizes` - Returns available prizes
- [ ] `POST /api/events/{id}/rsvp` - RSVP to an event
- [ ] `POST /api/checkin` - Check in to an event
- [ ] `POST /api/genz-buddy` - Chatbot responses

#### Frontend Tests
- [ ] App loads without errors
- [ ] Navigation works between pages
- [ ] Events page displays events
- [ ] RSVP functionality works
- [ ] Leaderboard updates
- [ ] Chatbot responds to messages
- [ ] Mobile responsiveness

### API Testing Commands
```bash
# Test backend endpoints
curl http://localhost:5000/api/events
curl http://localhost:5000/api/users
curl http://localhost:5000/api/leaderboard
curl http://localhost:5000/api/prizes
curl -X POST http://localhost:5000/api/events/1/rsvp
curl -X POST http://localhost:5000/api/genz-buddy -H "Content-Type: application/json" -d '{"prompt":"Hello!"}'
```

## 🏗️ Project Structure

```
campus-llm/
├── backend/
│   ├── app.py              # Flask API server
│   ├── requirements.txt    # Python dependencies
│   └── venv/              # Virtual environment
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   └── App.js         # Main app component
│   ├── package.json       # Node.js dependencies
│   └── public/            # Static assets
├── test_deployment.py     # Comprehensive test suite
├── DEPLOYMENT.md          # Detailed deployment guide
└── README.md             # This file
```

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern UI framework
- **Material-UI**: Component library with LMU theming
- **React Router**: Client-side routing
- **Axios**: HTTP client for API calls

### Backend
- **Flask**: Lightweight Python web framework
- **Flask-CORS**: Cross-origin resource sharing
- **Python-dotenv**: Environment variable management

## 📱 Pages & Features

### 🏠 Home Dashboard
- Next event banner with RSVP functionality
- Live challenge cards
- Leaderboard preview
- Quick access to key features

### 📅 Events
- Event grid with filtering by type
- Calendar/list view toggle
- RSVP functionality
- Event details and capacity tracking

### 🏀 Game Day Zone
- Campus spirit meter
- Event check-in system
- Photo/video challenge uploads
- Real-time activity feed

### 🏆 Leaderboard
- Multiple categories (Individuals, Organizations, Dorms)
- Animated rank displays
- Badge showcase
- Statistics overview

### 🎁 Prizes & Rewards
- Point-based reward system
- Prize catalog with images
- Claim functionality
- Prize suggestion form

### 👤 Profile
- User statistics and achievements
- Badge collection
- Activity history
- Progress tracking

### 📝 Event Submission
- User-generated event proposals
- Form validation
- Submission guidelines
- Contact information

## 🤖 LMU Buddy Chatbot

The AI-powered chatbot provides:
- Campus information and guidance
- Event recommendations
- GenZ-style conversational interface
- Contextual responses to student queries

## 🎨 Design System

### Colors
- **Primary**: #8C1515 (LMU Cardinal Red)
- **Secondary**: #F4C95D (LMU Gold)
- **Accent**: #2E5A88 (Navy Blue)
- **Background**: #f5f5f5 (Light Gray)

### Typography
- **Font Family**: Inter (primary), Roboto (fallback)
- **Weights**: 400 (regular), 600 (medium), 700 (bold)

### Components
- Rounded corners (12px border radius)
- Subtle shadows and hover effects
- Consistent spacing and padding
- Mobile-optimized touch targets

## 🚨 Troubleshooting

### Common Issues

1. **Backend won't start**
   ```bash
   # Check if port is in use
   lsof -i :5000
   # Kill process if needed
   kill -9 <PID>
   ```

2. **Frontend build fails**
   ```bash
   # Clear npm cache
   npm cache clean --force
   # Reinstall dependencies
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **CORS errors**
   - Make sure Flask-CORS is installed
   - Check that frontend URL is allowed in backend CORS settings

4. **API connection issues**
   - Verify backend is running on correct port
   - Check API URLs in frontend code
   - Test API endpoints with curl

### Environment Variables

Set these in your hosting platforms:

```bash
# Backend (Render)
PORT=10000
FLASK_ENV=production
CORS_ORIGINS=https://your-frontend-domain.com

# Frontend (Vercel)
REACT_APP_API_URL=https://your-backend-domain.com
```

## 📊 Monitoring & Analytics

### Free Analytics Tools
- **Google Analytics** - Track user behavior
- **Hotjar** - Heatmaps and user recordings
- **UptimeRobot** - Monitor app availability

### Performance Monitoring
- **Render Dashboard** - Monitor backend performance
- **Vercel Analytics** - Built-in usage stats

## 🎉 Success Metrics

Your app is successfully deployed when:

- ✅ Backend API responds to requests
- ✅ Frontend loads without errors
- ✅ Users can RSVP to events
- ✅ Chatbot responds to messages
- ✅ Leaderboard updates in real-time
- ✅ All tests pass: `python test_deployment.py`

## 📞 Support

For questions or support:
- Check the troubleshooting section above
- Review the `DEPLOYMENT.md` file for detailed instructions
- Test your deployment with `python test_deployment.py`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ for the LMU community**

**Ready to deploy?** Run `python test_deployment.py` to verify everything works!
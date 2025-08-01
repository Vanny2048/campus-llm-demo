# 🚀 Deployment Guide - Campus LLM App

This guide will help you deploy the Campus LLM App using **completely free hosting services** that can handle hundreds of users for MVP/demo purposes.

## 📋 Prerequisites

1. **GitHub Account** - For code hosting
2. **Email Address** - For service registrations
3. **No Credit Card Required** - All services offer free tiers

## 🎯 Deployment Strategy

| Component | Free Platform | Capacity | Setup Time |
|-----------|---------------|----------|------------|
| Frontend | Streamlit Community Cloud | 100s of users | 5 minutes |
| Backend API | Render | 100s of requests/hour | 10 minutes |
| Database | Supabase | 500MB storage | 5 minutes |
| Chatbot | Hugging Face Spaces | Light usage | 15 minutes |

## 🏗️ Step-by-Step Deployment

### Step 1: Prepare Your Code

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Campus LLM App"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/campus-llm.git
   git push -u origin main
   ```

2. **Create a public repository** (required for free hosting)

### Step 2: Deploy Backend to Render

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

3. **Update backend for production**
   ```python
   # In backend/app.py, change the last line to:
   if __name__ == '__main__':
       port = int(os.environ.get('PORT', 5001))
       app.run(host='0.0.0.0', port=port)
   ```

4. **Your backend will be available at**: `https://your-app-name.onrender.com`

### Step 3: Deploy Frontend to Streamlit Community Cloud

1. **Create a Streamlit wrapper** (`streamlit_app.py` in root):
   ```python
   import streamlit as st
   import requests
   import json
   
   st.set_page_config(
       page_title="Campus LLM App",
       page_icon="🦁",
       layout="wide"
   )
   
   # Your React app will be embedded here
   st.title("🦁 Campus LLM App")
   st.write("Welcome to the LMU Campus Experience Platform!")
   
   # Add your React app URL here
   st.components.v1.iframe(
       "https://your-react-app.vercel.app",
       height=800,
       scrolling=True
   )
   ```

2. **Deploy to Streamlit Community Cloud**
   - Go to [share.streamlit.io](https://share.streamlit.io)
   - Connect your GitHub repository
   - Set the path to `streamlit_app.py`
   - Deploy!

### Step 4: Set Up Database (Optional for MVP)

1. **Sign up at [Supabase.com](https://supabase.com)**
2. **Create a new project**
3. **Set up tables**:
   ```sql
   -- Users table
   CREATE TABLE users (
       id SERIAL PRIMARY KEY,
       name VARCHAR(100),
       email VARCHAR(100) UNIQUE,
       points INTEGER DEFAULT 0,
       badges TEXT[]
   );
   
   -- Events table
   CREATE TABLE events (
       id SERIAL PRIMARY KEY,
       title VARCHAR(200),
       description TEXT,
       type VARCHAR(50),
       date TIMESTAMP,
       location VARCHAR(200),
       rsvp_count INTEGER DEFAULT 0,
       max_capacity INTEGER
   );
   ```

4. **Get your database URL and update backend**

### Step 5: Deploy Chatbot (Future Enhancement)

1. **Sign up at [Hugging Face](https://huggingface.co)**
2. **Create a new Space**
3. **Upload your fine-tuned Llama model**
4. **Set up the API endpoint**

## 🔧 Configuration Updates

### Update Frontend API URLs

Replace all `http://localhost:5001` with your Render backend URL:

```javascript
// In all React components
const API_BASE = "https://your-app-name.onrender.com";

// Update all axios calls
axios.get(`${API_BASE}/api/events`)
```

### Environment Variables

Set these in your hosting platforms:

```bash
# Backend (Render)
DATABASE_URL=your_supabase_url
SECRET_KEY=your_secret_key
CORS_ORIGINS=https://your-streamlit-app.streamlit.app

# Frontend (Streamlit)
REACT_APP_API_URL=https://your-backend.onrender.com
```

## 🧪 Testing Your Deployment

1. **Test Backend API**:
   ```bash
   curl https://your-app-name.onrender.com/api/events
   ```

2. **Test Frontend**: Visit your Streamlit app URL

3. **Test Chatbot**: Try the LMU Buddy feature

## 📊 Monitoring & Analytics

### Free Analytics Tools
- **Google Analytics** - Track user behavior
- **Hotjar** - Heatmaps and user recordings
- **UptimeRobot** - Monitor app availability

### Performance Monitoring
- **Render Dashboard** - Monitor backend performance
- **Streamlit Analytics** - Built-in usage stats

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Update CORS settings in backend
   - Add your frontend URL to allowed origins

2. **Database Connection Issues**
   - Check Supabase connection string
   - Verify network access

3. **Build Failures**
   - Check requirements.txt
   - Verify Python version compatibility

### Support Resources
- **Render Docs**: https://render.com/docs
- **Streamlit Docs**: https://docs.streamlit.io
- **Supabase Docs**: https://supabase.com/docs

## 📈 Scaling Up (When Ready)

When you need more capacity:

1. **Upgrade Render Plan** - $7/month for more resources
2. **Move to Vercel** - Better for React apps
3. **Add CDN** - Cloudflare (free tier available)
4. **Database Upgrade** - Supabase Pro plan

## 🎉 Success Metrics

Your app is successfully deployed when:

- ✅ Backend API responds to requests
- ✅ Frontend loads without errors
- ✅ Users can RSVP to events
- ✅ Chatbot responds to messages
- ✅ Leaderboard updates in real-time

## 📞 Next Steps

1. **Share your app URL** with LMU students
2. **Collect feedback** and iterate
3. **Add more features** based on user needs
4. **Consider monetization** options

---

**Remember**: These free tiers are perfect for MVP testing with hundreds of users. Upgrade only when you hit real scale!

**Need help?** Check the troubleshooting section or reach out to the hosting platform support teams.
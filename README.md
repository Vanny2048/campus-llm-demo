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

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Python 3.8+
- npm or yarn

### Installation

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

3. **Set up the Frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```
   The frontend will run on `http://localhost:3000`

4. **Open your browser**
   Navigate to `http://localhost:3000` to see the app in action!

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
├── llama-buddy/           # AI chatbot integration (future)
└── README.md
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

### Future Integrations
- **Llama Model**: Fine-tuned LMU-specific chatbot
- **Database**: PostgreSQL/Supabase for data persistence
- **Authentication**: LMU SSO integration

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

## 🚀 Deployment

### Free Hosting Options (as recommended)

1. **Frontend**: Streamlit Community Cloud or Vercel
2. **Backend**: Render or Hugging Face Spaces
3. **Database**: Supabase (PostgreSQL) or Google Sheets API
4. **Chatbot**: Hugging Face Spaces for AI models

### Deployment Steps
1. Push code to GitHub repository
2. Connect to Streamlit Community Cloud for frontend
3. Deploy Flask backend to Render
4. Set up database on Supabase
5. Configure environment variables
6. Test all functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- LMU Brand Guidelines for authentic design
- Material-UI team for the component library
- React community for the excellent documentation
- LMU students for inspiration and feedback

## 📞 Support

For questions or support, please contact:
- Email: [your-email@lmu.edu]
- GitHub Issues: [repository-issues-link]

---

**Built with ❤️ for the LMU community**
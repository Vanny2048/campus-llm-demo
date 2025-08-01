import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';

// Import components
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Events from './pages/Events';
import GameDay from './pages/GameDay';
import Leaderboard from './pages/Leaderboard';
import Prizes from './pages/Prizes';
import Profile from './pages/Profile';
import EventSubmission from './pages/EventSubmission';
import BuddyChat from './components/BuddyChat';

// LMU Brand Colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#8C1515', // LMU Cardinal Red
    },
    secondary: {
      main: '#F4C95D', // LMU Gold
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      color: '#8C1515',
    },
    h2: {
      fontWeight: 600,
      color: '#8C1515',
    },
    h3: {
      fontWeight: 600,
      color: '#8C1515',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/game-day" element={<GameDay />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/prizes" element={<Prizes />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/submit-event" element={<EventSubmission />} />
          </Routes>
          <Navigation />
          <BuddyChat />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;

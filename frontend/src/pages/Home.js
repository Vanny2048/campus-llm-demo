import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Grid,
  Chip,
  Avatar,
  AvatarGroup,
  LinearProgress,
  Paper
} from '@mui/material';
import {
  Event as EventIcon,
  LocationOn as LocationIcon,
  People as PeopleIcon,
  EmojiEvents as TrophyIcon,
  TrendingUp as TrendingIcon
} from '@mui/icons-material';
import axios from 'axios';

const Home = () => {
  const [nextEvent, setNextEvent] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, leaderboardRes] = await Promise.all([
          axios.get('http://localhost:5001/api/events'),
          axios.get('http://localhost:5001/api/leaderboard')
        ]);

        // Get the next event (first one for now)
        setNextEvent(eventsRes.data[0]);
        setLeaderboard(leaderboardRes.data.slice(0, 5)); // Top 5
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRSVP = async () => {
    if (!nextEvent) return;
    
    try {
      await axios.post(`http://localhost:5001/api/events/${nextEvent.id}/rsvp`);
      // Update the event locally
      setNextEvent(prev => ({
        ...prev,
        rsvp_count: prev.rsvp_count + 1
      }));
    } catch (error) {
      console.error('Error RSVPing:', error);
    }
  };

  if (loading) {
    return (
      <Container sx={{ py: 2 }}>
        <LinearProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ py: 2, pb: 8 }}>
      {/* Header */}
      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          🦁 Welcome to LMU Campus
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Your ultimate campus experience starts here!
        </Typography>
      </Box>

      {/* Next Event Banner */}
      {nextEvent && (
        <Card sx={{ mb: 3, position: 'relative', overflow: 'hidden' }}>
          <CardMedia
            component="img"
            height="200"
            image={nextEvent.image}
            alt={nextEvent.title}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(45deg, rgba(140,21,21,0.8) 0%, rgba(244,201,93,0.8) 100%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              textAlign: 'center',
              p: 2,
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
              Next Event
            </Typography>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {nextEvent.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
              <EventIcon />
              <Typography variant="body2">
                {new Date(nextEvent.date).toLocaleDateString()}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
              <LocationIcon />
              <Typography variant="body2">
                {nextEvent.location}
              </Typography>
            </Box>
            <Button
              variant="contained"
              onClick={handleRSVP}
              sx={{
                backgroundColor: 'white',
                color: '#8C1515',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            >
              RSVP Now ({nextEvent.rsvp_count}/{nextEvent.max_capacity})
            </Button>
          </Box>
        </Card>
      )}

      {/* Live Challenge Card */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <TrendingIcon sx={{ color: '#8C1515', mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Live Challenge
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ mb: 2 }}>
            📸 Take a selfie at the LMU Lion statue and share your school spirit!
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Chip 
              label="50 points" 
              color="primary" 
              size="small" 
              sx={{ mr: 1 }}
            />
            <Chip 
              label="Ends in 2 hours" 
              variant="outlined" 
              size="small"
            />
          </Box>
          <Button
            variant="contained"
            fullWidth
            sx={{ backgroundColor: '#8C1515' }}
          >
            Upload Photo
          </Button>
        </CardContent>
      </Card>

      {/* Leaderboard Preview */}
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <TrophyIcon sx={{ color: '#8C1515', mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Top Lions
            </Typography>
          </Box>
          
          {leaderboard.map((user, index) => (
            <Box
              key={user.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 2,
                p: 1,
                borderRadius: 1,
                backgroundColor: index === 0 ? '#fff3cd' : 'transparent',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  width: 40,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: index === 0 ? '#8C1515' : 'text.secondary',
                }}
              >
                #{index + 1}
              </Typography>
              <Avatar
                src={user.avatar}
                sx={{ width: 40, height: 40, mr: 2 }}
              >
                {user.name.split(' ').map(n => n[0]).join('')}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                  {user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.points} points
                </Typography>
              </Box>
              {index === 0 && (
                <Chip
                  label="🏆"
                  size="small"
                  sx={{ backgroundColor: '#F4C95D' }}
                />
              )}
            </Box>
          ))}
          
          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 2, borderColor: '#8C1515', color: '#8C1515' }}
          >
            View Full Leaderboard
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Home;
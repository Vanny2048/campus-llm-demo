import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  Avatar,
  Chip,
  Grid,
  LinearProgress
} from '@mui/material';
import {
  Person as PersonIcon,
  EmojiEvents as TrophyIcon,
  Event as EventIcon,
  Star as StarIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState({
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@lmu.edu",
    points: 1250,
    badges: ["First Event", "Sports Fan", "Social Butterfly", "Event Organizer"],
    avatar: "https://via.placeholder.com/100x100/8C1515/FFFFFF?text=AJ"
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user data
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

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
          👤 My Profile
        </Typography>
      </Box>

      {/* Profile Card */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <Avatar
            src={user.avatar}
            sx={{ 
              width: 100, 
              height: 100, 
              mx: 'auto', 
              mb: 2,
              border: '4px solid #8C1515'
            }}
          >
            {user.name.split(' ').map(n => n[0]).join('')}
          </Avatar>
          
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
            {user.name}
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {user.email}
          </Typography>
          
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            sx={{ borderColor: '#8C1515', color: '#8C1515' }}
          >
            Edit Profile
          </Button>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={4}>
          <Card sx={{ textAlign: 'center' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                <StarIcon sx={{ color: '#8C1515', mr: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#8C1515' }}>
                  {user.points.toLocaleString()}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Total Points
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={4}>
          <Card sx={{ textAlign: 'center' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                <EventIcon sx={{ color: '#F4C95D', mr: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#F4C95D' }}>
                  12
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Events Attended
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={4}>
          <Card sx={{ textAlign: 'center' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                <TrophyIcon sx={{ color: '#2E5A88', mr: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2E5A88' }}>
                  {user.badges.length}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Badges Earned
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Badges */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            🏆 My Badges
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {user.badges.map((badge, index) => (
              <Chip
                key={index}
                label={badge}
                color="primary"
                sx={{
                  backgroundColor: '#8C1515',
                  color: 'white',
                  fontWeight: 'medium',
                }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            📅 Recent Activity
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ width: 40, height: 40, mr: 2, backgroundColor: '#8C1515' }}>
              AJ
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                Checked in at Basketball Game
              </Typography>
              <Typography variant="body2" color="text.secondary">
                2 hours ago • +25 points
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ width: 40, height: 40, mr: 2, backgroundColor: '#F4C95D' }}>
              AJ
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                RSVP'd to Spring Concert
              </Typography>
              <Typography variant="body2" color="text.secondary">
                1 day ago • +10 points
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ width: 40, height: 40, mr: 2, backgroundColor: '#2E5A88' }}>
              AJ
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                Earned "Social Butterfly" badge
              </Typography>
              <Typography variant="body2" color="text.secondary">
                3 days ago • +50 points
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Achievements Progress */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            🎯 Achievement Progress
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">
                Event Organizer
              </Typography>
              <Typography variant="body2" color="text.secondary">
                3/5 events
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={60}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: '#f0f0f0',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#8C1515',
                  borderRadius: 4,
                },
              }}
            />
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">
                Sports Fanatic
              </Typography>
              <Typography variant="body2" color="text.secondary">
                8/10 games
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={80}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: '#f0f0f0',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#F4C95D',
                  borderRadius: 4,
                },
              }}
            />
          </Box>
          
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">
                Campus Explorer
              </Typography>
              <Typography variant="body2" color="text.secondary">
                15/20 locations
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={75}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: '#f0f0f0',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#2E5A88',
                  borderRadius: 4,
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Profile;
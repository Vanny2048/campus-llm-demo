import React, { useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  LinearProgress,
  Chip,
  Avatar,
  Paper,
  Grid,
  TextField,
  IconButton
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  CameraAlt as CameraIcon,
  Videocam as VideoIcon,
  EmojiEvents as TrophyIcon,
  TrendingUp as TrendingIcon,
  CheckCircle as CheckIcon,
  Upload as UploadIcon
} from '@mui/icons-material';
import axios from 'axios';

const GameDay = () => {
  const [spiritLevel, setSpiritLevel] = useState(75);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleCheckIn = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/checkin', {
        user_id: 1, // Mock user ID
        event_id: 1
      });
      
      if (response.data.success) {
        setIsCheckedIn(true);
        setSpiritLevel(prev => Math.min(100, prev + 10));
        // Show success message
        alert(`Check-in successful! +${response.data.points_earned} points`);
      }
    } catch (error) {
      console.error('Error checking in:', error);
      alert('Check-in failed. Please try again.');
    }
  };

  const handleUpload = () => {
    setUploading(true);
    // Simulate upload
    setTimeout(() => {
      setUploading(false);
      alert('Challenge uploaded successfully! +50 points');
      setSpiritLevel(prev => Math.min(100, prev + 15));
    }, 2000);
  };

  return (
    <Container sx={{ py: 2, pb: 8 }}>
      {/* Header */}
      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          🏀 Game Day Zone
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Show your Lion spirit and earn points!
        </Typography>
      </Box>

      {/* Spirit Meter */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <TrendingIcon sx={{ color: '#8C1515', mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Campus Spirit Meter
            </Typography>
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Spirit Level
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {spiritLevel}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={spiritLevel}
              sx={{
                height: 12,
                borderRadius: 6,
                backgroundColor: '#f0f0f0',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: spiritLevel > 80 ? '#F4C95D' : '#8C1515',
                  borderRadius: 6,
                },
              }}
            />
          </Box>
          
          <Typography variant="body2" color="text.secondary">
            {spiritLevel > 80 ? '🔥 Campus is on fire! 🔥' : 
             spiritLevel > 60 ? '💪 Great spirit! Keep it up!' : 
             '🦁 Let\'s boost that spirit!'}
          </Typography>
        </CardContent>
      </Card>

      {/* Check-In Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <LocationIcon sx={{ color: '#8C1515', mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Check-In
            </Typography>
          </Box>
          
          <Typography variant="body1" sx={{ mb: 2 }}>
            Check in at the basketball game to earn points and show your support!
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Chip 
              label="Gersten Pavilion" 
              color="primary" 
              size="small" 
              sx={{ mr: 1 }}
            />
            <Chip 
              label="+25 points" 
              variant="outlined" 
              size="small"
            />
          </Box>
          
          <Button
            variant="contained"
            fullWidth
            onClick={handleCheckIn}
            disabled={isCheckedIn}
            startIcon={isCheckedIn ? <CheckIcon /> : <LocationIcon />}
            sx={{
              backgroundColor: isCheckedIn ? '#4CAF50' : '#8C1515',
              '&:hover': {
                backgroundColor: isCheckedIn ? '#45a049' : '#6B1010',
              },
            }}
          >
            {isCheckedIn ? 'Checked In!' : 'Check In Now'}
          </Button>
        </CardContent>
      </Card>

      {/* Live Challenge */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <TrophyIcon sx={{ color: '#8C1515', mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Live Challenge
            </Typography>
          </Box>
          
          <Typography variant="body1" sx={{ mb: 2 }}>
            📸 Take a selfie with the LMU Lion mascot and share your game day spirit!
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Chip 
              label="50 points" 
              color="primary" 
              size="small" 
              sx={{ mr: 1 }}
            />
            <Chip 
              label="Ends in 1 hour" 
              variant="outlined" 
              size="small"
            />
          </Box>
          
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<CameraIcon />}
                onClick={handleUpload}
                disabled={uploading}
                sx={{ borderColor: '#8C1515', color: '#8C1515' }}
              >
                Take Photo
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<VideoIcon />}
                onClick={handleUpload}
                disabled={uploading}
                sx={{ borderColor: '#8C1515', color: '#8C1515' }}
              >
                Record Video
              </Button>
            </Grid>
          </Grid>
          
          {uploading && (
            <Box sx={{ mt: 2 }}>
              <LinearProgress />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Uploading...
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Recent Activity
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ width: 40, height: 40, mr: 2, backgroundColor: '#8C1515' }}>
              AJ
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                Alex Johnson
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Just checked in at the game! 🏀
              </Typography>
            </Box>
            <Chip label="+25" size="small" color="primary" />
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ width: 40, height: 40, mr: 2, backgroundColor: '#F4C95D' }}>
              SC
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                Sarah Chen
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Uploaded a challenge photo! 📸
              </Typography>
            </Box>
            <Chip label="+50" size="small" color="primary" />
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ width: 40, height: 40, mr: 2, backgroundColor: '#2E5A88' }}>
              MJ
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                Mike Johnson
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Checked in at the game! 🦁
              </Typography>
            </Box>
            <Chip label="+25" size="small" color="primary" />
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default GameDay;
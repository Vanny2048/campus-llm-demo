import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Tabs,
  Tab,
  Avatar,
  Chip,
  LinearProgress
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  TrendingUp as TrendingIcon,
  School as SchoolIcon,
  Business as BusinessIcon,
  Home as HomeIcon
} from '@mui/icons-material';
import axios from 'axios';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/leaderboard');
      setLeaderboard(response.data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getTabIcon = (index) => {
    switch (index) {
      case 0:
        return <TrophyIcon />;
      case 1:
        return <SchoolIcon />;
      case 2:
        return <BusinessIcon />;
      case 3:
        return <HomeIcon />;
      default:
        return <TrophyIcon />;
    }
  };

  const getTabLabel = (index) => {
    switch (index) {
      case 0:
        return 'Individuals';
      case 1:
        return 'Organizations';
      case 2:
        return 'Dorms';
      case 3:
        return 'All Time';
      default:
        return 'Individuals';
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return '#F4C95D'; // Gold
      case 2:
        return '#C0C0C0'; // Silver
      case 3:
        return '#CD7F32'; // Bronze
      default:
        return '#8C1515'; // LMU Red
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `#${rank}`;
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
          🏆 Leaderboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          See who's leading the pack!
        </Typography>
      </Box>

      {/* Tabs */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 0 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                minWidth: 120,
                textTransform: 'none',
                fontWeight: 600,
              },
              '& .Mui-selected': {
                color: '#8C1515',
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#8C1515',
              },
            }}
          >
            {[0, 1, 2, 3].map((index) => (
              <Tab
                key={index}
                icon={getTabIcon(index)}
                label={getTabLabel(index)}
                iconPosition="start"
              />
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Leaderboard List */}
      <Card>
        <CardContent>
          {leaderboard.map((user, index) => (
            <Box
              key={user.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 2,
                p: 2,
                borderRadius: 2,
                backgroundColor: index < 3 ? '#fff8e1' : 'transparent',
                border: index < 3 ? '2px solid' : '1px solid',
                borderColor: index < 3 ? getRankColor(index + 1) : '#e0e0e0',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                },
              }}
            >
              {/* Rank */}
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: getRankColor(index + 1),
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: index < 3 ? '1.2rem' : '1rem',
                  mr: 2,
                }}
              >
                {getRankIcon(index + 1)}
              </Box>

              {/* Avatar */}
              <Avatar
                src={user.avatar}
                sx={{ 
                  width: 50, 
                  height: 50, 
                  mr: 2,
                  border: index < 3 ? '3px solid' : '2px solid',
                  borderColor: getRankColor(index + 1),
                }}
              >
                {user.name.split(' ').map(n => n[0]).join('')}
              </Avatar>

              {/* User Info */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                  {user.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {user.badges.slice(0, 2).map((badge, badgeIndex) => (
                    <Chip
                      key={badgeIndex}
                      label={badge}
                      size="small"
                      variant="outlined"
                      sx={{
                        borderColor: '#8C1515',
                        color: '#8C1515',
                        fontSize: '0.7rem',
                      }}
                    />
                  ))}
                  {user.badges.length > 2 && (
                    <Chip
                      label={`+${user.badges.length - 2}`}
                      size="small"
                      sx={{
                        backgroundColor: '#8C1515',
                        color: 'white',
                        fontSize: '0.7rem',
                      }}
                    />
                  )}
                </Box>
              </Box>

              {/* Points */}
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#8C1515' }}>
                  {user.points.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  points
                </Typography>
              </Box>
            </Box>
          ))}
        </CardContent>
      </Card>

      {/* Stats Card */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            📊 Leaderboard Stats
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#8C1515' }}>
                {leaderboard.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Participants
              </Typography>
            </Box>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#F4C95D' }}>
                {leaderboard[0]?.points || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Top Score
              </Typography>
            </Box>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2E5A88' }}>
                {Math.round(leaderboard.reduce((sum, user) => sum + user.points, 0) / leaderboard.length)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Average Score
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Leaderboard;
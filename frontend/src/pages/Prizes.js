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
  LinearProgress,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  CardGiftcard as GiftIcon,
  Add as AddIcon,
  EmojiEvents as TrophyIcon,
  Star as StarIcon
} from '@mui/icons-material';
import axios from 'axios';

const Prizes = () => {
  const [prizes, setPrizes] = useState([]);
  const [userPoints, setUserPoints] = useState(1250);
  const [loading, setLoading] = useState(true);
  const [suggestDialogOpen, setSuggestDialogOpen] = useState(false);
  const [suggestion, setSuggestion] = useState('');

  useEffect(() => {
    fetchPrizes();
  }, []);

  const fetchPrizes = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/prizes');
      setPrizes(response.data);
    } catch (error) {
      console.error('Error fetching prizes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClaim = (prize) => {
    if (userPoints >= prize.points_required) {
      setUserPoints(prev => prev - prize.points_required);
      alert(`Congratulations! You've claimed ${prize.name}! 🎉`);
    } else {
      alert(`You need ${prize.points_required - userPoints} more points to claim this prize.`);
    }
  };

  const handleSuggestPrize = () => {
    if (suggestion.trim()) {
      alert('Thank you for your suggestion! We\'ll review it and add it to our prize collection.');
      setSuggestion('');
      setSuggestDialogOpen(false);
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
          🎁 Prizes & Rewards
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Redeem your points for awesome rewards!
        </Typography>
      </Box>

      {/* Points Display */}
      <Card sx={{ mb: 3, background: 'linear-gradient(45deg, #8C1515 30%, #F4C95D 90%)' }}>
        <CardContent sx={{ textAlign: 'center', color: 'white' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
            <StarIcon sx={{ mr: 1, fontSize: 28 }} />
            <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
              {userPoints.toLocaleString()}
            </Typography>
          </Box>
          <Typography variant="h6">
            Your Points
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Keep earning points to unlock more rewards!
          </Typography>
        </CardContent>
      </Card>

      {/* Prize Grid */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {prizes.map((prize) => (
          <Grid item xs={12} sm={6} md={4} key={prize.id}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              position: 'relative',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
              }
            }}>
              <CardMedia
                component="img"
                height="200"
                image={prize.image}
                alt={prize.name}
              />
              <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {prize.name}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flex: 1 }}>
                  {prize.description}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Chip
                    icon={<GiftIcon />}
                    label={`${prize.points_required} points`}
                    color="primary"
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  {userPoints >= prize.points_required && (
                    <Chip
                      label="Available"
                      color="success"
                      size="small"
                    />
                  )}
                </Box>
                
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleClaim(prize)}
                  disabled={userPoints < prize.points_required}
                  sx={{
                    backgroundColor: userPoints >= prize.points_required ? '#8C1515' : '#ccc',
                    '&:hover': {
                      backgroundColor: userPoints >= prize.points_required ? '#6B1010' : '#ccc',
                    },
                  }}
                >
                  {userPoints >= prize.points_required ? 'Claim Prize' : 'Not Enough Points'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Suggest a Prize */}
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <AddIcon sx={{ color: '#8C1515', mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Suggest a Prize
            </Typography>
          </Box>
          
          <Typography variant="body1" sx={{ mb: 2 }}>
            Have an idea for a great prize? Let us know what you'd like to see in our rewards collection!
          </Typography>
          
          <Button
            variant="outlined"
            onClick={() => setSuggestDialogOpen(true)}
            sx={{ borderColor: '#8C1515', color: '#8C1515' }}
          >
            Suggest a Prize
          </Button>
        </CardContent>
      </Card>

      {/* Suggest Prize Dialog */}
      <Dialog open={suggestDialogOpen} onClose={() => setSuggestDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Suggest a Prize
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Prize Suggestion"
            fullWidth
            multiline
            rows={4}
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            placeholder="Describe the prize you'd like to see..."
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSuggestDialogOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSuggestPrize}
            variant="contained"
            sx={{ backgroundColor: '#8C1515' }}
          >
            Submit Suggestion
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Prizes;
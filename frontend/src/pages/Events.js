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
  ToggleButton,
  ToggleButtonGroup,
  LinearProgress,
  Avatar,
  AvatarGroup
} from '@mui/material';
import {
  Event as EventIcon,
  LocationOn as LocationIcon,
  People as PeopleIcon,
  CalendarToday as CalendarIcon,
  ViewList as ListIcon,
  SportsEsports as SportsIcon,
  MusicNote as MusicIcon,
  School as SchoolIcon
} from '@mui/icons-material';
import axios from 'axios';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('list');
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRSVP = async (eventId) => {
    try {
      await axios.post(`http://localhost:5000/api/events/${eventId}/rsvp`);
      // Update the event locally
      setEvents(prev => prev.map(event => 
        event.id === eventId 
          ? { ...event, rsvp_count: event.rsvp_count + 1 }
          : event
      ));
    } catch (error) {
      console.error('Error RSVPing:', error);
    }
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'sports':
        return <SportsIcon />;
      case 'music':
        return <MusicIcon />;
      case 'academic':
        return <SchoolIcon />;
      default:
        return <EventIcon />;
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'sports':
        return '#8C1515';
      case 'music':
        return '#F4C95D';
      case 'academic':
        return '#2E5A88';
      default:
        return '#8C1515';
    }
  };

  const filteredEvents = events.filter(event => 
    selectedType === 'all' || event.type === selectedType
  );

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
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
          🎉 Campus Events
        </Typography>
        
        {/* View Toggle */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(e, newMode) => newMode && setViewMode(newMode)}
            size="small"
          >
            <ToggleButton value="list">
              <ListIcon />
            </ToggleButton>
            <ToggleButton value="calendar">
              <CalendarIcon />
            </ToggleButton>
          </ToggleButtonGroup>
          
          <Typography variant="body2" color="text.secondary">
            {filteredEvents.length} events
          </Typography>
        </Box>

        {/* Event Type Filter */}
        <Box sx={{ mb: 3 }}>
          <ToggleButtonGroup
            value={selectedType}
            exclusive
            onChange={(e, newType) => newType && setSelectedType(newType)}
            size="small"
            sx={{ flexWrap: 'wrap' }}
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="sports">Sports</ToggleButton>
            <ToggleButton value="music">Music</ToggleButton>
            <ToggleButton value="academic">Academic</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      {/* Events Grid/List */}
      <Grid container spacing={2}>
        {filteredEvents.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="140"
                image={event.image}
                alt={event.title}
              />
              <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Chip
                    icon={getEventIcon(event.type)}
                    label={event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    size="small"
                    sx={{
                      backgroundColor: getEventColor(event.type),
                      color: 'white',
                      mr: 1
                    }}
                  />
                </Box>
                
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {event.title}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {event.description}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <EventIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {new Date(event.date).toLocaleDateString()}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {event.location}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PeopleIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {event.rsvp_count}/{event.max_capacity} RSVPs
                  </Typography>
                </Box>
                
                <Box sx={{ mt: 'auto' }}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => handleRSVP(event.id)}
                    disabled={event.rsvp_count >= event.max_capacity}
                    sx={{
                      backgroundColor: '#8C1515',
                      '&:hover': {
                        backgroundColor: '#6B1010',
                      },
                    }}
                  >
                    {event.rsvp_count >= event.max_capacity ? 'Full' : 'RSVP'}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredEvents.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No events found for this category
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Events;
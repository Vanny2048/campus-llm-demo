import React, { useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Chip
} from '@mui/material';
import {
  Add as AddIcon,
  Event as EventIcon,
  LocationOn as LocationIcon,
  Description as DescriptionIcon
} from '@mui/icons-material';

const EventSubmission = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    date: '',
    time: '',
    location: '',
    maxCapacity: '',
    contactEmail: ''
  });

  const handleChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // In a real app, this would submit to the backend
    alert('Event submitted successfully! We\'ll review it and get back to you soon.');
    setFormData({
      title: '',
      description: '',
      type: '',
      date: '',
      time: '',
      location: '',
      maxCapacity: '',
      contactEmail: ''
    });
  };

  const eventTypes = [
    { value: 'sports', label: 'Sports', color: '#8C1515' },
    { value: 'music', label: 'Music', color: '#F4C95D' },
    { value: 'academic', label: 'Academic', color: '#2E5A88' },
    { value: 'social', label: 'Social', color: '#4CAF50' },
    { value: 'cultural', label: 'Cultural', color: '#9C27B0' },
    { value: 'other', label: 'Other', color: '#FF9800' }
  ];

  return (
    <Container sx={{ py: 2, pb: 8 }}>
      {/* Header */}
      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          📝 Submit an Event
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Help make LMU campus life even better!
        </Typography>
      </Box>

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Event Title */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Event Title"
                  value={formData.title}
                  onChange={handleChange('title')}
                  required
                  variant="outlined"
                  InputProps={{
                    startAdornment: <EventIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                />
              </Grid>

              {/* Event Type */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Event Type</InputLabel>
                  <Select
                    value={formData.type}
                    onChange={handleChange('type')}
                    label="Event Type"
                  >
                    {eventTypes.map((type) => (
                      <MenuItem key={type.value} value={type.value}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box
                            sx={{
                              width: 12,
                              height: 12,
                              borderRadius: '50%',
                              backgroundColor: type.color,
                              mr: 1
                            }}
                          />
                          {type.label}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Date */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange('date')}
                  required
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              {/* Time */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Time"
                  type="time"
                  value={formData.time}
                  onChange={handleChange('time')}
                  required
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              {/* Max Capacity */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Maximum Capacity"
                  type="number"
                  value={formData.maxCapacity}
                  onChange={handleChange('maxCapacity')}
                  variant="outlined"
                  inputProps={{ min: 1 }}
                />
              </Grid>

              {/* Location */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Location"
                  value={formData.location}
                  onChange={handleChange('location')}
                  required
                  variant="outlined"
                  InputProps={{
                    startAdornment: <LocationIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                />
              </Grid>

              {/* Description */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Event Description"
                  value={formData.description}
                  onChange={handleChange('description')}
                  required
                  multiline
                  rows={4}
                  variant="outlined"
                  InputProps={{
                    startAdornment: <DescriptionIcon sx={{ mr: 1, color: 'text.secondary', mt: 1 }} />
                  }}
                />
              </Grid>

              {/* Contact Email */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Contact Email"
                  type="email"
                  value={formData.contactEmail}
                  onChange={handleChange('contactEmail')}
                  required
                  variant="outlined"
                  placeholder="your.email@lmu.edu"
                />
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  startIcon={<AddIcon />}
                  sx={{
                    backgroundColor: '#8C1515',
                    '&:hover': {
                      backgroundColor: '#6B1010',
                    },
                    py: 1.5,
                  }}
                >
                  Submit Event
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      {/* Guidelines Card */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            📋 Submission Guidelines
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
              • Events should be open to LMU students and promote campus community
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Provide clear details about date, time, and location
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Include contact information for questions
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • Events will be reviewed within 24-48 hours
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • You'll receive an email confirmation once approved
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Event Type Legend */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            🏷️ Event Types
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {eventTypes.map((type) => (
              <Chip
                key={type.value}
                label={type.label}
                size="small"
                sx={{
                  backgroundColor: type.color,
                  color: 'white',
                  fontWeight: 'medium',
                }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default EventSubmission;
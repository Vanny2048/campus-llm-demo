import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  BottomNavigation, 
  BottomNavigationAction, 
  Paper,
  Box 
} from '@mui/material';
import {
  Home as HomeIcon,
  Event as EventIcon,
  SportsEsports as GameIcon,
  Leaderboard as LeaderboardIcon,
  CardGiftcard as PrizeIcon,
  Person as ProfileIcon
} from '@mui/icons-material';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Home', icon: <HomeIcon />, path: '/' },
    { label: 'Events', icon: <EventIcon />, path: '/events' },
    { label: 'Game Day', icon: <GameIcon />, path: '/game-day' },
    { label: 'Leaderboard', icon: <LeaderboardIcon />, path: '/leaderboard' },
    { label: 'Prizes', icon: <PrizeIcon />, path: '/prizes' },
    { label: 'Profile', icon: <ProfileIcon />, path: '/profile' }
  ];

  const currentValue = navItems.find(item => item.path === location.pathname)?.label || 'Home';

  return (
    <Paper 
      sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        zIndex: 1000,
        borderTop: '1px solid #e0e0e0'
      }} 
      elevation={3}
    >
      <BottomNavigation
        value={currentValue}
        onChange={(event, newValue) => {
          const item = navItems.find(nav => nav.label === newValue);
          if (item) {
            navigate(item.path);
          }
        }}
        sx={{
          '& .MuiBottomNavigationAction-root': {
            minWidth: 'auto',
            padding: '6px 8px',
            '&.Mui-selected': {
              color: '#8C1515',
            },
          },
        }}
      >
        {navItems.map((item) => (
          <BottomNavigationAction
            key={item.path}
            label={item.label}
            value={item.label}
            icon={item.icon}
            sx={{
              fontSize: '0.75rem',
            }}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};

export default Navigation;
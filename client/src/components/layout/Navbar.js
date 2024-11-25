import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon, // Import this to add icons
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home'; // Home Icon
import DashboardIcon from '@mui/icons-material/Dashboard'; // Dashboard Icon
import InfoIcon from '@mui/icons-material/Info'; // About Icon
import DescriptionIcon from '@mui/icons-material/Description'; // Documentation Icon
import LogoutIcon from '@mui/icons-material/Logout'; // Logout Icon
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/authSlice'; // Adjust import as needed
import { useMediaQuery } from '@mui/material';
import logo from '../../assets/uppcr-logo.png';

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated =
    useSelector((state) => state.auth.isAuthenticated) ||
    localStorage.getItem('isAuthenticated') === 'true';

  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 600px)'); // Media query for mobile

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/';
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: 'Home', path: '/', icon: <HomeIcon /> },
    { text: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    { text: 'About', path: '/about', icon: <InfoIcon /> },
    { text: 'Documentations', path: '/documentation', icon: <DescriptionIcon /> },
  ];

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {isMobile && (
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          )}
          <Box component="img"
            src={logo}
            alt="upp-logo"
            height={60}
            width={60}
            sx={{
              borderRadius: '10%', // 10% border radius
            }}
          />

          <Typography ml={2} variant="h6" style={{ flexGrow: 1 }}>
            UP-PCR
          </Typography>
          {!isMobile && (
            <>
              <Button color="inherit" component={Link} to="/">
                <HomeIcon sx={{ mr: 1 }} /> Home
              </Button>
              {isAuthenticated && (
                <Button color="inherit" component={Link} to="/dashboard">
                  <DashboardIcon sx={{ mr: 1 }} /> Dashboard
                </Button>
              )}
              <Button color="inherit" component={Link} to="/about">
                <InfoIcon sx={{ mr: 1 }} /> About
              </Button>
              <Button color="inherit" component={Link} to="/documentation">
                <DescriptionIcon sx={{ mr: 1 }} /> Documentations
              </Button>
              {isAuthenticated && (
                <Button onClick={handleLogout} color="inherit">
                  <LogoutIcon sx={{ mr: 1 }} /> Logout
                </Button>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          {menuItems.map((item) => (
            <ListItem button key={item.text} component={Link} to={item.path} onClick={toggleDrawer(false)}>
              <ListItemIcon>{item.icon}</ListItemIcon> {/* Icon added here */}
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
          {isAuthenticated && (
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;

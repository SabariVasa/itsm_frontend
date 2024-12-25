import React from "react";
import {
  Box,
  List,
  Avatar,
  SwipeableDrawer,
  ListItem, ListItemButton, ListItemIcon, ListItemText
} from '@mui/material';
import AvailablThemeList from "../../../Pages/SettingsBarSlide/AvailablThemeList";
import { useDrawer } from '../drawer/DrawerContext';
// import { Box, Avatar, List,} from '@mui/material';
import AppSettingsAltIcon from '@mui/icons-material/AppSettingsAlt';
import PersonIcon from '@mui/icons-material/Person';

function UserProfileDrawer() {

  const { state, toggleDrawer } = useDrawer();

  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    avatarUrl: "https://randomuser.me/api/portraits/men/41.jpg", // Avatar image
    bio: "Full Stack Developer with 5 years of experience in web development.",
  };

  const list = (anchor, user) => (
    <>
      <Box
        sx={{
          width: 450,
          height: '35vh',
          borderRadius: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '1em',
          position: 'fixed',
          left: '8em',
          top: '4rem'
        }}
        role="presentation"
        onClick={() => toggleDrawer(anchor, false)} // Use context function to close the drawer
        onKeyDown={() => toggleDrawer(anchor, false)}
      >
        <Avatar
          alt={user.name}
          src={user.avatarUrl}
          sx={{ width: 200, height: 200 }}
        />
        <center>{localStorage.getItem('userEmail')}</center>
      </Box>
      <div style={{ overflowY: 'scroll', marginTop: '2em', scrollBehavior: 'smooth' }}>
        <List>
          {/* Profile Item */}
          <ListItem key="Profile" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PersonIcon /> {/* Profile Icon */}
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>

          {/* Theme Settings */}
          <ListItem key="AppSettingsAltIcon" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AppSettingsAltIcon /> {/* Theme Settings Icon */}
              </ListItemIcon>
              <ListItemText primary="Theme Settings" />
            </ListItemButton>
          </ListItem>

          {/* Available Theme List */}
          <AvailablThemeList />

        </List>
      </div>
    </>
  );
  const key = Object.keys(state);
  return (
    <>
      {key.map((anchor, i) => (
        <React.Fragment key={anchor + i}>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={() => toggleDrawer(anchor, false)} // Close drawer on close event
            sx={{
              '& .MuiDrawer-paper': {
                background: "#F2F2F2",
                borderRadius: '20px',
                padding: '0 20px',
                width: 400,
              }
            }}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </>
  );
}

export default UserProfileDrawer;

import React, { useCallback } from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useDrawer } from '../global/commonComponents/drawer/DrawerContext';
import { useTheme } from '../global/commonComponents/ThemeContext';
import { useAuth } from '../application/modules/auth/hooks/useAuth';

export default function UserProfileDetails() {
  const { toggleDrawer, state } = useDrawer();
  const { theme } = useTheme();
  const { logout, user_auth } = useAuth();


  const handleToggle = useCallback((anchor, open) => () => {
    toggleDrawer(anchor, open);
  }, [toggleDrawer]);

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 380,
        background: 'transparent',
        borderRadius: '3em',
        height: '100%',
      }}
      role="presentation"
      onKeyDown={handleToggle(anchor, false)}
    >
      <div style={{
        cursor: "pointer",
        position: 'fixed',
        top: '12rem',
        left: '26.5rem'
      }}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTadSAgMa0Si3aeLKU9sPJ24i1IZX3nKOVLnA&s"
          height="100px"
          width="100px"
          alt="profile-pic"
          style={{ borderRadius: '22rem', }}
        />
        <div style={{
          position: "fixed",
          left: "24rem",
          top: "19em",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <h3 style={{ color: "black", marginBottom: '0%', fontWeight: 'normal' }}>{user_auth.emailAddress}</h3>
          <p style={{ color: `${theme.valueFontColor}`, }}>Software Developer</p>
        </div>
      </div>
      <div style={{ height: '13vh' }}></div>
      <div style={{ margin: "1em 6em" }}>
        <List>
          <ListItem button onClick={() => null}>
            <ListItemText sx={{ textAlign: 'center', borderBottom: `1px solid ${theme.borderColor}` }} primary="Profile" />
          </ListItem>
        </List>
        <List>
          <ListItem button onClick={logout}>
            <ListItemText sx={{ textAlign: 'center', borderBottom: `1px solid ${theme.borderColor}` }} primary="Logout" />
          </ListItem>
        </List>
      </div>
    </Box >
  );

  return (
    <>
      {['left', 'right', 'top', 'bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={handleToggle(anchor, false)}
            onOpen={handleToggle(anchor, true)}
            PaperProps={{
              sx: {
                background: '#E8E5E5',
                borderRadius: '1em',
                margin: '8.2em 0.7em 0 0',
                height: '40%',
                position: 'absolute',
                left: '18em',
                top: '7em'
              },
            }}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
      <div className="flex my-4 cursor-pointer items-center bg-white overflow-hidden p-1 rounded-sm" onClick={() => toggleDrawer('left', true)} >
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTadSAgMa0Si3aeLKU9sPJ24i1IZX3nKOVLnA&s" alt="profile-pic" className='h-11' />
        <div className="profile-name-container" >
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", margin: '0 1em' }}>
            <div style={{ width: "100%", textOverflow: "ellipses", marginLeft: "0 15px" }}>
              <p style={{ color: "black" }}>{user_auth.emailAddress}</p>
            </div>
          </div>
          <div>
          </div>
        </div>
      </div>
    </>
  );
}

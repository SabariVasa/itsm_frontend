import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import LogoutIcon from '@mui/icons-material/Logout';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDrawer } from '../global/commonComponents/drawer/DrawerContext';
import { useTheme } from '../global/commonComponents/ThemeContext';
import { Image } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';
import ContentDevider from '../Components/HelperComponents/ContentDevider';
import { Button, Modal } from '@mui/material';
import UserDetailsAndEdit from './userManagement/UserDetailsAndEdit';
import { useHistory } from 'react-router-dom';

export default function UserProfileDetails() {
  const { toggleDrawer, state } = useDrawer();
  const { theme, updateTheme } = useTheme();
  const navigate = useHistory();

  const [openProfileModal, setOpenProfileModal] = React.useState(false);

  const handleToggle = React.useCallback((anchor, open) => () => {
    toggleDrawer(anchor, open);
  }, [toggleDrawer]);

  const handleProfileClick = () => {
    setOpenProfileModal(true);
  };

  const handleCloseProfileModal = () => {
    setOpenProfileModal(false);
  };

  const themes = [
    { name: 'Light', mainBodyColor: '#ffffff', outerBodyColor: 'black' },
    { name: 'Dark', mainBodyColor: '#333333', outerBodyColor: '#cccccc' },
    { name: 'Blue', mainBodyColor: '#add8e6', outerBodyColor: '#00008b' },
    { name: 'Green', mainBodyColor: '#d0f0c0', outerBodyColor: '#2e8b57' },
    { name: 'Red', mainBodyColor: '#ffe5e5', outerBodyColor: '#8b0000' },
  ];

  const changeTheme = (selectedTheme) => {
    updateTheme(selectedTheme);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate.push('/');
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 380,
        background: 'linear-gradient(to right bottom, #176deb, #8968da, #b668c6, #d06eb2, #de7ba2)', // Same gradient for the Box
        borderRadius: '3em',
        height: '100%',
      }}
      role="presentation"
      onKeyDown={handleToggle(anchor, false)}
    >
      <div style={{ borderRadius: 22, marginTop: '3em', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTadSAgMa0Si3aeLKU9sPJ24i1IZX3nKOVLnA&s" height="65px" width="65px" alt="profile-pic" />
        <div>{localStorage.getItem('userName')}</div>
      </div>
      <ContentDevider />
      <div style={{ marginTop: '2em', }} >
        <Accordion
          sx={{
            background: 'linear-gradient(to right bottom, #176deb, #8968da, #b668c6, #d06eb2, #de7ba2)', // Apply same gradient for Accordion
            borderRadius: '1em',
            marginBottom: '10px',
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="theme-content"
            id="theme-header"
            sx={{
              backgroundColor: 'transparent',
              color: '#fff',
            }}
          >
            <Typography>Theme Options</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List component="nav" aria-label="theme options">
              {themes.map((themeOption) => (
                <ListItem
                  button
                  key={themeOption.name}
                  onClick={() => changeTheme(themeOption)}
                  style={{
                    backgroundColor: themeOption.mainBodyColor,
                    color: themeOption.outerBodyColor,
                    border: `1px solid ${themeOption.outerBodyColor}`,
                    marginBottom: '10px',
                  }}
                >
                  <ListItemText primary={themeOption.name} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      </div>
      <List>
        <ListItem button onClick={handleProfileClick}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      </List>
      <Button
        variant="text"
        startIcon={<LogoutIcon />}
        onClick={handleLogout}
        sx={{
          color: 'red',
          marginBottom: '20px',
          alignSelf: 'center',
        }}
      >
        Logout
      </Button>
    </Box>
  );

  return (
    <div>
      {['left', 'right', 'top', 'bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={handleToggle(anchor, false)}
            onOpen={handleToggle(anchor, true)}
            PaperProps={{
              sx: {
                background: 'linear-gradient(to right bottom, #176deb, #8968da, #b668c6, #d06eb2, #de7ba2)', // Same gradient for the Drawer
                borderRadius: '1em',
                margin: '8.2em 0.7em 0 0',
                height: '79%'
              },
            }}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
      <Modal
        open={openProfileModal}
        onClose={handleCloseProfileModal}
        aria-labelledby="profile-modal-title"
        aria-describedby="profile-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 800,
            height: 450,
            overflowY: 'scroll',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <UserDetailsAndEdit />
        </Box>
      </Modal>
    </div>
  );
}

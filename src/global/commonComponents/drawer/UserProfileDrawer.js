import React from "react";
import {
  Box,
  List,
  Avatar,
  SwipeableDrawer,
} from '@mui/material';
import AvailablThemeList from "../../../Pages/SettingsBarSlide/AvailablThemeList";
import { useDrawer } from '../drawer/DrawerContext';

function UserProfileDrawer() {

  const { state, toggleDrawer } = useDrawer();

  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    avatarUrl: "https://randomuser.me/api/portraits/men/41.jpg", // Avatar image
    bio: "Full Stack Developer with 5 years of experience in web development.",
  };

  const list = (anchor) => (
    <>
      <Box
        sx={{
          width: 450,
          height: '40vh',
          borderRadius: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: "1em"
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
        <center>{localStorage.getItem("userEmail")}</center>
      </Box>
      <div style={{ overflowY: 'scroll', marginTop: '2em', scrollBehavior: 'smooth' }}>
        <List>
          {['AppSettingsAltIcon'].map((text, index) => (
            text === 'AppSettingsAltIcon' ? (
              <AvailablThemeList />
            ) : (
              <List>
                <List.Item key={text} disablePadding>
                  <List.ItemButton>
                    <List.ItemIcon>
                      {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                    </List.ItemIcon>
                    <List.ItemText primary={text} />
                  </List.ItemButton>
                </List.Item>
              </List>
            )
          ))}
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
                background: "linear-gradient(to right bottom, #176deb, #8968da, #b668c6, #d06eb2, #de7ba2)",
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

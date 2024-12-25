import React from 'react';
// import { Navigate } from 'react-router-dom';
import UserInfo from '../models/UserInfo';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { Box, Button, Card, CardContent, CardMedia, Modal, Typography } from "@mui/material";
import Paper from '@mui/material/Paper';
import { useHistory } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Image } from '@mui/icons-material';
import GlobalService from '../services/GlobalService';
import { resturls } from '../global/utils/apiurls';

const RoleBasedRoute = () => {
  // const role = localStorage.getItem('role');
  // let redirectUrl;
  const history = useHistory()
  const userDetails = UserInfo.getUserDetail();
  console.log('User Details:', userDetails);

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '25px',
    cursor: 'pointer'
  }));

  const fetchGroupDetails = (role) => {
    GlobalService.generalSelect((rep) => {
      console.log(rep, 'rep');
    }, `${resturls.fetchAdminGroup}/${userDetails.id}`,
      { "role": role },
      'POST')
  }

  console.log(UserInfo.getUserDetail.id, 'UserInfo.getUserDetail.id');

  const redirectUrlController = (role) => {
    console.log(role, 'rolerolerole');
    if (role === 'Super Admin') {
      fetchGroupDetails('superadmin');
      history.push('/superadmin');
    } else if (role === 'Admin') {
      fetchGroupDetails('admin');
      history.push('/admin');
    } else if (role === 'End User') {
      history.push('/endUser');
    }
  }

  const showCategorieOfRoles = (segmant) => {
    console.log(segmant, 'segmant');
    let role = '';
    if (segmant === "1") {
      role = 'Admin';
    } else if (segmant === "2") {
      role = 'Super Admin';
    } else {
      role = 'End User';
    }
    return role;
  };


  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%'
    }}>
      {/* {(redirectUrl !== undefined && redirectUrl !== null && redirectUrl !== '')
        ? ( */}
      <>
        {userDetails.group.length > 0 ? (
          // <Modal
          //   open
          //   aria-labelledby="profile-modal-title"
          //   aria-describedby="profile-modal-description"
          //   sx={{
          //     display: 'flex',
          //     alignItems: 'center',
          //     justifyContent: 'center'
          //   }}
          // >
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              justifyContent: 'center',
              marginTop: 2,
            }}
          >
            {userDetails.group.map((ele, id) => {
              const category = showCategorieOfRoles(ele);
              let description;

              switch (category) {
                case 'Super Admin':
                  description = "Oversees piloteDesk configuration, customization, and administration to ensure optimal performance and IT service alignment.";
                  break;
                case 'Admin':
                  description = "An Admin for Help Desk piloteDesk focuses on day-to-day operations and maintenance of the piloteDesk platform.";
                  break;
                default:
                  description = "Uses the piloteDesk platform to log incidents, request services, track issue resolutions, and access self-service resources for IT support.";
              }

              return (
                <Card
                  key={id}
                  sx={{
                    width: 250,
                    height: 250,
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.3)",
                    },
                    background: "linear-gradient(90deg, #F51275 0%, #622098 100%)",
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                  }}
                  onClick={() => redirectUrlController(category)}
                >
                  <CardMedia
                    component="img"
                    image=""
                    alt={`${category} Image`}
                    sx={{
                      height: 100,
                      margin: '16px auto 0',
                      width: 'auto',
                      objectFit: 'contain',
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div" sx={{ textAlign: 'center' }}>
                      {category}
                    </Typography>
                    <Typography variant="body2" sx={{ textAlign: 'center', fontSize: '0.9em' }}>
                      {description}
                    </Typography>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
          // </Modal>
        ) : (
          <Redirect to={'/sign'} />
        )}

      </>
      {/* ) : ( */}
      {/* <Redirect to="/sign" /> */}
      {/* )} */}
    </div>
  );
};

export default RoleBasedRoute;
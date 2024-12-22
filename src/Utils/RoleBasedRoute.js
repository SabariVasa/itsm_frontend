import React from 'react';
// import { Navigate } from 'react-router-dom';
import UserInfo from '../models/UserInfo';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { Box, Button, Modal } from "@mui/material";
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
    <div style={{ display: 'flex' }}>
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
              '& > :not(style)': {
                margin: '3px',
                width: '167px',
                height: '155px',
              },
            }}
          >
            {userDetails.group.map((ele, id) =>
              <Item key={id} sx={{ background: "linear-gradient(90deg, #F51275 0%, #622098 100%)", color: 'white' }} elevation={showCategorieOfRoles(ele)} onClick={() => redirectUrlController(showCategorieOfRoles(ele))}>
                <Image src="" sx={{ marginTop: '1em' }} />
                <h3>{showCategorieOfRoles(ele)}</h3>
              </Item>
            )}
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
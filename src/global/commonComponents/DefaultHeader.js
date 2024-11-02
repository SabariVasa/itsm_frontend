import { Grid } from "@mui/material";
import React from "react";
// import { useDrawer } from "./drawer/DrawerContext";
import UserInfo from '../../models/UserInfo';
// import UserProfileDetails from "../../Pages/UserProfileDetails";

function DefaultHeader(props) {
  const { state, toggleDrawer } = props;
  // const { toggleDrawer } = useDrawer();
  const userName = UserInfo.getUsername();
  let authAdmin = localStorage.getItem("Admin");

  return (
    <>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <img alt="logo" src={"https://res.cloudinary.com/doiff4svr/image/upload/v1723208791/logo_yjmays.png"} style={{ height: '83px', width: '190px' }} />
          </Grid>
          <Grid item xs={8} >
            <div className="userProfile">
              <div style={{ cursor: "pointer" }}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTadSAgMa0Si3aeLKU9sPJ24i1IZX3nKOVLnA&s" height="40px" width="45px" alt="profile-pic" style={{ borderRadius: 22, marginTop: 10, marginLeft: 5 }} />
              </div>
              <div className={authAdmin === 'SuperAdmin' ? "profile-container-admin" : "profile-container"} onClick={() => toggleDrawer('right', true)} >
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", margin: '0 1em' }}>
                  <div style={{ width: "100%", textOverflow: "ellipses", marginLeft: "0 15px" }}>
                    <p style={{ color: "black" }}>{localStorage.getItem('userName')}</p>
                  </div>
                </div>
                <div>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  )
}
export default DefaultHeader
// toggleDrawer('right', true)
import React, { useEffect, useState } from "react";
import { withTranslation } from 'react-i18next';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
} from "@mui/material";
import TokenIcon from '@mui/icons-material/Token';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import StorageIcon from '@mui/icons-material/Storage';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NetworkPingIcon from "@mui/icons-material/NetworkPing";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import RepeatIcon from "@mui/icons-material/Repeat";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import BusinessIcon from '@mui/icons-material/Business';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import UserInfo from "../../models/UserInfo";
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import styles from "../../Pages/endUser/scss/UserPortalLeftPanel.module.scss";
import { useHistory } from "react-router-dom";
// import _ from "lodash";
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
// import { AiOutlineForm } from "react-icons/ai";
// import styless from './scss/SuperAdmin.module.scss';

function AdminPortalLeftPanel(props) {
  const { navbarOptions, tabClickHandler, drawer, t, bgcolur } = props;
  const history = useHistory
  const [expanded, setExpanded] = useState(false);
  const [superAdmin, setSuperAdmin] = useState(false);
  // const userName = UserInfo.getUsername();
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleLogoutRedirect = () => {

  };

  const iconMapping = {
    Dashboards: HomeOutlinedIcon,
    "Incident Management": NetworkPingIcon,
    CMDB: StorageIcon,
    "Request Management": RepeatIcon,
    "Change Management": ChangeCircleIcon,
    "Knowledge Article": MenuBookIcon,
    'CMDB Management': StorageIcon,
    'Generate Token': TokenIcon,
    'User Management': PersonIcon,
    'Group Management': GroupIcon,
  };

  useEffect(() => {
    let authAdmin = localStorage.getItem("role");
    // let endUser = localStorage.getItem("User");
    if (authAdmin === "Super Admin") {
      setSuperAdmin(true);
    }
  }, [])

  return (
    <>
      <List style={{ margin: '0.5em', background: bgcolur, borderRadius: '0.5em' }}>
        <div className="sidebar-item">
          {props.drawer ?
            <div style={{ height: 100, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
              <img alt="logo" src={"/updateLogo.png"} style={{
                width: '154.09px',
                height: '35.32px',
                top: '348.66px',
                left: '221.92px',
                gap: '0px',
                opacity: '0px'
              }} />
              {/* <p style={{ fontSize: 28, color: "white", marginTop: 36 }} className='company-profile'>
                Desk
              </p> */}
            </div> : null}
        </div>
        {navbarOptions.map((ele, i) => {
          const IconComponent = iconMapping[ele.icon];

          // Check if the label is "Report an issue" or "Request Something" and drawer is true
          if ((ele.label === "Incident Management" || ele.label === "Request Management" || ele.label === "Change Management" || ele.label === "CMDB Management") && drawer) {
            return (
              <Accordion
                key={`${ele.label}-accordion`}
                expanded={expanded === ele.label}
                onChange={handleAccordionChange(ele.label)}
                className={styles.accordionContainer}
              >
                <AccordionSummary
                  expandIcon={<KeyboardArrowDownIcon sx={{ color: "white" }} />}
                  aria-controls={`${ele.label}-content`}
                  id={`${ele.label}-header`}
                >
                  <ListItemIcon>
                    {IconComponent && <IconComponent sx={{ color: "white" }} />}
                  </ListItemIcon>
                  {drawer && <ListItemText sx={{ color: "white" }} primary={ele.label} />}
                </AccordionSummary>
                <AccordionDetails sx={{ marginLeft: "3em" }}>
                  {ele.label === "Incident Management" ? (
                    <>
                      <ListItem onClick={() => tabClickHandler(i, "create_incident")}>
                        <ListItemText sx={{ color: "white" }} primary="Create Incident" />
                      </ListItem>
                      <ListItem onClick={() => tabClickHandler(i, "open_incident")}>
                        <ListItemText sx={{ color: "white" }} primary="Open Incident" />
                      </ListItem>
                      <ListItem onClick={() => tabClickHandler(i, "assign_to_me")}>
                        <ListItemText sx={{ color: "white" }} primary="Assign-to-me" />
                      </ListItem>
                      <ListItem onClick={() => tabClickHandler(i, "all_incidents")}>
                        <ListItemText sx={{ color: "white" }} primary="All Incident" />
                      </ListItem>
                    </>
                  ) : ele.label === "Request Management" ? (
                    <>
                      <ListItem onClick={() => tabClickHandler(i, "my_request")}>
                        <ListItemText sx={{ color: "white" }} primary="My Request" />
                      </ListItem>
                      <ListItem onClick={() => tabClickHandler(i, "request_service")}>
                        <ListItemText sx={{ color: "white" }} primary="Request Service" />
                      </ListItem>
                    </>
                  ) : ele.label === "Change Management" ?
                    <>
                      <ListItem onClick={() => tabClickHandler(i, "new_change")}>
                        <ListItemText sx={{ color: "white" }} primary="New Change" />
                      </ListItem>
                      <ListItem onClick={() => tabClickHandler(i, "all_change")}>
                        <ListItemText sx={{ color: "white" }} primary="All Change" />
                      </ListItem>
                    </> : ele.label === "CMDB Management" && <>
                      <ListItem onClick={() => tabClickHandler(i, "create_config")}>
                        <ListItemText sx={{ color: "white" }} primary={t('create_config')} />
                      </ListItem>
                      <ListItem onClick={() => tabClickHandler(i, "class_manage")}>
                        <ListItemText sx={{ color: "white" }} primary={t('class_manage')} />
                      </ListItem>
                    </>}
                </AccordionDetails>
              </Accordion>
            );
          } else {
            return (
              !(ele.label === "Incident Management" || ele.label === "Request Management" || ele.label === "Change Management") ? (
                <>
                  <ListItem
                    key={`${ele.label}-key`}
                    onClick={() => tabClickHandler(i)}
                    button
                  >
                    {drawer ? (
                      <ListItemIcon>
                        {IconComponent && <IconComponent sx={{ color: 'white' }} />}
                      </ListItemIcon>
                    ) : (
                      <ListItemIcon sx={{ margin: '1em 0', width: '100%', display: 'flex', justifyContent: 'center' }}>
                        {IconComponent && <IconComponent sx={{ color: 'white' }} />}
                      </ListItemIcon>
                    )}
                    {drawer ? <ListItemText
                      primary={ele.label}
                      sx={{ color: 'white' }}
                    /> : null}
                  </ListItem>
                </>
              ) : (
                <PopupState variant="popover" popupId={`${ele.label}-popover`} key={`${ele.label}-popup`}>
                  {(popupState) => (
                    <>
                      <ListItem
                        button
                        onClick={() => tabClickHandler(i)}
                        {...bindTrigger(popupState)}
                      >
                        <ListItemIcon sx={{ margin: '1em 0', width: '100%', display: 'flex', justifyContent: 'center' }}>
                          {IconComponent && <IconComponent sx={{ color: "white" }} />}
                        </ListItemIcon>
                        {drawer && <ListItemText primary={t(ele.label)} sx={{ color: "white" }} />}
                      </ListItem>
                      {ele.label === "Knowledge Article" ? <hr className="sidenav-hr" /> : null}
                      <Popover
                        {...bindPopover(popupState)}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "center",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                      >
                        {ele.label === "Incident Management" ? (
                          <>
                            <Typography sx={{ p: 2 }} onClick={() => tabClickHandler(i, "create_incident")}>{t('create_incident')}</Typography>
                            <Typography sx={{ p: 2 }} onClick={() => tabClickHandler(i, "open_incident")}>{t(`open_incident`)}</Typography>
                            <Typography sx={{ p: 2 }} onClick={() => tabClickHandler(i, "assign_to_me")}>{t(`assign_to_me`)}</Typography>
                            <Typography sx={{ p: 2 }} onClick={() => tabClickHandler(i, "all_incidents")}>{t(`all_incident`)}</Typography>
                          </>
                        ) : ele.label === "Request Management" ? (
                          <>
                            <Typography sx={{ p: 2 }} onClick={() => tabClickHandler(i, "my_request")}>{t(`request_status`)}</Typography>
                            <Typography sx={{ p: 2 }} onClick={() => tabClickHandler(i, "request_service")}>{t(`request_service`)}</Typography>
                          </>
                        ) : ele.label === "Change Management" ? (
                          <>
                            <Typography sx={{ p: 2 }} onClick={() => tabClickHandler(i, "new_change")}>{t(`new_change`)}</Typography>
                            <Typography sx={{ p: 2 }} onClick={() => tabClickHandler(i, "all_change")}>{t(`all_change`)}</Typography>
                          </>
                        ) : ele.label === "CMDB Management" && (
                          <>
                            <Typography sx={{ p: 2 }} onClick={() => tabClickHandler(i, "create_config")}>{t(`create_config`)}</Typography>
                            <Typography sx={{ p: 2 }} onClick={() => tabClickHandler(i, "class_manage")}>{t(`class_manage`)}</Typography>
                          </>
                        )}

                      </Popover>
                    </>
                  )}
                </PopupState>
              )
            );
          }
        })}
        {props.drawer ?
          <div className={superAdmin ? "profile-container-admin" : "profile-container"}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", marginTop: 10 }}>
              <Tooltip title="Profile">
                <div style={{ cursor: "pointer" }}>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTadSAgMa0Si3aeLKU9sPJ24i1IZX3nKOVLnA&s" height="40px" width="40px" alt="profile-pic" style={{ borderRadius: 10, marginTop: 10, marginLeft: 5 }} />
                </div>
              </Tooltip>
              <div style={{ width: "100%", textOverflow: "ellipses", marginLeft: 15 }}>
                {/* <ReactTextFit minFontSize={50}>Mahathir Mohamed</ReactTextFit> */}
                <p style={{ color: "black" }}>{localStorage.getItem("userEmail")}</p>
              </div>
              <div>
                {props.drawer ? <div className='sidebar-item-decor-logout' onClick={() => { handleLogoutRedirect() }} style={{ marginTop: 5 }}>
                  <LogoutIcon style={{ color: "#ff3333" }} />
                  <p style={{ fontSize: 18, color: "red" }} >Logout</p>
                </div> : <div className='sidebar-item-decor-logout'>
                  <LogoutIcon style={{ color: "red" }} onClick={() => { localStorage.removeItem("Authentication-Token"); window.location.replace("/"); localStorage.removeItem("userEmail"); localStorage.removeItem("Admin") }} />
                </div>}
              </div>
            </div>
          </div> : <div>
            <div>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTadSAgMa0Si3aeLKU9sPJ24i1IZX3nKOVLnA&s" height="30px" width="30px" alt="profile-pic" style={{ borderRadius: 10, marginBottom: 30 }} />
            </div>
            {localStorage.getItem('userName')}
            <div className='sidebar-item-decor'>
              <Tooltip title="logout">
                <LogoutIcon style={{ color: "red", fontSize: 25 }} onClick={() => { localStorage.removeItem("Authentication-Token"); window.location.replace("/"); localStorage.removeItem("userEmail"); localStorage.removeItem("Admin") }} />
              </Tooltip>
            </div>
          </div>
        }
      </List>
    </>
  );
}

export default withTranslation('common')(AdminPortalLeftPanel);
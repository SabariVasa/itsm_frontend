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
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import styles from "../../Pages/endUser/scss/UserPortalLeftPanel.module.scss";
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';

function AdminPortalLeftPanel(props) {
  const { navbarOptions, tabClickHandler, drawer, t, bgcolur } = props;
  const [expanded, setExpanded] = useState(false);
  const [superAdmin, setSuperAdmin] = useState(false);
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
    if (authAdmin === "Super Admin") {
      setSuperAdmin(true);
    }
  }, [])

  return (
    <>
      <List style={{ margin: '0.5em', background: bgcolur, borderRadius: '0.5em' }}>
        <div className="sidebar-item">
          {props.drawer ?
            <div style={{ height: 57, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
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
                  <ListItemIcon sx={{ minWidth: "37px !important" }}>
                    {IconComponent && <IconComponent sx={{ color: "white" }} />}
                  </ListItemIcon>
                  {drawer && <ListItemText sx={{ cursor: 'pointer', fontSize: '12px !important', marginLeft: '2.5em' }} primary={ele.label} />}
                </AccordionSummary>
                <AccordionDetails sx={{ padding: '8px 8px 8px !important', background: 'white', }}>
                  {ele.label === "Incident Mansx={{ paddingTop: '0 !important', paddingLeft: '29px' }}agement" ? (
                    <>
                      <ListItem sx={{ paddingTop: '0 !important', paddingLeft: '29px' }} onClick={() => tabClickHandler(i, "create_incident")}>
                        <ListItemText sx={{ cursor: 'pointer', fontSize: '12px !important', borderBottom: '1px solid #B2BEB5', marginLeft: '2.5em' }} primary="Create Incident" />
                      </ListItem>
                      <ListItem sx={{ paddingTop: '0 !important', paddingLeft: '29px' }} onClick={() => tabClickHandler(i, "open_incident")}>
                        <ListItemText sx={{ cursor: 'pointer', fontSize: '12px !important', borderBottom: '1px solid #B2BEB5', marginLeft: '2.5em' }} primary="Open Incident" />
                      </ListItem>
                      <ListItem sx={{ paddingTop: '0 !important', paddingLeft: '29px' }} onClick={() => tabClickHandler(i, "assign_to_me")}>
                        <ListItemText sx={{ cursor: 'pointer', fontSize: '12px !important', borderBottom: '1px solid #B2BEB5', marginLeft: '2.5em' }} primary="Assign-to-me" />
                      </ListItem>
                      <ListItem sx={{ paddingTop: '0 !important', paddingLeft: '29px' }} onClick={() => tabClickHandler(i, "all_incidents")}>
                        <ListItemText sx={{ cursor: 'pointer', fontSize: '12px !important', borderBottom: '1px solid #B2BEB5', marginLeft: '2.5em' }} primary="All Incident" />
                      </ListItem>
                    </>
                  ) : ele.label === "Request Management" ? (
                    <>
                      <ListItem sx={{ paddingTop: '0 !important', paddingLeft: '29px' }} onClick={() => tabClickHandler(i, "my_request")}>
                        <ListItemText sx={{ cursor: 'pointer', fontSize: '12px !important', borderBottom: '1px solid #B2BEB5', marginLeft: '2.5em' }} primary="My Request" />
                      </ListItem>
                      <ListItem sx={{ paddingTop: '0 !important', paddingLeft: '29px' }} onClick={() => tabClickHandler(i, "request_service")}>
                        <ListItemText sx={{ cursor: 'pointer', fontSize: '12px !important', borderBottom: '1px solid #B2BEB5', marginLeft: '2.5em' }} primary="Request Service" />
                      </ListItem>
                    </>
                  ) : ele.label === "Change Management" ?
                    <>
                      <ListItem sx={{ paddingTop: '0 !important', paddingLeft: '29px' }} onClick={() => tabClickHandler(i, "new_change")}>
                        <ListItemText sx={{ cursor: 'pointer', fontSize: '12px !important', borderBottom: '1px solid #B2BEB5', marginLeft: '2.5em' }} primary="New Change" />
                      </ListItem>
                      <ListItem sx={{ paddingTop: '0 !important', paddingLeft: '29px' }} onClick={() => tabClickHandler(i, "all_change")}>
                        <ListItemText sx={{ cursor: 'pointer', fontSize: '12px !important', borderBottom: '1px solid #B2BEB5', marginLeft: '2.5em' }} primary="All Change" />
                      </ListItem>
                    </> : ele.label === "CMDB Management" && <>
                      <ListItem sx={{ paddingTop: '0 !important', paddingLeft: '29px' }} onClick={() => tabClickHandler(i, "create_config")}>
                        <ListItemText sx={{ cursor: 'pointer', fontSize: '12px !important', borderBottom: '1px solid #B2BEB5', marginLeft: '2.5em' }} primary={t('create_config')} />
                      </ListItem>
                      <ListItem sx={{ paddingTop: '0 !important', paddingLeft: '29px' }} onClick={() => tabClickHandler(i, "class_manage")}>
                        <ListItemText sx={{ cursor: 'pointer', fontSize: '12px !important', borderBottom: '1px solid #B2BEB5', marginLeft: '2.5em' }} primary={t('class_manage')} />
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
                    // sx={{ paddingTop: '0 !important', paddingLeft: '29px' }}
                    key={`${ele.label}-key`}
                    onClick={() => tabClickHandler(i)}
                    button
                  >
                    {drawer ? (
                      <ListItemIcon sx={{ minWidth: "37px !important" }}>
                        {IconComponent && <IconComponent sx={{ color: 'white' }} />}
                      </ListItemIcon>
                    ) : (
                      <ListItemIcon sx={{ minWidth: "37px !important" }}>
                        {IconComponent && <IconComponent sx={{ color: 'white' }} />}
                      </ListItemIcon>
                    )}
                    {drawer ? <ListItemText
                      primary={ele.label}
                      sx={{ cursor: 'pointer', fontSize: '12px !important', borderBottom: '1px solid #B2BEB5', marginLeft: '2.5em' }}
                    /> : null}
                  </ListItem>
                </>
              ) : (
                <PopupState variant="popover" popupId={`${ele.label}-popover`} key={`${ele.label}-popup`}>
                  {(popupState) => (
                    <>
                      <ListItem
                        sx={{ paddingTop: '0 !important', paddingLeft: '29px' }}
                        button
                        onClick={() => tabClickHandler(i)}
                        {...bindTrigger(popupState)}
                      >
                        <ListItemIcon sx={{ minWidth: "37px !important" }}>
                          {IconComponent && <IconComponent sx={{ color: "white" }} />}
                        </ListItemIcon>
                        {drawer && <ListItemText sx={{ cursor: 'pointer', fontSize: '12px !important', borderBottom: '1px solid #B2BEB5', marginLeft: '2.5em' }} primary={t(ele.label)} />}
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
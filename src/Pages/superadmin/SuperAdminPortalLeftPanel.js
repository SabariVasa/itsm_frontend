// import React, { useEffect, useState } from "react";
// import { withTranslation } from 'react-i18next';
// import {
//   List,
//   ListItem,
//   ListItemText,
//   ListItemIcon,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Tooltip,
// } from "@mui/material";
// import TokenIcon from '@mui/icons-material/Token';
// import LogoutIcon from '@mui/icons-material/Logout';
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import StorageIcon from '@mui/icons-material/Storage';
// import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
// import NetworkPingIcon from "@mui/icons-material/NetworkPing";
// import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
// import RepeatIcon from "@mui/icons-material/Repeat";
// import MenuBookIcon from "@mui/icons-material/MenuBook";
// import Typography from "@mui/material/Typography";
// import Popover from "@mui/material/Popover";
// import BusinessIcon from '@mui/icons-material/Business';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
// // import UserInfo from "../../models/UserInfo";
// import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
// import styles from "../../Pages/endUser/scss/UserPortalLeftPanel.module.scss";
// import { useHistory } from "react-router-dom";
// import _ from "lodash";
// import GroupIcon from '@mui/icons-material/Group';
// import PersonIcon from '@mui/icons-material/Person';
// import { AiOutlineForm } from "react-icons/ai";
// import styless from './scss/SuperAdmin.module.scss';

// function SuperAdminPortalLeftPanel(props) {
//   const { navbarOptions, tabClickHandler, drawer, t, bgcolur } = props;
//   const history = useHistory
//   const [expanded, setExpanded] = useState(false);
//   const [superAdmin, setSuperAdmin] = useState(false);
//   // const userName = UserInfo.getUsername();
//   const handleAccordionChange = (panel) => (event, isExpanded) => {
//     setExpanded(isExpanded ? panel : false);
//   };

//   const handleLogoutRedirect = () => {

//   };

//   const iconMapping = {
//     Dashboards: HomeOutlinedIcon,
//     "Incident Management": NetworkPingIcon,
//     CMDB: StorageIcon,
//     "Request Management": RepeatIcon,
//     "Change Management": ChangeCircleIcon,
//     "Knowledge Article": MenuBookIcon,
//     'CMDB Management': StorageIcon,
//     'Generate Token': TokenIcon,
//     'User Management': PersonIcon,
//     'Form Generator': FormatAlignJustifyIcon,
//     'Group Management': GroupIcon,
//     'Organization Management': BusinessIcon
//   };

//   useEffect(() => {
//     let authAdmin = localStorage.getItem("role");
//     // let endUser = localStorage.getItem("User");
//     if (authAdmin === "Super Admin") {
//       setSuperAdmin(true);
//     }
//   }, [])

//   return (
//     <div style={{ marginLeft: '0.5em', background: bgcolur, borderRadius: '0.5em' }}>
//       <div className="sidebar-item">
//         {props.drawer ?
//           <div style={{ height: 57, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
//             <img alt="logo" src={"/updateLogo.png"} style={{
//               width: '154.09px',
//               height: '35.32px',
//               top: '348.66px',
//               left: '221.92px',
//               gap: '0px',
//               opacity: '0px'
//             }} />
//             {/* <p style={{ fontSize: 28, color: "white", marginTop: 36 }} className='company-profile'>
//                 Desk
//               </p> */}
//           </div> : null}
//       </div>
//       <List>
//         {navbarOptions.map((ele, i) => {
//           const IconComponent = iconMapping[ele.icon];

//           // Check if the label is "Report an issue" or "Request Something" and drawer is true
//           if ((ele.label === "Incident Management" || ele.label === "Request Management" || ele.label === "Change Management" || ele.label === "CMDB Management") && drawer) {
//             return (
//               <Accordion
//                 key={`${ele.label}-accordion`}
//                 expanded={expanded === ele.label}
//                 onChange={handleAccordionChange(ele.label)}
//                 className={styles.accordionContainer}
//                 sx={{ margin: '0 !important' }}
//               >
//                 <AccordionSummary
//                   expandIcon={<KeyboardArrowDownIcon sx={{ color: "white" }} />}
//                   aria-controls={`${ele.label}-content`}
//                   id={`${ele.label}-header`}
//                 >
//                   <ListItemIcon sx={{ minWidth: "37px !important" }}>
//                     {IconComponent && <IconComponent sx={{ color: "white" }} />}
//                   </ListItemIcon>
//                   {drawer && <ListItemText sx={{ color: "white" }} primary={ele.label} />}
//                 </AccordionSummary>
//                 <AccordionDetails sx={{ padding: '8px 8px 8px !important', background: 'white', }}>
//                   {ele.label === "Incident Management" ? (
//                     <>
//                       <ListItem onClick={() => tabClickHandler(i, "create_incident")} sx={{ paddingTop: '0 !important', paddingLeft: '29px' }} >
//                         <ListItemText sx={{ fontSize: '12px !important', borderBottom: '1px solid #B2BEB5', marginLeft: '2.5em' }} primary="Create Incident" />
//                       </ListItem>
//                       <ListItem sx={{ paddingTop: '0 !important', paddingLeft: '29px' }} onClick={() => tabClickHandler(i, "open_incident")}>
//                         <ListItemText sx={{ fontSize: '12px !important', borderBottom: '1px solid #B2BEB5', marginLeft: '2.5em' }} primary="Open Incident" />
//                       </ListItem>
//                       <ListItem sx={{ paddingTop: '0 !important', paddingLeft: '29px' }} onClick={() => tabClickHandler(i, "assign_to_me")}>
//                         <ListItemText sx={{ fontSize: '12px !important', borderBottom: '1px solid #B2BEB5', marginLeft: '2.5em' }} primary="Assign-to-me" />
//                       </ListItem>
//                       <ListItem sx={{ paddingTop: '0 !important', paddingLeft: '29px' }} onClick={() => tabClickHandler(i, "all_incidents")}>
//                         <ListItemText sx={{ fontSize: '12px !important', width: 'fit-content', marginLeft: '2.5em' }} primary="All Incident" />
//                       </ListItem>
//                     </>
//                   ) : ele.label === "Request Management" ? (
//                     <>
//                       <ListItem sx={{ paddingTop: '0 !important', paddingLeft: '29px' }} onClick={() => tabClickHandler(i, "my_request")}>
//                         <ListItemText sx={{ fontSize: '12px !important', borderBottom: '1px solid #B2BEB5', marginLeft: '2.5em' }} primary="My Request" />
//                       </ListItem>
//                       <ListItem sx={{ paddingTop: '0 !important', paddingLeft: '29px' }} onClick={() => tabClickHandler(i, "request_service")}>
//                         <ListItemText sx={{ fontSize: '12px !important', borderBottom: '1px solid #B2BEB5', marginLeft: '2.5em' }} primary="Request Service" />
//                       </ListItem>
//                     </>
//                   ) : ele.label === "Change Management" ?
//                     <>
//                       <ListItem sx={{ paddingTop: '0 !important', paddingLeft: '29px' }} onClick={() => tabClickHandler(i, "new_change")}>
//                         <ListItemText sx={{ fontSize: '12px !important', borderBottom: '1px solid #B2BEB5', marginLeft: '2.5em' }} primary="New Change" />
//                       </ListItem>
//                       <ListItem sx={{ paddingTop: '0 !important', paddingLeft: '29px' }} onClick={() => tabClickHandler(i, "all_change")}>
//                         <ListItemText sx={{ fontSize: '12px !important', borderBottom: '1px solid #B2BEB5', marginLeft: '2.5em' }} primary="All Change" />
//                       </ListItem>
//                     </> : ele.label === "CMDB Management" && <>
//                       <ListItem sx={{ paddingTop: '0 !important', paddingLeft: '29px' }} onClick={() => tabClickHandler(i, "create_config")}>
//                         <ListItemText sx={{ fontSize: '12px !important', borderBottom: '1px solid #B2BEB5', marginLeft: '2.5em' }} primary={t('create_config')} />
//                       </ListItem>
//                       <ListItem sx={{ paddingTop: '0 !important', paddingLeft: '29px' }} onClick={() => tabClickHandler(i, "class_manage")}>
//                         <ListItemText sx={{ fontSize: '12px !important', borderBottom: '1px solid #B2BEB5', marginLeft: '2.5em' }} primary={t('class_manage')} />
//                       </ListItem>
//                     </>}
//                 </AccordionDetails>
//               </Accordion>
//             );
//           } else {
//             return (
//               !(ele.label === "Incident Management" || ele.label === "Request Management" || ele.label === "Change Management") ? (
//                 <>
//                   <ListItem
//                     key={`${ele.label}-key`}
//                     onClick={() => tabClickHandler(i)}
//                     button
//                   >
//                     {drawer ? (
//                       <ListItemIcon sx={{ minWidth: "37px !important" }}>
//                         {IconComponent && <IconComponent sx={{ color: 'white' }} />}
//                       </ListItemIcon>
//                     ) : (
//                       <ListItemIcon sx={{ minWidth: "37px !important", margin: '1em 0', width: '50%', display: 'flex', justifyContent: 'center' }}>
//                         {IconComponent && <IconComponent sx={{ display: 'flex', justifyContent: 'center', color: 'white' }} />}
//                       </ListItemIcon>
//                     )}
//                     {drawer ? <ListItemText
//                       primary={ele.label}
//                       sx={{ color: 'white' }}
//                     /> : null}
//                   </ListItem >
//                 </>
//               ) : (
//                 <PopupState variant="popover" popupId={`${ele.label}-popover`} key={`${ele.label}-popup`}>
//                   {(popupState) => (
//                     <>
//                       <ListItem
//                         button
//                         onClick={() => tabClickHandler(i)}
//                         {...bindTrigger(popupState)}
//                       >
//                         <ListItemIcon sx={{ margin: '1em 0', width: '100%', display: 'flex', justifyContent: 'center' }}>
//                           {IconComponent && <IconComponent sx={{ color: "white" }} />}
//                         </ListItemIcon>
//                         {drawer && <ListItemText primary={t(ele.label)} sx={{ color: "white" }} />}
//                       </ListItem>
//                       {ele.label === "Knowledge Article" ? <hr className="sidenav-hr" /> : null}
//                       <Popover
//                         {...bindPopover(popupState)}
//                         anchorOrigin={{
//                           vertical: "bottom",
//                           horizontal: "center",
//                         }}
//                         transformOrigin={{
//                           vertical: "top",
//                           horizontal: "center",
//                         }}
//                       >
//                         {ele.label === "Incident Management" ? (
//                           <>
//                             <Typography sx={{ p: 2 }} onClick={() => tabClickHandler(i, "create_incident")}>{t('create_incident')}</Typography>
//                             <Typography sx={{ p: 2 }} onClick={() => tabClickHandler(i, "open_incident")}>{t(`open_incident`)}</Typography>
//                             <Typography sx={{ p: 2 }} onClick={() => tabClickHandler(i, "assign_to_me")}>{t(`assign_to_me`)}</Typography>
//                             <Typography sx={{ p: 2 }} onClick={() => tabClickHandler(i, "all_incidents")}>{t(`all_incident`)}</Typography>
//                           </>
//                         ) : ele.label === "Request Management" ? (
//                           <>
//                             <Typography sx={{ p: 2 }} onClick={() => tabClickHandler(i, "my_request")}>{t(`request_status`)}</Typography>
//                             <Typography sx={{ p: 2 }} onClick={() => tabClickHandler(i, "request_service")}>{t(`request_service`)}</Typography>
//                           </>
//                         ) : ele.label === "Change Management" ? (
//                           <>
//                             <Typography sx={{ p: 2 }} onClick={() => tabClickHandler(i, "new_change")}>{t(`new_change`)}</Typography>
//                             <Typography sx={{ p: 2 }} onClick={() => tabClickHandler(i, "all_change")}>{t(`all_change`)}</Typography>
//                           </>
//                         ) : ele.label === "CMDB Management" && (
//                           <>
//                             <Typography sx={{ p: 2 }} onClick={() => tabClickHandler(i, "create_config")}>{t(`create_config`)}</Typography>
//                             <Typography sx={{ p: 2 }} onClick={() => tabClickHandler(i, "class_manage")}>{t(`class_manage`)}</Typography>
//                           </>
//                         )}

//                       </Popover>
//                     </>
//                   )}
//                 </PopupState>
//               )
//             );
//           }
//         })}
//         {/* {props.drawer ?
//           <div className={superAdmin ? "profile-container-admin" : "profile-container"}>
//             <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", marginTop: 10 }}>
//               <Tooltip title="Profile">
//                 <div style={{ cursor: "pointer" }}>
//                   <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTadSAgMa0Si3aeLKU9sPJ24i1IZX3nKOVLnA&s" height="40px" width="40px" alt="profile-pic" style={{ borderRadius: 10, marginTop: 10, marginLeft: 5 }} />
//                 </div>
//               </Tooltip>
//               <div style={{ width: "100%", textOverflow: "ellipses", marginLeft: 15 }}>
//                 <p style={{ color: "black" }}>{localStorage.getItem("userEmail")}</p>
//               </div>
//               <div>
//                 {
//                 props.drawer 
//                 ? <div className='sidebar-item-decor-logout' onClick={() => { handleLogoutRedirect() }} style={{ marginTop: 5 }}>
//                   <LogoutIcon style={{ color: "#ff3333" }} />
//                   <p style={{ fontSize: 18, color: "red" }} >Logout</p>
//                 </div> : <div className='sidebar-item-decor-logout'>
//                   <LogoutIcon style={{ color: "red" }} onClick={() => { localStorage.removeItem("Authentication-Token"); window.location.replace("/"); localStorage.removeItem("userEmail"); localStorage.removeItem("Admin") }} />
//                 </div>
//                 }
//               </div>
//             </div>
//           </div> : <div>
//             <div>
//               <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTadSAgMa0Si3aeLKU9sPJ24i1IZX3nKOVLnA&s" height="30px" width="30px" alt="profile-pic" style={{ borderRadius: 10, marginBottom: 30 }} />
//             </div>
//             {localStorage.getItem('userName')}
//             <div className='sidebar-item-decor'>
//               <Tooltip title="logout">
//                 <LogoutIcon style={{ color: "red", fontSize: 25 }} onClick={() => { localStorage.removeItem("Authentication-Token"); window.location.replace("/"); localStorage.removeItem("userEmail"); localStorage.removeItem("Admin") }} />
//               </Tooltip>
//             </div>
//           </div>
//         } */}
//       </List >
//     </div>
//   );
// }
// export default withTranslation('common')(SuperAdminPortalLeftPanel);
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
  Typography,
  Popover,
} from "@mui/material";
import {
  HomeOutlined as HomeOutlinedIcon,
  NetworkPing as NetworkPingIcon,
  Storage as StorageIcon,
  ChangeCircle as ChangeCircleIcon,
  Repeat as RepeatIcon,
  MenuBook as MenuBookIcon,
  Token as TokenIcon,
  Logout as LogoutIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Business as BusinessIcon,
  Group as GroupIcon,
  Person as PersonIcon,
  FormatAlignJustify as FormatAlignJustifyIcon
} from '@mui/icons-material';
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import styles from "./scss/SuperAdmin.module.scss";
import { useHistory } from "react-router-dom";

function SuperAdminPortalLeftPanel(props) {
  const { navbarOptions, tabClickHandler, drawer, t, bgcolur, toggleDrawer } = props;
  const history = useHistory();
  const [expanded, setExpanded] = useState(false);
  const [superAdmin, setSuperAdmin] = useState(false);

  // Function to handle accordion state
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Function to handle logout
  const handleLogoutRedirect = () => {
    localStorage.removeItem("Authentication-Token");
    window.location.replace("/");
  };

  // Mapping icons for labels
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
    'Form Generator': FormatAlignJustifyIcon,
    'Group Management': GroupIcon,
    'Organization Management': BusinessIcon
  };

  // Check for admin role on component mount
  useEffect(() => {
    const authAdmin = localStorage.getItem("role");
    if (authAdmin === "Super Admin") {
      setSuperAdmin(true);
    }
  }, []);

  return (
    <div style={{ width: '95%', marginLeft: '0.5em', background: bgcolur, borderRadius: '0.5em' }}>
      {drawer && (
        <div style={{ height: 57, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img
            alt="logo"
            src={"/updateLogo.png"}
            style={{ width: '154.09px', height: '35.32px' }}
          />
        </div>
      )}
      <List>
        {navbarOptions.map((ele, i) => {
          const IconComponent = iconMapping[ele.icon];
          const isAccordion = ["Incident Management", "Request Management", "Change Management", "CMDB Management"].includes(ele.label);

          return isAccordion && drawer ? (
            <div sx={{ margin: '0 !important', }}>
              <Accordion
                key={`${ele.label}-accordion`}
                expanded={expanded === ele.label}
                onChange={handleAccordionChange(ele.label)}
                className={styles.accordionContainer}
              // sx={{ margin: '0 !important', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}
              >
                <AccordionSummary
                  expandIcon={<KeyboardArrowDownIcon sx={{ color: "white", margin: '0 !important' }} />}
                  aria-controls={`${ele.label}-content`}
                  id={`${ele.label}-header`}
                  sx={{
                    '&.Mui-expanded': {
                      // fontWeight: 'bold',
                      minHeight: '48px', // Override default height for expanded state
                    },
                    '.MuiAccordionSummary-content': {
                      margin: '0',
                    },
                    '.MuiAccordionSummary-content.Mui-expanded': {
                      marginTop: '12px',
                      // height: "4em !important"
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: "37px !important" }}>
                    {IconComponent && <IconComponent sx={{ color: "white" }} />}
                  </ListItemIcon>
                  {drawer && <ListItemText sx={{ color: "white" }} primary={ele.label} />}
                </AccordionSummary>
                <AccordionDetails sx={{ paddingTop: '0px', color: 'white', width: '100%' }}>
                  {ele.label === "Incident Management" && (
                    <div style={{ paddingLeft: '4em', width: '62%' }}>
                      <ListItem sx={{
                        borderBottom: '1px solid #2A0052',
                        boxShadow: 'white !important',
                        paddingBottom: 'unset'
                      }} onClick={() => tabClickHandler(i, "create_incident")}>
                        <ListItemText primary="Create Incident" />
                      </ListItem>
                      <ListItem sx={{
                        borderBottom: '1px solid #2A0052',
                        paddingBottom: 'unset'
                      }}
                        onClick={() => tabClickHandler(i, "open_incident")}>
                        <ListItemText primary="Open Incident" />
                      </ListItem>
                      <ListItem sx={{
                        borderBottom: '1px solid #2A0052',
                        paddingBottom: 'unset'
                      }}
                        onClick={() => tabClickHandler(i, "assign_to_me")}>
                        <ListItemText primary="Assign-to-me" />
                      </ListItem>
                      <ListItem sx={{
                        // borderBottom: '1px solid #2A0052',
                        paddingBottom: 'unset'
                      }}
                        onClick={() => tabClickHandler(i, "all_incidents")}>
                        <ListItemText primary="All Incidents" />
                      </ListItem>
                    </div>
                  )}
                  {ele.label === "Request Management" && (
                    <div style={{ paddingLeft: '4em', width: '62%' }}>
                      <ListItem sx={{
                        borderBottom: '1px solid #2A0052',
                        paddingBottom: 'unset'
                      }}
                        onClick={() => tabClickHandler(i, "my_request")}>
                        <ListItemText primary="My Request" />
                      </ListItem>
                      <ListItem sx={{
                        // borderBottom: '1px solid #2A0052',
                        paddingBottom: 'unset'
                      }}
                        onClick={() => tabClickHandler(i, "request_service")}>
                        <ListItemText primary="Request Service" />
                      </ListItem>
                    </div>
                  )}
                  {ele.label === "Change Management" &&
                    <div style={{ paddingLeft: '4em', width: '64%' }}>
                      <ListItem sx={{ paddingTop: '0 !important', paddingLeft: '29px' }} onClick={() => tabClickHandler(i, "new_change")}>
                        <ListItemText sx={{ fontSize: '12px !important', borderBottom: '1px solid #2A0052', marginLeft: '2.5em' }} primary="New Change" />
                      </ListItem>
                      <ListItem sx={{ paddingTop: '0 !important', paddingLeft: '29px' }} onClick={() => tabClickHandler(i, "all_change")}>
                        <ListItemText sx={{ fontSize: '12px !important', marginLeft: '2.5em' }} primary="All Change" />
                      </ListItem>
                    </div>
                  }
                  {ele.label === "CMDB Management"
                    && <div style={{ paddingLeft: '4em', width: '62%' }}>
                      <ListItem sx={{ paddingTop: '0 !important', paddingLeft: '29px' }} onClick={() => tabClickHandler(i, "create_config")}>
                        <ListItemText sx={{ fontSize: '12px !important', borderBottom: '1px solid #2A0052', marginLeft: '2.5em' }} primary={t('create_config')} />
                      </ListItem>
                      <ListItem sx={{ paddingTop: '0 !important', paddingLeft: '29px' }} onClick={() => tabClickHandler(i, "class_manage")}>
                        <ListItemText sx={{ fontSize: '12px !important', borderBottom: '1px solid #2A0052', marginLeft: '2.5em' }} primary={t('class_manage')} />
                      </ListItem>
                    </div>}
                </AccordionDetails>
              </Accordion>
            </div>
          ) : (
            <ListItem
              key={`${ele.label}-key`}
              onClick={() => tabClickHandler(i)}
              button
              sx={{ padding: '16px !important' }}
            >
              <div style={{ width: '100%', boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)", display: 'flex', }}>
                <ListItemIcon sx={{ minWidth: "37px !important" }}>
                  {IconComponent && <IconComponent sx={{ color: 'white', marginRight: '0.6em' }} />}
                  {drawer && <ListItemText primary={ele.label} sx={{ color: 'white' }} />}
                </ListItemIcon>

              </div>
            </ListItem>
          );
        })}
        {drawer && (
          <div className="profile-container">
            <div style={{ cursor: "pointer" }}>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTadSAgMa0Si3aeLKU9sPJ24i1IZX3nKOVLnA&s" height="40px" width="45px" alt="profile-pic" style={{ borderRadius: 22, marginTop: 10, marginLeft: 5 }} />
            </div>
            <div className="profile-name-container" onClick={() => toggleDrawer('left', true)} >
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", margin: '0 1em' }}>
                <div style={{ width: "100%", textOverflow: "ellipses", marginLeft: "0 15px" }}>
                  <p style={{ color: "black" }}>{localStorage.getItem('userName')}</p>
                </div>
              </div>
              <div>
              </div>
            </div>
          </div>
        )}
      </List>
    </div>
  );
  // return (
  //   <div style={{
  //     marginLeft: '0.5em',
  //     background: bgcolur,
  //     borderRadius: '0.5em',
  //   }}>
  //     {drawer && (
  //       <div
  //         style={{
  //           height: 57,
  //           display: 'flex',
  //           alignItems: 'center',
  //           justifyContent: 'center'
  //         }}
  //       >
  //         <img
  //           alt="logo"
  //           src={"/updateLogo.png"}
  //           style={{ width: '154.09px', height: '35.32px' }}
  //         />
  //       </div>
  //     )}
  //     <div
  //       style={{
  //         marginLeft: '0.5em',
  //         // background: bgcolur,
  //         // borderRadius: '0.5em',
  //         display: 'flex',
  //         flexDirection: 'column',

  //       }}
  //     >
  //       <List style={{ width: '100%' }}> {/* Ensure List occupies full width */}
  //         {navbarOptions.map((ele, i) => {
  //           const IconComponent = iconMapping[ele.icon];
  //           const isAccordion = ["Incident Management", "Request Management", "Change Management", "CMDB Management"].includes(ele.label);

  //           return isAccordion && drawer ? (
  //             <Accordion
  //               key={`${ele.label}-accordion`}
  //               expanded={expanded === ele.label}
  //               onChange={handleAccordionChange(ele.label)}
  //               className={styles.accordionContainer}
  //               sx={{
  //                 margin: '0 !important',
  //                 background: 'transparent',
  //                 display: 'flex',
  //                 alignItems: 'center',
  //                 justifyContent: 'center', // Align accordion content to the right
  //               }}
  //             >
  //               <AccordionSummary
  //                 expandIcon={<KeyboardArrowDownIcon sx={{ color: "white" }} />}
  //                 aria-controls={`${ele.label}-content`}
  //                 id={`${ele.label}-header`}
  //                 sx={{ justifyContent: 'flex-end' }} // Align accordion summary to the right
  //               >
  //                 <ListItemIcon sx={{ minWidth: "37px !important" }}>
  //                   {IconComponent && <IconComponent sx={{ color: "white" }} />}
  //                 </ListItemIcon>
  //                 {drawer && <ListItemText sx={{ color: "white", textAlign: 'right' }} primary={ele.label} />}
  //               </AccordionSummary>
  //               <AccordionDetails sx={{ padding: '8px', background: 'white' }}>
  //                 {ele.label === "Incident Management" && (
  //                   <>
  //                     <ListItem onClick={() => tabClickHandler(i, "create_incident")}>
  //                       <ListItemText primary="Create Incident" sx={{ textAlign: 'right' }} />
  //                     </ListItem>
  //                     <ListItem onClick={() => tabClickHandler(i, "open_incident")}>
  //                       <ListItemText primary="Open Incident" sx={{ textAlign: 'right' }} />
  //                     </ListItem>
  //                     <ListItem onClick={() => tabClickHandler(i, "assign_to_me")}>
  //                       <ListItemText primary="Assign-to-me" sx={{ textAlign: 'right' }} />
  //                     </ListItem>
  //                     <ListItem onClick={() => tabClickHandler(i, "all_incidents")}>
  //                       <ListItemText primary="All Incidents" sx={{ textAlign: 'right' }} />
  //                     </ListItem>
  //                   </>
  //                 )}
  //                 {ele.label === "Request Management" && (
  //                   <>
  //                     <ListItem onClick={() => tabClickHandler(i, "my_request")}>
  //                       <ListItemText primary="My Request" sx={{ textAlign: 'right' }} />
  //                     </ListItem>
  //                     <ListItem onClick={() => tabClickHandler(i, "request_service")}>
  //                       <ListItemText primary="Request Service" sx={{ textAlign: 'right' }} />
  //                     </ListItem>
  //                   </>
  //                 )}
  //               </AccordionDetails>
  //             </Accordion>
  //           ) : (
  //             <ListItem
  //               key={`${ele.label}-key`}
  //               onClick={() => tabClickHandler(i)}
  //               button
  //               sx={{ justifyContent: 'flex-end', boxShadow: 'gray !important' }} // Align ListItem to the right
  //             >
  //               <ListItemIcon sx={{ minWidth: "37px !important" }}>
  //                 {IconComponent && <IconComponent sx={{ color: 'white' }} />}
  //               </ListItemIcon>
  //               {drawer && <ListItemText primary={ele.label} sx={{ color: 'white', textAlign: 'right' }} />}
  //             </ListItem>
  //           );
  //         })}
  //         {drawer && (
  //           <div className="profile-container" style={{ display: 'flex', justifyContent: 'flex-end' }}>
  //             <Tooltip title="Logout">
  //               <LogoutIcon style={{ color: "red" }} onClick={handleLogoutRedirect} />
  //             </Tooltip>
  //           </div>
  //         )}
  //       </List>
  //     </div>
  //   </div>

  // );

}

export default withTranslation('common')(SuperAdminPortalLeftPanel);

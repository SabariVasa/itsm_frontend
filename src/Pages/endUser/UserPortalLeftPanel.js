// // import React, { useState } from "react";
// // import { List, ListItem, ListItemText, ListItemIcon, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
// // import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// // import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
// // import NetworkPingIcon from '@mui/icons-material/NetworkPing';
// // import RepeatIcon from '@mui/icons-material/Repeat';
// // import MenuBookIcon from '@mui/icons-material/MenuBook';
// // import Typography from '@mui/material/Typography';
// // import Popover from '@mui/material/Popover';
// // import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
// // import styles from './scss/UserPortalLeftPanel.module.scss';

// // function UserPortalLeftPanel({ activeTab, navbarOptions, tabClickHandler, drawer }) {
// //   const [expanded, setExpanded] = useState(false);

// //   const handleAccordionChange = (panel) => (event, isExpanded) => {
// //     setExpanded(isExpanded ? panel : false);
// //   };


// //   const iconMapping = {
// //     Dashboards: HomeOutlinedIcon,
// //     'Report an issue': NetworkPingIcon,
// //     'Request Something': RepeatIcon,
// //     'Knowledge Base': MenuBookIcon,
// //   };

// //   return (
// //     <List>
// //       {navbarOptions.map((ele, i) => {
// //         const IconComponent = iconMapping[ele.icon];
// //         (ele.label === "Report an issue" || ele.label === "Request Something") && drawer ? (
// //           <Accordion
// //             key={`${ele.label}-accordion`}
// //             expanded={expanded === ele.label}
// //             onChange={handleAccordionChange(ele.label)}
// //             className={styles.accordionContainer}
// //           >
// //             <AccordionSummary
// //               expandIcon={<KeyboardArrowDownIcon sx={{ color: "white" }} />}
// //               aria-controls={`${ele.label}-content`}
// //               id={`${ele.label}-header`}
// //             >
// //               <ListItemIcon>
// //                 {IconComponent && <IconComponent sx={{ color: "white" }} />}
// //               </ListItemIcon>
// //               {drawer && <ListItemText sx={{ color: "white" }} primary={ele.label} />}
// //             </AccordionSummary>
// //             <AccordionDetails sx={{ marginLeft: "3em" }}>
// //               {ele.label === "Report an issue" ? (
// //                 <>
// //                   <ListItem onClick={() => tabClickHandler(i, "create_incident")}>
// //                     <ListItemText sx={{ color: "white" }} primary="Create Incident" />
// //                   </ListItem>
// //                   <ListItem onClick={() => tabClickHandler(i, "incident_status")}>
// //                     <ListItemText sx={{ color: "white" }} primary="Incident Status" />
// //                   </ListItem>
// //                 </>
// //               ) : ele.label === "Request Something" ? (
// //                 <>
// //                   <ListItem onClick={() => tabClickHandler(i, "request_service")}>
// //                     <ListItemText sx={{ color: "white" }} primary="Request Service" />
// //                   </ListItem>
// //                   <ListItem onClick={() => tabClickHandler(i, "request_status")}>
// //                     <ListItemText sx={{ color: "white" }} primary="Request Status" />
// //                   </ListItem>
// //                 </>
// //               ) : null}
// //             </AccordionDetails>
// //           </Accordion>
// //         ) : (
// //           <PopupState variant="popover" popupId={`${ele.label}-popover`} key={`${ele.label}-popup`}>
// //             {(popupState) => (
// //               <>
// //                 <ListItem
// //                   button
// //                   onClick={() => tabClickHandler(i)}
// //                   {...bindTrigger(popupState)}
// //                 >
// //                   <ListItemIcon>
// //                     {IconComponent && <IconComponent sx={{ color: "white" }} />}
// //                   </ListItemIcon>
// //                   {drawer && <ListItemText primary={ele.label} sx={{ color: "white" }} />}
// //                 </ListItem>
// //                 <Popover
// //                   {...bindPopover(popupState)}
// //                   anchorOrigin={{
// //                     vertical: "bottom",
// //                     horizontal: "center",
// //                   }}
// //                   transformOrigin={{
// //                     vertical: "top",
// //                     horizontal: "center",
// //                   }}
// //                 >
// //                   <Typography sx={{ p: 2 }}>{`Content for ${ele.label}`}</Typography>
// //                 </Popover>
// //               </>
// //             )}
// //           </PopupState>
// //         );
// //         // <ListItem
// //         //   key={`${ele.label}-key`}
// //         //   onClick={() => tabClickHandler(i)}
// //         //   button
// //         // >
// //         //   <ListItemIcon>
// //         //     {IconComponent && <IconComponent sx={{ color: 'white' }} />}
// //         //   </ListItemIcon>
// //         //   {drawer ? <ListItemText
// //         //     primary={ele.label}
// //         //     sx={{ color: 'white' }}
// //         //   /> : null}

// //         // </ListItem>
// //       })}
// //     </List>
// //   );
// // }

// // export default UserPortalLeftPanel
// import React, { useState } from "react";
// import {
//   List,
//   ListItem,
//   ListItemText,
//   ListItemIcon,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
// } from "@mui/material";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
// import NetworkPingIcon from "@mui/icons-material/NetworkPing";
// import RepeatIcon from "@mui/icons-material/Repeat";
// import MenuBookIcon from "@mui/icons-material/MenuBook";
// import Typography from "@mui/material/Typography";
// import Popover from "@mui/material/Popover";
// import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
// import styles from "./scss/UserPortalLeftPanel.module.scss";

// function UserPortalLeftPanel({ activeTab, navbarOptions, tabClickHandler, drawer }) {
//   const [expanded, setExpanded] = useState(false);

//   const handleAccordionChange = (panel) => (event, isExpanded) => {
//     setExpanded(isExpanded ? panel : false);
//   };

//   const iconMapping = {
//     Dashboards: HomeOutlinedIcon,
//     "Report an issue": NetworkPingIcon,
//     "Request Something": RepeatIcon,
//     "Knowledge Base": MenuBookIcon,
//   };

//   return (
//     <List>
//       {navbarOptions.map((ele, i) => {
//         const IconComponent = iconMapping[ele.icon];

//         // Check if the label is "Report an issue" or "Request Something" and drawer is true
//         if ((ele.label === "Report an issue" || ele.label === "Request Something") && drawer) {
//           return (
//             <Accordion
//               key={`${ele.label}-accordion`}
//               expanded={expanded === ele.label}
//               onChange={handleAccordionChange(ele.label)}
//               className={styles.accordionContainer}
//             >
//               <AccordionSummary
//                 expandIcon={<KeyboardArrowDownIcon sx={{ color: "white" }} />}
//                 aria-controls={`${ele.label}-content`}
//                 id={`${ele.label}-header`}
//               >
//                 <ListItemIcon>
//                   {IconComponent && <IconComponent sx={{ color: "white" }} />}
//                 </ListItemIcon>
//                 {drawer && <ListItemText sx={{ color: "white" }} primary={ele.label} />}
//               </AccordionSummary>
//               <AccordionDetails sx={{ marginLeft: "3em" }}>
//                 {ele.label === "Report an issue" ? (
//                   <>
//                     <ListItem onClick={() => tabClickHandler(i, "create_incident")}>
//                       <ListItemText sx={{ color: "white" }} primary="Create Incident" />
//                     </ListItem>
//                     <ListItem onClick={() => tabClickHandler(i, "incident_status")}>
//                       <ListItemText sx={{ color: "white" }} primary="Incident Status" />
//                     </ListItem>
//                   </>
//                 ) : ele.label === "Request Something" ? (
//                   <>
//                     <ListItem onClick={() => tabClickHandler(i, "request_service")}>
//                       <ListItemText sx={{ color: "white" }} primary="Request Service" />
//                     </ListItem>
//                     <ListItem onClick={() => tabClickHandler(i, "request_status")}>
//                       <ListItemText sx={{ color: "white" }} primary="Request Status" />
//                     </ListItem>
//                   </>
//                 ) : null}
//               </AccordionDetails>
//             </Accordion>
//           );
//         } else {
//           return (
//             !(ele.label === "Report an issue" || ele.label === "Request Something") ? (
//               <>
//                 <ListItem
//                   key={`${ele.label}-key`}
//                   onClick={() => tabClickHandler(i)}
//                   button
//                 >
//                   <ListItemIcon>
//                     {IconComponent && <IconComponent sx={{ color: 'white' }} />}
//                   </ListItemIcon>
//                   {drawer ? <ListItemText
//                     primary={ele.label}
//                     sx={{ color: 'white' }}
//                   /> : null}
//                 </ListItem>
//               </>
//             ) : (
//               <PopupState variant="popover" popupId={`${ele.label}-popover`} key={`${ele.label}-popup`}>
//                 {(popupState) => (
//                   <>
//                     <ListItem
//                       button
//                       onClick={() => tabClickHandler(i)}
//                       {...bindTrigger(popupState)}
//                     >
//                       <ListItemIcon>
//                         {IconComponent && <IconComponent sx={{ color: "white" }} />}
//                       </ListItemIcon>
//                       {drawer && <ListItemText primary={ele.label} sx={{ color: "white" }} />}
//                     </ListItem>
//                     <Popover
//                       {...bindPopover(popupState)}
//                       anchorOrigin={{
//                         vertical: "bottom",
//                         horizontal: "center",
//                       }}
//                       transformOrigin={{
//                         vertical: "top",
//                         horizontal: "center",
//                       }}
//                     >
//                       {ele.label === "Report an issue" ? (
//                         <>
//                           <Typography sx={{ p: 2 }} onClick={() => tabClickHandler(i, "create_incident")}>{`create_incident`}</Typography>
//                           <Typography sx={{ p: 2 }} onClick={() => tabClickHandler(i, "incident_status")}>{`incident_status`}</Typography>
//                         </>
//                       ) : ele.label === "Request Something" ? (
//                         <>
//                           <Typography sx={{ p: 2 }} onClick={() => tabClickHandler(i, "request_service")}>{`request_service`}</Typography>
//                           <Typography sx={{ p: 2 }} onClick={() => tabClickHandler(i, "request_status")}>{`request_status`}</Typography>
//                         </>
//                       ) : null}

//                     </Popover>
//                   </>
//                 )}
//               </PopupState>
//             )
//           );
//         }
//       })}
//     </List>
//   );
// }

// export default UserPortalLeftPanel;

import React, { useState } from "react";
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
import TokenIcon from '@mui/icons-material/Token'
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import StorageIcon from '@mui/icons-material/Storage';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NetworkPingIcon from "@mui/icons-material/NetworkPing";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import RepeatIcon from "@mui/icons-material/Repeat";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
// import UserInfo from "../../models/UserInfo";
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import styles from "../../Pages/endUser/scss/UserPortalLeftPanel.module.scss";
import _ from "lodash";
import GroupIcon from '@mui/icons-material/Group';
import { AiOutlineForm } from "react-icons/ai";
import styless from '../../Pages/superadmin/scss/SuperAdmin.module.scss';

function UserPortalLeftPanel(props) {
  const { navbarOptions, tabClickHandler, drawer, t } = props;
  const [expanded, setExpanded] = useState(false);
  // const userName = UserInfo.getUsername();
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const iconMapping = {
    Dashboards: HomeOutlinedIcon,
    "Report an issue": NetworkPingIcon,
    "Request Something": RepeatIcon,
    "Knowledge Base": MenuBookIcon,
  };

  return (
    <List>
      {navbarOptions.map((ele, i) => {
        const IconComponent = iconMapping[ele.icon];

        // Check if the label is "Report an issue" or "Request Something" and drawer is true
        if ((ele.label === "Request Something" || ele.label === "Report an issue") && drawer) {
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
                {ele.label === "Report an issue" ? (
                  <>
                    <ListItem onClick={() => tabClickHandler(i, "create_incident")}>
                      <ListItemText sx={{ color: "white" }} primary="Create Incident" />
                    </ListItem>
                    {/* <ListItem onClick={() => tabClickHandler(i, "incident_status")}>
                      <ListItemText sx={{ color: "white" }} primary="Incident Status" />
                    </ListItem> */}
                  </>
                ) : ele.label === "Request Something" ? (
                  <>
                    <ListItem onClick={() => tabClickHandler(i, "request_service")}>
                      <ListItemText sx={{ color: "white" }} primary="Request Service" />
                    </ListItem>
                    {/* <ListItem onClick={() => tabClickHandler(i, "request_status")}>
                      <ListItemText sx={{ color: "white" }} primary="Request Status" />
                    </ListItem> */}
                  </>
                ) : null}
              </AccordionDetails>
            </Accordion>
          );
        } else {
          return (
            !(ele.label === "Request Something" || ele.label === 'Report an issue') ? (
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
                  {drawer
                    && <ListItemText
                      primary={ele.label}
                      sx={{ color: 'white' }}
                    />}
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
                      {ele.label === "Request Something" ? (
                        <>
                          <Typography sx={{ p: 2 }} onClick={() => tabClickHandler(i, "request_status")}>{t(`request_status`)}</Typography>
                          {/* <Typography sx={{ p: 2 }} onClick={() => tabClickHandler(i, "request_service")}>{t(`request_service`)}</Typography> */}
                        </>
                      ) : ele.label === 'Report an issue' && <>
                        <Typography sx={{ p: 2 }} onClick={() => tabClickHandler(i, "create_incident")}>{t(`Create Incident`)}</Typography>
                        {/* <Typography sx={{ p: 2 }} onClick={() => tabClickHandler(i, "incident_status")}>{t(`incident_status`)}</Typography> */}
                      </>}

                    </Popover>
                  </>
                )}
              </PopupState>
            )
          );
        }
      })}
    </List>
  );
}

export default withTranslation('common')(UserPortalLeftPanel);
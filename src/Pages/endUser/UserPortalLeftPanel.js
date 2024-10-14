// import React, { useState } from "react";
// import { List, ListItem, ListItemText, ListItemIcon, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
// import NetworkPingIcon from '@mui/icons-material/NetworkPing';
// import RepeatIcon from '@mui/icons-material/Repeat';
// import MenuBookIcon from '@mui/icons-material/MenuBook';
// import Typography from '@mui/material/Typography';
// import Popover from '@mui/material/Popover';
// import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
// import styles from './scss/UserPortalLeftPanel.module.scss';

// function UserPortalLeftPanel({ activeTab, navbarOptions, tabClickHandler, drawer }) {
//   const [expanded, setExpanded] = useState(false);

//   const handleAccordionChange = (panel) => (event, isExpanded) => {
//     setExpanded(isExpanded ? panel : false);
//   };


//   const iconMapping = {
//     Dashboards: HomeOutlinedIcon,
//     'Report an issue': NetworkPingIcon,
//     'Request Something': RepeatIcon,
//     'Knowledge Base': MenuBookIcon,
//   };

//   return (
//     <List>
//       {navbarOptions.map((ele, i) => {
//         const IconComponent = iconMapping[ele.icon];
//         (ele.label === "Report an issue" || ele.label === "Request Something") && drawer ? (
//           <Accordion
//             key={`${ele.label}-accordion`}
//             expanded={expanded === ele.label}
//             onChange={handleAccordionChange(ele.label)}
//             className={styles.accordionContainer}
//           >
//             <AccordionSummary
//               expandIcon={<KeyboardArrowDownIcon sx={{ color: "white" }} />}
//               aria-controls={`${ele.label}-content`}
//               id={`${ele.label}-header`}
//             >
//               <ListItemIcon>
//                 {IconComponent && <IconComponent sx={{ color: "white" }} />}
//               </ListItemIcon>
//               {drawer && <ListItemText sx={{ color: "white" }} primary={ele.label} />}
//             </AccordionSummary>
//             <AccordionDetails sx={{ marginLeft: "3em" }}>
//               {ele.label === "Report an issue" ? (
//                 <>
//                   <ListItem onClick={() => tabClickHandler(i, "create_incident")}>
//                     <ListItemText sx={{ color: "white" }} primary="Create Incident" />
//                   </ListItem>
//                   <ListItem onClick={() => tabClickHandler(i, "incident_status")}>
//                     <ListItemText sx={{ color: "white" }} primary="Incident Status" />
//                   </ListItem>
//                 </>
//               ) : ele.label === "Request Something" ? (
//                 <>
//                   <ListItem onClick={() => tabClickHandler(i, "request_service")}>
//                     <ListItemText sx={{ color: "white" }} primary="Request Service" />
//                   </ListItem>
//                   <ListItem onClick={() => tabClickHandler(i, "request_status")}>
//                     <ListItemText sx={{ color: "white" }} primary="Request Status" />
//                   </ListItem>
//                 </>
//               ) : null}
//             </AccordionDetails>
//           </Accordion>
//         ) : (
//           <PopupState variant="popover" popupId={`${ele.label}-popover`} key={`${ele.label}-popup`}>
//             {(popupState) => (
//               <>
//                 <ListItem
//                   button
//                   onClick={() => tabClickHandler(i)}
//                   {...bindTrigger(popupState)}
//                 >
//                   <ListItemIcon>
//                     {IconComponent && <IconComponent sx={{ color: "white" }} />}
//                   </ListItemIcon>
//                   {drawer && <ListItemText primary={ele.label} sx={{ color: "white" }} />}
//                 </ListItem>
//                 <Popover
//                   {...bindPopover(popupState)}
//                   anchorOrigin={{
//                     vertical: "bottom",
//                     horizontal: "center",
//                   }}
//                   transformOrigin={{
//                     vertical: "top",
//                     horizontal: "center",
//                   }}
//                 >
//                   <Typography sx={{ p: 2 }}>{`Content for ${ele.label}`}</Typography>
//                 </Popover>
//               </>
//             )}
//           </PopupState>
//         );
//         // <ListItem
//         //   key={`${ele.label}-key`}
//         //   onClick={() => tabClickHandler(i)}
//         //   button
//         // >
//         //   <ListItemIcon>
//         //     {IconComponent && <IconComponent sx={{ color: 'white' }} />}
//         //   </ListItemIcon>
//         //   {drawer ? <ListItemText
//         //     primary={ele.label}
//         //     sx={{ color: 'white' }}
//         //   /> : null}

//         // </ListItem>
//       })}
//     </List>
//   );
// }

// export default UserPortalLeftPanel
import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NetworkPingIcon from "@mui/icons-material/NetworkPing";
import RepeatIcon from "@mui/icons-material/Repeat";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import styles from "./scss/UserPortalLeftPanel.module.scss";

function UserPortalLeftPanel({ activeTab, navbarOptions, tabClickHandler, drawer }) {
  const [expanded, setExpanded] = useState(false);

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
        if ((ele.label === "Report an issue" || ele.label === "Request Something") && drawer) {
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
                    <ListItem onClick={() => tabClickHandler(i, "incident_status")}>
                      <ListItemText sx={{ color: "white" }} primary="Incident Status" />
                    </ListItem>
                  </>
                ) : ele.label === "Request Something" ? (
                  <>
                    <ListItem onClick={() => tabClickHandler(i, "request_service")}>
                      <ListItemText sx={{ color: "white" }} primary="Request Service" />
                    </ListItem>
                    <ListItem onClick={() => tabClickHandler(i, "request_status")}>
                      <ListItemText sx={{ color: "white" }} primary="Request Status" />
                    </ListItem>
                  </>
                ) : null}
              </AccordionDetails>
            </Accordion>
          );
        } else {
          return (
            !(ele.label === "Report an issue" || ele.label === "Request Something") ? (
              <>
                <ListItem
                  key={`${ele.label}-key`}
                  onClick={() => tabClickHandler(i)}
                  button
                >
                  <ListItemIcon>
                    {IconComponent && <IconComponent sx={{ color: 'white' }} />}
                  </ListItemIcon>
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
                      <ListItemIcon>
                        {IconComponent && <IconComponent sx={{ color: "white" }} />}
                      </ListItemIcon>
                      {drawer && <ListItemText primary={ele.label} sx={{ color: "white" }} />}
                    </ListItem>
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
                      {ele.label === "Report an issue" ? (
                        <>
                          <Typography sx={{ p: 2 }} onClick={() => tabClickHandler(i, "create_incident")}>{`create_incident`}</Typography>
                          <Typography sx={{ p: 2 }} onClick={() => tabClickHandler(i, "incident_status")}>{`incident_status`}</Typography>
                        </>
                      ) : ele.label === "Request Something" ? (
                        <>
                          <Typography sx={{ p: 2 }} onClick={() => tabClickHandler(i, "request_service")}>{`request_service`}</Typography>
                          <Typography sx={{ p: 2 }} onClick={() => tabClickHandler(i, "request_status")}>{`request_status`}</Typography>
                        </>
                      ) : null}

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

export default UserPortalLeftPanel;

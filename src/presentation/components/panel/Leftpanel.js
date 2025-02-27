import React from "react";
import {
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@mui/material";
import {
    KeyboardArrowDown as KeyboardArrowDownIcon,
} from '@mui/icons-material';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const LeftPanel = (props) => {
    const { navbarOptions, drawer, pathConfig } = props;
    const navigate = useHistory();

    const directTo = (url) => navigate.push(`/${pathConfig}${url}`);

    return (
        <List>
            {navbarOptions.map(({ label, icon, href, sub_options }) => {
                const isSubOptionsPresent = Boolean(sub_options.length);
                const Icon = icon;
                return isSubOptionsPresent ? (
                    <Accordion
                        key={`${label}-accordion`}
                        className="!mx-[15px] !bg-transparent !my-0"
                    >
                        <AccordionSummary
                            expandIcon={<KeyboardArrowDownIcon sx={{ color: "white", margin: '0 !important' }} />}
                            aria-controls={`${label}-content`}
                            id={`${label}-header`}
                            sx={{
                                padding: 0,
                                '&.Mui-expanded': {
                                    minHeight: 0,
                                },
                                '.MuiAccordionSummary-content': {
                                    margin: '0 !important',
                                    display: 'flex !important',
                                    alignItems: 'center'
                                },
                                '.MuiAccordionSummary-content.Mui-expanded': {
                                    display: 'flex',
                                    alignItems: 'center'
                                },
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: "37px !important" }}>
                                {Icon && <Icon sx={{ color: "white" }} />}
                            </ListItemIcon>
                            {drawer && <ListItemText sx={{ color: "white" }} primary={label} />}
                        </AccordionSummary>
                        <AccordionDetails className="text-white !p-0.5">
                            <div className="pl-12">
                                {sub_options.map((suboptn, idx) => (
                                    <ListItem
                                        key={`${suboptn.label}-key`}
                                        sx={{
                                            borderBottom: idx + 1 !== sub_options.length ? '1px solid white' : '',
                                        }}
                                        className="!p-1 cursor-pointer"
                                        onClick={() => directTo(`${href}${suboptn.href}`)}
                                    >
                                        <ListItemText primary={suboptn.label} />
                                    </ListItem>
                                ))}
                            </div>
                        </AccordionDetails>
                    </Accordion>
                ) : (
                    <ListItem
                        key={`${label}-key`}
                        button
                        onClick={() => directTo(href)}
                        sx={{ padding: '10px 16px !important' }}
                    >
                        <div style={{ width: '100%', boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)", display: 'flex', }}>
                            <ListItemIcon sx={{ minWidth: "37px !important", display: 'flex', alignItems: 'flex-start' }}>
                                {Icon && <Icon sx={{ color: 'white', marginRight: '0.6em' }} />}
                                {drawer && <ListItemText primary={label} sx={{ color: 'white' }} />}
                            </ListItemIcon>
                        </div>
                    </ListItem>
                )
            })}
        </List>
    );
}

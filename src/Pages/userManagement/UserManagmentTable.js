import { Box } from "@mui/material";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ManagementUserList from "./ManagementUserList";
import ActiveDirectoryUserList from "./ActiveDirectoryUserList";
import { useTheme } from "../../global/commonComponents/ThemeContext";

export default function UserManagmentTable(props) {
  const { userData, setSelectedUserRows } = props;
  const { theme } = useTheme();
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 1.5 }}>{children}</Box>}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          TabIndicatorProps={{
              style: { backgroundColor: `${theme.outerBodyColor}` },
            }}
            sx={{
              '& .MuiTab-root': {
                color: 'grey',
              },
              '& .Mui-selected': {
                color: `${theme.valueFontColor}`,
                fontWeight: 'bold',
              },

            }}
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab 
            style={{
                color: `${theme.valueFontColor}`
              }}
            label="Manual Users" {...a11yProps(0)} 
          />
          <Tab 
            label="Active Directory Users" {...a11yProps(1)} style={{
              color: `${theme.valueFontColor}`
            }}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ManagementUserList
          userData={userData}
          setSelectedUserRows={setSelectedUserRows}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ActiveDirectoryUserList
          userData={userData}
          setSelectedUserRows={setSelectedUserRows}
        />
      </CustomTabPanel>
    </Box>
  );
}

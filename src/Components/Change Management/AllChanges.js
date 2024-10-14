import React, { useState, useEffect } from 'react';
import { Box } from "@mui/material";
// import CardContainer from './Change Helper Component/CardContainer';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ChangeList from './Change Helper Component/ChangeList';
import axios from 'axios';
import { serverAPI } from '../../Utils/Server';
// import ReactLoading from 'react-loading';
import ChangeTemplate from './Change Helper Component/ChangeTemplate';

export default function AllChanges() {
  const [value, setValue] = React.useState('1');
  const [changeList, setChangeList] = useState([]);
  const [approvedChangeList, setApprovedChangeList] = useState([]);
  const [templateList, setTemplateList] = useState([{ shortDescription: "Emergency", description: "ITIL Mode 1 Emergency Change", changeModel: "Emergency" }, { shortDescription: "Normal", description: "ITIL Mode 1 Normal Change", changeModel: "Normal" }]);
  const [loading, setLoading] = useState(false);

  function spinnerLoading(message) {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000)
  }
  async function fetchAllChanges() {
    await axios.get(`${serverAPI}/allChanges`).then((res) => {
      if (res.data) {
        setChangeList(res.data);
        const filteredUsers = res.data.filter(request => request.changeModel == "Standard");
        setApprovedChangeList(filteredUsers);
        console.log(res.data);
      }
    }).catch((err) => { console.log(err) })
  }
  useEffect(() => {
    spinnerLoading();
    fetchAllChanges();
  }, [])
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box p={2}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Models" value="1" />
            <Tab label="Preapproved" value="3" />
            <Tab label="All" value="2" />

          </TabList>
        </Box>
        <TabPanel value="1">
          {changeList.length > 0 ? <ChangeTemplate loading={loading} templateList={templateList} /> : <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "60vh" }}>No records found</div>}
        </TabPanel>
        <TabPanel value="2">
          {changeList.length > 0 ? <ChangeList loading={loading} changeList={changeList} /> : <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "60vh" }}>No records found</div>}
        </TabPanel>
        <TabPanel value="3">
          {approvedChangeList.length > 0 ? <ChangeList loading={loading} changeList={approvedChangeList} /> : <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "60vh" }}>No records found</div>}
        </TabPanel>
      </TabContext>
    </Box>
  )
}

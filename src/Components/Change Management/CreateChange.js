import React, { useState, useEffect } from 'react';
import CmdbGridContainer from '../HelperComponents/GridContainer';
import ContentDevider from '../HelperComponents/ContentDevider';
import { userBase } from '../../Utils/CMDB-Data/serviceData';
import { OwnerData } from '../../Utils/CMDB-Data/CIData';
// import { Assignment, AssignmentTwoTone, Category } from '@mui/icons-material';
import { Grid, Modal, Box, Container, TextareaAutosize, TextField, Stack, Button } from '@mui/material';
import SearchTable from '../Request Management/Helper Components/SearchTable';
import SearchModalButton from '../Request Management/Helper Components/SearchModalButton';
import CmdbTextField from '../HelperComponents/TextField';
import { DataGrid } from '@mui/x-data-grid';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import axios from 'axios';
import NotifyBar from '../Notification Components/NotifyBar';
import { serverAPI } from '../../Utils/Server';
// import { ChangeContext } from '../../Routes/HomeRouter';

import ReactLoading from 'react-loading';
// import { useSearchParams } from 'react-router-dom';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { setChangeRequest } from '../../Redux state management/Redux Slices/ChangeRequestSlice';
// import { useDispatch, useSelector } from 'react-redux';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CreateChange() {

  //  const{changeRequest,setChangeRequest}=useContext(ChangeContext);
  // const dispatch = useDispatch();
  // const changeRequest = useSelector((state) => state.requestReducers.requestService);


  const [changeNumber, setChangeNumber] = useState("");
  const [model, setModel] = useState("");
  // const [searchParam, setSearchParam] = useState();
  const [update, setUpdate] = useState(false);
  const [RequestedBy, setRequestedBy] = useState("");
  const [State, setState] = useState("");

  const [category, setCategory] = useState("");
  const [conflictStatus, setConflictStatus] = useState("")

  const [open, setHandleOpen] = React.useState(false);
  const [selectedItem, setSelecteditem] = useState("");
  const [itemDetails, setItemDetails] = useState({ cost: 0 });

  const [shortDescription, setShortDescription] = useState("");

  const [changeConflictData, setChangeConflictData] = useState([]);

  const [assignmentTo, setAssignmentTo] = useState("");
  const [assignmentGroup, setAssignmentGroup] = useState("");
  const [Priority, setPriority] = useState("");
  const [risk, setRisk] = useState("");
  const [Impact, setImpact] = useState("");
  const [Description, setDescription] = useState("");

  const handleOpen = () => setHandleOpen(true);
  const handleClose = () => setHandleOpen(false);

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [notifyMessage, setNotifyMessage] = useState("");
  const [error, setError] = useState(false);
  const [notifyStatus, setNotifyStatus] = useState("");

  const [Implementation, setImplementation] = useState("");
  const [backoutPlan, setBackoutPlan] = useState("");
  const [TestPlan, setTestPlan] = useState("");
  const [planningStartDate, setPlanningStartDate] = useState("");
  const [planningEndDate, setPlanningEndDate] = useState("");
  const [actualStartDate, setActualStartDate] = useState("");
  const [actualEndDate, setActualEndDate] = useState("");

  const [CABMeeting, setCABMeeting] = useState("");
  const [CABDate, setCABDate] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setChangeRequest({
      changeNumber,
      changeModel: model,
      requestedBy: RequestedBy,
      changeState: State,
      configurationItem: selectedItem,
      conflictStatus,
      assignmentTo,
      assignmentGroup,
      changePriority: Priority,
      changeRisk: risk,
      changeImpact: Impact,
      shortDescription,
      Description,
      implementationPlan: Implementation,
      backoutPlan,
      testPlan: TestPlan,
      planningStartDate,
      planningEndDate,
      actualStartdate: actualStartDate,
      actualEnddate: actualEndDate
    })

  }, [changeNumber, model, RequestedBy, State, selectedItem, conflictStatus, assignmentTo, assignmentGroup, Priority, risk, Impact, shortDescription, Description, Implementation, backoutPlan, TestPlan, planningStartDate, planningEndDate, actualStartDate, actualEndDate])

  const [changeCount, setChangeCount] = useState(0);
  async function countChanges() {
    await axios.get(`${serverAPI}/allChangeCount`).then((res) => {
      setChangeNumber(`CH-24-00${res.data.responseData}`)
      console.log(res.data)
    }).catch((err) => { console.log(err) })
  }

  // useEffect(() => {

  // }, [])

  // useEffect(() => {
  //   // if (!searchParam.get("CHID")) {
  //   //   countChanges();
  //   // }
  // }, [])
  useEffect(() => {
    setModel(model)
    setRequestedBy(RequestedBy)
    setState(State)
    setSelecteditem(selectedItem)
    setConflictStatus(conflictStatus)
    setAssignmentTo(assignmentTo)
    setAssignmentGroup(assignmentGroup)
    setPriority(Priority)
    setRisk(risk)
    setImpact(Impact)
    setShortDescription(shortDescription)
    setDescription(Description)
    setImplementation(Implementation)
    setBackoutPlan(backoutPlan)
    setTestPlan(TestPlan)
    setPlanningStartDate(planningStartDate)
    setPlanningEndDate(planningEndDate)
    setActualStartDate(actualStartDate)
    setActualEndDate(actualEndDate);
    setSelecteditem(selectedItem);
  }, [changeNumber, model, RequestedBy, State, selectedItem, conflictStatus, assignmentTo, assignmentGroup, Priority, risk, Impact, shortDescription, Description, Implementation, backoutPlan, TestPlan, planningStartDate, planningEndDate, actualStartDate, actualEndDate])

  useEffect(() => {
    // if (searchParam.get("model") == "Emergency") {
    //   setRequestedBy("System Administrator");
    //   setModel("Emergency");
    //   setState("New");
    //   setPriority("Low");
    //   setRisk("Moderate");
    //   setImpact("Low");
    //   setConflictStatus("Not Run")
    // }
    // if (searchParam.get("model") == "Normal") {
    //   setRequestedBy("System Administrator");
    //   setModel("Normal");
    //   setState("New");
    //   setPriority("Low");
    //   setRisk("Moderate");
    //   setImpact("Low");
    //   setConflictStatus("Not Run")
    // }
  }, [model])

  async function getChangeDetails(id) {
    await axios.get(`${serverAPI}/getChangeById/${id}`).then((res) => {
      if (res.data) {
        const { changeNumber, changeModel, requestedBy, changeImpact, changeState, changeRisk, changePriority, description, shortDescription, conflictStatus, assignmentGroup, assignmentTo, configurationItem, implementationPlan, backoutPlan, testPlan, planningStartDate, planningEndDate, actualStartDate, actualEndDate } = res.data[0];
        setChangeNumber(changeNumber)
        setModel(changeModel)
        setRequestedBy(requestedBy)
        setState(changeState)
        setSelecteditem(selectedItem)
        setConflictStatus(conflictStatus)
        setAssignmentTo(assignmentTo)
        setAssignmentGroup(assignmentGroup)
        setPriority(changePriority)
        setRisk(changeRisk)
        setImpact(changeImpact)
        setShortDescription(shortDescription)
        setDescription(description)
        setImplementation(implementationPlan)
        setBackoutPlan(backoutPlan)
        setTestPlan(testPlan)
        setPlanningStartDate(planningStartDate)
        setPlanningEndDate(planningEndDate)
        setActualStartDate(actualStartDate)
        setActualEndDate(actualEndDate);
        setSelecteditem(configurationItem);

      }
    }).catch((err) => { console.log(err) })
  }

  async function updateChangeRequest(id) {
    const changeData = {
      changeNumber,
      changeModel: model,
      requestedBy: RequestedBy,
      changeImpact: Impact,
      changeState: State,
      changeRisk: risk,
      changePriority: Priority,
      description: Description,
      shortDescription,
      conflictStatus: "Not Run",
      assignmentGroup,
      assignmentTo,
      configurationItem: selectedItem,
      implementationPlan: Implementation,
      backoutPlan,
      testPlan: TestPlan,
      planningStartDate,
      planningEndDate,
      actualStartDate,
      actualEndDate
    }

    await axios.put(`${serverAPI}/update-change/${id}`, changeData).then((res) => {
      setNotifyStatus(true);
      if (res.data) {
        setNotifyMessage("Change request is succesfully updated")
        console.log(res.data)
      } else {
        setError(true);
        setNotifyMessage("something went wrong")
      }
    }).catch((err) => {
      setNotifyStatus(true);
      setError(true);
      setNotifyMessage("Something went wrong! please try again later")
      console.log(err)
    })
  }

  function spinnerLoading(message) {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (!update) {
        createChange();
      } else {
        // updateChangeRequest(searchParam.get("CHID"))
      }

    }, 2000)

  }
  async function createChange() {
    const changeData = {
      changeNumber,
      changeModel: model,
      requestedBy: RequestedBy,
      changeImpact: Impact,
      changeState: State,
      changeRisk: risk,
      changePriority: Priority,
      description: Description,
      shortDescription,
      conflictStatus: "Not Run",
      assignmentGroup,
      assignmentTo,
      configurationItem: selectedItem,
      implementationPlan: Implementation,
      backoutPlan,
      testPlan: TestPlan,
      planningStartDate,
      planningEndDate,
      actualStartDate,
      actualEndDate
    }
    console.log(changeData, 'changeData');
    await axios.post(`${serverAPI}/create-change-request`, changeData).then((res) => {
      setNotifyStatus(true);
      if (res.data) {
        setNotifyMessage("Change request is succesfully created")
        console.log(res.data)
      } else {
        setError(true);
        setNotifyMessage("something went wrong")
      }
    }).catch((err) => {
      setNotifyStatus(true);
      setError(true);
      setNotifyMessage("Something went wrong! please try again later")
      console.log(err)
    })
  }

  const ChangeheaderData = [
    { field: 'itemName', headerName: 'Type', width: 160 },
    { field: 'itemType', headerName: 'Schedule', width: 160 },
    //   {field:'managementIpaddress',headerName:'Ip Address',width:160},
    { field: 'warrantyStart', headerName: 'conflicting Change', width: 160 },
    { field: 'warrantyEnd', headerName: 'Affected CI', width: 160 },
    { field: 'contactPerson', headerName: 'Impacted Service', width: 160 },
    { field: 'manufacturerName', headerName: 'Last Checked', width: 160 },
  ]
  return (
    <div style={{ overflow: "hidden" }}>
      {loading ? <div style={{ position: "absolute", display: "flex", alignItems: "center", justifyContent: "center", width: "75%", height: "90vh" }}>
        <ReactLoading type={"spin"} color={"#ff751a"} />
      </div> : null}
      <Stack style={{ display: 'flex', alignItems: "center", justifyContent: "right", paddingRight: 20, marginTop: 20 }} direction="row">
        <Button variant="outlined" color="primary" style={{ width: 280, fontSize: 12 }} onClick={() => { spinnerLoading() }}>{!update ? "Create Change Request" : "Update request"}</Button>
      </Stack>
      <ContentDevider title="Create Change Request" />
      <CmdbGridContainer show={[true, true, false, false]} dropdown={[false, true]} name={["Change Number", "Model"]} Name1={changeNumber} SelectedValue2={model} setSelectValue2={setModel} label={["Requested Date", ""]} MenuItems={[[], [{ value: "Normal" },
      { value: "Standard" }, { value: "Emergency" }]]} setName1={setChangeNumber} />
      <CmdbGridContainer show={[true, true, false, false]} dropdown={[true, true]} name={["Requested by", "State"]} Name1={changeNumber} SelectedValue1={RequestedBy} setSelectValue1={setRequestedBy} SelectedValue2={State} setSelectValue2={setState} label={["Requested Date", ""]} MenuItems={[OwnerData, [{ value: "New" },
      { value: "Scheduled" }, { value: "Canceled" }]]} setName1={setChangeNumber} />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <SearchTable selectedItem={selectedItem} setSelecteditem={setSelecteditem} setHandleOpen={setHandleOpen} setItemDetails={setItemDetails} />
        </Box>
      </Modal>

      <Grid container rowSpacing={1} sx={{ width: "80%", display: "flex", alignItems: "center" }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6} style={{ marginTop: 15, marginLeft: -10 }}>
          <SearchModalButton setHandleOpen={setHandleOpen} setSelectedItem={setSelecteditem} selectedItem={selectedItem} />
        </Grid>
        <Grid item style={{ width: "50%", marginLeft: 10 }}>
          <CmdbTextField name={"Conflict Status"} Name={conflictStatus} disabled={true} setName={setConflictStatus} />
        </Grid>
      </Grid>

      <CmdbGridContainer show={[true, true, false, false]} dropdown={[true, true]} name={["Assignment to", "Assignment Group"]} SelectedValue1={assignmentTo} setSelectValue1={setAssignmentTo} SelectedValue2={assignmentGroup} setSelectValue2={setAssignmentGroup} label={["Requested Date", ""]} MenuItems={[OwnerData, userBase]} />

      <CmdbGridContainer show={[true, true, false, false]} dropdown={[true, true]} name={["Priority", "Risk"]} SelectedValue1={Priority} setSelectValue1={setPriority} SelectedValue2={risk} setSelectValue2={setRisk} label={["Requested Date", ""]} MenuItems={[[{ value: "High" }, { value: "Medium" }, { value: "Low" }], [{ value: "High" }, { value: "Moderate" }, { value: "Low" }]]} />

      <CmdbGridContainer show={[true, false, false, false]} dropdown={[true, true]} name={["Impact", "Risk"]} SelectedValue1={Impact} setSelectValue1={setImpact} SelectedValue2={State} setSelectValue2={setState} label={["Requested Date", ""]} MenuItems={[[{ value: "High" }, { value: "Medium" }, { value: "Low" }], [{ value: "New" },
      { value: "Scheduled" }, { value: "Canceled" }]]} />

      <Grid container spacing={1} style={{ width: "103%", display: "flex", padding: 20, marginLeft: 10, justifyContent: "center", alignItems: "center" }}>
        <Grid item xs={11} style={{ display: "flex" }}>
          <TextField autofocus style={{ width: "100%" }} name={"Short description"} label={"short description"} type="text" id={`Reason for ${category}`} value={shortDescription} onChange={(e) => {
            setShortDescription(e.target.value)
          }} />
        </Grid>
        <Grid item xs={11} style={{ display: "flex" }}>
          <TextField autofocus style={{ width: "100%" }} name={`Reason for ${category}`} label={"Description"} type="text" id={`Reason for ${category}`} value={Description} onChange={(e) => {
            setDescription(e.target.value)
          }} />
        </Grid>
      </Grid>
      <Container>
        <Box sx={{ width: '100%', typography: 'body1', marginTop: 10, marginBottom: 20 }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="change request">
                <Tab label="Planning" value="1" />
                <Tab label="Schedule" value="2" />
                <Tab label="Conflicts" value="3" />
              </TabList>
            </Box>

            <TabPanel value="1">
              <TextareaAutosize minRows={5} placeholder="Write details about Implementation Plan" style={{ width: "100%", padding: 20 }} onChange={(e) => { setImplementation(e.target.value) }} value={Implementation} />
              <TextareaAutosize minRows={2} placeholder="Backout Plan" style={{ width: "100%", padding: 20 }} onChange={(e) => { setBackoutPlan(e.target.value) }} value={backoutPlan} />
              <TextareaAutosize minRows={2} placeholder="Test Plan" style={{ width: "100%", padding: 20 }} onChange={(e) => { setTestPlan(e.target.value) }} value={TestPlan} />
            </TabPanel>

            <TabPanel value="2">
              <CmdbGridContainer show={[false, false, true, true]} dropdown={[false, false]} name={["Requested by", "State"]} SelectedValue1={RequestedBy} setSelectValue1={setRequestedBy} SelectedValue2={State} setSelectValue2={setState} label={["Planning Start Date", "Planning End Date"]} MenuItems={[OwnerData, [{ value: "New" }]]} Date1={planningStartDate} Date2={planningEndDate} setDate1={setPlanningStartDate} setDate2={setPlanningEndDate} />

              <CmdbGridContainer show={[false, false, true, true]} dropdown={[false, false]} name={["Requested by", "State"]} SelectedValue1={RequestedBy} setSelectValue1={setRequestedBy} SelectedValue2={State} setSelectValue2={setState} label={["Actual Start Date", "Actual End Date"]} MenuItems={[OwnerData, [{ value: "New" }]]} Date1={actualStartDate} Date2={actualEndDate} setDate1={setActualStartDate} setDate2={setActualEndDate} />

              <CmdbGridContainer show={[true, false, true, false]} dropdown={[false, false]} name={["CAB Recommendation", "State"]} Name1={CABMeeting} setName1={setCABMeeting} SelectedValue1={RequestedBy} setSelectValue1={setRequestedBy} SelectedValue2={State} setSelectValue2={setState} label={["CAB Date", "Actual End Date"]} MenuItems={[OwnerData, [{ value: "New" }]]} Date1={CABDate} Date2={actualEndDate} setDate1={setCABDate} setDate2={setActualEndDate} />

              <Box style={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "flex-end" }}>
                <FormGroup>
                  <FormControlLabel control={<Checkbox defaultChecked />} label="CAB required?" />
                </FormGroup>
              </Box>
            </TabPanel>
            <TabPanel value="3">
              <DataGrid
                rows={changeConflictData}
                getRowId={(row) => row.itemName ? row.itemName : row.itemId}
                columns={ChangeheaderData}
                // isRowSelected: (id: GridRowId) => boolean
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                  },
                }}
                // pageSizeOptions={[10]}
                checkboxSelection
                style={{ height: 200 }}
              />
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
      <NotifyBar notifyMessage={notifyMessage} notifyStatus={notifyStatus} error={error} setNotifyStatus={setNotifyStatus} />
    </div>
  )
}

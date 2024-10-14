import React, { useState, useEffect } from 'react'
import ContentDevider from '../../HelperComponents/ContentDevider'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
// import { OrgOptions, StatusOptions } from '../../../Utils/CMDB-Data/CIData';
import { accessApplication, affectedServices, requestApprovers, requestState, userRoles } from '../../../Utils/Request Data/RequestItemData';
import { Grid, Box, TextField, Button, Stack } from "@mui/material";
import CmdbGridContainer from '../../HelperComponents/GridContainer';
// import { CategoryOutlined, HorizontalRule } from '@mui/icons-material';
// import { statusState } from '../../../Utils/CMDB-Data/serviceData';
// import { RequestContext } from '../../../Routes/HomeRouter';  
import axios from 'axios';
import NotifyBar from '../../Notification Components/NotifyBar';
import { serverAPI } from '../../../Utils/Server';
import { useDispatch, useSelector } from 'react-redux';
import { setRequestGeneralService } from '../../../Redux state management/Redux Slices/RequestSlice';
import { setActiveStep } from '../../../Redux state management/Redux Slices/GlobalStepperSlice';
import StepperComponent from '../../HelperComponents/StepperComponent';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { TextareaAutosize } from '@mui/material';
import SearchTextField from '../../HelperComponents/SearchTextField';
import SelectField from '../../HelperComponents/SelectField';
import DraggableModal from '../../User Management/DraggableModal';



export default function ServiceCategoryForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const requestGeneralService = useSelector((state) => state.requestReducers.requestGeneralService);
  const requestDetails = useSelector((state) => state.requestReducers.requestDetails);

  const activeStep = useSelector((state) => state.globalReducers.activeStep);

  const { category } = useParams();
  const [affectedUser, setAffecteduser] = React.useState("");

  const [comment, setComment] = useState("");
  const [notes, setNotes] = useState([]);

  const [approvalStatus, setApprovalStatus] = React.useState("");
  const [requesterName, setRequesterName] = React.useState(localStorage.getItem("userEmail"));
  const [priorityLevel, setPriorityLevel] = useState("");
  const [preferedContact, setPreferedContact] = React.useState("");
  // const OrgOptions = ["Organization 1","Organization 2","Organization 3"];
  const approvedData = ["Approved", "Denied", "Pending"];
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [serviceType, setServcieType] = useState("");

  const [notifyMessage, setNotifyMessage] = React.useState()
  const [error, setError] = React.useState();
  const [notifyStatus, setNotifyStatus] = useState();

  const priorityStatus = [{ value: "High" }, { value: "moderate" }, { value: "Low" }]
  const contactMethod = [{ value: "Email" }, { value: "Phone call" }, { value: "chat/instant messaging" }]

  const [requestAccess, setRequestAccess] = useState("");
  const [approvalFrom, setApprovalFrom] = useState("");
  const [userRole, setUserRole] = useState("");

  const [affectedService, setAffectedService] = useState("");
  const [changeDate, setChangeDate] = useState("");
  const [backoutPlan, setBackoutPlan] = useState("");
  const [changeApproval, setChangeApproval] = useState("");
  const [update, setUpdate] = useState(false);

  const [reasonDescription, setReasonDescription] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const [createdBy, setCreatedBy] = useState("");
  const [UpdatedDate, setUpdatedDate] = useState('');
  const [value, setValue] = React.useState('1');

  const handleAddNote = () => {
    if (comment.trim()) { // Check for empty value
      const noteObject = {
        text: comment,
        createdBy: localStorage.getItem("userEmail"),
        timestamp: new Date().toLocaleString() // Add timestamp
      };
      setNotes([noteObject, ...notes]); // Add new note object, preserving order
      setComment(''); // Clear input after adding
    } else {
      alert('Please enter a note before adding.');
    }
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  useEffect(() => {
    dispatch(setRequestGeneralService({
      ...requestGeneralService,
      affectedService,
      requestAccess,
      approvalFrom,
      userRole,
      changeDate,
      backoutPlan,
      changeApproval,
      reasonDescription,
      affectedUser,
      preferedContact,
      reasonDescription,
      requestType: serviceType,
      requesterName
    }))
  }, [affectedUser, requestAccess, approvalFrom, userRole, changeDate, backoutPlan, changeApproval, reasonDescription, affectedUser, preferedContact, serviceType, requesterName])


  async function createRequest() {
    console.log(requestGeneralService)
    await axios.post(`${serverAPI}/create-general-request`, requestGeneralService).then((res) => {
      if (res.data) {
        setNotifyMessage("Successfully request created")
        setNotifyStatus(true)
      } else {
        setError(true)
        setNotifyMessage("Something went wrong, please try again")
      }
    }).catch((err) => {
      setError(true)
      setNotifyMessage("Something went wrong, please try again")
    });
  }




  async function updateRequest() {
    const requestID = searchParams.get('update');

    try {
      await axios.post(`${serverAPI}/update-general-request/${requestID}`, requestGeneralService).then((response) => {
        if (response.data) {
          setNotifyMessage("Successfully request updated")
          setNotifyStatus(true);
        } else {
          setError(true)
          setNotifyMessage("Something went wrong, please try again")
        }
      }).catch((err) => {
        setError(true)
        setNotifyMessage("Something went wrong, please try again")
      });
    } catch (error) {
      console.error(error);
    }
  }

  const [openedDate, setOpenedDate] = useState("");
  async function fetchReqeustItem(requestID) {
    try {
      await axios.get(`${serverAPI}/get-general-request-RID/${requestID}`).then((response) => {
        const {
          affectedUser,
          priority,
          approvalStatus,
          preferedContact,
          requesterName,
          requestType,
          reasonDescription,
          requestedAccess,
          approvalFrom,
          userRole,
          affectedService,
          changeDate,
          backoutPlan,
          openedDate
        } = response.data[0];
        dispatch(setRequestGeneralService({
          affectedUser,
          priority,
          approvalStatus,
          preferedContact,
          requesterName,
          requestType,
          reasonDescription,
          requestedAccess,
          approvalFrom,
          userRole,
          affectedService,
          changeDate,
          backoutPlan,
          openedDate
        }))
        setAffecteduser(affectedUser);
        setPriorityLevel(priority);
        setApprovalStatus(approvalStatus);
        setPreferedContact(preferedContact);
        setRequesterName(requesterName);
        setServcieType(requestType);
        setReasonDescription(reasonDescription);
        setRequestAccess(requestedAccess);
        setApprovalFrom(approvalFrom);
        setUserRole(userRole);
        setAffectedService(affectedService);
        setChangeDate(changeDate);
        setBackoutPlan(backoutPlan);
        setOpenedDate(openedDate);
      }).catch((err) => { console.log(err) })
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (searchParams.get('update')) {
      fetchReqeustItem(searchParams.get('update'));
      setUpdate(true)
      console.log()
    } else {
      setUpdate(false);
    }
  }, [])


  useEffect(() => {
    dispatch(setRequestGeneralService(({
      ...requestGeneralService,
      affectedUser,
      priority: priorityLevel,
      approvalStatus: approvalStatus,
      preferedContact,
      reasonDescription,
      requestedAccess: requestAccess,
      approvalFrom,
      userRole,
      affectedService,
      changeDate,
      backoutPlan,
      requesterName
    })))
    console.log(requestGeneralService);
  }, [affectedUser, preferedContact, priorityLevel, approvalStatus, reasonDescription, requestAccess, approvalFrom, userRole, priorityLevel, approvalStatus, reasonDescription])

  const [itemOpen, setItemOpen] = React.useState(false);
  const handleClickOpen = () => {
    setItemOpen(true);
  };

  const endUserIncident = useSelector((state) => state.incidentReducers.endUserIncident)
  useEffect(() => {
    setAffecteduser(endUserIncident.Email);
  }, [endUserIncident]);

  const handleItemClose = () => {
    setItemOpen(false);
  };

  useEffect(() => {
    setAffecteduser(localStorage.getItem("userEmail"));
  }, []);


  return (
    <div style={{ overflowX: "hidden" }}>
      <DraggableModal open={itemOpen} setOpen={setItemOpen} handleClickOpen={handleClickOpen} handleClose={handleItemClose} />
      {!update ? <StepperComponent steps={["General Information", "Technical Information", "Submit Request"]} /> : null}
      {category == "Reset password" ? <>
        <ContentDevider title={`${category} service`} />
        <Grid container rowSpacing={1} sx={{ width: '100%', display: 'flex', alignItems: 'center' }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            {/* <CmdbGridContainer show={[false,true,false,false]} dropdown={[false,true ]} name={["Affected account username","Preffered contact method"]} SelectedValue1={affectedUser} setSelectValue1={setAffecteduser} Name2={requesterName} setName2={setRequesterName}  SelectedValue2={preferedContact} setSelectValue2={setPreferedContact}  label={["Requested Date",""]} MenuItems={[Requestusers,contactMethod]}/> */}
            <SelectField MenuItems={contactMethod} setSelectValue={setPreferedContact} SelectedValue={preferedContact} label={"Preferred Contact method"} />
          </Grid>
          <Grid item xs={5} style={{ marginLeft: 70 }}>
            <SearchTextField placeholder={"Affected Account"} fieldValue={affectedUser} setFieldValue={setAffecteduser} search={true} handleClickOpen={handleClickOpen} open={itemOpen} style={{ marginTop: 12, width: "100%" }} />
          </Grid>
        </Grid>

        {update &&
          <CmdbGridContainer show={[true, true, false, false]} dropdown={[true, true]} name={["Priority", "Ticket Status"]} Name1={priorityLevel} setName1={setPriorityLevel} Name2={requesterName} setName2={setRequesterName} SelectedValue1={priorityLevel} setSelectValue1={setPriorityLevel} SelectedValue2={approvalStatus} setSelectValue2={setApprovalStatus} label={["Requested Date", ""]} MenuItems={[priorityStatus, requestState]} />}
      </> : null}

      {category == "Access request" ? <>
        <ContentDevider title={`${category} servcie`} />
        <CmdbGridContainer show={[true, true, false, false]} dropdown={[true, true]} name={["Requested access Service/System", "Need approval from"]} SelectedValue1={requestAccess} setSelectValue1={setRequestAccess} Name2={requesterName} setName2={setRequesterName} SelectedValue2={approvalFrom} setSelectValue2={setApprovalFrom} label={["Requested Date", ""]} MenuItems={[accessApplication, requestApprovers]} />

        {update && <CmdbGridContainer show={[true, true, false, false]} dropdown={[true, true]} name={["Priority", "Approval status"]} Name1={priorityLevel} setName1={setPriorityLevel} Name2={requesterName} setName2={setRequesterName} SelectedValue1={priorityLevel} setSelectValue1={setPriorityLevel} SelectedValue2={approvalStatus} setSelectValue2={setApprovalStatus} label={["Requested Date", ""]} MenuItems={[priorityStatus, requestState]} />}

        {update && <CmdbGridContainer show={[true, false, false, false]} dropdown={[true, true]} name={["User Role", ""]} Name1={priorityLevel} setName1={setPriorityLevel} Name2={requesterName} setName2={setRequesterName} SelectedValue1={userRole} setSelectValue1={setUserRole} SelectedValue2={approvalStatus} setSelectValue2={setApprovalStatus} label={["Requested Date", ""]} MenuItems={[userRoles, requestState]} />}

      </> : null}
      {category == "Change request" ? <>
        <ContentDevider title={`${category} servcie`} />
        <CmdbGridContainer show={[true, true, false, false]} dropdown={[true, true]} name={["Affected system Service/System", "CAB Approval status"]} SelectedValue1={affectedService} setSelectValue1={setAffectedService} Name2={requesterName} setName2={setRequesterName} SelectedValue2={approvalStatus} setSelectValue2={setApprovalStatus} label={["Requested Date", ""]} MenuItems={[affectedServices, requestState]} />

        <CmdbGridContainer show={[true, false, true, false]} dropdown={[true, false]} name={["Priority", "Approval status"]} Name1={priorityLevel} setName1={setPriorityLevel} Name2={requesterName} setName2={setRequesterName} SelectedValue1={priorityLevel} setSelectValue1={setPriorityLevel} SelectedValue2={approvalStatus} setSelectValue2={setApprovalStatus} Date1={changeDate} setDate1={setChangeDate} label={["Change date", ""]} MenuItems={[priorityStatus, requestState]} />

        <Grid container spacing={1} style={{ width: "103%", display: "flex", padding: 20, marginLeft: 10, justifyContent: "center", alignItems: "center" }}>
          <Grid item xs={11} style={{ display: "flex" }}>
            <TextField autofocus style={{ width: "103%" }} name={`Reason for ${category}`} label={`Backout Plan for ${category}`} type="text" id={`Reason for ${category}`} value={backoutPlan} onChange={(e) => {
              setBackoutPlan(e.target.value)
            }} />
          </Grid>
        </Grid>

      </> : null}

      <Grid container spacing={1} style={{ width: "103%", display: "flex", padding: 20, marginLeft: 10, justifyContent: "center", alignItems: "center" }}>
        <Grid item xs={11} style={{ display: "flex" }}>
          <TextField autofocus style={{ width: "100%" }} name={`Reason for ${category}`} label={`Reason for ${category}`} type="text" id={`Reason for ${category}`} value={reasonDescription} onChange={(e) => {
            setReasonDescription(e.target.value)
          }} />
        </Grid>
      </Grid>


      <Stack style={{ display: 'flex', alignItems: "center", justifyContent: "space-around", paddingRight: 20, paddingTop: 50, paddingBottom: 30 }} direction="row">
        <Button variant="outlined" color="warning" style={{ width: 100 }} onClick={() => { dispatch(setActiveStep(activeStep - 2)); navigate(-1) }}>Back</Button>
        <Button variant="contained" color="primary" style={{ width: 200 }} onClick={() => {
          !update ? createRequest() : updateRequest(); dispatch(setActiveStep(activeStep + 2));

          if (localStorage.getItem("userEmail") == "user@teksiblegroup.com") { navigate("/") }
        }}>{!update ? "Create request" : "Update request"}</Button>
      </Stack>


      {update ? <Box sx={{ width: '90%', typography: 'body1', marginTop: 10 }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Activity Bar" value="1" />
            </TabList>
          </Box>

          <TabPanel value="1">
            <Stack style={{ display: 'flex', alignItems: "center", justifyContent: "space-between", paddingRight: 20, marginTop: 20 }} direction="row">
              <label style={{ display: 'block', color: "grey", marginLeft: 10, marginBottom: 10 }} htmlFor="textarea">
                Activity Notes :
              </label>
              <Button variant="contained" color="secondary" style={{ width: 130, fontSize: 12, marginBottom: 10 }} onClick={handleAddNote}>update notes</Button>
            </Stack>
            <TextareaAutosize aria-label="empty textarea" minRows={5} placeholder="Enter the notes" style={{ width: "100%", padding: 20 }} value={comment} onChange={(e) => { setComment(e.target.value) }} />

            <Box style={{ display: "flex", flexDirection: "column", justifyContent: "center", backgroundColor: "#e6e6e6", borderRadius: 10, paddingLeft: 10 }}>
              {/* <div> */}
              <h4 style={{ fontWeight: "normal", fontSize: 16 }}>Service request raised by <strong>{requesterName}</strong></h4>
              {/* </div> */}
              <h4 style={{ fontWeight: "normal", marginTop: -20, fontSize: 15 }}>created at <strong>{openedDate}</strong> </h4>
            </Box>
            <Box
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginTop: 10
              }}
            >
              {notes.map((note, index) => (
                <div key={index} style={{
                  backgroundColor: '#e6e6e6',
                  borderRadius: 10,
                  paddingLeft: 10, marginTop: 10
                }}>
                  <p style={{ fontWeight: 'normal', fontSize: 16 }}>{note.text}</p>
                  <p style={{ fontWeight: 'normal', fontSize: 13 }}>Note updated by <strong>{note.createdBy}</strong></p>
                  <p style={{ fontWeight: 'normal', fontSize: 13, marginTop: -10 }}>created at <strong>{note.timestamp}</strong></p>
                </div>
              ))}
            </Box>
          </TabPanel>
        </TabContext>
      </Box> : null}


      <NotifyBar error={error} notifyMessage={notifyMessage} notifyStatus={notifyStatus} setNotifyStatus={setNotifyStatus} />
    </div>
  )
}

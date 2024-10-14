import React, { useState, useEffect } from 'react';
import { Button, Grid, Stack } from '@mui/material';
// import { useSelector } from 'react-redux';
import axios from 'axios';
import { serverAPI } from '../../Utils/Server';
import ContentDevider from '../HelperComponents/ContentDevider';
import TextAreaResizer from '../HelperComponents/TextAreaResizer';
import SelectField from '../HelperComponents/SelectField';
import NotifyBar from '../Notification Components/NotifyBar';
import DraggableModal from '../User Management/DraggableModal';
// import { setEndUserIncident } from '../../Redux state management/Redux Slices/IncidentRequestSlice';
import SearchTextField from '../HelperComponents/SearchTextField';
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
// import CmdbGridContainer from "../../Components/HelperComponents/GridContainer";
import CustomTextField from '../HelperComponents/TextField';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { TextareaAutosize } from '@mui/material';
import { Box } from "@mui/material";

export default function UserIncidentForm(props) {
  // const dispatch = useDispatch();
  const { activeComponentMethod: Id } = props;
  // const endUserIncident = useSelector((state) => state.incidentReducers.endUserIncident);
  // const [userName, setUserName] = useState("");
  const [emailAddress, setEmailAddress] = useState(localStorage.getItem("userEmail"));
  const [impact, setImpact] = useState("");
  const [urgency, setUrgency] = useState("");
  const [title, setTitle] = useState("");
  const [Description, setDescription] = useState("");

  const [priority, setPriority] = useState("");
  const [imapctStatus, setImpactStatus] = useState("");

  const [createdBy, setCreatedBy] = useState("");

  const [comment, setComment] = useState("");
  const [notes, setNotes] = useState([]);

  const [value, setValue] = React.useState('1');
  const [UpdatedDate, setUpdatedDate] = React.useState("");


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

  const [error, setError] = useState(false);
  const [notifyStatus, setNotifyStatus] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState("");

  const impactOptions = [
    { value: "This issue has a minor impact on my productivity" },
    { value: "This issue making me less productivity,but i can still work" },
    { value: "This issue is making me less productivity and i cannot complete an important task" },
    { value: "Issues affect more than just me and prevents critical business functions" }
  ];

  const urgencyOptions = [
    { value: "Initial investigation with next business day" },
    { value: "Initial investigation within the next 4 business hours" },
    { value: "This issue requires immediate investigation" },
    { value: "This issue has financial, reputational or regulatory impact" }
  ];



  function getPrioritiesAndImpact(selectedImpact, selectedUrgency) {
    // Define mappings
    const impactLevels = {
      "This issue has a minor impact on my productivity": "Low",
      "This issue making me less productivity,but i can still work": "Medium",
      "This issue is making me less productivity and i cannot complete an important task": "High",
      "Issues affect more than just me and prevents critical business functions": "High"
    };

    const urgencyLevels = {
      "Initial investigation with next business day": "Low",
      "Initial investigation within the next 4 business hours": "Medium",
      "This issue requires immediate investigation": "High",
      "This issue has financial, reputational or regulatory impact": "High"
    };

    // Get the impact and urgency level from the mappings
    const impactLevel = impactLevels[selectedImpact] || "unknown";
    const urgencyLevel = urgencyLevels[selectedUrgency] || "unknown";

    // Determine priority based on impact and urgency
    const priorityLevel = (() => {
      if (urgencyLevel === "High" || impactLevel === "High") {
        return "High";
      }
      if (urgencyLevel === "High" || impactLevel === "Low") {
        return "Medium";
      }
      return "Low";
    })();

    return {
      priority: priorityLevel,
      urgency: urgencyLevel,
      impact: impactLevel
    };
  }

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setEmailAddress('endUserIncident.Email');
  }, []);

  useEffect(() => {
    fetchRequestCount();
    fetchDocumentCount();
  }, []);

  const [requestCount, setRequestCount] = useState(0);
  const [requestID, setRequestID] = useState("");
  const [incidentId, setIncidentId] = useState("");

  const [loading, setLoading] = useState(false);
  // const { vertical, horizontal} = Message;
  const [isVisible, setisVisible] = useState(true);
  const [ErrorMessage, setErrorMessage] = useState();
  const [Success, setSuccess] = useState(false);


  async function fetchRequestCount() {
    const email = localStorage.getItem("userEmail");
    try {
      const res = await axios.get(`${serverAPI}/incident-count-by-email/user@teksiblegroup.com`);

      setRequestCount(res.data.responseData);
      let TempNum = parseInt(res.data.responseData) + 1;
      setRequestID("INC00000" + TempNum);
      console.log(requestCount, res.data.responseData);
    } catch (err) {
      console.log(err);
    }
  }

  const navigate = useNavigate();

  const fetchDocumentCount = async () => {
    await axios.get(`${serverAPI}/allIncidentsCount`).then((res) => {
      let TempNum = parseInt(res.data.responseData) + 1;
      setIncidentId("INC000000" + TempNum)
    }).catch((err) => {
      console.log(err);
    })
  }

  const [impactRatio, setImpactRatio] = useState("");
  const [urgencyRatio, setUrgencyRatio] = useState("");
  const [priorityRatio, setPriorityRatio] = useState("");

  useEffect(() => {
    if (impact && urgency) {
      const { impact: impactLevel, urgency: urgencyLevel, priority } = getPrioritiesAndImpact(impact, urgency);
      setImpactRatio(impactLevel);
      setUrgencyRatio(urgencyLevel);
      setPriorityRatio(priority);
    }
  }, [impact, urgency]);


  function spinnerLoading(status) {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (status === 200) {
        setNotifyStatus(true);
        setNotifyMessage("Request Succesfully submitted");
        navigate("/");
      } else {
        setNotifyStatus(true);
        setNotifyMessage("something went wrong!please try again later")
      }
    }, 2000)
  }
  async function CreateRequest() {
    const data = {
      incidentId,
      userIncidentId: requestID,
      Title: title,
      Description: Description,
      Email: emailAddress,
      impact: impactRatio,
      urgency: urgencyRatio,
      priority: priorityRatio,
      state: "New",
      assignmentTo: "Not yet assigned",
      impactReason: impact,
      urgencyReason: urgency,
      email: emailAddress,
      createdBy: localStorage.getItem("userEmail"),
      shortDescription: Description
    };
    await axios.post(`${serverAPI}/createIncident`, data).then((res) => {
      spinnerLoading(res.data.statusCode);
      console.log(res.data)
    }).catch((err) => { console.log(err) });
    console.log(data);
  }

  const [incidentData, setIncidentData] = useState({});
  const [openedDate, setOpenedDate] = useState("");

  const fetchElementById = async () => {
    const email = localStorage.getItem("userEmail");
    await axios.get(`${serverAPI}/getIncidentByEmailAndUserIncidentId/${email}/${Id}`).then((res) => {
      setIncidentData(res.data[0]);
      setImpact(res.data[0].impactReason)
      setUrgency(res.data[0].urgencyReason)
      setEmailAddress(res.data[0].email);
      setDescription(res.data[0].shortDescription);
      setOpenedDate(res.data[0].openedDate);
      setPriority(res.data[0].priority);
      setImpactStatus(res.data[0].impact);
      console.log(incidentData)
    }).catch((err) => {
      console.log(err);
    })
  }

  const updateData = async (id) => {
    const data = {
      incidentId: Id,
      state: incidentData.state,
      impact: imapctStatus,
      priority,
      shortDescription: Description
    }
    await axios.post(`${serverAPI}/Update-Incident/${id}`, data).then((res) => {
      console.log("Succesfully Inci updated")
      if (res.data) {
        spinnerLoading(res.data.status);
        setSuccess(true);
      }
    }).catch((err) => {
      setErrorMessage("Something went wrong");
    });
  }



  useEffect(() => {
    Id && fetchElementById();
  }, [Id])


  return (
    <div style={{ width: "100%", overflowX: "hidden" }}>
      <Stack style={{ display: 'flex', alignItems: "center", justifyContent: "right", paddingRight: 20, marginTop: 20 }} direction="row">
        <Button variant="outlined" color="primary" style={{ width: 200, fontSize: 12, marginRight: 10 }} onClick={() => { if (!Id) { CreateRequest() } else { updateData(incidentData.incidentId) } }}>{Id ? "Update Request" : "Create Request"}</Button>
        <Button variant="outlined" color="warning" style={{ width: 200, fontSize: 12 }}>Cancel Request</Button>
      </Stack>
      <ContentDevider title="Incident Ticket" />
      <div style={{ marginTop: 30, marginRight: 10 }}>
        {loading ? <div style={{ position: "absolute", left: 150, bottom: 100, display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "60vh" }}>
          <ReactLoading type={"spin"} color={"#e699ff"} />
        </div> : null}
        {Id ?
          <div style={{}}>
            {/* <CmdbGridContainer MenuItems={props.MenuItems1} show={[true,true,false,false]} name={props.Field1} dropdown={[false,true]} SelectedValue2={props.Type} setSelectValue2={props.setType} Name1={props.serverName}  setName1={props.setServerName}/> */}
            <Grid container sx={{ width: '100%', display: 'flex', alignItems: 'center', marginBottom: 2 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={4}>
                <CustomTextField Name={incidentData.priority} setName={setPriority} disabled name={"Priority"} />
              </Grid>
              <Grid item xs={4} style={{ marginRight: 2 }}>
                <CustomTextField Name={incidentData.impact} setImpact={setImpactStatus} disabled name={"Impact assigned"} />
              </Grid>
            </Grid>
            <Grid container sx={{ width: '100%', display: 'flex', alignItems: 'center', marginBottom: 2 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={4}>
                <CustomTextField Name={incidentData.state} disabled name={"Status"} />
              </Grid>
              <Grid item xs={4} style={{ marginRight: 2 }}>
                <CustomTextField Name={incidentData.assignmentTo} disabled name={"Assigned To"} />
              </Grid>
            </Grid>
          </div>
          : null}
        <Grid container style={{ width: "111%" }}>
          <Grid item xs={12}>
            <SearchTextField
              style={{ width: "80%", marginLeft: 78 }}
              placeholder={"Customer Email"}
              fieldValue={emailAddress}
              setFieldValue={setEmailAddress}
              search={true}
              handleClickOpen={handleClickOpen}
              open={open}
            />
          </Grid>
          <Grid item xs={12}>
            <SelectField
              label="What impact does this have on your ability to work?"
              SelectedValue={impact}
              setSelectValue={setImpact}
              MenuItems={impactOptions}
            />
          </Grid>
          <Grid item xs={12}>
            <SelectField
              label="How quickly do we need to start looking into this?"
              SelectedValue={urgency}
              setSelectValue={setUrgency}
              MenuItems={urgencyOptions}
            />
          </Grid>
        </Grid>

        <Grid container style={{ width: "86%", marginLeft: 80 }}>
          <Grid item xs={12}>
            <TextAreaResizer
              label={Id ? "If you consider changing impact and urgency please enter the proper reason for that" : "Enter the detailed description of the issue"}
              value={Description}
              setValue={setDescription}
            />
          </Grid>
        </Grid>
      </div>
      <DraggableModal open={open} setOpen={setOpen} handleClickOpen={handleClickOpen} handleClose={handleClose} />
      <NotifyBar error={error} setError={setError} notifyMessage={notifyMessage} notifyStatus={notifyStatus} setNotifyStatus={setNotifyStatus} />

      {Id ? <Box sx={{ width: '100%', typography: 'body1', marginTop: 10 }}>
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
              <h4 style={{ fontWeight: "normal", fontSize: 16 }}>Incident request raised by <strong>user@teksiblegroup.com</strong></h4>
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
    </div>
  );
}

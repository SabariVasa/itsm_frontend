import React, { useState, useEffect } from 'react';
import { Select, MenuItem, Grid, Box, TextField, Button, Container, InputLabel } from "@mui/material";
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { serverAPI } from '../../Utils/Server';
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from 'react-router-dom';
import SearchTextField from '../HelperComponents/SearchTextField';
import DraggableModal from '../User Management/DraggableModal';
import { resturls } from '../../global/utils/apiurls';
import GlobalService from '../../services/GlobalService';
import { Description } from '@mui/icons-material';
// import { useSearch } from 'rsuite/esm/internals/Picker';
// import { useSelector } from 'react-redux';



function CreateNewIncident() {

    const [Number, setNumber] = useState();
    const [channel, setChannel] = useState();
    const [State, setState] = useState();
    const [Caller, setCaller] = useState();
    const [Category, setCategory] = useState();
    const [Impact, setImapact] = useState();
    const [subCategory, setSubCategory] = useState();
    const [urgency, setUrgency] = useState();
    const [service, setService] = useState();
    const [Priority, setPriority] = useState();
    const [Assignment, setAssignment] = useState();
    const [ServiceCategory, setServiceCategory] = useState();
    const [CI, setCI] = useState();
    const [AssigmentTo, setAssignmentTo] = useState();
    const [shortDescription, setShortDescription] = useState("");
    // Id
    // channel
    // State
    // Caller
    // Category
    // Impact
    // subCategory
    // urgency
    // service
    // Priority
    // Assignment
    // ServiceCategory
    // CI
    // AssigmentTo
    // shortDescription
    // Description
    const [itemOpen, setItemOpen] = React.useState(false);
    const handleClickOpen = () => {
        setItemOpen(true);
    };

    // const endUserIncident = useSelector((state)=>state.incidentReducers.endUserIncident)
    useEffect(() => {
        // setCaller(endUserIncident.Email);
    }, []);

    const handleItemClose = () => {
        setItemOpen(false);
    };

    useEffect(() => {
        setCaller(localStorage.getItem("userEmail"));
    }, []);
    // const handleChange = (event) => {
    //     setState(event.target.value);
    //   };

    const [Message, setMessage] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
    });
    const { vertical, horizontal, open } = Message;
    //   const [isVisible, setisVisible] = useState(true);
    const [ErrorMessage, setErrorMessage] = useState();
    const [Success, setSuccess] = useState(false);

    const fetchDocumentCount = async () => {
        await axios.get(`${serverAPI}/allIncidentsCount`).then((res) => {
            let TempNum = parseInt(res.data.responseData) + 1;
            setNumber("INC000000" + TempNum)
        }).catch((err) => {
            setMessage({ ...Message, open: true });
            setErrorMessage("Sorry something went wrong")
        })
    }

    useEffect(() => {
        fetchDocumentCount();
    }, [])
    const navigate = useNavigate();

    const Submit = async () => {
        const data = {
            incidentId: Number,
            channel,
            state: State,
            caller: Caller,
            impact: Impact,
            category: Category,
            subCategory,
            urgency,
            service,
            priority: Priority,
            assignment: Assignment,
            serviceCategory: ServiceCategory,
            configurationItem: CI,
            assignmentTo: AssigmentTo,
            shortDescription,
            createdBy: localStorage.getItem("userEmail")
        }
        if (data.incidentId && data.channel && data.state && data.caller && data.impact && data.subCategory && data.urgency && data.service && data.priority && data.assignment && data.assignmentTo && data.serviceCategory && data.configurationItem) {
            // await axios.post(`${serverAPI}/createIncident`,data).then((response)=>{
            //     console.log(response);
            //     setSuccess(true);
            //     setMessage({...Message,open:true})
            //     setErrorMessage(response.data.statusMessage);
            //     navigate(-1);
            // }).catch((err)=>{
            //     console.log(err);
            //     setMessage({...Message,open:true})
            //     setErrorMessage("Something went wrong");
            // })
            GlobalService.generalSelect(
                (response) => {
                    // const { estatus, data: responseData } = respdata;
                    console.log(response, 'responseData');
                    // if ((!estatus || estatus === null) && responseData.success) {
                    //   setCategoryTypeList(responseData)
                    // }
                    console.log(response);
                    setSuccess(true);
                    setMessage({ ...Message, open: true })
                    setErrorMessage(response.data.statusMessage);
                    navigate(-1);
                },
                resturls.createNewIncident,
                {},
                'POST'
            );
        } else {
            setMessage({ ...Message, open: true })
            setErrorMessage("please fill all required fields to create incident");
        }
        console.log(data);
    }

    const handleClose = () => {
        setMessage({ ...Message, open: false })
    }

    return (
        <Container style={{
            marginBottom: 60, display: "flex", alignItems: "center", justifyContent: "center", overflowX
                : "hidden"
        }}>
            <DraggableModal open={itemOpen} setOpen={setItemOpen} handleClickOpen={handleClickOpen} handleClose={handleItemClose} />
            <Container component="main" style={{ marginLeft: 80, width: "100%" }} maxWidth="lg">
                <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
                    <h2 style={{ fontSize: 30, fontWeight: "bold", marginLeft: -10 }}>Create Incident</h2>
                    <Button
                        // fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => { Submit() }}

                    >
                        Create New Incident
                    </Button>
                </div>
                <Box
                    sx={{
                        marginTop: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={6}>
                                <InputLabel id="demo-simple-select-standard-label" required>Incident Id</InputLabel>
                                <TextField
                                    autoFocus
                                    disabled
                                    autoComplete="Enter unique Number"
                                    name={Number}
                                    value={Number}
                                    style={{ width: "75%" }}
                                    id="Number"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel id="demo-simple-select-standard-label" required>Channel</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={channel}
                                    onChange={(e) => setChannel(e.target.value)}
                                    label="Channel"
                                    style={{ width: "75%" }}
                                    sm={12}
                                >
                                    <MenuItem value=""  >
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="phone">Phone</MenuItem>
                                    <MenuItem value="Email">Email</MenuItem>
                                    <MenuItem value="Chat/Instant Messaging">Chat/Instant Messaging</MenuItem>
                                    <MenuItem value="Monitoring Tools and Alerts:">Monitoring Tools and Alerts:</MenuItem>
                                    <MenuItem value="Self-Service Portals">Self-Service Portals</MenuItem>
                                    <MenuItem value="Service Desk/Help Desk Portal">Service Desk/Help Desk Portal</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {/* <InputLabel id="demo-simple-select-standard-label" required>Caller</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={Caller}
                                    onChange={(e)=>setCaller(e.target.value)}
                                    label="Caller"
                                    style={{width:"75%"}}
                                    // sm={12}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="System Administrator" default>System Administrator</MenuItem>
                                    <MenuItem value="Employees">Employees</MenuItem>
                                    <MenuItem value="End user">End user</MenuItem>
                                </Select>  */}
                                <div style={{ width: 310, marginTop: 20 }} >
                                    <SearchTextField fieldValue={Caller} setFieldValue={setCaller} search={true} handleClickOpen={handleClickOpen} open={itemOpen} style={{ width: "100%" }} placeholder="Caller" />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel id="demo-simple-select-standard-label" required>State</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={State}
                                    onChange={(e) => setState(e.target.value)}
                                    label="State"
                                    style={{ width: "75%" }}
                                    sm={12}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="New">New</MenuItem>
                                    <MenuItem value="Assigned">Assigned</MenuItem>
                                    <MenuItem value="Reopened">Reopened</MenuItem>
                                    <MenuItem value="In-progress">In-progress</MenuItem>
                                    <MenuItem value="Resolved">Resolved</MenuItem>
                                    <MenuItem value="Pending">Pending</MenuItem>
                                    <MenuItem value="On-hold">On-hold</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel id="demo-simple-select-standard-label" required>Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={Category}
                                    onChange={(e) => { setCategory(e.target.value) }}
                                    label="Category"
                                    style={{ width: "75%" }}
                                    sm={12}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="Network">Network</MenuItem>
                                    <MenuItem value="Employees">Employees</MenuItem>
                                    <MenuItem value="End user">End user</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel id="demo-simple-select-standard-label" required>Impact</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={Impact}
                                    onChange={(e) => { setImapact(e.target.value) }}
                                    label="Impact"
                                    style={{ width: "75%" }}
                                    sm={12}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="High">1 - High</MenuItem>
                                    <MenuItem value="Medium">2 - Medium</MenuItem>
                                    <MenuItem value="Low">3 - Low</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel id="demo-simple-select-standard-label" required>Sub-Categories</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={subCategory}
                                    onChange={(e) => setSubCategory(e.target.value)}
                                    style={{ width: "75%" }}
                                    sm={12}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="Hardware Issues">Hardware Issues</MenuItem>
                                    <MenuItem value="Software Errors">Software Errors</MenuItem>
                                    <MenuItem value="Security Incidents">Security Incidents</MenuItem>
                                    <MenuItem value="Service Outages">Service Outages</MenuItem>
                                    <MenuItem value="Data Loss/Corruption">Data Loss/Corruption</MenuItem>
                                    <MenuItem value="Other/General Issues">Other/General Issues</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel id="demo-simple-select-standard-label" required>Urgency</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={urgency}
                                    onChange={(e) => setUrgency(e.target.value)}
                                    style={{ width: "75%" }}
                                    sm={12}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="High">1 - High</MenuItem>
                                    <MenuItem value="Medium">2 - Medium</MenuItem>
                                    <MenuItem value="Low">3 - Low</MenuItem>

                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel id="demo-simple-select-standard-label" required>Service</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={service}
                                    onChange={(e) => { setService(e.target.value) }}
                                    style={{ width: "75%" }}
                                    sm={12}
                                >

                                    <MenuItem value="Email Service">Email Service</MenuItem>
                                    <MenuItem value="Software Errors">Software Errors</MenuItem>
                                    <MenuItem value="Network Infrastructure">Network Infrastructure</MenuItem>
                                    <MenuItem value="Web Hosting and Websites">Web Hosting and Websites</MenuItem>
                                    <MenuItem value="Database Services">Database Services</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel id="demo-simple-select-standard-label" required>Priority</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={Priority}
                                    onChange={(e) => { setPriority(e.target.value) }}
                                    style={{ width: "75%" }}
                                    sm={12}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="High">High</MenuItem>
                                    <MenuItem value="Moderate">Moderate</MenuItem>
                                    <MenuItem value="Low">Low</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel id="demo-simple-select-standard-label" required>Service Offering</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={ServiceCategory}
                                    onChange={(e) => { setServiceCategory(e.target.value) }}
                                    style={{ width: "75%" }}
                                    sm={12}
                                >
                                    <MenuItem value="Incident Logging and Recording">Incident Logging and Recording</MenuItem>
                                    <MenuItem value="Incident Triage and Classification">Incident Triage and Classification</MenuItem>
                                    <MenuItem value="Incident Escalation and Prioritization">Incident Escalation and Prioritization</MenuItem>
                                    <MenuItem value="Workaround Provisioning">Workaround Provisioning</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel id="demo-simple-select-standard-label" required>Assignment Group</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={Assignment}
                                    onChange={(e) => { setAssignment(e.target.value) }}
                                    style={{ width: "75%" }}
                                    sm={12}
                                >
                                    <MenuItem value="Desktop Support">Desktop Support</MenuItem>
                                    <MenuItem value="Server Administration">Server Administration</MenuItem>
                                    <MenuItem value="Application Support">Application Support</MenuItem>
                                    <MenuItem value="Database Administration">Database Administration</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel id="demo-simple-select-standard-label" required>Configuration Item</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={CI}
                                    onChange={(e) => { setCI(e.target.value) }}
                                    style={{ width: "75%" }}
                                    sm={12}
                                >
                                    <MenuItem value="Hardware Assets">Hardware Assets</MenuItem>
                                    <MenuItem value="Software Applications">Software Applications</MenuItem>
                                    <MenuItem value="Network Infrastructure">Network Infrastructure</MenuItem>
                                    <MenuItem value="Virtual Assets">Virtual Assets</MenuItem>
                                    <MenuItem value="User Accounts and Permissions">User Accounts and Permissions</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel id="demo-simple-select-standard-label" required>Assigned to</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={AssigmentTo}
                                    onChange={(e) => { setAssignmentTo(e.target.value) }}
                                    style={{ width: "75%" }}
                                    sm={12}
                                >
                                    <MenuItem value="Mahathir Mohamed">Mahathir Mohamed</MenuItem>
                                    <MenuItem value="Rohith">Rohith</MenuItem>
                                    <MenuItem value="Mohamed basith">Mohamed basith</MenuItem>
                                    <MenuItem value="Ahamed hathim">Ahamed hathim</MenuItem>
                                    <MenuItem value="mohamed ziyath">mohamed ziyath</MenuItem>
                                    <MenuItem value="Open">Open</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={11}>
                                <TextField
                                    autofocus
                                    required
                                    // fullWidth
                                    style={{ width: "96%" }}
                                    filled
                                    onChange={(e) => { setShortDescription(e.target.value) }}
                                    name="Short Description"
                                    value={shortDescription}
                                    id="short-description"
                                    label="short-description"

                                />
                            </Grid>
                            <Grid item xs={11} style={{ display: "flex" }}>
                                <TextField
                                    autofocus
                                    required
                                    // fullWidth
                                    style={{ width: "96%" }}
                                    name="Description"
                                    label="Description"
                                    type="text"
                                    id="Description"

                                />
                            </Grid>
                        </Grid>

                    </Box>
                </Box>
            </Container>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
                message={ErrorMessage}
                key={vertical + horizontal}
                ContentProps={{
                    sx: {
                        background: Success ? "green" : "#ff3333"
                    }
                }
                }
            />

        </Container>
    )
}

export default CreateNewIncident;
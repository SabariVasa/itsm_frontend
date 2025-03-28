import React, { useState, useEffect } from 'react';
import { Select, MenuItem, Grid, Box, TextField, Button, Container, InputLabel } from "@mui/material";
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useParams } from 'react-router-dom';
// import { IncidentData } from '../../Utils/Incident-Data/IncidentsData';
import axios from 'axios';
import { serverAPI } from '../../Utils/Server';
import Snackbar from '@mui/material/Snackbar';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { TextareaAutosize } from '@mui/material';
import { Stack } from "@mui/material";
import DraggableModal from '../User Management/DraggableModal';
import { useSelector } from 'react-redux';
import SearchTextField from '../HelperComponents/SearchTextField';

function IncidentEditPage() {
    const [channel, setChannel] = useState(0);
    const { IncidentId } = useParams();
    const [EditableData, setEditableData] = useState();

    const [number, setNumber] = useState();
    const [Caller, setCaller] = useState(0);
    const [IncidentState, setIncidentState] = useState(0);
    const [Category, setCategory] = useState(0);
    const [ShortDescription, setShortDescription] = useState('');
    const [Description, setDescription] = useState('');
    const [UpdatedDate, setUpdatedDate] = useState('');
    const [Priority, setPriority] = useState(0);
    const [AssignedTo, setAssingedTo] = useState(0);
    const [AssignmentGroup, setAssignmentGroup] = useState(0);
    const [CI, setCI] = useState();
    const [Impact, setImpact] = useState(0);
    const [subCategory, setSubCategory] = useState(0);
    // const [urgency, setUrgency] = useState();
    // const [service, setService] = useState();
    // const [serviceCategory, setServiceCategory] = useState(0);
    // const [filteredData, setFileredData] = useState();
    const [IncidentData, setIncidentData] = useState();
    const [fetched, setFetched] = useState(false);
    const [createdBy, setCreatedBy] = useState("");

    const [comment, setComment] = useState("");
    const [notes, setNotes] = useState([]);

    const [value, setValue] = React.useState('1');


    const handleAddNote = () => {
        if (comment.trim()) { // Check for empty value
            const noteObject = {
                text: comment,
                createdBy,
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

    const [Message, setMessage] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
    });
    const { vertical, horizontal, open } = Message;
    // const [isVisible, setisVisible] = useState(true);
    const [ErrorMessage, setErrorMessage] = useState();
    const [Success, setSuccess] = useState(false);

    const fetchElementById = async () => {
        await axios.get(`${serverAPI}/getIncidentById/${IncidentId}`).then((res) => {
            setIncidentData(res.data[0]);
            setFetched(true);
        }).catch((err) => {
            console.log(err);
        })
    }

    const handleClose = () => {
        setMessage({ ...Message, open: false })
    }


    const updateData = async (id) => {
        const data = {
            incidentId: Number,
            channel,
            state: IncidentState,
            caller: Caller,
            impact: Impact,
            subCategory,
            category: Category,
            // urgency,
            // service,
            priority: Priority,
            assignment: AssignmentGroup,
            // serviceCategory,
            // configurationItem:CI,
            assignmentTo: AssignedTo,
            shortDescription: ShortDescription
        }
        await axios.post(`${serverAPI}/Update-Incident/${id}`, data).then((res) => {
            console.log("Succesfully document updated")
            if (res.data) {
                setSuccess(true);
                setMessage({ ...Message, open: true })
                setErrorMessage(res.data.statusMessage);
            }
        }).catch((err) => {
            setMessage({ ...Message, open: true })
            setErrorMessage("Something went wrong");
        });
    }

    useEffect(() => {
        fetchElementById();
    }, [])

    useEffect(() => {
        // const filteredData = IncidentData.filter((item)=>{
        //     if(item.id.toLowerCase() === IncidentId.toLowerCase()){
        //         return item
        //     }
        // })
        console.log(IncidentData);
        setEditableData(IncidentData);
        if (IncidentData) {
            setNumber(IncidentData.incidentId)
            setIncidentState(IncidentData.state);
            setShortDescription(IncidentData.ShortDescription)
            setDescription(IncidentData.Description)
            setUpdatedDate(IncidentData.updatedDate)
            setCategory(IncidentData.category)
            setCaller(IncidentData.caller)
            setChannel(IncidentData.channel)
            setPriority(IncidentData.priority)
            setAssingedTo(IncidentData.assignmentTo)
            setAssignmentGroup(IncidentData.assignment)
            setShortDescription(IncidentData.shortDescription);
            setSubCategory(IncidentData.subCategory);
            setImpact(IncidentData.impact)
            setCreatedBy(IncidentData.createdBy);
        }
        console.log(subCategory);
    }, [IncidentData])



    // const MapIncidentState = ["New", "Assigned", "Reopened", "In-Progress", "Resolved", "Pending", "On-hold", "Closed"]
    // const MapEmployee = ["System Administrator", "Employees", "End User"]
    // const MapAssignee = ["Mahathir Mohamed", "Rohith", "Mohamed Basith", "Ahamed hathim", "mohamed ziyath", "Indiresh"]
    // const MapPriority = ["High", "Moderate", "Low"]
    // const MapChannel = ["Phone", "Email", "Chat/Instant Messaging", "Monitoring Tools and Alerts", "Self-Service Portals", "Service Desk/Help Desk Portal"]
    // const MapAssignmentGroup = ["Desktop Support", "Server Administration", "Application Support", "Database Administration"]
    // const MapSubCategory = ["Hardware Issues", "Software Errors", "Security Incidents", "Service Outages", "Data Loss/Corruption", "Other/General Issues"];
    // const MapImapct = ["High", "Medium", "Low"];

    function MapAttributes(attrArr, attr) {
        for (let i = 0; i < attrArr.length; i++) {
            if (attrArr[i].toLowerCase() === attr.toLowerCase()) {
                console.log(attrArr[i])
                return i + 1;
            }
        }
        return 0;
    }

    const [itemOpen, setItemOpen] = React.useState(false);
    const handleClickOpen = () => {
        setItemOpen(true);
    };

    const endUserIncident = useSelector((state) => state.incidentReducers.endUserIncident)
    useEffect(() => {
        setCaller(endUserIncident.Email);
    }, [endUserIncident]);

    const handleItemClose = () => {
        setItemOpen(false);
    };

    useEffect(() => {
        setCaller(localStorage.getItem("userEmail"));
    }, []);
    return (
        <Container style={{ marginBottom: 60 }}>
            <Container component="main" maxWidth="md" style={{ marginLeft: 80 }}>
                <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                    <h2 style={{ fontWeight: "bold", marginLeft: 150 }}>Update Incident</h2>
                    <Button
                        // fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={() => updateData(IncidentId)}

                    >
                        Update Incident
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
                                <InputLabel id="demo-simple-select-standard-label" required>Number</InputLabel>
                                <TextField
                                    disabled
                                    autoComplete="Enter unique Number"
                                    value={number}
                                    name="Number"
                                    required
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
                                    onChange={(e) => { setChannel(e.target.value); }}
                                    label="Channel"
                                    style={{ width: "75%" }}
                                    sm={12}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="Phone">Phone</MenuItem>
                                    <MenuItem value="Email">Email</MenuItem>
                                    <MenuItem value="Chat/Instant Messaging">Chat/Instant Messaging</MenuItem>
                                    <MenuItem value="">Monitoring Tools and Alerts:</MenuItem>
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
                                    onChange={(e)=>{setCaller(e.target.value);}}
                                    label="Caller"
                                    style={{width:"75%"}}
                                    sm={12}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="System Administrator">System Administrator</MenuItem>
                                    <MenuItem value="Employees">Employees</MenuItem>
                                    <MenuItem value="End User">End User</MenuItem>
                                </Select>  */}
                                <InputLabel id="demo-simple-select-standard-label">Caller</InputLabel>
                                <div style={{ width: 310, marginTop: 4 }} >
                                    <SearchTextField labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard" fieldValue={Caller} setFieldValue={setCaller} search={true} handleClickOpen={handleClickOpen} open={open} style={{ width: "100%" }} />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel id="demo-simple-select-standard-label" required>State</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={IncidentState}
                                    onChange={(e) => { setIncidentState(e.target.value); }}
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
                                    <MenuItem value="Closed">Closed</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel id="demo-simple-select-s
                            tandard-label" required>Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={Category}
                                    onChange={(e) => { setCategory(e.target.value); }}
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
                                    <MenuItem value="Inquiry/Help">Inquiry/Help</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InputLabel id="demo-simple-select-standard-label" required>Priority</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={Priority}
                                    onChange={(e) => { setPriority(e.target.value); }}
                                    label="Priority"
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
                                <InputLabel id="demo-simple-select-standard-label" required>Assignment Group</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    label="Assignment Group"
                                    value={AssignmentGroup}
                                    onChange={(e) => { setAssignmentGroup(e.target.value); }}
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
                                <InputLabel id="demo-simple-select-standard-label" required>Impact</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={Impact}
                                    onChange={(e) => { setImpact(e.target.value) }}
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
                                <InputLabel id="demo-simple-select-standard-label" required>Assigned to</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={AssignedTo}
                                    onChange={(e) => { setAssingedTo(e.target.value); }}
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
                                <InputLabel id="demo-simple-select-standard-label" required>Updated Date</InputLabel>
                                <TextField
                                    value={UpdatedDate}
                                    disabled
                                    name="UpdatedDate"
                                    required
                                    style={{ width: "75%" }}
                                    id="UpdatedDate"
                                />
                            </Grid>
                            <Grid item style={{ width: "88%" }}>
                                <TextField
                                    autofocus
                                    required
                                    fullWidth
                                    filled
                                    value={ShortDescription}
                                    id="short-description"
                                    // label="short-description"
                                    name="short-description"


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
            <Box sx={{ width: '100%', typography: 'body1', marginTop: 10 }}>
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
                            <h4 style={{ fontWeight: "normal", fontSize: 16 }}>Incident request raised by <strong>{createdBy}</strong></h4>
                            {/* </div> */}
                            <h4 style={{ fontWeight: "normal", marginTop: -20, fontSize: 15 }}>created at <strong>{UpdatedDate}</strong> </h4>
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
            </Box>
            <DraggableModal open={itemOpen} setOpen={setItemOpen} handleClickOpen={handleClickOpen} handleClose={handleItemClose} />


        </Container>
    )
}

export default IncidentEditPage;
import React, { useState, useEffect } from 'react';
import GridContainer from '../HelperComponents/GridContainer';
import ContentDevider from '../HelperComponents/ContentDevider';
import { OrgOptions } from '../../Utils/CMDB-Data/CIData';
import { Grid, TextField, Stack, Button } from '@mui/material';
import RequestItemTable from '../Request Management/Helper Components/RequestItemTable';
import { approvedData } from '../../Utils/Request Data/RequestItemData';
// import { userBase } from '../../Utils/CMDB-Data/serviceData'
// import { ServerError } from 'msal';
import { serverAPI } from '../../Utils/Server';
import NotifyBar from '../Notification Components/NotifyBar';
import axios from 'axios';
// import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setRequestDetails, setRequestServiceData } from '../../Redux state management/Redux Slices/RequestSlice';
import { useSelector } from 'react-redux';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { TextareaAutosize, Box } from '@mui/material';

function UserRequestForm(props) {
  // const[quantity,setQuantity]=useState();
  const [update, setUpdate] = useState(false);
  const [searchParams, setSearchParams] = useState();
  // const{setRequestDetails,requestService,setRequestService}=useContext(RequestContext);
  const [itemData, setItemData] = useState();
  const [requestNumber, setRequestNumber] = useState();
  const [approvalStatus, setApprovalStatus] = useState("");
  const [requestState, setRequestState] = useState("");
  const [openedDate, setOpenedDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [requestFor, setRequestedFor] = useState(localStorage.getItem("userEmail"));
  const [openedBy, setOpenedBy] = useState("");
  const [ShortDescription, setShortDescription] = useState("");
  const [selectedItem, setSelectedItem] = useState();
  const [Quantity, setQuantity] = useState();
  const [requestedItem, setRequestedItem] = useState();
  const storedItem = JSON.parse(localStorage.getItem('request_details'));

  const [requestCount, setRequestCount] = useState();

  const dispatch = useDispatch();
  const requestService = useSelector((state) => state.requestReducers.requestService);
  const requestDetails = useSelector((state) => state.requestReducers.requestDetails);

  const [notifyStatus, setNotifyStatus] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState();
  const [error, setError] = useState(false);

  const [createdBy, setCreatedBy] = useState("");
  const [UpdatedDate, setUpdatedDate] = useState('');
  const [value, setValue] = React.useState('1');
  const [comment, setComment] = React.useState("");

  const [itemOpen, setItemOpen] = React.useState(false);
  const [notes, setNotes] = useState([]);
  const handleClickOpen = () => {
    setItemOpen(true);
  };

  const endUserIncident = useSelector((state) => state.incidentReducers.endUserIncident)
  useEffect(() => {
    setOpenedBy(endUserIncident.Email);
  }, [endUserIncident]);

  const handleItemClose = () => {
    setItemOpen(false);
  };
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
    setOpenedBy(localStorage.getItem("userEmail"));
  }, []);
  // useEffect(()=>{
  //     setRequestNumber(storedItem.requestNumber);
  //     setApprovalStatus(storedItem.approvalStatus)
  //     setRequestState(storedItem.requestState)
  //     setOpenedDate(storedItem.OpenedDate)
  //     setDueDate(storedItem.DueDate)
  //     setOpenedBy(storedItem.OpenedBy)
  //     setQuantity(storedItem.Quantity)
  //     setRequestedFor(storedItem.requestFor)
  // },[storedItem])

  useEffect(() => {
    // setRequestNumber(requestService.requestNumber);
    setRequestedFor(requestService.requestFor);
    setOpenedDate(requestService.openedDate);
    setOpenedBy(requestService.openedBy);
    setDueDate(requestService.dueDate);
    setShortDescription(requestService.shortDescription);
    setApprovalStatus(requestService.approvalStatus);
  }, [])

  async function countRequest() {
    await axios.get(`${serverAPI}/allRequestCount`).then((res) => {
      if (res.data) {
        setRequestNumber(`REQ2400${parseInt(res.data.responseData) + 1}`)
      }
    }).catch((err) => { console.log(err) })
  }

  async function fetchedRequestDetails(RID) {
    await axios.get(`${serverAPI}/getRequestByRID/${RID}`).then((res) => {
      console.log(res.data)
      if (res.data) {
        setRequestNumber(res.data[0].requestNumber)
        setRequestedFor(res.data[0].requestFor)
        setApprovalStatus(res.data[0].approvalStatus)
        setOpenedDate(res.data[0].openedDate)
        setDueDate(res.data[0].dueDate)
        setOpenedBy(res.data[0].openedBy);
        // setSelectedItem(res.data[0].requestItemList)
        dispatch(setRequestDetails(res.data[0].requestItemList));
        setShortDescription(res.data[0].shortDescription)
      }
    }).catch((err) => { console.log(err) })
  }

  async function updateRequest() {
    const storingData = {
      requestNumber,
      approvalStatus,
      requestState,
      openedDate,
      dueDate,
      requestFor,
      openedBy,
      shortDescription: ShortDescription,
      requestItemlist: requestDetails
    }
    console.log(storingData)
    await axios.post(`${serverAPI}/update-request/${searchParams.get('update')}`, storingData).then((res) => {
      if (res.data) {
        setNotifyStatus(true);
        setNotifyMessage("Request succesfully updated")
      } else {
        setError(true);
        setNotifyMessage("Something went wrong,please try again")
      }
    }).catch((err) => {
      setError(true);
      setNotifyMessage("Something went wrong,please try again")
    })
  }

  useEffect(() => {
    // searchParams(update.get('update'))
    // console.log(searchParams.get('update'))
    setUpdate(searchParams.get('update'))
    if (searchParams.get('update')) {
      fetchedRequestDetails(searchParams.get('update'));
      setUpdate(true)
      console.log("opened")
    } else {
      countRequest()
    }
  }, [])
  async function countRequest() {
    const userName = localStorage.getItem('userEmail');
    await axios.get(`${serverAPI}/getRequestCountByOpenedBy/${userName}`).then((res) => {
      if (res.data) {
        setRequestNumber(`REQ2400000${parseInt(res.data.count) + 1}`)
      }
    }).catch((err) => { console.log(err) })
  }

  async function storeItem() {
    const storingData = {
      requestNumber,
      approvalStatus,
      requestState,
      openedDate,
      dueDate,
      requestFor: localStorage.getItem("userEmail"),
      openedBy,
      // requestType,
      shortDescription: ShortDescription,
      requestItemList: requestDetails
    }
    // console.log(storingData);
    await axios.post(`${serverAPI}/createNewRequest`, storingData).then((res) => {
      if (res.data) {
        setNotifyStatus(true);
        setNotifyMessage("Request succesfully added")
      } else {
        setError(true);
        setNotifyMessage("Something went wrong,please try again")
      }
    }).catch((err) => {
      setError(true);
      setNotifyMessage("Something went wrong,please try again")
    })
    //  localStorage.setItem("request_details",JSON.stringify(storingData));
  }

  useEffect(() => {
    const storingData = {
      requestNumber,
      approvalStatus,
      requestState,
      openedDate,
      dueDate,
      requestFor,
      openedBy,
      shortDescription: ShortDescription,
      selectedItem: requestDetails
    }
    setRequestServiceData(storingData)
    dispatch(setRequestServiceData(storingData));

  }, [requestNumber, approvalStatus, requestState, openedDate, dueDate, requestFor, openedBy, ShortDescription])



  // const localStorageData = {
  //   requestNumber:requestNumber,
  //   approvalStatus:approvalStatus,
  //   requestFor:requestFor,
  //   OpenedBy:OpenedBy,
  // }

  return (
    <>
      {/* <div style={{width:"100%",display:"flex",alignContent:"center",justifyContent:"center"}}>
            <h2>Request Service</h2>
        </div> */}
      <Stack style={{ display: 'flex', alignItems: "center", justifyContent: "right", paddingRight: 20, marginTop: 20 }} direction="row">
        <Button variant="outlined" color="primary" style={{ width: 200, fontSize: 12, marginRight: 10 }} onClick={() => { !update ? storeItem() : updateRequest() }}>{update ? "Update Request" : "Create Request"}</Button>
        <Button variant="outlined" color="warning" style={{ width: 200, fontSize: 12 }}>Cancel Request</Button>
      </Stack>

      <ContentDevider title="Request Service" />
      <GridContainer show={[true, true, false, false]} dropdown={[false, false]} name={["Request Number", "Requested For"]} Name1={requestNumber} Name2={requestFor} setName2={setRequestedFor} label={["Requested Date", ""]} MenuItems={[OrgOptions, approvedData]} setName1={setRequestNumber} />

      <div style={{ width: "90%", display: "flex", alignItems: "center", justifyContent: "Center", alignSelf: "center", marginLeft: 80, marginTop: 20 }}>

        <Grid item style={{ width: "100%" }}>
          <TextField autofocus required fullWidth filled value={ShortDescription} onChange={(e) => { setShortDescription(e.target.value) }} placeholder='Short Description' id="short-description" />
        </Grid>
      </div>
      <div>
        <ContentDevider title="Requested Items" />
        <div style={{ height: "100%" }}>
          <RequestItemTable quantity={Quantity} selectedItem={selectedItem} setSelectedItem={setSelectedItem} setQuantity={setQuantity} itemData={storedItem} requestNumber={requestNumber} />
        </div>
      </div>
      <NotifyBar notifyMessage={notifyMessage} notifyStatus={notifyStatus} setNotifyStatus={setNotifyStatus} error={error} />



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
              <h4 style={{ fontWeight: "normal", fontSize: 16 }}>Service request raised by <strong>{openedBy}</strong></h4>
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
    </>
  )
}


export default UserRequestForm;
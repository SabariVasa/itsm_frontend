import React, { useState, useEffect } from 'react';
import CmdbGridContainer from '../../HelperComponents/GridContainer';
import ContentDevider from '../../HelperComponents/ContentDevider';
import { OrgOptions } from '../../../Utils/CMDB-Data/CIData';
// import { userBase } from '../../../Utils/CMDB-Data/serviceData';
import { serviceRequestType } from '../../../Utils/Request Data/RequestItemData';
import { Stack, Button } from '@mui/material';
// import { RequestContext } from '../../../Routes/HomeRouter';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverAPI } from '../../../Utils/Server';
import { useDispatch, useSelector } from 'react-redux';
import { setRequestGeneralService } from '../../../Redux state management/Redux Slices/RequestSlice';
import StepperComponent from '../../HelperComponents/StepperComponent';
import { setActiveStep } from '../../../Redux state management/Redux Slices/GlobalStepperSlice';
import SearchTextField from '../../HelperComponents/SearchTextField';
// import { setEndUserIncident } from '../../../Redux state management/Redux Slices/IncidentRequestSlice';
import DraggableModal from '../../User Management/DraggableModal';

export default function GeneralService() {

  // const{requestGeneralService,setRequestGeneralService}=useContext(RequestContext); 
  // const dispatch = useDispatch();
  // const requestGeneralService = useSelector((state) => state.requestReducers.requestGeneralService);
  // const requestDetails = useSelector((state) => state.requestReducers.requestDetails);

  // const activeStep = useSelector((state) => state.globalReducers.activeStep);

  const Navigate = useNavigate();

  const [requestNumber, setRequestNumber] = React.useState("");
  const [approvalStatus, setApprovalStatus] = React.useState("");
  const [requesterName, setRequesterName] = React.useState(localStorage.getItem("userEmail"));
  // const OrgOptions = ["Organization 1","Organization 2","Organization 3"];
  const approvedData = ["Approved", "Denied", "Pending"];
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [serviceType, setServiceType] = useState("");
  const [requesterEmail, setRequesterEmail] = useState("user@teksiblegroup.com");


  const [openedDate, setOpenedDate] = useState("");

  useEffect(() => {
    countRequest();
    // dispatch(setActiveStep(activeStep + 1));
  }, [])
  async function countRequest() {
    await axios.get(`${serverAPI}/allServiceRequestCount`).then((res) => {
      if (res.data) {
        setRequestNumber(`REQ-GR-24-00000${parseInt(res.data.responseData) + 1}`)
      }
    }).catch((err) => { console.log(err) })
  }

  function storeRequestData() {
    // dispatch(setRequestGeneralService({
    //   requestNumber,
    //   approvalStatus,
    //   // requesterName,
    //   requesterEmail,
    //   requestType: serviceType,
    //   // requestedDate,
    //   requesterServiceType: serviceType,
    //   openedDate
    // }))
    Navigate(`/request-service/general-service/${serviceType}`);
  }

  useEffect(() => {
    //  setRequestNumber(requestGeneralService.requestNumber);
    // setServiceType(requestGeneralService.requestType || "");
    // setApprovalStatus(requestGeneralService.approvalStatus || "");
    // setRequesterName(requestGeneralService.requesterName || localStorage.getItem("userEmail"));
    // setOpenedDate(requestGeneralService.openedDate || "");
    // setServiceType(requestGeneralService.requesterServiceType || "");

    // // Auto-fill requester email from requestGeneralService or default
    // setRequesterEmail(requestGeneralService.requesterEmail || "user@teksiblegroup.com");
  }, [])

  const [itemOpen, setItemOpen] = React.useState(false);
  const handleClickOpen = () => {
    setItemOpen(true);
  };

  // const endUserIncident = useSelector((state) => state.incidentReducers.endUserIncident)
  useEffect(() => {
    // setRequesterName(endUserIncident.Email);
  }, []);

  const handleItemClose = () => {
    setItemOpen(false);
  };

  return (
    <>
      <StepperComponent steps={["General Information", "Technical Information", "Submit Request"]} />

      <ContentDevider title="General Service Request" />
      <CmdbGridContainer show={[true, true, false, false]} dropdown={[false, true]} name={["Request Number", "Request service type"]} Name1={requestNumber} setName1={setRequestNumber} SelectedValue2={serviceType} setSelectValue2={setServiceType} label={["Requested Date", ""]} MenuItems={[OrgOptions, serviceRequestType]} />

      <div style={{ width: 400, marginTop: 20, marginLeft: 80 }} >
        <SearchTextField search={true} fieldValue={requesterName} setFieldValue={setRequesterName} handleClickOpen={handleClickOpen} style={{ width: "100%" }} placeholder="Requested For" />
        {/* SelectedValue2={requesterName} setSelectValue2={setRequesterName} */}
      </div>

      {/* <CmdbGridContainer show={[false,true,false,false]}  dropdown={[false,true ]} name={["Requester Email Id","Request service type"]} Name1={requesterEmail} setName1={setRequesterEmail} Name2={requesterName} setName2={setRequesterName}    label={["Requested Date",""]} MenuItems={[OrgOptions,serviceRequestType]}/> */}

      {/* <CmdbGridContainer show={[false,false,true,false]}  dropdown={[false,false ]} name={["Requester Email Id","Request service type"]} Name1={requesterEmail} setName1={setRequesterEmail} Name2={requesterName} setName2={setRequesterName}  SelectedValue2={serviceType} setSelectValue2={setServiceType}  label={["Opened Date",""]} MenuItems={[OrgOptions,serviceRequestType]} Date1={openedDate} setDate1={setOpenedDate}/> */}
      <DraggableModal open={itemOpen} setOpen={setItemOpen} handleClickOpen={handleClickOpen} handleClose={handleItemClose} />

      <Stack style={{ display: 'flex', alignItems: "center", justifyContent: "space-around", paddingRight: 20, paddingTop: 50 }} direction="row">
        <Button variant="outlined" disabled={!serviceType ? true : false} color="warning" style={{ width: 100 }} onClick={() => { Navigate(-1); }}>Back</Button>
        <Button variant="outlined" disabled={!serviceType ? true : false} color="warning" style={{ width: 100 }} onClick={() => { storeRequestData(); }}>Next </Button>
      </Stack>
    </>
  )
}
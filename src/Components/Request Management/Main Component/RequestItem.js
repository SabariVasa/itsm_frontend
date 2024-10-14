import React, { useEffect, useState } from 'react';
import ContentDevider from '../../HelperComponents/ContentDevider';
import CmdbGridContainer from '../../HelperComponents/GridContainer';
import { VirtualizationPlatform, OperatingSystem } from '../../../Utils/CMDB-Data/CIData';
import { useSearchParams, useParams } from 'react-router-dom';
import { Requestusers, requestState } from '../../../Utils/Request Data/RequestItemData';
// import { userBase } from '../../../Utils/CMDB-Data/serviceData';
import { Grid, Stack, Button, Modal } from '@mui/material';
import IncrementContainer from '../../HelperComponents/IncrementContainer';
import { useNavigate } from 'react-router-dom';
import SearchModalButton from '../Helper Components/SearchModalButton';
// import CmdbSelectField from '../../HelperComponents/SelectField';
// import { NetworkDeviceType } from '../../../Utils/CMDB-Data/CIData';
import { Box } from '@mui/material';
import SearchTable from '../Helper Components/SearchTable';
import NotifyBar from '../../Notification Components/NotifyBar';
// import { RequestContext } from '../../../Routes/HomeRouter';
import { useDispatch, useSelector } from 'react-redux';
import { setRequestDetails } from '../../../Redux state management/Redux Slices/RequestSlice';

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

function RequestItem() {
  const [open, setHandleOpen] = React.useState(false);
  const handleOpen = () => setHandleOpen(true);
  const handleClose = () => setHandleOpen(false);
  const { item_id } = useParams();
  const Navigate = useNavigate();
  const [itemName, setItemName] = useSearchParams();
  const itemData = JSON.parse(itemName.get('itemData'));
  const requestData = JSON.parse(itemName.get('requestData'));
  // const requestData = JSON.parse(localStorage.getItem('request_details'))
  const [productName, setProductName] = useState(itemData.Item);
  const [Type, setType] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [item, setItem] = useState(itemName);
  const [requestNumber, setRequestNumber] = useState();
  const [Quantity, setQuantity] = useState();
  const [stateValue, setStateValue] = useState();


  const [selectedItem, setSelecteditem] = useState();
  const [OpenedBy, setOpenedBy] = useState();

  const [notifyMessage, setNotifyMessage] = useState();
  const [notifyStatus, setNotifyStatus] = useState(false);

  const [cost, setCost] = useState();
  const [itemDetails, setItemDetails] = useState({ cost: 0 });

  // const {requestDetails,setRequestDetails} = useContext(RequestContext)
  const dispatch = useDispatch();
  const requestService = useSelector((state) => state.requestReducers.requestService);
  const requestDetails = useSelector((state) => state.requestReducers.requestDetails);
  const [count, setCount] = useState(requestDetails ? requestDetails.length + 1 : 1);

  function storeTableData() {
    // setRequestDetails()
    console.log({
      requestNumber: requestNumber,
      Quantity: Quantity,
      itemName: selectedItem,
      itemDetails: itemDetails,
      location: itemDetails.location,
      cost: cost
    });
    dispatch(setRequestDetails({
      requestNumber: requestNumber, Quantity: Quantity,
      itemName: selectedItem,
      itemDetails: itemDetails,
      location: itemDetails.location,
      cost: cost
    }));
    setNotifyStatus(true);
    console.log(requestDetails);
    setNotifyMessage("Successfully requested item added to the card");
    Navigate(-1);
  }

  useEffect(() => {
    console.log(Quantity);
    setCost(itemDetails.cost ? itemDetails.cost * Quantity : 0)
  }, [Quantity, itemDetails])

  const [requestID, setRequestID] = useState();
  useEffect(() => {
    console.log(requestDetails);
    setRequestNumber(`RITM00${count}`)
    setRequestID(`REQ2400${count}`)
  }, [requestDetails])

  return (
    <>
      <Stack style={{ display: 'flex', alignItems: "center", justifyContent: "right", paddingRight: 20, marginTop: 20, marginBottom: -40 }} direction="row">
        <Button variant="contained" color="primary" style={{ width: 150, fontSize: 12, marginRight: 10 }} onClick={() => { storeTableData() }}>ADD TO CART</Button>
        <Button variant="outlined" color="warning" style={{ width: 100, fontSize: 12 }}>Delete</Button>
      </Stack>
      <ContentDevider title="Requested Item" />
      <CmdbGridContainer MenuItems={[OperatingSystem, VirtualizationPlatform]} show={[true, true, false, false]} name={["Request Item Number", "Request ID"]} dropdown={[false, false]} selectValue={Type} icon={false} label={["Opened Date", "Warranty end date"]} Name1={requestNumber} Name2={requestID} setName1={setRequestNumber} setSelectValue={setType} setDate1={setStartDate} Date1={requestData.OpenedDate} setDate2={setEndDate} />

      {/* <Grid >
       <CmdbGridContainer MenuItems={[requestItems,userBase]} show={[false,true,false,false]} name={["Select Item","Opened By"]} dropdown={[true,true]} SelectedValue1={productName} icon={false} label={["Opened Date","Warranty end date"]} setSelectValue1={setProductName} SelectedValue2={requestData.OpenedBy}  setDate1={setStartDate} setDate2={setEndDate}/>   
       <SearchModalButton/>
       </Grid> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <SearchTable selectedItem={selectedItem} setSelecteditem={setSelecteditem} setHandleOpen={setHandleOpen} setItemDetails={setItemDetails} />
        </Box>
      </Modal>


      {/* <CmdbGridContainer MenuItems={[requestItems,approvedData]} show={[true,true,false,false]} name={["Request Number","Stage"]} dropdown={[false,true]} SelectedValue2={requestData.approvalStatus} icon={false} label={["Opened Date","Warranty end date"]} Name1={requestData.requestNumber} setSelectValue1={setProductName} setDate1={setStartDate} setDate2={setEndDate}/>  */}


      <Grid container rowSpacing={1} sx={{ width: "100%", display: "flex", alignItems: "center" }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={4} style={{ marginLeft: 80, marginTop: 15 }}>
          <IncrementContainer style={{ width: 400 }} title={"Select Quantity"} min={1} value={Quantity} setValue={setQuantity} />
        </Grid>
        <Grid item xs={6} style={{ marginLeft: 88, marginTop: 10 }}>
          <SearchModalButton setHandleOpen={setHandleOpen} selectedItem={selectedItem} />
        </Grid>
      </Grid>
      <NotifyBar notifyStatus={notifyStatus} setNotifyStatus={setNotifyStatus} notifyMessage={notifyMessage} />

      <CmdbGridContainer MenuItems={[Requestusers, requestState]} show={[true, false, false, false]} name={["Item Cost", "State"]} dropdown={[false, false]} Name1={`$${cost}`} setName1={setCost} SelectedValue1={requestData.requestFor} icon={false} label={["Opened Date", "Warranty end date"]} setSelectValue2={setStateValue} setDate1={setStartDate} setDate2={setEndDate} />
    </>
  )
}

export default RequestItem
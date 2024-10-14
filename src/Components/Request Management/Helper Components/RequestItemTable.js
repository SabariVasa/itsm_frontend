import React, { useState } from 'react';
// import CMDBTable from '../../HelperComponents/Table';
import RequestTable from './RequestTable';
import { Stack, Button } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Modal from '@mui/material/Modal';
// import {Autocomplete} from '@mui/material';
// import { userBase } from '../../../Utils/CMDB-Data/serviceData';
// import { requesItems } from '../../../Utils/Request Data/RequestItemData';
// import CancelIcon from '@mui/icons-material/Cancel';
// import IncrementContainer from '../../HelperComponents/IncrementContainer';
// import CmdbDate from '../../HelperComponents/DateComponent';
import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

function RequestItemTable(props) {

  // const requestService = useSelector((state) => state.requestReducers.requestService);
  const navigate = useNavigate();
  const [enableSelect, setEnableSelect] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [counter, setCounter] = useState(1)
  const handleOpen = () => setOpen(true);
  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false)
    }
  }
  const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random()
      * (max - min + 1)) + min;
  };

  function storeDataOffline() {
    localStorage.setItem('service_details', JSON.stringify(props.itemData))
  }
  const [requestData, setRequestData] = useState([]);
  const [routeData, setRouteData] = useState([]);

  function AddItem() {
    const newItem = {
      ID: `RITM000${counter}`, Quantity: props.quantity, Item: props.selectedItem.label, DueDate: "2024-11-13 13:58:43", Price: `$${randomNumberInRange(500, 1000)}`, stage: "waiting for approval"
    }

    setRequestData([...requestData, newItem]);
    // setRouteData(localStorage.setItem('selected_data',JSON.stringify(requestData)));
    setCounter(counter + 1);
    // console.log(props.selectedItem);

  }
  function selectItemPage() {
    const itemData = {
      "itemId": "RITM001",
      "itemBrand": "HP",
      "itemModel": "Pavilion",
      "modelDescription": "HP 15.6inch Micro-Edge Anti-Glare 15s-Eq2143au",
      "location": "PO Box 54285",
      "stockAvailable": 3,
      "warrantyStart": null,
      "warrantyEnd": null,
      "contactPerson": "System Administrator",
      "deliveryEstimation": 8
    }
    console.log(props.requestNumber);
    // console.log(requestService);
    navigate(`/request_item/RITM001?itemData=${JSON.stringify(itemData)}&&requestData=${JSON.stringify(props.requestNumber)}`)
  }
  return (
    <div>
      <Stack style={{ display: 'flex', alignItems: "center", justifyContent: "right", paddingRight: 20, marginTop: 20 }} direction="row">
        <FormControlLabel control={<Checkbox checked={enableSelect} onChange={(e) => { setEnableSelect(e.target.checked) }} />} label="Enable Selection" />
        <Button variant="contained" color="primary" style={{ width: 150, fontSize: 12, marginRight: 10 }} onClick={() => { selectItemPage() }}>Add New Item</Button>
      </Stack>
      <RequestTable setCounter={setCounter} counter={counter} RequestData={requestData} setRequestData={setRequestData} enableSelect={enableSelect} itemData={props.itemData} />

    </div>
  )
}

const Style = {
  modalPosition:
  {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }
}

export default RequestItemTable
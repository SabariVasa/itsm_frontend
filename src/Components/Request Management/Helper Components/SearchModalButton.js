import React, { useState } from 'react';
import { InputBase, IconButton, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


export default function SearchModalButton(props) {
  // const[enableSelect,setEnableSelect]=useState(false);
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
  return (
    <>
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 395, marginLeft: 11 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search configuration item"
          inputProps={{ 'aria-label': 'Select configuration item' }}
          onChange={(e) => { props.setSelectedItem(e.target.value) }}
          value={props.selectedItem}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon onClick={() => { props.setHandleOpen(true) }} />
        </IconButton>
      </Paper>
    </>
  )
}

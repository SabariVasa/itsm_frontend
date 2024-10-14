import React,{useState} from 'react';
import RequestForm from '../Helper Components/RequestForm';

function CreateRequestItem() {

  const requestData = {
     requestNumber:"REQ024001",
     approval:"Requested",
     RequestedDate:"07/05/2024",
     DueDate:"07/26/2024",
     shortDecription:"Request demo description",
     requestedItem:[
       {requestItemId:"RITM0001",Quantity:"2",item:"Dell Laptop",price:100,stage:"waiting for approval"}
     ]
  }

  const[requestNumber,setRequestNumber]=useState("REQ024001");
  const[approvalStatus,setApprovalStatus]=useState();
  const[requestState,setRequestState]=useState();
  const[OpenedDate,setOpenedDate]=useState();
  const[dueDate,setDueDate]=useState();
  const[requestFor,setRequestedFor]=useState();
  const[OpenedBy,setOpenedBy]=useState();
  const[ShortDescription,setShortDescription]=useState();
  const[selectedItem,setSelectedItem]=useState();
  const[Quantity,setQuantity]=useState();
  const[requestedItem,setRequestedItem]=useState();

  

  return (
    <>
      <RequestForm requestNumber={requestNumber} OpenedBy={OpenedBy} setOpenedBy={setOpenedBy} setRequestedFor={setRequestedFor} requestedFor={requestFor} setRequestNumber={setRequestNumber} OpenedDate={OpenedDate} setOpenedDate={setOpenedDate} requestState={requestState} setRequestState={setRequestState} approvalStatus={approvalStatus} dueDate={dueDate} setDueDate={setDueDate} setApprovalStatus={setApprovalStatus} ShortDescription={ShortDescription} setShortDescription={setShortDescription} selectedItem={selectedItem} setSelectedItem={setSelectedItem} quantity={Quantity} setQuantity={setQuantity}/>
    </>
  )
}

export default CreateRequestItem
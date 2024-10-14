import $ from "jquery";
import React, { useRef, useEffect, useState } from "react";
import { Container } from "@mui/material";
import { Stack, Button } from "@mui/material";
import ReactFormRender from "./ReactFormRender";
import "formBuilder/dist/form-builder.min.js";


window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
// require("formBuilder");


const FormBuilder = () => {
  const formBuilderRef = useRef(null);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const options = {
      onSave: function (evt, formData) {
        setFormData(formData);
        console.log(formData);
      }
    };

    $(formBuilderRef.current).formBuilder(options);

  }, []);


  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Stack style={{ display: 'flex', alignItems: "center", justifyContent: "space-between", paddingRight: 20, marginTop: 20 }} direction="row">
        <h2>Form Builder</h2>
        <Button variant="outlined" color="primary" style={{ width: 200, fontSize: 12, marginRight: 10 }} onClick={() => { handleClickOpen() }}>Preview Form</Button>
      </Stack>
      <div id="form-builder" ref={formBuilderRef}></div>
      <ReactFormRender open={open} setOpen={setOpen} handleClickOpen={handleClickOpen} handleClose={handleClose} formData={formData} />
    </div>
  );
};


export default function ReactFormGenerate() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container style={{ margin: 10 }}>
      {/* <Stack style={{display:'flex',alignItems:"center",justifyContent:"space-between",paddingRight:20,marginTop:20}} direction="row">
        <h2>Form Builder</h2>
           <Button variant="outlined"  color="primary" style={{width:200,fontSize:12,marginRight:10}} onClick={()=>{handleClickOpen()}}>Preview Form</Button>
       </Stack> */}
      <FormBuilder />
      {/* <ReactFormRender open={open} setOpen={setOpen} handleClickOpen={handleClickOpen} handleClose={handleClose} formData={formData}/> */}
    </Container>
  );
}


// import React from 'react';
// import ReactDOM from 'react-dom';
// import { ReactFormBuilder } from 'react-form-builder2';
// import 'react-form-builder2/dist/app.css';
// import 'bootstrap/dist/css/bootstrap.min.css';


// export default function ReactFormGenerate(){
//   return(
//     <ReactFormBuilder />
//   )
// }
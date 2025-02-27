import React, { useState } from 'react';
import { BsClipboardPlus } from "react-icons/bs";
import { AiOutlineForm } from "react-icons/ai";
import { Link } from "react-router-dom";
// import ReactFormGenerate from './ReactFormGenerate';


export default function FormMenu() {
  const [activeForm, setActiveForm] = useState('')
  // const componentObj = {
  //   generate_form: ReactFormGenerate,
  //   // hardware: RequestForm,
  //   // ongoing: Products,e
  //   // resolved: OnlineServices,
  // };

  // let Component = null;
  // Component = componentObj[activeForm];
  return (
    <>
      {activeForm ? (
        <></>
      ) : (
        <>
          <div style={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", paddingTop: 150 }}>
            <h1>Form Generator</h1>
          </div>
          <div onClick={() => setActiveForm('generate_form')} style={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", paddingTop: 40 }}>
            {/* <Link to={"/generate_form"} style={{ textDecoration: "none", color: "white" }}> */}
            <div style={{ width: 120, height: 130, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: 20 }} className="form-glass-design">
              <BsClipboardPlus style={{ fontSize: 45 }} />
              <h4>Create New</h4>
            </div>
            {/* </Link> */}
            {/* <Link to={"/generate-form"} style={{ textDecoration: "none", color: "white" }}> */}
            <div style={{ width: 120, height: 130, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginLeft: 20, paddingTop: 20 }} className="form-glass-design">
              <AiOutlineForm style={{ fontSize: 45 }} />
              <h4>All Forms</h4>
            </div>
            {/* </Link> */}
          </div>
        </>
      )}
    </>
  )
}

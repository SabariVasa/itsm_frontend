import React, { useState } from 'react';
import ContentDevider from '../HelperComponents/ContentDevider';
// import { useParams } from 'react-router-dom';
import CmdbGridContainer from '../HelperComponents/GridContainer';
// import IncrementContainer from '../HelperComponents/IncrementContainer';
import { styled } from '@mui/material/styles';
import { Button, Stack } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { serverAPI } from '../../Utils/Server';
import axios from 'axios';
import NotifyBar from '../Notification Components/NotifyBar';
import ReactLoading from 'react-loading';
// import { useDispatch, useSelector } from 'react-redux';
// import { setActiveStep } from '../../Redux state management/Redux Slices/GlobalStepperSlice';
// import { Link, useNavigate } from "react-router-dom";
import DownloadSampleExcelButton from '../HelperComponents/DownloadSampleExcelButton';


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function GeneralInfoCi(props) {
  const [excelFile, setExcelFile] = useState();
  const [notifyStatus, setNotifyStatus] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  // const dispatch = useDispatch();
  // const activeStep = useSelector((state)=>state.globalReducers.activeStep);
  // const navigate = useNavigate();

  function handleFileChange(e) {
    if (e.target.files[0]) {
      setExcelFile(e.target.files[0])
    }
  }

  function spinnerLoading(message) {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setNotifyStatus(true);
      setNotifyMessage(message)
    }, 2000)
  }

  async function handleUpload(e) {
    let formData = new FormData();
    formData.append('file', excelFile);

    console.log("cliked")
    await axios.post(`${serverAPI}/inventory-upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => {
      if (res.data) {
        setLoading(false);
        spinnerLoading("Successfully file uploaded");
      }
      console.log(res.data);
    }).catch((err) => {
      setError(true);
      spinnerLoading("Sorry!! unable to upload please try again after sometimes");
      // setLoading(false);
      console.log(err)
    }
    )
  }
  return (
    <>
      <Stack style={{ display: 'flex', alignItems: "center", justifyContent: "right", paddingRight: 20, marginTop: 20, marginBottom: -40 }} direction="row">

        {excelFile ? <div style={{ marginRight: 20 }} className="excel-file-border">
          {excelFile ? excelFile.name : null}
        </div> : null}

        {/* <div style={{display:"flex",flexDirection:"row",justifyContent:"space-around",alignItems:"center"}}>
          <Button variant="outlined"  color="primary" style={{width:200,fontSize:12,marginRight:10,}} onClick={()=>{

          }}>
          <FileUploadIcon/>
            Upload Inventory
          </Button>
          </div> */}
        {/* <div>
        <label htmlFor="file" className="sr-only">
          Choose a file
        </label>
        <input id="file" type="file"  />
      </div> */}
        {loading ? <div className='loading-container'>
          <ReactLoading type={"spinningBubbles"} color={"#e68a00"} height={50} width={100} className='loading-spinner' />
        </div> : null}
        {!excelFile ? <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />} onChange={(e) => handleFileChange(e)}>Choose File<VisuallyHiddenInput type="file" />
        </Button> : <Button component="label" variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />} onClick={() => handleUpload()}>Upload file
        </Button>}
        {/* <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />} onChange={(e)=>handleFileChange(e)}>Download Sample<VisuallyHiddenInput type="file"/>
          </Button> */}
        <DownloadSampleExcelButton />

      </Stack>
      <ContentDevider title={`${props.serviceType} General Information`} />
      <CmdbGridContainer MenuItems={props.MenuItems1} show={[true, true, false, false]} name={props.Field1} dropdown={[false, true]} SelectedValue2={props.Type} setSelectValue2={props.setType} Name1={props.serverName} setName1={props.setServerName} />

      <CmdbGridContainer MenuItems={props.MenuItems2} show={[true, true, false, false]} name={props.Field2} setSelectValue1={props.setManufacturer} SelectedValue1={props.Manufacturer} setName2={props.setModelNumber} Name2={props.modelNumber} dropdown={[true, false]} />

      <CmdbGridContainer MenuItems={props.MenuItems3} show={[true, true, false, false]} name={props.Field3} dropdown={[true, false]} SelectedValue1={props.Location} setSelectValue1={props.setLocation} setName2={props.setSerialNumber} Name2={props.serialNumber} />

      <NotifyBar notifyMessage={notifyMessage} error={error} notifyStatus={notifyStatus} setNotifyStatus={setNotifyStatus} />
    </>
  )
}

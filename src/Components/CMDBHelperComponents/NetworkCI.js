import React,{useState} from 'react';
// import { OperatingSystem,VirtualizationPlatform,OrgOptions,storageType } from '../../Utils/CMDB-Data/CIData';
import ContentDevider from '../HelperComponents/ContentDevider';
// import IncrementContainer from '../HelperComponents/IncrementContainer';
import {InputLabel,Select,MenuItem,Box,Grid,Stack,Button} from '@mui/material';
// import CmdbGridContainer from '../HelperComponents/GridContainer';
import FormControl from '@mui/material/FormControl';
import MultiComponent from '../HelperComponents/MultiComponent';
import { routing_protocols,networkOperatingSystems, vlanType } from '../../Utils/CMDB-Data/NetworkCIData';
import CmdbTextField from '../HelperComponents/TextField';
// import CmdbSelectField from '../HelperComponents/SelectField';
import Modal from '@mui/material/Modal';
// import Typography from '@mui/material/Typography';
import { FaWindowClose } from "react-icons/fa";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  borderRadius:2,
  boxShadow: 24,
  pt: 4,
  pb: 4,
  pr:8
};


export default function NetworkCI(props) {
  const [Value, setValue] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const[vlan,setVlan]=useState();
  const[createdVlan,setcreatedVlan]=useState([]);
  const[VlanName,setVlanName]=useState();

  const[RoutingProtocol,setRoutingProtocol]=useState([]);

  const handleChange = (event) => {
    props.setOperatingSystem(event.target.value);
  };
  const deleteVlan = (index)=>{
    const filteredItems = createdVlan.slice(0, index).concat(createdVlan.slice(index+1,createdVlan.length))
    setcreatedVlan(filteredItems);
    // console.log(filteredItems);
  }
  return (
    <>
     <ContentDevider title={`Configuration Parameters`}/> 
        <Grid container rowSpacing={1} sx={{width:"80%",display:"flex",alignItems:"center"}} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
        <Box sx={{ minWidth:80,maxWidth:'80%',marginLeft:10,marginTop:2 }}>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Operating System</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.OperatingSystem}
          label={"Operating System"}
          onChange={(e)=>{handleChange(e)}}
        >
           <MenuItem value="">
            <em>Select OperatingSystem</em>
          </MenuItem>
         {networkOperatingSystems.map((item,index)=>{
            return <MenuItem value={item.value} key={index} >{item.value}</MenuItem>
         })}
        </Select>
      </FormControl>
        </Box>
          </Grid>
        <Grid item xs={6}>
        <Box sx={{ minWidth:80,maxWidth:'80%',marginLeft:10,marginTop:2 }}>
           <MultiComponent label="Routing Protocols" itemArray={props.RoutingProtocol} setItemArray={props.setRoutingProtocol}  names={routing_protocols}/>
        </Box>
          </Grid>
        
          {/* <Grid item xs={6}>
          <Box sx={{ minWidth:80,maxWidth:'80%',marginLeft:10,marginTop:2 }}>
            <FormControl fullWidth>
                <IncrementContainer title="Select storage capacity of RAM in GB" min={128} step={128}/> 
              </FormControl>
          </Box>
            </Grid> */}
        </Grid>
        {/* <ContentDevider title="Connectivity Parameters"/>
        <Stack style={{display:'flex',alignItems:"flex-start",justifyContent:"left",marginLeft:50,paddingBottom:10}} direction="row">
      <Button variant="contained"  color="primary" style={{width:150}} onClick={handleOpen}>Create Vlans</Button>
      <Button variant="contained"  color="secondary" style={{width:200,marginLeft:10}} onClick={handleOpen}>Create Interface</Button>
      <Button variant="contained"  color="secondary" style={{width:200,marginLeft:10}} >Create Subnets</Button>
      <Button variant="contained"  color="secondary" style={{width:200,marginLeft:10}} >Create Interface</Button>
    </Stack> */}
    {createdVlan.length>0?<div style={{width:"85%",display:"flex",alignItems:"center",justifyContent:"flex-start",padding:10,marginLeft:50}} className='vlanContainer'>
    {createdVlan.map((item,index)=>{
      return(
          <div className="vlanButton">
           <p  onClick={()=>{handleOpen()}}>{item}</p>
           <FaWindowClose color="red"  onClick={()=>{deleteVlan(index)}}/> 
          </div>
  )
    })}
    </div>:null}
    <Stack/>
    <Modal  
    open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
          <Box sx={style}>
            <div style={{width:"90%",display:"flex",alignItems:"center",justifyContent:"space-between",marginLeft:55}}>
               <h2 style={{fontWeight:"bold"}}>Create Vlan</h2>
               <div style={{display:"flex",alignItems:"center",justifyContent:"between"}}>
               <Button variant="contained"  color="primary" style={{width:150,marginRight:10}} onClick={()=>{setcreatedVlan(prevStateArray => [...prevStateArray, vlan])}} >Create</Button>
               <Button variant="contained"  color="warning" style={{width:150}} onClick={()=>{handleClose()}} >Cancel</Button>
               </div>
            </div>
      <Grid container rowSpacing={1} style={{width:"80%",display:"flex",justifyContent:"space-around"}} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
        <Grid xs={6}>
              <CmdbTextField name={"Vlan ID(1 - 4049)"} setName={setVlan} style={{width:"100%"}}/>
              </Grid>
        <Grid xs={6}>
              <CmdbTextField name={"Vlan Name"}  setName={setVlanName} style={{width:"100%",marginLeft:150}}/>
        </Grid>
        <Grid xs={6}> 
              <MultiComponent label="Select Interfaces" setItemArray={setRoutingProtocol} style={{width:"100%",marginLeft:80,marginTop:20}}/>
              </Grid>
        <Grid xs={6}>
        <Box sx={{  width:"100%",marginLeft:19,marginTop:2 }}>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Vlan Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.SelectedValue}
          label={"Select Vlan Type"}
          onChange={(e)=>{handleChange(e)}}
        >
           <MenuItem value="">
            <em>Select Vlan Type</em>
          </MenuItem>
         {vlanType.map((item,index)=>{
            return <MenuItem value={item.value} key={index} >{item.value}</MenuItem>
         })}
        </Select>
      </FormControl>
        </Box>
        </Grid>
        </Grid>
        </Box>
    </Modal>
        {/* <ContentDevider title="Software Parameters"/>
        <CmdbGridContainer MenuItems={[OperatingSystem,VirtualizationPlatform]} show={[true,true,false,false]} name={props.SoftwareField1} dropdown={[true,true]} selectValue={props.Type} setSelectValue={props.setType} /> */}
    </>
  )
}

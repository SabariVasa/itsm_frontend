import React, { useEffect } from 'react';
import { OperatingSystem,VirtualizationPlatform,OrgOptions,storageType } from '../../Utils/CMDB-Data/CIData';
import ContentDevider from '../HelperComponents/ContentDevider';
import IncrementContainer from '../HelperComponents/IncrementContainer';
import {Box,Grid} from '@mui/material';
import CmdbGridContainer from '../HelperComponents/GridContainer';

import FormControl, { useFormControl } from '@mui/material/FormControl';

export default function ServerCI(props) {
  // useEffect(()=>{
  //   console.log(props.OperatingSystem);
  //   console.log(props.storageType);
  // },[props.OperatingSystem])
  return (
    <>
     <ContentDevider title={`Hardware Parameters`}/> 
        <CmdbGridContainer MenuItems={[OrgOptions,storageType]} show={[true,true,false,false]} name={props.HardwareField1} dropdown={[false,true]} SelectedValue2={props.storageType} setSelectValue2={props.setStorageType} Name1={props.ipaddress} setName1={props.setipaddress}/>
        <Grid container rowSpacing={1} sx={{width:"80%",display:"flex",alignItems:"center"}} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
        <Box sx={{ minWidth:80,maxWidth:'80%',marginLeft:10,marginTop:2 }}>
           <FormControl fullWidth>
               <IncrementContainer value={props.Core} setValue={props.setCore} title="Choose number of cores" min={1}/> 
            </FormControl>
        </Box>
          </Grid>
        <Grid item xs={6}>
        <Box sx={{ minWidth:80,maxWidth:'80%',marginLeft:10,marginTop:2}}>
           <FormControl fullWidth>
               <IncrementContainer value={props.RAM} setValue={props.setRAM} title="Choose number of RAM in GB" min={16} step={16}/> 
            </FormControl>
        </Box>
          </Grid>
        <Grid item xs={6}>
        <Box sx={{ minWidth:80,maxWidth:'80%',marginLeft:10,marginTop:2 }}>
           <FormControl fullWidth>
               <IncrementContainer value={props.ROM} setValue={props.setROM} title="Select storage capacity of RAM in GB" min={128} step={128}/> 
            </FormControl>
        </Box>
          </Grid>
        </Grid>
        <ContentDevider title="Software Parameters"/>
        <CmdbGridContainer MenuItems={[OperatingSystem,VirtualizationPlatform]} show={[true,true,false,false]} name={props.SoftwareField1} dropdown={[true,true]} SelectedValue2={props.Virtualization} SelectedValue1={props.OperatingSystem} setSelectValue2={props.setVirtualization} setSelectValue1={props.setOperatingSystem}/>
    </>
  )
}

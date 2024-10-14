import React, { useState } from 'react';
import ContentDevider from '../../HelperComponents/ContentDevider';
import { useParams } from 'react-router-dom';
import { Grid, Box, FormControl } from '@mui/material';
import { generationData, itemDetails } from '../../../Utils/Request Data/RequestItemData';
// import CmdbGridContainer from '../../HelperComponents/GridContainer';
import IncrementContainer from '../../HelperComponents/IncrementContainer';
import { OperatingSystem, storageType } from '../../../Utils/CMDB-Data/CIData';
import CmdbSelectField from '../../HelperComponents/SelectField';
import { Button } from '@mui/material';

function RequestItemDetails(props) {
  const { request_item_id } = useParams();
  const [OS, setOS] = useState();
  const [processor, setprocessor] = useState();
  const [selectStorageType, setSelectStorageType] = useState();
  const [storageCapacity, setStorageCapacity] = useState();
  const [memory, setMemory] = useState();
  // const [core, setCore] = useState();
  return (
    <>
      <ContentDevider title={`${request_item_id} Details`} />
      <Grid container spacing={3}>
        <Grid xs={6} style={{ height: 400, borderWidth: 1, display: "flex", alignItems: "center", justifyContent: "Center" }}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS666EpXlTFgQerfYQ_oe7eG8vp6qg9Bt7wfg&s" height="60%" width="60%" />
        </Grid>
        <Grid xs={6} style={{ height: 400 }}>
          <div>
            <h3>{itemDetails[0].itemTitle}</h3>
            <p style={{ fontWeight: "lighter" }}>{itemDetails[0].itemDescription}</p>
            <p>Basic Specification</p>
            <ul>
              {itemDetails[0].basicSpec.map((data, idx) => {
                return (
                  <li style={{ fontWeight: "lighter" }}>{data}</li>
                )
              })}
            </ul>
          </div>
        </Grid>
        <ContentDevider title="Select Product Specifications" />
        <Grid container rowSpacing={1} sx={{ width: "80%", display: "flex", alignItems: "center", marginBottom: 5 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Box sx={{ minWidth: 100, maxWidth: '100%', marginTop: 2 }}>
              <FormControl fullWidth>
                <CmdbSelectField MenuItems={OperatingSystem} SelectedValue={OS} setSelectValue={setOS} label="Select Operating System" />
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ minWidth: 100, maxWidth: '100%', marginTop: 2 }}>
              <FormControl fullWidth>
                <CmdbSelectField MenuItems={generationData} SelectedValue={processor} setSelectValue={setprocessor} label="Choose Processor Core" />
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={6}>

            <Box sx={{ minWidth: 100, maxWidth: '100%', marginTop: 2 }}>
              <FormControl fullWidth>
                <CmdbSelectField MenuItems={storageType} SelectedValue={selectStorageType} setSelectValue={setSelectStorageType} label="Choose Storage Type" />
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ minWidth: 80, maxWidth: '80%', marginLeft: 10, marginTop: 2 }}>
              <FormControl fullWidth>
                <IncrementContainer value={storageCapacity} setValue={setStorageCapacity} title="Storage capacity in GB" min={16} step={16} />
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ minWidth: 80, maxWidth: '80%', marginLeft: 10, marginTop: 2 }}>
              <FormControl fullWidth>
                <IncrementContainer value={memory} setValue={setMemory} title="Choose number of RAM" min={1} />
              </FormControl>
            </Box>
          </Grid>
          {/* <Grid item xs={6}>
        <Box sx={{ minWidth:80,maxWidth:'80%',marginLeft:10,marginTop:2 }}>
           <FormControl fullWidth>
               <IncrementContainer value={props.Core} setValue={props.setCore} title="Choose number of Cores" min={1}/> 
            </FormControl>
        </Box>
          </Grid> */}
        </Grid>
        {/* <div style={{display:"flex",flexDirection:"row",justifyContent:"flex-end",width:"100%",marginBottom:20,paddingRight:10}}>
            <div className="costStyle">  Total Cost : $1000 </div>
           
          </div> */}
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", width: "100%", marginBottom: 20 }}>
          <div className="costStyle">  Total Cost : $1000 </div>
          <Button variant="outlined" color="warning" style={{ width: 200 }}>Add Configurations</Button>
        </div>
      </Grid>
    </>
  )
}

export default RequestItemDetails
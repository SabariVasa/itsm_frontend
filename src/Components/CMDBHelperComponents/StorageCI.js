import React from 'react'
import ContentDevider from '../HelperComponents/ContentDevider';
import CmdbSelectField from '../HelperComponents/SelectField';
import { Grid, Box, FormControl } from '@mui/material';
import { partitionStyle, storageFileSystem, storageInterface } from '../../Utils/CMDB-Data/CIData';
import IncrementContainer from '../HelperComponents/IncrementContainer';

export default function StorageCI(props) {
  // const[Interface,setInterface]=useState();
  // const[FileSystem,setFileSystem]=useState();
  // const[partition,setPartition]=useState();
  return (
    <>
      <ContentDevider title="Configuration Parameters" />
      <Grid container rowSpacing={1} sx={{ width: "80%", display: "flex", alignItems: "center" }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <CmdbSelectField label="Select Interface" MenuItems={storageInterface} setSelectValue={props.setStorageInterface} SelectedValue={props.storageInterface} />
        </Grid>
        <Grid item xs={6}>
          <CmdbSelectField label="Select File System" MenuItems={storageFileSystem} setSelectValue={props.setFileSystem} SelectedValue={props.fileSystem} />
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ minWidth: 80, maxWidth: '80%', marginLeft: 10, marginTop: 2 }}>
            <FormControl fullWidth>
              <IncrementContainer title="Select storage capacity in GB" value={props.storageCapacity} setValue={props.setStorageCapacity} min={128} step={128} />
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <CmdbSelectField label="Select Partition Style" MenuItems={partitionStyle} setSelectValue={props.setPartitionStyle} SelectedValue={props.partitionStyle} />
        </Grid>
      </Grid>
    </>
  )
}

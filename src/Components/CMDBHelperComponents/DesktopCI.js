import React, {  } from 'react'
import ContentDevider from '../HelperComponents/ContentDevider';
import CmdbSelectField from '../HelperComponents/SelectField';
import { Grid, Box, FormControl } from '@mui/material';
import { OperatingSystem } from '../../Utils/CMDB-Data/CIData';
import IncrementContainer from '../HelperComponents/IncrementContainer';
import { OrgOptions, storageType } from '../../Utils/CMDB-Data/CIData';
import CmdbGridContainer from '../HelperComponents/GridContainer';
// import CmdbTextField from '../HelperComponents/TextField';
import { CPUList, basicDesktopApps } from '../../Utils/CMDB-Data/DesktopData';
import MultiComponent from '../HelperComponents/MultiComponent';

export default function DesktopCI(props) {
  // const [Interface, setInterface] = useState();
  // const [FileSystem, setFileSystem] = useState();
  // const [partition, setPartition] = useState();
  // const[Processor,setProcessor]=useState();

  return (
    <>
      <ContentDevider title={`Hardware Parameters`} />
      <CmdbGridContainer MenuItems={[OrgOptions, storageType]} show={[true, true, false, false]} name={props.HardwareField1} dropdown={[false, true]} SelectedValue2={props.Type} setSelectValue2={props.setType} setName1={props.setipaddress} Name1={props.ipaddress} />
      <Grid container rowSpacing={1} sx={{ width: "80%", display: "flex", alignItems: "center" }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Box sx={{ minWidth: 80, maxWidth: '80%', marginLeft: 10, marginTop: 2 }}>
            <FormControl fullWidth>
              <IncrementContainer title="Choose number of cores" setValue={props.setCores} value={props.Core} min={1} />
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ minWidth: 80, maxWidth: '80%', marginLeft: 10, marginTop: 2 }}>
            <FormControl fullWidth>
              <IncrementContainer title="Choose number of RAM in GB" setValue={props.setRAM} value={props.RAM} min={16} step={16} />
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ minWidth: 80, maxWidth: '80%', marginLeft: 10, marginTop: 2 }}>
            <FormControl fullWidth>
              <IncrementContainer title="Select storage capacity in GB" min={128} setValue={props.setStorageCapacity} value={props.storageCapacity} step={128} />
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ minWidth: 80, maxWidth: '100%', marginTop: 1 }}>
            <CmdbSelectField label="Select Processor" MenuItems={CPUList} SelectedValue={props.Processor} setSelectValue={props.setProcessor} />
          </Box>
        </Grid>
      </Grid>
      <ContentDevider title="Software Parameters" />
      <Grid container rowSpacing={1} sx={{ width: "80%", display: "flex", alignItems: "center" }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Box sx={{ minWidth: 80, maxWidth: '100%' }}>
            <CmdbSelectField label="Select Operating System" MenuItems={OperatingSystem} SelectedValue={props.OS} setSelectValue={props.setOS} />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ minWidth: 80, maxWidth: '100%', marginLeft: 10, marginTop: 2 }}>
            <MultiComponent label="Select Installed Application" itemArray={props.installedApplication} setItemArray={props.setInstalledApplication} names={basicDesktopApps} />
          </Box>
        </Grid>
      </Grid>

    </>
  )
}

import React, { useEffect, useState } from 'react';
import ContentDevider from '../HelperComponents/ContentDevider';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import StepperComponent from '../HelperComponents/StepperComponent';
import TechnicalInfo from './TechnicalInfo';
import SoftwareInfo from './SoftwareInfo';
import CMDBService from './update-CMDB-Component/CMDBService';
import GlobalService from '../../services/GlobalService';
import { resturls } from '../../global/utils/apiurls';
import GeneratedForm from '../cmdb/classmanagement/GeneratedForm';
import { sharedStyles } from '../../commonComponents/StyledComponents';



export default function CI() {
  const [callMethod, setCallMethod] = useState(false);
  const [Name, setName] = useState("");
  const [ServiceValue, setServiceValue] = useState(0);
  const [ServiceTypeValue, setServiceTypeValue] = useState(0);
  // const [Description, setDescription] = useState("");
  const [formData, setFormData] = useState([])
  const [buttonDisabled, setbuttonDisabled] = useState(true);
  const [selectedClass, setSelectedClass] = useState('');
  const [categoryTypeList, setCategoryTypeList] = useState([])

  const OrgOptions = [{ value: 'Hardware' }, { value: 'Software' }]

  const handleChange = (event) => {
    setSelectedClass(event.target.value);
    console.log(event.target.value);
  };

  useEffect(() => {
    console.log(Name);
    console.log(ServiceValue);
    if (ServiceValue) {
      setbuttonDisabled(false)
    } else {
      setbuttonDisabled(true);
    }

  }, [Name, ServiceValue]);

  useEffect(() => {
    console.log(selectedClass, 'selectedClass');
    if (ServiceValue) {
      GlobalService.generalSelect(
        (respdata) => {
          const { estatus, emessage, data } = respdata;
          console.log(respdata, 'responseData');
          if (estatus && emessage && data) {
            setCategoryTypeList(data)
          }
        },
        `${resturls.obtainItemRequirementList}?itemRequirement=${ServiceValue}`,
        {},
        'GET'
      );
    }
    if (selectedClass) {
      GlobalService.generalSelect(
        (respdata) => {
          const { estatus, emessage, data } = respdata;
          console.log(respdata, 'responseData');
          if (estatus && emessage && data) {
            setFormData(data.attributes);
          }
        },
        `${resturls.obtainFormFieldData}/${selectedClass}`,
        {},
        'GET'
      );
    }
  }, [ServiceValue, selectedClass])

  return (
    callMethod ? (
      <Box sx={{ minWidth: 80, maxWidth: '80%', marginLeft: 10, marginTop: 2 }}>

        <GeneratedForm formFields={formData}
          setFormFields={setFormData}
          selectCategoryType={'selectCategoryType'}
          logo={'logo'}
          className={'header'}
          createBtn={true}
          selectedClass={selectedClass}
          setCallMethod={setCallMethod}
        />
      </Box>

    ) : (
      <div>
        {console.log(ServiceValue, 'ServiceValue')},
        {/* {ServiceValue === "Hardware" ? <StepperComponent steps={["General Information", "Technical Information", "Create Item"]} /> : null}
        {ServiceValue === "Software" ? <StepperComponent steps={["General Information", "Technical Information", "Create Item"]} /> : null}
        {ServiceValue === "Services" ? <StepperComponent steps={["General Information", "Service General Info", "Service Details", "Technical Information"]} /> : null} */}

        <ContentDevider title="General Information" />
        <Grid container rowSpacing={1} sx={{ width: '120%', display: 'flex', alignItems: 'center' }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            <Box sx={{ minWidth: 80, maxWidth: '80%', marginLeft: 10, marginTop: 2 }}>
              <FormControl fullWidth>
                {/* <InputLabel id="class-select-label">CI Type</InputLabel> */}
                <TextField
                  select
                  labelId="class-select-label"
                  id="class-select"
                  value={ServiceValue}
                  label="Select Class"
                  onChange={(e) => setServiceValue(e.target.value)}
                  sx={sharedStyles}
                >
                  <MenuItem value="">
                    <em>Select Service</em>
                  </MenuItem>
                  {OrgOptions.map((item, index) => {
                    return <MenuItem value={item.value} key={index} >{item.value}</MenuItem>
                  })}
                </TextField>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
        {categoryTypeList ?
          <Grid container rowSpacing={1} sx={{ width: "80%", display: "flex", alignItems: "center" }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12}>
              <Box sx={{ minWidth: 80, maxWidth: '80%', marginLeft: 10, marginTop: 2 }}>
                <FormControl fullWidth>
                  {/* <InputLabel id="class-select-label">Select Class</InputLabel> */}
                  <TextField
                    select
                    sx={sharedStyles}
                    labelId="class-select-label"
                    id="class-select"
                    value={selectedClass}
                    label="Select Class"
                    onChange={handleChange}
                  >
                    {categoryTypeList?.map((item) => (
                      <MenuItem key={item.objectId} value={item.objectId}>
                        {item.className}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </Box>
            </Grid>
          </Grid> : null}
        <Stack style={{ display: 'flex', alignItems: "center", justifyContent: "right", paddingRight: 20, paddingTop: 50 }} direction="row">
          <Button onClick={() => setCallMethod(true)} variant="outlined" disabled={buttonDisabled} color="warning" style={{ width: 100 }}>
            Next
          </Button>
        </Stack>
      </div>
    )
  )
}

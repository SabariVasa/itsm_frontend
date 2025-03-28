import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import ContentDevider from "../../HelperComponents/ContentDevider";
import CreateNewClassFormCreation from "./CreateNewClassFormCreation";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from './ClassManagement.module.scss';
import { useHistory } from "react-router-dom";
import { sharedStyles } from "../../../commonComponents/StyledComponents";
import { useTheme } from "../../../global/commonComponents/ThemeContext";

function NewClassCreationPanel(props) {
  const { t, setActiveTab } = props;
   const {theme} = useTheme();
  const history = useHistory();
  const [selectCategoryType, setSelectCategoryType] = useState('');
  const [fileName, setFileName] = useState('');
  const [createMainClassForm, setCreateMainClassForm] = useState(false);
  const [header, setHeader] = useState('');
  const [logo, setLogo] = useState('');
  const categoryTypeList = ['Hardware', 'Software'];

  const handleChangeCategory = (e) => {
    setSelectCategoryType(e.target.value);
    console.log(e.target.value, 'e.target.value');
  };

  const handleHeaderChange = (e) => {
    setHeader(e.target.value);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log(file, 'file');
      setFileName(file.name)
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      {!createMainClassForm && (
        <div style={{ display: 'flex', flexDirection: 'row', gap: '0.5em', marginBottom: '2em', alignItems: 'center',padding:'20px' }}>
          {/* <ArrowBackIcon sx={{ color: `${theme.valueFontColor}` }} onClick={() => history.goBack()} /> */}
          <ContentDevider title="Create Class" />
        </div>
      )}
      {!createMainClassForm ? (
        <>
          <Grid container sx={{ paddingLeft: 4 }}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                {/* <InputLabel id="demo-simple-select-label">{'Select Category Type'}</InputLabel> */}
                <TextField
                  select
                  sx={sharedStyles}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectCategoryType}
                  label='Select Category'
                  onChange={handleChangeCategory}
                >
                  <MenuItem value="">
                    <em>Select Service</em>
                  </MenuItem>
                  {categoryTypeList.map((item, index) => (
                    <MenuItem value={item} key={index}>
                      {item}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </Grid>
            <Grid item xs={5} sx={{ marginLeft: '2em' }}>
              <TextField
                label="Class Name"
                sx={sharedStyles}
                name="header"
                fullWidth
                onChange={handleHeaderChange}
              />
            </Grid>
          </Grid>

          <Grid container mt={2} sx={{ paddingLeft:4 }}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                component="label"
                sx={{ background: `${theme.outerBodyColor}` }}
              >
                {t('class_logo')}
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleLogoUpload}
                />
              </Button>
            </Grid>
          </Grid>

          <Box mt={2} sx={{paddingLeft:4}}>
            <Button
              onClick={() => setCreateMainClassForm(true)}
              variant="outlined"
              disabled={!selectCategoryType || header === ''}
              color="warning"
              style={{ width: 100 }}
            >
              Next
            </Button>
          </Box>
        </>
      ) : (
        <CreateNewClassFormCreation
          selectCategoryType={selectCategoryType}
          header={header}
          logo={logo}
          setCreateMainClassForm={setCreateMainClassForm}
        />
      )}
    </div>
  );
}
export default withTranslation('common')(NewClassCreationPanel);

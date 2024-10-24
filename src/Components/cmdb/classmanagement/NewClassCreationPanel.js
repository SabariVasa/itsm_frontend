import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import ContentDevider from "../../HelperComponents/ContentDevider";
import CreateNewClassFormCreation from "./CreateNewClassFormCreation";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from './ClassManagement.module.scss';
import { useHistory } from "react-router-dom";

function NewClassCreationPanel(props) {
  const { t, setActiveTab } = props;
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
      {!createMainClassForm && <ArrowBackIcon onClick={() => history.goBack()} />}
      {!createMainClassForm ? (
        <>
          <h3>{t('create_class')}</h3>
          <ContentDevider title="Create Class" />
          <Grid container >
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{'Select Category Type'}</InputLabel>
                <Select
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
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={5} sx={{ marginLeft: '1em' }}>
              <TextField
                label="Class Name"
                name="header"
                fullWidth
                onChange={handleHeaderChange}
              // value={header}
              // // helperText={header === '' ? t('header_required') : ''}
              // error={header}
              />
            </Grid>
          </Grid>

          <Grid container mt={2}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                component="label"
              >
                {t('class_logo')}
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleLogoUpload}
                />
              </Button>
              {logo && (
                <div>
                  <div>{fileName}</div>
                  <img src={logo} alt="Uploaded Logo" style={{ maxWidth: '100px', marginTop: '10px' }} />
                </div>
              )}
            </Grid>
          </Grid>

          <Box mt={2}>
            <Button
              onClick={() => setCreateMainClassForm(true)}
              variant="outlined"
              disabled={!selectCategoryType || header === '' || logo === ''}
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

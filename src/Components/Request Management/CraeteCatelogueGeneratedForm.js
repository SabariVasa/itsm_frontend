import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import { Formik, Form, Field } from 'formik';
import { TextField, MenuItem, Button, FormControl, InputLabel, Select, Grid, IconButton, Checkbox, FormControlLabel } from '@mui/material';
import * as Yup from 'yup';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import GeneratedForm from "../cmdb/classmanagement/GeneratedForm";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ContentDevider from "../HelperComponents/ContentDevider";
import { sharedStyles } from "../../commonComponents/StyledComponents";
import { useTheme } from "../../global/commonComponents/ThemeContext";

function CraeteCatelogueGeneratedForm(props) {
  const { formFields, setFormFields, selectCategoryType, setCreateMainClassForm, logo, header } = props;
  // const [formFields, setFormFields] = useState([]);
  const [selectOptions, setSelectOptions] = useState([]);
  const [fileFormats, setFileFormats] = useState([]);
  const [initialValues, setIntialValues] = useState({
    fieldName: '',
    fieldType: '',
    description: '',
    requiredField: false,
  });
  const { theme } = useTheme();

  const validationSchema = Yup.object({
    fieldName: Yup.string().required('Field Name is required'),
    fieldType: Yup.string().required('Field Type is required'),
    // dataType: Yup.string().required('Data Type is required'),
  });

  const dataTypeOptions = ['String', 'Integer', 'Boolean', 'Date', 'Upload'];
  const fieldTypeOptions = ['Text', 'Number', 'Upload', 'Password', 'Email', 'Select', 'Date', 'Boolean'];

  const fileFormatOptions = ['Image', 'Excel', 'PDF', 'All'];
  const addSelectOption = () => {
    setSelectOptions([...selectOptions, '']);
  };

  const removeSelectOption = (index) => {
    setSelectOptions(selectOptions.filter((_, i) => i !== index));
  };

  const handleSelectOptionChange = (index, value) => {
    const newOptions = [...selectOptions];
    newOptions[index] = value;
    setSelectOptions(newOptions);
  };
  // console.log(formFields, 'formFields');
  const handleFileFormatChange = (event) => {
    setFileFormats(event.target.value);
  };

  const handleSubmit = (values) => {
    // console.log(values, fileFormats, 'values');
    const newField = { ...values };

    if(!values.fieldName || !values.fieldType){
      return;
    }

    if (values.fieldType === 'Select') {
      newField.optionList = selectOptions;
    }

    if (values.fieldType === 'Upload') {
      newField.fileFormats = fileFormats;
    }

    setFormFields([...formFields, newField]);
    setSelectOptions([]);
    setFileFormats([]);
  };

  return (
    <div style={{ border: '1px solid gray', padding: '1rem' }}>
      {/* <ArrowBackIcon onClick={() => setCreateMainClassForm(false)} /> */}
      {/* <h3>{}</h3> */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, setFieldValue, isSubmitting }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  // as={TextField}
                  label="Field Name"
                  name="fieldName"
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.fieldName}
                  helperText={touched.fieldName && errors.fieldName}
                  error={touched.fieldName && Boolean(errors.fieldName)}
                  sx={sharedStyles}
                />
              </Grid>

              <Grid item xs={4}>
                <FormControl fullWidth>
                  {/* <InputLabel id="field-type-label">Field Type</InputLabel> */}
                  <TextField
                    labelId="field-type-label"
                    label="Field Type"
                    select
                    name="fieldType"
                    value={values.fieldType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.fieldType && Boolean(errors.fieldType)}
                    sx={sharedStyles}
                    helperText={touched.fieldName && errors.fieldName}
                  >
                    {fieldTypeOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                  {/* {touched.fieldType && errors.fieldType && (
                    <div style={{ color: 'red' }}>{errors.fieldType}</div>
                  )} */}
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  // as={TextField}
                  label="Description"
                  name="description"
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  helperText={touched.description && errors.description}
                  error={touched.description && Boolean(errors.description)}
                  sx={sharedStyles}
                />
              </Grid>

              <Grid item xs={4}>
                <FormControl component="fieldset" fullWidth>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      // border: "2px solid",
                      // borderImageSlice: 1,
                      // borderImageSource: "linear-gradient(45deg, #ff7eb3, #e81885)", // Pink gradient border
                      borderRadius: "1em", // Rounded corners
                      padding: "10px",
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="requiredField"
                          checked={values.requiredField} // Bind to the `requiredField` value
                          onChange={(event) => setFieldValue("requiredField", event.target.checked)} // Update Formik value
                          sx={{
                            color: `${theme.valueFontColor}`,
                            "&.Mui-checked": {
                              color: `${theme.valueFontColor}`, // Active checkbox color
                            },
                          }}
                        />
                      }
                      label="Required Field"
                      sx={{
                        color: `${theme.valueFontColor}`, // Pink text color
                      }}
                    />
                  </div>
                </FormControl>
              </Grid>
            </Grid>

            {values.fieldType === 'Select' && (
              <div>
                <h4>Add Options for Select</h4>
                {selectOptions.map((option, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <TextField
                      label={`Option ${index + 1}`}
                      value={option}
                      onChange={(e) => handleSelectOptionChange(index, e.target.value)}
                      fullWidth
                      sx={sharedStyles}
                    />
                    <IconButton onClick={() => removeSelectOption(index)} color="secondary">
                      <RemoveCircleIcon />
                    </IconButton>
                  </div>
                ))}
                <Button 
                sx={{ 
                  background: `${theme.outerBodyColor}`,
                  color: `${theme.outerBodyfontColor}`,
                  "&:hover": {
                      backgroundColor: `${theme.btnHoverColor}`,
                    },
                }} onClick={addSelectOption} startIcon={<AddCircleIcon />}>
                  Add Option
                </Button>
              </div>
            )}

            {values.fieldType === 'Upload' && (
              <div>
                <h4>Select File Formats</h4>
                <FormControl>
                  <InputLabel id="file-format-label">File Formats</InputLabel>
                  <TextField
                    select
                    labelId="file-format-label"
                    multiple
                    value={fileFormats}
                    onChange={handleFileFormatChange}
                    sx={sharedStyles}
                  >
                    {fileFormatOptions.map((format) => (
                      <MenuItem key={format} value={format}>
                        {format}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </div>
            )}
            {/* {console.log(errors, touched, values, 'errors')} */}
            <div style={{ marginTop: '20px' }}>
              <Button
                // type="submit"
                variant="contained"
                // color="primary"
                sx={{ 
                  background: `${theme.outerBodyColor}`,
                  color: `${theme.outerBodyfontColor}`,
                  "&:hover": {
                      backgroundColor: `${theme.btnHoverColor}`,
                    },
                }}
                onClick={() => handleSubmit(values)}
              // disabled={isSubmitting}
              >
                Add Field
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      {formFields.length > 0 && (
        <>
          <ContentDevider title="Preview Generated Custom Form Fields" />
          <GeneratedForm
            formFields={formFields}
            setFormFields={setFormFields}
            selectCategoryType={selectCategoryType}
            logo={logo}
            className={header}
            generatedForm={false}
          // catelogue={true}
          />
        </>)}

    </div>
  );
}

export default withTranslation('common')(CraeteCatelogueGeneratedForm);


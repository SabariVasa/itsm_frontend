import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import { Formik, Form, Field } from 'formik';
import { TextField, MenuItem, Button, FormControl, InputLabel, Select, Grid, IconButton } from '@mui/material';
import * as Yup from 'yup';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import GeneratedForm from "./GeneratedForm";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ContentDevider from "../../HelperComponents/ContentDevider";

function CreateNewClassFormCreation(props) {
  const { t, selectCategoryType, setCreateMainClassForm, logo, header } = props;
  const [formFields, setFormFields] = useState([]);
  const [selectOptions, setSelectOptions] = useState([]);
  const [fileFormats, setFileFormats] = useState([]);

  const validationSchema = Yup.object({
    fieldName: Yup.string().required('Field Name is required'),
    fieldType: Yup.string().required('Field Type is required'),
    dataType: Yup.string().required('Data Type is required'),
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
  console.log(formFields, 'formFields');
  const handleFileFormatChange = (event) => {
    setFileFormats(event.target.value);
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log(values, fileFormats, 'values');
    const newField = { ...values };

    if (values.fieldType === 'Select') {
      newField.optionList = selectOptions;
    }

    if (values.fieldType === 'Upload') {
      newField.fileFormats = fileFormats;
    }

    setFormFields([...formFields, newField]);
    resetForm();
    setSelectOptions([]);
    setFileFormats([]);
    setSubmitting(false);
    console.log('Form Data to submit:', formFields);
  };

  return (
    <div>
      <ArrowBackIcon onClick={() => setCreateMainClassForm(false)} />
      <h3>{t('item_form_creation')}</h3>
      <Formik
        initialValues={{
          fieldName: '',
          fieldType: '',
          dataType: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Field
                  as={TextField}
                  label="Field Name"
                  name="fieldName"
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.fieldName}
                  helperText={touched.fieldName && errors.fieldName}
                  error={touched.fieldName && Boolean(errors.fieldName)}
                />
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="field-type-label">Field Type</InputLabel>
                  <Select
                    labelId="field-type-label"
                    name="fieldType"
                    value={values.fieldType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.fieldType && Boolean(errors.fieldType)}
                  >
                    {fieldTypeOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.fieldType && errors.fieldType && (
                    <div style={{ color: 'red' }}>{errors.fieldType}</div>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="data-type-label">Data Type</InputLabel>
                  <Select
                    labelId="data-type-label"
                    name="dataType"
                    value={values.dataType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.dataType && Boolean(errors.dataType)}
                  >
                    {dataTypeOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.dataType && errors.dataType && (
                    <div style={{ color: 'red' }}>{errors.dataType}</div>
                  )}
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
                    />
                    <IconButton onClick={() => removeSelectOption(index)} color="secondary">
                      <RemoveCircleIcon />
                    </IconButton>
                  </div>
                ))}
                <Button variant="outlined" onClick={addSelectOption} startIcon={<AddCircleIcon />}>
                  Add Option
                </Button>
              </div>
            )}

            {values.fieldType === 'Upload' && (
              <div>
                <h4>Select File Formats</h4>
                <FormControl>
                  <InputLabel id="file-format-label">File Formats</InputLabel>
                  <Select
                    labelId="file-format-label"
                    multiple
                    value={fileFormats}
                    onChange={handleFileFormatChange}
                  >
                    {fileFormatOptions.map((format) => (
                      <MenuItem key={format} value={format}>
                        {format}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            )}

            <div style={{ marginTop: '20px' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Add Field
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <ContentDevider title="Generated Form" />
      <GeneratedForm
        formFields={formFields}
        setFormFields={setFormFields}
        selectCategoryType={selectCategoryType}
        logo={logo}
        className={header}
        generatedForm={true}
      />
    </div>
  );
}

export default withTranslation('common')(CreateNewClassFormCreation);


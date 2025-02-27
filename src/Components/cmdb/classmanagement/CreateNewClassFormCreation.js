import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import { Formik, Form } from "formik";
import {
  TextField,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Grid,
  IconButton,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import * as Yup from 'yup';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import GeneratedForm from "./GeneratedForm";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ContentDevider from "../../HelperComponents/ContentDevider";
import { sharedStyles } from "../../../commonComponents/StyledComponents";
import { useTheme } from "../../../global/commonComponents/ThemeContext";

function CreateNewClassFormCreation(props) {
  const { t, selectCategoryType, setCreateMainClassForm, logo, header } = props;
  const [formFields, setFormFields] = useState([]);
  const [selectOptions, setSelectOptions] = useState([]);
  const [fileFormats, setFileFormats] = useState([]);

  const {theme} = useTheme();

  const validationSchema = Yup.object({
    fieldName: Yup.string().required('Field Name is required'),
    fieldType: Yup.string().required('Field Type is required'),
  });

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
      <div style={{ marginBottom: "2em" }}>
        <div style={{ display: "flex", marginBottom: "2em", gap: "1em" }}>
          <ArrowBackIcon
            sx={{ color: `${theme.valueFontColor}` }}
            onClick={() => setCreateMainClassForm(false)}
          />
          <ContentDevider title={t("item_form_creation")} />
        </div>
        <Formik
          initialValues={{
            fieldName: "",
            fieldType: "",
            requiredField: false,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isSubmitting,
            setFieldValue,
          }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    sx={sharedStyles}
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
                    {/* <InputLabel id="field-type-label">Field Type</InputLabel> */}
                    <TextField
                      select
                      sx={sharedStyles}
                      labelId="field-type-label"
                      label="Field Type"
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
                    </TextField>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl component="fieldset" fullWidth>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        borderRadius: "1em", // Rounded corners
                        padding: "10px",
                      }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="requiredField"
                            checked={values.requiredField} // Bind to the `requiredField` value
                            onChange={(event) =>
                              setFieldValue(
                                "requiredField",
                                event.target.checked
                              )
                            } // Update Formik value
                            sx={{
                              color: "#ff7eb3",
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

              {values.fieldType === "Select" && (
                <div>
                  <h4>Add Options for Select</h4>
                  {selectOptions.map((option, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <TextField
                        sx={sharedStyles}
                        label={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) =>
                          handleSelectOptionChange(index, e.target.value)
                        }
                        fullWidth
                      />
                      <IconButton
                        onClick={() => removeSelectOption(index)}
                        color="secondary"
                      >
                        <RemoveCircleIcon />
                      </IconButton>
                    </div>
                  ))}
                  <Button
                    variant="outlined"
                    onClick={addSelectOption}
                    startIcon={<AddCircleIcon />}
                  >
                    Add Option
                  </Button>
                </div>
              )}

              {values.fieldType === "Upload" && (
                <div>
                  <h4>Select File Formats</h4>
                  <FormControl>
                    <InputLabel id="file-format-label">File Formats</InputLabel>
                    <TextField
                      select
                      sx={sharedStyles}
                      label="File Format"
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
                    </TextField>
                  </FormControl>
                </div>
              )}

              <div style={{ marginTop: "20px" }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ background: `${theme.outerBodyColor}` }}
                  disabled={isSubmitting}
                >
                  Add Field
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
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


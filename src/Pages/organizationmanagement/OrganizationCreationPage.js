import React from "react";
import { Box, Button, TextField, TextareaAutosize, Grid, FormControlLabel, Checkbox, FormControl, Autocomplete } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import * as Yup from "yup";
import { DatePicker } from '@mui/x-date-pickers';
import GlobalService from "../../services/GlobalService";
import { resturls } from "../../global/utils/apiurls";

export default function OrganizationCreatePage({ orgDetails, handleCloseOrgModal }) {
  const history = useHistory();
  const locationOptions = ['New York', 'Dubai', 'India'];
  // shape[field.fieldName] = Yup.date().required(`${field.fieldName} is required`).nullable();
  const validationSchema = Yup.object({
    orgName: Yup.string()
      .when("orgDetails", {
        is: (orgDetails) => !orgDetails,
        then: (schema) => schema.required("Organization Name is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
    location: Yup.string()
      .when("orgDetails", {
        is: (orgDetails) => !orgDetails,
        then: (schema) => schema.required("Organization Location is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
    createdDate: Yup.date()
      .when("orgDetails", {
        is: (orgDetails) => !orgDetails,
        then: (schema) => schema.required("Created Date is required"),
        otherwise: (schema) => schema.nullable(),
      }),
    description: Yup.string()
      .when("orgDetails", {
        is: (orgDetails) => !orgDetails,
        then: (schema) => schema.required("Organization Description is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
    orgManager: Yup.string()
      .when("orgDetails", {
        is: (orgDetails) => !orgDetails,
        then: (schema) => schema.required("Group Manager is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
  });

  const handleSubmit = (values) => {
    console.log(values, 'OrgDetails');
  }

  return (
    <>
      <Box>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <ArrowBackIcon sx={{ marginRight: 2 }} onClick={() => handleCloseOrgModal()} />
          <h3>{orgDetails ? 'Edit Organization' : 'Add New Organization'}</h3>
        </div>
        <Formik
          initialValues={{
            orgName: orgDetails?.orgName || '',
            location: orgDetails?.location || '',
            createdDate: orgDetails?.createdDate || '',
            activeStatus: orgDetails?.activeStatus ?? true,
            description: orgDetails?.description || '',
            orgManager: orgDetails?.orgManager || '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, handleChange, setFieldValue, values }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Field
                    name="orgName"
                    as={TextField}
                    label="Org Name"
                    fullWidth
                    error={touched.orgName && Boolean(errors.orgName)}
                    helperText={touched.orgName && errors.orgName}
                  />
                </Grid>

                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <DatePicker
                      label={'Create Date'}
                      value={values.createdDate}
                      onChange={(date) => setFieldValue('createdDate', date)}
                      renderInput={(params) => <TextField fullWidth {...params} />}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={6}>
                  <Field
                    name="orgManager"
                    as={TextField}
                    label="Organization Manager"
                    fullWidth
                    error={touched.orgManager && Boolean(errors.orgManager)}
                    helperText={touched.orgManager && errors.orgManager}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Autocomplete
                    options={locationOptions}
                    getOptionLabel={(option) => option}
                    isOptionEqualToValue={(option, value) => option === value || value === ""}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Location"
                        fullWidth
                        error={touched.location && Boolean(errors.location)}
                        helperText={touched.location && errors.location}
                      />
                    )}
                    value={values.location}
                    onChange={(event, value) => setFieldValue('location', value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Field
                        name="activeStatus"
                        type="checkbox"
                        as={Checkbox}
                        checked={values.activeStatus}
                        onChange={handleChange}
                      />
                    }
                    label="Active Status"
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <Field
                    name="description"
                    as={TextareaAutosize}
                    label="Organization Description"
                    fullWidth
                    error={touched.description && Boolean(errors.description)}
                    helperText={touched.description && errors.description}
                  />
                </Grid> */}
                <Grid item xs={12}>
                  <Field
                    name="description"
                    as={TextareaAutosize}
                    minRows={3}
                    placeholder="Description"
                    style={{ width: '100%', padding: '10px' }}
                  />
                  {touched.description && errors.description ? (
                    <div style={{ color: 'red', fontSize: '0.8rem' }}>{errors.description}</div>
                  ) : null}
                </Grid>
              </Grid>
              <Grid container justifyContent="center" sx={{ mt: 3 }}>
                <Button type="submit" variant="contained" color="primary">
                  {orgDetails ? 'Update' : 'Submit'}
                </Button>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  )
}
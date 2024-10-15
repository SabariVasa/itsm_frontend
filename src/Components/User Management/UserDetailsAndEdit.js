import React, { useEffect, useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, MenuItem, Select, FormControl, InputLabel, Grid } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { DatePicker } from '@mui/x-date-pickers';
import ContentDevider from '../HelperComponents/ContentDevider';
import GlobalService from "../../services/GlobalService";
import { resturls } from "../../global/utils/apiurls";

const UserDetailsAndEdit = () => {
  const [initialValues, setInitialValues] = useState({
    userID: '',
    firstName: '',
    lastName: '',
    title: '',
    company: 'Infosys Limited',
    department: '',
    costCenter: '',
    location: '',
    email: '',
    language: 'English',
    calendarIntegration: 'Outlook',
    timeZone: 'Europe/London',
    manager: '',
    dateFormat: null,
    businessPhone: '',
    mobilePhone: '',
    vip: false,
    active: true,
    userPersona: '',
    objectID: '',
    adObjectGUID: '',
  });
  const getIntialValues = () => {
    GlobalService.generalSelect(
      (respdata) => {
        const { estatus, data: responseData } = respdata;
        if (estatus) {
          // Populate the form with the backend data
          setInitialValues({
            userID: responseData.id.timestamp,
            firstName: responseData.firstName || '',
            lastName: responseData.lastName || '',
            title: responseData.userRole || '',
            company: responseData.company || '',
            department: responseData.department || '',
            location: responseData.userLocation || '',
            email: responseData.emailAddress || '',
            language: responseData.language || 'English',
            manager: responseData.manager || '',
            active: responseData.active,
            vip: responseData.userRole === 'super_admin',
            // Add other fields as necessary
          });
        }
      },
      resturls.addUser,
      {},
      'POST'
    );
  }

  // Fetch data from backend
  useEffect(() => {
    getIntialValues()
  }, []);

  const handleSubmit = (values) => {
    console.log(values, 'values');
    // GlobalService.generalSelect(
    //   (respdata) => {
    //     const { estatus, data: responseData } = respdata;
    //     if (estatus) {
    //       console.log('User updated successfully:', responseData);
    //     }
    //   },
    //   resturls.addUser,
    //   values,
    //   'POST'
    // );
  };

  return (
    <div style={{ margin: '2em' }}>
      <ContentDevider title="User Info" />
      <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
        {({ values, handleChange, setFieldValue }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Field
                  as={TextField}
                  fullWidth
                  label="User ID"
                  name="userID"
                  margin="normal"
                  disabled
                />
                <Field
                  as={TextField}
                  fullWidth
                  label="First Name"
                  name="firstName"
                  margin="normal"
                />
                <Field
                  as={TextField}
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  margin="normal"
                />
                <Field
                  as={TextField}
                  fullWidth
                  label="Title"
                  name="title"
                  margin="normal"
                />
                <Field
                  as={TextField}
                  fullWidth
                  label="Company"
                  name="company"
                  disabled
                  margin="normal"
                />
                <Field
                  as={TextField}
                  fullWidth
                  label="Department"
                  name="department"
                  margin="normal"
                />
                <Field
                  as={TextField}
                  fullWidth
                  label="Location"
                  name="location"
                  margin="normal"
                />
                <FormControlLabel
                  control={
                    <Field
                      as={Checkbox}
                      name="active"
                      checked={values.active}
                      onChange={handleChange}
                    />
                  }
                  label="Active"
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  as={TextField}
                  fullWidth
                  label="Email"
                  name="email"
                  margin="normal"
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel>Language</InputLabel>
                  <Field
                    as={Select}
                    name="language"
                    value={values.language}
                    onChange={handleChange}
                  >
                    <MenuItem value="English">English</MenuItem>
                    <MenuItem value="French">French</MenuItem>
                    <MenuItem value="German">German</MenuItem>
                  </Field>
                </FormControl>
                <Field
                  as={TextField}
                  fullWidth
                  label="Manager"
                  name="manager"
                  margin="normal"
                />
                <Field
                  as={TextField}
                  fullWidth
                  label="Mobile Phone"
                  name="mobilePhone"
                  margin="normal"
                />
                <FormControl fullWidth>
                  <DatePicker
                    label="Date Format"
                    value={values.dateFormat}
                    onChange={(value) => setFieldValue('dateFormat', value)}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth margin="normal" />
                    )}
                  />
                </FormControl>

                <FormControlLabel
                  control={
                    <Field
                      as={Checkbox}
                      name="vip"
                      checked={values.vip}
                      onChange={handleChange}
                    />
                  }
                  label="VIP"
                />
              </Grid>

              {/* Submit button */}
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  add
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserDetailsAndEdit;

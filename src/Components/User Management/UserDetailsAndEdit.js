import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  TextField,
  Grid,
  Button,
  Checkbox,
  FormControlLabel,
  Autocomplete,
  IconButton,
  InputAdornment,
  Stack,
  Avatar,
  Typography
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GroupIcon from '@mui/icons-material/Group';
import * as Yup from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { resturls } from "../../global/utils/apiurls";
import GlobalService from "../../services/GlobalService";

const UserDetailsAndEdit = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [excelFile, setExcelFile] = useState(null);

  const { isCreateUserOpen } = props

  const companyOptions = ["Company A", "Company B", "Company C"];
  const locationOptions = ["New York", "London", "Paris"];
  const departmentOptions = ["HR", "Development", "Marketing"];
  const languageOptions = ["English", "Spanish", "French", "German", "Chinese"];
  const roleOptions = ["Super Admin", "Admin", "End User"];

  const validationSchema = Yup.object({
    userId: Yup.string().required("User ID is required"),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    company: Yup.string().required("Company is required"),
    department: Yup.string().required("Department is required"),
    userBranch: Yup.string().required("Location is required"),
    active: Yup.boolean().required("Active status is required"),
    emailAddress: Yup.string().email("Invalid email format").required("Email is required"),
    language: Yup.array().min(1, "At least one language must be selected"),
    manager: Yup.string().required("Manager is required"),
    businessNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Must be a valid 10-digit phone number")
      .required("Business Number is required"),
    mobileNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Must be a valid 10-digit phone number")
      .required("Mobile Number is required"),
    objectId: Yup.string().required("Object ID is required"),
    ProfilePicture: Yup.mixed().required("Photo is required"),
    password: Yup.string()
      .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, "Password must contain letters, numbers, and special characters")
      .required("Password is required"),
      userRole: Yup.string().required("Role is required"),
  });

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleFileChange = async (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      const base64File = await convertToBase64(file);
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
      // setFieldValue("photo", file);
      setFieldValue("ProfilePicture", {
        base64: base64File,
        name: file.name,
        type: file.type,
      });
    }
  };

  const handleExcelUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setExcelFile(file);
      console.log("Excel file uploaded:", file.name);
    }
  };

  const addNewUser = (values) => {
    // addUser
    console.log(values);
    GlobalService.generalSelect(
      (respdata) => {
        const { estatus, emessage, attributes } = respdata;
        console.log(respdata, 'respdatas');

        if (estatus && emessage) {
          // setFormAttributes(attributes.attributes);
        }
      },
      resturls.addUser,
      { ...values },
      'POST'
    );
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <ArrowBackIcon sx={{ marginRight: 2 }} onClick={() => isCreateUserOpen(false)} />
        <GroupIcon />
        <h3>Create User</h3>
      </div>
      <Grid container justifyContent="flex-end" sx={{ mt: 2, mb: 2 }}>
        <Grid item style={{ display: "flex", flexDirection: 'row', gap: '0.5em' }}>           <div>             <input
          accept=".xlsx, .xls"
          style={{ display: "none" }}
          id="excel-upload"
          type="file"
          onChange={handleExcelUpload}
        />
          <label htmlFor="excel-upload">
            <Button variant="contained" color="secondary" component="span">
              Bulk Upload Users
            </Button>
          </label>
          {excelFile && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Uploaded: {excelFile.name}
            </Typography>
          )}
        </div>
          <Typography variant="body2" sx={{ mt: 1 }}>
            <a href="/path/to/sample.xlsx" target="_blank" rel="noopener noreferrer">
              Download Sample Excel
            </a>
          </Typography>
        </Grid>
      </Grid>
      <Formik
        initialValues={{
          userId: '',
          firstName: '',
          lastName: '',
          company: '',
          department: '',
          userBranch: '',
          active: false,
          emailAddress: '',
          language: [],
          manager: '',
          businessNumber: '',
          mobileNumber: '',
          objectId: '',
          ProfilePicture: '',
          password: '',
          userRole: ''
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Form Data", values);
          addNewUser(values);
        }}
      >
        {({ errors, touched, handleChange, values, setFieldValue }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Stack spacing={2}>
                  <Field
                    name="userId"
                    as={TextField}
                    label="User ID"
                    fullWidth
                    onChange={handleChange}
                    value={values.userId}
                    error={touched.userId && Boolean(errors.userId)}
                    helperText={touched.userId && errors.userId}
                  />
                  <Field
                    name="firstName"
                    as={TextField}
                    label="First Name"
                    fullWidth
                    onChange={handleChange}
                    value={values.firstName}
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />
                  <Field
                    name="lastName"
                    as={TextField}
                    label="Last Name"
                    fullWidth
                    onChange={handleChange}
                    value={values.lastName}
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                  <Field
                    name="password"
                    as={TextField}
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    onChange={handleChange}
                    value={values.password}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handlePasswordToggle}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Autocomplete
                    options={companyOptions}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Company"
                        fullWidth
                        error={touched.company && Boolean(errors.company)}
                        helperText={touched.company && errors.company}
                      />
                    )}
                    value={values.company}
                    onChange={(event, value) => setFieldValue('company', value)}
                  />
                  <Autocomplete
                    options={departmentOptions}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Department"
                        fullWidth
                        error={touched.department && Boolean(errors.department)}
                        helperText={touched.department && errors.department}
                      />
                    )}
                    value={values.department}
                    onChange={(event, value) => setFieldValue('department', value)}
                  />
                  <Autocomplete
                    options={locationOptions}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="User Branch"
                        fullWidth
                        error={touched.userBranch && Boolean(errors.userBranch)}
                        helperText={touched.userBranch && errors.userBranch}
                      />
                    )}
                    value={values.userBranch}
                    onChange={(event, value) => setFieldValue('userBranch', value)}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.active}
                        onChange={(event) => setFieldValue('active', event.target.checked)}
                      />
                    }
                    label="Active"
                  />

                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={2}>
                  <Field
                    name="emailAddress"
                    as={TextField}
                    label="Email"
                    fullWidth
                    onChange={handleChange}
                    value={values.emailAddress}
                    error={touched.emailAddress && Boolean(errors.emailAddress)}
                    helperText={touched.emailAddress && errors.emailAddress}
                  />
                  <Autocomplete
                    options={roleOptions}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Role"
                        fullWidth
                        error={touched.userRole && Boolean(errors.userRole)}
                        helperText={touched.userRole && errors.userRole}
                      />
                    )}
                    value={values.userRole}
                    onChange={(event, value) => setFieldValue('userRole', value)}
                  />
                  <Autocomplete
                    multiple
                    options={languageOptions}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Language"
                        fullWidth
                        error={touched.language && Boolean(errors.language)}
                        helperText={touched.language && errors.language}
                      />
                    )}
                    value={values.language}
                    onChange={(event, value) => setFieldValue('language', value)}
                  />

                  <Field
                    name="manager"
                    as={TextField}
                    label="Manager"
                    fullWidth
                    onChange={handleChange}
                    value={values.manager}
                    error={touched.manager && Boolean(errors.manager)}
                    helperText={touched.manager && errors.manager}
                  />
                  <Field
                    name="businessNumber"
                    as={TextField}
                    label="Business Number"
                    fullWidth
                    onChange={handleChange}
                    value={values.businessNumber}
                    error={touched.businessNumber && Boolean(errors.businessNumber)}
                    helperText={touched.businessNumber && errors.businessNumber}
                  />
                  <Field
                    name="mobileNumber"
                    as={TextField}
                    label="Mobile Number"
                    fullWidth
                    onChange={handleChange}
                    value={values.mobileNumber}
                    error={touched.mobileNumber && Boolean(errors.mobileNumber)}
                    helperText={touched.mobileNumber && errors.mobileNumber}
                  />
                  <Field
                    name="objectId"
                    as={TextField}
                    label="Object ID"
                    fullWidth
                    onChange={handleChange}
                    value={values.objectId}
                    error={touched.objectId && Boolean(errors.objectId)}
                    helperText={touched.objectId && errors.objectId}
                  />
                  {/* <Stack direction="row" alignItems="center" spacing={1}>
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="photo-upload"
                      type="file"
                      onChange={(e) => handleFileChange(e, setFieldValue, "photo")}
                    />
                    <label htmlFor="photo-upload">
                      <Button variant="contained" color="primary" component="span">
                        Upload Photo
                      </Button>
                    </label>
                    {photoFile && (
                      <>
                        <Typography>{photoFile.name}</Typography>
                        <Avatar alt="Preview" src={photoPreview} sx={{ width: 56, height: 56 }} />
                      </>
                    )}
                  </Stack> */}
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="photo-upload"
                      type="file"
                      onChange={(e) => handleFileChange(e, setFieldValue, "ProfilePicture")}
                    />
                    <label htmlFor="photo-upload">
                      <Button variant="contained" color="primary" component="span">
                        Upload Photo
                      </Button>
                    </label>
                    {photoFile && (
                      <>
                        <Typography>{photoFile.name}</Typography>
                        <Avatar alt="Preview" src={photoPreview} sx={{ width: 56, height: 56 }} />
                      </>
                    )}
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
            <Grid container justifyContent="center" sx={{ mt: 3 }}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default UserDetailsAndEdit;

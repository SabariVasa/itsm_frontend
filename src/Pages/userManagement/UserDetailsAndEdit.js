import React, { useEffect, useState } from "react";
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
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GroupIcon from "@mui/icons-material/Group";
import * as Yup from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { resturls } from "../../global/utils/apiurls";
import GlobalService from "../../services/GlobalService";
import DefaultLoader from "../../global/commonComponents/DefaultLoader";
import { useHistory } from "react-router-dom";

const UserDetailsAndEdit = (props) => {
  const history = useHistory();
  const { match: { params: { user_id } = {} } = {} } = props;

  const [showPassword, setShowPassword] = useState(false);
  // const [photoFile, setPhotoFile] = useState(null);
  const [defaultLoader, setDefaultLoader] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [excelFile, setExcelFile] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [getUserDetailObject, setGetUserDetailObject] = useState();

  const companyOptions = ["Company A", "Company B", "Company C"];
  const locationOptions = ["New York", "London", "Paris"];
  const languageOptions = ["English", "Spanish", "French", "German", "Chinese"];
  const roleOptions = ["Super Admin", "Admin", "End User"];

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    company: Yup.string().required("Company is required"),
    department: Yup.string().required("Department is required"),
    userBranch: Yup.string().required("Location is required"),
    active: Yup.boolean().required("Active status is required"),
    emailAddress: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    language: Yup.array().min(1, "At least one language must be selected"),
    manager: Yup.string().required("Manager is required"),
    mobileNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Must be a valid 10-digit phone number")
      .required("Mobile Number is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
        "Password must contain letters, numbers, and special characters"
      )
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
      // console.log(base64File, 'base64File');
      // setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
      setFieldValue("ProfilePicture", {
        base64File,
        name: file.name,
        type: file.type,
      });
    }
  };

  const handleExcelUpload = async (event) => {
    const file = event.target.files[0];
    setExcelFile(file);
    if (file) {
      console.log("Selected file:", file.name, "Type:", file.type, file, excelFile);
      xlfileUpload();
    } else {
      console.error("No file selected");
    }
  };

  const xlfileUpload = () => {
    const formData = new FormData();
    formData.append('file', excelFile);
    console.log(formData, 'formData');
    GlobalService.generalSelect(
      (respdata) => {
        const { estatus, emessage } = respdata;
        if (estatus) {
          console.log("Upload Success:", emessage);
          history.goBack();
        } else {
          console.error("Upload Failed:", emessage);
        }
      },
      resturls.uploadUserExcel,
      formData,
      "POST"
    );
  }

  const getAllDepartment = () => {
    GlobalService.generalSelect(
      (respdata) => {
        const { estatus, emessage, data } = respdata;

        if (estatus && emessage) {
          const groupNames = data
            .filter(group => group.groupName)
            .map(group => group.groupName);
          setDepartments(groupNames);
        }
      },
      resturls.getAllGroupDetails,
      {},
      'GET'
    );
  };

  const getSingleUserDetails = () => {
    GlobalService.generalSelect(
      (respdata) => {
        const { estatus, emessage, data } = respdata;
        if (estatus && emessage) {
          setDefaultLoader(false);
          setGetUserDetailObject(data);
        }
      },
      `${resturls.getSingleUserDetails}/${user_id}`,
      {},
      'GET'
    );
  };

  const addNewUser = (values) => {
    console.log(values, 'values');
    const url = user_id ? `${resturls.updateUser}/${user_id}` : resturls.addUser;
    GlobalService.generalSelect(
      (respdata) => {
        const { estatus, emessage } = respdata;
        if (estatus && emessage) {
          history.goBack();
        }
      },
      url,
      { ...values },
      !user_id ? 'POST' : 'PUT'
    );
  };

  const removeUser = () => {
    GlobalService.generalSelect(
      (respdata) => {
        const { estatus, emessage } = respdata;
        if (estatus && emessage) {
          history.goBack();
        }
      },
      `${resturls.removeUser}/${getUserDetailObject?.id}`,
      {},
      'DELETE'
    );
  }

  useEffect(() => {
    getAllDepartment();
    if (user_id) {
      getSingleUserDetails();
      setDefaultLoader(true);
    }
  }, [user_id]);

  return (
    <>
      {defaultLoader ? <DefaultLoader /> : <></>}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <ArrowBackIcon
          sx={{ marginRight: 2 }}
          onClick={() => history.goBack()}
        />
        <GroupIcon />
        <h3>{user_id ? "Edit User" : "Create User"}</h3>
      </div>
      {!getUserDetailObject && (
        <Grid container justifyContent="flex-end" sx={{ mt: 2, mb: 2 }}>
          <Grid
            item
            style={{ display: "flex", flexDirection: "row", gap: "0.5em" }}
          >
            <div>
              <input
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
              <a
                href="/userBulkUploadSampleTemplate.xlsx"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Sample Excel
              </a>
            </Typography>
          </Grid>
        </Grid>
      )}
      <Formik
        initialValues={{
          firstName: getUserDetailObject?.firstName || "",
          lastName: getUserDetailObject?.lastName || "",
          company: getUserDetailObject?.company || "",
          department: getUserDetailObject?.department || "",
          userBranch: getUserDetailObject?.userBranch || "",
          active: getUserDetailObject?.active || false,
          emailAddress: getUserDetailObject?.emailAddress || "",
          language: getUserDetailObject?.language || [],
          manager: getUserDetailObject?.manager || "",
          businessNumber: getUserDetailObject?.businessNumber || "",
          mobileNumber: getUserDetailObject?.mobileNumber || "",
          ProfilePicture: getUserDetailObject?.profilePicture || "",
          password: getUserDetailObject?.password || "",
          userRole: getUserDetailObject?.userRole || "",
        }}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          addNewUser(values);
        }}
      >
        {({ errors, touched, handleChange, values, setFieldValue }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Stack spacing={2}>
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
                  {!user_id && (
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
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                  <Autocomplete
                    options={companyOptions}
                    getOptionLabel={(option) => option}
                    isOptionEqualToValue={(option, value) =>
                      option === value || value === ""
                    }
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
                    onChange={(event, value) => setFieldValue("company", value)}
                  />
                  <Autocomplete
                    options={locationOptions}
                    getOptionLabel={(option) => option}
                    isOptionEqualToValue={(option, value) =>
                      option === value || value === ""
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Location"
                        fullWidth
                        error={touched.userBranch && Boolean(errors.userBranch)}
                        helperText={touched.userBranch && errors.userBranch}
                      />
                    )}
                    value={values.userBranch}
                    onChange={(event, value) =>
                      setFieldValue("userBranch", value)
                    }
                  />
                  <Autocomplete
                    multiple
                    options={languageOptions}
                    getOptionLabel={(option) => option}
                    isOptionEqualToValue={(option, value) =>
                      option === value || value === ""
                    }
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
                    onChange={(event, value) =>
                      setFieldValue("language", value)
                    }
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={2}>
                  <Field
                    name="businessNumber"
                    as={TextField}
                    label="Business Number"
                    fullWidth
                    onChange={handleChange}
                    value={values.businessNumber}
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
                    name="emailAddress"
                    as={TextField}
                    label="Email"
                    fullWidth
                    onChange={handleChange}
                    value={values.emailAddress}
                    error={touched.emailAddress && Boolean(errors.emailAddress)}
                    helperText={touched.emailAddress && errors.emailAddress}
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
                  <Autocomplete
                    options={departments}
                    getOptionLabel={(option) => option}
                    isOptionEqualToValue={(option, value) =>
                      option === value || value === ""
                    }
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
                    onChange={(event, value) =>
                      setFieldValue("department", value)
                    }
                  />
                  <Autocomplete
                    options={roleOptions}
                    getOptionLabel={(option) => option}
                    isOptionEqualToValue={(option, value) =>
                      option === value || value === ""
                    }
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
                    onChange={(event, value) =>
                      setFieldValue("userRole", value)
                    }
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.active}
                        onChange={(event) =>
                          setFieldValue("active", event.target.checked)
                        }
                      />
                    }
                    label="Active"
                  />
                  <label htmlFor="upload-photo">
                    <input
                      id="upload-photo"
                      name="ProfilePicture"
                      style={{ display: "none" }}
                      type="file"
                      accept="image/*"
                      onChange={(event) =>
                        handleFileChange(event, setFieldValue)
                      }
                    />
                    <Button variant="contained" component="span">
                      Upload Photo
                    </Button>
                  </label>
                  {photoPreview && (
                    <Avatar
                      src={photoPreview}
                      alt="User Photo"
                      sx={{ width: 100, height: 100 }}
                    />
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  {user_id ? "Update" : "Submit"}
                </Button>
                {user_id && (
                  <Button
                    variant="contained"
                    component="span"
                    sx={{ marginLeft: 2 }}
                    onClick={removeUser}
                  >
                    Remove
                  </Button>
                )}
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default UserDetailsAndEdit;

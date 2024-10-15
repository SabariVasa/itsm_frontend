import React, { useState, useEffect } from 'react';
import { Select, MenuItem, Grid, Box, TextField, Button, Container, InputLabel } from "@mui/material";
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { serverAPI } from '../../Utils/Server';
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from 'react-router-dom';
import SearchTextField from '../HelperComponents/SearchTextField';
import DraggableModal from '../User Management/DraggableModal';
import { resturls } from '../../global/utils/apiurls';
import GlobalService from '../../services/GlobalService';
import { Description } from '@mui/icons-material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
// import { useSearch } from 'rsuite/esm/internals/Picker';
// import { useSelector } from 'react-redux';



function CreateNewIncident() {

  const [Number, setNumber] = useState();
  const [channel, setChannel] = useState();
  const [State, setState] = useState();
  const [Caller, setCaller] = useState();
  const [Category, setCategory] = useState();
  const [Impact, setImapact] = useState();
  const [subCategory, setSubCategory] = useState();
  const [urgency, setUrgency] = useState();
  const [service, setService] = useState();
  const [Priority, setPriority] = useState();
  const [Assignment, setAssignment] = useState();
  const [ServiceCategory, setServiceCategory] = useState();
  const [CI, setCI] = useState();
  const [AssigmentTo, setAssignmentTo] = useState();
  const [shortDescription, setShortDescription] = useState("");
  const [itemOpen, setItemOpen] = React.useState(false);
  const [warningMessage, setWarningMessage] = useState('');  // Warning message state
  const [openWarning, setOpenWarning] = useState(false);
  const handleClickOpen = () => {
    setItemOpen(true);
  };

  // const endUserIncident = useSelector((state)=>state.incidentReducers.endUserIncident)
  useEffect(() => {
    // setCaller(endUserIncident.Email);
  }, []);

  const handleItemClose = () => {
    setItemOpen(false);
  };

  useEffect(() => {
    setCaller(localStorage.getItem("userEmail"));
  }, []);
  // const handleChange = (event) => {
  //     setState(event.target.value);
  //   };

  const [Message, setMessage] = useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = Message;
  //   const [isVisible, setisVisible] = useState(true);
  const [ErrorMessage, setErrorMessage] = useState();
  const [Success, setSuccess] = useState(false);

  const fetchDocumentCount = async () => {

    // await axios.get(`${serverAPI}/allIncidentsCount`).then((res) => {
    //   let TempNum = parseInt(res.data.responseData) + 1;
    //   setNumber("INC000000" + TempNum)
    // }).catch((err) => {
    //   setMessage({ ...Message, open: true });
    //   setErrorMessage("Sorry something went wrong")
    // })
    GlobalService.generalSelect(
      (response) => {
        const { statusCode, statusMessage } = response;
        console.log(response, 'responseData');
        if (statusCode === 200) {
          let TempNum = parseInt(response.responseData) + 1;
          setNumber(response.responseData)
          console.log(response, 200);
        } else {
          setMessage({ ...Message, open: true });
          setErrorMessage("Sorry something went wrong")
        }
      },
      resturls.allIncidentCount,
      {},
      'GET'
    );
  }

  useEffect(() => {
    fetchDocumentCount();
  }, [])
  const navigate = useNavigate();

  const Submit = (values) => {
    console.log(values, 'GlobalService');
    GlobalService.generalSelect(
      (response) => {
        const { statusCode, statusMessage, } = response;
        console.log(response, 'responseData');
        if (statusCode === 200) {
          // setCategoryTypeList(responseData)
          setSuccess(true);
          setMessage({ ...Message, open: true })
          setErrorMessage(statusMessage);
          // navigate(-1);
        } else {
          setMessage({ ...Message, open: true })
          setErrorMessage("Something went wrong");
        }
      },
      resturls.createNewIncident,
      { ...values, incidentId: Number },
      'POST'
    );
  }

  const handleClose = () => {
    setMessage({ ...Message, open: false })
  }
  const validationSchema = Yup.object({
    channel: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    caller: Yup.string().required('Required'),
    category: Yup.string().required('Required'),
    impact: Yup.string().required('Required'),
    subCategory: Yup.string().required('Required'),
    urgency: Yup.string().required('Required'),
    service: Yup.string().required('Required'),
    priority: Yup.string().required('Required'),
    assignment: Yup.string().required('Required'),
    serviceCategory: Yup.string().required('Required'),
    CI: Yup.string().required('Required'),
    assignmentTo: Yup.string().required('Required'),
    shortDescription: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
  });

  const categories = ['Software', 'Hardware', 'Network'];
  const impacts = ['Low', 'Medium', 'High'];
  const urgencies = ['Low', 'Medium', 'High'];
  const priorities = ['Low', 'Medium', 'High'];

  const handleIncidentIdClick = () => {
    setWarningMessage('Incident ID cannot be modified!');
    setOpenWarning(true);

    // Clear the message after 3 seconds (3000 milliseconds)
    setTimeout(() => {
      setOpenWarning(false);
    }, 3000);
  };

  return (
    <Container style={{
      marginBottom: 60, display: "flex", alignItems: "center", justifyContent: "center", overflowX
        : "hidden"
    }}>
      <DraggableModal open={itemOpen} setOpen={setItemOpen} handleClickOpen={handleClickOpen} handleClose={handleItemClose} />
      <Container component="main" style={{ marginLeft: 80, width: "100%" }} maxWidth="lg">
        <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
          {/* <h2 style={{ fontSize: 30, fontWeight: "bold", marginLeft: -10 }}>Create Incident</h2> */}
          {/* <Button
            // fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => { Submit() }}

          >
            Create New Incident
          </Button> */}
        </div>
        <Formik
          initialValues={{
            channel: '',
            state: '',
            caller: '',
            category: '',
            impact: '',
            subCategory: '',
            urgency: '',
            service: '',
            priority: '',
            assignment: '',
            serviceCategory: '',
            CI: '',
            assignmentTo: '',
            shortDescription: '',
            description: '',
            incidentId: Number,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values, 'statusCode');
            Submit(values);
          }}
        >
          {({ values, handleChange, handleBlur, errors, touched }) => (
            <Form>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2 style={{ fontSize: 30, fontWeight: "bold", marginLeft: -10 }}>Create Incident</h2>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 4, }}
                  color="primary"
                >
                  Create New Incident
                </Button>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    // label="Incident ID"
                    // value={values.incidentId} 
                    // fullWidth
                    // InputProps={{
                    //   readOnly: true, 
                    // }}
                    onClick={handleIncidentIdClick}
                    // label="Incident ID"
                    name="incidentId"
                    value={Number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    error={touched.incidentId && Boolean(errors.incidentId)}
                    helperText={touched.incidentId && errors.incidentId}
                  />
                  <Field
                    type="hidden"
                    name="incidentId"
                    value={Number}
                  />
                </Grid>
                <Grid item xs={4} sm={6}>
                  <TextField
                    label="Channel"
                    name="channel"
                    value={values.channel}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    error={touched.channel && Boolean(errors.channel)}
                    helperText={touched.channel && errors.channel}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="State"
                    name="state"
                    value={values.state}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    error={touched.state && Boolean(errors.state)}
                    helperText={touched.state && errors.state}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Caller"
                    name="caller"
                    value={values.caller}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    error={touched.caller && Boolean(errors.caller)}
                    helperText={touched.caller && errors.caller}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    label="Category"
                    name="category"
                    value={values.category}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    error={touched.category && Boolean(errors.category)}
                    helperText={touched.category && errors.category}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    label="Impact"
                    name="impact"
                    value={values.impact}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    error={touched.impact && Boolean(errors.impact)}
                    helperText={touched.impact && errors.impact}
                  >
                    {impacts.map((impact) => (
                      <MenuItem key={impact} value={impact}>
                        {impact}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="SubCategory"
                    name="subCategory"
                    value={values.subCategory}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    error={touched.subCategory && Boolean(errors.subCategory)}
                    helperText={touched.subCategory && errors.subCategory}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    label="Urgency"
                    name="urgency"
                    value={values.urgency}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    error={touched.urgency && Boolean(errors.urgency)}
                    helperText={touched.urgency && errors.urgency}
                  >
                    {urgencies.map((urgency) => (
                      <MenuItem key={urgency} value={urgency}>
                        {urgency}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Service"
                    name="service"
                    value={values.service}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    error={touched.service && Boolean(errors.service)}
                    helperText={touched.service && errors.service}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    label="Priority"
                    name="priority"
                    value={values.priority}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    error={touched.priority && Boolean(errors.priority)}
                    helperText={touched.priority && errors.priority}
                  >
                    {priorities.map((priority) => (
                      <MenuItem key={priority} value={priority}>
                        {priority}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Assignment"
                    name="assignment"
                    value={values.assignment}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    error={touched.assignment && Boolean(errors.assignment)}
                    helperText={touched.assignment && errors.assignment}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Service Category"
                    name="serviceCategory"
                    value={values.serviceCategory}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    error={touched.serviceCategory && Boolean(errors.serviceCategory)}
                    helperText={touched.serviceCategory && errors.serviceCategory}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="CI"
                    name="CI"
                    value={values.CI}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    error={touched.CI && Boolean(errors.CI)}
                    helperText={touched.CI && errors.CI}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Assignment To"
                    name="assignmentTo"
                    value={values.assignmentTo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    error={touched.assignmentTo && Boolean(errors.assignmentTo)}
                    helperText={touched.assignmentTo && errors.assignmentTo}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Short Description"
                    name="shortDescription"
                    value={values.shortDescription}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    error={touched.shortDescription && Boolean(errors.shortDescription)}
                    helperText={touched.shortDescription && errors.shortDescription}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    multiline
                    rows={4}
                    error={touched.description && Boolean(errors.description)}
                    helperText={touched.description && errors.description}
                  />
                </Grid>
              </Grid>
              <Snackbar
                open={openWarning}
                message={warningMessage}
                autoHideDuration={3000}
                onClose={() => setOpenWarning(false)}
                ContentProps={{
                  sx: {
                    background: '#ff3333'
                  }
                }}
              />
            </Form>
          )}
        </Formik>
      </Container>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={ErrorMessage}
        key={vertical + horizontal}
        ContentProps={{
          sx: {
            background: Success ? "green" : "#ff3333"
          }
        }
        }
      />

    </Container>
  )
}

export default CreateNewIncident;
// // import React, { useState, useEffect } from 'react';
// // import { Select, MenuItem, Grid, Box, TextField, Button, Container, InputLabel } from "@mui/material";
// // // import VisibilityIcon from '@mui/icons-material/Visibility';
// // // import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// // import axios from 'axios';
// // import { serverAPI } from '../../Utils/Server';
// // import Snackbar from '@mui/material/Snackbar';
// // // import { useNavigate } from 'react-router-dom';
// // import SearchTextField from '../HelperComponents/SearchTextField';
// // import DraggableModal from '../User Management/DraggableModal';
// // import { resturls } from '../../global/utils/apiurls';
// // import GlobalService from '../../services/GlobalService';
// // import { Description } from '@mui/icons-material';
// // import { Formik, Form, Field } from 'formik';
// // import * as Yup from 'yup';
// // import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
// // // import { useSearch } from 'rsuite/esm/internals/Picker';
// // // import { useSelector } from 'react-redux';



// // function CreateNewIncident() {

// //   const [Number, setNumber] = useState();
// //   const [channel, setChannel] = useState();
// //   const [State, setState] = useState();
// //   const [Caller, setCaller] = useState();
// //   const [Category, setCategory] = useState();
// //   const [Impact, setImapact] = useState();
// //   const [subCategory, setSubCategory] = useState();
// //   const [urgency, setUrgency] = useState();
// //   const [service, setService] = useState();
// //   const [Priority, setPriority] = useState();
// //   const [Assignment, setAssignment] = useState();
// //   const [ServiceCategory, setServiceCategory] = useState();
// //   const [CI, setCI] = useState();
// //   const [AssigmentTo, setAssignmentTo] = useState();
// //   const [shortDescription, setShortDescription] = useState("");
// //   const [itemOpen, setItemOpen] = React.useState(false);
// //   const [warningMessage, setWarningMessage] = useState('');  // Warning message state
// //   const [openWarning, setOpenWarning] = useState(false);
// //   const handleClickOpen = () => {
// //     setItemOpen(true);
// //   };

// //   // const endUserIncident = useSelector((state)=>state.incidentReducers.endUserIncident)
// //   useEffect(() => {
// //     // setCaller(endUserIncident.Email);
// //   }, []);

// //   const handleItemClose = () => {
// //     setItemOpen(false);
// //   };

// //   useEffect(() => {
// //     setCaller(localStorage.getItem("userEmail"));
// //   }, []);
// //   // const handleChange = (event) => {
// //   //     setState(event.target.value);
// //   //   };

// //   const [Message, setMessage] = useState({
// //     open: false,
// //     vertical: 'bottom',
// //     horizontal: 'center',
// //   });
// //   const { vertical, horizontal, open } = Message;
// //   //   const [isVisible, setisVisible] = useState(true);
// //   const [ErrorMessage, setErrorMessage] = useState();
// //   const [Success, setSuccess] = useState(false);

// //   const fetchDocumentCount = async () => {

// //     // await axios.get(`${serverAPI}/allIncidentsCount`).then((res) => {
// //     //   let TempNum = parseInt(res.data.responseData) + 1;
// //     //   setNumber("INC000000" + TempNum)
// //     // }).catch((err) => {
// //     //   setMessage({ ...Message, open: true });
// //     //   setErrorMessage("Sorry something went wrong")
// //     // })
// //     GlobalService.generalSelect(
// //       (response) => {
// //         const { statusCode, statusMessage } = response;
// //         console.log(response, 'responseData');
// //         if (statusCode === 200) {
// //           let TempNum = parseInt(response.responseData) + 1;
// //           setNumber(response.responseData)
// //           console.log(response, 200);
// //         } else {
// //           setMessage({ ...Message, open: true });
// //           setErrorMessage("Sorry something went wrong")
// //         }
// //       },
// //       resturls.allIncidentCount,
// //       {},
// //       'GET'
// //     );
// //   }

// //   useEffect(() => {
// //     fetchDocumentCount();
// //   }, [])
// //   const navigate = useHistory();

// //   const Submit = (values) => {
// //     console.log(values, 'GlobalService');
// //     GlobalService.generalSelect(
// //       (response) => {
// //         const { statusCode, statusMessage, } = response;
// //         console.log(response, 'responseData');
// //         if (statusCode === 200) {
// //           // setCategoryTypeList(responseData)
// //           setSuccess(true);
// //           setMessage({ ...Message, open: true })
// //           setErrorMessage(statusMessage);
// //           // navigate(-1);
// //         } else {
// //           setMessage({ ...Message, open: true })
// //           setErrorMessage("Something went wrong");
// //         }
// //       },
// //       resturls.createNewIncident,
// //       { ...values, incidentId: Number },
// //       'POST'
// //     );
// //   }

// //   const handleClose = () => {
// //     setMessage({ ...Message, open: false })
// //   }
// //   const validationSchema = Yup.object({
// //     channel: Yup.string().required('Required'),
// //     state: Yup.string().required('Required'),
// //     caller: Yup.string().required('Required'),
// //     category: Yup.string().required('Required'),
// //     impact: Yup.string().required('Required'),
// //     subCategory: Yup.string().required('Required'),
// //     urgency: Yup.string().required('Required'),
// //     service: Yup.string().required('Required'),
// //     priority: Yup.string().required('Required'),
// //     assignment: Yup.string().required('Required'),
// //     serviceCategory: Yup.string().required('Required'),
// //     CI: Yup.string().required('Required'),
// //     assignmentTo: Yup.string().required('Required'),
// //     shortDescription: Yup.string().required('Required'),
// //     description: Yup.string().required('Required'),
// //   });

// //   const categories = ['Software', 'Hardware', 'Network'];
// //   const impacts = ['Low', 'Medium', 'High'];
// //   const urgencies = ['Low', 'Medium', 'High'];
// //   const priorities = ['Low', 'Medium', 'High'];

// //   const handleIncidentIdClick = () => {
// //     setWarningMessage('Incident ID cannot be modified!');
// //     setOpenWarning(true);

// //     // Clear the message after 3 seconds (3000 milliseconds)
// //     setTimeout(() => {
// //       setOpenWarning(false);
// //     }, 3000);
// //   };

// //   return (
// //     <Container style={{
// //       marginBottom: 60, display: "flex", alignItems: "center", justifyContent: "center", overflowX
// //         : "hidden"
// //     }}>
// //       <DraggableModal open={itemOpen} setOpen={setItemOpen} handleClickOpen={handleClickOpen} handleClose={handleItemClose} />
// //       <Container component="main" style={{ marginLeft: 80, width: "100%" }} maxWidth="lg">
// //         <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-around" }}>
// //           {/* <h2 style={{ fontSize: 30, fontWeight: "bold", marginLeft: -10 }}>Create Incident</h2> */}
// //           {/* <Button
// //             // fullWidth
// //             variant="contained"
// //             sx={{ mt: 3, mb: 2 }}
// //             onClick={() => { Submit() }}

// //           >
// //             Create New Incident
// //           </Button> */}
// //         </div>
// //         <Formik
// //           initialValues={{
// //             channel: '',
// //             state: '',
// //             caller: '',
// //             category: '',
// //             impact: '',
// //             subCategory: '',
// //             urgency: '',
// //             service: '',
// //             priority: '',
// //             assignment: '',
// //             serviceCategory: '',
// //             CI: '',
// //             assignmentTo: '',
// //             shortDescription: '',
// //             description: '',
// //             incidentId: Number,
// //           }}
// //           validationSchema={validationSchema}
// //           onSubmit={(values) => {
// //             console.log(values, 'statusCode');
// //             Submit(values);
// //           }}
// //         >
// //           {({ values, handleChange, handleBlur, errors, touched }) => (
// //             <Form>
// //               <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
// //                 <h2 style={{ fontSize: 30, fontWeight: "bold", marginLeft: -10 }}>Create Incident</h2>
// //                 <Button
// //                   type="submit"
// //                   variant="contained"
// //                   sx={{ mt: 3, mb: 4, }}
// //                   color="primary"
// //                 >
// //                   Create New Incident
// //                 </Button>
// //               </Grid>
// //               <Grid container spacing={2}>
// //                 <Grid item xs={12} sm={6}>
// //                   <TextField
// //                     // label="Incident ID"
// //                     // value={values.incidentId} 
// //                     // fullWidth
// //                     // InputProps={{
// //                     //   readOnly: true, 
// //                     // }}
// //                     onClick={handleIncidentIdClick}
// //                     // label="Incident ID"
// //                     name="incidentId"
// //                     value={Number}
// //                     onChange={handleChange}
// //                     onBlur={handleBlur}
// //                     fullWidth
// //                     error={touched.incidentId && Boolean(errors.incidentId)}
// //                     helperText={touched.incidentId && errors.incidentId}
// //                   />
// //                   <Field
// //                     type="hidden"
// //                     name="incidentId"
// //                     value={Number}
// //                   />
// //                 </Grid>
// //                 <Grid item xs={4} sm={6}>
// //                   <TextField
// //                     label="Channel"
// //                     name="channel"
// //                     value={values.channel}
// //                     onChange={handleChange}
// //                     onBlur={handleBlur}
// //                     fullWidth
// //                     error={touched.channel && Boolean(errors.channel)}
// //                     helperText={touched.channel && errors.channel}
// //                   />
// //                 </Grid>

// //                 <Grid item xs={12} sm={6}>
// //                   <TextField
// //                     label="State"
// //                     name="state"
// //                     value={values.state}
// //                     onChange={handleChange}
// //                     onBlur={handleBlur}
// //                     fullWidth
// //                     error={touched.state && Boolean(errors.state)}
// //                     helperText={touched.state && errors.state}
// //                   />
// //                 </Grid>

// //                 <Grid item xs={12} sm={6}>
// //                   <TextField
// //                     label="Caller"
// //                     name="caller"
// //                     value={values.caller}
// //                     onChange={handleChange}
// //                     onBlur={handleBlur}
// //                     fullWidth
// //                     error={touched.caller && Boolean(errors.caller)}
// //                     helperText={touched.caller && errors.caller}
// //                   />
// //                 </Grid>

// //                 <Grid item xs={12} sm={6}>
// //                   <TextField
// //                     select
// //                     label="Category"
// //                     name="category"
// //                     value={values.category}
// //                     onChange={handleChange}
// //                     onBlur={handleBlur}
// //                     fullWidth
// //                     error={touched.category && Boolean(errors.category)}
// //                     helperText={touched.category && errors.category}
// //                   >
// //                     {categories.map((category) => (
// //                       <MenuItem key={category} value={category}>
// //                         {category}
// //                       </MenuItem>
// //                     ))}
// //                   </TextField>
// //                 </Grid>

// //                 <Grid item xs={12} sm={6}>
// //                   <TextField
// //                     select
// //                     label="Impact"
// //                     name="impact"
// //                     value={values.impact}
// //                     onChange={handleChange}
// //                     onBlur={handleBlur}
// //                     fullWidth
// //                     error={touched.impact && Boolean(errors.impact)}
// //                     helperText={touched.impact && errors.impact}
// //                   >
// //                     {impacts.map((impact) => (
// //                       <MenuItem key={impact} value={impact}>
// //                         {impact}
// //                       </MenuItem>
// //                     ))}
// //                   </TextField>
// //                 </Grid>

// //                 <Grid item xs={12} sm={6}>
// //                   <TextField
// //                     label="SubCategory"
// //                     name="subCategory"
// //                     value={values.subCategory}
// //                     onChange={handleChange}
// //                     onBlur={handleBlur}
// //                     fullWidth
// //                     error={touched.subCategory && Boolean(errors.subCategory)}
// //                     helperText={touched.subCategory && errors.subCategory}
// //                   />
// //                 </Grid>

// //                 <Grid item xs={12} sm={6}>
// //                   <TextField
// //                     select
// //                     label="Urgency"
// //                     name="urgency"
// //                     value={values.urgency}
// //                     onChange={handleChange}
// //                     onBlur={handleBlur}
// //                     fullWidth
// //                     error={touched.urgency && Boolean(errors.urgency)}
// //                     helperText={touched.urgency && errors.urgency}
// //                   >
// //                     {urgencies.map((urgency) => (
// //                       <MenuItem key={urgency} value={urgency}>
// //                         {urgency}
// //                       </MenuItem>
// //                     ))}
// //                   </TextField>
// //                 </Grid>

// //                 <Grid item xs={12} sm={6}>
// //                   <TextField
// //                     label="Service"
// //                     name="service"
// //                     value={values.service}
// //                     onChange={handleChange}
// //                     onBlur={handleBlur}
// //                     fullWidth
// //                     error={touched.service && Boolean(errors.service)}
// //                     helperText={touched.service && errors.service}
// //                   />
// //                 </Grid>

// //                 <Grid item xs={12} sm={6}>
// //                   <TextField
// //                     select
// //                     label="Priority"
// //                     name="priority"
// //                     value={values.priority}
// //                     onChange={handleChange}
// //                     onBlur={handleBlur}
// //                     fullWidth
// //                     error={touched.priority && Boolean(errors.priority)}
// //                     helperText={touched.priority && errors.priority}
// //                   >
// //                     {priorities.map((priority) => (
// //                       <MenuItem key={priority} value={priority}>
// //                         {priority}
// //                       </MenuItem>
// //                     ))}
// //                   </TextField>
// //                 </Grid>

// //                 <Grid item xs={12} sm={6}>
// //                   <TextField
// //                     label="Assignment"
// //                     name="assignment"
// //                     value={values.assignment}
// //                     onChange={handleChange}
// //                     onBlur={handleBlur}
// //                     fullWidth
// //                     error={touched.assignment && Boolean(errors.assignment)}
// //                     helperText={touched.assignment && errors.assignment}
// //                   />
// //                 </Grid>

// //                 <Grid item xs={12} sm={6}>
// //                   <TextField
// //                     label="Service Category"
// //                     name="serviceCategory"
// //                     value={values.serviceCategory}
// //                     onChange={handleChange}
// //                     onBlur={handleBlur}
// //                     fullWidth
// //                     error={touched.serviceCategory && Boolean(errors.serviceCategory)}
// //                     helperText={touched.serviceCategory && errors.serviceCategory}
// //                   />
// //                 </Grid>

// //                 <Grid item xs={12} sm={6}>
// //                   <TextField
// //                     label="CI"
// //                     name="CI"
// //                     value={values.CI}
// //                     onChange={handleChange}
// //                     onBlur={handleBlur}
// //                     fullWidth
// //                     error={touched.CI && Boolean(errors.CI)}
// //                     helperText={touched.CI && errors.CI}
// //                   />
// //                 </Grid>

// //                 <Grid item xs={12} sm={6}>
// //                   <TextField
// //                     label="Assignment To"
// //                     name="assignmentTo"
// //                     value={values.assignmentTo}
// //                     onChange={handleChange}
// //                     onBlur={handleBlur}
// //                     fullWidth
// //                     error={touched.assignmentTo && Boolean(errors.assignmentTo)}
// //                     helperText={touched.assignmentTo && errors.assignmentTo}
// //                   />
// //                 </Grid>

// //                 <Grid item xs={12}>
// //                   <TextField
// //                     label="Short Description"
// //                     name="shortDescription"
// //                     value={values.shortDescription}
// //                     onChange={handleChange}
// //                     onBlur={handleBlur}
// //                     fullWidth
// //                     error={touched.shortDescription && Boolean(errors.shortDescription)}
// //                     helperText={touched.shortDescription && errors.shortDescription}
// //                   />
// //                 </Grid>

// //                 <Grid item xs={12}>
// //                   <TextField
// //                     label="Description"
// //                     name="description"
// //                     value={values.description}
// //                     onChange={handleChange}
// //                     onBlur={handleBlur}
// //                     fullWidth
// //                     multiline
// //                     rows={4}
// //                     error={touched.description && Boolean(errors.description)}
// //                     helperText={touched.description && errors.description}
// //                   />
// //                 </Grid>
// //               </Grid>
// //               <Snackbar
// //                 open={openWarning}
// //                 message={warningMessage}
// //                 autoHideDuration={3000}
// //                 onClose={() => setOpenWarning(false)}
// //                 ContentProps={{
// //                   sx: {
// //                     background: '#ff3333'
// //                   }
// //                 }}
// //               />
// //             </Form>
// //           )}
// //         </Formik>
// //       </Container>
// //       <Snackbar
// //         anchorOrigin={{ vertical, horizontal }}
// //         open={open}
// //         onClose={handleClose}
// //         message={ErrorMessage}
// //         key={vertical + horizontal}
// //         ContentProps={{
// //           sx: {
// //             background: Success ? "green" : "#ff3333"
// //           }
// //         }
// //         }
// //       />

// //     </Container>
// //   )
// // }

// // export default CreateNewIncident;
// import React from 'react';
// import { Container, TextField, Button, MenuItem } from '@mui/material';
// import { Formik, Form } from 'formik';
// import * as Yup from 'yup';
// import styles from './CreateIncident.module.scss';

// const validationSchema = Yup.object({
//   channel: Yup.string().required('Channel is required'),
//   state: Yup.string().required('State is required'),
//   caller: Yup.string().required('Caller is required'),
//   category: Yup.string().required('Category is required'),
//   subCategory: Yup.string().required('Sub-category is required'),
//   urgency: Yup.string().required('Urgency is required'),
//   priority: Yup.string().required('Priority is required'),
//   assignment: Yup.string().required('Assignment is required'),
//   shortDescription: Yup.string().required('Short description is required'),
//   description: Yup.string().required('Description is required'),
// });

// const CreateIncident = () => {
//   const initialValues = {
//     channel: '',
//     state: '',
//     caller: '',
//     category: '',
//     subCategory: '',
//     urgency: '',
//     priority: '',
//     assignment: '',
//     shortDescription: '',
//     description: '',
//   };

//   const handleSubmit = (values) => {
//     console.log('Form Data', values);
//   };

//   return (
//     <Container className={styles.container}>
//       <div className={styles.header}>
//         <h2>Create Incident</h2>
//         <Button type="submit" variant="contained" className={styles['submit-btn']}>
//           Create New Incident
//         </Button>
//               </div>
//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ values, handleChange, handleBlur, errors, touched }) => (
//           <Form>
//             <div className={styles['form-grid']}>
//               <TextField
//                 name="channel"
//                 value={values.channel}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 label="Channel"
//                 error={touched.channel && Boolean(errors.channel)}
//                 helperText={touched.channel && errors.channel}
//               />
//               <TextField
//                 name="state"
//                 value={values.state}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 label="State"
//                 error={touched.state && Boolean(errors.state)}
//                 helperText={touched.state && errors.state}
//               />
//               <TextField
//                 name="caller"
//                 value={values.caller}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 label="Caller"
//                 error={touched.caller && Boolean(errors.caller)}
//                 helperText={touched.caller && errors.caller}
//               />
//               <TextField
//                 name="category"
//                 value={values.category}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 label="Category"
//                 error={touched.category && Boolean(errors.category)}
//                 helperText={touched.category && errors.category}
//               />
//               <TextField
//                 name="subCategory"
//                 value={values.subCategory}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 label="Sub-category"
//                 error={touched.subCategory && Boolean(errors.subCategory)}
//                 helperText={touched.subCategory && errors.subCategory}
//               />
//               <TextField
//                 name="urgency"
//                 value={values.urgency}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 label="Urgency"
//                 error={touched.urgency && Boolean(errors.urgency)}
//                 helperText={touched.urgency && errors.urgency}
//               />
//               <TextField
//                 name="priority"
//                 value={values.priority}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 label="Priority"
//                 error={touched.priority && Boolean(errors.priority)}
//                 helperText={touched.priority && errors.priority}
//               />
//               <TextField
//                 name="assignment"
//                 value={values.assignment}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 label="Assignment"
//                 error={touched.assignment && Boolean(errors.assignment)}
//                 helperText={touched.assignment && errors.assignment}
//               />
//               <TextField
//                 name="shortDescription"
//                 value={values.shortDescription}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 label="Short Description"
//                 error={touched.shortDescription && Boolean(errors.shortDescription)}
//                 helperText={touched.shortDescription && errors.shortDescription}
//                 className={styles['long-field']}
//               />
//               <TextField
//                 name="description"
//                 value={values.description}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 label="Description"
//                 error={touched.description && Boolean(errors.description)}
//                 helperText={touched.description && errors.description}
//                 multiline
//                 rows={4}
//                 className={styles['long-field']}
//               />
//             </div>
//             <Button type="submit" variant="contained" className={styles['submit-btn']}>
//               Submit
//             </Button>
//           </Form>
//         )}
//       </Formik>
//     </Container>
//   );
// };

// export default CreateIncident;

// import React from 'react';
// import { Container, TextField, Button, MenuItem } from '@mui/material';
// import { Formik, Form } from 'formik';
// import * as Yup from 'yup';
// import styles from './CreateIncident.module.scss';
// import CustomTextField from '../HelperComponents/TextField';

// const validationSchema = Yup.object({
//   channel: Yup.string().required('Channel is required'),
//   state: Yup.string().required('State is required'),
//   caller: Yup.string().required('Caller is required'),
//   category: Yup.string().required('Category is required'),
//   subCategory: Yup.string().required('Sub-category is required'),
//   urgency: Yup.string().required('Urgency is required'),
//   priority: Yup.string().required('Priority is required'),
//   assignment: Yup.string().required('Assignment is required'),
//   shortDescription: Yup.string().required('Short description is required'),
//   description: Yup.string().required('Description is required'),
// });

// const CreateIncident = () => {
//   const initialValues = {
//     channel: '',
//     state: '',
//     caller: '',
//     category: '',
//     subCategory: '',
//     urgency: '',
//     priority: '',
//     assignment: '',
//     shortDescription: '',
//     description: '',
//   };

//   const handleSubmit = (values) => {
//     console.log('Form Data', values);
//   };

//   return (
//     <Container className={styles.container}>
//       <div className={styles.header}>
//         <h2>Create Incident</h2>
//         <Button type="submit" variant="contained" className={styles['submit-btn']}>
//           Create New Incident
//         </Button>
//               </div>
//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ values, handleChange, handleBlur, errors, touched }) => (
//           <Form>
//             <div className={styles['form-grid']}>
//               <CustomTextField
//                 name="channel"
//                 value={values.channel}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 label="Channel"
//                 error={touched.channel && Boolean(errors.channel)}
//                 helperText={touched.channel && errors.channel}
//               />
//               <CustomTextField
//                 name="state"
//                 value={values.state}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 label="State"
//                 error={touched.state && Boolean(errors.state)}
//                 helperText={touched.state && errors.state}
//               />
//               <CustomTextField
//                 name="caller"
//                 value={values.caller}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 label="Caller"
//                 error={touched.caller && Boolean(errors.caller)}
//                 helperText={touched.caller && errors.caller}
//               />
//               <CustomTextField
//                 name="category"
//                 value={values.category}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 label="Category"
//                 error={touched.category && Boolean(errors.category)}
//                 helperText={touched.category && errors.category}
//               />
//               <CustomTextField
//                 name="subCategory"
//                 value={values.subCategory}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 label="Sub-category"
//                 error={touched.subCategory && Boolean(errors.subCategory)}
//                 helperText={touched.subCategory && errors.subCategory}
//               />
//               <CustomTextField
//                 name="urgency"
//                 value={values.urgency}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 label="Urgency"
//                 error={touched.urgency && Boolean(errors.urgency)}
//                 helperText={touched.urgency && errors.urgency}
//               />
//               <CustomTextField
//                 name="priority"
//                 value={values.priority}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 label="Priority"
//                 error={touched.priority && Boolean(errors.priority)}
//                 helperText={touched.priority && errors.priority}
//               />
//               <CustomTextField
//                 name="assignment"
//                 value={values.assignment}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 label="Assignment"
//                 error={touched.assignment && Boolean(errors.assignment)}
//                 helperText={touched.assignment && errors.assignment}
//               />
//               <CustomTextField
//                 name="shortDescription"
//                 value={values.shortDescription}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 label="Short Description"
//                 error={touched.shortDescription && Boolean(errors.shortDescription)}
//                 helperText={touched.shortDescription && errors.shortDescription}
//                 className={styles['long-field']}
//               />
//               <CustomTextField
//                 name="description"
//                 value={values.description}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 label="Description"
//                 error={touched.description && Boolean(errors.description)}
//                 helperText={touched.description && errors.description}
//                 multiline
//                 rows={4}
//                 className={styles['long-field']}
//               />
//             </div>
//             <Button type="submit" variant="contained" className={styles['submit-btn']}>
//               Submit
//             </Button>
//           </Form>
//         )}
//       </Formik>
//     </Container>
//   );
// };

// export default CreateIncident;

// import React from "react";
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// import {
//   TextField,
//   Select,
//   MenuItem,
//   Button,
//   FormControl,
//   InputLabel,
//   Box,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";

// const StyledFormContainer = styled(Box)({
//   display: "grid",
//   gridTemplateColumns: "1fr 1fr",
//   gap: "24px",
//   maxWidth: "800px",
//   margin: "auto",
//   padding: "20px",
// });

// const CustomTextField = styled(TextField)({
//   "& .MuiInputBase-root": {
//     borderBottom: "2px solid linear-gradient(90deg, #F51275 0%, #622098 100%)", // Bottom border color
//     fontSize: "14px", // Font size
//   },
//   "& .MuiInputBase-root:focus": {
//     borderBottom: "2px solid #aa00ff", // Focused color
//   },
//   "& .MuiOutlinedInput-notchedOutline": {
//     border: "none", // Remove outer border
//   },
//   "& .MuiInputLabel-root": {
//     color: "#d500f9", // Label color
//     fontWeight: "bold",
//   },
// });

// const CustomSelect = styled(Select)({
//   "& .MuiOutlinedInput-root": {
//     borderBottom: "2px solid #d500f9", // Bottom border
//     border: "none",
//   },
//   "&:focus": {
//     borderBottom: "2px solid #aa00ff",
//   },
// });

// const StyledButton = styled(Button)({
//   backgroundColor: "#aa00ff",
//   color: "#fff",
//   fontWeight: "bold",
//   textTransform: "none",
//   marginTop: "20px",
//   ":hover": {
//     backgroundColor: "#d500f9",
//   },
// });

// const validationSchema = Yup.object({
//   state: Yup.string().required("Required"),
//   category: Yup.string().required("Required"),
//   subCategory: Yup.string().required("Required"),
//   priority: Yup.string().required("Required"),
// });

// const CreateIncidentForm = () => {
//   return (
//     <Formik
//       initialValues={{
//         state: "",
//         category: "",
//         subCategory: "",
//         service: "",
//         priority: "",
//         caller: "",
//         impact: "",
//         urgent: "",
//       }}
//       validationSchema={validationSchema}
//       onSubmit={(values) => {
//         console.log("Form Submitted", values);
//       }}
//     >
//       {({ errors, touched }) => (
//         <Form>
//           <StyledFormContainer>
//             <Field
//               name="state"
//               as={CustomTextField}
//               label="State"
//               error={touched.state && !!errors.state}
//               helperText={touched.state && errors.state}
//             />
//             <Field
//               name="caller"
//               as={CustomTextField}
//               label="Caller"
//               error={touched.caller && !!errors.caller}
//               helperText={touched.caller && errors.caller}
//             />
//             <Field
//               name="category"
//               as={CustomTextField}
//               label="Category"
//               error={touched.category && !!errors.category}
//               helperText={touched.category && errors.category}
//             />
//             <Field
//               name="subCategory"
//               as={CustomTextField}
//               label="Sub-Category"
//               error={touched.subCategory && !!errors.subCategory}
//               helperText={touched.subCategory && errors.subCategory}
//             />
//             <FormControl>
//               <InputLabel id="priority-label">Priority</InputLabel>
//               <Field
//                 as={CustomSelect}
//                 name="priority"
//                 labelId="priority-label"
//               >
//                 <MenuItem value="High">High</MenuItem>
//                 <MenuItem value="Medium">Medium</MenuItem>
//                 <MenuItem value="Low">Low</MenuItem>
//               </Field>
//             </FormControl>
//             <Field
//               name="service"
//               as={CustomTextField}
//               label="Service"
//               error={touched.service && !!errors.service}
//               helperText={touched.service && errors.service}
//             />
//           </StyledFormContainer>
//           <Box textAlign="center">
//             <StyledButton type="submit">Create New Incident</StyledButton>
//           </Box>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default CreateIncidentForm;
// import React from "react";
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// import {
//   TextField,
//   Select,
//   MenuItem,
//   Button,
//   FormControl,
//   InputLabel,
//   Box,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";

// const StyledFormContainer = styled(Box)({
//   display: "grid",
//   gridTemplateColumns: "1fr 1fr",
//   gap: "24px",
//   maxWidth: "800px",
//   margin: "auto",
//   padding: "20px",
// });

// const CustomTextField = styled(TextField)({
//   position: "relative",
//   "& .MuiInputBase-root": {
//     fontSize: "14px", // Font size
//     position: "relative",
//     background: "transparent",
//     "&:before": {
//       content: '""',
//       position: "absolute",
//       bottom: 0,
//       left: 0,
//       width: "100%",
//       height: "2px",
//       background: "linear-gradient(90deg, #F51275 0%, #622098 100%)", // Gradient color
//       zIndex: 1,
//     },
//     "&:after": {
//       content: '""',
//       position: "absolute",
//       bottom: 0,
//       left: 0,
//       width: "0%",
//       height: "2px",
//       background: "linear-gradient(90deg, #F51275 0%, #622098 100%)", // Gradient color on focus
//       zIndex: 2,
//       transition: "width 0.3s ease-in-out",
//     },
//     "&:hover:after, &:focus-within:after": {
//       width: "100%", // Expand gradient on hover/focus
//     },
//   },
//   "& .MuiOutlinedInput-notchedOutline": {
//     border: "none", // Remove default Material-UI border
//   },
//   "& .MuiInputLabel-root": {
//     color: "#d500f9", // Label color
//     fontWeight: "bold",
//   },
// });

// const CustomSelect = styled(Select)({
//   position: "relative",
//   "& .MuiOutlinedInput-root": {
//     "&:before": {
//       content: '""',
//       position: "absolute",
//       bottom: 0,
//       left: 0,
//       width: "100%",
//       height: "2px",
//       background: "linear-gradient(90deg, #F51275 0%, #622098 100%)", // Gradient color
//       zIndex: 1,
//     },
//     "&:after": {
//       content: '""',
//       position: "absolute",
//       bottom: 0,
//       left: 0,
//       width: "0%",
//       height: "2px",
//       background: "linear-gradient(90deg, #F51275 0%, #622098 100%)", // Gradient color on focus
//       zIndex: 2,
//       transition: "width 0.3s ease-in-out",
//     },
//     "&:hover:after, &:focus-within:after": {
//       width: "100%", // Expand gradient on hover/focus
//     },
//   },
// });

// const StyledButton = styled(Button)({
//   backgroundColor: "#aa00ff",
//   color: "#fff",
//   fontWeight: "bold",
//   textTransform: "none",
//   marginTop: "20px",
//   ":hover": {
//     backgroundColor: "#d500f9",
//   },
// });

// const validationSchema = Yup.object({
//   state: Yup.string().required("Required"),
//   category: Yup.string().required("Required"),
//   subCategory: Yup.string().required("Required"),
//   priority: Yup.string().required("Required"),
// });

// const CreateIncidentForm = () => {
//   return (
//     <Formik
//       initialValues={{
//         state: "",
//         category: "",
//         subCategory: "",
//         service: "",
//         priority: "",
//         caller: "",
//         impact: "",
//         urgent: "",
//       }}
//       validationSchema={validationSchema}
//       onSubmit={(values) => {
//         console.log("Form Submitted", values);
//       }}
//     >
//       {({ errors, touched }) => (
//         <Form>
//           <StyledFormContainer>
//             <Field
//               name="state"
//               as={CustomTextField}
//               label="State"
//               error={touched.state && !!errors.state}
//               helperText={touched.state && errors.state}
//             />
//             <Field
//               name="caller"
//               as={CustomTextField}
//               label="Caller"
//               error={touched.caller && !!errors.caller}
//               helperText={touched.caller && errors.caller}
//             />
//             <Field
//               name="category"
//               as={CustomTextField}
//               label="Category"
//               error={touched.category && !!errors.category}
//               helperText={touched.category && errors.category}
//             />
//             <Field
//               name="subCategory"
//               as={CustomTextField}
//               label="Sub-Category"
//               error={touched.subCategory && !!errors.subCategory}
//               helperText={touched.subCategory && errors.subCategory}
//             />
//             <FormControl>
//               <InputLabel id="priority-label">Priority</InputLabel>
//               <Field
//                 as={CustomSelect}
//                 name="priority"
//                 labelId="priority-label"
//               >
//                 <MenuItem value="High">High</MenuItem>
//                 <MenuItem value="Medium">Medium</MenuItem>
//                 <MenuItem value="Low">Low</MenuItem>
//               </Field>
//             </FormControl>
//             <Field
//               name="service"
//               as={CustomTextField}
//               label="Service"
//               error={touched.service && !!errors.service}
//               helperText={touched.service && errors.service}
//             />
//           </StyledFormContainer>
//           <Box textAlign="center">
//             <StyledButton type="submit">Create New Incident</StyledButton>
//           </Box>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default CreateIncidentForm;
import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import styles from './CreateIncident.module.scss';
import { resturls } from "../../global/utils/apiurls";
import GlobalService from "../../services/GlobalService";
import axios from "axios";
import { CustomSelect, CustomTextField, GradientHeader, HeaderContainer, StyledButton, StyledFormContainer, StyledIcon, StyledPatternL, StyledPatternR } from "../../commonComponents/StyledComponents";

const CreateIncidentForm = () => {
  const [categoryType, setCategoryType] = useState();
  const [serviceValue, setServiceValue] = useState("");
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    state: Yup.string().required("Required"),
    category: Yup.string().required("Required"),
    subCategory: Yup.string().required("Required"),
    priority: Yup.string().required("Required"),
    channel: Yup.string().required("Required"),
    urgency: Yup.string().required("Required"),
    assignment: Yup.string().required("Required"),
    shortDescription: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
  });

  const getCategory = (value) => {
    console.log(value, 'value');
    GlobalService.generalSelect(
      (respdata) => {
        const { estatus, data } = respdata;
        if (estatus && data) {
          setCategoryType(data.categoryList)
        }
      },
      `${resturls.getCategory}/${value}`,
      {},
      'GET'
    );
  };

  const fetchAIContent = async (category) => {
    if (!category) {
      alert("Please select a service category first!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          model: "gpt-3.5-turbo", // Replace with the newer model
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: `Provide a brief description for the category: ${category}` },
          ],
          max_tokens: 50,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`, // Use the environment variable
          },
        }
      );

      const generatedContent = response.data.choices[0].text.trim();
      setServiceValue(generatedContent);
    } catch (error) {
      console.error("Error fetching AI content:", error);
      alert("Failed to fetch AI content. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    // getCategory();
  });

  return (
    <div style={{ margin: '2em' }}>
      <Formik
        initialValues={{
          channel: "",
          state: "",
          caller: "",
          category: "",
          subCategory: "",
          urgency: "",
          priority: "",
          assignment: "",
          shortDescription: "",
          description: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Form Submitted", values);
        }}
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form>
            <HeaderContainer>
              <GradientHeader>Create Incident</GradientHeader>
              <StyledButton type="submit">Create New Incident</StyledButton>
            </HeaderContainer>
            <StyledFormContainer>
              <div style={{ position: "relative" }}>
                <Field
                  name="channel"
                  as={CustomTextField}
                  label="channel"
                  error={touched.channel && !!errors.channel}
                  helperText={touched.state && errors.channel}
                />
                <StyledPatternR
                  style={{ opacity: loading ? 0.5 : 1 }}
                />
              </div>
              {/* <div style={{ position: "relative" }}> */}
              <FormControl style={{ position: "relative" }}>
                <InputLabel id="state-label">State</InputLabel>
                <Field
                  as={CustomSelect}
                  name="state"
                  labelId="state-label"
                >
                  <MenuItem sx={{ color: "#E81885" }} value="High">Open</MenuItem>
                  <MenuItem sx={{ color: "#E81885" }}>Inprogress</MenuItem>
                  <MenuItem sx={{ color: "#E81885" }}>Hold</MenuItem>
                  <MenuItem sx={{ color: "#E81885" }}>Completed</MenuItem>
                </Field>
                <StyledPatternL style={{ opacity: loading ? 0.5 : 1 }} />
              </FormControl>
              {/* </div> */}
              <div style={{ position: "relative" }}>
                <Field
                  name="caller"
                  as={CustomTextField}
                  label="Caller"
                  error={touched.caller && !!errors.caller}
                  helperText={touched.caller && errors.caller}
                />
                <StyledPatternL style={{ opacity: loading ? 0.5 : 1 }} />
              </div>
              {/* <Field
                name="caller"
                as={CustomTextField}
                label="Caller"
                error={touched.caller && !!errors.caller}
                helperText={touched.caller && errors.caller}
              /> */}
              {/* <Field
                name="category"
                as={CustomTextField}
                label="Category"
                error={touched.category && !!errors.category}
                helperText={touched.category && errors.category}
              /> */}

              <FormControl style={{ position: "relative" }}>
                <InputLabel id="category-label">Category</InputLabel>
                <Field
                  as={CustomSelect}
                  name="category"
                  labelId="category-label"
                  onChange={(event) => {
                    const value = event.target.value;
                    setFieldValue("category", value);
                    getCategory(value)
                  }}
                >
                  <MenuItem sx={{ color: "#E81885" }} value="Software">Software</MenuItem>
                  <MenuItem sx={{ color: "#E81885" }} value="Hardware">Hardware</MenuItem>
                  <MenuItem sx={{ color: "#E81885" }} value="Server">Server</MenuItem>
                  <MenuItem sx={{ color: "#E81885" }} value="Non-Tech">Non-Tech</MenuItem>
                </Field>
                <StyledPatternR
                  style={{ opacity: loading ? 0.5 : 1 }}
                />
              </FormControl>
              <FormControl style={{ position: "relative" }}>
                <InputLabel id="subCategory-label">Sub Category</InputLabel>
                <Field
                  as={CustomSelect}
                  name="subCategory"
                  labelId="subCategory-label"
                >
                  {categoryType?.map((ele) => (
                    <MenuItem sx={{ color: "#E81885" }} value={ele}>{ele}</MenuItem>
                  ))}
                </Field>
                <StyledPatternR
                  style={{ opacity: loading ? 0.5 : 1 }}
                />
              </FormControl>
              <div style={{ position: "relative" }}>
                <Field
                  name="urgency"
                  as={CustomTextField}
                  label="Urgency"
                  error={touched.urgency && !!errors.urgency}
                  helperText={touched.urgency && errors.urgency}
                />
                <StyledPatternL
                  style={{ opacity: loading ? 0.5 : 1 }}
                />
              </div>
              <div style={{ position: "relative" }}>
                <Field
                  name="assignment"
                  as={CustomTextField}
                  label="Assignment"
                  error={touched.assignment && !!errors.assignment}
                  helperText={touched.assignment && errors.assignment}
                />
                <StyledPatternL
                  style={{ opacity: loading ? 0.5 : 1 }}
                />
              </div>
              <FormControl style={{ position: "relative" }}>
                <InputLabel id="priority-label">Priority</InputLabel>
                <Field
                  as={CustomSelect}
                  name="priority"
                  labelId="priority-label"
                >
                  <MenuItem sx={{ color: "#E81885" }} value="High">High</MenuItem>
                  <MenuItem sx={{ color: "#E81885" }} value="Medium">Medium</MenuItem>
                  <MenuItem sx={{ color: "#E81885" }} value="Low">Low</MenuItem>
                </Field>
                <StyledPatternR
                  style={{ opacity: loading ? 0.5 : 1 }}
                />
              </FormControl>
              <div style={{ position: "relative" }}>
                <Field
                  as={CustomTextField}
                  name="service"
                  label="Service"
                  value={serviceValue}
                  style={{ width: '100% !important' }}
                  onChange={(e) => {
                    setServiceValue(e.target.value);
                    setFieldValue("service", e.target.value);
                  }}
                  error={touched.service && !!errors.service}
                  helperText={touched.service && errors.service}
                />
                <StyledPatternR
                  style={{ opacity: loading ? 0.5 : 1 }}
                />
                <StyledIcon
                  src="https://cdn-icons-png.flaticon.com/512/4712/4712106.png" // Example icon (replace with your icon)
                  alt="AI Icon"
                  onClick={() => fetchAIContent(values.category)}
                  style={{ opacity: loading ? 0.5 : 1 }}
                />
              </div>
              {/* <Field
                name="service"
                as={CustomTextField}
                label="Service"
                error={touched.service && !!errors.service}
                helperText={touched.service && errors.service}
              /> */}
              <div style={{ position: "relative" }}>
                <Field
                  name="serviceCategory"
                  as={CustomTextField}
                  label="Service Category"
                  error={touched.serviceCategory && !!errors.serviceCategory}
                  helperText={touched.serviceCategory && errors.serviceCategory}
                />
                <StyledPatternL
                  style={{ opacity: loading ? 0.5 : 1 }}
                />
              </div>
              <div style={{ position: "relative" }}>
                <Field
                  name="shortDescription"
                  as={CustomTextField}
                  label="Short Description"
                  className="fullWidth" // Add this class
                  error={touched.shortDescription && !!errors.shortDescription}
                  helperText={touched.shortDescription && errors.shortDescription}
                />
                <StyledPatternL
                  style={{ opacity: loading ? 0.5 : 1 }}
                />
              </div>
              <div style={{ position: "relative" }}>
                <Field
                  name="description"
                  as={CustomTextField}
                  label="Description"
                  className="fullWidth" // Add this class
                  error={touched.description && !!errors.description}
                  helperText={touched.description && errors.description}
                />
                <StyledPatternR
                  style={{ opacity: loading ? 0.5 : 1 }}
                />
              </div>
            </StyledFormContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateIncidentForm;

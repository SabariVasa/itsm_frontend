// import React, { useState } from "react";
// import { Modal, Box, Button, TextField, TextareaAutosize, Grid, IconButton, MenuItem, FormControlLabel, Checkbox } from "@mui/material";
// import { Formik, Form, Field } from "formik";
// import AddIcon from '@mui/icons-material/Add';
// import { useHistory } from "react-router-dom";
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import * as Yup from "yup";
// import GlobalService from "../../services/GlobalService";
// import { restbaseurl } from "../../global/utils/constants";
// import { resturls } from "../../global/utils/apiurls";

// const validationSchema = Yup.object({
//   groupName: Yup.string()
//     .when("group", {
//       is: (group) => !group,
//       then: (schema) => schema.required("Group Name is required"),
//       otherwise: (schema) => schema.notRequired(),
//     }),
//   groupDescription: Yup.string()
//     .when("group", {
//       is: (group) => !group,
//       then: (schema) => schema.required("Group Description is required"),
//       otherwise: (schema) => schema.notRequired(),
//     }),
//   groupType: Yup.string()
//     .when("group", {
//       is: (group) => !group,
//       then: (schema) => schema.required("Group Type is required"),
//       otherwise: (schema) => schema.notRequired(),
//     }),
//   userPermission: Yup.string()
//     .when("group", {
//       is: (group) => !group,
//       then: (schema) => schema.required("User Permission is required"),
//       otherwise: (schema) => schema.notRequired(),
//     }),
//   groupManager: Yup.string()
//     .when("group", {
//       is: (group) => !group,
//       then: (schema) => schema.required("Group Manager is required"),
//       otherwise: (schema) => schema.notRequired(),
//     }),
//   activeStatus: Yup.boolean()
//     .oneOf([true], "You must accept the Active Status")
//     .when("group", {
//       is: (group) => group,
//       then: (schema) => schema.required("Active Status is required"),
//       otherwise: (schema) => schema.notRequired(),
//     }),
//   groupScope: Yup.string()
//     .when("group", {
//       is: (group) => !group,
//       then: (schema) => schema.required("Group Scope is required"),
//       otherwise: (schema) => schema.notRequired(),
//     }),
// });

// const CreateGroupForm = ({ isCreateDepOpen, group }) => {
//   const history = useHistory();

//   const handleSubmit = (values) => {
//     const url = group ? `${resturls.updateGroup}/${group.id}` : resturls.CreateNewGroup
//     GlobalService.generalSelect(
//       (responseData) => {
//         const { data, estatus, emessage } = responseData;
//         console.log(data, estatus, emessage, 'data, estatus, emessage');
//         if (group) {
//           history.goBack();
//         }
//       },
//       url,
//       { ...values },
//       group ? 'PUT' : 'POST'
//     )
//   };

//   return (
//     <Box>
//       <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
//         <ArrowBackIcon sx={{ marginRight: 2 }} onClick={() => history.goBack()} />
//         {/* <GroupIcon /> */}
//         <h3>{group ? 'Edit Group' : 'Add New Department'}</h3>
//       </div>
//       <Formik
//         initialValues={{
//           groupName: group?.groupName || '',
//           groupType: group?.groupType || '',
//           groupDescription: group?.groupDescription || '',
//           groupScope: group?.groupScope || '',
//           activeStatus: group?.activeStatus ? true : false || true,
//           userPermission: group?.userPermission || '',
//           groupManager: group?.groupManager || [],
//         }}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ errors, touched, handleChange, values }) => (
//           <Form>
//             <Grid container spacing={2}>
//               <Grid item xs={6}>
//                 <Field
//                   name="groupName"
//                   as={TextField}
//                   label="Group Name"
//                   fullWidth
//                   error={touched.groupName && Boolean(errors.groupName)}
//                   helperText={touched.groupName && errors.groupName}
//                 />
//               </Grid>

//               <Grid item xs={6}>
//                 <Field
//                   name="groupType"
//                   as={TextField}
//                   label="Group Type"
//                   fullWidth
//                   error={touched.groupType && Boolean(errors.groupType)}
//                   helperText={touched.groupType && errors.groupType}
//                 />
//               </Grid>

//               <Grid item xs={6}>
//                 <Field
//                   name="userPermission"
//                   as={TextField}
//                   label="User Permission"
//                   fullWidth
//                   error={touched.userPermission && Boolean(errors.userPermission)}
//                   helperText={touched.userPermission && errors.userPermission}
//                 />
//               </Grid>

//               <Grid item xs={6}>
//                 <Field
//                   name="groupManager"
//                   as={TextField}
//                   label="Group Manager"
//                   fullWidth
//                   error={touched.groupManager && Boolean(errors.groupManager)}
//                   helperText={touched.groupManager && errors.groupManager}
//                 />
//               </Grid>

//               <Grid item xs={6}>
//                 <Field
//                   name="groupScope"
//                   as={TextField}
//                   label="Group Scope"
//                   fullWidth
//                   error={touched.groupScope && Boolean(errors.groupScope)}
//                   helperText={touched.groupScope && errors.groupScope}
//                 />
//               </Grid>

//               <Grid item xs={6}>
//                 <FormControlLabel
//                   control={
//                     <Field
//                       name="activeStatus"
//                       type="checkbox"
//                       as={Checkbox}
//                       checked={values.activeStatus}
//                       onChange={handleChange}
//                     />
//                   }
//                   label="Active Status"
//                 />
//                 {touched.activeStatus && errors.activeStatus ? (
//                   <div style={{ color: 'red', fontSize: '0.8rem' }}>{errors.activeStatus}</div>
//                 ) : null}
//               </Grid>

//               <Grid item xs={12}>
//                 <Field
//                   name="groupDescription"
//                   as={TextareaAutosize}
//                   minRows={3}
//                   placeholder="Group Description"
//                   style={{ width: '100%', padding: '10px' }}
//                 />
//                 {touched.groupDescription && errors.groupDescription ? (
//                   <div style={{ color: 'red', fontSize: '0.8rem' }}>{errors.groupDescription}</div>
//                 ) : null}
//               </Grid>
//             </Grid>

//             <Grid container justifyContent="center" sx={{ mt: 3 }}>
//               <Button type="submit" variant="contained" color="primary">
//                 {group ? 'Update' : 'Submit'}
//               </Button>
//             </Grid>
//           </Form>
//         )}
//       </Formik>
//     </Box>
//   );
// };


// export default CreateGroupForm;
import React from "react";
import { Box, Button, TextField, TextareaAutosize, Grid, FormControlLabel, Checkbox } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import * as Yup from "yup";
import GlobalService from "../../services/GlobalService";
import { resturls } from "../../global/utils/apiurls";

const validationSchema = Yup.object({
  groupName: Yup.string()
    .when("group", {
      is: (group) => !group,
      then: (schema) => schema.required("Group Name is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  groupDescription: Yup.string()
    .when("group", {
      is: (group) => !group,
      then: (schema) => schema.required("Group Description is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  groupType: Yup.string()
    .when("group", {
      is: (group) => !group,
      then: (schema) => schema.required("Group Type is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  userPermission: Yup.string()
    .when("group", {
      is: (group) => !group,
      then: (schema) => schema.required("User Permission is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  groupManager: Yup.string()
    .when("group", {
      is: (group) => !group,
      then: (schema) => schema.required("Group Manager is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  groupScope: Yup.string()
    .when("group", {
      is: (group) => !group,
      then: (schema) => schema.required("Group Scope is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
});

const CreateGroupForm = ({ isCreateDepOpen, group }) => {
  const history = useHistory();

  const handleSubmit = (values) => {
    const url = group ? `${resturls.updateGroup}/${group.id}` : resturls.CreateNewGroup;
    GlobalService.generalSelect(
      (responseData) => {
        const { data, estatus, emessage } = responseData;
        console.log(data, estatus, emessage, 'data, estatus, emessage');
        if (group) {
          history.goBack();
        }
      },
      url,
      { ...values },
      group ? 'PUT' : 'POST'
    );
  };

  return (
    <Box>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <ArrowBackIcon sx={{ marginRight: 2 }} onClick={() => history.goBack()} />
        <h3>{group ? 'Edit Group' : 'Add New Department'}</h3>
      </div>
      <Formik
        initialValues={{
          groupName: group?.groupName || '',
          groupType: group?.groupType || '',
          groupDescription: group?.groupDescription || '',
          groupScope: group?.groupScope || '',
          activeStatus: group?.activeStatus ?? true,
          userPermission: group?.userPermission || '',
          groupManager: group?.groupManager || '',
          group: group || null,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, handleChange, values }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Field
                  name="groupName"
                  as={TextField}
                  label="Group Name"
                  fullWidth
                  error={touched.groupName && Boolean(errors.groupName)}
                  helperText={touched.groupName && errors.groupName}
                />
              </Grid>

              <Grid item xs={6}>
                <Field
                  name="groupType"
                  as={TextField}
                  label="Group Type"
                  fullWidth
                  error={touched.groupType && Boolean(errors.groupType)}
                  helperText={touched.groupType && errors.groupType}
                />
              </Grid>

              <Grid item xs={6}>
                <Field
                  name="userPermission"
                  as={TextField}
                  label="User Permission"
                  fullWidth
                  error={touched.userPermission && Boolean(errors.userPermission)}
                  helperText={touched.userPermission && errors.userPermission}
                />
              </Grid>

              <Grid item xs={6}>
                <Field
                  name="groupManager"
                  as={TextField}
                  label="Group Manager"
                  fullWidth
                  error={touched.groupManager && Boolean(errors.groupManager)}
                  helperText={touched.groupManager && errors.groupManager}
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  name="groupScope"
                  as={TextField}
                  label="Group Scope"
                  fullWidth
                  error={touched.groupScope && Boolean(errors.groupScope)}
                  helperText={touched.groupScope && errors.groupScope}
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

              <Grid item xs={12}>
                <Field
                  name="groupDescription"
                  as={TextareaAutosize}
                  minRows={3}
                  placeholder="Group Description"
                  style={{ width: '100%', padding: '10px' }}
                />
                {touched.groupDescription && errors.groupDescription ? (
                  <div style={{ color: 'red', fontSize: '0.8rem' }}>{errors.groupDescription}</div>
                ) : null}
              </Grid>
            </Grid>

            <Grid container justifyContent="center" sx={{ mt: 3 }}>
              <Button type="submit" variant="contained" color="primary">
                {group ? 'Update' : 'Submit'}
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateGroupForm;

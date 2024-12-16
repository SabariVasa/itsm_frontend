
// import React, { useEffect, useState } from "react";
// import { Box, Button, TextField, TextareaAutosize, Grid, FormControlLabel, Checkbox } from "@mui/material";
// import { Formik, Form, Field } from "formik";
// import { useHistory } from "react-router-dom";
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import * as Yup from "yup";
// import GlobalService from "../../services/GlobalService";
// import { resturls } from "../../global/utils/apiurls";
// import UserManagmentTable from "../../Pages/userManagement/UserManagmentTable";

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
//   groupScope: Yup.string()
//     .when("group", {
//       is: (group) => !group,
//       then: (schema) => schema.required("Group Scope is required"),
//       otherwise: (schema) => schema.notRequired(),
//     }),
// });

// const CreateGroupForm = (props) => {
//   const { match: { params: { group_id, orgId } }, organizationId } = props;
//   console.log(orgId, 'orgId');
//   const history = useHistory();
//   const [group, setGroup] = useState(null);
//   const [showMemberEnable, setShowMemberEnable] = useState(false);
//   const [addGroupMember, setAddGroupMember] = useState([])

//   const handleSubmit = (values) => {
//     const url = group ? `${resturls.updateGroup}/${group.id}` : resturls.CreateNewGroup;
//     GlobalService.generalSelect(
//       (responseData) => {
//         const { data, estatus, emessage } = responseData;
//         console.log(data, estatus, emessage, 'data, estatus, emessage');
//         if (estatus) {
//           history.goBack();
//         }
//       },
//       url,
//       { ...values, organizationId: orgId || organizationId },
//       group ? 'PUT' : 'POST'
//     );
//   };

//   useEffect(() => {
//     if (group_id) {
//       GlobalService.generalSelect(
//         (respdata) => {
//           const { estatus, emessage, data } = respdata;
//           if (estatus && emessage) {
//             const foundObject = data.find(item => item.id === group_id);
//             setGroup(foundObject || {});
//           }
//         },
//         resturls.getAllGroupDetails,
//         {},
//         'GET'
//       );
//     }
//   }, [group_id]);

//   console.log(group, 'group==');

//   return (
//     <Box>
//       <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
//         <ArrowBackIcon sx={{ marginRight: 2 }} onClick={() => history.goBack()} />
//         <h3>{group ? 'Edit Group' : 'Add New Department'}</h3>
//       </div>
//       <Formik
//         initialValues={{
//           groupName: group?.groupName || '',
//           groupType: group?.groupType || '',
//           groupDescription: group?.groupDescription || '',
//           groupScope: group?.groupScope || '',
//           activeStatus: group?.activeStatus ?? true,
//           userPermission: group?.userPermission || '',
//           groupManager: group?.groupManager || '',
//           group: group || null,
//         }}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//         enableReinitialize
//       >
//         {({ errors, touched, handleChange, values }) => (
//           <Form>
//             <Grid container justifyContent="center" sx={{ mt: 3, mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
//               <Button type="submit" variant="contained" color="primary">
//                 {group ? 'Update' : 'Submit'}
//               </Button>
//             </Grid>
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
//             <Grid container justifyContent="center" sx={{ mt: 3, mb: 3, display: 'flex', justifyContent: 'flex-start' }}>
//               <Button variant="contained" color="primary" onClick={() => setShowMemberEnable(true)}>
//                 Add Group Member
//               </Button>
//             </Grid>
//           </Form>
//         )}
//       </Formik>
//       {showMemberEnable && <UserManagmentTable groupMember={true} userData={group && group.groupMembers} />}
//     </Box>
//   );
// };

// export default CreateGroupForm;
import React, { useEffect, useState } from "react";
import { Box, Button, TextField, TextareaAutosize, Grid, FormControlLabel, Checkbox, MenuItem, InputLabel, FormControl } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import * as Yup from "yup";
import GlobalService from "../../services/GlobalService";
import { resturls } from "../../global/utils/apiurls";
import UserManagmentTable from "../../Pages/userManagement/UserManagmentTable";
import { CustomSelect, CustomTextField, GradientHeader, HeaderContainer, StyledButton, StyledFormContainer, StyledPatternL, StyledPatternR } from "../../commonComponents/StyledComponents";

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

const CreateGroupForm = (props) => {
  const { match: { params: { group_id, orgId } }, organizationId } = props;
  const [selectedUserRows, setSelectedUserRows] = useState();
  const history = useHistory();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showMemberEnable, setShowMemberEnable] = useState(false);

  const handleSubmit = (values) => {
    console.log(values, 'values...');
    // const userIds =  [ "67270aad16f9ac7caad6e541", "67138e4832d08628c5faabae", "67091cafaf07335b3ce6a7dc", "67091cedaf07335b3ce6a7dd" ]
    const groupMembers = selectedUserRows || []

    const url = group ? `${resturls.updateGroup}/${group.id}` : resturls.CreateNewGroup;
    GlobalService.generalSelect(
      (responseData) => {
        const { data, estatus, emessage } = responseData;
        if (estatus) {
          history.goBack();
        }
      },
      url,
      { ...values, organizationId: orgId || organizationId, groupMembers },
      group ? 'PUT' : 'POST'
    );
  };

  console.log(selectedUserRows, 'selectedUserRows');

  useEffect(() => {
    if (group_id) {
      GlobalService.generalSelect(
        (respdata) => {
          const { estatus, emessage, data } = respdata;
          if (estatus && emessage) {
            const foundObject = data.find(item => item.id === group_id);
            setGroup(foundObject || {});
          }
        },
        resturls.getAllGroupDetails,
        {},
        'GET'
      );
    }
  }, [group_id]);

  return (
    <Box>
      {/* <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

        <h3>{group ? 'Edit Group' : 'Add New Department'}</h3>
      </div> */}
      <Formik
        initialValues={{
          groupName: group?.groupName || "",
          groupType: group?.groupType || "",
          groupDescription: group?.groupDescription || "",
          groupScope: group?.groupScope || "",
          activeStatus: group?.activeStatus ?? true, // Default to `true` if undefined
          userPermission: group?.userPermission || "",
          groupManager: group?.groupManager || "",
          group: group || null,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form>
            <HeaderContainer>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <ArrowBackIcon sx={{ marginRight: 2 }} onClick={() => history.goBack()} />
                <GradientHeader>Create Group</GradientHeader>
              </div>
              <StyledButton type="submit">Save Group</StyledButton>
            </HeaderContainer>
            <StyledFormContainer>
              {/* Group Name */}
              <div style={{ position: "relative" }}>
                <Field
                  name="groupName"
                  as={CustomTextField}
                  label="Group Name"
                  error={touched.groupName && !!errors.groupName}
                  helperText={touched.groupName && errors.groupName}
                />
                <StyledPatternR
                  style={{ opacity: loading ? 0.5 : 1 }}
                />
              </div>

              {/* Group Type */}
              <FormControl style={{ position: "relative" }}>
                <InputLabel id="groupType-label">Group Type</InputLabel>
                <Field
                  as={CustomSelect}
                  name="groupType"
                  labelId="groupType-label"
                >
                  <MenuItem sx={{ color: "#E81885" }} value="Type1">Type 1</MenuItem>
                  <MenuItem sx={{ color: "#E81885" }} value="Type2">Type 2</MenuItem>
                  <MenuItem sx={{ color: "#E81885" }} value="Type3">Type 3</MenuItem>
                </Field>
                <StyledPatternR
                  style={{ opacity: loading ? 0.5 : 1 }}
                />
              </FormControl>

              {/* Group Description */}


              {/* Group Scope */}
              <div style={{ position: "relative" }}>
                <Field
                  name="groupScope"
                  as={CustomTextField}
                  label="Group Scope"
                  error={touched.groupScope && !!errors.groupScope}
                  helperText={touched.groupScope && errors.groupScope}
                />
                <StyledPatternL
                  style={{ opacity: loading ? 0.5 : 1 }}
                />
              </div>

              <div style={{ position: "relative" }}>
                <Field
                  name="groupManager"
                  as={CustomTextField}
                  label="Group Manager"
                  error={touched.groupManager && !!errors.groupManager}
                  helperText={touched.groupManager && errors.groupManager}
                />
                <StyledPatternL
                  style={{ opacity: loading ? 0.5 : 1 }}
                />
              </div>

              <FormControl style={{ position: "relative" }}>
                <InputLabel id="userPermission-label">User Permission</InputLabel>
                <Field
                  as={CustomSelect}
                  name="userPermission"
                  labelId="userPermission-label"
                >
                  <MenuItem sx={{ color: "#E81885" }} value="Read">Read</MenuItem>
                  <MenuItem sx={{ color: "#E81885" }} value="Write">Write</MenuItem>
                  <MenuItem sx={{ color: "#E81885" }} value="Admin">Admin</MenuItem>
                </Field>
                <StyledPatternR
                  style={{ opacity: loading ? 0.5 : 1 }}
                />
              </FormControl>

              {/* <FormControlLabel
                control={
                  <Field
                    name="activeStatus"
                    // as={CustomTextField}
                    type="checkbox"
                    checked={values.activeStatus}
                    onChange={() => setFieldValue("activeStatus", !values.activeStatus)}
                  />
                }
                label="Active Status"
              /> */}

              <FormControlLabel
                control={
                  <Field
                    name="activeStatus"
                    type="checkbox"
                    checked={values.activeStatus}
                    onChange={() => setFieldValue("activeStatus", !values.activeStatus)}
                    style={{
                      background: values.activeStatus
                        ? "linear-gradient(90deg, #F51275 0%, #622098 100%)"
                        : "transparent",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      padding: "5px",
                    }}
                  />
                }
                label="Active Status"
              />

              <div style={{ position: "relative" }}>
                <Field
                  name="groupDescription"
                  as={CustomTextField}
                  label="Group Description"
                  error={touched.groupDescription && !!errors.groupDescription}
                  helperText={touched.groupDescription && errors.groupDescription}
                />
                <StyledPatternL
                  style={{ opacity: loading ? 0.5 : 1 }}
                />
              </div>
            </StyledFormContainer>
          </Form>
        )}
      </Formik>
      {showMemberEnable && <UserManagmentTable
        groupMember={true}
        setSelectedUserRows={setSelectedUserRows}
        userData={group && group.groupMembers}
      />}
    </Box>
  );
};

export default CreateGroupForm;

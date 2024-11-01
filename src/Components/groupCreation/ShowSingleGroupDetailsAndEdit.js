// // import React, { useEffect, useState } from "react";
// // import ContentDevider from "../HelperComponents/ContentDevider";
// // import { resturls } from "../../global/utils/apiurls";
// // import GlobalService from "../../services/GlobalService";
// // import { Card, CardContent, Typography, Divider, List, ListItem, ListItemText, Grid } from '@mui/material';

// // function ShowSingleGroupDetailsAndEdit(props) {
// //   const { match: { params: { show_group } } } = props;

// //   const [group, setGroup] = useState({});

// //   const getAllGroupDetails = () => {
// //     // setLoading(true);
// //     GlobalService.generalSelect(
// //       (respdata) => {
// //         const { estatus, emessage, data } = respdata;
// //         if (estatus && emessage) {
// //           const findById = (data, show_group) => data.find(item => item.id === show_group);
// //           const foundObject = findById(data, show_group);
// //           setGroup(foundObject);
// //           //   setTimeout(() => {
// //           //     setLoading(false);
// //           //   }, 2000);
// //         }
// //       },
// //       resturls.getAllGroupDetails,
// //       {},
// //       'GET'
// //     );
// //   };

// //   useEffect(() => {
// //     getAllGroupDetails();
// //   }, []);

// //   console.log(group, show_group, 'group');

// //   return (
// //     <>
// //       <ContentDevider title="Group Info" />
// //       {group && (
// //         <Card variant="outlined">
// //           <CardContent>
// //             <Typography variant="h5" gutterBottom>
// //               {group?.groupName}
// //             </Typography>
// //             <Divider />

// //             <Grid container spacing={2} marginTop={2}>
// //               <Grid item xs={6}>
// //                 <Typography variant="subtitle1" color="textSecondary">
// //                   Group? Type:
// //                 </Typography>
// //                 <Typography variant="body1">{group?.groupType}</Typography>
// //               </Grid>
// //               <Grid item xs={6}>
// //                 <Typography variant="subtitle1" color="textSecondary">
// //                   Scope:
// //                 </Typography>
// //                 <Typography variant="body1">{group?.groupScope}</Typography>
// //               </Grid>
// //               <Grid item xs={6}>
// //                 <Typography variant="subtitle1" color="textSecondary">
// //                   Active Status:
// //                 </Typography>
// //                 <Typography variant="body1">{group?.activeStatus}</Typography>
// //               </Grid>
// //               <Grid item xs={6}>
// //                 <Typography variant="subtitle1" color="textSecondary">
// //                   Permission:
// //                 </Typography>
// //                 <Typography variant="body1">{group?.userPermission}</Typography>
// //               </Grid>
// //             </Grid>

// //             <Divider sx={{ my: 2 }} />

// //             <Typography variant="subtitle1" color="textSecondary">
// //               Group? Description:
// //             </Typography>
// //             <Typography variant="body1" gutterBottom>
// //               {group?.groupDescription}
// //             </Typography>

// //             <Typography variant="subtitle1" color="textSecondary">
// //               Group? Manager:
// //             </Typography>
// //             <Typography variant="body1" gutterBottom>
// //               {group?.groupManager}
// //             </Typography>

// //             <Divider sx={{ my: 2 }} />

// //             <Typography variant="h6" gutterBottom>
// //               Group Members
// //             </Typography>
// //             <List>
// //               {group?.groupMembers.map((member, index) => (
// //                 <ListItem key={index} sx={{ pl: 0 }}>
// //                   <ListItemText
// //                     primary={`${member.firstName} ${member.lastName}`}
// //                     secondary={`ID: ${member.id}`}
// //                   />
// //                 </ListItem>
// //               ))}
// //             </List>
// //           </CardContent>
// //         </Card>
// //       )}
// //     </>
// //   );
// // }
// // export default ShowSingleGroupDetailsAndEdit;
// import React, { useEffect, useState } from "react";
// import ContentDevider from "../HelperComponents/ContentDevider";
// import { resturls } from "../../global/utils/apiurls";
// import GlobalService from "../../services/GlobalService";
// import {
//   Card, CardContent, Typography, Divider, Table, TableBody, TableCell,
//   TableContainer, TableHead, TableRow, IconButton, TextField, Grid, Paper
// } from '@mui/material';
// import { Edit, Delete, Save, Cancel } from '@mui/icons-material';
// import { Formik, Field, Form } from 'formik';

// function ShowSingleGroupDetailsAndEdit(props) {
//   const { match: { params: { show_group } } } = props;
//   const [group, setGroup] = useState({});
//   const [editingMemberId, setEditingMemberId] = useState(null); // Track editing member

//   const handleEditClick = (memberId) => setEditingMemberId(memberId);
//   const handleCancelEdit = () => setEditingMemberId(null);
//   const handleRemoveMember = (memberId) => {
//     setGroup(prevGroup => ({
//       ...prevGroup,
//       groupMembers: prevGroup.groupMembers.filter(member => member.id !== memberId),
//     }));
//   };

//   // const getAllGroupDetails = () => {
//   //   GlobalService.generalSelect(
//   //     (respdata) => {
//   //       const { estatus, emessage, data } = respdata;
//   //       if (estatus && emessage) {
//   //         // const foundObject = data.find(item => item.id === show_group);
//   //         // setGroup(foundObject);
//   //         const findById = (data, show_group) => data.find(item => item.id === show_group);
//   //         const foundObject = findById(data, show_group);
//   //         setGroup(foundObject);
//   //       }
//   //     },
//   //     resturls.getAllGroupDetails,
//   //     {},
//   //     'GET'
//   //   );
//   // };

//   useEffect(() => {
//     // getAllGroupDetails();
//     GlobalService.generalSelect(
//       (respdata) => {
//         const { estatus, emessage, data } = respdata;
//         if (estatus && emessage) {
//           // const foundObject = data.find(item => item.id === show_group);
//           // setGroup(foundObject);
//           const findById = (data, show_group) => data.find(item => item.id === show_group);
//           const foundObject = findById(data, show_group);
//           setGroup(foundObject);
//         }
//       },
//       resturls.getAllGroupDetails,
//       {},
//       'GET'
//     );
//   }, [show_group]);

//   return (
//     <>
//       <ContentDevider title="Group Info" />
//       {group ? (
//         <Card variant="outlined">
//           <CardContent>
//             <Typography variant="h5" gutterBottom>{group?.groupName}</Typography>
//             <Divider />

//             {/* Group Details */}
//             <Grid container spacing={2} marginTop={2}>
//               <Grid item xs={6}>
//                 <Typography variant="subtitle1" color="textSecondary">Group Type:</Typography>
//                 <Typography variant="body1">{group?.groupType}</Typography>
//               </Grid>
//               <Grid item xs={6}>
//                 <Typography variant="subtitle1" color="textSecondary">Scope:</Typography>
//                 <Typography variant="body1">{group?.groupScope}</Typography>
//               </Grid>
//               <Grid item xs={6}>
//                 <Typography variant="subtitle1" color="textSecondary">Active Status:</Typography>
//                 <Typography variant="body1">{group?.activeStatus}</Typography>
//               </Grid>
//               <Grid item xs={6}>
//                 <Typography variant="subtitle1" color="textSecondary">Permission:</Typography>
//                 <Typography variant="body1">{group?.userPermission}</Typography>
//               </Grid>
//             </Grid>

//             <Divider sx={{ my: 2 }} />

//             {/* Group Members Table */}
//             <Typography variant="h6" gutterBottom>Group Members</Typography>
//             <TableContainer component={Paper}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>First Name</TableCell>
//                     <TableCell>Last Name</TableCell>
//                     <TableCell>ID</TableCell>
//                     <TableCell align="right">Actions</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {group?.groupMembers.map((member) => (
//                     <Formik
//                       initialValues={{ firstName: member.firstName, lastName: member.lastName }}
//                       onSubmit={(values) => {
//                         setGroup(prevGroup => ({
//                           ...prevGroup,
//                           groupMembers: prevGroup.groupMembers.map(m =>
//                             m.id === member.id ? { ...m, ...values } : m
//                           ),
//                         }));
//                         setEditingMemberId(null);
//                       }}
//                       key={member.id}
//                     >
//                       {({ handleSubmit }) => (
//                         <TableRow>
//                           <TableCell>
//                             {editingMemberId === member.id ? (
//                               <Field
//                                 name="firstName"
//                                 as={TextField}
//                                 variant="outlined"
//                                 fullWidth
//                               />
//                             ) : (
//                               member.firstName
//                             )}
//                           </TableCell>
//                           <TableCell>
//                             {editingMemberId === member.id ? (
//                               <Field
//                                 name="lastName"
//                                 as={TextField}
//                                 variant="outlined"
//                                 fullWidth
//                               />
//                             ) : (
//                               member.lastName
//                             )}
//                           </TableCell>
//                           <TableCell>{member.id}</TableCell>
//                           <TableCell align="right">
//                             {editingMemberId === member.id ? (
//                               <>
//                                 <IconButton onClick={handleSubmit}>
//                                   <Save />
//                                 </IconButton>
//                                 <IconButton onClick={handleCancelEdit}>
//                                   <Cancel />
//                                 </IconButton>
//                               </>
//                             ) : (
//                               <>
//                                 <IconButton onClick={() => handleEditClick(member.id)}>
//                                   <Edit />
//                                 </IconButton>
//                                 <IconButton onClick={() => handleRemoveMember(member.id)}>
//                                   <Delete />
//                                 </IconButton>
//                               </>
//                             )}
//                           </TableCell>
//                         </TableRow>
//                       )}
//                     </Formik>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </CardContent>
//         </Card>
//       ) : ''}
//     </>
//   );
// }

// export default ShowSingleGroupDetailsAndEdit;
// import React, { useEffect, useState } from "react";
// import ContentDevider from "../HelperComponents/ContentDevider";
// import { resturls } from "../../global/utils/apiurls";
// import GlobalService from "../../services/GlobalService";
// import {
//   Card, CardContent, Typography, Divider, Table, TableBody, TableCell,
//   TableContainer, TableHead, TableRow, IconButton, TextField, Grid, Paper
// } from '@mui/material';
// import { Edit, Delete, Save, Cancel } from '@mui/icons-material';
// import { Formik, Field, Form } from 'formik';

// function ShowSingleGroupDetailsAndEdit(props) {
//   const { match: { params: { show_group } } } = props;
//   const [group, setGroup] = useState({});
//   const [editingMemberId, setEditingMemberId] = useState(null); // Track editing member

//   const handleEditClick = (memberId) => setEditingMemberId(memberId);
//   const handleCancelEdit = () => setEditingMemberId(null);
//   const handleRemoveMember = (memberId) => {
//     setGroup(prevGroup => ({
//       ...prevGroup,
//       groupMembers: prevGroup.groupMembers.filter(member => member.id !== memberId),
//     }));
//   };

//   const getAllGroupDetails = () => {
//     GlobalService.generalSelect(
//       (respdata) => {
//         const { estatus, emessage, data } = respdata;
//         if (estatus && emessage) {
//           const foundObject = data.find(item => item.id === show_group);
//           if (foundObject) {
//             setGroup(foundObject);
//           }
//         }
//       },
//       resturls.getAllGroupDetails,
//       {},
//       'GET'
//     );
//   };

//   useEffect(() => {
//     getAllGroupDetails();
//   }, [show_group]);

//   return (
//     <>
//       <ContentDevider title="Group Info" />
//       {group && (
//         <Card variant="outlined">
//           <CardContent>
//             <Typography variant="h5" gutterBottom>{group?.groupName}</Typography>
//             <Divider />

//             {/* Group Details */}
//             <Grid container spacing={2} marginTop={2}>
//               <Grid item xs={6}>
//                 <Typography variant="subtitle1" color="textSecondary">Group Type:</Typography>
//                 <Typography variant="body1">{group?.groupType}</Typography>
//               </Grid>
//               <Grid item xs={6}>
//                 <Typography variant="subtitle1" color="textSecondary">Scope:</Typography>
//                 <Typography variant="body1">{group?.groupScope}</Typography>
//               </Grid>
//               <Grid item xs={6}>
//                 <Typography variant="subtitle1" color="textSecondary">Active Status:</Typography>
//                 <Typography variant="body1">{group?.activeStatus}</Typography>
//               </Grid>
//               <Grid item xs={6}>
//                 <Typography variant="subtitle1" color="textSecondary">Permission:</Typography>
//                 <Typography variant="body1">{group?.userPermission}</Typography>
//               </Grid>
//             </Grid>

//             <Divider sx={{ my: 2 }} />

//             {/* Group Members Table */}
//             <Typography variant="h6" gutterBottom>Group Members</Typography>
//             <TableContainer component={Paper}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>First Name</TableCell>
//                     <TableCell>Last Name</TableCell>
//                     <TableCell>ID</TableCell>
//                     <TableCell align="right">Actions</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {group?.groupMembers.map((member) => (
//                     <Formik
//                       initialValues={{ firstName: member.firstName, lastName: member.lastName }}
//                       onSubmit={(values) => {
//                         setGroup(prevGroup => ({
//                           ...prevGroup,
//                           groupMembers: prevGroup.groupMembers.map(m =>
//                             m.id === member.id ? { ...m, ...values } : m
//                           ),
//                         }));
//                         setEditingMemberId(null);
//                       }}
//                       key={member.id}
//                     >
//                       {({ handleSubmit }) => (
//                         <TableRow>
//                           <TableCell>
//                             {editingMemberId === member.id ? (
//                               <Field
//                                 name="firstName"
//                                 as={TextField}
//                                 variant="outlined"
//                                 fullWidth
//                               />
//                             ) : (
//                               member.firstName
//                             )}
//                           </TableCell>
//                           <TableCell>
//                             {editingMemberId === member.id ? (
//                               <Field
//                                 name="lastName"
//                                 as={TextField}
//                                 variant="outlined"
//                                 fullWidth
//                               />
//                             ) : (
//                               member.lastName
//                             )}
//                           </TableCell>
//                           <TableCell>{member.id}</TableCell>
//                           <TableCell align="right">
//                             {editingMemberId === member.id ? (
//                               <>
//                                 <IconButton onClick={handleSubmit}>
//                                   <Save />
//                                 </IconButton>
//                                 <IconButton onClick={handleCancelEdit}>
//                                   <Cancel />
//                                 </IconButton>
//                               </>
//                             ) : (
//                               <>
//                                 <IconButton onClick={() => handleEditClick(member.id)}>
//                                   <Edit />
//                                 </IconButton>
//                                 <IconButton onClick={() => handleRemoveMember(member.id)}>
//                                   <Delete />
//                                 </IconButton>
//                               </>
//                             )}
//                           </TableCell>
//                         </TableRow>
//                       )}
//                     </Formik>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </CardContent>
//         </Card>
//       )}
//     </>
//   );
// }

// export default ShowSingleGroupDetailsAndEdit;
// import React, { useEffect, useState } from "react";
// import ContentDevider from "../HelperComponents/ContentDevider";
// import { resturls } from "../../global/utils/apiurls";
// import GlobalService from "../../services/GlobalService";
// import {
//   Card, CardContent, Typography, Divider, Table, TableBody, TableCell,
//   TableContainer, TableHead, TableRow, IconButton, TextField, Grid, Paper
// } from '@mui/material';
// import { Edit, Delete, Save, Cancel } from '@mui/icons-material';
// import { Formik, Field } from 'formik';

// function ShowSingleGroupDetailsAndEdit(props) {
//   const { match: { params: { show_group } } } = props;
//   const [group, setGroup] = useState({});
//   const [editingMemberId, setEditingMemberId] = useState(null); // Track editing member

//   const handleEditClick = (memberId) => setEditingMemberId(memberId);
//   const handleCancelEdit = () => setEditingMemberId(null);
//   const handleRemoveMember = (memberId) => {
//     setGroup(prevGroup => ({
//       ...prevGroup,
//       groupMembers: prevGroup.groupMembers.filter(member => member.id !== memberId),
//     }));
//   };

//   const getAllGroupDetails = () => {
//     GlobalService.generalSelect(
//       (respdata) => {
//         const { estatus, emessage, data } = respdata;
//         if (estatus && emessage) {
//           const foundObject = data.find(item => item.id === show_group);
//           if (foundObject) {
//             setGroup(foundObject);
//           }
//         }
//       },
//       resturls.getAllGroupDetails,
//       {},
//       'GET'
//     );
//   };

//   useEffect(() => {
//     getAllGroupDetails();
//   }, [show_group]);

//   return (
//     <>
//       <ContentDevider title="Group Info" />
//       {group && (
//         <Card variant="outlined">
//           <CardContent>
//             <Typography variant="h5" gutterBottom>{group.groupName}</Typography>
//             <Divider />

//             {/* Display Group Details Dynamically */}
//             <Grid container spacing={2} marginTop={2}>
//               {Object.entries(group).map(([key, value]) => (
//                 key !== 'groupMembers' && (
//                   <Grid item xs={6} key={key}>
//                     <Typography variant="subtitle1" color="textSecondary">
//                       {key.replace(/([A-Z])/g, ' $1')}: {/* Formats camelCase to spaced words */}
//                     </Typography>
//                     <Typography variant="body1">
//                       {value}
//                     </Typography>
//                   </Grid>
//                 )
//               ))}
//             </Grid>

//             <Divider sx={{ my: 2 }} />

//             {/* Group Members Table */}
//             <Typography variant="h6" gutterBottom>Group Members</Typography>
//             <TableContainer component={Paper}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>First Name</TableCell>
//                     <TableCell>Last Name</TableCell>
//                     <TableCell>ID</TableCell>
//                     <TableCell align="right">Actions</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {group.groupMembers?.map((member) => (
//                     <Formik
//                       initialValues={{ firstName: member.firstName, lastName: member.lastName }}
//                       onSubmit={(values) => {
//                         setGroup(prevGroup => ({
//                           ...prevGroup,
//                           groupMembers: prevGroup.groupMembers.map(m =>
//                             m.id === member.id ? { ...m, ...values } : m
//                           ),
//                         }));
//                         setEditingMemberId(null);
//                       }}
//                       key={member.id}
//                     >
//                       {({ handleSubmit }) => (
//                         <TableRow>
//                           <TableCell>
//                             {editingMemberId === member.id ? (
//                               <Field
//                                 name="firstName"
//                                 as={TextField}
//                                 variant="outlined"
//                                 fullWidth
//                               />
//                             ) : (
//                               member.firstName
//                             )}
//                           </TableCell>
//                           <TableCell>
//                             {editingMemberId === member.id ? (
//                               <Field
//                                 name="lastName"
//                                 as={TextField}
//                                 variant="outlined"
//                                 fullWidth
//                               />
//                             ) : (
//                               member.lastName
//                             )}
//                           </TableCell>
//                           <TableCell>{member.id}</TableCell>
//                           <TableCell align="right">
//                             {editingMemberId === member.id ? (
//                               <>
//                                 <IconButton onClick={handleSubmit}>
//                                   <Save />
//                                 </IconButton>
//                                 <IconButton onClick={handleCancelEdit}>
//                                   <Cancel />
//                                 </IconButton>
//                               </>
//                             ) : (
//                               <>
//                                 <IconButton onClick={() => handleEditClick(member.id)}>
//                                   <Edit />
//                                 </IconButton>
//                                 <IconButton onClick={() => handleRemoveMember(member.id)}>
//                                   <Delete />
//                                 </IconButton>
//                               </>
//                             )}
//                           </TableCell>
//                         </TableRow>
//                       )}
//                     </Formik>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </CardContent>
//         </Card>
//       )}
//     </>
//   );
// }

// export default ShowSingleGroupDetailsAndEdit;
import React, { useEffect, useState } from "react";
import ContentDevider from "../HelperComponents/ContentDevider";
import { resturls } from "../../global/utils/apiurls";
import GlobalService from "../../services/GlobalService";
import {
  Card, CardContent, Typography, Divider, Grid, IconButton, TextField, Button
} from '@mui/material';
import { Edit, Save, Cancel } from '@mui/icons-material';
import { useHistory, useRouteMatch } from "react-router-dom";
import { Formik, Field, Form } from 'formik';
import CreateGroupForm from "./CreateGroupForm";

function ShowSingleGroupDetailsAndEdit(props) {
  const { match: { params: { show_group } } } = props;
  // const history = useHistory();
  const [group, setGroup] = useState({});
  const [isEditingEnable, setIsEditingEnable] = useState(false);

  const toggleEditMode = () => setIsEditingEnable(!isEditingEnable);

  useEffect(() => {
    GlobalService.generalSelect(
      (respdata) => {
        const { estatus, emessage, data } = respdata;
        if (estatus && emessage) {
          const foundObject = data.find(item => item.id === show_group);
          setGroup(foundObject);
        }
      },
      resturls.getAllGroupDetails,
      {},
      'GET'
    );
  }, []);

  console.log(isEditingEnable, 'isEditingEnable');

  return (
    <>
      {isEditingEnable ? (
        <CreateGroupForm group={group} isEditingEnable={isEditingEnable} />
      ) : (
        <>
          <ContentDevider title="Group Info" />
          <Card variant="outlined">
            <CardContent>
              <Grid container justifyContent="space-between" alignItems="center">
                <Typography variant="h5" gutterBottom>
                  {
                    group?.groupName
                  }
                </Typography>
                <IconButton onClick={() => setIsEditingEnable(true)}>
                  <Edit />
                </IconButton>
              </Grid>
              <Divider />

              <Grid container spacing={2} marginTop={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle1" color="textSecondary">Group Type:</Typography>
                  {
                    <Typography variant="body1">{group?.groupType}</Typography>
                  }
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1" color="textSecondary">Scope:</Typography>
                  {
                    <Typography variant="body1">{group?.groupScope}</Typography>
                  }
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1" color="textSecondary">Active Status:</Typography>
                  {
                    <Typography variant="body1">{group?.activeStatus}</Typography>
                  }
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1" color="textSecondary">Permission:</Typography>
                  {
                    <Typography variant="body1">{group?.userPermission}</Typography>
                  }
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle1" color="textSecondary">Group Description:</Typography>
              {
                <Typography variant="body1" gutterBottom>{group?.groupDescription}</Typography>
              }

              <Typography variant="subtitle1" color="textSecondary">Group Manager:</Typography>
              {
                <Typography variant="body1" gutterBottom>{group?.groupManager}</Typography>
              }
            </CardContent>
          </Card>
        </>
      )}
    </>
  );
}

export default ShowSingleGroupDetailsAndEdit;


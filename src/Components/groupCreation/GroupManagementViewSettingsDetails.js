// // import React, { useEffect, useState } from "react";
// // import { resturls } from "../../global/utils/apiurls";
// // import GlobalService from "../../services/GlobalService";
// // import {
// //   DataGrid,
// //   GridRowEditStopReasons,
// // } from '@mui/x-data-grid';
// // import { useHistory, useRouteMatch } from "react-router-dom";
// // import {
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   Paper,
// //   Button,
// //   Box,
// //   Skeleton,
// // } from '@mui/material';
// // import DefaultLoader from "../../global/commonComponents/DefaultLoader";
// // import UserDetailsAndEdit from "./UserDetailsAndEdit";

// // export default function UserManagmentTable(props) {
// //   const history = useHistory();
// //   const { path } = useRouteMatch();
// //   const [users, setUsers] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [defaultLoader, setDefaultLoader] = useState(true);
// //   const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);

// //   const headerData = [
// //     {
// //       field: 'firstName',
// //       headerName: 'First Name',
// //       width: 220,
// //       renderCell: (params) => {
// //         return (
// //           <div
// //             style={{ cursor: 'pointer', color: 'blue' }}
// //             onClick={() => history.push(`/request-service/general-service/${params.row.requestType}?update=${params.id}`)
// //             }
// //           >
// //             {console.log(params)}
// //             {params.row.firstName}
// //           </div >
// //         );
// //       },
// //     },
// //     { field: 'lastName	', headerName: 'Last Name', width: 250 },
// //     { field: 'openedDate', headerName: 'Opened Date', width: 250 },
// //     // { field: 'Catalog', headerName: 'Catalog', width: 120 },
// //     { field: 'approvalStatus', headerName: 'Approval Status', width: 250 },
// //     { field: 'requestType', headerName: 'Request Type', width: 250 },
// //   ];

// //   const processRowUpdate = (newItem) => {
// //     const updatedRow = { ...newItem, isNew: false };
// //     // props.setRequestData(requestDetails.map((item) => (item.id === newItem.id ? updatedRow : requestDetails)));
// //     return updatedRow;
// //   };

// //   const getAllUserDetails = () => {
// //     // setLoading(true);
// //     setDefaultLoader(true)
// //     GlobalService.generalSelect(
// //       (respdata) => {
// //         setUsers(respdata);
// //         setDefaultLoader(false)
// //         setTimeout(() => {
// //           setLoading(false);
// //         }, 2000)
// //       },
// //       resturls.getUserDetails,
// //       {},
// //       'GET'
// //     );
// //   };

// //   useEffect(() => {
// //     getAllUserDetails();
// //   }, [isCreateUserOpen]);

// //   const handleCreateUser = () => {
// //     setIsCreateUserOpen(!isCreateUserOpen);
// //   };

// //   const skeletonRows = users.length;
// //   return (
// //     <>
// //       {defaultLoader ? <DefaultLoader style={{
// //         position: "absolute",
// //         left: 600,
// //         top: 600,
// //       }} /> : (
// //         <>
// //           {isCreateUserOpen ? (
// //             <UserDetailsAndEdit isCreateUserOpen={setIsCreateUserOpen} setDefaultLoader={setDefaultLoader} DefaultLoaderComp={DefaultLoader} defaultLoader={defaultLoader} />
// //           ) : (
// //             <>
// //               <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
// //                 <Button variant="contained" color="primary" onClick={() => history.push(`${path}/createUser`)}>
// //                   Create User
// //                 </Button>
// //               </Box>

// //               {/* <TableContainer component={Paper}>
// //                 <Table sx={{ minWidth: 650 }} aria-label="user table">
// //                   <TableHead>
// //                     <TableRow sx={{ backgroundColor: '#1976d2' }}>
// //                       <TableCell sx={{ color: 'white' }}>ID</TableCell>
// //                       <TableCell sx={{ color: 'white' }}>First Name</TableCell>
// //                       <TableCell sx={{ color: 'white' }}>Last Name</TableCell>
// //                       <TableCell sx={{ color: 'white' }}>Email</TableCell>
// //                       <TableCell sx={{ color: 'white' }}>Company</TableCell>
// //                       <TableCell sx={{ color: 'white' }}>Department</TableCell>
// //                       <TableCell sx={{ color: 'white' }}>Manager</TableCell>
// //                       <TableCell sx={{ color: 'white' }}>Location</TableCell>
// //                       <TableCell sx={{ color: 'white' }}>Role</TableCell>
// //                       <TableCell sx={{ color: 'white' }}>Mobile Number</TableCell>
// //                       <TableCell sx={{ color: 'white' }}>Status</TableCell>
// //                     </TableRow>
// //                   </TableHead>
// //                   <TableBody>
// //                     {loading
// //                       ? Array.from(new Array(skeletonRows)).map((_, index) => (
// //                         <TableRow key={index}>
// //                           <TableCell>
// //                             <Skeleton variant="text" />
// //                           </TableCell>
// //                           <TableCell>
// //                             <Skeleton variant="text" />
// //                           </TableCell>
// //                           <TableCell>
// //                             <Skeleton variant="text" />
// //                           </TableCell>
// //                           <TableCell>
// //                             <Skeleton variant="text" />
// //                           </TableCell>
// //                           <TableCell>
// //                             <Skeleton variant="text" />
// //                           </TableCell>
// //                           <TableCell>
// //                             <Skeleton variant="text" />
// //                           </TableCell>
// //                           <TableCell>
// //                             <Skeleton variant="text" />
// //                           </TableCell>
// //                           <TableCell>
// //                             <Skeleton variant="text" />
// //                           </TableCell>
// //                           <TableCell>
// //                             <Skeleton variant="text" />
// //                           </TableCell>
// //                           <TableCell>
// //                             <Skeleton variant="text" />
// //                           </TableCell>
// //                         </TableRow>
// //                       ))
// //                       : users.map((user) => (
// //                         <TableRow key={user.id} onClick={() => history.push(`${path}/userUpdate/${user.id}`)}>
// //                           <TableCell>{user.id}</TableCell>
// //                           <TableCell>{user.firstName}</TableCell>
// //                           <TableCell>{user.lastName}</TableCell>
// //                           <TableCell>{user.emailAddress}</TableCell>
// //                           <TableCell>{user.company}</TableCell>
// //                           <TableCell>{user.department}</TableCell>
// //                           <TableCell>{user.manager}</TableCell>
// //                           <TableCell>{user.userBranch}</TableCell>
// //                           <TableCell>{user.userRole}</TableCell>
// //                           <TableCell>{user.mobileNumber}</TableCell>
// //                           <TableCell>{user.loggedInStatus || "offline"}</TableCell>
// //                         </TableRow>
// //                       ))}
// //                   </TableBody>
// //                 </Table>
// //               </TableContainer> */}
// //               {console.log(users, 'users')}
// //               <DataGrid
// //                 rows={users}
// //                 editMode='row'
// //                 getRowId={(row) => row.id}
// //                 columns={headerData}
// //                 // isRowSelected: (id: GridRowId) => boolean
// //                 processRowUpdate={processRowUpdate}
// //                 initialState={{
// //                   pagination: {
// //                     paginationModel: { page: 0, pageSize: 10 },
// //                   },
// //                 }}
// //                 sx={{
// //                   '& .MuiDataGrid-columnHeaders': {
// //                     backgroundColor: '#e600e6 !important',
// //                   },
// //                   '& .MuiDataGrid-columnHeader': {
// //                     backgroundColor: '#bfbfbf',
// //                     color: "white"
// //                   },
// //                 }}
// //                 pageSizeOptions={[10]}
// //               // checkboxSelection={true}
// //               // onCellClick={handleCellClick}
// //               />
// //             </>
// //           )}
// //         </>
// //       )}
// //     </>
// //   );
// // }
// import React, { useEffect, useState } from "react";
// import { DataGrid, renderActionsCell } from '@mui/x-data-grid';
// import { useHistory, useRouteMatch } from "react-router-dom";
// import { Button, Box } from '@mui/material';
// import DefaultLoader from "../../global/commonComponents/DefaultLoader";
// import GlobalService from "../../services/GlobalService";
// import { resturls } from "../../global/utils/apiurls";
// import UserDetailsAndEdit from "./UserDetailsAndEdit";

// export default function UserManagmentTable() {
//   const history = useHistory();
//   const { path } = useRouteMatch();
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);

//   const headerData = [
//     {
//       field: 'firstName', headerName: 'First Name', width: 150,
//       renderCell: (params) => {
//         return (
//           <div
//             style={{ cursor: 'pointer', color: 'blue' }}
//             onClick={() => history.push(`${path}/userUpdate/${params.row.id}`)
//             }
//           >
//             {params.row.firstName}
//           </div >
//         );
//       },
//     },
//     { field: 'lastName', headerName: 'Last Name', width: 150 },
//     { field: 'emailAddress', headerName: 'Email', width: 250 },
//     { field: 'company', headerName: 'Company', width: 200 },
//     { field: 'department', headerName: 'Department', width: 200 },
//     { field: 'manager', headerName: 'Manager', width: 150 },
//     { field: 'userBranch', headerName: 'Location', width: 150 },
//     { field: 'userRole', headerName: 'Role', width: 120 },
//     { field: 'mobileNumber', headerName: 'Mobile Number', width: 150 },
//     { field: 'active', headerName: 'Status', width: 100, renderCell: (params) => (params.value ? 'Active' : 'Inactive') },
//   ];

//   const processRowUpdate = (newRow) => ({ ...newRow, isNew: false });

//   const getAllUserDetails = () => {
//     GlobalService.generalSelect(
//       (respdata) => {
//         setUsers(respdata);
//         setLoading(false);
//       },
//       resturls.getUserDetails,
//       {},
//       'GET'
//     );
//   };

//   useEffect(() => {
//     getAllUserDetails();
//   }, [isCreateUserOpen]);

//   return (
//     <>
//       {loading ? <DefaultLoader /> : (
//         <>
//           {isCreateUserOpen ? (
//             <UserDetailsAndEdit isCreateUserOpen={setIsCreateUserOpen} />
//           ) : (
//             <>
//               <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
//                 <Button variant="contained" color="primary" onClick={() => history.push(`${path}/createUser`)}>
//                   Create User
//                 </Button>
//               </Box>

//               <DataGrid
//                 rows={users}
//                 columns={headerData}
//                 getRowId={(row) => row.id}
//                 pageSizeOptions={[10]}
//                 editMode="row"
//                 processRowUpdate={processRowUpdate}
//                 checkboxSelection={true}
//                 initialState={{
//                   pagination: { paginationModel: { page: 0, pageSize: 10 } },
//                 }}
//                 sx={{
//                   '& .MuiDataGrid-columnHeaders': {
//                     backgroundColor: '#e600e6 !important',
//                   },
//                   '& .MuiDataGrid-columnHeader': {
//                     backgroundColor: '#bfbfbf',
//                     color: "white"
//                   },
//                 }}
//               />
//             </>
//           )}
//         </>
//       )}
//     </>
//   );
// }
// import React, { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
// import { useDemoData } from '@mui/x-data-grid-generator';
import { useHistory, useRouteMatch } from "react-router-dom";
import { Button, Box, FormControlLabel, Modal } from '@mui/material';
import DefaultLoader from "../../global/commonComponents/DefaultLoader";
import GlobalService from "../../services/GlobalService";
// import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { resturls } from "../../global/utils/apiurls";
// import UserDetailsAndEdit from "./UserDetailsAndEdit";
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import ManagementUserList from './ManagementUserList';
// import ActiveDirectoryUserList from './ActiveDirectoryUserList';
import GroupMemberList from './GroupMemberList';
import GroupAdminList from './GroupAdminList';
import CreateGroupForm from './CreateGroupForm';
import ChildGroupList from './ChildGroupList';

export default function GroupManagementViewSettingsDetails(props) {
  const { userData, setSelectedUserRows, isKeywordPresent, editDetails, edit, org_id, groupId, groupAdminData, childGroups } = props;
  // const [selectedChildGroup, setSelectedChildGroup] = React.useState({});
  // console.log(selectedChildGroup, 'selectedChildGroup');
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', marginTop: '2em', borderRadius: '0.3em', background: 'linear-gradient(89.34deg, #E41670 0.56%, #622098 99.44%)' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs sx={{ color: 'white' }} value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab sx={{ color: 'white' }} label="Group Members" {...a11yProps(0)} />
          <Tab sx={{ color: 'white' }} label="Group Admins" {...a11yProps(1)} />
          {edit && <Tab sx={{ color: 'white' }} label="Add Child Group" {...a11yProps(2)} />}
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <GroupMemberList
          edit={edit}
          userData={userData}
          setSelectedUserRows={setSelectedUserRows}
          isKeywordPresent={isKeywordPresent}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <GroupAdminList
          edit={edit}
          userData={groupAdminData}
          setSelectedUserRows={setSelectedUserRows}
          isKeywordPresent={isKeywordPresent}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {/* {(isKeywordPresent) ? (
          <div style={{ background: 'white', borderRadius: '0.4em' }} >
            <CreateGroupForm
              groupId={groupId}
              organizationId={org_id}
              edit={edit}
              userData={userData}
              setSelectedUserRows={setSelectedUserRows}
            />
            <Modal open >
              <CreateGroupForm
                groupId={groupId}
                organizationId={org_id}
                edit={edit}
                userData={userData}
                setSelectedUserRows={setSelectedUserRows}
              />
            </Modal>
            <Modal
              open={editDetails}
              onClose
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description">
              <Box sx={style}>
                <CreateGroupForm selectedChildGroup={selectedChildGroup} />
              </Box>
            </Modal>
          </div>
        ) : (
          <ChildGroupList
            edit={edit}
            userData={childGroups}
            setSelectedUserRows={setSelectedUserRows}
            setSelectedChildGroup={setSelectedChildGroup}
          />
        )} */}
        <ChildGroupList
          edit={edit}
          userData={childGroups}
          setSelectedUserRows={setSelectedUserRows}
          editDetails={editDetails}
          isKeywordPresent={isKeywordPresent}
        // setSelectedChildGroup={setSelectedChildGroup}
        />
      </CustomTabPanel>
    </Box>
  );
}

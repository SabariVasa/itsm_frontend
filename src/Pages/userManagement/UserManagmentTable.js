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
import { Button, Box, FormControlLabel } from '@mui/material';
import DefaultLoader from "../../global/commonComponents/DefaultLoader";
import GlobalService from "../../services/GlobalService";
// import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { resturls } from "../../global/utils/apiurls";
import UserDetailsAndEdit from "./UserDetailsAndEdit";
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ManagementUserList from './ManagementUserList';
import ActiveDirectoryUserList from './ActiveDirectoryUserList';

export default function UserManagmentTable(props) {
  const { userData, setSelectedUserRows } = props;
  // const history = useHistory();
  // const { path } = useRouteMatch();
  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  // // const [selectedRows, setSelectedRows] = useState([]);
  // const [selectedRowIds, setSelectedRowIds] = useState([]); // Store selected IDs
  // const [selectedRows, setSelectedRows] = useState([]);
  // const [checkboxSelection, setCheckboxSelection] = useState(true);

  // const headerData = [
  //   {
  //     field: 'firstName', headerName: 'First Name', width: 150,
  //     renderCell: (params) => (
  //       <div
  //         style={{ cursor: 'pointer', color: 'blue' }}
  //         onClick={() => history.push(`${path}/userUpdate/${params.row.id}`)}
  //       >
  //         {params.row.firstName}
  //       </div>
  //     ),
  //   },
  //   { field: 'lastName', headerName: 'Last Name', width: 150 },
  //   { field: 'emailAddress', headerName: 'Email', width: 250 },
  //   { field: 'company', headerName: 'Company', width: 200 },
  //   { field: 'department', headerName: 'Department', width: 200 },
  //   { field: 'manager', headerName: 'Manager', width: 150 },
  //   { field: 'userBranch', headerName: 'Location', width: 150 },
  //   { field: 'userRole', headerName: 'Role', width: 120 },
  //   { field: 'mobileNumber', headerName: 'Mobile Number', width: 150 },
  //   { field: 'active', headerName: 'Status', width: 100, renderCell: (params) => (params.value ? 'Active' : 'Inactive') },
  // ];

  // const processRowUpdate = (newRow) => ({ ...newRow, isNew: false });

  // const getAllUserDetails = () => {
  //   if (!userData) {
  //     GlobalService.generalSelect(
  //       (respdata) => {
  //         setUsers(respdata);
  //         setLoading(false);
  //       },
  //       resturls.getUserDetails,
  //       {},
  //       'GET'
  //     );
  //   } else {
  //     setUsers(userData);
  //     setLoading(false);
  //   }
  // };

  // // const { data } = useDemoData({
  // //   dataSet: 'Commodity',
  // //   rowLength: 10,
  // //   maxColumns: 5,
  // // });


  // useEffect(() => {
  //   getAllUserDetails();
  // }, [isCreateUserOpen]);

  // const handleSelectionModelChange = (newSelection) => {
  //   // Update selectedRowIds
  //   setSelectedRowIds(newSelection);

  //   // Map selected IDs to their corresponding rows
  //   const selectedRowsData = users.filter((user) => newSelection.includes(user.id));
  //   setSelectedRows(selectedRowsData);

  //   // Debugging
  //   console.log("Selected Row IDs:", newSelection);
  //   console.log("Selected Row Data:", selectedRowsData);
  // };

  // // Optional: Get the actual data for selected rows
  // // const selectedUserData = users.filter((user) => selectedRows.includes(user.id));
  // // const selectedRowData = rows.filter((row) => newSelection.includes(row.id));


  // console.log(selectedRows, 'selectedRows');

  // return (
  //   <>
  //     {loading ? <DefaultLoader /> : (
  //       <>
  //         {isCreateUserOpen ? (
  //           <UserDetailsAndEdit isCreateUserOpen={setIsCreateUserOpen} />
  //         ) : (
  //           <>
  //             <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
  //               <Button variant="contained" color="primary" onClick={() => history.push(`${path}/createUser`)}>
  //                 Create User
  //               </Button>
  //             </Box>
  //             <Box sx={{ mb: 1 }}>
  //               <FormControlLabel
  //                 label="checkboxSelection"
  //                 control={
  //                   <Switch
  //                     checked={checkboxSelection}
  //                     onChange={(event) => setCheckboxSelection(event.target.checked)}
  //                   />
  //                 }
  //               />
  //             </Box>
  //             <DataGrid
  //               rows={users}
  //               columns={headerData}
  //               getRowId={(row) => row.id}
  //               pageSizeOptions={[10]}
  //               editMode="row"
  //               processRowUpdate={processRowUpdate}
  //               disableRowSelectionOnClick
  //               checkboxSelection={checkboxSelection}
  //               onSelectionModelChange={(newSelection) => handleSelectionModelChange(newSelection)}
  //               selectionModel={selectedRowIds}
  //               initialState={{
  //                 pagination: { paginationModel: { page: 0, pageSize: 10 } },
  //               }}
  //               sx={{
  //                 '& .MuiDataGrid-columnHeaders': {
  //                   backgroundColor: '#f0f0f0',
  //                 },
  //                 '& .MuiDataGrid-columnHeader': {
  //                   backgroundColor: '#1976d2',
  //                   color: 'white',
  //                 },
  //                 '& .MuiDataGrid-row--borderBottom': {
  //                   borderBottom: '2px solid #cccccc',
  //                 },
  //               }}
  //             />
  //           </>
  //         )}
  //       </>
  //     )}
  //   </>
  // );
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
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Manual Users" {...a11yProps(0)} />
          <Tab label="Active Directory Users" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ManagementUserList userData={userData} setSelectedUserRows={setSelectedUserRows} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ActiveDirectoryUserList userData={userData} setSelectedUserRows={setSelectedUserRows} />
      </CustomTabPanel>
    </Box>
  );
}

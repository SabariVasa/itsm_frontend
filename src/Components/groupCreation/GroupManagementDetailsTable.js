
// import React, { useEffect, useState } from "react";
// import { useHistory, useRouteMatch } from "react-router-dom";
// import { resturls } from "../../global/utils/apiurls";
// import GlobalService from "../../services/GlobalService";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Box,
//   Skeleton,
//   Autocomplete,
//   TextField,
// } from '@mui/material';
// import { DataGrid } from "@mui/x-data-grid";

// export default function GroupManagementDetailsTable(props) {
//   const history = useHistory();
//   const { path } = useRouteMatch();
//   console.log(path, 'path');
//   const [group, setGroup] = useState([]);
//   const [orgUnits, setOrgUnits] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [checkboxSelection, setCheckboxSelection] = useState(true);
//   const [SelectedOrgId, setSelectedOrgId] = useState([])

//   const getAllGroupDetails = () => {
//     setLoading(true);
//     GlobalService.generalSelect(
//       (respdata) => {
//         const { estatus, emessage, data } = respdata;
//         if (estatus && emessage) {
//           setGroup(data);
//           setTimeout(() => {
//             setLoading(false);
//           }, 2000);
//         }
//       },
//       resturls.getAllGroupDetails,
//       {},
//       'GET'
//     );
//   };

//   const FetchAllOrganizations = () => {
//     GlobalService.generalSelect((respData) => {
//       const { estatus, emessage, data } = respData;
//       if (estatus && emessage) {
//         const orgNames = data
//         .filter(org => org.organizationName	)
//         .map(org => org.organizationName);
//         setOrgUnits(orgNames);

//       }
//     }, resturls.FetchAllOrganizations, {}, 'GET')
//   }

//   useEffect(() => {
//     FetchAllOrganizations()
//   }, []);

//   console.log(orgUnits, 'orgUnits');

//   const headerData = [
//     {
//       field: 'groupName', headerName: 'Group Name', width: 180,
//       renderCell: (params) => (
//         <div
//           style={{ cursor: 'pointer', color: 'blue' }}
//           onClick={() => history.push(`${path}/userUpdate/${params.row.id}`)}
//         >
//           {params.row.groupName}
//         </div>
//       ),
//     },

//     { field: 'groupDescription', headerName: 'Group Description', width: 250 },
//     { field: 'groupType', headerName: 'Group Type', width: 150 },
//     { field: 'groupManager', headerName: 'Group Manager', width: 150 },
//     { field: 'groupScope', headerName: 'Group Scope', width: 150 },
//     { field: 'userPermission', headerName: 'User Permission', width: 180 },
//     {
//       field: 'activeStatus',
//       headerName: 'Active Status',
//       width: 150,
//       renderCell: (params) => (params.value ? 'Active' : 'Inactive')
//     },
//   ];

//   const processRowUpdate = (newRow) => ({ ...newRow, isNew: false });

//   // useEffect(() => {
//   //   getAllGroupDetails();
//   // }, []);

//   const handleCreateUser = () => {
//     history.push(`${path}/createDep`);
//   };

//   const skeletonRows = group.length;

//   const handleSelectionModelChange = (selection) => {
//     setSelectedRows(selection);
//   };

//   return (
//     <div style={{ margin: '2em' }}>
//       <Box>
//         <Autocomplete
//           options={orgUnits}
//           getOptionLabel={(option) => option}
//           isOptionEqualToValue={(option, value) => option === value || value === ""}
//           renderInput={(params) => (
//             <TextField
//               {...params}
//               label="Organizations"
//             // fullWidth
//             />
//           )}
//           value={SelectedOrgId}
//           onChange={(event, value) => { setSelectedOrgId(value); getAllGroupDetails(value) }}
//         />
//       </Box>

//       <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
//         <Button variant="contained" color="primary" onClick={() => history.push(`${path}/createDep`)}>
//           Create New Department
//         </Button>
//       </Box>
//       {/* <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }} aria-label="user table">
//           <TableHead>
//             <TableRow sx={{ backgroundColor: '#1976d2' }}>
//               <TableCell>Group Name</TableCell>
//               <TableCell>Group Description</TableCell>
//               <TableCell>Group Type</TableCell>
//               <TableCell>Group Manager</TableCell>
//               <TableCell>Group Scope</TableCell>
//               <TableCell>User Permission</TableCell>
//               <TableCell>Active Status</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading
//               ? Array.from(new Array(skeletonRows)).map((_, index) => (
//                 <TableRow key={index}>
//                   <TableCell><Skeleton variant="text" /></TableCell>
//                   <TableCell><Skeleton variant="text" /></TableCell>
//                   <TableCell><Skeleton variant="text" /></TableCell>
//                   <TableCell><Skeleton variant="text" /></TableCell>
//                   <TableCell><Skeleton variant="text" /></TableCell>
//                   <TableCell><Skeleton variant="text" /></TableCell>
//                   <TableCell><Skeleton variant="text" /></TableCell>
//                 </TableRow>
//               ))
//               : group.map((group) => (
//                 <TableRow key={group.id}>
//                   <TableCell onClick={() => history.push(`superAdmin/${group.id}`)}>{group.groupName}</TableCell>
//                   <TableCell>{group.groupDescription}</TableCell>
//                   <TableCell>{group.groupType}</TableCell>
//                   <TableCell>{group.groupManager}</TableCell>
//                   <TableCell>{group.groupScope}</TableCell>
//                   <TableCell>{group.userPermission}</TableCell>
//                   <TableCell>{group.activeStatus}</TableCell>
//                 </TableRow>
//               ))}
//           </TableBody>
//         </Table>
//       </TableContainer> */}
//       <DataGrid
//         rows={group}
//         columns={headerData}
//         getRowId={(row) => row.id}
//         pageSizeOptions={[10]}
//         editMode="row"
//         processRowUpdate={processRowUpdate}
//         checkboxSelection={checkboxSelection}
//         onSelectionModelChange={handleSelectionModelChange}
//         initialState={{
//           pagination: { paginationModel: { page: 0, pageSize: 10 } },
//         }}
//         sx={{
//           '& .MuiDataGrid-columnHeaders': {
//             backgroundColor: '#f0f0f0',
//           },
//           '& .MuiDataGrid-columnHeader': {
//             backgroundColor: '#1976d2',
//             color: 'white',
//           },
//           '& .MuiDataGrid-row--borderBottom': {
//             borderBottom: '2px solid #cccccc',
//           },
//         }}
//       />
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { resturls } from "../../global/utils/apiurls";
import GlobalService from "../../services/GlobalService";
import {
  Box,
  Button,
  Autocomplete,
  TextField,
} from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import UserInfo from "../../models/UserInfo";
// import UserInfo from '../models/UserInfo';

export default function GroupManagementDetailsTable(props) {
  const history = useHistory();
  const { path } = useRouteMatch();
  const userDetails = UserInfo.getUserDetail();

  const [group, setGroup] = useState([]);
  const [orgUnits, setOrgUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [checkboxSelection, setCheckboxSelection] = useState(true);
  const [selectedOrgId, setSelectedOrgId] = useState(null);

  const pathname = window.location.pathname;
  const lastName = pathname.split('/').filter(Boolean).pop();

  const getAllGroupDetails = (organizationId) => {
    console.log(organizationId, 'organizationId');
    setLoading(true);
    GlobalService.generalSelect(
      (respdata) => {
        const { estatus, emessage, data } = respdata;
        if (estatus && emessage) {
          setGroup(data);
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        }
      },
      `${resturls.FetchGroupDetails}/${organizationId}`,
      {},
      'GET'
    );
  };

  const fetchAllOrganizations = () => {
    GlobalService.generalSelect((respData) => {
      const { estatus, emessage, data } = respData;
      if (estatus && emessage) {
        const orgNames = data.map(org => ({
          label: org.organizationName,
          id: org.organizationId
        }));
        setOrgUnits(orgNames);
      }
    }, resturls.FetchAllOrganizations, {}, 'GET');
  };

  useEffect(() => {

    if (lastName !== 'superadmin') {
      GlobalService.generalSelect((respData) => {
        const { estatus, emessage, data } = respData;
        if (estatus && emessage) {
          console.log(respData, 'fetchGroups');
          setGroup(data);
        }
      }, `${resturls.fetchGroups}/${userDetails.id}`, {}, 'GET');
      setSelectedOrgId(userDetails.organization_id);
    } else {
      fetchAllOrganizations()
    }
  }, []);

  const headerData = [
    {
      field: 'groupName', headerName: 'Group Name', width: 180,
      renderCell: (params) => (
        <div
          style={{ cursor: 'pointer', color: 'blue' }}
          onClick={() => history.push(`${path}/show_group/${params.row.id}/${selectedOrgId.id}`)}
        >
          {params.row.groupName}
        </div>
      ),
    },
    { field: 'groupDescription', headerName: 'Group Description', width: 250 },
    { field: 'groupType', headerName: 'Group Type', width: 150 },
    { field: 'groupManager', headerName: 'Group Manager', width: 150 },
    { field: 'groupScope', headerName: 'Group Scope', width: 150 },
    { field: 'userPermission', headerName: 'User Permission', width: 180 },
    {
      field: 'activeStatus',
      headerName: 'Active Status',
      width: 150,
      renderCell: (params) => (params.value ? 'Active' : 'Inactive')
    },
  ];

  const processRowUpdate = (newRow) => ({ ...newRow, isNew: false });

  // const handleSelectionModelChange = (selection) => {
  //   setSelectedRows(selection);
  // };

  // Function to handle the "Create New Group" button click, passing selectedOrgId
  const handleCreateGroup = () => {
    if (selectedOrgId || userDetails.organization_id) {
      history.push(`${path}/createDep/${selectedOrgId.id || userDetails.organization_id}`);
    }
  };

  return (
    <div style={{ margin: '2em' }}>
      <Box mb={2}>
        {console.log(lastName, 'lastName')}
        {lastName === 'superadmin' &&
          <Autocomplete
            options={orgUnits}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Organization"
              />
            )}
            value={selectedOrgId}
            sx={{ width: '30%' }}
            onChange={(event, value) => {
              setSelectedOrgId(value);
              getAllGroupDetails(value.id);
            }}
          />
        }
      </Box>
      {(selectedOrgId || lastName !== 'superadmin') && (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px', marginBottom: '10px' }}>
            <Button variant="contained" color="primary" onClick={handleCreateGroup} sx={{ background: 'linear-gradient(270deg, #F51275 0%, #622098 100%) !important' }}>
              Create New Department
            </Button>
          </Box>

          <DataGrid
            rows={group}
            columns={headerData}
            getRowId={(row) => row.id}
            pageSizeOptions={[10]}
            editMode="row"
            processRowUpdate={processRowUpdate}
            // checkboxSelection={checkboxSelection}
            // onSelectionModelChange={handleSelectionModelChange}
            initialState={{
              pagination: { paginationModel: { page: 0, pageSize: 10 } },
            }}
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                '& .MuiDataGrid-row--borderBottom': {
                  background: 'linear-gradient(270deg, #F51275 0%, #622098 100%) !important',
                  color: 'white'
                }
              },
              '& .MuiDataGrid-row--borderBottom': {
                borderBottom: '2px solid #cccccc',
              },
            }}
          />
        </>
      )}
    </div>
  );
}

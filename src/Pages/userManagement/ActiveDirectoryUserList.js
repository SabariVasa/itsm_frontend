import { React, useState, useEffect } from "react";
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

export default function ActiveDirectoryUserList(props) {
  const { userData } = props;
  const history = useHistory();
  const { path } = useRouteMatch();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  // const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowIds, setSelectedRowIds] = useState([]); // Store selected IDs
  const [selectedRows, setSelectedRows] = useState([]);
  const [checkboxSelection, setCheckboxSelection] = useState(true);
  const headerData = [
    { field: 'fullName', headerName: 'Full Name', width: 150, },
    { field: 'emailAddress', headerName: 'Email Address', width: 250 },
    { field: 'samAccountName', headerName: 'sam Account Name', width: 150 },
    { field: 'mobileNumber', headerName: 'Mobile Number', width: 200 },
    { field: 'Office', headerName: 'Offic', width: 150 },
    { field: 'companyName', headerName: 'Company Name', width: 100, renderCell: (params) => (params.value ? 'Active' : 'Inactive') },
    { field: 'manager', headerName: 'Manager', width: 150 },
    { field: 'jobTitle', headerName: 'Job Title', width: 200 },
    { field: 'department', headerName: 'Department', width: 120 },
    { field: 'configId', headerName: 'Config Id', width: 150 },
    { field: 'description', headerName: 'Description', width: 150 },
  ];

  const processRowUpdate = (newRow) => ({ ...newRow, isNew: false });

  const getAllUserDetails = () => {
    // if (!userData) {
    GlobalService.generalSelect(
      (respdata) => {
        const { data } = respdata
        setUsers(data);
        setLoading(false);
      },
      `${resturls.getAllADUsers}/${'67445fe15c32233143027af4'}`,
      {
      },
      'GET'
    );
  };

  // const { data } = useDemoData({
  //   dataSet: 'Commodity',
  //   rowLength: 10,
  //   maxColumns: 5,
  // });

  console.log(users, 'users');

  useEffect(() => {
    getAllUserDetails();
  }, [isCreateUserOpen]);

  const handleSelectionModelChange = (newSelection) => {
    // Update selectedRowIds
    setSelectedRowIds(newSelection);

    // Map selected IDs to their corresponding rows
    const selectedRowsData = users.filter((user) => newSelection.includes(user.id));
    setSelectedRows(selectedRowsData);

    // Debugging
    console.log("Selected Row IDs:", newSelection);
    console.log("Selected Row Data:", selectedRowsData);
  };

  // Optional: Get the actual data for selected rows
  // const selectedUserData = users.filter((user) => selectedRows.includes(user.id));
  // const selectedRowData = rows.filter((row) => newSelection.includes(row.id));


  console.log(selectedRows, 'selectedRows');

  return (
    <>
      {loading ? <DefaultLoader /> : (
        <>
          {isCreateUserOpen ? (
            <UserDetailsAndEdit isCreateUserOpen={setIsCreateUserOpen} />
          ) : (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                <Button variant="contained" color="primary" onClick={() => history.push(`${path}/createUser`)}>
                  Create User
                </Button>
              </Box>
              <Box sx={{ mb: 1 }}>
                <FormControlLabel
                  label="checkboxSelection"
                  control={
                    <Switch
                      checked={checkboxSelection}
                      onChange={(event) => setCheckboxSelection(event.target.checked)}
                    />
                  }
                />
              </Box>
              <DataGrid
                rows={users}
                columns={headerData}
                getRowId={(row) => row.id}
                pageSizeOptions={[10]}
                editMode="row"
                processRowUpdate={processRowUpdate}
                
                disableRowSelectionOnClick
                onSelectionModelChange={(newSelection) => handleSelectionModelChange(newSelection)}
                selectionModel={selectedRowIds}
                initialState={{
                  pagination: { paginationModel: { page: 0, pageSize: 10 } },
                }}
                sx={{
                  '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: '#f0f0f0',
                  },
                  '& .MuiDataGrid-columnHeader': {
                    backgroundColor: '#1976d2',
                    color: 'white',
                  },
                  '& .MuiDataGrid-row--borderBottom': {
                    borderBottom: '2px solid #cccccc',
                  },
                }}
              />
            </>
          )}
        </>
      )}
    </>
  );
}
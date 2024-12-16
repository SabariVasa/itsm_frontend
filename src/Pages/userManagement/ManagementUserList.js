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

export default function ManagementUserList(props) {
  const { userData, setSelectedUserRows } = props;
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
    {
      field: 'firstName', headerName: 'First Name', width: 150,
      renderCell: (params) => (
        <div
          style={{ cursor: 'pointer', color: 'blue' }}
          onClick={() => history.push(`${path}/userUpdate/${params.row.id}`)}
        >
          {params.row.firstName}
        </div>
      ),
    },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'emailAddress', headerName: 'Email', width: 250 },
    { field: 'company', headerName: 'Company', width: 200 },
    { field: 'department', headerName: 'Department', width: 200 },
    { field: 'manager', headerName: 'Manager', width: 150 },
    { field: 'userBranch', headerName: 'Location', width: 150 },
    { field: 'userRole', headerName: 'Role', width: 120 },
    { field: 'mobileNumber', headerName: 'Mobile Number', width: 150 },
    { field: 'active', headerName: 'Status', width: 100, renderCell: (params) => (params.value ? 'Active' : 'Inactive') },
  ];

  const processRowUpdate = (newRow) => ({ ...newRow, isNew: false });

  const getAllUserDetails = () => {
    if (!userData) {
      GlobalService.generalSelect(
        (respdata) => {
          setUsers(respdata);
          setLoading(false);
        },
        resturls.getUserDetails,
        {},
        'GET'
      );
    } else {
      setUsers(userData);
      setLoading(false);
    }
  };

  // const { data } = useDemoData({
  //   dataSet: 'Commodity',
  //   rowLength: 10,
  //   maxColumns: 5,
  // });


  useEffect(() => {
    getAllUserDetails();
  }, []);

  const handleSelectionModelChange = (newSelection) => {
    console.log(newSelection, "newSelection");

    // Update selectedRowIds: Add or remove ID based on its existence
    setSelectedRowIds((prevIds) => {
      const newId = newSelection.id;
      console.log(prevIds, "prevIds");
      if (prevIds.includes(newId)) {
        // Remove the ID if it exists
        return prevIds.filter((id) => id !== newId);
      } else {
        // Add the ID if it doesn't exist
        return [...prevIds, newId];
      }
    });

    // Update selectedRows: Add or remove row based on its existence
    setSelectedRows((prevRows) => {
      const existingRowIndex = prevRows.findIndex(
        (row) => row.id === newSelection.id
      );
      if (existingRowIndex > -1) {
        // Remove the row if it exists
        return prevRows.filter((row) => row.id !== newSelection.id);
      } else {
        // Add the full row object if it doesn't exist
        return [...prevRows, newSelection.row];
      }
    });

    // Debugging
    console.log("Updated Selected Row IDs:", selectedRowIds);
    console.log("Updated Selected Rows:", selectedRows);
  };


  console.log(selectedRows, 'selectedRows');

  return (
    <>
      {loading ? <DefaultLoader /> : (
        <>
          {isCreateUserOpen ? (
            <UserDetailsAndEdit isCreateUserOpen={setIsCreateUserOpen} />
          ) : (
            <>
              {(!userData || userData === null) &&
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                  <Button variant="contained" color="primary" sx={{ background: 'linear-gradient(270deg, #F51275 0%, #622098 100%) !important' }} onClick={() => history.push(`${path}/createUser`)}>
                    Create User
                  </Button>
                </Box>
              }
              {/* <Box sx={{ mb: 1 }}>
                <FormControlLabel
                  label="checkboxSelection"
                  control={
                    <Switch
                      checked={checkboxSelection}
                      onChange={(event) => setCheckboxSelection(event.target.checked)}
                    />
                  }
                />
              </Box> */}
              <DataGrid
                rows={users}
                columns={headerData}
                getRowId={(row) => row.id}
                pageSizeOptions={[10]}
                editMode="row"
                processRowUpdate={processRowUpdate}
                disableRowSelectionOnClick
                checkboxSelection={!userData && checkboxSelection}
                // onSelectionModelChange={(newSelection, data) => console.log(newSelection, data, 'newSelection1')}
                selectionModel={selectedRowIds}
                onCellClick={(ele) => handleSelectionModelChange(ele)}
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
                  '& .MuiDataGrid-rowHeader': {
                    background: 'linear-gradient(270deg, #F51275 0%, #622098 100%)',
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

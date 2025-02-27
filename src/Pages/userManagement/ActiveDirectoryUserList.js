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
import { useTheme } from "../../global/commonComponents/ThemeContext";

export default function ActiveDirectoryUserList(props) {
  const { userData } = props;
  const history = useHistory();
  const { path } = useRouteMatch();
  const [users, setUsers] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  // const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowIds, setSelectedRowIds] = useState([]); // Store selected IDs
  const [selectedRows, setSelectedRows] = useState([]);
  const [checkboxSelection, setCheckboxSelection] = useState(true);
  const { theme } = useTheme();
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

  const getDynamicHeaders = (userData) => {
    if (!userData || userData.length === 0) return [];
    console.log(userData, 'users');
    // Extract keys from the first object in userData
    const keys = Object.keys(userData[0]);
    const excludeFields = ["id", "assignGroup","category","subCategory","service","serviceCategory","configurationItem","impactReason","urgencyReason","createdBy","shortDescription","description"];
  

    // Map keys to column definitions
    const dynamicHeaders = keys
    .filter((key) =>!excludeFields.includes(key))
    .map((key,index) => {
      // Add custom configuration for specific fields if needed
      if (index === 0) {
        return {
          field: key,
          headerName: key
            .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space between camel case
            .replace(/[_]/g, " ") // Replace underscores with spaces
            .toLowerCase() // Convert all to lowercase
            .replace(/\b\w/g, (char) => char.toUpperCase()), // Capitalize first letter of each word
          width: 200,
          renderCell: (params) => (
            <span
              // onClick={() =>
              //   navigate.push(
              //     `${path.replace(
              //       "/incident-list",
              //       ""
              //     )}/update_incident/${params.row.incidentId}`
              //   )
              // }
              style={{
                textDecoration: "underline",
                color: "#1976d2",
                cursor: "pointer",
              }}
            >
              {params.value || "N/A"}
            </span>
          ),
        };
      }
      switch (key) {
        case "firstName":
          return {
            field: key,
            headerName: "First Name",
            width: 150,
          };
        case "lastName":
          return {
            field: key,
            headerName: "Last Name",
            width: 150,
          };
        case "emailAddress":
          return {
            field: key,
            headerName: "Email",
            width: 250,
          };
        case "active":
          return {
            field: key,
            headerName: "Status",
            width: 100,
            renderCell: (params) => (params.value ? "Active" : "Inactive"),
          };
        default:
          return {
            field: key,
            headerName: key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/([_])/g, " ").toUpperCase(),
            width: 150,
          };
      }
    });

    return dynamicHeaders;
  };

  const processRowUpdate = (newRow) => ({ ...newRow, isNew: false });

  const getAllUserDetails = () => {
    // if (!userData) {
    GlobalService.generalSelect(
      (respdata) => {
        const { data } = respdata
        setUsers(data);
        setHeaders(getDynamicHeaders(data));
        setLoading(false);
      },
      `${resturls.getAllADUsers}/${'677e75d9ad7e572e204496f9'}`,
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
              {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
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
              </Box> */}
              {console.log(headers, 'headers')}
              <DataGrid
                rows={users}
                columns={headers}
                getRowId={(row) => row.emailAddress}
                pageSizeOptions={[5]}
                editMode="row"
                processRowUpdate={processRowUpdate}
                checkboxSelection={!userData && checkboxSelection}
                disableRowSelectionOnClick
                onSelectionModelChange={(newSelection) => handleSelectionModelChange(newSelection)}
                selectionModel={selectedRowIds}
                initialState={{
                  pagination: { paginationModel: { page: 0, pageSize: 20 } },
                }}
                sx={{
                  '& .MuiDataGrid-columnHeaders': {
                    '& .MuiDataGrid-row--borderBottom': {
                      background: `${theme.outerBodyColor}`,
                      color: `white`
                    }
                  },
                  '& .MuiDataGrid-rowHeader': {
                    background: `${theme.outerBodyColor}`,
                    color: `${theme.fontColor}`
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
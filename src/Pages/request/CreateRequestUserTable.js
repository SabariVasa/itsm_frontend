import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import GlobalService from "../../services/GlobalService";
import { resturls } from "../../global/utils/apiurls";
import { useTheme } from "../../global/commonComponents/ThemeContext";

export default function CreateRequestUserTable(props) {
  const { setSelectedOpenedUser, userSelecterTableModal, setSelectedRequestForUser, setSelectedAssignedUser } = props
  const [users, setUsers] = useState([]);
  const { theme } = useTheme();
  const headerData = [
    {
      field: 'firstName', headerName: 'First Name', width: 150,
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
  const getAllUserDetails = () => {
    GlobalService.generalSelect(
      (respdata) => {
        setUsers(respdata);
      },
      resturls.getUserDetails,
      {},
      'GET'
    )
  };

  const processRowUpdate = (newRow) => ({ ...newRow, isNew: false });

  useEffect(() => {
    getAllUserDetails();
  }, []);

  return (
    <DataGrid
      rows={users}
      columns={headerData}
      getRowId={(row) => row.id}
      pageSizeOptions={[10]}
      editMode="row"
      processRowUpdate={processRowUpdate}
      disableRowSelectionOnClick
      checkboxSelection
      onCellClick={(ele) => {
        if (userSelecterTableModal === "openedBy") {
          console.log(ele.row, 'openedBy');
          setSelectedOpenedUser(ele.row)
        } else if (userSelecterTableModal === "requestedFor") {
          setSelectedRequestForUser(ele.row);
        } else if (userSelecterTableModal === "assignedTo") {
          setSelectedAssignedUser(ele.row)
        }
      }}
      initialState={{
        pagination: { paginationModel: { page: 0, pageSize: 10 } },
      }}
      sx={{
        '& .MuiDataGrid-columnHeaders': {
          '& .MuiDataGrid-row--borderBottom': {
            background: `${theme.outerBodyColor}`,
            color: `${theme.fontColor}`,
          }
        },
        '& .MuiDataGrid-rowHeader': {
          background: `${theme.outerBodyColor}`,
          color: `${theme.fontColor}`,
        },
        '& .MuiDataGrid-row--borderBottom': {
          borderBottom: '2px solid #cccccc',
        },
      }}
    />
  )
}
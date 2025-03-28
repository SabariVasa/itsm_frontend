import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import GlobalService from "../../services/GlobalService";
import { resturls } from "../../global/utils/apiurls";
import { useTheme } from "../../global/commonComponents/ThemeContext";

export default function IncidentManagementUserList(props) {
  const { setRequesterEmail, assignToModal, setAssignToMember, setSelectedCaller = {}, caller } = props;
  const [users, setUsers] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  const { theme } = useTheme();

  const getDynamicHeaders = (userData) => {
    if (!userData || userData.length === 0) return [];

    // Extract keys from the first object in userData
    const keys = Object.keys(userData[0]);

    // Map keys to column definitions
    const dynamicHeaders = keys.map((key) => {
      // Add custom configuration for specific fields if needed
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

  // const getAllUserDetails = () => {
  //   setUsers(userData);
  //   setHeaders(getDynamicHeaders());
  //   setLoading(false);
  // };

  const getAllUserDetails = () => {
    // setUsers(userData);
    GlobalService.generalSelect(
      (respdata) => {
        const { data } = respdata
        setUsers(data);
        setHeaders(getDynamicHeaders(data));
        // setLoading(false);
        setLoading(false);
      },
      `${resturls.getAllADUsers}/${'677e75d9ad7e572e204496f9'}`,
      {},
      'GET'
    );
  };

  // const handleSelectionModelChange = (newSelection) => {
  //   console.log(newSelection, "newSelection");

  //   // Update selectedRowIds: Add or remove ID based on its existence
  //   setSelectedRowIds((prevIds) => {
  //     const newId = newSelection.id;
  //     console.log(prevIds, "prevIds");
  //     if (prevIds.includes(newId)) {
  //       // Remove the ID if it exists
  //       return prevIds.filter((id) => id !== newId);
  //     } else {
  //       // Add the ID if it doesn't exist
  //       return [...prevIds, newId];
  //     }
  //   });
  // }

  useEffect(() => {
    getAllUserDetails();
  }, []);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <DataGrid
          rows={users}
          columns={headers}
          getRowId={(row) => row.emailAddress	}
          pageSizeOptions={[10]}
          disableRowSelectionOnClick
          checkboxSelection
          onCellClick={(ele) => {
            if (assignToModal) {
              setAssignToMember(ele.row)
            } else {
              setSelectedCaller(ele.row);
              setRequesterEmail(ele.row.emailAddress)
              // handleSelectionModelChange(ele);
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
               
                '& .MuiDataGrid-sortIcon': {
              color: 'white', 
            },
            '& .MuiDataGrid-menuIconButton': {
              color: 'white !important', 
            },

              }
            },
            '& .MuiDataGrid-row--borderBottom': {
              borderBottom: '2px solid #cccccc',
            },
          }}
        />
      )}
    </>
  );
}

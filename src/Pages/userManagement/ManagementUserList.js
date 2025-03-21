import { React, useState, useEffect, useMemo } from "react";
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
import { useRearrange } from "../../presentation/hooks/rearrange-header";
// import { useRearrange } from "../../presentation/shared/rearrange-header";

export default function ManagementUserList(props) {
  const { userData, setRequesterEmail, assignToModal, setAssignToMember, setSelectedCaller = {}, caller } = props;
  const history = useHistory();
  const { path } = useRouteMatch();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  // const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowIds, setSelectedRowIds] = useState([]); // Store selected IDs
  const [selectedRows, setSelectedRows] = useState([]);
  const { theme } = useTheme();
  const headers = useMemo(() => {
      const excludeFields = ['id']
      const keys = Object.keys(users[0] || {}).filter((key) =>!excludeFields.includes(key));
      const headerkey = {
        firstName: "First Name",
        lastName: "Last Name",
        emailAddress: "Email",
      };
  
      return keys.map((key) => {
        switch (key) {
          case "firstName":
          case "lastName":
          case "emailAddress":
            return {
              field: key,
              headerName: headerkey[key],
              width: 150,
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
              headerName: key
                .replace(/([a-z])([A-Z])/g, "$1 $2")
                .replace(/[_]/g, " ")
                .toUpperCase(),
              width: 150,
            };
        }
      });
    }, [users]);

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

  useEffect(() => {
    getAllUserDetails();
  }, []);

  const handleSelectionModelChange = (newSelection) => {
    console.log(newSelection, "newSelection");
    setSelectedRowIds((prevIds) => {
      const newId = newSelection.id;
      console.log(prevIds, "prevIds");
      if (prevIds.includes(newId)) {
        return prevIds.filter((id) => id !== newId);
      } else {
        return [...prevIds, newId];
      }
    });

    setSelectedRows((prevRows) => {
      const existingRowIndex = prevRows.findIndex(
        (row) => row.id === newSelection.id
      );
      if (existingRowIndex > -1) {
        return prevRows.filter((row) => row.id !== newSelection.id);
      } else {
        return [...prevRows, newSelection.row];
      }
    });
    console.log("Updated Selected Row IDs:", selectedRowIds);
    console.log("Updated Selected Rows:", selectedRows);
  };

  const {resultHeaders, ReArrangeController} = useRearrange({headers});

  return (
    <>
      {loading ? <DefaultLoader /> : (
        <>
          {isCreateUserOpen ? (
            <UserDetailsAndEdit isCreateUserOpen={setIsCreateUserOpen} />
          ) : (
            <>
              {ReArrangeController}
              <DataGrid
                rows={users}
                columns={resultHeaders}
                getRowId={(row) => row.id}
                pageSizeOptions={[10]}
                editMode="row"
                processRowUpdate={processRowUpdate}
                disableRowSelectionOnClick
                selectionModel={selectedRowIds}
                onCellClick={(ele) => {
                  if (assignToModal) {
                    setAssignToMember(ele.row.emailAddress)
                  } else {
                    setSelectedCaller(ele.row);
                    setRequesterEmail(ele.row.emailAddress)
                    handleSelectionModelChange(ele);
                  }
                }}
                initialState={{
                  pagination: { paginationModel: { page: 0, pageSize: 10 } },
                }}
                sx={{
                  '& .MuiDataGrid-columnHeaders': {
                    '& .MuiDataGrid-row--borderBottom': {
                     background: `${theme.outerBodyColor}`,
                     color: "white"
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

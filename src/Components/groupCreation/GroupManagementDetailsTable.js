
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
import { useAuth } from "../../application/modules/auth/hooks/useAuth";
import { useTheme } from "../../global/commonComponents/ThemeContext";

export default function GroupManagementDetailsTable(props) {
  const history = useHistory();
  const { path } = useRouteMatch();
  const { user_auth } = useAuth();

  const [group, setGroup] = useState([]);
  const [orgUnits, setOrgUnits] = useState([]);
  const [selectedOrgId, setSelectedOrgId] = useState(null);

  const pathname = window.location.pathname;
  const lastName = pathname.split('/').filter(Boolean).pop();

  const { theme } = useTheme();

  const getAllGroupDetails = (organizationId) => {
    GlobalService.generalSelect(
      (respdata) => {
        const { estatus, emessage, data } = respdata;
        if (estatus && emessage) {
          setGroup(data);
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
      GlobalService.generalSelect(
        (respData) => {
          const { estatus, emessage, data } = respData;
          if (estatus && emessage) {
            setGroup(data);
          }
        },
        `${resturls.fetchGroups}/${user_auth.userId}`,
        {},
        "GET"
      );
      setSelectedOrgId(user_auth.organization_id);
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
          onClick={() => history.push(`${path}/show_group/${params.row.id}/${selectedOrgId.id || user_auth.organization_id}`)}
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

  const handleCreateGroup = () => {
    if (selectedOrgId || user_auth.organization_id) {
      history.push(`${path}/createDep/${selectedOrgId.id || user_auth.organization_id}`);
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
            <Button variant="contained" color="primary" onClick={handleCreateGroup} sx={{ background: `${theme.outerBodyColor}`, }}>
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
                  background: `${theme.outerBodyColor}`,
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

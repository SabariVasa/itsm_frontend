import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useMemo, useState } from "react";
import GlobalService from "../../services/GlobalService";
import { resturls } from "../../global/utils/apiurls";
import {
  useHistory,
  useRouteMatch,
} from "react-router-dom/cjs/react-router-dom.min";
import { useTheme } from "../../global/commonComponents/ThemeContext";
import { Skeleton } from "@mui/material";
import { useAuth } from "../../application/modules/auth/hooks/useAuth";

export default function MyIncidentList() {
  const [loading, setLoading] = useState(true);
  const [IncidentData, setIncidentData] = useState([]);
  const { path } = useRouteMatch();
  const { user_auth } = useAuth();
  const navigate = useHistory();
  const { theme } = useTheme();

  const handleCellClick = (params) => {
    navigate.push(`${path}/update_incident/${params.row.incidentId}?noBanner=true`);
  };


  const fetchUserIncident = () => {
    GlobalService.generalSelect(
      (response) => {
        const { estatus, data } = response;
        if (estatus) {
          setIncidentData(data);
          setLoading(false);
        }
      },
      `${resturls.fetchUserIncident}/${user_auth.userId}`, {},
      'GET'
    );
  }

  const headers = useMemo(() => {
    const excludeFields = ["id", "notes", "assignGroup", "category", "subCategory", "service", "serviceCategory", "configurationItem", "impactReason", "urgencyReason", "createdBy", "shortDescription", "description", "callerDepartment", "updatedBy"];
    const dynamicHeaders = Object.keys(IncidentData[0] || {})
      .filter((key) => !excludeFields.includes(key)) // Exclude the 'notes' field
      .map((key, index) => {
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
          case "caller":
          case "callerDepartment":
          case "assignGroup":
          case "assignedTo":
            return {
              field: key,
              headerName: key
                .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space between camel case
                .replace(/[_]/g, " ") // Replace underscores with spaces
                .toLowerCase() // Convert all to lowercase
                .replace(/\b\w/g, (char) => char.toUpperCase()), // Capitalize first letter of each word
              width: 200,
              renderCell: (params) => params.value?.name || "N/A",
            };
          default:
            return {
              field: key,
              headerName: key
                .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space between camel case
                .replace(/[_]/g, " ") // Replace underscores with spaces
                .toLowerCase() // Convert all to lowercase
                .replace(/\b\w/g, (char) => char.toUpperCase()),
              width: 150,
            };
        }
      });
    return dynamicHeaders;
  }, [IncidentData]);

  useEffect(() => {
    fetchUserIncident();
  }, [])

  return (
    <div style={{ margin: '2em' }}>
      {loading ? (
        <Skeleton variant="rectangular" height={600} />
      ) : (
        <DataGrid
          rows={IncidentData}
          columns={headers}
          getRowId={(row) => row.incidentId || row.id}
          onCellClick={handleCellClick}
          pageSizeOptions={[10]}
          disableRowSelectionOnClick
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 10 } },
          }}
          sx={{
            borderRadius: 1,
            '& .MuiDataGrid-columnHeaders': {
              '& .MuiDataGrid-row--borderBottom': {
                background: `${theme.outerBodyColor}`,
                color: `${theme.tableFontColor}`,
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
      )}
    </div>
  );
}
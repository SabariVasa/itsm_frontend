import { useEffect, useLayoutEffect, useState } from "react";
import {
  useHistory,
  useRouteMatch,
} from "react-router-dom/cjs/react-router-dom.min";
import { DataGrid } from "@mui/x-data-grid";
import GlobalService from "../../services/GlobalService";
import { useTheme } from "../../global/commonComponents/ThemeContext";
import { resturls } from "../../global/utils/apiurls";
import { useAuth } from "../../application/modules/auth/hooks/useAuth";
import { Skeleton } from "@mui/material";

export default function IncidentTable() {
  const url = new URL(window.location.href);
  const state = url.searchParams.get("state");

  const { path } = useRouteMatch();
  const navigate = useHistory();

  const { theme } = useTheme();

  const {
    user_auth: { userId, organizationId },
  } = useAuth();

  const [headers, setHeaders] = useState([]);
  const [IncidentData, setIncidentData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleCellClick = (params) => {
    const updatedPath = path.replace("/incident-list", "");
    navigate.push(`${updatedPath}/update_incident/${params.row.incidentId}`);
  };

  const fetchDocuments = async (url) => {
    setLoading(true);
    GlobalService.generalSelect(
      (respdata) => {
        const { data } = respdata;
        setIncidentData(data);
        setLoading(false);
      },
      url,
      {},
      "GET"
    );
  };

  useLayoutEffect(() => {
    if (state === "assign_to_me") {
      fetchDocuments(`${resturls.assignedIncidents}?userId=${userId}`);
    } else if (state === "open") {
      fetchDocuments(`${resturls.openIncidents}?groupId=${organizationId}`);
    } else fetchDocuments(resturls.allIncident);
  }, [state, userId, organizationId]);

  useEffect(() => {
    if (IncidentData?.length > 0) {
      const excludeFields = [
        "id",
        "notes",
        "assignGroup",
        "category",
        "subCategory",
        "service",
        "serviceCategory",
        "configurationItem",
        "impactReason",
        "urgencyReason",
        "createdBy",
        "shortDescription",
        "description",
        "updatedBy",
        "notesUpdateTime",
      ];

      const dynamicHeaders = Object.keys(IncidentData[0])
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
                  onClick={() =>
                    navigate.push(
                      `${path.replace("/incident-list", "")}/update_incident/${
                        params.row.incidentId
                      }`
                    )
                  }
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
      setHeaders(dynamicHeaders);
    }
  }, [IncidentData]);

  return (
    <div style={{ margin: "2em" }}>
      {loading ? (
        <Skeleton variant="rectangular" width="100%" height={140} />
      ) : (
        <DataGrid
          rows={IncidentData}
          columns={headers}
          getRowId={(row) => row.incidentId || row.id}
          onCellClick={handleCellClick}
          pageSizeOptions={[10]}
          disableRowSelectionOnClick
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 20 } },
          }}
          sx={{
            borderRadius: 1,
            "& .MuiDataGrid-columnHeaders": {
              "& .MuiDataGrid-row--borderBottom": {
                background: `${theme.outerBodyColor}`,
                color: "white",
              },
            },
            "& .MuiDataGrid-rowHeader": {
              background: `${theme.outerBodyColor}`,
              color: "white",
            },
            "& .MuiDataGrid-row--borderBottom": {
              borderBottom: "2px solid #cccccc",
            },
          }}
        />
      )}
    </div>
  );
}

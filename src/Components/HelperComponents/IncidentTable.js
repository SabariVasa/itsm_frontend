import { useEffect, useState } from "react";
import {
  useHistory,
  useLocation,
  useRouteMatch,
} from "react-router-dom/cjs/react-router-dom.min";
import { DataGrid } from "@mui/x-data-grid";
import GlobalService from "../../services/GlobalService";
import { useTheme } from "../../global/commonComponents/ThemeContext";
import { resturls } from "../../global/utils/apiurls";
import DefaultLoader from "../../global/commonComponents/DefaultLoader";

export default function     IncidentTable(props) {
  const url = new URL(window.location.href);
  const state = url.searchParams.get('state');
  const location = useLocation();
  const { path } = useRouteMatch();
  const navigate = useHistory();
  const { theme } = useTheme();
  const [headers, setHeaders] = useState([]);
  const [IncidentData, setIncidentData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUrlSegment = () => {
    const segments = location.pathname.split("/");
    const segmentIndex = segments.indexOf("incident-list") + 1;
    return segments[segmentIndex];
  };

  console.log("Sliced URL Segment:", getUrlSegment());

    const handleCellClick = (params) => {
      const updatedPath = path.replace("/incident-list", "");
      navigate.push(`${updatedPath}/update_incident/${params.row.incidentId}`);
    };

  const fetchDocuments = async (url) => {
    setLoading(true);
    GlobalService.generalSelect(
      (respdata) => {
        const { estatus, data } = respdata;
        if (estatus) {
          setIncidentData(data);
        } else {
          setIncidentData(data);
        }
        setLoading(false);
      },
      url,
      {},
      "GET"
    );
  };

  useEffect(() => {
    console.log(state, 'state');
    if (state === "assign_to_me"){
      console.log("assign_to_me");
      fetchDocuments(
        `${resturls.assignedIncidents}?userId=${localStorage.getItem("userId")}`
      );
    } else if (state === "open") {
      console.log("open");
      fetchDocuments(
        `${resturls.openIncidents}?groupId=${localStorage.getItem("groupId")}`
      );
    } else {
      fetchDocuments(`${resturls.allIncident}`);
    }
  }, [state]);

  useEffect(() => {
    if (IncidentData?.length > 0) {
      const excludeFields = ["id","notes", "assignGroup","category","subCategory","service","serviceCategory","configurationItem","impactReason","urgencyReason","createdBy","shortDescription","description","updatedBy","notesUpdateTime"];
  
      const dynamicHeaders = Object.keys(IncidentData[0])
        .filter((key) =>!excludeFields.includes(key)) // Exclude the 'notes' field
        .map((key,index) => {
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
                      `${path.replace(
                        "/incident-list",
                        ""
                      )}/update_incident/${params.row.incidentId}`
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
        <DefaultLoader />
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
                 color: "white"
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

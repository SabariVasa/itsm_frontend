import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useMemo, useState } from "react";
import GlobalService from "../../services/GlobalService";
import { resturls } from "../../global/utils/apiurls";
import { useTheme } from "../../global/commonComponents/ThemeContext";
import {
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import { Skeleton } from "@mui/material";
import { useAuth } from "../../application/modules/auth/hooks/useAuth";
import { useRearrange } from "../../presentation/hooks/rearrange-header";
// import { useRearrange } from "../../presentation/shared/rearrange-header";

export default function MyRequestList({ fromUser = "superadmin" }) {
  const [loading, setLoading] = useState(true);
  const [requestData, setRequestData] = useState([]);
  // const [headers, setHeaders] = useState([]);
  const { theme } = useTheme();
  const { user_auth } = useAuth();

  const navigate = useHistory();

  const getRequestOpenedBy = () => {
    GlobalService.generalSelect(
      (response) => {
        const { estatus, data } = response;
          setRequestData(data);
          setLoading(false);
      },
      `${resturls.getRequestOpenedBy}/${user_auth.userId}`,
      {},
      "GET"
    );
  };

  const headers = useMemo(() => {
    if (!requestData?.length) return [];
  
    const excludeFields = [
      "id",
      "notes",
      "catalogueDetails",
      "categoryDetails",
      "subCategoryDetails",
      "subCategory",
      "priority",
      "serviceCategory",
      "configurationItem",
      "impactReason",
      "urgencyReason",
      "createdBy",
      "requestedFor",
      "updatedBy",
      "requestType",
      "generateFormId",
      "values",
      "dueDate",
    ];
  
    const headerMappings = {
      catalogueDetails: "Status",
      approvalStatus: "Status",
      openedBy: "Opened By",
      assignedTo: "Assigned To",
    };
  
    return Object.keys(requestData[0])
      .filter((key) => !excludeFields.includes(key))
      .map((key, index) => {
        const headerName =
          headerMappings[key] ||
          key
            .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space between camel case
            .replace(/_/g, " ") // Replace underscores with spaces
            .toLowerCase()
            .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
  
        if (index === 0) {
          return {
            field: key,
            headerName,
            width: 200,
            renderCell: (params) => (
              <span
                onClick={() =>
                  navigate.push(
                    `/${fromUser}/server-request/update-request/${params.row.requestNumber}?noBanner=true`
                  )
                }
                className="underline text-blue-600 cursor-pointer"
              >
                {params.value || "N/A"}
              </span>
            ),
          };
        }
  
        if (key === "openedBy" || key === "assignedTo") {
          return {
            field: key,
            headerName,
            width: 200,
            renderCell: (params) => params.value?.name || "N/A",
          };
        }
  
        return {
          field: key,
          headerName,
          width: 150,
        };
      });
  }, [requestData, navigate]);
  
  const {resultHeaders, ReArrangeController} = useRearrange({resultHeaders: headers});

  useEffect(() => {
    getRequestOpenedBy();
  }, []);

  return (
    <div className="p-4">
      {ReArrangeController}
      {loading ? (
        <Skeleton variant="rectangular" height={600} />
      ) : (
        <>
        
        <DataGrid
          rows={requestData}
          columns={resultHeaders}
          getRowId={(row) => row.incidentId || row.id}
          pageSizeOptions={[10]}
          disableRowSelectionOnClick
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 10 } },
          }}
          sx={{
            borderRadius: 1,
            "& .MuiDataGrid-columnHeaders": {
              "& .MuiDataGrid-row--borderBottom": {
                background: `${theme.outerBodyColor}`,
                color: `${theme.tableFontColor}`,
              },
            },
            "& .MuiDataGrid-rowHeader": {
              background: `${theme.outerBodyColor}`,
              color: `${theme.fontColor}`,
            },
            "& .MuiDataGrid-row--borderBottom": {
              borderBottom: "2px solid #cccccc",
            },
          }}
        />
        </>
      )}
    </div>
  );
}
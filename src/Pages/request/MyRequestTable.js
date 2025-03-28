import React, { useState, useEffect, useMemo } from 'react';
import {
  DataGrid,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import { serverAPI } from '../../Utils/Server';
import ReactLoading from 'react-loading';
import DefaultLoader from '../../global/commonComponents/DefaultLoader';
import { resturls } from '../../global/utils/apiurls';
import GlobalService from '../../services/GlobalService';
import { useTheme } from '../../global/commonComponents/ThemeContext';
import {
  useHistory,
  useLocation,
  useRouteMatch,
} from "react-router-dom/cjs/react-router-dom.min";
import { useRearrange } from '../../presentation/hooks/rearrange-header';
// import { useRearrange } from '../../presentation/shared/rearrange-header';
// import { Link } from 'react-router-dom';


export default function MyRequestTable(props) {
  const { selectedRequest } = props;
  const history = useHistory()
  const [requestedData, setRequestedData] = useState([]);
  const [loader, setLoader] = useState(false);

const {theme} = useTheme();

const { path } = useRouteMatch();
const navigate = useHistory();

  // const handleRowEditStop = (params, event) => {
  //   if (params.reason === GridRowEditStopReasons.rowFocusOut) {
  //     event.defaultMuiPrevented = true;
  //   }
  // };
  // const handleDeleteClick = (id) => () => {
  //   console.log(id)
  //   props.setRequestData(props.RequestData.filter((item) => item.ID !== id));
  //   // props.setCounter(parseInt(item.ID[7])+1);  
  // };
  const [rowModesModel, setRowModesModel] = React.useState({});
  function handleDelete(id) {
    console.log("deleted");
    // const filteredItems = props.RequestData.filter(item =>
    //   item.ID === id);
    //   props.setRequestData(filteredItems);
    //   console.log(filteredItems);

  }



  const headers = useMemo(() => {
    if (!requestedData?.length) return [];
  
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
  
    return Object.keys(requestedData[0])
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
                  navigate.push(`update-request/${params.row.requestNumber}`)
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
            width: 200,
            headerName,
            renderCell: (params) => params.value?.name || "N/A",
          };
        }
  
        return {
          field: key,
          headerName,
          width: 150,
        };
      });
  }, [requestedData, navigate]);  

  const handleCellClick = (params) => {
    // const navigate = useHistory();
    const updatedPath = path.replace("/my-request", "");
    console.log(updatedPath, 'updatedPath');
    history.push(`${updatedPath}/update-request/${params.row.requestNumber}`);
  };

  const processRowUpdate = (newItem) => {
    const updatedRow = { ...newItem, isNew: false };
    // props.setRequestData(requestDetails.map((item) => (item.id === newItem.id ? updatedRow : requestDetails)));
    return updatedRow;
  };

  useEffect(() => {
    // const url = selectedRequest === "General requests" ? resturls.allGeneralRequests : resturls.allHardwareRequest
    setLoader(true);
    GlobalService.generalSelect(
      (respdata) => {
        const { data } = respdata;
        if (respdata) {
          setLoader(false);
          setRequestedData(data);
        }
      },
      `${resturls.fetchAllRequestInstance}`,
      {},
      'GET'
    );
  }, [])

  const [loading, setLoading] = useState(true);
  function spinnerLoading(message) {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000)
  }

  const {resultHeaders, ReArrangeController} = useRearrange({headers});

  return (
    <div className='h-[95%] p-[4vh] over-flow'>
      {ReArrangeController}
      {loader ? <DefaultLoader /> : (
        <>
          {loading ? <div className='loading-container'>
            <ReactLoading type={"spinningBubbles"} color={"#e68a00"} height={50} width={100} className='loading-spinner' />
          </div> : null}
          <DataGrid
            rows={requestedData}
            editMode='row'
            getRowId={(row) => row.requestNumber}
            columns={resultHeaders}
            processRowUpdate={processRowUpdate}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                '& .MuiDataGrid-row--borderBottom': {
                  background: `${theme.outerBodyColor}`,
                  color: 'white',
                  '& .MuiDataGrid-sortIcon': {
                    color: 'white', 
                  },
                  '& .MuiDataGrid-menuIconButton': {
                    color: 'white !important', 
                  },

                }
              },
              '& .MuiDataGrid-rowHeader': {
                background: `${theme.outerBodyColor}`,
                color: 'white',
              },
              '& .MuiDataGrid-row--borderBottom': {
                borderBottom: '2px solid #cccccc',
              },



            }}
            pageSizeOptions={[10]}
            onCellClick={handleCellClick}
          />
        </>
      )}
    </div>
  );
}

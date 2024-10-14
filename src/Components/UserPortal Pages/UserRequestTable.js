import React, { useState, useEffect } from 'react';
import {
  DataGrid,
} from '@mui/x-data-grid';
import axios from 'axios';
import { serverAPI } from '../../Utils/Server';
// import DeleteIcon from '@mui/icons-material/Delete';
import ReactLoading from 'react-loading';
// import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';

export default function UserRequestTable(props) {
  const selectedRequest = useSelector((state) => state.requestReducers.selectedRequest);
  const requestDetails = useSelector((state) => state.requestReducers.requestDetails);

  // const [rowModesModel, setRowModesModel] = useState({});
  const [HeaderData, setHeaderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requestedData, setRequestedData] = useState([]);
  const [hardwareData, setHardwareData] = useState([]);

  const GeneralRequestHeaderData = [
    {
      field: 'requestNumber', headerName: 'Request Number', width: 200, renderCell: (params) => {
        if (params.row.requestType) {
          return <a href={`/request-service/general-service/${params.row.requestType}?update=${params.id}`}>{params.id}</a>;
        } else {
          return <a href={`/request_service/hardware?update=${params.id}`}>{params.id}</a>;
        }
      }
    },
    { field: 'requestType', headerName: 'Service Type', renderCell: (params) => params.row && params.row.requestType ? params.row.requestType : 'Hardware Request', width: 200 },
    { field: 'approvalStatus', headerName: 'Status', width: 200 },
    { field: 'priority', headerName: 'Priority', width: 150 },
    // { field: '', headerName: 'Impact', width: 150},
    { field: 'openedDate', headerName: 'Opened Date', width: 200 },
    // { field: '', headerName: 'Request Type', width: 150 },
    // { field: 'Delete', headerName: 'Delete', type: 'actions', width: 200, cellClassName: 'actions', getActions: ({ id }) => {
    //     return [
    //       <GridActionsCellItem
    //         icon={<DeleteIcon />}
    //         label="Edit"
    //         className="textPrimary"
    //         onClick={handleDeleteClick(id)}
    //         color="warning"
    //       />,
    //     ];
    //   }
    // },
  ];

  const handleDeleteClick = (id) => () => {
    console.log(id);
    props.setRequestData(props.RequestData.filter((item) => item.ID !== id));
  };

  const processRowUpdate = (newItem) => {
    const updatedRow = { ...newItem, isNew: false };
    props.setRequestData(requestDetails.map((item) => (item.id === newItem.id ? updatedRow : requestDetails)));
    return updatedRow;
  };

  // Fetch incident data by email using the API
  async function fetchIncidentsByEmail(email) {
    setLoading(true);
    try {
      const response = await axios.get(`${serverAPI}/getRequestsByOpenedBy/${email}`);
      if (response.data) {
        setRequestedData(response.data.generalRequests);
        setHardwareData(response.data.hardwareRequests);
        setLoading(false);
        console.log(response.data)
      }
    } catch (error) {
      console.error("Error fetching incidents:", error);
      setLoading(false);
    }
  }

  // Fetch data on component mount based on the selected request
  useEffect(() => {
    setHeaderData(GeneralRequestHeaderData);
    fetchIncidentsByEmail(localStorage.getItem("userEmail")); // Replace with actual user email
  }, []);

  const mergedData = [...requestedData, ...hardwareData];
  return (
    <div style={{ height: "95%", marginLeft: 30, marginTop: 20, marginBottom: 30, width: '96%', overflowY: "auto" }}>
      {loading ? (
        <div className='loading-container'>
          <ReactLoading type={"spinningBubbles"} color={"#e68a00"} height={50} width={100} className='loading-spinner' />
        </div>
      ) : (
        <DataGrid
          rows={mergedData}
          editMode='row'
          getRowId={(row) => row.requestNumber}
          columns={HeaderData}
          processRowUpdate={processRowUpdate}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#e600e6 !important',
            },
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: '#bfbfbf',
              color: "white"
            },
          }}
          pageSizeOptions={[10]}
          checkboxSelection={true}
        />
      )}
    </div>
  );
}

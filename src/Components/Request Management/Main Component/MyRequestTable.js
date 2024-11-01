import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  DataGrid,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
// import { useParams } from 'react-router-dom';
import axios from 'axios';
import { serverAPI } from '../../../Utils/Server';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { RequestContext } from '../../../Routes/HomeRouter';
import ReactLoading from 'react-loading';
import { resturls } from '../../../global/utils/apiurls';
import GlobalService from '../../../services/GlobalService';
// import CmdbSelectField from '../../HelperComponents/SelectField';
// import { Grid } from '@mui/material';
// import { useSelector } from 'react-redux';
// import { RequestHeaderData,RequestData } from '../../../Utils/Request Data/RequestItemData';


export default function MyRequestTable(props) {
  const { selectedRequest } = props;
  const history = useHistory
  const [requestedData, setRequestedData] = useState([]);
  // const navigate = useNavigate();
  // const{selectedRequest} = useContext(RequestContext);

  // const selectedRequest = useSelector((state) => state.requestReducers.selectedRequest);
  // const requestService = useSelector((state) => state.requestReducers.requestService);
  // const requestDetails = useSelector((state) => state.requestReducers.requestDetails);

  const handleCellClick = (params) => {

  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };



  const handleDeleteClick = (id) => () => {
    console.log(id)
    props.setRequestData(props.RequestData.filter((item) => item.ID !== id));
    // props.setCounter(parseInt(item.ID[7])+1);  
  };




  const [rowModesModel, setRowModesModel] = React.useState({});
  function handleDelete(id) {
    console.log("deleted");
    // const filteredItems = props.RequestData.filter(item =>
    //   item.ID === id);
    //   props.setRequestData(filteredItems);
    //   console.log(filteredItems);

  }


  const processRowUpdate = (newItem) => {
    const updatedRow = { ...newItem, isNew: false };
    // props.setRequestData(requestDetails.map((item) => (item.id === newItem.id ? updatedRow : requestDetails)));
    return updatedRow;
  };
  const RequestHeaderData = [
    {
      field: 'ID', headerName: 'Request ID', width: 170, renderCell: (params) => {
        return <a href={`superadmin/request_service/hardware/${params.id}`}>{params.id}</a>;
      },
    },
    { field: 'requestFor', headerName: 'Request For', width: 180 },
    { field: 'openedBy', headerName: 'Opened By', width: 180 },
    // { field: 'Catalog', headerName: 'Catalog', width: 120 },
    { field: 'approvalStatus', headerName: 'Approval Status', width: 250 },
    { field: 'openedDate', headerName: 'Opened Date', width: 180 },
    // { field: 'Assinged To', headerName: 'Assingned To', width: 130 },
    // { field: 'service', headerName: 'Service', width: 130 },
    // { field: 'Delete', headerName: 'Delete',type: 'actions', width: 150,cellClassName: 'actions',getActions:({id})=>{
    //   return [
    //     <GridActionsCellItem
    //       icon={<DeleteIcon />}
    //       label="Edit"
    //       className="textPrimary"
    //       onClick={handleDeleteClick(id)}
    //       color="warning"
    //       // slotProps={{
    //       //   toolbar: { props.setRequestData, setRowModesModel },
    //       // }}

    //     />,
    //   ]
    // } },
  ];
  const GeneralRequestHeaderData = [
    {
      field: 'requestNumber',
      headerName: 'Request ID',
      width: 220,
      renderCell: (params) => {
        return (
          <div
            style={{ cursor: 'pointer', color: 'blue' }}
            onClick={() => history.push(`/superadmin/request-service/general-service/${params.row.requestNumber}`)}
          >
            {params.row.requestNumber}
          </div>
        );
      },
    },
    { field: 'requesterName', headerName: 'Requester Name', width: 250 },
    { field: 'openedDate', headerName: 'Opened Date', width: 250 },
    // { field: 'Catalog', headerName: 'Catalog', width: 120 },
    { field: 'approvalStatus', headerName: 'Approval Status', width: 250 },
    { field: 'requestType', headerName: 'Request Type', width: 250 },
    // { field: 'Assinged To', headerName: 'Assingned To', width: 130 },
    // { field: 'service', headerName: 'Service', width: 130 },
    // { field: 'Delete', headerName: 'Delete',type: 'actions', width:200,cellClassName: 'actions',getActions:({id})=>{
    //   return [
    //     <GridActionsCellItem
    //       icon={<DeleteIcon />}
    //       label="Edit"
    //       className="textPrimary"
    //       onClick={handleDeleteClick(id)}
    //       color="warning"
    //       // slotProps={{
    //       //   toolbar: { props.setRequestData, setRowModesModel },
    //       // }}
    //     />,
    //   ]
    // } },
  ];

  const [HeaderData, setHeaderData] = useState([]);
  const [tempSelectedRequest, setTempSelectedRequest] = useState();
  useEffect(() => {
    const url = selectedRequest === "General requests" ? resturls.allGeneralRequests : resturls.allHardwareRequest
    GlobalService.generalSelect(
      (respdata) => {
        const { data } = respdata;
        if (respdata) {
          // setRequestNumber(`REQ-GR-24-00000${parseInt(data.responseData) + 1}`)
          setRequestedData(respdata);
          setHeaderData(selectedRequest === "General requests" ? GeneralRequestHeaderData : RequestHeaderData)
        }
      },
      url,
      {},
      'GET'
    );
  }, [selectedRequest])

  const [loading, setLoading] = useState(true);
  function spinnerLoading(message) {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // setNotifyStatus(true);
      // setNotifyMessage(message)
    }, 2000)
  }

  console.log(requestedData, 'requestedData');
  return (
    <div style={{ height: "95%", marginLeft: 30, marginTop: 20, marginBottom: 30, width: '96%', overflowY: "auto" }}>

      {loading ? <div className='loading-container'>
        <ReactLoading type={"spinningBubbles"} color={"#e68a00"} height={50} width={100} className='loading-spinner' />
      </div> : null}
      <DataGrid
        rows={requestedData}
        editMode='row'
        getRowId={(row) => row.requestNumber}
        columns={HeaderData}
        // isRowSelected: (id: GridRowId) => boolean
        processRowUpdate={processRowUpdate}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        sx={{
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#e600e6 !important', // Container for the headers
          },
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: '#bfbfbf',
            color: "white" // Individual header cells
          },
        }}
        pageSizeOptions={[10]}
        checkboxSelection={true}
        onCellClick={handleCellClick}
      />

    </div>
  );
}

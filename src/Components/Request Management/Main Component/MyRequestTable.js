import React, { useState, useEffect } from 'react';
import {
  DataGrid,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import { useHistory, Link } from 'react-router-dom';
import { serverAPI } from '../../../Utils/Server';
import ReactLoading from 'react-loading';
import DefaultLoader from '../../../global/commonComponents/DefaultLoader';
import { resturls } from '../../../global/utils/apiurls';
import GlobalService from '../../../services/GlobalService';
// import { Link } from 'react-router-dom';


export default function MyRequestTable(props) {
  const { selectedRequest } = props;
  const history = useHistory()
  const [requestedData, setRequestedData] = useState([]);
  const [loader, setLoader] = useState(false);

  const handleCellClick = (params) => {
    // history.push("/superadmin/request-service/general-service/details");
    // if (selectedRequest === "General requests") {
    //   history.push("/superadmin/request-service/general-service/details");
    // } else {
    //   history.push(`superadmin/request_service/hardware/${params.id}`)
    // }
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
        return <div style={{ cursor: 'pointer', color: 'blue' }} onClick={() => { history.push(`/request_service/hardware?update=${params.id}`); console.log('working') }}>{params.id}</div>;
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
            onClick={() => history.push(`/request-service/general-service/${params.row.requestType}?update=${params.id}`)
            }
          >
            {params.row.requestNumber}
          </div >
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
    setLoader(true);
    GlobalService.generalSelect(
      (respdata) => {
        const { data } = respdata;
        if (respdata) {
          // setRequestNumber(`REQ-GR-24-00000${parseInt(data.responseData) + 1}`)
          setLoader(false);
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
    }, 2000)
  }

  console.log(requestedData, 'requestedData');
  return (
    <div style={{ height: "95%", marginLeft: 30, marginTop: 20, marginBottom: 30, width: '96%', overflowY: "auto" }}>
      {loader ? <DefaultLoader /> : (
        <>
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
                backgroundColor: '#e600e6 !important',
              },
              '& .MuiDataGrid-columnHeader': {
                backgroundColor: '#bfbfbf',
                color: "white"
              },
            }}
            pageSizeOptions={[10]}
            // checkboxSelection={true}
            onCellClick={handleCellClick}
          />
        </>
      )}
    </div>
  );
}

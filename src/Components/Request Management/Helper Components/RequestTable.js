import React, { useState, useEffect } from 'react';
import {
  // GridRowModes,
  DataGrid,
  // GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { serverAPI } from '../../../Utils/Server';
import DeleteIcon from '@mui/icons-material/Delete';
// import { RequestContext } from '../../../Routes/HomeRouter';
// import { useDispatch, useSelector } from 'react-redux';
import { setRequestDetails } from '../../../Redux state management/Redux Slices/RequestSlice';
// import { RequestHeaderData,RequestData } from '../../../Utils/Request Data/RequestItemData';


export default function RequestTable(props) {
  // const navigate = useNavigate();

  const [tableData, setTableData] = useState([]);

  const handleCellClick = (params) => {

  };
  const { category } = useParams();

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };



  const handleDeleteClick = (id) => () => {
    // Filter out the item with the specified ID from requestDetails
    // const updatedData = requestDetails.filter((item) => item.requestNumber !== id);
    const updatedData = ''
    // Update the Redux store
    // dispatch(setRequestDetails(updatedData));

    // Update the local state if necessary
    setTableData(updatedData);
  };




  const [rowModesModel, setRowModesModel] = React.useState({});
  // const{requestDetails}=useContext(RequestContext)
  // const dispatch = useDispatch();
  // const requestService = useSelector((state) => state.requestReducers.requestService);
  // const requestDetails = useSelector((state) => state.requestReducers.requestDetails);
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
    // setTableData(requestDetails.map((item) => (item.requestNumber === newItem.requestNumber ? updatedRow : requestDetails)));
    return updatedRow;
  };
  const RequestHeaderData = [
    {
      field: 'requestNumber', headerName: 'ID', width: 100, renderCell: (params) => {
        return <a href={`/request_item/${params.id}?itemData=${JSON.stringify(params.row)}&&requestData=${JSON.stringify("REQ02401")}`}>{params.id}</a>;
      },
    },
    { field: 'Quantity', headerName: 'Quantity', width: 100 },
    // { field: 'Catalog', headerName: 'Catalog', width: 120 },
    { field: 'itemName', headerName: 'Item', width: 250 },
    { field: 'cost', headerName: 'Price', width: 130 },
    { field: 'location', headerName: 'Location', width: 180 },
    // { field: 'Assinged To', headerName: 'Assingned To', width: 130 },
    // { field: 'service', headerName: 'Service', width: 130 },
    {
      field: 'Delete', headerName: 'Delete', type: 'actions', width: 100, cellClassName: 'actions', getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleDeleteClick(id)}
            color="warning"
          />,
        ]
      }
    },
  ];

  const [requestedData, setRequestedData] = useState([]);
  const rows = [
    { requestNumber: "RITM001", itemName: "ITM00243 Infinix Pavilion", location: "PO Box 62204", cost: 1508, quantity: null },
    { requestNumber: "RITM002", itemName: "ITM00245 Dell Envy", location: "Room 1461", cost: 562, quantity: null },
  ];

  // useEffect(() => {
  //   // setRequestedData(requestDetails)
  //   // console.log("requestDetails");
  //   // console.log(requestDetails);
  // }, [requestDetails])

  return (
    <div style={{ height: "95%", marginLeft: 30, marginTop: 20, marginBottom: 30, width: '96%', overflowY: "auto" }}>
      <DataGrid
        rows={[]}
        editMode='row'
        getRowId={(row) => row.requestNumber}
        columns={RequestHeaderData}
        // isRowSelected: (id: GridRowId) => boolean
        processRowUpdate={processRowUpdate}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 2 },
          },
        }}

        pageSizeOptions={[2]}
        checkboxSelection={props.enableSelect}
        onCellClick={handleCellClick}
      />
    </div>
  );
}

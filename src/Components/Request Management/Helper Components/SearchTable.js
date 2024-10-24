import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { requestHeaderData } from '../../../Utils/CMDB-Data/CmdbData';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverAPI } from '../../../Utils/Server';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
// import { TextField } from '@mui/material';


const requestData = [
  { "id": "REQ001", "itemId": 17, "itemBrand": "HP", "itemModel": "Pavilion", "modelDescription": "HP 15.6inch Micro-Edge Anti-Glare 15s-Eq2143au", "location": "PO Box 54285", "stockAvailable": 3, "contactPerson": "System Administrator", "deliveryEstimation": 8, "_class": "com.teksiblegroup.ITSMTOOL.Model.DesktopInventoryModel" },
  { "id": "REQ002", "itemId": 17, "itemBrand": "HP", "itemModel": "Pavilion", "modelDescription": "HP 15.6inch Micro-Edge Anti-Glare 15s-Eq2143au", "location": "PO Box 54285", "stockAvailable": 3, "contactPerson": "System Administrator", "deliveryEstimation": 8, "_class": "com.teksiblegroup.ITSMTOOL.Model.DesktopInventoryModel" },
  { "id": "REQ003", "itemId": 17, "itemBrand": "HP", "itemModel": "Pavilion", "modelDescription": "HP 15.6inch Micro-Edge Anti-Glare 15s-Eq2143au", "location": "PO Box 54285", "stockAvailable": 3, "contactPerson": "System Administrator", "deliveryEstimation": 8, "_class": "com.teksiblegroup.ITSMTOOL.Model.DesktopInventoryModel" },
]




export default function SearchTable(props) {
  const navigate = useHistory();
  const [requestData, setRequestData] = useState([]);
  const handleCellClick = (params) => {
    // console.log(params.row.itemCategory);
    // navigate(`/CMDBEditPage/${params.row.itemCategory}/${params.id}`);
    // alert(params.row.id);
    props.setSelecteditem("ITM0024" + params.row.itemId + " " + params.row.itemBrand + " " + params.row.itemModel);
    props.setItemDetails(params.row);
    props.setHandleOpen(false);
  };
  const [searchTerm, setSearchTerm] = useState();
  const [searchData, setSearchData] = useState([]);
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = requestData.filter(item =>
      item.itemBrand.toLowerCase().includes(value) ||
      item.itemModel.toLowerCase().includes(value) ||
      item.location.toLowerCase().includes(value)
    );
    setSearchData(filtered);
  };
  async function fetchedRequest() {
    await axios.get(`${serverAPI}/fetchInventoryData`).then((res) => {
      setRequestData(res.data)
      console.log(res.data);
    }).catch((err) => { console.log(err) })
  }
  useEffect(() => {
    fetchedRequest()
  }, [])
  return (
    <div style={{ height: 400, width: '100%' }}>
      <input
        type="text"
        placeholder="Search by brand, model, or location"
        value={searchTerm}
        onChange={handleSearch}
        style={{ height: 20, width: 250 }}
      />

      <DataGrid
        rows={searchTerm ? searchData : requestData}
        columns={requestHeaderData}
        getRowId={(row) => row.itemName ? row.itemName : row.itemId}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        onCellClick={handleCellClick}
      />
    </div>
  );
}

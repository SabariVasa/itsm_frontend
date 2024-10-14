import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { serverAPI } from '../../Utils/Server';
// import { IncidentData, IncidentHeaderData } from '../../Utils/Incident-Data/IncidentsData';
import { CMDBheaderData } from '../../Utils/CMDB-Data/CmdbData';


export default function Table(props) {
  const navigate = useNavigate();
  const handleCellClick = (params) => {
    console.log(params.row.itemCategory);
    navigate(`/CMDBEditPage/${params.row.itemCategory}/${params.id}`);
  };
  const { category } = useParams();
  const [headerData, setHeaderData] = useState([]);
  const [serverData, setServerData] = useState([]);
  const [desktopData, setDesktopData] = useState({});
  async function fetchServerData() {
    await axios.get(`${serverAPI}/Get-All-Server/${props.category}`).then((res) => {

      setServerData(res.data)
    }).catch((err) => { console.log(err) });
  }

  async function fetchDesktopData() {
    await axios.get(`${serverAPI}/fetchInventoryData`).then((res) => {
      console.log(res.data)
      setServerData(res.data);
      setDesktopData({
        itemName: res.data.itemBrand,
        itemType: res.data.itemModel,
        warrantyStart: "20/5/2024",
        warrantyEnd: "20/5/2025",
        contactPerson: res.data.contactPerson,
        manufacturerName: res.data.manufacturerName
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    // if(category=="DesktopDevice"){
    //    fetchDesktopData();
    //    setHeaderData(requestHeaderData);
    // }else{
    fetchServerData();
    setHeaderData(CMDBheaderData)
    // }
  }, [])

  return (
    <div style={{ height: "95%", marginLeft: 30, marginTop: 20, width: '96%', overflowY: "auto" }}>
      <DataGrid
        rows={serverData}
        getRowId={(row) => row.itemName ? row.itemName : row.itemId}
        columns={headerData}
        // isRowSelected: (id: GridRowId) => boolean
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        // pageSizeOptions={[10]}
        checkboxSelection
        onCellClick={handleCellClick}
        sx={{
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#e600e6 !important',
          },
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: '#bfbfbf',
            color: "white"
          },
        }}
      />
    </div>
  );
}

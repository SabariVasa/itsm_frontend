import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { serverAPI } from '../../Utils/Server';
// import { IncidentData, IncidentHeaderData } from '../../Utils/Incident-Data/IncidentsData';
import { SoftwareHeaderData } from '../../Utils/CMDB-Data/CmdbData';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


export default function SoftwareTable(props) {
  const navigate = useHistory();
  const handleCellClick = (params) => {
    console.log(params.row.itemCategory);
    navigate(`/TechincalInfo/Software/${params.row.itemType}/${params.id}`);
  };
  // const { category } = useParams();
  const [headerData, setHeaderData] = useState([]);

  useEffect(() => {
    // if(category=="DesktopDevice"){
    //    fetchDesktopData();
    //    setHeaderData(requestHeaderData);
    // }else{
    fetchServerData();
    setHeaderData(SoftwareHeaderData)
    // }
  }, [])
  const [serverData, setServerData] = useState([]);
  const [desktopData, setDesktopData] = useState({});
  async function fetchServerData() {
    // await axios.get(`${serverAPI}/get-all-softwares/${category}`).then((res) => {
    //   setServerData(res.data)
    // }).catch((err) => { console.log(err) });
  }


  return (
    <div style={{ height: "95%", marginLeft: 30, marginTop: 20, width: '96%', overflowY: "auto" }}>
      <DataGrid
        rows={serverData}
        getRowId={(row) => row.itemId}
        columns={SoftwareHeaderData}
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

// import React, { useState, useEffect } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import { serverAPI } from '../../Utils/Server';
// // import { IncidentData, IncidentHeaderData } from '../../Utils/Incident-Data/IncidentsData';
// import { CMDBheaderData } from '../../Utils/CMDB-Data/CmdbData';
// import { styled } from '@mui/material/styles';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import GlobalService from '../../services/GlobalService';
// import { resturls } from '../../global/utils/apiurls';

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

// export default function CmdbShowDetails(props) {
//   const navigate = useNavigate();
//   const { category } = props
//   const handleCellClick = (params) => {
//     console.log(params.row.itemCategory);
//     navigate(`/CMDBEditPage/${params.row.itemCategory}/${params.id}`);
//   };
//   const [headerData, setHeaderData] = useState([]);
//   const [serverData, setServerData] = useState([]);
//   const [desktopData, setDesktopData] = useState({});

//   async function fetchServerData() {
//     // await axios.get(`${serverAPI}/Get-All-Server/${props.category}`).then((res) => {

//     //   setServerData(res.data)
//     // }).catch((err) => { console.log(err) });
//     GlobalService.generalSelect(
//       (respdata) => {
//         const { estatus, emessage, data: responseData } = respdata;
//         console.log(respdata, 'respdatas');
//         if ((estatus && emessage) && responseData.success) {

//         }
//       },
//       `${resturls.obtainCategoryInstance}/${category}`,
//       {},
//       'GET'
//     );
//   }

//   async function fetchDesktopData() {
//     await axios.get(`${serverAPI}/fetchInventoryData`).then((res) => {
//       console.log(res.data)
//       setServerData(res.data);
//       setDesktopData({
//         itemName: res.data.itemBrand,
//         itemType: res.data.itemModel,
//         warrantyStart: "20/5/2024",
//         warrantyEnd: "20/5/2025",
//         contactPerson: res.data.contactPerson,
//         manufacturerName: res.data.manufacturerName
//       })
//     }).catch((err) => {
//       console.log(err);
//     })
//   }

//   useEffect(() => {
//     // if(category=="DesktopDevice"){
//     //    fetchDesktopData();
//     //    setHeaderData(requestHeaderData);
//     // }else{
//     fetchServerData();
//     setHeaderData(CMDBheaderData)
//     // }
//   }, [])

//   const StyledTableCell = styled(TableCell)(({ theme }) => ({
//     [`&.${tableCellClasses.head}`]: {
//       backgroundColor: theme.palette.common.black,
//       color: theme.palette.common.white,
//     },
//     [`&.${tableCellClasses.body}`]: {
//       fontSize: 14,
//     },
//   }));


//   const StyledTableRow = styled(TableRow)(({ theme }) => ({
//     '&:nth-of-type(odd)': {
//       backgroundColor: theme.palette.action.hover,
//     },
//     // hide last border
//     '&:last-child td, &:last-child th': {
//       border: 0,
//     },
//   }));

//   return (
//     <div style={{ height: "95%", marginLeft: 30, marginTop: 20, width: '96%', overflowY: "auto" }}>
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 700 }} aria-label="customized table">
//           <TableHead>
//             <TableRow>
//               <StyledTableCell>Dessert (100g serving)</StyledTableCell>
//               <StyledTableCell align="right">Calories</StyledTableCell>
//               <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
//               <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
//               <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.map((row) => (
//               <StyledTableRow key={row.name}>
//                 <StyledTableCell component="th" scope="row">
//                   {row.name}
//                 </StyledTableCell>
//                 <StyledTableCell align="right">{row.calories}</StyledTableCell>
//                 <StyledTableCell align="right">{row.fat}</StyledTableCell>
//                 <StyledTableCell align="right">{row.carbs}</StyledTableCell>
//                 <StyledTableCell align="right">{row.protein}</StyledTableCell>
//               </StyledTableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { serverAPI } from '../../Utils/Server';
import { resturls } from '../../global/utils/apiurls';
import GlobalService from '../../services/GlobalService';
import { useNavigate } from 'react-router-dom';

export default function CmdbShowDetails(props) {
  const navigate = useNavigate();
  const { category } = props;
  const [headerData, setHeaderData] = useState([]);
  const [serverData, setServerData] = useState([]);
  const [desktopData, setDesktopData] = useState([]);

  // Fetching data from backend
  async function fetchDesktopData() {
    // await axios.get(`${serverAPI}/fetchInventoryData`).then((res) => {
    //   console.log(res.data);

    //   // Extract the 'values' object from the backend data
    //   const backendData = res.data.data;
    //   if (backendData && backendData.length > 0) {
    //     const values = backendData[0].values;
    //     const formattedData = Object.keys(values).map((key) => ({
    //       name: key,
    //       value: values[key],
    //     }));

    //     setDesktopData(formattedData); // Set formatted data to state
    //   }
    // }).catch((err) => {
    //   console.log(err);
    // });
        GlobalService.generalSelect(
      (respdata) => {
        const { estatus, emessage, data } = respdata;
        console.log(respdata, 'respdatas');
        const backendData = data;
        if ((estatus && emessage) && data) {
          const values = backendData[0].values;
              const formattedData = Object.keys(values).map((key) => ({
                name: key,
                value: values[key],
              }));
      
              setDesktopData(formattedData); 
        }
      },
      `${resturls.obtainCategoryInstance}/${category}`,
      {},
      'GET'
    );
  }

  useEffect(() => {
    fetchDesktopData();
    setHeaderData([]);
  }, []);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <div style={{ height: "95%", marginLeft: 30, marginTop: 20, width: '96%', overflowY: "auto" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Property</StyledTableCell>
              <StyledTableCell align="right">Value</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Dynamically generate rows based on the backend data */}
            {desktopData.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.value}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
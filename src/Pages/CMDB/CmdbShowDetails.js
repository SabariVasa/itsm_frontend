// import React, { useState, useEffect } from 'react';
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
// // import { useNavigate } from 'react-router-dom';
// import GeneratedForm from '../../Components/cmdb/classmanagement/GeneratedForm';
// import { Skeleton } from '@mui/material';

// export default function CmdbShowDetails(props) {
//   // const navigate = useNavigate();
//   const { category } = props;
//   const [headerData, setHeaderData] = useState([]);
//   const [serverData, setServerData] = useState([]);
//   const [formAttributes, setFormAttributes] = useState([]);
//   const [intialUpdateValue, setIntialUpdateValue] = useState({});
//   const [selectedItemId, setSelectedItemId] = useState('');
//   const [isLoading, setIsLoading] = useState(true);

//   async function fetchDesktopData() {
//     setIsLoading(true);
//     GlobalService.generalSelect(
//       (respdata) => {
//         const { estatus, emessage, data } = respdata;
//         console.log(respdata, 'respdatas');

//         if ((estatus && emessage) && data && data.length > 0) {
//           const headers = Object.keys(data[0].values);
//           setHeaderData(headers);
//           setTimeout(() => {
//             setIsLoading(false);
//           }, 2000)
//           const formattedData = data.map(item => ({
//             id: item.id,
//             values: item.values
//           }));
//           setServerData(formattedData);
//         }
//       },
//       `${resturls.obtainCategoryInstance}/${category}`,
//       {},
//       'GET'
//     )
//   }

//   useEffect(() => {
//     fetchDesktopData();
//   }, [category]);

//   const handleRowClick = (id, values) => {
//     console.log('Row clicked with ID:', id);
//     setIntialUpdateValue(values);
//     setSelectedItemId(id);

//     GlobalService.generalSelect(
//       (respdata) => {
//         const { estatus, emessage, attributes } = respdata;
//         console.log(respdata, 'respdatas');

//         if (estatus && emessage) {
//           setFormAttributes(attributes.attributes);
//         }
//       },
//       `${resturls.obtainCategoryAttributes}/${id}`,
//       {},
//       'GET'
//     );
//   };

//   console.log(serverData, 'serverData');

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
//     '&:last-child td, &:last-child th': {
//       border: 0,
//     },
//     cursor: 'pointer',
//   }));

//   const isEmptyObject = (obj) => Object.keys(obj).length === 0 && obj.constructor === Object;

//   return (
//     <div style={{ height: "95%", marginLeft: 30, marginTop: 20, width: '96%', overflowY: "auto" }}>
//       {formAttributes.length > 0 ? (
//         <GeneratedForm
//           formFields={formAttributes}
//           isEditMode={true}
//           initialValues={intialUpdateValue}
//           selectedClass={category}
//           selectedItemId={selectedItemId}
//         />
//       ) : isLoading ? (
//         <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 700 }} aria-label="customized table">
//             <TableHead>
//               <TableRow>
//                 {headerData.map((header, index) => (
//                   <StyledTableCell key={index} align="left">
//                     <Skeleton width="100px" />
//                   </StyledTableCell>
//                 ))}
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {Array.from(new Array(5)).map((_, rowIndex) => (
//                 <StyledTableRow key={rowIndex}>
//                   {headerData.map((_, cellIndex) => (
//                     <StyledTableCell key={cellIndex} align="left">
//                       <Skeleton />
//                     </StyledTableCell>
//                   ))}
//                 </StyledTableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       ) : (
//         <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 700 }} aria-label="customized table">
//             <TableHead>
//               <TableRow>
//                 {/* {serverData.map((row, rowIndex) => (
//                   headerData.map((header, index) => {
//                     const cellValue = row.values[header];
//                     if (typeof cellValue === 'object' && cellValue.base64 && !isEmptyObject(cellValue)) {
//                       return (
//                         <>
//                           <StyledTableCell key={index} align="left">File Name</StyledTableCell>
//                         </>
//                       )
//                     }
//                   })
//                 ))} */}
//                 {headerData.map((header, index) => (
//                   <StyledTableCell key={index} align="left">{header}</StyledTableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {serverData.map((row, rowIndex) => (
//                 <StyledTableRow key={row.id} onClick={() => handleRowClick(row.id, row.values)}>
//                   {headerData.map((header, cellIndex) => {
//                     const cellValue = row.values[header];
//                     if (typeof cellValue === 'object' && cellValue.base64 && !isEmptyObject(cellValue)) {
//                       const fileType = cellValue.base64.split(';')[0].split(':')[1];
//                       const fileName = `File_${row.id}_${header}.${fileType.split('/')[1]}`;

//                       return (
//                         <>
//                           <StyledTableCell key={`${cellIndex}-name`} align="left">
//                             {fileName}
//                           </StyledTableCell>
//                           <StyledTableCell key={`${cellIndex}-preview`} align="left">
//                             {fileType.startsWith('image/') ? (
//                               <img
//                                 src={cellValue.base64}
//                                 alt={fileName}
//                                 style={{ width: '100px', height: 'auto' }}
//                               />
//                             ) : (
//                               <a
//                                 href={cellValue.base64}
//                                 download={fileName}
//                                 style={{ textDecoration: 'underline', color: 'blue', cursor: 'pointer' }}
//                               >
//                                 Download File
//                               </a>
//                             )}
//                           </StyledTableCell>
//                         </>
//                       );
//                     }
//                     if (typeof cellValue === 'object' && isEmptyObject(cellValue)) {
//                       return (
//                         <>
//                           <StyledTableCell key={`${cellIndex}-name`} align="left">
//                             No File
//                           </StyledTableCell>
//                           <StyledTableCell key={`${cellIndex}-preview`} align="left">
//                             No Preview
//                           </StyledTableCell>
//                         </>
//                       );
//                     }
//                     return (
//                       <StyledTableCell key={cellIndex} align="left">
//                         {cellValue}
//                       </StyledTableCell>
//                     );
//                   })}
//                 </StyledTableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </div>
//   );
// }
// import React, { useState, useEffect } from 'react';
// import { styled } from '@mui/material/styles';
// import Paper from '@mui/material/Paper';
// import GlobalService from '../../services/GlobalService';
// import { resturls } from '../../global/utils/apiurls';
// import GeneratedForm from '../../Components/cmdb/classmanagement/GeneratedForm';
// import { Skeleton } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';

// export default function CmdbShowDetails(props) {
//   const { category } = props;
//   const [headerData, setHeaderData] = useState([]);
//   const [serverData, setServerData] = useState([]);
//   const [formAttributes, setFormAttributes] = useState([]);
//   const [intialUpdateValue, setIntialUpdateValue] = useState({});
//   const [selectedItemId, setSelectedItemId] = useState('');
//   const [isLoading, setIsLoading] = useState(true);

//   async function fetchDesktopData() {
//     setIsLoading(true);
//     GlobalService.generalSelect(
//       (respdata) => {
//         const { estatus, emessage, data } = respdata;
//         console.log(respdata, 'respdatas');

//         if (estatus && emessage && data && data.length > 0) {
//           const headers = Object.keys(data[0].values);
//           setHeaderData(headers);
//           setTimeout(() => {
//             setIsLoading(false);
//           }, 2000);
//           const formattedData = data.map((item) => ({
//             id: item.id,
//             ...item.values, // Spread the values to make them accessible as columns
//           }));
//           setServerData(formattedData);
//         }
//       },
//       `${resturls.obtainCategoryInstance}/${category}`,
//       {},
//       'GET'
//     );
//   }

//   useEffect(() => {
//     fetchDesktopData();
//   }, [category]);

//   const handleRowClick = (params) => {
//     const { id, ...values } = params.row;
//     console.log('Row clicked with ID:', id);
//     setIntialUpdateValue(values);
//     setSelectedItemId(id);

//     GlobalService.generalSelect(
//       (respdata) => {
//         const { estatus, emessage, attributes } = respdata;
//         console.log(respdata, 'respdatas');

//         if (estatus && emessage) {
//           setFormAttributes(attributes.attributes);
//         }
//       },
//       `${resturls.obtainCategoryAttributes}/${id}`,
//       {},
//       'GET'
//     );
//   };

//   const isEmptyObject = (obj) => Object.keys(obj).length === 0 && obj.constructor === Object;

//   // Define columns for the DataGrid
//   const columns = headerData.map((header) => {
//     return {
//       field: header,
//       headerName: header,
//       // flex: 1,
//       sortable: false, // Disable sorting for this column
//       disableColumnMenu: true, // Disable the menu button for this column
//       renderHeader: (params) => (
//         <div style={{
//           backgroundColor: 'black',
//           color: 'white',
//           padding: '8px 16px',
//           width: '100%', // Ensure full width
//           whiteSpace: 'normal', // Allow text to wrap
//           lineHeight: '1.5', // Adjust line height for better readability
//         }}>
//           {params.colDef.headerName}
//         </div>
//       ),
//       renderCell: (params) => {
//         const cellValue = params.value;
//         if (typeof cellValue === 'object' && cellValue.base64 && !isEmptyObject(cellValue)) {
//           const fileType = cellValue.base64.split(';')[0].split(':')[1];
//           const fileName = `File_${params.row.id}_${header}.${fileType.split('/')[1]}`;

//           return (
//             <div>
//               <div>{fileName}</div>
//               {fileType.startsWith('image/') ? (
//                 <img
//                   src={cellValue.base64}
//                   alt={fileName}
//                   style={{ width: '100px', height: 'auto' }}
//                 />
//               ) : (
//                 <a
//                   href={cellValue.base64}
//                   download={fileName}
//                   style={{ textDecoration: 'underline', color: 'blue', cursor: 'pointer' }}
//                 >
//                   Download File
//                 </a>
//               )}
//             </div>
//           );
//         }
//         if (typeof cellValue === 'object' && isEmptyObject(cellValue)) {
//           return (
//             <div>
//               <div>No File</div>
//               <div>No Preview</div>
//             </div>
//           );
//         }
//         return <div>{cellValue}</div>;
//       },
//     };
//   });

//   return (
//     <div style={{ height: '95%', marginLeft: 30, marginTop: 20, width: '95%', overflowY: 'auto' }}>
//       {formAttributes.length > 0 ? (
//         <GeneratedForm
//           formFields={formAttributes}
//           isEditMode={true}
//           initialValues={intialUpdateValue}
//           selectedClass={category}
//           selectedItemId={selectedItemId}
//         />
//       ) : isLoading ? (
//         <Paper style={{ padding: '16px' }}>
//           <Skeleton variant="rectangular" width="100%" height={400} />
//         </Paper>
//       ) : (
//         <div style={{ height: '80vh', width: '100%', overflowX: 'auto', padding: '20px' }}> {/* Added padding here */}
//           <div style={{ minWidth: 'max-content', width: '100%' }}>
//             {/* Ensure the DataGrid container can scroll horizontally */}
//             <DataGrid
//               rows={serverData}
//               columns={columns}
//               pageSize={10}
//               rowsPerPageOptions={[10]}
//               onRowClick={handleRowClick}
//               disableSelectionOnClick
              // disableColumnMenu
              // disableColumnSort
              // disableColumnResize
              // hideFooterPagination
//               sx={{
//                 // Apply black background and white text color to the header
//                 '& .MuiDataGrid-columnHeaders': {
//                   backgroundColor: '#000', // Dark background for the header
//                   color: '#fff', // White text color for the header
//                   '& .MuiDataGrid-columnHeaderTitle': {
//                     color: '#fff', // Ensure title text is also white
//                   },
//                 },

//                 c
// Ensure header cells take full width
// '& .MuiDataGrid-columnHeader': {
//   padding: 0, // Remove default padding
// },

// // Add padding to the DataGrid content area
// '& .MuiDataGrid-cell': {
//   padding: '16px',
// },

//                 // Ensure the grid takes full width
//                 '& .MuiDataGrid-root': {
//                   width: '100%',
//                 },

//                 // Optional: Hide the keyboard backspace button (if it's showing)
//                 '& .MuiDataGrid-ArrowBackIcon': {
//                   display: 'none',
//                 },
//               }}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import GlobalService from '../../services/GlobalService';
import { resturls } from '../../global/utils/apiurls';
import GeneratedForm from '../../Components/cmdb/classmanagement/GeneratedForm';
import { Skeleton } from '@mui/material';

export default function CmdbShowDetails(props) {
  const { category } = props;
  const [headerData, setHeaderData] = useState([]);
  const [serverData, setServerData] = useState([]);
  const [formAttributes, setFormAttributes] = useState([]);
  const [intialUpdateValue, setIntialUpdateValue] = useState({});
  const [selectedItemId, setSelectedItemId] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  async function fetchDesktopData() {
    setIsLoading(true);
    GlobalService.generalSelect(
      (respdata) => {
        const { estatus, emessage, data } = respdata;
        if ((estatus && emessage) && data && data.length > 0) {
          const headers = Object.keys(data[0].values);
          setHeaderData(headers);
          setTimeout(() => {
            setIsLoading(false);
          }, 2000);
          const formattedData = data.map(item => ({
            id: item.id,
            values: item.values
          }));
          setServerData(formattedData);
        }
      },
      `${resturls.obtainCategoryInstance}/${category}`,
      {},
      'GET'
    );
  }

  useEffect(() => {
    fetchDesktopData();
  }, [category]);

  const handleRowClick = (id, values) => {
    setIntialUpdateValue(values);
    setSelectedItemId(id);

    GlobalService.generalSelect(
      (respdata) => {
        const { estatus, emessage, attributes } = respdata;
        if (estatus && emessage) {
          setFormAttributes(attributes.attributes);
        }
      },
      `${resturls.obtainCategoryAttributes}/${id}`,
      {},
      'GET'
    );
  };

  const isEmptyObject = (obj) => Object.keys(obj).length === 0 && obj.constructor === Object;

  const columns = headerData.map((header) => ({
    field: header,
    headerName: header,
    width: 200, // Adjust width based on your content
    renderCell: (params) => {
      const cellValue = params.row.values[params.field];
      if (typeof cellValue === 'object' && cellValue.base64 && !isEmptyObject(cellValue)) {
        const fileType = cellValue.base64.split(';')[0].split(':')[1];
        const fileName = `File_${params.row.id}_${params.field}.${fileType.split('/')[1]}`;

        return (
          <div>
            <span>{fileName}</span>
            {fileType.startsWith('image/') ? (
              <img
                src={cellValue.base64}
                alt={fileName}
                style={{ width: '100px', height: 'auto' }}
              />
            ) : (
              <a
                href={cellValue.base64}
                download={fileName}
                style={{ textDecoration: 'underline', color: 'blue', cursor: 'pointer' }}
              >
                Download File
              </a>
            )}
          </div>
        );
      }
      if (typeof cellValue === 'object' && isEmptyObject(cellValue)) {
        return <span>No File</span>;
      }
      return <span>{cellValue}</span>;
    },
  }));

  return (
    <div style={{ height: '95%', marginLeft: 30, marginTop: 20, width: '96%' }}>
      {formAttributes.length > 0 ? (
        <GeneratedForm
          formFields={formAttributes}
          isEditMode={true}
          initialValues={intialUpdateValue}
          selectedClass={category}
          selectedItemId={selectedItemId}
        />
      ) : isLoading ? (
        <Skeleton variant="rectangular" width="100%" height={400} />
      ) : (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={serverData}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            onRowClick={(e) => handleRowClick(e.row.id, e.row.values)}
            getRowId={(row) => row.id}
            disableSelectionOnClick
            disableColumnMenu
            disableColumnSort
            disableColumnResize
            hideFooterPagination
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: 'black',
                color: 'white',
                
              },
              '& .MuiDataGrid-cell': {
                fontSize: '14px',
              },
              // Ensure header cells take full width
              '& .MuiDataGrid-columnHeader': {
                padding: '15px', // Remove default padding
                background: 'black',
                marginBottom:'10px',
                
              },

              // Add padding to the DataGrid content area
              '& .MuiDataGrid-cell': {
                padding: '16px',
              },
              '& .MuiDataGrid-columnSeparator': {
                display: 'none', // Hides the default column separator (vertical lines)
              },

            }}
          />
        </div>
      )}
    </div>
  );
}

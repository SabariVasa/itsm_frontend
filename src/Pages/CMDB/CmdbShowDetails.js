import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import GlobalService from '../../services/GlobalService';
import { resturls } from '../../global/utils/apiurls';
import { useNavigate } from 'react-router-dom';
import GeneratedForm from '../../Components/cmdb/classmanagement/GeneratedForm';
import { Skeleton } from '@mui/material';

export default function CmdbShowDetails(props) {
  const navigate = useNavigate();
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
        console.log(respdata, 'respdatas');

        if ((estatus && emessage) && data && data.length > 0) {
          const headers = Object.keys(data[0].values);
          setHeaderData(headers);
          setTimeout(() => {
            setIsLoading(false);
          }, 2000)
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
    )
  }

  useEffect(() => {
    fetchDesktopData();
  }, [category]);

  const handleRowClick = (id, values) => {
    console.log('Row clicked with ID:', id);
    setIntialUpdateValue(values);
    setSelectedItemId(id);

    GlobalService.generalSelect(
      (respdata) => {
        const { estatus, emessage, attributes } = respdata;
        console.log(respdata, 'respdatas');

        if (estatus && emessage) {
          setFormAttributes(attributes.attributes);
        }
      },
      `${resturls.obtainCategoryAttributes}/${id}`,
      {},
      'GET'
    );
  };

  console.log(serverData, 'serverData');

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
    cursor: 'pointer',
  }));

  const isEmptyObject = (obj) => Object.keys(obj).length === 0 && obj.constructor === Object;

  return (
    <div style={{ height: "95%", marginLeft: 30, marginTop: 20, width: '96%', overflowY: "auto" }}>
      {formAttributes.length > 0 ? (
        <GeneratedForm
          formFields={formAttributes}
          isEditMode={true}
          initialValues={intialUpdateValue}
          selectedClass={category}
          selectedItemId={selectedItemId}
        />
      ) : isLoading ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {headerData.map((header, index) => (
                  <StyledTableCell key={index} align="left">
                    <Skeleton width="100px" />
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {Array.from(new Array(5)).map((_, rowIndex) => (
                <StyledTableRow key={rowIndex}>
                  {headerData.map((_, cellIndex) => (
                    <StyledTableCell key={cellIndex} align="left">
                      <Skeleton />
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            {/* <TableHead>
              <TableRow>
                {headerData.map((header, index) => (
                  <StyledTableCell key={index} align="left">{header}</StyledTableCell>
                ))}
              </TableRow>
            </TableHead> */}
            <TableHead>
              <TableRow>
                {/* {serverData.map((row, rowIndex) => (
                  headerData.map((header, index) => {
                    const cellValue = row.values[header];
                    if (typeof cellValue === 'object' && cellValue.base64 && !isEmptyObject(cellValue)) {
                      return (
                        <>
                          <StyledTableCell key={index} align="left">File Name</StyledTableCell>
                        </>
                      )
                    }
                  })
                ))} */}
                {headerData.map((header, index) => (
                  <StyledTableCell key={index} align="left">{header}</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {serverData.map((row, rowIndex) => (
                <StyledTableRow key={row.id} onClick={() => handleRowClick(row.id, row.values)}>
                  {headerData.map((header, cellIndex) => {
                    const cellValue = row.values[header];
                    if (typeof cellValue === 'object' && cellValue.base64 && !isEmptyObject(cellValue)) {
                      const fileType = cellValue.base64.split(';')[0].split(':')[1];
                      const fileName = `File_${row.id}_${header}.${fileType.split('/')[1]}`;

                      return (
                        <>
                          <StyledTableCell key={`${cellIndex}-name`} align="left">
                            {fileName}
                          </StyledTableCell>
                          <StyledTableCell key={`${cellIndex}-preview`} align="left">
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
                          </StyledTableCell>
                        </>
                      );
                    }
                    if (typeof cellValue === 'object' && isEmptyObject(cellValue)) {
                      return (
                        <>
                          <StyledTableCell key={`${cellIndex}-name`} align="left">
                            No File
                          </StyledTableCell>
                          <StyledTableCell key={`${cellIndex}-preview`} align="left">
                            No Preview
                          </StyledTableCell>
                        </>
                      );
                    }
                    return (
                      <StyledTableCell key={cellIndex} align="left">
                        {cellValue}
                      </StyledTableCell>
                    );
                  })}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

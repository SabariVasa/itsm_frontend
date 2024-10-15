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

export default function CmdbShowDetails(props) {
  const navigate = useNavigate();
  const { category } = props;
  const [headerData, setHeaderData] = useState([]);
  const [serverData, setServerData] = useState([]);
  const [formAttributes, setFormAttributes] = useState([]);
  const [intialUpdateValue, setIntialUpdateValue] = useState({});
  const [selectedItemId, setSelectedItemId] = useState('');
  // const [selectedId, setSelectedId] = useState(null);

  async function fetchDesktopData() {
    GlobalService.generalSelect(
      (respdata) => {
        const { estatus, emessage, data } = respdata;
        console.log(respdata, 'respdatas');

        if ((estatus && emessage) && data && data.length > 0) {
          const headers = Object.keys(data[0].values);
          setHeaderData(headers);

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
    console.log('Row clicked with ID:', id);
    // setSelectedId(id);
    setIntialUpdateValue(values);
    setSelectedItemId(id)
    GlobalService.generalSelect(
      (respdata) => {
        const { estatus, emessage, data, attributes } = respdata;
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

  return (
    <div style={{ height: "95%", marginLeft: 30, marginTop: 20, width: '96%', overflowY: "auto" }}>
      {formAttributes.length > 0 ? (
        <GeneratedForm
          formFields={formAttributes}
          isEditMode={true}
          initialValues={intialUpdateValue}
          selectedClass={category}
          selectedItemId={selectedItemId}
        // serverData
        // setFormFields={setFormFields}
        // selectCategoryType={selectCategoryType}
        // logo={logo}
        // className={header}
        // generatedForm={true}
        />
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                {headerData.map((header, index) => (
                  <StyledTableCell key={index} align="left">{header}</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {serverData.map((row, rowIndex) => (
                <StyledTableRow key={row.id} onClick={() => handleRowClick(row.id, row.values)}>
                  {headerData.map((header, cellIndex) => (
                    <StyledTableCell key={cellIndex} align="left">{row.values[header]}</StyledTableCell>
                  ))}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

    </div>
  );
}


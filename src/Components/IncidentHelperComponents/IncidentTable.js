import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name,state, value1, value2, value3) {
  return { name, state, value1, value2, value3 };
}

const rows = [
  createData('1-critical',2,11,4),
  createData('High', 6,8,0),
  createData('Moderate',10,11,12),
  createData('Low', 30,20,16),
  createData('Planning',15,10,5),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper} style={{backgroundColor:"#ccd9ff"}}>
      <Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>State</TableCell>
            <TableCell>New</TableCell>
            <TableCell>In-progress</TableCell>
            <TableCell>On-hold</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              md={{border:10}}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.state}</TableCell>
              <TableCell>{row.value1}</TableCell>
              <TableCell >{row.value2}</TableCell>
              <TableCell >{row.value3}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

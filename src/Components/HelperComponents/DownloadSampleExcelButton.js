import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Button, } from '@mui/material';

const DownloadSampleExcelButton = () => {

  // Define the headers
  const headers = ['Item Name', 'Item Type', 'Manufacurer',"Model Number","Location","Serial Number","Managment  ip address","Storage Type","Number of Cores","Number of RAM","Storage Capacity","Operating System","Virtualization Platform","Warranty Start Date","Warranty End Date","Owner","Manitanence Schedule"];

  // Create an empty array of objects for data
  const data = [{}]; // The data array can contain one empty object to ensure at least one row in Excel

  const downloadExcel = () => {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    
    // Convert headers and data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data, { header: headers, skipHeader: false });

    // Set the column names (headers)
    worksheet['!cols'] = headers.map(header => ({ wpx: 100 })); // Optional: set column width

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sample');

    // Generate a binary string of the workbook
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    
    // Save the file using file-saver
    saveAs(new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), 'sample.xlsx');
  };

  return (
    <Button component="label" variant="contained" tabIndex={-1} style={{marginLeft:10}}  onClick={()=>downloadExcel()}>Download sample
    </Button>
  );
};

export default DownloadSampleExcelButton;

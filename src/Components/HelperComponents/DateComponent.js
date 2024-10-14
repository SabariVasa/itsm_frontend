import * as React from 'react';
import FormControl from '@mui/material/FormControl';
// import OutlinedInput from '@mui/material/OutlinedInput';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function DateComponent(props) {
    // const [ExpireDate,setExpireDate]= React.useState();

    const today = dayjs();
    function formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); 
      const day = String(date.getDate()).padStart(2, '0');
    
      return `${year}-${month}-${day}`;
    }
  return (
    <form noValidate autoComplete="off">
      <FormControl sx={{ width: '80%',marginTop: 1,marginLeft:10 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker fullWidth sx={{mt:3,mb:2}}  label={props.label} value={dayjs(props.Date?props.Date:undefined)} onChange={(date)=>{props.setDate(formatDate(new Date(date)))}}/>
       </LocalizationProvider>
      </FormControl>
    </form>
  );
}

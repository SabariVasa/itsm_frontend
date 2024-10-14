import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



export default function BasicSelect(props) {
  const [Value, setValue] = React.useState('');

  const handleChange = (event) => {
    props.setSelectValue(event.target.value);
  };

  return (
    <Box sx={{ minWidth:80,maxWidth:'80%',marginLeft:10,marginTop:2,...props.style}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.SelectedValue}
          label={props.label}
          onChange={(e)=>{handleChange(e)}}
          defaultValue={props.defaultValue?props.defaultValue:null}
        >
           <MenuItem value="">
            <em>Select Service</em>
          </MenuItem>
         {props.MenuItems.map((item,index)=>{
            return <MenuItem value={item.value} key={index} >{item.value}</MenuItem>
         })}
        </Select>
      </FormControl>
    </Box>
  );
}

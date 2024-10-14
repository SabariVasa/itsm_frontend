import React,{useState} from 'react';
// import Select from 'react-select';
import { FaServer, FaDatabase, FaLaptop,FaNetworkWired } from 'react-icons/fa';
import { Box } from '@mui/material';
import Select from '@mui/material/Select';
import {InputLabel,MenuItem} from '@mui/material';
import FormControl from '@mui/material/FormControl';


export const IconSelector = (props)=>{
const [selectedIcon, setSelectedIcon] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedIcon(selectedOption);
  };
  const iconOptions = [
    { value: 'server', label: 'Server', icon: <FaServer /> },
    { value: 'database', label: 'Database', icon: <FaDatabase /> },
    { value: 'laptop', label: 'Laptop', icon: <FaLaptop /> },
    { value: 'Network', label: 'Network', icon: <FaNetworkWired /> },
  ];

  return (
    <Box sx={{ minWidth:80,maxWidth:"80%",marginLeft:10,marginTop:2 }}>
    {/* <Select
      value={selectedIcon}
      onChange={handleChange}
      options={iconOptions}
      getOptionLabel={(option) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {option.icon} &nbsp; {option.label}
        </div>
      )}
    /> */}
    <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Icon</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedIcon}
          label="Select Icon"
          onChange={(e)=>handleChange(e.target.value)}
        >
           <MenuItem value="">
            <em>Select Icon</em>
          </MenuItem>
         {iconOptions.map((option,index)=>{
            return <MenuItem value={option.value} key={index}>{option.icon} &nbsp; {option.label}</MenuItem>
         })}
        </Select>
      </FormControl>
    </Box>
  );
};
import React from 'react';
// import Paper from '@mui/material/Paper';
// import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { TextField,InputAdornment } from '@mui/material';
// import PlaceholderGrid from 'rsuite/esm/Placeholder/PlaceholderGrid';

export default function SearchTextField({placeholder,fieldValue,setFieldValue,style,multiline,rows,search,handleClickOpen}) {
  return (
       <TextField
        label={placeholder}
        variant="outlined"
        style={style}
        value={fieldValue}
        onChange={(e)=>setFieldValue(e.target.value)}
        InputLabelProps={{
          shrink: !!fieldValue,  // This will shrink the label if there's a value
        }}
        multiline={multiline}
        rows={rows}
        InputProps={{
          endAdornment: search?(
            <InputAdornment position="end">
         
              <IconButton onClick={() => handleClickOpen()}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ):null,
        }}
      />
  
  )
}


    {/* {search?
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon onClick={()=>{handleClickOpen()}}/>
      </IconButton>:null} */}
    
         // <Paper
    //   component="form"
    //   variant="outlined"
    //   sx={{ p: '2px 4px', display: 'flex', alignItems: 'center'}}
    //   style={style}
    // >
      {/* <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder}
        inputProps={{ 'aria-label': 'search google maps' }}
        fullWidth
        value={fieldValue}
        onChange={(e)=>{setFieldValue(e.target.value)}}
        multiline={multiline}
        rows={rows}
      /> */}
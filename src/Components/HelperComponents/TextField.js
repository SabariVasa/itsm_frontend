import * as React from 'react';
import FormControl from '@mui/material/FormControl';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import FormHelperText from '@mui/material/FormHelperText';
import { TextField } from '@mui/material';

export default function CustomTextField(props) {
  return (
    <form noValidate autoComplete="off">
      <FormControl sx={{ width: '80%', marginLeft: 10, marginTop: 2 }} style={props.style}>
        {/* <OutlinedInput placeholder={props.name} disabled={props.disabled} value={props.Name} onChange={(e)=>props.setName(e.target.value)} multiline={props.multiLine} rows={props.rows?props.rows:1} /> */}
        <TextField
          label={props.name}
          variant="outlined"
          value={props.Name}
          disabled={props.disabled}
          onChange={(e) => props.setName(e.target.value)}
          InputLabelProps={{
            shrink: props.Name || !!props.name,
          }}
          multiline={props.multiline}
          rows={props.rows}
        // InputProps={{
        //   endAdornment: search?(
        //     <InputAdornment position="end">

        //       <IconButton onClick={() => handleClickOpen()}>
        //         <SearchIcon />
        //       </IconButton>
        //     </InputAdornment>
        //   ):null,
        // }}
        />
      </FormControl>
    </form>
  );
}

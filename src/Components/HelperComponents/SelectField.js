import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { sharedStyles } from '../../commonComponents/StyledComponents';
import { TextField } from '@mui/material';
import { useTheme } from '../../global/commonComponents/ThemeContext';



export default function BasicSelect(props) {
  const { theme } = useTheme();
  const handleChange = (event) => {
    props.setSelectValue(event.target.value);
  };

  return (
    <Box
      sx={{
        ...props.style,
      }}
    >
      <FormControl fullWidth>
        <TextField
          select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.SelectedValue}
          label={props.label}
          onChange={handleChange}
          defaultValue={props.defaultValue ? props.defaultValue : null}
          sx={sharedStyles}
        >
          <MenuItem sx={{ color: `${theme.valueFontColor}` }} disabled>
            <em>Select Service</em>
          </MenuItem>
          {props.MenuItems.map((item, index) => (
            <MenuItem sx={{ color: `${theme.valueFontColor}` }} value={item.value} key={index}>
              {item.value}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
    </Box>
  );
}

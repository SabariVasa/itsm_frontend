import * as React from 'react';
import { TextField, ThemeProvider, createTheme } from '@mui/material';
import { styled } from '@mui/system';

// Create a custom theme with primary colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#0072E5', // Primary color for focus
    },
    text: {
      primary: '#1C2025', // Primary text color
      secondary: '#8c8c8c', // Grey color for default text
    },
    grey: {
      300: '#C7D0DD', // Grey color for border
    },
  },
}); 

const NumberInputIntroduction = (props) => {
  // const [value, setValue] = React.useState(props.value || '');

  const handleChange = (event) => {
    const newValue = event.target.value;

    // Update the state only if the value is empty or a valid number
    if (newValue === '' || !isNaN(Number(newValue))) {
      // props.setValue(newValue);
      props.setValue(newValue); // Update parent component if needed
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <StyledTextField
        label={props.title} // Pass the label prop
        variant="outlined"
        type="number"
        value={props.value}
        onChange={handleChange}
        style={props.style} 
        // InputProps={{
        //   endAdornment: (
        //     <ButtonContainer>
        //       <StyledButton onClick={() => setValue(value + (props.step || 1))}>▴</StyledButton>
        //       <StyledButton onClick={() => setValue(value - (props.step || 1))}>▾</StyledButton>
        //     </ButtonContainer>
        //   ),
        // }}
        inputProps={{
          min: props.min,
          max: props.max,
          step: props.step,
        }}
        // placeholder={props.title}
      />
    </ThemeProvider>
  );
};

export default NumberInputIntroduction;

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputLabel-root': {
    color: theme.palette.text.secondary,
    transform: 'translate(14px, 18px) scale(1)',
    top: 0,
    left: 0,
    transition: 'transform 0.2s, color 0.2s',
  },
  '& .MuiInputLabel-shrink': {
    transform: 'translate(14px, -6px) scale(0.75)',
    color: theme.palette.primary.main,
  },
  '& .MuiOutlinedInput-root': {
    padding: '1px 0',
    '& fieldset': {
      borderColor: theme.palette.grey[300],
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const ButtonContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

const StyledButton = styled('button')({
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  fontSize: '1rem',
  padding: '0',
  lineHeight: '1',
});

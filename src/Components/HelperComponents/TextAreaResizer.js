import React, { useState, useRef, useEffect } from 'react';
import { styled } from '@mui/system';
import { debounce } from 'lodash';

// Container with an outlined style
const StyledTextAreaContainer = styled('div')({
  position: 'relative',
  width: '100%',
  margin: '20px 0',
  borderRadius: 4,
  border: '1px solid #ccc',
  padding: '14px 14px 0 14px',
  transition: 'border-color 0.3s ease',
  '&:focus-within': {
    borderColor: '#3f51b5', // Change color when focused
  },
});

// Styled textarea with minimal appearance
const StyledTextArea = styled('textarea')({
  width: '100%',
  minHeight: 40,
  border: 'none',
  outline: 'none',
  resize: 'none',
  fontSize: '16px',
  fontFamily: 'inherit',
  lineHeight: '1.5',
  backgroundColor: 'transparent',
  boxSizing: 'border-box',
  padding: 0,
  marginTop: '6px', // Ensure label has space to float up
  color: '#333',
  overflow: 'hidden',
});

// Floating label that moves up on focus
const StyledLabel = styled('label')(({ isFocusedOrFilled }) => ({
  position: 'absolute',
  top: isFocusedOrFilled ? '-10px' : '14px',
  left: '14px',
  fontSize: isFocusedOrFilled ? '12px' : '16px',
  color: isFocusedOrFilled ? '#3f51b5' : '#757575', // Grey when not focused
  backgroundColor: '#fff',
  padding: '0 4px',
  transition: '0.2s ease all',
  fontWeight: 'normal',
}));

function useSuppressConsoleError(suppressMessage) {
    useEffect(() => {
      const originalConsoleError = console.error;
  
      console.error = (...args) => {
        if (args[0] && args[0].includes(suppressMessage)) {
          // Ignore this error
          return;
        }
        originalConsoleError.apply(console, args); // Call the original console.error
      };
  
      return () => {
        // Restore the original console.error when the component unmounts
        console.error = originalConsoleError;
      };
    }, [suppressMessage]);
  }
export default function TextAreaResizer({ label,value,setValue }) {
//   const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textAreaRef = useRef(null);

  // Debounced resize function
  const handleResize = debounce(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto'; // Reset height to auto to handle shrinking
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // Set height based on scroll height
    }
  }, 100);

  // Handle textarea value changes
  const handleChange = (e) => {
    setValue(e.target.value);
    handleResize(); // Call debounced resize function
  };
  useSuppressConsoleError('ResizeObserver loop completed with undelivered notifications');


  return (
    
    <StyledTextAreaContainer>
      <StyledLabel
        isFocusedOrFilled={isFocused || value.length > 0}
        htmlFor="textArea"
      >
        {label}
      </StyledLabel>
      <StyledTextArea
        ref={textAreaRef}
        id="textArea"
        value={value}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </StyledTextAreaContainer>
  );
}

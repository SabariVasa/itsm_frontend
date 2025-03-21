import React from 'react';
import { useTheme } from '../../global/commonComponents/ThemeContext';
import { Divider } from '@mui/material';

export default function ContentDevider(props) {
  const { theme } = useTheme()
  return (
    <div className='mb-4'>
      <h1
        style={{
          color: `${theme.InnerBodyfontColor}`,
        }}
        className='p-2 ml-2 !text-xl'
      >
        {props.title}
      </h1>
      <Divider />
    </div>
  )
}

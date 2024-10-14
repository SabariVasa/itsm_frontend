import React, { useState } from 'react';
import { Snackbar } from '@mui/material';

export default function NotifyBar(props) {
  const [state, setState] = useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;
  // const [ErrorMessage, setErrorMessage] = useState();
  // const handleClose = () => {
  //   setState({ ...state, open: false })
  // }

  //   const handleOpen = (notifyStatus)=>{
  //     setState({...state,open:notifyStatus})
  //     setErrorMessage(props.notifyMessage)
  //   }
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={props.notifyStatus}
        onClose={() => props.setNotifyStatus(false)}
        autoHideDuration={2000}
        message={props.notifyMessage}
        key={vertical + horizontal}
        ContentProps={{
          sx: {
            background: props.error ? "red" : "green"
          }
        }
        }
      /></>
  )
}

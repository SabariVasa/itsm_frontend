import * as React from 'react';
// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import UserManagmentTable from '../../Pages/UserManagmentTable';
import SearchTextField from '../HelperComponents/SearchTextField';

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function DraggableModal({open,setOpen,handleClickOpen,handleClose}) {


  return (
    <React.Fragment>
      <Dialog
        fullWidth
        maxWidth="lg"
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <SearchTextField/>
        <DialogContent>
            <UserManagmentTable handleClose={handleClose}/>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

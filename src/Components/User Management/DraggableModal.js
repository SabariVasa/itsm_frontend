import * as React from 'react';
// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import UserManagmentTable from '../../Pages/userManagement/UserManagmentTable';
import SearchTextField from '../HelperComponents/SearchTextField';
import ManagementUserList from '../../Pages/userManagement/ManagementUserList';

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

export default function DraggableModal({ open, setRequesterEmail, setOpen, handleClickOpen, handleClose }) {


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
        <SearchTextField />
        <DialogContent>
          <ManagementUserList setRequesterEmail={setRequesterEmail} handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertComponent(props) {
//   const [open, setOpen] = React.useState(false);

 

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        {/* <DialogTitle>{"Are you sure?you want to delete"}</DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {"Are you sure? you want to delete"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{props.handleClose()}}>No</Button>
          <Button onClick={()=>{props.handleClose();props.deleteArticle()}}>Yes</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

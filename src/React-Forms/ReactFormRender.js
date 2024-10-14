import React, { useEffect, useRef } from "react";
import $ from "jquery";
// import "formBuilder/dist/form-builder.min.js";
// import "formBuilder";

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { Stack } from '@mui/material';
// import "formBuilder/docs/css/site.css";
// import "formBuilder/src/sass/form-builder.scss";
// import "formBuilder/src/sass/form-render.scss";


window.jQuery = $;
window.$ = $;
require("formBuilder/dist/form-render.min.js");
require("jquery-ui-sortable");
// require("formBuilder");

require("jquery-ui-sortable");
// require("formBuilder");

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



const ReactFormRender = ({ formData, open, handleClose }) => {
  const formRenderRef = useRef(null);
  //   const [refresh,setRefresh] = useState();

  //   useEffect(() => {
  //     if (formData && formRenderRef.current) {
  //       $(formRenderRef.current).formRender({
  //         formData:formData,
  //       });
  //     }
  //   }, [formData]);


  useEffect(() => {
    // console.log("formData",formData);
    console.log("formrender", $.fn.formRender); // This should print a function if it's loaded correctly
  }, []);


  useEffect(() => {
    // Form render options
    const formRenderOpts = {
      formData,
      dataType: 'json',
      render: true
    };
    if (open && formData && formRenderRef.current) {
      // console.log("inside ref",formValues)
      $(formRenderRef.current).formRender(formRenderOpts);
    }

    setTimeout(() => {
      $(formRenderRef.current).formRender(formRenderOpts);
    }, 0);
  }, [open, formData]);

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
        <DialogContent>
          {/* <UserManagmentTable handleClose={handleClose}/> */}
          <div>

            <div>
              <Stack style={{ display: 'flex', alignItems: "center", justifyContent: "space-around", paddingRight: 20, marginTop: 20 }} direction="row">
              </Stack>
              <div id="form-render" ref={formRenderRef}></div>
              {/* <button onClick={handleClose}>Close Preview</button> */}
            </div>

          </div>
        </DialogContent>
      </Dialog>

    </React.Fragment>

  );
};

export default ReactFormRender;

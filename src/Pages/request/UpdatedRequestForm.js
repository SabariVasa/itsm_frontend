import React, { useEffect, useState } from "react";
import GeneratedForm from "../../Components/cmdb/classmanagement/GeneratedForm";
import GlobalService from "../../services/GlobalService";
import { resturls } from "../../global/utils/apiurls";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { Box, Modal, Typography } from "@mui/material";
import ContentDevider from "../../Components/HelperComponents/ContentDevider";
import CreateRequestUserTable from "./CreateRequestUserTable";
import { useTheme } from "../../global/commonComponents/ThemeContext";

export default function UpdatedRequestForm() {
  const {
    catelogueId,
    // categotyId,
    request_id,
  } = useParams();
  const { theme } = useTheme();

  const [formData, setFormData] = useState({
    requestNumber: "",
    approvalStatus: "",
    openedBy: "",
    requestedFor: "",
    priority: "",
    assignedTo: "",
    dueDate: "",
    openedDate: "",
  });
  const [requestFormFields, setRequestFormFields] = useState([]);
  const [requestCreatedFormDetails, setRequestCreatedFormDetails] = useState({});
  const [selectedOpenedUser, setSelectedOpenedUser] = useState();
  const [selectedRequestForUser, setSelectedRequestForUser] = useState();
  const [selectedAssignedUser, setSelectedAssignedUser] = useState();
  // const [requestCountById, setRequestCountById] = useState("");
  const [callModal, setCallerModal] = useState(false);
  const [userSelecterTableModal, setUserSelecterTableModal] = useState();
  const [requestedFormFieldValue, setRequestedFormFieldValue] = useState();
  const [generatedFormId, setGeneratedFormId] = useState();

  // const handleDeleteClick = (e) => {
  // e.stopPropagation();
  // setOpen(true);
  // };

  // const handleClose = () => {
  // setOpen(false);
  // };

  // const deleteRequestInstance = () => {
  // GlobalService.generalSelect(
  // (respData) => {
  // const { estatus } = respData;
  // if (estatus) {
  // history.goBack();
  // }
  // },
  // `${resturls.deleteRequestInstance}/${request_id}`,
  // {},
  // "DELETE"
  // );
  // }

  // const handleConfirmDelete = () => {
  // deleteRequestInstance();
  // setOpen(false);
  // };

  // const getFormFieldsByCategoryId = () => {
  // GlobalService.generalSelect(
  // (respData) => {
  // const { estatus, data } = respData;
  // if (estatus) {
  // const foundObject = data?.find(
  // (item) => item?.generalInformation?.catelogueCatrgory?.id === catelogueId
  // );
  // setRequestFormFields(foundObject.generalInformation.attributes);
  // setRequestCreatedFormDetails(foundObject);
  // }
  // },
  // `${resturls.getByCategory}?categoryId=${catelogueId}`,
  // {},
  // "GET"
  // );
  // };

  // const catalogReqItmCount = () => {
  // GlobalService.generalSelect(
  // (respData) => {
  // const { estatus, data } = respData;
  // if (estatus) {
  // setRequestCountById(data);
  // setFormData((prevData) => ({ ...prevData, requestNumber: data, }));
  // }
  // },
  // `${resturls.catalogReqItmCount}/${categotyId}`,
  // {},
  // "GET"
  // );
  // };

  const handleCloseProfileModal = () => {
    setCallerModal(false);
  };

  // const handleInputChange = (e) => {
  // const { name, value } = e.target;
  // setFormData((prevData) => ({ ...prevData, [name]: value }));
  // };

  // const handleDateChange = (name, date) => {
  // setFormData((prevData) => ({ ...prevData, [name]: date }));
  // };

  // useEffect(() => {
  // catalogReqItmCount();
  // if (catelogueId) {
  // getFormFieldsByCategoryId();
  // }
  // }, [catelogueId]);

  // const handleSubmit = (e) => {
  // e.preventDefault();
  // GlobalService.generalSelect((respData) => {
  // const { estatus } = respData;
  // if (estatus) {
  // history.goBack();
  // }
  // }, `${resturls.updateRequestInstance}/${request_id}`, formData, "PUT");
  // console.log("Form Data Submitted:", formData);
  // };
  // 
  // const handleUSerSelectModal = (modal) => {
  // setUserSelecterTableModal(modal);
  // setCallerModal(true)
  // };

  useEffect(() => {
    if (request_id) {
      GlobalService.generalSelect(
        (respData) => {
          const { data, attributes } = respData;
          if (data) {
            setFormData({
              requestNumber: data.generatedRequestFormData.requestNumber || "",
              approvalStatus: data.generatedRequestFormData.approvalStatus || "",
              openedBy: {
                id: data?.generatedRequestFormData.openedBy?.id || "",
                name: data?.generatedRequestFormData.openedBy?.name || "",
              },
              requestedFor: {
                id: data?.generatedRequestFormData.requestedFor?.id || "",
                name: data?.generatedRequestFormData.requestedFor?.name || "",
              },
              priority: data.generatedRequestFormData.priority || "",
              assignedTo: {
                id: data?.generatedRequestFormData.assignedTo?.id || "",
                name: data?.generatedRequestFormData.assignedTo?.name || "",
              },
              dueDate: data.generatedRequestFormData.dueDate || "",
              openedDate: data.generatedRequestFormData.openedDate || "",
            });
            setGeneratedFormId(data.generateFormId);
            setRequestedFormFieldValue(data.value)
            setRequestFormFields(attributes);
            setRequestCreatedFormDetails(data);
          }
        },
        `${resturls.fetchRequestInstance}/${request_id}`,
        {},
        "GET"
      );
    }
  }, [request_id]);

  useEffect(() => {
    if (selectedOpenedUser || selectedRequestForUser || selectedAssignedUser) {
      setFormData((prevData) => ({
        ...prevData,
        openedBy: {
          id: selectedOpenedUser?.id || "",
          name: selectedOpenedUser?.emailAddress || ""
        } || {},
        requestedFor: {
          id: selectedRequestForUser?.id || "",
          name: selectedRequestForUser?.emailAddress || ""
        } || {},
        assignedTo: {
          id: selectedAssignedUser?.id || "",
          name: selectedAssignedUser?.emailAddress || ""
        },
      }));
      setCallerModal(false);
    }
  }, [selectedOpenedUser, selectedRequestForUser, selectedAssignedUser]);

  return (
    <>
      <ContentDevider title={request_id ? "Update Request" : "Create Request"} />
      <div className="p-[4vh]">
        <Box clasName="flex items-center justify-between p-4">
          <span style={{ color: `${theme.subHeaderFontColor}` }}>
            {requestCreatedFormDetails?.generalInformation?.serviceRequestName}
          </span>
          <Typography style={{ color: `${theme.subHeaderFontColor}` }}>
            {requestCreatedFormDetails?.generalInformation?.serviceRequestDescription}
          </Typography>
        </Box>
        {/* <Formik
          initialValues={formData}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting, setFieldValue }) => (
            <Form onSubmit={handleSubmit}>
              <Grid item xs={12} sx={{ margin: '2em' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '0.5em' }}>
                  <Button 
                  sx={{
                    background: `${theme.btnHoverColor}`,
                    color: `${theme.outerBodyfontColor}`,
                    '&:hover': {
                      backgroundColor: `${theme.btnHoverColor}`,
                    },
                  }}
                  onClick={handleDeleteClick}>
                    Delete
                  </Button>
                  <Button 
                  type="submit"
                  sx={{
                    background: `${theme.btnColor}`,
                    color: `${theme.outerBodyfontColor}`,
                    '&:hover': {
                      backgroundColor: `${theme.btnHoverColor}`,
                    },
                  }}
                  >
                    Update
                  </Button>
                </Box>
                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>Confirm Delete</DialogTitle>
                  <DialogContent>
                    <Typography>
                      Are you sure you want to delete this service request? This action cannot be undone.
                    </Typography>
                  </DialogContent>
                  <DialogActions style={{ justifyContent: "center" }}>
                    <Button
                      sx={{
                        background: `${theme.btnColor}`,
                        color: `${theme.outerBodyfontColor}`,
                        '&:hover': {
                          backgroundColor: `${theme.btnHoverColor}`,
                        },
                      }}
                      onClick={handleConfirmDelete}
                    >
                      Yes
                    </Button>
                    <Button
                      sx={{
                        background: `${theme.btnColor}`,
                        color: `${theme.outerBodyfontColor}`,
                        '&:hover': {
                          backgroundColor: `${theme.btnHoverColor}`,
                        },
                      }}
                      onClick={handleClose}
                    >
                      No
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    sx={sharedStyles}
                    name="requestNumber"
                    label="Request Number"
                    value={formData.requestNumber}
                    disabled
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    select
                    sx={sharedStyles}
                    name="approvalStatus"
                    label="Status"
                    value={formData.approvalStatus}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: true }}
                  >
                    <MenuItem value="Completed">Completed</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Inprogress">Inprogress</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    sx={{...sharedStyles, height: '4em'}}
                    placeholder="Opened By"
                    label="Opened By"
                    name="openedBy"
                    value={formData.openedBy.name}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      sx: { height: '4em' },
                      endAdornment: (
                        <IconButton
                          type="button"
                          onClick={() => handleUSerSelectModal('openedBy')}
                          aria-label="Search Opened By"
                        >
                          <SearchIcon />
                        </IconButton>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    sx={{...sharedStyles, height: '4em'}}
                    label="Requested For"
                    placeholder="Requested For"
                    name="requestedFor"
                    InputLabelProps={{ shrink: true }}
                    value={formData.requestedFor.name}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                    InputProps={{
                      sx: { height: '4em' },
                      endAdornment: (
                        <IconButton
                          type="button"
                          onClick={() => handleUSerSelectModal('requestedFor')}
                          aria-label="Search Requested For"
                        >
                          <SearchIcon />
                        </IconButton>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                      fullWidth
                      sx={{ ...sharedStyles, height: 56 }}
                      placeholder="Assigned To"
                      name="assignedTo"
                      label="Assigned To"
                      InputLabelProps={{ shrink: true }}
                      value={formData.assignedTo.name}
                      onChange={handleInputChange}
                      variant="outlined"
                      size="small"
                      InputProps={{
                        sx: { height: '4em' },
                        endAdornment: (
                          <IconButton
                            type="button"
                            onClick={() => handleUSerSelectModal('assignedTo')
                            }
                            aria-label="Search Assigned To"
                          >
                            <SearchIcon />
                          </IconButton>
                        ),
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    select
                    sx={sharedStyles}
                    name="priority"
                    label="Priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: true }}
                  >
                    <MenuItem value="High">High</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Low">Low</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    sx={sharedStyles}
                    name="dueDate"
                    label="Due Date"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => handleDateChange("dueDate", e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    sx={sharedStyles}
                    name="openedDate"
                    label="Opened Date"
                    type="date"
                    value={formData.openedDate}
                    onChange={(e) => handleDateChange("openedDate", e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
              {console.log(values, 'values')}
            </Form>
          )}
        </Formik> */}
        <GeneratedForm
          isUpdate={generatedFormId}
          // value={formData}
          formFields={requestFormFields}
          in
          catelogueId={catelogueId}
          requestCreatedFormDetails={requestCreatedFormDetails}
          requestId={request_id}
          formData={formData}
        />
      </div>

      <Modal
        open={callModal}
        onClose={handleCloseProfileModal}
        aria-labelledby="profile-modal-title"
        aria-describedby="profile-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            height: 450,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <CreateRequestUserTable
            setSelectedOpenedUser={setSelectedOpenedUser}
            selectedOpenedUser={selectedOpenedUser}
            selectedRequestForUser={selectedRequestForUser}
            setSelectedRequestForUser={setSelectedRequestForUser}
            selectedAssignedUser={selectedAssignedUser}
            setSelectedAssignedUser={setSelectedAssignedUser}
            userSelecterTableModal={userSelecterTableModal}
          />
        </Box>
      </Modal>
    </>
  );
}

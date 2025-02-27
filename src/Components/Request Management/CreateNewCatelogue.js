import React, { useEffect, useState } from 'react';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Modal,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import "./requestmanagement.module.scss";
import CraeteCatelogueGeneratedForm from "./CraeteCatelogueGeneratedForm";
import GeneralRequestInformation from "./GeneralRequestInformation";
import GlobalService from "../../services/GlobalService";
import { resturls } from "../../global/utils/apiurls";
import AddRequestItems from "./AddRequestItems";
import CatelogueFlowFormDetails from "./CatelogueFlowFormDetails";
import PreviewSubmitFormDetails from "./PreviewSubmitFormDetails";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { sharedStyles } from "../../commonComponents/StyledComponents";
import { useTheme } from "../../global/commonComponents/ThemeContext";

const steps = [
  "General Information",
  "Add Requirement Item",
  "Catalogue Flow",
  "Submit Request",
];

const validationSchema = [
  Yup.object({
    serviceRequestName: Yup.string().required("Required"),
    serviceRequestDescription: Yup.string().required("Required"),
    selectCatelogue: Yup.object()
      .typeError("Must be an object")
      .required("Required"),
    catelogueCatrgory: Yup.object()
      .typeError("Must be an object")
      .required("Required"),
    // catalogueSubCategory: Yup.object()
    //   .typeError('Must be an object')
    //   .required('Required'),
    // : Yup.string().required('Required'),
    // catalogueSubCategory: Yup.string().required('Required'),
    turnAroundTime: Yup.string().required("Required"),
  }),
  // Yup.object({
  //   catalogueFlowField1: Yup.string().required('Required'),
  //   catalogueFlowField2: Yup.string().required('Required'),
  // }),
];

const styles = {
  modalStyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "1em",
  },
};

const CreateNewCatelogue = (props) => {
  // const { setFormFields, formFields } = props;
  const [formFields, setFormFields] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [newCatalogue, setNewCatalogue] = useState("");
  const [modalItem, setAddModalItem] = useState();
  const [selectedCatelogue, setSelectedCatelogue] = useState();
  const [selectedCategory, setSelectedCatecory] = useState();
  const [selectedSubCategory, setSelectedSubCatecory] = useState();
  const [catelogueLists, setCatelogueLists] = useState();
  const [categoryLists, setCategoryLists] = useState();
  const [subCategoryLists, setSubCategoryLists] = useState();
  const [createdCatelogueItem, setCreatedCatelogueItem] = useState();
  const [showSelectedItemList, setShowSelectedItemList] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [catelogueFlowDetails, setCatelogueFlowDetails] = useState();
  const [turnAroundTimeList, setTurnAroundTimeList] = useState([]);
  const [formValues, setFormValues] = useState({
    generalInformation: {
      serviceRequestName: "",
      serviceRequestDescription: "",
      selectCatelogue: "",
      catelogueCatrgory: "",
      catalogueSubCategory: "",
      turnAroundTime: "",
      // tat: '',
    },
    catalogueFlow: {
      serviceRequestAccess: "",
      srLandingAssignmentGroup: "",
      approvalRequired: false,
      approversName: "",
      approvalAssignmentGroup: "",
      createChangeRequest: false,
      changeRequestName: "",
      changeRequestDescription: "",
      changePriorityLevel: "",
    },
  });

  const { theme } = useTheme();
  const history = useHistory();

  const handleOpen = (modalItemName, selectedItem, categoryId) => {
    console.log(selectedItem, modalItemName, categoryId, "selectedItem");
    setOpen(true);
    setAddModalItem(modalItemName);
    setSelectedCatelogue(selectedItem);
    setSelectedCatecory(categoryId);
  };

  console.log(
    selectedCatelogue,
    selectedCategory,
    "selectedCategory,selectedCatelogue"
  );
  const handleClose = () => {
    setOpen(false);
    setNewCatalogue("");
  };

  const obtainAllCatelogueDetails = () => {
    GlobalService.generalSelect(
      (respdata) => {
        const { estatus, data } = respdata;
        if (estatus && data) {
          setCatelogueLists(data);
        }
      },
      resturls.fetchAllCatalogues,
      {},
      "GET"
    );
  };

  const handleAdd = (value) => {
    let url = "";
    let keyName = "";

    console.log(modalItem, url, "modalItem");

    switch (modalItem) {
      case "Select Catalogue":
        console.log(modalItem, url, "Select Catalogue");
        setCatelogueLists((prev) =>
          prev ? [...prev, newCatalogue] : [newCatalogue]
        );
        url = resturls.createCatalog;
        keyName = "catalogueName";
        break;

      case "Catalogue Category":
        setCategoryLists((prev) =>
          prev ? [...prev, newCatalogue] : [newCatalogue]
        );
        url = `${resturls.catelogueAddCategory}/${selectedCatelogue}`;
        keyName = "categoryName";
        break;

      case "Catalogue Sub-Category":
        console.log(modalItem, url, "Catalogue Sub-Category");
        setSubCategoryLists((prev) =>
          prev ? [...prev, newCatalogue] : [newCatalogue]
        );
        url = `${resturls.addSubCategory}?catalogueId=${selectedCatelogue}&categoryId=${selectedCategory}`;
        keyName = "subCategoryName";
        break;

      default:
        console.error("Invalid modalItem value");
        return;
    }

    GlobalService.generalSelect(
      (respdata) => {
        const { estatus, data } = respdata;
        if (estatus && data) {
          obtainAllCatelogueDetails();
        }
      },
      url,
      {
        [keyName]: newCatalogue,
      },
      "POST"
    );
    handleClose();
  };

  const obtainCatelogueDetails = () => {
    GlobalService.generalSelect(
      (respdata) => {
        const { estatus, data } = respdata;
        if (estatus && data) {
          setFormValues({
            generalInformation: {
              serviceRequestName: data.generalInformation.serviceRequestName,
              serviceRequestDescription:
                data.generalInformation.serviceRequestDescription,
              selectCatelogue: data.generalInformation.selectCatelogue,
              catelogueCatrgory: data.generalInformation.catelogueCatrgory,
              catalogueSubCategory: data.generalInformation,
              turnAroundTime: data.generalInformation.turnAroundTime,
              // tat: '',
            },
          });
          setFormFields(data.generalInformation.attributes);
          setCatelogueFlowDetails(data);
          setShowSelectedItemList(data.addRequiredItem.requestItems || []);
          if (data.addRequiredItem.requestItems.length > 0) {
            setHeaders(() =>
              getDynamicHeaders(data.addRequiredItem.requestItems)
            );
          }
        }
      },
      `${resturls.fetchCatalogItem}/${createdCatelogueItem}`,
      {},
      "GET"
    );
  };

  const notifySuccess = (message) => {
    toast.success(message, {
      duration: 4000,
      position: "top-right",
    });
  };

  const handleNext = (values) => {
    const catelogueAddCategoryFlowDetailInfo = {
      serviceRequestAccess: values.serviceRequestAccess,
      srLandingAssignmentGroup: values.srLandingAssignmentGroup,
      approversName: values.approversName,
      approvalAssignmentGroup: values.approvalAssignmentGroup,
    };

    const {
      serviceRequestAccess,
      srLandingAssignmentGroup,
      approversName,
      approvalAssignmentGroup,
      approvalRequired,
      ...remainingValues
    } = values;

    // Now `remainingValues` contains the `values` object without the removed properties
    const generalInfo = {
      ...remainingValues,
      attributes: formFields,
    };

    console.log(generalInfo, "generalInformation");

    if (!createdCatelogueItem) {
      // Create catalog item
      GlobalService.generalSelect(
        (respdata) => {
          const { estatus, data, emessage } = respdata;
          if (estatus && data) {
            console.log("Data received for create:", data);
            notifySuccess(emessage);
            setCreatedCatelogueItem(data.catalogItemId);
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
          }
        },
        resturls.createCatalogItem,
        {
          generalInformation: generalInfo,
          author_email: localStorage.getItem("ses_username"),
          // author_name: localStorage.getItem('ses_username')
        },
        "POST"
      );
    } else {
      // Update catalog item
      GlobalService.generalSelect(
        (respdata) => {
          const { estatus, data } = respdata;
          if (estatus && data) {
            console.log("Data received for update:", data);
            setCreatedCatelogueItem(data.catalogItemId);
            if (activeStep === 3) {
              history.goBack();
            } else {
              setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
          }
        },
        `${resturls.updateCatalogItems}/${createdCatelogueItem}`,
        {
          generalInformation: generalInfo,
          addRequiredItem: {
            requestItems: showSelectedItemList || [],
          },
          catalogueFlow: {
            ...catelogueAddCategoryFlowDetailInfo,
          },
          author_email: localStorage.getItem("ses_username"),
        },
        "POST"
      );
    }
  };

  console.log(catelogueFlowDetails, "catelogueFlowDetails");

  const handleBack = () => {
    obtainCatelogueDetails();
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getDynamicHeaders = (values) => {
    const keys = Object.keys(values[0]);

    if (values?.length > 0) {
      const excludeFields = [
        "id",
        "notes",
        "catalogueDetails",
        "categoryDetails",
        "subCategoryDetails",
        "subCategory",
        "priority",
        "serviceCategory",
        "configurationItem",
        "impactReason",
        "urgencyReason",
        "createdBy",
        "requestedFor",
        "updatedBy",
        "requestType",
        "generateFormId",
        "values",
        "dueDate",
      ];

      const dynamicHeaders = Object.keys(keys)
        .filter((key) => !excludeFields.includes(key) || key !== "id")
        .map((key, index) => {
          if (index === 0) {
            return {
              field: key,
              headerName: key
                .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space between camel case
                .replace(/[_]/g, " ") // Replace underscores with spaces
                .toLowerCase() // Convert all to lowercase
                .replace(/\b\w/g, (char) => char.toUpperCase()), // Capitalize first letter of each word
              width: 200,
              renderCell: (params) => (
                <span
                  onClick={() =>
                    history.push(`update-request/${params.row.requestNumber}`)
                  }
                  style={{
                    textDecoration: "underline",
                    color: "#1976d2",
                    cursor: "pointer",
                  }}
                >
                  {params.value || "N/A"}
                </span>
              ),
            };
          }
          switch (key) {
            case "catalogueDetails":
            case "approvalStatus":
              return { field: key, headerName: "Status" };
            case "openedBy":
            case "assignedTo":
              return {
                field: key,
                width: 500,
                headerName: key
                  .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space between camel case
                  .replace(/[_]/g, " ") // Replace underscores with spaces
                  .toLowerCase() // Convert all to lowercase
                  .replace(/\b\w/g, (char) => char.toUpperCase()), // Capitalize first letter of each word
                width: 200,
                renderCell: (params) => params.value?.name || "N/A",
              };
            default:
              return {
                field: key,
                headerName: key
                  .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space between camel case
                  .replace(/[_]/g, " ") // Replace underscores with spaces
                  .toLowerCase() // Convert all to lowercase
                  .replace(/\b\w/g, (char) => char.toUpperCase()),
                width: 150,
              };
          }
        });
      return dynamicHeaders;
    }
  };

  console.log(activeStep, "activeStep");

  const StepIcon = (props) => {
    // console.log(props, 'propsStepIcon');
    const { active, completed, icon } = props;

    return (
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: "50%",
          background: active
            ? `${theme.btnColor}` // Active circle color
            : completed
            ? `${theme.btnColor}` // Completed circle color
            : "grey", // Default circle color
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {completed ? "✔" : icon}
      </div>
    );
  };

  // console.log(categoryLists, 'categoryLists');

  useEffect(() => {
    obtainAllCatelogueDetails();
    if (activeStep === 3) {
      obtainCatelogueDetails();
    }
  }, []);

  useEffect(() => {
    if (activeStep === 3) {
      obtainCatelogueDetails();
    }
  }, [activeStep]);

  return (
    <Box sx={{ width: "100%", padding: 2 }}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          "& .MuiStepLabel-label.Mui-active": {
            background: `${theme.btnColor}`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          },
          "& .MuiStepLabel-label.Mui-completed": {
            background: `${theme.btnColor}`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          },
        }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={StepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === steps.length ? (
        <Box sx={{ mt: 2 }}>
          <h3>All steps completed</h3>
          <Button variant="contained" onClick={() => setActiveStep(0)}>
            Reset
          </Button>
        </Box>
      ) : (
        <Formik
          initialValues={
            activeStep === 0
              ? formValues.generalInformation
              : activeStep === 2 && formValues.catalogueFlow
          }
          validationSchema={validationSchema[activeStep]}
          onSubmit={(values) => {
            if (activeStep < steps.length - 1) {
              handleNext(values);
            }
          }}
        >
          {({ errors, touched, handleChange, setFieldValue, values }) => (
            <Form>
              {activeStep === 0 && (
                <div style={{ margin: "2em" }}>
                  {console.log(values, errors, touched, "catelogueForm")}
                  <GeneralRequestInformation
                    selectedCatelogue={selectedCatelogue}
                    setSelectedCatelogue={setSelectedCatelogue}
                    selectedCategory={selectedCategory}
                    setSelectedCatecory={setSelectedCatecory}
                    selectedSubCategory={selectedSubCategory}
                    setSelectedSubCatecory={setSelectedSubCatecory}
                    catelogueLists={catelogueLists}
                    categoryLists={categoryLists}
                    subCategoryLists={subCategoryLists}
                    setCategoryLists={setCategoryLists}
                    setSubCategoryLists={setSubCategoryLists}
                    values={values}
                    handleChange={handleChange}
                    touched={touched}
                    errors={errors}
                    setFieldValue={setFieldValue}
                    handleOpen={handleOpen}
                    turnAroundTimeList={turnAroundTimeList}
                    setTurnAroundTimeList={setTurnAroundTimeList}
                  />
                  <CraeteCatelogueGeneratedForm
                    formFields={formFields}
                    setFormFields={setFormFields}
                  />
                </div>
              )}
              {activeStep === 1 && (
                <AddRequestItems
                  showSelectedItemList={showSelectedItemList}
                  setShowSelectedItemList={setShowSelectedItemList}
                  headers={headers}
                  setHeaders={setHeaders}
                  getDynamicHeaders={getDynamicHeaders}
                />
              )}
              {activeStep === 2 && (
                <CatelogueFlowFormDetails
                  values={values}
                  handleChange={handleChange}
                  touched={touched}
                  errors={errors}
                  setFieldValue={setFieldValue}
                />
              )}
              {activeStep === 3 && (
                <PreviewSubmitFormDetails
                  formFields={formFields}
                  catelogueFlowDetails={catelogueFlowDetails}
                />
              )}
              <Box
                sx={{
                  mt: 2,
                  mr: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: "1em",
                }}
              >
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  variant="contained"
                  // color="#6d1f95"
                  // sx={{ background: `${theme.btnHoverColor}` }}
                  sx={{
                    background: `${theme.btnHoverColor}`,
                    color: `${theme.outerBodyfontColor}`,
                    "&:hover": {
                      backgroundColor: `${theme.btnHoverColor}`,
                    },
                  }}
                >
                  Back
                </Button>
                {activeStep < steps.length - 1 ? (
                  <Button
                    sx={{
                      background: `${theme.btnColor}`,
                      color: `${theme.outerBodyfontColor}`,
                      "&:hover": {
                        backgroundColor: `${theme.btnColor}`,
                      },
                    }}
                    variant="contained"
                    type="submit"
                  >
                    {!createdCatelogueItem ? "Next" : "Update&Next"}
                  </Button>
                ) : (
                  <Button
                    sx={{
                      background: `${theme.btnColor}`,
                      color: `${theme.outerBodyfontColor}`,
                      "&:hover": {
                        backgroundColor: `${theme.btnColor}`,
                      },
                    }}
                    variant="contained"
                    onClick={() => {
                      history.push('/superadmin/request-management/my-requests'); 
                      notifySuccess("Created Catelogue SuccessFully Submitted");
                    }}
                  >
                    Submit
                  </Button>
                )}
              </Box>
            </Form>
          )}
        </Formik>
      )}
      <Modal open={open} onClose={handleClose}>
        <Box sx={styles.modalStyle}>
          <Typography
            variant="h6"
            component="h2"
            sx={{ mb: 2, color: `${theme.valueFontColor}` }}
          >
            {`Add New ${modalItem}`}
          </Typography>
          <TextField
            fullWidth
            label={modalItem}
            value={newCatalogue}
            onChange={(e) => setNewCatalogue(e.target.value)}
            sx={sharedStyles}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAdd}
            fullWidth
            sx={{
              mt: 2,
              background: `${theme.btnColor}`,
            }}
          >
            Add
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default CreateNewCatelogue;
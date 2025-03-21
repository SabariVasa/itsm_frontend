import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  TextField,
  IconButton,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { DatePicker } from "@mui/x-date-pickers";
import GlobalService from "../../../services/GlobalService";
import { resturls } from "../../../global/utils/apiurls";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { parseISO } from "date-fns";
import {
  CustomTextField,
  sharedStyles,
  StyledIcon,
} from "../../../commonComponents/StyledComponents";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useTheme } from "../../../global/commonComponents/ThemeContext";
import { useAuth } from "../../../application/modules/auth/hooks/useAuth";
import { UserListModal } from "../../../presentation/components/users/UsersListModal";
import toast from "react-hot-toast";

function GeneratedForm(props) {
  const history = useHistory();
  const {
    user_auth: { userId, emailAddress },
  } = useAuth();
  const {
    formFields = [],
    setFormFields,
    isUpdate,
    t,
    createBtn,
    generatedForm,
    selectCategoryType,
    className,
    setCallMethod,
    logo,
    selectedClass,
    initialValues = {},
    isEditMode,
    selectedItemId,
    catelogueId,
    requestId,
    requestCreatedFormDetails,
    searchOptedEmails = {},
  } = props;

  const { theme } = useTheme();

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const createValidationSchema = (fields) => {
    const shape = {};

    fields.forEach((field) => {
      switch (field.fieldType) {
        case "Text":
          shape[field.fieldName] = Yup.string().required(
            `${field.fieldName} is required`
          );
          break;
        case "Number":
          shape[field.fieldName] = Yup.number()
            .required(`${field.fieldName} is required`)
            .typeError(`${field.fieldName} must be a number`);
          break;
        case "Password":
          shape[field.fieldName] = Yup.string()
            .required(`${field.fieldName} is required`)
            .min(8, "Password must be at least 8 characters");
          break;
        case "Email":
          shape[field.fieldName] = Yup.string()
            .required(`${field.fieldName} is required`)
            .email("Invalid email format");
          break;
        case "Select":
          shape[field.fieldName] = Yup.string().required(
            `${field.fieldName} is required`
          );
          break;
        case "Boolean":
          shape[field.fieldName] = Yup.boolean();
          break;
        case "Date":
          shape[field.fieldName] = Yup.date()
            .required(`${field.fieldName} is required`)
            .nullable();
          break;
        case "Upload":
          const fileFormats = getAllowedFileExtensions(field.fileFormats);
          shape[field.fieldName] = Yup.mixed()
            .required(`${field.fieldName} is required`)
            .test(
              "fileFormat",
              `Unsupported format. Allowed formats: ${fileFormats.join(", ")}`,
              (value) => {
                if (!value || !value.name) return false;
                const fileExtension = value.name.split(".").pop().toLowerCase();
                return fileFormats.includes(fileExtension);
              }
            );
          break;
        default:
          break;
      }
    });

    return Yup.object().shape(shape);
  };

  const getAllowedFileExtensions = (fileFormat) => {
    const fileExtensionMap = {
      Image: ["jpg", "jpeg", "png", "webp", "gif"],
      PDF: ["pdf"],
      Excel: ["xls", "xlsx"],
    };

    return fileExtensionMap[fileFormat] || [fileFormat.toLowerCase()];
  };

  const handleRemoveField = (index) => {
    const updatedFields = formFields.filter((_, i) => i !== index);
    setFormFields(updatedFields);
  };

  const getGeneretedFormList = () => {
    GlobalService.generalSelect(
      (respdata) => {
        const { estatus, data } = respdata;
        if (estatus && data && data) {
          setFormFields([]);
          setCallMethod(false);
        }
      },
      resturls.CreateClass,
      {
        attributes: formFields,
        itemRequirement: selectCategoryType,
        className,
        image: logo,
      },
      "POST"
    );
  };

  const notifySuccess = (message) => {
    toast.success(message, history.goBack(), {
      duration: 4000,
      position: "top-right",
    });
  };

  const notifyError = (message) => {
    toast.error(message, history.goBack(), {
      duration: 4000,
      position: "top-right",
    });
  };

  const addItemRequirement = (values) => {
    let url = "";
    let requestBody = {};
    let method = "POST";

    if (isEditMode) {
      url = resturls.updateClassInstance;
      requestBody = {
        id: selectedItemId,
        values,
        classCategoryId: selectedClass,
      };
      method = "PUT";
    } else if (catelogueId) {
      url = resturls.createRequestInstance;
      requestBody = {
        approvalStatus: "Pending",
        catalogueDetails:
          requestCreatedFormDetails.generalInformation.selectCatelogue,
        categoryDetails:
          requestCreatedFormDetails.generalInformation.catelogueCatrgory,
        subCategoryDetails:
          requestCreatedFormDetails.generalInformation.catalogueSubCategory,
        values: { ...values },
        priority: "Low",
        openedDate: new Date().toISOString().split(".")[0],
        openedBy: { id: userId, name: emailAddress },
        generateFormId: catelogueId,
        createdBy: { id: userId, name: emailAddress },
        updatedBy: { id: userId, name: emailAddress },
      };
    } else if (isUpdate !== null) {
      url = `${resturls.updateRequestInstance}/${requestId}`;
      requestBody = {
        generatedId: catelogueId,
        catalogueDetails:
          requestCreatedFormDetails.generalInformation.selectCatelogue,
        categoryDetails:
          requestCreatedFormDetails.generalInformation.catelogueCatrgory,
        subCategoryDetails:
          requestCreatedFormDetails.generalInformation.catalogueSubCategory,
        ...values,
        openedBy: emailAddress,
        generateFormId: requestCreatedFormDetails.catalogItemId,
        createdBy: { id: userId, name: emailAddress },
        updatedBy: { id: userId, name: emailAddress },
      };
      method = "PUT";
    } else {
      url = resturls.CreateClassInstance;
      requestBody = { values, classCategoryId: selectedClass };
    }
    GlobalService.generalSelect(
      (respdata) => {
        const { estatus, emessage } = respdata;
        if (estatus) {
          notifySuccess(emessage);
          setTimeout();
          history.goBack();
        } else {
          notifyError(emessage);
        }
      },
      url,
      requestBody,
      method
    );
  };
  const initialFormValues = formFields?.reduce((acc, curr) => {
    if (curr.fieldType === "Date") {
      acc[curr.fieldName] =
        isEditMode &&
        initialValues &&
        initialValues[curr.fieldName] !== undefined
          ? parseISO(initialValues[curr.fieldName])
          : null;
    } else if (curr.fieldType === "Select") {
      acc[curr.fieldName] =
        isEditMode &&
        initialValues &&
        initialValues[curr.fieldName] !== undefined
          ? initialValues[curr.fieldName]
          : "";
    } else {
      acc[curr.fieldName] = initialValues[curr.fieldName]
        ? initialValues[curr.fieldName]
        : "";
    }
    return acc;
  }, {});

  const [fileName, setFileName] = useState("");

  const handleFileChange = async (event, setFieldValue, fieldName) => {
    const file = event.target.files[0];
    if (file) {
      const base64File = await convertToBase64(file);
      setFileName(file.name);
      setFieldValue(fieldName, {
        base64: base64File,
        name: file.name,
        type: file.type,
      });
    }
  };

  return (
    <div>
      {formFields ? (
        <>
          {createBtn && (
            <div
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                gap: "0.5em",
              }}
            >
              <ArrowBackIcon
                sx={{ color: `${theme.valueFontColor}` }}
                onClick={() => setCallMethod(false)}
              />
              <h3
                style={{
                  background: `${theme.outerBody}`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  width: "20%",
                }}
              >
                Add Config Items
              </h3>
            </div>
          )}
          <Box mt={2}>
            <Formik
              enableReinitialize
              initialValues={initialFormValues}
              validationSchema={createValidationSchema(formFields)}
              onSubmit={(values, { resetForm }) => {
                addItemRequirement(values);
                resetForm();
              }}
            >
              {({
                handleSubmit,
                handleChange,
                setFieldValue,
                values,
                errors,
                touched,
                resetForm,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    {formFields.map((field, index) => (
                      <React.Fragment key={index}>
                        <Grid item xs={6}>
                          <h4
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            {(selectedClass === "" || generatedForm) && (
                              <IconButton
                                onClick={() => handleRemoveField(index)}
                                color="warning"
                              >
                                <RemoveCircleIcon />
                              </IconButton>
                            )}
                          </h4>
                          {field.fieldType === "Text" && (
                            <TextField
                              label={field.fieldName}
                              sx={sharedStyles}
                              name={field.fieldName}
                              value={values[field.fieldName]}
                              placeholder={field.description || ""}
                              onChange={handleChange}
                              fullWidth
                              error={
                                touched[field.fieldName] &&
                                Boolean(errors[field.fieldName])
                              }
                              helperText={
                                touched[field.fieldName] &&
                                errors[field.fieldName]
                              }
                            />
                          )}
                          {field.fieldType === "Number" && (
                            <TextField
                              label={field.fieldName}
                              name={field.fieldName}
                              type="number"
                              sx={sharedStyles}
                              value={values[field.fieldName]}
                              placeholder={field.description || ""}
                              onChange={handleChange}
                              fullWidth
                              error={
                                touched[field.fieldName] &&
                                Boolean(errors[field.fieldName])
                              }
                              helperText={
                                touched[field.fieldName] &&
                                errors[field.fieldName]
                              }
                            />
                          )}
                          {field.fieldType === "Password" && (
                            <TextField
                              label={field.fieldName}
                              name={field.fieldName}
                              type="password"
                              sx={sharedStyles}
                              value={values[field.fieldName]}
                              placeholder={field.description || ""}
                              onChange={handleChange}
                              fullWidth
                              error={
                                touched[field.fieldName] &&
                                Boolean(errors[field.fieldName])
                              }
                              helperText={
                                touched[field.fieldName] &&
                                errors[field.fieldName]
                              }
                            />
                          )}
                          {field.fieldType === "Email" && (
                            <div style={{ position: "relative" }}>
                              <TextField
                                label={field.fieldName}
                                name={field.fieldName}
                                value={values[field.fieldName]}
                                InputLabelProps={{ shrink: true }}
                                type="email"
                                sx={sharedStyles}
                                placeholder={field.description || ""}
                                onChange={handleChange}
                                disabled={searchOptedEmails[field.fieldName]}
                                fullWidth
                                error={
                                  touched[field.fieldName] &&
                                  Boolean(errors[field.fieldName])
                                }
                                helperText={
                                  touched[field.fieldName] &&
                                  errors[field.fieldName]
                                }
                              />
                              {searchOptedEmails[field.fieldName] && (
                                <UserListModal
                                  onSelect={(selectedItem, { onClose }) => {
                                    setFieldValue(
                                      field.fieldName,
                                      selectedItem.emailAddress
                                    );
                                    onClose();
                                  }}
                                  TriggerElement={({ onClick }) => (
                                    <StyledIcon
                                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9DY1tjGc0WbPmAFUTZRtS0YTRq4m7Q6Dpdw&s"
                                      alt="AI Icon"
                                      onClick={onClick}
                                      style={{
                                        width: 35,
                                        height: 35,
                                      }}
                                    />
                                  )}
                                />
                              )}
                            </div>
                          )}
                          {field.fieldType === "Boolean" && (
                            <FormControl component="fieldset" fullWidth>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "10px",
                                  borderRadius: "1em",
                                  padding: "10px",
                                }}
                              >
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      name={field.fieldName}
                                      checked={values[field.fieldName]}
                                      onChange={(event) =>
                                        setFieldValue(
                                          field.fieldName,
                                          event.target.checked
                                        )
                                      }
                                      sx={{
                                        color: "#ff7eb3",
                                        "&.Mui-checked": {
                                          color: `${theme.valueFontColor}`,
                                        },
                                      }}
                                    />
                                  }
                                  label="Required Field"
                                  sx={{
                                    color: `${theme.valueFontColor}`,
                                  }}
                                />
                              </div>
                            </FormControl>
                          )}
                          {field.fieldType === "Select" && (
                            <FormControl fullWidth>
                              <TextField
                                select
                                label={field.fieldName}
                                sx={sharedStyles}
                                name={field.fieldName}
                                value={values[field.fieldName]}
                                placeholder={field.description || ""}
                                onChange={handleChange}
                              >
                                {field.optionList &&
                                  field.optionList.map(
                                    (option, optionIndex) => (
                                      <MenuItem
                                        key={optionIndex}
                                        value={option}
                                      >
                                        {option}
                                      </MenuItem>
                                    )
                                  )}
                              </TextField>
                              {touched[field.fieldName] &&
                                errors[field.fieldName] && (
                                  <Typography color="error">
                                    {errors[field.fieldName]}
                                  </Typography>
                                )}
                            </FormControl>
                          )}
                          {field.fieldType === "Date" && (
                            <FormControl fullWidth>
                              <DatePicker
                                label={field.fieldName}
                                sx={sharedStyles}
                                value={values[field.fieldName]}
                                placeholder={field.description || ""}
                                onChange={(date) =>
                                  setFieldValue(field.fieldName, date)
                                }
                                renderInput={(params) => (
                                  <TextField {...params} />
                                )}
                              />
                            </FormControl>
                          )}
                          {field.fieldType === "Upload" && (
                            <>
                              <input
                                accept={getAllowedFileExtensions(
                                  field.fileFormats
                                )
                                  .map((ext) => `.${ext}`)
                                  .join(",")}
                                type="file"
                                onChange={(e) =>
                                  handleFileChange(
                                    e,
                                    setFieldValue,
                                    field.fieldName
                                  )
                                }
                                placeholder={field.description || ""}
                              />
                              <Typography variant="caption">
                                {fileName || "No file selected"}
                              </Typography>
                            </>
                          )}
                        </Grid>
                      </React.Fragment>
                    ))}
                  </Grid>
                  {console.log(createBtn,isEditMode,catelogueId,isUpdate, 'createBtn')}
                  {(!createBtn ||
                    !isEditMode ||
                    !catelogueId ||
                    isUpdate !== null) && (
                    <Box mt={2}>
                      <Button
                        type="submit"
                        sx={{
                          background: theme.outerBodyColor,
                          textTransform: "none",
                          "&:hover": {
                            backgroundColor: theme.btnHoverColor,
                          },
                        }}
                        variant="contained"
                        disabled={formFields.length === 0}
                        color="primary"
                      >
                        {t(isEditMode || isUpdate ? "Update" : "Create")}
                      </Button>
                    </Box>
                  )}
                </Form>
              )}
            </Formik>
            <Box mt={2}>
              {generatedForm && (
                <Box mt={2}>
                  <Button
                    sx={{
                      color: theme.fontColor,
                      background: theme.outerBodyColor,
                      "&:hover": {
                        backgroundColor: theme.btnHoverColor,
                      },
                    }}
                    type="submit"
                    variant="contained"
                    disabled={formFields.length === 0}
                    onClick={() => getGeneretedFormList()}
                    color="primary"
                  >
                    {t("submit_generated_form")}
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </>
      ) : (
        <span>Fields Not Found</span>
      )}
    </div>
  );
}

export default withTranslation()(GeneratedForm);

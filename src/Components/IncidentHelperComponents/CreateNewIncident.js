import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  TextareaAutosize,
} from "@mui/material";
import { resturls } from "../../global/utils/apiurls";
import GlobalService from "../../services/GlobalService";
import toast from "react-hot-toast";
import {
  CustomSelect,
  CustomTextField,
  GradientHeader,
  HeaderContainer,
  StyledFormContainer,
  StyledIcon,
  StyledPatternL,
  StyledPatternR,
} from "../../commonComponents/StyledComponents";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Snackbar from "@mui/material/Snackbar";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import DefaultLoader from "../../global/commonComponents/DefaultLoader";
import IncidentTabActiveNotes from "./IncidentTabActiveNotes";
import { UserListModal } from "../../presentation/components/users/UsersListModal";
import { useAuth } from "../../application/modules/auth/hooks/useAuth";
import { useTheme } from "../../global/commonComponents/ThemeContext";

const CreateIncidentForm = (props) => {
  const { isEdit } = props;
  const {
    user_auth: { userId, emailAddress },
  } = useAuth();
  const { incident_id } = useParams();
  const history = useHistory();
  const { theme } = useTheme();

  const [categoryType, setCategoryType] = useState();
  const [IncidentData, setIncidentData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [Number, setNumber] = useState();
  const [openWarning, setOpenWarning] = useState(false);
  const [openedDate, setOpenedDate] = useState();
  const [caller, setCaller] = useState();
  const [selectedCaller, setSelectedCaller] = useState({
    id: userId,
    emailAddress,
  });
  const [assignToMember, setAssignToMember] = useState({
    id: ``,
    emailAddress: ``,
  });
  
  const [selectedAssignTo, setSelectedAssignTo] = useState();
  const [comment, setComment] = useState("");
  const [value, setValue] = useState("1");
  const [callerDepartmentList, setCallerDepartmentList] = useState();
  const formatDateTime = () => {
    const date = new Date();
    const formattedDate = new Intl.DateTimeFormat("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date);

    const formattedTime = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    }).format(date);

    return `${formattedDate}, ${formattedTime}`;
  };
  const [intialValues, setIntialValues] = useState({
    state: "New",
    caller:
      {
        id: selectedCaller?.id,
        name: selectedCaller?.emailAddress,
      } || {},
    assignGroup: {
      id: "",
      name: "",
    },
    assignedTo:
      {
        id: assignToMember?.id,
        name: assignToMember?.emailAddress,
      } || {},
    category: "",
    subCategory: "",
    urgency: "",
    priority: "",
    callerDepartment: {
      id: "",
      name: "",
    },
    shortDescription: "",
    description: "",
    incidentId: Number,
    service: "",
    serviceCategory: "",
    createdBy: userId,
    impact: "",
    updatedBy: {
      id: userId,
      name: emailAddress,
    },
    notesUpdateTime: formatDateTime(),
  });
  const [notes, setNotes] = useState(IncidentData?.notes || []);

  const validationSchema = Yup.object({
    state: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
  });

  const getPriority = (urgency, impact) => {
    if (!urgency || !impact) return "Low";
    const priorityLookup = {
      "High-High": "Critical",
      "High-Medium": "High",
      "High-Low": "High",
      "Medium-High": "High",
      "Medium-Medium": "Medium",
      "Medium-Low": "Medium",
      "Low-High": "Medium",
      "Low-Medium": "Low",
      "Low-Low": "Low",
    };
    return priorityLookup[`${urgency}-${impact}`] || "";
  };

  const handleAddNote = () => {
    if (comment.trim()) {
      const noteObject = {
        text: comment,
        createdBy: emailAddress,
        timeStamp: formatDateTime(),
      };
      GlobalService.generalSelect(
        (response) => {
          const { estatus, emessage } = response;
          if (estatus) {
            setLoader(true);
            notifySuccess(emessage);
            history.goBack();
          } else {
            notifyError(emessage);
          }
        },
        `${resturls.addNotes}${incident_id}`,
        { ...noteObject },
        "PUT"
      );
      setNotes([noteObject, ...notes]);
      setComment("");
    } else {
      alert("Please enter a note before adding.");
    }
  };

  const getCategory = (value) => {
    GlobalService.generalSelect(
      (respdata) => {
        const { estatus, data } = respdata;
        if (estatus && data) {
          setCategoryType(data.categoryList);
        }
      },
      `${resturls.getCategory}/${value}`,
      {},
      "GET"
    );
  };

  const fetchDocumentCount = async () => {
    GlobalService.generalSelect(
      (response) => {
        const { estatus, data } = response;
        if (estatus) {
          setNumber(data);
        } else {
          notifyError("Sorry something went wrong");
        }
      },
      resturls.allIncidentCount,
      {},
      "GET"
    );
  };

  const obtainAssignGroup = () => {
    GlobalService.generalSelect(
      (response) => {
        const { estatus, data } = response;
        if (estatus) {
          setSelectedAssignTo(data);
        } else {
          setSelectedAssignTo();
        }
      },
      resturls.obtainAssignGroups,
      {},
      "GET"
    );
  };

  const userFetchGroups = () => {
    GlobalService.generalSelect(
      (response) => {
        const { estatus, data } = response;
        if (estatus) {
          setCallerDepartmentList(data);
        } else {
        }
      },
      `${resturls.userFetchGroups}/${userId}`,
      {},
      "GET"
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

  const submitHandler = (values) => {
    if (incident_id) {
      GlobalService.generalSelect(
        (response) => {
          const { estatus, emessage } = response;
          if (estatus) {
            notifySuccess(emessage);
          } else {
            notifyError(emessage);
          }
        },
        `${resturls.updateIncident}/${incident_id}`,
        { ...values, Notes: notes },
        "POST"
      );
    } else {
      GlobalService.generalSelect(
        (response) => {
          const { estatus, emessage } = response;
          if (estatus) {
            notifySuccess(emessage);
          } else {
            notifyError(emessage);
          }
        },
        resturls.createNewIncident,
        { ...values, incidentId: Number, notes: notes },
        "POST"
      );
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getIncidentData = () => {
    GlobalService.generalSelect(
      (respdata) => {
        const { estatus, data } = respdata;

        if (estatus) {
          setIncidentData(data[0]);
          const incidentValues = data[0];
          setIntialValues({
            state: incidentValues?.state,
            caller: incidentValues?.caller,
            assignGroup: incidentValues?.assignGroup,
            assignedTo: incidentValues?.assignedTo,
            category: incidentValues?.category,
            subCategory: incidentValues?.subCategory,
            urgency: incidentValues?.urgency,
            priority: incidentValues?.priority,
            callerDepartment: incidentValues?.callerDepartment,
            shortDescription: incidentValues?.shortDescription,
            description: incidentValues?.description,
            incidentId: incidentValues?.incidentId,
            service: incidentValues?.service,
            serviceCategory: incidentValues?.serviceCategory,
            impact: incidentValues?.impact,
            updatedBy: {
              id: userId,
              name: emailAddress,
            },
            notesUpdateTime: formatDateTime(),
          });
          setNotes([...incidentValues?.notes].reverse());
          getCategory(incidentValues?.category);
          setOpenedDate(incidentValues?.openedDate);
          setCaller(incidentValues?.caller);
          setLoader(false);
        }
      },
      `${resturls.getIncidentById}/${incident_id}`,
      {},
      "GET"
    );
  };

  useEffect(() => {
    fetchDocumentCount();
    obtainAssignGroup();
    userFetchGroups();
    if (incident_id) {
      setLoader(true);
      getIncidentData();
    }
    setSelectedCaller({
      id: userId,
      emailAddress,
    });
    setIntialValues({
      state: "New",
      caller:
        {
          id: selectedCaller?.id,
          name: selectedCaller?.emailAddress,
        } || {},
      assignGroup: {
        id: "",
        name: "",
      },
      assignedTo:
        {
          id: assignToMember?.id,
          name: assignToMember?.emailAddress,
        } || {},
      category: "",
      subCategory: "",
      urgency: "",
      priority: "",
      callerDepartment: {
        id: "",
        name: "",
      },
      shortDescription: "",
      description: "",
      incidentId: Number || "",
      service: "",
      serviceCategory: "",
      impact: "",
    });
  }, [isEdit]);

  useEffect(() => {
    if (selectedCaller) {
      userFetchGroups(selectedCaller?.id);
      setIntialValues((prev) => ({
        ...prev,
        caller: {
          id: selectedCaller?.id,
          name: selectedCaller?.emailAddress || "",
        },
      }));
    }

    if (assignToMember) {
      setIntialValues((prev) => ({
        ...prev,
        assignedTo: {
          id: assignToMember?.id,
          name: assignToMember?.emailAddress || "",
        },
      }));
    }
  }, [selectedCaller, assignToMember]);

  return (
    <div style={{ margin: "2em" }}>
      {loader ? (
        <DefaultLoader />
      ) : (
        <Formik
          enableReinitialize={true}
          initialValues={intialValues}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
        >
          {({ errors, touched, setFieldValue, values }) => (
            <Form>
              <HeaderContainer>
                <GradientHeader>
                  {incident_id ? "Update Incident" : "Create Incident"}
                </GradientHeader>
                <Button
                  sx={{
                    background: `${theme.btnColor}`,
                    color: `${theme.outerBodyfontColor}`,
                    "&:hover": {
                      backgroundColor: `${theme.btnHoverColor}`,
                    },
                    textTransform: 'none', // This will prevent the text from being uppercased
                  }}
                  type="submit"
                >
                  {isEdit ? "Update Incident" : "Create New Incident"}
                </Button>
              </HeaderContainer>
              <StyledFormContainer>
                <div style={{ position: "relative" }}>
                  <Field
                    name="incidentId"
                    label="Incident Id"
                    as={CustomTextField}
                    InputLabelProps={{ shrink: true }}
                    disabled={true}
                    value={values?.incidentId || Number}
                  />
                  {console.log(values?.incidentId, "values?.incidentId")}
                  <StyledPatternR style={{ opacity: 1 }} />
                </div>
                <FormControl style={{ position: "relative" }}>
                  <InputLabel id="state-label">State</InputLabel>
                  <Field
                    as={CustomSelect}
                    name="state"
                    labelId="state-label"
                    value={values.state}
                  >
                    <MenuItem value="New">New</MenuItem>
                    <MenuItem value="Open">Open</MenuItem>
                    <MenuItem value="In-Progress">In Progress</MenuItem>
                    <MenuItem value="onHold">On Hold</MenuItem>
                    <MenuItem value="Resolved">Resolved</MenuItem>
                  </Field>
                  <StyledPatternL style={{ opacity: 1 }} />
                </FormControl>
                <div style={{ position: "relative" }}>
                  <Field
                    name="caller"
                    as={CustomTextField}
                    label="Caller"
                    error={touched.caller && !!errors.caller}
                    helperText={touched.caller && errors.caller}
                    disabled={true}
                    value={values?.caller?.name}
                    InputLabelProps={{ shrink: true }}
                  />
                  <UserListModal
                    onSelect={(selectedItem, { onClose }) => {
                      setSelectedCaller(selectedItem);
                      onClose();
                    }}
                    TriggerElement={({ onClick }) => (
                      <StyledIcon
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9DY1tjGc0WbPmAFUTZRtS0YTRq4m7Q6Dpdw&s"
                        alt="AI Icon"
                        onClick={onClick}
                        style={{
                          opacity: 1,
                          width: 35,
                          height: 35,
                        }}
                      />
                    )}
                  />
                  <StyledPatternL style={{ opacity: 1 }} />
                </div>
                <FormControl style={{ position: "relative" }}>
                  <InputLabel id="callerDepartment-label">
                    Caller Group
                  </InputLabel>
                  <Field
                    as={CustomSelect}
                    name="callerDepartment"
                    label="Caller Department"
                    labelId="callerDepartment-label"
                    onChange={(event) => {
                      const selectedValue = event.target.value;
                      setFieldValue("callerDepartment", {
                        id: selectedValue.id,
                        name: selectedValue?.groupName,
                      });
                    }}
                    value={callerDepartmentList?.find(
                      (ele) => ele.id === values.callerDepartment?.id
                    )}
                  >
                    {callerDepartmentList?.map((ele) => (
                      <MenuItem
                        sx={{ color: `${theme.valueFontColor}` }}
                        key={ele.id}
                        value={ele}
                      >
                        {ele.groupName}
                      </MenuItem>
                    ))}
                  </Field>
                  <StyledPatternR style={{ opacity: 1 }} />
                </FormControl>
                <div style={{ position: "relative" }}>
                  <Field
                    name="assignedTo"
                    as={CustomTextField}
                    label="Assigned To"
                    error={touched.assignedTo && !!errors.assignedTo}
                    helperText={touched.assignedTo && errors.assignedTo}
                    disabled={true}
                    value={values?.assignedTo?.name}
                    InputLabelProps={{ shrink: true }}
                  />
                  <UserListModal
                    onSelect={(selectedItem, { onClose }) => {
                      setAssignToMember(selectedItem);
                      onClose();
                    }}
                    TriggerElement={({ onClick }) => (
                      <StyledIcon
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9DY1tjGc0WbPmAFUTZRtS0YTRq4m7Q6Dpdw&s"
                        alt="AI Icon"
                        onClick={onClick}
                        style={{
                          opacity: 1,
                          width: 35,
                          height: 35,
                        }}
                      />
                    )}
                  />

                  <StyledPatternR style={{ opacity: 1 }} />
                </div>
                <FormControl style={{ position: "relative" }}>
                  <InputLabel id="assignGroup-label">Assign Group</InputLabel>
                  <Field
                    as={CustomSelect}
                    name="assignGroup"
                    labelId="assignGroup-label"
                    onChange={(event) => {
                      const selectedValue = event.target.value;
                      setFieldValue("assignGroup", {
                        id: selectedValue.id,
                        name: selectedValue.groupName,
                      });
                      // setGropMemberList(selectedValue.groupMembers);
                    }}
                    value={
                      selectedAssignTo?.find(
                        (ele) => ele.id === values.assignGroup?.id
                      ) || "" // Match value by ID
                    }
                  >
                    {selectedAssignTo?.map((ele) => (
                      <MenuItem
                        key={ele.id}
                        value={ele}
                        sx={{ color: `${theme.valueFontColor}` }}
                      >
                        {ele.groupName}
                      </MenuItem>
                    ))}
                  </Field>
                  <StyledPatternL style={{ opacity: 1 }} />
                </FormControl>
                <FormControl style={{ position: "relative" }}>
                  <InputLabel id="urgency-label">Urgency</InputLabel>
                  <Field
                    as={CustomSelect}
                    name="urgency"
                    labelId="urgency-label"
                    onChange={(e) => {
                      const selectedUrgency = e.target.value;
                      setFieldValue("urgency", selectedUrgency);
                      const updatedPriority = getPriority(
                        selectedUrgency,
                        values.impact
                      );
                      setFieldValue("priority", updatedPriority);
                    }}
                  >
                    <MenuItem
                      sx={{ color: `${theme.valueFontColor}` }}
                      value="High"
                    >
                      High
                    </MenuItem>
                    <MenuItem
                      sx={{ color: `${theme.valueFontColor}` }}
                      value="Medium"
                    >
                      Medium
                    </MenuItem>
                    <MenuItem
                      sx={{ color: `${theme.valueFontColor}` }}
                      value="Low"
                    >
                      Low
                    </MenuItem>
                  </Field>
                  <StyledPatternL style={{ opacity: 1 }} />
                </FormControl>
                <FormControl style={{ position: "relative" }}>
                  <InputLabel id="priority-label">Impact</InputLabel>
                  <Field
                    as={CustomSelect}
                    name="impact"
                    labelId="priority-label"
                    onChange={(e) => {
                      const selectedImpact = e.target.value;
                      setFieldValue("impact", selectedImpact);
                      const updatedPriority = getPriority(
                        values.urgency,
                        selectedImpact
                      );
                      setFieldValue("priority", updatedPriority);
                    }}
                  >
                    <MenuItem
                      sx={{ color: `${theme.valueFontColor}` }}
                      value="High"
                    >
                      High
                    </MenuItem>
                    <MenuItem
                      sx={{ color: `${theme.valueFontColor}` }}
                      value="Medium"
                    >
                      Medium
                    </MenuItem>
                    <MenuItem
                      sx={{ color: `${theme.valueFontColor}` }}
                      value="Low"
                    >
                      Low
                    </MenuItem>
                  </Field>
                  <StyledPatternR style={{ opacity: 1 }} />
                </FormControl>
                {incident_id ? (
                  <FormControl style={{ position: "relative" }}>
                    <InputLabel id="priority-label">Priority</InputLabel>
                    <Field
                      as={CustomSelect}
                      name="priority"
                      labelId="priority-label"
                      onChange={(e) => {
                        const selectedPriority = e.target.value;
                        setFieldValue("priority", selectedPriority);
                      }}
                    >
                      <MenuItem
                        sx={{ color: `${theme.valueFontColor}` }}
                        value="Critical"
                      >
                        P1 - Critical
                      </MenuItem>
                      <MenuItem
                        sx={{ color: `${theme.valueFontColor}` }}
                        value="High"
                      >
                        P2 - High
                      </MenuItem>
                      <MenuItem
                        sx={{ color: `${theme.valueFontColor}` }}
                        value="Medium"
                      >
                        P3 - Medium
                      </MenuItem>
                      <MenuItem
                        sx={{ color: `${theme.valueFontColor}` }}
                        value="Low"
                      >
                        P4 - Low
                      </MenuItem>
                    </Field>
                    <StyledPatternR style={{ opacity: 1 }} />
                  </FormControl>
                ) : null}
                {console.log(values, "valuesss")}
                <FormControl style={{ position: "relative" }}>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Field
                    as={CustomSelect}
                    name="category"
                    labelId="category-label"
                    onChange={(event) => {
                      const value = event.target.value;
                      setFieldValue("category", value);
                      getCategory(value);
                    }}
                    // value={values?.category}
                  >
                    <MenuItem
                      sx={{ color: `${theme.valueFontColor}` }}
                      value="Software"
                    >
                      Software
                    </MenuItem>
                    <MenuItem
                      sx={{ color: `${theme.valueFontColor}` }}
                      value="Hardware"
                    >
                      Hardware
                    </MenuItem>
                    <MenuItem
                      sx={{ color: `${theme.valueFontColor}` }}
                      value="Server"
                    >
                      Server
                    </MenuItem>
                    <MenuItem
                      sx={{ color: `${theme.valueFontColor}` }}
                      value="Non-Tech"
                    >
                      Non-Tech
                    </MenuItem>
                  </Field>
                  <StyledPatternL style={{ opacity: 1 }} />
                </FormControl>
                <FormControl style={{ position: "relative" }}>
                  <InputLabel id="subCategory-label">Sub Category</InputLabel>
                  <Field
                    as={CustomSelect}
                    name="subCategory"
                    labelId="subCategory-label"
                    // value={values?.subCategory}
                    value={
                      categoryType?.find((ele) => ele === values.subCategory) ||
                      "" // Match value by ID
                    }
                  >
                    {categoryType?.map((ele) => (
                      <MenuItem
                        sx={{ color: `${theme.valueFontColor}` }}
                        key={ele}
                        value={ele}
                      >
                        {ele}
                      </MenuItem>
                    ))}
                  </Field>
                  <StyledPatternL style={{ opacity: 1 }} />
                </FormControl>

                <FormControl style={{ position: "relative" }}>
                  <InputLabel id="service-label">Service</InputLabel>
                  <Field
                    as={CustomSelect}
                    name="service"
                    labelId="service-label"
                    onChange={(event) => {
                      const value = event.target.value;
                      setFieldValue("service", value);
                    }}
                  >
                    <MenuItem
                      sx={{ color: `${theme.valueFontColor}` }}
                      value="Email Service"
                    >
                      Email Service
                    </MenuItem>
                    <MenuItem
                      sx={{ color: `${theme.valueFontColor}` }}
                      value="Network Service"
                    >
                      Network Service
                    </MenuItem>
                    <MenuItem
                      sx={{ color: `${theme.valueFontColor}` }}
                      value="Database Service"
                    >
                      Database Service
                    </MenuItem>
                    <MenuItem
                      sx={{ color: `${theme.valueFontColor}` }}
                      value="Helpdesk"
                    >
                      Helpdesk
                    </MenuItem>
                  </Field>
                  <StyledPatternR style={{ opacity: 1 }} />
                </FormControl>
                <FormControl style={{ position: "relative" }}>
                  <InputLabel id="serviceCategory-label">
                    Service Category
                  </InputLabel>
                  <Field
                    as={CustomSelect}
                    name="serviceCategory"
                    label="Service Category"
                    error={touched.serviceCategory && !!errors.serviceCategory}
                    helperText={
                      touched.serviceCategory && errors.serviceCategory
                    }
                    value={values.serviceCategory}
                    InputLabelProps={{ shrink: true }}
                  >
                    <MenuItem value="Software">Software</MenuItem>
                    <MenuItem value="Connectivity Issue">
                      Connectivity Issue
                    </MenuItem>
                    <MenuItem value="Data Corruption">Data Corruption</MenuItem>
                    <MenuItem value="Authentication Issue">
                      Authentication Issue
                    </MenuItem>
                  </Field>
                  <StyledPatternR style={{ opacity: 1 }} />
                </FormControl>
              </StyledFormContainer>
              <div style={{ position: "relative" }}>
                <Field
                  name="shortDescription"
                  render={({ field, form }) => (
                    <>
                      <label
                        style={{
                          display: "block",
                          color: "grey",
                          marginLeft: "1.5em",
                          marginBottom: 10,
                          fontWeight: "normal",
                        }}
                        htmlFor="shortDescription"
                      >
                        Short Description:
                      </label>
                      <TextareaAutosize
                        {...field}
                        placeholder="Enter short description"
                        minRows={1}
                        style={{
                          marginLeft: "1.5em",
                          width: "93%",
                          padding: 20,
                          border: `2px solid ${theme.valueFontColor}`,
                          borderRadius: 4,
                          outline: "none",
                        }}
                        onChange={(e) =>
                          form.setFieldValue("shortDescription", e.target.value)
                        } // Manually set Formik value on change
                      />
                    </>
                  )}
                />
                {touched.shortDescription && errors.shortDescription && (
                  <div
                    style={{ color: "red", fontSize: "12px", marginTop: "5px" }}
                  >
                    {errors.shortDescription}
                  </div>
                )}
              </div>

              <div style={{ position: "relative", marginTop: "15px" }}>
                <Field
                  name="description"
                  render={({ field, form }) => (
                    <>
                      <label
                        style={{
                          display: "block",
                          color: "grey",
                          marginLeft: "1.5em",
                          marginBottom: 10,
                          fontWeight: "normal",
                        }}
                        htmlFor="description"
                      >
                        Description:
                      </label>
                      <TextareaAutosize
                        {...field}
                        placeholder="Enter description"
                        minRows={5}
                        style={{
                          marginLeft: "1.5em",
                          width: "93%",
                          padding: 20,
                          border: `2px solid ${theme.valueFontColor}`,
                          borderRadius: 4,
                          outline: "none",
                        }}
                        onChange={(e) =>
                          form.setFieldValue("description", e.target.value)
                        }
                      />
                    </>
                  )}
                />
                {touched.description && errors.description && (
                  <div
                    style={{ color: "red", fontSize: "12px", marginTop: "5px" }}
                  >
                    {errors.description}
                  </div>
                )}
              </div>
              <Snackbar
                open={openWarning}
                message=""
                autoHideDuration={3000}
                onClose={() => setOpenWarning(false)}
                ContentProps={{
                  sx: {
                    background: "#ff3333",
                  },
                }}
              />
            </Form>
          )}
        </Formik>
      )}
      {incident_id ? (
        <IncidentTabActiveNotes
          value={value}
          handleChange={handleChange}
          handleAddNote={handleAddNote}
          notes={notes}
          comment={comment}
          selectedCaller={caller}
          setComment={setComment}
          currentdate={openedDate}
        />
      ) : null}
    </div>
  );
};

export default CreateIncidentForm;

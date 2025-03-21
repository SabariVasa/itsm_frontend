import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Skeleton, Stack } from '@mui/material';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { TextareaAutosize } from '@mui/material';
import { Box } from "@mui/material";
import GlobalService from '../../services/GlobalService';
import { resturls } from '../../global/utils/apiurls';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Formik, Form, Field } from 'formik';
import * as Yup from "yup";
import { CustomSelect, CustomTextField, GradientHeader, HeaderContainer, StyledFormContainer, StyledPatternL, StyledPatternR } from '../../commonComponents/StyledComponents';
import { useTheme } from '../../global/commonComponents/ThemeContext';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { useAuth } from '../../application/modules/auth/hooks/useAuth';
import toast from 'react-hot-toast';

export default function UserIncidentForm(props) {
  const { isEdit } = props;
  const {user_auth: { userId, emailAddress },} = useAuth();
  const { theme } = useTheme();
  const history = useHistory();

  const [impactRatio, setImpactRatio] = useState("");
  const [urgencyRatio, setUrgencyRatio] = useState("");
  const [priorityRatio, setPriorityRatio] = useState("");
  const { incident_id } = useParams();
  const [impact, setImpact] = useState("");
  const [urgency, setUrgency] = useState("");
  const [Number, setNumber] = useState();
  const [Message, setMessage] = useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'center',
  });
  const [loader, setLoader] = useState(false)
  const [comment, setComment] = useState("");
  const [notes, setNotes] = useState([]);
  const [value, setValue] = useState('1');

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

  const notifySuccess = (message) => {
    toast.success(message,
      history.goBack(),
      {
        duration: 4000,
        position: 'top-right',
      });
  };

  const notifyError = (message) => {
    toast.error(message,
      history.goBack(),
      {
        duration: 4000,
        position: 'top-right',
      });
  };

  const [intialValues, setIntialValues] = useState({
    state: "New",
    caller: { id: userId, name: emailAddress },
    impactReason: "",
    urgencyReason: "",
    description: "",
    impact: impactRatio,
    urgency: urgencyRatio,
    priority: priorityRatio,
    createdBy: userId,
    updatedBy: {
      id: userId,
      name: emailAddress,
    },
    notesUpdateTime: formatDateTime()
  })

  const [openedDate, setOpenedDate] = useState();
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
            notifySuccess(emessage);
            setLoader(true)
            setMessage({ ...Message, open: true })
          } else {
            setMessage({ ...Message, open: true })
            notifyError(emessage);
          }
        },
        `${resturls.addNotes}${incident_id}`,
        { ...noteObject },
        'PUT'
      );
      setNotes([noteObject, ...notes]);
      setComment('');
    } else {
      alert('Please enter a note before adding.');
    }
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  const impactOptions = [
    { value: "This issue has a minor impact on my productivity" },
    { value: "This issue making me less productivity,but i can still work" },
    { value: "This issue is making me less productivity and i cannot complete an important task" },
    { value: "Issues affect more than just me and prevents critical business functions" }
  ];

  // const priorityOptions = [{ value: "Low" }, { value: "High" }, { value: "Medium" }]

  const urgencyOptions = [
    { value: "Initial investigation with next business day" },
    { value: "Initial investigation within the next 4 business hours" },
    { value: "This issue requires immediate investigation" },
    { value: "This issue has financial, reputational or regulatory impact" }
  ];

  const priorityOptions = [
    { value: "Low" },
    { value: "Medium" },
    { value: "High" }
  ];




  function getPrioritiesAndImpact(selectedImpact, selectedUrgency) {
    const impactLevels = {
      "This issue has a minor impact on my productivity": "Low",
      "This issue making me less productivity,but i can still work": "Medium",
      "This issue is making me less productivity and i cannot complete an important task": "High",
      "Issues affect more than just me and prevents critical business functions": "High"
    };

    const urgencyLevels = {
      "Initial investigation with next business day": "Low",
      "Initial investigation within the next 4 business hours": "Medium",
      "This issue requires immediate investigation": "High",
      "This issue has financial, reputational or regulatory impact": "High"
    };

    const impactLevel = impactLevels[selectedImpact] || "Low";
    const urgencyLevel = urgencyLevels[selectedUrgency] || "Low";

    const priorityLevel = (() => {
      if (urgencyLevel === "High" || impactLevel === "High") {
        return "High";
      }
      if (urgencyLevel === "High" || impactLevel === "Low") {
        return "Medium";
      }
      return "Low";
    })();

    return {
      priority: priorityLevel,
      urgency: urgencyLevel,
      impact: impactLevel
    };
  }

  useEffect(() => {
    if (impact && urgency) {
      const { impact: impactLevel, urgency: urgencyLevel, priority } = getPrioritiesAndImpact(impact, urgency);
      setImpactRatio(impactLevel);
      setUrgencyRatio(urgencyLevel);
      setPriorityRatio(priority);
    }

  }, [impact, urgency]);

  const validationSchema = Yup.object({
    urgency: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
  });




  const fetchDocumentCount = async () => {
    GlobalService.generalSelect(
      (response) => {
        const { estatus, data } = response;
        if (estatus) {
          setNumber(data)
        } else {
          setMessage({ ...Message, open: true });
          notifyError("Sorry something went wrong");
        }
      },
      resturls.allIncidentCount,
      {},
      'GET'
    );
  };

  const Submit = (values) => {
    if (incident_id) {
      GlobalService.generalSelect(
        (response) => {
          const { estatus, emessage } = response;
          if (estatus) {
            setLoader(true)
            notifySuccess(emessage);
            setMessage({ ...Message, open: true })
          } else {
            setMessage({ ...Message, open: true })
            notifyError(emessage);
          }
        },
        `${resturls.updateIncident}${incident_id}`,
        { ...values, Notes: notes },
        'POST'
      );
    } else {
      GlobalService.generalSelect(
        (response) => {
          const { estatus, emessage } = response;
          if (estatus) {
            notifySuccess(emessage)
            setMessage({ ...Message, open: true })
          } else {
            setMessage({ ...Message, open: true })
            notifyError(emessage);
          }
        },
        resturls.createNewIncident,
        { ...values, incidentId: Number, notes: notes },
        'POST'
      );
    }
  }
  useEffect(() => {
    const today = new Date();
    console.log(formatDateTime(today));
  }, [])


  const getIncidentData = () => {
    setLoader(true);
    GlobalService.generalSelect(
      (respdata) => {
        const { estatus, data } = respdata;
        if (estatus) {
          const incidentValues = data[0];
          setIntialValues({
            state: incidentValues?.state,
            caller: incidentValues?.caller,
            impactReason: incidentValues?.impactReason,
            urgencyReason: incidentValues?.urgencyReason,
            description: incidentValues?.description,
            impact: incidentValues?.impact,
            urgency: incidentValues?.urgency,
            priority: incidentValues?.priority,
            createdBy: incidentValues?.createdBy,
            assignedTo: incidentValues?.assignedTo,
            assignGroup: incidentValues?.assignGroup,
            updatedBy: {
              id: userId,
              name: emailAddress,
            },
            notesUpdateTime: formatDateTime()
          })
          setLoader(false);
          console.log(intialValues, 'incidentValues');
          setNotes([...incidentValues?.notes].reverse());
          setNumber(incidentValues?.incidentId)
          setOpenedDate(incidentValues?.openedDate);
        }
      },
      `${resturls.getIncidentById}/${incident_id}`,
      {},
      'GET'
    );
  }

  useEffect(() => {
    fetchDocumentCount();
    if (incident_id) {
      getIncidentData()
    }
  }, []);

  return loader ? (
    <Skeleton variant="rectangular" width="100%" height={140} />
  ) : (
    <div style={{ margin: "2em", height: "100%" }}>
      <Formik
        initialValues={intialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          Submit(values);
        }}
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
                }}
                type="submit"
              >
                {isEdit ? 'Update Incident' : 'Create New Incident'}
              </Button>
            </HeaderContainer>
            <StyledFormContainer>
              {incident_id ? (
                <div style={{ position: "relative" }}>
                  {console.log(values, "incidentValues")}
                  <Field
                    name="incidentId"
                    as={CustomTextField}
                    label="Incident Id"
                    value={incident_id || ""}
                    error={touched.caller && !!errors.caller}
                    helperText={touched.caller && errors.caller}
                    disabled={true}
                    InputLabelProps={{ shrink: true }}
                  />
                  <StyledPatternL style={{ opacity: 1 }} />
                </div>
              ) : null}
              {incident_id ? (
                <div style={{ position: "relative" }}>
                  {console.log(values, "incidentValues")}
                  <Field
                    name="state"
                    as={CustomTextField}
                    label="State"
                    value={values?.state || "New"}
                    error={touched.caller && !!errors.caller}
                    helperText={touched.caller && errors.caller}
                    disabled={true}
                    InputLabelProps={{ shrink: true }}
                  />
                  <StyledPatternL style={{ opacity: 1 }} />
                </div>
              ) : null}
              {incident_id ? (
                <div style={{ position: "relative" }}>
                  <Field
                    name="assignedTo"
                    as={CustomTextField}
                    label="Assigned To"
                    value={values?.assignedTo?.name || "Not yet assigned"}
                    error={touched.caller && !!errors.caller}
                    helperText={touched.caller && errors.caller}
                    disabled={true}
                    InputLabelProps={{ shrink: true }}
                  />
                  <StyledPatternR style={{ opacity: 1 }} />
                </div>
              ) : null}
              {incident_id ? (
                <div style={{ position: "relative" }}>
                  <Field
                    name="assignGroup"
                    as={CustomTextField}
                    label="Assigned Group"
                    value={values?.assignGroup?.name || "Not yet assigned"}
                    error={touched.caller && !!errors.caller}
                    helperText={touched.caller && errors.caller}
                    disabled={true}
                    InputLabelProps={{ shrink: true }}
                  />
                  <StyledPatternR style={{ opacity: 1 }} />
                </div>
              ) : null}
              <div style={{ position: "relative" }}>
                <Field
                  name="caller"
                  as={CustomTextField}
                  label="Caller"
                  value={values.caller?.name || ""}
                  error={touched.caller && !!errors.caller}
                  helperText={touched.caller && errors.caller}
                  disabled={true}
                  InputLabelProps={{ shrink: true }} // Ensures the label does not overlap
                />
                <StyledPatternL style={{ opacity: 1 }} />
              </div>
              {incident_id ? (
                <FormControl style={{ position: "relative" }}>
                  <InputLabel id="impact-label">Priority</InputLabel>
                  <Field
                    as={CustomSelect}
                    name="priority"
                    label="Priority"
                    onChange={(event) => {
                      const selectedPriority = event.target.value;
                      setFieldValue("priority", selectedPriority);
                    }}
                  >
                    {priorityOptions?.map((ele) => (
                      <MenuItem
                        sx={{ color: `${theme.valueFontColor}` }}
                        key={ele.value}
                        value={ele.value}
                      >
                        {ele.value}
                      </MenuItem>
                    ))}
                  </Field>
                  <StyledPatternR style={{ opacity: 1 }} />
                </FormControl>
              ) : null}
              <FormControl style={{ position: "relative" }}>
                <InputLabel id="impact-label">
                  What impact does this have on your ability to work?
                </InputLabel>
                <Field
                  as={CustomSelect}
                  name="impactReason"
                  label="What impact does this have on your ability to work?"
                  onChange={(event) => {
                    const selectedGroup = event.target.value;
                    setFieldValue("impactReason", selectedGroup);
                    setImpact(impactRatio);
                    const { impact } = getPrioritiesAndImpact(
                      selectedGroup,
                      values.urgencyReason
                    );
                    setFieldValue("impact", impact);
                  }}
                >
                  {impactOptions?.map((ele) => (
                    <MenuItem
                      sx={{ color: `${theme.valueFontColor}` }}
                      key={ele.value}
                      value={ele.value}
                    >
                      {ele.value}
                    </MenuItem>
                  ))}
                </Field>
                <StyledPatternR style={{ opacity: 1 }} />
              </FormControl>
              <FormControl style={{ position: "relative" }}>
                <InputLabel id="serviceCategory-label">
                  How quickly do we need to start looking into this?
                </InputLabel>
                <Field
                  as={CustomSelect}
                  name="urgencyReason"
                  label="How quickly do we need to start looking into this?"
                  error={touched.urgency && !!errors.urgency}
                  helperText={touched.urgency && errors.urgency}
                  onChange={(event) => {
                    const selectedGroup = event.target.value;
                    setFieldValue("urgencyReason", selectedGroup);
                    const { urgency, priority } = getPrioritiesAndImpact(
                      values.impactReason,
                      selectedGroup
                    );
                    setFieldValue("urgency", urgency);
                    setFieldValue("priority", priority);
                    setUrgency(selectedGroup);
                  }}
                  InputLabelProps={{ shrink: true }}
                >
                  {urgencyOptions?.map((ele) => (
                    <MenuItem
                      sx={{ color: `${theme.valueFontColor}` }}
                      key={ele.value}
                      value={ele.value}
                    >
                      {ele.value}
                    </MenuItem>
                  ))}
                </Field>
                <StyledPatternR style={{ opacity: 1 }} />
              </FormControl>
            </StyledFormContainer>
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
                      {...field} // This ensures the value is connected to Formik
                      placeholder="Enter the detailed description of the issue"
                      minRows={5}
                      style={{
                        marginLeft: "1.5em",
                        width: "93%",
                        padding: 20,
                        border: `2px solid ${theme.borderColor}`,
                        borderRadius: 4,
                        outline: "none",
                      }}
                      onChange={(e) =>
                        form.setFieldValue("description", e.target.value)
                      } // Manually set Formik value on change
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
          </Form>
        )}
      </Formik>
      {incident_id ? (
        <Box sx={{ width: "100%", typography: "body1", marginTop: 10 }}>
          <TabContext value={value}>
            <Box sx={{ padding: "16px" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                TabIndicatorProps={{
                  style: { backgroundColor: `${theme.outerBodyColor}` },
                }}
                sx={{
                  "& .MuiTab-root": {
                    color: "grey",
                  },
                  "& .Mui-selected": {
                    color: `${theme.valueFontColor}`,
                    fontWeight: "bold",
                  },
                }}
              >
                <Tab
                  style={{
                    color: `${theme.valueFontColor}`,
                  }}
                  label="Activity"
                  value="1"
                />
              </TabList>
            </Box>
            <TabPanel value="1" sx={{ padding: "16px" }}>
              <Stack
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingRight: 20,
                  marginTop: 20,
                }}
                direction="row"
              >
                <label
                  style={{
                    display: "block",
                    color: "grey",
                    marginLeft: 10,
                    marginBottom: 10,
                  }}
                  htmlFor="textarea"
                >
                  Activity Notes :
                </label>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{
                    width: 130,
                    fontSize: 12,
                    marginBottom: 10,
                    backgroundColor: "#A17D34",
                    color: "#fff",
                  }}
                  onClick={handleAddNote}
                >
                  Update Notes
                </Button>
              </Stack>
              <TextareaAutosize
                aria-label="empty textarea"
                minRows={5}
                placeholder="Enter the notes"
                style={{
                  width: "97.3%",
                  padding: "16px",
                  border: `2px solid ${theme.borderColor}`,
                  borderRadius: 4,
                  outline: "none",
                }}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onFocus={(e) =>
                  (e.target.style.borderColor = theme.borderColor)
                }
                onBlur={(e) => (e.target.style.borderColor = theme.borderColor)}
              />

              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  backgroundColor: "#e6e6e6",
                  borderRadius: 10,
                  padding: 10,
                }}
              >
                <h4 style={{ fontWeight: "normal", fontSize: 16 }}>
                  Incident request raised by <strong>{emailAddress}</strong>
                </h4>
                <h4
                  style={{
                    fontWeight: "normal",
                    marginTop: 20,
                    fontSize: 15,
                  }}
                >
                  Created at <strong>{openedDate}</strong>
                </h4>
              </Box>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                {notes.map((note, index) => (
                  <div
                    key={index}
                    style={{
                      backgroundColor: "#e6e6e6",
                      borderRadius: 10,
                      padding: 10,
                      marginTop: 10,
                    }}
                  >
                    <p style={{ fontWeight: "normal", fontSize: 16 }}>
                      {note.text}
                    </p>
                    <p
                      style={{
                        fontWeight: "normal",
                        fontSize: 13,
                        lineHeight: "3em",
                      }}
                    >
                      Note updated by <strong>{note.createdBy}</strong>
                    </p>
                    <p
                      style={{
                        fontWeight: "normal",
                        fontSize: 13,
                        marginTop: -10,
                      }}
                    >
                      Created at <strong>{note.timeStamp}</strong>
                    </p>
                  </div>
                ))}
              </Box>
            </TabPanel>
          </TabContext>
        </Box>
      ) : null}
    </div>
  );
}

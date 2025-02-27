import React, { useEffect, useState } from "react";
import { Field } from "formik";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Grid,
  Autocomplete,
  FormControl,
} from "@mui/material";
import GlobalService from "../../services/GlobalService";
import { resturls } from "../../global/utils/apiurls";
import { useAuth } from "../../application/modules/auth/hooks/useAuth";
import { sharedStyles } from "../../commonComponents/StyledComponents";
import { useTheme } from "../../global/commonComponents/ThemeContext";

const CatelogueFlowFormDetails = (props) => {
  const {
    values,
    handleChange,
    setFieldValue
  } = props
  const [showChangeRequestFields, setShowChangeRequestFields] = useState(false);
  const [group, setGroup] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedValues, setSelectedValues] = useState()
  const { theme } = useTheme();
  const { user_auth } = useAuth();

  const fetchGroupDetails = () => {
    GlobalService.generalSelect(
      (respData) => {
        const { estatus, emessage, data } = respData;
        if (estatus && emessage) {
          setGroup(data);
        }
      },
      `${resturls.fetchGroups}/${user_auth.userId}`,
      {},
      "GET"
    );
  };

  const getAllUserDetails = () => {
    GlobalService.generalSelect(
      (respdata) => {
        setUsers(respdata);
      },
      resturls.getUserDetails,
      {},
      "GET"
    );
  };

  useEffect(() => {
    fetchGroupDetails();
    getAllUserDetails();
  }, []);

  return (
    <div style={{ marginTop: '2em' }}>
      <div>
          <Autocomplete
              multiple
              value={values?.serviceRequestAccess || []}
              onChange={(event, value) => setFieldValue("serviceRequestAccess", value)}
              options={group}
              getOptionLabel={(option) => option.groupName || ""}
              isOptionEqualToValue={(option, value) => option.id === value?.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Service Request Access"
                  fullWidth
                  disabled={!group?.length}
                  sx={sharedStyles}
                />
              )}
          />
          <Autocomplete
              multiple
              value={values.srLandingAssignmentGroup || []}
              onChange={(event, value) => setFieldValue("srLandingAssignmentGroup", value)}
              options={users}
              getOptionLabel={(option) => option.emailAddress || ""}
              isOptionEqualToValue={(option, value) => option.id === value?.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="SR Landing Assignment Group"
                  fullWidth
                  disabled={!users?.length}
                  sx={sharedStyles}
                  style={{ marginTop: '0.7em' }}
                />
              )}
          />
        <FormControl className="w-[50%]" component="fieldset" fullWidth>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              borderRadius: "1em",
              padding: "10px",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  name="approvalRequired"
                  checked={values.requiredField}
                  onChange={(event) => setFieldValue("approvalRequired", event.target.checked)} // Update Formik value
                  sx={{
                    color: "#ff7eb3",
                    "&.Mui-checked": {
                      color: `${theme.valueFontColor}`,
                    },
                  }}
                />
              }
              label="Approval Required"
              sx={{
                color: `${theme.valueFontColor}`,
              }}
            />
          </div>
        </FormControl>
        {values.approvalRequired && (
          <div style={{ width: "50%" }}>
            <Autocomplete
              multiple
              value={values.approversName || []}
              onChange={(event, value) => setFieldValue("approversName", value)}
              options={users}
              getOptionLabel={(option) => option.emailAddress || ""}
              isOptionEqualToValue={(option, value) => option.id === value?.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Approver(s) Name"
                  fullWidth
                  disabled={!users?.length}
                  sx={sharedStyles}
                  style={{ marginTop: '0.7em' }}
                />
              )}
            />
            <div style={{ textAlign: 'center' }}>(or)</div>
            <Autocomplete
              multiple
              value={values.approvalAssignmentGroup || []}
              onChange={(event, value) => {
                setFieldValue(
                  "approvalAssignmentGroup",
                  value.map((item) => item.id)
                );
                setSelectedValues(value.map((item) => item.id));
              }}
              options={group ? group.filter((item) => !selectedValues?.includes(item.id)) : []}
              getOptionLabel={(option) => option.groupName || ""}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Approval Assignment Group"
                  fullWidth
                  disabled={!group?.length}
                  sx={sharedStyles}
                  style={{ marginTop: '0.7em' }}
                />
              )}
            />
          </div>
        )}
        <FormControl component="fieldset" fullWidth>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              borderRadius: "1em",
              padding: "10px",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  name="createChangeRequest"
                  checked={values.requiredField}
                  onChange={(e) => {
                    handleChange(e);
                    setShowChangeRequestFields(e.target.checked);
                  }}
                  sx={{
                    color: "#ff7eb3",
                    "&.Mui-checked": {
                      color: `${theme.valueFontColor}`,
                    },
                  }}
                />
              }
              label="Create Change Request"
              sx={{
                color: `${theme.valueFontColor}`,
              }}
            />
          </div>
        </FormControl>
        {showChangeRequestFields && (
          <>
                <Field
                  as={Autocomplete}
                  name="changeRequestName"
                  onChange={(event, value) => {
                    const selected = value.map((item) => item.id);
                    setFieldValue("changeRequestName", selected);
                  }}
                  className="w-[50%]"
                  options={users ? users.filter((item) => !values.srLandingAssignmentGroup?.includes(item.id)) : []}
                  getOptionLabel={(option) => option.emailAddress || ""}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Change Request Name"
                      fullWidth
                      disabled={!users?.length}
                      sx={sharedStyles}
                      style={{ marginTop: '0.7em' }}
                    />
                  )}
                />
                <Field
                  as={TextField}
                  className="w-[50%]"
                  name="changePriorityLevel"
                  label="Change Priority Level"
                  fullWidth
                  sx={sharedStyles}
                  margin="normal"
                  variant="outlined"
                  select
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </Field>
                <Field
                  as={TextField}
                  className="w-[50%]"
                  name="changeRequestDescription"
                  label="Change Request Description"
                  fullWidth
                  sx={sharedStyles}
                  margin="normal"
                  variant="outlined"
                />
          </>
        )}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/* <Button variant="contained" color="secondary" type="button">
                  Back
                </Button> */}
          {/* <Button variant="contained" color="primary" type="submit">
                  Next
                </Button> */}
        </div>
      </div>
    </div>
  );
};

export default CatelogueFlowFormDetails;

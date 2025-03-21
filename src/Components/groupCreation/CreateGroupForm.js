import React, { useEffect, useState } from "react";
import { Box, FormControlLabel, MenuItem, InputLabel, FormControl } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { useHistory } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import * as Yup from "yup";
import GlobalService from "../../services/GlobalService";
import { resturls } from "../../global/utils/apiurls";
import { CustomSelect, CustomTextField, GradientHeader, HeaderContainer, StyledButton, StyledFormContainer, StyledPatternL, StyledPatternR } from "../../commonComponents/StyledComponents";
import GroupManagementViewSettingsDetails from "./GroupManagementViewSettingsDetails";
import { useLocation, useParams } from "react-router-dom/cjs/react-router-dom";
import { useTheme } from "../../global/commonComponents/ThemeContext";

const validationSchema = Yup.object({
  groupName: Yup.string()
    .when("group", {
      is: (group) => !group,
      then: (schema) => schema.required("Group Name is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  groupDescription: Yup.string()
    .when("group", {
      is: (group) => !group,
      then: (schema) => schema.required("Group Description is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  groupType: Yup.string()
    .when("group", {
      is: (group) => !group,
      then: (schema) => schema.required("Group Type is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  userPermission: Yup.string()
    .when("group", {
      is: (group) => !group,
      then: (schema) => schema.required("User Permission is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  groupManager: Yup.string()
    .when("group", {
      is: (group) => !group,
      then: (schema) => schema.required("Group Manager is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  groupScope: Yup.string()
    .when("group", {
      is: (group) => !group,
      then: (schema) => schema.required("Group Scope is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
});

const CreateGroupForm = (props) => {
  const location = useLocation();
  const { theme } = useTheme();
  const isKeywordPresent = location.pathname.includes("update_dep");
  const { group_id, orgId } = useParams();
  const { organizationId, groupId } = props;

  const effectiveOrgId = orgId || organizationId;
  const effectiveGroupId = group_id || groupId;
  const [selectedUserRows, setSelectedUserRows] = useState();
  const history = useHistory();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values) => {
    const groupMembers = selectedUserRows || []

    const url = group ? `${resturls.updateGroup}/${group.id}` : resturls.CreateNewGroup;
    GlobalService.generalSelect(
      (responseData) => {
        const { estatus } = responseData;
        if (estatus) {
          history.goBack();
        }
      },
      url,
      { ...values, organizationId: (effectiveOrgId), groupMembers },
      group ? 'PUT' : 'POST'
    );
  };


  useEffect(() => {
    if (effectiveGroupId) {
      GlobalService.generalSelect(
        (respdata) => {
          const { estatus, emessage, data } = respdata;
          if (estatus && emessage) {
            const foundObject = data.find(item => item.id === (effectiveGroupId));
            setGroup(foundObject || {});
          }
        },
        resturls.getAllGroupDetails,
        {},
        'GET'
      );
    }
  }, [effectiveGroupId]);

  return (
    <Box>
      <Formik
        initialValues={{
          groupName: group?.groupName || "",
          groupType: group?.groupType || "",
          groupDescription: group?.groupDescription || "",
          groupScope: group?.groupScope || "",
          activeStatus: group?.activeStatus ?? true, // Default to `true` if undefined
          userPermission: group?.userPermission || "",
          groupManager: group?.groupManager || "",
          group: group || null,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ errors, touched, setFieldValue, values }) => (
          <Form>
            <HeaderContainer>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <ArrowBackIcon sx={{ marginRight: 2 }} onClick={() => history.goBack()} />
                <GradientHeader>Create Group</GradientHeader>
              </div>
              <StyledButton type="submit">Save Group</StyledButton>
            </HeaderContainer>
            <StyledFormContainer>
              {/* Group Name */}
              <div style={{ position: "relative" }}>
                <Field
                  name="groupName"
                  as={CustomTextField}
                  label="Group Name"
                  error={touched.groupName && !!errors.groupName}
                  helperText={touched.groupName && errors.groupName}
                />
                <StyledPatternR
                  style={{ opacity: loading ? 0.5 : 1 }}
                />
              </div>

              {/* Group Type */}
              <FormControl style={{ position: "relative" }}>
                <InputLabel id="groupType-label">Group Type</InputLabel>
                <Field
                  as={CustomSelect}
                  name="groupType"
                  labelId="groupType-label"
                >
                  <MenuItem sx={{ color: `${theme.valueFontColor}` }} value="Type1">Type 1</MenuItem>
                  <MenuItem sx={{ color: `${theme.valueFontColor}` }} value="Type2">Type 2</MenuItem>
                  <MenuItem sx={{ color: `${theme.valueFontColor}` }} value="Type3">Type 3</MenuItem>
                </Field>
                <StyledPatternR
                  style={{ opacity: loading ? 0.5 : 1 }}
                />
              </FormControl>

              <div style={{ position: "relative" }}>
                <Field
                  name="groupScope"
                  as={CustomTextField}
                  label="Group Scope"
                  error={touched.groupScope && !!errors.groupScope}
                  helperText={touched.groupScope && errors.groupScope}
                />
                <StyledPatternL
                  style={{ opacity: loading ? 0.5 : 1 }}
                />
              </div>

              <div style={{ position: "relative" }}>
                <Field
                  name="groupManager"
                  as={CustomTextField}
                  label="Group Manager"
                  error={touched.groupManager && !!errors.groupManager}
                  helperText={touched.groupManager && errors.groupManager}
                />
                <StyledPatternL
                  style={{ opacity: loading ? 0.5 : 1 }}
                />
              </div>

              <FormControl style={{ position: "relative" }}>
                <InputLabel id="userPermission-label">User Permission</InputLabel>
                <Field
                  as={CustomSelect}
                  name="userPermission"
                  labelId="userPermission-label"
                >
                  <MenuItem sx={{ color: `${theme.valueFontColor}` }} value="Super Admin">Super Admin</MenuItem>
                  <MenuItem sx={{ color: `${theme.valueFontColor}` }} value="Admin">Admin</MenuItem>
                  <MenuItem sx={{ color: `${theme.valueFontColor}` }} value="End User">End User</MenuItem>
                </Field>
                <StyledPatternR
                  style={{ opacity: loading ? 0.5 : 1 }}
                />
              </FormControl>


              <FormControlLabel
                control={
                  <Field
                    name="activeStatus"
                    type="checkbox"
                    checked={values.activeStatus}
                    onChange={() => setFieldValue("activeStatus", !values.activeStatus)}
                    style={{
                      background: values.activeStatus
                        ? `${theme.outerBodyColor}`
                        : "transparent",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      padding: "5px",
                    }}
                  />
                }
                label="Active Status"
              />

              <div style={{ position: "relative" }}>
                <Field
                  name="groupDescription"
                  as={CustomTextField}
                  label="Group Description"
                  error={touched.groupDescription && !!errors.groupDescription}
                  helperText={touched.groupDescription && errors.groupDescription}
                />
                <StyledPatternL
                  style={{ opacity: loading ? 0.5 : 1 }}
                />
              </div>
            </StyledFormContainer>
          </Form>
        )}
      </Formik>
      {(isKeywordPresent) && (
        <div>
          <GroupManagementViewSettingsDetails
            edit={true}
            isKeywordPresent={isKeywordPresent}
            setSelectedUserRows={setSelectedUserRows}
            userData={group && group.groupMembers}
            childGroups={group && group.childGroups}
            groupAdminData={group && group.groupAdmins}
          />
        </div>
      )}
    </Box>
  );
};

export default CreateGroupForm;

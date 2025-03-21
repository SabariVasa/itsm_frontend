import React, { useEffect, useState } from "react";
import GeneratedForm from "../../Components/cmdb/classmanagement/GeneratedForm";
import GlobalService from "../../services/GlobalService";
import { resturls } from "../../global/utils/apiurls";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { Box, Typography } from "@mui/material";
import { useAuth } from "../../application/modules/auth/hooks/useAuth";
import ContentDevider from "../../Components/HelperComponents/ContentDevider";
import { useTheme } from "../../global/commonComponents/ThemeContext";

export default function CreateRequestDetailsForm() {
  const { theme } = useTheme();
  const { user_auth: { emailAddress } } = useAuth();
  const { catelogueId, categoryId } = useParams();
  // const [formData, setFormData] = useState({
  // requestNumber: "",
  // approvalStatus: "",
  // openedBy: "",
  // requestedFor: "",
  // priority: "",
  // assignedTo: "",
  // dueDate: "",
  // openedDate: "",
  // });
  const initValues = {
    "Requested Email": emailAddress,
  }
  const [requestFormFields, setRequestFormFields] = useState([]);
  const [requestCreatedFormDetails, setRequestCreatedFormDetails] = useState({});

  const getFormFieldsByCategoryId = () => {
    GlobalService.generalSelect(
      (respData) => {
        const { estatus, data } = respData;
        if (estatus) {
          console.log(categoryId,catelogueId, 'categoryId');
          const foundObject = data?.find(
            (item) => item?.catalogItemId === categoryId
          );
          console.log(foundObject, 'foundObject');
          setRequestFormFields(foundObject.generalInformation.attributes);
          setRequestCreatedFormDetails(foundObject);
        }
      },
      `${resturls.getByCategory}?categoryId=${catelogueId}`,
      {},
      "GET"
    );
  };

  // const catalogReqItmCount = () => {
  // GlobalService.generalSelect(
  // (respData) => {
  // const { estatus, data } = respData;
  // if (estatus) {
  // setFormData((prevData) => ({ ...prevData, requestNumber: data, }));
  // }
  // },
  // `${resturls.catalogReqItmCount}`,
  // {},
  // "GET"
  // );
  // };


  useEffect(() => {
    // catalogReqItmCount();
    getFormFieldsByCategoryId();
  }, []);

  const searchOptedEmails = {
    "Requested Email": true,
  };

  return (
    <>
      <ContentDevider title="Create Request" />
      <div className="p-[4vh]">
        <Box clasName="flex items-center justify-between p-4">
          <span style={{ color: `${theme.subHeaderFontColor}` }}>
            {requestCreatedFormDetails?.generalInformation?.serviceRequestName}
          </span>
          <Typography style={{ color: `${theme.subHeaderFontColor}` }}>
            {
              requestCreatedFormDetails?.generalInformation
                ?.serviceRequestDescription
            }
          </Typography>
        </Box>
        <GeneratedForm
          initialValues={initValues}
          formFields={requestFormFields}
          catelogueId={catelogueId}
          searchOptedEmails={searchOptedEmails}
          requestCreatedFormDetails={requestCreatedFormDetails}
        />
      </div>
    </>
  );
}

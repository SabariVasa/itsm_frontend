import React, { useEffect, useState } from 'react';
import CmdbGridContainer from '../../HelperComponents/GridContainer';
import ContentDevider from '../../HelperComponents/ContentDevider';
import { OwnerData } from '../../../Utils/CMDB-Data/CIData';
import { desktopManufacturers } from '../../../Utils/CMDB-Data/DesktopData';
import { BussinessService, statusState, slaOptions, supportingCi, dependency, userBase } from '../../../Utils/CMDB-Data/serviceData';
import { useParams, useNavigate } from 'react-router-dom';
import { Stack, Button } from "@mui/material";
import { serverAPI } from '../../../Utils/Server';
import axios from 'axios';
import NotifyBar from '../../Notification Components/NotifyBar';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveStep } from '../../../Redux state management/Redux Slices/GlobalStepperSlice';
import StepperComponent from '../../HelperComponents/StepperComponent';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function CMDBService(props) {
  let { serviceType } = useParams();
  const [serviceName, setServiceName] = useState();
  const [ServiceType, setServiceType] = useState();
  const [Description, setDescription] = useState();
  const [status, setStatus] = useState();
  const [index, setIndex] = useState(0);
  const [serviceOwner, setServiceOwner] = useState();
  const [selectedSLA, setSelectedSLA] = useState();
  const [SelectedDependency, setSelectedDependency] = useState();
  const [NotifyStatus, setNotifyStatus] = useState(false);
  const [NotifyMessage, setNotifyMessage] = useState("");
  const [supportingCI, setSupportingCI] = useState();
  const [AppService, setAppService] = useState(false);

  const [selectedUser, setSelectedUser] = useState();
  const [HostingEnv, setHostingEnv] = useState();
  const [AppVersion, setAppVersion] = useState();
  const [supportTeam, setSupportTeam] = useState();

  const [error, setError] = useState(false);

  const navigate = useHistory();

  const dispatch = useDispatch();
  const activeStep = useSelector((state) => state.globalReducers.activeStep);

  useEffect(() => {
    if (serviceType === "Bussiness Application") {
      setAppService(true);
    }
  })

  async function createBussinessService() {
    const data = {
      serviceName,
      serviceOwner,
      serviceType,
      Description,
      serviceStatus: status,
      serviceLevelAgreement: selectedSLA,
      dependencies: SelectedDependency,
      supportingCI,
      applicationVersion: AppVersion,
      applicationUserBase: selectedUser,
      hostingEnvironment: HostingEnv,
      supportTeam
    }
    console.log(data);
    if (serviceName && serviceOwner && serviceType && Description && status && selectedSLA && SelectedDependency && supportingCI) {
      await axios.post(`${serverAPI}/createServiceConfigurationItem`, data).then((res) => {
        if (res.data) {
          setNotifyStatus(true);
          setNotifyMessage("Succesfully Service Created");
          setError(false)
        }
      }).catch((err) => {
        setNotifyMessage("Something went wrong")
        setError(true);
      })
    } else {
      setNotifyStatus(true);
      setNotifyMessage("Please fill all the fields");
      setError(true);
    }
  }
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", cursor: "pointer" }}>
        <StepperComponent steps={["General Information", "Service General Info", "Service Details", "Technical Information"]} />
      </div>
      {index == 0 ? <><ContentDevider title={`${serviceType} General Info`} />
        <CmdbGridContainer MenuItems={[desktopManufacturers, BussinessService]} show={[true, true, false, false]} name={[`${serviceType} Name`, `${serviceType} Type`]} dropdown={[false, true]} SelectedValue2={ServiceType} setSelectValue2={setServiceType} Name1={serviceName} setName1={setServiceName} />
        <CmdbGridContainer MenuItems={[desktopManufacturers, statusState]} show={[true, true, false, false]} name={["Description", "Status"]} dropdown={[false, true]} SelectedValue2={status} setSelectValue2={setStatus} Name1={Description} setName1={setDescription} /></> : null}
      {index == 1 ? <>
        <ContentDevider title={`${serviceType} Details`} />
        <CmdbGridContainer MenuItems={[desktopManufacturers, slaOptions]} show={[true, true, false, false]} name={[`${serviceType} Owner`, "Select SLA"]} dropdown={[false, true]} SelectedValue2={selectedSLA} setSelectValue2={setSelectedSLA} Name1={serviceOwner} setName1={setServiceOwner} />
        {AppService ? <CmdbGridContainer MenuItems={[desktopManufacturers, userBase]} show={[true, true, false, false]} name={[`Application Version`, "Appliation User Base"]} dropdown={[false, true]} SelectedValue2={selectedUser} setSelectValue2={setSelectedUser} Name1={AppVersion} setName1={setAppVersion} /> : null}
      </> : null}
      {index == 2 ? <><ContentDevider title={`${serviceType} Technical Information`} />
        <CmdbGridContainer MenuItems={[dependency, supportingCi]} show={[true, true, false, false]} name={["Dependencies", "Supporting CI's"]} dropdown={[true, true]} SelectedValue1={SelectedDependency} setSelectValue1={setSelectedDependency} SelectedValue2={supportingCI} setSelectValue2={setSupportingCI} Name1={serviceOwner} setName1={setServiceOwner} />
        {AppService ? <CmdbGridContainer MenuItems={[desktopManufacturers, OwnerData]} show={[true, true, false, false]} name={[`Hosting Environment`, "Appliation Support Team"]} dropdown={[false, true]} SelectedValue2={supportTeam} setSelectValue2={setSupportTeam} Name1={HostingEnv} setName1={setHostingEnv} /> : null}
      </> : null}

      <Stack style={{ display: 'flex', alignItems: "center", justifyContent: `${index < 0 ? "right" : "space-between"}`, paddingRight: 20, paddingTop: 20, paddingBottom: 10 }} direction="row">
        {index >= 0 ? <Button variant="outlined" color="warning" style={{ width: 100, marginLeft: 100 }} onClick={() => {
          if (index > 0) {
            setIndex(index - 1)
            dispatch(setActiveStep(activeStep - 1))
          } else {
            navigate(-1)
            dispatch(setActiveStep(0))
          }

        }}>Back</Button> : <></>}
        <Button variant="outlined" color="warning" style={{ width: 100 }} onClick={
          () => {
            if (index < 2) { setIndex(index + 1) }
            if (index == 2) { createBussinessService() }
            dispatch(setActiveStep(activeStep + 1));

          }}>{index == 2 ? "Finish" : "Next"}</Button>
      </Stack>
      <NotifyBar notifyStatus={NotifyStatus} notifyMessage={NotifyMessage} setNotifyStatus={setNotifyStatus} error={error} />

    </div>
  )
}

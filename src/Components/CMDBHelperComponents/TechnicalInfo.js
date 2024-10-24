import React, { useState, useEffect } from 'react';
import ContentDevider from '../HelperComponents/ContentDevider';
// import { useParams, useNavigate } from 'react-router-dom';
import CmdbGridContainer from '../HelperComponents/GridContainer';
import axios from 'axios';
// import IncrementContainer from '../HelperComponents/IncrementContainer';
import { Button, Stack, Snackbar, Container } from '@mui/material';
import { OrgOptions, ServerManufacturerData, BussinessCriticalOptions, locationData, OperatingSystem, VirtualizationPlatform, OwnerData, storageDevices, ServerType } from '../../Utils/CMDB-Data/CIData';
import { storageDeviceManufacturers } from '../../Utils/CMDB-Data/CIData';

// import FormControl, { useFormControl } from '@mui/material/FormControl';
import GeneralInfoCi from './GeneralInfoCi';
import ServerCI from './ServerCI';
import NetworkCI from './NetworkCI';
import { networkDeviceManufacturers, networkDevices } from '../../Utils/CMDB-Data/NetworkCIData';
import StorageCI from './StorageCI';
import DesktopCI from './DesktopCI';
import { desktopManufacturers, desktops } from '../../Utils/CMDB-Data/DesktopData';
// import { FaAngleDoubleRight } from "react-icons/fa";

import { serverAPI } from '../../Utils/Server'
import StepperComponent from '../HelperComponents/StepperComponent';
// import { useDispatch, useSelector } from 'react-redux';
import { setActiveStep } from '../../Redux state management/Redux Slices/GlobalStepperSlice';
import GlobalService from '../../services/GlobalService';
import { resturls } from '../../global/utils/apiurls';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function TechnicalInfo(props) {
  const { serviceType } = props;
  const navigate = useHistory();


  const Field1 = [`${serviceType} Name`, `${serviceType} Type`];
  const Field2 = ["Manufacturer", "Model Number"];
  const Field3 = ["Location", "Serial Number"];

  const [BoolNetwork, setBoolNetwork] = useState(false);
  const [BoolServer, setBoolServer] = useState(false);
  const [BoolStorage, setBoolStorage] = useState(false);
  const [BoolDesktop, setBoolDesktop] = useState(false);

  // const NetworkField1 = ["Operating", ""]

  const [state, setState] = useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;
  // const [isVisible, setisVisible] = useState(true);
  const [ErrorMessage, setErrorMessage] = useState();
  const handleClose = () => {
    setState({ ...state, open: false })
  }

  // const dispatch = useDispatch();
  // const activeStep = useSelector(state => state.globalReducers.activeStep)
  const handleOpen = () => {
    // dispatch(setActiveStep(activeStep + 2));
    setState({ ...state, open: true })
    setErrorMessage("Succesfully Item Created")
  }

  const [DeviceType, setDeviceType] = useState();
  useEffect(() => {
    SelectDeviceType(serviceType);
  }, [])

  function SelectDeviceType(Type) {
    if (Type == "Network Devices") {
      setDeviceType(networkDevices);
      setManufacturer(networkDeviceManufacturers)
      setBoolNetwork(true)
    } else if (Type == "Server") {
      setDeviceType(ServerType);
      setManufacturer(ServerManufacturerData)
      setBoolServer(true)
    } else if (Type == "Storage Devices") {
      setDeviceType(storageDevices);
      setManufacturer(storageDeviceManufacturers);
      setBoolStorage(true);

    } else if (Type == "Desktop") {
      setDeviceType(desktops);
      setManufacturer(desktopManufacturers);
      setBoolDesktop(true);

    }
  }

  const HardwareField1 = ["Management Ip address (e.x:83.110.28.6)", "select storage type GB"]
  const SoftwareField1 = ["Operating System", "Virtualization Platform"]
  const ManagementField1 = ["Owner/Contact Person", "Maintanence Schedule"]

  const DesktopField1 = ["Ip address", "Select Storage Type"]
  const DesktopSoftwareField = ["Operating System", "Installed Application"]

  // const [Name, setName] = useState();
  const [Type, setType] = useState();
  // const [Description, setDescription] = useState();
  // const [LocationData, setLocationData] = useState([]);
  const [Manufacturer, setManufacturer] = useState();
  const [selectManufacturer, setSelectManufacturer] = useState();
  const [Model, setModel] = useState();
  const [SerialNumber, setSerialNumber] = useState();
  const [Location, setLocation] = useState();
  const [OS, setOS] = useState();
  const [Virtualization, setVirtualization] = useState()
  const [ipaddress, setipaddress] = useState("");
  const [serverName, setServerName] = useState();
  const [modelNumber, setModelNumber] = useState('');
  const [storageType, setStorageType] = useState();
  const [maintenanceSchedule, setMaintenanceSchedule] = useState();
  const [contactPerson, setContactPerson] = useState();


  const [RAM, setRAM] = useState();
  const [ROM, setROM] = useState();
  const [Core, setCore] = useState();

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  // const [NetworkDeviceName, setNetworkDeviceName] = useState();
  // const [NetworkDeviceType, setNetworkDeviceType] = useState();
  const [routingProtocol, setRoutingProtocol] = useState([]);

  const [storageInterface, setStorageInterface] = useState();
  const [fileSystem, setFileSystem] = useState();
  const [partitionStyle, setPartitionStyle] = useState();
  const [storageCapacity, setStorageCapacity] = useState();

  const [installedApplication, setInstalledApplication] = useState([]);
  const [Processor, setProcessor] = useState();

  const [itemCategory, setItemCategory] = useState(["Server", "NetworkDevice", "StorageDevice", "DesktopDevice"])


  const ServerData = {
    itemName: serverName,
    itemType: Type,
    manufacturerName: selectManufacturer,
    modelNumber: Model,
    Location: Location,
    serialNumber: SerialNumber,
    managementIpaddress: ipaddress,
    modelNumber,
    Location,
    storageType,
    virtualizationPlatform: Virtualization,
    operatingSystem: OS,
    warrantyStart: startDate,
    warrantyEnd: endDate,
    numberOfRam: RAM,
    numberOfRom: ROM,
    numberOfCores: Core,
    contactPerson,
    maintenanceSchedule,
    itemCategory: itemCategory[0]

  }

  const NetworkData = {
    itemName: serverName,
    itemType: Type,
    manufacturerName: selectManufacturer,
    modelNumber: Model,
    Location: Location,
    serialNumber: SerialNumber,
    modelNumber,
    Location,
    routingProtocol,
    virtualizationPlatform: Virtualization,
    operatingSystem: OS,
    warrantyStart: startDate,
    warrantyEnd: endDate,
    contactPerson,
    maintenanceSchedule,
    itemCategory: itemCategory[1]

  }
  const StorageData = {
    itemName: serverName,
    itemType: Type,
    manufacturerName: selectManufacturer,
    modelNumber: Model,
    Location: Location,
    serialNumber: SerialNumber,
    modelNumber,
    storageInterface,
    fileSystem,
    storageCapacity,
    partitionStyle,
    warrantyStart: startDate,
    warrantyEnd: endDate,
    contactPerson,
    maintenanceSchedule,
    itemCategory: itemCategory[2]
  }

  const DesktopData = {
    itemName: serverName,
    itemType: Type,
    manufacturerName: selectManufacturer,
    modelNumber: Model,
    location: Location,
    serialNumber: SerialNumber,
    managementIpaddress: ipaddress,
    modelNumber,
    storageType,
    virtualizationPlatform: Virtualization,
    operatingSystem: OS,
    warrantyStart: startDate,
    warrantyEnd: endDate,
    numberOfRam: RAM,
    numberOfRom: storageCapacity,
    numberOfCores: Core,
    contactPerson,
    maintenanceSchedule,
    itemCategory: itemCategory[3],
    processor: Processor,
    installedApplication,
    maintenanceSchedule,


  }



  function AddConfigurationItem(Type) {
    if (Type === "Network Devices") {
      AddItem(NetworkData);
    } else if (Type === "Server") {
      AddItem(ServerData);
    } else if (Type === "Storage Devices") {
      AddItem(StorageData)
    } else if (Type === "Desktop") {
      AddItem(DesktopData);
    }
  }



  // async function AddItem(data) {
  //   console.log(data);
  //   try {
  //     await axios.post(`${serverAPI}/createConfigurationItem`, data).then((res) => {
  //       console.log(res)
  //     }).catch((err) => { console.log(err) })
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  const AddItem = (data) => {
    console.log(data, 'object');
    GlobalService.generalSelect(
      (respdata) => {
        const { estatus, data: responseData } = respdata;
        console.log(responseData, 'Response from server');

        if (!estatus) {
          if (responseData.success) {
            console.log('Item created successfully:', responseData);
          } else {
            console.error('Failed to create item:', responseData.error);
          }
        }
      },
      resturls.postConfigurationItem, // API endpoint for creating the item
      data, // Payload to send in the POST request
      'POST' // HTTP method
    );
  };

  const [RouterImage, setRouterImage] = useState();



  return (
    <Container component="main">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", cursor: "pointer" }}>
        {/* <FaAngleDoubleRight style={{fontSize:25,color:"grey",marginTop:5}}/> */}
        {/* <h3>Basic Info</h3>
      <FaAngleDoubleRight style={{fontSize:25,color:"grey",marginTop:5}}/>
        <h3>Advanced Info</h3> */}
        <StepperComponent />
      </div>
      <GeneralInfoCi serviceType={serviceType} MenuItems1={[OrgOptions, OrgOptions]} Field1={Field1} Type={Type} setType={setType} setServerName={setServerName} setSerialNumber={setSerialNumber} Location={Location} setLocation={setLocation} modelNumber={modelNumber} setModelNumber={setModelNumber} MenuItems2={[ServerManufacturerData, BussinessCriticalOptions]} Field2={Field2} MenuItems3={[locationData, BussinessCriticalOptions]} ManufacturerData={Manufacturer} BussinessCriticalOptions={BussinessCriticalOptions} setModel={setModel} setManufacturer={setSelectManufacturer} Field3={Field3} />

      {BoolServer ? <ServerCI HardwareField1={HardwareField1} storageType={storageType} setStorageType={setStorageType} OperatingSystem={OS} setOperatingSystem={setOS} setipaddress={setipaddress} SoftwareField1={SoftwareField1} setVirtualization={setVirtualization} RAM={RAM} ROM={ROM} setRAM={setRAM} setROM={setROM} Virtualization={Virtualization} Core={Core} setCore={setCore} /> : null}
      {BoolNetwork ? <NetworkCI RoutingProtocol={routingProtocol} setOperatingSystem={setOS} setRoutingProtocol={setRoutingProtocol} HardwareField1={HardwareField1} Type={Type} setType={setType} setipaddress={setipaddress} SoftwareField1={SoftwareField1} OperatingSystem={OS} selectedValue={RouterImage} setSelectValue={setRouterImage} /> : null}
      {BoolStorage ? <StorageCI setStorageInterface={setStorageInterface} storageCapacity={storageCapacity} setStorageCapacity={setStorageCapacity} setPartitionStyle={setPartitionStyle} setFileSystem={setFileSystem} /> : null}
      {BoolDesktop ? <DesktopCI installedApplication={installedApplication} setInstalledApplication={setInstalledApplication} HardwareField1={DesktopField1} setOS={setOS} Core={Core} setCores={setCore} setProcessor={setProcessor} Processor={Processor} storageCapacity={storageCapacity} setStorageCapacity={setStorageCapacity} Type={storageType} setType={setStorageType} RAM={RAM} setRAM={setRAM} setipaddress={setipaddress} SoftwareField1={DesktopSoftwareField} /> : null}

      <ContentDevider title="Management Information" />
      <CmdbGridContainer MenuItems={[OperatingSystem, VirtualizationPlatform]} show={[false, false, true, true]} name={SoftwareField1} dropdown={[true, true]} selectValue={Type} icon={false} label={["Warranty start date", "Warranty end date"]} setSelectValue={setType} setDate1={setStartDate} setDate2={setEndDate} />
      <CmdbGridContainer MenuItems={[OwnerData, VirtualizationPlatform]} show={[true, false, true, false]} name={ManagementField1} dropdown={[true, false]} selectedValue1
        ={contactPerson} label={["Maintenance Schedule"]} setSelectValue1={setContactPerson} setDate1={setMaintenanceSchedule} />
      <Stack style={{ display: 'flex', alignItems: "center", justifyContent: "space-around", paddingRight: 20, paddingTop: 20, paddingBottom: 10 }} direction="row">
        <Button variant="outlined" color="warning" style={{ width: 100 }} onClick={() => {
          if (1 > 0) {
            // dispatch(setActiveStep(0));
            navigate(-1)
          }
        }}>Back</Button>
        <Button variant="contained" color="primary" style={{ width: 200 }} onClick={() => { handleOpen(); AddConfigurationItem(serviceType) }}>Create Item</Button>
      </Stack>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={ErrorMessage}
        key={vertical + horizontal}
        ContentProps={{
          sx: {
            background: "green"
          }
        }
        }
      />

    </Container>
  )
}

// import React from "react";
// import { Container } from "@mui/material";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { TextField, Button, Grid } from "@mui/material";
// import GlobalService from "../../services/GlobalService";
// import { resturls } from "../../global/utils/apiurls";

// function TechnicalInfo() {

//   const validationSchema = Yup.object({
//     itemId: Yup.string().required("Item ID is required"),
//     operatingSystem: Yup.string().required("Operating System is required"),
//     edition: Yup.string().required("Edition is required"),
//     osVersion: Yup.string().required("Operating System Version is required"),
//     architecture: Yup.string().required("Architecture is required"),
//   });


//   const AddItem = (data) => {
//     console.log(data, 'values');
//     GlobalService.generalSelect(
//       (respdata) => {
//         const { estatus, data: responseData } = respdata;
//         console.log(responseData, 'Response from server');

//         if (!estatus) {
//           if (responseData.success) {
//             console.log('Item created successfully:', responseData);
//           } else {
//             console.error('Failed to create item:', responseData.error);
//           }
//         }
//       },
//       resturls.postServiceConfigurationItem,
//       data,
//       'POST'
//     );
//   };

//   const formik = useFormik({
//     initialValues: {
//       itemId: "",
//       operatingSystem: "",
//       edition: "",
//       osVersion: "",
//       architecture: "",
//     },
//     validationSchema: validationSchema,
//     onSubmit: (values) => {
//       // handle form submission
//       AddItem(values);
//     },
//   });

//   return (
//     <Container>
//       <form onSubmit={formik.handleSubmit}>
//         <Grid container spacing={2}>
//           {/* Left Side Fields */}
//           <Grid item xs={6}>
//             <TextField
//               fullWidth
//               id="itemId"
//               name="itemId"
//               label="Item ID"
//               value={formik.values.itemId}
//               onChange={formik.handleChange}
//               error={formik.touched.itemId && Boolean(formik.errors.itemId)}
//               helperText={formik.touched.itemId && formik.errors.itemId}
//               variant="outlined"
//               margin="normal"
//             />
//             <TextField
//               fullWidth
//               id="operatingSystem"
//               name="operatingSystem"
//               label="Operating System"
//               value={formik.values.operatingSystem}
//               onChange={formik.handleChange}
//               error={
//                 formik.touched.operatingSystem &&
//                 Boolean(formik.errors.operatingSystem)
//               }
//               helperText={
//                 formik.touched.operatingSystem && formik.errors.operatingSystem
//               }
//               variant="outlined"
//               margin="normal"
//             />
//             <TextField
//               fullWidth
//               id="edition"
//               name="edition"
//               label="Edition"
//               value={formik.values.edition}
//               onChange={formik.handleChange}
//               error={formik.touched.edition && Boolean(formik.errors.edition)}
//               helperText={formik.touched.edition && formik.errors.edition}
//               variant="outlined"
//               margin="normal"
//             />
//           </Grid>

//           {/* Right Side Fields */}
//           <Grid item xs={6}>
//             <TextField
//               fullWidth
//               id="osVersion"
//               name="osVersion"
//               label="Operating System Version"
//               value={formik.values.osVersion}
//               onChange={formik.handleChange}
//               error={formik.touched.osVersion && Boolean(formik.errors.osVersion)}
//               helperText={formik.touched.osVersion && formik.errors.osVersion}
//               variant="outlined"
//               margin="normal"
//             />
//             <TextField
//               fullWidth
//               id="architecture"
//               name="architecture"
//               label="Architecture"
//               value={formik.values.architecture}
//               onChange={formik.handleChange}
//               error={
//                 formik.touched.architecture && Boolean(formik.errors.architecture)
//               }
//               helperText={
//                 formik.touched.architecture && formik.errors.architecture
//               }
//               variant="outlined"
//               margin="normal"
//             />
//           </Grid>
//         </Grid>

//         {/* Action Buttons */}
//         <Grid container justifyContent="space-between" mt={2}>
//           <Button variant="outlined" color="primary" type="button">
//             Back
//           </Button>
//           <Button variant="contained" color="primary" type="submit">
//             Create Item
//           </Button>
//         </Grid>
//       </form>
//     </Container>
//   );
// }
// export default TechnicalInfo;
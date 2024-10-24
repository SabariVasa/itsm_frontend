// import React, { useState, useEffect } from 'react';
// // import ContentDevider from '../HelperComponents/ContentDevider';
// // import CmdbGridContainer from '../HelperComponents/GridContainer';
// import BasicInfoSoftware from './BasicInfoSoftware';
// import { useParams, useNavigate } from 'react-router-dom';
// import { locationData } from '../../Utils/CMDB-Data/CIData';
// import { networkDevices, networkDeviceManufacturers, } from '../../Utils/CMDB-Data/NetworkCIData';
// import { ServerType, ServerManufacturerData, storageDeviceManufacturers, storageDevices, BussinessCriticalOptions } from '../../Utils/CMDB-Data/CIData';
// import { desktops, desktopManufacturers } from '../../Utils/CMDB-Data/DesktopData';
// import { desktopOperatingSystems, windowsAndLinuxVersions } from './OSData';
// // import StepperComponent from '../HelperComponents/StepperComponent';
// import { Stack, Button } from "@mui/material";
// // import { useDispatch,useSelector } from 'react-redux';
// // import { setActiveStep } from '../../Redux state management/Redux Slices/GlobalStepperSlice';
// import axios from 'axios';
// import { serverAPI } from '../../Utils/Server';
// import ReactLoading from 'react-loading';
// import NotifyBar from '../Notification Components/NotifyBar';
// import { resturls } from '../../global/utils/apiurls';
// import GlobalService from '../../services/GlobalService';

// export default function SoftwareInfo(props) {
//   const { serviceType, Id } = props;
//   const navigate = useNavigate();

//   const Field0 = ["Item ID", "Item Type"]
//   const Field1 = [`${serviceType}`, `${serviceType} Version`];
//   const Field2 = ["Edition", "Architecture"];
//   const Field3 = ["Location", "Serial Number"];

//   const [BoolNetwork, setBoolNetwork] = useState(false);
//   const [BoolServer, setBoolServer] = useState(false);
//   const [BoolStorage, setBoolStorage] = useState(false);
//   const [BoolDesktop, setBoolDesktop] = useState(false);

//   const NetworkField1 = ["Operating", ""]

//   const [state, setState] = useState({
//     open: false,
//     vertical: 'bottom',
//     horizontal: 'center',
//   });
//   const { vertical, horizontal, open } = state;
//   const handleClose = () => {
//     setState({ ...state, open: false })
//   }

//   const handleOpen = () => {
//     setState({ ...state, open: true })
//     setErrorMessage("Succesfully Item Created")
//   }

//   // const dispatch = useDispatch();
//   // const activeStep = useSelector(state=>state.globalReducers.activeStep);

//   const [DeviceType, setDeviceType] = useState();
//   useEffect(() => {
//     SelectDeviceType(serviceType);
//   }, [])

//   function SelectDeviceType(Type) {
//     if (Type == "Network Devices") {
//       setDeviceType(networkDevices);
//       setManufacturer(networkDeviceManufacturers)
//       setBoolNetwork(true)
//     } else if (Type == "Server") {
//       setDeviceType(ServerType);
//       setManufacturer(ServerManufacturerData)
//       setBoolServer(true)
//     } else if (Type == "Storage Devices") {
//       setDeviceType(storageDevices);
//       setManufacturer(storageDeviceManufacturers);
//       setBoolStorage(true);

//     } else if (Type == "Desktop") {
//       setDeviceType(desktops);
//       setManufacturer(desktopManufacturers);
//       setBoolDesktop(true);

//     }
//   }



//   async function getItemDetails() {
//     await axios.get(`${serverAPI}/get-software-by-id/${Id}`).then((res) => {
//       if (res.data) {
//         setItemId(res.data[0].itemId);
//         setItemName(res.data[0].itemName);
//         // setItemCategory(res.data.itemCategory);
//         setItemEdition(res.data[0].itemEdition);
//         setItemArchitecture(res.data[0].itemArchitecture);
//         setItemVersion(res.data[0].itemVersion);
//       }
//       console.log(res.data)
//     }).catch((err) => { console.log(err) })
//   }

//   const HardwareField1 = ["Management Ip address (e.x:83.110.28.6)", "select storage type GB"]
//   const SoftwareField1 = ["Operating System", "Virtualization Platform"]
//   const ManagementField1 = ["Owner/Contact Person", "Maintanence Schedule"]

//   const DesktopField1 = ["Ip address", "Select Storage Type"]
//   const DesktopSoftwareField = ["Operating System", "Installed Application"]

//   const [Name, setName] = useState();
//   const [Type, setType] = useState();
//   const [Description, setDescription] = useState();
//   const [LocationData, setLocationData] = useState([]);
//   const [Manufacturer, setManufacturer] = useState();
//   const [selectManufacturer, setSelectManufacturer] = useState();
//   const [Model, setModel] = useState();
//   const [SerialNumber, setSerialNumber] = useState();
//   const [Location, setLocation] = useState();
//   const [OS, setOS] = useState();
//   const [Virtualization, setVirtualization] = useState()
//   const [ipaddress, setipaddress] = useState("");
//   const [serverName, setServerName] = useState();
//   const [modelNumber, setModelNumber] = useState('');

//   const [itemId, setItemId] = useState("");
//   const [itemType, setItemType] = useState(serviceType);
//   const [itemName, setItemName] = useState("");
//   const [itemEdition, setItemEdition] = useState("");
//   const [itemVersion, setItemVersion] = useState("");
//   const [itemArchitecture, setItemArchitecture] = useState("");

//   const [count, setCount] = useState(0);

//   const [isVisible, setisVisible] = useState(true);
//   const [ErrorMessage, setErrorMessage] = useState();
//   const [Success, setSuccess] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [notifyStatus, setNotifyStatus] = useState(false);
//   const [notifyMessage, setNotifyMessage] = useState("");
//   async function fetchSoftwareCount() {
//     await axios.get(`${serverAPI}/all-software-count`).then((res) => {
//       setCount(parseInt(res.data.responseData) + 1)
//       let tempCount = parseInt(res.data.responseData) + 1;
//       setItemId(`ITM-SW-00000` + tempCount);
//       console.log(res.data)
//     }).catch((err) => { console.log(err) })
//   }

//   function spinnerLoading(status) {
//     setLoading(true);

//     setTimeout(() => {
//       setLoading(false);
//       if (status === 200) {
//         setNotifyStatus(true);
//         setNotifyMessage(`${serviceType} successfully updated`);
//         // navigate("/");
//       } else {
//         setError(true)
//         setNotifyStatus(true);
//         setNotifyMessage("something went wrong!please try again later")
//       }
//     }, 2000)
//   }
//   async function createItem() {
//     const data = {
//       itemId: itemId,
//       itemType: itemType,
//       itemName: itemName,
//       itemEdition: itemEdition,
//       itemVersion: itemVersion,
//       itemArchitecture: itemArchitecture
//     }
//     // await axios.post(`${serverAPI}/create-software-item`, data).then((res) => {
//     //   if (res.data) {
//     //     spinnerLoading(res.data.statusCode);
//     //   }
//     // }).catch((err) => { console.log(err) })
//     GlobalService.generalSelect(
//       (respdata) => {
//         const { estatus, data: responseData } = respdata;
//         console.log(responseData, 'Response from server');

//         if (!estatus) {
//           if (responseData.success) {
//             spinnerLoading(responseData.data.statusCode);
//             console.log('Item created successfully:', responseData);
//           } else {
//             console.error('Failed to create item:', responseData.error);
//           }
//         }
//       },
//       resturls.postSoftwareConfigurationItem,
//       data,
//       'POST'
//     );
//   }

//   const [RouterImage, setRouterImage] = useState();
//   const [routinProtocol, setRoutingProtocol] = useState();

//   async function updateItem() {
//     const data = {
//       itemId: itemId,
//       itemType: itemType,
//       itemName: itemName,
//       itemEdition: itemEdition,
//       itemVersion: itemVersion,
//       itemArchitecture: itemArchitecture
//     }
//     console.log(data)
//     await axios.post(`${serverAPI}/update-software/${Id}}`, data).then((res) => {
//       if (res.data) {
//         spinnerLoading(res.data.statusCode);
//       }
//       console.log(res.data)
//     }).catch((err) => { console.log(err) })
//   }

//   const [buttonState, setButtonState] = useState("");
//   useEffect(() => {
//     if (Id) {
//       setButtonState("Update item")
//       getItemDetails();

//     } else {
//       fetchSoftwareCount();
//       setButtonState("Create item")
//     }
//   }, [Id])

//   return (
//     <>
//       {/* <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start",cursor:"pointer"}}><StepperComponent/>
//              </div> */}
//       {loading ? <div style={{ position: "absolute", left: 150, bottom: 100, display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "60vh" }}>
//         <ReactLoading type={"spin"} color={"#e699ff"} /></div> : null}
//       <BasicInfoSoftware serviceType={serviceType} Field0={Field0} MenuItems1={[desktopOperatingSystems, windowsAndLinuxVersions]} Field1={Field1} Type={Type} setType={setType} setServerName={setServerName} setSerialNumber={setSerialNumber} Location={Location} setLocation={setLocation} MenuItems2={[Manufacturer, BussinessCriticalOptions]} Field2={Field2} MenuItems3={[locationData, BussinessCriticalOptions]} ManufacturerData={Manufacturer} BussinessCriticalOptions={BussinessCriticalOptions} setModel={setModel} setManufacturer={setSelectManufacturer} Field3={Field3}

//         itemType={itemType} setItemType={setItemType} itemId={itemId} setItemId={setItemId} itemArchitecture={itemArchitecture} setItemArchitecture={setItemArchitecture} itemEdition={itemEdition} setItemEdition={setItemEdition} itemVersion={itemVersion} setItemVersion={setItemVersion} itemName={itemName} setItemName={setItemName}

//       />

//       <Stack style={{ display: 'flex', alignItems: "center", justifyContent: "space-around", paddingRight: 20, paddingTop: 20, paddingBottom: 10 }} direction="row">
//         <Button variant="outlined" color="warning" style={{ width: 100 }} onClick={() => { navigate(-1) }}>Back</Button>
//         <Button variant="contained" color="primary" style={{ width: 200 }} onClick={() => {
//           if (!Id) { createItem() } else { updateItem() }
//         }}>{buttonState}</Button>
//       </Stack>
//       <NotifyBar error={error} setError={setError} notifyMessage={notifyMessage} notifyStatus={notifyStatus} setNotifyStatus={setNotifyStatus} />
//     </>
//   )
// }
import React, { useState, useEffect } from 'react';
import BasicInfoSoftware from './BasicInfoSoftware';
// import { useNavigate } from 'react-router-dom';
import { networkDevices, networkDeviceManufacturers } from '../../Utils/CMDB-Data/NetworkCIData';
import { ServerType, ServerManufacturerData, storageDevices, storageDeviceManufacturers, BussinessCriticalOptions } from '../../Utils/CMDB-Data/CIData';
import { desktops, desktopManufacturers } from '../../Utils/CMDB-Data/DesktopData';
import { desktopOperatingSystems, windowsAndLinuxVersions } from './OSData';
import { Stack, Button } from "@mui/material";
import axios from 'axios';
import { serverAPI } from '../../Utils/Server';
import { locationData } from '../../Utils/CMDB-Data/CIData';
import ReactLoading from 'react-loading';
import NotifyBar from '../Notification Components/NotifyBar';
import GlobalService from '../../services/GlobalService';
import { resturls } from '../../global/utils/apiurls';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function SoftwareInfo(props) {
  const { serviceType, Id } = props;
  const navigate = useHistory();
  const Field0 = ["Item ID", "Item Type"];
  const Field1 = [`${serviceType}`, `${serviceType} Version`];
  const Field2 = ["Edition", "Architecture"];
  const Field3 = ["Location", "Serial Number"];
  const [serverName, setServerName] = useState();
  // const [LocationData, setLocationData] = useState([]);
  const [SerialNumber, setSerialNumber] = useState();
  const [count, setCount] = useState(0);
  const [ErrorMessage, setErrorMessage] = useState();
  const [BoolNetwork, setBoolNetwork] = useState(false);
  const [BoolServer, setBoolServer] = useState(false);
  const [BoolStorage, setBoolStorage] = useState(false);
  const [BoolDesktop, setBoolDesktop] = useState(false);

  const [state, setState] = useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;
  const handleClose = () => setState({ ...state, open: false });
  const handleOpen = () => {
    setState({ ...state, open: true });
    setErrorMessage("Successfully Item Created");
  };

  const [DeviceType, setDeviceType] = useState();
  const [Manufacturer, setManufacturer] = useState();
  const [selectManufacturer, setSelectManufacturer] = useState();
  const [Model, setModel] = useState();
  const [Location, setLocation] = useState();

  const [itemId, setItemId] = useState("");
  const [itemType, setItemType] = useState(serviceType);
  const [itemName, setItemName] = useState("");
  const [itemEdition, setItemEdition] = useState("");
  const [itemVersion, setItemVersion] = useState("");
  const [itemArchitecture, setItemArchitecture] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [notifyStatus, setNotifyStatus] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState("");
  const [buttonState, setButtonState] = useState("");

  useEffect(() => {
    if (Id) {
      setButtonState("Update item");
      getItemDetails();
    } else {
      fetchSoftwareCount();
      setButtonState("Create item");
    }
  }, [Id]);

  useEffect(() => {
    SelectDeviceType(serviceType);
  }, []);

  function SelectDeviceType(Type) {
    if (Type === "Network Devices") {
      setDeviceType(networkDevices);
      setManufacturer(networkDeviceManufacturers);
      setBoolNetwork(true);
    } else if (Type === "Server") {
      setDeviceType(ServerType);
      setManufacturer(ServerManufacturerData);
      setBoolServer(true);
    } else if (Type === "Storage Devices") {
      setDeviceType(storageDevices);
      setManufacturer(storageDeviceManufacturers);
      setBoolStorage(true);
    } else if (Type === "Desktop") {
      setDeviceType(desktops);
      setManufacturer(desktopManufacturers);
      setBoolDesktop(true);
    }
  }

  async function getItemDetails() {
    await axios.get(`${serverAPI}/get-software-by-id/${Id}`).then((res) => {
      if (res.data) {
        setItemId(res.data[0].itemId);
        setItemName(res.data[0].itemName);
        setItemEdition(res.data[0].itemEdition);
        setItemArchitecture(res.data[0].itemArchitecture);
        setItemVersion(res.data[0].itemVersion);
      }
    }).catch((err) => console.log(err));
  }

  async function fetchSoftwareCount() {
    await axios.get(`${serverAPI}/all-software-count`).then((res) => {
      const tempCount = parseInt(res.data.responseData) + 1;
      setCount(tempCount);
      setItemId(`ITM-SW-00000${tempCount}`);
    }).catch((err) => console.log(err));
  }

  function spinnerLoading(status) {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (status === 200) {
        setNotifyStatus(true);
        setNotifyMessage(`${serviceType} successfully updated`);
      } else {
        setError(true);
        setNotifyStatus(true);
        setNotifyMessage("Something went wrong! Please try again later.");
      }
    }, 2000);
  }

  async function createItem() {
    const data = {
      itemId, itemType, itemName, itemEdition, itemVersion, itemArchitecture
    };
    GlobalService.generalSelect(
      (respdata) => {
        const { estatus, data: responseData } = respdata;
        if ((!estatus || estatus === null) && responseData.success) {
          spinnerLoading(responseData.data.statusCode);
        }
      },
      resturls.postSoftwareConfigurationItem,
      data,
      'POST'
    );
  }

  async function updateItem() {
    const data = { itemId, itemType, itemName, itemEdition, itemVersion, itemArchitecture };
    await axios.post(`${serverAPI}/update-software/${Id}`, data).then((res) => {
      if (res.data) {
        spinnerLoading(res.data.statusCode);
      }
    }).catch((err) => console.log(err));
  }

  return (
    <>
      {loading ? <div style={{ position: "absolute", left: 150, bottom: 100, display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "60vh" }}>
        <ReactLoading type={"spin"} color={"#e699ff"} /></div> : null}
      <BasicInfoSoftware
        serviceType={serviceType}
        Field0={Field0}
        MenuItems1={[desktopOperatingSystems, windowsAndLinuxVersions]}
        Field1={Field1}
        setServerName={setServerName}
        setSerialNumber={setSerialNumber}
        Location={Location}
        setLocation={setLocation}
        MenuItems2={[Manufacturer, BussinessCriticalOptions]}
        Field2={Field2}
        MenuItems3={[locationData, BussinessCriticalOptions]}
        ManufacturerData={Manufacturer}
        BussinessCriticalOptions={BussinessCriticalOptions}
        setModel={setModel}
        setManufacturer={setSelectManufacturer}
        Field3={Field3}
        itemType={itemType}
        setItemType={setItemType}
        itemId={itemId}
        setItemId={setItemId}
        itemArchitecture={itemArchitecture}
        setItemArchitecture={setItemArchitecture}
        itemEdition={itemEdition}
        setItemEdition={setItemEdition}
        itemVersion={itemVersion}
        setItemVersion={setItemVersion}
        itemName={itemName}
        setItemName={setItemName}
      />
      <Stack style={{ display: 'flex', alignItems: "center", justifyContent: "space-around", paddingRight: 20, paddingTop: 20, paddingBottom: 10 }} direction="row">
        <Button variant="outlined" color="warning" style={{ width: 100 }} onClick={() => { navigate(-1) }}>Back</Button>
        <Button variant="contained" color="primary" style={{ width: 200 }} onClick={() => { if (!Id) { createItem() } else { updateItem() } }}>{buttonState}</Button>
      </Stack>
      <NotifyBar error={error} setError={setError} notifyMessage={notifyMessage} notifyStatus={notifyStatus} setNotifyStatus={setNotifyStatus} />
    </>
  );
}

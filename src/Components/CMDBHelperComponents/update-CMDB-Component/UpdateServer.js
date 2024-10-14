import React,{useState,useEffect} from 'react';
import GeneralInfoCi from '../GeneralInfoCi';
import { useParams } from 'react-router-dom';
import { Button,Stack,Snackbar,Container } from '@mui/material';
import { OrgOptions,ServerManufacturerData,BussinessCriticalOptions,locationData,OperatingSystem,VirtualizationPlatform,OwnerData, storageDevices,ServerType, storageDeviceManufacturers} from '../../../Utils/CMDB-Data/CIData';
import axios from 'axios';
import { serverAPI } from '../../../Utils/Server';
import ServerCI from '../ServerCI';
import ContentDevider from '../../HelperComponents/ContentDevider';
import CmdbGridContainer from '../../HelperComponents/GridContainer';
import { desktopManufacturers, desktops } from '../../../Utils/CMDB-Data/DesktopData';
import { networkDeviceManufacturers, networkDevices } from '../../../Utils/CMDB-Data/NetworkCIData';
import DesktopCI from '../DesktopCI';
import NetworkCI from '../NetworkCI';
import StorageCI from '../StorageCI';


export default function UpdateServer() {
    let{name,Category}=useParams();
    
    const Field1 = [`${Category}Name`,`${Category}Type`];
    const Field2 = ["Manufacturer","Model Number"];
    const Field3 = ["Location","Serial Number"];

    const[serverBool,setServerBool]=useState(false);
    const[storageBool,setStorageBool]=useState(false);
    const[desktopBool,setDesktopBool]=useState(false);
    const[networkBool,setNetworkBool]=useState(false);
    
    const[serverCategory,setServerCategory]=useState([]);
   
    // const NetworkField1 = ["Operating",""]

    const [state, setState] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
      });
      const { vertical, horizontal, open } = state;
      const [ErrorMessage, setErrorMessage]=useState();
      const handleClose = ()=>{
        setState({...state,open:false})
      }
    
      const handleOpen = ()=>{
        setState({...state,open:true})
        setErrorMessage("Item Successfully updated")
      }
    
      // const[DeviceType,SelectDeviceType]=useState();
      const[ManufacturerData,setManufacturerData]=useState();
      // const[NetworkDeviceName,setNetworkDeviceName]=useState();
      // const[NetworkDeviceType,setNetworkDeviceType]=useState();
      const[routingProtocol,setRoutingProtocol]=useState([]);
  
      const[storageInterface,setStorageInterface]=useState("");
      const[fileSystem,setFileSystem]=useState("");
      const[partitionStyle,setPartitionStyle]=useState("");
      const[storageCapacity,setStorageCapacity]=useState();
      
      const[installedApplication,setInstalledApplication]=useState([]);
      const[Processor,setProcessor]=useState();
      const [RouterImage,setRouterImage]=useState();
    useEffect(()=>{
      // SelectDeviceType("Server");
      if(Category=="Server"){
        setServerCategory(ServerType);
        setManufacturerData(ServerManufacturerData);
        setServerBool(true);
      }else if(Category=="NetworkDevice"){
        setServerCategory(networkDevices)
        setManufacturerData(networkDeviceManufacturers)
        setNetworkBool(true);
      }else if(Category=="StorageDevice"){
        setServerCategory(storageDevices);
        setManufacturerData(storageDeviceManufacturers)
        setStorageBool(true);
      }else if(Category=="DesktopDevice"){
        setServerCategory(desktops)
        setManufacturerData(desktopManufacturers)
        setDesktopBool(true);
      }
      console.log(Category)
    },[])



    const HardwareField1 = ["Management Ip address (e.x:83.110.28.6)","select storage type GB"]
    const SoftwareField1 = ["Operating System","Virtualization Platform"]
    const ManagementField1 = ["Owner/Contact Person","Maintanence Schedule"]

    const DesktopField1=["Ip address","Select Storage Type"]
    const DesktopSoftwareField = ["Operating System","Installed Application"]

    // const[Name,setName]=useState("");
    const[Type,setType]=useState("");
    // const[Description,setDescription]=useState("");
    // const[LocationData,setLocationData]=useState([]);
    const[Manufacturer,setManufacturer]=useState("");
    const[selectManufacturer,setSelectManufacturer]=useState("");
    const[Model,setModel]=useState("");
    const[SerialNumber,setSerialNumber]=useState("");
    const[Location,setLocation]=useState("");
    const[OS,setOS]=useState("");
    const[Virtualization,setVirtualization]=useState("")
    const [ipaddress,setipaddress]=useState("");
    const[serverName,setServerName]=useState("");
    const[modelNumber,setModelNumber]=useState('');
    const[storageType,setStorageType]=useState("");
    const[maintanenceSchedule,setMaintanenceSchedule]=useState("");
    const[contactPerson,setContactPerson]=useState("");
    

    
 
    const[RAM,setRAM]=useState();
    const[ROM,setROM]=useState();
    const[Core,setCore]=useState();

    const[startDate,setStartDate]=useState("");
    const[endDate,setEndDate]=useState("");

    useEffect(()=>{
       updateItem();
    },[name])

  
    

    const ServerData = {
      itemName:serverName,
      itemType:Type,
      manufacturerName:selectManufacturer,
      modelNumber:Model,
      Location:Location,
      serialNumber:SerialNumber,
      managementIpaddress:ipaddress,
      // modelNumber,
      // Location,
      storageType,
      virtualizationPlatform:Virtualization,
      operatingSystem:OS,
      warrantyStart:startDate,
      warrantyEnd:endDate,
      numberOfRam:RAM,
      numberOfRom:ROM,
      numberOfCores:Core,
      contactPerson,
      maintanenceSchedule,


    }

    const NetworkData = {
      itemName:serverName,
      itemType:Type,
      manufacturerName:selectManufacturer,
      modelNumber:Model,
      location:Location,
      serialNumber:SerialNumber,
      // modelNumber,
      routingProtocol,
      virtualizationPlatform:Virtualization,
      operatingSystem:OS,
      warrantyStart:startDate,
      warrantyEnd:endDate,
      contactPerson,
       maintanenceSchedule,
      
    }
    const StorageData = {
      itemName:serverName,
      itemType:Type,
      manufacturerName:selectManufacturer,
      modelNumber:Model,
      Location:Location,
      serialNumber:SerialNumber,
      // modelNumber,
      storageInterface,
      fileSystem,
      storageCapacity,
      partitionStyle,
      warrantyStart:startDate,
      warrantyEnd:endDate,
      contactPerson,
      maintanenceSchedule,
    }
    
    const DesktopData = {
      itemName:serverName,
      itemType:Type,
      manufacturerName:selectManufacturer,
      modelNumber:Model,
      location:Location,
      serialNumber:SerialNumber,
      managementIpaddress:ipaddress,
      // modelNumber,
      storageType,
      virtualizationPlatform:Virtualization,
      operatingSystem:OS,
      warrantyStart:startDate,
      warrantyEnd:endDate,
      numberOfRam:RAM,
      numberOfRom:storageCapacity,
      numberOfCores:Core,
      contactPerson,
      maintanenceSchedule,
      processor:Processor,
      installedApplication,
      // maintanenceSchedule,


    }



    function updateConfigurationItem(Type){
      if(Type=="NetworkDevice"){
         AddItem(NetworkData);
      }else if(Type=="Server"){
         AddItem(ServerData);
      }else if(Type=="StorageDevice"){
        AddItem(StorageData)
      }else if(Type=="DesktopDevice"){
         AddItem(DesktopData);
      }
    }
   
  

    async function AddItem(data){
      console.log(data);
      try{
      await axios.post(`${serverAPI}/updateConfigurationItem/${serverName}`,data).then((res)=>{
        console.log(res)}).catch((err)=>{console.log(err)})
      }catch(err){
         console.log(err);
      }
    }


    //P ost API for updating the server by name
    async function updateItem(){
       await axios.get(`${serverAPI}/getServerbyName/${name}`).then((res)=>{
          if(res.data){
            setServerName(res.data[0].itemName);
            setType(res.data[0].itemType);
            setSelectManufacturer(res.data[0].manufacturerName);
            setModelNumber(res.data[0].modelNumber);
            setSerialNumber(res.data[0].serialNumber);
            setipaddress(res.data[0].managementIpaddress);
            setStorageType(res.data[0].storageType);
            setCore(res.data[0].numberOfCores);
            setRAM(res.data[0].numberOfRam);
            setROM(res.data[0].numberOfRom);
            setOS(res.data[0].operatingSystem);
            setLocation(res.data[0].location);
            setMaintanenceSchedule(res.data[0].maintenanceSchedule);
            setVirtualization(res.data[0].virtualizationPlatform);
            setContactPerson(res.data[0].contactPerson);
            setStartDate(res.data[0].warrantyStart);
            setEndDate(res.data[0].warrantyEnd);
            setRoutingProtocol(res.data[0].routingProtocol)
            setProcessor(res.data[0].processor);
            setStorageCapacity(res.data[0].numberOfRom?res.data[0].numberOfRom:res.data[0].storageCapacity)
            setInstalledApplication(res.data[0].installedApplication);
            setPartitionStyle(res.data[0].partitionStyle);
            setFileSystem(res.data[0].fileSystem);
            setStorageInterface(res.data[0].storageInterface);
          }
          console.log(partitionStyle);
       }).catch((err)=>console.log(err));
    }

  return (
     <Container className="main">
         <GeneralInfoCi serviceType={Category} MenuItems1={[OrgOptions,serverCategory]} Field1={Field1} Type={Type} setType={setType} serverName={serverName} setServerName={setServerName}  setSerialNumber={setSerialNumber} Location={Location} setLocation={setLocation} modelNumber={modelNumber} setModelNumber={setModelNumber} MenuItems2={[ServerManufacturerData,BussinessCriticalOptions]} Field2={Field2} MenuItems3={[locationData,BussinessCriticalOptions]} ManufacturerData={Manufacturer} BussinessCriticalOptions={BussinessCriticalOptions} setModel={setModel}  Manufacturer={selectManufacturer} setManufacturer={setSelectManufacturer} Field3={Field3} serialNumber={SerialNumber}/>

         {/* <GeneralInfoCi serviceType={Category} MenuItems1={[OrgOptions,OrgOptions]} Field1={Field1} Type={Type} setType={setType} setServerName={setServerName} setSerialNumber={setSerialNumber} Location={Location} setLocation={setLocation} modelNumber={modelNumber} setModelNumber={setModelNumber} MenuItems2={[ServerManufacturerData,BussinessCriticalOptions]} Field2={Field2} MenuItems3={[locationData,BussinessCriticalOptions]} ManufacturerData={Manufacturer} BussinessCriticalOptions={BussinessCriticalOptions} setModel={setModel} setManufacturer={setSelectManufacturer} Field3={Field3} /> */}

         {serverBool?<ServerCI HardwareField1={HardwareField1} storageType={storageType} setStorageType={setStorageType} OperatingSystem={OS} setOperatingSystem={setOS} ipaddress={ipaddress} setipaddress={setipaddress} SoftwareField1={SoftwareField1} setVirtualization={setVirtualization} RAM={RAM} ROM={ROM} setRAM={setRAM} setROM={setROM} Virtualization={Virtualization} Core={Core} setCore={setCore}/>:null}

         {networkBool?<NetworkCI RoutingProtocol={routingProtocol}  setOperatingSystem={setOS} setRoutingProtocol={setRoutingProtocol} HardwareField1={HardwareField1} Type={Type} setType={setType} setipaddress={setipaddress} SoftwareField1={SoftwareField1} OperatingSystem={OS} selectedValue={RouterImage} setSelectValue={setRouterImage}/>:null}

         {storageBool?<StorageCI setStorageInterface={setStorageInterface} storageCapacity={storageCapacity} setStorageCapacity={setStorageCapacity} setPartitionStyle={setPartitionStyle} partitionStyle={partitionStyle} storageInterface={storageInterface} fileSystem={fileSystem} setFileSystem={setFileSystem} maintanenceSchedule={maintanenceSchedule}/>:null}

         {desktopBool?<DesktopCI installedApplication={installedApplication} setInstalledApplication={setInstalledApplication} HardwareField1={DesktopField1} OS={OS} setOS={setOS} Core={Core} setCores={setCore} setProcessor={setProcessor} Processor={Processor} storageCapacity={storageCapacity} setStorageCapacity={setStorageCapacity} Type={storageType} setType={setStorageType} RAM={RAM} setRAM={setRAM} ipaddress={ipaddress} setipaddress={setipaddress} SoftwareField1={DesktopSoftwareField}/>:null}


        <ContentDevider title="Management Information"/>
        <CmdbGridContainer MenuItems={[OperatingSystem,VirtualizationPlatform]}  Date1={startDate} Date2={endDate} selectedValue1={startDate} selectedValue2={endDate} show={[false,false,true,true]} name={SoftwareField1} dropdown={[true,true]} selectValue={Type} icon={false} label={["Warranty start date","Warranty end date"]} setSelectValue={setType} setDate1={setStartDate} setDate2={setEndDate}/>
        <CmdbGridContainer MenuItems={[OwnerData,VirtualizationPlatform]}  show={[true,false,true,false]} name={ManagementField1} dropdown={[true,false]} SelectedValue1
        ={contactPerson} label={["Maintenance Schedule"]} setSelectValue1={setContactPerson} setDate1={setMaintanenceSchedule} Date1={maintanenceSchedule}/>
        <Stack style={{display:'flex',alignItems:"center",justifyContent:"right",paddingRight:20,paddingTop:20,paddingBottom:10}} direction="row">
              <Button variant="contained"  color="primary" style={{width:200}} onClick={()=>{handleOpen();updateConfigurationItem(Category)}}>Update Item</Button>
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
          }}
        }
      />
     </Container>
  )
}

import React, { useState, useRef, createContext, Fragment, useEffect } from 'react';
// import Home from '../Pages/Home';
import CreateNewIncident from '../Components/IncidentHelperComponents/CreateNewIncident';
import IncidentTable from '../Components/HelperComponents/IncidentTable';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { IncidentData, AssignedToMeIncidentData, OpenIncidentData, ResolvedIncidentData, OpenUnAssignedIncidentData } from '../Utils/Incident-Data/IncidentsData';
import IncidentDashboard from '../Dashboards/IncidentDashboard';
import IncidentEditPage from '../Components/IncidentHelperComponents/IncidentEditPage';
import TokenGenerationPage from '../Pages/TokenGenerationPage';
// import { Sidebar } from 'react-pro-sidebar';
// import { Container,Grid } from '@mui/material'; 
import CmdbSelectField from '../Components/HelperComponents/SelectField';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import Constructionpage from '../Components/HelperComponents/Contructionpage';
// import SideBarNav from '../Components/NavbarComponents/SideBarNav';
import CMDB from '../Pages/CMDB';
import CmdbFormPage from '../Pages/CmdbFormPage';
import CI from '../Components/CMDBHelperComponents/CI';
import TechnicalInfo from '../Components/CMDBHelperComponents/TechnicalInfo';
// import CustomScrollbar from '../Components/HelperComponents/CustomScrollBar';
// import ContentWrapper from '../Components/HelperComponents/ContentWrapper';
// import {Scrollbars} from 'react-custom-scrollbars';
import SoftwareInfo from '../Components/CMDBHelperComponents/SoftwareInfo';
import CMDBTable from '../Components/HelperComponents/Table';
import { CMDBheaderData } from '../Utils/CMDB-Data/CmdbData';
import UpdateServer from '../Components/CMDBHelperComponents/update-CMDB-Component/UpdateServer';
import CMDBService from '../Components/CMDBHelperComponents/update-CMDB-Component/CMDBService';
import RequestForm from '../Components/Request Management/Helper Components/RequestForm';
// import CreateRequestItem from '../Components/Request Management/Main Component/CreateRequestItem';
import NotFoundPage from '../Error Components/NotFoundPage';
import RequestItemDetails from '../Components/Request Management/Helper Components/RequestItemDetails';
import RequestCategory from '../Components/Request Management/Main Component/RequestCategory';
import RequestItem from '../Components/Request Management/Main Component/RequestItem';
import MyRequestTable from '../Components/Request Management/Main Component/MyRequestTable';
import GeneralService from '../Components/Request Management/Main Component/GeneralService';
import ServiceCategoryForm from '../Components/Request Management/Main Component/ServiceCategoryForm';
import ContentDevider from '../Components/HelperComponents/ContentDevider';
import KnowledgeContainer from '../Components/KnowledgeArticle/KnowledgeContainer';
// import KnowledgeNavbar from '../Components/KnowledgeArticle/KnowledgeNavbar';
import CreateKnowledge from '../Components/KnowledgeArticle/CreateKnowledge';
// import { Article, Preview } from '@mui/icons-material';
import PreviewPage from '../Components/KnowledgeArticle/HelperComponents/PreviewPage';
import ArticleDetailsPage from '../Components/KnowledgeArticle/ArticleDetailsPage';
import CreateChange from '../Components/Change Management/CreateChange';
import AllChanges from '../Components/Change Management/AllChanges';
// import ResetPassword from '../Pages/ResetPassword';
import UserManagmentTable from '../Pages/UserManagmentTable';
// import UserPortal from '../Components/Privilage Templates/UserPortal';
// import AdminSideBar from '../Components/Privilage Templates/AdminSideBar';
import SuperAdminSideBar from '../Components/Privilage Templates/SuperAdminSideBar';
// import ReactFormBuilder from '../React-Forms/ReactFormGenerate';
import ReactFormGenerate from '../React-Forms/ReactFormGenerate';
import FormMenu from "../React-Forms/FormMenu";
import SoftwareTable from '../Components/CMDBHelperComponents/SoftwareTable';

export const RequestContext = createContext(null);
export const ChangeContext = createContext(null);

export default function SuperAdminRouter() {
  const [drawer, setDrawer] = useState(true);
  const myScrollbarRef = useRef(null);
  const [parser, setParser] = useState("");
  const [knowledgeData, setKnowledgeData] = useState({
    articleNumber: "",
    title: "",
    articleType: "",
    category: "",
    articleContent: "",
    author: "",
    ShortDescription: "",
    imageData: "",
    PreviewImage: ""
  })
  const [title, setTitle] = useState("");

  useEffect(() => {
    console.log(drawer)
  }, [drawer])

  const [requestDetails, setRequestDetails] = useState([]);
  const [requestService, setRequestService] = useState({
    requestNumber: "",
    approvalStatus: "",
    requestState: "",
    openedDate: "",
    dueDate: "",
    requestFor: "",
    openedBy: "",
    ShortDescription: "",
    selectedItem: [],
  });
  const [requestGeneralService, setRequestGeneralService] = useState({
    requestNumber: "",
    requesterName: "",
    requesterEmail: "",
    requesterServiceType: "",
    affectedUser: "",
    preferedContact: "",
    priority: "",
    approvalStatus: "",
    reasonDescription: "",

    requestAccess: "",
    approvalFrom: "",
    userRole: "",

    affectedService: "",
    changeDate: "",
    backoutPlan: "",
    changeApproval: "",
    openedDate: ""
  });
  const [selectedRequest, setSelectedRequest] = useState("Hardware requests");

  const IncidentHeaderData = [
    {
      field: 'incidentId', headerName: 'ID', width: 100, renderCell: (params) => (
        <Link href={`/IncidentEditPage/${params.id}`} underline="none" color="inherit">
          {params.value}
        </Link>
      ),
    },
    { field: 'openedDate', headerName: 'Opened', width: 100 },
    { field: 'configurationItem', headerName: 'Configuration Item', width: 120 },
    { field: 'caller', headerName: 'Caller', width: 120 },
    { field: 'channel', headerName: 'Channel', width: 120 },
    { field: 'priority', headerName: 'Priority', width: 130 },
    { field: 'state', headerName: 'State', width: 130 },
    { field: 'service', headerName: 'Service', width: 130 },
    { field: 'serviceCategory', headerName: 'Service Category', width: 130 },
    { field: 'subCategory', headerName: 'Category', width: 130 },
    { field: 'assignment', headerName: 'Assignment Group', width: 150 },
    { field: 'assignmentTo', headerName: 'Assigned To', width: 130 },
    { field: 'updatedDate', headerName: 'Updated Date', width: 130 },
  ];





  const [changeRequest, setChangeRequest] = useState({
    changeNumber: "",
    changeModel: "",
    requestedBy: "",
    changeState: "",
    configurationItem: "",
    conflictStatus: "",
    assignmentTo: "",
    assignmentGroup: "",
    changePriority: "",
    changeRisk: "",
    changeImpact: "",
    shortDescription: "",
    Description: "",
    implementationPlan: "",
    backoutPlan: "",
    testPlan: "",
    planningStartDate: "",
    planningEndDate: "",
    actualStartDate: "",
    actualEnddate: ""
  })
  return (
    <>
      <RequestContext.Provider value={{ requestDetails, setRequestDetails, requestService, setRequestService, requestGeneralService, setRequestGeneralService, setKnowledgeData, knowledgeData, title, setTitle }}>
        {/* <BrowserRouter> */}
        <div style={{ display: "flex", backgroundColor: "black", height: "100vh" }}>
          <div>
            {!drawer ? <SuperAdminSideBar width={60} drawer={drawer} /> : <SuperAdminSideBar width={280} drawer={drawer} />}

            <div>
              {drawer ? <ArrowBackIosNewIcon onClick={() => { setDrawer(false) }} style={{ fontSize: 25, backgroundColor: "black", position: "absolute", left: 300, top: 360, color: "white", height: 60, borderWidth: 10, borderTopRightRadius: 7, borderBottomRightRadius: 7 }} /> :
                <ArrowForwardIosIcon onClick={() => { setDrawer(true) }} style={{ fontSize: 25, backgroundColor: "black", position: "absolute", left: 55, top: 350, color: "white", height: 60, borderTopRightRadius: 7, borderBottomRightRadius: 7 }} />}
            </div>
          </div>
          <div className='MainContainer' style={{ marginLeft: drawer ? "23%" : "5%", marginRight: 10 }} md={2}>

            <Routes>
              {/* <Route path="*" element={<Home/>}/> */}
              <Route path="/Create-Incident" element={<CreateNewIncident />} />
              <Route path="/All" element={<IncidentTable IncidentData={IncidentData} IncidentHeaderData={IncidentHeaderData} />} />
              <Route path="/Assigned-To-Me/:state" element={<IncidentTable IncidentData={AssignedToMeIncidentData} IncidentHeaderData={IncidentHeaderData} />} />
              <Route path="/Open-Incidents/:state" element={<IncidentTable IncidentData={OpenIncidentData} IncidentHeaderData={IncidentHeaderData} />} />
              <Route path="/Resolved-Incidents" element={<IncidentTable IncidentData={ResolvedIncidentData} IncidentHeaderData={IncidentHeaderData} />} />
              <Route path="/Open-unassigned" element={<IncidentTable IncidentData={OpenUnAssignedIncidentData} IncidentHeaderData={IncidentHeaderData} />} />
              <Route path="/" element={<IncidentDashboard IncidentData={IncidentData} IncidentHeaderData={IncidentHeaderData} />} />
              <Route path="/IncidentEditPage/:IncidentId" element={<IncidentEditPage />} />
              <Route path="/AuthTokenGeneration" element={<TokenGenerationPage />} />
              <Route path="/Configuration-Database" element={<CMDB />} />
              <Route path="/create-server" element={<CmdbFormPage />} />
              <Route path="/CMDBEditPage/:Category/:name" element={<UpdateServer />} />
              <Route path="/Hardware/Item/:category" element={<CMDBTable IncidentData={IncidentData} CMDBHeaderData={CMDBheaderData} />} />
              <Route path="/Software/Item/:category" element={<SoftwareTable CMDBHeaderData={CMDBheaderData} />} />
              <Route path="/Configuration-Item/:drawerStatus" element={<CI />} />
              <Route path="/TechincalInfo/Hardware/:serviceType" element={<TechnicalInfo />} />
              <Route path="/TechincalInfo/Software/:serviceType/:Id" element={<SoftwareInfo />} />
              <Route path="/TechincalInfo/Services/:serviceType" element={<CMDBService />} />
              <Route path="/request_service" element={<RequestCategory />} />

              <Route path="/request_service/hardware" element={<RequestForm />} />
              <Route path="/request_service/general-service" element={<GeneralService />} />
              <Route path="/request-service/general-service/:category" element={<ServiceCategoryForm />} />

              {/* <Route path="/request_service/:request_item_id" element={<CreateRequestItem/>}/> */}
              <Route path="/request_item_details/:request_item_id" element={<RequestItemDetails />} />
              <Route path="/request_item/:item_id" element={<RequestItem />} />
              <Route path='/request_service/my_requests' element={
                <div>
                  <CmdbSelectField label="Select requests to fetch" MenuItems={[{ value: "Hardware requests" }, { value: "General requests" }]} style={{ width: "30%", marginTop: 5, marginLeft: 5 }} selectedValue={selectedRequest} setSelectValue={setSelectedRequest} />
                  <ContentDevider title={selectedRequest} />
                  {selectedRequest ? <MyRequestTable selectedRequest={selectedRequest} /> : null}
                  {/* <Component2/> */}
                </div>
              } />
              <Route path="/knowledge-article" element={
                <>
                  <KnowledgeContainer />
                </>
              } />
              {/* <Route path="/create-knowledge-article" element={<CreateKnowledge />} /> */}
              <Route path="/knowledge-preview-page" element={<PreviewPage />} />
              <Route path="/article-details/:articleID" element={<ArticleDetailsPage />} />

              <Route path="/change_service/New" element={
                <CreateChange />
              } />
              <Route path="change_service/All" element={
                <ChangeContext.Provider value={{ changeRequest, setChangeRequest }}>
                  <AllChanges />
                </ChangeContext.Provider>
              } />
              <Route path="/user-list" element={<UserManagmentTable />} />
              <Route path="/form-menu" element={<FormMenu />} />
              <Route path="/generate-form" element={<ReactFormGenerate />} />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
        {/* </BrowserRouter> */}
      </RequestContext.Provider>
    </>
  )
}

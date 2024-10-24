// import React, { useState, createContext, Fragment, useEffect } from 'react';
// import IncidentTable from '../Components/HelperComponents/IncidentTable';
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { IncidentHeaderData, AssignedToMeIncidentData, } from '../Utils/Incident-Data/IncidentsData';
// import IncidentEditPage from '../Components/IncidentHelperComponents/IncidentEditPage';
// import { Grid } from '@mui/material';
// import CmdbSelectField from '../Components/HelperComponents/SelectField';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import NotFoundPage from '../Error Components/NotFoundPage';
// import RequestItemDetails from '../Components/Request Management/Helper Components/RequestItemDetails';
// import RequestCategory from '../Components/Request Management/Main Component/RequestCategory';
// import RequestItem from '../Components/Request Management/Main Component/RequestItem';
// import MyRequestTable from '../Components/Request Management/Main Component/MyRequestTable';
// import GeneralService from '../Components/Request Management/Main Component/GeneralService';
// import ServiceCategoryForm from '../Components/Request Management/Main Component/ServiceCategoryForm';
// import ContentDevider from '../Components/HelperComponents/ContentDevider';
// import KnowledgeContainer from '../Components/KnowledgeArticle/KnowledgeContainer';
// import CreateKnowledge from '../Components/KnowledgeArticle/CreateKnowledge';
// import PreviewPage from '../Components/KnowledgeArticle/HelperComponents/PreviewPage';
// import ArticleDetailsPage from '../Components/KnowledgeArticle/ArticleDetailsPage';
// import CreateChange from '../Components/Change Management/CreateChange';
// import AllChanges from '../Components/Change Management/AllChanges';
// import UserOverview from '../Dashboards/UserOverview';
// import UserIncidentForm from '../Components/UserPortal Pages/UserIncidentForm';
// import UserPortal from '../Components/Privilage Templates/UserPortal';
// import UserRequestForm from '../Components/UserPortal Pages/UserRequestFrom';
// import UserIncidentTable from '../Components/UserPortal Pages/UserIncidentTable';
// import UserRequestTable from '../Components/UserPortal Pages/UserRequestTable';
// import DefaultHeader from '../global/commonComponents/DefaultHeader';
// import { useTheme } from '../global/commonComponents/ThemeContext';
// // import { useDrawer } from '../global/commonComponents/drawer/DrawerContext';
// import UserProfileDrawer from '../global/commonComponents/drawer/UserProfileDrawer';
// import { DrawerProvider } from '../global/commonComponents/drawer/DrawerContext';

// export const RequestContext = createContext(null);
// export const ChangeContext = createContext(null);

// export default function EndUserRouter(props) {
//   const [drawer, setDrawer] = useState(true);
//   // const myScrollbarRef = useRef(null);
//   const { theme } = useTheme();
//   // const { toggleDrawer } = useDrawer();

//   const [knowledgeData, setKnowledgeData] = useState({
//     articleNumber: "",
//     title: "",
//     articleType: "",
//     category: "",
//     articleContent: "",
//     author: "",
//     ShortDescription: "",
//     imageData: "",
//     PreviewImage: ""
//   })
//   const [title, setTitle] = useState("");

//   useEffect(() => {
//     console.log(drawer)
//   }, [drawer])

//   const [requestDetails, setRequestDetails] = useState([]);
//   const [requestService, setRequestService] = useState({
//     requestNumber: "",
//     approvalStatus: "",
//     requestState: "",
//     openedDate: "",
//     dueDate: "",
//     requestFor: "",
//     openedBy: "",
//     ShortDescription: "",
//     selectedItem: [],
//   });
//   const [requestGeneralService, setRequestGeneralService] = useState({
//     requestNumber: "",
//     requesterName: "",
//     requesterEmail: "",
//     requesterServiceType: "",
//     affectedUser: "",
//     preferedContact: "",
//     priority: "",
//     approvalStatus: "",
//     reasonDescription: "",

//     requestAccess: "",
//     approvalFrom: "",
//     userRole: "",

//     affectedService: "",
//     changeDate: "",
//     backoutPlan: "",
//     changeApproval: "",
//     openedDate: ""
//   });
//   const [selectedRequest, setSelectedRequest] = useState("Hardware requests");


//   const [changeRequest, setChangeRequest] = useState({
//     changeNumber: "",
//     changeModel: "",
//     requestedBy: "",
//     changeState: "",
//     configurationItem: "",
//     conflictStatus: "",
//     assignmentTo: "",
//     assignmentGroup: "",
//     changePriority: "",
//     changeRisk: "",
//     changeImpact: "",
//     shortDescription: "",
//     Description: "",
//     implementationPlan: "",
//     backoutPlan: "",
//     testPlan: "",
//     planningStartDate: "",
//     planningEndDate: "",
//     actualStartDate: "",
//     actualEnddate: ""
//   })


//   return (
//     <>
//       <div style={{ background: theme.outerBodyColor, height: "110vh" }}>
//         <DefaultHeader drawer={drawer} />
//         {/* <UserProfileDrawer /> */}
//         <div>
//             <Grid container>
//               <Grid item xs={!drawer ? 1 : 3}>
//                 {!drawer ? <UserPortal drawer={drawer} bg={theme.outerBodyColor} /> : <UserPortal drawer={drawer} bg={theme.outerBodyColor} />}
//                 <div>
//                   {drawer ? <ArrowBackIosNewIcon onClick={() => { setDrawer(false) }} style={{ fontSize: 25, backgroundColor: "black", position: "absolute", left: 320.5, top: 360, color: "white", height: 60, borderWidth: 10, borderTopRightRadius: 7, borderBottomRightRadius: 7 }} /> :
//                     <ArrowForwardIosIcon onClick={() => { setDrawer(true) }} style={{ fontSize: 25, backgroundColor: "black", position: "absolute", left: 100, top: 350, color: "white", height: 60, borderTopRightRadius: 7, borderBottomRightRadius: 7 }} />}
//                 </div>
//               </Grid>
//               <Grid item xs={!drawer ? 11 : 9} className="MainContainer" style={{ backgroundColor: theme.mainBodyColor }}>
//                 <RequestContext.Provider value={{ requestDetails, setRequestDetails, requestService, setRequestService, requestGeneralService, setRequestGeneralService, setKnowledgeData, knowledgeData, title, setTitle }}>
//                   <Routes>
//                     {/* <Route path="*" element={<Home/>}/> */}
//                     {/* <Route path="/" element={<UserOverview />} /> */}
//                     <Route path="/create-incident" element={<UserIncidentForm />} />
//                     <Route path="/incident/:Id" element={<UserIncidentForm />} />

//                     <Route path="/Assigned-To-Me/:state" element={<IncidentTable IncidentData={AssignedToMeIncidentData} IncidentHeaderData={IncidentHeaderData} />} />
//                     {/* <Route path="/request-status/:requesttype" element={<UserOverview />} /> */}
//                     <Route path="/IncidentEditPage/:IncidentId" element={<IncidentEditPage />} />
//                     <Route path="/request_service" element={<RequestCategory />} />

//                     <Route path="/request_service/hardware" element={<UserRequestForm />} />
//                     {/* <Route path="/request_service/general-service" element={<GeneralService />} /> */}
//                     <Route path="/request-service/general-service/:category" element={<ServiceCategoryForm />} />
//                     {/* <Route path="/request_service/hardware" element={<RequestForm/>}/> */}

//                     {/* <Route path="/request_service/:request_item_id" element={<CreateRequestItem/>}/> */}
//                     <Route path="/request_item_details/:request_item_id" element={<RequestItemDetails />} />
//                     <Route path="/request_item/:item_id" element={<RequestItem />} />
//                     <Route path='/request_service/my_requests' element={
//                       <div>
//                         <CmdbSelectField label="Select requests to fetch" MenuItems={[{ value: "Hardware requests" }, { value: "General requests" }]} style={{ width: "30%", marginTop: 5, marginLeft: 5 }} selectedValue={selectedRequest} setSelectValue={setSelectedRequest} />
//                         <ContentDevider title={selectedRequest} />
//                         {selectedRequest ? <MyRequestTable selectedRequest={selectedRequest} /> : null}
//                         {/* <Component2/> */}
//                       </div>
//                     } />

//                     <Route path="/knowledge-article" element={
//                       <>
//                         <KnowledgeContainer />
//                       </>
//                     } />
//                     {/* <Route path="/create-knowledge-article" element={<CreateKnowledge />} /> */}
//                     <Route path="/knowledge-preview-page" element={<PreviewPage />} />
//                     <Route path="/article-details/:articleID" element={<ArticleDetailsPage />} />

//                     <Route path="/change_service/New" element={
//                       <ChangeContext.Provider value={{ changeRequest, setChangeRequest }}>
//                         <CreateChange />
//                       </ChangeContext.Provider>
//                     } />
//                     <Route path="change_service/All" element={
//                       <ChangeContext.Provider value={{ changeRequest, setChangeRequest }}>
//                         <AllChanges />
//                       </ChangeContext.Provider>
//                     } />
//                     {/* <Route path="/incidents/:status" element={<UserIncidentTable />} />
//                     <Route path="/requests/:status" element={<UserRequestTable />} /> */}

//                     <Route path="*" element={<NotFoundPage />} />
//                   </Routes>
//                 </RequestContext.Provider>
//               </Grid>
//             </Grid>
//         </div>
//       </div >
//     </>
//   )
// }

// // import { Provider } from 'react-redux';
// // import './App.css';
// // import React, { useEffect, useState } from 'react';
// // import HomeRouter from './Routes/HomeRouter';
// // import AuthenticationRoutes from './Routes/AuthenticationRoutes';
// // // import { BrowserRouter, Routes, Route } from "react-router-dom";
// // import { MsalProvider, AuthenticatedTemplate, useMsal, UnauthenticatedTemplate } from '@azure/msal-react';
// // // import { AzureAD, AuthenticationState } from 'react-aad-msal';
// // import { loginRequest } from './Features/SSOFeatures/MicrosoftAzureSSO/authConfig';
// // import { CheckToken } from './Utils/CheckToken';
// // import EndUserRouter from './Routes/EndUserRouter';
// // import { DrawerProvider } from '../src/global/commonComponents/drawer/DrawerContext';
// // import { store } from './Redux state management/store';
// // import SuperAdminRouter from './Routes/SuperAdminRouter';
// // import { ThemeProvider } from './global/commonComponents/ThemeContext';
// // import { BrowserRouter, Route, Routes } from 'react-router-dom';
// // import RoleBasedRoute from './Utils/RoleBasedRoute';
// // import Signin from './Pages/Signin';

// // const App = () => {
// //   // const { instance } = useMsal();
// //   // const activeAccount = instance.getActiveAccount();
// //   // const [AuthToken, setAuthToken] = useState('');
// //   // const [endUser, setEndUser] = useState(null);
// //   // const [state, setState] = useState({
// //   //   top: false,
// //   //   left: false,
// //   //   bottom: false,
// //   //   right: false,
// //   // });

// //   // const toggleDrawer = (anchor, open) => {
// //   //   setState((prevState) => ({ ...prevState, [anchor]: open }));
// //   // };
// //   // function validateJson(json) {
// //   //   var JsonregEx = /^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)/
// //   //   return JsonregEx.test(json);
// //   // }
// //   // useEffect(() => {
// //   //   setAuthToken(localStorage.getItem("Authentication-Token"));
// //   //   setEndUser(localStorage.getItem("User"))
// //   // }, [])
// //   // const handleRedirect = () => {
// //   //   instance
// //   //     .loginRedirect({
// //   //       ...loginRequest,
// //   //       prompt: 'create',
// //   //     })
// //   //     .catch((error) => console.log(error));
// //   //   localStorage.setItem("userEmail", "teksible@Support")
// //   // };
// //   return (
// //     <div className="App">
// //       <BrowserRouter>
// //         <Routes>
// //           <Route path="/login" component={Signin} />
// //           <Route path="/" element={<RoleBasedRoute />} />
// //         </Routes>
// //       </BrowserRouter>
// //       {/* <ThemeProvider>
// //         {CheckToken(AuthToken) && validateJson(AuthToken) && endUser == "endUser" ? <Provider store={store}>
// //           <EndUserRouter value={{ state, toggleDrawer }} />
// //         </Provider> : null}
// //         {CheckToken(AuthToken) && validateJson(AuthToken) && endUser == "admin" ? <Provider store={store}><HomeRouter /></Provider> : null}
// //         <AuthenticatedTemplate>
// //           {activeAccount ? (
// //             <HomeRouter />
// //           ) : null}
// //         </AuthenticatedTemplate>
// //         {CheckToken(AuthToken) && validateJson(AuthToken) && endUser == "superAdmin" ? <Provider store={store}><SuperAdminRouter /></Provider> : null}
// //         <AuthenticatedTemplate>
// //           {activeAccount ? (
// //             <EndUserRouter />
// //           ) : null}
// //         </AuthenticatedTemplate>
// //         {!AuthToken && <UnauthenticatedTemplate>
// //           <AuthenticationRoutes handleRedirect={handleRedirect} />
// //         </UnauthenticatedTemplate>}
// //       </ThemeProvider> */}
// //     </div>
// //   );
// // };

// // // const originalConsoleError = console.error;

// // // console.error = (...args) => {
// // //   // Check if the error message contains the specific error you want to suppress
// // //   if (args[0] && args[0].includes('ResizeObserver loop completed with undelivered notifications')) {
// // //     // Ignore this error
// // //     return;
// // //   }
// // //   // Call the original console.error for other errors
// // //   originalConsoleError.apply(console, args);
// // // };

// // // const App = ({ instance }) => {
// // //   return (
// // //     <MsalProvider instance={instance}>
// // //       <MainContent />
// // //     </MsalProvider>
// // //   );
// // // };

// // export default App;

// /* eslint-disable import/no-extraneous-dependencies */
// import './App.css';
// import React, { lazy, Suspense } from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import RoleBasedRoute from './Utils/RoleBasedRoute';
// import EndUserRouter from './Routes/EndUserRouter';
// import HomeRouter from './Routes/HomeRouter';
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import AuthenticationRoutes from './Routes/AuthenticationRoutes';
// import { ThemeProvider } from './global/commonComponents/ThemeContext';
// import DefaultLoader from './global/commonComponents/DefaultLoader';
// import { DrawerProvider } from './global/commonComponents/drawer/DrawerContext';
// import EndUserLandingPage from './Pages/endUser/EndUserLandingPage';
// import IncidentTable from './Components/HelperComponents/IncidentTable';
// import UserIncidentForm from './Components/UserPortal Pages/UserIncidentForm';
// import NotFoundPage from './Error Components/NotFoundPage';
// import UserRequestTable from './Components/UserPortal Pages/UserRequestTable';
// import UserIncidentTable from './Components/UserPortal Pages/UserIncidentTable';
// import AllChanges from './Components/Change Management/AllChanges';
// import CreateChange from './Components/Change Management/CreateChange';
// import ArticleDetailsPage from './Components/KnowledgeArticle/ArticleDetailsPage';
// import PreviewPage from './Components/KnowledgeArticle/HelperComponents/PreviewPage';
// import CreateKnowledge from './Components/KnowledgeArticle/CreateKnowledge';
// import KnowledgeContainer from './Components/KnowledgeArticle/KnowledgeContainer';
// // import CmdbSelectField from '../Components/HelperComponents/SelectField';
// // import ContentDevider from '../Components/HelperComponents/ContentDevider';
// // import MyRequestTable from './Components/Request Management/Main Component/MyRequestTable';
// import RequestItem from './Components/Request Management/Main Component/RequestItem';
// import RequestItemDetails from './Components/Request Management/Helper Components/RequestItemDetails';
// import ServiceCategoryForm from './Components/Request Management/Main Component/ServiceCategoryForm';
// import GeneralService from './Components/Request Management/Main Component/GeneralService';
// import UserRequestForm from './Components/UserPortal Pages/UserRequestFrom';
// import RequestCategory from './Components/Request Management/Main Component/RequestCategory';
// import IncidentEditPage from './Components/IncidentHelperComponents/IncidentEditPage';
// import SuperAdminLandingPage from './Pages/superadmin/SuperAdminLandingPage';
// import SuperAdminRouter from './Routes/SuperAdminRouter';
// import UserDetailsAndEdit from './Components/User Management/UserDetailsAndEdit';

// const SigninScreen = lazy(() => import('./Pages/Signin'));

// function App() {
//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <div className="App">
//         <ThemeProvider>
//           <Suspense fallback={<DefaultLoader />}>
//             {/* Ensure BrowserRouter wraps everything that uses routing */}
//             <Routes>
//               <Route path="/IncidentEditPage/:IncidentId" element={<IncidentEditPage />} />
//               <Route path="/request_service" element={<RequestCategory />} />
//               <Route path="/knowledge-preview-page" element={<PreviewPage />} />
//               <Route path="/knowledge-creation" Component={<CreateKnowledge />} />
//               <Route path="/request_service/hardware" element={<UserRequestForm />} />
//               {/* <Route path="/request_service/general-service" element={<GeneralService />} /> */}
//               <Route path="/request-service/general-service/:category" element={<ServiceCategoryForm />} />
//               <Route path="/request_item_details/:request_item_id" element={<RequestItemDetails />} />
//               <Route path="/request_item/:item_id" element={<RequestItem />} />
//               {/* <Route path='/request_service/my_requests' element={
//               <div>
//                 <CmdbSelectField label="Select requests to fetch" MenuItems={[{ value: "Hardware requests" }, { value: "General requests" }]} style={{ width: "30%", marginTop: 5, marginLeft: 5 }} selectedValue={selectedRequest} setSelectValue={setSelectedRequest} />
//                 <ContentDevider title={selectedRequest} />
//                 {selectedRequest ? <MyRequestTable selectedRequest={selectedRequest} /> : null}
//                 <Component2/>
//               </div>
//             } /> */}

//               <Route path="/knowledge-article" element={<KnowledgeContainer />} />
//               <Route path="/create-knowledge-article" element={<CreateKnowledge />} />
//               {/* <Route path="/knowledge-preview-page" element={<PreviewPage />} /> */}
//               <Route path="/article-details/:articleID" element={<ArticleDetailsPage />} />
//               <Route path='/userUpdate' element={UserDetailsAndEdit} />
//               <Route path="/change_service/New" element={<CreateChange />} />
//               <Route path="change_service/All" element={<AllChanges />} />
//               <Route path="/incidents/:status" element={<UserIncidentTable />} />
//               <Route path="/requests/:status" element={<UserRequestTable />} />

//               <Route path="*" element={<NotFoundPage />} />
//               {/* <Route path="/create-incident" element={<UserIncidentForm />} /> */}
//               <Route path="/incident/:Id" element={<UserIncidentForm />} />
//               <Route path="/Assigned-To-Me/:state" element={<IncidentTable />} />
//               <Route path="/endUser" element={<DrawerProvider><EndUserLandingPage /></DrawerProvider>} />
//               <Route path="/superadmin" element={<DrawerProvider>
//                 <SuperAdminLandingPage /></DrawerProvider>} />
//               <Route path="/admin" element={<DrawerProvider><AuthenticationRoutes /></DrawerProvider>} />
//               <Route path="/sign" element={<SigninScreen />} />
//               <Route path="/" element={<RoleBasedRoute />} />
//             </Routes>
//           </Suspense>
//         </ThemeProvider>
//       </div>
//     </LocalizationProvider>
//   );
// }

// export default App;
import './App.css';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';  // Use Switch and BrowserRouter from v5
import RoleBasedRoute from './Utils/RoleBasedRoute';
import EndUserRouter from './Routes/EndUserRouter';
import HomeRouter from './Routes/HomeRouter';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import AuthenticationRoutes from './Routes/AuthenticationRoutes';
import { ThemeProvider } from './global/commonComponents/ThemeContext';
import DefaultLoader from './global/commonComponents/DefaultLoader';
import { DrawerProvider } from './global/commonComponents/drawer/DrawerContext';
import EndUserLandingPage from './Pages/endUser/EndUserLandingPage';
import SuperAdminLandingPage from './Pages/superadmin/SuperAdminLandingPage';
import SuperAdminRouter from './Routes/SuperAdminRouter';
import { PrivateRoute } from './global/utils';
import CreateGroupForm from './Components/groupCreation/CreateGroupForm';
import AdminLandingPage from './Pages/admin/AdminLandingPage';

const ADSigninScreen = lazy(() => import('./Pages/ADSignin'));
const SigninScreen = lazy(() => import('./Pages/Signin'));

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="App" style={{
        backgroundImage: 'url(/bodybg.jpeg)', // Correct syntax for backgroundImage
        backgroundSize: 'cover', // Ensures the image covers the area
        backgroundPosition: 'center', // Centers the image
        height: '100%', // Added 'px' to explicitly define units
        width: '100%',
      }}>
        <ThemeProvider>
          <Suspense fallback={<DefaultLoader />}>
            {/* Wrap everything in Router */}
            <Router>
              <Switch>
                <Route path="/endUser" component={() => (
                  <DrawerProvider><EndUserLandingPage /></DrawerProvider>
                )} />
                <Route path="/superadmin" component={() => (
                  <DrawerProvider><SuperAdminLandingPage /></DrawerProvider>
                )} />
                <Route path="/admin" component={() => (
                  <DrawerProvider><AdminLandingPage /></DrawerProvider>
                )} />
                {/* /adLogin */}
                <Route path="/sign" component={SigninScreen} />
                <Route path="/adLogin" component={ADSigninScreen} />
                <Route path="/" component={RoleBasedRoute} />
              </Switch>
            </Router>
          </Suspense>
        </ThemeProvider>
      </div>
    </LocalizationProvider>
  );
}

export default App;



import React, { createContext, useMemo, useState } from "react";
import { useTheme } from "../../global/commonComponents/ThemeContext";
import { useDrawer } from "../../global/commonComponents/drawer/DrawerContext";
import UserProfileDetails from "../UserProfileDetails";
import { Route, Switch, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import {
  HomeOutlined as HomeOutlinedIcon,
  NetworkPing as NetworkPingIcon,
  Storage as StorageIcon,
  Repeat as RepeatIcon,
  MenuBook as MenuBookIcon,
  Group as GroupIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import KnowledgeContainer from "../../Components/KnowledgeArticle/KnowledgeContainer";
import { Link } from "@mui/material";
import UserIncidentForm from "../../Components/UserPortal Pages/UserIncidentForm";
import CreateIncidentForm from "../../Components/IncidentHelperComponents/CreateNewIncident";
import IncidentTable from "../../Components/HelperComponents/IncidentTable";
import RequestServiceManagement from "../request/RequestServiceManagement";
import IncidentDashboard from "../../Dashboards/IncidentDashboard";
import UserManagmentMainPanel from "../userManagement/UserManagementMainPanel";
import { LeftPanel } from "../../presentation/components/panel/Leftpanel";
import MyIncidentList from "../endUser/MyIncidentList";
import ServiceCategoryForm from "../../Components/Request Management/Main Component/ServiceCategoryForm";
import RequestItemDetails from "../../Components/Request Management/Helper Components/RequestItemDetails";
import RequestItem from "../../Components/Request Management/Main Component/RequestItem";
import UpdatedRequestForm from "../request/UpdatedRequestForm";
import MyRequestList from "../../Components/Request Management/MyRequestList";
import RequestForm from "../../Components/Request Management/Helper Components/RequestForm";
import CreateNewCatelogue from "../../Components/Request Management/CreateNewCatelogue";
import GeneralService from "../../Components/Request Management/Main Component/GeneralService";
import CreateRequestDetailsForm from "../request/CreateRequestDetailsForm";
import CreateKnowledge from "../../Components/KnowledgeArticle/CreateKnowledge";
import PreviewPage from "../../Components/KnowledgeArticle/HelperComponents/PreviewPage";
import CI from "../../Components/CMDBHelperComponents/CI";
import ClassManagementMain from "../../Components/cmdb/classmanagement/ClassManagementMain";
import CMDB from "../CMDB";
import NewClassCreationPanel from "../../Components/cmdb/classmanagement/NewClassCreationPanel";
import UserDetailsAndEdit from "../userManagement/UserDetailsAndEdit";
import UserManagmentTable from "../userManagement/UserManagmentTable";
import GroupManagementDetailsTable from "../../Components/groupCreation/GroupManagementDetailsTable";
import ShowSingleGroupDetailsAndEdit from "../../Components/groupCreation/ShowSingleGroupDetailsAndEdit";
import CreateGroupForm from "../../Components/groupCreation/CreateGroupForm";
import MyRequestTable from "../request/MyRequestTable";
import { SwitchBanner } from "../../presentation/shared/bread-crumb";

export const RequestContext = createContext(null);

function SuperAdminLandingPage() {
  const { toggleDrawer, state } = useDrawer();
  const { pathname } = useLocation();

  const pathConfig = 'superadmin';

  const activeTab = useMemo(() => {
    let tab = pathname.toLowerCase();
    tab = tab.split('/').filter((key) => key && key.toLowerCase() !== pathConfig);
    tab = tab.length ? tab : ['dashboard'];
    tab = tab.map((key) =>
      key.split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
    ).join('/');
    return tab;
  }, [pathname]);

  console.log('active tab-->', activeTab);

  const navbarOptions = [
    {
      label: "Dashboards",
      icon: HomeOutlinedIcon,
      href: '/dashboards',
      sub_options: [],
    },
    {
      label: "Incident Management",
      icon: NetworkPingIcon,
      href: '/incident-management',
      sub_options: [
        { label: 'Create Incident', href: '/create-incident' },
        { label: 'Open Incidents', href: '/incident-list?state=open' },
        { label: 'Assigned Incidents', href: '/incident-list?state=assign_to_me' },
        { label: 'All Incidents', href: '/incident-list' },
      ],
    },
    {
      label: "Request Management",
      icon: RepeatIcon,
      href: '/request-management',
      sub_options: [
        { label: 'My Requests', href: '/my-requests' },
        { label: 'Request Service', href: '/request-service' },
      ],
    },
    {
      label: "Knowledge Article",
      icon: MenuBookIcon,
      href: '/knowledge-article',
      sub_options: [],
    },
    // {
    //   label: "",
    //   icon: MenuBookIcon,
    //   href: '/knowledge-article',
    //   sub_options: [],
    // },
    {
      label: "User Management",
      icon: PersonIcon,
      href: '/user-management',
      sub_options: [],
    },
    {
      label: "Group Management",
      icon: GroupIcon,
      href: '/group-management',
      sub_options: [],
    },
    {
      label: "CMDB Management",
      icon: StorageIcon,
      href: '/cmdb-management',
      sub_options: [
        { label: 'Create Configuration', href: '/create-config' },
        { label: 'Class Management', href: '/class_manage' },
      ],
    },
  ];

  const { theme } = useTheme();

  const [requestDetails, setRequestDetails] = useState([]);
  const [requestService, setRequestService] = useState({});
  const [requestGeneralService, setRequestGeneralService] = useState({});
  const [knowledgeData, setKnowledgeData] = useState({});
  const [title, setTitle] = useState("");

  return (
    <div className="p-[4vh]">
      <RequestContext.Provider
        value={{
          requestDetails,
          setRequestDetails,
          requestService,
          setRequestService,
          requestGeneralService,
          setRequestGeneralService,
          knowledgeData,
          setKnowledgeData,
          title,
          setTitle,
        }}
      >
        <div className="flex justify-between">
          <div
            className="h-[92vh] rounded-lg w-[22.5%] flex flex-col justify-between"
            style={{ background: theme.outerBodyColor }}
          >
            <div className="h-[85%] overflow-auto">
              <Link href="/">
                <img
                  alt="logo"
                  src="/indexlogo.png"
                  className="w-[120px] m-auto"
                />
              </Link>
              <LeftPanel
                navbarOptions={navbarOptions}
                drawer
                pathConfig={pathConfig}
              />
            </div>
            <UserProfileDetails toggleDrawer={toggleDrawer} state={state} />
          </div>
          <div
            style={{
              backgroundColor: theme.mainBodyColor,
            }}
            className="h-[92vh] overflow-auto rounded-lg w-[76%]"
          >
            <SwitchBanner pathConfig={pathConfig}/>
            <Switch>
              <Route
                path={`/${pathConfig}/incident-management/update_incident/:incident_id`}
                render={(props) =>
                  pathConfig === "enduser" ? (
                    <UserIncidentForm {...props} isEdit={true} />
                  ) : (
                    <CreateIncidentForm isEdit={true} {...props} />
                  )
                }
              />
              <Route
                path={`/${pathConfig}/incident-management/incident-list`}
                render={(props) => <IncidentTable />}
              />
              <Route
                path={`/${pathConfig}/incident-management/my-incident`}
                render={(props) => (
                  <MyIncidentList user={pathConfig === "enduser"} {...props} />
                )}
              />
              <Route
                path={`/${pathConfig}/incident-management/create-incident`}
                render={(props) =>
                  pathConfig === "enduser" ? (
                    <UserIncidentForm {...props} />
                  ) : (
                    <CreateIncidentForm isEdit={false} {...props} />
                  )
                }
              />
              <Route
                path={`/${pathConfig}/create_class`}
                component={(props) => <NewClassCreationPanel {...props} />}
              />
              <Route
                path={`/${pathConfig}/show_class`}
                component={(props) => <CMDB {...props} />}
              />
              <Route
                path={`/${pathConfig}/cmdb-management/create-config`}
                component={(props) => <CI {...props} />}
              />
              <Route
                path={`/${pathConfig}/cmdb-management/class_manage`}
                component={(props) => <ClassManagementMain {...props} />}
              />
              <Route
                path={`/${pathConfig}/request-service/general-service/:id`}
                element={<ServiceCategoryForm />}
              />
              <Route
                path={`/${pathConfig}/my-requests`}
                component={() => <MyRequestList />}
              />
              <Route
                path={`/${pathConfig}/update-request/:request_id`}
                component={() => <UpdatedRequestForm />}
              />
              <Route
                path={`/${pathConfig}/request-management/request-service/hardware/:id`}
                element={<RequestItemDetails />}
              />
              <Route
                path={`/${pathConfig}/request-management/request-service/request_item/:item_id`}
                component={() => <RequestItem />}
              />
              <Route
                path={`/${pathConfig}/request-management/request-service/general-service`}
                component={() => <GeneralService />}
              />
              <Route
                path={`/${pathConfig}/server-request/create-request/:catelogueId/:categotyId`}
                component={() => <CreateRequestDetailsForm />}
              />
              <Route
                path={`/${pathConfig}/request-management/request-service/hardware`}
                component={() => <RequestForm />}
              />
              <Route
                path={`/${pathConfig}/request-management/create-catelogue`}
                component={() => <CreateNewCatelogue />}
              />
              <Route
                path={`/${pathConfig}/request-management/request-service`}
                component={(props) => <RequestServiceManagement {...props} />}
              />
              <Route
                path={`/${pathConfig}/request-managements/update-request/:request_id`}
                component={(props) => <UpdatedRequestForm {...props} />}
              />
              {/* <Route path={`/${pathConfig}/request-management/my-request`} component={(props) =>
                  <div>
                  <ContentDevider title={"All Requests"} />
                  <MyRequestTable selectedRequest={'Hardware requests'} />
                  </div>}
                  /> */}
              {/* <Route path={`/${pathConfig}/request-management/update-request/:request_id`} component={(props) =><UpdatedRequestForm />} /> */}
              <Route
                path={`/${pathConfig}/request-management/my-requests`}
                component={(props) => <MyRequestTable {...props} />}
              />
              <Route
                path={`/${pathConfig}/knowledge-article/created-knowledge-preview`}
                component={(props) => <PreviewPage {...props} />}
              />
              <Route
                path={`/${pathConfig}/knowledge-article/knowledge-creation`}
                component={(props) => <CreateKnowledge {...props} />}
              />
              <Route
                path={`/${pathConfig}/knowledge-article`}
                component={(props) => <KnowledgeContainer {...props} />}
              />
              <Route
                path={`/${pathConfig}/group-management/createDep/:orgId`}
                component={(props) => <CreateGroupForm {...props} />}
              />
              <Route
                path={`/${pathConfig}/group-management/update_dep/:group_id/:orgId`}
                component={(props) => <CreateGroupForm {...props} />}
              />
              <Route
                path={`/${pathConfig}/group-management/show_group/:group_id/:orgId`}
                component={(props) => (
                  <ShowSingleGroupDetailsAndEdit {...props} />
                )}
              />
              <Route
                path={`/${pathConfig}/group-management`}
                component={(props) => (
                  <GroupManagementDetailsTable {...props} />
                )}
              />
              <Route
                path={`/${pathConfig}/user-management`}
                component={(props) => <UserManagmentMainPanel {...props} />}
              />
              <Route
                path={`/${pathConfig}/user-management/createUser`}
                component={(props) => <UserDetailsAndEdit {...props} />}
              />
              <Route
                path={`/${pathConfig}/user-management/userUpdate/:user_id`}
                component={(props) => <UserDetailsAndEdit {...props} />}
              />
              <Route
                path={`/${pathConfig}/user-management`}
                component={(props) => <UserManagmentTable {...props} />}
              />
              <Route
                path={`/${pathConfig}/user-management`}
                component={(props) => <UserManagmentTable {...props} />}
              />
              <Route
                path={`/${pathConfig}/dashboard`}
                component={IncidentDashboard}
              />
              <Route path={`/${pathConfig}`} component={IncidentDashboard} />
            </Switch>
          </div>
        </div>
      </RequestContext.Provider>
    </div>
  );
}

export default SuperAdminLandingPage;
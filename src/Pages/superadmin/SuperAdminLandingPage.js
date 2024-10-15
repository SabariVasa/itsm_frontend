import React, { createContext, useState, useEffect } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import UserPortalLeftPanel from "./UserPortalLeftPanel";
import DefaultHeader from "../../global/commonComponents/DefaultHeader";
import { Grid } from "@mui/material";
import { useTheme } from "../../global/commonComponents/ThemeContext";
import UserOverview from "../../Dashboards/UserOverview";
import KnowledgeContainer from "../../Components/KnowledgeArticle/KnowledgeContainer";
import UserIncidentForm from "../../Components/UserPortal Pages/UserIncidentForm";
import RequestCategory from "../../Components/Request Management/Main Component/RequestCategory";
import SuperAdminPortalLeftPanel from "./SuperAdminPortalLeftPanel";
import UserInfo from "../../models/UserInfo";
import IncidentDashboard from "../../Dashboards/IncidentDashboard";
import CreateNewIncident from "../../Components/IncidentHelperComponents/CreateNewIncident";
import IncidentTable from "../../Components/HelperComponents/IncidentTable";
import CMDB from "../CMDB";
import CreateChange from "../../Components/Change Management/CreateChange";
import AllChanges from "../../Components/Change Management/AllChanges";
import FormMenu from "../../React-Forms/FormMenu";
import CI from "../../Components/CMDBHelperComponents/CI";
import UserProfileDetails from "../UserProfileDetails";
import { useNavigate } from "react-router-dom";
import { useDrawer } from "../../global/commonComponents/drawer/DrawerContext";
import ClassManagementMain from "../../Components/cmdb/classmanagement/ClassManagementMain";
import UserDetailsAndEdit from "../../Components/User Management/UserDetailsAndEdit";
import UserManagmentMainPanel from "../userManagement/UserManagementMainPanel";
// import UserDetailsAndEdit from "../../Components/User Management/UserDetailsAndEdit";

export const RequestContext = createContext(null);
export const ChangeContext = createContext(null);

function SuperAdminLandingPage() {
  const { toggleDrawer, state } = useDrawer();
  const userName = UserInfo.getUsername();
  const role = UserInfo.getRole();
  const navigate = useNavigate();
  console.log(userName, role, 'userNamespr');
  const navbarOptions = [
    { label: "Dashboards", icon: "Dashboards" },
    { label: "Incident Management", icon: "Incident Management" },
    // { label: "CMDB", icon: "CMDB" },
    { label: "Request Management", icon: "Request Management" },
    { label: "Change Management", icon: "Change Management" },
    { label: "Knowledge Article", icon: "Knowledge Article" },
    // { label: "Generate Token", icon: "Generate Token" },
    { label: "User Management", icon: "User Management" },
    { label: "Form Generator", icon: "Form Generator" },
    { label: "CMDB Management", icon: "CMDB Management" },
  ];

  const [drawer, setDrawer] = useState(false);
  const [activeTab, setActiveTab] = useState(navbarOptions[0].label);
  const { theme } = useTheme();

  const [requestDetails, setRequestDetails] = useState([]);
  const [requestService, setRequestService] = useState({});
  const [requestGeneralService, setRequestGeneralService] = useState({});
  const [knowledgeData, setKnowledgeData] = useState({});
  const [title, setTitle] = useState("");
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

  // useEffect(() => {
  //   const savedTabIndex = localStorage.getItem("assessmentHomeActiveTabIndex");
  //   if (savedTabIndex) {
  //     setActiveTab(navbarOptions[parseInt(savedTabIndex)].label);
  //   }
  // }, []);

  const tabClickHandler = (tabIndex, secondaryOption) => {
    if (secondaryOption) {
      setActiveTab(secondaryOption);
    } else {
      setActiveTab(navbarOptions[tabIndex].label);
    }
  };

  const getRightPanelContent = () => {
    console.log(activeTab, 'activeTabsp');
    switch (activeTab) {
      case "Dashboards":
        return <IncidentDashboard />;
      // case "Incident Management":
      //   return <KnowledgeContainer />;
      case "CMDB":
        return <CMDB />;
      case "create_incident":
        return <CreateNewIncident />;
      case "open_incident":
        return <IncidentTable state='Open' />;
      case "new_change":
        return <>
          <ChangeContext.Provider value={{ changeRequest, setChangeRequest }}>
            <CreateChange />
          </ChangeContext.Provider>
        </>;
      case "all_change":
        return <>
          <ChangeContext.Provider value={{ changeRequest, setChangeRequest }}>
            <AllChanges />
          </ChangeContext.Provider>
        </>;
      case "my_request":
        return <UserIncidentForm />;
      case "request_service":
        return <RequestCategory />;
      case "assign_to_me":
        return <IncidentTable state="assignedToMe" />;
      case "all_incidents":
        return <IncidentTable state="" />;
      case "Change Management":
        return <RequestCategory />;
      case "Knowledge Article":
        return <div><KnowledgeContainer /></div>;
      case "Form Generator":
        return <div><FormMenu /></div>;
      case "User Management":
        return <div><UserManagmentMainPanel/></div>;
      case "create_config":
        return <div><CI /></div>;
      case "class_manage":
        return <div><ClassManagementMain /></div>;

      default:
        return <IncidentDashboard />;
    }
  };

  return (
    <div style={{ background: theme.outerBodyColor }}>
      <DefaultHeader drawer={drawer} toggleDrawer={toggleDrawer} state={state} />
      <UserProfileDetails toggleDrawer={toggleDrawer} state={state} />
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
        <Grid container>
          <Grid item xs={drawer ? 3 : 1} style={{ margin: '0 0 0 1m' }}>
            <div style={{ overflowY: 'scroll', height: 520, }}>
              <SuperAdminPortalLeftPanel
                activeTab={activeTab}
                navbarOptions={navbarOptions}
                tabClickHandler={tabClickHandler}
                drawer={drawer}
              />
            </div>
            <div>
              {drawer ? (
                <ArrowBackIosNewIcon
                  onClick={() => setDrawer(false)}
                  style={{
                    fontSize: 25,
                    backgroundColor: theme.outerBodyColor,
                    position: "absolute",
                    left: 325,
                    top: 360,
                    color: "white",
                    height: 60,
                    borderTopRightRadius: 7,
                    borderBottomRightRadius: 7,
                    cursor: "pointer",
                  }}
                />
              ) : (
                <ArrowForwardIosIcon
                  onClick={() => setDrawer(true)}
                  style={{
                    fontSize: 25,
                    backgroundColor: theme.outerBodyColor,
                    position: "absolute",
                    left: 116,
                    top: 350,
                    color: "white",
                    height: 60,
                    borderTopRightRadius: 7,
                    borderBottomRightRadius: 7,
                    cursor: "pointer",
                  }}
                />
              )}
            </div>
          </Grid>

          <Grid
            item
            xs={drawer ? 9 : 11}
            style={{ padding: '0.5em', }}
          >
            <div style={{ borderRadius: '1em', overflowY: 'scroll', backgroundColor: theme.mainBodyColor, height: 520 }}>{getRightPanelContent()}</div>
          </Grid>
        </Grid>
      </RequestContext.Provider>
    </div>
  );
}

export default SuperAdminLandingPage;
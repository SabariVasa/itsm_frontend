import React, { createContext, useState, useEffect } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CreateNewIncident from "../../Components/IncidentHelperComponents/CreateNewIncident";
import { useDrawer } from "../../global/commonComponents/drawer/DrawerContext";
import { useTheme } from "../../global/commonComponents/ThemeContext";
import IncidentDashboard from "../../Dashboards/IncidentDashboard";
import IncidentTable from "../../Components/HelperComponents/IncidentTable";
import CreateChange from "../../Components/Change Management/CreateChange";
import AllChanges from "../../Components/Change Management/AllChanges";
import RequestStatusManagement from "../../Components/Request Management/RequestStatusManagement";
import RequestManagementMainPanel from "../../Components/Request Management/RequestManagementMainPanel";
import RequestCategory from "../../Components/Request Management/Main Component/RequestCategory";
import KnowledgeContainer from "../../Components/KnowledgeArticle/KnowledgeContainer";
import UserManagmentMainPanel from "../userManagement/UserManagementMainPanel";
import GroupManagmentMainPanel from "../../Components/groupCreation/GroupManagmentMainPanel";
import CI from "../../Components/CMDBHelperComponents/CI";
import CMDBManagementMainPanel from "../../Components/cmdb/CMDBManagementMainPanel";
import UserProfileDetails from "../UserProfileDetails";
import { Grid } from "@mui/material";
import AdminPortalLeftPanel from "./AdminPortalLeftPanel";

export const RequestContext = createContext(null);
export const ChangeContext = createContext(null);

function AdminLandingPage() {
    const { toggleDrawer, state } = useDrawer();
    const navbarOptions = [
        { label: "Dashboards", icon: "Dashboards" },
        { label: "Incident Management", icon: "Incident Management" },
        { label: "Request Management", icon: "Request Management" },
        { label: "Change Management", icon: "Change Management" },
        { label: "Knowledge Article", icon: "Knowledge Article" },
        { label: "User Management", icon: "User Management" },
        { label: "Group Management", icon: "Group Management" },
        { label: "CMDB Management", icon: "CMDB Management" },
    ];

    const [drawer, setDrawer] = useState(true);
    const [activeTab, setActiveTab] = useState('');
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

    useEffect(() => {
        setActiveTab(localStorage.getItem('activeTab') || activeTab);
    }, []);

    const tabClickHandler = (tabIndex, secondaryOption) => {
        if (secondaryOption) {
            setActiveTab(secondaryOption);
            localStorage.setItem('activeTab', navbarOptions[tabIndex].label)
        } else {
            localStorage.setItem('activeTab', navbarOptions[tabIndex].label)
            setActiveTab(navbarOptions[tabIndex].label);
        }
    };

    const getRightPanelContent = () => {
        console.log(activeTab, 'activeTabsp');
        switch (activeTab) {
            case "Dashboards":
                return <IncidentDashboard />;
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
                return <RequestStatusManagement />
            case "request_service":
                return <RequestManagementMainPanel />;
            case "assign_to_me":
                return <IncidentTable state="assignedToMe" />;
            case "all_incidents":
                return <IncidentTable state="" />;
            case "Change Management":
                return <RequestCategory />;
            case "Knowledge Article":
                return <div><KnowledgeContainer /></div>;
            case "User Management":
                return <div><UserManagmentMainPanel /></div>;
            case "Group Management":
                return <div><GroupManagmentMainPanel /></div>;
            case "create_config":
                return <div><CI /></div>;
            case "class_manage":
                return <div><CMDBManagementMainPanel /></div>;

            default:
                return <IncidentDashboard />;
        }
    };

    return (
        <div>
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
                    <Grid item xs={drawer ? 3 : 1} style={{
                        margin: '0 0 0 1m',
                    }}>
                        <div style={{ overflowY: 'scroll', height: 600, marginTop: 8 }}>
                            <AdminPortalLeftPanel
                                bgcolur={theme.outerBodyColor}
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
                                        left: 350,
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
                        <div style={{ borderRadius: '1em', overflowY: 'scroll', backgroundColor: theme.mainBodyColor, height: 600 }}>
                            {getRightPanelContent()}
                        </div>
                    </Grid>
                </Grid>
            </RequestContext.Provider>
        </div>
    );
}

export default AdminLandingPage;
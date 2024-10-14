import React, { createContext, useState, useEffect } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import UserPortalLeftPanel from "./UserPortalLeftPanel";
import DefaultHeader from "../../global/commonComponents/DefaultHeader";
import { Grid } from "@mui/material";
import { useTheme } from "../../global/commonComponents/ThemeContext";
import UserOverview from "../../Dashboards/UserOverview";
import KnowledgeContainer from "../../Components/KnowledgeArticle/KnowledgeContainer";
import UserIncidentForm from "../../Components/UserPortal Pages/UserIncidentForm";
import RequestCategory from "../../Components/Request Management/Main Component/RequestCategory";

export const RequestContext = createContext(null);

function EndUserLandingPage() {
  const navbarOptions = [
    { label: "Dashboards", icon: "Dashboards" },
    { label: "Report an issue", icon: "Report an issue" },
    { label: "Request Something", icon: "Request Something" },
    { label: "Knowledge Base", icon: "Knowledge Base" },
  ];

  const [drawer, setDrawer] = useState(false);
  const [activeTab, setActiveTab] = useState(navbarOptions[0].label); // default to first tab
  const { theme } = useTheme();

  const [requestDetails, setRequestDetails] = useState([]);
  const [requestService, setRequestService] = useState({});
  const [requestGeneralService, setRequestGeneralService] = useState({});
  const [knowledgeData, setKnowledgeData] = useState({});
  const [title, setTitle] = useState("");

  useEffect(() => {
    const savedTabIndex = localStorage.getItem("assessmentHomeActiveTabIndex");
    if (savedTabIndex) {
      setActiveTab(navbarOptions[parseInt(savedTabIndex)].label);
    }
  }, [activeTab]);

  const tabClickHandler = (tabIndex, secondaryOption) => {
    if (secondaryOption) {
      setActiveTab(secondaryOption);
    } else {
      setActiveTab(navbarOptions[tabIndex]?.label);
    }
  };

  const getRightPanelContent = () => {
    switch (activeTab) {
      case "Dashboards":
        return <UserOverview />;
      case "Knowledge Base":
        return <KnowledgeContainer />;
      case "create_incident":
        return <UserIncidentForm />;
      case "incident_status":
        return <div>Incident Status Content</div>;
      case "request_service":
        return <RequestCategory />;
      case "request_status":
        return <div>Request Status Content</div>;
      default:
        return <UserOverview />;
    }
  };

  return (
    <div style={{ background: theme.outerBodyColor, height: "110vh" }}>
      <DefaultHeader drawer={drawer} />
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
          <Grid item xs={drawer ? 3 : 1}>
            <UserPortalLeftPanel
              activeTab={activeTab}
              navbarOptions={navbarOptions}
              tabClickHandler={tabClickHandler}
              drawer={drawer}
            />
            <div>
              {drawer ? (
                <ArrowBackIosNewIcon
                  onClick={() => setDrawer(false)}
                  style={{
                    fontSize: 25,
                    backgroundColor: "black",
                    position: "absolute",
                    left: 320.5,
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
                    backgroundColor: "black",
                    position: "absolute",
                    left: 100,
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
            style={{ backgroundColor: theme.mainBodyColor, height: "110vh" }}
          >
            {getRightPanelContent()}
          </Grid>
        </Grid>
      </RequestContext.Provider>
    </div>
  );
}

export default EndUserLandingPage;
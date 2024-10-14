import React, { createContext } from "react";
import UserOverview from "../../Dashboards/UserOverview";
import KnowledgeContainer from "../../Components/KnowledgeArticle/KnowledgeContainer";
import UserIncidentForm from "../../Components/UserPortal Pages/UserIncidentForm";
import RequestCategory from "../../Components/Request Management/Main Component/RequestCategory";

export const RequestContext = createContext(null);

function UserPortalRightPanel(props) {
  const { activeTab } = props
  // const navigate = useNavigate();
  // const navbarOptions = [
  //   { label: "Dashboards", icon: "Dashboards" },
  //   { label: "Report an issue", icon: "Report an issue" },
  //   { label: "Request Something", icon: "Request Something" },
  //   { label: "Knowledge Base", icon: "Knowledge Base" },
  // ];

  // const assessmentHomeActiveTabIndex = localStorage.getItem("assessmentHomeActiveTabIndex") || 0;
  // const [drawer, setDrawer] = useState(false);
  // const [activeTab, setActiveTab] = useState(navbarOptions[assessmentHomeActiveTabIndex || 0].label);
  // const { theme } = useTheme();

  // // Context state for passing request details
  // const [requestDetails, setRequestDetails] = useState([]);
  // const [requestService, setRequestService] = useState({});
  // const [requestGeneralService, setRequestGeneralService] = useState({});
  // const [knowledgeData, setKnowledgeData] = useState({});
  // const [title, setTitle] = useState("");

  // // Function to handle tab click
  // const tabClickHandler = (tabIndex, secondaryOption) => {
  //   localStorage.setItem("assessmentHomeActiveTabIndex", tabIndex);
  //   if (secondaryOption) {
  //     setActiveTab(secondaryOption);
  //   } else {
  //     setActiveTab(navbarOptions[tabIndex].label);
  //   }
  // };

  // Function to render the right panel content
  console.log(activeTab, 'activeTab');
  const getRightPanelContent = () => {
    switch (activeTab) {
      case "Dashboards":
        return <UserOverview />;
      case "Knowledge Base":
        return <KnowledgeContainer />;
      case "create_incident":
        return <div><UserIncidentForm /></div>;
      case "incident_status":
        return <div>Incident Status Content</div>;
      case "request_service":
        return <div><RequestCategory /></div>;
      case "request_status":
        return <div>Request Status Content</div>;
      default:
        return <div><UserOverview /></div>;
    }
  };

  return (
    <div>
      {getRightPanelContent()}
    </div>
  );
}

export default UserPortalRightPanel;

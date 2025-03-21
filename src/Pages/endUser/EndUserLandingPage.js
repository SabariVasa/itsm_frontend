import React, { createContext, useState } from "react";
import { LeftPanel } from "../../presentation/components/panel/Leftpanel";
import { useTheme } from "../../global/commonComponents/ThemeContext";
import UserOverview from "../../Dashboards/UserOverview";
import UserProfileDetails from "../UserProfileDetails";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import {
  HomeOutlined,
  NetworkPing,
  Repeat,
  MenuBook,
} from '@mui/icons-material';
import IncidentManagementLandingPage from "../../Components/IncidentHelperComponents/IncidentManagementLandingPage";
import RequestManagementMainPanel from "../../Components/Request Management/RequestManagementMainPanel";
import KnowledgeArticleMainPanel from "../../Components/KnowledgeArticle/KnowledgeArticleMainPanel";
import { Link } from "@mui/material";
import UserIncidentForm from "../../Components/UserPortal Pages/UserIncidentForm";
import MyIncidentList from "./MyIncidentList";
import { SwitchBanner } from "../../presentation/shared/bread-crumb";

export const RequestContext = createContext(null);

function EndUserLandingPage() {
  const pathConfig = 'enduser';

  const navbarOptions = [
    {
      label: "Dashboard",
      icon: HomeOutlined,
      href: '/dashboard',
      sub_options: [],
    },
    {
      label: "Service Request",
      icon: Repeat,
      href: '/server-request',
      sub_options: [
        {
          label: 'My Requests', href: '/my-requests'
        }, {
          label: 'Request Service', href: '/request-service'
        }
      ]
    },
    {
      label: "Report an issue",
      icon: NetworkPing,
      href: '/report-issue',
      sub_options: [
        {
          label: 'My Incident', href: '/my-incident'
        }, {
          label: 'Create Incident', href: '/create-incident?noBanner=true'
        }
      ]
    },
    {
      label: "Knowledge Base",
      icon: MenuBook,
      href: '/knowledge-base',
      sub_options: []
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
              <Link href="/">
                <img
                  alt="logo"
                  src="/indexlogo.png"
                  className="w-[40%] m-auto"
                />
              </Link>
            <div className="h-[85%] overflow-auto">
              <LeftPanel
                navbarOptions={navbarOptions}
                pathConfig={pathConfig}
              />
            </div>
            <UserProfileDetails />
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
                path={`/${pathConfig}/report-issue/my-incident/update_incident/:incident_id`}
                render={(props) => <UserIncidentForm {...props} isEdit={true} />}
              />
              <Route
                path={`/${pathConfig}/report-issue/my-incident`}
                render={(props) => <MyIncidentList user={pathConfig === 'enduser'} {...props} />}
              />
              <Route
                path={`/${pathConfig}/report-issue/create-incident`}
                component={UserIncidentForm}
              />
              <Route path={`/${pathConfig}/dashboard`} component={UserOverview} />
              <Route path={`/${pathConfig}/server-request`} component={() => <RequestManagementMainPanel fromUser="enduser" />} />
              <Route path={`/${pathConfig}/knowledge-base`} component={KnowledgeArticleMainPanel} />
              <Route path={`/${pathConfig}/report-issue`} component={IncidentManagementLandingPage} />
              <Route path={`/${pathConfig}`} component={UserOverview} />
            </Switch>
          </div>
        </div>
      </RequestContext.Provider >
    </div >
  );
}

export default EndUserLandingPage;
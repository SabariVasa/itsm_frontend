import React, { useEffect, useState } from 'react'
import ContentDevider from '../Components/HelperComponents/ContentDevider';
import IncidentCard from './Helper Component/IncidentCard';
import { Grid } from '@mui/material';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useTheme } from '../global/commonComponents/ThemeContext';
import { serverAPI } from '../Utils/Server';
import UserIncidentForm from '../Components/UserPortal Pages/UserIncidentForm';

export default function UserOverview() {

  const [onGoingCount, setONGoingCount] = useState(0);
  const [resolvedIncident, setResolvedIncident] = useState(0);
  const [onGoingRequest, setONGoingRequest] = useState(0);
  const [resolvedRequest, setResolvedRequest] = useState(0);
  const [renderComponent, setRenderComponent] = useState(false);
  const [activeComponentMethod, setActiveComponentMethod] = useState({});
  const getIncidentCountByEmail = async (email) => {
    try {
      const response = await axios.get(`${serverAPI}/incident-count-by-email/${email}`);

      if (response.status === 200) {
        console.log("Incident count fetched successfully:", response.data.responseData);
        setONGoingCount(response.data.responseData)  // This returns the count of incidents.
      } else {
        console.error("Error fetching incident count:", response.data.statusMessage);
        return null;
      }
    } catch (error) {
      console.error("API error fetching incident count:", error);
      return null;
    }
  };
  const getRequestCountByEmail = async (email) => {
    try {
      const response = await axios.get(`${serverAPI}/getRequestCountByOpenedBy/${email}`);

      if (response.status === 200) {
        console.log("Incident count fetched successfully:", response.data.count);
        setONGoingRequest(response.data.count)  // This returns the count of incidents.
      } else {
        console.error("Error fetching incident count:", response.data.statusMessage);
        return null;
      }
    } catch (error) {
      console.error("API error fetching incident count:", error);
      return null;
    }
  };


  useEffect(() => {
    getIncidentCountByEmail(localStorage.getItem("userEmail"));
    getRequestCountByEmail(localStorage.getItem("userEmail"));
  }, [])
  const { theme } = useTheme();
  const { requesttype } = useParams();
  const incidents = [
    {
      title: "On-Going Incident",
      total: onGoingCount,
      route: "ongoing"
    },
    {
      title: "Resolved Incident",
      total: resolvedIncident,
      route: "resolved"
    }];
  const requests = [
    {
      title: "On-Going Requests",
      total: onGoingRequest,
      route: "ongoing"
    }, {
      title: "Resolved Requests",
      total: resolvedRequest,
      route: "resolved"
    }];

  const handleRenderComponent = (itemValue) => {
    setActiveComponentMethod(itemValue);
    setRenderComponent(true);
  }

  // const componentObj = {
  //   ongoing: UserIncidentForm,
  //   // ongoing: Products,e
  //   // resolved: OnlineServices,
  // };

  // let Component = null;
  // Component = componentObj[activeTab];

  return (
    renderComponent ? (
      <UserIncidentForm activeComponentMethod={activeComponentMethod.route} />
    ) : (
      <>
        <div>
          {requesttype === "incident" || !requesttype ? <><ContentDevider title="Incident Tickets Overview" img={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT_RLD_6mp44hnqnYXb2-G0XrwHSS10HY6fM27CtuUkxbW0o2iBwAoAFdWaZX-ge2PvhE&usqp=CAU"} />
            <Grid container spacing={{ xs: 2, md: 1 }} columns={{ xs: 5, sm: 8, md: 12 }} style={{ paddingLeft: 20 }}>
              {incidents.map((item, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  {/* <IncidentCard title={item.title} route={item.route} total={item.total} /> */}
                  <div onClick={() => handleRenderComponent(item)}>
                    <div className='incidentCard' style={{ background: theme.IncidentCardColor }}>
                      <p style={{ fontWeight: 900, color: "white", fontSize: 40, marginTop: 5 }}>{item.total}</p>
                      <p style={{ fontWeight: 900, color: "white", fontSize: 20, marginTop: -35 }}>{item.title}</p>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid></> : null}
          {requesttype === "request" || !requesttype ?
            <>
              <ContentDevider title="Request Tickets Overview" img={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-t2HiN-J-BV6anFkRoWNMn1xfegZdxdWWDw&s"} />
              <Grid container spacing={{ xs: 2, md: 1 }} columns={{ xs: 5, sm: 8, md: 12 }} style={{ paddingLeft: 20 }}>
                {requests.map((item, index) => (
                  <Grid item xs={2} sm={4} md={4} key={index}>
                    <div onClick={() => setActiveComponentMethod(item)}>
                      <div className='incidentCard' style={{ background: theme.IncidentCardColor }}>
                        <p style={{ fontWeight: 900, color: "white", fontSize: 40, marginTop: 5 }}>{activeComponentMethod.total}</p>
                        <p style={{ fontWeight: 900, color: "white", fontSize: 20, marginTop: -35 }}>{activeComponentMethod.title}</p>
                      </div>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </> : null}

        </div >
      </>
    )

  )
}

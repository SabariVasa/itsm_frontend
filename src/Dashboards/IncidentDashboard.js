import React,{useEffect,useState} from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import IncidentCard from '../Components/IncidentHelperComponents/IncidentCard';
import IncidentBarChart from './IncidentBarChart';
import IncidentHorizontalBarChart from './IncidentHorizontalBarChart';
import IncidentTable from '../Components/IncidentHelperComponents/IncidentTable';
import { Card, CardContent, Divider, Typography } from '@mui/material';
import ContentDevider from '../Components/HelperComponents/ContentDevider';
import { useTheme } from '../global/commonComponents/ThemeContext';
import GlobalService from "../services/GlobalService";
import { resturls } from "../global/utils/apiurls";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function IncidentDashboard() {
  const {theme} = useTheme();

  const[incidentsOpenedToday,setIncidentsOpenedToday] = useState(0);
  const[unassignedIncident,setUnassignedIncident] = useState(0);
  const[openIncident,setOpenIncident]=useState(0);
  const[incidentOlderThan30,setIncidentOlderThan30] = useState(0);
  const[totalRequests,setTotalReqeusts]=useState(0);
  const[unassignedRequests,setUnassignedRequests]=useState(0);
  const[priorityRequests,setPriorityRequests]=useState(0);
  const[closedRequests,setClosedRequests]=useState(0);

  const incidents = [
    { "title": "Incidents Opened Today", "total": incidentsOpenedToday, "color": "red" },
    { "title": "Unassigned Incidents", "total": unassignedIncident, "color": "black" },
    { "title": "Open Incidents", "total": openIncident, "color": "black" },
    { "title": "Open incidents older than 30 days", "total": incidentOlderThan30, "color": "black" }
  ];

  const requests = [
    { "title": "Total Requests Raised Today", "total": totalRequests, "color": "red" },
    { "title": "Unassigned Requests", "total": unassignedRequests, "color": "black" },
    { "title": "High Priority Requests", "total": priorityRequests, "color": "black" },
    { "title": "Closed Requests", "total": closedRequests, "color": "black" }
  ];

  useEffect(() => {
     GlobalService.generalSelect(
       (respdata) => {
         const { data } = respdata;
         if (respdata) {
          setIncidentsOpenedToday(formatNumber(respdata.data.incidentsOpenedToday));
          setUnassignedIncident(formatNumber(respdata.data.unassignedIncidents));
          setOpenIncident(formatNumber(respdata.data.openedIncidents));
          setIncidentOlderThan30(formatNumber(respdata.data.incidentsOlderThan30Days));
  
          setTotalReqeusts(formatNumber(respdata.data.totalRequestsRaisedToday));
          setUnassignedRequests(formatNumber(respdata.data.unassignedRequests));
          setPriorityRequests(formatNumber(respdata.data.highPriorityRequests));
          setClosedRequests(formatNumber(respdata.data.closedRequests));
         }
         console.log(respdata);
       },
       `${resturls.adminDashboardService}`,
       {},
       'GET'
     );
 }, [])

 const formatNumber = (num) => {
  return num < 10 && num > 0 ? `0${num}` : `${num}`;
};
  
  return (
    // <Box sx={{ flexGrow: 1 }} style={{ padding: 10, marginBottom: 100 }}>
    //   <Grid container spacing={{ xs: 2, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
    //     {incidents.map((_, index) => (
    //       <Grid item xs={2} sm={4} md={4} key={index}>
    //         {/* <IncidentCard title={incidents[index].title} total={incidents[index].total} color={incidents[index].color} /> */}
    //         <Card variant="outlined" style={{ borderRadius: 10, display: 'flex', flexDirection: 'row' }} >
    //           <CardContent style={{ display: "block", alignItems: "center", justifyContent: "center" }}>
    //             <Typography variant='h3' style={{ color: 'linear-gradient(90deg, #F51275 0%, #622098 100%)' }}>
    //               {incidents[index].total}
    //             </Typography>
    //             <Divider
    //               orientation="vertical"
    //               sx={{ width: 2, backgroundColor: "black" }}
    //             />
    //             <Typography variant="p" component="div">
    //               {incidents[index].title}
    //             </Typography>
    //           </CardContent>
    //         </Card>
    //       </Grid>
    //     ))}
    //   </Grid>
    //   <Grid container spacing={{ xs: 2, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
    //     <Grid item xs={2} sm={4} md={5}>
    //       <IncidentBarChart />
    //     </Grid>
    //     <Grid item xs={2} sm={4} md={6} ml={8}>
    //       <IncidentHorizontalBarChart vertical={true} layout="horizontal" />
    //     </Grid>
    //   </Grid>
    //   {/* <Grid container spacing={{ xs:2, md:5 }} columns={{ xs: 4, sm: 8, md: 12 }}>
    //       <Grid item xs={2} sm={4} md={6}>
    //          <p>Incidents by priority and state</p>
    //          <IncidentTable/>
    //       </Grid>
    //       <Grid item xs={2} sm={4} md={6}>
    //          <p>Incidents by priority and state more than 30 days</p>
    //          <IncidentTable/>
    //       </Grid>
    //   </Grid> */}
    // </Box>
    <Box sx={{ flexGrow: 1 }} style={{ padding: 10, marginBottom: 100 }}>
      <ContentDevider title="Incident Dashboard"/>
      <Grid
        container
        spacing={3}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{
          alignItems: "stretch", // Ensures all Grid items stretch to match height
        }}
      >
        {incidents.map((incident, index) => (
          <Grid item xs={4} sm={4} md={4} key={index}>
            <Card
              variant="outlined"
              sx={{
                borderRadius: 3,
                padding: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                height: 100,
                minWidth: 250,
                background: "white",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  background: `${theme.outerBodyColor}`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: "bold",
                }}
              >
                {incident.total}
              </Typography>
              <Divider
                orientation="vertical"
                sx={{
                  width: 2,
                  height: 100,
                  marginX: 2,
                  backgroundColor: "gray",
                }}
              />
              <CardContent>
                <Typography variant="h6" sx={{ marginTop: 1 }}>
                  {incident.title}
                </Typography>
              </CardContent>
            </Card>

          </Grid>
        ))}

      </Grid>

      <ContentDevider title="Service Request Dashboard"/>
      <Grid
        container
        spacing={3}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{
          alignItems: "stretch", // Ensures all Grid items stretch to match height
        }}
      >
        {requests.map((incident, index) => (
          <Grid item xs={4} sm={4} md={4} key={index}>
            <Card
              variant="outlined"
              sx={{
                borderRadius: 3,
                padding: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                height: 100,
                minWidth: 250,
                background: "white",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  background: `${theme.outerBodyColor}`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: "bold",
                }}
              >
                {incident.total}
              </Typography>
              <Divider
                orientation="vertical"
                sx={{
                  width: 2,
                  height: 100,
                  marginX: 2,
                  backgroundColor: "gray",
                }}
              />
              <CardContent>
                <Typography variant="h6" sx={{ marginTop: 1 }}>
                  {incident.title}
                </Typography>
              </CardContent>
            </Card>

          </Grid>
        ))}
      </Grid>

      {/* <Grid container spacing={3} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ marginTop: 5 }}>
        <Grid item xs={4} sm={4} md={6}>
          <IncidentBarChart />
        </Grid>
        <Grid item xs={4} sm={4} md={6}>
          <IncidentHorizontalBarChart vertical={true} layout="horizontal" />
        </Grid>
      </Grid> */}
    </Box>
  );
}
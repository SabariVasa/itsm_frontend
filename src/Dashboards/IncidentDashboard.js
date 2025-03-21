import React, { useCallback, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Card, CardContent, Divider, Typography } from "@mui/material";
import ContentDevider from "../Components/HelperComponents/ContentDevider";
import { useTheme } from "../global/commonComponents/ThemeContext";
import GlobalService from "../services/GlobalService";
import { resturls } from "../global/utils/apiurls";

export default function IncidentDashboard() {
  const { theme } = useTheme();

  const [incidentsOpenedToday, setIncidentsOpenedToday] = useState(0);
  const [unassignedIncident, setUnassignedIncident] = useState(0);
  const [openIncident, setOpenIncident] = useState(0);
  const [incidentOlderThan30, setIncidentOlderThan30] = useState(0);
  const [totalRequests, setTotalReqeusts] = useState(0);
  const [unassignedRequests, setUnassignedRequests] = useState(0);
  const [priorityRequests, setPriorityRequests] = useState(0);
  const [closedRequests, setClosedRequests] = useState(0);

  const incidents = [
    {
      title: "Incidents Opened Today",
      total: incidentsOpenedToday,
      color: "red",
    },
    {
      title: "Unassigned Incidents",
      total: unassignedIncident,
      color: "black",
    },
    { title: "Open Incidents", total: openIncident, color: "black" },
    {
      title: "Open incidents older than 30 days",
      total: incidentOlderThan30,
      color: "black",
    },
  ];

  const requests = [
    {
      title: "Total Requests Raised Today",
      total: totalRequests,
      color: "red",
    },
    { title: "Unassigned Requests", total: unassignedRequests, color: "black" },
    {
      title: "High Priority Requests",
      total: priorityRequests,
      color: "black",
    },
    { title: "Closed Requests", total: closedRequests, color: "black" },
  ];

  useEffect(() => {
    GlobalService.generalSelect(
      (respdata) => {
        const {
          incidentsOpenedToday,
          unassignedIncidents,
          openedIncidents,
          incidentsOlderThan30Days,
          unassignedRequests,
          highPriorityRequests,
          closedRequests,
          totalRequestsRaisedToday,
        } = respdata.data || {};
        if (respdata) {
          setIncidentsOpenedToday(formatNumber(incidentsOpenedToday));
          setUnassignedIncident(formatNumber(unassignedIncidents));
          setOpenIncident(formatNumber(openedIncidents));
          setIncidentOlderThan30(formatNumber(incidentsOlderThan30Days));

          setTotalReqeusts(formatNumber(totalRequestsRaisedToday));
          setUnassignedRequests(formatNumber(unassignedRequests));
          setPriorityRequests(formatNumber(highPriorityRequests));
          setClosedRequests(formatNumber(closedRequests));
        }
      },
      `${resturls.adminDashboardService}`,
      {},
      "GET"
    );
  }, []);

  const formatNumber = (num) => {
    return num < 10 && num > 0 ? `0${num}` : `${num}`;
  };

  const cardContainer = useCallback(
    (incident) => (
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
            width: "20%",
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
        <CardContent sx={{ width: "75%" }}>
          <Typography variant="h6" sx={{ marginTop: 1 }}>
            {incident.title}
          </Typography>
        </CardContent>
      </Card>
    ),
    [theme.outerBodyColor]
  );

  return (
    <Box sx={{ flexGrow: 1 }} style={{ padding: 10, marginBottom: 100 }}>
      <ContentDevider title="Incident Dashboard" />
      <Grid
        container
        spacing={3}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{
          alignItems: "stretch",
          marginBottom: 5,
        }}
      >
        {incidents.map((incident, index) => (
          <Grid item xs={4} sm={4} md={4} key={index}>
            {cardContainer(incident)}
          </Grid>
        ))}
      </Grid>

      <ContentDevider title="Service Request Dashboard" />
      <Grid
        container
        spacing={3}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{
          alignItems: "stretch",
        }}
      >
        {requests.map((incident, index) => (
          <Grid item xs={4} sm={4} md={4} key={index}>
            {cardContainer(incident)}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

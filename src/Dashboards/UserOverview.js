import React, { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Card, CardContent, Divider, Typography } from '@mui/material';
import { useTheme } from '../global/commonComponents/ThemeContext';
import GlobalService from "../services/GlobalService";
import { resturls } from "../global/utils/apiurls";
import { useAuth } from '../application/modules/auth/hooks/useAuth';


export default function UserOverview() {
  const { theme } = useTheme();
  const { user_auth } = useAuth();
  const [totalIncident, setTotalIncident] = useState(0);
  const [resolvedIncident, setResolvedIncident] = useState(0);
  const [totalRequests, setTotalRequests] = useState(0);
  const [resolvedRequests, setResolvedRequests] = useState(0);

  const incidents = [
    { "title": "Total Issues Raised", "total": totalIncident, color: "red" },
    { "title": "Resolved issues", "total": resolvedIncident, color: "black" },
  ];
  const requests = [
    { "title": "Total Requests Raised", "total": totalRequests, color: "red" },
    { "title": "Closed Requests", "total": resolvedRequests, color: "black" },
  ];

  useEffect(() => {
    GlobalService.generalSelect(
      (respdata) => {
        const {
          totalRequestCreatedByUser, totalRequestResolvedForUser,
          totalIncidentCreatedByUser, totalIncidentResolvedByUser,
        } = respdata.data || {};
        if (respdata.data) {
          setTotalRequests(formatNumber(totalRequestCreatedByUser));
          setResolvedRequests(formatNumber(totalRequestResolvedForUser));
          setTotalIncident(formatNumber(totalIncidentCreatedByUser));
          setResolvedIncident(formatNumber(totalIncidentResolvedByUser));
        }
      },
      `${resturls.userDashboardService}/${user_auth.userId}`,
      {},
      'GET'
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 100,
          minWidth: 250,
          background: 'white',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.3)',
          },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            background: `${theme.outerBodyColor}`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold',
            width: '20%',
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
            backgroundColor: 'gray',
          }}
        />
        <CardContent sx={{ width: '75%' }}>
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
      <Grid
        container
        spacing={3}
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{
          alignItems: "stretch",
        }}
      >
        {incidents.map((incident, index) => (
          <Grid item xs={4} sm={4} md={4} key={index}>
            {cardContainer(incident)}
          </Grid>
        ))}
        {requests.map((incident, index) => (
          <Grid item xs={4} sm={4} md={4} key={index}>
            {cardContainer(incident)}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import IncidentCard from '../Components/IncidentHelperComponents/IncidentCard';
import IncidentBarChart from './IncidentBarChart';
import IncidentHorizontalBarChart from './IncidentHorizontalBarChart';
import IncidentTable from '../Components/IncidentHelperComponents/IncidentTable';
import { Card, CardContent, Typography } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function IncidentDashboard() {

  const incidents = [
    { "title": "Incidents Opened Today", "total": 10, "color": "red" },
    { "title": "Unassigned Incidents", "total": 21, "color": "black" },
    { "title": "Overdue Incidents", "total": 20, "color": "red" },
    { "title": "Open Incidents", "total": 5, "color": "black" },
    { "title": "Incident not updated for 7 days", "total": 6, "color": "black" },
    { "title": "Open incidents older than 30 days", "total": 30, "color": "black" }];
  return (
    <Box sx={{ flexGrow: 1 }} style={{ padding: 10, marginBottom: 100 }}>
      <Grid container spacing={{ xs: 2, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {incidents.map((_, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            {/* <IncidentCard title={incidents[index].title} total={incidents[index].total} color={incidents[index].color} /> */}
            <Card variant="outlined" style={{ borderRadius: 10 }} >
              <CardContent style={{ display: "block", alignItems: "center", justifyContent: "center" }}>
                <Typography variant="p" component="div">
                  {incidents[index].title}
                </Typography>
                <Typography variant='h2' color={incidents[index].color}>
                  {incidents[index].total}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={{ xs: 2, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={2} sm={4} md={5}>
          <IncidentBarChart />
        </Grid>
        <Grid item xs={2} sm={4} md={6} ml={8}>
          <IncidentHorizontalBarChart vertical={true} layout="horizontal" />
        </Grid>
      </Grid>
      {/* <Grid container spacing={{ xs:2, md:5 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={2} sm={4} md={6}>
             <p>Incidents by priority and state</p>
             <IncidentTable/>
          </Grid>
          <Grid item xs={2} sm={4} md={6}>
             <p>Incidents by priority and state more than 30 days</p>
             <IncidentTable/>
          </Grid>
      </Grid> */}
    </Box>
  );
}
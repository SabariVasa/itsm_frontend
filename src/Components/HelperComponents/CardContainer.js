import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ContentCard from './ContentCard';
import { Link } from 'react-router-dom';
import Table from './Table';
import { CMDBheaderData } from '../../Utils/CMDB-Data/CmdbData';
import { IncidentData } from '../../Utils/Incident-Data/IncidentsData';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
// import { CmdbData } from '../../Utils/CMDB-Data/CmdbData';

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(2),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

export default function CardContainer(props) {
  const { categoryType, setCategoryType, CmdbData } = props;
  const keys = CmdbData ? Object.keys(CmdbData) : [];
  // const [categoryType, setCategoryType] = React.useState({ category: '', core: '' });
  const type = props.software ? "Software" : "Hardware";
  return (
    <Box sx={{ flexGrow: 1, marginLeft: 10, marginBottom: 5 }}>
      {console.log(CmdbData, 'CmdbData')}
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {keys.map((ele, index) =>
          <Grid item xs={12} sm={4} md={4} key={index}>
            {console.log(ele, 'ele')}
            <div onClick={() => setCategoryType({ category: CmdbData[`${ele}`].id, core: type })}>
              {/* <ContentCard title={ele} total={props.Total[index]}/> */}
              <Card sx={{ display: 'flex', justifyContent: "space-around", alignItems: "center" }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="p">
                      {CmdbData[`${ele}`].className}
                    </Typography>
                    <Typography variant="h3" color="text.secondary" component="div">
                      {CmdbData[`${ele}`].totalCount}
                    </Typography>
                  </CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                  </Box>
                </Box>
                <CardMedia
                  component="img"
                  sx={{ width: 40, height: 40 }}
                  image={CmdbData[`${ele}`].image}
                  alt="Images"
                />
              </Card>
            </div>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

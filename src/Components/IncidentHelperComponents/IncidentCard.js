import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

// const card = (
// //   <React.Fragment props>
    
// //   </React.Fragment>
// );

export default function IncidentCard(props) {
  return (
      <Box sx={{ minWidth: 275 }}>
          <Card variant="outlined"style={{borderRadius:10}} >
              <CardContent style={{ display: "block", alignItems: "center", justifyContent: "center" }}>
                  <Typography variant="p" component="div">
                       {props.title}
                  </Typography>
                  <Typography variant='h2' color={props.color}>
                      {props.total}
                  </Typography>
              </CardContent>
          </Card>
      </Box>
  );
}
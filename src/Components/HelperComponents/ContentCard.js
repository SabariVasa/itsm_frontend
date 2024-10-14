import * as React from 'react';
// import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import SkipNextIcon from '@mui/icons-material/SkipNext';
// import AddIcon from '@mui/icons-material/Add';
// import { Link } from 'react-router-dom';

export default function ContentCard(props) {
  // const theme = useTheme();rops
  const { total, title, img, height, width, path } = props;
  console.log(total, title, img, height, width, path, 'total, title, img, height, width, path');
  return (
    <Card sx={{ display: 'flex', justifyContent: "space-around", alignItems: "center" }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="p">
            {props.title}
          </Typography>
          <Typography variant="h3" color="text.secondary" component="div">
            {props.total}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: props.width, height: props.height }}
        image={props.img}
        alt="Configuration Item Images"
      />
    </Card>
  );
}

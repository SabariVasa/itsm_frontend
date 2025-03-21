import React,{useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';

export default function CardContainer(props) {
    const[color,setColor]=useState("");
    useEffect(()=>{
      if(props.changeModel ==="Standard"){
         setColor("orange")
      }else if(props.changeModel ==="Normal"){
        setColor("green")
      }else{
        setColor("red")
      }
    },[])
  return (
    <div>
        <Card sx={{ height:125,minWidth: 275,display:"flex",cursor:"pointer"}}>
            <Box sx={{backgroundColor:color}}>
            <Divider orientation="vertical" style={{width:4}}/>
            </Box>
            <Box>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" className="card-text-wrapper" gutterBottom>
                 {props.shortDescription}
              </Typography>
              <Typography variant="body2" className="text-wrapper-knowledge">
                   {props.Description}
              </Typography>
            </CardContent>
            </Box>
        </Card>
    </div>
  )
}

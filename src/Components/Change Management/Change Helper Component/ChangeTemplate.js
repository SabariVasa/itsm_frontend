import React from 'react';
import {Box,Grid} from "@mui/material";
import CardContainer from './CardContainer';
// import axios from 'axios';
// import { serverAPI } from '../../../Utils/Server';
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom';


export default function ChangeTemplate(props) {
  return (
    <Box sx={{ flexGrow: 1 }} p={3}>
    {props.loading?<div style={{display:"flex",alignItems:"center",justifyContent:"center",width:"100%",height:"60vh"}}>
        <ReactLoading type={"bars"} color={"#ff751a"}/>
      </div>:
    <Grid container spacing={2}>
        {props.templateList.map((item,index)=>{
            return(
                <Grid item xs={5}>
                  <Link to={`/change_service/New?model=${item.changeModel}`} style={{textDecoration:"none"}}>
                    <CardContainer key={index} shortDescription={item.shortDescription} Description={item.description} changeModel={item.changeModel}/>
                    </Link>
                </Grid>
            )
        })}
    </Grid>
    }
  </Box>
  )
}

import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { useHistory, useRouteMatch } from "react-router-dom";
import ContentDevider from '../../HelperComponents/ContentDevider';
import { setActiveStep } from '../../../Redux state management/Redux Slices/GlobalStepperSlice';
import { useDispatch, useSelector } from 'react-redux';
import RequestForm from '../Helper Components/RequestForm';
import { Hardware } from '@mui/icons-material';
import GeneralService from './GeneralService';

function RequestCategory() {
   const history = useHistory();
   const { path } = useRouteMatch();
   return (
      <>
         <ContentDevider title="Request Catelog" />
         <Grid container spacing={3} p={10}>
            <Grid xs={4}>
               <div style={{ height: 150, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} className='requestItemCard' onClick={() => history.push(`${path}/request_service/general-service`)}>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSemm1Dd0iu6XkNa_nD8HcLarmbY1EkJLpVtA&s" height="80" width="120" />
                  <h3 style={{ color: "black" }}>General service request</h3>
               </div>
            </Grid>
            <Grid xs={4}>
               <div onClick={() => history.push(`${path}/request_service/hardware`)} style={{ height: 150, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} className='requestItemCard' >
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKb4zi2eLNEFEQUhycbKIU9CFZ6yojnJChdw&s" height="80" width="100" />
                  <h3 style={{ color: "black" }}>Hardware Request</h3>
               </div>
            </Grid>
         </Grid>
      </>
   )
}

export default RequestCategory
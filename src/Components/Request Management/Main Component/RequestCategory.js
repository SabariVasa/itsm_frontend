import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { useHistory, useRouteMatch } from "react-router-dom";
import ContentDevider from '../../HelperComponents/ContentDevider';
import { setActiveStep } from '../../../Redux state management/Redux Slices/GlobalStepperSlice';
import { useDispatch, useSelector } from 'react-redux';
import RequestForm from '../Helper Components/RequestForm';
import { Hardware } from '@mui/icons-material';
import GeneralService from './GeneralService';
import { StyledCard, StyledTypography } from '../../../commonComponents/StyledComponents';

function RequestCategory() {
   const history = useHistory();
   const { path } = useRouteMatch();
   return (
      <>
         <ContentDevider title="Request Catelog" />
         <Grid container spacing={3} p={10}>
            <Grid item xs={4}>
               <StyledCard onClick={() => history.push(`${path}/request_service/general-service`)}>
                  <img
                     src="./general_request.png"
                     alt="General Service"
                     height="80"
                     width="120"
                  />
                  <StyledTypography>General service request</StyledTypography>
               </StyledCard>
            </Grid>
            <Grid item xs={4}>
               <StyledCard onClick={() => history.push(`${path}/request_service/hardware`)}>
                  <img
                     src="./hardware_request.png"
                     alt="Hardware Request"
                     height="80"
                     width="100"
                  />
                  <StyledTypography>Hardware Request</StyledTypography>
               </StyledCard>
            </Grid>
         </Grid>

      </>
   )
}

export default RequestCategory
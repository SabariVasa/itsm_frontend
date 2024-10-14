import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import ContentDevider from '../../HelperComponents/ContentDevider';
import { setActiveStep } from '../../../Redux state management/Redux Slices/GlobalStepperSlice';
import { useDispatch, useSelector } from 'react-redux';
import RequestForm from '../Helper Components/RequestForm';
import { Hardware } from '@mui/icons-material';
import GeneralService from './GeneralService';

function RequestCategory() {

   //   const dispatch = useDispatch();
   //   const activeStep = useSelector((state)=>state.globalReducers.activeStep);
   const [activeService, setActiveService] = useState('');
   useEffect(() => {
      //  dispatch(setActiveStep(0))
   }, []);
   const componentObj = {
      general_service: GeneralService,
      hardware: RequestForm,
      // ongoing: Products,e
      // resolved: OnlineServices,
   };

   let Component = null;
   Component = componentObj[activeService];
   return (
      <>
         {activeService ? (
            <Component />
         ) : (
            <>
               <ContentDevider title="Request Catelog" />
               <Grid container spacing={3} p={10}>
                  <Grid xs={4}>
                     {/* <Link style={{ textDecoration: "none" }} to="/endUser/request_service/general-service" > */}
                     <div style={{ height: 150, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} className='requestItemCard' onClick={() => setActiveService('general_service')}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSemm1Dd0iu6XkNa_nD8HcLarmbY1EkJLpVtA&s" height="80" width="120" />
                        <h3 style={{ color: "black" }}>General service request</h3>
                     </div>
                     {/* </Link> */}
                  </Grid>
                  {/* <Grid xs={4}>
                  <div style={{height:150,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}} className='requestItemCard'>
                     <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhnWsDx6bTSSDwm7gSJ_gX_uILntIsQq2mTg&s" height="100"/>
                     <h3>Password reset</h3>
                  </div>
               </Grid> */}
                  <Grid xs={4}>
                     {/* <Link to="/request_service/hardware" style={{ textDecoration: "none" }}> */}
                     <div onClick={() => setActiveService('hardware')} style={{ height: 150, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} className='requestItemCard' >
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKb4zi2eLNEFEQUhycbKIU9CFZ6yojnJChdw&s" height="80" width="100" />
                        <h3 style={{ color: "black" }}>Hardware Request</h3>
                     </div>
                     {/* </Link> */}
                  </Grid>
                  {/* <Grid xs={4}>
             <div style={{height:150,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",marginTop:20}} className='requestItemCard'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6-di_o1DViMXIQhkYYwqT-mFUOL1aFb4wSXy8HUMcRjuDv2i4sLB2xs5S4A&s" height="100"/>
                <h3>User creation request</h3>
             </div>
          </Grid> */}
               </Grid>
            </>
         )
         }

      </>
   )
}

export default RequestCategory
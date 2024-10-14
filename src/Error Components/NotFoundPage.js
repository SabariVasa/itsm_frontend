import React from 'react';
import animationData from "../lotties/NotFound.json";
import Lottie from 'react-lottie';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
    const navigate=useNavigate();
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
  return (
      <div>
        <Lottie 
          options={defaultOptions}
          height={400}
          width={400}
        />
        <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
        <h1>404 NOT FOUND</h1>
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
        <Button variant="outlined"  color="primary" style={{width:120}} onClick={()=>{navigate(-1)}}>Go Back</Button>
        </div>
      </div>
  )
}

export default NotFoundPage
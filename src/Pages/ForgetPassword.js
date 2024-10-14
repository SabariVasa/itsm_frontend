import React, { useEffect, useState } from 'react';
import { Box, FormControl, InputLabel, OutlinedInput, Button } from '@mui/material';
// import { InputAdornment } from '@mui/material';
// import Countdown,{CountdownApi} from 'react-countdown';
import { useNavigate } from 'react-router-dom';
// import { authContext } from '../Routes/AuthenticationRoutes';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { serverAPI } from '../Utils/Server';
import NotifyBar from '../Components/Notification Components/NotifyBar';


export default function ForgetPassword() {
  // const Ref = useRef(null);
  const navigate = useNavigate();

  // The state for our timer
  const [error, setError] = useState(false);
  const [notifyStatus, setNotifyStatus] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState("");

  // const {mailAddress,setMailAddress}=useContext(authContext);
  const [loading, setLoading] = useState(false);
  function spinnerLoading(message) {
    setLoading(false);
    setNotifyStatus(true);
    setNotifyMessage("Security code has been sent to your email address");
    setError(false);
    setTimeout(() => {
      navigate("/reset-password")
    }, 1000)
  }


  async function generateSecurityCode() {
    setLoading(true);
    await axios.post(`${serverAPI}/sent-email/${mailAddress}`).then((res) => {
      console.log(res.data);
      if (res.data.statusCode === 200) {
        spinnerLoading()
      } else {
        setNotifyStatus(true);
        setError(true);
        setNotifyMessage("Failed to send security code to your email address");
        setLoading(false);
      }
    }).catch((err) => {
      console.error(err)
      setNotifyStatus(true);
      setError(true);
      setNotifyMessage("Entered Email Address is not registered with us. Please try again.");
      setLoading(false);
    })
  }

  const [mailAddress, setMailAddress] = useState("");
  useEffect(() => {
    sessionStorage.setItem("email", mailAddress);
  }, [mailAddress, setMailAddress]);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      {loading ? <div style={{ position: "absolute", top: 150, display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "60vh" }}>
        <ReactLoading type={"spin"} color={"#ff751a"} />
      </div> : null}
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: 60
      }}>
        <img alt="logoimage" src={"https://res.cloudinary.com/doiff4svr/image/upload/v1723209680/logo_1_page-0001-removebg-preview_suhly2.png"} style={{ height: 150, width: 170 }} />
      </Box>
      <Box>
        <h3>Forget Password</h3>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: "column", flexWrap: 'wrap' }}>
        <FormControl fullWidth sx={{ m: 1, width: '50ch' }}>
          <InputLabel htmlFor="outlined-adornment-amount" >Enter the email address to reset the password</InputLabel>
          <OutlinedInput
            value={mailAddress} onChange={(e) => { setMailAddress(e.target.value) }}
            id="outlined-adornment-amount"
            label="Enter the email address to reset the password"
          />
        </FormControl>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <Button variant="contained" fullWidth sx={{ m: 1 }} onClick={() => { generateSecurityCode() }}>Get token via Email</Button>
        </Box>
      </Box>
      <NotifyBar error={error} setError={setError} notifyMessage={notifyMessage} notifyStatus={notifyStatus} setNotifyStatus={setNotifyStatus} />
    </div>
  )
}

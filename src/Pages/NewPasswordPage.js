import React,{useState} from 'react';
import { Box,FormControl,InputLabel,OutlinedInput,Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { serverAPI } from '../Utils/Server';
import axios from 'axios';
import ReactLoading from 'react-loading';
import NotifyBar from '../Components/Notification Components/NotifyBar';
import { useNavigate } from 'react-router-dom';

export default function NewPasswordPage() {
  const [Password, setPassword] = useState(null);
  const[repeatPassword,setRepeatPassword]=useState(null);
  const[newPassword,setNewPassword] = useState(false);
  const[confirmPassword,setConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const handleClickNewPassword = () => setNewPassword((show) => !show);
  const handleClickConfirmPassword = () => setConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const[error,setError]=useState(false);
  const[notifyStatus,setNotifyStatus]=useState(false);
  const[notifyMessage,setNotifyMessage]=useState("");
  const[loading,setLoading]=useState(false);
  function spinnerLoading(message){
    setLoading(false);
    setNotifyStatus(true);
    setNotifyMessage(message);
    setError(false);
    setTimeout(()=>{
       navigate("/")
    },2000)
  } 

  async function resetPassword(){
    setLoading(true);
    if(Password!=repeatPassword){
      setLoading(false);
      setError(true);
      setNotifyMessage("Passwords do not match")
      setNotifyStatus(true)
      return
    }else if(Password==null && repeatPassword==null){
      setLoading(false);
      setError(true);
      setNotifyMessage("Please enter a password to continue")
      setNotifyStatus(true)
      return
    }else{
      const data = {
        password: repeatPassword,
        securityCode:sessionStorage.getItem("securityCode"),
        emailAddress:sessionStorage.getItem('email')
      }
      try{
        await axios.post(`${serverAPI}/reset-password`,data).then((res)=>{
          console.log(res)
          if(res.data.statusCode===200){
            spinnerLoading("Password Reset Successfully")
          }else{
            setError(true);
            setNotifyMessage("Failed to reset password")
            setNotifyStatus(true)
          }
        }).catch((error) => {
           setError(true);
           setNotifyStatus(true);
           setNotifyMessage("Failed to reset password");
        })
      }catch(error){
        //Handle any error that occurs during the API call
        setError(true);
           setNotifyStatus(true);
           setNotifyMessage("Failed to reset password");
      }
    }
  }
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
       {loading?<div style={{position:"absolute",top:250,display:"flex",alignItems:"center",justifyContent:"center",width:"100%",height:"60vh"}}>
        <ReactLoading type={"spin"} color={"#ff751a"}/>
      </div>:null}
         <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height:60
        }}>
          <img alt="logoimage" src={"https://res.cloudinary.com/doiff4svr/image/upload/v1723209680/logo_1_page-0001-removebg-preview_suhly2.png"} style={{height:150,width:170}} />
        </Box>
        <Box style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",width:400,textAlign:"center"}}>
            <h2 style={{fontWeight:"normal"}}>Reset Password</h2>
        </Box>
         <Box sx={{ display: 'flex',flexDirection:"column",width:"50ch",flexWrap: 'wrap' }}>
         <FormControl fullwidth sx={{mb:1}} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Enter the New Password</InputLabel>
          <OutlinedInput
            inputProps={{
              autocomplete: 'new-password',
              form: {
                autocomplete: 'off',
              },}}
            id="outlined-adornment-password"
            onChange={(e)=>{setPassword(e.target.value);}}
            type={newPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                 
                  onClick={handleClickNewPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {newPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Enter the New Password"
          />
        </FormControl>
          <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Repeat the New Password</InputLabel>
          <OutlinedInput
          inputProps={{
            autocomplete: 'new-password',
            form: {
              autocomplete: 'off',
            },}}
            id="outlined-adornment-password"
            onChange={(e)=>{setRepeatPassword(e.target.value);}}
            type={confirmPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {confirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Repeat the New Password"
          />
        </FormControl>
        <Box sx={{ display: 'flex',flexWrap: 'wrap' }}>
        <Button variant="contained" fullWidth sx={{ m: 1}} onClick={()=>{resetPassword()}}>SUBMIT</Button>
        </Box>
        </Box>
        <NotifyBar error={error} setError={setError} notifyMessage={notifyMessage} notifyStatus={notifyStatus} setNotifyStatus={setNotifyStatus}/>
    </div>
  )
}

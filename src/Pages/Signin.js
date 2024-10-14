import { Grid, Box, TextField, Typography, Button, Link, Container } from "@mui/material";
import React, { useState, useEffect } from "react";
import "../App.css"
// import GoogleIcon from '@mui/icons-material/Google';
import MicrosoftIcon from '@mui/icons-material/Microsoft';
import { Divider } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import GlobalService from '../services/GlobalService';
import { resturls } from '../global/utils/apiurls';
// import { useMsal } from '@azure/msal-react'
// import { msalConfig,loginRequest } from "../MicrosoftAzureSSO/authConfig";
// import { GoogleLogin, useGoogleLogin, useGoogleLogout } from '@react-oauth/google';
import axios from 'axios';
import {
  Navigate,
} from 'react-router-dom';
// import Google from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";
// import { jwtDecode } from 'jwt-decode';
import { serverAPI } from "../Utils/Server";
// import { CheckToken } from "../Utils/CheckToken";
import IconButton from '@mui/material/IconButton';
// import Input from '@mui/material/Input';
// import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
// import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import md5 from "md5";
// import { loginRequest } from "../Features/SSOFeatures/MicrosoftAzureSSO/authConfig";
// import { PublicClientApplication } from "@azure/msal-browser";



function Signin(props) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [valid, setValid] = useState(false);
  const [currentPage, setCurrentPage] = useState('login');
  // const [alreadyLogin, setAlreadyLogin] = useState(false);
  const [error, setError] = useState(null);
  // const { instance } = useMsal()
  const navigate = useNavigate();
  const [state, setState] = useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;
  // const [isVisible, setisVisible] = useState(true);
  const [ErrorMessage, setErrorMessage] = useState();

  const [Password, setPassword] = useState();
  const [email, setEmail] = useState();
  // const Emailregex = new RegExp("/.+@.+\.[A-Za-z]+$/");
  const [User, setUser] = useState();
  const [profile, setProfile] = useState([]);
  const [alreadyLogin, setAlreadyLogin] = useState(false);

  const triggerLoginCredentials = () => {
    // console.log('triggerLoginCredentials');
    // let estatus = false;
    // let emessage = false;
    // let valid = false;
    // let error = '';
    // let role = '';
    // if (email === "helpdesk.admin@teksiblegroup.com" && Password === "admin@123") {
    //   localStorage.setItem("Authentication-Token", "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJUcmF2aXNAdWJlci5hZSIsImV4cCI6MTcxNzc3MzM4MX0.Cr5XSpC7Bie_7NyK87UzKpKXETNnWGOxSUFvje7DmtwH4-qL-HaHExg2JDbThkTX6NaXoLqux3TET3u1_C6rxQ")
    //   localStorage.setItem("User", "admin")
    //   localStorage.setItem("userEmail", "admin@teksible")
    //   estatus = true
    //   emessage = true
    //   valid = true
    //   role = 'admin'
    // } else if (email === "user@teksiblegroup.com" && Password === "user@123") {
    //   localStorage.setItem("Authentication-Token", "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJUcmF2aXNAdWJlci5hZSIsImV4cCI6MTcxNzc3MzM4MX0.Cr5XSpC7Bie_7NyK87UzKpKXETNnWGOxSUFvje7DmtwH4-qL-HaHExg2JDbThkTX6NaXoLqux3TET3u1_C6rxQ")
    //   localStorage.setItem("User", "endUser")
    //   localStorage.setItem("userEmail", "user@teksiblegroup.com")
    //   estatus = true
    //   emessage = true
    //   valid = true
    //   role = 'user'
    // } else if (email === "it.superadmin@teksiblegroup.com" && Password === "superadmin@123") {
    //   localStorage.setItem("Authentication-Token", "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJUcmF2aXNAdWJlci5hZSIsImV4cCI6MTcxNzc3MzM4MX0.Cr5XSpC7Bie_7NyK87UzKpKXETNnWGOxSUFvje7DmtwH4-qL-HaHExg2JDbThkTX6NaXoLqux3TET3u1_C6rxQ")
    //   localStorage.setItem("User", "superAdmin")
    //   localStorage.setItem("userEmail", "superadmin@teksible")
    //   estatus = true
    //   emessage = true
    //   valid = true
    //   role = 'superadmin'
    // }
    GlobalService.generalSelect(
      (respdata) => {
        const {
          estatus, data, emessage, valid
        } = respdata;
        console.log(respdata, 'reqObj');
        if (estatus && emessage && data) {
          setValid(valid);
          setError(error);
          console.log(valid, 'validreqObj');
          if (valid) {
            setAlreadyLogin(true);
          } else {
            setCurrentPage('relogin');
          }
        }
      }, resturls.login, { emailAddress: email, password: Password }, 'POST',
    );
    // if (estatus && emessage) {
    //   setValid(valid);
    //   setError(error);
    //   // localStorage.setItem('isAdmin', is_admin);
    //   if (valid) {
    //     console.log(valid, 'valid');
    //     setAlreadyLogin(true);
    //     localStorage.setItem('role', role);
    //   } else {
    //     setCurrentPage('relogin');
    //   }
    // }
  }

  const getUserDetails = () => {
    GlobalService.generalSelect(
      (respdata) => {
        const {
          estatus, data, emessage, valid
        } = respdata;

        console.log(respdata, 'reqObj');
        if (estatus && emessage) {
          console.log(estatus, 'estatus');
          setValid(valid);
          setError(emessage);
          if (valid) {
            setAlreadyLogin(true);
          } else {
            setCurrentPage('relogin');
          }
        }
        console.log(estatus, 'estatus');
      }, resturls.getUserDetails, {}, 'GET',
    );
  }


  const Login = (e) => {
    e.preventDefault()
    console.log(e, 'e');
    const obj = { password: md5(Password) };

    // eslint-disable-next-line no-useless-escape
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const userName = email.trim();
    if (userName.match(emailRegex)) {
      obj.email = userName;
    } else {
      obj.username = userName;
    }

    triggerLoginCredentials(obj);
  }




  // const credentialsLogin = async () => {
  //   const postData = {
  //     emailAddress: email,
  //     password: Password
  //   }
  //   await axios.post(`${serverAPI}/loginCustomer`, postData).then((res) => {
  //     console.log(res.data);
  //     if (res.data.responseData) {
  //       localStorage.setItem("userEmail", res.data.userData)
  //       if (validateJson(res.data.responseData)) {
  //         localStorage.setItem("Authentication-Token", res.data.responseData);
  //         window.location.reload("/");
  //       } else {
  //         setState({ ...state, open: true })
  //         setErrorMessage(res.data.responseData);
  //       }
  //       // navigate('/');
  //     }
  //   }).catch((err) => {
  //     console.log(err)
  //     setErrorMessage("Something went wrong in server,please try again after sometimes");
  //   });
  // }
  const onSuccess = (res) => {
    console.log("login success:CurrentUser", res.profileObj);
    navigate('/');
    localStorage.setItem('Auth', 'Verfied')
  }
  const onFailure = (res) => {
    console.log("log in failed:res:", res)
  }
  const ClientId = "1096249476767-6aq8j72hth183jchc5d16uqq7u1s3881.apps.googleusercontent.com"
  useEffect(
    () => {
      getUserDetails();
      if (User) {
        axios
          .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${User.access_token}`, {
            headers: {
              Authorization: `Bearer ${User.access_token}`,
              Accept: 'application/json'
            }
          })
          .then((res) => {
            setProfile(res.data);
            localStorage.setItem("Auth", "Verfied")
          })
          .catch(
            (err) => console.log(err)
          );
      }
    },
    [User]
  );
  function validateEmail(mail) {
    var re = /\S+@\S+\.\S+/;
    return re.test(mail);
  }

  function validateJson(json) {
    var JsonregEx = /^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)/
    return JsonregEx.test(json);
  }
  const handleClose = () => {
    setState({ ...state, open: false })
  }

  // const AzureADLogin = async () => {
  //   instance.loginRedirect({
  //     prompt: 'create',
  //   }).catch((err) => console.log(err))
  // };
  // const responseMessage = (response) => {
  //   console.log(response);
  // };
  // const errorMessage = (error) => {
  //   console.log(error);
  // };
  console.log(alreadyLogin, 'alreadyLogin');
  return (
    alreadyLogin ? (
      <Navigate to={'/'} />
    ) : (
      <>
        < Container component="main" maxWidth="xs" >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            className="SignupBox"
          >
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: 60
            }}>
              <img alt="logoimage" src={"https://res.cloudinary.com/doiff4svr/image/upload/v1723209680/logo_1_page-0001-removebg-preview_suhly2.png"} style={{ height: 150, width: 170 }} />
            </Box>
            <Typography component="h1" variant="h5" sx={{ mt: 3 }}>
              Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                onChange={(e) => { setEmail(e.target.value) }}
                name="email"
                autoComplete="email"
              />
              {/* <TextField
            margin="normal"
            required
            fullWidth
            name="Password"
            onChange={(e)=>{setPassword(e.target.value)}}
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          /> */}
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password" >Password</InputLabel>
                <OutlinedInput
                  inputProps={{
                    autocomplete: 'new-password',
                    form: {
                      autocomplete: 'off',
                    },
                  }}
                  id="outlined-adornment-password"
                  onChange={(e) => { setPassword(e.target.value) }}
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={(e) => Login(e)}
              >
                Sign In
              </Button>
              <Grid container spacing={2}>
                <Grid item  >
                  <Link href="/forget-password" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item >
                  <Link href="/Verify-Partner" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <div style={{ marginTop: 6 }}>
                <Divider style={{ opacity: 0.5, color: "black" }} >OR</Divider>
              </div>
            </Box>
            <Button fullWidth
              // variant="outlined"
              // color="error"
              // startIcon={<GoogleIcon/>}
              sx={{ mt: 3, mb: 2 }}
            // onClick={()=>{GoogleLogin()}}
            >
              {/* Sign-In with Google */}
              {/* <GoogleLogin onSuccess={(credentialResponse) => {
            const decoded = jwtDecode(credentialResponse.credential);
            console.log(decoded);
            localStorage.setItem('Auth','Verfied')
            window.location.reload('/');
          }}
          onError={() => {console.log("Login Failed");}}/> */}
            </Button>
            <Button fullWidth
              variant="outlined"
              sx={{ mb: 2 }} color="warning" startIcon={<MicrosoftIcon />}
              onClick={props.handleRequest}
            >
              Sign-In with Microsoft Azure AD
            </Button>
          </Box>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={handleClose}
            message={ErrorMessage}
            key={vertical + horizontal}
            ContentProps={{
              sx: {
                background: "#ff3333"
              }
            }
            }
          />
        </Container >
      </>
    )
  );

}

const styles = {
  SignupCard: {
    height: 500,
    width: 500,
    borderWidth: 100,
    borderColor: "green",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  // loginPage: {
  //   backgroundImage: url("paper.gif"),
  // }
}
export default Signin;
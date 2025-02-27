import React, { useEffect, useState } from 'react'
import { Box, TextField, Typography, Button, Container } from "@mui/material";
// import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom'
// import { WindowUtils } from 'msal';
import axios from 'axios';
import { serverAPI } from '../Utils/Server';
import { Snackbar } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

export default function PartnerVerifyPage() {
  const [Token, setToken] = useState("");
  const [PartnerAccount, setPartnerAccount] = useState();
  const [VerifyTokenButton, setVerifyTokenButton] = useState(true);
  const [ErrorColor, setErrorColor] = useState();
  const navigate = useNavigate();

  const [state, setState] = useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;
  const [isVisible, setisVisible] = useState(true);
  const [ErrorMessage, setErrorMessage] = useState();
  const [Progress, setProgress] = useState(false);
  const VerifyToken = (e) => {
    try {
      // const VerifiedToken = jwtDecode(Token)
      if (Token) {
        setProgress(true);
        VerifyTokenApi();
      } else {
        setState({ ...state, open: true });
        setErrorMessage("Please enter the token to continue...")
      }
    } catch (err) {
      setState({ ...state, open: true });
      setErrorMessage("Please provide valid token to continue...")
    }
    // console.log(VerifiedToken.PartnerAccount);
  }
  const handleClose = () => {
    setState({ ...state, open: false })
  }

  const VerifyTokenApi = async () => {
    await axios.get(`${serverAPI}/AuthToken/${Token}`).then((res) => {
      console.log(res.data);
      setErrorMessage(res.data);
      setState({ ...state, open: true })
      if (res.data == "Given token is valid,you can Signup now") {
        setProgress(false);
        setErrorColor(false);
        setTimeout(function () { navigate("/SignUp") }, 3000);
      } else {
        setErrorColor(true)
        setProgress(false);
      }

    }).catch((er) => {
      setState({ ...state, open: true });
      setErrorMessage("Something went wrong with server please try again after sometimes...");
      setProgress(false);
      console.log(er);
    })
  }
  useEffect(() => {
    if (PartnerAccount) {
      navigate("/SignUp")
    }
  }, [PartnerAccount])
  useEffect(() => {
    if (Token != "") {
      setVerifyTokenButton(false);
    }
  }, [Token])
  return (
    <Container component="main" maxWidth="xs">
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
          <img src={"https://res.cloudinary.com/doiff4svr/image/upload/v1723209680/logo_1_page-0001-removebg-preview_suhly2.png"} style={{ height: 150, width: 170 }} />
        </Box>
        <Typography component="h1" variant="h5" sx={{ mt: 3 }}>
          Customer Token Validation Page
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="Verfiy Code"
            label="Enter the code"
            onChange={(e) => { setToken(e.target.value) }}
            name="VerifyCode"
          />
          {!Progress ?
            <Button
              // type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={(e) => VerifyToken(e)}
              disabled={VerifyTokenButton}
            // onBlur={()=>{setVerifyTokenButton(false);}}
            >
              Verify
            </Button> : <CircularProgress sx={{ mt: 3, mb: 2 }} className="ProgressBar" fullWidth />}
        </Box>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={ErrorMessage}
        key={vertical + horizontal}
        ContentProps={{
          sx: {
            background: ErrorColor ? "red" : "green"
          }
        }
        }
      />
    </Container>
  )
}

import { Box, TextField, Typography, Button, Container } from "@mui/material";
import React, { useState, useEffect } from "react";
import "../App.css"
import Snackbar from '@mui/material/Snackbar';
// import { useMsal } from '@azure/msal-react'
import axios from 'axios';
// import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import JWT from 'expo-jwt';
import { TextareaAutosize } from '@mui/base';
import { serverAPI } from '../Utils/Server';


function TokenGenerationPage(props) {
  const [EncryptedToken, setEncryptedToken] = useState(null);
  const [PartnerAccount, setPartnerAccount] = useState(null);
  const [ExpireDate, setExpireDate] = useState();
  const [GenerateDisabled, setGenerateDisabled] = useState(true);
  const key = 'TeksibleItSolutions';

  const [state, setState] = useState({
    open: false,
    vertical: 'bottom',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;
  const [isVisible, setisVisible] = useState(true);
  const [ErrorMessage, setErrorMessage] = useState();

  useEffect(() => {
    if (ExpireDate && PartnerAccount != null) {
      setGenerateDisabled(false);
    }
  }, [ExpireDate, PartnerAccount])
  const AddGeneratedCode = async () => {
    const data = {
      authToken: EncryptedToken,
      customerAccount: PartnerAccount,
      expireDate: ExpireDate
    }
    console.log(data)
    await axios.post(`${serverAPI}/generateToken`, data).then((res) => {
      console.log(res.data)
      if (res.data == "Token Successfully added") {
        setState({ ...state, open: true })
        setErrorMessage(res.data)
        setGenerateDisabled(false);
      }
      // alert("Succesfully Code Updated");
    }).catch((err) => { console.log(err) });
  }

  const handleClose = () => {
    setState({ ...state, open: false })
  }

  function GenerateToken(e) {
    e.preventDefault()
    const TokenInfo = {
      PartnerAccount: PartnerAccount,
      ExpireDate: ExpireDate
    }
    setEncryptedToken(JWT.encode(TokenInfo, key))
    if (EncryptedToken) {
      AddGeneratedCode();
      setGenerateDisabled(true);
    }

  }

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        className="SignupBox"
      >
        <Typography component="h1" variant="h5" sx={{ mt: 3 }} style={{ textAlign: "center", fontWeight: "bold" }}>
          Customer sign-up code generation
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            // required
            fullWidth
            id="email"
            label="Enter Customer Account"
            onChange={(e) => { setPartnerAccount(e.target.value) }}
            name="Partner-Account"
          />
          <Box xs={12} >
            <LocalizationProvider dateAdapter={AdapterDayjs} >
              <DatePicker sx={{ mt: 3, mb: 2 }} label="Choose Expire Date" onChange={(date) => { setExpireDate(date); console.log(date) }} />
            </LocalizationProvider>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={GenerateDisabled}
            onClick={

              (e) => GenerateToken(e)
            }
          >
            Generate Code
          </Button>
        </Box>
        {EncryptedToken ? <TextareaAutosize maxRows={4} fullWidth aria-label="maximum height" style={{ width: "100%" }} value={EncryptedToken} /> : null}
      </Box>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={ErrorMessage}
        key={vertical + horizontal}
        ContentProps={{
          sx: {
            background: "green"
          }
        }
        }
      />
    </Container>
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
  }
}
export default TokenGenerationPage;
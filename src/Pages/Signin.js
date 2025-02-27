import { Box, TextField, Typography, Button, Container } from "@mui/material";
import React, { useState } from "react";
import "../App.css"
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useTheme } from "../global/commonComponents/ThemeContext";
import { useAuth } from "../application/modules/auth/hooks/useAuth";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { GridCloseIcon } from "@mui/x-data-grid";

function Signin() {
  const { signin, error, loading, update } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { theme } = useTheme();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
  });

  const handleSubmit = ({ email, password }) => {
    const obj = {
      emailAddress: email.trim(),
      password
    };
    signin(obj);
  }

  const handleClose = () => update({ errorMesg: '' });

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <GridCloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );


  return (
    <Container component="main" maxWidth="xs" >
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
          marginTop: '5em'
        }}>
          <img alt="logoimage" src="/indexlogo.png" style={{ width: 180 }} />
        </Box>
        <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
          Sign in
        </Typography>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors }) => (
            <Form>
              <Field
                as={TextField}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <Field
                  as={OutlinedInput}
                  inputProps={{
                    autocomplete: 'new-password',
                    form: {
                      autocomplete: 'off',
                    },
                  }}
                  id="outlined-adornment-password"
                  name="password"
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
                  error={Boolean(errors.password)}
                  helperText={errors.password}
                />
              </FormControl>
              <Box fullWidth sx={{ display: 'flex', fontFamily: 'popins', justifyContent: 'center' }}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
                  sx={{
                    height: 45,
                    display: 'flex',
                    justifyContent: 'center',
                    borderRadius: '0.5em',
                    mt: 2,
                    mb: 2,
                    background: `${theme.outerBodyColor}`,
                    "&:hover": {
                      backgroundColor: `${theme.btnHoverColor}`,
                    },
                  }}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={Boolean(error)}
        onClose={handleClose}
        message={error}
        action={action}
        ContentProps={{
          sx: {
            background: "#ff3333",
            whiteSpace: 'pre-line'
          }
        }}
        autoHideDuration={2000}
      />
    </Container>
  )
}

export default Signin;

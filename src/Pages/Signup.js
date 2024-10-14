import React, { useState } from 'react';
import { IconButton, Grid, Box, TextField, Typography, Button, Link, FormControlLabel, Checkbox, Container, VisibilityOff, Visibility, InputAdornment, InputLabel } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';
import { serverAPI } from '../Utils/Server';


function Signup() {
    const [state, setState] = useState({
        open: false,
        vertical: 'bottom',
        horizontal: 'center',
    });
    const { vertical, horizontal, open } = state;
    const [isVisible, setisVisible] = useState(true);
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [Password, setPassword] = useState();
    const [ErrorfirstName, setErrorFirstName] = useState(false);
    const [ErrorlastName, setErrorLastName] = useState(false);
    const [ErrorPassword, setErrorPassword] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState();
    const [email, setEmail] = useState();
    const [ErrorEmail, setErrorEmail] = useState();
    const Emailregex = new RegExp("/.+@.+\.[A-Za-z]+$/");
    const [ShowPassword, setShowPassword] = useState();
    const [Success, setSuccess] = useState(false);
    const [PasswordFocused, setPasswordFocused] = useState(false);


    const SignUp = (e) => {
        e.preventDefault()
        if (!email || !Password || !firstName || !lastName) {
            setState({ ...state, open: true })
            setErrorMessage("Please fill all required field")
        } else if (!validateEmail(email)) {
            setState({ ...state, open: true })
            setErrorMessage("Please provide appropriate email")
        } else if (Password.length < 8) {
            setState({ ...state, open: true })
            setErrorMessage("Password must be minimum 8 characters")
        } else if (!validatePassword(Password)) {
            setState({ ...state, open: true })
            setErrorMessage("password should contain minimum eight characters, at least one uppercase letter,one lowercase letter, one number and one special character")
        } else {
            // localStorage.setItem("Auth","Verfied")
            handleSubmit()
        }
    }

    function validateEmail(mail) {
        var re = /\S+@\S+\.\S+/;
        return re.test(mail);
    }
    function validatePassword(password) {
        var RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        return RegExp.test(password);
    }
    const handleSubmit = async () => {
        // e.preventDefault()
        const data = {
            firstName,
            lastName,
            emailAddress: email,
            password: Password
        }
        try {
            await axios.post(`${serverAPI}/addCustomer`, data).then((res) => {
                console.log(res);
                if (res.data.statusMessage) {
                    setSuccess(true);
                    setErrorMessage(res.data.statusMessage);
                    setState({ ...state, open: true })
                    console.log(data)
                }
            })
        } catch (e) {
            setState({ ...state, open: true })
            setErrorMessage(e.response.data.errorMessages.errorMessage1);
            console.log(e.response.data);
            handleFieldErrors(e.response.data.fieldNames);

        }
        // localStorage.setItem("Auth","Verified")
    }
    const handleClose = () => {
        setState({ ...state, open: false })
    }

    const mapFieldError = {
        "firstName": function () { setErrorFirstName(true) },
        "lastName": function () { setErrorLastName(true) },
        "emailAddress": function () { setErrorEmail(true) },
        "password": function () { setErrorPassword(true) }
    }
    const handleFieldErrors = (e) => {
        let fields = Object.values(e);
        fields.forEach((field) => {
            if (field == "firstName") {
                mapFieldError.firstName()
            }
            if (field == "lastName") {
                mapFieldError.lastName();
            }
            if (field == "emailAddress") {
                mapFieldError.emailAddress();
            }
            if (field == "password") {
                mapFieldError.password();
            }
        })
        //    console.log(fields)
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const inputAdornment = PasswordFocused ? {
        startAdornment: (
            <InputAdornment position="end" style={{ position: "absolute", right: 15 }}>
                <i className="material-icons"><IconButton
                    onClick={handleClickShowPassword}
                    edge="end"
                >
                    {ShowPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton></i>
            </InputAdornment>
        ),
    } : {}

    return (
        <Container>
            <Container component="main" className="SignupBox" maxWidth="xs">
                <Box sx={{
                    // marginTop: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <img src={process.env.PUBLIC_URL + "image.png"} style={{ height: 25, width: 170 }} />
                </Box>
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    // focused
                                    autoComplete="given-name"
                                    name="firstName"
                                    error={ErrorfirstName}
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    onBlur={() => { setErrorFirstName(false) }}
                                    onChange={t => setFirstName(t.target.value)}

                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    error={ErrorlastName}
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    onBlur={() => { setErrorLastName(false) }}
                                    onChange={t => setLastName(t.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={ErrorEmail}
                                    required
                                    fullWidth
                                    filled
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    onBlur={() => { setErrorEmail(false) }}
                                    onChange={t => setEmail(t.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} style={{ display: "flex" }}>
                                <TextField
                                    // focused
                                    error={ErrorPassword}
                                    required
                                    fullWidth
                                    name="Password"
                                    label="Password"
                                    type={ShowPassword ? "text" : "password"}
                                    id="password"

                                    onChange={(t) => {
                                        setPassword(t.target.value)
                                        setPasswordFocused(true)
                                    }}
                                    onBlur={() => {
                                        // setPasswordFocused(false)
                                        setErrorPassword(false)
                                    }}
                                    InputProps={inputAdornment}

                                />
                            </Grid>
                        </Grid>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={(e) => handleSubmit(e)}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
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
                            background: Success ? "green" : "#ff3333"
                        }
                    }
                    }
                />
            </Container>
        </Container>
    )
}

export default Signup;
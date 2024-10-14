import React, { useEffect, useRef, useState } from 'react';
import { Box, FormControl, InputLabel, OutlinedInput, Button } from '@mui/material';
// import { InputAdornment } from '@mui/material';
// import Countdown,{CountdownApi} from 'react-countdown';
// import { authContext } from '../Routes/AuthenticationRoutes';
import axios from 'axios';
import { serverAPI } from '../Utils/Server';
import ReactLoading from 'react-loading';
import NotifyBar from '../Components/Notification Components/NotifyBar';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
    const Ref = useRef(null);

    // The state for our timer
    const navigate = useNavigate();
    const [timer, setTimer] = useState("00:00");

    const getTimeRemaining = (e) => {
        const total =
            Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor(
            (total / 1000 / 60) % 60
        );
        return {
            total,
            minutes,
            seconds,
        };
    };

    const startTimer = (e) => {
        let { total, minutes, seconds } =
            getTimeRemaining(e);
        if (total >= 0) {
            setTimer(
                (minutes > 9
                    ? minutes
                    : "0" + minutes) +
                ":" +
                (seconds > 9 ? seconds : "0" + seconds)
            );
        }
        if (total == 0) {
            setResent(false);
        }
    };

    const clearTimer = (e) => {
        setTimer("01:00");

        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000);
        Ref.current = id;
    };

    const getDeadTime = () => {
        let deadline = new Date();

        deadline.setSeconds(deadline.getSeconds() + 60);
        return deadline;
    };

    useEffect(() => {
        clearTimer(getDeadTime());
    }, []);

    const resentCode = () => {
        setResent(true);
        clearTimer(getDeadTime());
    }
    function replaceSlicedWithAsterisks(str, start, end) {
        const slice = str.slice(start, end);
        const asterisks = "*".repeat(slice.length);
        return str.substring(0, start) + asterisks + str.substring(end);
    }
    // const{mailAddress}=useContext(authContext);
    const [mailAddress, setMailAddress] = useState(sessionStorage.getItem("email"));
    const [croppedMail, setCroppedMail] = useState("");
    const [resent, setResent] = useState(true);
    useEffect(() => {
        //  console.log(mailAddress)
        let length = mailAddress.length / 2;
        setCroppedMail(replaceSlicedWithAsterisks(mailAddress, 4, length));
        //  setResent(  );
    }, [])


    const [error, setError] = useState(false);
    const [notifyStatus, setNotifyStatus] = useState(false);
    const [notifyMessage, setNotifyMessage] = useState("");
    const [securityCode, setSecurityCode] = useState("");
    const [loading, setLoading] = useState(false);
    function spinnerLoading(error, message, resent) {
        setLoading(true)
        setTimeout(() => {
            //   navigate("/reset-password")
            setLoading(false);
            setNotifyStatus(true);
            setError(error);
            setNotifyMessage(message);
            if (message == "Security code has been successfully verified.") {
                navigate("/new-password-page")
            }
            if (resent) {
                resentCode();
            }
        }, 2000)
    }

    async function resetPassword() {
        const data = {
            emailAddress: mailAddress,
            securityCode: securityCode,
        }
        await axios.post(`${serverAPI}/verify-security-code`, data).then((res) => {
            setLoading(true);
            if (res.data.statusCode === 200) {
                sessionStorage.setItem('securityCode', securityCode);
                spinnerLoading(false, "Security code has been successfully verified.", false)

            } else {
                spinnerLoading(true, "Invalid security code, please try again", false)
            }
        }).catch((err) => {
            console.log(err);
            setLoading(false);
            setNotifyStatus(true);
            setError(true);
            setNotifyMessage("Something went wrong, please try again");
        });
    }
    async function generateSecurityCode() {
        setLoading(true);
        await axios.post(`${serverAPI}/sent-email/${mailAddress}`).then((res) => {
            console.log(res.data);
            if (res.data.statusCode === 200) {
                spinnerLoading(false, "Code transmission successful.", true)
            } else {
                spinnerLoading(true, "Failed to send security code, please try again later", false)
            }
        }).catch((err) => {
            console.error(err)
            setError(true);
            setNotifyMessage("Something went wrong, please try again later");
            setLoading(false);
        })
    }
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            {loading ? <div style={{ position: "absolute", top: 250, display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "60vh" }}>
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
            <Box style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: 400, textAlign: "center" }}>
                <h2 style={{ fontWeight: "normal" }}>Enter Your Security Code</h2>
                <h4 style={{ fontWeight: "normal" }}>Enter the security code we sent to the email address <span style={{ fontWeight: "bold" }}>{croppedMail}</span></h4>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: "column", flexWrap: 'wrap' }}>
                <FormControl fullWidth sx={{ m: 1, width: '50ch' }}>
                    <InputLabel htmlFor="outlined-adornment-amount">Enter the security code</InputLabel>
                    <OutlinedInput
                        onChange={(e) => { setSecurityCode(e.target.value) }}
                        id="outlined-adornment-amount"
                        label="Enter the security code"
                    />
                </FormControl>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <Button variant="contained" fullWidth sx={{ m: 1 }} onClick={() => { resetPassword() }}>SUBMIT</Button>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontWeight: "normal" }}>Didn't received any code?</span>
                    {!resent ? <span style={{ cursor: "pointer", marginLeft: 3 }} onClick={() => { generateSecurityCode() }}> resent code</span> : <span style={{ cursor: "pointer", marginLeft: 3 }} >{timer}</span>}

                </Box>
            </Box>
            <NotifyBar error={error} setError={setError} notifyMessage={notifyMessage} notifyStatus={notifyStatus} setNotifyStatus={setNotifyStatus} />
        </div>
    )
}

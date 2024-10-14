import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NetworkPingIcon from '@mui/icons-material/NetworkPing';
import RepeatIcon from '@mui/icons-material/Repeat';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useMsal } from '@azure/msal-react';
import { googleLogout } from '@react-oauth/google';
import Tooltip from '@mui/material/Tooltip';

export default function UserPortal(props) {
  const { instance } = useMsal();
  const navigate = useNavigate();
  const [isComponentsOpen, setIsComponentsOpen] = useState(false);
  const [isCMDBOpen, setIsCMDBOpen] = useState(false);
  const [OverClicked, setOnoverviewClicked] = useState(false);
  const [onIncidentClicked, setIncidentClicked] = useState(false);
  const [cmdbClicked, setcmdbClicked] = useState(false);
  const [requestClicked, setrequestClicked] = useState(false);
  const [changeClicked, setChangeClicked] = useState(false);
  const [knowledgeClicked, setknowledgeClicked] = useState(false);
  const [CMDBManagerClicked, setCMDBManagerClicked] = useState(false);
  const [GenerateTokenClicked, setGenerateTokenClicked] = useState(false);
  const [userManagementClicked, setUserManagementClicked] = useState(false);
  const [SuperAdmin, setSuperAdmin] = useState(false);
  const [AuthToken, setAuthToken] = useState();
  const [AdminToken, setAdminToken] = useState();

  const [requestOpen, setRequestOpen] = useState(false);
  const [changeOpen, setChangeOpen] = useState(false);
  const [incidentOpen, setIncidentOpen] = useState(false);


  useEffect(() => {
    setAuthToken(localStorage.getItem('Authentication-Token'))
    setAdminToken(localStorage.getItem('Admin'))
  }, [])

  const handleLogoutRedirect = () => {
    if (!AuthToken) {
      instance.logoutRedirect().catch((error) => console.log(error));
    }
    if (AuthToken) {
      localStorage.removeItem('Authentication-Token');
      localStorage.removeItem('Admin');
      localStorage.removeItem('User');
      googleLogout();
      window.location.replace('/')
    }

  };

  const userEmail = localStorage.getItem("userEmail");

  const toggleSelect = (parameter) => {
    const stateSetters = {
      Incident: setIncidentClicked,
      Request: setrequestClicked,
      Knowledge: setknowledgeClicked,
    };

    Object.values(stateSetters).forEach(setter => setter(false));

    if (stateSetters[parameter]) {
      stateSetters[parameter](true);
    }
  }

  const [openDropdown, setOpenDropdown] = useState(false);
  const [requestDropDown, setRequestDropDown] = useState(false);
  const [endUser, setEndUser] = useState(false);


  const toggleComponents = () => {
    setIsComponentsOpen(!isComponentsOpen);
  };

  useEffect(() => {
    let authAdmin = localStorage.getItem("Admin");
    let endUser = localStorage.getItem("User");
    if (authAdmin == "SuperAdmin") {
      setSuperAdmin(true);
    }
    if (endUser == "employee") {
      setEndUser(true);
    }
  }, [])
  console.log(props.bg, 'bg.outerBodyColor');
  return (
    <div className="sidebar " style={{ width: props.width, background: props.bg }}>
      {/* {props.width==300? */}
      {/* <Scrollbars style={{ width:255,height:450,zIndex:100}} autoHide> */}
      <ul className="sidebar-menu">

        {/* <li className="sidebar-item">
        {props.drawer?<img src={process.env.PUBLIC_URL + "image.png"} style={{ height: 20, width: 120 }} />:null}
        </li> */}
        {/* <li className="sidebar-item">
          {props.drawer ?
            <div style={{ height: 100, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
              <img alt="logo" src={"https://res.cloudinary.com/doiff4svr/image/upload/v1723208791/logo_yjmays.png"} style={{ height: 120, width: 170 }} />
              <p style={{ fontSize: 28, color: "white", marginTop: 36 }} className='company-profile'>
                Desk
              </p></div> : null}
        </li> */}
        {props.drawer ? <hr className='sidenav-hr' /> : null}
        <div className={!OverClicked || !props.drawer ? 'sidebar-hover-container' : "sidebar-hover-container-select"} onClick={() => { toggleSelect("Overview"); setIsComponentsOpen(false); setIsCMDBOpen(false) }}>
          <li style={style.SideNavIconDecorAfter}>
            <Link style={{ textDecoration: "none" }} to="/">
              <div className="sidebar-item-decor sidebar-hover-container" style={{ width: "89%" }}>
                <Tooltip title="Home">
                  <HomeOutlinedIcon className={props.drawer ? "fontStyle" : "fontStyle-select"} />
                </Tooltip>
                {props.drawer ? <p style={style.FontSize} className="fontStyle">Dashboards</p> : null}
              </div>
            </Link>
          </li>
        </div>
        <li style={props.drawer ? style.SideNavIconDecor : style.SideNavIconDecorAfter} onClick={() => { toggleSelect("Incident"); setIsComponentsOpen(false); setIsCMDBOpen(false); setIncidentOpen(!incidentOpen); setChangeOpen(false) }}>
          <Link style={{ textDecoration: "none" }}>
            <div className={!onIncidentClicked || !props.drawer ? "sidebar-item-decor sidebar-hover-container" : "sidebar-item-decor sidebar-hover-container-select"} style={{ width: "89%" }}>
              <Tooltip title="Incident Management">
                <NetworkPingIcon className={props.drawer ? "fontStyle" : "fontStyle-select"} />
              </Tooltip>
              {props.drawer ? <p style={style.FontSize} className="fontStyle"  >Report an issue</p> : null}
              {!incidentOpen ?
                props.drawer && <ArrowForwardIosIcon style={style.FontSize} className="fontStyle" onClick={() => {
                  setIncidentOpen(true);
                }} /> : props.drawer && <KeyboardArrowDownIcon className="fontStyle" onClick={() => {
                  setIncidentOpen(false);
                }} />}
            </div>
          </Link>
          {incidentOpen ? <div>
            <ol className={`dropdown ${incidentOpen ? 'open' : ''}`} >
              <li className="dropdown-item" style={style.listFontSize} onClick={() => { navigate("/create-incident") }}>
                {/* <span  className="fontStyle"></span> */}
                <span style={{ color: "white" }}>Create Incident</span>
              </li>
              <li className="dropdown-item" style={style.listFontSize} onClick={() => { navigate("/request-status/incident") }}>
                <spna style={{ color: "white" }}>Incident Status</spna>
              </li>
              {/* <li className="dropdown-item">
                <Link onClick={() => { window.location.href = "/create-incident" }}>
                  <p style={style.listFontSize} className="fontStyle">Create Incident</p>
                </Link>
              </li>
              <li className="dropdown-item">
                <Link onClick={() => { window.location.href = "/request-status/incident" }}>
                  <p style={style.listFontSize} className="fontStyle">Incident Status</p>
                </Link>
              </li> */}
            </ol>
          </div> : null}

        </li>
        <li style={props.drawer ? style.SideNavIconDecor : style.SideNavIconDecorAfter} onClick={() => { toggleSelect("Request"); setIsComponentsOpen(false); setIsCMDBOpen(false); setRequestOpen(!requestOpen); setChangeOpen(false) }}>
          <Link style={{ textDecoration: "none" }}>
            <div className={!requestClicked || !props.drawer ? "sidebar-item-decor sidebar-hover-container" : "sidebar-item-decor sidebar-hover-container-select"} style={{ width: "103%" }}>
              <Tooltip title="Request Management">
                <RepeatIcon className={props.drawer ? "fontStyle" : "fontStyle-select"} />
              </Tooltip>
              {props.drawer ? <p style={style.FontSize} className="fontStyle">Request Something</p> : null}
              {!requestOpen ?
                props.drawer && <ArrowForwardIosIcon style={style.FontSize} className="fontStyle" onClick={() => {
                  setRequestOpen(true);
                }} /> : props.drawer && <KeyboardArrowDownIcon className="fontStyle" onClick={() => {
                  setRequestOpen(false);
                }} />}
            </div>
          </Link>

          {props.drawer ?
            <ol className={`dropdown ${requestOpen ? 'open' : ''}`} >
              <li className="dropdown-item" style={style.listFontSize} href={"/request_service"}>
                {/* <span  className="fontStyle"></span> */}
                <span style={{ color: "white" }}>Request Service</span>
              </li>
              <li className="dropdown-item" style={style.listFontSize} href={"/request-status/request"}>
                <spna style={{ color: "white" }}>Request Statuss</spna>
              </li>
            </ol> : null}
        </li>
        <div className={!knowledgeClicked || !props.drawer ? 'sidebar-hover-container' : "sidebar-hover-container-select"} onClick={() => { toggleSelect("Knowledge"); setIsComponentsOpen(false); setIsCMDBOpen(false); setRequestOpen(false) }}>
          <li className="SideNavIconDecorAfter">
            <Link style={{ textDecoration: "none" }} to="/Knowledge-article">
              {props.drawer
                ? <div className="sidebar-item-decor sidebar-hover-container" style={{ width: "89%" }}>
                  <MenuBookIcon className={props.drawer ? "fontStyle" : "fontStyle-select"} />
                  <p style={style.FontSize} className="fontStyle">Knowledge Base</p>
                </div>
                : <div className='sidebar-item-decor sidebar-hover-container' style={{ width: "89%" }}>
                  <Tooltip title="/Knowledge article">
                    <MenuBookIcon className="fontStyle" style={{ marginTop: -30 }} />
                  </Tooltip>
                  {/* <p style={{fontSize:20}}>Knowledge article</p> */}
                </div>}
            </Link>
          </li>
        </div>

      </ul>
      {/* </Scrollbars> */}


      {/* {props.drawer ?
        <div className={SuperAdmin ? "profile-container-admin" : "profile-container"}>
          
          
        </div> : <div>
        </div>
      } */}

    </div>
  );
};

const style = {
  SideNavIconDecor: {
    marginTop: -15
  },
  SideNavIconDecorAfter: {
    marginTop: 25
  },
  SideBarNormal: {
    width: "95%",
    marginTop: 15
  },
  SideBarExtra: {
    width: "109%"
  },
  FontSize: {
    fontSize: 16
  },
  userSectionStyle: {
    marginLeft: 25,
    width: 150
  },
  listFontSize: {
    fontSize: 15
  }

}

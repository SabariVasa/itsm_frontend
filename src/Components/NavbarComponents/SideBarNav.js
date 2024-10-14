import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import './Sidebar.css'; // Import your custom CSS
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NetworkPingIcon from '@mui/icons-material/NetworkPing';
import StorageIcon from '@mui/icons-material/Storage';
import RepeatIcon from '@mui/icons-material/Repeat';
// import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LogoutIcon from '@mui/icons-material/Logout';
// import { Scrollbars } from 'react-custom-scrollbars';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import { useMsal } from '@azure/msal-react';
import { googleLogout } from '@react-oauth/google';
import TokenIcon from '@mui/icons-material/Token';
import Tooltip from '@mui/material/Tooltip';
// import ReactTextFit from 'react-textfit';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
// import { Dropdown } from '@mui/base';
import GroupIcon from '@mui/icons-material/Group';


const SideBarNav = (props) => {
  const { instance } = useMsal();
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

  const [requestOpen, setRequestOpen] = useState();
  const [changeOpen, setChangeOpen] = useState();


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
      Overview: setOnoverviewClicked,
      Incident: setIncidentClicked,
      CMDB: setcmdbClicked,
      Request: setrequestClicked,
      Knowledge: setknowledgeClicked,
      CMDBManager: setCMDBManagerClicked,
      GenerateToken: setGenerateTokenClicked,
      Change: setChangeClicked,
      userManagement: setUserManagementClicked,
    };

    Object.values(stateSetters).forEach(setter => setter(false));

    if (stateSetters[parameter]) {
      stateSetters[parameter](true);
    }

  }

  const [openDropdown, setOpenDropdown] = useState(false);
  const [requestDropDown, setRequestDropDown] = useState(false);
  const [endUser, setEndUser] = useState(false);
  const [incidentOpen, setIncidentOpen] = useState(false);

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
  return (
    <div className="sidebar " style={{ width: props.width }} >
      {/* {props.width==300? */}
      {/* <Scrollbars style={{ width:255,height:450,zIndex:100}} autoHide> */}
      <ul className="sidebar-menu">

        {/* <li className="sidebar-item">
        {props.drawer?<img src={process.env.PUBLIC_URL + "image.png"} style={{ height: 20, width: 120 }} />:null}
        </li> */}
        <li className="sidebar-item">
          {props.drawer ?
            <div style={{ height: 100, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
              <img alt="logo" src={"https://res.cloudinary.com/doiff4svr/image/upload/v1723208791/logo_yjmays.png"} style={{ height: 120, width: 170 }} />
              <p style={{ fontSize: 28, color: "white", marginTop: 36 }} className='company-profile'>
                Desk
              </p></div> : null}
        </li>
        {props.drawer ? <hr className='sidenav-hr' /> : null}
        <div className={!OverClicked || !props.drawer ? 'sidebar-hover-container' : "sidebar-hover-container-select"} onClick={() => { toggleSelect("Overview"); setIsComponentsOpen(false); setIsCMDBOpen(false) }}>
          <li className="sidebar-item">
            <Link to="/">
              <div className="sidebar-item-decor" style={{ width: "68%" }}>
                <Tooltip title="Home">
                  <HomeOutlinedIcon className="fontStyle" />
                </Tooltip>
                {props.drawer ? <p style={style.FontSize} className="fontStyle">Dashboards</p> : null}
              </div>
            </Link>
          </li>
        </div>
        <li style={props.drawer ? style.SideNavIconDecor : style.SideNavIconDecorAfter} onClick={() => { toggleSelect("Incident"); setIsComponentsOpen(false); setIsCMDBOpen(false); setIncidentOpen(!incidentOpen); setChangeOpen(false) }}>
          <Link style={{ textDecoration: "none" }}>
            <div className={!onIncidentClicked || !props.drawer ? "sidebar-item-decor sidebar-hover-container" : "sidebar-item-decor sidebar-hover-container-select"} style={{ width: "108%" }}>
              <Tooltip title="Incident Management">
                <NetworkPingIcon className={props.drawer ? "fontStyle" : "fontStyle-select"} />
              </Tooltip>
              {props.drawer ? <p style={style.FontSize} className="fontStyle"  >Incident Management</p> : null}
              {!isComponentsOpen ?
                props.drawer && <ArrowForwardIosIcon style={style.FontSize} className="fontStyle" onClick={() => {
                  setIsComponentsOpen(true);
                }} /> : props.drawer && <KeyboardArrowDownIcon className="fontStyle" onClick={() => {
                  setIsComponentsOpen(false);
                }} />}
            </div>
          </Link>
          {openDropdown ? <div className='dropdownGlassBox' onMouseOut={() => setOpenDropdown(false)} onMouseOver={() => setOpenDropdown(true)}>
            <ol className={`floating-drop-down ${openDropdown ? 'open' : ''}`} >
              <li className="dropdown-item">
                <Link onClick={() => { window.location.href = "/Create-Incident" }}>
                  <p style={style.listFontSize} className="fontStyle">Create New Incident</p>
                </Link>
              </li>
              <li className="dropdown-item">
                <Link onClick={() => { window.location.href = "/Open-Incidents/Open" }}>
                  <p style={style.listFontSize} className="fontStyle">Open Incident</p>
                </Link>
              </li>
              <li className="dropdown-item">
                <Link onClick={() => { window.location.href = "/Assigned-to-me/assignedToMe" }}>
                  <p style={style.listFontSize} className="fontStyle">Assigned-to-me</p>
                </Link>
              </li>
              <li className="dropdown-item">
                <Link onClick={() => { window.location.href = "/All" }}>
                  <p style={style.listFontSize} className="fontStyle">All Incidents</p>
                </Link>
              </li>
            </ol>
          </div> : null}

        </li>
        {/* <hr /> */}
        {!endUser ?
          <div onClick={() => { toggleSelect("CMDB"); setIsComponentsOpen(false); setIsCMDBOpen(false) }} className={!cmdbClicked || !props.drawer ? 'sidebar-hover-container' : "sidebar-hover-container-select"} >
            <li className="sidebar-item">
              <Link to="/Configuration-Database">
                {props.drawer ? <div className="sidebar-item-decor" style={{ marginTop: -15, width: "50%" }}>
                  <StorageIcon className="fontStyle" />
                  <p style={style.FontSize} className="fontStyle" >CMDB</p>
                </div> : <div className="sidebar-item-decor" style={{ marginTop: 10, width: "45%" }}>
                  <Tooltip title="CMDB">
                    <StorageIcon className="fontStyle" style={{ marginTop: -20 }} href="/Configuration-Database" />
                  </Tooltip>
                  {/* <p style={{fontSize:20}}>CMDB</p> */}
                </div>}
              </Link>
            </li>
          </div> : null}
        {/* <hr /> */}
        <li style={props.drawer ? style.SideNavIconDecor : style.SideNavIconDecorAfter} onClick={() => { toggleSelect("Request"); setIsComponentsOpen(false); setIsCMDBOpen(false); setRequestOpen(!requestOpen); setChangeOpen(false) }}>
          <Link style={{ textDecoration: "none" }}>
            <div className={!requestClicked || !props.drawer ? "sidebar-item-decor sidebar-hover-container" : "sidebar-item-decor sidebar-hover-container-select"} style={{ width: "108%" }}>
              <Tooltip title="Incident Management">
                <RepeatIcon className={props.drawer ? "fontStyle" : "fontStyle-select"} />
              </Tooltip>
              {props.drawer ? <p style={style.FontSize} className="fontStyle">Request Management</p> : null}
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
              <li className="dropdown-item">
                <Link onClick={() => { window.location.href = "/request_service/my_requests" }}>
                  <p style={style.listFontSize} className="fontStyle">My Request</p>
                </Link>
              </li>
              <li className="dropdown-item">
                <Link onClick={() => { window.location.href = "/request_service" }}>
                  <p style={style.listFontSize} className="fontStyle">Request Service</p>
                </Link>
              </li>
            </ol> : null}
        </li>
        <li style={props.drawer ? style.SideNavIconDecor : style.SideNavIconDecorAfter} onClick={() => { toggleSelect("Change"); setIsComponentsOpen(false); setIsCMDBOpen(false); setChangeOpen(!changeOpen) }}>
          <Link style={{ textDecoration: "none" }}>
            <div className={!changeClicked || !props.drawer ? "sidebar-item-decor sidebar-hover-container" : "sidebar-item-decor sidebar-hover-container-select"} style={{ width: "108%" }}>
              <Tooltip title="Incident Management">
                <ChangeCircleIcon className={props.drawer ? "fontStyle" : "fontStyle-select"} />
              </Tooltip>
              {props.drawer ? <p style={style.FontSize} className="fontStyle">Change Management</p> : null}
              {!changeOpen ?
                props.drawer && <ArrowForwardIosIcon style={style.FontSize} className="fontStyle" onClick={() => {
                  setChangeOpen(true);
                }} /> : props.drawer && <KeyboardArrowDownIcon className="fontStyle" onClick={() => {
                  setChangeOpen(false);
                }} />}
            </div>
          </Link>

          {props.drawer ?
            <ol className={`dropdown ${changeOpen ? 'open' : ''}`} >
              <li className="dropdown-item">
                <Link onClick={() => { window.location.href = "/change_service/New" }}>
                  <p style={style.listFontSize} className="fontStyle">New Change</p>
                </Link>
              </li>
              <li className="dropdown-item">
                <Link onClick={() => { window.location.href = "/change_service/All" }}>
                  <p style={style.listFontSize} className="fontStyle">All Change</p>
                </Link>
              </li>
            </ol> : null}
        </li>

        {/* <div > */}
        {/* <li className="sidebar-item">
          <Link to="/configuration-management">
          {props.drawer?<div className='sidebar-item-decor sidebar-hover-extracontainer' style={{width:"102%",marginTop:-8,marginLeft:8}}>
          <MiscellaneousServicesIcon  className="fontStyle"/>
            <p style={{fontSize:17}}  className="fontStyle">Configuration Management</p>
          </div>:<div className='sidebar-item-decor sidebar-hover-extracontainer' style={{width:"100%",marginTop:25}}>
          <MiscellaneousServicesIcon  className="fontStyle"/> */}
        {/* <p style={{fontSize:20}}>Configuration Management</p> */}
        {/* </div>}
          </Link>
        </li> */}

        <div className={!knowledgeClicked || !props.drawer ? 'sidebar-hover-container' : "sidebar-hover-container-select"} onClick={() => { toggleSelect("Knowledge"); setIsComponentsOpen(false); setIsCMDBOpen(false) }}>
          <li className="sidebar-item">
            <Link to="/Knowledge-article">
              {props.drawer ? <div className='sidebar-item-decor' style={{ width: "92%", marginTop: -15 }}>
                <MenuBookIcon className="fontStyle" />
                <p style={style.FontSize} className="fontStyle">Knowledge article</p>
              </div> : <div className='sidebar-item-decor' style={{ width: "80%", marginTop: 25 }}>
                <Tooltip title="Knowledge article">
                  <MenuBookIcon className="fontStyle" style={{ marginTop: -30 }} />
                </Tooltip>
                {/* <p style={{fontSize:20}}>Knowledge article</p> */}
              </div>}
            </Link>
          </li>
        </div>
        {props.drawer ? <hr className="sidenav-hr" /> : null}
        {/* {props.drawer?<hr className="sidenav-hr"/>:null} */}
        {SuperAdmin ? <div className={!GenerateTokenClicked || !props.drawer ? 'sidebar-hover-container' : "sidebar-hover-container-select"} onClick={() => { toggleSelect("GenerateToken"); setIsComponentsOpen(false); setIsCMDBOpen(false) }}>
          <li className="sidebar-item">
            <Link to="/AuthTokenGeneration">
              {props.drawer ? <div className='sidebar-item-decor' style={{ width: "85%", marginTop: 15 }}>
                <TokenIcon className="fontStyle" />
                <p style={style.FontSize} className="fontStyle">Generate Token</p>
              </div> : <div className='sidebar-item-decor' >
                <Tooltip title="Generate Token">
                  <TokenIcon className="fontStyle" style={{ marginTop: -30 }} />
                </Tooltip>
                {/* <p style={{fontSize:20}}>Knowledge article</p> */}
              </div>}
            </Link>
          </li>
        </div> : null}
        {SuperAdmin ? <div style={{ marginTop: -15, marginLeft: 10 }} className={!userManagementClicked || !props.drawer ? 'sidebar-hover-container' : "sidebar-hover-container-select"} onClick={() => { toggleSelect("userManagement"); setIsComponentsOpen(false); setIsCMDBOpen(false) }}>
          <li className="sidebar-item">
            <Link to="/user-list">
              {props.drawer ? <div className='sidebar-item-decor' style={{ width: "90%", marginTop: 15 }}>
                <GroupIcon className="fontStyle" />
                <p style={{ ...style.FontSize, ...style.userSectionStyle }} className="fontStyle">User Management</p>

              </div> : <div className='sidebar-item-decor' >
                <Tooltip title="Generate Token">
                  <TokenIcon className="fontStyle" style={{ marginTop: -30 }} />
                </Tooltip>
                {/* <p style={{fontSize:20}}>Knowledge article</p> */}
              </div>}
            </Link>
          </li>
        </div> : null}
        {SuperAdmin ? <div className={!CMDBManagerClicked || !props.drawer ? " sidebar-hover-container" : "sidebar-hover-container-select"} onClick={() => { toggleSelect("CMDBManager"); setIsCMDBOpen(!isCMDBOpen); setIsComponentsOpen(false) }}>
          <li >
            <Link style={{ textDecoration: "none" }}>
              {props.drawer ? <div className='sidebar-item-decor' style={{ width: "102%", marginTop: -15 }}>
                <SettingsApplicationsIcon className="fontStyle" style={{ fontSize: 30 }} />
                <p style={style.FontSize} className="fontStyle">CMDB Manager</p>
                {!isCMDBOpen ?
                  props.drawer && <ArrowForwardIosIcon style={{ fontSize: 17 }} className="fontStyle" onClick={() => {
                    setIsCMDBOpen(true);
                  }} /> : props.drawer && <KeyboardArrowDownIcon className="fontStyle" onClick={() => {
                    setIsCMDBOpen(false);
                  }} />}
              </div> : <div className='sidebar-item-decor' style={{ width: "100%", marginTop: 20 }}>
                <Tooltip title="CMDB Manager">
                  <SettingsApplicationsIcon className="fontStyle" style={{ fontSize: 28, marginleft: -20, marginTop: -30 }} />
                </Tooltip>
                {/* <p style={{fontSize:20}}>Knowledge article</p> */}
              </div>}
            </Link>
            {/* {props.drawer? */}
            <ol className={`dropdown ${isCMDBOpen ? 'open' : ''}`} style={{ marginBottom: 100 }} >
              <li className="dropdown-item" onClick={() => { toggleSelect("CMDBManager"); setIsCMDBOpen(true) }}>
                <Link to={`/Configuration-Item/:${props.drawer}`} >
                  <p style={style.listFontSize} className="fontStyle" >Configuration Item</p>
                </Link>
              </li>
              <li className="dropdown-item" >
                <Link to="/cmdb" onClick={() => { toggleSelect("CMDBManager"); setIsCMDBOpen(true) }}>
                  <p style={style.listFontSize} className="fontStyle" >Class Manager</p>
                </Link>
              </li>
            </ol>
          </li>
        </div> : null}

      </ul>
      {/* </Scrollbars> */}


      {props.drawer ?
        <div className={SuperAdmin ? "profile-container-admin" : "profile-container"}>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", marginTop: 10 }}>
            <Tooltip title="Profile">
              <div style={{ cursor: "pointer" }}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTadSAgMa0Si3aeLKU9sPJ24i1IZX3nKOVLnA&s" height="40px" width="40px" alt="profile-pic" style={{ borderRadius: 10, marginTop: 10, marginLeft: 5 }} />
              </div>
            </Tooltip>
            <div style={{ width: "100%", textOverflow: "ellipses", marginLeft: 15 }}>
              {/* <ReactTextFit minFontSize={50}>Mahathir Mohamed</ReactTextFit> */}
              <p style={{ color: "black" }}>{localStorage.getItem("userEmail")}</p>
            </div>
          </div>
          <div>
            {props.drawer ? <div className='sidebar-item-decor-logout' onClick={() => { handleLogoutRedirect() }} style={{ marginTop: 5 }}>
              <LogoutIcon style={{ color: "#ff3333" }} />
              <p style={{ fontSize: 18, color: "red" }} >Logout</p>
            </div> : <div className='sidebar-item-decor-logout'>
              <LogoutIcon style={{ color: "red" }} onClick={() => { localStorage.removeItem("Authentication-Token"); window.location.replace("/"); localStorage.removeItem("userEmail"); localStorage.removeItem("Admin") }} />
            </div>}
          </div>
        </div> : <div>
          <div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTadSAgMa0Si3aeLKU9sPJ24i1IZX3nKOVLnA&s" height="30px" width="30px" alt="profile-pic" style={{ borderRadius: 10, marginBottom: 30 }} />
          </div>
          <div className='sidebar-item-decor'>
            <Tooltip title="logout">
              <LogoutIcon style={{ color: "red", fontSize: 25 }} onClick={() => { localStorage.removeItem("Authentication-Token"); window.location.replace("/"); localStorage.removeItem("userEmail"); localStorage.removeItem("Admin") }} />
            </Tooltip>
          </div>
        </div>
      }

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
    marginTop: -15
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
export default SideBarNav;

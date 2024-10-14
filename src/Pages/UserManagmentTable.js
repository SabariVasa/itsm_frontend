import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Box, Grid, InputBase, Paper, IconButton, } from '@mui/material';
import Avatar from '@mui/material/Avatar';
// import faker from 'faker';
// import { faker } from '@faker-js/faker';
import ReactLoading from 'react-loading';
import axios from 'axios';
import { serverAPI } from '../Utils/Server';
// import SearchTextField from '../Components/HelperComponents/SearchTextField';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector, useDispatch } from 'react-redux';
import { setEndUserIncident } from '../Redux state management/Redux Slices/IncidentRequestSlice';

export default function UserManagmentTable(props) {


  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);

  const dispatch = useDispatch();
  const endUserIncident = useSelector((state) => state.incidentReducers.endUserIncident);

  // Handle search input change
  const handleSearchQuery = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchQuery(value);
    console.log(userData)
    // // Filter data based on search input
    const filtered = userData.filter(row =>
      row.firstName.toLowerCase().includes(value) || row.emailAddress.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
    // console.log(event.target.value)
  };

  // Handle row selection
  const handleRowSelect = (params) => {
    dispatch(setEndUserIncident({
      Email: params.row.emailAddress // Merge only the field that was clicked
    }));
    props.handleClose();
    console.log(endUserIncident);
  };
  const columns = [
    {
      field: 'ProfilePicture', headerName: 'Profile', width: 100, renderCell: (params) =>
        <Avatar alt="Remy Sharp" src={params.row.profileImage} />
    },
    { field: 'firstName', headerName: 'FirstName', width: 150 },
    { field: 'lastName', headerName: 'LastName', width: 150 },
    { field: 'customerId', headerName: 'Customer Id', width: 150 },
    {
      field: 'loggedInStatus', headerName: 'Logged-in Status', width: 150, renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{
            fontSize: 50,
            alignSelf: "center",
            marginTop: -30,
            color: params.value === 'Online' ? 'green' : 'red'
          }}>.</span>
          <span style={{ marginLeft: 5 }}>{params.value}</span>
        </div>
      ),
    },
    { field: 'domain', headerName: 'Domain', width: 200 },
    { field: 'emailAddress', headerName: 'Email', width: 200 },
    { field: 'organization', headerName: 'Organization', width: 200 },
  ];

  // const dummyData = Array.from({ length: 15 }, (_, index) => ({
  //   id: index + 1,
  //   profileImage: faker.image.avatar(),
  //   firstName: faker.name.firstName(),
  //   lastName: faker.name.lastName(),
  //   loggedInStatus: faker.datatype.boolean() ? 'Online' : 'Offline',
  //   domain: faker.internet.domainName(),
  //   email: faker.internet.email(),
  //   organization: faker.company.name()
  // }));
  const [loading, setLoading] = useState(false);
  function spinnerLoading(message) {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000)
  }
  useEffect(() => {
    fetchAllUsers();
    spinnerLoading();
  }, [])

  const rows = [
    { id: 1, profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS785biEGWYfQ3kCbvts_QRuNPn7IJpvovN4A&s", firstName: 'Mahathir', lastName: 'Mohamed', loggedInStatus: 'Online', domain: 'Network Security Engineer', email: 'mahathirmohamed@teksiblegroup.com', organization: 'Teksible IT Solution' },
    { id: 2, profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqkUYrITWyI8OhPNDHoCDUjGjhg8w10_HRqg&s', firstName: 'Jane', lastName: 'Smith', loggedInStatus: 'Offline', domain: 'example.com', email: 'janesmith@example.com', organization: 'Company B' },
    // Add more rows as needed
  ];
  const [userData, setUserData] = useState([]);
  async function fetchAllUsers() {
    await axios.get(`${serverAPI}/get-all-users`).then((res) => {
      console.log(res)
      if (res.data) {
        setUserData(res.data);
        spinnerLoading();
        console.log(userData)
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "Center", height: 500, width: '100%' }}>
      {loading ? <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "60vh" }}>
        <ReactLoading type={"bars"} color={"#ff751a"} />
      </div> : null}
      {!loading ?
        <Box style={{ width: "98%", height: 500, marginTop: 50 }}>
          <Grid container style={{ width: "80%" }}>
            <Grid item xs={12}>
              <Paper
                component="form"
                variant="outlined"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}

              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder={"Search Users with a full name and Email..."}
                  inputProps={{ 'aria-label': 'search google maps' }}
                  fullWidth
                  value={searchQuery}
                  onChange={(e) => { handleSearchQuery(e) }}
                  rows={rows}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Grid>
          </Grid>
          <DataGrid
            rows={searchQuery ? filteredData : userData}
            getRowId={(row) => row.customerId}
            columns={columns}
            onCellClick={handleRowSelect}
            pageSize={5}
            rowsPerPageOptions={[5, 10]} />
        </Box> : null}
    </div>
  )
}

import React, { useEffect, useState } from "react";
import { resturls } from "../../global/utils/apiurls";
import GlobalService from "../../services/GlobalService";
import { useHistory, useRouteMatch } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Skeleton,
} from '@mui/material';
import UserDetailsAndEdit from "./UserDetailsAndEdit";

export default function UserManagmentTable(props) {
  const history = useHistory();
  const { path } = useRouteMatch();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);

  const getAllUserDetails = () => {
    GlobalService.generalSelect(
      (respdata) => {
        setUsers(respdata);
        setTimeout(() => {
          setLoading(false);
        }, 2000)
      },
      resturls.getUserDetails,
      {},
      'GET'
    );
  };

  useEffect(() => {
    getAllUserDetails();
  }, [isCreateUserOpen]);

  const handleCreateUser = () => {
    setIsCreateUserOpen(!isCreateUserOpen);
  };

  const skeletonRows = users.length;
  return (
    <>
      {isCreateUserOpen ? (
        <UserDetailsAndEdit isCreateUserOpen={setIsCreateUserOpen} />
      ) : (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
            <Button variant="contained" color="primary" onClick={() => history.push(`${path}/createUser`)}>
              Create User
            </Button>
          </Box>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="user table">
              <TableHead>
                <TableRow sx={{ backgroundColor: 'black' }}>
                  {/* <TableCell sx={{ color: 'white' }}>ID</TableCell> */}
                  <TableCell sx={{ color: 'white' }}>First Name</TableCell>
                  <TableCell sx={{ color: 'white' }}>Last Name</TableCell>
                  <TableCell sx={{ color: 'white' }}>Email</TableCell>
                  <TableCell sx={{ color: 'white' }}>Company</TableCell>
                  <TableCell sx={{ color: 'white' }}>Department</TableCell>
                  <TableCell sx={{ color: 'white' }}>Manager</TableCell>
                  <TableCell sx={{ color: 'white' }}>Location</TableCell>
                  <TableCell sx={{ color: 'white' }}>Role</TableCell>
                  <TableCell sx={{ color: 'white' }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading
                  ? Array.from(new Array(skeletonRows)).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton variant="text" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" />
                      </TableCell>
                    </TableRow>
                  ))
                  : users.map((user) => (
                    <TableRow key={user.id} onClick={() => history.push(`${path}/userUpdate/${user.id}`)}>
                      {/* <TableCell>{user.id}</TableCell> */}
                      <TableCell>{user.firstName}</TableCell>
                      <TableCell>{user.lastName}</TableCell>
                      <TableCell>{user.emailAddress}</TableCell>
                      <TableCell>{user.company}</TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>{user.manager}</TableCell>
                      <TableCell>{user.userLocation}</TableCell>
                      <TableCell>{user.userRole}</TableCell>
                      <TableCell>{user.loggedInStatus || "offline"}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
}

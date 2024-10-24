
import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { resturls } from "../../global/utils/apiurls";
import GlobalService from "../../services/GlobalService";
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

export default function GroupManagementDetailsTable(props) {
  const history = useHistory();
  const { path } = useRouteMatch();
  console.log(path, 'path');
  const [group, setGroup] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllGroupDetails = () => {
    setLoading(true);
    GlobalService.generalSelect(
      (respdata) => {
        const { estatus, emessage, data } = respdata;
        if (estatus && emessage) {
          setGroup(data);
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        }
      },
      resturls.getAllGroupDetails,
      {},
      'GET'
    );
  };

  useEffect(() => {
    getAllGroupDetails();
  }, []);

  const handleCreateUser = () => {
    history.push(`${path}/createDep`);
  };

  const skeletonRows = group.length;

  return (
    <div style={{ margin: '2em' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <Button variant="contained" color="primary" onClick={() => history.push(`${path}/createDep`)}>
          Create New Department
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Group Name</TableCell>
              <TableCell>Group Description</TableCell>
              <TableCell>Group Type</TableCell>
              <TableCell>Group Manager</TableCell>
              <TableCell>Group Scope</TableCell>
              <TableCell>User Permission</TableCell>
              <TableCell>Active Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading
              ? Array.from(new Array(skeletonRows)).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                </TableRow>
              ))
              : group.map((group) => (
                <TableRow key={group.id}>
                  <TableCell>{group.groupName}</TableCell>
                  <TableCell>{group.groupDescription}</TableCell>
                  <TableCell>{group.groupType}</TableCell>
                  <TableCell>{group.groupManager}</TableCell>
                  <TableCell>{group.groupScope}</TableCell>
                  <TableCell>{group.userPermission}</TableCell>
                  <TableCell>{group.activeStatus}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

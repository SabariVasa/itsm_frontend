import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import GlobalService from '../../services/GlobalService';
import { useTheme } from "../../global/commonComponents/ThemeContext";
import { resturls } from '../../global/utils/apiurls';


export default function IncidentTable(props) {
  const { state } = props
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleCellClick = (params) => {
    console.log(params);
    navigate(`/IncidentEditPage/${params}`);
  };

  const [IncidentData, setIncidentData] = React.useState([]);


  const fetchAllDocuments = async () => {
    // await axios.get(`${serverAPI}/allIncident`).then((res) => {
    //   console.log(res.data)
    //   setIncidentData(res.data);
    // }).then((err) => {
    //   console.log(err);
    // })
    GlobalService.generalSelect(
      (respdata) => {
        console.log(respdata, 'allIncident');
        setIncidentData(respdata);
      }, `${resturls.allIncident}`, {}, 'GET',
    );
  }
  const fetchOpenDocuments = async () => {
    GlobalService.generalSelect(
      (respdata) => {
        console.log(respdata, 'getOpenIncident');
        setIncidentData(respdata);
      }, `${resturls.getOpenIncident}`, {}, 'GET',
    );
  }
  const fetchAssignedDocuments = async () => {
    GlobalService.generalSelect(
      (respdata) => {
        console.log(respdata, 'getIncidentByAssignedTo');
        setIncidentData(respdata);
      }, `${resturls.getIncidentByAssignedTo}${localStorage.getItem("userName")}`, {}, 'GET',
    );
  }

  React.useEffect(() => {
    if (state === "assignedToMe") {
      fetchAssignedDocuments();
    } else if (state === "Open") {
      fetchOpenDocuments();
    } else if (state === "") {
      fetchAllDocuments()
    }
  }, [state])

  console.log(IncidentData, 'IncidentData');

  return (
    <div style={{ height: "95%", marginLeft: 30, marginTop: 20, width: '96%', overflowXY: "auto" }}>
      <h3>Item Requirement List</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="Incident Table">
          <TableHead>
            <TableRow sx={{ background: theme.outerBodyColor, color: 'white' }}>
              <TableCell sx={{ color: 'white', whiteSpace: 'nowrap' }}>Incident ID</TableCell>
              <TableCell sx={{ color: 'white', whiteSpace: 'nowrap' }}>User Incident ID</TableCell>
              <TableCell sx={{ color: 'white', whiteSpace: 'nowrap' }}>Channel</TableCell>
              <TableCell sx={{ color: 'white', whiteSpace: 'nowrap' }}>State</TableCell>
              <TableCell sx={{ color: 'white', whiteSpace: 'nowrap' }}>Caller</TableCell>
              <TableCell sx={{ color: 'white', whiteSpace: 'nowrap' }}>Category</TableCell>
              <TableCell sx={{ color: 'white', whiteSpace: 'nowrap' }}>Impact</TableCell>
              <TableCell sx={{ color: 'white', whiteSpace: 'nowrap' }}>Urgency</TableCell>
              <TableCell sx={{ color: 'white', whiteSpace: 'nowrap' }}>Assignment</TableCell>
              <TableCell sx={{ color: 'white', whiteSpace: 'nowrap' }}>Assignment To</TableCell>
              <TableCell sx={{ color: 'white', whiteSpace: 'nowrap' }}>Opened Date</TableCell>
              <TableCell sx={{ color: 'white', whiteSpace: 'nowrap' }}>Updated Date</TableCell>
              <TableCell sx={{ color: 'white', whiteSpace: 'nowrap' }}>Short Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {IncidentData.length > 0 ? (
              IncidentData?.map((incident, index) => (
                <TableRow key={index}>
                  <TableCell onClick={() => handleCellClick(incident.incidentId)}>{incident.incidentId}</TableCell>
                  <TableCell>{incident.userIncidentId || 'N/A'}</TableCell>
                  <TableCell>{incident.channel || 'N/A'}</TableCell>
                  <TableCell>{incident.state}</TableCell>
                  <TableCell>{incident.caller || 'N/A'}</TableCell>
                  <TableCell>{incident.category || 'N/A'}</TableCell>
                  <TableCell>{incident.impact}</TableCell>
                  <TableCell>{incident.urgency}</TableCell>
                  <TableCell>{incident.assignment || 'N/A'}</TableCell>
                  <TableCell>{incident.assignmentTo || 'N/A'}</TableCell>
                  <TableCell>{incident.openedDate}</TableCell>
                  <TableCell>{incident.updatedDate}</TableCell>
                  <TableCell>{incident.shortDescription}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>No Incident Records</TableRow>
            )}

          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

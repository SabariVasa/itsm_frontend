// import { Box, Button } from "@mui/material";
// import React from "react";

// export default function OrganizationManagementMainPanel(props) {
//     return (
//         <div>
//             <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
//                 <Button variant="contained" color="primary" onClick={() => history.push(`${path}/createUser`)}>
//                     Create Organization
//                 </Button>
//             </Box>
//         </div>
//     );
// };
import React from "react";
// import UserManagmentTable from "./UserManagmentTable";
import { Route, Switch, useRouteMatch } from "react-router-dom";
// import UserDetailsAndEdit from "./UserDetailsAndEdit";
// import styles from "./UserManagement.module.scss"
import OrganizationManagementTable from "./OrganizationManagementTable";

export default function OrganizationManagementMainPanel(props) {
    const { path } = useRouteMatch();
    return (
        <div style={{ margin: '3em' }}>
            <Switch>
                {/* <Route path="/superadmin/createUser" component={(props) => <UserDetailsAndEdit {...props} />} />
                <Route path="/superadmin/userUpdate/:user_id" component={(props) => <UserDetailsAndEdit {...props} />} /> */}
                <Route path={`${path}`} component={(props) => <OrganizationManagementTable {...props} />} />

            </Switch>
        </div>
    );
}
import React from "react";
import UserManagmentTable from "./UserManagmentTable";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import UserDetailsAndEdit from "./UserDetailsAndEdit";
import styles from "./UserManagement.module.scss"

function UserManagmentMainPanel() {
    const { path } = useRouteMatch();
    return (
        <div className={styles.userManagementMainPanel}>
            <Switch>
                <Route path="/superadmin/createUser" component={(props) => <UserDetailsAndEdit {...props} />} />
                <Route path="/superadmin/userUpdate/:user_id" component={(props) => <UserDetailsAndEdit {...props} />} />
                <Route path={`${path}`} component={(props) => <UserManagmentTable {...props} />} />
                {/* UserManagmentTable */}
            </Switch>
            {/* <UserManagmentTable /> */}
            {/* <UserDetailsAndEdit/> */}
        </div>
    );
}
export default UserManagmentMainPanel


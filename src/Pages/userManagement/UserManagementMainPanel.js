import React from "react";
import UserManagmentTable from "../UserManagmentTable";
import UserDetailsAndEdit from "../../Components/User Management/UserDetailsAndEdit";
import styles from "./UserManagement.module.scss"

function UserManagmentMainPanel() {
    return (
        <div className={styles.userManagementMainPanel}>
            <UserManagmentTable />
            {/* <UserDetailsAndEdit/> */}
        </div>
    );
}
export default UserManagmentMainPanel
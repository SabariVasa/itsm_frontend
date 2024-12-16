import React from "react";
import { BrowserRouter as Router, Route, Switch, useRouteMatch } from 'react-router-dom';
import CreateGroupForm from "./CreateGroupForm";
import ShowSingleGroupDetailsAndEdit from "./ShowSingleGroupDetailsAndEdit";
import GroupManagementDetailsTable from "./GroupManagementDetailsTable";

function GroupManagmentMainPanel() {
    const { path } = useRouteMatch();
    return (
        <div style={{ margin: '2em' }}>
            <>
                <Switch>
                    <Route path="/superadmin/createDep/:orgId" component={(props) => <CreateGroupForm {...props} />} />
                    <Route path="/admin/createDep/:orgId" component={(props) => <CreateGroupForm {...props} />} />
                    <Route path="/superadmin/update_dep/:group_id/:orgId" component={(props) => <CreateGroupForm {...props} />} />
                    <Route path={`${path}/show_group/:group_id/:orgId`} component={(props) => <ShowSingleGroupDetailsAndEdit {...props} />} />
                    <Route path={`${path}`} component={(props) => <GroupManagementDetailsTable {...props} />} />
                </Switch>
            </>
        </div>
    );
}
export default GroupManagmentMainPanel;
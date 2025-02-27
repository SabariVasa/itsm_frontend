import React from "react";
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ClassManagementMain from "./classmanagement/ClassManagementMain";
import NewClassCreationPanel from "./classmanagement/NewClassCreationPanel";
import CMDB from "../../Pages/CMDB";

function CMDBManagementMainPanel() {
    const { path } = useRouteMatch();
    return (
        <div style={{ margin: '2em', height: '100%' }}>
            <Switch>
                <Route path={`${path}/create_class`} component={(props) => <NewClassCreationPanel {...props} />} />
                <Route path={`${path}/show_class`} component={(props) => <CMDB {...props} />} />
                <Route path={`${path}`} component={(props) => <ClassManagementMain {...props} />} />
            </Switch>
        </div>
    )
}
export default CMDBManagementMainPanel;
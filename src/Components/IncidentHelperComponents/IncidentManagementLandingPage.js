import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import IncidentTable from '../HelperComponents/IncidentTable';
import CreateIncidentForm from './CreateNewIncident';
import UserIncidentForm from '../UserPortal Pages/UserIncidentForm';
import MyIncidentList from '../../Pages/endUser/MyIncidentList';

export default function IncidentManagementLandingPage(props) {
    const { user } = props;
    const { path } = useRouteMatch();

    return (
        <div>
            <Switch>
                <Route
                    path={`${path}/update_incident/:incident_id`}
                    render={(props) => user ? <UserIncidentForm {...props} isEdit={true} /> : <CreateIncidentForm isEdit={true} {...props} />}
                />
                <Route
                    path={`${path}/incident-list`}
                    render={(props) => {
                        const query = new URLSearchParams(props.location.search);
                        const stateParam = query.get('state');
                        return <IncidentTable state={stateParam} />;
                    }}
                />
                <Route
                    path={`${path}/my-incident`}
                    render={(props) => <MyIncidentList user={user} {...props} />}
                />
                <Route
                    path={`${path}/create-incident`}
                    render={(props) => user ? <UserIncidentForm {...props} /> : <CreateIncidentForm {...props} />}
                />
            </Switch>
        </div>
    );
}

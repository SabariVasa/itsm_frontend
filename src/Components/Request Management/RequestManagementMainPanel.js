import React from 'react';
import { BrowserRouter as Router, Route, Switch, useRouteMatch } from 'react-router-dom';
import GeneralService from './Main Component/GeneralService';
import RequestForm from './Helper Components/RequestForm';
import RequestCategory from './Main Component/RequestCategory';
import ServiceCategoryForm from './Main Component/ServiceCategoryForm';
import RequestItemDetails from './Helper Components/RequestItemDetails';
import RequestItem from './Main Component/RequestItem';

function RequestManagementMainPanel() {
    const { path } = useRouteMatch();
    console.log(path, 'path==');
    return (
        <>
            <div style={{ margin: '2em' }}>
                <>
                    <Switch>
                        <Route path={"superadmin/request_service/general-service/:id"} element={<ServiceCategoryForm />} />
                        <Route path={`${path}/request_service/hardware/:id`} element={<RequestItemDetails />} />
                        <Route path={`${path}/request-service/request_item/:item_id`} component={() => <RequestItem />} />
                        <Route path={`${path}/request_service/general-service`} component={() => <GeneralService />} />
                        {/* <Route path={`${path}/`} component={(props) => <GroupManagementDetailsTable {...props} />} /> */}
                        <Route path={`${path}/request_service/hardware`} component={() => <RequestForm />} />
                        <Route path={`${path}`} component={(props) => <RequestCategory {...props} />} />
                    </Switch>
                </>
            </div>
        </>
    )
}

export default RequestManagementMainPanel
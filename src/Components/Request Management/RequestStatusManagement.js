import React, { useEffect, useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import RequestForm from './Helper Components/RequestForm';
import RequestCategory from './Main Component/RequestCategory';
import ServiceCategoryForm from './Main Component/ServiceCategoryForm';
import RequestItemDetails from './Helper Components/RequestItemDetails';
import RequestItem from './Main Component/RequestItem';
import ContentDevider from '../HelperComponents/ContentDevider';
import MyRequestTable from '../../Pages/request/MyRequestTable';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import UpdatedRequestForm from '../../Pages/request/UpdatedRequestForm';

function RequestStatusManagement(props) {
    const selectedRequest ="Hardware requests";
    const { path } = useRouteMatch();
    const history = useHistory();

    useEffect(() => {
        history.push(`${path}/my-request`)
    }, []);

    return (
        <div style={{ margin: '2em' }}>
            <Switch>
                <Route path="/request_service" element={<RequestCategory />} />
                <Route path="/request-service/general-service/:category" element={<ServiceCategoryForm />} />
                <Route path="/request_item_details/:request_item_id" element={<RequestItemDetails />} />
                <Route path="/request_item/:item_id" element={<RequestItem />} />
                <Route path={`superadmin/request-service/hardware/:reqId`} element={<RequestForm />} />

                <Route path={`${path}/my-request`} component={(props) =>
                    <div>
                        <ContentDevider title={"All Requests"} />
                        {selectedRequest ? <MyRequestTable selectedRequest={selectedRequest} /> : null}
                    </div>}
                />
                <Route path={`${path}/update-request/:request_id`} component={(props) => <UpdatedRequestForm />} />
            </Switch>
        </div>
    )
}

export default RequestStatusManagement;
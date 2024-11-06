import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, useRouteMatch } from 'react-router-dom';
import GeneralService from './Main Component/GeneralService';
import RequestForm from './Helper Components/RequestForm';
import RequestCategory from './Main Component/RequestCategory';
import ServiceCategoryForm from './Main Component/ServiceCategoryForm';
import RequestItemDetails from './Helper Components/RequestItemDetails';
import RequestItem from './Main Component/RequestItem';
import BasicSelect from '../HelperComponents/SelectField';
import ContentDevider from '../HelperComponents/ContentDevider';
import MyRequestTable from './Main Component/MyRequestTable';

function RequestStatusManagement(props) {
    // const { selectedRequest } = props;
    const [selectedRequest, setSelectedRequest] = useState("Hardware requests");
    const { path } = useRouteMatch();
    console.log(path, 'path==');
    return (
        <>
            <div style={{ margin: '2em' }}>
                <>
                    <Switch>
                        {/* <Route path={"superadmin/hardware"} component={() => <RequestItemDetails />} />
                        <Route path={"superadmin/request-service/request_item/:item_id"} component={() => <RequestItem />} />
                        <Route path={"superadmin/request_service/general-service/:id"} element={<ServiceCategoryForm />} /> */}
                        {/* <Route path={`${path}/request_service/general-service`} component={() => <GeneralService />} /> */}
                        {/* <Route path={`${path}/`} component={(props) => <GroupManagementDetailsTable {...props} />} /> */}
                        <Route path="/request_service" element={<RequestCategory />} />
                        <Route path="/request_service/hardware" element={<RequestForm/>}/>
                        <Route path="/request-service/general-service/:category" element={<ServiceCategoryForm />} />
                        <Route path="/request_item_details/:request_item_id" element={<RequestItemDetails />} />
                        <Route path="/request_item/:item_id" element={<RequestItem />} />
                        <Route path={`${path}`} component={(props) =>
                            <div>
                                <BasicSelect label="Select requests to fetch" MenuItems={[{ value: "Hardware requests" }, { value: "General requests" }]} style={{ width: "30%", marginTop: 5, marginLeft: 5 }} selectedValue={selectedRequest} setSelectValue={setSelectedRequest} />
                                <ContentDevider title={selectedRequest} />
                                {selectedRequest ? <MyRequestTable selectedRequest={selectedRequest} /> : null}
                                {/* <Component2/> */}
                            </div>} />
                    </Switch>
                </>
            </div>
        </>
    )
}

export default RequestStatusManagement;
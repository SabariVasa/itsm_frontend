import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import GeneralService from './Main Component/GeneralService';
import RequestForm from './Helper Components/RequestForm';
import ServiceCategoryForm from './Main Component/ServiceCategoryForm';
import RequestItemDetails from './Helper Components/RequestItemDetails';
import RequestItem from './Main Component/RequestItem';
import RequestServiceManagement from '../../Pages/request/RequestServiceManagement';
import CreateNewCatelogue from './CreateNewCatelogue';
import CreateRequestDetailsForm from '../../Pages/request/CreateRequestDetailsForm';
import MyRequestList from './MyRequestList';
import UpdatedRequestForm from '../../Pages/request/UpdatedRequestForm';

function RequestManagementMainPanel({ fromUser }) {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={"superadmin/request_service/general-service/:id"} element={<ServiceCategoryForm />} />
      <Route path={`${path}/request-service/hardware/:id`} element={<RequestItemDetails />} />
      <Route path={`${path}/request-service/request_item/:item_id`} component={() => <RequestItem />} />
      <Route path={`${path}/request-service/general-service`} component={() => <GeneralService />} />
      <Route path={`${path}/create-request/:catelogueId/:categoryId`} component={() => <CreateRequestDetailsForm />} />
      <Route path={`${path}/request-service/hardware`} component={() => <RequestForm />} />

      <Route path={`${path}/create-catelogue`} component={CreateNewCatelogue} />
      <Route path={`${path}/update-request/:request_id`} component={UpdatedRequestForm} />
      <Route path={`${path}/my-requests`} component={() => <MyRequestList fromUser={fromUser} />} />
      <Route path={`${path}/request-service`} component={() => <RequestServiceManagement fromUser={fromUser} />} />
    </Switch>
  )
}

export default RequestManagementMainPanel
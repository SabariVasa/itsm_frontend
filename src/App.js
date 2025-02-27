import './App.css';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RoleBasedRoute from './Utils/RoleBasedRoute';
import DefaultLoader from './global/commonComponents/DefaultLoader';
import EndUserLandingPage from './Pages/endUser/EndUserLandingPage';
import SuperAdminLandingPage from './Pages/superadmin/SuperAdminLandingPage';
import AdminLandingPage from './Pages/admin/AdminLandingPage';
import { UnAuthGuard, AuthGuard } from './application/guards';
import SigninScreen from './Pages/Signin';
import ADSigninScreen from './Pages/ADSignin';
import { AppProvider } from './presentation/shared';

function App() {
  return (
    <AppProvider>
      <Suspense fallback={<DefaultLoader />}>
        <Router>
          <Switch>
            <Route path="/signin" component={() => <UnAuthGuard component={<SigninScreen />} />} />
            <Route path="/adLogin" component={() => <UnAuthGuard component={<ADSigninScreen />} />} />
            <Route path="/endUser" component={() => <AuthGuard component={<EndUserLandingPage />} />} />
            <Route path="/superadmin" component={() => <AuthGuard component={<SuperAdminLandingPage />} />} />
            <Route path="/admin" component={() => <AuthGuard component={<AdminLandingPage />} />} />
            <Route path="/" component={() => <AuthGuard component={<RoleBasedRoute />} />} />
          </Switch>
        </Router>
      </Suspense>
    </AppProvider>
  );
}

export default App;



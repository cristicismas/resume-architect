import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Auth from '../pages/Auth';
import Home from '../pages/Home';
import BuildResume from '../pages/BuildResume';
import Templates from '../layout/Templates';
import Logout from '../pages/Logout';
import Welcome from '../pages/Welcome';
import About from '../pages/About';
import Resumes from '../pages/Resumes';
import Credits from '../pages/Credits';
import Account from '../pages/Account';
import PrivateRoute from '../routes/PrivateRoute';

const AppRoutes = () => {
  return (
    <Switch>
      <Route path="/welcome">
        <Welcome />
      </Route>

      <Route path="/logout">
        <Logout />
      </Route>

      <Route path="/login">
        <Auth type="login" />
      </Route>

      <Route path="/signup">
        <Auth type="signup" />
      </Route>

      <Route path="/about">
        <About />
      </Route>

      <PrivateRoute path="/resumes">
        <Resumes />
      </PrivateRoute>

      <Route path={['/build/:templateName', '/draft/:templateName/:resumeId']}>
        <BuildResume />
      </Route>

      <Route path="/templates">
        <Templates shouldScrollToTop={true} />
      </Route>

      <Route path="/credits">
        <Credits />
      </Route>

      <PrivateRoute path="/account">
        <Account />
      </PrivateRoute>

      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
};

export default AppRoutes;

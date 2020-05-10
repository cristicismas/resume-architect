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
import PrivacyPolicy from '../pages/PrivacyPolicy';
import TermsAndConditions from '../pages/TermsAndConditions';
import Credits from '../pages/Credits';
import Account from '../pages/Account';

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

      <Route path="/resumes">
        <Resumes />
      </Route>

      <Route path={['/build/:templateName', '/draft/:templateName/:resumeName']}>
        <BuildResume />
      </Route>

      <Route path="/templates">
        <Templates shouldScrollToTop={true} />
      </Route>

      <Route path="/privacy">
        <PrivacyPolicy />
      </Route>

      <Route path="/terms">
        <TermsAndConditions />
      </Route>

      <Route path="/credits">
        <Credits />
      </Route>

      <Route path="/account">
        <Account />
      </Route>

      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
};

export default AppRoutes;

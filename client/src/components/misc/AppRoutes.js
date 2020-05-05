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

      <Route exact path="/">
        <Home />
      </Route>

      <Route path="/privacy">
        <PrivacyPolicy />
      </Route>

      <Route path="/terms">
        <TermsAndConditions />
      </Route>
    </Switch>
  );
};

export default AppRoutes;

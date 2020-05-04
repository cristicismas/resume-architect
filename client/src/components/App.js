import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { checkToken } from '../store/actions/user';

import Header from './layout/Header';
import Auth from './pages/Auth';
import Home from './pages/Home';
import BuildResume from './pages/BuildResume';
import Templates from './layout/Templates';
import Footer from './layout/Footer';
import Logout from './pages/Logout';
import Welcome from './pages/Welcome';
import About from './pages/About';
import Resumes from './pages/Resumes';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';

import RouteChangeHandler from './misc/RouteChangeHandler';

const App = () => {
  const dispatch = useDispatch();

  const dispatchCheckToken = useCallback(() => {
    dispatch(checkToken());
  }, [dispatch]);

  useEffect(() => {
    dispatchCheckToken();
  }, [dispatchCheckToken]);

  return (
    <Router>
      <RouteChangeHandler />

      <Header />

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

      <Footer />
    </Router>
  );
};

export default App;

import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './layout/Header';
import Auth from './pages/Auth';
import Home from './pages/Home';
import BuildResume from './pages/BuildResume';
import Templates from './layout/Templates';
import Footer from './layout/Footer';
import Logout from './pages/Logout';
import Welcome from './pages/Welcome';
import { checkToken } from '../store/actions/user';

const App = () => {
  const dispatch = useDispatch();

  const handleCheckToken = useCallback(() => {
    dispatch(checkToken());
  }, [dispatch]);

  useEffect(() => {
    handleCheckToken();
  }, [handleCheckToken]);

  return (
    <Router>
      <Header />

      <Switch>
        <Route exact path="/welcome">
          <Welcome />
        </Route>

        <Route exact path="/logout">
          <Logout />
        </Route>

        <Route exact path="/login">
          <Auth type="login" />
        </Route>

        <Route exact path="/signup">
          <Auth type="signup" />
        </Route>

        <Route exact path="/build/:template_name">
          <BuildResume />
        </Route>

        <Route exact path="/templates">
          <Templates />
        </Route>

        <Route exact path="/">
          <Home />
        </Route>
      </Switch>

      <Footer />
    </Router>
  );
};

export default App;

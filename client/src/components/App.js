import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { checkToken } from '../store/actions/user';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

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

        <Route path={['/build/:template_name', '/draft/:template_name/:resume_date']}>
          <BuildResume />
        </Route>

        <Route path="/templates">
          <Templates shouldScrollToTop={true} />
        </Route>

        <Route path="/">
          <Home />
        </Route>
      </Switch>

      <Footer />
    </Router>
  );
};

export default App;

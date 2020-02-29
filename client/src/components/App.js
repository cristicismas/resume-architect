import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './layout/Header';
import Auth from './pages/Auth';
import Home from './pages/Home';
import BuildResume from './pages/BuildResume';
import Templates from './layout/Templates';
import Footer from './layout/Footer';

const App = () => (
  <Router>
    <Header />

    <Switch>
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

export default App;

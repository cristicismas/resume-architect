import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ScrollToTop from './misc/ScrollToTop';
import Header from './layout/Header';
import Home from './pages/Home';
import BuildResume from './pages/BuildResume';

const App = () => (
  <Router>
    <ScrollToTop />

    <Header />

    <Switch>
      <Route path="/build/:template_name">
        <BuildResume />
      </Route>

      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </Router>
);

export default App;

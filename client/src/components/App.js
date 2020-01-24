import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import ResumeForm from './pages/ResumeForm';

const App = () => (
  <Router>
    <Switch>
      <Route path="/build/:id">
        <ResumeForm />
      </Route>

      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </Router>
);

export default App;

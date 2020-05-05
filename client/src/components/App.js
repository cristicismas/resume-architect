import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { checkToken } from '../store/actions/user';

import Header from './layout/Header';
import Footer from './layout/Footer';

import RouteChangeHandler from './misc/RouteChangeHandler';
import AppRoutes from './misc/AppRoutes';

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
      <AppRoutes />
      <Footer />
    </Router>
  );
};

export default App;

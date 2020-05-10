import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { checkToken } from '../redux/actions/user';

import Header from './layout/Header';
import AppRoutes from './routes/AppRoutes';
import Footer from './layout/Footer';

import RouteChangeHandler from './routes/RouteChangeHandler';
import Messages from './misc/Messages';

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

      <Messages />
    </Router>
  );
};

export default App;

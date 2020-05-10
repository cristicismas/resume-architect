import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ path, redirect, children }) => {
  const { loggedIn, tokenChecked } = useSelector(state => state.user);

  if (tokenChecked) {
    return (
      <Route path={path}>
        {loggedIn ? children : <Redirect to={redirect ? redirect : '/login'} />}
      </Route>
    );
  } else return null;
};

export default PrivateRoute;

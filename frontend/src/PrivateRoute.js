import React from 'react';
import {  Navigate, Route } from 'react-router-dom';

const AuthService = {
  isAuthenticated: () => {
    return localStorage.getItem('authToken') !== null;
  },
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        AuthService.isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;

import React from 'react';
import { Navigate, Route } from 'react-router-dom';

import auth from '../services/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    auth.isAuthenticated === true
      ? <Component {...props} />
      : 
      // document.location = document.location.origin+'/login'
      <Navigate to='/login'
      // {{ 
      //     // pathname: '/login',
      //     // state: { from: props.location }  
      //   }} 
      />
  )} />
);

export default PrivateRoute;
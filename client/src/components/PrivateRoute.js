import React from 'react';
import { Navigate } from 'react-router-dom';
// import { /  } from "react-router-dom";

import auth from '../services/auth';

// const PrivateWrapper = () => {
//   return auth.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
// };

const PrivateRoute = ({callbackURL, children}) => {
  // console.log(callbackURL)
  // let cburl = "/login?loggedout&callbackURL=" + callbackURL;
  return auth.isAuthenticated ? children : <Navigate to={'/login?loggedout'} />;
};

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={(props) => (
//     auth.isAuthenticated === true
//       ? <Component {...props} />
//       : 
//       // document.location = document.location.origin+'/login'
//       <Navigate to='/login'
//       // {{ 
//       //     // pathname: '/login',
//       //     // state: { from: props.location }  
//       //   }} 
//       />
//   )} />
// );

export default PrivateRoute;
// export default PrivateWrapper;
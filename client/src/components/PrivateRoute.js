import { useAuth } from "../context/AuthContext";
import { useLocation, Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}


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
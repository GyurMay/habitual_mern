import { useAuth } from '../context/AuthContext.js';
// import auth from '../services/auth.js';
import {useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// let error = false;


export default function LoginPage(props){
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const from = location.state?.from?.pathname || "/";

  async function handleSubmit(e){
    e.preventDefault();
    const [username, password] = [document.querySelector('#username').value ,document.querySelector('#password').value];
    
    try{
        await auth.authenticate(username, password);
        navigate(from);
    }catch(err) {
        // this.setState({ failed: true });
        setError(true);
      };
    
  }
  function ErrorAlert(props){
    return (
      <div class='alert alert-danger'>{props.details}</div>
    )
  }

    return (
        <>
      {error && <ErrorAlert details={"Login failed"} />}
      {document.location.href.includes('loggedout') && <ErrorAlert details={"Log in to view page"} />}
    <form onSubmit={handleSubmit}>
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" name='username' class="form-control" id="username" placeholder="Enter your username" />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" name='password' class="form-control" id="password" placeholder="Enter your password" />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
        </>
    )
};
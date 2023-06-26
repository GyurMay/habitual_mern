import auth from '../services/auth.js';
import {useState} from 'react';

// let error = false;


export default function LoginPage(props){
  
  const [error, setError] = useState(false);

  async function handleSubmit(e){
    e.preventDefault();
    const [username, password] = [document.querySelector('#username').value ,document.querySelector('#password').value];
    auth.authenticate(username, password)
      .then((user) => {
        document.location = '/';
      })
      .catch((err) => {
        // this.setState({ failed: true });
        setError(true);
      });
  }
  function ErrorAlert(props){
    return (
      <div>{props.details}</div>
    )
  }

    return (
        <>
      {error && <ErrorAlert details={"Failed to save the content"} />}
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
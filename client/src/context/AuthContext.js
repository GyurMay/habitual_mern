import React, { useState, useEffect, createContext } from "react";

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  // const [currHabit, setCurrHabit] = useState()
  let host = 'http://localhost:3001' // since the backend is hosted on a diff port
  // host = '';
  useEffect(() => {
    async function checkIfUserIsLoggedIn() {
      try {
        let response = await fetch(host+"/api/login");

        if (!response.ok) {
          throw new Error("Unauthenticated");
        }

        let fetchedUser = await response.json();
        setUser(fetchedUser);
      } catch (error) {
        setUser(false);
      }
    }

    checkIfUserIsLoggedIn();

    return () => {
      // clean up function
    };
  }, []);

  const authenticate = async (username, password) => {
    let response = await fetch(host+"/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });


    if (!response.ok) {
      throw new Error("Login Failed");
    }

    let loggedInUser = await response.json();
    setUser({...loggedInUser, password: null}); // prevent the password from being sent

    return loggedInUser;
  };

  
  const register = async (username, password, name) => {
    let response = await fetch(host+"/api/register", {
      method: "POST",
      body: JSON.stringify({ username, password ,name }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Register Failed");
    }
  };

  const signout = async () => {
    let response = await fetch(host+"/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response)
    if (!response.ok) {
      throw new Error("Logout Failed");
    }

    let body = await response.json();
    setUser(false);

    return body;
  };

  return (
    <Provider
      value={{
        authenticate,
        register,
        signout,
        isAuthenticated: user ? true : false,
        // isAuthenticated: true,
        user
      }}
    >
      {children}
    </Provider>
  );
};

// Create our own hook for accessing the context from any functional component
function useAuth() {
  return React.useContext(AuthContext);
}

export { useAuth, AuthProvider };
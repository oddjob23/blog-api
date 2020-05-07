import React, { useContext, useEffect } from "react";
import AuthContext from "../context/authentication/AuthContext";
import { Redirect, Route } from "react-router-dom";
export default function AdminRoute({ component: Component, ...rest }) {
  const authContext = useContext(AuthContext);
  const { checkIfAuthenticated, user, isAuthenticated } = authContext;
  useEffect(() => {
    checkIfAuthenticated();
    console.log(user.admin);
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated && user.admin === false) {
          return <Redirect to="/" />;
        } else if (user.admin) {
          return <Component {...props} />;
        } else {
          return <h1>No access</h1>;
        }
      }}
    />
  );
}

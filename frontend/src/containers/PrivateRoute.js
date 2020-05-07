import React, { useContext, useEffect } from "react";
import AuthContext from "../context/authentication/AuthContext";
import { Redirect, Route } from "react-router-dom";

export default function PrivateRoute({ component: Component, ...rest }) {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, checkIfAuthenticated } = authContext;

  useEffect(() => {
    checkIfAuthenticated();
  }, []);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated) {
          return <Redirect to="/login" />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
}

import React, { useContext } from "react";
import App from "./App";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./containers/PrivateRoute";
import HomePage from "./containers/HomePage";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Login from "./components/authentication/Login";
import AuthState from "./context/authentication/AuthState";

import routes from "./routes/routes.json";
import SignUp from "./components/authentication/SignUp";
export default function Routes() {
  return (
    <App>
      <AuthState>
        <Router>
          <Navbar />
          <Switch>
            <Route path={routes.LOGIN} component={Login} />
            <Route path={routes.SIGNUP} component={SignUp} />
            <PrivateRoute exact path={routes.HOME} component={HomePage} />
          </Switch>
        </Router>
      </AuthState>
    </App>
  );
}

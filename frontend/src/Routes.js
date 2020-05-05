import React from "react";
import App from "./App";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./containers/PrivateRoute";
import HomePage from "./containers/HomePage";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Login from "./components/authentication/Login";
import AuthState from "./context/authentication/AuthState";
export default function Routes() {
  return (
    <AuthState>
      <App>
        <Router>
          <Switch>
            <PrivateRoute path={Routes.HOME} component={HomePage} />
          </Switch>

          <Switch>
            <Route path="/login" component={Login} />
          </Switch>
        </Router>
      </App>
    </AuthState>
  );
}

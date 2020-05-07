import React, { useEffect, useContext } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import AuthContext from "../context/authentication/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminRoute from "./AdminRoute";
import Users from "../components/apps/users/Users";
import routes from "../routes/routes.json";

import UsersState from "../context/users/UsersState";
const HomePage = () => {
  const authContext = useContext(AuthContext);
  const { checkIfAuthenticated } = authContext;
  useEffect(() => {
    checkIfAuthenticated();
  }, []);
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <main className="col-md-9 ml-sm-auto col-lg-10 px-4">
            <Switch>
              <UsersState>
                <AdminRoute exact path={routes.USERS} component={Users} />
              </UsersState>
            </Switch>
          </main>
        </div>
      </div>
    </>
  );
};

export default HomePage;

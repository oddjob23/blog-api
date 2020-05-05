import React, { useEffect, useState, useContext } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import AuthContext from "../context/authentication/AuthContext";
const HomePage = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, checkIfAuthenticated, parseJWT, user } = authContext;
  useEffect(() => {
    checkIfAuthenticated();
  }, []);
  useEffect(() => {
    if (isAuthenticated) {
      parseJWT(localStorage.getItem("token"));
    } else {
      console.log("user is not logged in");
    }
  }, [isAuthenticated]);
  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <>
      <Navbar username={user.username} />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <main className="col-md-9 ml-sm-auto col-lg-10 px-4"></main>
        </div>
      </div>
    </>
  );
};

export default HomePage;

import React, { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
const HomePage = () => {
  const [user, setUser] = useState(null);
  const parseJWT = (token) => {
    const base64url = token.split(".")[1];
    console.log(base64url);
    const base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
    console.log(base64);
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    console.log(jsonPayload);
    return JSON.parse(jsonPayload);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const data = parseJWT(token);
      console.log(data);
      setUser(data.username);
    } else {
      console.log("user not logged in");
    }
  }, []);
  return (
    <>
      <Navbar username={user} />
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

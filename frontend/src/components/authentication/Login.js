import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const Login = () => {
  const [creds, setCreds] = useState({
    username: "",
    password: "",
  });
  const [token, setToken] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted");
    axios
      .post("/api/auth/login/", {
        headers: {
          "Content-Type": "application/json",
        },
        username: creds.username,
        password: creds.password,
      })
      .then((result) => {
        console.log(result);
        if (result.data.access !== undefined || result.data.access !== null) {
          setToken(result.data.access);
        } else {
          alert("Error has occured");
          console.log(result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (e) => {
    console.log(e.target.value);
    e.persist();
    setCreds((state) => {
      return {
        ...state,
        [e.target.name]: e.target.value,
      };
    });
  };
  useEffect(() => {
    // get token
    const t = localStorage.getItem("token");
    if (t !== null || t !== undefined) setToken(t);
  }, []);
  useEffect(() => {
    console.log("token has changed");
    localStorage.setItem("token", token);
  }, [token]);
  if (!token) {
    return (
      <div>
        <form id="login" onSubmit={onSubmit}>
          <h1>{token}</h1>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-success">
            Login
          </button>
        </form>
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default Login;

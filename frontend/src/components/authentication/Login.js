import React, { useState, useEffect } from "react";
import axios from "axios";

const Login = () => {
  const [creds, setCreds] = useState({
    username: "",
    password: "",
  });
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
    console.log(creds);
  }, [creds]);
  return (
    <div>
      <form id="login" onSubmit={onSubmit}>
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
};

export default Login;

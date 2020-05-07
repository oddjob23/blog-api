import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import AuthContext from "../../context/authentication/AuthContext";

const Login = () => {
  const [creds, setCreds] = useState({
    username: "",
    password: "",
  });
  const authContext = useContext(AuthContext);
  const { login, token, error } = authContext;
  const { message, email } = error;
  const onSubmit = (e) => {
    e.preventDefault();
    login(creds);
  };
  const handleChange = (e) => {
    e.persist();
    setCreds((state) => {
      return {
        ...state,
        [e.target.name]: e.target.value,
      };
    });
  };
  useEffect(() => {}, [error]);
  if (!token) {
    return (
      <div className="container" style={{ marginTop: "48px" }}>
        <div className="card">
          <div className="card-body">
            <form id="login" onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  onChange={handleChange}
                  className="form-control"
                  required
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
                  required
                />
              </div>
              <p className="text-danger">
                {message && <span>{message}</span>}
                {email && <span>{email}</span>}
              </p>
              <button type="submit" className="btn btn-success">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default Login;

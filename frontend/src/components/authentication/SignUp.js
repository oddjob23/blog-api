import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/authentication/AuthContext";
import { Redirect } from "react-router-dom";
const SignUp = () => {
  const [creds, setCreds] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [toRedirect, setToRedirect] = useState(false);
  const authContext = useContext(AuthContext);
  const { register, error } = authContext;
  const onSubmit = (e) => {
    e.preventDefault();
    register(creds);
    if (!error.email && !error.message) {
      setToRedirect(true);
    }
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
  useEffect(() => {}, [toRedirect]);
  if (!toRedirect) {
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
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  className="form-control"
                  type="email"
                  placeholder="Enter an email address..."
                  name="email"
                  onChange={handleChange}
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
                Register
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

export default SignUp;

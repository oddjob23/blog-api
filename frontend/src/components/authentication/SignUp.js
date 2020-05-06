import React, { useState, useContext } from "react";
import AuthContext from "../../context/authentication/AuthContext";
const SignUp = () => {
  const [creds, setCreds] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const authContext = useContext(AuthContext);
  const { register } = authContext;
  const onSubmit = (e) => {
    e.preventDefault();
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
            <div className="form-group">
              <label htmlFor="password2">Password2</label>
              <input
                type="password"
                id="password2"
                name="password2"
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
};

export default SignUp;

import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/authentication/AuthContext";
import { Redirect } from "react-router-dom";
import routes from '../../routes/routes.json';
const SignUp = () => {
  const [creds, setCreds] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [toRedirect, setToRedirect] = useState(false);
  const authContext = useContext(AuthContext);
  const {
    register,
    error,
    isAuthenticated,
    checkIfAuthenticated,
  } = authContext;
  const onSubmit = (e) => {
    e.preventDefault();
    register(creds);
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
  useEffect(() => {
    checkIfAuthenticated();
    console.log(isAuthenticated);
    if (isAuthenticated) {
      setToRedirect(true);
    } else {
      setToRedirect(false);
    }
  }, []);
  useEffect(() => {
    if (isAuthenticated) {
      setToRedirect(true);
    } else {
      setToRedirect(false);
    }
  }, [isAuthenticated]);
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
                  required
                />
                {error.username && (
                  <p className="text-danger">{error.username}</p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  className="form-control"
                  type="email"
                  placeholder="Enter an email address..."
                  name="email"
                  onChange={handleChange}
                  required
                />
                {error.email && <p className="text-danger">{error.email}</p>}
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
                {error.password && (
                  <p className="text-danger">{error.password}</p>
                )}
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
    return <Redirect to={routes.HOME} />;
  }
};

export default SignUp;

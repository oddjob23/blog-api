import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import ProfileDropdown from "../ProfileDropdown";
import AuthContext from "../../context/authentication/AuthContext";
import routes from "../../routes/routes.json";
const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { user, logout, checkIfAuthenticated } = authContext;

  useEffect(() => {
    checkIfAuthenticated();
  }, []);
  return (
    <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a className="navbar-brand" href="#">
        All In One
      </a>
      <ul className="navbar-nav ml-auto">
        {!user.username ? (
          <div className="d-flex">
            <li className="nav-item mr-2">
              <Link className="nav-link" to={routes.LOGIN}>
                Sign In
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={routes.SIGNUP}>
                Register
              </Link>
            </li>
          </div>
        ) : (
          <ProfileDropdown label={user.username} handleLogout={logout} />
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

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
      <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">
        All In One
      </a>
      <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap">
          {!user.username ? (
            <>
              <Link className="nav-link" to={routes.LOGIN}>
                Sign In
              </Link>
              <Link className="nav-link" to={routes.SIGNUP}>
                Register
              </Link>
            </>
          ) : (
            <ProfileDropdown label={user.username} handleLogout={logout} />
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

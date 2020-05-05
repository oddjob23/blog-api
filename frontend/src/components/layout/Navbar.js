import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ProfileDropdown from "../ProfileDropdown";
import AuthContext from "../../context/authentication/AuthContext";
const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { user, logout } = authContext;
  return (
    <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">
        All In One
      </a>
      <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap">
          {!user.username ? (
            <Link className="nav-link" to="/login">
              Sign In
            </Link>
          ) : (
            <ProfileDropdown label={user.username} handleLogout={logout} />
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

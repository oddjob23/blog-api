import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">
        All In One
      </a>
      <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap">
          {!props.username ? (
            <Link className="nav-link" to="/login">
              Sign In
            </Link>
          ) : (
            <Link className="nav-link" to="/profile">
              {props.username}
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
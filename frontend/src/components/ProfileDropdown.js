import React, { useRef, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/authentication/AuthContext";
const ProfileDropdown = ({ label, handleLogout }) => {
  const authContext = useContext(AuthContext);
  const { logout } = authContext;
  const dropDownEl = useRef(null);
  const dropDownMenuEl = useRef(null);
  const handleClick = () => {
    dropDownEl.current.classList.toggle("show");
    console.log(dropDownEl.current);
    if (dropDownEl.current.classList.contains("show")) {
      dropDownMenuEl.current.classList.add("show");
    } else {
      dropDownMenuEl.current.classList.remove("show");
    }
  };

  return (
    <div className="dropdown" ref={dropDownEl}>
      <button
        className="btn dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        onClick={handleClick}
      >
        {label}
      </button>
      <div
        className="dropdown-menu"
        aria-labelledby="dropdownMenuButton"
        ref={dropDownMenuEl}
      >
        <Link to="/" className="dropdown-item">
          Profile
        </Link>
        <Link to="/" className="dropdown-item" onClick={logout}>
          Logout
        </Link>
      </div>
    </div>
  );
};

export default ProfileDropdown;

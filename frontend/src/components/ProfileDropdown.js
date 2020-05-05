import React, { useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const ProfileDropdown = ({ label, handleLogout }) => {
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
  const logout = () => {
    console.log("here");
    const res = axios
      .get("/auth/logout")
      .then((result) => {
        if (result.status === 200) {
          handleLogout();
        }
      })
      .catch((err) => {
        console.log(err);
      });
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

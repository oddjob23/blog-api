import React, { useRef } from "react";
import { Link } from "react-router-dom";
const Dropdown = ({ options, label }) => {
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
  if (options.length > 0) {
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
          {options.map((opt) => {
            return (
              <Link className="dropdown-item" to={`/${opt}`} key={opt}>
                {opt}
              </Link>
            );
          })}
        </div>
      </div>
    );
  } else {
    return <span>no dropdown items</span>;
  }
};

export default Dropdown;

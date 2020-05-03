import React from "react";
import ReactDOM from "react-dom";
import Login from "./authentication/Login";
const App = () => {
  return (
    <div>
      <Login />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

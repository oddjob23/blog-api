import React from "react";
import './css/App.scss';
function App(props) {
  const { children } = props;

  return <>{children}</>;
}

export default App;
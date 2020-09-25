import React from "react";
import "./Wrapper.css";

// Allows functionality to be passed down to other components
function Wrapper({ children }) {
  return <div className="wrapper">{children}</div>;
}

export default Wrapper;

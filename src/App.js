import React from "react";
import "./App.css";
import Main from "./components/Main/Main.js";
import Wrapper from "./components/Wrapper/Wrapper.js";

function App() {
  return (
    <div className="App">
      <Wrapper>
        <Header />
        <Main />
      </Wrapper>
    </div>
  );
}

export default App;

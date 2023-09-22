import React from "react";
import "./App.scss";
import Aside from "../components/Aside/Aside";
import Main from "../components/Main/Main";

function App() {
  return (
    <div className="app-container">
      <div className="app-container__wrapper">
        <div className="app-container__wrapper__aside">
          <Aside />
        </div>
        <div className="app-container__wrapper__main">
          <Main />
        </div>
      </div>
    </div>
  );
}

export default App;

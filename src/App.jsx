import { useState } from "react";
import Component1 from "./components/Component1";
import Component2 from "./components/Component2";
import Component4 from "./components/Component4";
import "./App.css";

import Component3 from "./components/Component3";
const App = () => {
  const [city, setCity] = useState("");

  const handleSearch = (searchCity) => {
    setCity(searchCity);
  };

  return (
    <>
      <div className="main-app">
        <div className="app-wrapper">
          <Component2 onSearch={handleSearch} />
          <div className="app-info">
            <Component1 city={city} />
          </div>
          <Component4 />
        </div>
      </div>
    </>
  );
};

export default App;

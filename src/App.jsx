import Component1 from "./components/Component1";
import Component2 from "./components/Component2";
import Component4 from "./components/Component4";
import "./App.css";

const App = () => {
  return (
    <>
      <div className="main-app">
        <div className="app-wrapper">
          <Component2 />
          <div className="app-info">
            <Component1 />
          </div>
          <Component4 />
        </div>
      </div>
    </>
  );
};

export default App;

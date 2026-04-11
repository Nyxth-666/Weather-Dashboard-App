import { useState } from "react";
import "../styles/Component2.css";
import SearchIcon from "../assets/search.png";

const Component2 = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setCity("");
    }
  };

  const handleButtonClick = () => {
    if (city.trim()) {
      onSearch(city.trim());
      setCity("");
    }
  };

  return (
    <div className="search-container box">
      <div className="search-elements">
        <div className="cloud-logo">
          <img src="./WeatherLogo.png" alt="Weather Logo" />
        </div>
        <form className="searchbar" onSubmit={handleSearch}>
          <input
            type="text"
            className="input-box"
            placeholder="Enter city..."
            value={city}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="search-button"
            onClick={handleButtonClick}
          >
            <img src={SearchIcon} alt="Search" className="search-icon" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Component2;

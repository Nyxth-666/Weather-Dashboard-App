import "../styles/Component2.css";

const Component2 = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const API_KEY = "YOUR_API_KEY";

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="search-container box">
      <div className="search-elements">
        <div className="cloud-logo">
          <img src="./WeatherLogo.png" alt="Weather Logo" />
        </div>
        <div className="searchbar" onSubmit={handleSearch}>
          <input
            type="text"
            className="input-box"
            placeholder="Enter city..."
            value={city}
            onChange={handleInputChange}
            />
            
          <div className="search-logo"></div>
          <div className="input-box"></div>
        </div>
      </div>
    </div>
  );
};

export default Component2;

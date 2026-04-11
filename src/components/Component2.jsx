import '../styles/Component2.css';

const Component2 = () => {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');


  const API_KEY = "YOUR_API_KEY";

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);  
      setWeather(null);
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
        <div className="searchcontainer">
            <div className="searchelements">
                <div className="cloudlogo">
                    <img src="/src/assets/fi-bs-clouds.png" />
                </div>
                <div className="searchbar">
                    <div className="searchlogo"></div>
                    <div className="inputbox"></div>
                </div>
            </div>
        </div>
    )
}

export default Component2;


import { useState, useEffect } from "react";

function Component3() {
  const [weather, setWeather] = useState(null);

  const API_KEY = import.meta.env.VITE_WEATHER_APP_ID;

  const DEFAULT_CITY = "Lucena City";

  const getWeather = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${DEFAULT_CITY}&units=metric&appid=${API_KEY}`
      );
      const data = await res.json();

      if (data.cod !== 200) {
        console.log(data.message);
        return;
      }

      setWeather(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  const getDay = () => {
    const days = [
      "Sunday", "Monday", "Tuesday", "Wednesday",
      "Thursday", "Friday", "Saturday"
    ];
    return days[new Date().getDay()];
  };

  return (
    <div className="card">
      {weather && weather.main ? (
        <div>
          <p>{getDay()}</p>
          <h3>{weather.name}</h3>
          <h1>{Math.round(weather.main.temp)}°C</h1>
          <p>{weather.weather[0].main}</p>
          <small>
            Feels like {Math.round(weather.main.feels_like)}°C
          </small>
        </div>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  );
}

export default Component3;
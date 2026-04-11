import { useState } from "react";

function Component3() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const API_KEY = import.meta.env.VITE_WEATHER_APP_ID;

  const getWeather = async () => {
    if (!city) return;

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      const data = await res.json();

      if (data.cod !== 200) {
        alert(data.message);
        return;
      }

      setWeather(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getDay = () => {
    const days = [
      "Sunday", "Monday", "Tuesday", "Wednesday",
      "Thursday", "Friday", "Saturday"
    ];
    return days[new Date().getDay()];
  };

    return (
      
    <div className="card">
      <div class="search-bar">
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={getWeather}>Search</button>
      </div>

      {weather && weather.main && (
        <div class="content">
          <p id="p1">{getDay()}</p>
          <h3>{weather.name}</h3>
          <h1>{Math.round(weather.main.temp)}°C</h1>
          <p id="p2">{weather.weather[0].main}</p>
          <small id="sml">
            Feels like {Math.round(weather.main.feels_like)}°C
          </small>
        </div>
      )}
            <style>{`
        
    *{
        margin: 0%;}
    .serach-bar{}

    .content{}

    #p1{}

    h3{}

    h1{}

    #p2{}

    #sml{}
    `}</style>
        
    </div>
  );
}

export default Component3;
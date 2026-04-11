import React, { useState, useEffect } from "react";
import "../styles/Component3.css";
import ClearIcon from "../assets/clear.png";
import CloudIcon from "../assets/cloud.png";
import RainIcon from "../assets/rain.png";
import DrizzleIcon from "../assets/drizzle.png";
import SnowIcon from "../assets/snow.png";

const Component3 = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const DEFAULT_CITY = "Lucena";

  const getWeatherIcon = (main) => {
    switch (main) {
      case "Clear":
        return ClearIcon;
      case "Clouds":
        return CloudIcon;
      case "Rain":
        return RainIcon;
      case "Drizzle":
        return DrizzleIcon;
      case "Snow":
        return SnowIcon;
      default:
        return CloudIcon;
    }
  };

  const getWeather = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${DEFAULT_CITY}&units=metric&appid=${API_KEY}`,
      );
      const data = await res.json();

      if (data.cod !== 200) {
        throw new Error(data.message);
      }

      setWeather(data);
    } catch (err) {
      setError(err.message);
      console.error("Weather fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getDay = () => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[new Date().getDay()];
  };

  useEffect(() => {
    getWeather();
  }, []);

  if (loading) return <div className="card loading">Loading...</div>;
  if (error) return <div className="card error">{error}</div>;

  return (
    <div className="card-pic box">
      <div className="day-loc">
        <p>{getDay()}</p>
        <h3>{weather.name}</h3>
      </div>
      <div className="temp-container">
        <img
          src={getWeatherIcon(weather.weather[0].main)}
          alt="Weather icon"
          style={{ width: "276px", height: "276px" }}
        />
        <h1>{Math.round(weather.main.temp)}°C</h1>
      </div>
      <p className="weather-desc">{weather.weather[0].main}</p>
      <small className="feels-like">
        Feels like {Math.round(weather.main.feels_like)}°C
      </small>
    </div>
  );
};

export default Component3;

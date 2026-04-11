import React from "react";
import { useState, useEffect } from "react";
import "../styles/Component1.css";
import ClearIcon from "../assets/clear.png";
import CloudIcon from "../assets/cloud.png";
import DrizzleIcon from "../assets/drizzle.png";
import RainIcon from "../assets/rain.png";
import SnowIcon from "../assets/snow.png";

const Component1 = ({ city }) => {
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

  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchApiWeather = async (query) => {
    if (!query.trim()) {
      setWeatherData(null);
      return;
    }
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`,
      );

      const data = await response.json();

      if (data.cod !== 200) {
        throw new Error(data.message);
      }

      setWeatherData(data);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApiWeather(city);
  }, [city]);

  return (
    <>
      {loading && <p className="state box">Loading...</p>}
      {error && <p className="state box">{error}</p>}
      {weatherData && (
        <div className="searched-weather box">
          <div className="searched-wrapper">
            <div className="city-info">
              <img
                src={getWeatherIcon(weatherData.weather[0].main)}
                alt="Weather icon"
              />
              <div className="info-label">
                <div className="loc-date">
                  <label className="city">{weatherData.name}, PH</label>
                  <label className="date">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </label>
                </div>
                <div className="temp-label">
                  <label className="temp">
                    {Math.round(weatherData.main.temp)}°C
                  </label>
                  <label className="temp-label">
                    {weatherData.weather[0].description}
                  </label>
                </div>
              </div>
            </div>

            <div className="city-stats">
              <div className="stat-box card">
                <p className="stat-title">HUMIDITY</p>
                <h3>{weatherData.main.humidity}%</h3>
              </div>
              <div className="stat-box card">
                <p className="stat-title">WIND</p>
                <h3>{weatherData.wind?.speed || 0} m/s</h3>
              </div>
              <div className="stat-box card">
                <p className="stat-title">FEELS LIKE</p>
                <h3>{Math.round(weatherData.main.feels_like)}°C</h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Component1;

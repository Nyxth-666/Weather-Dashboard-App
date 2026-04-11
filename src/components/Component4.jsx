import React, { useState, useEffect } from "react";
import "../styles/Component4.css";

import ClearIcon from '../assets/clear.png';
import CloudIcon from '../assets/cloud.png';
import DrizzleIcon from '../assets/drizzle.png';
import RainIcon from '../assets/rain.png';
import SnowIcon from '../assets/snow.png';

const API_KEY = import.meta.env.VITE_WEATHER_APP_KEY;
const CITY = "Batangas";

function Component4() {
  const [weatherDays, setWeatherDays] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

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

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setIsLoading(true);

        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&appid=${API_KEY}&units=metric`;

        const response = await fetch(url);

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.message || `HTTP ${response.status}`);
        }

        const data = await response.json();

        const daily = data.list
          .filter((item) => item.dt_txt.includes("12:00:00"))
          .slice(0, 7)
          .map((item) => ({
            dt: item.dt,
            temp: { day: item.main.temp },
            weather: item.weather,
            main: item.weather[0].main 
          }));

        setWeatherDays(daily);
      } catch (err) {
        console.error("Fetch error:", err);
        setErrorMsg(err.message || "Could not fetch weather data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, []);

  function getDayName(timestamp) {
    const date = new Date(timestamp * 1000);
    const dayNames = [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ];
    return dayNames[date.getDay()];
  }

  if (isLoading) {
    return <div className="weekly-forecast-container">Loading forecast...</div>;
  }

  if (errorMsg) {
    return (
      <div className="weekly-forecast-container">
        <div className="weekly-forecast-error">
          <p>⚠️ {errorMsg}</p>
          <p style={{ fontSize: "11px", opacity: 0.7, marginTop: "4px" }}>
            Check if your API key is active at openweathermap.org
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="weekly-forecast-container">
      <h2 className="weekly-forecast-title">This Week</h2>

      <div className="weekly-forecast-list">
        {weatherDays.map((day, index) => (
          <div key={index} className="forecast-day-card">
            <span className="forecast-day-name">{getDayName(day.dt)}</span>

            <img
              src={
                day.weather?.[0]?.icon
                  ? `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
                  : "https://openweathermap.org/img/wn/04d@2x.png"
              }
              alt={day.weather?.[0]?.description || "weather"}
              className="forecast-day-icon"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://openweathermap.org/img/wn/04d@2x.png";
              }}
            />

            <span className="forecast-day-temp">
              {Math.round(day.temp.day)}°C
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Component4;

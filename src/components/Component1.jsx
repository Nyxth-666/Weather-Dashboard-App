import "../styles/Component1.css";

const Component1 = () => {
  return (
    <div className="searched-weather box">
      <div className="searched-wrapper">
        <div className="city-info">
          <img src="/src/assets/rain.png" />
          <div className="info-label">
            <div className="loc-date">
              <label className="city">Batangas, PH</label>
              <label className="date">Tuesday. April 7, 2026</label>
            </div>
            <div className="temp-label">
              <label className="temp">29°C</label>
              <label className="temp-label">Few Clouds</label>
            </div>
          </div>
        </div>

        <div className="city-stats">
          <div className="stat-box">
            <p className="stat-title">HUMIDITY</p>
            <h3>77%</h3>
          </div>
          <div className="stat-box">
            <p className="stat-title">WIND</p>
            <h3>1.86 m/s</h3>
          </div>
          <div className="stat-box">
            <p className="stat-title">FEELS LIKE</p>
            <h3>34°C</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Component1;

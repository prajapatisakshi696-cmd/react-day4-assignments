import React, { useEffect, useState } from 'react';

const API_KEY = '9283bea785353e1dba620e67f5b2c2f7'; 
const CITY = 'Delhi';

const WeatherDashboard = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshCount, setRefreshCount] = useState(0);

  const fetchWeather = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) throw new Error('City not found or API error');
      const data = await response.json();
      setWeather(data);
      document.title = `🌡️ ${data.main.temp}°C in ${data.name}`;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(() => {
      setRefreshCount((prev) => prev + 1);
    }, 300000); // 5 minutes

    return () => clearInterval(interval); 
  }, []);

  useEffect(() => {
    if (refreshCount > 0) fetchWeather();
  }, [refreshCount]);

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h2>Weather Dashboard</h2>
      {loading && <p>Loading weather data...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {weather && (
        <div>
          <h3>{weather.name}</h3>
          <p>🌡️ Temperature: {weather.main.temp}°C</p>
          <p>🌥️ Description: {weather.weather[0].description}</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>🌬️ Wind Speed: {weather.wind.speed} m/s</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Weather Icon"
          />
        </div>
      )}
      <button onClick={fetchWeather} style={{ marginTop: '10px' }}>
        🔄 Refresh
      </button>
    </div>
  );
};

export default WeatherDashboard;
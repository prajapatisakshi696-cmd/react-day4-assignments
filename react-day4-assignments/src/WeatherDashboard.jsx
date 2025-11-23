import React, { useRef,useEffect,useState } from "react";

function WeatherDashboard() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const city = "Delhi";

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9283bea785353e1dba620e67f5b2c2f7&units=metric`
      );
      const data = await res.json();

      if (data.cod !== 200) {
        setError("City not found");
      } else {
        setWeather(data);
        document.title = `Temp: ${data.main.temp}°C`;
      }
    } catch {
      setError("Error fetching weather");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWeather();

    const timer = setInterval(fetchWeather, 300000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Weather Dashboard</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div>
          <h3>{weather.name}</h3>
          <p>{weather.weather[0].description}</p>
          <h1>{weather.main.temp}°C</h1>
        </div>
      )}

      <button onClick={fetchWeather}>Refresh</button>
    </div>
  );
}

export default WeatherDashboard;
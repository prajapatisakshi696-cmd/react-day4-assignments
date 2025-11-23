import React from "react";
import WeatherDashboard from "./WeatherDashboard";
import UserManagement from "./UserManagement";

function App() {
  return (
    <div>
      <WeatherDashboard />
      <hr style={{ margin: "40px 0" }} />
      <UserManagement />
    </div>
  );
}

export default App;
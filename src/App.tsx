import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const [gymEvents, setGymEvents] = useState([]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainPage gymEvents={gymEvents} setGymEvents={setGymEvents} />
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;

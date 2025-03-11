import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Header from './Components/Header/Header';
import Timer from './Pages/Timer/Timer';
import Home from './Pages/Home/Home';
import Ranking from './Pages/Ranking/Ranking';
import Settings from './Pages/Settings/Settings';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';

const App: React.FC = () => {
  return (
    <Router>
      <AuthHandler />
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

function AuthHandler() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const isAuth = token && username;

    if (!isAuth && location.pathname !== "/login" && location.pathname !== "/register") {
      navigate("/login");
    } else if (isAuth && (location.pathname === "/login" || location.pathname === "/register")) {
      navigate("/");
    }
  }, [location.pathname, navigate]);

  return null;
}

export default App;

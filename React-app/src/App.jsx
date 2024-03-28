import { useContext, useEffect, useState } from "react";
import "./App.scss";
import AdminAuth  from "./components/AdminAuth/AdminAuth";
import { ThemeContext } from "./context/ThemeContext";
import { DARK_THEME, LIGHT_THEME } from "./constants/themeConstants";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MoonIcon from "./assets/icons/moon.svg";
import SunIcon from "./assets/icons/sun.svg";
import BaseLayout from "./layout/BaseLayout";
import { Dashboard, PageNotFound } from "./screens";
import Product from "./components/Products/Product";
import Team from "./components/Teams/Team";
import Profile from "./components/Profile/Profile";
import Order from "./components/Orders/Order";
import Customer from "./components/Customers/Customer";

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const isAuth = localStorage.getItem("authenticated");
    if (isAuth) {
      setAuthenticated(true);
    }
  }, []);

  const handleloginSuccess = () => {
    setAuthenticated(true);
    localStorage.setItem("authenticated", "true");
  };

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem("authenticated");
    return <Navigate to="/Authentification" replace />;
  };

  useEffect(() => {
    if (theme === DARK_THEME) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  return (
    <>
      <Router>
      <Routes>
      <Route
          path="/"
          element={
            authenticated ? (
              <BaseLayout onLogout={handleLogout} />
            ) : (
              <Navigate to="/Authentification" replace />
            )
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="/products" element={<Product />} />
          <Route path="/team" element={<Team />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route
          path="/Authentification"
          element={
            authenticated ? (
              <Navigate to="/" replace />
            ) : (
              <AdminAuth onLoginSuccess={handleloginSuccess} />
            )
          }
        />
        </Routes>

        <button
          type="button"
          className="theme-toggle-btn"
          onClick={toggleTheme}
        >
          <img
            className="theme-icon"
            src={theme === LIGHT_THEME ? SunIcon : MoonIcon}
          />
        </button>
      </Router>
    </>
  );
}

export default App;

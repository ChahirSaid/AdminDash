import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import LogoBlue from "../../assets/images/logo_blue.svg";
import LogoWhite from "../../assets/images/logo_white.svg";
import {
  MdOutlineAttachMoney,
  MdOutlinePerson,
  MdOutlineBarChart,
  MdOutlineClose,
  MdOutlineGridView,
  MdOutlineLogout,
  MdOutlineDoneAll,
  MdOutlinePersonAdd,
  MdOutlinePeople,
  MdOutlineShoppingBag,
} from "react-icons/md";
import { BiLogoMicrosoftTeams } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.scss";
import { SidebarContext } from "../../context/SidebarContext";

const Sidebar = ({ onLogout }) => {
  const { theme } = useContext(ThemeContext);
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
  const [activeMenuItem, setActiveMenuItem] = useState("/");
  const navbarRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // closing the navbar when clicked outside the sidebar area
  const handleClickOutside = (event) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target) &&
      event.target.className !== "sidebar-open-btn"
    ) {
      closeSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    console.log("Logging out...");
    onLogout();
    console.log('Navigating to auth page ....');
  }

  useEffect(() => {
    setActiveMenuItem(location.pathname);
  }, [location.pathname]);

  return (
    <nav
      className={`sidebar ${isSidebarOpen ? "sidebar-show" : ""}`}
      ref={navbarRef}
    >
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <img src={theme === LIGHT_THEME ? LogoBlue : LogoWhite} alt="" />
          <span className="sidebar-brand-text">AdminDash.</span>
        </div>
        <button className="sidebar-close-btn" onClick={closeSidebar}>
          <MdOutlineClose size={24} />
        </button>
      </div>
      <div className="sidebar-body">
        <div className="sidebar-menu">
          <ul className="menu-list">
            <li className="menu-item">
              <Link
                to="/"
                className={`menu-link ${activeMenuItem === "/" ? "active" : ""}`}
                onClick={() => setActiveMenuItem("/")}
              >
                <span className="menu-link-icon">
                  <MdOutlineGridView size={18} />
                </span>
                <span className="menu-link-text">Dashboard</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link
                to="/statistics"
                className={`menu-link ${activeMenuItem === "/statistics" ? "active" : ""}`}
                onClick={() => setActiveMenuItem("/statistics")}
              >
                <span className="menu-link-icon">
                  <MdOutlineBarChart size={20} />
                </span>
                <span className="menu-link-text">Statistics</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link
                to="/products"
                className={`menu-link ${activeMenuItem === "/products" ? "active" : ""}`}
                onClick={() => setActiveMenuItem("/products")}
              >
                <span className="menu-link-icon">
                  <MdOutlineShoppingBag size={20} />
                </span>
                <span className="menu-link-text">Products</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link
                to="/orders"
                className={`menu-link ${activeMenuItem === "/orders" ? "active" : ""}`}
                onClick={() => setActiveMenuItem("/orders")}
              >
                <span className="menu-link-icon">
                  <MdOutlineAttachMoney size={20} />
                </span>
                <span className="menu-link-text">Orders</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link
                to="/kanban"
                className={`menu-link ${activeMenuItem === "/kanban" ? "active" : ""}`}
                onClick={() => setActiveMenuItem("/kanban")}
              >
                <span className="menu-link-icon">
                  <MdOutlineDoneAll size={18} />
                </span>
                <span className="menu-link-text">Kanban</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link
                to="/customer"
                className={`menu-link ${activeMenuItem === "/customer" ? "active" : ""}`}
                onClick={() => setActiveMenuItem("/customer")}
              >
                <span className="menu-link-icon">
                  <MdOutlinePeople size={20} />
                </span>
                <span className="menu-link-text">Customers</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link
                to="/team"
                className={`menu-link ${activeMenuItem === "/team" ? "active" : ""}`}
                onClick={() => setActiveMenuItem("/team")}
              >
                <span className="menu-link-icon">
                  <BiLogoMicrosoftTeams size={20} />
                </span>
                <span className="menu-link-text">Manage Team</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="sidebar-menu sidebar-menu2">
          <ul className="menu-list">
            <li className="menu-item">
              <Link
                to="/profile"
                className={`menu-link ${activeMenuItem === "/profile" ? "active" : ""}`}
                onClick={() => setActiveMenuItem("/profile")}
              >
                <span className="menu-link-icon">
                  <MdOutlinePerson size={20} />
                </span>
                <span className="menu-link-text">Profile</span>
              </Link>
            </li>
            <li className="menu-item">
              <button className="menu-link" onClick={handleLogout}>
                <span className="menu-link-icon">
                  <MdOutlineLogout size={20} />
                </span>
                <span className="menu-link-text">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;

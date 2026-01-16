import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Search,
  Home,
  Movie,
  Favorite,
  Person,
  Logout,
  Menu,
  Close,
} from "@mui/icons-material";
import "./Navbar.css";

const Navbar = ({ user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    onLogout();
    setIsMenuOpen(false);
    navigate("/");
  };

  const navLinks = [
    { path: "/", label: "Home", icon: <Home /> },
    { path: "/movies", label: "Movies", icon: <Movie /> },
    { path: "/recommendations", label: "Recommendations", icon: <Favorite /> },
    { path: "/watchlist", label: "Watchlist", icon: <Favorite /> },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo/Brand */}
        <Link to="/" className="navbar-brand">
          <Movie className="logo-icon" />
          <span className="brand-text">MovieRec</span>
        </Link>

        {/* Search Bar */}
        <form className="search-container" onSubmit={handleSearch}>
          <div className="search-input-wrapper">
            <Search className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button type="submit" className="search-button">
            Search
          </button>
        </form>

        {/* Desktop Navigation */}
        <div className="nav-links">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              {link.icon}
              <span>{link.label}</span>
            </NavLink>
          ))}

          {/* User Profile Section */}
          <div className="user-section">
            {user ? (
              <>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `profile-link ${isActive ? "active" : ""}`
                  }
                >
                  <Person className="profile-icon" />
                  <span className="username">{user.username}</span>
                </NavLink>
                <button className="logout-button" onClick={handleLogout}>
                  <Logout />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="auth-link">
                  Login
                </Link>
                <Link to="/register" className="auth-link register">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <Close /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-content">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `mobile-nav-link ${isActive ? "active" : ""}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {link.icon}
              <span>{link.label}</span>
            </NavLink>
          ))}

          <div className="mobile-user-section">
            {user ? (
              <>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `mobile-nav-link ${isActive ? "active" : ""}`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Person />
                  <span>Profile</span>
                </NavLink>
                <button className="mobile-logout-button" onClick={handleLogout}>
                  <Logout />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="mobile-auth-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="mobile-auth-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Search */}
          <form className="mobile-search" onSubmit={handleSearch}>
            <div className="mobile-search-input-wrapper">
              <Search className="mobile-search-icon" />
              <input
                type="text"
                className="mobile-search-input"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button type="submit" className="mobile-search-button">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

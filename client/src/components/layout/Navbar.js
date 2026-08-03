import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import ImageWithFallback from "../common/ImageWithFallback";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

  // Check if a path is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Generate avatar from name
  const generateAvatar = (name) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=0D8ABC&color=fff&size=128`;
  };

  // Toggle navbar collapse on mobile
  const toggleNavbar = () => {
    setIsExpanded((prev) => !prev);
  };

  // Close navbar when clicking a link on mobile
  const handleLinkClick = () => {
    if (isExpanded) {
      setIsExpanded(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    handleLinkClick();
  };

  // Links shown when user is authenticated
  const authLinks = (
    <>
      {/* Dashboard */}
      <li className="nav-item">
        <Link
          className={`nav-link ${isActive("/dashboard") ? "active" : ""}`}
          to="/dashboard"
          onClick={handleLinkClick}
        >
          <i className="fas fa-tachometer-alt me-1"></i>
          Dashboard
        </Link>
      </li>

      {/* Auctions */}
      <li className="nav-item">
        <Link
          className={`nav-link ${isActive("/auctions") ? "active" : ""}`}
          to="/auctions"
          onClick={handleLinkClick}
        >
          <i className="fas fa-gavel me-1"></i>
          Auctions
        </Link>
      </li>

      {/* Sell Item */}
      <li className="nav-item">
        <Link
          className={`nav-link ${isActive("/create-product") ? "active" : ""}`}
          to="/create-product"
          onClick={handleLinkClick}
        >
          <i className="fas fa-plus-circle me-1"></i>
          Sell Item
        </Link>
      </li>

      {/* User Dropdown */}
      <li className="nav-item dropdown">
        <button
          className="nav-link dropdown-toggle d-flex align-items-center border-0 bg-transparent"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <ImageWithFallback
            src={user?.avatar}
            fallbackSrc={generateAvatar(user ? user.username : "User")}
            alt={user ? user.username : "User"}
            className="avatar-xs me-2"
          />

          <span>{user?.username || "User"}</span>
        </button>

        <ul className="dropdown-menu dropdown-menu-end shadow border-0">
          {/* User Information */}
          <li className="dropdown-header text-center">
            <div className="text-center mb-2">
              <ImageWithFallback
                src={user?.avatar}
                fallbackSrc={generateAvatar(user ? user.username : "User")}
                alt={user ? user.username : "User"}
                className="avatar-md mb-2"
              />

              <p className="mb-0 fw-bold">{user?.username || "User"}</p>

              <small className="text-muted">{user?.email || ""}</small>
            </div>
          </li>

          <li>
            <hr className="dropdown-divider" />
          </li>

          {/* Dashboard */}
          <li>
            <Link
              className="dropdown-item"
              to="/dashboard"
              onClick={handleLinkClick}
            >
              <i className="fas fa-tachometer-alt me-2"></i>
              My Dashboard
            </Link>
          </li>

          {/* Profile */}
          <li>
            <Link
              className="dropdown-item"
              to="/profile"
              onClick={handleLinkClick}
            >
              <i className="fas fa-user me-2"></i>
              My Profile
            </Link>
          </li>

          <li>
            <hr className="dropdown-divider" />
          </li>

          {/* Logout */}
          <li>
            <button
              type="button"
              className="dropdown-item text-danger"
              onClick={handleLogout}
            >
              <i className="fas fa-sign-out-alt me-2"></i>
              Logout
            </button>
          </li>
        </ul>
      </li>
    </>
  );

  // Links shown when user is not authenticated
  const guestLinks = (
    <>
      {/* Login */}
      <li className="nav-item">
        <Link
          className={`nav-link ${isActive("/login") ? "active" : ""}`}
          to="/login"
          onClick={handleLinkClick}
        >
          <i className="fas fa-sign-in-alt me-1"></i>
          Login
        </Link>
      </li>

      {/* Register */}
      <li className="nav-item">
        <Link
          className={`nav-link ${isActive("/register") ? "active" : ""}`}
          to="/register"
          onClick={handleLinkClick}
        >
          <i className="fas fa-user-plus me-1"></i>
          Register
        </Link>
      </li>
    </>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
      <div className="container">
        {/* Brand / Logo */}
        <Link
          className="navbar-brand d-flex align-items-center"
          to="/"
          onClick={handleLinkClick}
        >
          <img
            src="/BidSmart-Auction-House-Logo.png"
            alt="Auction Platform"
            height="30"
            className="me-2"
          />

          <span>Auction Platform</span>
        </Link>

        {/* Mobile Navbar Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMain"
          aria-controls="navbarMain"
          aria-expanded={isExpanded}
          aria-label="Toggle navigation"
          onClick={toggleNavbar}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div
          className={`collapse navbar-collapse ${isExpanded ? "show" : ""}`}
          id="navbarMain"
        >
          {/* Left Side */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Home */}
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/") ? "active" : ""}`}
                to="/"
                onClick={handleLinkClick}
              >
                <i className="fas fa-home me-1"></i>
                Home
              </Link>
            </li>

            {/* Auctions for guest users */}
            {!isAuthenticated && (
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    isActive("/auctions") ? "active" : ""
                  }`}
                  to="/auctions"
                  onClick={handleLinkClick}
                >
                  <i className="fas fa-gavel me-1"></i>
                  Auctions
                </Link>
              </li>
            )}

            {/* Products */}
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/products") ? "active" : ""}`}
                to="/products"
                onClick={handleLinkClick}
              >
                <i className="fas fa-box me-1"></i>
                Products
              </Link>
            </li>
          </ul>

          {/* Right Side */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {isAuthenticated ? authLinks : guestLinks}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

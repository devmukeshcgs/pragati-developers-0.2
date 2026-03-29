import React, { useEffect, useState } from "react";
import { useTheme } from "../hooks/useTheme";
import { Link } from "react-router-dom";

export default function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);
  const toggleMobileMenu = () => setMobileMenuOpen((open) => !open);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeMobileMenu();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header>
      <div className="container">
        <Link to="/" className="logo">
          {theme === "dark" ? (
            <img src="../images/logo-light.svg" alt="Logo" />
          ) : (
            <img src="../images/logo-dark.svg" alt="Logo" />
          )}
        </Link>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/demo">Demo</Link>
            </li>
          </ul>
        </nav>
        <div className="l-nav">
          {/* <a href="#">
            <img src="./images/user.svg" alt="user" />
          </a> */}
          <button
            type="button"
            className="docker"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={toggleMobileMenu}>
            <img
              src="./images/dockersvg.svg"
              width="24"
              height="24"
              alt=""
            />
          </button>
          <div className="theme-toggle" onClick={toggleTheme}>
            <span className="theme-toggle-icon">
              {theme === "dark" ? "☀️" : "🌙"}
            </span>
            {/* {theme === "dark" ? "Light" : "Dark"} */}
          </div>
        </div>
      </div>
      <nav
        id="mobile-menu"
        className={mobileMenuOpen ? "mob-nav open" : "mob-nav"}
        aria-hidden={!mobileMenuOpen}>
        <ul>
          <li>
            <Link to="/" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/demo" onClick={closeMobileMenu}>
              Demo
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

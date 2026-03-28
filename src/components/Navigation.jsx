import React from "react";
import { useTheme } from "../hooks/useTheme";

export default function Navigation() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header>
      <div class="container">
        <div class="logo">
          <img src="./images/logo.svg" alt="Logo" />
        </div>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/pricing">Pricing</a>
            </li>
            <li class="active">
              <a href="/demo">Demo</a>
            </li>
          </ul>
        </nav>
        <div class="l-nav">
          <a href="#">
            <img src="./images/user.svg" alt="user" />
          </a>
          <a href="#" class="docker">
            <img
              src="./images/dockersvg.svg"
              width="24"
              height="24"
              alt="cart"
            />
          </a>
          <button className="theme-toggle" onClick={toggleTheme}>
          <span className="theme-toggle-icon">
            {theme === "dark" ? "☀️" : "🌙"}
          </span>
          {theme === "dark" ? "Light" : "Dark"}
        </button>
        </div>
      </div>
      <nav class="mob-nav">
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li class="active">
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
{
  /* <nav className="flex justify-between items-center px-8 py-6 bg-white shadow-sm sticky top-0 z-50">
      <div className="text-2xl font-bold text-blue-700 underline decoration-4">
        TheDotWebStudio
      </div>
      <a
        href="mailto:thedotwebstudio@gmail.com"
        className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition">
        Request Demo
      </a>
      <div className="flex">
        <a href="/">Home</a>
        <a href="/demo">Demo</a>
        <button className="theme-toggle" onClick={toggleTheme}>
          <span className="theme-toggle-icon">
            {theme === "dark" ? "☀️" : "🌙"}
          </span>
          {theme === "dark" ? "Light" : "Dark"}
        </button>
      </div>
    </nav> */
}

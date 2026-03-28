import React from "react";
import { useTheme } from "../hooks/useTheme";

export default function Navigation() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="flex justify-between items-center px-8 py-6 bg-white shadow-sm sticky top-0 z-50">
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
    </nav>
  );
}

import React from "react";
import { useTheme } from "../hooks/useTheme";

const Header = ({
  selectedBuilding,
  selectedFloor,
  selectedFlat,
  buildings,
  floors,
  flats,
  floorMapping,
  onBuildingChange,
  onFloorChange,
  onFlatChange,
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header>
      <nav>
        <div id="company-name">
          <b>🔺 PRAGATI DEVELOPERS</b>
        </div>
        <div className="controls">
          <select value={selectedBuilding} onChange={onBuildingChange}>
            <option value="">🏢 Select Building</option>
            {buildings.map((building) => (
              <option key={building} value={building}>
                🏢 Building {building}
              </option>
            ))}
          </select>
          <select
            value={selectedFloor}
            onChange={onFloorChange}
            disabled={!selectedBuilding}>
            <option value="">🏠 Select Floor</option>
            {floors.map((floor) => (
              <option key={floor} value={floor}>
                🏠 Floor {floorMapping[floor] || floor}
              </option>
            ))}
          </select>
          <select
            value={selectedFlat}
            onChange={onFlatChange}
            disabled={!selectedFloor}>
            <option value="">🏡 Select Flat</option>
            {flats.map((flat) => {
              const flatNo = flat["Flat No."] || flat.Flat;
              const status = flat.Sold || "Unknown";
              let statusEmoji = "❓"; // Default for unknown

              if (
                status.toLowerCase() === "yes" ||
                status.toLowerCase() === "sold" ||
                status.toLowerCase() === "available"
              ) {
                statusEmoji = "✅"; // Green check for sold/available
              } else if (
                status.toLowerCase() === "no" ||
                status.toLowerCase() === "unsold" ||
                status.toLowerCase() === "unavailable"
              ) {
                statusEmoji = "❌"; // Red X for unsold/unavailable
              }

              // return (
              //   <option key={flatNo} value={flatNo}>
              //     🏡 Flat {flatNo} {statusEmoji} ({status})
              //   </option>
              // );
              return (
                <option key={1 + flatNo} value={flatNo}>
                  🏡 Flat {flatNo} {statusEmoji}
                </option>
              );
            })}
          </select>
        </div>
        <button className="theme-toggle" onClick={toggleTheme}>
          <span className="theme-toggle-icon">
            {theme === "dark" ? "☀️" : "🌙"}
          </span>
          {theme === "dark" ? "Light" : "Dark"}
        </button>
      </nav>
    </header>
  );
};

export default Header;

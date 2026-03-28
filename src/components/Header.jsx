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
      <nav className="flex justify-between items-center px-6 md:px-12 py-5 bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        {" "}
        <div id="company-name">
          <b>🔺Apartment Tracker</b>
        </div>
        <div className="controls">
          <select
            className="custom-select"
            value={selectedBuilding}
            onChange={onBuildingChange}>
            <option value="">🏢 Select Building</option>
            {buildings.map((building) => (
              <option key={building} value={building}>
                Building {building}
              </option>
            ))}
          </select>
          <select
            className="custom-select"
            value={selectedFloor}
            onChange={onFloorChange}
            disabled={!selectedBuilding}>
            <option value="">🏠 Select Floor</option>
            {floors.map((floor) => {
              // console.log(floor);
              return (
                <option key={floor} value={floor}>
                  {floorMapping[floor] || floor}
                </option>
              );
            })}
          </select>
          <select
            className="custom-select"
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
                  Flat {flatNo} {statusEmoji}
                </option>
              );
            })}
          </select>
        </div>
      </nav>
    </header>
  );
};

export default Header;

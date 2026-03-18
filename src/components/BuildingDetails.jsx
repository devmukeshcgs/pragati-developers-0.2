import React from 'react';

const BuildingDetails = ({ selectedBuilding, floorStats, loading, buildingNames }) => {
  const buildingName = buildingNames[selectedBuilding] || selectedBuilding;
  return (
    <div id="building-details">
      <div className="building-info">
        <h1 id="building-name">{buildingName ? `🏢 ${buildingName}` : ""}</h1>
        {loading && <div className="loader">Loading data...</div>}
      </div>
      <div className="floor-info">
        <div id="floor-name" dangerouslySetInnerHTML={{ __html: floorStats }}></div>
      </div>
    </div>
  );
};

export default BuildingDetails;
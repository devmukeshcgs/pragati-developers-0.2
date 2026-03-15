import React from 'react';

const BuildingDetails = ({ selectedBuilding, floorStats }) => {
  return (
    <div id="building-details">
      <div className="building-info">
        <h1 id="building-name">{selectedBuilding ? `🏢 Building ${selectedBuilding}` : ""}</h1>
      </div>
      <div className="floor-info">
        <p id="floor-name" dangerouslySetInnerHTML={{ __html: floorStats }}></p>
      </div>
    </div>
  );
};

export default BuildingDetails;
import React from 'react';

const SidePanel = ({ flatDetails, isVisible }) => {
  return (
    <div className="side-panel" style={{ display: isVisible ? 'flex' : 'none' }}>
      <div className="flat-details">
        <h2>🏡 Flat Details</h2>
        <div id="flat-info">
          {flatDetails && (
            <>
              <h3>🏠 Flat {flatDetails["Flat No."] || flatDetails.Flat}</h3>
              {Object.entries(flatDetails).map(([key, value]) => {
                if (key !== "Flat No." && key !== "Flat") {
                  let displayValue = value || "N/A";
                  
                  // Add emojis for status fields
                  if (key.toLowerCase() === "sold" || key.toLowerCase() === "status" || key.toLowerCase() === "availability") {
                    if (displayValue.toLowerCase() === "yes" || displayValue.toLowerCase() === "sold" || displayValue.toLowerCase() === "available") {
                      displayValue = `✅ ${displayValue}`;
                    } else if (displayValue.toLowerCase() === "no" || displayValue.toLowerCase() === "unsold" || displayValue.toLowerCase() === "unavailable") {
                      displayValue = `❌ ${displayValue}`;
                    } else if (displayValue === "N/A" || displayValue.toLowerCase() === "unknown") {
                      displayValue = `❓ ${displayValue}`;
                    }
                  }
                  
                  return <p key={key}><strong>{key}:</strong> {displayValue}</p>;
                }
                return null;
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
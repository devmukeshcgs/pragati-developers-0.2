import React from "react";

const SidePanel = ({ flatDetails, isVisible }) => {
  return (
    <div
      className="side-panel"
      style={{ display: isVisible ? "flex" : "none" }}>
      <div className="flat-details">
        <h3>🏡 Flat Details</h3>
        <div id="flat-info">
          {flatDetails && (
            <>
              {/* <h3>🏠 Flat {flatDetails["Flat No.."] || flatDetails.Flat}</h3> */}
              <div className="fd">
                <span className="label">No.</span>{" "}
                <span className="fd-val">
                  <strong>{flatDetails.Flat}</strong>
                </span>
              </div>
              {Object.entries(flatDetails).map(([key, value]) => {
                if (key !== "Flat No." && key !== "Flat") {
                  let displayValue = value || "N/A";

                  // Add emojis for status fields
                  if (
                    key.toLowerCase() === "sold" ||
                    key.toLowerCase() === "status" ||
                    key.toLowerCase() === "availability"
                  ) {
                    if (
                      displayValue.toLowerCase() === "yes" ||
                      displayValue.toLowerCase() === "sold" ||
                      displayValue.toLowerCase() === "available"
                    ) {
                      displayValue = `✅ ${displayValue}`;
                    } else if (
                      displayValue.toLowerCase() === "no" ||
                      displayValue.toLowerCase() === "unsold" ||
                      displayValue.toLowerCase() === "unavailable"
                    ) {
                      displayValue = `❌ ${displayValue}`;
                    } else if (
                      displayValue === "N/A" ||
                      displayValue.toLowerCase() === "unknown"
                    ) {
                      displayValue = `❓ ${displayValue}`;
                    }
                  }
                  return (
                    <div key={key} className="fd">
                      <span className="label">{key}</span>{" "}
                      <span className="fd-val">
                        <strong>{displayValue}</strong>
                      </span>
                    </div>
                  );
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

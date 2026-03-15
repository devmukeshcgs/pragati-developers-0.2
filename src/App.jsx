import React, { useState, useEffect, useRef } from 'react';
import * as XLSX from "xlsx";

const buildingIds = {
  "01": "YOUR_FILE_ID_FOR_BUILDING_01",
  "02": "YOUR_FILE_ID_FOR_BUILDING_02",
};

const useGoogleDrive = false;
const buildings = ["01", "02"];

function App() {
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedFloor, setSelectedFloor] = useState("");
  const [selectedFlat, setSelectedFlat] = useState("");
  const [currentData, setCurrentData] = useState([]);
  const [floorMapping, setFloorMapping] = useState({});
  const [floors, setFloors] = useState([]);
  const [flats, setFlats] = useState([]);
  const [floorStats, setFloorStats] = useState("");
  const [flatDetails, setFlatDetails] = useState(null);
  const [svgData, setSvgData] = useState("");
  const [sidePanelVisible, setSidePanelVisible] = useState(false);
  const [svgDoc, setSvgDoc] = useState(null);
  const svgRef = useRef(null);

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => console.log('SW registered: ', registration))
          .catch(error => console.log('SW registration failed: ', error));
      });
    }
  }, []);

  useEffect(() => {
    if (svgRef.current && svgData) {
      const object = svgRef.current;
      const handleLoad = () => {
        setSvgDoc(object.contentDocument);
      };
      object.addEventListener('load', handleLoad);
      return () => object.removeEventListener('load', handleLoad);
    } else {
      // Clear svgDoc when no SVG data
      setSvgDoc(null);
    }
  }, [svgData]);

  useEffect(() => {
    if (svgDoc) {
      colorSoldFlats();
    }
  }, [svgDoc, selectedFloor, currentData]);

  const colorSoldFlats = () => {
    if (selectedFloor && currentData.length > 0 && svgDoc) {
      const floorFlats = currentData.filter((row) => row.Floor == selectedFloor);
      floorFlats.forEach((flat) => {
        const flatNo = flat["Flat No."] || flat.Flat;
        const element = svgDoc.querySelector(`[id="Layer_${flatNo}"]`);
        if (element && flat.Sold && flat.Sold.toLowerCase() === "yes") {
          const polygons = element.querySelectorAll("polygon, path");
          polygons.forEach((p) => (p.style.fill = "red"));
          if (element.tagName === "polygon" || element.tagName === "path") {
            element.style.fill = "red";
          }
        }
      });
    }
  };

  const highlightFlat = (flatNo) => {
    // Reset previous highlight by re-coloring sold flats and clearing selection
    if (svgDoc) {
      // Clear all highlights first
      const allElements = svgDoc.querySelectorAll('[id^="Layer_"]');
      allElements.forEach(element => {
        element.style.stroke = "";
        element.style.strokeWidth = "";
        const polygons = element.querySelectorAll("polygon, path");
        polygons.forEach((p) => (p.style.fill = ""));
        if (element.tagName === "polygon" || element.tagName === "path") {
          element.style.fill = "";
        }
      });
      // Re-color sold flats
      colorSoldFlats();
    }

    if (flatNo && svgDoc) {
      const element = svgDoc.querySelector(`[id="Layer_${flatNo}"]`);
      if (element) {
        element.style.stroke = "#FF0000";
        element.style.strokeWidth = "3";
        const polygons = element.querySelectorAll("polygon, path");
        polygons.forEach((p) => (p.style.fill = "#ADFF2F"));
        if (element.tagName === "polygon" || element.tagName === "path") {
          element.style.fill = "#ADFF2F";
        }
      }
    }
  };

  const loadBuildingData = async (building) => {
    const excelUrl = useGoogleDrive
      ? `https://drive.google.com/uc?export=download&id=${buildingIds[building]}`
      : `/building${building}.xlsx`;
    try {
      const response = await fetch(excelUrl);
      const buffer = await response.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, {
        header: [
          "Floor",
          "Flat",
          "Type",
          "Status",
          "Length",
          "Width",
          "Area",
          "Sold",
        ],
      });
      setCurrentData(data);
      const uniqueFloors = [...new Set(data.map((row) => row.Floor))].sort();
      setFloors(uniqueFloors);
      const mapping = building === "01" ? { 7: "1", 12: "2", 13: "3" } : {};
      setFloorMapping(mapping);
    } catch (err) {
      console.error("Error loading Excel:", err);
    }
  };

  const handleBuildingChange = (e) => {
    const building = e.target.value;
    setSelectedBuilding(building);
    setSelectedFloor("");
    setSelectedFlat("");
    setFloorStats("");
    setFlatDetails(null);
    setSvgData("");
    setSvgDoc(null); // Clear SVG document
    setCurrentData([]); // Clear old data
    setFloors([]);
    setFlats([]);
    setSidePanelVisible(false);
    if (building) {
      loadBuildingData(building);
    }
  };

  const handleFloorChange = (e) => {
    const floor = e.target.value;
    setSelectedFloor(floor);
    setSelectedFlat("");
    setFlatDetails(null);
    setSvgDoc(null); // Clear SVG document before loading new one
    setFlats([]); // Clear old flats
    setSidePanelVisible(false);
    if (floor) {
      setSvgData(`/building${selectedBuilding}-floor-${floorMapping[floor] || floor}.svg`);
      const floorFlats = currentData.filter((row) => row.Floor == floor);
      setFlats(floorFlats);
      const totalFlats = floorFlats.length;
      const soldCount = floorFlats.filter(f => f.Sold && f.Sold.toLowerCase() === "yes").length;
      const unsoldCount = totalFlats - soldCount;
      setFloorStats(`Total Flats: ${totalFlats}, Sold: ${soldCount}, Unsold: ${unsoldCount}`);
    } else {
      setSvgData("");
      setFloorStats("");
    }
  };

  const handleFlatChange = (e) => {
    const flatNo = e.target.value;
    setSelectedFlat(flatNo);
    if (flatNo) {
      setSidePanelVisible(true);
      const flat = flats.find(f => (f["Flat No."] || f.Flat) == flatNo);
      if (flat && flat.Sold && flat.Sold.toLowerCase() === "yes") {
        alert("This flat is already sold");
      }
      setFlatDetails(flat);
      highlightFlat(flatNo);
    } else {
      setSidePanelVisible(false);
      setFlatDetails(null);
      highlightFlat(null);
    }
  };

  return (
    <>
      <header>
        <nav>
          <div id="company-name"><b>PRAGATI DEVELOPERS</b></div>
          <div className="controls">
            <select value={selectedBuilding} onChange={handleBuildingChange}>
              <option value="">Select Building</option>
              {buildings.map(building => (
                <option key={building} value={building}>Building {building}</option>
              ))}
            </select>
            <select
              value={selectedFloor}
              onChange={handleFloorChange}
              disabled={!selectedBuilding}
            >
              <option value="">Select Floor</option>
              {floors.map(floor => (
                <option key={floor} value={floor}>Floor {floorMapping[floor] || floor}</option>
              ))}
            </select>
            <select
              value={selectedFlat}
              onChange={handleFlatChange}
              disabled={!selectedFloor}
            >
              <option value="">Select Flat</option>
              {flats.map(flat => {
                const flatNo = flat["Flat No."] || flat.Flat;
                return (
                  <option key={flatNo} value={flatNo}>
                    Flat {flatNo} ({flat.Sold || "Unknown"})
                  </option>
                );
              })}
            </select>
          </div>
        </nav>
        <div id="building-details">
          <div className="building-info">
            <h1 id="building-name">{selectedBuilding ? `Building ${selectedBuilding}` : ""}</h1>
          </div>
          <div className="floor-info">
            <p id="floor-name" dangerouslySetInnerHTML={{ __html: floorStats }}></p>
          </div>
        </div>
      </header>
      <main>
        <div className="container">
          <div className="floor-plan">
            {svgData && <object ref={svgRef} id="floor-svg" data={svgData} type="image/svg+xml"></object>}
          </div>
          <div className="side-panel" style={{ display: sidePanelVisible ? 'flex' : 'none' }}>
            <div className="flat-details">
              <h2>Flat Details</h2>
              <div id="flat-info">
                {flatDetails && (
                  <>
                    <h3>Flat {flatDetails["Flat No."] || flatDetails.Flat}</h3>
                    {Object.entries(flatDetails).map(([key, value]) => {
                      if (key !== "Flat No." && key !== "Flat") {
                        return <p key={key}><strong>{key}:</strong> {value || "N/A"}</p>;
                      }
                      return null;
                    })}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <p>&copy; 2024 Pragati Developers. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;
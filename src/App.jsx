import React, { useEffect } from "react";
import { useBuildingData } from "./hooks/useBuildingData";
import { colorSoldFlats, highlightFlat } from "./utils/svgUtils";
import Header from "./components/Header";
import BuildingDetails from "./components/BuildingDetails";
import FloorPlan from "./components/FloorPlan";
import SidePanel from "./components/SidePanel";
import Footer from "./components/Footer";
import Demo from "./Demo";
import HomePage from "./HomePage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import Navigation from "./components/Navigation";
function App() {
  const {
    selectedBuilding,
    selectedFloor,
    selectedFlat,
    currentData,
    floorMapping,
    floors,
    flats,
    floorStats,
    flatDetails,
    svgData,
    svgDoc,
    sidePanelVisible,
    buildings,
    buildingNames,
    loading,
    error,
    setSvgDoc,
    setError,
    handleBuildingChange,
    handleFloorChange,
    handleFlatChange,
  } = useBuildingData();

  useEffect(() => {
    // Register service worker
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => console.log("SW registered: ", registration))
          .catch((error) => console.log("SW registration failed: ", error));
      });
    }
  }, []);

  useEffect(() => {
    if (svgDoc) {
      colorSoldFlats(svgDoc, selectedFloor, currentData);
    }
  }, [svgDoc, selectedFloor, currentData]);

  const handleFlatSelection = (e) => {
    handleFlatChange(e);
    highlightFlat(e.target.value, svgDoc, currentData, selectedFloor);
  };

  const handleSvgLoad = (doc) => {
    setSvgDoc(doc);
  };

  return (
    <>
      <Navigation />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/demo" element={<Demo />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;

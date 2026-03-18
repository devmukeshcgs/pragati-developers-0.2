import React, { useEffect } from 'react';
import { useBuildingData } from './hooks/useBuildingData';
import { colorSoldFlats, highlightFlat } from './utils/svgUtils';
import Header from './components/Header';
import BuildingDetails from './components/BuildingDetails';
import FloorPlan from './components/FloorPlan';
import SidePanel from './components/SidePanel';
import Footer from './components/Footer';

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
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => console.log('SW registered: ', registration))
          .catch(error => console.log('SW registration failed: ', error));
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
      <Header
        selectedBuilding={selectedBuilding}
        selectedFloor={selectedFloor}
        selectedFlat={selectedFlat}
        buildings={buildings}
        floors={floors}
        flats={flats}
        floorMapping={floorMapping}
        onBuildingChange={handleBuildingChange}
        onFloorChange={handleFloorChange}
        onFlatChange={handleFlatSelection}
      />
      <main>
      <BuildingDetails
        selectedBuilding={selectedBuilding}
        floorStats={floorStats}
        loading={loading}
        buildingNames={buildingNames}
      />
      {error && (
        <div className="error-banner" role="alert">
          {error}
        </div>
      )}
      <div className="container">
        <FloorPlan
          svgData={svgData}
          onSvgLoad={handleSvgLoad}
          onSvgError={setError}
        />
        <SidePanel
          flatDetails={flatDetails}
          isVisible={sidePanelVisible}
        />
      </div>
    </main>
      <Footer />
    </>
  );
}

export default App;
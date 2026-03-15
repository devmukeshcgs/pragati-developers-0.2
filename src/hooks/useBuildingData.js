import { useState, useEffect } from 'react';
import * as XLSX from "xlsx";

const buildingIds = {
  "01": "YOUR_FILE_ID_FOR_BUILDING_01",
  "02": "YOUR_FILE_ID_FOR_BUILDING_02",
};

const useGoogleDrive = false;
const buildings = ["01", "02"];

export const useBuildingData = () => {
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
  const [svgDoc, setSvgDoc] = useState(null);
  const [sidePanelVisible, setSidePanelVisible] = useState(false);

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
    setSvgDoc(null);
    setCurrentData([]);
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
    setSvgDoc(null);
    setFlats([]);
    setSidePanelVisible(false);
    if (floor) {
      setSvgData(`/building${selectedBuilding}-floor-${floorMapping[floor] || floor}.svg`);
      const floorFlats = currentData.filter((row) => row.Floor == floor);
      setFlats(floorFlats);
      const totalFlats = floorFlats.length;
      const soldCount = floorFlats.filter(f => f.Sold && f.Sold.toLowerCase() === "yes").length;
      const unsoldCount = totalFlats - soldCount;
      setFloorStats(`<span>🏠 Total Flats: ${totalFlats}</span> <span>✅ Sold: ${soldCount}</span> <span>❌ Unsold: ${unsoldCount}</span>`);
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
    } else {
      setSidePanelVisible(false);
      setFlatDetails(null);
    }
  };

  return {
    // State
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

    // Actions
    setSvgDoc,
    handleBuildingChange,
    handleFloorChange,
    handleFlatChange,
  };
};
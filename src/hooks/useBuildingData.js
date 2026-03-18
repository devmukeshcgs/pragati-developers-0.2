import { useState, useEffect } from 'react';
import * as XLSX from "xlsx";
import axios from 'axios';
import buildingData from '../data/data.json';

const useGoogleDrive = false;
const buildings = buildingData.map(b => b.building);
const buildingNames = buildingData.reduce((acc, b) => {
  acc[b.building] = b.name;
  return acc;
}, {});
const buildingLinks = buildingData.reduce((acc, b) => {
  acc[b.building] = b.gSheetLink;
  return acc;
}, {});
const buildingIds = buildingData.reduce((acc, b) => {
  acc[b.building] = b.id;
  return acc;
}, {});

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadBuildingData = async (building) => {
    setLoading(true);
    setError(null);
    const buildingNum = String(
      Number(building.replace(/^B/i, ''))
    ).padStart(2, '0');
    const excelUrl = useGoogleDrive
      ? `/api/sheets/d/${buildingIds[building]}/export?format=xlsx`
      : `/building${buildingNum}.xlsx`;
    try {
      const response = await axios.get(excelUrl, { responseType: 'arraybuffer' });
      const buffer = response.data;
      const workbook = XLSX.read(buffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      
      const data = XLSX.utils.sheet_to_json(worksheet, {
        header: [
          "Floor",
          "Flat",
          "Type",
          "Name",
          "Carpet Area",
          "Terrace Area",
          "Total Carpet Area",
          "Sold",
          "Height",
        ],
      });
      setCurrentData(data);
      // Extract unique floors for the dropdown
      const uniqueFloors = [...new Set(data.map((row) => row.Floor))].sort();
      console.log("Unique Floors", uniqueFloors);
      
      // Remove any falsy values (like undefined or null) from the floors list
      const cleanedFloors = uniqueFloors.filter(Boolean);
      setFloors(cleanedFloors);

      // Simple mapping: floor -> "f" + floor
      const mapping = Object.fromEntries(
        cleanedFloors.map((floor) => [floor, `f${floor}`])
      );
      console.log("floorMapping", mapping);
      setFloorMapping(mapping);
    } catch (err) {
      console.error("Error loading Excel:", err);
      setError("Failed to load building data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBuildingChange = (e) => {
    const building = e.target.value;
    setError(null);
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
    setError(null);
    setSelectedFloor(floor);
    setSelectedFlat("");
    setFlatDetails(null);
    setSvgDoc(null);
    setFlats([]);
    setSidePanelVisible(false);
    if (floor) {
      try {
        const buildingNum = String(
          Number(selectedBuilding.replace(/^B/i, ''))
        ).padStart(2, '0');
        const suffix = floorMapping[floor];
        if (!suffix) throw new Error('Unable to resolve SVG floor suffix');

        setSvgData(`/building${buildingNum}-${suffix}.svg`);

        const floorFlats = currentData.filter((row) => row.Floor == floor);
        setFlats(floorFlats);
        const totalFlats = floorFlats.length;
        const soldCount = floorFlats.filter(f => f.Sold && f.Sold.toLowerCase() === "yes").length;
        const unsoldCount = totalFlats - soldCount;
        setFloorStats(`<span>🏠 Total Flats: ${totalFlats}</span> <span>✅ Sold: ${soldCount}</span> <span>❌ Unsold: ${unsoldCount}</span>`);
      } catch (err) {
        console.error('Error selecting floor:', err);
        setError('Unable to load floor plan. Please try a different floor.');
        setSvgData("");
        setFloorStats("");
      }
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
    buildingNames,
    loading,
    error,

    // Actions
    setSvgDoc,
    setError,
    handleBuildingChange,
    handleFloorChange,
    handleFlatChange,
  };
};
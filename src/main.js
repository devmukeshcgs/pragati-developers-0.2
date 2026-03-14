import "./style.css";
import * as XLSX from "xlsx";

document.querySelector("#app").innerHTML = `

<header>
  <nav>
    <div id="company-name"><b>PRAGATI DEVELOPERS</b></div>
    <div class="controls">
        <select id="building-select">
          <option value="">Select Building</option>
        </select>
        <select id="floor-select" disabled>
          <option value="">Select Floor</option>
        </select>
        <select id="flats-select">
            <option value="">Select Flat</option>
          </select>
      </div>
  </nav>
  <div id="building-details">
      <div class="building-info">
        <h1 id="building-name"></h1>
      </div>
      <div class="floor-info">
        <p id="floor-name"></p>
      </div>
    </div>
</header>
<main>
  <div class="container">
    <div class="floor-plan">
      <object id="floor-svg" data="" type="image/svg+xml"></object>
    </div>
    <div class="side-panel">
    
      <div class="flat-details">
        <h2>Flat Details</h2>
        <div id="flat-info"></div>
      </div>
    </div>
  </div>
  </main>
  <footer>
    <p>&copy; 2024 Pragati Developers. All rights reserved.</p>
  </footer>
`;

let svgDoc = null;
let currentData = [];

// Hide side-panel initially
document.querySelector('.side-panel').style.display = 'none';
let selectedBuilding = "";
let selectedFloor = "";
let floorMapping = {};
let highlightedElement = null;

// Function to color sold flats red
function colorSoldFlats() {
  if (selectedFloor && currentData.length > 0 && svgDoc) {
    const flats = currentData.filter((row) => row.Floor == selectedFloor);
    flats.forEach((flat) => {
      const flatNo = flat["Flat No."] || flat.Flat;
      const element = svgDoc.querySelector(`[id="Layer_${flatNo}"]`);
      if (element && flat.Sold && flat.Sold.toLowerCase() === "yes") {
        // Set fill to red for sold flats
        const polygons = element.querySelectorAll("polygon, path");
        polygons.forEach((p) => (p.style.fill = "red"));
        if (element.tagName === "polygon" || element.tagName === "path") {
          element.style.fill = "red";
        }
      }
    });
  }
}

// Sample Google Drive file IDs for buildings (replace with actual IDs)
const buildingIds = {
  "01": "YOUR_FILE_ID_FOR_BUILDING_01", // Replace with actual Google Drive file ID
  "02": "YOUR_FILE_ID_FOR_BUILDING_02", // Replace with actual Google Drive file ID
};

// To use local files, set useGoogleDrive = false; for Google Drive, set to true
const useGoogleDrive = false; // Change to true to use Google Drive

// Setup building dropdown
const buildings = ["01", "02"]; // Add more as needed
const buildingSelect = document.getElementById("building-select");
buildings.forEach((building) => {
  const option = document.createElement("option");
  option.value = building;
  option.textContent = `Building ${building}`;
  buildingSelect.appendChild(option);
});

buildingSelect.addEventListener("change", function () {
  selectedBuilding = this.value;
  selectedFloor = "";
  floorMapping = {};
  highlightedElement = null; // Reset highlight on building change
  document.getElementById("floor-select").disabled = false;
  document.getElementById("building-name").textContent = selectedBuilding
    ? `Building ${selectedBuilding}`
    : "";
  document.getElementById("floor-name").innerHTML = "";
  document.getElementById("flats-select").innerHTML =
    '<option value="">Select Flat</option>';
  document.getElementById("flat-info").innerHTML = "";
  document.getElementById("floor-svg").data = "";
  document.querySelector('.side-panel').style.display = 'none';

  if (selectedBuilding) {
    // Load Excel for the building
    const excelUrl = useGoogleDrive
      ? `https://drive.google.com/uc?export=download&id=${buildingIds[selectedBuilding]}`
      : `/building${selectedBuilding}.xlsx`;
    fetch(excelUrl)
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        const workbook = XLSX.read(buffer, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        currentData = XLSX.utils.sheet_to_json(worksheet, {
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
        // Populate floors
        const floors = [...new Set(currentData.map((row) => row.Floor))].sort();
        floorMapping = {};
        if (selectedBuilding === "01") {
          floorMapping = { 7: "1", 12: "2", 13: "3" };
        }
        // For other buildings, add mappings as needed
        floors.forEach((floor) => {
          const option = document.createElement("option");
          option.value = floor;
          option.textContent = `Floor ${floorMapping[floor] || floor}`;
          document.getElementById("floor-select").appendChild(option);
        });
      })
      .catch((err) => console.error("Error loading Excel:", err));
  }
});

document.getElementById("floor-select").addEventListener("change", function () {
  selectedFloor = this.value;
  document.getElementById("flats-select").innerHTML =
    '<option value="">Select Flat</option>';
  document.getElementById("flat-info").innerHTML = "";
  document.querySelector('.side-panel').style.display = 'none';

  if (selectedFloor) {
    // Load SVG for building-floor
    document.getElementById("floor-svg").data =
      `/building${selectedBuilding}-floor-${floorMapping[selectedFloor] || selectedFloor}.svg`;
    highlightedElement = null; // Reset highlight on floor change

    // Show flats for the floor
    const flats = currentData.filter((row) => row.Floor == selectedFloor);
    const flatsSelect = document.getElementById("flats-select");
    const totalFlats = flats.length;
    const soldCount = flats.filter(
      (f) => f.Sold && f.Sold.toLowerCase() === "yes",
    ).length;
    const unsoldCount = totalFlats - soldCount;
    document.getElementById("floor-name").innerHTML =
      `Total Flats: ${totalFlats}, Sold: ${soldCount}, Unsold: ${unsoldCount}`;

    flats.forEach((flat) => {
      const option = document.createElement("option");
      option.value = flat["Flat No."] || flat.Flat;
      option.textContent = `Flat ${flat["Flat No."] || flat.Flat} (${flat.Sold || "Unknown"})`;
      flatsSelect.appendChild(option);
    });
  } else {
    document.getElementById("floor-svg").data = "";
    document.getElementById("floor-name").innerHTML = "";
  }
});

// Wait for SVG to load
document.getElementById("floor-svg").addEventListener("load", function () {
  svgDoc = this.contentDocument;
  colorSoldFlats();
});

document.getElementById("flats-select").addEventListener("change", function () {
  const selectedFlatNo = this.value;
  // Reset previous highlight
  if (highlightedElement) {
    highlightedElement.style.stroke = "";
    highlightedElement.style.strokeWidth = "";
    const polygons = highlightedElement.querySelectorAll("polygon, path");
    polygons.forEach((p) => {
      p.style.fill = "";
    });
    if (
      highlightedElement.tagName === "polygon" ||
      highlightedElement.tagName === "path"
    ) {
      highlightedElement.style.fill = "";
    }
    highlightedElement = null;
  }
  // Re-color sold flats red
  colorSoldFlats();
  if (selectedFlatNo) {
    document.querySelector('.side-panel').style.display = 'flex';
    const flats = currentData.filter((row) => row.Floor == selectedFloor);
    const flat = flats.find((f) => (f["Flat No."] || f.Flat) == selectedFlatNo);
    if (flat && flat.Sold && flat.Sold.toLowerCase() === "yes") {
      alert("This flat is already sold");
    }
    showFlatDetails(flat);
    // Highlight SVG element: border and nested polygon fill
    if (svgDoc) {
      const element = svgDoc.querySelector(`[id="Layer_${selectedFlatNo}"]`);
      if (element) {
        // Highlight border
        element.style.stroke = "#FF0000";
        element.style.strokeWidth = "3";
        // Highlight nested polygons
        const polygons = element.querySelectorAll("polygon, path");
        polygons.forEach((p) => {
          // p.style.fill = '#FFFF00';
          p.style.fill = "#ADFF2F"; // Use a different color to distinguish from sold flats
        });
        // If the element itself is a polygon, fill it
        if (element.tagName === "polygon" || element.tagName === "path") {
          element.style.fill = "#ADFF2F";
        }
        highlightedElement = element;
      }
    }
  } else {
    document.querySelector('.side-panel').style.display = 'none';
    hideFlatDetails();
  }
});

function showFlatDetails(flat) {
  // Highlight the corresponding block in SVG
  const flatNo = flat["Flat No."] || flat.Flat;
  // Assume block corresponds to some logic, e.g., flatNo / 10 or something, but for now, perhaps highlight all or find by id
  // Since SVG has block-room, perhaps assume flat is block
  // For simplicity, highlight a block if id matches
  if (svgDoc) {
    // Perhaps highlight the block that contains the flat
    // But since no mapping, perhaps skip highlighting for now, or assume flatNo maps to block
    // For example, if flat 1-6 in block1, etc.
    // But to keep simple, perhaps don't highlight, or add logic later
  }

  const flatInfo = document.getElementById("flat-info");
  let detailsHtml = `<h3>Flat ${flatNo}</h3>`;
  for (const [key, value] of Object.entries(flat)) {
    if (key !== "Flat No." && key !== "Flat") {
      detailsHtml += `<p><strong>${key}:</strong> ${value || "N/A"}</p>`;
    }
  }
  flatInfo.innerHTML = detailsHtml;
}

function hideFlatDetails() {
  document.getElementById("flat-info").innerHTML = "";
  // Unhighlight if needed
}

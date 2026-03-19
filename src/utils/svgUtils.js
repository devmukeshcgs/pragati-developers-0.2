export const colorSoldFlats = (svgDoc, selectedFloor, currentData) => {
  if (selectedFloor && currentData.length > 0 && svgDoc) {
    const floorFlats = currentData.filter((row) => row.Floor == selectedFloor);
    floorFlats.forEach((flat) => {
      const flatNo = flat["Flat No."] || flat.Flat;
      const element = svgDoc.querySelector(`[id="Layer_${flatNo}"]`);
      if (element && flat.Sold && flat.Sold.toLowerCase() === "yes") {
        const polygons = element.querySelectorAll("polygon, path");
        polygons.forEach((p) => (p.style.fill = "#ff000059"));
        if (element.tagName === "polygon" || element.tagName === "path") {
          element.style.fill = "#ff000059";
        }
      }
    });
  }
};

export const highlightFlat = (flatNo, svgDoc, currentData, selectedFloor) => {
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
    colorSoldFlats(svgDoc, selectedFloor, currentData);
  }

  if (flatNo && svgDoc) {
    const element = svgDoc.querySelector(`[id="Layer_${flatNo}"]`);
    if (element) {
      element.style.stroke = "#ff000059";
      element.style.strokeWidth = "3";
      const polygons = element.querySelectorAll("polygon, path");
      polygons.forEach((p) => (p.style.fill = "#acff2fad"));
      if (element.tagName === "polygon" || element.tagName === "path") {
        element.style.fill = "#acff2fad";
      }
    }
  }
};
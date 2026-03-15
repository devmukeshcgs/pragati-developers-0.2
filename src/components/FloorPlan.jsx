import React, { useRef, useEffect } from 'react';

const FloorPlan = ({ svgData, onSvgLoad }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (svgRef.current && svgData) {
      const object = svgRef.current;
      const handleLoad = () => {
        onSvgLoad(object.contentDocument);
      };
      object.addEventListener('load', handleLoad);
      return () => object.removeEventListener('load', handleLoad);
    } else {
      onSvgLoad(null);
    }
  }, [svgData, onSvgLoad]);

  return (
    <div className="floor-plan">
      {svgData && <object ref={svgRef} id="floor-svg" data={svgData} type="image/svg+xml"></object>}
    </div>
  );
};

export default FloorPlan;
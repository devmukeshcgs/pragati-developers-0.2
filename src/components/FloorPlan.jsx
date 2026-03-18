import React, { useRef, useEffect } from 'react';

const FloorPlan = ({ svgData, onSvgLoad, onSvgError }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (svgRef.current && svgData) {
      const object = svgRef.current;
      const handleLoad = () => {
        onSvgLoad(object.contentDocument);
      };
      const handleError = () => {
        onSvgError?.('Failed to load floor plan SVG.');
      };

      object.addEventListener('load', handleLoad);
      object.addEventListener('error', handleError);
      return () => {
        object.removeEventListener('load', handleLoad);
        object.removeEventListener('error', handleError);
      };
    } else {
      onSvgLoad(null);
    }
  }, [svgData, onSvgLoad, onSvgError]);

  return (
    <div className="floor-plan">
      {svgData && (
        <object
          ref={svgRef}
          id="floor-svg"
          data={svgData}
          type="image/svg+xml"
          onError={() => onSvgError?.('Failed to load floor plan SVG.')}
        />
      )}
    </div>
  );
};

export default FloorPlan;
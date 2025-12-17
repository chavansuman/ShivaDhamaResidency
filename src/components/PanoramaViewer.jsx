import React, { useEffect, useRef } from 'react';

const PanoramaViewer = ({
  image,
  height = '500px',
  autoLoad = true,
  showZoomCtrl = true,
  showFullscreenCtrl = true,
}) => {
  const viewerRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !window.pannellum) return;

    // Destroy previous instance if it exists
    if (viewerRef.current) {
      viewerRef.current.destroy();
    }

    viewerRef.current = window.pannellum.viewer(containerRef.current, {
      type: 'equirectangular',
      panorama: image,
      autoLoad,
      showZoomCtrl,
      showFullscreenCtrl,
    });

    return () => {
      if_toggle:
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, [image, autoLoad, showZoomCtrl, showFullscreenCtrl]);

  return (
    <div>
      {/* <h2 className="text-2xl font-bold text-gray-900" style={{ marginBottom: '1rem', marginTop: '3rem', textAlign: 'center' }}>Virtual Tour</h2> */}
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height,
          borderRadius: '12px',
          overflow: 'hidden',
        }}
        className="border border-gray-200 bg-black"
      />
    </div>
  );
};

export default PanoramaViewer;

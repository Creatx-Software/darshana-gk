'use client';

import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [isHidden, setIsHidden] = useState(false);
  const [shouldDisplay, setShouldDisplay] = useState(true);

  useEffect(() => {
    // Display loading screen for 8 seconds
    const timer = setTimeout(() => {
      setIsHidden(true);

      // Remove from DOM after transition completes
      setTimeout(() => {
        setShouldDisplay(false);
      }, 800);
    }, 8000); // 8 seconds as originally intended

    return () => clearTimeout(timer);
  }, []);

  if (!shouldDisplay) return null;

  return (
    <div className={`loading-screen ${isHidden ? 'hidden' : ''}`} id="loadingScreen">
      <div className="loading-content">
        <div className="loading-logo">
          <object
            data="/logo-animated.svg"
            type="image/svg+xml"
            className="loading-svg-object"
            aria-label="Darshana Gal Ketayam Logo"
          />
        </div>
        <div className="loading-bar">
          <div className="loading-progress"></div>
        </div>
      </div>
    </div>
  );
}

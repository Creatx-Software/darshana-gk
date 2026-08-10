'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function LoadingScreen() {
  const pathname = usePathname();
  const [isHidden, setIsHidden] = useState(false);
  const [shouldDisplay, setShouldDisplay] = useState(pathname === '/');

  useEffect(() => {
    // Display loading screen for 8 seconds
    const timer = setTimeout(() => {
      setIsHidden(true);

      // Remove from DOM after transition completes
      setTimeout(() => {
        setShouldDisplay(false);
      }, 800);
    }, 5000); // 8 seconds as originally intended

    return () => clearTimeout(timer);
  }, []);

  if (!shouldDisplay) return null;

  return (
    <div className={`loading-screen ${isHidden ? 'hidden' : ''}`} id="loadingScreen">
      <div className="loading-content">
        <div className="loading-logo">
          {/*
            Deliberately an <img>, not an <object>. An <object> embeds the SVG as
            a document, and Gecko paints that document's canvas opaque white —
            white logo strokes on a white canvas render as a solid white block.
            An <img> composites transparently in every engine, and the SVG's own
            CSS @keyframes still run because they live inside the file.
          */}
          <img
            src="/logo-animated.svg"
            className="loading-svg-object"
            alt="Darshana Gal Ketayam"
          />
        </div>
        <div className="loading-bar">
          <div className="loading-progress"></div>
        </div>
      </div>
    </div>
  );
}

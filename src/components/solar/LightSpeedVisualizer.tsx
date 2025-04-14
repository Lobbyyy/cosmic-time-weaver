
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { type PlanetData } from './PlanetCard';

type LightSpeedVisualizerProps = {
  planets: PlanetData[];
  selectedPlanet: PlanetData | null;
};

const LightSpeedVisualizer: React.FC<LightSpeedVisualizerProps> = ({ planets, selectedPlanet }) => {
  const [animating, setAnimating] = useState(false);
  
  // Average distances from Sun in light-minutes (approximate)
  const lightTravelTimes: Record<string, number> = {
    mercury: 3.2,
    venus: 6,
    earth: 8.3,
    mars: 12.7,
    jupiter: 43.3,
    saturn: 79.3,
    uranus: 159.6,
    neptune: 249.6
  };
  
  // Calculate light time between planets
  const getLightTimeBetween = (planet1: string, planet2: string): number => {
    if (!planet1 || !planet2) return 0;
    // This is a very simplified calculation for visualization purposes
    return Math.abs(lightTravelTimes[planet1] - lightTravelTimes[planet2]);
  };
  
  const startAnimation = () => {
    if (!selectedPlanet) return;
    setAnimating(true);
    setTimeout(() => setAnimating(false), 5000); // Reset after animation completes
  };
  
  // Filter out selected planet from visualization
  const otherPlanets = planets.filter(p => selectedPlanet && p.id !== selectedPlanet.id);
  
  return (
    <div className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
      <h3 className="text-2xl font-space font-bold text-cosmic-accent2 mb-4">
        Light Speed Communication
      </h3>
      
      {selectedPlanet ? (
        <>
          <p className="text-white/70 mb-6">
            If you sent a message from {selectedPlanet.name} at the speed of light, here's how long it would take to reach other planets:
          </p>
          
          <div className="mb-6">
            <button 
              onClick={startAnimation}
              disabled={animating}
              className="px-6 py-2 bg-cosmic-accent2/30 hover:bg-cosmic-accent2/50 rounded-full text-white font-space tracking-wider transition-all duration-300"
            >
              {animating ? "Transmitting Signal..." : "Send Light Signal"}
            </button>
          </div>
          
          <div className="space-y-4">
            {otherPlanets.map(planet => {
              const travelTimeMinutes = getLightTimeBetween(selectedPlanet.id, planet.id);
              const formattedTime = travelTimeMinutes < 1 
                ? `${(travelTimeMinutes * 60).toFixed(1)} seconds` 
                : `${travelTimeMinutes.toFixed(1)} minutes`;
              
              return (
                <div key={planet.id} className="relative">
                  <div className="flex items-center">
                    <div className="relative">
                      <div 
                        className="w-8 h-8 rounded-full overflow-hidden"
                        style={{ 
                          backgroundImage: `url(${selectedPlanet.texture})`,
                          backgroundSize: 'cover'
                        }}
                      />
                      {animating && (
                        <motion.div
                          className="absolute top-1/2 left-1/2 w-8 h-8 rounded-full bg-cosmic-accent2/30"
                          initial={{ x: 0, y: 0, scale: 0.5, opacity: 0.8 }}
                          animate={{ 
                            x: "calc(100vw - 200px)", 
                            scale: [0.5, 2, 0.5],
                            opacity: [0.8, 0.4, 0]
                          }}
                          transition={{ 
                            duration: travelTimeMinutes / 3, // Speed up for visualization
                            ease: "linear"
                          }}
                        />
                      )}
                    </div>
                    
                    <div className="flex-1 mx-4 h-0.5 bg-gradient-to-r from-cosmic-accent1/50 to-cosmic-accent2/50 relative">
                      <div 
                        className="absolute text-xs text-white/60 top-2 left-1/2 transform -translate-x-1/2"
                      >
                        {formattedTime}
                      </div>
                    </div>
                    
                    <div 
                      className="w-8 h-8 rounded-full overflow-hidden"
                      style={{ 
                        backgroundImage: `url(${planet.texture})`,
                        backgroundSize: 'cover'
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          
          <p className="mt-6 text-sm text-white/50 italic">
            These visualizations use simplified distances and don't account for planetary orbits or the constant motion of celestial bodies.
          </p>
        </>
      ) : (
        <div className="text-center py-8 text-white/50">
          Select a planet to see light travel times
        </div>
      )}
    </div>
  );
};

export default LightSpeedVisualizer;


import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type TimeZoneMarker = {
  city: string;
  country: string;
  offsetHours: number;
  lat: number;
  long: number;
  color: string;
};

const timeZones: TimeZoneMarker[] = [
  { city: 'New York', country: 'USA', offsetHours: -4, lat: 40.7128, long: -74.0060, color: 'rgb(0, 229, 255)' },
  { city: 'London', country: 'UK', offsetHours: 1, lat: 51.5074, long: -0.1278, color: 'rgb(255, 215, 0)' },
  { city: 'Tokyo', country: 'Japan', offsetHours: 9, lat: 35.6762, long: 139.6503, color: 'rgb(255, 0, 255)' },
  { city: 'Sydney', country: 'Australia', offsetHours: 10, lat: -33.8688, long: 151.2093, color: 'rgb(30, 144, 255)' },
  { city: 'Rio de Janeiro', country: 'Brazil', offsetHours: -3, lat: -22.9068, long: -43.1729, color: 'rgb(50, 205, 50)' },
  { city: 'Cairo', country: 'Egypt', offsetHours: 2, lat: 30.0444, long: 31.2357, color: 'rgb(255, 165, 0)' },
  { city: 'Los Angeles', country: 'USA', offsetHours: -7, lat: 34.0522, long: -118.2437, color: 'rgb(255, 69, 0)' },
  { city: 'Moscow', country: 'Russia', offsetHours: 3, lat: 55.7558, long: 37.6173, color: 'rgb(220, 20, 60)' },
];

const Globe = () => {
  const [rotation, setRotation] = useState(0);
  const [hoveredCity, setHoveredCity] = useState<TimeZoneMarker | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Rotation based on time (24 hours = 360 degrees)
      const hours = currentTime.getUTCHours();
      const minutes = currentTime.getUTCMinutes();
      const totalMinutes = (hours * 60) + minutes;
      const newRotation = (totalMinutes / (24 * 60)) * 360;
      setRotation(newRotation);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [currentTime]);
  
  // Convert lat/long to x/y coordinates on the globe
  const getCoordinates = (lat: number, long: number) => {
    // Simple equirectangular projection
    const x = ((long + 180) / 360) * 100;
    const y = ((90 - lat) / 180) * 100;
    return { x, y };
  };
  
  // Get local time for a timezone
  const getLocalTime = (offsetHours: number) => {
    const time = new Date(currentTime);
    time.setHours(time.getUTCHours() + offsetHours);
    return time.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };
  
  return (
    <div className="relative w-full max-w-2xl mx-auto aspect-square">
      {/* Globe container */}
      <motion.div 
        className="planet relative w-full h-full rounded-full overflow-hidden"
        style={{ 
          backgroundImage: 'url("https://eoimages.gsfc.nasa.gov/images/imagerecords/57000/57752/land_shallow_topo_2048.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: `${-rotation}% center`,
          transition: 'background-position 0.5s linear',
          '--planet-glow-color': '30, 144, 255'
        } as React.CSSProperties}
      >
        {/* Day/night shadow */}
        <div 
          className="earth-shadow" 
          style={{ '--earth-rotation': `${rotation}deg` } as React.CSSProperties} 
        />
        
        {/* Time zone markers */}
        {timeZones.map((zone, idx) => {
          const { x, y } = getCoordinates(zone.lat, zone.long);
          const localTime = getLocalTime(zone.offsetHours);
          
          return (
            <motion.div
              key={idx}
              className="absolute"
              style={{ 
                left: `${x}%`, 
                top: `${y}%`, 
                transform: 'translate(-50%, -50%)',
                zIndex: 5
              }}
              initial={{ scale: 0.8, opacity: 0.6 }}
              animate={{ 
                scale: hoveredCity?.city === zone.city ? 1.2 : 0.8,
                opacity: hoveredCity?.city === zone.city ? 1 : 0.6
              }}
            >
              <motion.div
                className="time-marker cursor-pointer"
                style={{ 
                  '--marker-color': zone.color,
                  width: hoveredCity?.city === zone.city ? '8px' : '4px',
                  height: hoveredCity?.city === zone.city ? '8px' : '4px',
                  backgroundColor: zone.color
                } as React.CSSProperties}
                onMouseEnter={() => setHoveredCity(zone)}
                onMouseLeave={() => setHoveredCity(null)}
                animate={{ 
                  boxShadow: hoveredCity?.city === zone.city 
                    ? [
                        `0 0 8px 2px ${zone.color}`,
                        `0 0 12px 4px ${zone.color}`,
                        `0 0 8px 2px ${zone.color}`
                      ]
                    : `0 0 6px 1px ${zone.color}`
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              
              {/* City info tooltip */}
              {hoveredCity?.city === zone.city && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 rounded bg-cosmic-accent1/10 backdrop-blur-md border border-cosmic-accent1/30 text-white text-xs whitespace-nowrap z-10"
                >
                  <div className="font-semibold text-cosmic-accent1">{zone.city}, {zone.country}</div>
                  <div className="text-white/80">{localTime}</div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
      
      {/* Time indicator */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-10 text-center">
        <motion.div 
          className="text-4xl font-space font-light tracking-wider text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {currentTime.toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
          })}
        </motion.div>
        <div className="text-sm text-white/50 font-space tracking-wider mt-1">UTC TIME</div>
      </div>
    </div>
  );
};

export default Globe;

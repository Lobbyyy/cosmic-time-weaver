
import React from 'react';
import { motion } from 'framer-motion';

export type PlanetData = {
  id: string;
  name: string;
  diameter: number; // km
  rotationPeriod: number; // Earth days
  orbitPeriod: number; // Earth days
  description: string;
  color: string;
  texture: string;
  funFact?: string; // Added fun fact property
};

type PlanetCardProps = {
  planet: PlanetData;
  currentTime: Date;
  onClick: (planet: PlanetData) => void;
  isSelected: boolean;
};

const PlanetCard: React.FC<PlanetCardProps> = ({ planet, currentTime, onClick, isSelected }) => {
  // Calculate rotation based on Earth time - this is illustrative, not scientifically accurate
  const getRotationDegree = () => {
    const earthHours = currentTime.getHours() + (currentTime.getMinutes() / 60);
    // Scale based on planet's rotation period relative to Earth
    const rotationFactor = planet.id === 'earth' ? 1 : (1 / planet.rotationPeriod);
    return ((earthHours / 24) * 360 * rotationFactor) % 360;
  };
  
  // Calculate current planet time (in Earth hours)
  const getPlanetTime = () => {
    const earthHours = currentTime.getHours() + (currentTime.getMinutes() / 60);
    // For planets with different day lengths
    const planetHours = (earthHours * 24 / planet.rotationPeriod) % 24;
    const hours = Math.floor(planetHours);
    const minutes = Math.floor((planetHours - hours) * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };
  
  // Get the content to display when expanded - prefer fun fact if available
  const getExpandedContent = () => {
    if (planet.funFact) {
      return (
        <div className="mt-1">
          <div className="text-cosmic-accent2 font-bold text-xs mb-1">FUN FACT</div>
          <p>{planet.funFact}</p>
        </div>
      );
    }
    
    return <p>{planet.description}</p>;
  };
  
  return (
    <motion.div
      className={`p-4 rounded-xl backdrop-blur-sm ${isSelected ? 'border-2 border-white/30' : 'border border-white/10'} cursor-pointer overflow-hidden transition-all duration-300`}
      style={{ 
        backgroundColor: `${planet.color}20`,
        boxShadow: isSelected ? `0 0 20px ${planet.color}40` : 'none' 
      }}
      onClick={() => onClick(planet)}
      whileHover={{ scale: 1.02 }}
      animate={{ 
        y: isSelected ? -10 : 0,
        boxShadow: isSelected ? `0 10px 25px ${planet.color}30` : 'none'
      }}
    >
      <div className="flex items-center">
        {/* Planet visualization */}
        <div className="relative mr-4">
          <motion.div
            className="planet w-16 h-16"
            style={{ 
              backgroundImage: `url(${planet.texture})`,
              backgroundSize: 'cover',
              '--planet-glow-color': planet.color.replace('rgb(', '').replace(')', ''),
              backgroundPosition: `${getRotationDegree()}% center`
            } as React.CSSProperties}
            animate={{ rotate: 360 }}
            transition={{ duration: planet.rotationPeriod * 10, repeat: Infinity, ease: "linear" }}
          />
        </div>
        
        {/* Planet info */}
        <div className="flex-1">
          <h3 className="text-xl font-space font-bold" style={{ color: planet.color }}>
            {planet.name}
          </h3>
          <div className="text-sm text-white/70">
            Local time: <span className="font-mono">{getPlanetTime()}</span>
          </div>
          <div className="flex gap-4 mt-2 text-xs text-white/60">
            <div>
              Rotation: {planet.rotationPeriod} Earth days
            </div>
            <div>
              Year: {planet.orbitPeriod} Earth days
            </div>
          </div>
        </div>
      </div>
      
      {isSelected && (
        <motion.div 
          className="mt-4 text-sm text-white/80"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
        >
          {getExpandedContent()}
        </motion.div>
      )}
    </motion.div>
  );
};

export default PlanetCard;

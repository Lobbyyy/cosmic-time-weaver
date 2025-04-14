
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { type PlanetData } from './PlanetCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CakeIcon, CircleDot } from 'lucide-react';

type AgeCalculatorProps = {
  planets: PlanetData[];
  onCalculate?: (results: {planet: PlanetData, age: number}[]) => void;
};

const AgeCalculator: React.FC<AgeCalculatorProps> = ({ planets, onCalculate }) => {
  const [age, setAge] = useState<string>('');
  const [results, setResults] = useState<{planet: PlanetData, age: number}[]>([]);
  
  const calculateAge = () => {
    if (!age || isNaN(Number(age)) || Number(age) <= 0) return;
    
    const earthAgeInDays = Number(age) * 365.25; // Approximate days in Earth year
    const calculatedAges = planets.map(planet => {
      // Calculate age on other planets based on their orbital period
      const planetAge = earthAgeInDays / planet.orbitPeriod;
      return {
        planet,
        age: Number(planetAge.toFixed(2))
      };
    });
    
    setResults(calculatedAges);
    
    // Notify parent component of the results
    if (onCalculate) {
      onCalculate(calculatedAges);
    }
  };
  
  // Track visible card index for indicators
  const [visibleCardIndex, setVisibleCardIndex] = useState(0);
  
  // Function to check if a result card is visible and update the indicators
  const handleCardVisibility = (index: number, isVisible: boolean) => {
    if (isVisible) {
      setVisibleCardIndex(index);
    }
  };
  
  return (
    <div className="p-6 rounded-xl border border-white/10 bg-cosmic-accent1/5 backdrop-blur-md">
      <h3 className="text-2xl font-space font-bold text-cosmic-accent1 mb-4">
        Your Age Across the Solar System
      </h3>
      
      <div className="flex flex-wrap gap-4 items-end mb-6">
        <div className="flex-1">
          <label className="block text-sm text-white/70 mb-2">Your age on Earth (in years)</label>
          <Input
            type="number"
            min="0"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter your age"
            className="bg-white/5 border-white/20 text-white"
          />
        </div>
        <Button 
          onClick={calculateAge}
          className="bg-cosmic-accent1 hover:bg-cosmic-accent1/80 text-cosmic flex items-center gap-2"
        >
          <CakeIcon size={16} />
          Calculate
        </Button>
      </div>
      
      {results.length > 0 && (
        <>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {results.map(({ planet, age }) => (
              <motion.div 
                key={planet.id}
                className="p-4 rounded-lg backdrop-blur-sm"
                style={{ backgroundColor: `${planet.color}20` }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: results.findIndex(r => r.planet.id === planet.id) * 0.1 }}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full"
                    style={{ 
                      backgroundImage: `url(${planet.texture})`,
                      backgroundSize: 'cover',
                      boxShadow: `0 0 10px ${planet.color}40`
                    }}
                  ></div>
                  <div>
                    <div className="text-sm font-medium text-white/70">On {planet.name}</div>
                    <div className="text-2xl font-space font-bold" style={{ color: planet.color }}>
                      {age} years old
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Carousel Indicators */}
          <div className="flex justify-center items-center gap-2 mt-6">
            <div className="text-xs text-white/60 mr-2">Scroll to see more</div>
            <div className="flex gap-1.5">
              {results.slice(0, Math.min(5, results.length)).map((_, index) => (
                <CircleDot 
                  key={index}
                  size={12}
                  className={`transition-all duration-300 ${visibleCardIndex === index ? 'text-cosmic-accent1' : 'text-white/30'}`}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AgeCalculator;

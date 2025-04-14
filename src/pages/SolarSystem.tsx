
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import PlanetCard, { PlanetData } from '../components/solar/PlanetCard';
import AgeCalculator from '../components/solar/AgeCalculator';
import LightSpeedVisualizer from '../components/solar/LightSpeedVisualizer';

// Planet data - texture URLs should be replaced with actual image paths
const planetData: PlanetData[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    diameter: 4879,
    rotationPeriod: 58.6,
    orbitPeriod: 88,
    description: 'The smallest and innermost planet, Mercury experiences extreme temperature variations and has virtually no atmosphere.',
    color: 'rgb(180, 180, 180)',
    texture: 'https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004720/mercury_1k.jpg'
  },
  {
    id: 'venus',
    name: 'Venus',
    diameter: 12104,
    rotationPeriod: 243,
    orbitPeriod: 225,
    description: 'Venus has a thick atmosphere that traps heat, making it the hottest planet in our solar system despite not being the closest to the Sun.',
    color: 'rgb(255, 198, 73)',
    texture: 'https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004720/venus_1k.jpg'
  },
  {
    id: 'earth',
    name: 'Earth',
    diameter: 12756,
    rotationPeriod: 1,
    orbitPeriod: 365.25,
    description: 'Our home planet is the only known world that supports life, with liquid water on its surface and an oxygen-rich atmosphere.',
    color: 'rgb(30, 144, 255)',
    texture: 'https://eoimages.gsfc.nasa.gov/images/imagerecords/57000/57752/land_shallow_topo_2048.jpg'
  },
  {
    id: 'mars',
    name: 'Mars',
    diameter: 6792,
    rotationPeriod: 1.03,
    orbitPeriod: 687,
    description: 'The "Red Planet" has polar ice caps, seasons, and evidence of ancient rivers and lakes, making it a prime target for the search for life.',
    color: 'rgb(255, 69, 0)',
    texture: 'https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004720/mars_1k.jpg'
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    diameter: 142984,
    rotationPeriod: 0.41,
    orbitPeriod: 4333,
    description: 'The largest planet in our solar system, Jupiter is a gas giant with a distinctive Great Red Spot and dozens of moons.',
    color: 'rgb(255, 165, 0)',
    texture: 'https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004720/jupiter_1k.jpg'
  },
  {
    id: 'saturn',
    name: 'Saturn',
    diameter: 120536,
    rotationPeriod: 0.45,
    orbitPeriod: 10759,
    description: 'Famous for its stunning ring system, Saturn is a gas giant composed primarily of hydrogen and helium.',
    color: 'rgb(218, 165, 32)',
    texture: 'https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004720/saturn_1k.jpg'
  },
  {
    id: 'uranus',
    name: 'Uranus',
    diameter: 51118,
    rotationPeriod: 0.72,
    orbitPeriod: 30687,
    description: 'Uranus is an ice giant that rotates on its side, giving it extreme seasonal variations and unusual magnetic field behavior.',
    color: 'rgb(0, 255, 255)',
    texture: 'https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004720/uranus_1k.jpg'
  },
  {
    id: 'neptune',
    name: 'Neptune',
    diameter: 49528,
    rotationPeriod: 0.67,
    orbitPeriod: 60190,
    description: 'The windiest planet in our solar system, Neptune is a distant ice giant with a dynamic atmosphere featuring visible weather patterns.',
    color: 'rgb(0, 0, 255)',
    texture: 'https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004720/neptune_1k.jpg'
  }
];

const SolarSystem = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const handleSelectPlanet = (planet: PlanetData) => {
    if (selectedPlanet?.id === planet.id) {
      setSelectedPlanet(null);
    } else {
      setSelectedPlanet(planet);
    }
  };
  
  return (
    <Layout>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="container mx-auto px-4 py-16"
      >
        <div className="text-center mb-16">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold font-space tracking-wider text-cosmic-accent2"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            SOLAR SYSTEM TIME
          </motion.h1>
          <motion.p 
            className="mt-4 text-lg text-white/70 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Explore how time flows differently across our solar system. Each planet rotates and orbits at its own pace,
            creating unique time experiences.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {planetData.map(planet => (
            <PlanetCard 
              key={planet.id}
              planet={planet}
              currentTime={currentTime}
              onClick={handleSelectPlanet}
              isSelected={selectedPlanet?.id === planet.id}
            />
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <AgeCalculator planets={planetData} />
          <LightSpeedVisualizer planets={planetData} selectedPlanet={selectedPlanet} />
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <p className="text-white/60 italic max-w-3xl mx-auto">
            "Time is relative, its only worth depends upon what we do as it is passing." - Albert Einstein
          </p>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default SolarSystem;

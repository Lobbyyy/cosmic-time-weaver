
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Clock, Globe, Planets } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cosmic/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <motion.div 
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="relative w-8 h-8"
          >
            <div className="absolute inset-0 rounded-full border-2 border-cosmic-accent1/30"></div>
            <div className="absolute inset-0 rounded-full border border-cosmic-accent1/50 rotate-45"></div>
            <div className="absolute inset-0 rounded-full border border-cosmic-accent1/70 -rotate-45"></div>
          </motion.div>
          <h1 className="text-xl font-space font-bold tracking-wider">
            <span className="text-cosmic-accent1">BREAKING</span> <span className="text-white">TIME</span>
          </h1>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`flex items-center gap-2 py-2 px-4 rounded-full transition-all duration-300 ${location.pathname === '/' ? 'bg-white/10 text-cosmic-accent1' : 'text-white/70 hover:text-white'}`}>
            <Globe size={16} />
            <span className="font-space tracking-wide text-sm">EARTH TIME</span>
          </Link>
          <Link to="/solar-system" className={`flex items-center gap-2 py-2 px-4 rounded-full transition-all duration-300 ${location.pathname === '/solar-system' ? 'bg-white/10 text-cosmic-accent2' : 'text-white/70 hover:text-white'}`}>
            <Planets size={16} />
            <span className="font-space tracking-wide text-sm">SOLAR SYSTEM</span>
          </Link>
        </div>

        <div className="text-white font-mono text-sm md:text-base">
          <span className="animate-pulse-glow inline-block w-2 h-2 bg-cosmic-accent1 rounded-full mr-2"></span>
          {formatTime(currentTime)}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

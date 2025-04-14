
import React from 'react';
import { motion } from 'framer-motion';
import Globe from '../components/earth/Globe';
import Layout from '../components/layout/Layout';

const Earth = () => {
  return (
    <Layout>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="container mx-auto px-4 py-16 min-h-screen flex flex-col"
      >
        <div className="text-center mb-16">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold font-space tracking-wider text-cosmic-accent1"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            EARTH TIME
          </motion.h1>
          <motion.p 
            className="mt-4 text-lg text-white/70 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Visualizing time zones across our planet. Each glowing marker represents a major city.
            Hover over the markers to see local time. The shadow represents day and night.
          </motion.p>
        </div>
        
        <motion.div 
          className="flex-1 flex flex-col items-center justify-center relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <div className="absolute inset-0 bg-cosmic-accent4/5 rounded-full blur-3xl"></div>
          <Globe />
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <p className="text-white/60 italic">
            "Time is the substance I am made of. Time is a river which sweeps me along, but I am the river." - Jorge Luis Borges
          </p>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default Earth;

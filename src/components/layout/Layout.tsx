
import React from 'react';
import Navbar from './Navbar';
import { motion } from 'framer-motion';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background particles */}
      {Array.from({ length: 20 }).map((_, index) => (
        <motion.div
          key={index}
          className="cosmic-particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            '--particle-duration': `${8 + Math.random() * 12}s`,
            '--particle-delay': `${Math.random() * 5}s`,
          } as React.CSSProperties}
        />
      ))}
      
      <div className="cosmic-bg fixed inset-0 z-0 opacity-5"></div>
      
      <Navbar />
      
      <main className="pt-16 relative z-10">
        {children}
      </main>
    </div>
  );
};

export default Layout;

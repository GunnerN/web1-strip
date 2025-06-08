import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const stats = [
    { label: 'Total Supply', value: '1 Billion $STRIP' },
    { label: 'Token Economy', value: 'Community Owned' },
    { label: 'Distribution', value: '100% Supply' },
  ];

  return (
    <div className="relative pt-24 pb-16 sm:pt-32 sm:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h1 
            className="text-4xl sm:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Where Crypto Meets Pleasure
          </motion.h1>
          
          <motion.h2 
            className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Strip Token - The boldest meme coin combining two of the internet's biggest obsessions: crypto gains and adult entertainment
          </motion.h2>

          <motion.p 
            className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Almost everyone is shy of adult content online, yet Pornhub ranks among the most visited websites globally, OnlyFans generates billions, and StripChat hosts hundreds of active streamers daily. If they're making money, you can too.
            Buy $Strip Early.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <button className="px-8 py-4 bg-gradient-to-r from-strip-red to-red-600 rounded-lg font-bold text-white hover:from-red-600 hover:to-strip-red transition-all duration-300 transform hover:scale-105">
              Get $Strip Now
            </button>
            <button className="px-8 py-4 border-2 border-strip-gold rounded-lg font-bold text-strip-gold hover:bg-strip-gold hover:text-white transition-all duration-300 transform hover:scale-105">
              Join Community
            </button>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {stats.map((stat, index) => (
              <div key={index} className="bg-strip-dark-alt p-6 rounded-lg">
                <h3 className="text-strip-gold text-lg font-semibold mb-2">{stat.label}</h3>
                <p className="text-white text-xl">{stat.value}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero; 
import React from 'react';
import { motion } from 'framer-motion';

const TwoWorlds = () => {
  const contentBlocks = [
    {
      emoji: '🚀',
      title: 'Crypto Revolution',
      description: "Built for investors who aren't afraid to embrace profitable opportunities in untapped markets. Strip Token represents the intersection of financial freedom and fearless investing."
    },
    {
      emoji: '💎',
      title: 'Adult Entertainment Economy',
      description: "The adult content industry generates over $97 billion annually. We're creating a bridge between this massive economy and the crypto space."
    },
    {
      emoji: '🎯',
      title: 'Community First',
      description: "No complex utility promises. No corporate roadmaps. Just purely community-driven with a twist of fun and rebellion."
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-strip-dark to-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-strip-pink to-strip-purple bg-clip-text text-transparent mb-6">
            Two Worlds, One Token
          </h2>
        </motion.div>

        {/* Content Blocks */}
        <div className="grid md:grid-cols-3 gap-8">
          {contentBlocks.map((block, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-strip-pink/50 transition-all duration-300 group"
            >
              {/* Emoji */}
              <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {block.emoji}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-strip-pink mb-4 group-hover:text-strip-purple transition-colors duration-300">
                {block.title}
              </h3>

              {/* Description */}
              <p className="text-gray-300 leading-relaxed text-lg">
                {block.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-strip-pink/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-strip-purple/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </section>
  );
};

export default TwoWorlds; 
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { EyeIcon, PlayIcon } from '@heroicons/react/24/solid';

const LiveStreamers = () => {
  const [liveStreamers, setLiveStreamers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fallback mock data in case API is not available
  const fallbackStreamers = [
    {
      id: 1,
      name: "Bustygoddess32",
      viewers: 2847,
      profileImage: "https://img.doppiocdn.com/thumbs/1749349740/125835266",
      isLive: true
    },
    {
      id: 2,
      name: "Scarlett Fox",
      viewers: 1923,
      profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      isLive: true
    },
    {
      id: 3,
      name: "Violet Storm",
      viewers: 3156,
      profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      isLive: true
    },
    {
      id: 4,
      name: "Ruby Diamond",
      viewers: 1654,
      profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      isLive: true
    }
  ];

  const fetchStreamers = useCallback(async () => {
    try {
      setError(null);

      const response = await fetch('https://web1-strip.onrender.com/streamers');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data && data.length > 0) {
        setLiveStreamers(data);
      } else {
        // Use fallback data if API returns empty
        setLiveStreamers(fallbackStreamers);
      }
    } catch (err) {
      console.warn('Failed to fetch from API, using fallback data:', err);
      setError('Using demo data - API unavailable');
      setLiveStreamers(fallbackStreamers);
    } finally {
      setLoading(false);
    }
  }, [fallbackStreamers]);

  useEffect(() => {
    fetchStreamers();
    
    // Set up periodic refresh every 5 minutes
    const interval = setInterval(() => {
      fetchStreamers();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [fetchStreamers]);

  const handleStreamerClick = (streamerName) => {
    const url = `https://stripchat.com/${streamerName}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const formatViewerCount = (count) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  if (loading) {
    return (
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-strip-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-strip-pink mx-auto"></div>
          <p className="text-white mt-4">Loading live streamers...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-strip-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Who's Live Right Now?
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Top performers making moves while we are bullish on $Strip
          </p>
          {error && (
            <p className="text-yellow-400 text-sm mt-2 bg-yellow-400/10 px-4 py-2 rounded-lg inline-block">
              {error}
            </p>
          )}
        </motion.div>

        {/* Streamers Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {liveStreamers.map((streamer, index) => (
            <motion.div
              key={streamer.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-strip-pink/50 transition-all duration-300 group cursor-pointer"
              onClick={() => handleStreamerClick(streamer.name)}
            >
              {/* Profile Image with Live Indicator */}
              <div className="relative mb-4">
                <div className="w-20 h-20 mx-auto rounded-full overflow-hidden ring-2 ring-strip-pink/50 group-hover:ring-strip-purple/70 transition-all duration-300">
                  <img
                    src={streamer.profileImage}
                    alt={streamer.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback image if the scraped image fails to load
                      e.target.src = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face";
                    }}
                  />
                </div>
                {/* Live Badge */}
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold animate-pulse">
                  LIVE
                </div>
              </div>

              {/* Name */}
              <h3 className="text-lg font-semibold text-white text-center mb-2 group-hover:text-strip-pink transition-colors duration-300">
                {streamer.name}
              </h3>

              {/* Viewer Count */}
              <div className="flex items-center justify-center text-gray-400 mb-4">
                <EyeIcon className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">
                  {formatViewerCount(streamer.viewers)} watching
                </span>
              </div>

              {/* Watch Now Button */}
              <button 
                className="w-full bg-gradient-to-r from-strip-pink to-strip-purple text-white py-2 px-4 rounded-lg font-semibold hover:from-strip-purple hover:to-strip-pink transition-all duration-300 flex items-center justify-center group-hover:scale-105"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent double-click from card click
                  handleStreamerClick(streamer.name);
                }}
              >
                <PlayIcon className="w-4 h-4 mr-2" />
                Watch Now
              </button>
            </motion.div>
          ))}
        </div>

        {/* Bottom Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            These creators are earning right now. Your{' '}
            <span className="text-strip-pink font-semibold">$Strip tokens</span>{' '}
            could be too.
          </p>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/6 w-32 h-32 bg-strip-pink/5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-1/3 right-1/6 w-32 h-32 bg-strip-purple/5 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-strip-pink/5 to-strip-purple/5 rounded-full blur-3xl"></div>
        </div>
      </div>
    </section>
  );
};

export default LiveStreamers; 

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ClipboardDocumentIcon, 
  CheckIcon,
  ArrowTopRightOnSquareIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  EyeIcon
} from '@heroicons/react/24/solid';

const StripRevolution = () => {
  const [copied, setCopied] = useState(false);
  
  // Generated Solana contract address (placeholder)
  const contractAddress = "7xKXtg2CW9GwqHyrM5QGDfxMzEuiRAhvdfF2o6PiGVMR";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-strip-dark to-gray-900 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-strip-pink to-strip-purple bg-clip-text text-transparent mb-6">
            Join the Strip Revolution
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Get your $STRIP tokens and join our exclusive community.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Contract Address */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <CurrencyDollarIcon className="w-8 h-8 text-strip-pink mr-3" />
              $STRIP Contract
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-gray-900/50 rounded-lg p-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Solana Contract Address</p>
                  <p className="text-white font-mono text-sm break-all">{contractAddress}</p>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="ml-4 p-2 bg-strip-pink/20 hover:bg-strip-pink/30 rounded-lg transition-all duration-300 group"
                >
                  {copied ? (
                    <CheckIcon className="w-5 h-5 text-green-400" />
                  ) : (
                    <ClipboardDocumentIcon className="w-5 h-5 text-strip-pink group-hover:text-white" />
                  )}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <p className="text-2xl font-bold text-strip-pink">$97B+</p>
                  <p className="text-sm text-gray-400">Market Size</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <p className="text-2xl font-bold text-strip-purple">SOL</p>
                  <p className="text-sm text-gray-400">Network</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - DEX Trading */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Trade $STRIP</h3>
            <div className="space-y-4">
              <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center group">
                <span className="mr-2">Trade on Jupiter</span>
                <ArrowTopRightOnSquareIcon className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
              <button className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-teal-700 transition-all duration-300 flex items-center justify-center group">
                <span className="mr-2">Trade on Raydium</span>
                <ArrowTopRightOnSquareIcon className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
              <button className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-orange-700 hover:to-red-700 transition-all duration-300 flex items-center justify-center group">
                <span className="mr-2">Trade on Orca</span>
                <ArrowTopRightOnSquareIcon className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Community Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="bg-gradient-to-r from-strip-pink/20 to-strip-purple/20 backdrop-blur-sm rounded-2xl p-8 border border-strip-pink/30">
            <div className="flex items-center justify-center mb-4">
              <EyeIcon className="w-8 h-8 text-strip-pink mr-3" />
              <h3 className="text-3xl font-bold text-white">Exclusive Community Access</h3>
            </div>
            <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
              Join our community for exclusive content and surprises. We're not holding back - 
              <span className="text-strip-pink font-semibold"> 18+ content</span> awaits those bold enough to join.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-strip-pink to-strip-purple text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-strip-purple hover:to-strip-pink transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                <UserGroupIcon className="w-6 h-6 mr-2" />
                Join Community
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold text-white mb-4">Ready to Strip the Market?</h3>
          <p className="text-xl text-gray-300 mb-6">
            Join investors who aren't afraid to embrace the future of adult entertainment & finance
          </p>
          <button className="bg-gradient-to-r from-strip-pink to-strip-purple text-white px-12 py-4 rounded-xl font-bold text-xl hover:from-strip-purple hover:to-strip-pink transition-all duration-300 transform hover:scale-105">
            Buy $STRIP Now
          </button>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/8 w-40 h-40 bg-strip-pink/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/8 w-40 h-40 bg-strip-purple/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </section>
  );
};

export default StripRevolution; 

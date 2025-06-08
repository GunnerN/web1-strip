import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ClipboardDocumentIcon, 
  CheckIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/solid';

const Footer = () => {
  const [copied, setCopied] = useState(false);
  
  // Same contract address from StripRevolution component
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
    <footer className="bg-gradient-to-t from-black to-strip-dark border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold bg-gradient-to-r from-strip-pink to-strip-purple bg-clip-text text-transparent mb-4">
                $STRIP
              </h3>
              <p className="text-gray-400 text-lg max-w-md mb-6">
                Bridging the gap between crypto and the adult entertainment industry. 
                Join the revolution that's not afraid to embrace profitable opportunities.
              </p>
              <div className="flex space-x-4">
                <div className="bg-gray-800/60 rounded-lg px-4 py-2">
                  <span className="text-strip-pink font-semibold">$97B+</span>
                  <span className="text-gray-400 text-sm ml-2">Market</span>
                </div>
                <div className="bg-gray-800/60 rounded-lg px-4 py-2">
                  <span className="text-strip-purple font-semibold">SOL</span>
                  <span className="text-gray-400 text-sm ml-2">Network</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-bold text-white mb-6">Quick Links</h4>
              <div className="space-y-4">
                {/* X (Community) */}
                <button 
                  className="flex items-center text-gray-400 hover:text-strip-pink transition-colors duration-300 group w-full text-left"
                  onClick={() => {
                    // Add your navigation logic here when ready
                    console.log('Navigate to community');
                  }}
                >
                  <span className="mr-2">𝕏</span>
                  <span>Community</span>
                  <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                {/* Buy $STRIP */}
                <button 
                  className="flex items-center text-gray-400 hover:text-strip-purple transition-colors duration-300 group w-full text-left"
                  onClick={() => {
                    // Add your navigation logic here when ready
                    console.log('Navigate to buy');
                  }}
                >
                  <span className="mr-2">💰</span>
                  <span>Buy $STRIP</span>
                  <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                {/* Telegram */}
                <button 
                  className="flex items-center text-gray-400 hover:text-strip-pink transition-colors duration-300 group w-full text-left"
                  onClick={() => {
                    // Add your navigation logic here when ready
                    console.log('Navigate to telegram');
                  }}
                >
                  <span className="mr-2">📱</span>
                  <span>Telegram (just kidding)</span>
                  <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Contract Address */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-xl font-bold text-white mb-6">Contract Address</h4>
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50">
                <p className="text-xs text-gray-400 mb-2">Solana Network</p>
                <div className="flex items-center justify-between">
                  <p className="text-white font-mono text-xs break-all mr-2">
                    {contractAddress.slice(0, 8)}...{contractAddress.slice(-8)}
                  </p>
                  <button
                    onClick={copyToClipboard}
                    className="p-2 bg-strip-pink/20 hover:bg-strip-pink/30 rounded-lg transition-all duration-300 group flex-shrink-0"
                    title="Copy full address"
                  >
                    {copied ? (
                      <CheckIcon className="w-4 h-4 text-green-400" />
                    ) : (
                      <ClipboardDocumentIcon className="w-4 h-4 text-strip-pink group-hover:text-white" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">Click to copy full address</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-gray-800/50 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-500 text-sm">
              © 2025 Strip Token. Don't be shy. 
              <span className="ml-2 text-gray-600">|</span>
              <span className="ml-2">Built on Solana</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex space-x-4">
              <button className="bg-gradient-to-r from-strip-pink to-strip-purple text-white px-6 py-2 rounded-lg font-semibold hover:from-strip-purple hover:to-strip-pink transition-all duration-300 transform hover:scale-105">
                Buy Now
              </button>
              <button className="border border-gray-600 text-gray-400 hover:text-white hover:border-strip-pink px-6 py-2 rounded-lg font-semibold transition-all duration-300">
                Join Community
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Bottom Gradient */}
      <div className="h-1 bg-gradient-to-r from-strip-pink via-strip-purple to-strip-pink"></div>
    </footer>
  );
};

export default Footer; 

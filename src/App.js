import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TwoWorlds from './components/TwoWorlds';
import LiveStreamers from './components/LiveStreamers';
import StripRevolution from './components/StripRevolution';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-strip-dark text-white">
      <Navbar />
      <Hero />
      <TwoWorlds />
      <LiveStreamers />
      <StripRevolution />
      <Footer />
    </div>
  );
}

export default App; 

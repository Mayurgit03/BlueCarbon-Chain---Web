import React from 'react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const MangroveMap: React.FC = () => {
  const mangrovePoints = [
    { id: 1, name: 'Kerala Coastal', x: 15, y: 75, area: '2,400 ha', co2: '3.2k tCO₂' },
    { id: 2, name: 'Tamil Nadu', x: 25, y: 85, area: '1,800 ha', co2: '2.8k tCO₂' },
    { id: 3, name: 'West Bengal Sundarbans', x: 85, y: 45, area: '5,200 ha', co2: '8.1k tCO₂' },
    { id: 4, name: 'Odisha Coast', x: 75, y: 55, area: '1,600 ha', co2: '2.1k tCO₂' }
  ];

  return (
    <div className="relative w-full max-w-5xl mx-auto mb-16">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Global Mangrove Data</h2>
        <Badge className="bg-green-500 text-white">Live Data</Badge>
      </div>
      
      <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg overflow-hidden border">
        {/* Map Background */}
        <div className="relative w-full h-96 bg-gradient-to-br from-blue-100 via-green-50 to-blue-100">
          {/* India Map Outline (Simplified) */}
          <svg 
            className="absolute inset-0 w-full h-full opacity-20" 
            viewBox="0 0 100 100" 
            preserveAspectRatio="xMidYMid meet"
          >
            <path 
              d="M20,20 L80,20 L85,30 L80,40 L85,50 L80,60 L75,70 L70,80 L60,85 L50,80 L40,85 L30,80 L25,70 L20,60 L15,50 L20,40 L15,30 Z" 
              fill="rgba(34, 197, 94, 0.1)" 
              stroke="rgba(34, 197, 94, 0.3)" 
              strokeWidth="0.5"
            />
          </svg>

          {/* Mangrove Points */}
          {mangrovePoints.map((point, index) => (
            <motion.div
              key={point.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.2 + 0.5, duration: 0.5 }}
              className="absolute group cursor-pointer"
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
            >
              {/* Pulsing Circle */}
              <div className="relative">
                <div className="w-6 h-6 bg-cyan-500 rounded-full animate-pulse shadow-lg"></div>
                <div className="absolute inset-0 w-6 h-6 bg-cyan-400 rounded-full animate-ping opacity-75"></div>
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-3 min-w-32 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 border">
                <div className="text-sm font-semibold text-gray-800">{point.name}</div>
                <div className="text-xs text-gray-600">Area: {point.area}</div>
                <div className="text-xs text-green-600">CO₂: {point.co2}</div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
              </div>
            </motion.div>
          ))}

          {/* City Labels */}
          <div className="absolute top-4 left-4 text-xs text-gray-600">Mumbai</div>
          <div className="absolute top-8 right-8 text-xs text-gray-600">Kolkata</div>
          <div className="absolute bottom-8 left-8 text-xs text-gray-600">Kochi</div>
          <div className="absolute bottom-4 right-12 text-xs text-gray-600">Chennai</div>
          
          {/* Country Label */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-bold text-gray-400 opacity-50">
            INDIA
          </div>
        </div>

        {/* Map Attribution */}
        <div className="absolute bottom-2 right-2 text-xs text-gray-500 bg-white/80 px-2 py-1 rounded">
          © OpenStreetMap contributors
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">11.0k</div>
          <div className="text-sm text-gray-600">Total Hectares</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">16.2k</div>
          <div className="text-sm text-gray-600">tCO₂ Sequestered</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">4</div>
          <div className="text-sm text-gray-600">Active Regions</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">₹2.4Cr</div>
          <div className="text-sm text-gray-600">Credits Value</div>
        </div>
      </div>
    </div>
  );
};

export default MangroveMap;
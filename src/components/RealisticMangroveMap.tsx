import React, { useEffect, useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const RealisticMangroveMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);

  const mangroveData = [
    { id: 1, name: 'Kerala Coastal', lat: 9.9312, lng: 76.2673, area: '2,400 ha', co2: '3.2k tCO₂', status: 'Active' },
    { id: 2, name: 'Tamil Nadu', lat: 11.1271, lng: 78.6569, area: '1,800 ha', co2: '2.8k tCO₂', status: 'Monitoring' },
    { id: 3, name: 'West Bengal Sundarbans', lat: 21.9497, lng: 88.1905, area: '5,200 ha', co2: '8.1k tCO₂', status: 'Active' },
    { id: 4, name: 'Odisha Coast', lat: 19.8135, lng: 85.0789, area: '1,600 ha', co2: '2.1k tCO₂', status: 'Planning' }
  ];

  useEffect(() => {
    if (!mapRef.current) return;

    const mapContainer = mapRef.current;
    mapContainer.innerHTML = '';

    // Create interactive map using Geoapify tiles
    const mapDiv = document.createElement('div');
    mapDiv.style.width = '100%';
    mapDiv.style.height = '400px';
    mapDiv.style.borderRadius = '8px';
    mapDiv.style.overflow = 'hidden';
    mapDiv.style.position = 'relative';
    
    // Create tile-based map background
    const tileContainer = document.createElement('div');
    tileContainer.style.width = '100%';
    tileContainer.style.height = '100%';
    tileContainer.style.background = `url('https://maps.geoapify.com/v1/tile/carto/5/19/12.png?apiKey=832e2f412fb043eeb13b558fd4a6cb8b') center/cover`;
    tileContainer.style.position = 'relative';
    
    // Add realistic satellite overlay
    const satelliteOverlay = document.createElement('div');
    satelliteOverlay.style.position = 'absolute';
    satelliteOverlay.style.top = '0';
    satelliteOverlay.style.left = '0';
    satelliteOverlay.style.width = '100%';
    satelliteOverlay.style.height = '100%';
    satelliteOverlay.style.backgroundImage = `url('https://maps.geoapify.com/v1/staticmap?style=satellite&width=800&height=400&center=lonlat:78.9629,20.5937&zoom=5&apiKey=832e2f412fb043eeb13b558fd4a6cb8b')`;
    satelliteOverlay.style.backgroundSize = 'cover';
    satelliteOverlay.style.backgroundPosition = 'center';
    satelliteOverlay.style.opacity = '0.8';
    
    tileContainer.appendChild(satelliteOverlay);
    mapDiv.appendChild(tileContainer);
    mapContainer.appendChild(mapDiv);
    
    setTimeout(() => setMapLoaded(true), 1500);
  }, []);

  return (
    <div className="relative w-full max-w-5xl mx-auto mb-16">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Global Mangrove Data</h2>
        <div className="flex gap-2">
          <Badge className="bg-green-500 text-white">Live Satellite Data</Badge>
          <Badge variant="outline">Geoapify Maps</Badge>
        </div>
      </div>
      
      <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg overflow-hidden border shadow-lg">
        {/* Map Container */}
        <div 
          ref={mapRef}
          className="relative w-full h-96"
        />

        {/* Loading State */}
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-100 via-green-50 to-blue-100 rounded-lg">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">Loading satellite imagery...</p>
            </div>
          </div>
        )}

        {/* Mangrove Data Points Overlay */}
        {mapLoaded && (
          <div className="absolute inset-0 pointer-events-none">
            {mangroveData.map((point, index) => {
              // More accurate positioning for Indian subcontinent
              const x = ((point.lng - 68) / (97 - 68)) * 100;
              const y = ((28 - point.lat) / (28 - 6)) * 100;
              
              return (
                <motion.div
                  key={point.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.3 + 1.5, duration: 0.6 }}
                  className="absolute group cursor-pointer pointer-events-auto"
                  style={{ 
                    left: `${Math.max(8, Math.min(92, x))}%`, 
                    top: `${Math.max(8, Math.min(92, y))}%` 
                  }}
                  onClick={() => setSelectedPoint(selectedPoint === point.id ? null : point.id)}
                >
                  {/* Enhanced Pulsing Circle */}
                  <div className="relative">
                    <div className={`w-5 h-5 rounded-full shadow-lg border-2 border-white transition-all duration-300 ${
                      point.status === 'Active' ? 'bg-green-500 animate-pulse' :
                      point.status === 'Monitoring' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}></div>
                    <div className={`absolute inset-0 w-5 h-5 rounded-full animate-ping opacity-75 ${
                      point.status === 'Active' ? 'bg-green-400' :
                      point.status === 'Monitoring' ? 'bg-yellow-400' : 'bg-blue-400'
                    }`}></div>
                    {selectedPoint === point.id && (
                      <div className="absolute inset-0 w-5 h-5 rounded-full bg-white/30 animate-pulse"></div>
                    )}
                  </div>
                  
                  {/* Enhanced Tooltip */}
                  <div className={`absolute bottom-7 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl p-4 min-w-40 transition-all duration-300 border-2 z-20 ${
                    selectedPoint === point.id ? 'opacity-100 scale-105' : 'opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100'
                  }`}>
                    <div className="text-sm font-bold text-gray-800 mb-1">{point.name}</div>
                    <div className="text-xs text-gray-600 mb-1">Area: {point.area}</div>
                    <div className="text-xs text-green-600 mb-1">CO₂: {point.co2}</div>
                    <div className={`text-xs px-2 py-1 rounded-full text-white text-center ${
                      point.status === 'Active' ? 'bg-green-500' :
                      point.status === 'Monitoring' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}>
                      {point.status}
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button className="bg-white/90 hover:bg-white p-2 rounded-lg shadow-md transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
          <button className="bg-white/90 hover:bg-white p-2 rounded-lg shadow-md transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
        </div>

        {/* Map Attribution */}
        <div className="absolute bottom-2 right-2 text-xs text-gray-500 bg-white/90 px-2 py-1 rounded backdrop-blur-sm">
          © Geoapify | © OpenStreetMap contributors
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md">
          <div className="text-xs font-semibold mb-2">Project Status</div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs">Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-xs">Monitoring</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-xs">Planning</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <motion.div 
          className="text-center p-4 bg-white rounded-lg shadow-sm border"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-2xl font-bold text-green-600">11.0k</div>
          <div className="text-sm text-gray-600">Total Hectares</div>
        </motion.div>
        <motion.div 
          className="text-center p-4 bg-white rounded-lg shadow-sm border"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-2xl font-bold text-blue-600">16.2k</div>
          <div className="text-sm text-gray-600">tCO₂ Sequestered</div>
        </motion.div>
        <motion.div 
          className="text-center p-4 bg-white rounded-lg shadow-sm border"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-2xl font-bold text-purple-600">4</div>
          <div className="text-sm text-gray-600">Active Regions</div>
        </motion.div>
        <motion.div 
          className="text-center p-4 bg-white rounded-lg shadow-sm border"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-2xl font-bold text-orange-600">₹2.4Cr</div>
          <div className="text-sm text-gray-600">Credits Value</div>
        </motion.div>
      </div>
    </div>
  );
};

export default RealisticMangroveMap;
import React, { useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const InteractiveIndiaMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  const mangroveData = [
    { id: 1, name: 'Kerala Coastal', lat: 9.9312, lng: 76.2673, area: '2,400 ha', co2: '3.2k tCO₂', status: 'Active' },
    { id: 2, name: 'Tamil Nadu', lat: 11.1271, lng: 78.6569, area: '1,800 ha', co2: '2.8k tCO₂', status: 'Monitoring' },
    { id: 3, name: 'West Bengal Sundarbans', lat: 21.9497, lng: 88.1905, area: '5,200 ha', co2: '8.1k tCO₂', status: 'Active' },
    { id: 4, name: 'Odisha Coast', lat: 19.8135, lng: 85.0789, area: '1,600 ha', co2: '2.1k tCO₂', status: 'Planning' }
  ];

  useEffect(() => {
    if (!mapRef.current) return;

    // Add Leaflet CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    // Load Leaflet JS
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => {
      const L = (window as any).L;
      
      // Initialize map centered on India
      const map = L.map(mapRef.current).setView([20.5937, 78.9629], 5);

      // Add Google Satellite thematic layer
      L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        attribution: '© Google',
        maxZoom: 20,
        minZoom: 4
      }).addTo(map);
      
      // Add terrain overlay for thematic effect
      L.tileLayer('https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
        opacity: 0.3
      }).addTo(map);

      // Add markers for mangrove locations
      mangroveData.forEach(point => {
        const color = point.status === 'Active' ? '#10b981' : 
                     point.status === 'Monitoring' ? '#f59e0b' : '#3b82f6';
        
        const marker = L.circleMarker([point.lat, point.lng], {
          radius: 12,
          fillColor: color,
          color: '#fff',
          weight: 3,
          opacity: 1,
          fillOpacity: 0.9
        }).addTo(map);

        marker.bindPopup(`
          <div class="p-2">
            <h3 class="font-bold text-sm">${point.name}</h3>
            <p class="text-xs text-gray-600">Area: ${point.area}</p>
            <p class="text-xs text-green-600">CO₂: ${point.co2}</p>
            <span class="inline-block px-2 py-1 text-xs rounded-full text-white mt-1" style="background-color: ${color}">
              ${point.status}
            </span>
          </div>
        `);
      });

      // Set bounds to India
      map.fitBounds([
        [6.4627, 68.1097],  // Southwest
        [35.5137, 97.3953]  // Northeast
      ]);
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="relative w-full max-w-5xl mx-auto mb-16">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Global Data</h2>
        <div className="flex gap-2">
          <Badge className="bg-blue-500 text-white">Thematic Map</Badge>
          <Badge variant="outline">Satellite View</Badge>
        </div>
      </div>
      
      <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg overflow-hidden border shadow-lg">
        <div 
          ref={mapRef}
          className="w-full h-96 rounded-lg"
          style={{ minHeight: '400px' }}
        />

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-md z-[1000]">
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

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <motion.div 
          className="text-center p-4 bg-white rounded-lg shadow-sm border"
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-2xl font-bold text-green-600">11.0k</div>
          <div className="text-sm text-gray-600">Total Hectares</div>
        </motion.div>
        <motion.div 
          className="text-center p-4 bg-white rounded-lg shadow-sm border"
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-2xl font-bold text-blue-600">16.2k</div>
          <div className="text-sm text-gray-600">tCO₂ Sequestered</div>
        </motion.div>
        <motion.div 
          className="text-center p-4 bg-white rounded-lg shadow-sm border"
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-2xl font-bold text-purple-600">4</div>
          <div className="text-sm text-gray-600">Active Regions</div>
        </motion.div>
        <motion.div 
          className="text-center p-4 bg-white rounded-lg shadow-sm border"
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-2xl font-bold text-orange-600">₹2.4Cr</div>
          <div className="text-sm text-gray-600">Credits Value</div>
        </motion.div>
      </div>
    </div>
  );
};

export default InteractiveIndiaMap;
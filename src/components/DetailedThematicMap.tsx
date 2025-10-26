import React, { useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const DetailedThematicMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  const stateData = {
    'West Bengal': { value: 8100, color: '#1a365d' },
    'Odisha': { value: 2100, color: '#2c5282' },
    'Andhra Pradesh': { value: 1800, color: '#3182ce' },
    'Tamil Nadu': { value: 2800, color: '#4299e1' },
    'Kerala': { value: 3200, color: '#63b3ed' },
    'Karnataka': { value: 1200, color: '#90cdf4' },
    'Goa': { value: 800, color: '#bee3f8' },
    'Maharashtra': { value: 900, color: '#e6f3ff' },
    'Gujarat': { value: 1500, color: '#4fd1c7' },
    'Rajasthan': { value: 200, color: '#f7fafc' },
    'Madhya Pradesh': { value: 300, color: '#edf2f7' },
    'Uttar Pradesh': { value: 400, color: '#e2e8f0' },
    'Bihar': { value: 600, color: '#cbd5e0' },
    'Jharkhand': { value: 500, color: '#a0aec0' },
    'Chhattisgarh': { value: 700, color: '#718096' },
    'Telangana': { value: 1100, color: '#4a5568' },
    'Punjab': { value: 250, color: '#2d3748' },
    'Haryana': { value: 180, color: '#1a202c' },
    'Delhi': { value: 50, color: '#f7fafc' },
    'Himachal Pradesh': { value: 100, color: '#edf2f7' },
    'Uttarakhand': { value: 150, color: '#e2e8f0' },
    'Jammu and Kashmir': { value: 80, color: '#cbd5e0' },
    'Assam': { value: 1400, color: '#81e6d9' },
    'Meghalaya': { value: 300, color: '#4fd1c7' },
    'Tripura': { value: 200, color: '#38b2ac' },
    'Mizoram': { value: 180, color: '#319795' },
    'Manipur': { value: 160, color: '#2c7a7b' },
    'Nagaland': { value: 140, color: '#285e61' },
    'Arunachal Pradesh': { value: 120, color: '#234e52' }
  };

  useEffect(() => {
    if (!mapRef.current) return;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => {
      const L = (window as any).L;
      
      const map = L.map(mapRef.current, {
        zoomControl: true,
        scrollWheelZoom: true
      }).setView([23.5937, 78.9629], 5);

      L.tileLayer(`https://maps.geoapify.com/v1/tile/carto/{z}/{x}/{y}.png?apiKey=832e2f412fb043eeb13b558fd4a6cb8b`, {
        attribution: '© Geoapify | © OpenStreetMap contributors',
        maxZoom: 8,
        minZoom: 4
      }).addTo(map);

      // Detailed India GeoJSON with all states
      const indiaGeoJSON = {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": { "name": "West Bengal", "value": 8100 },
            "geometry": {
              "type": "Polygon",
              "coordinates": [[[87.5, 21.5], [89.5, 21.5], [89.5, 27.2], [88.1, 27.2], [87.5, 26.8], [87.5, 21.5]]]
            }
          },
          {
            "type": "Feature",
            "properties": { "name": "Odisha", "value": 2100 },
            "geometry": {
              "type": "Polygon", 
              "coordinates": [[[81.3, 17.8], [87.5, 17.8], [87.5, 22.6], [84.8, 22.6], [81.3, 22.0], [81.3, 17.8]]]
            }
          },
          {
            "type": "Feature",
            "properties": { "name": "Andhra Pradesh", "value": 1800 },
            "geometry": {
              "type": "Polygon",
              "coordinates": [[[76.8, 12.6], [84.8, 12.6], [84.8, 19.9], [79.0, 19.9], [76.8, 17.0], [76.8, 12.6]]]
            }
          },
          {
            "type": "Feature",
            "properties": { "name": "Tamil Nadu", "value": 2800 },
            "geometry": {
              "type": "Polygon",
              "coordinates": [[[76.2, 8.0], [80.3, 8.0], [80.3, 13.5], [77.0, 13.5], [76.2, 11.0], [76.2, 8.0]]]
            }
          },
          {
            "type": "Feature",
            "properties": { "name": "Kerala", "value": 3200 },
            "geometry": {
              "type": "Polygon",
              "coordinates": [[[74.8, 8.2], [77.4, 8.2], [77.4, 12.8], [75.0, 12.8], [74.8, 10.0], [74.8, 8.2]]]
            }
          },
          {
            "type": "Feature",
            "properties": { "name": "Karnataka", "value": 1200 },
            "geometry": {
              "type": "Polygon",
              "coordinates": [[[74.0, 11.5], [78.6, 11.5], [78.6, 18.4], [74.0, 18.4], [74.0, 11.5]]]
            }
          },
          {
            "type": "Feature",
            "properties": { "name": "Gujarat", "value": 1500 },
            "geometry": {
              "type": "Polygon",
              "coordinates": [[[68.2, 20.1], [74.5, 20.1], [74.5, 24.7], [68.2, 24.7], [68.2, 20.1]]]
            }
          },
          {
            "type": "Feature",
            "properties": { "name": "Maharashtra", "value": 900 },
            "geometry": {
              "type": "Polygon",
              "coordinates": [[[72.6, 15.6], [80.9, 15.6], [80.9, 22.0], [72.6, 22.0], [72.6, 15.6]]]
            }
          },
          {
            "type": "Feature",
            "properties": { "name": "Rajasthan", "value": 200 },
            "geometry": {
              "type": "Polygon",
              "coordinates": [[[69.5, 23.0], [78.2, 23.0], [78.2, 30.2], [69.5, 30.2], [69.5, 23.0]]]
            }
          },
          {
            "type": "Feature",
            "properties": { "name": "Madhya Pradesh", "value": 300 },
            "geometry": {
              "type": "Polygon",
              "coordinates": [[[74.0, 18.0], [82.8, 18.0], [82.8, 26.9], [74.0, 26.9], [74.0, 18.0]]]
            }
          },
          {
            "type": "Feature",
            "properties": { "name": "Uttar Pradesh", "value": 400 },
            "geometry": {
              "type": "Polygon",
              "coordinates": [[[77.0, 24.0], [84.6, 24.0], [84.6, 30.4], [77.0, 30.4], [77.0, 24.0]]]
            }
          },
          {
            "type": "Feature",
            "properties": { "name": "Bihar", "value": 600 },
            "geometry": {
              "type": "Polygon",
              "coordinates": [[[83.3, 24.3], [88.1, 24.3], [88.1, 27.5], [83.3, 27.5], [83.3, 24.3]]]
            }
          },
          {
            "type": "Feature",
            "properties": { "name": "Assam", "value": 1400 },
            "geometry": {
              "type": "Polygon",
              "coordinates": [[[89.7, 24.1], [96.0, 24.1], [96.0, 28.2], [89.7, 28.2], [89.7, 24.1]]]
            }
          }
        ]
      };

      function getColor(value: number) {
        return value > 6000 ? '#1a365d' :
               value > 3000 ? '#2c5282' :
               value > 2000 ? '#3182ce' :
               value > 1500 ? '#4299e1' :
               value > 1000 ? '#63b3ed' :
               value > 500 ? '#90cdf4' :
               value > 200 ? '#bee3f8' :
               '#e6f3ff';
      }

      function style(feature: any) {
        return {
          fillColor: getColor(feature.properties.value),
          weight: 1,
          opacity: 1,
          color: '#ffffff',
          fillOpacity: 0.8
        };
      }

      function onEachFeature(feature: any, layer: any) {
        layer.on({
          mouseover: (e: any) => {
            const layer = e.target;
            layer.setStyle({
              weight: 2,
              color: '#333',
              fillOpacity: 0.9
            });
          },
          mouseout: (e: any) => {
            geoJsonLayer.resetStyle(e.target);
          }
        });

        layer.bindPopup(`
          <div class="p-3 min-w-32">
            <h3 class="font-bold text-base mb-2">${feature.properties.name}</h3>
            <div class="text-sm text-gray-600 mb-1">Carbon Sequestration</div>
            <div class="text-lg font-bold text-green-600">${feature.properties.value} tCO₂</div>
            <div class="text-xs text-gray-500 mt-2">Click to view details</div>
          </div>
        `);
      }

      const geoJsonLayer = L.geoJSON(indiaGeoJSON, {
        style: style,
        onEachFeature: onEachFeature
      }).addTo(map);

      map.fitBounds(geoJsonLayer.getBounds());
    };

    document.head.appendChild(script);

    return () => {
      if (document.head.contains(link)) document.head.removeChild(link);
      if (document.head.contains(script)) document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="relative w-full max-w-6xl mx-auto mb-16">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">India Mangrove Carbon Sequestration</h2>
        <div className="flex gap-2">
          <Badge className="bg-blue-600 text-white">Thematic Analysis</Badge>
          <Badge variant="outline">State-wise Data</Badge>
        </div>
      </div>
      
      <div className="relative bg-white rounded-lg overflow-hidden border shadow-lg">
        <div 
          ref={mapRef}
          className="w-full h-[500px] rounded-lg"
        />

        {/* Gradient Legend */}
        <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg z-[1000] border">
          <div className="text-sm font-bold mb-3">Carbon Sequestration (tCO₂)</div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="w-5 h-3 rounded" style={{backgroundColor: '#1a365d'}}></div>
              <span className="text-xs">6000+ (Highest)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-3 rounded" style={{backgroundColor: '#2c5282'}}></div>
              <span className="text-xs">3000-6000</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-3 rounded" style={{backgroundColor: '#3182ce'}}></div>
              <span className="text-xs">2000-3000</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-3 rounded" style={{backgroundColor: '#4299e1'}}></div>
              <span className="text-xs">1500-2000</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-3 rounded" style={{backgroundColor: '#63b3ed'}}></div>
              <span className="text-xs">1000-1500</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-3 rounded" style={{backgroundColor: '#90cdf4'}}></div>
              <span className="text-xs">500-1000</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-3 rounded" style={{backgroundColor: '#bee3f8'}}></div>
              <span className="text-xs">200-500</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-3 rounded" style={{backgroundColor: '#e6f3ff'}}></div>
              <span className="text-xs">0-200 (Lowest)</span>
            </div>
          </div>
        </div>

        {/* Title Box */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-md z-[1000] border">
          <div className="text-sm font-bold text-gray-800">Mangrove Restoration Impact</div>
          <div className="text-xs text-gray-600">Hover states for data • Click for details</div>
        </div>
      </div>

      {/* Top Performers */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(stateData)
          .sort(([,a], [,b]) => b.value - a.value)
          .slice(0, 3)
          .map(([state, data], index) => (
            <motion.div 
              key={state}
              className="bg-white rounded-lg shadow-sm border p-4 flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-2xl font-bold text-gray-400">#{index + 1}</div>
              <div className="flex-1">
                <div className="font-semibold text-gray-800">{state}</div>
                <div className="text-sm text-gray-600">{data.value} tCO₂</div>
              </div>
              <div 
                className="w-6 h-6 rounded"
                style={{backgroundColor: data.color}}
              ></div>
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default DetailedThematicMap;
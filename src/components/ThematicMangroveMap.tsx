import React, { useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const ThematicMangroveMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  const stateData = [
    { name: 'West Bengal', co2Level: 'high', value: 8100, color: '#065f46' },
    { name: 'Kerala', co2Level: 'medium', value: 3200, color: '#059669' },
    { name: 'Tamil Nadu', co2Level: 'medium', value: 2800, color: '#10b981' },
    { name: 'Odisha', co2Level: 'low', value: 2100, color: '#34d399' },
    { name: 'Gujarat', co2Level: 'low', value: 1500, color: '#6ee7b7' },
    { name: 'Maharashtra', co2Level: 'low', value: 900, color: '#a7f3d0' }
  ];

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
      
      const map = L.map(mapRef.current).setView([20.5937, 78.9629], 5);

      L.tileLayer(`https://maps.geoapify.com/v1/tile/carto/{z}/{x}/{y}.png?apiKey=832e2f412fb043eeb13b558fd4a6cb8b`, {
        attribution: '© Geoapify | © OpenStreetMap contributors',
        maxZoom: 10,
        minZoom: 4
      }).addTo(map);

      // India state boundaries (simplified GeoJSON)
      const indiaStates = {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": { "name": "West Bengal", "co2": 8100 },
            "geometry": {
              "type": "Polygon",
              "coordinates": [[[88.0, 21.5], [89.5, 21.5], [89.5, 27.0], [88.0, 27.0], [88.0, 21.5]]]
            }
          },
          {
            "type": "Feature", 
            "properties": { "name": "Kerala", "co2": 3200 },
            "geometry": {
              "type": "Polygon",
              "coordinates": [[[74.8, 8.2], [77.4, 8.2], [77.4, 12.8], [74.8, 12.8], [74.8, 8.2]]]
            }
          },
          {
            "type": "Feature",
            "properties": { "name": "Tamil Nadu", "co2": 2800 },
            "geometry": {
              "type": "Polygon", 
              "coordinates": [[[76.2, 8.0], [80.3, 8.0], [80.3, 13.5], [76.2, 13.5], [76.2, 8.0]]]
            }
          },
          {
            "type": "Feature",
            "properties": { "name": "Odisha", "co2": 2100 },
            "geometry": {
              "type": "Polygon",
              "coordinates": [[[81.3, 17.8], [87.5, 17.8], [87.5, 22.6], [81.3, 22.6], [81.3, 17.8]]]
            }
          },
          {
            "type": "Feature",
            "properties": { "name": "Gujarat", "co2": 1500 },
            "geometry": {
              "type": "Polygon",
              "coordinates": [[[68.2, 20.1], [74.5, 20.1], [74.5, 24.7], [68.2, 24.7], [68.2, 20.1]]]
            }
          },
          {
            "type": "Feature",
            "properties": { "name": "Maharashtra", "co2": 900 },
            "geometry": {
              "type": "Polygon",
              "coordinates": [[[72.6, 15.6], [80.9, 15.6], [80.9, 22.0], [72.6, 22.0], [72.6, 15.6]]]
            }
          }
        ]
      };

      function getColor(co2Value: number) {
        return co2Value > 6000 ? '#065f46' :
               co2Value > 3000 ? '#059669' :
               co2Value > 2000 ? '#10b981' :
               co2Value > 1000 ? '#34d399' :
               '#a7f3d0';
      }

      function style(feature: any) {
        return {
          fillColor: getColor(feature.properties.co2),
          weight: 2,
          opacity: 1,
          color: 'white',
          dashArray: '3',
          fillOpacity: 0.7
        };
      }

      function onEachFeature(feature: any, layer: any) {
        layer.on({
          mouseover: (e: any) => {
            const layer = e.target;
            layer.setStyle({
              weight: 3,
              color: '#666',
              dashArray: '',
              fillOpacity: 0.9
            });
          },
          mouseout: (e: any) => {
            geoJsonLayer.resetStyle(e.target);
          }
        });

        layer.bindPopup(`
          <div class="p-3">
            <h3 class="font-bold text-lg">${feature.properties.name}</h3>
            <p class="text-sm text-gray-600">CO₂ Sequestration</p>
            <p class="text-xl font-bold text-green-600">${feature.properties.co2} tCO₂</p>
          </div>
        `);
      }

      const geoJsonLayer = L.geoJSON(indiaStates, {
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
    <div className="relative w-full max-w-5xl mx-auto mb-16">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Mangrove Carbon Sequestration Map</h2>
        <Badge className="bg-green-600 text-white">Thematic View</Badge>
      </div>
      
      <div className="relative bg-gradient-to-br from-green-50 to-blue-50 rounded-lg overflow-hidden border shadow-lg">
        <div 
          ref={mapRef}
          className="w-full h-96 rounded-lg"
        />

        {/* Thematic Legend */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-md z-[1000]">
          <div className="text-sm font-bold mb-3">CO₂ Sequestration (tCO₂)</div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{backgroundColor: '#065f46'}}></div>
              <span className="text-xs">6000+ (High)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{backgroundColor: '#059669'}}></div>
              <span className="text-xs">3000-6000</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{backgroundColor: '#10b981'}}></div>
              <span className="text-xs">2000-3000</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{backgroundColor: '#34d399'}}></div>
              <span className="text-xs">1000-2000</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{backgroundColor: '#a7f3d0'}}></div>
              <span className="text-xs">0-1000 (Low)</span>
            </div>
          </div>
        </div>

        {/* Data Source */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-sm z-[1000]">
          <div className="text-xs text-gray-600">Hover states for details</div>
        </div>
      </div>

      {/* State Rankings */}
      <div className="mt-6 bg-white rounded-lg shadow-sm border p-4">
        <h3 className="text-lg font-bold mb-4">Top Performing States</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stateData.slice(0, 3).map((state, index) => (
            <motion.div 
              key={state.name}
              className="flex items-center gap-3 p-3 rounded-lg border"
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-2xl font-bold text-gray-400">#{index + 1}</div>
              <div className="flex-1">
                <div className="font-semibold">{state.name}</div>
                <div className="text-sm text-gray-600">{state.value} tCO₂</div>
              </div>
              <div 
                className="w-4 h-4 rounded-full"
                style={{backgroundColor: state.color}}
              ></div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <motion.div className="text-center p-4 bg-white rounded-lg shadow-sm border" whileHover={{ scale: 1.05 }}>
          <div className="text-2xl font-bold text-green-600">18.5k</div>
          <div className="text-sm text-gray-600">Total tCO₂</div>
        </motion.div>
        <motion.div className="text-center p-4 bg-white rounded-lg shadow-sm border" whileHover={{ scale: 1.05 }}>
          <div className="text-2xl font-bold text-blue-600">6</div>
          <div className="text-sm text-gray-600">States Covered</div>
        </motion.div>
        <motion.div className="text-center p-4 bg-white rounded-lg shadow-sm border" whileHover={{ scale: 1.05 }}>
          <div className="text-2xl font-bold text-purple-600">11.0k</div>
          <div className="text-sm text-gray-600">Hectares</div>
        </motion.div>
        <motion.div className="text-center p-4 bg-white rounded-lg shadow-sm border" whileHover={{ scale: 1.05 }}>
          <div className="text-2xl font-bold text-orange-600">₹3.7Cr</div>
          <div className="text-sm text-gray-600">Market Value</div>
        </motion.div>
      </div>
    </div>
  );
};

export default ThematicMangroveMap;
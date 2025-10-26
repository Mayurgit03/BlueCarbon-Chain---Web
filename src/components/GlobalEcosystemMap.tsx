import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { motion } from 'framer-motion';
import { Trees, Waves, Grass } from 'lucide-react';
import { globalEcosystemData, ecosystemTypeInfo, GlobalEcosystemLocation } from './globalEcosystemData';

interface GlobalEcosystemMapProps {
  className?: string;
}

const GlobalEcosystemMap: React.FC<GlobalEcosystemMapProps> = ({ className }) => {
  const [hoveredEcosystem, setHoveredEcosystem] = useState<string | null>(null);

  const getEcosystemIcon = (type: string) => {
    switch (type) {
      case 'mangrove':
        return <Trees className="h-3 w-3" />;
      case 'seagrass':
        return <Waves className="h-3 w-3" />;
      case 'saltmarsh':
        return <Grass className="h-3 w-3" />;
      default:
        return <Trees className="h-3 w-3" />;
    }
  };

  const convertToMapPosition = (lat: number, lng: number) => {
    // Convert lat/lng to percentage position on the map
    const x = ((lng + 180) / 360) * 100;
    const y = ((90 - lat) / 180) * 100;
    return { x: Math.max(2, Math.min(98, x)), y: Math.max(2, Math.min(98, y)) };
  };

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="pb-4">
        <div className="text-center">
          <CardTitle className="text-2xl font-bold mb-2">
            Global Distribution of Blue Carbon Ecosystems
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            Discover blue carbon ecosystems around the world that store carbon and support marine biodiversity
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <div className="relative">
          {/* World Map Background */}
          <div className="relative w-full h-80 bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg overflow-hidden border">
            {/* Simple world map using CSS and divs - representing continents */}
            <div className="absolute inset-0">
              {/* North America */}
              <div className="absolute bg-slate-300 rounded-lg" style={{
                top: '20%', left: '15%', width: '18%', height: '25%',
                clipPath: 'polygon(0% 30%, 20% 0%, 80% 10%, 100% 40%, 90% 80%, 70% 100%, 30% 90%, 0% 70%)'
              }} />
              
              {/* South America */}
              <div className="absolute bg-slate-300 rounded-lg" style={{
                top: '45%', left: '25%', width: '12%', height: '35%',
                clipPath: 'polygon(30% 0%, 70% 5%, 100% 30%, 80% 70%, 60% 100%, 20% 95%, 0% 60%, 10% 20%)'
              }} />
              
              {/* Europe */}
              <div className="absolute bg-slate-300 rounded-lg" style={{
                top: '15%', left: '45%', width: '8%', height: '15%',
                clipPath: 'polygon(0% 50%, 30% 0%, 100% 20%, 80% 80%, 40% 100%, 0% 90%)'
              }} />
              
              {/* Africa */}
              <div className="absolute bg-slate-300 rounded-lg" style={{
                top: '25%', left: '48%', width: '12%', height: '40%',
                clipPath: 'polygon(20% 0%, 80% 10%, 100% 40%, 90% 80%, 60% 100%, 30% 95%, 0% 70%, 10% 30%)'
              }} />
              
              {/* Asia */}
              <div className="absolute bg-slate-300 rounded-lg" style={{
                top: '10%', left: '60%', width: '25%', height: '35%',
                clipPath: 'polygon(0% 40%, 20% 0%, 60% 5%, 100% 30%, 90% 70%, 70% 100%, 30% 90%, 10% 60%)'
              }} />
              
              {/* Australia */}
              <div className="absolute bg-slate-300 rounded-lg" style={{
                top: '65%', left: '75%', width: '12%', height: '15%',
                clipPath: 'polygon(0% 30%, 30% 0%, 100% 20%, 80% 100%, 20% 90%)'
              }} />
            </div>

            {/* Ecosystem Markers */}
            {globalEcosystemData.map((ecosystem, index) => {
              const position = convertToMapPosition(ecosystem.coordinates.lat, ecosystem.coordinates.lng);
              const isHovered = hoveredEcosystem === ecosystem.id;
              
              return (
                <motion.div
                  key={ecosystem.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="absolute cursor-pointer"
                  style={{
                    left: `${position.x}%`,
                    top: `${position.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onMouseEnter={() => setHoveredEcosystem(ecosystem.id)}
                  onMouseLeave={() => setHoveredEcosystem(null)}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-200 ${
                          isHovered ? 'scale-125 shadow-xl' : 'hover:scale-110'
                        }`}
                        style={{ 
                          backgroundColor: ecosystemTypeInfo[ecosystem.type].color,
                          border: '2px solid white'
                        }}
                      >
                        {getEcosystemIcon(ecosystem.type)}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-center">
                        <p className="font-semibold">{ecosystem.name}</p>
                        <p className="text-xs text-muted-foreground">{ecosystemTypeInfo[ecosystem.type].name}</p>
                        <p className="text-xs">{ecosystem.region}</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </motion.div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-6">
            <div className="flex flex-wrap justify-center gap-6">
              {Object.entries(ecosystemTypeInfo).map(([type, info]) => (
                <div key={type} className="flex items-center space-x-2">
                  <div
                    className="w-4 h-4 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: info.color }}
                  >
                    {getEcosystemIcon(type)}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">{info.name}</span>
                    <p className="text-xs text-muted-foreground hidden sm:block">{info.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Statistics */}
          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">
                {globalEcosystemData.filter(e => e.type === 'mangrove').length}
              </div>
              <div className="text-xs text-muted-foreground">Mangrove Sites</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {globalEcosystemData.filter(e => e.type === 'seagrass').length}
              </div>
              <div className="text-xs text-muted-foreground">Seagrass Beds</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-600">
                {globalEcosystemData.filter(e => e.type === 'saltmarsh').length}
              </div>
              <div className="text-xs text-muted-foreground">Salt Marshes</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GlobalEcosystemMap;
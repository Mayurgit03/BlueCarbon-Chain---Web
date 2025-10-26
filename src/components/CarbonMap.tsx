import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProjectData {
  id: number;
  name: string;
  coordinates: [number, number];
  status: 'active' | 'verified' | 'pending';
  carbonCredits: number;
  type: 'coastal' | 'forest' | 'wetland';
}

const sampleProjects: ProjectData[] = [
  {
    id: 1,
    name: "Kerala Coastal Restoration",
    coordinates: [76.2711, 9.9312],
    status: 'verified',
    carbonCredits: 1250,
    type: 'coastal'
  },
  {
    id: 2,
    name: "Tamil Nadu Mangrove Project",
    coordinates: [80.2707, 13.0827],
    status: 'active',
    carbonCredits: 890,
    type: 'coastal'
  },
  {
    id: 3,
    name: "West Bengal Sundarbans",
    coordinates: [88.9468, 21.9497],
    status: 'pending',
    carbonCredits: 2100,
    type: 'wetland'
  }
];

interface CarbonMapProps {
  onProjectSelect?: (project: ProjectData) => void;
}

const CarbonMap: React.FC<CarbonMapProps> = ({ onProjectSelect }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // For demo purposes, we'll use a public token placeholder
    // In production, this should come from environment variables
    mapboxgl.accessToken = 'your-mapbox-token-here';
    
    // Create a simple map without token for demo
    const mapElement = document.createElement('div');
    mapElement.style.width = '100%';
    mapElement.style.height = '100%';
    mapElement.style.background = 'linear-gradient(135deg, #a8e6cf 0%, #7fcdcd 50%, #81c784 100%)';
    mapElement.style.borderRadius = '8px';
    mapElement.style.position = 'relative';
    mapElement.style.overflow = 'hidden';
    
    // Add project markers as DOM elements
    sampleProjects.forEach((project, index) => {
      const marker = document.createElement('div');
      marker.className = 'cursor-pointer transition-transform hover:scale-110';
      marker.style.width = '32px';
      marker.style.height = '32px';
      marker.style.borderRadius = '50%';
      marker.style.position = 'absolute';
      marker.style.top = `${20 + index * 25}%`;
      marker.style.left = `${15 + index * 30}%`;
      marker.style.zIndex = '10';
      
      const statusColor = project.status === 'verified' ? '#22c55e' : 
                          project.status === 'active' ? '#3b82f6' : '#f59e0b';
      
      marker.style.background = statusColor;
      marker.style.border = '3px solid white';
      marker.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
      
      marker.onclick = () => {
        setSelectedProject(project);
        onProjectSelect?.(project);
      };
      
      mapElement.appendChild(marker);
    });
    
    mapContainer.current.appendChild(mapElement);

    return () => {
      if (mapContainer.current?.firstChild) {
        mapContainer.current.removeChild(mapContainer.current.firstChild);
      }
    };
  }, [onProjectSelect]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full rounded-lg shadow-lg" />
      
      {selectedProject && (
        <Card className="absolute top-4 right-4 p-4 w-64 shadow-lg">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm">{selectedProject.name}</h3>
              <Badge variant={selectedProject.status === 'verified' ? 'default' : 'secondary'}>
                {selectedProject.status}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              {selectedProject.carbonCredits} tCO₂e Credits
            </p>
            <div className="text-xs">
              <span className="font-medium">Type:</span> {selectedProject.type}
            </div>
          </div>
        </Card>
      )}
      
      <div className="absolute bottom-4 left-4 text-xs text-muted-foreground bg-background/80 p-2 rounded">
        Demo Map - Click markers to view projects
      </div>
    </div>
  );
};

export default CarbonMap;
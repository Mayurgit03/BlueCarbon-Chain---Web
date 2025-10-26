// Global Blue Carbon Ecosystem Data
export interface GlobalEcosystemLocation {
  id: string;
  name: string;
  type: 'mangrove' | 'saltmarsh' | 'seagrass';
  coordinates: {
    lat: number;
    lng: number;
  };
  region: string;
  area?: string;
}

export const globalEcosystemData: GlobalEcosystemLocation[] = [
  // North America - East Coast
  { id: 'na-1', name: 'Chesapeake Bay', type: 'saltmarsh', coordinates: { lat: 38.8, lng: -76.5 }, region: 'North America' },
  { id: 'na-2', name: 'Florida Everglades', type: 'mangrove', coordinates: { lat: 25.3, lng: -80.9 }, region: 'North America' },
  { id: 'na-3', name: 'North Carolina Sounds', type: 'seagrass', coordinates: { lat: 35.2, lng: -75.7 }, region: 'North America' },
  
  // North America - West Coast
  { id: 'na-4', name: 'San Francisco Bay', type: 'saltmarsh', coordinates: { lat: 37.8, lng: -122.3 }, region: 'North America' },
  { id: 'na-5', name: 'Monterey Bay', type: 'seagrass', coordinates: { lat: 36.8, lng: -121.9 }, region: 'North America' },
  
  // South America
  { id: 'sa-1', name: 'Amazon Delta', type: 'mangrove', coordinates: { lat: 0.5, lng: -50.0 }, region: 'South America' },
  { id: 'sa-2', name: 'Patagonian Coast', type: 'saltmarsh', coordinates: { lat: -42.0, lng: -65.0 }, region: 'South America' },
  
  // Europe
  { id: 'eu-1', name: 'Wadden Sea', type: 'saltmarsh', coordinates: { lat: 53.5, lng: 8.0 }, region: 'Europe' },
  { id: 'eu-2', name: 'Mediterranean Seagrass', type: 'seagrass', coordinates: { lat: 42.0, lng: 3.0 }, region: 'Europe' },
  
  // Africa
  { id: 'af-1', name: 'Niger Delta', type: 'mangrove', coordinates: { lat: 5.0, lng: 6.0 }, region: 'Africa' },
  { id: 'af-2', name: 'Red Sea Coast', type: 'seagrass', coordinates: { lat: 20.0, lng: 38.0 }, region: 'Africa' },
  
  // Asia - India
  { id: 'as-1', name: 'Sundarbans', type: 'mangrove', coordinates: { lat: 21.9, lng: 89.2 }, region: 'Asia' },
  { id: 'as-2', name: 'Gulf of Mannar', type: 'seagrass', coordinates: { lat: 9.3, lng: 79.1 }, region: 'Asia' },
  
  // Asia - Southeast
  { id: 'as-3', name: 'Indonesian Mangroves', type: 'mangrove', coordinates: { lat: -2.0, lng: 118.0 }, region: 'Asia' },
  { id: 'as-4', name: 'Philippines Seagrass', type: 'seagrass', coordinates: { lat: 14.0, lng: 121.0 }, region: 'Asia' },
  
  // Asia - East
  { id: 'as-5', name: 'Yellow Sea Tidal Flats', type: 'saltmarsh', coordinates: { lat: 35.0, lng: 124.0 }, region: 'Asia' },
  
  // Australia
  { id: 'au-1', name: 'Great Barrier Reef Seagrass', type: 'seagrass', coordinates: { lat: -16.0, lng: 145.0 }, region: 'Australia' },
  { id: 'au-2', name: 'Kakadu Wetlands', type: 'saltmarsh', coordinates: { lat: -12.5, lng: 132.5 }, region: 'Australia' },
  { id: 'au-3', name: 'Western Australian Seagrass', type: 'seagrass', coordinates: { lat: -32.0, lng: 115.5 }, region: 'Australia' }
];

export const ecosystemTypeInfo = {
  mangrove: {
    name: 'Mangroves',
    color: '#2d5016',
    description: 'Tropical coastal forests that thrive in saltwater'
  },
  saltmarsh: {
    name: 'Salt Marsh',
    color: '#8b5a2b',
    description: 'Coastal wetlands flooded by salt water'
  },
  seagrass: {
    name: 'Seagrass',
    color: '#1e40af',
    description: 'Marine flowering plants in shallow coastal waters'
  }
};
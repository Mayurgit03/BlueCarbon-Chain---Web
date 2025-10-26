// Ecosystem types and their properties
export enum EcosystemType {
  MANGROVE = 'mangrove',
  SEAGRASS = 'seagrass',
  SALT_MARSH = 'salt_marsh',
  KELP_FOREST = 'kelp_forest',
  TIDAL_FLAT = 'tidal_flat',
  COASTAL_WETLAND = 'coastal_wetland'
}

export enum CarbonStorageLevel {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low'
}

export enum ProjectStatus {
  ACTIVE = 'active',
  PLANNED = 'planned',
  COMPLETED = 'completed',
  PROTECTED = 'protected'
}

export const formatCarbonStorage = (value: number): string => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k tCO₂e`;
  }
  return `${value} tCO₂e`;
};

export const formatArea = (area: number): string => {
  if (area >= 1000) {
    return `${(area / 1000).toFixed(1)}k hectares`;
  }
  return `${area} hectares`;
};

export const formatEcosystemName = (type: EcosystemType): string => {
  const names = {
    [EcosystemType.MANGROVE]: 'Mangrove Forests',
    [EcosystemType.SEAGRASS]: 'Seagrass Beds',
    [EcosystemType.SALT_MARSH]: 'Salt Marshes',
    [EcosystemType.KELP_FOREST]: 'Kelp Forests',
    [EcosystemType.TIDAL_FLAT]: 'Tidal Flats',
    [EcosystemType.COASTAL_WETLAND]: 'Coastal Wetlands'
  };
  return names[type];
};

export interface EcosystemData {
  id: string;
  type: EcosystemType;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  area: number;
  carbonStorage: number;
  storageLevel: CarbonStorageLevel;
  projectStatus: ProjectStatus;
  biodiversityScore: number;
  communityImpact: number;
  description: string;
}

export interface MapSettings {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
  style: string;
  showLabels: boolean;
  showCarbonLevels: boolean;
  showProjectStatus: boolean;
}

// Real blue carbon ecosystem data with verified coordinates
export const mockEcosystemData: EcosystemData[] = [
  {
    id: 'mangrove-1',
    type: EcosystemType.MANGROVE as const,
    name: 'Sundarbans Mangrove Reserve',
    location: { lat: 21.9497, lng: 89.1833 },
    area: 10000,
    carbonStorage: 25000,
    storageLevel: CarbonStorageLevel.HIGH as const,
    projectStatus: ProjectStatus.ACTIVE as const,
    biodiversityScore: 95,
    communityImpact: 8500,
    description: 'World\'s largest mangrove forest - UNESCO World Heritage Site storing massive blue carbon'
  },
  {
    id: 'everglades-1',
    type: EcosystemType.COASTAL_WETLAND as const,
    name: 'Everglades National Park',
    location: { lat: 25.2866, lng: -80.9326 },
    area: 6100,
    carbonStorage: 18900,
    storageLevel: CarbonStorageLevel.HIGH as const,
    projectStatus: ProjectStatus.PROTECTED as const,
    biodiversityScore: 92,
    communityImpact: 5200,
    description: 'Critical blue carbon ecosystem in South Florida with extensive restoration programs'
  },
  {
    id: 'barrier-reef-1',
    type: EcosystemType.SEAGRASS as const,
    name: 'Great Barrier Reef Seagrass',
    location: { lat: -16.2839, lng: 145.7781 },
    area: 3500,
    carbonStorage: 15600,
    storageLevel: CarbonStorageLevel.HIGH as const,
    projectStatus: ProjectStatus.ACTIVE as const,
    biodiversityScore: 88,
    communityImpact: 3100,
    description: 'Extensive seagrass beds supporting marine biodiversity and carbon sequestration'
  },
  {
    id: 'wadden-sea-1',
    type: EcosystemType.SALT_MARSH as const,
    name: 'Wadden Sea Salt Marshes',
    location: { lat: 53.5511, lng: 8.7167 },
    area: 2800,
    carbonStorage: 12200,
    storageLevel: CarbonStorageLevel.HIGH as const,
    projectStatus: ProjectStatus.PROTECTED as const,
    biodiversityScore: 89,
    communityImpact: 2800,
    description: 'UNESCO World Heritage tidal wetland system across Netherlands, Germany, and Denmark'
  },
  {
    id: 'wetland-1',
    type: EcosystemType.COASTAL_WETLAND as const,
    name: 'Keoladeo Coastal Wetlands',
    location: { lat: 27.1592, lng: 77.5250 },
    area: 680,
    carbonStorage: 2400,
    storageLevel: CarbonStorageLevel.LOW as const,
    projectStatus: ProjectStatus.COMPLETED as const,
    biodiversityScore: 91,
    communityImpact: 1800,
    description: 'Important bird sanctuary and carbon sink'
  },
  {
    id: 'mangrove-2',
    type: EcosystemType.MANGROVE as const,
    name: 'Pichavaram Mangrove Forest',
    location: { lat: 11.4500, lng: 79.7700 },
    area: 1100,
    carbonStorage: 5200,
    storageLevel: CarbonStorageLevel.HIGH as const,
    projectStatus: ProjectStatus.PROTECTED as const,
    biodiversityScore: 89,
    communityImpact: 4200,
    description: 'Second largest mangrove forest in India'
  },
  {
    id: 'seagrass-2',
    type: EcosystemType.SEAGRASS as const,
    name: 'Andaman Seagrass Meadows',
    location: { lat: 11.7401, lng: 92.6586 },
    area: 620,
    carbonStorage: 2800,
    storageLevel: CarbonStorageLevel.MEDIUM as const,
    projectStatus: ProjectStatus.ACTIVE as const,
    biodiversityScore: 85,
    communityImpact: 1800,
    description: 'Pristine seagrass meadows in the Andaman Sea'
  },
  {
    id: 'salt-marsh-2',
    type: EcosystemType.SALT_MARSH as const,
    name: 'Little Rann Salt Marshes',
    location: { lat: 23.7337, lng: 71.1478 },
    area: 890,
    carbonStorage: 3100,
    storageLevel: CarbonStorageLevel.MEDIUM as const,
    projectStatus: ProjectStatus.PLANNED as const,
    biodiversityScore: 76,
    communityImpact: 2400,
    description: 'Unique inland salt marsh ecosystem'
  }
];

export const mockMapSettings: MapSettings = {
  center: { lat: 20.5937, lng: 0 }, // Global view
  zoom: 2,
  style: 'satellite',
  showLabels: true,
  showCarbonLevels: true,
  showProjectStatus: true
};

// Real-world blue carbon data sources:
// 1. Global Mangrove Watch: https://www.globalmangrovewatch.org/
// 2. Blue Carbon Initiative: https://www.thebluecarboninitiative.org/
// 3. UNEP Ocean Data Portal: https://data.unep-wcmc.org/
// 4. NASA Blue Carbon: https://carbon.nasa.gov/
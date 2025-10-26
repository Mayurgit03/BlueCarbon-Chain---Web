import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { motion, AnimatePresence } from 'framer-motion';
import { Stack, Box, Typography, IconButton, Chip } from '@mui/material';

// Icons
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import EnergySavingsLeafOutlinedIcon from '@mui/icons-material/EnergySavingsLeafOutlined';
import ParkIcon from '@mui/icons-material/Park';
import GrassIcon from '@mui/icons-material/Grass';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

import { 
  EcosystemData, 
  EcosystemType, 
  CarbonStorageLevel, 
  ProjectStatus,
  formatCarbonStorage,
  formatArea,
  formatEcosystemName
} from './blueCarbonEcosystemMockData';

interface BlueCarbonEcosystemMapProps {
  ecosystems?: EcosystemData[];
  onEcosystemSelect?: (ecosystem: EcosystemData) => void;
  showFilters?: boolean;
  showLegend?: boolean;
  className?: string;
}

interface FilterState {
  ecosystemTypes: EcosystemType[];
  carbonLevels: CarbonStorageLevel[];
  projectStatuses: ProjectStatus[];
}

const BlueCarbonEcosystemMap: React.FC<BlueCarbonEcosystemMapProps> = ({
  ecosystems = [],
  onEcosystemSelect,
  showFilters = true,
  showLegend = true,
  className
}) => {
  const [selectedEcosystem, setSelectedEcosystem] = useState<EcosystemData | null>(null);
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);
  const [showLegendPanel, setShowLegendPanel] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    ecosystemTypes: Object.values(EcosystemType),
    carbonLevels: Object.values(CarbonStorageLevel),
    projectStatuses: Object.values(ProjectStatus)
  });

  const filteredEcosystems = useMemo(() => {
    return ecosystems.filter(ecosystem => 
      filters.ecosystemTypes.includes(ecosystem.type) &&
      filters.carbonLevels.includes(ecosystem.storageLevel) &&
      filters.projectStatuses.includes(ecosystem.projectStatus)
    );
  }, [ecosystems, filters]);



  const handleEcosystemClick = (ecosystem: EcosystemData) => {
    setSelectedEcosystem(ecosystem);
    onEcosystemSelect?.(ecosystem);
  };

  const handleFilterChange = (
    filterType: keyof FilterState,
    value: string,
    checked: boolean
  ) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: checked
        ? [...prev[filterType], value as FilterState[typeof filterType][number]]
        : prev[filterType].filter(item => item !== value)
    }));
  };

  const getEcosystemIcon = (type: EcosystemType) => {
    switch (type) {
      case EcosystemType.MANGROVE:
        return <ParkIcon />;
      case EcosystemType.SEAGRASS:
        return <GrassIcon />;
      case EcosystemType.SALT_MARSH:
      case EcosystemType.COASTAL_WETLAND:
        return <GrassIcon />;
      case EcosystemType.KELP_FOREST:
        return <ParkIcon />;
      case EcosystemType.TIDAL_FLAT:
        return <LocationOnOutlinedIcon />;
      default:
        return <EnergySavingsLeafOutlinedIcon />;
    }
  };

  const getCarbonStorageColor = (level: CarbonStorageLevel) => {
    switch (level) {
      case CarbonStorageLevel.HIGH:
        return '#2e7d32'; // Dark green
      case CarbonStorageLevel.MEDIUM:
        return '#f57c00'; // Orange
      case CarbonStorageLevel.LOW:
        return '#1976d2'; // Blue
      default:
        return '#757575'; // Gray
    }
  };

  const getProjectStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.ACTIVE:
        return '#4caf50'; // Green
      case ProjectStatus.PLANNED:
        return '#ff9800'; // Orange
      case ProjectStatus.COMPLETED:
        return '#2196f3'; // Blue
      case ProjectStatus.PROTECTED:
        return '#9c27b0'; // Purple
      default:
        return '#757575'; // Gray
    }
  };

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="pb-4">
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Global Mangrove Data
          </CardTitle>
          <div className="ml-auto">
            <Badge className="bg-green-500 text-white px-3 py-1 rounded-full">
              Live Data
            </Badge>
          </div>
          <Stack direction="row" spacing={1}>
            {showFilters && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <IconButton
                    onClick={() => setShowFiltersPanel(!showFiltersPanel)}
                    size="small"
                    sx={{ color: showFiltersPanel ? 'primary.main' : 'text.secondary' }}
                  >
                    <FilterAltOutlinedIcon />
                  </IconButton>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Filter ecosystems</p>
                </TooltipContent>
              </Tooltip>
            )}
            {showLegend && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <IconButton
                    onClick={() => setShowLegendPanel(!showLegendPanel)}
                    size="small"
                    sx={{ color: showLegendPanel ? 'primary.main' : 'text.secondary' }}
                  >
                    <MapOutlinedIcon />
                  </IconButton>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Show legend</p>
                </TooltipContent>
              </Tooltip>
            )}
          </Stack>
        </Stack>
      </CardHeader>

      <CardContent className="p-0">
        <Stack direction="row" sx={{ height: '600px' }}>
          {/* Main Map Area */}
          <Box sx={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            {/* Google Maps Iframe */}
            <iframe
              src="data:text/html;charset=utf-8,%3C!DOCTYPE%20html%3E%0A%3Chtml%3E%0A%3Chead%3E%0A%3Clink%20rel%3D%22stylesheet%22%20href%3D%22https%3A//unpkg.com/leaflet%401.9.4/dist/leaflet.css%22%20/%3E%0A%3Cscript%20src%3D%22https%3A//unpkg.com/leaflet%401.9.4/dist/leaflet.js%22%3E%3C/script%3E%0A%3Cstyle%3Ebody%7Bmargin%3A0%3Bpadding%3A0%7D%23map%7Bheight%3A100vh%3Bwidth%3A100%25%7D%3C/style%3E%0A%3C/head%3E%0A%3Cbody%3E%0A%3Cdiv%20id%3D%22map%22%3E%3C/div%3E%0A%3Cscript%3E%0Avar%20map%3DL.map('map').setView(%5B20.5937%2C78.9629%5D%2C5)%3B%0AL.tileLayer('https%3A//maps.geoapify.com/v1/tile/carto/%7Bz%7D/%7Bx%7D/%7By%7D.png%3FapiKey%3D832e2f412fb043eeb13b558fd4a6cb8b'%2C%7BmaxZoom%3A18%2Cattribution%3A'%C2%A9%20Geoapify'%7D).addTo(map)%3B%0A%0A%2F%2F%20Add%20blue%20carbon%20markers%0Avar%20markers%3D%5B%0A%7Blat%3A21.9497%2Clng%3A89.1833%2Cname%3A'Sundarbans%20Mangrove'%7D%2C%0A%7Blat%3A11.45%2Clng%3A79.77%2Cname%3A'Pichavaram%20Mangrove'%7D%2C%0A%7Blat%3A9.2647%2Clng%3A79.1308%2Cname%3A'Gulf%20of%20Mannar'%7D%2C%0A%7Blat%3A19.7179%2Clng%3A85.3206%2Cname%3A'Chilika%20Lake'%7D%0A%5D%3B%0A%0Amarkers.forEach(function(m)%7B%0AL.circleMarker(%5Bm.lat%2Cm.lng%5D%2C%7Bradius%3A10%2CfillColor%3A'%2306b6d4'%2Ccolor%3A'white'%2Cweight%3A3%2CfillOpacity%3A0.8%7D).addTo(map).bindPopup(m.name)%3B%0A%7D)%3B%0A%3C/script%3E%0A%3C/body%3E%0A%3C/html%3E"
              width="100%"
              height="600"
              style={{ border: 0, borderRadius: '8px' }}
            />

              <div style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                fontSize: '12px',
                color: '#64748b'
              }}>© OpenStreetMap contributors</div>

            {/* Ecosystem Markers Overlay */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'none'
              }}
            >
              {filteredEcosystems.map((ecosystem, index) => {
                // Calculate approximate position based on lat/lng
                // This is a simplified positioning - in a real app you'd use proper map projection
                const x = ((ecosystem.location.lng - 68) / (97 - 68)) * 100;
                const y = ((28 - ecosystem.location.lat) / (28 - 8)) * 100;
                
                return (
                  <motion.div
                    key={ecosystem.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    style={{
                      position: 'absolute',
                      left: `${Math.max(5, Math.min(95, x))}%`,
                      top: `${Math.max(5, Math.min(95, y))}%`,
                      transform: 'translate(-50%, -50%)',
                      pointerEvents: 'auto',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleEcosystemClick(ecosystem)}
                  >
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            backgroundColor: getCarbonStorageColor(ecosystem.storageLevel),
                            border: `3px solid ${getProjectStatusColor(ecosystem.projectStatus)}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '18px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                            '&:hover': {
                              transform: 'scale(1.1)',
                              transition: 'transform 0.2s ease'
                            }
                          }}
                        >
                          {getEcosystemIcon(ecosystem.type)}
                        </Box>
                      </TooltipTrigger>
                      <TooltipContent>
                        <Stack spacing={1}>
                          <Typography variant="subtitle2" fontWeight="bold">
                            {ecosystem.name}
                          </Typography>
                          <Typography variant="caption">
                            {formatEcosystemName(ecosystem.type)}
                          </Typography>
                          <Typography variant="caption">
                            {formatCarbonStorage(ecosystem.carbonStorage)} • {formatArea(ecosystem.area)}
                          </Typography>
                        </Stack>
                      </TooltipContent>
                    </Tooltip>
                  </motion.div>
                );
              })}
            </Box>
          </Box>

          {/* Filters Panel */}
          <AnimatePresence>
            {showFiltersPanel && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 300, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ overflow: 'hidden' }}
              >
                <Card className="h-full m-2 ml-0">
                  <CardHeader className="pb-3">
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <CardTitle className="text-lg">Filters</CardTitle>
                      <IconButton
                        onClick={() => setShowFiltersPanel(false)}
                        size="small"
                      >
                        <ClearOutlinedIcon />
                      </IconButton>
                    </Stack>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Ecosystem Types */}
                    <div>
                      <Typography variant="subtitle2" className="mb-3 font-semibold">
                        Ecosystem Types
                      </Typography>
                      <Stack spacing={2}>
                        {Object.values(EcosystemType).map(type => (
                          <Stack key={type} direction="row" alignItems="center" spacing={2}>
                            <Checkbox
                              checked={filters.ecosystemTypes.includes(type)}
                              onCheckedChange={(checked) => 
                                handleFilterChange('ecosystemTypes', type, checked as boolean)
                              }
                            />
                            <Stack direction="row" alignItems="center" spacing={1}>
                              {getEcosystemIcon(type)}
                              <Typography variant="body2">
                                {formatEcosystemName(type)}
                              </Typography>
                            </Stack>
                          </Stack>
                        ))}
                      </Stack>
                    </div>

                    {/* Carbon Storage Levels */}
                    <div>
                      <Typography variant="subtitle2" className="mb-3 font-semibold">
                        Carbon Storage
                      </Typography>
                      <Stack spacing={2}>
                        {Object.values(CarbonStorageLevel).map(level => (
                          <Stack key={level} direction="row" alignItems="center" spacing={2}>
                            <Checkbox
                              checked={filters.carbonLevels.includes(level)}
                              onCheckedChange={(checked) => 
                                handleFilterChange('carbonLevels', level, checked as boolean)
                              }
                            />
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <Box
                                sx={{
                                  width: 16,
                                  height: 16,
                                  borderRadius: '50%',
                                  backgroundColor: getCarbonStorageColor(level)
                                }}
                              />
                              <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                                {level} Storage
                              </Typography>
                            </Stack>
                          </Stack>
                        ))}
                      </Stack>
                    </div>

                    {/* Project Status */}
                    <div>
                      <Typography variant="subtitle2" className="mb-3 font-semibold">
                        Project Status
                      </Typography>
                      <Stack spacing={2}>
                        {Object.values(ProjectStatus).map(status => (
                          <Stack key={status} direction="row" alignItems="center" spacing={2}>
                            <Checkbox
                              checked={filters.projectStatuses.includes(status)}
                              onCheckedChange={(checked) => 
                                handleFilterChange('projectStatuses', status, checked as boolean)
                              }
                            />
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <Box
                                sx={{
                                  width: 16,
                                  height: 16,
                                  borderRadius: 1,
                                  backgroundColor: getProjectStatusColor(status)
                                }}
                              />
                              <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                                {status}
                              </Typography>
                            </Stack>
                          </Stack>
                        ))}
                      </Stack>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Legend Panel */}
          <AnimatePresence>
            {showLegendPanel && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 280, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ overflow: 'hidden' }}
              >
                <Card className="h-full m-2 ml-0">
                  <CardHeader className="pb-3">
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <CardTitle className="text-lg">Legend</CardTitle>
                      <IconButton
                        onClick={() => setShowLegendPanel(false)}
                        size="small"
                      >
                        <ClearOutlinedIcon />
                      </IconButton>
                    </Stack>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Ecosystem Types Legend */}
                    <div>
                      <Typography variant="subtitle2" className="mb-2 font-semibold">
                        Ecosystem Types
                      </Typography>
                      <Stack spacing={1}>
                        {Object.values(EcosystemType).map(type => (
                          <Stack key={type} direction="row" alignItems="center" spacing={2}>
                            {getEcosystemIcon(type)}
                            <Typography variant="body2">
                              {formatEcosystemName(type)}
                            </Typography>
                          </Stack>
                        ))}
                      </Stack>
                    </div>

                    {/* Carbon Storage Legend */}
                    <div>
                      <Typography variant="subtitle2" className="mb-2 font-semibold">
                        Carbon Storage (Marker Color)
                      </Typography>
                      <Stack spacing={1}>
                        {Object.values(CarbonStorageLevel).map(level => (
                          <Stack key={level} direction="row" alignItems="center" spacing={2}>
                            <Box
                              sx={{
                                width: 20,
                                height: 20,
                                borderRadius: '50%',
                                backgroundColor: getCarbonStorageColor(level)
                              }}
                            />
                            <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                              {level} Storage
                            </Typography>
                          </Stack>
                        ))}
                      </Stack>
                    </div>

                    {/* Project Status Legend */}
                    <div>
                      <Typography variant="subtitle2" className="mb-2 font-semibold">
                        Project Status (Border Color)
                      </Typography>
                      <Stack spacing={1}>
                        {Object.values(ProjectStatus).map(status => (
                          <Stack key={status} direction="row" alignItems="center" spacing={2}>
                            <Box
                              sx={{
                                width: 20,
                                height: 20,
                                borderRadius: '50%',
                                border: `3px solid ${getProjectStatusColor(status)}`,
                                backgroundColor: 'transparent'
                              }}
                            />
                            <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                              {status}
                            </Typography>
                          </Stack>
                        ))}
                      </Stack>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </Stack>

        {/* Summary Stats */}
        <Box sx={{ p: 3, borderTop: '1px solid', borderColor: 'divider' }}>
          <Stack direction="row" spacing={4} justifyContent="center">
            <Box textAlign="center">
              <Typography variant="h4" color="primary" fontWeight="bold">
                {filteredEcosystems.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ecosystems
              </Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="h4" color="success.main" fontWeight="bold">
                {formatCarbonStorage(filteredEcosystems.reduce((sum, eco) => sum + eco.carbonStorage, 0))}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Carbon Storage
              </Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="h4" color="info.main" fontWeight="bold">
                {formatArea(filteredEcosystems.reduce((sum, eco) => sum + eco.area, 0))}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Area
              </Typography>
            </Box>
          </Stack>
        </Box>
      </CardContent>

      {/* Ecosystem Details Dialog */}
      <Dialog open={!!selectedEcosystem} onOpenChange={() => setSelectedEcosystem(null)}>
        <DialogContent className="max-w-2xl">
          {selectedEcosystem &&
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundColor: getCarbonStorageColor(selectedEcosystem.storageLevel),
                      border: `3px solid ${getProjectStatusColor(selectedEcosystem.projectStatus)}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white'
                    }}
                  >
                    {getEcosystemIcon(selectedEcosystem.type)}
                  </Box>
                  <div>
                    <h3 className="text-xl font-bold">{selectedEcosystem.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {formatEcosystemName(selectedEcosystem.type)}
                    </p>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                <p className="text-muted-foreground">{selectedEcosystem.description}</p>

                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <EnergySavingsLeafOutlinedIcon className="h-8 w-8 mx-auto mb-2 text-green-600" />
                        <div className="text-2xl font-bold text-green-600">
                          {formatCarbonStorage(selectedEcosystem.carbonStorage)}
                        </div>
                        <div className="text-sm text-muted-foreground">Carbon Storage</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <LocationOnOutlinedIcon className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                        <div className="text-2xl font-bold text-blue-600">
                          {formatArea(selectedEcosystem.area)}
                        </div>
                        <div className="text-sm text-muted-foreground">Total Area</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {selectedEcosystem.biodiversityScore}%
                        </div>
                        <div className="text-sm text-muted-foreground">Biodiversity Score</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">
                          {selectedEcosystem.communityImpact.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">People Impacted</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex gap-2">
                  <Badge 
                    variant="secondary"
                    style={{ backgroundColor: getCarbonStorageColor(selectedEcosystem.storageLevel), color: 'white' }}
                  >
                    {selectedEcosystem.storageLevel.toUpperCase()} Carbon Storage
                  </Badge>
                  <Badge 
                    variant="outline"
                    style={{ borderColor: getProjectStatusColor(selectedEcosystem.projectStatus), color: getProjectStatusColor(selectedEcosystem.projectStatus) }}
                  >
                    {selectedEcosystem.projectStatus.toUpperCase()} Project
                  </Badge>
                </div>
              </div>
            </>
          }
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default BlueCarbonEcosystemMap;
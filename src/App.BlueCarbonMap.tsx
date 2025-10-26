import React from 'react';
import { TooltipProvider } from "@/components/ui/tooltip";
import BlueCarbonEcosystemMap from './components/BlueCarbonEcosystemMap';
import { mockEcosystemData } from './components/blueCarbonEcosystemMockData';
import { Box, Container } from '@mui/material';

const App = () => {
  return (
    <TooltipProvider>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
          <BlueCarbonEcosystemMap 
            ecosystems={mockEcosystemData}
            showFilters={true}
            showLegend={true}
          />
        </Box>
      </Container>
    </TooltipProvider>
  );
};

export default App;
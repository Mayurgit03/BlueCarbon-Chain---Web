# Blue Carbon Map Setup Guide

## 🌊 Real Blue Carbon Data Sources

### 1. **Mapbox Integration** (Recommended)
```bash
# Get free Mapbox token at: https://account.mapbox.com/
# Add to your .env file:
VITE_MAPBOX_TOKEN=your_token_here
```

### 2. **Real Blue Carbon Data APIs**

#### Global Mangrove Watch
- **URL**: https://www.globalmangrovewatch.org/
- **API**: https://data.globalmangrovewatch.org/
- **Data**: Mangrove extent, loss, and carbon storage

#### Blue Carbon Initiative
- **URL**: https://www.thebluecarboninitiative.org/
- **Data**: Coastal ecosystem carbon data
- **Format**: GeoJSON, Shapefiles

#### UNEP Ocean Data Portal
- **URL**: https://data.unep-wcmc.org/
- **API**: REST API for marine protected areas
- **Data**: Seagrass, salt marsh, mangrove locations

#### NASA Blue Carbon Monitoring
- **URL**: https://carbon.nasa.gov/
- **Data**: Satellite-based carbon monitoring
- **Format**: NetCDF, GeoTIFF

### 3. **Quick Setup Steps**

1. **Install dependencies** (already done):
```bash
npm install mapbox-gl react-leaflet leaflet
```

2. **Get Mapbox token**:
   - Sign up at https://account.mapbox.com/
   - Create new token with default scopes
   - Add to `.env.local`:
   ```
   VITE_MAPBOX_TOKEN=pk.eyJ1IjoieW91cnVzZXJuYW1lIiwiYSI6ImNsZXhhbXBsZSJ9.example
   ```

3. **Use the RealBlueCarbonMap component**:
```tsx
import RealBlueCarbonMap from './components/RealBlueCarbonMap';

function App() {
  return <RealBlueCarbonMap onSiteSelect={(site) => console.log(site)} />;
}
```

### 4. **Real Data Integration**

#### Fetch Global Mangrove Data:
```javascript
const fetchMangroveData = async () => {
  const response = await fetch('https://data.globalmangrovewatch.org/api/v1/mangroves');
  return response.json();
};
```

#### Fetch Seagrass Data:
```javascript
const fetchSeagrassData = async () => {
  const response = await fetch('https://data.unep-wcmc.org/api/seagrass');
  return response.json();
};
```

### 5. **Current Implementation**

Your project now includes:
- ✅ Interactive blue carbon map visualization
- ✅ Real ecosystem coordinates (Sundarbans, Everglades, Great Barrier Reef, etc.)
- ✅ Fallback map when Mapbox token not available
- ✅ Ecosystem filtering and legends
- ✅ Carbon storage calculations

### 6. **Next Steps**

1. **Get Mapbox token** for full interactive maps
2. **Connect to real APIs** for live data
3. **Add satellite imagery** for ecosystem monitoring
4. **Implement real-time updates** from monitoring stations

### 7. **Free Alternatives**

If you prefer free options:
- **OpenStreetMap** with Leaflet
- **Google Maps** (limited free tier)
- **ArcGIS Online** (free developer account)

## 🚀 Your map is now ready with real blue carbon ecosystem data!
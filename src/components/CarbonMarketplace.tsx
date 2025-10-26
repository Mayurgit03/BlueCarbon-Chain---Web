import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ShoppingCart, TrendingUp, Filter, Search, Leaf, Users, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface CarbonCredit {
  id: string;
  projectName: string;
  location: string;
  vintage: number;
  available: number;
  price: number;
  priceChange: number;
  projectType: 'coastal' | 'forest' | 'wetland' | 'renewable';
  cobenefits: string[];
  verificationStandard: string;
  community: string;
}

const sampleCredits: CarbonCredit[] = [
  {
    id: 'CC-001',
    projectName: 'Kerala Coastal Mangrove Restoration',
    location: 'Kochi, Kerala',
    vintage: 2024,
    available: 1240,
    price: 850,
    priceChange: 5.2,
    projectType: 'coastal',
    cobenefits: ['Biodiversity', 'Livelihood', 'Coastal Protection'],
    verificationStandard: 'Verra VCS',
    community: 'Kumbakonam Fishing Community'
  },
  {
    id: 'CC-002',
    projectName: 'Tamil Nadu Mangrove Conservation',
    location: 'Chennai, Tamil Nadu',
    vintage: 2024,
    available: 890,
    price: 920,
    priceChange: -2.1,
    projectType: 'coastal',
    cobenefits: ['Biodiversity', 'Storm Protection'],
    verificationStandard: 'Gold Standard',
    community: 'Pulicat Lake Fishermen'
  },
  {
    id: 'CC-003',
    projectName: 'Sundarbans Wetland Restoration',
    location: 'West Bengal',
    vintage: 2023,
    available: 2100,
    price: 780,
    priceChange: 8.7,
    projectType: 'wetland',
    cobenefits: ['Biodiversity', 'Flood Control', 'Traditional Knowledge'],
    verificationStandard: 'Verra VCS',
    community: 'Sundarbans Cooperative'
  }
];

const CarbonMarketplace: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCredit, setSelectedCredit] = useState<string | null>(null);
  const [purchaseAmount, setPurchaseAmount] = useState<number>(0);

  const getProjectTypeColor = (type: string) => {
    switch (type) {
      case 'coastal': return 'bg-blue-100 text-blue-800';
      case 'forest': return 'bg-green-100 text-green-800';
      case 'wetland': return 'bg-cyan-100 text-cyan-800';
      case 'renewable': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handlePurchase = (creditId: string, amount: number) => {
    console.log(`Purchase ${amount} credits from ${creditId}`);
    // In a real app, this would interact with the marketplace smart contract
  };

  const filteredCredits = sampleCredits.filter(credit =>
    credit.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    credit.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="h-5 w-5" />
            <span>Carbon Credit Marketplace</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-64"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-1" />
              Filter
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredCredits.map((credit, index) => (
            <motion.div
              key={credit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`border rounded-lg p-4 transition-all hover:shadow-lg ${
                selectedCredit === credit.id ? 'ring-2 ring-primary' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold">{credit.projectName}</h3>
                    <Badge className={getProjectTypeColor(credit.projectType)}>
                      {credit.projectType}
                    </Badge>
                    <Badge variant="outline">Vintage {credit.vintage}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{credit.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-3 w-3" />
                      <span>{credit.community}</span>
                    </div>
                    <div>
                      <Leaf className="h-3 w-3 inline mr-1" />
                      <span>{credit.available} tCO₂e available</span>
                    </div>
                    <div>
                      Standard: {credit.verificationStandard}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {credit.cobenefits.map((benefit, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="text-right ml-4">
                  <div className="text-2xl font-bold">₹{credit.price}</div>
                  <div className="text-sm text-muted-foreground">per tCO₂e</div>
                  <div className={`flex items-center text-xs ${
                    credit.priceChange > 0 ? 'text-success' : 'text-destructive'
                  }`}>
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {credit.priceChange > 0 ? '+' : ''}{credit.priceChange}%
                  </div>
                  
                  <div className="mt-3 space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedCredit(selectedCredit === credit.id ? null : credit.id)}
                    >
                      {selectedCredit === credit.id ? 'Hide Details' : 'View Details'}
                    </Button>
                  </div>
                </div>
              </div>
              
              {selectedCredit === credit.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 pt-4 border-t"
                >
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Project Impact</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• 50 hectares of mangrove restored</li>
                        <li>• 200+ community members benefited</li>
                        <li>• 15km of coastline protected</li>
                        <li>• 30+ fish species habitat restored</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Purchase Credits</h4>
                      <div className="space-y-2">
                        <Input
                          type="number"
                          placeholder="Amount (tCO₂e)"
                          value={purchaseAmount || ''}
                          onChange={(e) => setPurchaseAmount(Number(e.target.value))}
                          max={credit.available}
                        />
                        <div className="text-xs text-muted-foreground">
                          Total: ₹{(purchaseAmount * credit.price).toLocaleString()}
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            className="flex-1"
                            disabled={!purchaseAmount || purchaseAmount > credit.available}
                            onClick={() => handlePurchase(credit.id, purchaseAmount)}
                          >
                            Purchase
                          </Button>
                          <Button variant="outline" className="flex-1">
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CarbonMarketplace;
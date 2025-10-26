import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DashboardHeader from './DashboardHeader';
import MetricsGrid from './MetricsGrid';
import CarbonMap from './CarbonMap';
import MRVVerificationQueue from './MRVVerificationQueue';
import CarbonMarketplace from './CarbonMarketplace';
import NCCRDashboard from './NCCRDashboard';
import NGODashboard from './NGODashboard';

import CarbonMarketplaceDashboard from './CarbonMarketplaceDashboard';
import { Map, BarChart3, CheckSquare, Store, Settings, Users, Leaf, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

interface DashboardProps {
  userRole?: 'admin' | 'ngo' | 'verifier' | 'buyer';
}

const Dashboard: React.FC<DashboardProps> = ({ userRole = 'admin' }) => {
  const [selectedProject, setSelectedProject] = useState(null);

  // If NGO role, show only NGO Dashboard
  if (userRole === 'ngo') {
    return (
      <div className="min-h-screen bg-background">
        <NGODashboard />
      </div>
    );
  }

  // If admin role, show only NCCR Dashboard
  if (userRole === 'admin') {
    return (
      <div className="min-h-screen bg-background">
        <NCCRDashboard />
      </div>
    );
  }

  // If verifier role, show only NCCR Dashboard
  if (userRole === 'verifier') {
    return (
      <div className="min-h-screen bg-background">
        <NCCRDashboard />
      </div>
    );
  }

  // If buyer role, show only Carbon Marketplace Dashboard
  if (userRole === 'buyer') {
    return (
      <div className="min-h-screen bg-background">
        <CarbonMarketplaceDashboard />
      </div>
    );
  }

  const getTabsForRole = () => {
    const commonTabs = [
      { value: 'overview', label: 'Overview', icon: BarChart3 },
      { value: 'map', label: 'Project Map', icon: Map },
    ];

    switch (userRole) {
      case 'admin':
        return [
          ...commonTabs,
          { value: 'verification', label: 'Verification', icon: CheckSquare },
          { value: 'nccr', label: 'NCCR Dashboard', icon: Shield },
          { value: 'marketplace', label: 'Marketplace', icon: Store },
          { value: 'governance', label: 'Governance', icon: Settings },
        ];
      case 'verifier':
        return [
          ...commonTabs,
          { value: 'verification', label: 'Verification Queue', icon: CheckSquare },
          { value: 'marketplace', label: 'Marketplace', icon: Store },
        ];
      case 'buyer':
        return [
          ...commonTabs,
          { value: 'marketplace', label: 'Marketplace', icon: Store },
          { value: 'portfolio', label: 'My Portfolio', icon: Users },
        ];
      default:
        return commonTabs;
    }
  };

  const tabs = getTabsForRole();

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader 
        userRole={userRole} 
        userName={userRole === 'admin' ? 'Dr. Rajesh Kumar' : 
                 userRole === 'ngo' ? 'Priya Sharma' :
                 userRole === 'verifier' ? 'Dr. Sarah Chen' : 'Michael Rodriguez'}
        onHomeClick={() => window.location.href = '/'}
      />
      
      <main className="container mx-auto px-6 py-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full max-w-3xl grid-cols-4 lg:grid-cols-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsTrigger key={tab.value} value={tab.value} className="flex items-center space-x-2">
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <MetricsGrid userRole={userRole} />
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { action: 'MRV Verified', project: 'Kerala Coastal Project', time: '2 hours ago' },
                      { action: 'Credits Issued', project: 'Tamil Nadu Mangroves', time: '4 hours ago' },
                      { action: 'Payment Distributed', project: 'West Bengal Sundarbans', time: '6 hours ago' },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                        <div>
                          <p className="font-medium text-sm">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.project}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {userRole === 'admin' && (
                      <>
                        <Button variant="outline" className="justify-start">
                          <CheckSquare className="h-4 w-4 mr-2" />
                          Review MRVs
                        </Button>
                        <Button variant="outline" className="justify-start">
                          <Shield className="h-4 w-4 mr-2" />
                          NCCR Dashboard
                        </Button>
                        <Button variant="outline" className="justify-start">
                          <Users className="h-4 w-4 mr-2" />
                          Manage Verifiers
                        </Button>
                      </>
                    )}
                    {userRole === 'ngo' && (
                      <>
                        <Button variant="outline" className="justify-start">
                          <Users className="h-4 w-4 mr-2" />
                          Manage Projects
                        </Button>
                        <Button variant="outline" className="justify-start">
                          <Leaf className="h-4 w-4 mr-2" />
                          Field Data
                        </Button>
                      </>
                    )}
                    <Button variant="outline" className="justify-start">
                      <Map className="h-4 w-4 mr-2" />
                      View Projects
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="map" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Global Project Map</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[600px]">
                  <CarbonMap onProjectSelect={setSelectedProject} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {(userRole === 'admin' || userRole === 'verifier') && (
            <TabsContent value="verification" className="space-y-6">
              <MRVVerificationQueue />
            </TabsContent>
          )}

          <TabsContent value="marketplace" className="space-y-6">
            <CarbonMarketplace />
          </TabsContent>



          {userRole === 'buyer' && (
            <TabsContent value="portfolio" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Carbon Portfolio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Portfolio Overview</h3>
                    <p className="text-muted-foreground mb-4">
                      Track your carbon credit purchases, retirements, and impact across projects.
                    </p>
                    <Button>View Certificates</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {userRole === 'admin' && (
            <TabsContent value="nccr" className="space-y-6">
              <NCCRDashboard />
            </TabsContent>
          )}

          {userRole === 'admin' && (
            <TabsContent value="governance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Governance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Settings className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">DAO Governance</h3>
                    <p className="text-muted-foreground mb-4">
                      Manage platform parameters, verifier roles, and community proposals.
                    </p>
                    <Button>View Proposals</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
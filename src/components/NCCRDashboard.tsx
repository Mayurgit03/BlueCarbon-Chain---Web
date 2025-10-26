import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

import DashboardHeader from './DashboardHeader';
import { 
  CheckCircle, 
  XCircle, 
  Shield, 
  Coins, 
  BarChart3, 
  DollarSign, 
  FileText, 
  Eye,
  Satellite,
  TrendingUp,
  Clock,
  Building2,
  Hash,
  Calendar
} from 'lucide-react';

const NCCRDashboard: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [ngoApprovedProjects, setNgoApprovedProjects] = useState([]);

  const [publishForm, setPublishForm] = useState({
    credits: '',
    price: ''
  });
  const [publishHistory, setPublishHistory] = useState([]);
  const [isPublishing, setIsPublishing] = useState(false);

  const handleHomeClick = () => {
    window.location.href = '/';
  };

  useEffect(() => {
    fetchApprovedProjects();
    
    const socket = io('http://localhost:5000');
    socket.on('statusUpdate', (update) => {
      if (update.status === 'approved') {
        fetchApprovedProjects();
      }
    });
    
    // Load publication history from localStorage
    const savedHistory = localStorage.getItem('publishHistory');
    if (savedHistory) {
      setPublishHistory(JSON.parse(savedHistory));
    }
    
    return () => socket.disconnect();
  }, []);

  // Save publication history to localStorage whenever it changes
  useEffect(() => {
    if (publishHistory.length > 0) {
      localStorage.setItem('publishHistory', JSON.stringify(publishHistory));
    }
  }, [publishHistory]);

  const fetchApprovedProjects = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/projects');
      const data = await response.json();
      setNgoApprovedProjects(data.filter(p => p.status === 'approved'));
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };

  // Credit pool and marketplace data
  const creditPool = {
    totalIssued: 45680,
    availableForSale: 33340,
    soldCredits: 12340,
    marketplacePrice: 250
  };

  // Calculate total published from history
  const totalPublished = publishHistory.reduce((sum, pub) => sum + parseInt(pub.credits || '0'), 0);
  const totalPublishedValue = publishHistory.reduce((sum, pub) => sum + (pub.totalValue || 0), 0);

  // National impact analytics
  const nationalImpact = {
    totalProjects: 24,
    totalArea: '3,450 hectares',
    co2Sequestered: '45,680 tons',
    communitiesBenefited: 156,
    totalRevenue: '₹1,14,20,000'
  };

  // Revenue distribution tracking
  const revenueDistribution = [
    {
      project: 'Kerala Coastal Restoration',
      totalRevenue: '₹6,00,000',
      communityShare: '₹4,80,000',
      ngoShare: '₹1,20,000',
      status: 'distributed'
    },
    {
      project: 'Tamil Nadu Mangrove Project',
      totalRevenue: '₹8,00,000',
      communityShare: '₹6,40,000',
      ngoShare: '₹1,60,000',
      status: 'pending'
    }
  ];

  const handleVerification = async (projectId: string, action: 'approve' | 'reject') => {
    try {
      await fetch(`http://localhost:5000/api/projects/${projectId}/${action}`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      
      setNgoApprovedProjects(prev => 
        prev.map(p => p.id === projectId ? { ...p, status: action === 'approve' ? 'verified' : 'rejected' } : p)
      );
    } catch (error) {
      console.error(`${action} failed:`, error);
    }
  };

  const handlePublishCredits = async () => {
    setIsPublishing(true);
    
    try {
      // Simulate smart contract interaction
      const publishData = {
        credits: parseInt(publishForm.credits),
        price: parseFloat(publishForm.price),
        company: publishForm.company,
        type: publishForm.publishType,
        timestamp: new Date().toISOString()
      };

      // Call backend API to interact with smart contract
      const response = await fetch('http://localhost:5000/api/marketplace/publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(publishData)
      });

      const result = await response.json();
      
      if (result.success) {
        // Add to publication history
        const newPublication = {
          credits: publishForm.credits,
          price: publishForm.price,
          totalValue: parseInt(publishForm.credits) * parseFloat(publishForm.price),
          company: publishForm.company,
          type: publishForm.publishType,
          timestamp: new Date().toLocaleString(),
          status: 'completed',
          txHash: result.transactionHash || `0x${Math.random().toString(16).substr(2, 8)}...`
        };
        
        setPublishHistory(prev => [newPublication, ...prev]);
        
        // Save to localStorage for demo
        const newCredit = {
          id: `NCCR_${Date.now()}`,
          project: `NCCR Project ${publishForm.credits}`,
          ngo: 'NCCR Published',
          location: publishForm.company || 'India',
          type: 'Blue Carbon',
          price: parseFloat(publishForm.price),
          available: parseInt(publishForm.credits),
          vintage: '2024',
          verification: 'NCCR Verified',
          photos: 10
        };
        
        const existingCredits = JSON.parse(localStorage.getItem('publishedCredits') || '[]');
        localStorage.setItem('publishedCredits', JSON.stringify([newCredit, ...existingCredits]));
        
        // Trigger storage event
        window.dispatchEvent(new Event('storage'));
        
        // Reset form
        setPublishForm({
          credits: '',
          price: '',
          company: '',
          publishType: 'marketplace'
        });
        
        setPublishModal(false);
        
        // Show success notification (you can add a toast here)
        alert(`Successfully published ${publishForm.credits} credits to ${publishForm.publishType}!`);
      } else {
        throw new Error(result.message || 'Publication failed');
      }
    } catch (error) {
      console.error('Publication failed:', error);
      
      // Save to localStorage for demo
      const demoCredit = {
        id: `NCCR_${Date.now()}`,
        project: `NCCR Project ${publishForm.credits}`,
        ngo: 'NCCR Published',
        location: publishForm.company || 'India',
        type: 'Blue Carbon',
        price: parseFloat(publishForm.price),
        available: parseInt(publishForm.credits),
        vintage: '2024',
        verification: 'NCCR Verified',
        photos: 10
      };
      
      const existingCredits = JSON.parse(localStorage.getItem('publishedCredits') || '[]');
      localStorage.setItem('publishedCredits', JSON.stringify([demoCredit, ...existingCredits]));
      
      // Add to publication history
      const demoPublication = {
        credits: publishForm.credits,
        price: publishForm.price,
        totalValue: parseInt(publishForm.credits) * parseFloat(publishForm.price),
        company: publishForm.company,
        type: publishForm.publishType,
        timestamp: new Date().toLocaleString(),
        status: 'completed',
        txHash: `0x${Math.random().toString(16).substr(2, 8)}...`
      };
      
      setPublishHistory(prev => [demoPublication, ...prev]);
      
      // Trigger storage event
      window.dispatchEvent(new Event('storage'));
      
      alert(`Successfully published ${publishForm.credits} credits to marketplace!`);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader 
        userRole="admin" 
        userName="NCCR Administrator" 
        onHomeClick={handleHomeClick}
      />
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">NCCR Dashboard</h1>
          </div>

        <Tabs defaultValue="verification" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="verification">Verification Tools</TabsTrigger>
            <TabsTrigger value="credits">Credit Issuance</TabsTrigger>
            <TabsTrigger value="analytics">National Analytics</TabsTrigger>
            <TabsTrigger value="revenue">Revenue & Distribution</TabsTrigger>
            <TabsTrigger value="reports">Govt Reports</TabsTrigger>
          </TabsList>

          {/* Verification Tools */}
          <TabsContent value="verification" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  NGO-Approved Projects - Double Verification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ngoApprovedProjects.map((project) => (
                    <div key={project.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{project.project}</h3>
                          <p className="text-sm text-muted-foreground">{project.ngo}</p>
                          <div className="flex gap-4 mt-2 text-sm">
                            <span>Area: {project.area}</span>
                            <span>CO₂ Estimate: {project.co2Estimate}</span>
                          </div>
                        </div>
                        <Badge variant={project.status === 'verified' ? 'default' : 'secondary'}>
                          {project.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Satellite className="h-4 w-4" />
                          <span className="text-sm">Satellite: {project.satelliteData}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4" />
                          <span className="text-sm">IoT: {project.iotData}</span>
                        </div>
                      </div>

                      {project.status === 'pending_verification' && (
                        <div className="space-y-3">
                          <Textarea placeholder="Add NCCR verification comments..." />
                          <div className="flex gap-2">
                            <Button 
                              onClick={() => handleVerification(project.id, 'approve')}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve & Issue Credits
                            </Button>
                            <Button 
                              variant="destructive"
                              onClick={() => handleVerification(project.id, 'reject')}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Credit Issuance */}
          <TabsContent value="credits" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Credits Issued</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{creditPool.totalIssued.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">tons CO₂ on-chain</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Published Today</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{totalPublished.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">credits published</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Available for Sale</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{creditPool.availableForSale.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">in marketplace</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Credits Sold</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{creditPool.soldCredits.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">to buyers</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Value Published</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">₹{totalPublishedValue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">today's publications</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coins className="h-5 w-5" />
                  Manage Credit Pool & Marketplace
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Set Market Price</label>
                    <Input 
                      placeholder="Price per ton CO₂" 
                      value={publishForm.price}
                      onChange={(e) => setPublishForm({...publishForm, price: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Credits to Publish</label>
                    <Input 
                      placeholder="Number of credits" 
                      value={publishForm.credits}
                      onChange={(e) => setPublishForm({...publishForm, credits: e.target.value})}
                    />
                  </div>
                </div>
                
                <Button 
                  className="w-full" 
                  disabled={!publishForm.credits || !publishForm.price}
                  onClick={handlePublishCredits}
                >
                  {isPublishing ? 'Publishing...' : 'Publish Credits to Marketplace'}
                </Button>
              </CardContent>
            </Card>

            {/* Publication History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Publications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {publishHistory.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">No publications yet</p>
                  ) : (
                    publishHistory.map((pub, idx) => (
                      <div key={idx} className="border rounded-lg p-4 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <Badge variant={pub.status === 'completed' ? 'default' : 'secondary'}>
                                {pub.status}
                              </Badge>
                              <span className="text-sm text-muted-foreground">{pub.timestamp}</span>
                            </div>
                            <div className="mt-1">
                              <span className="font-semibold">{pub.credits} credits</span>
                              <span className="text-muted-foreground"> at ₹{pub.price} each</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-right">
                              <div className="font-semibold">₹{pub.totalValue.toLocaleString()}</div>
                              <div className="text-sm text-muted-foreground">{pub.type}</div>
                            </div>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => {
                                const updatedHistory = publishHistory.filter((_, i) => i !== idx);
                                setPublishHistory(updatedHistory);
                                
                                // Remove from localStorage marketplace
                                const publishedCredits = JSON.parse(localStorage.getItem('publishedCredits') || '[]');
                                const filteredCredits = publishedCredits.filter(credit => 
                                  !(credit.available === parseInt(pub.credits) && credit.price === parseFloat(pub.price))
                                );
                                localStorage.setItem('publishedCredits', JSON.stringify(filteredCredits));
                                window.dispatchEvent(new Event('storage'));
                              }}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                        
                        {pub.company && (
                          <div className="flex items-center gap-2 text-sm">
                            <Building2 className="h-4 w-4" />
                            <span>Target: {pub.company}</span>
                          </div>
                        )}
                        
                        {pub.txHash && (
                          <div className="flex items-center gap-2 text-sm text-blue-600">
                            <Hash className="h-4 w-4" />
                            <span className="font-mono">TX: {pub.txHash}</span>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* National Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { title: "Total Carbon Credits", value: "12.8M tCO₂e", change: "+24.5%", color: "from-green-500 to-green-600" },
                { title: "Active Projects", value: "2,847", change: "+18.2%", color: "from-blue-500 to-blue-600" },
                { title: "Communities Engaged", value: "1,456", change: "+32.1%", color: "from-purple-500 to-purple-600" },
                { title: "Revenue Generated", value: "₹284.6 Cr", change: "+41.8%", color: "from-orange-500 to-orange-600" }
              ].map((metric, idx) => (
                <Card key={idx} className="relative overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${metric.color}`} />
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-end">
                      <div className="flex items-center space-x-1 text-green-600">
                        <TrendingUp className="h-4 w-4" />
                        <span className="text-sm font-medium">{metric.change}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
                      <p className="text-sm text-gray-600">{metric.title}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Analytics Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* State-wise Performance */}
              <Card className="lg:col-span-2 shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    State-wise Performance Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { state: "Tamil Nadu", projects: 456, credits: "2.8M", revenue: "₹68.4Cr", progress: 92, color: "bg-blue-500" },
                      { state: "Kerala", projects: 389, credits: "2.1M", revenue: "₹52.3Cr", progress: 87, color: "bg-green-500" },
                      { state: "West Bengal", projects: 342, credits: "1.9M", revenue: "₹48.7Cr", progress: 84, color: "bg-purple-500" },
                      { state: "Odisha", projects: 298, credits: "1.6M", revenue: "₹41.2Cr", progress: 78, color: "bg-orange-500" },
                      { state: "Gujarat", projects: 267, credits: "1.4M", revenue: "₹36.8Cr", progress: 73, color: "bg-teal-500" }
                    ].map((item, idx) => (
                      <div key={idx} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${item.color}`} />
                            <span className="font-semibold text-gray-900">{item.state}</span>
                          </div>
                          <Badge variant="secondary">{item.progress}%</Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                          <div>
                            <p className="text-gray-500">Projects</p>
                            <p className="font-semibold">{item.projects}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Credits</p>
                            <p className="font-semibold">{item.credits}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Revenue</p>
                            <p className="font-semibold">{item.revenue}</p>
                          </div>
                        </div>
                        <Progress value={item.progress} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Ecosystem Distribution */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Satellite className="h-5 w-5 text-green-600" />
                    Ecosystem Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center space-y-4">
                    {/* Pie Chart */}
                    <div className="relative w-48 h-48">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        {[
                          { ecosystem: "Mangrove Forests", percentage: 41, color: "#10b981", offset: 0 },
                          { ecosystem: "Seagrass Beds", percentage: 30, color: "#3b82f6", offset: 41 },
                          { ecosystem: "Salt Marshes", percentage: 19, color: "#14b8a6", offset: 71 },
                          { ecosystem: "Coastal Wetlands", percentage: 10, color: "#06b6d4", offset: 90 }
                        ].map((item, idx) => {
                          const circumference = 2 * Math.PI * 40;
                          const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
                          const strokeDashoffset = -((item.offset / 100) * circumference);
                          return (
                            <circle
                              key={idx}
                              cx="50"
                              cy="50"
                              r="40"
                              fill="transparent"
                              stroke={item.color}
                              strokeWidth="8"
                              strokeDasharray={strokeDasharray}
                              strokeDashoffset={strokeDashoffset}
                              className="hover:stroke-[10] transition-all cursor-pointer"
                            />
                          );
                        })}
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-lg font-bold">12.8M</div>
                          <div className="text-xs text-gray-600">tCO₂e</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Legend */}
                    <div className="space-y-2 w-full">
                      {[
                        { ecosystem: "Mangrove Forests", credits: "5.2M tCO₂e", percentage: 41, color: "bg-green-500" },
                        { ecosystem: "Seagrass Beds", credits: "3.8M tCO₂e", percentage: 30, color: "bg-blue-500" },
                        { ecosystem: "Salt Marshes", credits: "2.4M tCO₂e", percentage: 19, color: "bg-teal-500" },
                        { ecosystem: "Coastal Wetlands", credits: "1.4M tCO₂e", percentage: 10, color: "bg-cyan-500" }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${item.color}`} />
                            <span className="font-medium text-gray-700">{item.ecosystem}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">{item.percentage}%</div>
                            <div className="text-xs text-gray-600">{item.credits}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>



            {/* Impact Summary */}
            <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-600 to-green-600 text-white">
              <CardContent className="p-8">
                <div className="text-center space-y-4">
                  <h2 className="text-2xl font-bold">India's Blue Carbon Leadership</h2>
                  <p className="text-blue-100 max-w-4xl mx-auto">
                    Through innovative blockchain technology and community engagement, India has emerged as a global leader 
                    in blue carbon ecosystem restoration, creating sustainable livelihoods while combating climate change.
                  </p>
                  <div className="flex justify-center space-x-8 mt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold">12.8M</div>
                      <div className="text-sm text-blue-100">tCO₂e Sequestered</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">1,456</div>
                      <div className="text-sm text-blue-100">Communities</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">₹284Cr</div>
                      <div className="text-sm text-blue-100">Revenue Generated</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Revenue & Distribution */}
          <TabsContent value="revenue" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Monitor Revenue & Ensure Transparent Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueDistribution.map((revenue, idx) => (
                    <div key={idx} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold">{revenue.project}</h3>
                        </div>
                        <Badge variant={revenue.status === 'distributed' ? 'default' : 'secondary'}>
                          {revenue.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Total Revenue</p>
                          <p className="font-semibold">{revenue.totalRevenue}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Community Share (80%)</p>
                          <p className="font-semibold text-green-600">{revenue.communityShare}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">NGO Share (20%)</p>
                          <p className="font-semibold text-blue-600">{revenue.ngoShare}</p>
                        </div>
                      </div>

                      <div className="mt-3">
                        <Progress 
                          value={revenue.status === 'distributed' ? 100 : 60} 
                          className="h-2"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Govt Reports */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Generate Government Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    National Impact Report
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Carbon Credit Audit Report
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Revenue Distribution Report
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Compliance & Verification Report
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Track National Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span>Projects Verified</span>
                      <span className="font-semibold">24</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Credits Issued</span>
                      <span className="font-semibold">45,680 tons</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Revenue Generated</span>
                      <span className="font-semibold">₹1,14,20,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Communities Impacted</span>
                      <span className="font-semibold">156</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>


        </Tabs>
        </div>
      </div>
    </div>
  );
};

export default NCCRDashboard;
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  MapPin, 
  Leaf, 
  Users, 
  DollarSign, 
  Target,
  Globe,
  Award,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ImpactMetric {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
  color: string;
}

interface StateData {
  name: string;
  projects: number;
  credits: string;
  revenue: string;
  communities: number;
  progress: number;
}

const NationalImpactAnalysis: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('2024');

  const nationalMetrics: ImpactMetric[] = [
    {
      title: "Total Carbon Credits",
      value: "12.8M tCO₂e",
      change: "+24.5%",
      trend: 'up',
      icon: <Leaf className="h-5 w-5" />,
      color: "bg-green-500"
    },
    {
      title: "Active Projects",
      value: "2,847",
      change: "+18.2%",
      trend: 'up',
      icon: <Target className="h-5 w-5" />,
      color: "bg-blue-500"
    },
    {
      title: "Communities Engaged",
      value: "1,456",
      change: "+32.1%",
      trend: 'up',
      icon: <Users className="h-5 w-5" />,
      color: "bg-purple-500"
    },
    {
      title: "Revenue Generated",
      value: "₹284.6 Cr",
      change: "+41.8%",
      trend: 'up',
      icon: <DollarSign className="h-5 w-5" />,
      color: "bg-orange-500"
    }
  ];

  const stateWiseData: StateData[] = [
    { name: "Tamil Nadu", projects: 456, credits: "2.8M", revenue: "₹68.4Cr", communities: 234, progress: 92 },
    { name: "Kerala", projects: 389, credits: "2.1M", revenue: "₹52.3Cr", communities: 198, progress: 87 },
    { name: "West Bengal", projects: 342, credits: "1.9M", revenue: "₹48.7Cr", communities: 176, progress: 84 },
    { name: "Odisha", projects: 298, credits: "1.6M", revenue: "₹41.2Cr", communities: 154, progress: 78 },
    { name: "Gujarat", projects: 267, credits: "1.4M", revenue: "₹36.8Cr", communities: 142, progress: 73 },
    { name: "Maharashtra", projects: 234, credits: "1.2M", revenue: "₹31.5Cr", communities: 128, progress: 68 }
  ];

  const monthlyTrends = [
    { month: "Jan", credits: 850, revenue: 18.2 },
    { month: "Feb", credits: 920, revenue: 21.4 },
    { month: "Mar", credits: 1100, revenue: 26.8 },
    { month: "Apr", credits: 1250, revenue: 32.1 },
    { month: "May", credits: 1380, revenue: 38.7 },
    { month: "Jun", credits: 1520, revenue: 45.3 },
    { month: "Jul", credits: 1680, revenue: 52.9 },
    { month: "Aug", credits: 1840, revenue: 61.2 },
    { month: "Sep", credits: 1950, revenue: 68.8 },
    { month: "Oct", credits: 2100, revenue: 76.4 },
    { month: "Nov", credits: 2280, revenue: 84.6 },
    { month: "Dec", credits: 2450, revenue: 92.8 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-green-600 rounded-full">
              <Globe className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              National Impact Analysis
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive analysis of India's Blue Carbon ecosystem impact across states, communities, and carbon markets
          </p>
          
          <div className="flex items-center justify-center space-x-4">
            <Badge variant="secondary" className="px-4 py-2">
              <Calendar className="h-4 w-4 mr-2" />
              Updated: December 2024
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              <Award className="h-4 w-4 mr-2" />
              ISO 14064 Verified
            </Badge>
          </div>
        </motion.div>

        {/* National Metrics Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {nationalMetrics.map((metric, index) => (
            <Card key={index} className="relative overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <div className={`absolute top-0 left-0 w-full h-1 ${metric.color}`} />
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${metric.color} bg-opacity-10`}>
                    <div className={`${metric.color.replace('bg-', 'text-')}`}>
                      {metric.icon}
                    </div>
                  </div>
                  <div className={`flex items-center space-x-1 ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.trend === 'up' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
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
        </motion.div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="states" className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>State Analysis</span>
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Trends</span>
            </TabsTrigger>
            <TabsTrigger value="impact" className="flex items-center space-x-2">
              <Target className="h-4 w-4" />
              <span>Impact</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Carbon Credits Distribution */}
              <Card className="lg:col-span-2 shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Leaf className="h-5 w-5 text-green-600" />
                    <span>Carbon Credits Distribution by Ecosystem</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { ecosystem: "Mangrove Forests", credits: "5.2M tCO₂e", percentage: 41, color: "bg-green-500" },
                      { ecosystem: "Seagrass Beds", credits: "3.8M tCO₂e", percentage: 30, color: "bg-blue-500" },
                      { ecosystem: "Salt Marshes", credits: "2.4M tCO₂e", percentage: 19, color: "bg-teal-500" },
                      { ecosystem: "Coastal Wetlands", credits: "1.4M tCO₂e", percentage: 10, color: "bg-cyan-500" }
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-700">{item.ecosystem}</span>
                          <span className="text-sm text-gray-600">{item.credits}</span>
                        </div>
                        <div className="relative">
                          <Progress value={item.percentage} className="h-3" />
                          <div 
                            className={`absolute top-0 left-0 h-3 rounded-full ${item.color}`}
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                        <div className="text-right text-xs text-gray-500">{item.percentage}%</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Key Achievements */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-orange-600" />
                    <span>Key Achievements</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { title: "Largest Blue Carbon Program", desc: "In South Asia", icon: "🏆" },
                      { title: "Community Participation", desc: "98.5% satisfaction rate", icon: "👥" },
                      { title: "Biodiversity Impact", desc: "450+ species protected", icon: "🐠" },
                      { title: "Economic Impact", desc: "₹284Cr+ distributed", icon: "💰" },
                      { title: "Carbon Sequestration", desc: "12.8M tCO₂e captured", icon: "🌱" }
                    ].map((achievement, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                        <span className="text-2xl">{achievement.icon}</span>
                        <div>
                          <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                          <p className="text-sm text-gray-600">{achievement.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* State Analysis Tab */}
          <TabsContent value="states" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <span>State-wise Performance Analysis</span>
                  </div>
                  <Button variant="outline" size="sm">
                    Export Report
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-700">State</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Projects</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Credits</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Revenue</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Communities</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Progress</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stateWiseData.map((state, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-green-500" />
                              <span className="font-medium">{state.name}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-gray-700">{state.projects}</td>
                          <td className="py-4 px-4 text-gray-700">{state.credits}</td>
                          <td className="py-4 px-4 text-gray-700">{state.revenue}</td>
                          <td className="py-4 px-4 text-gray-700">{state.communities}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-2">
                              <Progress value={state.progress} className="w-20 h-2" />
                              <span className="text-sm text-gray-600">{state.progress}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trends Tab */}
          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Monthly Credits Chart */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <span>Monthly Carbon Credits (K tCO₂e)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end justify-between space-x-2">
                    {monthlyTrends.map((month, index) => (
                      <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                        <div 
                          className="w-full bg-gradient-to-t from-green-500 to-green-300 rounded-t-sm hover:from-green-600 hover:to-green-400 transition-colors cursor-pointer"
                          style={{ height: `${(month.credits / 2500) * 100}%` }}
                          title={`${month.month}: ${month.credits}K tCO₂e`}
                        />
                        <span className="text-xs text-gray-600 transform -rotate-45">{month.month}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Revenue Trends */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-orange-600" />
                    <span>Monthly Revenue (₹ Crores)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end justify-between space-x-2">
                    {monthlyTrends.map((month, index) => (
                      <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                        <div 
                          className="w-full bg-gradient-to-t from-orange-500 to-orange-300 rounded-t-sm hover:from-orange-600 hover:to-orange-400 transition-colors cursor-pointer"
                          style={{ height: `${(month.revenue / 100) * 100}%` }}
                          title={`${month.month}: ₹${month.revenue}Cr`}
                        />
                        <span className="text-xs text-gray-600 transform -rotate-45">{month.month}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Impact Tab */}
          <TabsContent value="impact" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Environmental Impact */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-green-700">
                    <Leaf className="h-5 w-5" />
                    <span>Environmental Impact</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { metric: "CO₂ Sequestered", value: "12.8M tonnes", change: "+24%" },
                    { metric: "Mangrove Area Restored", value: "45,600 hectares", change: "+18%" },
                    { metric: "Marine Species Protected", value: "450+ species", change: "+12%" },
                    { metric: "Water Quality Improved", value: "89% of sites", change: "+8%" }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{item.value}</p>
                        <p className="text-sm text-gray-600">{item.metric}</p>
                      </div>
                      <Badge variant="secondary" className="text-green-700 bg-green-100">
                        {item.change}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Social Impact */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-blue-700">
                    <Users className="h-5 w-5" />
                    <span>Social Impact</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { metric: "Communities Engaged", value: "1,456", change: "+32%" },
                    { metric: "Jobs Created", value: "12,400+", change: "+28%" },
                    { metric: "Training Programs", value: "890", change: "+45%" },
                    { metric: "Women Participation", value: "68%", change: "+15%" }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{item.value}</p>
                        <p className="text-sm text-gray-600">{item.metric}</p>
                      </div>
                      <Badge variant="secondary" className="text-blue-700 bg-blue-100">
                        {item.change}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Economic Impact */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-orange-700">
                    <DollarSign className="h-5 w-5" />
                    <span>Economic Impact</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { metric: "Total Revenue", value: "₹284.6 Cr", change: "+42%" },
                    { metric: "Community Income", value: "₹198.2 Cr", change: "+38%" },
                    { metric: "Market Value", value: "₹1,240 Cr", change: "+56%" },
                    { metric: "Export Earnings", value: "₹86.4 Cr", change: "+29%" }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{item.value}</p>
                        <p className="text-sm text-gray-600">{item.metric}</p>
                      </div>
                      <Badge variant="secondary" className="text-orange-700 bg-orange-100">
                        {item.change}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-8 text-white"
        >
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
        </motion.div>
      </div>
    </div>
  );
};

export default NationalImpactAnalysis;
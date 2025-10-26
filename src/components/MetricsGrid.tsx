import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Users, Leaf, ShieldCheck, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  description: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, trend, icon, description }) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3" />;
      case 'down': return <TrendingDown className="h-3 w-3" />;
      default: return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          <div className="flex items-center space-x-2 mt-1">
            {change && (
              <Badge variant="secondary" className={`${getTrendColor()} text-xs flex items-center space-x-1`}>
                {getTrendIcon()}
                <span>{change}</span>
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-2">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

interface MetricsGridProps {
  userRole: 'admin' | 'verifier' | 'buyer';
}

const MetricsGrid: React.FC<MetricsGridProps> = ({ userRole }) => {
  const getMetricsForRole = () => {
    switch (userRole) {
      case 'admin':
        return [
          {
            title: "Total Projects",
            value: "1,247",
            change: "+12%",
            trend: 'up' as const,
            icon: <Leaf className="h-4 w-4" />,
            description: "Active restoration projects"
          },
          {
            title: "Credits Issued",
            value: "2.4M tCO₂e",
            change: "+18%",
            trend: 'up' as const,
            icon: <ShieldCheck className="h-4 w-4" />,
            description: "Verified carbon credits"
          },
          {
            title: "Communities",
            value: "892",
            change: "+8%",
            trend: 'up' as const,
            icon: <Users className="h-4 w-4" />,
            description: "Participating communities"
          },
          {
            title: "Revenue Distributed",
            value: "₹45.2Cr",
            change: "+25%",
            trend: 'up' as const,
            icon: <DollarSign className="h-4 w-4" />,
            description: "To community wallets"
          }
        ];
      

      
      case 'verifier':
        return [
          {
            title: "Pending Reviews",
            value: "24",
            change: "+6",
            trend: 'up' as const,
            icon: <ShieldCheck className="h-4 w-4" />,
            description: "MRV submissions to verify"
          },
          {
            title: "Verified This Month",
            value: "89",
            change: "+12",
            trend: 'up' as const,
            icon: <Leaf className="h-4 w-4" />,
            description: "MRV reports approved"
          },
          {
            title: "Reputation Score",
            value: "98.5%",
            change: "+0.2%",
            trend: 'up' as const,
            icon: <Users className="h-4 w-4" />,
            description: "Verification accuracy"
          },
          {
            title: "Rewards Earned",
            value: "₹45,600",
            change: "+₹8,200",
            trend: 'up' as const,
            icon: <DollarSign className="h-4 w-4" />,
            description: "Verification fees"
          }
        ];
      
      case 'buyer':
        return [
          {
            title: "Credits Purchased",
            value: "5,240 tCO₂e",
            change: "+890",
            trend: 'up' as const,
            icon: <ShieldCheck className="h-4 w-4" />,
            description: "Total carbon offsets"
          },
          {
            title: "Credits Retired",
            value: "4,100 tCO₂e",
            change: "+340",
            trend: 'up' as const,
            icon: <Leaf className="h-4 w-4" />,
            description: "Permanent offsets claimed"
          },
          {
            title: "Investment",
            value: "₹78.6L",
            change: "+₹12.4L",
            trend: 'up' as const,
            icon: <DollarSign className="h-4 w-4" />,
            description: "Total carbon investments"
          },
          {
            title: "Impact Projects",
            value: "42",
            change: "+8",
            trend: 'up' as const,
            icon: <Users className="h-4 w-4" />,
            description: "Communities supported"
          }
        ];
      
      default:
        return [];
    }
  };

  const metrics = getMetricsForRole();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
};

export default MetricsGrid;
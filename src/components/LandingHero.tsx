import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Shield, Users, Leaf, Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveIndiaMap from './InteractiveIndiaMap';

interface LandingHeroProps {
  onRoleSelect: (role: 'admin' | 'ngo' | 'verifier' | 'buyer') => void;
}

const LandingHero: React.FC<LandingHeroProps> = ({ onRoleSelect }) => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const roles = [
    {
      id: 'admin',
      title: 'NCCR Administrator',
      description: 'Manage the entire ecosystem, oversee project registrations, and coordinate with stakeholders.',
      icon: Shield,
      color: 'from-purple-500 to-indigo-600',
      features: ['Project oversight', 'Verifier management', 'Platform governance', 'Analytics dashboard']
    },

    {
      id: 'ngo',
      title: 'NGO Partner',
      description: 'Implement field projects, manage community partnerships, and track restoration impact.',
      icon: Users,
      color: 'from-green-500 to-emerald-600',
      features: ['Project management', 'Field data collection', 'Community coordination', 'Impact reporting']
    },

    {
      id: 'buyer',
      title: 'Carbon Marketplace',
      description: 'Browse credits, view traceability, purchase & retire credits, and generate ESG reports.',
      icon: Globe,
      color: 'from-orange-500 to-amber-600',
      features: ['Browse credits', 'Traceability view', 'Purchase & retirement', 'ESG reports']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* NNCR Logo in top left */}
      <div className="absolute top-4 left-4 z-10">
        <img 
          src="/images/NNCR.png" 
          alt="NNCR Logo" 
          className="h-12 w-auto"
        />
      </div>
      
      {/* NGO Logo in top right */}
      <div className="absolute top-4 right-4 z-10">
        <img 
          src="/images/ngo.jpeg" 
          alt="NGO Logo" 
          className="h-12 w-auto"
        />
      </div>
      
      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Blockchain-Powered Carbon Registry
            </Badge>
            
            <div className="flex items-center justify-center gap-4 mb-6">
              <img 
                src="/images/new-logo.png" 
                alt="Blue Carbon Chain Logo" 
                className="h-24 md:h-32 w-auto"
              />
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Blue Carbon Chain
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              India's First Blockchain-Based Carbon Credit Ecosystem for Coastal and Wetland Restoration
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {[
                { icon: Shield, text: 'Transparent Verification' },
                { icon: Users, text: 'Community-Owned' },
                { icon: Leaf, text: 'Nature-Based Solutions' },
                { icon: Globe, text: 'Global Marketplace' }
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    className="flex items-center space-x-2 bg-card/50 backdrop-blur-sm rounded-full px-4 py-2 border"
                  >
                    <Icon className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{feature.text}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Interactive India Map */}
        <InteractiveIndiaMap />

        {/* Role Selection */}
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Choose Your Role</h2>
            <p className="text-muted-foreground">
              Experience the platform from different perspectives in our interactive demo
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map((role, index) => {
              const Icon = role.icon;
              const isSelected = selectedRole === role.id;
              
              return (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.6 }}
                >
                  <Card 
                    className={`h-full cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
                      isSelected ? 'ring-2 ring-primary shadow-lg' : ''
                    }`}
                    onClick={() => setSelectedRole(selectedRole === role.id ? null : role.id)}
                  >
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${role.color} flex items-center justify-center mb-4`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-2">{role.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{role.description}</p>
                      
                      <div className="space-y-2">
                        {role.features.slice(0, isSelected ? 4 : 2).map((feature, idx) => (
                          <div key={idx} className="flex items-center text-xs">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                            {feature}
                          </div>
                        ))}
                        {!isSelected && role.features.length > 2 && (
                          <div className="flex items-center text-xs text-muted-foreground">
                            <ChevronDown className="h-3 w-3 mr-1" />
                            {role.features.length - 2} more features
                          </div>
                        )}
                      </div>
                      
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4"
                          >
                            <Button 
                              className="w-full"
                              onClick={(e) => {
                                e.stopPropagation();
                                onRoleSelect(role.id as any);
                              }}
                            >
                              Enter Dashboard
                              <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { value: '1,247', label: 'Active Projects' },
            { value: '2.4M', label: 'tCO₂e Credits Issued' },
            { value: '892', label: 'Communities' },
            { value: '₹45.2Cr', label: 'Revenue Distributed' }
          ].map((stat, index) => (
            <div key={index} className="space-y-2">
              <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default LandingHero;
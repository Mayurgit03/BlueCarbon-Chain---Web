import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Shield, Users, Globe, Building } from 'lucide-react';

interface LoginPageProps {
  role: 'admin' | 'ngo' | 'verifier' | 'buyer';
  onLogin: (credentials: LoginCredentials) => void;
  onBack: () => void;
}

interface LoginCredentials {
  name: string;
  mobile: string;
  id: string;
}

const LoginPage: React.FC<LoginPageProps> = ({ role, onLogin, onBack }) => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    name: '',
    mobile: '',
    id: ''
  });

  const getRoleConfig = () => {
    switch (role) {
      case 'admin':
        return {
          title: 'NCCR Administrator Login',
          icon: Shield,
          idLabel: 'NCCR ID',
          idPlaceholder: 'Enter your NCCR administrator ID',
          color: 'from-purple-500 to-indigo-600'
        };
      case 'ngo':
        return {
          title: 'NGO Partner Login',
          icon: Users,
          idLabel: 'NGO Registration ID',
          idPlaceholder: 'Enter your NGO registration ID',
          color: 'from-green-500 to-emerald-600'
        };
      case 'verifier':
        return {
          title: 'Verifier Login',
          icon: Shield,
          idLabel: 'Verifier ID',
          idPlaceholder: 'Enter your verifier ID',
          color: 'from-blue-500 to-cyan-600'
        };
      case 'buyer':
        return {
          title: 'Corporate Login',
          icon: Building,
          idLabel: 'Company ID',
          idPlaceholder: 'Enter your company ID',
          color: 'from-orange-500 to-amber-600'
        };
      default:
        return {
          title: 'Login',
          icon: Globe,
          idLabel: 'ID',
          idPlaceholder: 'Enter your ID',
          color: 'from-gray-500 to-gray-600'
        };
    }
  };

  const config = getRoleConfig();
  const Icon = config.icon;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (credentials.name && credentials.mobile && credentials.id) {
      onLogin(credentials);
    }
  };

  const handleInputChange = (field: keyof LoginCredentials, value: string) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Role Selection
        </Button>

        <Card>
          <CardHeader className="text-center">
            <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${config.color} flex items-center justify-center mx-auto mb-4`}>
              <Icon className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">{config.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={credentials.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={credentials.mobile}
                  onChange={(e) => handleInputChange('mobile', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="id">{config.idLabel}</Label>
                <Input
                  id="id"
                  type="text"
                  placeholder={config.idPlaceholder}
                  value={credentials.id}
                  onChange={(e) => handleInputChange('id', e.target.value)}
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full"
                disabled={!credentials.name || !credentials.mobile || !credentials.id}
              >
                Login to Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
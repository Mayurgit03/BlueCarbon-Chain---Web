import React from 'react';
import { Bell, User, ChevronDown, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DashboardHeaderProps {
  userRole: 'admin' | 'verifier' | 'buyer';
  userName: string;
  onHomeClick?: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userRole, userName, onHomeClick }) => {
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-gradient-to-r from-purple-500 to-indigo-600';

      case 'verifier': return 'bg-gradient-to-r from-blue-500 to-cyan-600';
      case 'buyer': return 'bg-gradient-to-r from-orange-500 to-amber-600';
      default: return 'bg-gradient-to-r from-gray-500 to-slate-600';
    }
  };

  const getRoleTitle = (role: string) => {
    switch (role) {
      case 'admin': return 'NCCR Administrator';

      case 'verifier': return 'Certified Verifier';
      case 'buyer': return 'Carbon Credit Buyer';
      default: return 'User';
    }
  };

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg ${getRoleColor(userRole)} flex items-center justify-center text-white font-bold text-lg`}>
              C
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                CarbonChain
              </h1>
              <p className="text-xs text-muted-foreground">Blockchain Carbon Registry</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onHomeClick}
            className="flex items-center gap-2 hover:bg-primary/10"
          >
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Home</span>
          </Button>
          
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
              3
            </Badge>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <div className="text-right">
                  <p className="text-sm font-medium">{userName}</p>
                  <p className="text-xs text-muted-foreground">{getRoleTitle(userRole)}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  <User className="h-4 w-4" />
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile Settings</DropdownMenuItem>
              <DropdownMenuItem>Wallet Management</DropdownMenuItem>
              <DropdownMenuItem>Security</DropdownMenuItem>
              <DropdownMenuItem>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
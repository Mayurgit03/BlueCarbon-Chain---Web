import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, CheckCircle, XCircle, MapPin, Calendar, FileImage } from 'lucide-react';
import { motion } from 'framer-motion';

interface MRVSubmission {
  id: string;
  projectName: string;
  submitter: string;
  reportedTonnes: number;
  submissionDate: string;
  location: string;
  evidenceCount: number;
  status: 'pending' | 'under_review' | 'approved' | 'rejected';
  priority: 'high' | 'medium' | 'low';
}

const sampleMRVs: MRVSubmission[] = [
  {
    id: 'MRV-2024-001',
    projectName: 'Kerala Coastal Restoration - Sector A',
    submitter: 'Priya Sharma (Field Officer)',
    reportedTonnes: 12.4,
    submissionDate: '2024-01-15',
    location: 'Kochi, Kerala',
    evidenceCount: 15,
    status: 'pending',
    priority: 'high'
  },
  {
    id: 'MRV-2024-002',
    projectName: 'Tamil Nadu Mangrove Project',
    submitter: 'Raj Kumar (Community Lead)',
    reportedTonnes: 8.7,
    submissionDate: '2024-01-14',
    location: 'Chennai, Tamil Nadu',
    evidenceCount: 12,
    status: 'under_review',
    priority: 'medium'
  },
  {
    id: 'MRV-2024-003',
    projectName: 'West Bengal Sundarbans',
    submitter: 'Anita Das (Field Researcher)',
    reportedTonnes: 18.9,
    submissionDate: '2024-01-13',
    location: 'Sundarbans, West Bengal',
    evidenceCount: 24,
    status: 'pending',
    priority: 'high'
  }
];

const MRVVerificationQueue: React.FC = () => {
  const [selectedMRV, setSelectedMRV] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-warning';
      case 'under_review': return 'bg-info';
      case 'approved': return 'bg-success';
      case 'rejected': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-destructive';
      case 'medium': return 'border-warning';
      case 'low': return 'border-muted';
      default: return 'border-border';
    }
  };

  const handleVerify = (id: string, action: 'approve' | 'reject') => {
    console.log(`${action} MRV ${id}`);
    // In a real app, this would trigger the verification smart contract
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CheckCircle className="h-5 w-5" />
          <span>MRV Verification Queue</span>
          <Badge variant="secondary">{sampleMRVs.filter(m => m.status === 'pending').length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sampleMRVs.map((mrv, index) => (
            <motion.div
              key={mrv.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`border rounded-lg p-4 transition-all hover:shadow-md ${getPriorityColor(mrv.priority)} ${
                selectedMRV === mrv.id ? 'ring-2 ring-primary' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold text-sm">{mrv.projectName}</h3>
                    <Badge className={getStatusColor(mrv.status)} variant="secondary">
                      {mrv.status.replace('_', ' ')}
                    </Badge>
                    {mrv.priority === 'high' && (
                      <Badge variant="destructive" className="text-xs">High Priority</Badge>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{mrv.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{mrv.submissionDate}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FileImage className="h-3 w-3" />
                      <span>{mrv.evidenceCount} evidence files</span>
                    </div>
                    <div>
                      <span className="font-medium">{mrv.reportedTonnes} tCO₂e</span> reported
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-2">
                    Submitted by: {mrv.submitter}
                  </p>
                </div>
                
                <div className="flex flex-col space-y-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedMRV(selectedMRV === mrv.id ? null : mrv.id)}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    Review
                  </Button>
                  
                  {mrv.status === 'pending' && (
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        variant="default"
                        className="flex-1"
                        onClick={() => handleVerify(mrv.id, 'approve')}
                      >
                        <CheckCircle className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="flex-1"
                        onClick={() => handleVerify(mrv.id, 'reject')}
                      >
                        <XCircle className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
              {selectedMRV === mrv.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 pt-4 border-t"
                >
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <strong>Evidence Summary:</strong>
                      <ul className="list-disc list-inside mt-1 text-muted-foreground">
                        <li>GPS-tagged photos (8)</li>
                        <li>Drone imagery (4)</li>
                        <li>Sensor readings (3)</li>
                      </ul>
                    </div>
                    <div>
                      <strong>Automated Checks:</strong>
                      <ul className="list-disc list-inside mt-1 text-muted-foreground">
                        <li>✅ GPS coordinates valid</li>
                        <li>✅ Timestamp consistency</li>
                        <li>⚠️ ML biomass estimate pending</li>
                      </ul>
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

export default MRVVerificationQueue;
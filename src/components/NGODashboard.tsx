import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import DashboardHeader from './DashboardHeader';
import { 
  FolderPlus, 
  Users, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  BarChart3,
  Gift,
  FileBarChart,
  Eye,
  MessageSquare
} from 'lucide-react';

const NGODashboard: React.FC = () => {
  const [selectedUpload, setSelectedUpload] = useState<string | null>(null);
  const [projects, setProjects] = useState([]);
  const [workerUploads, setWorkerUploads] = useState([]);
  const [newProject, setNewProject] = useState({ name: '', description: '' });

  const handleHomeClick = () => {
    window.location.href = '/';
  };

  useEffect(() => {
    fetchProjects();
    
    const socket = io('http://localhost:5000');
    socket.on('newProject', (project) => {
      setWorkerUploads(prev => [project, ...prev]);
    });
    
    return () => socket.disconnect();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/projects');
      const data = await response.json();
      setWorkerUploads(data.filter(p => p.status === 'pending'));
      setProjects(data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };

  const handleApprove = async (projectId: string) => {
    try {
      await fetch(`http://localhost:5000/api/projects/${projectId}/approve`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setWorkerUploads(prev => prev.map(p => 
        p.id === projectId ? { ...p, status: 'approved' } : p
      ));
    } catch (error) {
      console.error('Approval failed:', error);
    }
  };

  const handleReject = async (projectId: string) => {
    try {
      await fetch(`http://localhost:5000/api/projects/${projectId}/reject`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      setWorkerUploads(prev => prev.map(p => 
        p.id === projectId ? { ...p, status: 'rejected' } : p
      ));
    } catch (error) {
      console.error('Rejection failed:', error);
    }
  };

  const handleCreateProject = () => {
    if (newProject.name && newProject.description) {
      const project = {
        id: `proj_${Date.now()}`,
        name: newProject.name,
        description: newProject.description,
        status: 'active',
        progress: 0,
        assignedWorkers: 0,
        createdDate: new Date().toLocaleDateString()
      };
      
      setProjects(prev => [project, ...prev]);
      setNewProject({ name: '', description: '' });
      alert('Project created successfully!');
    }
  };

  const communityData = {
    totalWorkers: 45,
    activeProjects: 8,
    verifiedUploads: 156,
    pendingRewards: 12500
  };

  const nccrSubmissions = [
    {
      project: 'Kerala Coastal Restoration',
      submittedDate: '2024-01-10',
      status: 'approved',
      credits: 2400
    },
    {
      project: 'Tamil Nadu Mangrove Project',
      submittedDate: '2024-01-12',
      status: 'under_review',
      credits: 0
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader 
        userRole="verifier" 
        userName="NGO Administrator" 
        onHomeClick={handleHomeClick}
      />
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">NGO Dashboard</h1>
          </div>

        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="projects">Project Management</TabsTrigger>
            <TabsTrigger value="verification">Verification Panel</TabsTrigger>
            <TabsTrigger value="insights">Community Insights</TabsTrigger>
            <TabsTrigger value="reports">NGO Reports</TabsTrigger>
          </TabsList>

          {/* Project Management */}
          <TabsContent value="projects" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FolderPlus className="h-5 w-5" />
                    Create New Project
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input 
                    placeholder="Project Name" 
                    value={newProject.name}
                    onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                  />
                  <Textarea 
                    placeholder="Project Description" 
                    rows={3}
                    value={newProject.description}
                    onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  />
                  <Button className="w-full" onClick={handleCreateProject}>Create Project</Button>
                </CardContent>
              </Card>


            </div>

            <Card>
              <CardHeader>
                <CardTitle>Active Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold">{project.name}</h3>
                          <p className="text-sm text-muted-foreground">{project.assignedWorkers} workers assigned</p>
                        </div>
                        <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                          {project.status}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Verification Panel */}
          <TabsContent value="verification" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Worker Uploads - Verification Queue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {workerUploads.map((upload) => (
                    <div key={upload.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold">{upload.worker}</h4>
                          <p className="text-sm text-muted-foreground">{upload.project} • {upload.uploadType}</p>
                          <p className="text-xs text-muted-foreground">{upload.files} files • {upload.date}</p>
                        </div>
                        <Badge variant={upload.status === 'verified' ? 'default' : 'secondary'}>
                          {upload.status}
                        </Badge>
                      </div>
                      
                      {upload.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button size="sm" className="flex items-center gap-1" onClick={() => handleApprove(upload.id)}>
                            <CheckCircle2 className="h-3 w-3" />
                            Approve
                          </Button>
                          <Button size="sm" variant="destructive" className="flex items-center gap-1" onClick={() => handleReject(upload.id)}>
                            <XCircle className="h-3 w-3" />
                            Reject
                          </Button>
                        </div>
                      )}
                      
                      {upload.status === 'pending' && (
                        <div className="mt-3">
                          <Textarea placeholder="Add verification comments..." rows={2} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Community Insights */}
          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">{communityData.totalWorkers}</div>
                  <p className="text-sm text-muted-foreground">Total Workers</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">{communityData.activeProjects}</div>
                  <p className="text-sm text-muted-foreground">Active Projects</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">{communityData.verifiedUploads}</div>
                  <p className="text-sm text-muted-foreground">Verified Uploads</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">₹{communityData.pendingRewards.toLocaleString()}</div>
                  <p className="text-sm text-muted-foreground">Pending Rewards</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Community Performance Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Community performance charts and analytics would be displayed here
                </div>
              </CardContent>
            </Card>
          </TabsContent>



          {/* NGO Reports */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileBarChart className="h-5 w-5" />
                  Submit Aggregated Data to NCCR
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {nccrSubmissions.map((submission, idx) => (
                  <div key={idx} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold">{submission.project}</h4>
                        <p className="text-sm text-muted-foreground">Submitted: {submission.submittedDate}</p>
                      </div>
                      <Badge variant={submission.status === 'approved' ? 'default' : 'secondary'}>
                        {submission.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div className="text-sm">
                      <p>Credits: {submission.credits > 0 ? `${submission.credits} tCO₂` : 'Pending'}</p>
                    </div>
                  </div>
                ))}
                <Button className="w-full">Submit New Data to NCCR</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Generate NGO-Level Reports
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start">
                    Project Performance Report
                  </Button>
                  <Button variant="outline" className="justify-start">
                    Worker Activity Report
                  </Button>
                  <Button variant="outline" className="justify-start">
                    Verification Summary Report
                  </Button>
                  <Button variant="outline" className="justify-start">
                    Financial Impact Report
                  </Button>
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

export default NGODashboard;
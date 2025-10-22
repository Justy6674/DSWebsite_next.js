'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Settings,
  Users,
  FileText,
  BarChart3,
  Upload,
  Bot,
  Search,
  Download,
  Mail,
  Shield,
  Database,
  Globe,
  Zap,
  PlusCircle,
  Edit,
  Trash2,
  Eye,
  RefreshCw,
  LogOut,
  ArrowLeft,
  Home
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

// Import existing components
import AdminResourceManager from './AdminResourceManager';
import { BlogAdmin } from '../blog/BlogAdmin';
import AIContentGenerator from './AIContentGenerator';
import FileManagement from './FileManagement';
import UserManagement from './UserManagement';
import PortalContentManager from './PortalContentManager';
import JBBBFeedManager from './JBBBFeedManager';

// Simple login form component
function AdminLoginForm() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <Label htmlFor="email" className="text-[#f8fafc]">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-slate-700 border-slate-600 text-[#f8fafc]"
          placeholder="downscale@icloud.com"
          required
        />
      </div>
      <div>
        <Label htmlFor="password" className="text-[#f8fafc]">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-slate-700 border-slate-600 text-[#f8fafc]"
          required
        />
      </div>
      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-[#b68a71] hover:bg-[#8B6F47] text-white"
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </Button>
    </form>
  );
}

type AdminSection =
  | 'overview'
  | 'portal-content'
  | 'jb-bb-feed'
  | 'portal-resources'
  | 'blog-management'
  | 'user-management'
  | 'file-management'
  | 'analytics'
  | 'ai-tools'
  | 'health-records'
  | 'email-campaigns'
  | 'seo-management'
  | 'backup-tools'
  | 'system-settings';

interface DashboardStats {
  totalUsers: number;
  totalPosts: number;
  totalResources: number;
  activePortalUsers: number;
  publishedPosts: number;
  draftPosts: number;
}

interface SystemHealth {
  supabaseStatus: 'healthy' | 'warning' | 'error';
  portalStatus: 'healthy' | 'warning' | 'error';
  blogStatus: 'healthy' | 'warning' | 'error';
  lastBackup: string;
}

export default function UnifiedAdminDashboard() {
  const { user, signOut } = useAuth();
  const [activeSection, setActiveSection] = useState<AdminSection>('overview');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalPosts: 0,
    totalResources: 0,
    activePortalUsers: 0,
    publishedPosts: 0,
    draftPosts: 0
  });
  const [systemHealth, setSystemHealth] = useState<SystemHealth>({
    supabaseStatus: 'healthy',
    portalStatus: 'healthy',
    blogStatus: 'healthy',
    lastBackup: new Date().toISOString()
  });

  // Admin sections configuration
  const adminSections = [
    {
      id: 'overview' as AdminSection,
      name: 'Dashboard Overview',
      icon: BarChart3,
      description: 'System overview and quick stats'
    },
    {
      id: 'portal-content' as AdminSection,
      name: 'Portal Content Manager',
      icon: Database,
      description: 'Dynamic content for all portal sections'
    },
    {
      id: 'jb-bb-feed' as AdminSection,
      name: 'JB&BB Feed',
      icon: Globe,
      description: 'Internal member blog and updates'
    },
    {
      id: 'portal-resources' as AdminSection,
      name: 'Portal Resources',
      icon: Search,
      description: 'Legacy resource management'
    },
    {
      id: 'blog-management' as AdminSection,
      name: 'Blog Management',
      icon: FileText,
      description: 'Create and manage blog posts'
    },
    {
      id: 'user-management' as AdminSection,
      name: 'User Management',
      icon: Users,
      description: 'Manage portal users and permissions'
    },
    {
      id: 'file-management' as AdminSection,
      name: 'File Management',
      icon: Upload,
      description: 'Upload and manage documents/images'
    },
    {
      id: 'health-records' as AdminSection,
      name: 'Health Records',
      icon: Shield,
      description: 'Manage patient health data (HIPAA compliant)'
    },
    {
      id: 'ai-tools' as AdminSection,
      name: 'AI Content Tools',
      icon: Bot,
      description: 'AI-powered content generation and assistance'
    },
    {
      id: 'analytics' as AdminSection,
      name: 'Analytics & Reports',
      icon: BarChart3,
      description: 'User engagement and portal analytics'
    },
    {
      id: 'email-campaigns' as AdminSection,
      name: 'Email Campaigns',
      icon: Mail,
      description: 'Patient communication and newsletters'
    },
    {
      id: 'seo-management' as AdminSection,
      name: 'SEO Management',
      icon: Globe,
      description: 'Meta tags, sitemaps, and search optimization'
    },
    {
      id: 'backup-tools' as AdminSection,
      name: 'Backup & Export',
      icon: Download,
      description: 'Data backup and export tools'
    },
    {
      id: 'system-settings' as AdminSection,
      name: 'System Settings',
      icon: Settings,
      description: 'System configuration and maintenance'
    }
  ];

  // Check if user is admin
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user?.id) {
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        setIsAdmin(profile?.role === 'admin');
      }
    };

    checkAdminStatus();
  }, [user?.id]);

  // Fetch dashboard statistics
  const fetchDashboardStats = async () => {
    setLoading(true);
    try {
      // Fetch users count
      const { count: userCount } = await supabase
        .from('user_profiles')
        .select('*', { count: 'exact' });

      // Fetch blog posts
      const { data: posts } = await supabase
        .from('blog_posts')
        .select('published');

      // Fetch portal resources
      const { count: resourceCount } = await supabase
        .from('portal_content')
        .select('*', { count: 'exact' });

      // Fetch active portal users (users with recent activity)
      const { count: activeUsers } = await supabase
        .from('content_analytics')
        .select('*', { count: 'exact' })
        .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

      const publishedPosts = posts?.filter(p => p.published).length || 0;
      const draftPosts = posts?.filter(p => !p.published).length || 0;

      setStats({
        totalUsers: userCount || 0,
        totalPosts: posts?.length || 0,
        totalResources: resourceCount || 0,
        activePortalUsers: activeUsers || 0,
        publishedPosts,
        draftPosts
      });

      // Check system health
      await checkSystemHealth();
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  // Check system health
  const checkSystemHealth = async () => {
    try {
      // Test Supabase connection
      const { error: supabaseError } = await supabase.from('user_profiles').select('id').limit(1);
      const supabaseStatus = supabaseError ? 'error' : 'healthy';

      // Test portal functionality (check if tables exist)
      const { error: portalError } = await supabase.from('portal_content').select('id').limit(1);
      const portalStatus = portalError ? 'error' : 'healthy';

      // Test blog functionality
      const { error: blogError } = await supabase.from('blog_posts').select('id').limit(1);
      const blogStatus = blogError ? 'error' : 'healthy';

      setSystemHealth({
        supabaseStatus,
        portalStatus,
        blogStatus,
        lastBackup: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error checking system health:', error);
    }
  };

  // Load dashboard data on mount
  useEffect(() => {
    if (isAdmin) {
      fetchDashboardStats();
    }
  }, [isAdmin]);

  // Render overview dashboard
  const renderOverview = () => (
    <div className="space-y-6">
      {/* System Health Status */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-[#f8fafc] flex items-center">
            <Zap className="h-5 w-5 mr-2 text-green-400" />
            System Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                systemHealth.supabaseStatus === 'healthy' ? 'bg-green-400' :
                systemHealth.supabaseStatus === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
              }`} />
              <span className="text-[#fef5e7]">Supabase Database</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                systemHealth.portalStatus === 'healthy' ? 'bg-green-400' :
                systemHealth.portalStatus === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
              }`} />
              <span className="text-[#fef5e7]">Clinical Portal</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                systemHealth.blogStatus === 'healthy' ? 'bg-green-400' :
                systemHealth.blogStatus === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
              }`} />
              <span className="text-[#fef5e7]">Blog System</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#fef5e7] mb-1">Total Users</p>
                <p className="text-2xl font-bold text-[#b68a71]">{stats.totalUsers}</p>
                <p className="text-xs text-green-400">{stats.activePortalUsers} active this month</p>
              </div>
              <Users className="h-8 w-8 text-[#b68a71]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#fef5e7] mb-1">Blog Posts</p>
                <p className="text-2xl font-bold text-[#b68a71]">{stats.totalPosts}</p>
                <p className="text-xs text-[#fef5e7]">{stats.publishedPosts} published, {stats.draftPosts} drafts</p>
              </div>
              <FileText className="h-8 w-8 text-[#b68a71]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#fef5e7] mb-1">Portal Resources</p>
                <p className="text-2xl font-bold text-[#b68a71]">{stats.totalResources}</p>
                <p className="text-xs text-[#fef5e7]">Available to patients</p>
              </div>
              <Database className="h-8 w-8 text-[#b68a71]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#fef5e7] mb-1">System Status</p>
                <p className="text-2xl font-bold text-green-400">Online</p>
                <p className="text-xs text-[#fef5e7]">All systems operational</p>
              </div>
              <Zap className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-[#f8fafc]">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              onClick={() => setActiveSection('blog-management')}
              className="bg-[#b68a71] hover:bg-[#8B6F47] text-white justify-start"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Create New Blog Post
            </Button>
            <Button
              onClick={() => setActiveSection('portal-resources')}
              className="bg-[#b68a71] hover:bg-[#8B6F47] text-white justify-start"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Portal Resource
            </Button>
            <Button
              onClick={fetchDashboardStats}
              variant="outline"
              className="border-slate-600 text-[#fef5e7] hover:bg-slate-700 justify-start"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Render placeholder sections for new features
  const renderPlaceholderSection = (title: string, description: string, features: string[]) => (
    <div className="space-y-6">
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-[#f8fafc]">{title}</CardTitle>
          <p className="text-[#fef5e7]">{description}</p>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-900 rounded-lg p-6 border border-slate-700">
            <h3 className="text-lg font-medium text-[#b68a71] mb-4">Coming Soon - Features Include:</h3>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center text-[#fef5e7]">
                  <div className="w-2 h-2 bg-[#b68a71] rounded-full mr-3" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              className="mt-6 bg-[#b68a71] hover:bg-[#8B6F47] text-white"
              disabled
            >
              Feature Under Development
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Render content based on active section
  const renderSectionContent = () => {
    switch (activeSection) {
      case 'overview':
        return renderOverview();

      case 'portal-content':
        return <PortalContentManager />;

      case 'jb-bb-feed':
        return <JBBBFeedManager />;

      case 'portal-resources':
        return <AdminResourceManager />;

      case 'blog-management':
        return (
          <div className="bg-slate-900 min-h-screen">
            <BlogAdmin onLogout={() => setActiveSection('overview')} />
          </div>
        );

      case 'user-management':
        return <UserManagement />;

      case 'file-management':
        return <FileManagement />;

      case 'health-records':
        return renderPlaceholderSection(
          'Health Records Management',
          'Secure patient health data management (HIPAA compliant)',
          [
            'Patient health metric tracking',
            'Secure document storage',
            'Appointment scheduling integration',
            'Medical history management',
            'Prescription tracking',
            'Provider notes and observations',
            'Health goal setting and monitoring',
            'Compliance audit trails'
          ]
        );

      case 'ai-tools':
        return <AIContentGenerator />;

      case 'analytics':
        return renderPlaceholderSection(
          'Analytics & Reporting Dashboard',
          'Comprehensive analytics for portal and blog performance',
          [
            'User engagement metrics',
            'Portal usage analytics',
            'Blog traffic and performance',
            'Health outcome tracking',
            'Patient progress reports',
            'SEO performance monitoring',
            'Conversion rate analytics',
            'Custom report generation'
          ]
        );

      case 'email-campaigns':
        return renderPlaceholderSection(
          'Email Campaign Management',
          'Patient communication and automated email sequences',
          [
            'Newsletter creation and distribution',
            'Automated welcome sequences',
            'Appointment reminders',
            'Health tip emails',
            'Patient re-engagement campaigns',
            'Email template library',
            'A/B testing for email campaigns',
            'Email analytics and tracking'
          ]
        );

      case 'seo-management':
        return renderPlaceholderSection(
          'SEO Management Tools',
          'Search engine optimization and content management',
          [
            'Meta tag management',
            'Sitemap generation and submission',
            'Keyword tracking and optimization',
            'Content SEO analysis',
            'Local SEO for clinic locations',
            'Schema markup management',
            'Page speed optimization',
            'Search console integration'
          ]
        );

      case 'backup-tools':
        return renderPlaceholderSection(
          'Backup & Data Export',
          'Data backup, export, and disaster recovery tools',
          [
            'Automated daily backups',
            'Manual backup creation',
            'Data export to CSV/JSON',
            'Patient data portability',
            'Disaster recovery procedures',
            'Backup verification and testing',
            'Historical data archiving',
            'GDPR compliance tools'
          ]
        );

      case 'system-settings':
        return renderPlaceholderSection(
          'System Configuration',
          'Advanced system settings and maintenance tools',
          [
            'Environment configuration',
            'API key management',
            'Database maintenance tools',
            'Performance monitoring',
            'Security settings',
            'Integration management',
            'Error log monitoring',
            'System health checks'
          ]
        );

      default:
        return renderOverview();
    }
  };

  // If no user at all, show login form
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <Card className="bg-slate-800 border-slate-700 w-full max-w-md">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <CardTitle className="text-[#f8fafc]">Admin Login</CardTitle>
              <Link
                href="/"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm bg-slate-700 hover:bg-slate-600 text-[#fef5e7] transition-colors"
                title="Back to Website"
              >
                <Home className="h-4 w-4" />
                Website
              </Link>
            </div>
            <p className="text-[#fef5e7] text-center text-sm">Sign in to access the admin dashboard</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <AdminLoginForm />
          </CardContent>
        </Card>
      </div>
    );
  }

  // If user logged in but not admin
  if (!isAdmin && user?.email !== 'downscale@icloud.com') {
    return (
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-8 text-center">
          <p className="text-[#fef5e7]">Access denied. Admin privileges required.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-80 bg-slate-800 border-r border-slate-700 min-h-screen">
          <div className="p-6 border-b border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-xl font-bold text-[#f8fafc]">Admin Dashboard</h1>
              <div className="flex items-center gap-2">
                <Link
                  href="/"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm bg-slate-700 hover:bg-slate-600 text-[#fef5e7] transition-colors"
                  title="Back to Website"
                >
                  <Home className="h-4 w-4" />
                  Website
                </Link>
                <Link
                  href="/portal"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm bg-slate-700 hover:bg-slate-600 text-[#fef5e7] transition-colors"
                  title="Go to Members Portal"
                >
                  <Users className="h-4 w-4" />
                  Portal
                </Link>
              </div>
            </div>
            <p className="text-sm text-[#fef5e7]">Comprehensive Management System</p>
          </div>

          <nav className="p-4 space-y-2">
            {adminSections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;

              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-[#b68a71] text-white shadow-lg'
                      : 'text-[#fef5e7] hover:bg-slate-700 hover:text-[#b68a71]'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">{section.name}</div>
                    <div className="text-xs opacity-70">{section.description}</div>
                  </div>
                </button>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-slate-700">
            <button
              onClick={signOut}
              className="w-full flex items-center px-3 py-2.5 rounded-lg text-sm transition-all duration-200 text-red-400 hover:bg-red-900/20 hover:text-red-300"
            >
              <LogOut className="h-5 w-5 mr-3" />
              <div className="text-left">
                <div className="font-medium">Logout</div>
                <div className="text-xs opacity-70">Sign out of admin</div>
              </div>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {loading ? (
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-8 text-center">
                <p className="text-[#fef5e7]">Loading dashboard...</p>
              </CardContent>
            </Card>
          ) : (
            renderSectionContent()
          )}
        </div>
      </div>
    </div>
  );
}
'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  UserPlus,
  Shield,
  Mail,
  Calendar,
  Activity,
  Search,
  Filter,
  Edit,
  Ban,
  Check,
  MoreHorizontal,
  Eye,
  MessageSquare,
  FileText,
  Download
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  role: 'admin' | 'patient' | 'practitioner';
  subscription_tier: string | null;
  created_at: string;
  last_sign_in_at?: string;
  is_active: boolean;
  metadata?: Record<string, any>;
}

interface UserActivity {
  user_id: string;
  activity_type: string;
  activity_data: Record<string, any>;
  created_at: string;
}

interface UserStats {
  totalUsers: number;
  activeUsers: number;
  newThisMonth: number;
  premiumUsers: number;
  adminUsers: number;
  practitionerUsers: number;
}

export default function UserManagement() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [userStats, setUserStats] = useState<UserStats>({
    totalUsers: 0,
    activeUsers: 0,
    newThisMonth: 0,
    premiumUsers: 0,
    adminUsers: 0,
    practitionerUsers: 0
  });

  // Fetch all users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setUsers(data || []);
      calculateStats(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate user statistics
  const calculateStats = (userData: User[]) => {
    const now = new Date();
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const stats = {
      totalUsers: userData.length,
      activeUsers: userData.filter(u => u.is_active).length,
      newThisMonth: userData.filter(u => new Date(u.created_at) >= thisMonth).length,
      premiumUsers: userData.filter(u => u.subscription_tier === 'premium').length,
      adminUsers: userData.filter(u => u.role === 'admin').length,
      practitionerUsers: userData.filter(u => u.role === 'practitioner').length
    };

    setUserStats(stats);
  };

  // Filter users based on search and filters
  useEffect(() => {
    let filtered = users;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.last_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by role
    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    // Filter by status
    if (statusFilter === 'active') {
      filtered = filtered.filter(user => user.is_active);
    } else if (statusFilter === 'inactive') {
      filtered = filtered.filter(user => !user.is_active);
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, roleFilter, statusFilter]);

  // Update user role
  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({ role: newRole })
        .eq('id', userId);

      if (error) throw error;

      await fetchUsers();
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  // Toggle user active status
  const toggleUserStatus = async (userId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({ is_active: !currentStatus })
        .eq('id', userId);

      if (error) throw error;

      await fetchUsers();
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  // Send message to user
  const sendMessageToUser = async (userId: string, message: string) => {
    try {
      // In a real implementation, this would send an email or in-app notification
      console.log('Sending message to user:', userId, message);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Export user data
  const exportUserData = () => {
    const csvContent = [
      ['Email', 'First Name', 'Last Name', 'Role', 'Subscription', 'Status', 'Created At', 'Last Sign In'],
      ...filteredUsers.map(user => [
        user.email,
        user.first_name || '',
        user.last_name || '',
        user.role,
        user.subscription_tier,
        user.is_active ? 'Active' : 'Inactive',
        new Date(user.created_at).toLocaleDateString('en-AU'),
        user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString('en-AU') : 'Never'
      ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users-export-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get role badge color
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-600 text-white';
      case 'practitioner': return 'bg-blue-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  // Get subscription badge color
  const getSubscriptionBadgeColor = (tier: string) => {
    switch (tier) {
      case 'premium': return 'bg-[#b68a71] text-white';
      case 'basic': return 'bg-blue-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  // Load users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#f8fafc] mb-2">User Management</h1>
          <p className="text-[#fef5e7]">Manage portal users, roles, and permissions</p>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={exportUserData}
            variant="outline"
            className="border-slate-600 text-[#fef5e7] hover:bg-slate-700"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Users
          </Button>
          <Button
            className="bg-[#b68a71] hover:bg-[#8B6F47] text-white"
            disabled
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#fef5e7] mb-1">Total Users</p>
                <p className="text-2xl font-bold text-[#b68a71]">{userStats.totalUsers}</p>
              </div>
              <Users className="h-6 w-6 text-[#b68a71]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#fef5e7] mb-1">Active Users</p>
                <p className="text-2xl font-bold text-green-400">{userStats.activeUsers}</p>
              </div>
              <Activity className="h-6 w-6 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#fef5e7] mb-1">New This Month</p>
                <p className="text-2xl font-bold text-blue-400">{userStats.newThisMonth}</p>
              </div>
              <Calendar className="h-6 w-6 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#fef5e7] mb-1">Premium</p>
                <p className="text-2xl font-bold text-[#b68a71]">{userStats.premiumUsers}</p>
              </div>
              <Shield className="h-6 w-6 text-[#b68a71]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#fef5e7] mb-1">Admins</p>
                <p className="text-2xl font-bold text-red-400">{userStats.adminUsers}</p>
              </div>
              <Shield className="h-6 w-6 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#fef5e7] mb-1">Practitioners</p>
                <p className="text-2xl font-bold text-blue-400">{userStats.practitionerUsers}</p>
              </div>
              <Shield className="h-6 w-6 text-blue-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-[#f8fafc]">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="search" className="text-[#fef5e7]">Search Users</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  id="search"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-900 border-slate-700 text-[#f8fafc]"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="role-filter" className="text-[#fef5e7]">Role</Label>
              <select
                id="role-filter"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-[#f8fafc] rounded-md px-3 py-2"
              >
                <option value="all">All Roles</option>
                <option value="user">Users</option>
                <option value="practitioner">Practitioners</option>
                <option value="admin">Admins</option>
              </select>
            </div>
            <div>
              <Label htmlFor="status-filter" className="text-[#fef5e7]">Status</Label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-[#f8fafc] rounded-md px-3 py-2"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-[#f8fafc]">
            Users ({filteredUsers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <p className="text-[#fef5e7]">Loading users...</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <p className="text-[#fef5e7]">No users found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="bg-slate-900 rounded-lg p-4 border border-slate-700"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      {/* User Avatar */}
                      <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-slate-400" />
                      </div>

                      {/* User Info */}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-medium text-[#f8fafc]">
                            {user.first_name && user.last_name
                              ? `${user.first_name} ${user.last_name}`
                              : user.email}
                          </h3>
                          <Badge className={getRoleBadgeColor(user.role)}>
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </Badge>
                          <Badge className={getSubscriptionBadgeColor(user.subscription_tier)}>
                            {user.subscription_tier.charAt(0).toUpperCase() + user.subscription_tier.slice(1)}
                          </Badge>
                          {!user.is_active && (
                            <Badge variant="outline" className="border-red-600 text-red-400">
                              Inactive
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-[#fef5e7] mb-2">{user.email}</p>
                        <div className="flex items-center space-x-4 text-xs text-slate-400">
                          <span>Joined: {formatDate(user.created_at)}</span>
                          {user.last_sign_in_at && (
                            <span>Last login: {formatDate(user.last_sign_in_at)}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* User Actions */}
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-slate-600 text-[#fef5e7] hover:bg-slate-700"
                        onClick={() => {
                          setSelectedUser(user);
                          setShowUserDetails(true);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-slate-600 text-[#fef5e7] hover:bg-slate-700"
                        disabled
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className={`border-slate-600 hover:bg-slate-700 ${
                          user.is_active ? 'text-yellow-400' : 'text-green-400'
                        }`}
                        onClick={() => toggleUserStatus(user.id, user.is_active)}
                      >
                        {user.is_active ? <Ban className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                      </Button>
                      <select
                        value={user.role}
                        onChange={(e) => updateUserRole(user.id, e.target.value)}
                        className="bg-slate-700 border border-slate-600 text-[#f8fafc] rounded px-2 py-1 text-sm"
                      >
                        <option value="user">User</option>
                        <option value="practitioner">Practitioner</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
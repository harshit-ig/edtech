import React, { useState, useEffect } from 'react';
import { adminApi } from '../lib/api';
import type { DashboardStats } from '../types';
import {
  BookOpen,
  GraduationCap,
  DollarSign,
  FileText,
  Users,
  TrendingUp,
  Activity,
  Plus,
  BarChart3
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getDashboardStats();
      if (response.success && response.data) {
        setStats(response.data);
      } else {
        throw new Error(response.message || 'Failed to fetch dashboard statistics');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch dashboard statistics');
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Courses',
      value: stats?.courses || 0,
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      change: '+12%',
      changeType: 'up' as const,
      href: '/courses'
    },
    {
      title: 'Course Details',
      value: stats?.courseDetails || 0,
      icon: GraduationCap,
      color: 'from-green-500 to-green-600',
      change: '+5%',
      changeType: 'up' as const,
      href: '/course-details'
    },
    {
      title: 'Pricing Plans',
      value: stats?.coursePricing || 0,
      icon: DollarSign,
      color: 'from-yellow-500 to-yellow-600',
      change: '+8%',
      changeType: 'up' as const,
      href: '/course-pricing'
    },
    {
      title: 'Blog Posts',
      value: stats?.blogs || 0,
      icon: FileText,
      color: 'from-purple-500 to-purple-600',
      change: '+15%',
      changeType: 'up' as const,
      href: '/blogs'
    },
    {
      title: 'Team Members',
      value: stats?.teamMembers || 0,
      icon: Users,
      color: 'from-indigo-500 to-indigo-600',
      change: '+2%',
      changeType: 'up' as const,
      href: '/team-members'
    },
    {
      title: 'Skills Tracked',
      value: stats?.upcomingSkills || 0,
      icon: TrendingUp,
      color: 'from-red-500 to-red-600',
      change: '+20%',
      changeType: 'up' as const,
      href: '/upcoming-skills'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loading-spinner w-8 h-8"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <div className="card-body">
          <div className="flex items-start">
            <Activity className="h-5 w-5 text-red-500 mt-1" />
            <div className="ml-3">
              <h3 className="text-lg font-medium text-red-900">Error Loading Dashboard</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
              <button
                onClick={fetchStats}
                className="mt-3 btn btn-primary btn-sm"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="card">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
              <p className="text-gray-600 mt-2">
                Manage your EdTech platform content, users, and analytics
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm text-gray-500">Last updated</p>
                <p className="text-sm font-medium">
                  {stats ? new Date(stats.lastUpdated).toLocaleString() : 'Just now'}
                </p>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="stat-card group cursor-pointer" onClick={() => window.location.href = card.href}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-2">{card.title}</p>
                  <p className="stat-value">{card.value.toLocaleString()}</p>
                  <div className={`stat-trend ${card.changeType} flex items-center gap-1`}>
                    <TrendingUp className="w-3 h-3" />
                    <span>{card.change} from last month</span>
                  </div>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions & System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
            <p className="text-sm text-gray-500">Frequently used management tasks</p>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="/courses" className="btn btn-primary">
                <Plus className="w-4 h-4" />
                Add Course
              </a>
              <a href="/blogs" className="btn btn-secondary">
                <FileText className="w-4 h-4" />
                New Blog Post
              </a>
              <a href="/team-members" className="btn btn-secondary">
                <Users className="w-4 h-4" />
                Add Team Member
              </a>
              <a href="/stats" className="btn btn-secondary">
                <BarChart3 className="w-4 h-4" />
                View Analytics
              </a>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-medium text-gray-900">System Status</h3>
            <p className="text-sm text-gray-500">Current platform health</p>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-900">Platform Status</span>
                </div>
                <span className="badge badge-success">Online</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-900">Database</span>
                </div>
                <span className="badge badge-success">Connected</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-900">API Health</span>
                </div>
                <span className="badge badge-success">Healthy</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-900">Version</span>
                </div>
                <span className="badge badge-primary">v1.0.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

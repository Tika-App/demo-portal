import React, { useState } from 'react';
import { 
  Users, 
  Upload, 
  FileText, 
  TrendingUp, 
  Calendar,
  Filter,
  Clock
} from 'lucide-react';
import { format } from 'date-fns';
import { mockUsers, mockUploads, mockActivityFeed } from '../data/mockData';

const Dashboard = () => {
  const [dateRange, setDateRange] = useState('7d');
  const [actionFilter, setActionFilter] = useState('all');

  const totalUsers = mockUsers.length;
  const totalUploads = mockUploads.length;
  const myUploads = mockUploads.filter(upload => upload.user === 'John Smith').length;
  const mostActiveUser = mockUsers.reduce((prev, current) => 
    (prev.documents > current.documents) ? prev : current
  );

  const filteredActivity = mockActivityFeed.filter(activity => {
    if (actionFilter !== 'all' && activity.action !== actionFilter) {
      return false;
    }
    // Add date filtering logic here if needed
    return true;
  });

  const getActionColor = (action) => {
    switch (action) {
      case 'Upload':
        return 'text-green-600 bg-green-100';
      case 'Delete':
        return 'text-red-600 bg-red-100';
      case 'Edit':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your documents.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <p className="text-2xl font-semibold text-gray-900">{totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Upload className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Uploads</p>
              <p className="text-2xl font-semibold text-gray-900">{totalUploads}</p>
              <p className="text-sm text-gray-500">({myUploads} yours)</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Most Active User</p>
              <p className="text-lg font-semibold text-gray-900">{mostActiveUser.name}</p>
              <p className="text-sm text-gray-500">{mostActiveUser.documents} documents</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-orange-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Recent Activity</p>
              <p className="text-2xl font-semibold text-gray-900">{filteredActivity.length}</p>
              <p className="text-sm text-gray-500">actions today</p>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Activity Feed</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="text-sm border border-gray-300 rounded-md px-2 py-1"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={actionFilter}
                onChange={(e) => setActionFilter(e.target.value)}
                className="text-sm border border-gray-300 rounded-md px-2 py-1"
              >
                <option value="all">All Actions</option>
                <option value="Upload">Uploads</option>
                <option value="Edit">Edits</option>
                <option value="Delete">Deletions</option>
              </select>
            </div>
          </div>
        </div>

        {filteredActivity.length > 0 ? (
          <div className="space-y-4">
            {filteredActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getActionColor(activity.action)}`}>
                    <span className="text-xs font-medium">{activity.action.charAt(0)}</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.action} - {activity.fileName}
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{format(new Date(activity.timestamp), 'MMM d, h:mm a')}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-gray-600">
                      User: {activity.linkedUser}
                    </span>
                    <span className="text-sm text-gray-600">
                      Controller: {activity.controller}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No recent activity</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by uploading a document or checking user activity.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 
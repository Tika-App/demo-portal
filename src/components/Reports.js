import React, { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  Download, 
  Calendar,
  FileText
} from 'lucide-react';
import { format } from 'date-fns';
import { mockReports } from '../data/mockData';

const Reports = () => {
  const [dateRange, setDateRange] = useState('30d');

  const handleExport = (reportType, format) => {
    console.log(`Exporting ${reportType} as ${format}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-600">Analytics and insights for your document management system.</p>
      </div>

      {/* Date Range Filter */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Date Range:</span>
          </div>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="input-field w-48"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Uploads by Controller */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Uploads by Controller
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleExport('uploads-by-controller', 'CSV')}
                className="btn-secondary text-sm flex items-center space-x-1"
              >
                <Download className="w-3 h-3" />
                <span>CSV</span>
              </button>
              <button
                onClick={() => handleExport('uploads-by-controller', 'PDF')}
                className="btn-secondary text-sm flex items-center space-x-1"
              >
                <Download className="w-3 h-3" />
                <span>PDF</span>
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            {mockReports.uploadsByController.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-600">{index + 1}</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{item.controller}</div>
                    <div className="text-xs text-gray-500">{item.uploads} uploads</div>
                  </div>
                </div>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full" 
                    style={{ width: `${(item.uploads / Math.max(...mockReports.uploadsByController.map(i => i.uploads))) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Users */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Active Users
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleExport('active-users', 'CSV')}
                className="btn-secondary text-sm flex items-center space-x-1"
              >
                <Download className="w-3 h-3" />
                <span>CSV</span>
              </button>
              <button
                onClick={() => handleExport('active-users', 'PDF')}
                className="btn-secondary text-sm flex items-center space-x-1"
              >
                <Download className="w-3 h-3" />
                <span>PDF</span>
              </button>
            </div>
          </div>
          
          <div className="space-y-3">
            {mockReports.activeUsers.map((user, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-green-600">{user.name.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    <div className="text-xs text-gray-500">
                      Last active: {format(new Date(user.lastActive), 'MMM d, h:mm a')}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{user.documents}</div>
                  <div className="text-xs text-gray-500">documents</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Upload Trends */}
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Monthly Upload Trends
            </h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleExport('monthly-trends', 'CSV')}
                className="btn-secondary text-sm flex items-center space-x-1"
              >
                <Download className="w-3 h-3" />
                <span>CSV</span>
              </button>
              <button
                onClick={() => handleExport('monthly-trends', 'PDF')}
                className="btn-secondary text-sm flex items-center space-x-1"
              >
                <Download className="w-3 h-3" />
                <span>PDF</span>
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="table-header">Month</th>
                  <th className="table-header">Uploads</th>
                  <th className="table-header">Deletions</th>
                  <th className="table-header">Net Change</th>
                  <th className="table-header">Trend</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockReports.monthlyTrends.map((trend, index) => {
                  const netChange = trend.uploads - trend.deletions;
                  const previousTrend = index > 0 ? mockReports.monthlyTrends[index - 1] : null;
                  const trendDirection = previousTrend ? 
                    (trend.uploads > previousTrend.uploads ? 'up' : trend.uploads < previousTrend.uploads ? 'down' : 'stable') : 
                    'stable';
                  
                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="table-cell text-sm font-medium text-gray-900">{trend.month}</td>
                      <td className="table-cell text-sm text-gray-900">{trend.uploads}</td>
                      <td className="table-cell text-sm text-gray-900">{trend.deletions}</td>
                      <td className="table-cell">
                        <span className={`text-sm font-medium ${
                          netChange > 0 ? 'text-green-600' : netChange < 0 ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {netChange > 0 ? '+' : ''}{netChange}
                        </span>
                      </td>
                      <td className="table-cell">
                        <div className="flex items-center space-x-2">
                          {trendDirection === 'up' && (
                            <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-green-500"></div>
                          )}
                          {trendDirection === 'down' && (
                            <div className="w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-red-500"></div>
                          )}
                          {trendDirection === 'stable' && (
                            <div className="w-4 h-1 bg-gray-400 rounded"></div>
                          )}
                          <span className="text-xs text-gray-500 capitalize">{trendDirection}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Uploads</p>
              <p className="text-2xl font-semibold text-gray-900">
                {mockReports.monthlyTrends.reduce((sum, trend) => sum + trend.uploads, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-red-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Deletions</p>
              <p className="text-2xl font-semibold text-gray-900">
                {mockReports.monthlyTrends.reduce((sum, trend) => sum + trend.deletions, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Users</p>
              <p className="text-2xl font-semibold text-gray-900">{mockReports.activeUsers.length}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Controllers</p>
              <p className="text-2xl font-semibold text-gray-900">{mockReports.uploadsByController.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports; 
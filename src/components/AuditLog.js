import React, { useState } from 'react';
import { 
  Filter, 
  Download, 
  Calendar,
  ChevronDown,
  ChevronUp,
  FileText,
  Eye
} from 'lucide-react';
import { format } from 'date-fns';
import { mockAuditLog } from '../data/mockData';

const AuditLog = () => {
  const [dateRange, setDateRange] = useState('30d');
  const [actionFilter, setActionFilter] = useState('all');
  const [controllerFilter, setControllerFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredLogs = mockAuditLog.filter(log => {
    if (actionFilter !== 'all' && log.action !== actionFilter) {
      return false;
    }
    if (controllerFilter !== 'all' && log.controllerName !== controllerFilter) {
      return false;
    }
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

  const handleExportCSV = () => {
    // Simulate CSV export
    console.log('Exporting CSV...');
  };

  const handleExportPDF = () => {
    // Simulate PDF export
    console.log('Exporting PDF...');
  };

  const uniqueControllers = [...new Set(mockAuditLog.map(log => log.controllerName))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Audit Log</h1>
        <p className="text-gray-600">Track all document activities and user actions.</p>
      </div>

      {/* Filters and Export */}
      <div className="card">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary flex items-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
              {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleExportCSV}
                className="btn-secondary flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV</span>
              </button>
              <button
                onClick={handleExportPDF}
                className="btn-secondary flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export PDF</span>
              </button>
            </div>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Range
                </label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="input-field"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="1y">Last year</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Action Type
                </label>
                <select
                  value={actionFilter}
                  onChange={(e) => setActionFilter(e.target.value)}
                  className="input-field"
                >
                  <option value="all">All Actions</option>
                  <option value="Upload">Upload</option>
                  <option value="Edit">Edit</option>
                  <option value="Delete">Delete</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Controller
                </label>
                <select
                  value={controllerFilter}
                  onChange={(e) => setControllerFilter(e.target.value)}
                  className="input-field"
                >
                  <option value="all">All Controllers</option>
                  {uniqueControllers.map((controller) => (
                    <option key={controller} value={controller}>{controller}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-header">Timestamp</th>
                <th className="table-header">Action</th>
                <th className="table-header">File Name</th>
                <th className="table-header">Target User</th>
                <th className="table-header">Controller Name</th>
                <th className="table-header">IP Address</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="table-cell text-sm text-gray-900">
                    {format(new Date(log.timestamp), 'MMM d, yyyy h:mm a')}
                  </td>
                  <td className="table-cell">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getActionColor(log.action)}`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{log.fileName}</span>
                    </div>
                  </td>
                  <td className="table-cell text-sm text-gray-900">{log.targetUser}</td>
                  <td className="table-cell text-sm text-gray-900">{log.controllerName}</td>
                  <td className="table-cell text-sm text-gray-500 font-mono">{log.ipAddress}</td>
                  <td className="table-cell">
                    <button className="text-gray-400 hover:text-gray-600">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredLogs.length === 0 && (
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No log entries for this period</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your filter criteria or date range.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredLogs.length}</span> of{' '}
          <span className="font-medium">{filteredLogs.length}</span> results
        </div>
        <div className="flex items-center space-x-2">
          <button className="btn-secondary text-sm">Previous</button>
          <button className="btn-secondary text-sm">Next</button>
        </div>
      </div>
    </div>
  );
};

export default AuditLog; 
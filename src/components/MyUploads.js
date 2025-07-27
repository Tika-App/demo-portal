import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Edit, 
  Trash2, 
  Eye,
  ChevronDown,
  ChevronUp,
  MoreHorizontal
} from 'lucide-react';
import { format } from 'date-fns';
import { mockUploads, mockUsers, mockCategories } from '../data/mockData';

const MyUploads = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [userFilter, setUserFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [editingFile, setEditingFile] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);

  // Filter and sort uploads
  const filteredUploads = mockUploads
    .filter(upload => {
      const matchesSearch = upload.filename.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesUser = userFilter === 'all' || upload.user === userFilter;
      const matchesCategory = categoryFilter === 'all' || upload.category === categoryFilter;
      return matchesSearch && matchesUser && matchesCategory;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'date':
          comparison = new Date(b.date) - new Date(a.date);
          break;
        case 'user':
          comparison = a.user.localeCompare(b.user);
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
        case 'filename':
          comparison = a.filename.localeCompare(b.filename);
          break;
        default:
          comparison = 0;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleEdit = (upload) => {
    setEditingFile(upload);
  };

  const handleDelete = (upload) => {
    setShowDeleteModal(upload);
  };

  const confirmDelete = () => {
    // Simulate delete
    console.log('Deleting:', showDeleteModal);
    setShowDeleteModal(null);
  };

  const getFileTypeIcon = (fileType) => {
    const iconConfig = {
      'PDF': 'text-red-600',
      'DOCX': 'text-blue-600',
      'XLSX': 'text-green-600',
      'PPTX': 'text-orange-600'
    };
    return iconConfig[fileType] || 'text-gray-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Uploads</h1>
        <p className="text-gray-600">Manage and view your uploaded documents.</p>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="flex flex-col space-y-4">
          {/* Search Bar */}
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary flex items-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
              {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  User
                </label>
                <select
                  value={userFilter}
                  onChange={(e) => setUserFilter(e.target.value)}
                  className="input-field"
                >
                  <option value="all">All Users</option>
                  {mockUsers.map((user) => (
                    <option key={user.id} value={user.name}>{user.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="input-field"
                >
                  <option value="all">All Categories</option>
                  {mockCategories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input-field"
                >
                  <option value="date">Date</option>
                  <option value="user">User</option>
                  <option value="category">Category</option>
                  <option value="filename">Filename</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Uploads Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-header">
                  <button
                    onClick={() => handleSort('filename')}
                    className="flex items-center space-x-1 hover:text-gray-700"
                  >
                    <span>Filename</span>
                    {sortBy === 'filename' && (
                      sortOrder === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="table-header">
                  <button
                    onClick={() => handleSort('user')}
                    className="flex items-center space-x-1 hover:text-gray-700"
                  >
                    <span>User</span>
                    {sortBy === 'user' && (
                      sortOrder === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="table-header">
                  <button
                    onClick={() => handleSort('date')}
                    className="flex items-center space-x-1 hover:text-gray-700"
                  >
                    <span>Date</span>
                    {sortBy === 'date' && (
                      sortOrder === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="table-header">File Type</th>
                <th className="table-header">
                  <button
                    onClick={() => handleSort('category')}
                    className="flex items-center space-x-1 hover:text-gray-700"
                  >
                    <span>Category</span>
                    {sortBy === 'category' && (
                      sortOrder === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUploads.map((upload) => (
                <tr key={upload.id} className="hover:bg-gray-50">
                  <td className="table-cell">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-gray-100 ${getFileTypeIcon(upload.fileType)}`}>
                        <span className="text-xs font-medium">{upload.fileType}</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{upload.filename}</div>
                        <div className="text-xs text-gray-500">{upload.size}</div>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell text-sm text-gray-900">{upload.user}</td>
                  <td className="table-cell text-sm text-gray-900">
                    {format(new Date(upload.date), 'MMM d, yyyy h:mm a')}
                  </td>
                  <td className="table-cell">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 ${getFileTypeIcon(upload.fileType)}`}>
                      {upload.fileType}
                    </span>
                  </td>
                  <td className="table-cell">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {upload.category}
                    </span>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => window.open('#', '_blank')}
                        className="text-gray-400 hover:text-gray-600"
                        title="Preview"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => window.open('#', '_blank')}
                        className="text-gray-400 hover:text-gray-600"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(upload)}
                        className="text-gray-400 hover:text-blue-600"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(upload)}
                        className="text-gray-400 hover:text-red-600"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredUploads.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto h-12 w-12 text-gray-400">
              <Search className="w-full h-full" />
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No uploads found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredUploads.length}</span> of{' '}
          <span className="font-medium">{filteredUploads.length}</span> results
        </div>
        <div className="flex items-center space-x-2">
          <button className="btn-secondary text-sm">Previous</button>
          <button className="btn-secondary text-sm">Next</button>
        </div>
      </div>

      {/* Edit Modal */}
      {editingFile && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Edit File</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Filename
                  </label>
                  <input
                    type="text"
                    defaultValue={editingFile.filename}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select className="input-field" defaultValue={editingFile.category}>
                    {mockCategories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setEditingFile(null)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button className="btn-primary">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Delete File</h3>
              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to delete "{showDeleteModal.filename}"? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteModal(null)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyUploads; 
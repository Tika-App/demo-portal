import React, { useState, useRef } from 'react';
import { 
  Upload, 
  X, 
  Users, 
  FileText, 
  Tag,
  Check,
  AlertCircle,
  Search
} from 'lucide-react';
import { mockUsers, mockCategories } from '../data/mockData';

const UploadEntry = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [files, setFiles] = useState([]);
  const [category, setCategory] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const fileInputRef = useRef(null);

  const handleUserSelect = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleFileSelect = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const validFiles = selectedFiles.filter(file => {
      const maxSize = 10 * 1024 * 1024; // 10MB
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
      
      if (file.size > maxSize) {
        setErrors(prev => ({ ...prev, fileSize: 'File size exceeds 10MB limit' }));
        return false;
      }
      
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, fileType: 'Invalid file type. Please upload PDF, DOC, DOCX, XLS, or XLSX files.' }));
        return false;
      }
      
      return true;
    });
    
    setFiles([...files, ...validFiles]);
    setErrors({});
  };

  const handleFileRemove = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.filter(file => {
      const maxSize = 10 * 1024 * 1024;
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
      
      return file.size <= maxSize && allowedTypes.includes(file.type);
    });
    
    setFiles([...files, ...validFiles]);
  };

  const handleUpload = async () => {
    setErrors({});
    
    if (selectedUsers.length === 0) {
      setErrors(prev => ({ ...prev, users: 'Please select at least one user' }));
      return;
    }
    
    if (files.length === 0) {
      setErrors(prev => ({ ...prev, files: 'Please select at least one file' }));
      return;
    }

    if (!category) {
      setErrors(prev => ({ ...prev, category: 'Please select a category' }));
      return;
    }

    setIsUploading(true);
    
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      setShowSuccess(true);
      setSelectedUsers([]);
      setFiles([]);
      setCategory('');
      setUserSearchTerm('');
      
      setTimeout(() => setShowSuccess(false), 3000);
    }, 2000);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Filter users based on search term
  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(userSearchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Upload Entry</h1>
        <p className="text-gray-600">Upload documents and assign them to users.</p>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="card bg-green-50 border-green-200">
          <div className="flex items-center space-x-3">
            <Check className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-medium">Upload successful!</span>
          </div>
        </div>
      )}

      {/* User Selection */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2" />
          Select Users
        </h2>
        
        {errors.users && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <span className="text-red-800 text-sm">{errors.users}</span>
          </div>
        )}

        {/* User Search */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={userSearchTerm}
              onChange={(e) => setUserSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredUsers.map((user) => (
            <label
              key={user.id}
              className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                selectedUsers.includes(user.id)
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="checkbox"
                checked={selectedUsers.includes(user.id)}
                onChange={() => handleUserSelect(user.id)}
                className="sr-only"
              />
              <div className={`w-4 h-4 border rounded mr-3 flex items-center justify-center ${
                selectedUsers.includes(user.id)
                  ? 'border-primary-500 bg-primary-500'
                  : 'border-gray-300'
              }`}>
                {selectedUsers.includes(user.id) && (
                  <Check className="w-3 h-3 text-white" />
                )}
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                <div className="text-xs text-gray-500">{user.email}</div>
              </div>
            </label>
          ))}
        </div>

        {filteredUsers.length === 0 && userSearchTerm && (
          <div className="text-center py-4 text-gray-500">
            No users found matching "{userSearchTerm}"
          </div>
        )}
      </div>

      {/* File Upload */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          Upload Files
        </h2>

        {errors.files && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <span className="text-red-800 text-sm">{errors.files}</span>
          </div>
        )}

        {errors.fileSize && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <span className="text-red-800 text-sm">{errors.fileSize}</span>
          </div>
        )}

        {errors.fileType && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <span className="text-red-800 text-sm">{errors.fileType}</span>
          </div>
        )}

        <div
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              Drag and drop files here, or{' '}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-primary-600 hover:text-primary-500 font-medium"
              >
                browse files
              </button>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              PDF, DOC, DOCX, XLS, XLSX up to 10MB
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            accept=".pdf,.doc,.docx,.xls,.xlsx"
          />
        </div>

        {/* File Preview */}
        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            <h3 className="text-sm font-medium text-gray-900">Selected Files:</h3>
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">{file.name}</div>
                    <div className="text-xs text-gray-500">{formatFileSize(file.size)}</div>
                  </div>
                </div>
                <button
                  onClick={() => handleFileRemove(index)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Category Selection */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Tag className="w-5 h-5 mr-2" />
          Category
        </h2>
        
        {errors.category && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <span className="text-red-800 text-sm">{errors.category}</span>
          </div>
        )}
        
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={`input-field ${errors.category ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
        >
          <option value="">Select a category</option>
          {mockCategories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Upload Button */}
      <div className="flex justify-end">
        <button
          onClick={handleUpload}
          disabled={isUploading || selectedUsers.length === 0 || files.length === 0 || !category}
          className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUploading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Uploading...</span>
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              <span>Upload Document</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default UploadEntry; 
import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Building, 
  Shield, 
  Clock, 
  FileText, 
  Trash2,
  Activity,
  ToggleLeft,
  ToggleRight,
  Edit,
  Save,
  X
} from 'lucide-react';
import { format } from 'date-fns';
import { mockProfile } from '../data/mockData';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(mockProfile.twoFactorEnabled);
  const [editForm, setEditForm] = useState({
    fullName: mockProfile.fullName,
    email: mockProfile.email,
    organization: mockProfile.organization
  });

  const handleSave = () => {
    // Simulate save
    console.log('Saving profile:', editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      fullName: mockProfile.fullName,
      email: mockProfile.email,
      organization: mockProfile.organization
    });
    setIsEditing(false);
  };

  const handleToggle2FA = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    // Simulate 2FA toggle
    console.log('2FA toggled:', !twoFactorEnabled);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600">Manage your account settings and preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Profile Information
              </h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleCancel}
                    className="btn-secondary flex items-center space-x-2"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={handleSave}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.fullName}
                      onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                      className="input-field"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{mockProfile.fullName}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="input-field"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{mockProfile.email}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Organization
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.organization}
                      onChange={(e) => setEditForm({ ...editForm, organization: e.target.value })}
                      className="input-field"
                    />
                  ) : (
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <Building className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{mockProfile.organization}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                    <Shield className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900">{mockProfile.role}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Login
                </label>
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900">
                    {format(new Date(mockProfile.lastLogin), 'MMM d, yyyy h:mm a')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Summary */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Activity Summary
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-blue-900">{mockProfile.totalUploads}</div>
                <div className="text-sm text-blue-700">Total Uploads</div>
              </div>

              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Trash2 className="w-6 h-6 text-red-600" />
                </div>
                <div className="text-2xl font-bold text-red-900">{mockProfile.totalDeletions}</div>
                <div className="text-sm text-red-700">Total Deletions</div>
              </div>

              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Activity className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-sm font-medium text-green-900">Most Recent</div>
                <div className="text-xs text-green-700 mt-1">{mockProfile.mostRecentAction}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Security Settings
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="text-sm font-medium text-gray-900">Two-Factor Authentication</div>
                  <div className="text-xs text-gray-500">Add an extra layer of security</div>
                </div>
                <button
                  onClick={handleToggle2FA}
                  className="flex items-center"
                >
                  {twoFactorEnabled ? (
                    <ToggleRight className="w-8 h-6 text-green-600" />
                  ) : (
                    <ToggleLeft className="w-8 h-6 text-gray-400" />
                  )}
                </button>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm font-medium text-gray-900 mb-1">Last Password Change</div>
                <div className="text-xs text-gray-500">
                  {format(new Date(mockProfile.lastPasswordChange), 'MMM d, yyyy')}
                </div>
                <button className="text-sm text-primary-600 hover:text-primary-500 mt-2">
                  Change Password
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <button className="w-full text-left p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                Download My Data
              </button>
              <button className="w-full text-left p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                Privacy Settings
              </button>
              <button className="w-full text-left p-3 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 
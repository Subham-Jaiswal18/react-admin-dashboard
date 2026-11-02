import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import {
  User,
  Mail,
  Shield,
  Calendar,
  MapPin,
  Phone,
  Edit3,
  CheckCircle2,
  Info,
} from 'lucide-react';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const loadProfileData = async () => {
    setLoading(true);
    try {
      const data = await api.getProfile();
      // Ensure an 'about' field exists for the bio section
      setProfileData({
        ...data,
        about:
          data.about ||
          'Super Admin & Lead System Architect managing dashboard configurations, infrastructure, and user access controls.',
      });
    } catch (error) {
      console.log('ProfileData loading failed:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setSuccessMessage('Profile updated successfully!');
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  if (loading && !profileData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
        <div>
          <p className="text-gray-500">Profile data not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
          <p className="text-sm text-gray-500">
            Manage your personal account information and professional bio.
          </p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 font-medium text-sm rounded-xl transition-colors self-start sm:self-auto"
        >
          <Edit3 size={16} />
          {isEditing ? 'Cancel Editing' : 'Edit Profile'}
        </button>
      </div>

      {/* Success Alert */}
      {successMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl flex items-center gap-3 text-sm font-medium">
          <CheckCircle2 size={18} />
          {successMessage}
        </div>
      )}

      {/* Main Profile Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Modern Avatar & Quick Info Card */}
        <div className="col-span-1 bg-white border border-gray-200 shadow-sm rounded-2xl p-6 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-10"></div>

          <div className="relative mt-4 mb-4">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-600 to-indigo-800 text-white font-bold flex items-center justify-center text-3xl rounded-2xl shadow-md border-4 border-white">
              {profileData.name
                ? profileData.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                : 'AU'}
            </div>
            <span className="absolute bottom-0 right-0 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full"></span>
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-bold text-gray-800">
              {profileData.name || 'Admin User'}
            </h3>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">
              {profileData.role || 'Super Admin'}
            </span>
          </div>

          <div className="w-full pt-6 mt-6 border-t border-gray-100 flex flex-col gap-2 text-left text-xs text-gray-500">
            <div className="flex items-center justify-between">
              <span>Account Status</span>
              <span className="font-semibold text-emerald-600">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Member Since</span>
              <span className="font-semibold text-gray-800">
                {profileData.joinedDate || '2026-01-01'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Information & About Card */}
        <div className="col-span-1 md:col-span-2 space-y-6">
          {/* About / Non-Personal Bio Card */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6">
            <div className="border-b border-gray-100 pb-3 mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
                  <Info size={18} className="text-indigo-600" /> About
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Professional role overview and system summary.
                </p>
              </div>
            </div>
            {isEditing ? (
              <textarea
                name="about"
                rows={3}
                value={profileData.about || ''}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                placeholder="Write a brief professional summary..."
              />
            ) : (
              <p className="text-sm text-gray-600 leading-relaxed">
                {profileData.about || 'No professional summary provided.'}
              </p>
            )}
          </div>

          {/* Account Details Card */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6">
            <div className="border-b border-gray-100 pb-4 mb-6">
              <h3 className="text-base font-bold text-gray-800">
                Personal Information
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Update your contact details or review your credentials.
              </p>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                    <User size={14} /> Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={profileData.name || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                    />
                  ) : (
                    <p className="text-sm font-semibold text-gray-800 py-2.5">
                      {profileData.name || 'Admin User'}
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Mail size={14} /> Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={profileData.email || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                    />
                  ) : (
                    <p className="text-sm font-semibold text-gray-800 py-2.5">
                      {profileData.email || 'admin@example.com'}
                    </p>
                  )}
                </div>

                {/* Role */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Shield size={14} /> Role / Access Level
                  </label>
                  <p className="text-sm font-semibold text-gray-800 py-2.5">
                    {profileData.role || 'Super Admin'}
                  </p>
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Phone size={14} /> Contact Phone
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="phone"
                      value={profileData.phone || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                    />
                  ) : (
                    <p className="text-sm font-semibold text-gray-800 py-2.5">
                      {profileData.phone || '+91 98765 43210'}
                    </p>
                  )}
                </div>

                {/* Location */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin size={14} /> Location
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={profileData.location || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                    />
                  ) : (
                    <p className="text-sm font-semibold text-gray-800 py-2.5">
                      {profileData.location || 'Mumbai, India'}
                    </p>
                  )}
                </div>

                {/* Joined Date */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar size={14} /> Member Since
                  </label>
                  <p className="text-sm font-semibold text-gray-800 py-2.5">
                    {profileData.joinedDate || '2026-01-01'}
                  </p>
                </div>
              </div>

              {/* Save Changes Button if Editing */}
              {isEditing && (
                <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-5 py-2.5 border border-gray-300 text-gray-700 font-medium text-sm rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-indigo-600 text-white font-medium text-sm rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

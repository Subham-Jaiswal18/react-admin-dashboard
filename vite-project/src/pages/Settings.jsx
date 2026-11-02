import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { CheckCircle2 } from 'lucide-react';

const Settings = () => {
  const [settingsData, setSettingsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const loadSettingsData = async () => {
    setLoading(true);
    try {
      const data = await api.getSettings();
      setSettingsData(data);
    } catch (error) {
      console.log('Settings Data loading failed:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettingsData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettingsData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSuccessMessage('Settings saved successfully!');
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleReset = () => {
    loadSettingsData();
    setSuccessMessage('');
  };

  if (loading && !settingsData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!settingsData) {
    return (
      <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
        <div>
          <p className="text-gray-500">Settings data not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
          <p className="text-sm text-gray-500">
            Manage your application configurations and preferences.
          </p>
        </div>
      </div>

      {/* Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* General Configurations Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h3 className="text-base font-bold text-gray-800">
              General Configurations
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Manage site information and default preferences.
            </p>
          </div>
          <div className="p-5 space-y-4">
            {/* Site Name */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Site Name
              </label>
              <input
                type="text"
                name="siteName"
                value={settingsData.siteName || ''}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              />
            </div>

            {/* Language */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Language
              </label>
              <select
                name="language"
                value={settingsData.language || 'English'}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
              </select>
            </div>

            {/* Timezone */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Timezone
              </label>
              <select
                name="timezone"
                value={settingsData.timezone || 'Asia/Kolkata'}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              >
                <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                <option value="America/New_York">America/New_York (EST)</option>
                <option value="Europe/London">Europe/London (GMT)</option>
                <option value="UTC">UTC</option>
              </select>
            </div>

            {/* Theme Preference */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">
                Theme Preference
              </label>
              <select
                name="theme"
                value={settingsData.theme || 'Light'}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              >
                <option value="Light">Light Mode</option>
                <option value="Dark">Dark Mode</option>
                <option value="System">System Default</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications Section Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h3 className="text-base font-bold text-gray-800">Notifications</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Control application notifications.
            </p>
          </div>
          <div className="p-5 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
            <div>
              <h4 className="text-sm font-semibold text-gray-800">
                Email Notifications
              </h4>
              <p className="text-xs text-gray-500">
                Receive important updates through email.
              </p>
            </div>
            <input
              type="checkbox"
              name="notifications"
              checked={!!settingsData.notifications}
              onChange={handleChange}
              className="w-5 h-5 accent-indigo-600 rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Security Section Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h3 className="text-base font-bold text-gray-800">Security</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Manage account security preferences.
            </p>
          </div>
          <div className="p-5 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
            <div>
              <h4 className="text-sm font-semibold text-gray-800">
                Two-Factor Authentication
              </h4>
              <p className="text-xs text-gray-500">
                Add an additional layer of security.
              </p>
            </div>
            <input
              type="checkbox"
              name="twoFactor"
              checked={!!settingsData.twoFactor}
              onChange={handleChange}
              className="w-5 h-5 accent-indigo-600 rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Action Buttons & Success Message Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-auto">
            {successMessage && (
              <div className="px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg flex items-center gap-2 text-sm font-medium">
                <CheckCircle2 size={16} />
                {successMessage}
              </div>
            )}
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={handleReset}
              className="px-5 py-2.5 border border-gray-300 text-gray-700 font-medium text-sm rounded-xl hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-indigo-600 text-white font-medium text-sm rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
            >
              Save Settings
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Settings;

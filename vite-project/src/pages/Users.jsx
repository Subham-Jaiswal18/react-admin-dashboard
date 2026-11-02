import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Users as UsersIcon, Mail, Shield, UserCheck } from 'lucide-react';

const Users = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadUsersData = async () => {
    setLoading(true);
    try {
      const data = await api.getUsers();
      setUserData(data);
    } catch (error) {
      console.log('UserData loading failed:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsersData();
  }, []);

  if (loading && !userData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
        <div>
          <p className="text-gray-500">User data not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Users Management</h2>
          <p className="text-sm text-gray-500">
            View and manage system users and their permissions.
          </p>
        </div>
      </div>

      {/* Users Table Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="py-3 px-6">User</th>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6">Role</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
              {Array.isArray(userData?.items) &&
                userData.items.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    {/* 1. USER */}
                    <td className="py-4 px-6 font-medium text-gray-800 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-semibold text-xs">
                        {user.name ? user.name.charAt(0) : 'U'}
                      </div>
                      {user.name}
                    </td>

                    {/* 2. EMAIL */}
                    <td className="py-4 px-6 text-gray-500">{user.email}</td>

                    {/* 3. ROLE */}
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.role === 'Admin' ||
                          user.role === 'Super Administrator'
                            ? 'bg-purple-50 text-purple-700'
                            : 'bg-blue-50 text-blue-700'
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    {/* 4. STATUS */}
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700">
                        {user.status || 'Active'}
                      </span>
                    </td>

                    {/* 5. JOINED */}
                    <td className="py-4 px-6 text-right text-gray-500">
                      {user.joined || '2026-01-15'}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;

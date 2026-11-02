import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { pageTitles } from '../config/navigation';
import {
  ChevronDown,
  ChevronUp,
  Menu,
  User,
  Settings,
  LogOut,
} from 'lucide-react';

const Topbar = ({ showSidebar, setShowSidebar }) => {
  const location = useLocation();
  const pageTitle = pageTitles[location.pathname] || 'Dashboard';
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sticky top-0 z-40 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8 shadow-sm">
      {/* Left side: Menu icon and dynamic page title */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="text-gray-600 hover:text-gray-900 focus:outline-none md:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">{pageTitle}</h1>
      </div>

      {/* Right side: Profile section dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 focus:outline-none hover:bg-gray-50 p-2 rounded-lg transition-colors"
        >
          {/* letter */}
          <div className="w-9 h-9 bg-indigo-600 text-white font-semibold rounded-full flex items-center justify-center">
            A
          </div>
          {/* text */}
          <span className="text-sm font-medium text-gray-700">Admin User</span>
          {/* icon */}
          <span className="text-gray-600">
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </span>
        </button>

        {/* Dropdown Menu Panel */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
            {/* User Info Header */}
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500 truncate">admin@gmail.com</p>
            </div>
            <a
              href="/profile"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <User size={16} /> Profile
            </a>
            <a
              href="/settings"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Settings size={16} /> Settings
            </a>
            <div className="border-t border-gray-100 my-1"></div>
            <button
              onClick={() => alert('Logged out!')}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-50 text-left"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;

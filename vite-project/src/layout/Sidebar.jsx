import React from 'react';
import { NavLink } from 'react-router-dom';
import { navigation } from '../config/navigation';
import { X } from 'lucide-react';
const Sidebar = ({ showSidebar, setShowSidebar }) => {
  return (
    <div
      className={`fixed left-0 top-0 z-50 min-h-screen w-64 bg-gray-900 text-white transition-transform duration-300 ease-in-out ${
        showSidebar ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}
    >
      {/* logo */}

      <div className="flex items-center justify-between border-b border-gray-700 px-6 py-5">
        <h1 className="text-xl font-semibold">
          Admin <span className="text-indigo-400 font-light">Hub</span>
        </h1>
        {/* Close button visible only on mobile */}
        <button
          onClick={() => setShowSidebar(false)}
          className="text-gray-400 hover:text-white md:hidden"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* menu */}
      <div className="mt-6 px-4">
        {navigation.map((group) => (
          <div key={group.title} className="mb-6">
            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
              {group.title}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => {
                const IconComponent = item.icon;
                return (
                  <NavLink
                    key={item.label}
                    to={item.path}
                    onClick={() => setShowSidebar(false)} // Closes sidebar on click
                    className={({ isActive }) =>
                      `relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-gray-800 text-white'
                          : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                      }`
                    }
                  >
                    {/* Active Indicator Bar */}
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <div className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r bg-indigo-500"></div>
                        )}
                        {IconComponent && (
                          <IconComponent className="w-5 h-5 text-indigo-400" />
                        )}
                        <span>{item.label}</span>
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

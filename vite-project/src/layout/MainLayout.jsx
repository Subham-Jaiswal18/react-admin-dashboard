import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const MainLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Component */}
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      {/* Main Content Area (Pushed right by ml-64 on desktop) */}
      <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300">
        {/* Topbar Component */}
        <Topbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

        {/* Page Content Container */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

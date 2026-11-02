import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  Users,
  ShoppingBag,
  DollarSign,
  Layers,
  ArrowRight,
} from 'lucide-react';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const navigate = useNavigate();

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const data = await api.getDashboard();
      setDashboardData(data);
    } catch (error) {
      console.log('Dashboard data loading failed:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  if (loading && !dashboardData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
        <p className="text-gray-500">Dashboard data not available</p>
      </div>
    );
  }

  // Category sales breakdown for Pie Chart
  const categoryData = dashboardData?.categoryBreakdown || [
    { name: 'Electronics', percentage: 45, color: '#4f46e5' },
    { name: 'Clothing', percentage: 25, color: '#06b6d4' },
    { name: 'Home Goods', percentage: 18, color: '#10b981' },
    { name: 'Accessories', percentage: 12, color: '#f59e0b' },
  ];

  // Recent orders list
  const recentOrders = dashboardData?.recentOrders || [
    {
      id: '1001',
      customer: 'Subham Jaiswal',
      total: 4500,
      status: 'Completed',
    },
    { id: '1002', customer: 'Priya Sharma', total: 1200, status: 'Pending' },
    { id: '1003', customer: 'Rohan Mehta', total: 3400, status: 'Shipped' },
    { id: '1004', customer: 'Ananya Verma', total: 890, status: 'Completed' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
        <p className="text-sm text-gray-500">
          Welcome back! Here is what is happening today.
        </p>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Total Revenue
            </p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">
              ₹{(dashboardData.totalRevenue || 399000).toLocaleString()}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <DollarSign size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Total Users
            </p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">
              {(dashboardData.totalUsers || 1247).toLocaleString()}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Users size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Total Orders
            </p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">
              {(dashboardData.totalOrders || 452).toLocaleString()}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <ShoppingBag size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Products
            </p>
            <h3 className="text-2xl font-bold text-gray-800 mt-1">
              {(dashboardData.totalProducts || 86).toLocaleString()}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Layers size={24} />
          </div>
        </div>
      </div>

      {/* Main Split Content: Interactive Pie Chart & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Card: Interactive Category Breakdown */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-gray-800">
              Sales by Category
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Hover or click categories for details
            </p>
          </div>

          {/* Circle Pie Chart via Concentric SVG Ring */}
          <div className="my-6 flex items-center justify-center relative">
            <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-gray-100"
                strokeWidth="4"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                strokeWidth="4.5"
                strokeDasharray="45, 100"
                stroke="#4f46e5"
                fill="none"
                className="transition-all duration-300 cursor-pointer hover:opacity-80"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                onMouseEnter={() => setActiveCategory(categoryData[0])}
                onMouseLeave={() => setActiveCategory(null)}
              />
              <path
                strokeWidth="4.5"
                strokeDasharray="25, 100"
                strokeDashoffset="-45"
                stroke="#06b6d4"
                fill="none"
                className="transition-all duration-300 cursor-pointer hover:opacity-80"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                onMouseEnter={() => setActiveCategory(categoryData[1])}
                onMouseLeave={() => setActiveCategory(null)}
              />
              <path
                strokeWidth="4.5"
                strokeDasharray="18, 100"
                strokeDashoffset="-70"
                stroke="#10b981"
                fill="none"
                className="transition-all duration-300 cursor-pointer hover:opacity-80"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                onMouseEnter={() => setActiveCategory(categoryData[2])}
                onMouseLeave={() => setActiveCategory(null)}
              />
              <path
                strokeWidth="4.5"
                strokeDasharray="12, 100"
                strokeDashoffset="-88"
                stroke="#f59e0b"
                fill="none"
                className="transition-all duration-300 cursor-pointer hover:opacity-80"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                onMouseEnter={() => setActiveCategory(categoryData[3])}
                onMouseLeave={() => setActiveCategory(null)}
              />
            </svg>
            <div className="absolute text-center pointer-events-none">
              <span className="text-xl font-bold text-gray-800">
                {activeCategory ? `${activeCategory.percentage}%` : '100%'}
              </span>
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
                {activeCategory ? activeCategory.name : 'Total Share'}
              </p>
            </div>
          </div>

          {/* Interactive Category Legends */}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100 text-xs">
            {categoryData.map((cat, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setActiveCategory(cat)}
                onMouseLeave={() => setActiveCategory(null)}
                className={`flex items-center gap-2 p-1.5 rounded-lg cursor-pointer transition-colors ${
                  activeCategory?.name === cat.name
                    ? 'bg-indigo-50'
                    : 'hover:bg-gray-50'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: cat.color }}
                ></span>
                <span className="text-gray-600 font-medium">{cat.name}:</span>
                <span className="font-semibold text-gray-800">
                  {cat.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Card: Recent Orders Table with Working View All Button */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <h3 className="text-base font-bold text-gray-800">
                Recent Orders
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Latest transactions from store
              </p>
            </div>
            <button
              onClick={() => navigate('/orders')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer transition-colors"
            >
              View All <ArrowRight size={14} />
            </button>
          </div>

          <div className="overflow-x-auto my-4">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                  <th className="py-3 px-2">Order ID</th>
                  <th className="py-3 px-2">Customer</th>
                  <th className="py-3 px-2">Total</th>
                  <th className="py-3 px-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {recentOrders.map((order, idx) => (
                  <tr
                    key={order.id || idx}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="py-3.5 px-2 font-medium text-gray-800">
                      #{order.id || 'N/A'}
                    </td>
                    <td className="py-3.5 px-2 font-medium text-gray-800">
                      {order.customer || 'Unknown'}
                    </td>
                    <td className="py-3.5 px-2 font-semibold text-gray-800">
                      ₹{(order.total || 0).toLocaleString()}
                    </td>
                    <td className="py-3.5 px-2 text-right">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          (order.status || 'Completed') === 'Completed'
                            ? 'bg-emerald-50 text-emerald-700'
                            : (order.status || '') === 'Pending'
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-blue-50 text-blue-700'
                        }`}
                      >
                        {order.status || 'Completed'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

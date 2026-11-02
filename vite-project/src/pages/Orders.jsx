import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { ShoppingCart, Package, Calendar } from 'lucide-react';

const Orders = () => {
  const [ordersData, setOrdersData] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadOrdersData = async () => {
    setLoading(true);
    try {
      const data = await api.getOrders();
      setOrdersData(data);
    } catch (error) {
      console.log('OrdersData loading failed:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrdersData();
  }, []);

  if (loading && !ordersData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!ordersData) {
    return (
      <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
        <div>
          <p className="text-gray-500">Orders data not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Orders Management
          </h2>
          <p className="text-sm text-gray-500">
            View and manage customer orders and fulfillment status.
          </p>
        </div>
      </div>

      {/* Orders Table Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="py-3 px-6">Order ID</th>
                <th className="py-3 px-6">Customer</th>
                <th className="py-3 px-6">Total</th>
                <th className="py-3 px-6">Items</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
              {Array.isArray(ordersData?.items) &&
                ordersData.items.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    {/* 1. Order ID */}
                    <td className="py-4 px-6 font-medium text-gray-800">
                      #{order.id}
                    </td>

                    {/* 2. Customer */}
                    <td className="py-4 px-6 font-medium text-gray-800 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-semibold text-xs">
                        {order.customer ? order.customer.charAt(0) : 'C'}
                      </div>
                      {order.customer}
                    </td>

                    {/* 3. Total */}
                    <td className="py-4 px-6 font-medium text-gray-800">
                      ₹{order.total?.toLocaleString()}
                    </td>

                    {/* 4. Items Count */}
                    <td className="py-4 px-6 text-gray-500">
                      {order.items} items
                    </td>

                    {/* 5. Status */}
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.status === 'Completed'
                            ? 'bg-emerald-50 text-emerald-700'
                            : order.status === 'Pending'
                              ? 'bg-amber-50 text-amber-700'
                              : order.status === 'Shipped'
                                ? 'bg-blue-50 text-blue-700'
                                : 'bg-rose-50 text-rose-700'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    {/* 6. Date */}
                    <td className="py-4 px-6 text-right text-gray-500">
                      {order.date}
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

export default Orders;

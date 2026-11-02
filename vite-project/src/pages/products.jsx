import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Package, Tag, Layers } from 'lucide-react';

const Products = () => {
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadProductsData = async () => {
    setLoading(true);
    try {
      const data = await api.getProducts();
      setProductData(data);
    } catch (error) {
      console.log('ProductData loading failed:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProductsData();
  }, []);

  if (loading && !productData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!productData) {
    return (
      <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
        <div>
          <p className="text-gray-500">Product data not available</p>
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
            Products Management
          </h2>
          <p className="text-sm text-gray-500">
            View and manage your store inventory and products.
          </p>
        </div>
      </div>

      {/* Products Table Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="py-3 px-6">Product Name</th>
                <th className="py-3 px-6">Category</th>
                <th className="py-3 px-6">Price</th>
                <th className="py-3 px-6">Stock</th>
                <th className="py-3 px-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
              {Array.isArray(productData?.items) &&
                productData.items.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    {/* 1. Name */}
                    <td className="py-4 px-6 font-medium text-gray-800 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center font-semibold text-xs">
                        {product.name ? product.name.charAt(0) : 'P'}
                      </div>
                      {product.name}
                    </td>

                    {/* 2. Category */}
                    <td className="py-4 px-6 text-gray-500">
                      {product.category}
                    </td>

                    {/* 3. Price */}
                    <td className="py-4 px-6 font-medium text-gray-800">
                      ₹{product.price?.toLocaleString()}
                    </td>

                    {/* 4. Stock */}
                    <td className="py-4 px-6 text-gray-500">
                      {product.stock} units
                    </td>

                    {/* 5. Status */}
                    <td className="py-4 px-6 text-right">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          product.status === 'In Stock'
                            ? 'bg-emerald-50 text-emerald-700'
                            : product.status === 'Low Stock'
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-rose-50 text-rose-700'
                        }`}
                      >
                        {product.status}
                      </span>
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

export default Products;
